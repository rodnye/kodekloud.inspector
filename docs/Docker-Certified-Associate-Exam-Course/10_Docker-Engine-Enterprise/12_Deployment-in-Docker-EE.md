# Deployment in Docker EE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Deployment-in-Docker-EE)

---

## Table of Contents

- Deployment in Docker EE
  - Deploying Docker Swarm Services via UCP GUI
  - Creating Kubernetes Resources in UCP GUI
  - Related Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Deployment in Docker EE

In this lesson, you’ll learn how to deploy containerized applications on Docker Enterprise Engine (EE) using the Universal Control Plane (UCP). UCP offers two primary interfaces:

- A web-based GUI for intuitive, form-driven deployments
- A command-line interface (CLI) for scripting and automation

By the end of this guide, you’ll understand how to configure both Docker Swarm and Kubernetes workloads directly within the UCP GUI.

## Deploying Docker Swarm Services via UCP GUI

The **Docker Swarm** section in the UCP console provides a form-driven workflow to create and manage services without writing CLI commands. You can configure each service by specifying:

| Configuration        | Description                                          |
| -------------------- | ---------------------------------------------------- |
| Image details        | Docker image name and tag (e.g., `nginx:latest`)     |
| Scheduling options   | Replica count, placement constraints, node selectors |
| Network settings     | Overlay networks, IPAM configurations                |
| Resource constraints | CPU shares, memory limits, and reservations          |
| Login credentials    | Registry authentication and secrets management       |

![The image shows a Docker Enterprise Universal Control Plane interface for deploying and testing workloads on a UCP cluster, with options for managing resources and services.](https://kodekloud.com/kk-media/image/upload/v1752873870/notes-assets/images/Docker-Certified-Associate-Exam-Course-Deployment-in-Docker-EE/docker-enterprise-ucp-interface.jpg)

Everything you can specify with `docker service create` flags or in a stack file is available in these form fields.

> [!important]
> **Note**
>
> You must have appropriate UCP permissions (e.g., `admin` or `cluster-admin`) to create and modify Swarm services.

## Creating Kubernetes Resources in UCP GUI

UCP’s built-in Kubernetes support lets you manage Kubernetes objects through a similar form interface. The following resources can be created directly from the UCP dashboard:

| Resource Type         | Use Case                                      |
| --------------------- | --------------------------------------------- |
| Pod                   | Smallest deployable unit in Kubernetes        |
| Deployment            | Declarative updates for pods and ReplicaSets  |
| ReplicaSet            | Ensures a specified number of pod replicas    |
| DaemonSet             | Runs a copy of a pod on all or specific nodes |
| StatefulSet           | Manages stateful applications with stable IDs |
| Service               | Creates a stable network endpoint for pods    |
| Ingress               | Rules-based traffic routing to services       |
| Job / CronJob         | Batch or scheduled tasks                      |
| PersistentVolumeClaim | Requests persistent storage for pods          |
| StorageClass          | Defines storage types and volume parameters   |
| ServiceAccount        | Provides credentials for pods                 |

> [!important]
> **Warning**
>
> When creating StorageClasses or PersistentVolumeClaims, ensure your cluster has a compatible storage driver installed.

In the next section, we’ll walk through a hands-on demo showcasing Swarm services and Kubernetes deployments in UCP.

## Related Links and References

- [Docker Enterprise UCP Documentation](https://docs.docker.com/ee/ucp/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Certified Associate Exam Guide](https://www.examguide.com/docker-certified-associate/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/3191863f-9df1-45b9-8c64-049f12bc53eb)**
>
> Watch video content
