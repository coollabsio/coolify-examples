#!/usr/bin/env bash

unset CDPATH
CWD="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

set -euo pipefail

export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PROJECT_ROOT="${PROJECT_ROOT:-"$(dirname "$CWD")"}"
export NPM_CONFIG_FUND=false
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_UPDATE_NOTIFIER=false

if [[ -e "${PROJECT_ROOT}/vendor/shopware/platform" ]]; then
    STOREFRONT_ROOT="${STOREFRONT_ROOT:-"${PROJECT_ROOT}/vendor/shopware/platform/src/Storefront"}"
else
    STOREFRONT_ROOT="${STOREFRONT_ROOT:-"${PROJECT_ROOT}/vendor/shopware/storefront"}"
fi

BIN_TOOL="${CWD}/console"

if [[ ${CI:-""} ]]; then
    BIN_TOOL="${CWD}/ci"

    if [[ ! -x "$BIN_TOOL" ]]; then
        chmod +x "$BIN_TOOL"
    fi
fi

# build storefront
[[ ${SHOPWARE_SKIP_BUNDLE_DUMP:-""} ]] || "${BIN_TOOL}" bundle:dump
[[ ${SHOPWARE_SKIP_FEATURE_DUMP:-""} ]] || "${BIN_TOOL}" feature:dump

if [[ $(command -v jq) ]]; then
    OLDPWD=$(pwd)
    cd "$PROJECT_ROOT" || exit
    basePaths=()

    while read -r config; do
        srcPath=$(echo "$config" | jq -r '(.basePath + .storefront.path)')
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

        if [[ -f "$path/package.json" && ! -d "$path/node_modules" && $name != "storefront" ]]; then
            echo "=> Installing npm dependencies for ${name}"

            (cd "$path" && npm install --prefer-offline)
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

npm --prefix "${STOREFRONT_ROOT}"/Resources/app/storefront install --prefer-offline --omit=dev
node "${STOREFRONT_ROOT}"/Resources/app/storefront/copy-to-vendor.js
npm --prefix "${STOREFRONT_ROOT}"/Resources/app/storefront run production
[[ ${SHOPWARE_SKIP_ASSET_COPY:-""} ]] ||"${BIN_TOOL}" assets:install
[[ ${SHOPWARE_SKIP_THEME_COMPILE:-""} ]] || "${BIN_TOOL}" theme:compile --active-only

if ! [ "${1:-default}" = "--keep-cache" ]; then
    "${BIN_TOOL}" cache:clear
fi
