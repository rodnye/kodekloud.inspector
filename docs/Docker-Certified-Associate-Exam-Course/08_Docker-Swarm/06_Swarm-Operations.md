# Swarm Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Operations)

---

## Table of Contents

- Swarm Operations
  - Promote and Demote Nodes
  - Drain a Node for Maintenance
  - Remove a Node from the Swarm
  - References
  - Watch Video
    - Promote a Worker to Manager
    - Demote a Manager to Worker

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Operations

In this lesson, you’ll learn how to:

- Promote and demote Swarm nodes
- Drain nodes for maintenance
- Remove nodes from your cluster

These operations help maintain high availability and streamline cluster management.

## Promote and Demote Nodes

Only Swarm manager nodes can orchestrate the cluster. You can elevate a worker node to manager or revert a manager back to a worker. Run these commands on any current manager.

### Promote a Worker to Manager

```
docker node promote worker1
```

> [!important]
> **Note**
>
> Promoting a node requires you to be connected to an active manager. Check your current context with `docker info`.

Verify the updated node list:

| ID       | HOSTNAME | STATUS | AVAILABILITY | MANAGER STATUS | ENGINE VERSION |
| -------- | -------- | ------ | ------------ | -------------- | -------------- |
| 91uxgq6… | manager1 | Ready  | Active       | Leader         | 19.03.8        |
| 2lux7z6… | worker1  | Ready  | Active       | Reachable      | 19.03.8        |
| w0qr6k2… | worker2  | Ready  | Active       |                | 19.03.8        |

### Demote a Manager to Worker

```
docker node demote worker1
```

Confirm the demotion:

| ID       | HOSTNAME | STATUS | AVAILABILITY | MANAGER STATUS | ENGINE VERSION |
| -------- | -------- | ------ | ------------ | -------------- | -------------- |
| 91uxgq6… | manager1 | Ready  | Active       | Leader         | 19.03.8        |
| 2lux7z6… | worker1  | Ready  | Active       |                | 19.03.8        |
| w0qr6k2… | worker2  | Ready  | Active       |                | 19.03.8        |

## Drain a Node for Maintenance

Before patching or upgrading, remove workloads from a node to avoid downtime. The following diagram shows a Swarm cluster with one manager and two workers running a “Web” service.

![The image illustrates a Docker Swarm setup with three nodes: one manager node and two worker nodes, each labeled with an IP address and a "Web" service.](https://kodekloud.com/kk-media/image/upload/v1752873939/notes-assets/images/Docker-Certified-Associate-Exam-Course-Swarm-Operations/docker-swarm-setup-nodes-web.jpg)

Drain `worker1` to migrate its tasks:

```
docker node update --availability drain worker1
```

> [!important]
> **Warning**
>
> Draining a node stops new tasks from being scheduled and reschedules existing ones on other workers. Ensure your cluster has enough capacity before draining.

Check the drain status:

| ID       | HOSTNAME | STATUS | AVAILABILITY | MANAGER STATUS | ENGINE VERSION |
| -------- | -------- | ------ | ------------ | -------------- | -------------- |
| 91uxgq6… | manager1 | Ready  | Active       | Leader         | 19.03.8        |
| 2lux7z6… | worker1  | Ready  | Drain        |                | 19.03.8        |
| w0qr6k2… | worker2  | Ready  | Active       |                | 19.03.8        |

After maintenance, reactivate scheduling:

```
docker node update --availability active worker1
```

Now `worker1` will accept new tasks:

| ID       | HOSTNAME | STATUS | AVAILABILITY | MANAGER STATUS | ENGINE VERSION |
| -------- | -------- | ------ | ------------ | -------------- | -------------- |
| 91uxgq6… | manager1 | Ready  | Active       | Leader         | 19.03.8        |
| 2lux7z6… | worker1  | Ready  | Active       |                | 19.03.8        |
| w0qr6k2… | worker2  | Ready  | Active       |                | 19.03.8        |

## Remove a Node from the Swarm

To permanently remove a worker node:

1.  Drain the node:

    ```
    docker node update --availability drain worker2
    ```

2.  Log in to `worker2` and leave the swarm:

    ```
    docker swarm leave
    ```

Example confirmation:

```
Node left the swarm.
```

At this point, `worker2` is safely removed, and your cluster continues with the remaining nodes.

## References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Docker Node Management](https://docs.docker.com/engine/reference/commandline/node/)
- [Docker Maintenance Best Practices](https://docs.docker.com/config/containers/resource_constraints/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/278411b6-0d56-49fa-a8a3-51f60262f6fd)**
>
> Watch video content
