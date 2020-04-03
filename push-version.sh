#! /bin/bash

docker build . -t coronames
docker tag coronames eu.gcr.io/monstertrip/coronames
docker push eu.gcr.io/monstertrip/coronames