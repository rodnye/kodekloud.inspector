# Workflow Configure Code Coverage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Workflow-Configure-Code-Coverage)

---

## Table of Contents

- Workflow Configure Code Coverage
  - 1. Reference: Unit Testing Job
  - 2. Add a Parallel Code Coverage Job
  - 4. Observe Workflow Runs
  - 5. Handling Coverage Threshold Failures
  - 6. Next Steps
  - Links and References
  - Watch Video
    - 3. Job Comparison

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Workflow Configure Code Coverage

Extend your GitHub Actions CI/CD pipeline to include code coverage analysis alongside unit testing. This guide shows how to:

- Mirror your existing unit testing setup
- Add a parallel **code-coverage** job
- Archive coverage reports even on failures

## 1\. Reference: Unit Testing Job

Here’s the baseline `unit-testing` job in `.github/workflows/ci.yml`:

```
env:
  MONGO_URI: "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
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
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Install dependencies
        run: npm install


      - name: Run unit tests
        run: npm test


      - name: Archive test results
        uses: actions/upload-artifact@v3
        with:
          name: Mocha-Test-Result
          path: test-results.xml
          retention-days: 5
```

## 2\. Add a Parallel Code Coverage Job

Below is the `code-coverage` job that runs side by side with your unit tests:

```
  code-coverage:
    name: Code Coverage
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Setup Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: 18


      - name: Install dependencies
        run: npm install


      - name: Run coverage
        run: npm run coverage


      - name: Archive coverage report
        uses: actions/upload-artifact@v3
        with:
          name: Code-Coverage-Result
          path: coverage
          retention-days: 5
```

### 3\. Job Comparison

| Job           | Node.js Version            | OS Matrix                   | CLI Command        | Artifact              |
| ------------- | -------------------------- | --------------------------- | ------------------ | --------------------- |
| Unit Testing  | 18, 19, 20 (excl macOS 18) | ubuntu-latest, macos-latest | `npm test`         | `test-results.xml`    |
| Code Coverage | 18                         | ubuntu-latest               | `npm run coverage` | `coverage/` directory |

## 4\. Observe Workflow Runs

After pushing your changes, both jobs appear in the GitHub Actions UI:

![The image shows a GitHub Actions page for a project called "Solar System Workflow," displaying a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752875993/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Code-Coverage/github-actions-solar-system-workflow.jpg)

## 5\. Handling Coverage Threshold Failures

If coverage falls below your defined threshold, the `npm run coverage` step will fail:

```
> my-app@1.0.0 coverage
> nyc --reporter=text --reporter=lcov mocha "test/**/*.js"


ERROR: Coverage for lines (88.88%) does not meet global threshold (90%)
File                     % Stmts % Branch % Funcs % Lines Uncovered Line #
-----------------------------------------------------------------------
All files                88.88    87.5     87.5   88.88  21,47-48,56
app.js                   88.88    87.5     87.5   88.88  21,47-48,56
Error: Process completed with exit code 1.
```

![The image shows a GitHub Actions workflow summary with successful unit tests but a failed code coverage check, as the coverage did not meet the required threshold.](https://kodekloud.com/kk-media/image/upload/v1752875995/notes-assets/images/GitHub-Actions-Certification-Workflow-Configure-Code-Coverage/github-actions-workflow-summary-failed-coverage.jpg)

> [!important]
> **Warning**
>
> By default, a failing coverage step halts the workflow and skips artifact upload.
> To ensure your coverage report is always archived, consider:
>
> - Adding `continue-on-error: true` to the coverage step
> - Lowering your coverage thresholds in `nyc` configuration

## 6\. Next Steps

- Explore [GitHub Actions Documentation](https://docs.github.com/actions) for advanced workflows
- Configure [NYC thresholds](https://github.com/istanbuljs/nyc#configuring-nyc) in `package.json`
- Integrate with [Codecov](https://docs.codecov.com/) or other coverage services

## Links and References

- [GitHub Actions – CI/CD Workflows](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions)
- [Mocha Testing Framework](https://mochajs.org/)
- [NYC (Istanbul) Coverage Tool](https://github.com/istanbuljs/nyc)
- [Uploading Artifacts in GitHub Actions](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/56c9876f-68c6-40c9-925c-425b68a85d0c)**
>
> Watch video content
