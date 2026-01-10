# Demo General Experiment Setup AZ - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Availability-Zone/Demo-General-Experiment-Setup-AZ)

---

## Table of Contents

- Demo General Experiment Setup AZ
  - 1. Change to the AZ experiment directory
  - 2. Define the trust policy
  - 3. Create the IAM role
  - 4. Review the FIS task policy
  - 5. Attach the task policy to the IAM role
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Availability Zone

# Demo General Experiment Setup AZ

In this tutorial, you’ll prepare an AWS Fault Injection Simulator (FIS) experiment that simulates an Availability Zone (AZ) power outage. We’ll walk through creating the IAM role, defining trust and task policies, and attaching them so FIS can safely perform the experiment.

Prerequisites:

- AWS CLI installed and configured
- Permissions to create IAM roles and policies
- A Linux or MacOS terminal

## 1\. Change to the AZ experiment directory

Navigate to the folder containing the experiment files:

```
cd ~/environment/workshopfiles/fis-workshop/az-experiment
ls -l
```

You should see:

| File                                | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| az-impairment-dashboard.yaml        | CloudWatch dashboard for impairment metrics |
| disable-enable-cross-zone-alb.sh    | Script to toggle cross-zone ALB settings    |
| fis-az-experiment-policy.json       | Trust policy for FIS role                   |
| fis-az-experiment-template.json     | FIS experiment template                     |
| fis-az-task-policy.json             | Task policy defining FIS permissions        |
| restart-user-traffic.sh             | Script to restart user traffic              |
| shift-traffic-out-of-az-all-albs.sh | Shift traffic out of AZ for all ALBs        |
| shift-traffic-out-of-az-one-alb.sh  | Shift traffic out of AZ for one ALB         |
| withzonalshift.sh                   | Script to run full zonal-shift              |

## 2\. Define the trust policy

Open **fis-az-experiment-policy.json** and verify it grants `fis.amazonaws.com` permission to assume the role:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": ["fis.amazonaws.com"] },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

This trust policy ensures only AWS FIS can assume the IAM role.

## 3\. Create the IAM role

Run the following command to create the `fis-az-role` with the above trust policy:

```
aws iam create-role \
  --role-name fis-az-role \
  --assume-role-policy-document file://fis-az-experiment-policy.json
```

Expected response:

```
{
  "Role": {
    "Path": "/",
    "RoleName": "fis-az-role",
    "Arn": "arn:aws:iam::123456789012:role/fis-az-role",
    "CreateDate": "2024-08-05T05:24:20+00:00",
    "AssumeRolePolicyDocument": { /* truncated */ }
  }
}
```

## 4\. Review the FIS task policy

Next, review **fis-az-task-policy.json**, which grants FIS permissions to perform AZ failover operations. Key sections include:

1.  **Auto Scaling group**

    ```
    {
      "Sid": "DescribeAsg",
      "Effect": "Allow",
      "Action": ["autoscaling:DescribeAutoScalingGroups"],
      "Resource": ["*"]
    }
    ```

2.  **Network ACL management**

    ```
    [
      {
        "Effect": "Allow",
        "Action": "ec2:CreateNetworkAcl",
        "Resource": "arn:aws:ec2:*:*:network-acl/*",
        "Condition": { "StringEquals": { "aws:RequestTag/managedByFIS": "true" } }
      },
      {
        "Effect": "Allow",
        "Action": ["ec2:CreateNetworkAclEntry","ec2:DeleteNetworkAcl"],
        "Resource": ["arn:aws:ec2:*:*:network-acl/*","arn:aws:ec2:*:*:vpc/*"],
        "Condition": { "StringEquals": { "ec2:ResourceTag/managedByFIS": "true" } }
      }
    ]
    ```

3.  **RDS failover and reboot**

    ```
    [
      {
        "Effect": "Allow",
        "Action": ["rds:FailoverDBCluster"],
        "Resource": ["arn:aws:rds:*:*:cluster:*"]
      },
      {
        "Effect": "Allow",
        "Action": ["rds:RebootDBInstance"],
        "Resource": ["arn:aws:rds:*:*:db:*"]
      }
    ]
    ```

4.  **ElastiCache AZ power interruption**

    ```
    {
      "Effect": "Allow",
      "Action": ["elasticache:DescribeReplicationGroups","elasticache:InterruptClusterAzPower"],
      "Resource": ["arn:aws:elasticache:*:*:replicationgroup:*"]
    }
    ```

> [!important]
> **Why these permissions?**
>
> These permissions let FIS safely describe and modify Auto Scaling groups, manage network ACLs tagged for FIS use, fail over RDS clusters, reboot instances, and interrupt power in ElastiCache clusters.

## 5\. Attach the task policy to the IAM role

Attach **fis-az-task-policy.json** to the `fis-az-role` so it can execute the experiment actions:

```
aws iam put-role-policy \
  --role-name fis-az-role \
  --policy-name fis-az-task-policy \
  --policy-document file://fis-az-task-policy.json
```

With the IAM role and policies in place, you’re now ready to launch the FIS experiment that simulates an AZ power interruption.

---

Next, proceed to [Implement the FIS Experiment](./fis-az-experiment-template.json) to launch the test.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/e28ed74d-a0c9-4dbd-9950-2b6f83cd8511/lesson/2534b769-be2c-488c-a1af-abbee1bb8c62)**
>
> Watch video content
