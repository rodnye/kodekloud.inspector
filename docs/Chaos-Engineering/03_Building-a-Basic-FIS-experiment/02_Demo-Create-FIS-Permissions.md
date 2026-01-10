# Demo Create FIS Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Demo-Create-FIS-Permissions)

---

## Table of Contents

- Demo Create FIS Permissions
  - Step 1: Create the FIS Service Role
  - Step 2: Configure Role Details
  - Step 3: Attach CloudWatch Logs Permissions
  - Next Steps
  - References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Demo Create FIS Permissions

In this guide, you’ll set up an AWS Fault Injection Simulator (FIS) service role that grants permissions to run chaos engineering experiments—such as terminating EC2 instances or simulating Availability Zone failures—and to send logs to Amazon CloudWatch for monitoring.

> [!important]
> **Prerequisites**
>
> Ensure your AWS identity has the following IAM permissions:
>
> - `iam:CreateRole`
> - `iam:AttachRolePolicy`
> - `iam:PassRole`

## Step 1: Create the FIS Service Role

1.  Sign in to the AWS Management Console and open the [IAM console](https://console.aws.amazon.com/iam/).
2.  In the left navigation pane, choose **Roles**, then click **Create role**.
3.  Under **Trusted entity type**, select **AWS service**.
4.  In **Use case**, choose **Fault Injection Simulator**.
5.  From the list of managed policies, select the one matching your experiment. For an EC2 termination test, select:
    - AWSFIS_ExperimentTemplate_EC2InstanceTerminate
6.  Click **Next** to proceed.

> [!important]
> **Custom Experiment Templates**
>
> You can create and attach custom policies if your chaos tests require additional or more restrictive permissions.

## Step 2: Configure Role Details

1.  Provide a descriptive **Role name**, for example, `FIS-EC2-Termination-Role`.
2.  Review the trust policy to confirm only FIS can assume this role:

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "fis.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
    ```

3.  Click **Create role**.

## Step 3: Attach CloudWatch Logs Permissions

To enable FIS to publish experiment logs:

1.  In the IAM console, locate and open the newly created role (`FIS-EC2-Termination-Role`).
2.  On the **Permissions** tab, click **Add permissions** → **Attach policies**.
3.  Search for and select **CloudWatchLogsFullAccess**.
4.  Click **Attach policies**.

| Policy Name                                          | Purpose                                |
| ---------------------------------------------------- | -------------------------------------- |
| AWSFIS\\\_ExperimentTemplate\\\_EC2InstanceTerminate | Allows FIS to terminate EC2 instances  |
| CloudWatchLogsFullAccess                             | Enables FIS to push logs to CloudWatch |

> [!important]
> **Security Best Practice**
>
> In production environments, avoid overly permissive policies like `CloudWatchLogsFullAccess`. Instead, scope permissions to specific log groups and actions.

## Next Steps

You now have an IAM role configured with the necessary permissions to run AWS FIS experiments and stream logs. Continue to the [AWS FIS tutorial](https://docs.aws.amazon.com/fis/latest/userguide/getting-started.html) to launch your first chaos test.

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html)
- [IAM Roles in AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
- [Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/885fd9f4-7a60-4009-ada3-8f4a70e0abe9)**
>
> Watch video content
