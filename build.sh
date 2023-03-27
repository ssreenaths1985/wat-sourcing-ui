#!/bin/bash
# Build script
set -eo pipefail

build_tag=$1
name='wat-sourcing-web-service'
node=$2
org=$3

docker build -f ${dockerfile} --label commitHash=$(git rev-parse --short HEAD) -t ${org}/${name}:${build_tag} .
echo {\"image_name\" : \"${name}\", \"image_tag\" : \"${build_tag}\", \"node_name\" : \"$node\"} > metadata.json