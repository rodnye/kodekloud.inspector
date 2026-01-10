# Run Unit Testing Job using a Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Run-Unit-Testing-Job-using-a-Service)

---

## Table of Contents

- Run Unit Testing Job using a Service
  - Overview
  - Existing Workflow: unit-testing Job
  - What Are Service Containers?
  - Pre-built MongoDB Image on Docker Hub
  - Updated Workflow with MongoDB Service
  - Workflow Execution and Logs
  - Next Steps
  - Links and References
  - Watch Video
    - Service Definition
    - Full Workflow YAML

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Run Unit Testing Job using a Service

## Overview

In this guide, you’ll configure a non-production MongoDB instance as a service container in your GitHub Actions workflow. This ensures your unit tests run against an isolated database and keeps production data safe.

> [!important]
> **Warning**
>
> Never point your test suite at a production database. Service containers provide complete isolation for reliable, repeatable testing.

## Existing Workflow: `unit-testing` Job

Here’s the current setup that uses a production MongoDB URI:

```
on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'


env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ${{ matrix.operating_system }}
    strategy:
      matrix:
        nodejs_version: [18, 20]
        operating_system: [ubuntu-latest]
        exclude:
          - nodejs_version: 18
            operating_system: macos-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Install dependencies
        run: npm install


      - name: Run tests
        run: npm test
```

## What Are Service Containers?

Service containers run alongside your job on the same virtual network. They’re ideal for databases, caches, message brokers, or any external service your tests require.

![The image shows a GitHub documentation page about service containers, explaining their use in connecting databases, web services, and other tools in workflows. The page includes navigation links and a note on using Docker containers with GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752875968/notes-assets/images/GitHub-Actions-Certification-Run-Unit-Testing-Job-using-a-Service/github-service-containers-documentation.jpg)

> [!important]
> **Note**
>
> Service containers are automatically networked with your job runner. You can refer to them by their service name (e.g., `mongo-db`) or `localhost` with exposed ports.

## Pre-built MongoDB Image on Docker Hub

We’ll use a custom MongoDB image tagged `non-prod`:

![The image shows a Docker Hub page displaying details of a Docker image named "siddharth67/mongo-db:non-prod," including its digest, OS/architecture, compressed size, and image layers.](https://kodekloud.com/kk-media/image/upload/v1752875969/notes-assets/images/GitHub-Actions-Certification-Run-Unit-Testing-Job-using-a-Service/docker-hub-siddharth67-mongo-db-details.jpg)

- Image name: `siddharth67/mongo-db:non-prod`
- Exposes port `27017`

## Updated Workflow with MongoDB Service

### Service Definition

| Service Name | Docker Image                    | Port Mapping  |
| ------------ | ------------------------------- | ------------- |
| mongo-db     | `siddharth67/mongo-db:non-prod` | `27017:27017` |

### Full Workflow YAML

```
on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'


env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ${{ matrix.operating_system }}
    strategy:
      matrix:
        nodejs_version: [18, 20]
        operating_system: [ubuntu-latest]
        exclude:
          - nodejs_version: 18
            operating_system: macos-latest


    services:
      mongo-db:
        image: siddharth67/mongo-db:non-prod
        ports:
          - 27017:27017


    env:
      MONGO_URI: 'mongodb://localhost:27017/superData'
      MONGO_USERNAME: non-prod-user
      MONGO_PASSWORD: non-prod-password


    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Install dependencies
        run: npm install


      - name: Run tests
        run: npm test
```

## Workflow Execution and Logs

When triggered, GitHub Actions creates a private Docker network, pulls the MongoDB image, and starts the service container:

```
Create local container network
/usr/bin/docker network create --label github_network_...
Pulling docker image siddharth67/mongo-db:non-prod
Starting service container mongo-db
/usr/bin/docker port <container_id> 27017/tcp -> 0.0.0.0:27017
```

![The image shows a GitHub Actions interface running a workflow for unit testing on Ubuntu, displaying job setup and log details.](https://kodekloud.com/kk-media/image/upload/v1752875970/notes-assets/images/GitHub-Actions-Certification-Run-Unit-Testing-Job-using-a-Service/github-actions-workflow-unit-testing-ubuntu.jpg)

Once healthy, the test steps connect using:

```
Run npm test
shell: /usr/bin/bash -e {0}
env:
  MONGO_URI: mongodb://localhost:27017/superData
  MONGO_USERNAME: non-prod-user
  MONGO_PASSWORD: non-prod-password
Solar System@6.7.6 test
mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit
Server successfully running on port - 3000
```

![The image shows a GitHub Actions workflow interface with a "modified mongo uri" workflow in progress, displaying unit testing, code coverage, and containerization steps.](https://kodekloud.com/kk-media/image/upload/v1752875971/notes-assets/images/GitHub-Actions-Certification-Run-Unit-Testing-Job-using-a-Service/github-actions-workflow-mongo-uri.jpg)

## Next Steps

- Extend this pattern to other tools: PostgreSQL, Redis, Elasticsearch, and more.
- Parameterize image tags or use official Docker Hub images for broader compatibility.
- Integrate code coverage or linting services in additional jobs.

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Hub – siddharth67/mongo-db:non-prod](https://hub.docker.com/r/siddharth67/mongo-db)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/34510b50-dfec-4ce5-94e3-5697973a445a)**
>
> Watch video content
