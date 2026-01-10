# Demo Build an HA Cluster Using Auto Join - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Build-Fault-Tolerant-Vault-Environments/Demo-Build-an-HA-Cluster-Using-Auto-Join)

---

## Table of Contents

- Demo Build an HA Cluster Using Auto Join
  - Environment Overview
  - Vault Configuration
  - IAM Role for Auto-Join
  - Initializing the Cluster
  - Cluster Auto-Join Logs
  - Verify Cluster Status
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Build Fault Tolerant Vault Environments

# Demo Build an HA Cluster Using Auto Join

In this guide, we’ll walk through configuring a Vault high-availability (HA) cluster using the **auto-join** feature. With auto-join, Vault nodes automatically discover and join each other by querying cloud metadata—tags in AWS, labels in GCP, or VM properties in VMware. By the end, you’ll have a fault-tolerant Raft cluster without manual peer configuration.

## Environment Overview

We’re using three Amazon Linux EC2 instances in AWS, all tagged to enable discovery:

- Tag Key: `cluster`
- Tag Value: `us-east-1`

These tags ensure Vault nodes in the **us-east-1** region locate each other and form a cluster.

> [!important]
> **Note**
>
> Make sure each EC2 instance has the `cluster=us-east-1` tag applied before starting Vault.

## Vault Configuration

On **each** node, update `/etc/vault.d/vault.hcl` to use Raft storage with auto-join in AWS:

```
storage "raft" {
  path             = "/opt/vault"
  node_id          = "vault-1"                    # Change per node: vault-1, vault-2, vault-3
  retry_join       = ["provider=aws region=us-east-1 tag_key=cluster tag_value=us-east-1"]
  auto_join_scheme = "http"                       # default is https; http is for non-production labs
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = true
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:003674902126:key/8bc6b2ba-840a-4eef-8f2d-5616a3e67900"
}

api_addr     = "http://<NODE_PRIVATE_IP>:8200"
cluster_addr = "http://<NODE_PRIVATE_IP>:8201"
cluster_name = "vault"
ui           = true
log_level    = "INFO"
```

- `retry_join` tells Vault to query AWS EC2 instances with the `cluster=us-east-1` tag.
- `auto_join_scheme` defaults to `https`; we use `http` here since TLS is disabled.

> [!important]
> **Warning**
>
> Never disable TLS in production. This example uses `tls_disable = true` for simplicity in a lab environment.

## IAM Role for Auto-Join

Attach an IAM role to each EC2 instance with permissions to describe instances and access KMS:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:DescribeKey"
      ],
      "Resource": "arn:aws:kms:us-east-1:003674902126:key/8bc6b2ba-840a-4eef-8f2d-5616a3e67900"
    },
    {
      "Sid": "PermitEC2ApiAccessForCloudAutoJoin",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-east-1"
        }
      }
    }
  ]
}
```

In the AWS console, confirm that each instance has this IAM role attached:

![The image shows an AWS EC2 management console displaying a list of running instances with details about one specific instance, including its security settings and network information.](https://kodekloud.com/kk-media/image/upload/v1752878296/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Build-an-HA-Cluster-Using-Auto-Join/aws-ec2-management-console-running-instances.jpg)

## Initializing the Cluster

On the **first** node:

1.  Start Vault:

    ```
    sudo systemctl start vault
    ```

2.  Verify service status:

    ```
    vault status
    ```

3.  Initialize Vault to generate recovery keys and a root token:

    ```
    vault operator init
    ```

    Sample output:

    ```
    Recovery Key 1: AvXqLmtQ3JjHrMkboSx8+d1xlUuilntB9WeqWUrSk
    …
    Initial Root Token: hvs.S9xE9tx4Ydk8p2mVfjid2d

    Success! Vault is initialized
    ```

## Cluster Auto-Join Logs

Watch Vault logs to confirm auto-join behavior:

```
journalctl -u vault -f
```

Key excerpts:

```
2022-05-24T15:47:28.772Z [DEBUG] discover-aws: Using provider "aws"
2022-05-24T15:47:28.772Z [DEBUG] discover-aws: Using region=us-east-1 tag_key=cluster tag_value=us-east-1
2022-05-24T15:47:28.894Z [INFO]  discover-aws: Found 1 reservation=024e0889d9df9a73 with 3 instances
2022-05-24T15:47:28.897Z [DEBUG] discover-aws: Instance i-011dfb843f26c3c4 has private ip 10.1.101.199
2022-05-24T15:47:28.898Z [DEBUG] discover-aws: attempting to join leader at http://10.1.101.199:8200
```

## Verify Cluster Status

Run `vault status` on each node. You should see one **active** leader and two **standbys**:

| Node IP      | HA Mode | Active Node Address      |
| ------------ | ------- | ------------------------ |
| 10.1.101.199 | active  | http://10.1.101.199:8201 |
| 10.1.101.25  | standby | http://10.1.101.199:8201 |
| 10.1.101.108 | standby | http://10.1.101.199:8201 |

## Summary

You’ve successfully built a Vault HA cluster that automatically joins via AWS metadata tags. This pattern works on AWS, Azure, GCP, and VMware (where supported). To scale out, launch new nodes with the same tags and Vault will auto-join the Raft cluster.

For more details, see:

- [Vault Auto-Join Documentation](https://www.vaultproject.io/docs/concepts/auto-join)
- [AWS Provider Plugin](https://www.vaultproject.io/docs/configuration/storage/raft#retry_join)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/1f27281b-60c7-4e2a-91ac-d165d1609488)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/c1dd23ce-c7fd-4564-84d8-4ff14b115bd7/lesson/79275b1b-9cce-4291-b121-8362b6564868)**
>
> Practice lab
