#!/bin/bash

cd "$(dirname "$0")"

# DinD 이미지 빌드
docker build --tag dind:latest --file ./host-container/Dockerfile ./host-container

# Registry 컨테이너 실행
docker compose -f ./registry/docker-compose.yml up -d