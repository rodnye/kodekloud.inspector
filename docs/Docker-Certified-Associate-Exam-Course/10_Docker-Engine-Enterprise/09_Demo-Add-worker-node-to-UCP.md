# Demo Add worker node to UCP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Demo-Add-worker-node-to-UCP)

---

## Table of Contents

- Demo Add worker node to UCP
  - 1. Install Docker Enterprise Engine on the New Node
  - 2. Retrieve the Swarm Join Command from UCP
  - 3. Join the Node to the Docker Swarm
  - 4. Verify the Worker Node in UCP
  - Next Steps
  - References
  - Watch Video
    - In the UCP Web Console
    - Via the Docker CLI

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Demo Add worker node to UCP

In this guide, you’ll learn how to seamlessly scale your Docker Universal Control Plane (UCP) cluster by adding a new worker node. We’ll cover:

1.  Installing Docker Enterprise Engine on the new CentOS host
2.  Retrieving the Swarm join command from the UCP web console
3.  Running the join command on the new server
4.  Verifying the node in both the UCP console and via the Docker CLI

## 1\. Install Docker Enterprise Engine on the New Node

Begin by installing Docker Enterprise Engine on your CentOS machine. Follow the official [Docker Engine Enterprise Documentation](https://docs.docker.com/ee/engine/) and select **Linux → CentOS**.

Once installation completes, SSH into your new host (for example, `ucp-worker`) and start Docker:

```
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker
docker --version
```

You should see output similar to:

```
Docker version 19.03.x, build <hash>
```

> [!important]
> **Note**
>
> Ensure your Docker Enterprise Engine version matches the versions running on existing UCP managers to avoid compatibility issues.

## 2\. Retrieve the Swarm Join Command from UCP

1.  Log in to your UCP web console.
2.  Go to **Shared Resources** → **Nodes** → **Add Node**.
3.  Under **Node Type**, choose **Linux**.
4.  Under **Node Role**, select **Worker Node**.

UCP will generate a `docker swarm join` command similar to:

```
docker swarm join \
  --token SWMTKN-1-4liabct184f4mxm03b2rwh0z02m1unv82p8fscdmp1pz1otwr-6ogugl8f0wmj5zmggid1hjuz \
  172.31.32.217:2377
```

> [!important]
> **Warning**
>
> Keep your Swarm join token secret. Treat it like a password and do not expose it in public repositories.

## 3\. Join the Node to the Docker Swarm

On your new CentOS host, copy and run the command provided by UCP:

```
sudo docker swarm join \
  --token SWMTKN-1-4liabct184f4mxm03b2rwh0z02m1unv82p8fscdmp1pz1otwr-6ogugl8f0wmj5zmggid1hjuz \
  172.31.32.217:2377
```

A successful join will return:

```
This node joined a swarm as a worker.
```

## 4\. Verify the Worker Node in UCP

### In the UCP Web Console

1.  Navigate back to **Shared Resources** → **Nodes**.
2.  Confirm your new host appears with **Role: worker** and **Status: Ready**.

### Via the Docker CLI

On any existing manager node, run:

```
docker node ls
```

| ID                  | HOSTNAME    | STATUS | AVAILABILITY | MANAGER STATUS |
| ------------------- | ----------- | ------ | ------------ | -------------- |
| xyz1234567890abcdef | ucp-manager | Ready  | Active       | Leader         |
| abc0987654321fedcba | ucp-worker  | Ready  | Active       | —              |

## Next Steps

Repeat these steps for each additional worker or manager you wish to add. Scaling your UCP cluster enhances fault tolerance and distributes workload effectively.

---

## References

- [Docker Documentation](https://docs.docker.com/)
- [Docker UCP Concepts](https://docs.docker.com/ee/ucp/latest/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/98d0270e-c7d7-49a9-849c-2c531d13cb8f)**
>
> Watch video content
