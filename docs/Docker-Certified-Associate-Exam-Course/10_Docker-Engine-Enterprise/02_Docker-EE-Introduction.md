# Docker EE Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Docker-EE-Introduction)

---

## Table of Contents

- Docker EE Introduction
  - High-Level Setup
  - Infrastructure Prerequisites
  - UCP & DTR Configuration Requirements
  - Sample Lab Topology
  - Links and References
  - Watch Video
    - UCP Requirements
    - DTR Requirements

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Docker EE Introduction

Hello and welcome! In this lesson, we’ll explore the components and architecture of Docker Enterprise Edition (Docker EE). Docker Engine is available in two major editions:

- **Docker CE** (Community Edition): the free, open-source version
- **Docker EE** (Enterprise Edition): the certified, enterprise-grade version

Since November 2019, Mirantis Inc. maintains Docker EE. Built for developers and IT teams, Docker EE enables you to build, share, and run business-critical applications at scale with enterprise-grade security and management.

Docker EE comprises three core components:

- **Docker Engine Enterprise**: Certified container runtime with FIPS compliance
- **Universal Control Plane (UCP)**: Web-based cluster management portal with role-based access control (RBAC) and LDAP/AD integration
- **Docker Trusted Registry (DTR)**: Private, secure image storage behind your firewall

UCP supports both Docker Swarm and Kubernetes on the same cluster. You can label nodes as Swarm workers, Kubernetes workers, or both, then deploy services across them.

![The image shows a presentation slide about Docker Enterprise Edition by Mirantis, featuring a dashboard interface with options like Access Control and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752873872/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-EE-Introduction/docker-enterprise-edition-dashboard.jpg)

Docker Trusted Registry integrates seamlessly with UCP and Engine. You can deploy Docker EE clusters on-premises, in public clouds, or in hybrid environments.

![The image is a presentation slide about Docker Enterprise Edition by Mirantis, highlighting features like security, access control, and Kubernetes service. It also shows a user interface for Docker Enterprise Trusted Registry.](https://kodekloud.com/kk-media/image/upload/v1752873873/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-EE-Introduction/docker-enterprise-edition-presentation.jpg)

## High-Level Setup

Follow these steps to get Docker Enterprise up and running:

1.  Provision your infrastructure (manager and worker nodes)
2.  Install Docker Engine Enterprise on all nodes
3.  Deploy Universal Control Plane (UCP) on manager nodes
4.  Install Docker Trusted Registry (DTR) on designated worker nodes

## Infrastructure Prerequisites

Ensure your environment meets the following requirements before installing UCP or DTR:

- Linux kernel version ≥ 3.10
- Static IP address configured for each node
- Bi-directional network connectivity between nodes
- NTP configured for accurate time synchronization
- User namespaces **disabled** (not currently supported)
- Docker Engine Enterprise installed on every node

> [!important]
> **Warning**
>
> User namespaces must be disabled or UCP deployment will fail.

![The image lists pre-requisites for a system setup, including Linux Kernel version, static IP, network connectivity, time sync, user namespaces, and Docker Engine requirements.](https://kodekloud.com/kk-media/image/upload/v1752873873/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-EE-Introduction/system-setup-prerequisites-docker.jpg)

## UCP & DTR Configuration Requirements

Docker UCP and DTR each have minimum and recommended hardware specifications. Use minimum specs for testing or proofs of concept; follow recommended specs for production environments.

### UCP Requirements

| Specification            | Minimum (Test) | Recommended (Production) |
| ------------------------ | -------------- | ------------------------ |
| RAM (manager)            | 8 GB           | 16 GB                    |
| vCPUs (manager)          | 2 vCPUs        | 4 vCPUs                  |
| Disk on `/var` (manager) | 10 GB          | 25–100 GB                |
| RAM (worker)             | 4 GB           | 4 GB                     |
| Disk on `/var` (worker)  | 500 MB         | 500 MB                   |

![The image lists the minimum requirements for UCP, including RAM, vCPUs, and disk space for manager and worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752873874/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-EE-Introduction/ucp-minimum-requirements-nodes.jpg)

### DTR Requirements

| Specification | Minimum (Test) | Recommended (Production) |
| ------------- | -------------- | ------------------------ |
| RAM           | 16 GB          | 16 GB                    |
| vCPUs         | 2 vCPUs        | 4 vCPUs                  |
| Free Disk     | 10 GB          | 100 GB                   |
| Network Ports | 80, 443 open   | 80, 443 open             |

DTR must be installed on worker nodes within your UCP cluster.

![The image lists the minimum requirements for DTR, including 16 GB of RAM, 2 vCPUs (with a note for 4 vCPUs), 10 GB of free disk space (noting 100 GB), and ports 80 and 443.](https://kodekloud.com/kk-media/image/upload/v1752873875/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-EE-Introduction/dtr-minimum-requirements-ram-vcpus-disk.jpg)

## Sample Lab Topology

In this course lab, we’ll deploy:

- 1 UCP manager node
- 1 UCP worker node (for DTR)
- 1 DTR instance

> [!important]
> **Production Topology**
>
> - 3 UCP managers (high-availability quorum)
> - 3 UCP workers (DTR hosts)
> - 3 DTR replicas
> - 3 load balancers (one each for managers, workers, and DTR)

---

## Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Mirantis Docker EE](https://www.mirantis.com/software/docker/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [NTP Configuration Guide](https://www.ntp.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/371ca398-2ac5-45e8-9c92-9ce00e5834c0)**
>
> Watch video content
