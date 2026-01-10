# Consensus Protocol Raft - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Consensus-Protocol-Raft)

---

## Table of Contents

- Consensus Protocol Raft
  - Consensus Glossary
  - Server Roles and Responsibilities
  - Leader Election Process
  - Client Interaction with the Raft Cluster
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Consensus Protocol Raft

In this lesson, we dive into Consul’s consensus protocol—Raft. Running exclusively on Consul server agents, Raft guarantees reliable replication of log entries and cluster state changes across the server peer set. By ensuring every new entry is replicated on all servers, Consul prevents data loss if any servers fail. Raft orchestrates leadership election, log replication, and quorum management. We’ll explore each of these components in detail.

> [!important]
> **Note**
>
> This Raft implementation was later extended to power HashiCorp Vault’s integrated storage starting in Vault 1.4.

---

## Consensus Glossary

![The image is a slide titled "Consensus Glossary" with definitions for "Log" and "Peer Set," explaining their roles in a consistent log and log replication. It includes a small illustration of a person at a computer.](https://kodekloud.com/kk-media/image/upload/v1752877821/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consensus-Protocol-Raft/consensus-glossary-log-peer-set-definitions.jpg)

**Log**  
An ordered sequence of entries representing every change to the cluster. Entries include server additions/removals and key-value writes, updates, or deletions. Replaying the log reconstructs the cluster’s current state, so all servers must agree on entry content and order to form a _consistent log_.

**Peer Set**  
All server nodes that participate in Raft replication within a datacenter. In a five-server cluster example, the peer set consists of those five servers.

**Quorum**  
A majority of nodes in the peer set required to elect a leader and commit log entries.

```
majority = (n + 1) / 2
```

For a five-node cluster:

```
majority = (5 + 1) / 2 = 3
```

Losing more than two servers drops you below quorum, halting cluster operations.

> [!important]
> **Warning**
>
> If your cluster falls below quorum, no new entries can be committed, and the cluster becomes unavailable for writes.

---

## Server Roles and Responsibilities

Each Consul server (Raft node) operates in one of three states:

| Role      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| Follower  | Default state; processes leader-forwarded requests, accepts log replication, votes in elections. |
| Candidate | Transient state during election; solicits votes from peers.                                      |
| Leader    | Receives all client writes, processes queries, commits and replicates new log entries.           |

![The image outlines the responsibilities of leaders and followers in a consensus protocol, detailing tasks such as log entry ingestion, query processing, and vote casting.](https://kodekloud.com/kk-media/image/upload/v1752877822/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consensus-Protocol-Raft/leaders-followers-consensus-protocol-responsibilities.jpg)

Only the leader can append entries and decide when they’re committed based on acknowledgments from a quorum of servers. Followers forward write requests to the leader and store the replicated entries.

---

## Leader Election Process

Raft elections use randomized timeouts and heartbeat messages:

1.  The leader sends periodic heartbeats to all followers.
2.  Each follower has a randomly assigned election timeout (e.g., 150–300 ms).
3.  If a follower doesn’t receive a heartbeat before its timeout expires, it assumes the leader has failed, becomes a candidate, votes for itself, and requests votes from peers.
4.  A new leader is elected once a candidate secures votes from a majority of the peer set.

![The image explains the leader election process in a consensus protocol, highlighting randomized election timeouts and the steps involved when a heartbeat isn't received from the leader.](https://kodekloud.com/kk-media/image/upload/v1752877823/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consensus-Protocol-Raft/leader-election-consensus-protocol-diagram.jpg)

In a five-node cluster example, the follower with the shortest timeout triggers the first election when the leader’s heartbeats stop:

![The image explains a consensus protocol for leader election based on randomized election timeouts, detailing the process of leader heartbeats, server timeouts, and the election process when a heartbeat isn't received. It includes a diagram showing the transition from leader to candidate and followers with specific timeout values.](https://kodekloud.com/kk-media/image/upload/v1752877824/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consensus-Protocol-Raft/consensus-protocol-leader-election-diagram.jpg)

---

## Client Interaction with the Raft Cluster

Clients only need to contact any single Consul server. The leader handles all writes and coordinates replication:

1.  A client issues a key-value write to one server.
2.  If that server isn’t the leader, it forwards the request.
3.  The leader appends the entry to its log, commits it, and replicates it to followers.

![The image illustrates a "Consensus Protocol" involving a release engineer interacting with a Consul system, which includes a leader node and multiple follower nodes, highlighting operations like Consul Raft and replication.](https://kodekloud.com/kk-media/image/upload/v1752877825/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Consensus-Protocol-Raft/consensus-protocol-consul-raft-diagram.jpg)

This model ensures clients connect to a single endpoint while Raft maintains strong consistency and durability across the cluster.

---

## Links and References

- [Consul Official Documentation](https://www.consul.io/docs)
- [HashiCorp Raft Overview](https://www.hashicorp.com/blog/raft-consensus)
- [Vault Integrated Storage](https://www.vaultproject.io/docs/internals/storage/raft)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/e25f0859-e284-4658-affb-b51f7b894442)**
>
> Watch video content
