#! /bin/bash

set -e

if [ -z ${name+x} ]; then echo "name is unset"; exit 1; else echo "var is set to '$name'"; fi
if [ -z ${src+x} ]; then echo "src is unset"; exit 1; else echo "var is set to '$src'"; fi

gc_image=eu.gcr.io/mussia8/$name

docker build -t $gc_image ./$src --force-rm
echo 'Finished building!'

docker push $gc_image
echo 'Finished pushing!'

echo 'Starting Deploy!!'

if [[ "${GITHUB_REF##*/}" = "master" ]];
then
  gcloud run deploy $name \
    --image $gc_image \
    --platform managed \
    --allow-unauthenticated \
    --region europe-west1 \
    --port 3333

  gcloud run services update-traffic $name --platform=managed --to-latest --region europe-west1
else
  if [[ $HEAD_REF == *"/"* ]]; then
    HEAD_REF=${GITHUB_SHA::8}
  fi
  echo $name
  echo $HEAD_REF
  gcloud run deploy $name \
    --image $gc_image \
    --platform managed \
    --allow-unauthenticated \
    --region europe-west1 \
    --port 3333 \
    --no-traffic \
    --tag 1abc
fi

echo 'Finished Deploy!!'
