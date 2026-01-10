# Project Status Meeting 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Reusable-Workflows-and-Reporting/Project-Status-Meeting-5)

---

## Table of Contents

- Project Status Meeting 5
  - Overview
  - Objectives
  - Proposed Workflow Job
  - Benefits
  - Tool Comparison
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Reusable Workflows and Reporting

# Project Status Meeting 5

## Overview

In this fifth project status meeting, Alice and her team discuss a new reporting requirement: collecting unit-test results and code-coverage metrics, then storing them in a durable location. Since [GitHub Actions](https://docs.github.com/en/actions) limits artifact retention duration (default 90 days) and size, the team proposes using an [AWS S3 bucket](https://docs.aws.amazon.com/s3/index.html) for long-term storage.

> [!important]
> **Note**
>
> By default, GitHub Actions artifacts expire after 90 days. AWS S3 provides virtually unlimited storage with configurable lifecycle rules.

## Objectives

- Aggregate test reports and coverage files.
- Upload artifacts automatically to S3 at the end of each workflow run.
- Ensure security and cost-efficiency by applying proper lifecycle policies.

## Proposed Workflow Job

1.  Run tests and generate artifacts.
2.  Cache or publish intermediate results.
3.  Upload final reports to S3.

```
name: CI with S3 Archiving


on:
  push:
    branches: [ main ]


jobs:
  test-and-coverage:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3


      - name: Run unit tests
        run: |
          npm install
          npm test
        continue-on-error: false


      - name: Generate coverage report
        run: npm run coverage


      - name: Upload reports as artifacts
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: |
            ./reports/test-results.xml
            ./coverage


  upload-to-s3:
    needs: test-and-coverage
    runs-on: ubuntu-latest
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: test-results
          path: ./artifacts


      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1


      - name: Upload to S3
        run: |
          aws s3 cp ./artifacts s3://my-report-bucket/${{ github.run_id }}/ \
            --recursive --acl private
```

> [!important]
> **Warning**
>
> Always store AWS credentials in GitHub Secrets. Never hard-code them in your workflow files.

## Benefits

- Centralized, long-term storage for all test artifacts
- Fine-grained lifecycle policies (e.g., transition to Glacier)
- Cost control through S3 storage classes

## Tool Comparison

| Resource                              | Use Case                                      | Action Example                                   |
| ------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
| GitHub Actions Artifacts              | Short-term CI/CD results                      | `actions/upload-artifact`                        |
| AWS S3 Bucket                         | Durable, long-term storage                    | `aws s3 cp`                                      |
| AWS S3 Lifecycle Policies             | Automated data transition to lower-cost tiers | Define in S3 console or via Terraform            |
| aws-actions/configure-aws-credentials | Simplify AWS authentication in workflows      | `uses: aws-actions/configure-aws-credentials@v2` |

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS S3 Developer Guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
- [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/14809f13-8f65-4db8-a28f-2588af96b30f)**
>
> Watch video content
