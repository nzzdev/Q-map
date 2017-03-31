# NZZ Storytelling Q Map



## Docker setup
Dockerfile already included in skeleton repo. Renderer service can be dockerized locally with:
* `docker build -t q-map .`
* `docker run -p 3000:3000 q-map`
For more information see [Docker documentaion](https://docs.docker.com/)

## Travis Setup
Travis needs the following environment variables (can be set in Travis' GUI) to push docker image and update rancher accordingly:
* `DOCKER_USERNAME`
* `DOCKER_EMAIL`
* `DOCKER_PASSWORD`
* `RANCHER_URL`
* `CATTLE_ACCESS_KEY`
* `CATTLE_SECRET_KEY`
* `RANCHER_SERVICE_ID_STAGING`

## License
Copyright (c) 2017 Neue Zürcher Zeitung. All rights reserved.

This software is published under the MIT license.
