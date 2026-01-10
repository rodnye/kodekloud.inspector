# Mutable vs Immutable Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Packer/HashiCorp-Packer-Basics/Mutable-vs-Immutable-Infrastructure)

---

## Table of Contents

- Mutable vs Immutable Infrastructure
  - Table of Contents
  - What Is Mutable Infrastructure?
  - What Is Immutable Infrastructure?
  - Mutable vs Immutable: A Comparison
  - Introducing HashiCorp Packer
  - Building Immutable Images with Packer
  - References
  - Watch Video

---

## Content

HashiCorp Packer

HashiCorp Packer Basics

# Mutable vs Immutable Infrastructure

In this guide, we’ll dive into the fundamental differences between mutable and immutable infrastructure and demonstrate how HashiCorp Packer enables a truly immutable workflow.

## Table of Contents

1.  [What Is Mutable Infrastructure?](#what-is-mutable-infrastructure)
2.  [What Is Immutable Infrastructure?](#what-is-immutable-infrastructure)
3.  [Mutable vs Immutable: A Comparison](#mutable-vs-immutable-a-comparison)
4.  [Introducing HashiCorp Packer](#introducing-hashicorp-packer)
5.  [Building Immutable Images with Packer](#building-immutable-images-with-packer)
6.  [References](#references)

---

## What Is Mutable Infrastructure?

Mutable infrastructure evolves over time. You maintain a long-lived server, log in to apply patches, and deploy application updates directly on that machine.

Workflow:

1.  Update application code.
2.  Deploy changes to an existing server.
3.  SSH into the server to install packages or tweak configurations.

> [!important]
> **Warning**
>
> Over time, manual patching and ad-hoc changes can lead to **configuration drift**, causing inconsistencies between environments.

## What Is Immutable Infrastructure?

With immutable infrastructure, servers are never modified after they’re deployed. Instead, you build a new server image for every change and replace existing instances.

Workflow:

1.  Update application code.
2.  Build a fresh, fully configured machine image (OS tweaks, dependencies, application artifacts).
3.  Deploy the new image to replace old instances.

This approach guarantees that every server instance is identical, reproducible, and replaceable.

> [!important]
> **Note**
>
> Immutable infrastructure simplifies rollbacks: redeploy a previous image version and your environment reverts instantly.

## Mutable vs Immutable: A Comparison

| Feature             | Mutable Infrastructure             | Immutable Infrastructure                    |
| ------------------- | ---------------------------------- | ------------------------------------------- |
| Deployment Model    | Live server updates via SSH        | Replace servers with new images             |
| Configuration Drift | High risk of drift over time       | Zero drift—image contains all configuration |
| Rollbacks           | Manual rollback steps              | Redeploy previous image                     |
| Reproducibility     | Difficult to reproduce exact state | 100% reproducible builds                    |
| Tooling Examples    | Ansible, Chef, manual scripts      | HashiCorp Packer, Terraform, Docker         |

## Introducing HashiCorp Packer

HashiCorp Packer automates the creation of immutable machine images for multiple platforms:

- AWS EC2 AMIs
- Docker containers
- Google Compute Engine images
- Azure Managed Images

Packer uses a **template** to define:

- **Builders**: Base image source (e.g., Ubuntu AMI).
- **Provisioners**: Steps to install and configure software (Shell, Ansible, Chef).
- **Post-processors**: Output formats and artifact distribution.

For more details, see the [Packer documentation](https://www.packer.io/docs).

## Building Immutable Images with Packer

1.  Create a template file (`template.json`):

    ```
    {
      "builders": [{
        "type": "amazon-ebs",
        "region": "us-west-2",
        "source_ami": "ami-0abcdef12345",
        "instance_type": "t2.micro",
        "ssh_username": "ubuntu",
        "ami_name": "my-app-{{timestamp}}"
      }],
      "provisioners": [{
        "type": "shell",
        "script": "scripts/install.sh"
      }]
    }
    ```

2.  Run the build command:

    ```
    packer build template.json
    ```

3.  Deploy the resulting AMI via your choice of orchestration:
    - [Terraform](https://www.terraform.io/)
    - Kubernetes (with [kops](https://github.com/kubernetes/kops))
    - AWS CloudFormation

## References

- [HashiCorp Packer](https://www.packer.io/)
- [Terraform by HashiCorp](https://www.terraform.io/)
- [AWS AMI Concepts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-packer/module/88bc689f-1e45-49d8-887c-cb44923b3390/lesson/9e75ef6d-f9da-4f7b-a1ea-1faee36984d2)**
>
> Watch video content
