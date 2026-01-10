# Run Unit Testing using Matrix Strategy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Run-Unit-Testing-using-Matrix-Strategy)

---

## Table of Contents

- Run Unit Testing using Matrix Strategy
  - Why Use a Matrix Strategy?
  - 1. Defining the Matrix
  - 2. Referencing Matrix Variables
  - 3. Running and Observing the Workflow
  - References
  - Watch Video
    - Matrix Combinations

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Run Unit Testing using Matrix Strategy

Leverage GitHub Actions’ matrix strategy to run your unit tests across multiple Node.js versions and operating systems in parallel. This ensures comprehensive coverage and compatibility without duplicating workflows.

## Why Use a Matrix Strategy?

- Parallel execution for faster feedback
- Broad runtime and OS compatibility
- Simplified maintenance by centralizing variations

## 1\. Defining the Matrix

First, configure your workflow triggers, environment variables, and a basic matrix under the `unit-testing` job. Here’s an example that hard-codes the runner and Node.js version:

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
    strategy:
      matrix:
        nodejs_version: [18, 19, 20]
        operating_system: [ubuntu-latest, macos-latest]
      exclude:
        - nodejs_version: 18
          operating_system: macos-latest
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install
```

> [!important]
> **Note**
>
> We define three Node.js versions and two OS targets. The `exclude` block omits Node.js 18 on macOS.

### Matrix Combinations

| Node.js Version | Operating System | Included? |
| --------------- | ---------------- | --------- |
| 18              | ubuntu-latest    | ✔️        |
| 18              | macos-latest     | ❌        |
| 19              | ubuntu-latest    | ✔️        |
| 19              | macos-latest     | ✔️        |
| 20              | ubuntu-latest    | ✔️        |
| 20              | macos-latest     | ✔️        |

## 2\. Referencing Matrix Variables

Next, update `runs-on` and the Node.js setup step to dynamically reference your matrix values. This allows every job to automatically select the correct OS and Node.js version:

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
    strategy:
      matrix:
        nodejs_version: [18, 19, 20]
        operating_system: [ubuntu-latest, macos-latest]
      exclude:
        - nodejs_version: 18
          operating_system: macos-latest
    runs-on: ${{ matrix.operating_system }}
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}

      - name: Install Dependencies
        run: npm install

      - name: Run Unit Tests
        run: npm test

      - name: Archive Test Results
        uses: actions/upload-artifact@v3
```

> [!important]
> **Note**
>
> Use `${{ matrix.nodejs_version }}` and `${{ matrix.operating_system }}` to automatically pick each configured combination.

For more details, see [GitHub Actions Matrix Strategy](https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs).

## 3\. Running and Observing the Workflow

Commit and push your changes with a descriptive message, for example:

```
git add .github/workflows/unit-tests.yml
git commit -m "chore: test on multiple OS using matrix strategy"
git push
```

GitHub Actions will spawn parallel jobs for each matrix entry (excluding the defined pair). Inspect each job under the **Actions** tab to view logs and artifacts.

![The image shows a GitHub Actions workflow interface, displaying a "test on multiple os using matrix" job in progress, with unit testing being conducted on various operating systems.](https://kodekloud.com/kk-media/image/upload/v1752876516/notes-assets/images/GitHub-Actions-Run-Unit-Testing-using-Matrix-Strategy/github-actions-matrix-job-testing.jpg)

![The image shows a GitHub Actions workflow interface with unit testing jobs for different operating systems, including Ubuntu and macOS. The highlighted job is "Unit Testing (20, ubuntu-latest)" which has succeeded.](https://kodekloud.com/kk-media/image/upload/v1752876517/notes-assets/images/GitHub-Actions-Run-Unit-Testing-using-Matrix-Strategy/github-actions-workflow-unit-testing.jpg)

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [actions/setup-node](https://github.com/actions/setup-node)
- [actions/upload-artifact](https://github.com/actions/upload-artifact)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/ea28d45a-eecc-4f64-a139-5b8e6431ca0b)**
>
> Watch video content
