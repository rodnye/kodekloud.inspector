# Immutable vs non immutable - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/EC2-Real-Life-Problems-and-Solutions/Immutable-vs-non-immutable)

---

## Table of Contents

- Immutable vs non immutable
  - Immutable Infrastructure
  - Non-Immutable (Mutable) Infrastructure
  - Immutable vs Mutable: At a Glance
  - ACME Corporation’s Immutable Deployment Pipeline
  - Additional Resources
  - Watch Video

---

## Content

Amazon Elastic Compute Cloud (EC2)

EC2 Real Life Problems and Solutions

# Immutable vs non immutable

In modern cloud-native environments, managing infrastructure reliably and predictably is critical. This article examines the key differences between immutable and non-immutable (mutable) infrastructures, highlights their respective workflows, and demonstrates why immutable approaches are often the preferred choice for large‐scale deployments.

## Immutable Infrastructure

Immutable infrastructure treats every change as a brand-new deployment. Once you build an image, you never modify it in place—instead, you replace the entire environment with a fresh image.

![The image illustrates the concept of an immutable environment, showing a process where a base AMI is combined with changes to create a package, which is then used to replace existing environments.](https://kodekloud.com/kk-media/image/upload/v1752869083/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Immutable-vs-non-immutable/immutable-environment-ami-process-diagram.jpg)

How it works:

1.  **Base Image**  
    Start from a golden AMI or container image template.
2.  **Build Pipeline**  
    Apply OS patches, configuration, and application code to produce a new image version.
3.  **Deploy New Instances**  
    Launch servers or containers from the freshly built image.
4.  **Decommission Old Version**  
    Once health checks pass, terminate legacy instances.

Key benefits:

- **Consistency:** Every deployment uses the same vetted image.
- **Reliability:** Zero configuration drift—environments remain identical.
- **Fast Rollback:** Switch back to a previous image version with minimal effort.

> [!important]
> **Note**
>
> Immutable deployments integrate seamlessly with CI/CD pipelines and Infrastructure as Code (IaC) tools. Check out [Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code) for more.

## Non-Immutable (Mutable) Infrastructure

Mutable infrastructure updates running servers or containers in place. Over time, manual patches or ad‐hoc scripts can introduce inconsistencies across your fleet.

![The image illustrates a process in a non-immutable environment, showing steps from requiring change, applying changes, to repackaging. It uses icons of boxes and food items to represent these stages.](https://kodekloud.com/kk-media/image/upload/v1752869084/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Immutable-vs-non-immutable/non-immutable-process-change-repackaging-diagram.jpg)

Typical workflow:

1.  **Change Request**  
    Identify a bug, patch, or configuration update.
2.  **In-Place Update**  
    SSH into servers or run configuration management tools (Ansible, Chef).
3.  **Optional Repackage**  
    Snapshot or bake a new image if desired.
4.  **Continue Patching**  
    Repeat for each environment.

Common drawbacks:

- Configuration drift leads to unpredictable behavior.
- In-place updates can cause unplanned downtime.
- Difficult to reproduce the exact state of an environment.

> [!important]
> **Warning**
>
> Untracked changes increase security risk. Regular audits are essential when using mutable infrastructure.

## Immutable vs Mutable: At a Glance

| Feature                  | Immutable Infrastructure       | Mutable Infrastructure            |
| ------------------------ | ------------------------------ | --------------------------------- |
| Change Method            | Deploy new image               | Update in place                   |
| Configuration Drift      | Virtually zero                 | High risk                         |
| Rollback                 | Simple image version swap      | Time‐consuming manual remediation |
| Automation Compatibility | Native IaC & CI/CD integration | Limited; requires extra scripting |
| Downtime                 | Minimal (blue/green, canary)   | Possible during patching          |

## ACME Corporation’s Immutable Deployment Pipeline

ACME Corporation standardized on an immutable approach to guarantee consistency across development, staging, and production.

![The image depicts a flowchart for Acme Corporation's immutable environment, showing an image build process leading to different AMI versions with associated technologies like Nginx, Node.js, and Go.](https://kodekloud.com/kk-media/image/upload/v1752869086/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Immutable-vs-non-immutable/acme-corporation-immutable-environment-flowchart.jpg)

1.  **Automated Image Build**  
    A CI/CD job generates an EC2 AMI including base OS patches plus required services (Nginx, Node.js, Go).
2.  **Development Testing**  
    Deploy the new AMI in a dev environment for unit and integration tests.
3.  **Staging Validation**  
    Promote the same AMI to staging to ensure parity with production.
4.  **Production Release**  
    Roll out the identical AMI to production servers—no in-place changes allowed.

When a hotfix is needed, ACME simply creates a new AMI revision and reruns the pipeline. This approach eliminates patch drift and keeps all environments predictable.

## Additional Resources

- [AWS EC2: Create Image](https://docs.aws.amazon.com/cli/latest/reference/ec2/create-image.html)
- [Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code)
- [Docker Hub](https://hub.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/1132ee02-eae9-44e0-a8a5-8f325254ba92/lesson/996c96f8-3afe-430d-bc33-f4fba3f356fc)**
>
> Watch video content
