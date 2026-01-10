# Swarm Setup 2 node Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Setup-2-node-Cluster)

---

## Table of Contents

- Swarm Setup 2 node Cluster
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Setup 2 node Cluster

````
In this guide, you'll learn how to set up a Docker Swarm cluster with one manager and two workers, perform basic node operations, and verify cluster status. By the end, you'll be ready to add, promote, or drain nodes in your Swarm.


## Prerequisites


1. Three machines (physical or virtual), on-premise or cloud.
2. Static IPs assigned:
   - **manager1**: 172.31.46.126
   - **worker1**: 172.31.46.127
   - **worker2**: 172.31.46.128
3. Install [Docker Engine](https://docs.docker.com/engine/install/) on each host.
4. Open firewall ports for Swarm communication:


| Port     | Protocol | Description                          |
|----------|----------|--------------------------------------|
| 2377     | TCP      | Cluster management                   |
| 7946     | TCP/UDP  | Node-to-node communication           |
| 4789     | UDP      | Overlay network (VXLAN) traffic      |
,[object Object],


## Verify Docker and Swarm Status


After installation, run:


```bash
docker system info
```text


Look for:


```plain
Swarm: inactive
```text


If `Swarm: inactive`, the node is not yet part of a Swarm cluster.


## 1. Initialize the Swarm Manager


On **manager1**, execute:


```bash
docker swarm init --advertise-addr 172.31.46.126
```text


This:


- Configures the host as the Swarm manager
- Prints the `docker swarm join` command with a token for workers


Re-run `docker system info` to confirm:


```plain
Swarm: active
```text


## 2. Join Worker Nodes


Copy the join command from the manager’s output and run on each worker:


```bash
# On worker1
docker swarm join \
  --token SWMTKN-1-xxxxxxxxxxxxxxxxxxxxxxxx \
  172.31.46.126:2377


# On worker2
docker swarm join \
  --token SWMTKN-1-xxxxxxxxxxxxxxxxxxxxxxxx \
  172.31.46.126:2377
```text
,[object Object],


## 3. Verify Cluster Nodes


On the manager, list all nodes:


```bash
docker node ls
```text


Example output:


```plain
ID                            HOSTNAME   STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
91uxgq6i78j1hu5v7moq7vgz *    manager1   Ready   Active        Leader          19.03.8
2lux7z6p96g6vtx0h6a2wo2r       worker1    Ready   Active        <none>          19.03.8
w0qr6k2cee3ojawmflc26pvp3      worker2    Ready   Active        <none>          19.03.8
```text


| Column            | Description                                                                                   |
|-------------------|-----------------------------------------------------------------------------------------------|
| **STATUS**        | Ready: node is healthy and participating                                                     |
| **AVAILABILITY**  | Active: scheduler assigns tasks<br>Pause: no new tasks, existing continue<br>Drain: tasks moved off |
| **MANAGER STATUS**| Leader: primary manager<br>Reachable: manager node able to take over<br>&lt;none&gt;: worker |

The `*` marks the node where the command was run.


## 4. Inspect a Node


Get detailed info on any node:


```bash
docker node inspect manager1 --pretty
```text


Sample output:


```plain
ID:             91uxgq6i78j1hu5v7moq7vgz
Hostname:       manager1
  State:        Ready
  Availability: Active
  Address:      172.31.46.126
Manager Status:
  Address:      172.31.46.126:2377
  Raft Status:  Reachable
````

This reveals role, status, and network details.

---

## Next Steps

In the next lesson, you’ll learn how to:

- Promote a worker to manager
- Drain nodes for maintenance
- Update and roll back services

## Links and References

- [Docker Engine Documentation](https://docs.docker.com/engine/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Swarm Mode Networking](https://docs.docker.com/engine/swarm/networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/7b921aaf-ea53-4a52-84cd-b8069a1093a1)**
>
> Watch video content
