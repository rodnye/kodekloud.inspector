# Project Status Meeting 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Project-Status-Meeting-2)

---

## Table of Contents

- Project Status Meeting 2
  - 1. Issue Discovery
  - 2. Root Cause
  - 3. Refactoring Strategy
  - 4. Project Tasks Overview
  - 5. Next Steps
  - References
  - Watch Video
    - 1.1 Current Test & Coverage Steps
    - 3.1 Define a MongoDB Service in GitHub Actions

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Project Status Meeting 2

Welcome to the second project status meeting. In this session, we’ll review how our GitHub Actions workflow began impacting the production MongoDB cluster and outline the steps to isolate our test environments.

---

## 1\. Issue Discovery

After completing the first four tasks, Alice was summoned to an urgent meeting. The team noticed that their production MongoDB cluster was intermittently unresponsive and slow ever since they integrated unit-testing and code-coverage into their CI pipeline.

### 1.1 Current Test & Coverage Steps

Both the **unit-testing** and **code-coverage** jobs are inadvertently pointing to the production database:

```
# Shared steps pointing at production DB
- name: Install Dependencies
  run: npm install


- name: Unit Testing
  id: nodejs-unit-testing-step
  run: npm test


- name: Archive Test Result
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: Mocha-Test-Result
    path: test.results.xml


code-coverage:
  name: Code Coverage
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Repository
      uses: actions/checkout@v4


    - name: Setup NodeJS Version - 18
      uses: actions/setup-node@v3
      with:
        node-version: 18


    - name: Cache NPM dependencies
      uses: actions/cache@v3
      with:
        path: node_modules
        key: ${{ runner.os }}-node-modules-{{ hashFiles('package-lock.json') }}


    - name: Install Dependencies
      run: npm install
```

![The image shows a GitHub Actions workflow summary for a project, displaying successful completion of unit testing, code coverage, and containerization jobs. The workflow is named "solar-system.yml" and includes details like job durations and annotations.](https://kodekloud.com/kk-media/image/upload/v1752875955/notes-assets/images/GitHub-Actions-Certification-Project-Status-Meeting-2/github-actions-workflow-summary-solar-system.jpg)

---

## 2\. Root Cause

The workflow’s global `env` block defines production credentials, causing both testing jobs to connect to the live database:

```
name: Solar System Workflow


on:
  workflow_dispatch:
  push:
    branches:
      - main
      - feature/*


env:
  MONGO_URI: mongodb+srv://supercluster.d83ji.mongodb.net/superData
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing:
    name: Unit Testing
    strategy:
      matrix:
        nodejs_version: [18, 20]
        operating_system: [ubuntu-latest]
        exclude:
          - nodejs_version: 18
            operating_system: macos-latest
    runs-on: ${{ matrix.operating_system }}
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        run: nvm install ${{ matrix.nodejs_version }}
```

> [!important]
> **Warning**
>
> Never run tests against your production database. Doing so risks data corruption and performance degradation.

---

## 3\. Refactoring Strategy

To prevent production downtime, Alice proposed spinning up a dedicated MongoDB service container inside the CI job. This gives each job its own ephemeral database instance, fully isolated from production.

### 3.1 Define a MongoDB Service in GitHub Actions

Add a `services` section under each job to start a MongoDB Docker container:

```
jobs:
  unit-testing:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_DATABASE: testdb
    steps:
      - uses: actions/checkout@v4
      - name: Wait for MongoDB to start
        run: |
          for i in {1..10}; do
            nc -z localhost 27017 && break
            echo "Waiting for MongoDB…"
            sleep 5
          done
      - name: Install Dependencies
        run: npm install
      - name: Run Unit Tests
        env:
          MONGO_URI: mongodb://localhost:27017/testdb
        run: npm test
```

| Field    | Description                                        |
| -------- | -------------------------------------------------- |
| services | Defines Docker containers to run alongside the job |
| image    | Docker image for the service (e.g., `mongo:6.0`)   |
| ports    | Host-to-container port mappings                    |
| env      | Initialization variables for the container         |

> [!important]
> **Note**
>
> Using an isolated service container ensures your CI jobs are reproducible and safe. You can apply the same pattern for integration tests, Redis, PostgreSQL, and more.

---

## 4\. Project Tasks Overview

![The image is a project status meeting table listing tasks, their priorities, assigned person (Alice), status, and comments/issues. Some tasks are completed, some are in progress, and others have not started.](https://kodekloud.com/kk-media/image/upload/v1752875956/notes-assets/images/GitHub-Actions-Certification-Project-Status-Meeting-2/project-status-meeting-tasks-table.jpg)

---

## 5\. Next Steps

1.  Update all testing and coverage jobs to use in-job MongoDB services.
2.  Remove production credentials from the global `env` scope.
3.  Validate workflow changes on a feature branch before merging to `main`.

Thank you for joining this meeting. Let’s keep our production environment healthy by isolating CI dependencies!

---

## References

- [GitHub Actions: Service containers](https://docs.github.com/en/actions/using-jobs/using-a-service-container)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [GitHub Actions Cache](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/36c349a1-6556-44f0-9d89-3f76f204c271)**
>
> Watch video content
