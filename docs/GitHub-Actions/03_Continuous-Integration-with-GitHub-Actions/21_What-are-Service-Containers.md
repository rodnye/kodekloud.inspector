# What are Service Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/What-are-Service-Containers)

---

## Table of Contents

- What are Service Containers
  - Table of Contents
  - Basic Workflow Without Services
  - How to Add a Service Container
  - Running Jobs Inside a Container with Services
  - Service Containers Overview
  - Summary
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# What are Service Containers

Service containers are Docker containers that provide a portable way to host supporting services—like databases or caches—for your GitHub Actions workflows. They enable your jobs to spin up dependencies on demand, ensuring consistency across environments.

## Table of Contents

1.  [Basic Workflow Without Services](#basic-workflow-without-services)
2.  [How to Add a Service Container](#how-to-add-a-service-container)
3.  [Running Jobs Inside a Container with Services](#running-jobs-inside-a-container-with-services)
4.  [Service Containers Overview](#service-containers-overview)
5.  [Summary](#summary)
6.  [Links and References](#links-and-references)

## Basic Workflow Without Services

This example workflow checks out code, installs Node.js, pulls dependencies, and runs tests without any external services.

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        run: npm test
```

## How to Add a Service Container

To include a service container—such as MongoDB—you define it under the `services` key. Map the container port to a runner port, then connect to it via `localhost`.

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    runs-on: ubuntu-latest
    services:
      mongodb-service:
        image: mongo:latest
        ports:
          - 12345:27017


    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        env:
          MONGODB_HOST: localhost
          MONGODB_PORT: 12345
        run: npm test
```

In this configuration:

- The GitHub runner uses Docker to start a MongoDB container named `mongodb-service`.
- Port `27017` inside the container is exposed on port `12345` of the runner.
- Tests connect to `localhost:12345` to reach MongoDB.

> [!important]
> **Note**
>
> Always make sure the port you map on the runner (e.g., `12345`) is not in use by other services.

## Running Jobs Inside a Container with Services

You can run the entire job in a container and still attach service containers alongside it. Below, a Node.js container runs the job, and MongoDB is available via hostname.

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    runs-on: ubuntu-latest


    # Primary job container
    container:
      image: ghcr.io/node-and-packages:20


    # Additional service container
    services:
      mongodb-service:
        image: mongo:latest


    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        env:
          MONGODB_HOST: mongodb-service
          MONGODB_PORT: 27017
        run: npm test
```

Key points:

- The job runs inside `ghcr.io/node-and-packages:20`.
- `mongodb-service` starts on the same Docker network.
- Hostname `mongodb-service` resolves to the MongoDB container on port `27017`.

> [!important]
> **Warning**
>
> Service containers share a user-defined bridge network. Do not rely on `localhost` inside the primary container; use the defined service hostname.

## Service Containers Overview

| Feature             | Description                                           | Example                                                |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| Port Mapping        | Expose container ports to the runner or other jobs.   | `ports: [ 12345:27017 ]`                               |
| Hostname Resolution | Services are reachable by their service key.          | `MONGODB_HOST: mongodb-service`                        |
| Custom Images       | Use specific versions or private registry images.     | `image: myregistry/mongo:5.0`                          |
| Network Isolation   | Runs in a user-defined bridge for security and speed. | Containers cannot access runner network unless mapped. |

## Summary

Service containers in GitHub Actions allow you to:

- Spin up databases, caches, or message queues alongside your workflows.
- Connect to services via mapped ports or hostnames.
- Run jobs directly on a runner or inside a dedicated container while still leveraging supporting services.

By integrating service containers, you ensure consistent, reproducible test environments for your CI/CD pipelines.

## Links and References

- [GitHub Actions: Service Containers](https://docs.github.com/actions/using-containerized-services/about-service-containers)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/4617a384-406c-49dd-a059-9f36d2b8588d)**
>
> Watch video content
