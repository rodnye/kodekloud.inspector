# Run Code Coverage Job using a Container and Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Run-Code-Coverage-Job-using-a-Container-and-Service)

---

## Table of Contents

- Run Code Coverage Job using a Container and Service
  - 1. Recap: Unit Testing with a Service Container
  - 2. What Is a Job Container?
  - 3. Defining the Code Coverage Workflow
  - 4. Verify and Inspect Logs
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Run Code Coverage Job using a Container and Service

In this guide, you’ll learn how to set up a **code coverage** workflow in GitHub Actions by combining a job container with a MongoDB service container. This approach ensures all steps run in a consistent environment and can connect to your database service seamlessly.

## 1\. Recap: Unit Testing with a Service Container

Below is a sample job that runs unit tests in Node.js while using a MongoDB service container:

```
jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ${{ matrix.operating_system }}
    services:
      mongo-db:
        image: siddharth67/mongo-db:non-prod
        ports:
          - 27017:27017
        env:
          MONGO_URI: "mongodb://localhost:27017/superData"
          MONGO_USERNAME: non-prod-user
          MONGO_PASSWORD: non-prod-password
    strategy:
      matrix:
        nodejs_version: [18, 20]
        operating_system: [ubuntu-latest]
        exclude:
          - nodejs_version: 18
            operating_system: macos-latest
    steps:
      - uses: actions/checkout@v4
        name: Checkout Repository


      - uses: actions/setup-node@v3
        name: Setup Node.js ${{ matrix.nodejs_version }}
        with:
          node-version: ${{ matrix.nodejs_version }}


      - uses: actions/cache@v3
        name: Cache npm Dependencies
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


      - run: npm install
        name: Install Dependencies


      - run: npm test
        id: nodejs-unit-testing-step
        name: Run Unit Tests


      - if: always()
        uses: actions/upload-artifact@v3
        name: Archive Test Results
        with:
          name: Mocha-Test-Result
          path: test-results.xml
```

| Service Name | Image                         | Ports       | Environment Variables                           |
| ------------ | ----------------------------- | ----------- | ----------------------------------------------- |
| mongo-db     | siddharth67/mongo-db:non-prod | 27017:27017 | `MONGO_URI`, `MONGO_USERNAME`, `MONGO_PASSWORD` |

## 2\. What Is a Job Container?

A **job container** allows you to execute every step of a job inside a specified Docker image instead of on the default runner VM. This ensures your CI environment matches production more closely.

![The image shows a GitHub Docs page about "Running jobs in a container" using GitHub Actions, with an overview and example YAML code.](https://kodekloud.com/kk-media/image/upload/v1752876508/notes-assets/images/GitHub-Actions-Run-Code-Coverage-Job-using-a-Container-and-Service/github-actions-running-jobs-container.jpg) (See: https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container)

```
jobs:
  example-job:
    runs-on: ubuntu-latest
    container:
      image: node:18
    steps:
      - name: Verify Docker Environment
        run: |
          if [ -f ./dockerenv ]; then
            echo "Found dockerenv"
          else
            echo "No dockerenv"
          fi
```

> [!important]
> **Note**
>
> By specifying `container.image`, all subsequent steps run inside that Docker image. You no longer need a separate setup action for Node.js.

## 3\. Defining the Code Coverage Workflow

The following workflow runs a code coverage job in a Node.js 18 container and attaches a MongoDB service container for database operations:

```
name: CI
on:
  push:
    branches: [ main ]


jobs:
  code-coverage:
    name: Code Coverage
    runs-on: ubuntu-latest
    container:
      image: node:18
    services:
      mongo-db:
        image: siddharth67/mongo-db:non-prod
        options: --name mongo
    env:
      MONGO_URI: 'mongodb://mongo:27017/superData'
      MONGO_USERNAME: non-prod-user
      MONGO_PASSWORD: non-prod-password


    steps:
      - uses: actions/checkout@v4
        name: Checkout Repository


      - uses: actions/cache@v3
        name: Cache npm Dependencies
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


      - run: npm install
        name: Install Dependencies


      - run: npm run coverage
        name: Run Code Coverage
```

| Key Point                   | Details                                             |
| --------------------------- | --------------------------------------------------- |
| Job Container Image         | `node:18`                                           |
| Service Container           | `siddharth67/mongo-db:non-prod`                     |
| Service Network Alias       | `mongo` (used in `MONGO_URI`)                       |
| No `setup-node` Step Needed | Node is preinstalled within the job container image |

> [!important]
> **Warning**
>
> Make sure the service container name (`mongo`) matches the hostname used in `MONGO_URI`. Incorrect naming can lead to connection failures.

## 4\. Verify and Inspect Logs

After committing and pushing your workflow, navigate to the **Actions** tab in GitHub. You should see both the **Unit Testing** and **Code Coverage** jobs running in parallel.

![The image shows a GitHub Actions workflow interface with jobs for unit testing and code coverage in progress. It includes a visual representation of the workflow steps and their status.](https://kodekloud.com/kk-media/image/upload/v1752876510/notes-assets/images/GitHub-Actions-Run-Code-Coverage-Job-using-a-Container-and-Service/github-actions-workflow-unit-testing.jpg)

![The image shows a GitHub Actions workflow interface with a list of jobs and steps for code coverage, indicating successful completion of tasks like setting up a job, initializing containers, and checking out the repository.](https://kodekloud.com/kk-media/image/upload/v1752876511/notes-assets/images/GitHub-Actions-Run-Code-Coverage-Job-using-a-Container-and-Service/github-actions-workflow-code-coverage.jpg)

In the logs, you’ll find Docker commands demonstrating how GitHub Actions starts both the job and service containers:

```
/usr/bin/docker start 99621c88b3e11e3a36090a1a87149e466bf5e8479ab5a54185f073369248
/usr/bin/docker create --name mongo --network github_network \
  -e GITHUB_ACTIONS=true -e CI=true sidharth67/mongo-db:non-prod
```

## Links and References

- [Running jobs in a container (GitHub Docs)](https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container)
- [GitHub Actions: Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/dfbd79fa-3b31-4fc8-bf79-0fa9ff8855ae)**
>
> Watch video content
