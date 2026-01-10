# Demo Integrated Storage Snapshots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Integrated-Storage-Snapshots)

---

## Table of Contents

- Demo Integrated Storage Snapshots
  - Prerequisites
  - Manually Taking a Raft Snapshot
  - Restoring from a Snapshot
  - Configuring Automated Snapshots (Enterprise Only)
  - Using Cloud Storage for Automated Snapshots
  - Summary
  - Links and References
  - Watch Video
    - Configuration Fields

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Integrated Storage Snapshots

In this guide, we’ll demonstrate how to manually create and restore Raft snapshots in Vault’s Integrated Storage and configure automated backups with Vault Enterprise.

## Prerequisites

- Vault OSS or Enterprise (v1.10.2+ for scheduled snapshots)
- [Vault Enterprise](https://www.vaultproject.io/docs/enterprise) license
- CLI access to your Vault server

## Manually Taking a Raft Snapshot

Use the `vault operator raft snapshot save` command to export the entire Vault state into a single file:

```
vault operator raft snapshot save temp.snap
```

Verify the snapshot file in your working directory:

```
[root@ip-10-1-100-135 opt]# vault operator raft snapshot save temp.snap
[root@ip-10-1-100-135 opt]# ls
aws  rh  temp.snap
```

> [!important]
> **Note**
>
> Each Raft snapshot includes Vault’s complete configuration, metadata, and KV data. Store snapshots in a secure, redundant location.

## Restoring from a Snapshot

To restore a Vault node from an existing snapshot, run:

```
vault operator raft snapshot restore temp.snap
```

This command rehydrates the Vault node with the state stored in `temp.snap`.

> [!important]
> **Warning**
>
> Restoring from a snapshot **overwrites** your existing Vault data. Confirm you have a valid backup before proceeding.

## Configuring Automated Snapshots (Enterprise Only)

Vault Enterprise supports scheduled Raft snapshots via the `sys/storage/raft/snapshot-auto/config` endpoint. First, confirm you’re running Enterprise:

```
[root@ip-10-1-100-135 opt]# vault status
Key             Value
---             -----
Version         1.10.2
Cluster Name    vault-cluster
Cluster ID      1234-5678-abcd-efgh
HA Enabled      true
HA Cluster      https://127.0.0.1:8201
```

Below is an example that schedules hourly local snapshots and retains the last 24 files:

```
[root@ip-10-1-100-135 opt]# vault write sys/storage/raft/snapshot-auto/config/hourly \
>   interval=1h \
>   retain=24 \
>   storage_type=local \
>   path_prefix=/opt/vault \
>   local_max_space=100
```

### Configuration Fields

| Parameter         | Description                                           | Example      |
| ----------------- | ----------------------------------------------------- | ------------ |
| `interval`        | How often to take snapshots (`1h`, `24h`, etc.)       | `1h`         |
| `retain`          | Number of snapshots to keep                           | `24`         |
| `storage_type`    | Storage backend (`local`, `aws-s3`, etc.)             | `local`      |
| `path_prefix`     | Directory path for local snapshot files               | `/opt/vault` |
| `local_max_space` | Maximum disk space (MB) allocated for local snapshots | `100`        |

List configured snapshot jobs:

```
[root@ip-10-1-100-135 opt]# vault list sys/storage/raft/snapshot-auto/config
Keys
----
hourly
```

Verify the local snapshot directory:

```
[root@ip-10-1-100-135 opt]# ls vault/
raft  vault.db
```

## Using Cloud Storage for Automated Snapshots

To store snapshots in AWS S3, set `storage_type=aws-s3` and specify your bucket:

```
[root@ip-10-1-100-135 opt]# vault write sys/storage/raft/snapshot-auto/config/cloud-daily \
>   interval=24h \
>   retain=24 \
>   storage_type=aws-s3 \
>   aws_s3_bucket=my-snapshot-bucket \
>   aws_s3_region=us-east-1
```

Additional AWS options:

- `aws_s3_endpoint`: Custom S3 endpoint (e.g., VPC endpoint)
- `aws_access_key_id` / `aws_secret_access_key`: IAM credentials (if not using roles)
- `kms_key_id`: KMS key for server-side encryption

## Summary

You’ve learned how to:

1.  Create and restore one-off Raft snapshots with `vault operator raft snapshot`.
2.  Configure automated snapshot jobs in Vault Enterprise for both local storage and AWS S3.

Automated Raft snapshots ensure continuous, reliable backups of your Vault data with minimal manual effort.

## Links and References

- [Vault Integrated Storage Snapshots](https://www.vaultproject.io/docs/enterprise/integrated-storage)
- [Vault Enterprise Documentation](https://www.vaultproject.io/docs/enterprise)
- [Vault CLI Command Reference](https://www.vaultproject.io/docs/commands)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/1cb66cf7-2150-4569-be89-accd76668dd9)**
>
> Watch video content
