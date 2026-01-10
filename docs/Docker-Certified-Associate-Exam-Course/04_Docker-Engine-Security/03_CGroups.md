# CGroups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Security/CGroups)

---

## Table of Contents

- CGroups
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Security

# CGroups

Linux control groups (cgroups) are a critical **Linux kernel feature** that provides fine-grained control over system resources—such as CPU, memory, network bandwidth, and block I/O—by organizing processes into hierarchical groups. Container platforms like Docker rely on cgroups to enforce resource constraints, ensuring each container consumes only its allocated share of host resources. This isolation improves performance predictability, security, and density on shared infrastructure.

> [!important]
> **Note**
>
> Before you begin, verify that your host kernel supports the desired cgroups version. Modern distributions default to cgroups v2, while Docker remains compatible with both v1 and v2.

| Resource Type | Docker Flag                 | Description                                         |
| ------------- | --------------------------- | --------------------------------------------------- |
| CPU           | `--cpus`, `--cpu-shares`    | Limit CPU cores or adjust relative CPU weight       |
| Memory        | `--memory`, `--memory-swap` | Set maximum RAM usage and optional swap space       |
| Block I/O     | `--blkio-weight`            | Control disk I/O priority (range: 10–1000)          |
| Network       | `docker run --network`      | Configure network mode; use `tc` for bandwidth caps |

In the following sections, we will demonstrate how to apply cgroup-based resource limits to Docker containers, with practical examples for **CPU**, **memory**, **block I/O**, and **network** configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/59a97752-06d2-4cac-a4d0-ad4240730912/lesson/b1259c25-e914-429d-bcf4-047da1ad0f74)**
>
> Watch video content
