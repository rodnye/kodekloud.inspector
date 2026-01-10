# Project Status Meeting 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Project-Status-Meeting-5)

---

## Table of Contents

- Project Status Meeting 5
  - Background
  - Solution Overview
  - Workflow Configuration
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Project Status Meeting 5

In this lesson, Alice and her team address GitHub Actions’ artifact retention limits by implementing a long-term storage solution. By adding a dedicated workflow that collects test and coverage reports and syncs them to an Amazon S3 bucket, they ensure indefinite access to CI artifacts.

---

## Background

Our existing CI pipeline uses two primary jobs:

| Job Name      | Artifact Name   | Description                           |
| ------------- | --------------- | ------------------------------------- |
| unit-test     | test-reports    | Runs unit tests and exports JUnit XML |
| code-coverage | coverage-report | Generates coverage data (`lcov`)      |

> [!important]
> **GitHub Actions Limits**
>
> Artifacts are retained for up to 90 days and can be no larger than 5 GB each. Syncing reports to S3 immediately after CI avoids expiration and size caps.

---

## Solution Overview

1.  Extend (or create) a workflow that triggers when the primary CI run completes.
2.  Download the `test-reports` and `coverage-report` artifacts.
3.  Use an S3 sync action to upload all reports to your S3 bucket.

---

## Workflow Configuration

Add a new file at `.github/workflows/report-storage.yml`:

```
name: Store Reports to S3


on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]


jobs:
  upload-reports:
    name: Upload Test & Coverage Reports
    runs-on: ubuntu-latest


    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3


      - name: Download Test Reports
        uses: actions/download-artifact@v3
        with:
          name: test-reports
          path: reports/tests


      - name: Download Coverage Reports
        uses: actions/download-artifact@v3
        with:
          name: coverage-report
          path: reports/coverage


      - name: Sync Reports to S3
        uses: jakejarvis/s3-sync-action@v0.5.1
        with:
          args: --acl private --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
          SOURCE_DIR: reports/
```

> [!important]
> **Repository Secrets Required**
>
> Make sure you’ve defined the following secrets under **Settings > Secrets and variables > Actions**:
>
> - `S3_BUCKET`
> - `AWS_ACCESS_KEY_ID`
> - `AWS_SECRET_ACCESS_KEY`> [!important]
>   **How \`workflow_run\` Works**
>
> The `workflow_run` trigger ensures the upload job only runs after the `CI` workflow has completed successfully.

---

## Next Steps

1.  Commit and push `report-storage.yml` to your repository.
2.  Confirm that `unit-test` and `code-coverage` jobs publish artifacts named `test-reports` and `coverage-report`.
3.  Trigger your CI workflow and verify the `reports/` directory appears in your S3 bucket.

With this setup, Alice’s team will maintain reliable, long-term access to both test results and coverage metrics.

---

## Links and References

- [GitHub Actions: workflow_run event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/)
- [jakejarvis/s3-sync-action](https://github.com/jakejarvis/s3-sync-action)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/6a92e896-2260-4b90-a75a-775538d7db06)**
>
> Watch video content
