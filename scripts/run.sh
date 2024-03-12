#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "${0}")

source "${SCRIPT_DIR}"/set_vars.sh

# Public: Runs setup and then starts Docker Compose.
#
# This script is used as the entry point for running the application in development mode and is not intended for
# production.
#
# Examples
#
#   ./scripts/run.sh
#
# Returns exit code 0.
function main() {
  set_vars

  # run setup
  "${SCRIPT_DIR}"/setup.sh

  source "${CONFIG_DIR}"/.env

  # export the env vars needed by docker compose
  export APP_PORT
  export MONGODB_HOST
  export MONGODB_NAME
  export MONGODB_PASSWORD
  export MONGODB_PORT
  export MONGODB_USERNAME

  printf "%b starting docker compose...\n" "${INFO_PREFIX}"
  docker compose \
    up \
    --build

  exit 0
}

# and so, it begins...
main
