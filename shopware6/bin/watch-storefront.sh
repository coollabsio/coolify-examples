#!/usr/bin/env bash

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

export APP_URL
export PROXY_URL
export STOREFRONT_ASSETS_PORT
export STOREFRONT_PROXY_PORT
export STOREFRONT_HTTPS_KEY_FILE
export STOREFRONT_HTTPS_CERTIFICATE_FILE
export STOREFRONT_SKIP_SSL_CERT

if [[ -e "${PROJECT_ROOT}/vendor/shopware/platform" ]]; then
    STOREFRONT_ROOT="${STOREFRONT_ROOT:-"${PROJECT_ROOT}/vendor/shopware/platform/src/Storefront"}"
else
    STOREFRONT_ROOT="${STOREFRONT_ROOT:-"${PROJECT_ROOT}/vendor/shopware/storefront"}"
fi

if [[ ! -d "${STOREFRONT_ROOT}"/Resources/app/storefront/node_modules/webpack-dev-server ]]; then
    npm --prefix "${STOREFRONT_ROOT}"/Resources/app/storefront install --prefer-offline
fi

"${CWD}"/console bundle:dump
"${CWD}"/console feature:dump
"${CWD}"/console theme:compile --active-only
if [[ -n "$1" ]]; then
    "${CWD}"/console theme:dump --theme-name="$1"
else
    "${CWD}"/console theme:dump
fi

if [[ $(command -v jq) ]]; then
    OLDPWD=$(pwd)
    cd "$PROJECT_ROOT" || exit

    jq -c '.[]' "var/plugins.json" | while read -r config; do
        srcPath=$(echo "$config" | jq -r '(.basePath + .storefront.path)')

        # the package.json files are always one upper
        path=$(dirname "$srcPath")
        name=$(echo "$config" | jq -r '.technicalName' )

        skippingEnvVarName="SKIP_$(echo "$name" | sed -e 's/\([a-z]\)/\U\1/g' -e 's/-/_/g')"

        if [[ ${!skippingEnvVarName:-""} ]]; then
            continue
        fi

        if [[ -f "$path/package.json" && ! -d "$path/node_modules" && $name != "storefront" ]]; then
            echo "=> Installing npm dependencies for ${name}"

            (cd "$path" && npm install)
        fi
    done
    cd "$OLDPWD" || exit
else
    echo "Cannot check extensions for required npm installations as jq is not installed"
fi

npm --prefix "${STOREFRONT_ROOT}"/Resources/app/storefront run-script hot-proxy
