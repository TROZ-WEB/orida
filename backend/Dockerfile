# Base image for all steps
FROM node:16.14.0-slim as base

WORKDIR /srv/backend/

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
COPY src ./src

ARG VERSION
RUN echo "export default '$VERSION';" > src/version.ts

RUN yarn build

# Final image
FROM base

COPY --from=dependencies /srv/backend/node_modules /srv/backend/node_modules
COPY --from=build /srv/backend/dist /srv/backend/dist

USER node

ENV NODE_ENV="production"
ENV PATH="/srv/backend/node_modules/.bin:${PATH}"

EXPOSE 3000

CMD ["node", "dist"]
