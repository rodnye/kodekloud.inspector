# Swarm Service Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Service-Types)

---

## Table of Contents

- Swarm Service Types
  - Replicated Service
  - Global Service
  - Comparison Table
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Service Types

In Docker Swarm, services define how containers are deployed and managed across a cluster. Swarm supports two primary service modes: **replicated** and **global**. This guide explains each mode, shows how to deploy them, and compares their use cases.

## Replicated Service

A _replicated_ service launches a specified number of identical tasks (containers). This is the default mode in Swarm.

> [!important]
> **Note**
>
> If you omit `--replicas`, Swarm defaults to 1 replica. You can also explicitly set `--mode replicated` if you prefer.

To deploy five replicas of a web service:

```
docker service create \
  --name web \
  --replicas 5 \
  nginx:latest
```

Verify the service mode and replica count:

```
docker service inspect web \
  --format '{{json .Spec.Mode}}'
```

Sample output:

```
{"Replicated":{"Replicas":5}}
```

Key points for replicated services:

- Tasks are spread evenly across available nodes.
- Scale up or down by updating `--replicas`.
- Ideal for stateless applications like web servers or APIs.

## Global Service

A _global_ service ensures exactly one task runs on every node in the Swarm.

> [!important]
> **Warning**
>
> Do **not** specify `--replicas` with global services. Use only `--mode global`.

To deploy a monitoring agent on all nodes:

```
docker service create \
  --name agent \
  --mode global \
  my-monitoring-agent:1.0
```

Global mode behavior:

- New nodes automatically receive one task.
- When a node leaves, its task is removed and not rescheduled.
- Perfect for logging, monitoring, and security daemons.

## Comparison Table

| Service Type | Replica Count    | Scheduling Behavior                | Common Use Case                  |
| ------------ | ---------------- | ---------------------------------- | -------------------------------- |
| Replicated   | User-defined (N) | Distributes tasks evenly           | Scalable web apps, microservices |
| Global       | One per node     | Runs exactly one task on each node | Agents for logging, monitoring   |

## References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [docker service create](https://docs.docker.com/engine/reference/commandline/service_create/)
- [docker service inspect](https://docs.docker.com/engine/reference/commandline/service_inspect/)
- [Docker Blog: Introduction to Swarm Mode](https://www.docker.com/blog/docker-swarm-mode-introduction/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/fbc7044c-ddc3-4458-ab2a-3d4db24d7090)**
>
> Watch video content
