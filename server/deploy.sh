#!/bin/bash

echo What should the version be?

read VERSION
docker build -t nicoolaslb/kiaora:$VERSION .
docker push nicoolaslb/kiaora:$VERSION

ssh root@147.182.209.193 "docker pull nicoolaslb/kiaora:$VERSION && docker tag nicoolaslb/kiaora:$VERSION dokku/api-kiaora:$VERSION && dokku tags:deploy api-kiaora $VERSION"