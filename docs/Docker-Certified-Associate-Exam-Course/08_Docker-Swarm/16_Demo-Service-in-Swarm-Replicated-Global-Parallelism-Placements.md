# Demo Service in Swarm Replicated Global Parallelism Placements - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Service-in-Swarm-Replicated-Global-Parallelism-Placements)

---

## Table of Contents

- Demo Service in Swarm Replicated Global Parallelism Placements
  - 1. Update Parallelism
  - 2. Replicated Service
  - 3. Global Service
  - 4. Placement Constraints
  - Service Mode Comparison
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Service in Swarm Replicated Global Parallelism Placements

In this tutorial, you’ll learn how to optimize your Docker Swarm services by controlling update parallelism, scaling replicated services, running tasks globally, and enforcing placement constraints. Whether you’re rolling out updates or targeting specific nodes, these patterns will help you deploy reliably at scale.

We’ll cover:

- Controlling update parallelism
- Creating replicated services
- Running services in global mode
- Constraining services to specific nodes

---

## 1\. Update Parallelism

By default, Swarm updates one task at a time. Adjusting the update parallelism speeds up rollouts or rollbacks across many tasks.

```
docker service inspect secondservice --pretty
```

Example output:

```
UpdateConfig:
  Parallelism:         1
  On failure:          pause
  Monitoring Period:   5s
  Max failure ratio:   0
  Update order:        stop-first

RollbackConfig:
  Parallelism:         1
  On failure:          pause
  Monitoring Period:   5s
  Max failure ratio:   0
  Rollback order:      stop-first
```

To upgrade two tasks at a time, use `--update-parallelism`:

```
docker service update \
  --image httpd:2 \
  --update-parallelism 2 \
  secondservice
```

Re-inspect to confirm the change:

```
docker service inspect secondservice --pretty
```

You’ll see `UpdateConfig.Parallelism: 2` while the rollback parallelism remains unchanged.

> [!important]
> **Note**
>
> Increasing `--update-parallelism` accelerates rollouts but may spike resource usage. Tune based on your cluster capacity.

---

## 2\. Replicated Service

A replicated service ensures a fixed number of identical tasks across the swarm.

```
docker service create \
  --name replicatedtest \
  --replicas 8 \
  redis:latest
```

Progress output:

```
overall progress: 8 out of 8 tasks
1/8: running    [==============>              ]
…
8/8: running    [==============================]
verify: Service converged
```

Verify service and mode:

```
docker service ls
docker service inspect replicatedtest --pretty | grep Mode
```

Output:

```
Mode: replicated
Replicas: 8
```

---

## 3\. Global Service

Global mode deploys exactly one task per active node. When nodes join or leave, tasks are added or removed automatically.

```
docker service create \
  --mode global \
  --name globaltest \
  redis:latest
```

You’ll see a task scheduled on each node:

```
overall progress: 6 out of 6 tasks
a1b2c3d4e5f6: running [==============================>]
…
z9y8x7w6v5u4: running [==============================>]
verify: Service converged
```

Confirm:

```
docker service ls
docker node ls
```

---

## 4\. Placement Constraints

Placement constraints let you target services to nodes with specific labels.

1.  **Label the node** (replace `<NODE_ID>`):

    ```
    docker node update --label-add env=dev <NODE_ID>
    ```

2.  **Verify the label**:

    ```
    docker node inspect <NODE_ID> --format '{{ .Spec.Labels }}'
    ```

3.  **Create the constrained service**:

    ```
    docker service create \
      --name placementtest \
      --constraint node.labels.env==dev \
      --replicas 3 \
      redis:latest
    ```

All three tasks will run only on the node labeled `env=dev`.

> [!important]
> **Warning**
>
> If no nodes match the constraint, the service remains pending. Always verify labels before deployment.

---

## Service Mode Comparison

| Service Mode | Description                         | Example Flag           |
| ------------ | ----------------------------------- | ---------------------- |
| Replicated   | Fixed number of tasks               | `--replicas 8`         |
| Global       | One task per active node            | `--mode global`        |
| UpdateConfig | Control rollout parallelism & order | `--update-parallelism` |

---

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [docker service update](https://docs.docker.com/engine/reference/commandline/service_update/)
- [Scheduling tasks in swarm mode](https://docs.docker.com/engine/swarm/how-swarm-mode-works/swarm-task/)

That concludes this demo on Docker Swarm update parallelism, service modes, and placement constraints.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/c42b667e-1278-4722-ae4d-73cdb55c544a)**
>
> Watch video content
