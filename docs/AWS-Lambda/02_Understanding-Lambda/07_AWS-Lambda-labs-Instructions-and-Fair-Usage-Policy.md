# AWS Lambda labs Instructions and Fair Usage Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Understanding-Lambda/AWS-Lambda-labs-Instructions-and-Fair-Usage-Policy)

---

## Table of Contents

- AWS Lambda labs Instructions and Fair Usage Policy
  - Usage Limits and Guidelines
  - Links and References
  - Watch Video
  - Practice Lab
    - Quick-Start Checklist

---

## Content

AWS Lambda

Understanding Lambda

# AWS Lambda labs Instructions and Fair Usage Policy

In this hands-on AWS Lambda lab, you’ll deploy and test serverless functions in a live environment. To ensure optimal performance and fair usage for all participants, please adhere to the following guidelines.

> [!important]
> **Note**
>
> An AWS client machine with the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) is pre-configured for you. Confirm your environment is set to **us-east-1** before proceeding.

## Usage Limits and Guidelines

| Resource            | Constraint              |
| ------------------- | ----------------------- |
| Lab Duration        | 60 minutes per session  |
| Supported Region    | **us-east-1** (only)    |
| Function Timeout    | ≤ 10 seconds            |
| Memory Allocation   | ≤ 512 MB                |
| Invocation Quota    | ≤ 300 calls per lab     |
| Configuration Edits | Disabled after creation |

> [!important]
> **Warning**
>
> If you exceed the timeout or memory cap, your function’s settings will revert to defaults (3 s timeout, 128 MB memory). Surpassing 300 invocations will automatically delete the Lambda function.

### Quick-Start Checklist

1.  Verify your AWS CLI is working:

    ```
    aws sts get-caller-identity
    ```

2.  Confirm region:

    ```
    aws configure get region
    # should return us-east-1
    ```

3.  When creating a new function, specify:
    - `--timeout 10`
    - `--memory-size 512`
4.  Monitor invocations:

    ```
    aws lambda get-function-metrics --function-name MyFunction
    ```

![The image outlines the instructions and fair usage policy for AWS Lambda labs, including details like a 60-minute lab session, US-EAST-1 region usage, and a maximum of 300 invocations.](https://kodekloud.com/kk-media/image/upload/v1752863164/notes-assets/images/AWS-Lambda-AWS-Lambda-labs-Instructions-and-Fair-Usage-Policy/aws-lambda-labs-instructions-policy.jpg)

## Links and References

- [AWS Lambda service](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) – Official documentation for serverless functions.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) – Command-Line Interface user guide.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/6d50d51c-e580-402f-ae6d-f31e8f22f764)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/e56e885b-3868-477a-9665-e82401cb3b23)**
>
> Practice lab
