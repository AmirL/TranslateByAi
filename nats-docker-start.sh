#!/bin/bash

if [[ "$(docker images -q nats 2> /dev/null)" == "" ]]; then
    docker pull nats
fi

docker stop nats_server > /dev/null 2>&1 || true
docker rm nats_server > /dev/null 2>&1 || true

docker run -d --name nats_server -p 4222:4222 -ti nats -DV
echo "NATS server started"
