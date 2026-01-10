# Project Status Meeting 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Project-Status-Meeting-2)

---

## Table of Contents

- Project Status Meeting 2
  - 1. Overview
  - 2. Issue Summary
  - 3. Root Cause
  - 4. Recommended Solution
  - 5. Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Project Status Meeting 2

Welcome to the second project status meeting. In this update, we’ll examine the production database downtime caused by our GitHub Actions workflows and outline a remediation plan.

## 1\. Overview

- **Incident**: Production MongoDB became unresponsive while running CI workflows.
- **Impact**: All services depending on the database experienced latency or downtime.
- **Goal**: Redirect test and coverage jobs to an isolated database instance using GitHub service containers.

---

## 2\. Issue Summary

After completing the first four tasks, Alice was called into an emergency meeting. Investigation of the workflow YAML revealed that both the unit testing and code coverage jobs were pointing to the live production database:

```
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
        key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


    - name: Install Dependencies
      run: npm install
```

![The image shows a GitHub Actions workflow summary for a project, displaying successful completion of unit testing, code coverage, and containerization jobs. The workflow is named "solar-system.yml" and includes details like job durations and annotations.](https://kodekloud.com/kk-media/image/upload/v1752876503/notes-assets/images/GitHub-Actions-Project-Status-Meeting-2/github-actions-workflow-solar-system.jpg)

> [!important]
> **Warning**
>
> Running tests and coverage jobs against a production database can lead to data corruption, unexpected downtime, and security risks. Always isolate your CI environment.

---

## 3\. Root Cause

The workflow’s global environment variables were configured to use the production `MONGO_URI`:

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

      - name: Setup NodeJS Version - ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}
```

Every job inherited the production connection string, causing all test traffic to hit the live cluster.

---

## 4\. Recommended Solution

To prevent future outages, we recommend leveraging **GitHub Actions service containers**. By attaching a MongoDB container to each job, tests and coverage reports will run against an ephemeral database instance:

1.  **Define a MongoDB service** under each job.
2.  **Override `MONGO_URI`** to point to `mongodb://localhost:27017/testdb`.
3.  **Isolate credentials** and avoid global production variables.

> [!important]
> **Note**
>
> Service containers spin up alongside your job and provide an isolated database at `localhost`. No changes to production credentials are needed.

Next, we reviewed our project tasks and priorities:

![The image is a project status meeting table listing tasks, their priority, assigned person, status, and comments/issues. Some tasks are completed, some are in progress, and others have not started.](https://kodekloud.com/kk-media/image/upload/v1752876506/notes-assets/images/GitHub-Actions-Project-Status-Meeting-2/project-status-meeting-tasks-table.jpg)

---

## 5\. Next Steps

| Step                                | Action                                                                                    | Reference                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1\\. Update Workflow                | Add `services: mongodb` and override `MONGO_URI` in CI jobs                               | https://docs.github.com/actions/using-containerized-services/about-service-containers     |
| 2\\. Validate in Staging            | Run full test suite against the service container before merging into `main`              | —                                                                                         |
| 3\\. Monitor Post-Deployment        | Use alerts and logs to ensure no test traffic reaches production                          | https://docs.github.com/actions/managing-workflow-runs/managing-and-viewing-workflow-runs |
| 4\\. Clean Up Environment Variables | Remove global `MONGO_URI` from workflow-level `env` block to prevent accidental overrides | —                                                                                         |

---

## Links and References

- [GitHub Actions Service Containers](https://docs.github.com/actions/using-containerized-services/about-service-containers)
- [Managing Workflow Runs](https://docs.github.com/actions/managing-workflow-runs)
- [MongoDB Official Docs](https://docs.mongodb.com/)

Thank you for attending this meeting. Let’s implement these changes to ensure reliable CI pipelines and a stable production environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/2856ceb2-9290-40ed-adbb-05108a1d1c5a)**
>
> Watch video content
