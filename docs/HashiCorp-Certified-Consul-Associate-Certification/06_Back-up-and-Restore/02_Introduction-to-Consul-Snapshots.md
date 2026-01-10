# Introduction to Consul Snapshots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Back-up-and-Restore/Introduction-to-Consul-Snapshots)

---

## Table of Contents

- Introduction to Consul Snapshots
  - Taking a Snapshot on the Leader
  - Offloading to a Follower with -stale
  - Snapshot Contents
  - References
  - Watch Video
    - When to Use Stale Snapshots

---

## Content

HashiCorp Certified: Consul Associate Certification

Back up and Restore

# Introduction to Consul Snapshots

Consul snapshots provide an atomic, point-in-time backup of your cluster’s Raft state. They are the primary mechanism for disaster recovery (DR) and allow you to restore:

- Key-value entries in the KV store
- Service catalog definitions
- Prepared queries
- Active sessions
- Access Control Lists (ACLs)
- Internal metadata

Consistent snapshots ensure that all committed log entries across the Raft quorum are captured by the leader before the archive is created.

> [!important]
> **Note**
>
> By default, snapshots run in **consistent** mode. The cluster leader coordinates the process to guarantee data integrity.

![The image is an introduction to Consul snapshots, explaining that snapshots are taken in consistent mode by the leader, with options for followers to take snapshots using the `-stale` flag. It highlights the benefits and potential data loss risks of using the `-stale` flag.](https://kodekloud.com/kk-media/image/upload/v1752877796/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Introduction-to-Consul-Snapshots/consul-snapshots-introduction-stale-flag.jpg)

## Taking a Snapshot on the Leader

Run the following command on the current leader to save a consistent snapshot:

```
consul snapshot save /path/to/consul-snapshot.gz
```

This will:

1.  Verify leader status.
2.  Generate a gzipped tar archive at the specified path.

## Offloading to a Follower with `-stale`

If you need to reduce load on the leader—or capture state when quorum is lost—you can offload snapshot creation to a follower:

```
consul snapshot save -stale /path/to/consul-snapshot.gz
```

> [!important]
> **Warning**
>
> Using `-stale` may omit unreplicated log entries from the follower, potentially resulting in data loss. Only use this option when leader performance or cluster availability is impacted.

### When to Use Stale Snapshots

- Offload resource-intensive backup tasks from the leader
- Capture cluster state after quorum loss, to restore in a new cluster

## Snapshot Contents

| Component         | Description                                           |
| ----------------- | ----------------------------------------------------- |
| KV Store Entries  | All key-value data                                    |
| Service Catalog   | Registered services and metadata                      |
| Prepared Queries  | User-defined queries saved for repeatable lookups     |
| Active Sessions   | Locks and leader election sessions                    |
| ACLs              | Access Control policies and tokens                    |
| Internal Metadata | Raft indexes, configuration, and other system details |

## References

- [Consul Snapshots Documentation](https://www.consul.io/docs/backup-and-restore)
- [Raft Consensus Protocol](https://raft.github.io/)
- [HashiCorp Consul Overview](https://www.consul.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/6525b457-c93a-43ac-839a-7a301c64b51b/lesson/63221434-2ccb-4499-8b14-4f4b5f21508b)**
>
> Watch video content
