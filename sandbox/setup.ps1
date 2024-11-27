# .\setup.ps1 으로 실행하세요

Set-Location $PSScriptRoot
docker build --tag dind:latest --file ./host-container/Dockerfile ./host-container
docker compose -f registry/docker-compose.yml up -d