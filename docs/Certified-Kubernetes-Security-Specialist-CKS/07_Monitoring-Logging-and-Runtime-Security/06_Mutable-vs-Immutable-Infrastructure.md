# Mutable vs Immutable Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Mutable-vs-Immutable-Infrastructure)

---

## Table of Contents

- Mutable vs Immutable Infrastructure
  - Mutable Infrastructure
  - Immutable Infrastructure
  - Watch Video
    - Risks of Mutable Infrastructure
    - Containers and Immutability

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Mutable vs Immutable Infrastructure

In this lesson, we explore the fundamental differences between mutable and immutable infrastructure through a clear, real-world example. Understanding these concepts is essential for designing robust, scalable, and secure systems.

## Mutable Infrastructure

Mutable infrastructure involves updating existing servers or resources directly when changes occur. Consider a simple scenario where a web server is running Nginx version 1.17 on a host. When a new version of Nginx is released, the server software gets upgraded—first from 1.17 to 1.18 and then to 1.19. This process can be executed manually by downloading the required version or automatically using ad-hoc scripts and configuration management tools such as the [Ansible Advanced Course](https://learn.kodekloud.com/user/courses/ansible-advanced-course).

In a larger environment with a pool of three web servers running identical software, the same upgrade process must be applied to every server:

![The image shows a server icon with "v1.19" above it, and "Scripts" and "Ansible" logos on the right side.](https://kodekloud.com/kk-media/image/upload/v1752871682/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Mutable-vs-Immutable-Infrastructure/frame_50.jpg)

This method of updating software on servers without replacing the infrastructure is known as in-place updating, and it is a classic example of mutable infrastructure.

> [!important]
> **Note**
>
> Keep in mind that in mutable environments, even though the underlying hardware remains the same, the software and configurations are subject to change.

### Risks of Mutable Infrastructure

In real-world scenarios, updating servers can introduce challenges. For example, if web servers 1 and 2 have the necessary dependencies to upgrade from Nginx 1.17 to 1.19, the upgrade will complete successfully. However, if web server 3 is missing some required dependencies—whether due to network issues, insufficient disk space, or operating system discrepancies—the upgrade might fail, leaving it at version 1.18. This results in a pool of servers running different software versions, a phenomenon known as configuration drift.

![The image illustrates "Configuration Drift" with three servers, two running version 1.19 and one running version 1.18, highlighting version inconsistencies.](https://kodekloud.com/kk-media/image/upload/v1752871683/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Mutable-vs-Immutable-Infrastructure/frame_170.jpg)

Configuration drift complicates planning for future updates and troubleshooting because each server might behave differently.

## Immutable Infrastructure

Immutable infrastructure offers a contrasting approach. Instead of altering the software on existing servers, new servers are provisioned with the updated version—say, Nginx 1.19 replacing Nginx 1.17—while the old servers are decommissioned. In this model, once a server is deployed, it is never modified during its lifetime; any change requires provisioning a new server with the updated software.

![The image illustrates "Immutable Infrastructure" with three identical server icons labeled "v1.18."](https://kodekloud.com/kk-media/image/upload/v1752871684/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Mutable-vs-Immutable-Infrastructure/frame_220.jpg)

This approach minimizes configuration drift because every new server starts from a standardized, unchanged configuration. Immutable infrastructure is particularly effective in environments where consistency, security, and scalability are critical.

### Containers and Immutability

The immutable model applies seamlessly to containerized applications. Since containers are generated from images, any update—such as moving from Nginx 1.18 to 1.19—must be performed on the image first. The updated image is then deployed through a rolling update process, ensuring that no downtime occurs during the transition.

For example, to update Nginx in a Dockerfile from version 1.18 to 1.19, modify the base image as follows:

```
FROM nginx:1.19
COPY nginx.conf /etc/nginx
ENTRYPOINT ["sh", "entrypoint.sh"]
```

> [!important]
> **Warning**
>
> While it is technically feasible to modify a running container (for example, by copying files directly to the filesystem or by manually accessing the container with a shell), doing so increases the risk of security vulnerabilities. Prevent runtime modifications to minimize the likelihood of unauthorized access or malicious changes.

In summary, embracing immutable infrastructure—whether in traditional server environments or containerized platforms—streamlines updates, reduces configuration drift, and enhances overall system security. In the upcoming lesson, we will further explore strategies to prevent runtime modifications and secure your deployments effectively.

For additional reading, consider exploring:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/2028480e-7020-410f-bdef-c203b61a00ef)**
>
> Watch video content
