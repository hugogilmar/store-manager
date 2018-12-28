#!/bin/sh
set -e

yarn install
yarn serve

exec "$@"
