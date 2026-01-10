# What are Service Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/What-are-Service-Containers)

---

## Table of Contents

- What are Service Containers
  - Basic Workflow Without Service Containers
  - Adding a MongoDB Service Container
  - Common Service Containers for CI Workflows
  - Running Steps Inside a Job Container with Services
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# What are Service Containers

Service containers in GitHub Actions let you spin up Docker containers alongside your workflow jobs, providing on-demand services—such as databases, caches, or message queues—for your CI/CD pipelines. By defining services in your workflow YAML, you can run integration and end-to-end tests without managing external infrastructure.

## Basic Workflow Without Service Containers

The simplest workflow runs tests immediately after code checkout and dependency installation. It’s ideal for unit tests that don’t require external services.

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Set Up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        run: npm test
```

> [!important]
> **Note**
>
> This workflow is perfect for fast-running unit tests that do not depend on external databases or caches. If your tests require a service, see the next section.

## Adding a MongoDB Service Container

To test against a MongoDB database, add a `services` section. This example maps the container’s default MongoDB port to a host port on the runner:

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


      - name: Set Up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        run: |
          export MONGODB_HOST=localhost
          export MONGODB_PORT=12345
          npm test
```

Here’s what happens:

1.  **Service Container**: `mongo:latest` runs as `mongodb-service`.
2.  **Port Mapping**: Container port `27017` is mapped to runner port `12345`.
3.  **Environment Variables**: Tests connect to `localhost:12345`.

## Common Service Containers for CI Workflows

| Service    | Description              | Docker Image   |
| ---------- | ------------------------ | -------------- |
| MongoDB    | NoSQL document database  | `mongo:latest` |
| PostgreSQL | Relational SQL database  | `postgres:13`  |
| Redis      | In-memory cache          | `redis:6`      |
| MySQL      | Widely-used SQL database | `mysql:8`      |

> [!important]
> **Warning**
>
> Be mindful of resource limits on GitHub-hosted runners. Running multiple heavyweight services can lead to slower startup times or timeouts.

## Running Steps Inside a Job Container with Services

You can isolate your build environment by specifying a job container and still link to service containers through the Docker network:

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    runs-on: ubuntu-latest


    container:
      image: ghcr.io/node-and-packages:20


    services:
      mongodb-service:
        image: mongo:latest


    env:
      MONGODB_HOST: mongodb-service
      MONGODB_PORT: 27017


    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        run: npm test
```

Key points:

- **Job Container** runs every step inside `ghcr.io/node-and-packages:20`.
- **Service Container** `mongodb-service` is discoverable on the default Docker bridge network.
- **Networking** uses the service container’s hostname (`mongodb-service`) without port mapping.

## Links and References

- [GitHub Actions: Services](https://docs.github.com/actions/using-containerized-services/about-service-containers)
- [GitHub Actions: Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Docker Hub](https://hub.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/5e1cfa1f-fe20-4364-9b39-c809dc439204)**
>
> Watch video content
