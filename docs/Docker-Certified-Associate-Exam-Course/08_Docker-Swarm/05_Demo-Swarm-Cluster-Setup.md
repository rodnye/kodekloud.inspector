# Demo Swarm Cluster Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Swarm-Cluster-Setup)

---

## Table of Contents

- Demo Swarm Cluster Setup
  - System Overview
  - 1. Initialize the Swarm on managerone
  - 2. Add the First Worker (workerone)
  - 3. Add the Second Worker (workertwo)
  - 4. Promote a Worker to Manager
  - 5. Demote a Manager back to Worker
  - 6. Drain and Reactivate a Node
  - 7. Remove a Node from the Swarm
  - References and Further Reading
  - Watch Video
    - 3.1. Prepare workertwo
    - 3.2. Retrieve and Run the Join Token

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Swarm Cluster Setup

In this step-by-step guide, you will learn how to bootstrap a resilient Docker Swarm cluster on CentOS 7.6, manage node roles, control availability, and gracefully remove nodes. By the end of this tutorial, you’ll have a three-node swarm (one manager, two workers) and know how to:

1.  Initialize the swarm
2.  Join worker nodes
3.  Promote and demote managers
4.  Drain and reactivate nodes
5.  Remove nodes from the cluster

This tutorial assumes all nodes can resolve each other by hostname, have open swarm ports, and run Docker Engine v19.03.8 or later.

> [!important]
> **Prerequisites**
>
> - Three CentOS 7.6 servers (`managerone`, `workerone`, `workertwo`)
> - 2 CPU cores and 4 GB RAM each
> - Hostname resolution (e.g., via `/etc/hosts` or DNS)
> - Open ports:
> - TCP 2377 for cluster management
> - TCP/UDP 7946 for node discovery
> - UDP 4789 for overlay networking
> - Docker Engine installed and running

## System Overview

| Node       | OS Release                           | CPUs | Memory (MiB) | Docker Version |
| ---------- | ------------------------------------ | ---- | ------------ | -------------- |
| managerone | CentOS Linux release 7.6.1810 (Core) | 2    | 3787         | 19.03.8        |
| workerone  | CentOS Linux release 7.6.1810 (Core) | 2    | 3787         | 19.03.8        |
| workertwo  | CentOS Linux release 7.6.1810 (Core) | 2    | 3787         | 19.03.8        |

## 1\. Initialize the Swarm on `managerone`

1.  Confirm Swarm is inactive:

    ```
    docker system info | grep -i swarm
    # Swarm: inactive
    ```

2.  Initialize with the manager’s advertise address:

    ```
    docker swarm init --advertise-addr 172.31.42.232
    ```

    After initialization, note the worker join command output:

    ```
    docker swarm join --token <SWARM_WORKER_TOKEN> 172.31.42.232:2377
    ```

## 2\. Add the First Worker (`workerone`)

On **workerone**, run the join command displayed by the manager:

```
docker swarm join \
  --token SWMTKN-1-3fdj9fgrjcrrj5t0pekb42n45tj96zgwxodtwd4ujv4qnhl-cop40spyhgc1tmzythfss49xn \
  172.31.42.232:2377
# This node joined a swarm as a worker.
```

Back on **managerone**, verify:

```
docker node ls
# ID       HOSTNAME    STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
# ...      managerone  Ready   Active        Leader          19.03.8
# ...      workerone   Ready   Active                        19.03.8
```

## 3\. Add the Second Worker (`workertwo`)

### 3.1. Prepare `workertwo`

Ensure OS, CPU, memory, Docker version, and connectivity:

```
cat /etc/centos-release
nproc
free -m
docker --version
systemctl status docker
ping -c3 managerone
ping -c3 workerone
```

### 3.2. Retrieve and Run the Join Token

On **managerone**, print the worker join command:

```
docker swarm join-token worker
```

Copy the `docker swarm join --token …` line and execute it on **workertwo**. Then confirm on **managerone**:

```
docker node ls
# ... workertwo   Ready   Active   19.03.8
```

## 4\. Promote a Worker to Manager

1.  List current nodes:

    ```
    docker node ls
    ```

2.  Promote **workerone**:

    ```
    docker node promote workerone
    # Node workerone promoted to a manager in the swarm.
    ```

3.  Verify the new manager status:

    ```
    docker node ls
    # workerone now shows MANAGER STATUS: Reachable
    ```

4.  (Optional) Inspect **workerone** in detail:

    ```
    docker node inspect workerone --pretty
    ```

## 5\. Demote a Manager back to Worker

If you need to revert **workerone** to a purely worker role:

```
docker node demote workerone
docker node ls
# workerone returns to no MANAGER STATUS
```

## 6\. Drain and Reactivate a Node

To prevent new tasks from scheduling on **workerone**:

```
docker node update --availability drain workerone
docker node ls
# AVAILABILITY: Drain
```

When you’re ready to allow tasks again:

```
docker node update --availability active workerone
docker node ls
# AVAILABILITY: Active
```

## 7\. Remove a Node from the Swarm

1.  Drain **workerone**:

    ```
    docker node update --availability drain workerone
    ```

2.  Attempt removal (will fail if the node is still up):

    ```
    docker node rm workerone
    # Error: node is not down and can't be removed
    ```

3.  On **workerone**, leave the swarm:

    ```
    docker swarm leave
    # Node left the swarm.
    ```

4.  Back on **managerone**, remove the node:

    ```
    docker node rm workerone
    docker node ls
    # Only managerone and workertwo remain.
    ```

Congratulations! You’ve successfully created, scaled, and managed a Docker Swarm cluster on CentOS 7.6.

---

## References and Further Reading

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Get Started with Swarm Mode](https://docs.docker.com/get-started/swarm/)
- [Docker Engine Installation Guide](https://docs.docker.com/engine/install/centos/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/0780e900-ee0f-4afc-8c0e-7355a335dcb7)**
>
> Watch video content
