# Mutable Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Packer/HashiCorp-Packer-Basics/Mutable-Infrastructure)

---

## Table of Contents

- Mutable Infrastructure
  - What Is Mutable Infrastructure?
  - Challenges of Mutating Live Servers
  - Comparing Mutable vs Immutable Infrastructure
  - References
  - Watch Video

---

## Content

HashiCorp Packer

HashiCorp Packer Basics

# Mutable Infrastructure

In this lesson, we’ll explore how HashiCorp Packer integrates into application deployment by comparing mutable and immutable infrastructure paradigms. Understanding mutable infrastructure is the first step toward seeing the advantages Packer brings.

## What Is Mutable Infrastructure?

Mutable infrastructure refers to servers (physical or virtual) that are continuously updated and modified after initial provisioning. A typical workflow looks like this:

1.  **Develop** your application code.
2.  **Provision** a server instance.
3.  **Install the operating system** (e.g., CentOS, Fedora, Ubuntu).
4.  **Install packages and dependencies**.
5.  **Harden and secure** the server (firewall rules, user permissions).
6.  **Deploy** and start your application.
7.  **Maintain** with ongoing patches, upgrades, and configuration tweaks.

Each in-place change **mutates** the system state, and over time, these mutations can lead to inconsistencies across servers.

```
while (alive) {
  eat();
  sleep();
  code();
  repeat();
}
```

## Challenges of Mutating Live Servers

Applying updates or security hotfixes directly on running servers may work at small scale but leads to:

- **Human error:** Manual updates on many servers increase the risk of typos and missed steps.
- **Configuration drift:** Minor differences accumulate, causing environments to diverge and making debugging harder.

Automation tools like [Ansible](https://www.ansible.com/) mitigate some risks by orchestrating parallel updates. However, since servers still mutate in place, drift can persist.

![The image illustrates a "Mutable Infrastructure" setup using Ansible, showing a central Ansible logo connected to multiple server and database icons.](https://kodekloud.com/kk-media/image/upload/v1752878645/notes-assets/images/HashiCorp-Packer-Mutable-Infrastructure/mutable-infrastructure-ansible-setup.jpg)

> [!important]
> **Warning**
>
> Relying solely on mutable operations can lead to untracked changes and compliance issues due to hidden configuration drift.

## Comparing Mutable vs Immutable Infrastructure

| Aspect           | Mutable Infrastructure        | Immutable Infrastructure                         |
| ---------------- | ----------------------------- | ------------------------------------------------ |
| Update process   | In-place patches and upgrades | Replace entire hosts or containers               |
| Reproducibility  | Prone to configuration drift  | Consistent, versioned images                     |
| Recovery         | Rollbacks can be error-prone  | Quick rollback by redeploying a known-good image |
| Tooling examples | Ansible, Chef, Puppet         | HashiCorp Packer, Docker, Kubernetes, Terraform  |

> [!important]
> **Note**
>
> Immutable infrastructure patterns use tools like Packer to bake golden images, eliminating in-place mutations and ensuring consistency across environments.

## References

- [HashiCorp Packer](https://www.packer.io/)
- [Ansible Documentation](https://docs.ansible.com/)
- [Immutable Infrastructure Patterns](https://martinfowler.com/bliki/ImmutableServer.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-packer/module/88bc689f-1e45-49d8-887c-cb44923b3390/lesson/ae6599b0-7205-4b81-95d3-e0a0790739c5)**
>
> Watch video content
