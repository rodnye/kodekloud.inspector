# Demo Using the Consul Snapshot Agent Enterprise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Back-up-and-Restore/Demo-Using-the-Consul-Snapshot-Agent-Enterprise)

---

## Table of Contents

- Demo Using the Consul Snapshot Agent Enterprise
  - Overview
  - Prerequisites
  - Verify Cluster Membership
  - Create a Systemd Unit for the Snapshot Agent
  - Configure the Snapshot Agent
  - Start and Enable the Service
  - Verify Service Status and Logs
  - Confirm Snapshots in S3
  - High Availability & Leadership Failover
  - Cleanup
  - References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Consul Associate Certification

Back up and Restore

# Demo Using the Consul Snapshot Agent Enterprise

In this guide, you’ll learn how to automate backups of your Consul data using the **Consul Snapshot Agent**—an enterprise-only feature that takes and stores snapshots on a schedule.

## Overview

Consul’s open source edition requires manual snapshots. With a valid enterprise license, you can deploy the **Snapshot Agent** to automatically capture and store snapshots at defined intervals, either locally or in AWS S3.

## Prerequisites

- Enterprise license installed on every Consul server
- Consul binary present on all nodes
- A running cluster with two servers and two clients
- AWS credentials configured for S3 storage (if using S3)

> [!important]
> **Warning**
>
> Make sure your Enterprise license is active and that your IAM user has write permissions for the S3 bucket.

## Verify Cluster Membership

Run this command on any server to confirm all nodes are online:

```
consul members
```

Expected output:

```
server-1  10.0.0.1:8301  alive
server-2  10.0.0.2:8301  alive
client-1  10.0.1.1:8301  alive
client-2  10.0.1.2:8301  alive
```

## Create a Systemd Unit for the Snapshot Agent

The Snapshot Agent runs as a separate Consul process in agent mode. Place this file at `/etc/systemd/system/consul-snapshot.service`:

```
[Unit]
Description="HashiCorp Consul Snapshot Agent"
Documentation=https://www.consul.io/docs
Requires=network-online.target
After=consul.service
ConditionFileNotEmpty=/etc/consul-snapshot.d/consul-snapshot.json

[Service]
User=consul
Group=consul
ExecStart=/usr/local/bin/consul snapshot agent -config-file=/etc/consul-snapshot.d/consul-snapshot.json
KillMode=process
Restart=on-failure
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

## Configure the Snapshot Agent

Create `/etc/consul-snapshot.d/consul-snapshot.json` with your settings:

```
{
  "snapshot_agent": {
    "http_addr": "127.0.0.1:8500",
    "datacenter": "",
    "snapshot": {
      "interval": "30m",
      "retain": 336,
      "deregister_after": "8h",
      "service": "consul-snapshot"
    },
    "aws_storage": {
      "s3_region": "us-east-1",
      "s3_bucket": "us-east-1-krausen-consul-snapshots"
    }
  }
}
```

| Parameter          | Description                                            | Example                              |
| ------------------ | ------------------------------------------------------ | ------------------------------------ |
| `http_addr`        | Address of the local Consul HTTP API                   | `127.0.0.1:8500`                     |
| `interval`         | How often to take a snapshot                           | `30m`                                |
| `retain`           | Number of snapshots to keep                            | `336` (≈2 weeks at 30 m intervals)   |
| `deregister_after` | Time to remove agent if it fails to renew leadership   | `8h`                                 |
| `service`          | Service name under which the agent registers in Consul | `consul-snapshot`                    |
| `s3_region`        | AWS region for S3 storage                              | `us-east-1`                          |
| `s3_bucket`        | S3 bucket to store snapshots                           | `us-east-1-krausen-consul-snapshots` |

> Adjust values to match your environment and naming conventions.

## Start and Enable the Service

```
sudo systemctl enable consul-snapshot.service
sudo systemctl start consul-snapshot.service
```

## Verify Service Status and Logs

```
sudo systemctl status -l consul-snapshot.service
```

Sample log output:

```
● consul-snapshot.service - "HashiCorp Consul Snapshot Agent"
   Loaded: loaded (/etc/systemd/system/consul-snapshot.service; enabled)
   Active: active (running) since Thu 2021-02-11 21:36:36 UTC
 Main PID: 6351 (consul)
    Tasks: 5
   Memory: 2.4M
      CPU: 69ms
   CGroup: /system.slice/consul-snapshot.service
           └─6351 /usr/local/bin/consul snapshot agent -config-file=/etc/consul-snapshot.d/consul-snapshot.json

Feb 11 21:36:36 server-1 consul[6351]: [INFO]  license: Automated Backups feature is now licensed
Feb 11 21:36:36 server-1 consul[6351]: [INFO]  snapshot: Waiting to obtain leadership...
Feb 11 21:36:36 server-1 consul[6351]: [INFO]  snapshot: Obtained leadership
Feb 11 21:36:36 server-1 consul[6351]: [INFO]  snapshot: Saved snapshot: id=1613079399661741730
```

## Confirm Snapshots in S3

1.  Open the [AWS S3 Console](https://console.aws.amazon.com/s3/home).
2.  Navigate to your bucket (`us-east-1-krausen-consul-snapshots`).
3.  Verify that snapshot files appear under the configured prefix at the expected interval.

## High Availability & Leadership Failover

Deploy a second agent on another server:

```
sudo systemctl start consul-snapshot.service
sudo systemctl status -l consul-snapshot.service
```

It will log:

```
[INFO]  snapshot: Waiting to obtain leadership...
```

To test failover, stop the first agent:

```
sudo systemctl stop consul-snapshot.service   # on server-1
```

Then restart on server-2:

```
sudo systemctl restart consul-snapshot.service  # on server-2
sudo systemctl status -l consul-snapshot.service
```

You should see:

```
[INFO]  snapshot: Obtained leadership
[INFO]  snapshot: Saved snapshot: id=1613079648559762150
```

Confirm new snapshots in the S3 bucket.

## Cleanup

When you’re done:

```
sudo systemctl stop consul-snapshot.service
sudo systemctl disable consul-snapshot.service
```

## References

- [Consul Documentation](https://www.consul.io/docs)
- [HashiCorp Consul GitHub repository](https://github.com/hashicorp/consul)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/6525b457-c93a-43ac-839a-7a301c64b51b/lesson/76b847ca-df10-45d9-8658-dbe7179a372d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/6525b457-c93a-43ac-839a-7a301c64b51b/lesson/a06a56ed-65d8-4924-88b8-cce625d195f3)**
>
> Practice lab
