#!/usr/bin/env bash

unset CDPATH
CWD="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

export PROJECT_ROOT="${PROJECT_ROOT:-"$(dirname "$CWD")"}"
export ENV_FILE=${ENV_FILE:-"${PROJECT_ROOT}/.env"}
export NPM_CONFIG_FUND=false
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_UPDATE_NOTIFIER=false

# shellcheck source=functions.sh
source "${PROJECT_ROOT}/bin/functions.sh"

curenv=$(declare -p -x)

load_dotenv "$ENV_FILE"

# Restore environment variables set globally
set -o allexport
eval "$curenv"
set +o allexport

set -euo pipefail

export APP_URL
export PROJECT_ROOT
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

if [[ -e "${PROJECT_ROOT}/vendor/shopware/platform" ]]; then
    ADMIN_ROOT="${ADMIN_ROOT:-"${PROJECT_ROOT}/vendor/shopware/platform/src/Administration"}"
else
    ADMIN_ROOT="${ADMIN_ROOT:-"${PROJECT_ROOT}/vendor/shopware/administration"}"
fi

export ADMIN_ROOT

BIN_TOOL="${CWD}/console"

if [[ ${CI:-""} ]]; then
    BIN_TOOL="${CWD}/ci"

    if [[ ! -x "$BIN_TOOL" ]]; then
        chmod +x "$BIN_TOOL"
    fi
fi

# build admin
[[ ${SHOPWARE_SKIP_BUNDLE_DUMP:-""} ]] || "${BIN_TOOL}" bundle:dump
"${BIN_TOOL}" feature:dump || true

if [[ $(command -v jq) ]]; then
    OLDPWD=$(pwd)
    cd "$PROJECT_ROOT" || exit
    basePaths=()

    while read -r config; do
        srcPath=$(echo "$config" | jq -r '(.basePath + .administration.path)')
        basePath=$(echo "$config" | jq -r '.basePath')

        # the package.json files are always one upper
        path=$(dirname "$srcPath")
        name=$(echo "$config" | jq -r '.technicalName' )

        skippingEnvVarName="SKIP_$(echo "$name" | sed -e 's/\([a-z]\)/\U\1/g' -e 's/-/_/g')"

        if [[ ${!skippingEnvVarName:-""} ]]; then
            continue
        fi

        if [[ -n $srcPath && ! " ${basePaths[*]:-} " =~ " ${basePath} " ]]; then
            basePaths+=("$basePath")
        fi

        if [[ -f "$path/package.json" && ! -d "$path/node_modules" && $name != "administration" ]]; then
            echo "=> Installing npm dependencies for ${name}"

            (cd "$path" && npm install --omit=dev --no-audit --prefer-offline)
        fi
    done < <(jq -c '.[]' "var/plugins.json")

    for basePath in "${basePaths[@]:-}"; do
        if [[ -z $basePath ]]; then
            continue
        fi
        if [[ -r "${basePath}/package.json" ]]; then
            echo "=> Installing npm dependencies for ${basePath}"
            (cd "${basePath}" && npm ci --omit=dev --no-audit --prefer-offline)
        fi

        if [[ -r "${basePath}/../package.json" ]]; then
            echo "=> Installing npm dependencies for ${basePath}/.."
            (cd "${basePath}/.." && npm ci --omit=dev --no-audit --prefer-offline)
        fi
    done

    cd "$OLDPWD" || exit
else
    echo "Cannot check extensions for required npm installations as jq is not installed"
fi

(cd "${ADMIN_ROOT}"/Resources/app/administration && npm install --prefer-offline --omit=dev)

# Dump entity schema
if [[ -z "${SHOPWARE_SKIP_ENTITY_SCHEMA_DUMP:-""}" ]] && [[ -f "${ADMIN_ROOT}"/Resources/app/administration/scripts/entitySchemaConverter/entity-schema-converter.ts ]]; then
  mkdir -p "${ADMIN_ROOT}"/Resources/app/administration/test/_mocks_
  "${BIN_TOOL}" -e prod framework:schema -s 'entity-schema' "${ADMIN_ROOT}"/Resources/app/administration/test/_mocks_/entity-schema.json
  (cd "${ADMIN_ROOT}"/Resources/app/administration && npm run convert-entity-schema)
fi

(cd "${ADMIN_ROOT}"/Resources/app/administration && npm run build)
[[ ${SHOPWARE_SKIP_ASSET_COPY:-""} ]] ||"${BIN_TOOL}" assets:install
