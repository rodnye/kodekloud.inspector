# Consul Snapshot Agent Enterprise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Back-up-and-Restore/Consul-Snapshot-Agent-Enterprise)

---

## Table of Contents

- Consul Snapshot Agent Enterprise
  - Key Features
  - Supported Storage Backends
  - Benefits
  - Configuration
  - Process Overview
  - Summary
  - Links and References
  - Watch Video
    - 1. Snapshot Agent JSON
    - 2. systemd Unit

---

## Content

HashiCorp Certified: Consul Associate Certification

Back up and Restore

# Consul Snapshot Agent Enterprise

Consul’s Snapshot Agent is an enterprise-only, long-running daemon that automates cluster backups. While open-source users must script snapshots via cron or CI/CD, the Snapshot Agent provides built-in scheduling, retention, and storage management.

> [!important]
> **Warning**
>
> The Snapshot Agent requires Consul Enterprise. If you’re on OSS Consul, implement external scripting for snapshots.

## Key Features

![The image is a slide about the Consul Snapshot Agent (Enterprise), describing its features such as customizable intervals, retention configuration, and multiple storage options including local filesystem, S3-compatible storage, Azure Blob Storage, and Google Cloud Storage.](https://kodekloud.com/kk-media/image/upload/v1752877792/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consul-Snapshot-Agent-Enterprise/consul-snapshot-agent-features-storage-options.jpg)

- **Custom intervals**: e.g., hourly, six-hourly, daily
- **Retention policies**: automatically purge old snapshots
- **Storage backends**: local filesystem, S3-compatible (AWS S3, MinIO), Azure Blob, Google Cloud Storage

> [!important]
> **Note**
>
> Configure `snapshot.interval` (e.g., `24h`) and `snapshot.retain` (e.g., `48`) to control scheduling and purge behavior.

## Supported Storage Backends

By default, manual snapshots are written locally. The Snapshot Agent lets you offload backups to resilient, off-node stores:

| Backend              | Use Case                              | Example Setting                               |
| -------------------- | ------------------------------------- | --------------------------------------------- |
| S3-Compatible        | AWS S3, MinIO, DigitalOcean Spaces    | `aws_storage.s3_bucket = "consul-snapshots"`  |
| Azure Blob Storage   | Enterprise-grade Blob management      | `azure_storage.account = "myaccount"`         |
| Google Cloud Storage | GCS buckets for global redundancy     | `gcs_storage.bucket = "consul-gcs-snapshots"` |
| Local Filesystem     | On-node backups (default for CLI/API) | `filesystem.path = "/var/consul/snapshots"`   |

## Benefits

![The image is an informational slide about the Consul Snapshot Agent (Enterprise), highlighting its benefits such as automated snapshots, high availability, failover, consistent snapshots, and health checks.](https://kodekloud.com/kk-media/image/upload/v1752877793/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consul-Snapshot-Agent-Enterprise/consul-snapshot-agent-benefits-slide.jpg)

- **Automated snapshots** on a defined schedule
- **High availability** via agent-level leader election
- **Automatic failover**: a new leader takes over if the current one fails
- **Consistent backups**: only one snapshot per interval cluster-wide
- **Service registration & health checks** for monitoring leader status

When the agent starts, it registers a Consul service with health checks. You can alert on missing leaders or failed snapshot jobs using your monitoring tools.

## Configuration

Setup involves two files: a JSON config for the agent and a systemd unit to manage the service.

### 1\. Snapshot Agent JSON

Save as `/etc/snapshot.d/snapshot.json`:

```
{
  "snapshot_agent": {
    "http_addr": "127.0.0.1:8500",
    "token": "your-acl-token",
    "datacenter": "dc1",
    "snapshot": {
      "interval": "30m",
      "retain": 336,
      "deregister_after": "8h"
    },
    "aws_storage": {
      "s3_region": "us-east-1",
      "s3_bucket": "consul-snapshots"
    }
  }
}
```

Fields:

- `http_addr`: Consul HTTP API address
- `token`: ACL token with `snapshot` scope
- `datacenter`: Optional target datacenter
- `snapshot.interval`: Interval between snapshots
- `snapshot.retain`: Number of snapshots to keep
- `snapshot.deregister_after`: Deregister unhealthy agent after this duration
- Storage blocks: one of `aws_storage`, `azure_storage`, `gcs_storage`, or `filesystem`

Refer to the [Consul Snapshot Agent docs](https://www.consul.io/docs/enterprise/snapshot) for full details.

### 2\. systemd Unit

Create `/etc/systemd/system/consul-snapshot.service`:

```
[Unit]
Description=Consul Snapshot Agent
Documentation=https://www.consul.io/
Requires=network-online.target
After=consul.service
ConditionFileNotEmpty=/etc/snapshot.d/snapshot.json


[Service]
User=consul
Group=consul
ExecStart=/usr/local/bin/consul snapshot agent -config-dir=/etc/snapshot.d/
KillMode=process
Restart=on-failure
LimitNOFILE=65536


[Install]
WantedBy=multi-user.target
```

Then reload and enable:

```
sudo systemctl daemon-reload
sudo systemctl start consul-snapshot
sudo systemctl enable consul-snapshot
```

## Process Overview

![The image illustrates the Consul Snapshot Agent (Enterprise) process, showing how snapshots are created by a leader node and stored in an Amazon S3 bucket, with old snapshots being deleted for retention.](https://kodekloud.com/kk-media/image/upload/v1752877795/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consul-Snapshot-Agent-Enterprise/consul-snapshot-agent-process-amazon-s3.jpg)

1.  All nodes run the Snapshot Agent.
2.  Agents hold a leader election each interval.
3.  The leader captures the snapshot and uploads it to storage (e.g., S3).
4.  The retention policy deletes older snapshots beyond the configured limit.

## Summary

The Consul Snapshot Agent simplifies enterprise-grade backup automation with scheduled snapshots, multi-backend support, and built-in high availability. It ensures consistent, recoverable cluster state without external scripting.

This functionality will be demonstrated in the accompanying lab.

## Links and References

- [Consul Enterprise Snapshot Agent Documentation](https://www.consul.io/docs/enterprise/snapshot)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Azure Blob Storage Overview](https://learn.microsoft.com/azure/storage/blobs/)
- [Google Cloud Storage](https://cloud.google.com/storage)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/6525b457-c93a-43ac-839a-7a301c64b51b/lesson/539a64fc-f988-482c-b8f8-1f5ecb929202)**
>
> Watch video content
