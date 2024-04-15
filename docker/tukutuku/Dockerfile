ARG COMPOSER_VERSION=2-bin
ARG NODE_VERSION=lts
ARG PHP_VERSION=8.3

FROM composer/composer:${COMPOSER_VERSION} as composer-source
FROM node:${NODE_VERSION} as node-source
FROM dunglas/frankenphp:1.1.2-php${PHP_VERSION} as base

# Install apt dependencies
RUN apt-get update -qq; \
  DEBIAN_FRONTEND=noninteractive apt-get install -qqy \
    git \
    netcat-traditional \
  --no-install-recommends; \
  rm -rf /var/lib/apt/lists*

# Install php extensions
RUN install-php-extensions \
  bcmath \
  exif \
  gd \
  gmp \
  intl \
  ldap \
  mysqli \
  opcache \
  pdo \
  pdo_mysql \
  soap \
  tidy \
  xsl \
  zip

# Install composer from source
COPY --from=composer-source /composer /usr/local/bin/

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER 1

# Install node from source
COPY --from=node-source /usr/local/bin/node /usr/local/bin/
COPY --from=node-source /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node-source /opt/ /opt/

RUN ln -fs /usr/local/bin/node /usr/local/bin/nodejs && \
  ln -fs ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
  ln -fs ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx && \
  ln -fs /opt/yarn*/bin/yarn /usr/local/bin/yarn && \
  ln -fs /opt/yarn*/bin/yarnpkg /usr/local/bin/yarnpkg && \
  node --version && \
  npm --version && \
  yarn --version

# Copy ini settings
COPY --link ./docker/tukutuku/conf.d/app.ini ${PHP_INI_DIR}/conf.d

# Add vendor directory to path
ENV PATH "./vendor/bin:$PATH"

WORKDIR /app

FROM base as dev

# Add a named non-root user
RUN groupadd --gid 1000 silverstripe; \
  useradd --uid 1000 --gid silverstripe --shell /bin/bash --create-home silverstripe

RUN \
	# Add additional capability to bind to port 80 and 443
	setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/frankenphp; \
	# Give write access to /data/caddy and /config/caddy
	chown -R silverstripe:silverstripe /data/caddy && chown -R silverstripe:silverstripe /config/caddy;

# Add the entrypoint
COPY --link --chmod=755 ./docker/tukutuku/docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
ENTRYPOINT [ "/usr/bin/docker-entrypoint.sh" ]

USER 1000

CMD [ "frankenphp", "run", "--config", "/etc/caddy/Caddyfile", "--watch" ]

# Build production version
FROM base as builder

COPY composer.json composer.lock ./
COPY package.json yarn.lock ./

RUN composer install --no-dev --no-scripts -a; \
  yarn install --frozen-lockfile

COPY . ./

# Build the assets
RUN yarn build

# Remove dev files
RUN rm -rf \
  .editorconfig \
  .git \
  .gitignore \
  app/tests \
  compose*.yml \
  docker \
  README.md

COPY ./docker/tukutuku/worker.php ./public/index.php

# Production server
FROM base as prod

RUN mv "${PHP_INI_DIR}/php.ini-production" "${PHP_INI_DIR}/php.ini"

COPY --from=builder /app /app

CMD [ "frankenphp", "run", "--config", "/etc/caddy/Caddyfile" ]
