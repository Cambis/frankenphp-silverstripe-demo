# FrankenPHP Silverstripe Demo
A simple [Silverstripe](https://docs.silverstripe.org/en/5/) site served by [FrankenPHP](https://frankenphp.dev/).

## Prerequisites 🦺
This demo uses [Docker](https://docs.docker.com/get-docker/) so ensure you have it installed first.

## Getting started 🐤
Firstly, build the images.
```sh
docker compose build --no-cache
```

Next, install the dependencies and build the assets.
```sh
docker compose run --rm web yarn install
docker compose run --rm web yarn build
docker compose run --rm web composer install
```

Then build the database.
```sh
docker compose run --rm web sake dev/build
```

Now you can run the site, it should be accessible at https://localhost.
```sh
docker compose up
```

Once you are done be sure the stop the running containers by using the following command.
```sh
docker compose down --remove-orphans
```

## Using a different port 🚢
If your 80 and 443 ports are currently in use you can specify alternative ports instead, see the example below.
```sh
SS_BASE_URL=https://localhost:4443 HTTP_PORT=8000 HTTPS_PORT=4443 HTTP3_PORT=4443 docker compose up
```

Then visit https://localhost:4443 to view the site.

## Production mode 🚀
The production mode example uses the [worker mode](https://frankenphp.dev/docs/worker/).

> [!CAUTION]
> This has not been tested in a production environment, so use at your discretion.

Here's how you can run the production mode locally.
```sh
docker compose -f compose.yml -f compose.prod.yml build
docker compose up -f compose.yml -f compose.prod.yml up
```
