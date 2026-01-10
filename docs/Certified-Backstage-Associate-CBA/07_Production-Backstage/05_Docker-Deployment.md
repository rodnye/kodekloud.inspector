# Docker Deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Production-Backstage/Docker-Deployment)

---

## Table of Contents

- Docker Deployment
  - Prerequisites
  - Overview of the Generated Dockerfile
  - packages/backend/Dockerfile
  - 1. Build the Backstage Backend Bundle
  - 2. Build the Docker Image
  - 3. Run & Deploy the Container
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Production Backstage

# Docker Deployment

Containerizing your Backstage backend with Docker makes it easy to run and scale across any container orchestration platform—whether it’s [Kubernetes](https://kubernetes.io/), [Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html), or your own on-premise solution. When you scaffold a new Backstage app using `create-app`, a production-ready Dockerfile is generated automatically under `packages/backend/Dockerfile`. You can build on this file to package your Backstage instance without starting from scratch.

![The image is a flowchart titled "Backstage With Docker," illustrating the process from Backstage Source to Docker Container, involving a Dockerfile and Docker Build.](https://kodekloud.com/kk-media/image/upload/v1752870176/notes-assets/images/Certified-Backstage-Associate-CBA-Docker-Deployment/backstage-with-docker-flowchart.jpg)

## Prerequisites

- Node.js 20 (or later)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- Docker (with BuildKit enabled)
- A cloned Backstage repository initialized via `npx @backstage/create-app`

## Overview of the Generated Dockerfile

Backstage’s default Dockerfile bundles the backend in a production-ready image. Below is a high-level summary:

| Stage                   | Purpose                                  | Key Instructions                                                                                            |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Base Image              | Node.js runtime                          | `FROM node:20-bookworm-slim`                                                                                |
| System Dependencies     | Build tools for native modules           | `apt-get install -y python3 g++ build-essential libsqlite3-dev`                                             |
| App User & Workspace    | Security and working directory           | `USER node`<br>`WORKDIR /app`                                                                               |
| Copy Artifacts          | Yarn cache, lockfile, skeleton bundle    | `COPY .yarn .yarn`<br>`COPY yarn.lock package.json skeleton.tar.gz ./`                                      |
| Install Production Deps | Optimize workspace dependencies for prod | `yarn workspaces focus --all --production`                                                                  |
| Bundle Extraction       | Unpack backend code and configuration    | `tar xzf bundle.tar.gz`<br>`COPY app-config.yaml .`                                                         |
| Runtime Command         | Start the Backstage backend              | `CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]` |

## packages/backend/Dockerfile

```
# Use Node 20 on Debian Bookworm
FROM node:20-bookworm-slim

# Ensure node-gyp can find Python3
ENV PYTHON=/usr/bin/python3

# Install build dependencies for @backstage/plugin-scaffold-backend
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends python3 g++ build-essential && \
    rm -rf /var/lib/apt/lists/*

# Install sqlite3 dependencies (optional)
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# Switch to non-root 'node' user
USER node
WORKDIR /app

# Copy Yarn artifacts and Backstage config
COPY --chown=node:node .yarn ./.yarn
COPY --chown=node:node yarnrc.yml backstage.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--no-node-snapshot"

# Extract skeleton for faster installs
COPY --chown=node:node yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

# Install production dependencies only
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production && \
    yarn cache clean

# Copy and unpack the compiled backend bundle and its config
COPY --chown=node:node packages/backend/dist/bundle.tar.gz ./
COPY --chown=node:node packages/backend/dist/app-config.yaml ./app-config.yaml
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Start the backend service
CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
```

> [!important]
> **Note**
>
> Be sure to enable Docker BuildKit in your environment to leverage layer caching with the `--mount=type=cache` syntax.
> On Docker Desktop you can toggle this under Settings › Docker Engine.

## 1\. Build the Backstage Backend Bundle

Run these commands from your repository root to install dependencies, generate types, and compile the backend code:

```
# Install dependencies in strict mode
yarn install --immutable

# Generate TypeScript definitions
yarn tsc

# Compile the backend into dist/{bundle.tar.gz,skeleton.tar.gz}
yarn build backend
```

## 2\. Build the Docker Image

With the Dockerfile and backend bundle ready, build your container image:

```
docker build . \
  -f packages/backend/Dockerfile \
  --tag backstage:latest
```

## 3\. Run & Deploy the Container

Launch your Backstage backend locally:

```
docker run -p 7000:7000 backstage:latest
```

Once verified, push the image to your container registry (Docker Hub, ECR, GCR, etc.) and deploy it to your preferred platform.

## Links and References

- [Backstage Documentation](https://backstage.io/docs/)
- [Docker BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/)
- [Yarn Classic CLI](https://classic.yarnpkg.com/lang/en/docs/cli/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/24aeb58f-e979-44e3-802d-917e6b7531a8)**
>
> Watch video content
