#!/bin/sh
set -e

# start server
yarn serve

exec "$@"
