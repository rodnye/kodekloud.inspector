# Swarm Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Architecture)

---

## Table of Contents

- Swarm Architecture
  - Swarm Cluster Components
  - Declarative Service Definitions
  - Key Features of Docker Swarm
  - Summary and Next Steps
  - Links and References
  - Watch Video
    - 1. Simplified Setup and Maintenance
    - 2. Scalability and Load Balancing
    - 3. Rolling Updates and Self-Healing
    - 4. Secure Networking and Service Discovery

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Architecture

Running containers on a single Docker host is convenient for development or testing, but in production it introduces a single point of failure. If that host goes down, all your services become unavailable. Docker Swarm solves this by clustering multiple Docker hosts into one logical unit, providing high availability, load balancing, and seamless scaling.

## Swarm Cluster Components

A Swarm cluster groups physical or virtual machines—on-premises or in the cloud—into a unified environment. Every node runs Docker Engine and joins the cluster either as a manager or a worker.

| Node Type | Responsibilities                                             | Commands                                   |
| --------- | ------------------------------------------------------------ | ------------------------------------------ |
| Manager   | Maintains desired state, schedules tasks, serves the API     | `docker node ls`<br/>`docker node promote` |
| Worker    | Executes tasks assigned by managers, runs service containers | `docker node ls`<br/>`docker node demote`  |

> [!important]
> **Note**
>
> By default, manager nodes can handle workloads in addition to management tasks. To dedicate a manager solely to orchestration, use `docker node update --availability drain <node>`.

When you deploy an application, you submit a service definition to a manager. The manager translates it into tasks and distributes them across worker nodes, which then run the required containers.

## Declarative Service Definitions

Docker Swarm uses declarative YAML files—similar to Docker Compose—to define multi-service applications. Store these files in version control to track changes and facilitate CI/CD workflows:

```
# service-definition.yml
version: "3.8"
services:
  web:
    image: "simple-webapp:latest"
    ports:
      - "80:80"
  database:
    image: "mongo:5.0"
    volumes:
      - db-data:/data/db
  cache:
    image: "redis:alpine"
    deploy:
      replicas: 2


volumes:
  db-data:
```

> [!important]
> **Note**
>
> Declarative definitions allow you to scale, update, and rollback services with a single command: `docker stack deploy -c service-definition.yml my_stack`.

## Key Features of Docker Swarm

### 1\. Simplified Setup and Maintenance

Swarm is built directly into Docker Engine, so there’s no extra software to install. With the Docker CLI you can:

- Initialize a new cluster: `docker swarm init`
- Join nodes to the cluster: `docker swarm join --token <token> <manager-ip>:2377`
- Promote or demote managers: `docker node promote <node>`

![The image lists features of Docker Swarm, such as simplified setup and scaling, alongside a diagram showing a Docker Swarm setup with manager and worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752873930/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-Architecture/docker-swarm-features-setup-diagram.jpg)

### 2\. Scalability and Load Balancing

You can scale services on demand using:

```
docker service scale web=10
```

Swarm’s internal load balancer distributes requests across all healthy containers. If you need an external load balancer, point it at any manager or worker node.

![The image illustrates the features of Docker Swarm, highlighting aspects like simplified setup, scaling, and load balancing, alongside a diagram showing an external load balancer connected to Docker hosts with web services.](https://kodekloud.com/kk-media/image/upload/v1752873932/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-Architecture/docker-swarm-features-diagram.jpg)

### 3\. Rolling Updates and Self-Healing

Swarm performs rolling updates by default, updating one container at a time:

```
docker service update \
  --image simple-webapp:2.0 \
  --update-parallelism 2 \
  --update-delay 10s \
  web
```

If a container crashes or fails health checks, Swarm automatically replaces it to match the desired state.

> [!important]
> **Warning**
>
> Always test updates in a staging environment before applying to production. Use `--rollback` to revert quickly if an update misbehaves.

### 4\. Secure Networking and Service Discovery

Node-to-node communication is secured with mutual TLS. Overlay networks let containers on different hosts communicate as if they were on the same LAN. Built-in DNS routing ensures each service name resolves to the correct VIP or container IP.

![The image describes features of Docker Swarm, including simplified setup, scaling, and service discovery, alongside a diagram showing a manager node with a DNS server and worker nodes with web services.](https://kodekloud.com/kk-media/image/upload/v1752873934/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-Architecture/docker-swarm-features-diagram-2.jpg)

## Summary and Next Steps

In this article, we covered the core architecture and features that make Docker Swarm a powerful container orchestration solution. You learned about:

- Cluster components and node roles
- Declarative service definitions
- Key features: setup, scaling, updates, and networking

Next, dive into practical guides on:

- Setting up a multi-node Swarm cluster
- Deploying production-grade services
- Advanced networking patterns

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Docker Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Networking Guide](https://docs.docker.com/network/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/6b6f6d6a-9fe3-424a-bf00-c93d04a2010e)**
>
> Watch video content
