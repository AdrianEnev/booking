# syntax = docker/dockerfile:1

ARG NODE_VERSION=23.11.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app

# Set prod mode ONLY in final image
# Do NOT set NODE_ENV=production here

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package.json package-lock.json ./

# Install ALL dependencies, including devDependencies (no NODE_ENV=production yet)
RUN npm ci

COPY . .

RUN npm run build

FROM base

# NOW set production mode
ENV NODE_ENV="production"

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/

# Copy firebase admin JSON file into the container
COPY config/victor-cuts-firebase-adminsdk-fbsvc-92806d8444.json config/victor-cuts-firebase-adminsdk-fbsvc-92806d8444.json

EXPOSE 3000

CMD ["node", "dist/server.js"]