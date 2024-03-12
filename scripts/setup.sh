#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "${0}")

source "${SCRIPT_DIR}"/set_vars.sh

# Public: Creates a .env file for the API, if it don't exist.
#
# Examples
#
#   ./scripts/setup.sh
#
# Returns exit code 1 if no example file exists, otherwise, exit code 0 is returned.
function main() {
  local env_example_file
  local env_file

  set_vars

  env_example_file="${PWD}/.env.example"

  if [[ ! -f "${env_example_file}" ]];
    then
      printf "%b no example env file at %b \n" "${ERROR_PREFIX}" "${env_example_file}"
      exit 1
  fi

  # create the /.config directory if it doesn't exist
  if [[ ! -d "${CONFIG_DIR}" ]];
    then
      printf "%b creating new %b directory... \n" "${INFO_PREFIX}" "${CONFIG_DIR}"
      mkdir -p "${CONFIG_DIR}"
  fi

  env_file=".env"

  printf "%b creating %b file...\n" "${INFO_PREFIX}" "${env_file}"

  # create the .env file
  cp -n "${env_example_file}" "${CONFIG_DIR}/${env_file}"

  printf "%b done!\n" "${INFO_PREFIX}"

  exit 0
}

# and so, it begins...
main
