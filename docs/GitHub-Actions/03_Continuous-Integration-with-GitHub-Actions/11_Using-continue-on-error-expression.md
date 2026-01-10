# Using continue on error expression - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Using-continue-on-error-expression)

---

## Table of Contents

- Using continue on error expression
  - Continue-on-error at the Step Level
  - Continue-on-error at the Job Level
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Using continue on error expression

GitHub Actions’ `continue-on-error` expression lets you prevent failures in a specific step or an entire job from aborting your workflow. You can use this setting to:

- Handle non-critical errors without stopping downstream steps.
- Upload logs and artifacts even when tests or checks fail.
- Experiment with unstable configurations in a matrix without blocking the run.

Below is an overview of how `continue-on-error` behaves at each level:

| Level | Scope                        | Typical Use Case                                          |
| ----- | ---------------------------- | --------------------------------------------------------- |
| Step  | A single step within a job   | Allow a flaky test or coverage threshold to fail “softly” |
| Job   | The entire job in a workflow | Let an experimental matrix configuration fail quietly     |

---

## Continue-on-error at the Step Level

When you set `continue-on-error: true` on a step, a non-zero exit code won’t fail the job. This is ideal for allowing post-test uploads or cleanup steps to run even if tests or coverage checks fail.

![The image shows a GitHub Docs page about GitHub Actions, specifically focusing on the "continue-on-error" feature in workflow syntax. It includes an example of preventing a specific failing matrix job from causing a workflow run to fail.](https://kodekloud.com/kk-media/image/upload/v1752876520/notes-assets/images/GitHub-Actions-Using-continue-on-error-expression/github-actions-continue-on-error-example.jpg)

In this example, the **Code Coverage** job executes tests, enforces a coverage threshold, and then uploads the report regardless of success or failure.

```
# .github/workflows/coverage.yml
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

      - name: Archive Coverage Report
        uses: actions/upload-artifact@v3
        with:
          name: Code-Coverage-Result
          path: coverage
          retention-days: 5
```

> [!important]
> **Note**
>
> By enabling `continue-on-error` on the coverage step, your workflow still uploads the coverage report even if the threshold isn’t met.

Example output when coverage fails:

```
> nyc --reporter cobertura --reporter lcov --reporter text --reporter json-summary mocha app-test.js --timeout 10000 --exit

ERROR: Coverage for lines (88.8%) does not meet global threshold (90%)
...
Error: Process completed with exit code 1
```

Despite the exit code, the **Archive Coverage Report** step proceeds and your artifact is saved.

---

## Continue-on-error at the Job Level

Applying `continue-on-error` on a job prevents that job from failing the entire workflow run. This is useful for matrix jobs where you want an “experimental” axis to fail quietly.

```
# .github/workflows/main.yml
jobs:
  test:
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
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node }}

      # ... additional test steps ...
```

Here, any job with `matrix.experimental: true` will not block the workflow on failure.

Below is the workflow summary, showing completed unit tests, a coverage job with an error, and the uploaded artifacts:

![The image shows a GitHub Actions workflow summary with completed unit testing jobs and a code coverage job that has an error. It also lists artifacts produced during runtime, including "Code-Coverage-Result" and "Mocha-Test-Result."](https://kodekloud.com/kk-media/image/upload/v1752876521/notes-assets/images/GitHub-Actions-Using-continue-on-error-expression/github-actions-workflow-summary-testing-errors.jpg)

---

## Links and References

- [GitHub Actions Workflow Syntax: continue-on-error](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idcontinue-on-error)
- [GitHub Actions: Uploading Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [nyc Code Coverage Tool](https://github.com/istanbuljs/nyc)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/e5c6f579-1588-48b4-a3d5-e5710b439dea)**
>
> Watch video content
