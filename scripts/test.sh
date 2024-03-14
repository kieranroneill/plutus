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
function main {
  local attempt
  local api_health

  attempt=0
  api_health=starting

  set_vars

  source .env.test

  # export the env vars needed by docker compose
  export APP_PORT
  export MONGODB_PASSWORD
  export MONGODB_PORT
  export MONGODB_USERNAME

  # start the services
  docker compose \
    -p plutus_test \
    -f docker-compose.test.yml \
    up \
    -d

  # poll the healthchecks
  while [ ${attempt} -le 14 ]; do
    sleep 2

    attempt=$(( attempt + 1 ))

    printf "%b waiting for healthchecks, attempt: %b...\n" "${INFO_PREFIX}" "${attempt}"

    api_health=$(docker inspect -f "{{.State.Health.Status}}" plutus_api_test)

    if [[ "${api_health}" == "unhealthy" ]]; then
      printf "%b healthchecks failed\n" "${ERROR_PREFIX}"
      break
    fi

    if [[ "${api_health}" == "healthy" ]]; then
      break
    fi
  done

  printf "%b plutus_api_test=%b\n" "${INFO_PREFIX}" "${api_health}"

  # if the services are up and running, we can run tests
  if [[ "${api_health}" == "healthy" ]]; then
    yarn test:e2e
    yarn test:unit
  else
    docker logs --details plutus_api_test
  fi

  # stop the services and remove
  docker compose \
    -p plutus_test \
    -f docker-compose.test.yml \
    down
}

# and so, it begins...
main
