# Reboot Reader Node Scenario on Aurora - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Database-Aurora/Reboot-Reader-Node-Scenario-on-Aurora)

---

## Table of Contents

- Reboot Reader Node Scenario on Aurora
  - Architecture Overview
  - Prerequisites
  - AWS FIS Experiment Components
  - Step-by-Step: Injecting a Reader Node Reboot
  - Expected Results & Hypothesis
  - Cleanup
  - References
  - Watch Video
    - 1. Define the FIS Experiment Template
    - 2. Start the Experiment
    - 3. Monitor the Experiment

---

## Content

Chaos Engineering

Chaos Engineering on Database Aurora

# Reboot Reader Node Scenario on Aurora

In this guide, we’ll demonstrate how to safely reboot a reader node in an Amazon Aurora PostgreSQL cluster using AWS Fault Injection Simulator (AWS FIS). This experiment helps you validate your application’s resilience when a reader instance becomes temporarily unavailable in a multi-AZ deployment.

## Architecture Overview

Our target deployment is a two-node Aurora PostgreSQL cluster in a multi-Availability Zone configuration:

| Instance Role | Description                                         |
| ------------- | --------------------------------------------------- |
| Writer        | Handles all write operations (INSERT, UPDATE).      |
| Reader        | Serves read-only queries (SELECT) to offload reads. |

> [!important]
> **Note**
>
> When the reader node reboots, Aurora automatically redirects incoming read traffic to the writer instance. After the reboot completes, the reader rejoins the cluster without manual intervention.

## Prerequisites

- An existing Aurora PostgreSQL cluster with one writer and one reader in multi-AZ.
- AWS CLI v2 configured with permissions for AWS FIS and RDS.
- IAM role for FIS with `fis:StartExperiment` and `rds:RebootDBInstance` permissions.
- Cluster identifiers:
  - Writer: `aurora-writer-1`
  - Reader: `aurora-reader-1`

## AWS FIS Experiment Components

Every AWS FIS experiment consists of:

1.  **Target**: The AWS resource(s) to inject faults into.
2.  **Action**: The fault to inject (e.g., reboot).
3.  **Role ARN**: IAM role that grants FIS the required permissions.
4.  **Stop conditions** (optional): When to halt the experiment automatically.

## Step-by-Step: Injecting a Reader Node Reboot

### 1\. Define the FIS Experiment Template

Save the following JSON as `fis-reboot-reader.json`:

```
{
  "description": "Reboot Aurora PostgreSQL reader node",
  "roleArn": "arn:aws:iam::123456789012:role/FIS-Experiment-Role",
  "targets": {
    "ReaderInstance": {
      "resourceType": "aws:rds:db-instance",
      "resourceArns": [
        "arn:aws:rds:us-east-1:123456789012:db:aurora-reader-1"
      ]
    }
  },
  "actions": {
    "RebootReader": {
      "actionId": "aws:rds:reboot-db-instance",
      "description": "Reboot the reader DB instance",
      "parameters": {
        "dbInstanceIdentifier": "aurora-reader-1"
      },
      "targets": {
        "InstanceTarget": "ReaderInstance"
      }
    }
  }
}
```

### 2\. Start the Experiment

Run the following AWS CLI command:

```
aws fis start-experiment \
  --cli-input-json file://fis-reboot-reader.json \
  --region us-east-1
```

You should see an output similar to:

```
{
  "experimentId": "exp-abc123xyz",
  "state": "initiating"
}
```

### 3\. Monitor the Experiment

- **CLI**:

  ```
  aws fis get-experiment --id exp-abc123xyz
  ```

- **Console**: Visit the [AWS FIS Experiments](https://console.aws.amazon.com/fis/home) page.

Watch for the action status until it moves to `completed`.

## Expected Results & Hypothesis

We hypothesize that rebooting the reader node will **not** impact application availability:

1.  **Reader goes offline**: Aurora shifts read traffic to the writer.
2.  **Writer handles all requests**: No downtime for your application.
3.  **Reader rejoins**: After reboot, reads distribute back across both nodes.

> [!important]
> **Warning**
>
> Do **not** target the writer instance in production without a failover plan. Rebooting the writer can cause a brief primary failover and potential downtime.

## Cleanup

1.  Delete the FIS experiment template (if created separately).

    ```
    aws fis delete-experiment-template --id tpl-xyz123
    ```

2.  Verify that both Aurora instances are healthy:

    ```
    aws rds describe-db-instances \
      --db-instance-identifier aurora-reader-1 \
      --query 'DBInstances[].DBInstanceStatus'
    ```

## References

- [Amazon Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/postgresql/)
- [AWS Fault Injection Simulator](https://aws.amazon.com/fis/)
- [AWS CLI Command Reference: fis start-experiment](https://docs.aws.amazon.com/cli/latest/reference/fis/start-experiment.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/93135794-0ff5-4810-98ca-31959adc4eab/lesson/c4bacd24-f589-4bd5-b301-9df83e045571)**
>
> Watch video content
