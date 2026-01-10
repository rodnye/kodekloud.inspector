# Voting vs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Voting-vs)

---

## Table of Contents

- Voting vs
  - Comparison Table
  - Configuring a Non-voting Member
  - Example: Verifying Peers
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Voting vs

In this lesson, we’ll explore the distinct roles of voting and non-voting members in a [Consul](https://www.consul.io/docs) cluster. By default, server nodes participate in Raft’s leader election and maintain quorum. However, if you need additional read capacity without impacting election stability, add non-voting members. These nodes replicate the same data but are excluded from voting, boosting read throughput while preserving the Raft quorum.

## Comparison Table

| Member Type       | Votes in Raft Election | Data Replication | Primary Use Case                                   |
| ----------------- | ---------------------- | ---------------- | -------------------------------------------------- |
| Voting Member     | Yes                    | Yes              | Ensures quorum, leader election, high availability |
| Non-voting Member | No                     | Yes              | Scales reads, redundancy zones, workload isolation |

> [!important]
> **Note**
>
> Use non-voting members to **horizontally scale read operations** in high-traffic environments without the risk of quorum changes.

## Configuring a Non-voting Member

You can designate a node as non-voting in two ways:

1.  In the agent’s configuration file (`consul.hcl`):

    ```
    # consul.hcl
    non_voting = true
    ```

2.  Via the command line when starting the agent:

    ```
    consul agent ... --non-voting-member
    ```

> [!important]
> **Warning**
>
> Be cautious not to overload your cluster with too many non-voting members, as excessive replication traffic can impact network resources.

## Example: Verifying Peers

Start with a three-node cluster where all servers are voters. List the Raft peers:

```
$ consul operator raft list-peers
Node           ID               Address            State     Voter  RaftProtocol
Consul-Node-A  10.0.10.51:8300  10.0.10.51:8300    follower  true   2
Consul-Node-B  10.0.11.23:8300  10.0.11.23:8300    leader    true   3
Consul-Node-C  10.0.10.3:8300   10.0.10.3:8300     follower  true   2
```

Next, add a fourth node configured as a non-voting member. Re-run the command to see the updated list:

```
$ consul operator raft list-peers
Node           ID               Address            State     Voter   RaftProtocol
Consul-Node-A  10.0.10.51:8300  10.0.10.51:8300    follower  true    2
Consul-Node-B  10.0.11.23:8300  10.0.11.23:8300    leader    true    3
Consul-Node-C  10.0.10.3:8300   10.0.10.3:8300     follower  true    2
Consul-Node-D  10.0.11.62:8300  10.0.11.62:8300    follower  false   2
```

Here, **Consul-Node-D** synchronizes all data without voting, providing extra read capacity while keeping the existing quorum intact.

## References

- [Consul Official Documentation](https://www.consul.io/docs)
- [Raft Consensus Algorithm](https://raft.github.io/)
- [Scaling Consul Clusters](https://www.consul.io/docs/guides/high-availability)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/558ccfdc-d9d0-4f0f-8a7b-32da4ff4da98)**
>
> Watch video content
