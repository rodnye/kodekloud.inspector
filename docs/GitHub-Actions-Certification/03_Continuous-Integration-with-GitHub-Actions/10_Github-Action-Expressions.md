# Github Action Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Github-Action-Expressions)

---

## Table of Contents

- Github Action Expressions
  - Sample Workflow
  - Conditional Execution with if
  - Ignoring Failures with continue-on-error
  - Status Check Functions
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Github Action Expressions

This article explores how to use expressions in [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/expressions) to control the execution flow of steps and jobs. We cover:

- Conditional execution with `if`
- Ignoring failures using `continue-on-error`
- Built-in status check functions

## Sample Workflow

The following workflow runs tests on both Ubuntu and Windows, uploads a report to AWS S3 (failing intentionally), and then deploys if the report step completes.

```
on: push

jobs:
  testing:
    strategy:
      matrix:
        os: ['windows-latest', 'ubuntu-latest']
    runs-on: ${{ matrix.os }}
    steps:
      - name: Testing on Ubuntu
        run: |
          export apikey=3$CuR3-t0k3N
          echo "Running Tests on Ubuntu..."

      - name: Testing on Windows
        run: |
          Set-Variable -Name "apikey" -Value "3$CuR3-t0k3N"
          echo "Running Tests on Windows..."

  reports:
    needs: testing
    runs-on: ubuntu-latest
    steps:
      - name: Upload Report to AWS S3
        run: |
          echo "Uploading reports..." && exit 1

  deploy:
    needs: reports
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Application
        run: echo "Deploying application..."
```

In this example:

- Ubuntu tests pass.
- Windows commands fail on Linux, causing the `testing` job to abort.
- As a result, `reports` and `deploy` are skipped.

## Conditional Execution with `if`

Use `if` to run steps or jobs only when a condition is met. You can reference contexts like `runner.os`, literals, and functions:

```
jobs:
  testing:
    strategy:
      matrix:
        os: ['windows-latest', 'ubuntu-latest']
    runs-on: ${{ matrix.os }}
    steps:
      - name: Testing on Ubuntu
        if: runner.os == 'Linux'
        run: |
          export apikey=3$CuR3-t0k3N
          echo "Running Tests on Ubuntu..."

      - name: Testing on Windows
        if: runner.os == 'Windows'
        run: |
          Set-Variable -Name "apikey" -Value "3$CuR3-t0k3N"
          echo "Running Tests on Windows..."
```

Each step only executes on its intended OS, preventing unsupported commands from running.

## Ignoring Failures with `continue-on-error`

By default, a failed step aborts its job. To let a job succeed even if a step fails, set `continue-on-error: true`. Downstream jobs defined with `needs` will still run if the parent job completes.

> [!important]
> **Note**
>
> The `continue-on-error` attribute applies at the **step** level, not at the job level.

```
on: push

jobs:
  testing:
    strategy:
      matrix:
        os: ['windows-latest', 'ubuntu-latest']
    runs-on: ${{ matrix.os }}
    steps:
      - name: Testing on Linux
        if: runner.os == 'Linux'
        run: |
          export apikey=3$CuR3-t0k3N
          echo "Running Tests on Ubuntu..."

      - name: Testing on Windows
        if: runner.os == 'Windows'
        run: |
          Set-Variable -Name "apikey" -Value "3$CuR3-t0k3N"
          echo "Running Tests on Windows..."

  reports:
    needs: testing
    runs-on: ubuntu-latest
    steps:
      - name: Upload Report to AWS S3
        run: |
          echo "Uploading reports..." && exit 1
        continue-on-error: true

  deploy:
    needs: reports
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Application
        run: echo "Deploying application..."
```

Here, even though the upload step fails, `reports` completes successfully and triggers the `deploy` job.

## Status Check Functions

GitHub Actions provides built-in functions to inspect previous outcomes:

| Function      | Returns `true` when…                    |
| ------------- | --------------------------------------- |
| `success()`   | all prior steps and jobs have succeeded |
| `failure()`   | any prior step or job has failed        |
| `cancelled()` | the workflow run was cancelled          |
| `always()`    | always (useful for cleanup steps)       |

Example:

```
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Build
        run: npm run build

      - name: Test
        run: npm test
        if: success()

      - name: Notify on Failure
        run: echo "Tests failed!"
        if: failure()

      - name: Cleanup
        run: echo "Cleaning up environment..."
        if: always()
```

These functions help you create resilient, conditional workflows that adapt to your CI/CD pipeline’s status.

## Links and References

- [GitHub Actions Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)
- [GitHub Actions Contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [AWS S3](https://aws.amazon.com/s3/)
- [Workflow Syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/847fd530-9da2-4011-b69d-2d04ce128dbd)**
>
> Watch video content
