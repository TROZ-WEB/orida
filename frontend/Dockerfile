# Base image for all steps
FROM node:16.14.0-slim as base

WORKDIR /srv/frontend/

# Dev dependencies
FROM base as devDependencies

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# Prod dependencies
FROM devDependencies as dependencies

RUN yarn install --frozen-lockfile --production

# Build
FROM devDependencies as build

COPY tsconfig.json .
COPY public ./public
COPY src ./src

ARG VERSION
RUN echo "export default '$VERSION';" > src/version.ts

RUN yarn build
RUN cp --recursive build build-final && rm build-final/static/*/*.map

# Sentry release
FROM getsentry/sentry-cli:1.61.0 as sentry

WORKDIR /srv/frontend/

COPY --from=build /srv/frontend/build /srv/frontend

# Final image
FROM nginx:1.21.0

WORKDIR /srv/frontend/

COPY default.conf /etc/nginx/conf.d
COPY start.sh /usr/local/bin

COPY --from=build /srv/frontend/build-final /srv/frontend

CMD ["start.sh"]
