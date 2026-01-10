# Github Action Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Github-Action-Expressions)

---

## Table of Contents

- Github Action Expressions
  - Sample Workflow Overview
  - Core Expressions in GitHub Actions
  - Fixing the Sample Workflow
  - Links and References
  - Watch Video
    - 1. Conditional Execution with if
    - 2. Allowing Failures with continue-on-error
    - 3. Status Check Functions

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Github Action Expressions

In this guide, we’ll dive into advanced expression syntax for GitHub Actions to build more flexible CI/CD pipelines. You’ll learn how to:

- Control step and job execution with `if` conditions
- Allow workflows to continue after failures using `continue-on-error`
- Inspect outcomes with status-check functions (`success()`, `failure()`, etc.)

Before we explore expressions, let’s review a sample workflow to see common pitfalls.

---

## Sample Workflow Overview

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
          export apikey=$3CuR3-t0k3N
          echo "Running Tests ... ..."
      - name: Testing on Windows
        run: |
          Set-Variable -Name "apikey" -Value "$3CuR3-t0k3N"
          echo "Running Tests ... ..."
  reports:
    needs: testing
    runs-on: ubuntu-latest
    steps:
      - name: Upload Report to AWS S3
        run: echo "Uploading reports ... ..." && exit 1
  deploy:
    runs-on: ubuntu-latest
    needs: reports
```

**Jobs Breakdown**

1.  **testing**: Runs tests on both Windows and Ubuntu, setting an `apikey`.
2.  **reports**: Uploads test results to [AWS S3](https://aws.amazon.com/s3) and deliberately fails.
3.  **deploy**: Depends on the `reports` job.

Because the Ubuntu runner uses Bash’s `export` (and PowerShell commands won’t execute on Linux), the `testing` job fails for one matrix entry, blocking all downstream jobs.

> [!important]
> **Warning**
>
> Storing secrets directly in your workflow can expose them in logs. Use [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets) instead.

---

## Core Expressions in GitHub Actions

Expressions let you dynamically control when a step or job runs. There are three main categories:

1.  Conditional execution with `if`
2.  Error handling with `continue-on-error`
3.  Status inspection functions (`success()`, `failure()`, etc.)

---

### 1\. Conditional Execution with `if`

Use `if` to evaluate expressions based on contexts, comparisons, and built-in functions:

```
steps:
  - name: Run unit tests only on Linux
    if: runner.os == 'Linux'
    run: ./run-tests.sh


jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: ./deploy.sh
```

- `runner.os`, `github.ref`, and other [contexts](https://docs.github.com/actions/learn-github-actions/contexts) provide metadata.
- Combine expressions using `&&`, `||`, `==`, `!=`, and functions.

---

### 2\. Allowing Failures with `continue-on-error`

By default, a failed step stops its job. Enable `continue-on-error` to proceed even if a step or job fails:

```
# At the step level
steps:
  - name: Optional Lint
    continue-on-error: true
    run: npm run lint


# At the job level
jobs:
  optional-report:
    continue-on-error: true
    runs-on: ubuntu-latest
    steps:
      - name: Generate Report
        run: ./generate-report.sh
```

> [!important]
> **Note**
>
> Use `continue-on-error` carefully—it can mask genuine failures if overused.

---

### 3\. Status Check Functions

Inspect the results of prior steps or jobs with these functions:

| Function    | Description                                          |
| ----------- | ---------------------------------------------------- |
| success()   | Returns `true` if **all** prior steps/jobs succeeded |
| failure()   | Returns `true` if **any** prior step/job failed      |
| cancelled() | Returns `true` if the workflow or job was cancelled  |
| always()    | Returns `true` regardless of prior outcomes          |

Example usage:

```
steps:
  - name: Build
    run: npm run build


  - name: Unit Tests
    run: npm test
    if: success()


  - name: Notify on Cancellation
    run: echo "Workflow canceled"
    if: cancelled()


  - name: Final Cleanup
    run: ./cleanup.sh
    if: always()
```

---

## Fixing the Sample Workflow

Let’s apply these expressions to our initial example so each test runs only on its matching OS, and downstream jobs aren’t blocked by failures.

```
on: push


jobs:
  testing:
    strategy:
      matrix:
        os: ['windows-latest', 'ubuntu-latest']
    runs-on: ${{ matrix.os }}
    steps:
      - name: Linux Tests
        if: runner.os == 'Linux'
        run: |
          export apikey='3$cuR3-t0k3N'
          echo "Running Tests on Ubuntu..."


      - name: Windows Tests
        if: runner.os == 'Windows'
        run: |
          Set-Variable -Name "apikey" -Value "3$cuR3-t0k3N"
          echo "Running Tests on Windows..."


  reports:
    needs: testing
    runs-on: ubuntu-latest
    continue-on-error: true
    steps:
      - name: Upload Report to AWS S3
        run: echo "Uploading reports..." && exit 1


  deploy:
    needs: reports
    runs-on: ubuntu-latest
    steps:
      - name: Deployment Step
        run: echo "Deploying application..."
```

- The two `if` checks skip non-matching OS steps, ensuring `testing` always passes.
- `continue-on-error: true` on `reports` lets `deploy` run even if the upload step fails.

---

## Links and References

- [GitHub Actions Expressions](https://docs.github.com/actions/learn-github-actions/expressions)
- [Contexts and expressions syntax](https://docs.github.com/actions/learn-github-actions/contexts)
- [Encrypted Secrets in GitHub](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [AWS S3 Documentation](https://aws.amazon.com/s3/)
- [CI/CD Best Practices](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/d408309c-0989-4998-9bbe-72d61e9934c3)**
>
> Watch video content
