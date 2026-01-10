# Swarm in HA mode - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-in-HA-mode)

---

## Table of Contents

- Swarm in HA mode
  - Prerequisites
  - 1. Initialize the Swarm
  - 2. Add Additional Managers
  - 3. Add Worker Nodes
  - 4. Testing Manager Quorum
  - 5. Restoring Quorum
  - Conclusion
  - Links and References
  - Watch Video
    - 2.1 Retrieve Manager Join Token
    - 2.2 Join managertwo and managerthree
    - 2.3 Verify Managers
    - 3.1 Retrieve Worker Join Token
    - 3.2 Join workerone, workertwo, workerthree
    - 4.1 Simulate One Manager Failure
    - 4.2 Simulate Two Manager Failures

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm in HA mode

In this guide, you’ll learn how to configure a Docker Swarm cluster in HA mode with three manager nodes and three worker nodes. We’ll cover initialization, adding managers and workers, testing quorum, and restoring cluster health.

## Prerequisites

- Six CentOS 7.6 VMs (2 vCPU, 4 GB RAM) on AWS
- Docker 19.03 installed on all nodes
- Swarm ports open (2377, 7946 TCP/UDP, 4789 UDP)
- Fully qualified hostnames and name resolution for all nodes

| Hostname     | IP Address    | Role (after setup) |
| ------------ | ------------- | ------------------ |
| managerone   | 172.31.42.232 | Manager (Leader)   |
| managertwo   | 172.31.42.xxx | Manager (Replica)  |
| managerthree | 172.31.42.xxx | Manager (Replica)  |
| workerone    | 172.31.39.115 | Worker             |
| workertwo    | 172.31.39.xxx | Worker             |
| workerthree  | 172.31.39.xxx | Worker             |

Verify OS and Docker:

```
[root@managerone ~]# cat /etc/centos-release
CentOS Linux release 7.6.1810 (Core)
[root@managerone ~]# nproc
2
[root@managerone ~]# docker version --format '{{.Server.Version}}'
19.03.8
```

Verify network connectivity:

```
[root@managerone ~]# ping -c2 workerone
PING workerone (172.31.39.115): 56 data bytes
64 bytes from workerone: icmp_seq=1 ttl=64 time=0.45 ms
```

## 1\. Initialize the Swarm

On **managerone**, initialize the Swarm and advertise its IP:

```
[root@managerone ~]# docker swarm init --advertise-addr 172.31.42.232
Swarm initialized: current node (kvbht...) is now a manager.
```

Confirm Swarm status:

```
[root@managerone ~]# docker info --format '{{.Swarm.LocalNodeState}}'
active
```

> [!important]
> **Note**
>
> The `--advertise-addr` flag sets the manager’s reachable IP for new nodes.

## 2\. Add Additional Managers

### 2.1 Retrieve Manager Join Token

On **managerone**:

```
[root@managerone ~]# docker swarm join-token manager --quiet
SWMTKN-1-xxxxx-xxxx
```

### 2.2 Join `managertwo` and `managerthree`

On each additional manager node:

```
[root@managertwo ~]# docker swarm join --token SWMTKN-1-xxxxx-xxxx 172.31.42.232:2377
This node joined a swarm as a manager.
```

Repeat on **managerthree**.

### 2.3 Verify Managers

From **managerone**:

```
[root@managerone ~]# docker node ls
ID      HOSTNAME       STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
* kvbht...  managerone     Ready   Active        Leader          19.03.8
  s2zym...  managertwo     Ready   Active        Reachable       19.03.8
  u81im...  managerthree   Ready   Active        Reachable       19.03.8
```

## 3\. Add Worker Nodes

### 3.1 Retrieve Worker Join Token

On **managerone**:

```
[root@managerone ~]# docker swarm join-token worker --quiet
SWMTKN-1-yyyyy-yyyy
```

### 3.2 Join `workerone`, `workertwo`, `workerthree`

On each worker:

```
[root@workerone ~]# docker swarm join --token SWMTKN-1-yyyyy-yyyy 172.31.42.232:2377
This node joined a swarm as a worker.
```

Verify all nodes:

```
[root@managerone ~]# docker node ls
ID      HOSTNAME       ROLE      MANAGER STATUS  AVAILABILITY  ENGINE VERSION
* kvbht...  managerone   Manager   Leader          Active        19.03.8
  s2zym...  managertwo   Manager   Reachable       Active        19.03.8
  u81im...  managerthree Manager   Reachable       Active        19.03.8
  38oeh...  workerone    Worker    —               Active        19.03.8
  1pqdd...  workertwo    Worker    —               Active        19.03.8
  k4gc5...  workerthree  Worker    —               Active        19.03.8
```

## 4\. Testing Manager Quorum

Docker Swarm requires a majority of manager nodes to maintain a leader.

### 4.1 Simulate One Manager Failure

On **managertwo**:

```
[root@managertwo ~]# systemctl stop docker
```

Check from **managerone**:

```
[root@managerone ~]# docker node ls
… managertwo     Down    Active    Unreachable   19.03.8
```

The cluster remains healthy (2 of 3 managers online).

### 4.2 Simulate Two Manager Failures

On **managerthree**:

```
[root@managerthree ~]# systemctl stop docker
```

Then on **managerone**:

```
[root@managerone ~]# docker node ls
Error response from daemon: … The swarm does not have a leader …
```

With only one manager online, the cluster loses quorum and cannot elect a leader.

> [!important]
> **Warning**
>
> Never simulate quorum loss in production. You will lose control over scheduling and service updates.

## 5\. Restoring Quorum

1.  Start Docker on **managertwo**:

    ```
    [root@managertwo ~]# systemctl start docker
    ```

2.  Wait for the node to rejoin (quorum 2/3 restored).
3.  Start Docker on **managerthree**:

    ```
    [root@managerthree ~]# systemctl start docker
    ```

4.  Verify:

    ```
    [root@managerone ~]# docker node ls
    ```

All managers should show `Leader` or `Reachable`.

## Conclusion

You’ve now deployed a Docker Swarm in HA mode, added managers and workers, tested quorum behavior, and restored cluster health. This setup ensures fault tolerance and continuous service availability.

## Links and References

- [Docker Swarm Mode Overview](https://docs.docker.com/engine/swarm/)
- [Swarm Init](https://docs.docker.com/engine/reference/commandline/swarm_init/)
- [Swarm Join](https://docs.docker.com/engine/reference/commandline/swarm_join/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/40648232-d303-4140-8471-41c8f837cf78)**
>
> Watch video content
