# Demo Consul Snapshots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Back-up-and-Restore/Demo-Consul-Snapshots)

---

## Table of Contents

- Demo Consul Snapshots
  - Prerequisites
  - 1. Taking a Snapshot
  - 2. Inspecting a Snapshot
  - 3. Restoring a Snapshot
  - Snapshot Commands Reference
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Back up and Restore

# Demo Consul Snapshots

In this guide, you’ll learn how to back up and restore your Consul service state using snapshot commands. We’ll cover:

- Creating a snapshot file
- Inspecting snapshot metadata
- Restoring a cluster from a snapshot

These steps are critical for disaster recovery and cluster portability.

---

## Prerequisites

- A running Consul server (open source) cluster
- Consul CLI installed and in your `$PATH`
- Permissions to read/write snapshot files

> [!important]
> **Note**
>
> Ensure you have sufficient disk space in your working directory before creating large snapshots.

---

## 1\. Taking a Snapshot

1.  SSH into one of your Consul server nodes.
2.  Change to a writable directory (e.g., `/tmp`):

    ```
    cd /tmp
    ```

3.  Run the `save` subcommand to generate a snapshot file:

    ```
    consul snapshot save consul.snap
    ```

4.  Confirm the operation:

    ```
    ==> Consul snapshot saved: consul.snap
    ```

5.  Verify the file exists:

    ```
    ls -lh
    # -rw-r--r-- 1 consul consul  13K Jul  5 12:34 consul.snap
    ```

---

## 2\. Inspecting a Snapshot

To view metadata about an existing snapshot file, use the `inspect` subcommand:

```
consul snapshot inspect consul.snap
```

Sample output:

```
ID:            17-3678-1613078754824
Size:          13367
Index:         3678
Term:          17
Version:       1


Type                   Count     Size
----                   -----     ----
Register               14        9KB
License                1         1.2KB
KVS                    7         837B
...
Total                  —         13.1KB
```

> [!important]
> **Note**
>
> - The **Version** field refers to the snapshot format, not the Consul binary version.
> - **Index** and **Term** reflect the Raft state at snapshot creation.

---

## 3\. Restoring a Snapshot

When recovering a failed cluster or migrating state, restore from your snapshot:

```
consul snapshot restore consul.snap
```

After the restore completes:

1.  Restart all Consul agents or services to load the restored data.
2.  Check cluster status:

    ```
    consul operator raft list-peers
    consul members
    ```

> [!important]
> **Warning**
>
> Do **not** restore a snapshot into an active cluster without first stopping agents—this can lead to data corruption.

---

## Snapshot Commands Reference

| Command                   | Description                        | Example Usage                         |
| ------------------------- | ---------------------------------- | ------------------------------------- |
| `consul snapshot save`    | Create a new snapshot file         | `consul snapshot save backup.snap`    |
| `consul snapshot inspect` | Show metadata for a snapshot       | `consul snapshot inspect backup.snap` |
| `consul snapshot restore` | Restore state from a snapshot file | `consul snapshot restore backup.snap` |

---

## Links and References

- [Consul Snapshot Documentation](https://www.consul.io/docs/commands/snapshot)
- [Consul Disaster Recovery Guide](https://www.consul.io/docs/platform/dr)
- [HashiCorp Consul Official Site](https://www.consul.io/)

---

By following these steps, you can efficiently manage Consul snapshots, ensuring reliable backups and quick recovery for your service cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/6525b457-c93a-43ac-839a-7a301c64b51b/lesson/e15237c4-37c7-414b-b1a4-e59261bb7043)**
>
> Watch video content
