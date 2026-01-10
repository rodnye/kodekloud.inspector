# Demo Service in Swarm Basic Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Service-in-Swarm-Basic-Operations)

---

## Table of Contents

- Demo Service in Swarm Basic Operations
  - Table of Contents
  - 1. Verify Cluster Status
  - 2. Create Your First Service
  - 3. Inspect Tasks and Service Details
  - 4. View Service Logs
  - 5. Self-Healing Demonstration
  - 6. Remove the Service
  - 7. Scale Services
  - 8. Rolling Updates
  - 9. Rollback
  - 10. Quick Command Reference
  - Links and References
  - Watch Video
    - a. Create a Service with Three Replicas
    - b. Scale Up to Five Replicas
    - c. Scale Down to Three Replicas

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Service in Swarm Basic Operations

Docker Swarm lets you manage containerized applications as services rather than individual containers. A **service** in Swarm mode ensures your desired state—replicas, load balancing, rolling updates, and self-healing—are always maintained.

## Table of Contents

1.  [Verify Cluster Status](#1-verify-cluster-status)
2.  [Create Your First Service](#2-create-your-first-service)
3.  [Inspect Tasks and Service Details](#3-inspect-tasks-and-service-details)
4.  [View Service Logs](#4-view-service-logs)
5.  [Self-Healing Demonstration](#5-self-healing-demonstration)
6.  [Remove the Service](#6-remove-the-service)
7.  [Scale Services](#7-scale-services)
8.  [Rolling Updates](#8-rolling-updates)
9.  [Rollback](#9-rollback)
10. [Quick Command Reference](#10-quick-command-reference)

---

## 1\. Verify Cluster Status

Ensure your 6-node Swarm is healthy and managers/workers are all **Ready**:

```
docker node ls
```

Sample output:

```
ID                            HOSTNAME       STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
kvbhteg486wmj881wp5vkqx53 *  managerone     Ready   Active       Leader          19.03.8
u81imabedhzsu4cawtoz6jh32    managerthree   Ready   Active       Reachable       19.03.8
s2zymqdbtfal66imydx31rlno    managertwo     Ready   Active       Reachable       19.03.8
38oehht7y9bsfs7kcoeji2cvah   workerone      Ready   Active       Active          19.03.8
k4gcc5ooc0mn8xl3f6bm2bp2d    workerthree    Ready   Active       Active          19.03.8
1pqddmhc2f0y79vq9najr841d    workertwo      Ready   Active       Active          19.03.8
```

> [!important]
> **Note**
>
> Always confirm that at least one manager node is in **Leader** status before proceeding.

---

## 2\. Create Your First Service

Deploy a simple HTTP server using the `httpd:alpine` image on port 80:

```
docker service create \
  --name first-service \
  -p 80:80 \
  httpd:alpine
```

Verify that the service is up:

```
docker service ls
```

Expected output:

```
ID             NAME            MODE         REPLICAS  IMAGE            PORTS
njoes31daltz   first-service   replicated   1/1       httpd:alpine     *:80->80/tcp
```

---

## 3\. Inspect Tasks and Service Details

List the tasks (containers) for `first-service`:

```
docker service ps first-service
```

For a detailed, human-friendly overview:

```
docker service inspect first-service --pretty
```

Key excerpt:

```
Name:           first-service
Service Mode:   Replicated
 Replicas:      1
Image:          httpd:alpine@sha256:...
Ports:
 Published:     80/TCP → 80/TCP
```

---

## 4\. View Service Logs

Stream logs to troubleshoot or verify startup:

```
docker service logs first-service
```

---

## 5\. Self-Healing Demonstration

Swarm automatically replaces failed tasks to maintain the desired replica count.

1.  On a worker, find and remove the container:

    ```
    docker container ls
    docker rm -f <container_id>
    ```

2.  Back on a manager, confirm Swarm recreated it:

    ```
    docker service ps first-service
    ```

> [!important]
> **Self-Healing in Action**
>
> Swarm will detect that the replica count is below the desired state and launch a new task immediately.

---

## 6\. Remove the Service

Clean up by removing the service and all its tasks:

```
docker service rm first-service
docker service ls
```

---

## 7\. Scale Services

Run multiple replicas behind Swarm’s built-in load balancer to ensure zero downtime.

### a. Create a Service with Three Replicas

```
docker service create \
  --name second-service \
  -p 80:80 \
  --replicas 3 \
  httpd:alpine
```

Verify:

```
docker service ls
docker service ps second-service
```

### b. Scale Up to Five Replicas

```
docker service update --replicas 5 second-service
```

### c. Scale Down to Three Replicas

```
docker service update --replicas 3 second-service
```

---

## 8\. Rolling Updates

Perform seamless image upgrades without stopping traffic.

1.  View current image:

    ```
    docker service inspect second-service --pretty | grep -i Image
    ```

2.  Update to a new tag (e.g., `httpd:2`):

    ```
    docker service update --image httpd:2 second-service
    ```

3.  Monitor rollout:

    ```
    docker service ls
    docker service ps second-service
    ```

> [!important]
> **Warning**
>
> During rolling updates, verify your application’s health checks to avoid cascading failures.

---

## 9\. Rollback

If an update misbehaves, revert immediately:

```
docker service update --rollback second-service
docker service inspect second-service --pretty | grep -i Image
```

---

## 10\. Quick Command Reference

| Operation          | Command                                               |
| ------------------ | ----------------------------------------------------- |
| Verify cluster     | `docker node ls`                                      |
| Create service     | `docker service create --name <svc> -p 80:80 <image>` |
| List services      | `docker service ls`                                   |
| Inspect service    | `docker service inspect <svc> --pretty`               |
| View service tasks | `docker service ps <svc>`                             |
| Stream logs        | `docker service logs <svc>`                           |
| Remove service     | `docker service rm <svc>`                             |
| Scale service      | `docker service update --replicas <n> <svc>`          |
| Rolling update     | `docker service update --image <image:tag> <svc>`     |
| Rollback           | `docker service update --rollback <svc>`              |

---

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Service Commands](https://docs.docker.com/engine/reference/commandline/service/)
- [Rolling Updates](https://docs.docker.com/engine/swarm/how-swarm-mode-works/swarm-task-states/#rolling-updates)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/e6322da9-a312-4d22-965b-1e5f190178ca)**
>
> Watch video content
