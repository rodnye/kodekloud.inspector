# Node Addition in UCP cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Node-Addition-in-UCP-cluster)

---

## Table of Contents

- Node Addition in UCP cluster
  - Prerequisites
  - 1. Provisioning and Installing Docker Engine
  - 2. Joining the Swarm Cluster
  - 3. Automatic UCP Agent Deployment
  - 4. Verification in UCP Console
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Node Addition in UCP cluster

Adding worker nodes to your Docker Universal Control Plane (UCP) cluster allows you to scale applications and distribute workloads. In this guide, you’ll learn how to provision a new host, install Docker Engine, join the Swarm cluster, and verify the node in the UCP console.

## Prerequisites

- A running UCP cluster with at least one manager node
- A new host with a supported Linux distribution (e.g., Ubuntu, CentOS)
- SSH access and root or sudo privileges on the new host
- Network connectivity on ports 2376 (Docker daemon) and 2377 (Swarm)

> [!important]
> **Note**
>
> Ensure the Docker Engine version on your new worker matches the UCP manager’s version to prevent compatibility issues.

## 1\. Provisioning and Installing Docker Engine

On the new worker node, install Docker Engine using Docker’s official convenience script:

```
# On the new worker node
curl -fsSL https://get.docker.com | sh
sudo systemctl enable docker
sudo systemctl start docker
```

## 2\. Joining the Swarm Cluster

First, retrieve the worker join token on your UCP manager:

```
# On the Swarm manager
docker swarm join-token worker
```

You’ll see output similar to:

```
To add a worker to this swarm, run the following command:


    docker swarm join --token SWMTKN-1-0abcd1234efgh5678ijkl9012mnop3456 10.0.0.5:2377
```

> [!important]
> **Warning**
>
> Keep the join token confidential; anyone with access can join your Swarm cluster as a worker.

Copy the `docker swarm join` command and execute it on the new worker:

```
# On the new worker node
docker swarm join --token SWMTKN-1-0abcd1234efgh5678ijkl9012mnop3456 10.0.0.5:2377
```

## 3\. Automatic UCP Agent Deployment

UCP configures its agent as a global service in Docker Swarm. After the worker joins:

1.  Docker Swarm schedules the UCP agent on the new node.
2.  The agent pulls and installs UCP components (e.g., UCP proxy).
3.  The node is automatically registered with the UCP control plane.

## 4\. Verification in UCP Console

1.  Open the UCP web UI on your manager node.
2.  Navigate to **Nodes** in the sidebar.
3.  Confirm the new worker appears with the **Worker** role and a **Ready** status.

| Task                | Host            | Command / UI Action                                   |
| ------------------- | --------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| Install Docker      | Worker node     | `curl -fsSL https://get.docker.com \\                 | sh`<br>`sudo systemctl enable docker`<br>`sudo systemctl start docker` |
| Retrieve join token | Manager node    | `docker swarm join-token worker`                      |
| Join the swarm      | Worker node     | `docker swarm join --token <token> <manager-ip>:2377` |
| Verify in UCP       | Manager Console | Go to **Nodes** and check for the new worker          |

Next, let’s walk through a live demo to see this process in action!

## Links and References

- [Docker Engine Installation](https://docs.docker.com/engine/install/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [UCP Administration Guide](https://docs.docker.com/ee/ucp/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/87635106-d520-4944-ab5b-b90e21bd3299)**
>
> Watch video content
