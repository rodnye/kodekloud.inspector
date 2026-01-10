# Swarm High Availability Quorum - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-High-Availability-Quorum)

---

## Table of Contents

- Swarm High Availability Quorum
  - Distributed Consensus with Raft
  - Quorum and Fault Tolerance
  - Best Practices for Manager Distribution
  - Failure Scenarios and Recovery
  - Watch Video
    - Recovering Quorum

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm High Availability Quorum

In a Docker Swarm cluster, **manager nodes** are the control plane where the Swarm is initialized. Manager responsibilities include:

- Maintaining the cluster’s desired state
- Scheduling and orchestrating containers
- Adding or removing nodes
- Monitoring health and distributing services

Relying on a single manager is risky: if it goes down, there’s no orchestrator. Deploying multiple managers increases resilience but introduces the risk of conflicting decisions. Docker Swarm avoids this by electing one manager as the **leader**, which alone makes scheduling decisions. All managers—including the leader—must agree on changes via a consensus protocol before they’re committed.

![The image illustrates a Docker Swarm architecture with three manager nodes, including a leader, and three worker nodes, all labeled as Docker Hosts.](https://kodekloud.com/kk-media/image/upload/v1752873935/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-High-Availability-Quorum/docker-swarm-architecture-nodes.jpg)

Even the leader must replicate its decisions to a majority of managers to avoid split-brain scenarios. Docker implements this using the [Raft consensus algorithm](<https://en.wikipedia.org/wiki/Raft_(computer_science)>).

## Distributed Consensus with Raft

Raft ensures that one leader is elected and all state changes are safely replicated:

1.  Each manager starts with a random election timeout.
2.  When a timeout expires, that node requests votes from its peers.
3.  Once it gathers a majority, it becomes leader.
4.  The leader sends periodic heartbeats to followers.
5.  If followers miss heartbeats, they trigger a new election.

When the leader receives a request to change the cluster (e.g., add a worker or create a service), it:

1.  Appends the change as an entry in its Raft log.
2.  Sends the log entry to each follower.
3.  Waits for a majority of acknowledgments.
4.  Commits the change across all Raft logs.

This process guarantees consistency even if the leader fails mid-update.

![The image illustrates the RAFT distributed consensus algorithm, showing a series of nodes with captain hats and databases, with an instruction being passed and acknowledged.](https://kodekloud.com/kk-media/image/upload/v1752873935/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-High-Availability-Quorum/raft-consensus-algorithm-nodes.jpg)

## Quorum and Fault Tolerance

A **quorum** is the minimum number of managers required to make decisions. For _n_ managers:

```
quorum = ⌊n/2⌋ + 1
```

Fault tolerance is the number of manager failures the cluster can sustain:

```
fault_tolerance = ⌊(n - 1) / 2⌋
```

| Managers (n) | Quorum (⌊n/2⌋+1) | Fault Tolerance (⌊(n-1)/2⌋) |
| ------------ | ---------------- | --------------------------- |
| 3            | 2                | 1                           |
| 5            | 3                | 2                           |
| 7            | 4                | 3                           |

![The image explains the concept of quorum in a distributed system, showing a table of managers, majority, and fault tolerance, along with a formula for calculating quorum. It also includes Docker recommendations and illustrations of Docker-themed characters.](https://kodekloud.com/kk-media/image/upload/v1752873936/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-High-Availability-Quorum/quorum-distributed-system-docker.jpg)

Docker recommends no more than **seven** managers per Swarm. More managers do not improve performance or scalability and only increase coordination overhead.

> [!important]
> **Note**
>
> Always keep an odd number of managers (3, 5, or 7) to prevent split-brain scenarios during network partitions.

## Best Practices for Manager Distribution

1.  Use an **odd number** of managers (3, 5, or 7).
2.  Spread managers across distinct failure domains (data centers or availability zones).
3.  For seven managers, a **3–2–2** distribution across three sites ensures that losing any single site still leaves a quorum.

![The image illustrates a distribution of managers across three sites (A, B, and C) with a table showing the number of managers, majority, and fault tolerance. It highlights a best practice of distributing seven managers in a 3-2-2 configuration.](https://kodekloud.com/kk-media/image/upload/v1752873938/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-High-Availability-Quorum/manager-distribution-3-2-2-config.jpg)

## Failure Scenarios and Recovery

Imagine a Swarm with three managers and five workers hosting a web application. The quorum is two managers. If two managers go offline:

- The remaining manager can **no longer** perform cluster changes (no new nodes, no service updates).
- Existing services continue to run, but self-healing and scaling are disabled.

### Recovering Quorum

1.  Bring failed managers back online. Once you restore at least one, the cluster regains quorum.
2.  If you cannot recover old managers and only one remains, force a new cluster:

    ```
    docker swarm init --force-new-cluster
    ```

    This single node becomes the manager, and existing workers resume running services.

3.  Re-add additional managers:

    ```
    # Promote an existing node to manager
    docker node promote <NODE>


    # Or join a new manager
    docker swarm join --token <MANAGER_TOKEN> <MANAGER_IP>:2377
    ```

That covers high availability, quorum calculation, Raft consensus, and best practices for Docker Swarm manager nodes. Good luck!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/e278e002-ec39-4895-8486-bce0f49c984d)**
>
> Watch video content
