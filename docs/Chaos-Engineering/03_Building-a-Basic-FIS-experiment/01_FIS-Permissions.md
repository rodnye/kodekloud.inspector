# FIS Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/FIS-Permissions)

---

## Table of Contents

- FIS Permissions
  - IAM Role Comparison
  - 1. Create the FIS User Role
  - 2. Create the FIS Service Role
  - References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# FIS Permissions

AWS Fault Injection Simulator (FIS) relies on two distinct IAM roles to enforce security boundaries:

1.  **User Role** – Grants permissions to _view_, _modify_, or _run_ FIS experiments through the console or CLI.
2.  **Service Role** – Assumed by FIS itself to perform actions on your AWS resources (for example, terminating an EC2 instance or failing over an Aurora database).

> [!important]
> **Warning**
>
> FIS experiments can induce downtime or resource failures. Apply the principle of least privilege when granting permissions to both roles.

## IAM Role Comparison

| IAM Role         | Purpose                                                                     | Example Permissions                                   |
| ---------------- | --------------------------------------------------------------------------- | ----------------------------------------------------- |
| FIS User Role    | Controls who can see, create, modify, or start experiments                  | `fis:CreateExperimentTemplate`, `fis:StartExperiment` |
| FIS Service Role | Defines what AWS resources FIS can interact with when running an experiment | `ec2:TerminateInstances`, `rds:FailoverDBCluster`     |

---

## 1\. Create the FIS User Role

This role is assumed by your users or CI/CD pipelines. It requires a trust policy for IAM principals and permissions to manage FIS experiments.

```
aws iam create-role \
  --role-name FISUserRole \
  --assume-role-policy-document file://trust-policy-user.json
```

Example `trust-policy-user.json`:

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
    "Action": "sts:AssumeRole"
  }]
}
```

Attach the managed policy (or a custom policy) that grants FIS actions:

```
aws iam attach-role-policy \
  --role-name FISUserRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonFISFullAccess
```

> [!important]
> **Note**
>
> You can scope the policy further by granting only the specific `fis:` actions your team requires.

---

## 2\. Create the FIS Service Role

The service role grants FIS permission to manipulate AWS resources on your behalf. Start by defining a trust relationship allowing the FIS service to assume it.

```
aws iam create-role \
  --role-name FISServiceRole \
  --assume-role-policy-document file://trust-policy-service.json
```

Example `trust-policy-service.json`:

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "fis.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
```

Next, attach a policy that covers all resource actions your experiments require:

```
aws iam put-role-policy \
  --role-name FISServiceRole \
  --policy-name FISServicePolicy \
  --policy-document file://fis-service-policy.json
```

An example snippet from `fis-service-policy.json`:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:TerminateInstances",
        "rds:FailoverDBCluster",
        "autoscaling:UpdateAutoScalingGroup"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [AWS IAM CreateRole API](https://docs.aws.amazon.com/cli/latest/reference/iam/create-role.html)
- [AWS Managed Policies for FIS](https://docs.aws.amazon.com/iam/latest/UserGuide/access_policies_managed-vs-inline.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/b6ff5a51-f5e0-4ce5-89a4-6ceeee95600f)**
>
> Watch video content
