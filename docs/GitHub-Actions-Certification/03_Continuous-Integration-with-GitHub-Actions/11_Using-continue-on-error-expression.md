# Using continue on error expression - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Using-continue-on-error-expression)

---

## Table of Contents

- Using continue on error expression
  - Example Scenario
  - Step-Level continue-on-error
  - Job-Level continue-on-error
  - Workflow Summary
  - Links and References
  - Watch Video
    - Quick Comparison

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Using continue on error expression

---

title: "Using continue-on-error in GitHub Actions" description: "Learn how to apply continue-on-error at step and job level to prevent non-critical failures from stopping your GitHub Actions workflows."

---

GitHub Actions provides the `continue-on-error` keyword to help you manage non-critical failures in your CI/CD workflows. By default, a non-zero exit code stops the job and any downstream steps. With `continue-on-error`, you can:

- Skip failing steps while continuing the job
- Mark jobs as neutral instead of failed

![The image shows a GitHub Docs page about GitHub Actions, specifically focusing on the "continue-on-error" feature in workflow syntax. It includes an example of preventing a specific failing matrix job from causing a workflow run to fail.](https://kodekloud.com/kk-media/image/upload/v1752875979/notes-assets/images/GitHub-Actions-Certification-Using-continue-on-error-expression/github-actions-continue-on-error-example.jpg)

---

## Example Scenario

Imagine a **Code Coverage** job that runs tests and then validates coverage. If coverage falls below your threshold, the job fails immediately:

```
ERROR: Coverage for lines (88.88%) does not meet global threshold (90%)
File              % Stmts   % Branch   % Funcs  % Lines   Uncovered Line #s
All files         87.88      50         87.5    88.88     21,47-48,56
app.js            87.5       88.88     87.5     88.88     21,47-48,56
Error: Process completed with exit code 1.
```

Because of this exit code, the artifact upload step never runs.

---

## Step-Level continue-on-error

To allow subsequent steps to execute even when coverage fails, add `continue-on-error: true` to the **Check Code Coverage** step:

```
jobs:
  code-coverage:
    name: Code Coverage
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Check Code Coverage
        continue-on-error: true
        run: npm run coverage

      - name: Archive Test Result
        uses: actions/upload-artifact@v3
        with:
          name: Code-Coverage-Result
          path: coverage
          retention-days: 5
```

After this change, the coverage step logs an error but the workflow proceeds:

```
Run npm run coverage
► Solar System@6.7.6 coverage
    nyc --reporter cobertura --reporter lcov --reporter text --reporter json-summary mocha app-test.js --timeout 10000 --exit

Server successfully running on port - 3000

Planets API Suite
  Fetching Planet Details
    ✓ it should fetch a planet named Mercury (34ms)
    … (other tests)

ERROR: Coverage for lines (88.8%) does not meet global threshold (90%)
Uploading artifact Code-Coverage-Result
```

### Quick Comparison

| Scope      | Applies To      | Behavior                          |
| ---------- | --------------- | --------------------------------- |
| Step-Level | Individual step | Only that step can fail silently  |
| Job-Level  | Entire job      | Job marked neutral, continues all |

---

## Job-Level continue-on-error

For matrix-based workflows, you can skip failures across all steps by setting `continue-on-error` at the job level:

```
jobs:
  code-coverage:
    runs-on: ${{ matrix.os }}
    continue-on-error: ${{ matrix.experimental }}
    strategy:
      fail-fast: false
      matrix:
        node: [13, 14]
        os: [macos-latest, ubuntu-latest]
        experimental: [false]
        include:
          - node: 15
            os: ubuntu-latest
            experimental: true
    steps:
      # same steps as above…
```

> [!important]
> **Note**
>
> Setting `fail-fast: false` ensures that other matrix runs continue even if one instance fails.

When `matrix.experimental` is `true`, failures in that job are treated as neutral, allowing the workflow to complete.

---

## Workflow Summary

In the summary below, unit tests pass, the code coverage job finishes with an error annotation, and the **Code-Coverage-Result** artifact is uploaded:

![The image shows a GitHub Actions workflow summary with successful unit testing jobs and a code coverage job that completed with an error. It also lists artifacts produced during runtime, including "Code-Coverage-Result" and "Mocha-Test-Result."](https://kodekloud.com/kk-media/image/upload/v1752875980/notes-assets/images/GitHub-Actions-Certification-Using-continue-on-error-expression/github-actions-workflow-summary-testing.jpg)

---

## Links and References

- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Storing workflow data as artifacts](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/572c0a51-7286-42be-a9e8-a08edc54f440)**
>
> Watch video content
