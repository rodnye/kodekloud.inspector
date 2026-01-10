# Deploy voting app on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Deploy-voting-app-on-Kubernetes)

---

## Table of Contents

- Deploy voting app on Kubernetes
  - Objectives
  - High-Level Plan
  - Connectivity Requirements
  - Service Types
  - Summary of Resources
  - Docker Images
  - Links and References
  - Watch Video
    - Why Use a Service?
      - Database Credentials

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Deploy voting app on Kubernetes

Learn how to deploy a containerized voting application on Kubernetes. In this guide, we’ll walk through deploying each component as a container, configuring intra-cluster connectivity, and exposing the frontend services externally.

## Objectives

- Deploy each service as containers on a Kubernetes cluster
- Enable reliable connectivity so services can communicate
- Expose the Voting and Result apps externally via web browser

![The image shows a diagram of an example voting app architecture with components like voting-app, result-app, redis, postgres, and worker. It also lists goals: deploy containers, enable connectivity, and external access.](https://kodekloud.com/kk-media/image/upload/v1752873989/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deploy-voting-app-on-Kubernetes/voting-app-architecture-diagram.jpg)

## High-Level Plan

1.  Deploy each application as a standalone Pod (we’ll convert them to Deployments later).
2.  Create Services for internal connectivity:
    - **redis** (ClusterIP)
    - **db** (ClusterIP)
3.  Expose the frontends using NodePort Services:
    - **voting-app**
    - **result-app**
4.  Skip a Service for the worker (it’s only a background job).

## Connectivity Requirements

- **voting-app** writes votes to Redis.
- **worker** reads votes from Redis and writes aggregates to PostgreSQL.
- **result-app** reads results from PostgreSQL to display.
- **voting-app** and **result-app** are user-facing.
- **worker** runs in the background and doesn’t receive external traffic.

Each component listens on its own port:

- voting-app: 80
- result-app: 80
- redis: 6379
- postgres: 5432
- worker: no external port

### Why Use a Service?

Pod IPs are ephemeral. Kubernetes Services provide a stable DNS name and virtual IP. For example, the Python app connects to Redis at host `redis`:

```
# app.py
from flask import Flask, g
from redis import Redis

app = Flask(__name__)

def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

And in C# the services connect using the Service DNS names:

```
// Program.cs
var pgsql = OpenDbConnection("Server=db;Username=postgres;Password=postgres;");
var redisConn = OpenRedisConnection("redis");
var redis = redisConn.GetDatabase();
```

#### Database Credentials

- **Username:** postgres
- **Password:** postgres

## Service Types

- **ClusterIP**: Internal-only (redis, db)
- **NodePort**: External access (voting-app, result-app) – ports > 30000

## Summary of Resources

| Resource   | Type | Service Type | Port |
| ---------- | ---- | ------------ | ---- |
| voting-app | Pod  | NodePort     | 80   |
| result-app | Pod  | NodePort     | 80   |
| redis      | Pod  | ClusterIP    | 6379 |
| postgres   | Pod  | ClusterIP    | 5432 |
| worker     | Pod  | (none)       | —    |

> [!important]
> **Note**
>
> The **worker** Pod has no Service because it does not receive traffic from other components.

## Docker Images

We’ll use the following container images:

- `kodekloud/example-voting-app_vote:v1`
- `kodekloud/example-voting-app_worker:v1`
- `kodekloud/example-voting-app_result:v1`
- `redis:latest`
- `postgres:latest`

![The image is a diagram of a Kubernetes deployment for an example voting app, showing different pods (voting-app, result-app, redis, postgres, worker) and their interactions through services. It includes steps for deploying pods and creating services with ClusterIP and NodePort.](https://kodekloud.com/kk-media/image/upload/v1752873990/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deploy-voting-app-on-Kubernetes/kubernetes-voting-app-deployment-diagram.jpg)

In the next section, we’ll create the Pods and Services and test the end-to-end workflow of the voting application.

## Links and References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Flask Redis Client](https://pypi.org/project/redis/)
- [Npgsql .NET Driver](https://www.npgsql.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/b8b05fda-aefb-40c1-b079-ef5f174ab682)**
>
> Watch video content
