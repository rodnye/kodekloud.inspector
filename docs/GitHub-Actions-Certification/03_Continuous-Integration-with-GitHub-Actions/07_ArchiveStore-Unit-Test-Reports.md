# ArchiveStore Unit Test Reports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/ArchiveStore-Unit-Test-Reports)

---

## Table of Contents

- ArchiveStore Unit Test Reports
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# ArchiveStore Unit Test Reports

In this lesson, we’ll archive JUnit-format Mocha test reports in GitHub Actions using `actions/upload-artifact`. Previously, our workflow ran unit tests successfully but didn’t persist the generated XML report:

```
> Run npm test
> Solar System@6.7.6 test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


Server successfully running on port - 3000
```

Locally, the `mocha-junit-reporter` creates a `test-results.xml` file in your project root. For example:

```
<testsuite name="it should fetch Ready Status" timestamp="2023-10-12T10:34:16" tests="1" file="F:\KodeKloud-Work\GitHub-Actions-V2\demo-workspace\solar-system">
  <testcase name="Testing Other Endpoints it should fetch Ready Status it checks Readiness endpoint" time="0.0"/>
</testsuite>
```

To archive this file in CI, add a step that uses `actions/upload-artifact@v3`:

```
jobs:
  unit-testing:
    name: Unit Testing
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


      - name: Run Unit Tests
        run: npm test


      - name: Archive Test Results
        uses: actions/upload-artifact@v3
        with:
          name: Mocha-Test-Result
          path: test-results.xml
```

| Property | Description                                  | Example             |
| -------- | -------------------------------------------- | ------------------- |
| name     | Artifact identifier displayed in the summary | `Mocha-Test-Result` |
| path     | Path or glob pattern to test report file     | `test-results.xml`  |

> [!important]
> **Note**
>
> The `path` field accepts glob patterns. To archive multiple XML reports, use something like `path: reports/**/*.xml`.

After the workflow runs, open the **Actions** tab to confirm the artifact upload. You’ll see a log entry showing the artifact size and success:

![The image shows a GitHub Actions interface with a successful unit testing job. It includes details about the steps involved, such as checking out the repository, setting up NodeJS, installing dependencies, and archiving test results.](https://kodekloud.com/kk-media/image/upload/v1752875937/notes-assets/images/GitHub-Actions-Certification-ArchiveStore-Unit-Test-Reports/github-actions-successful-unit-test-job.jpg)

In the workflow summary, the uploaded artifact is listed under the Unit Testing job:

![The image shows a GitHub Actions interface with a successful unit testing job, including details about the "Mocha-Test-Result" artifact being uploaded.](https://kodekloud.com/kk-media/image/upload/v1752875938/notes-assets/images/GitHub-Actions-Certification-ArchiveStore-Unit-Test-Reports/github-actions-successful-unit-test.jpg)

> [!important]
> **Retention Policy**
>
> By default, artifacts are retained for 90 days. You can [configure retention](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts#using-artifacts) or delete them when they’re no longer needed.

Archiving your test reports guarantees that JUnit XML outputs are always available for debugging, reporting, or integration with CI dashboards once your workflow completes.

## Links and References

- [actions/upload-artifact@v3](https://github.com/actions/upload-artifact)
- [mocha-junit-reporter](https://www.npmjs.com/package/mocha-junit-reporter)
- [GitHub Actions Artifacts Documentation](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/2603166d-ee82-46dc-b93b-da66aa73dc5a)**
>
> Watch video content
