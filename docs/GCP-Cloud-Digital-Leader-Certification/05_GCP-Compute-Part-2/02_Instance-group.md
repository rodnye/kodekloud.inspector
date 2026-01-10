# Instance group - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-2/Instance-group)

---

## Table of Contents

- Instance group
  - What Is an Instance Group?
  - High Availability and Self-Healing
  - Types of Instance Groups
  - Managing Incoming Traffic
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 2

# Instance group

Welcome back. In our previous discussion, we explored the challenges of scalability and high availability on GCP and introduced the solution: instance groups.

## What Is an Instance Group?

Instead of launching multiple virtual machines (VMs) independently, you can deploy them under a single instance group. This approach allows you to manage multiple VMs as one entity. When creating an instance group, you can configure essential parameters such as the desired number of VMs and set minimum and maximum limits for the group. Additionally, autoscaling rules can be defined to automatically add or remove VMs based on resource usage.

For example, consider the following architecture:

![The image is a diagram of a Google Cloud architecture showing mobile devices connecting through VPC firewall rules to an instance group with scalability rules. It includes details like allowing HTTP/HTTPS traffic and scaling based on CPU usage.](https://kodekloud.com/kk-media/image/upload/v1752875275/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Instance-group/google-cloud-architecture-diagram.jpg)

In this setup, the instance group consists of three VMs monitored as a single unit. You could configure the system to ensure that a minimum of 2 machines and a maximum of 10 machines are active. To manage scaling, you might define a rule: if the total CPU utilization exceeds 80%, add one more VM, wait two minutes, and recheck. This process continues until the group reaches the limit of 10 machines. These combined features provide a robust solution for achieving both scalability and high availability.

> [!important]
> **Deployment Tip**
>
> In application deployment, instance groups are invaluable. Deploy a new instance group, thoroughly test your software, and then seamlessly route traffic to the updated instances.

## High Availability and Self-Healing

Relying on a single VM for high availability can be risky—if the VM fails, there’s no backup. Instance groups address this risk by automatically spinning up a replacement if a VM becomes unresponsive.

Consider a scenario where an instance group comprises three VMs—VM01, VM02, and VM03. If VM01 fails, dropping the active count to two, the autoscaling mechanism detects this deficit and launches a replacement (e.g., VM04). The problematic VM is then marked as out of service, and the instance group self-heals to maintain the desired capacity.

![The image is a diagram of a Google Cloud setup showing mobile devices connecting through VPC firewall rules to an instance group with three virtual machines (VM01, VM02, VM03) in the us-central-1 region. It highlights the allowance of HTTP and HTTPS traffic and notes a minimum of three VMs with an issue at two VMs.](https://kodekloud.com/kk-media/image/upload/v1752875276/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Instance-group/google-cloud-vpc-firewall-diagram.jpg)

> [!important]
> **Self-Healing Benefits**
>
> The ability of instance groups to self-heal minimizes downtime and reduces the need for manual intervention, ensuring continuous service availability.

## Types of Instance Groups

An instance group is a collective of VMs managed as a single entity. There are two primary types:

![The image illustrates an "Instance Group," showing a central processor icon connected to multiple virtual machine icons, with text explaining it as a collection of VM instances managed as a single entity.](https://kodekloud.com/kk-media/image/upload/v1752875277/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Instance-group/instance-group-vm-collection-diagram.jpg)

1.  **Managed Instance Groups:**  
    These groups consist of identical VMs that are automatically created and maintained. Features such as autoscaling, automated updates, self-healing, and high availability make Managed Instance Groups ideal for production environments.
2.  **Unmanaged Instance Groups:**  
    In unmanaged instance groups, VMs are created independently and require separate management. Lacking built-in autoscaling and self-healing capabilities, they are less suited for scenarios where high availability and scalability are critical.

![The image is an informational graphic about Compute Engine, focusing on managed and unmanaged instance groups, highlighting features like autoscaling and auto-healing. It includes a colorful circular design with a chip icon.](https://kodekloud.com/kk-media/image/upload/v1752875278/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Instance-group/compute-engine-instance-groups-graphic.jpg)

## Managing Incoming Traffic

After establishing an instance group, the next step involves managing incoming traffic and implementing effective load balancing. How do you route traffic to the appropriate instance group when multiple groups are available? How do you ensure efficient load distribution? These questions will be addressed in upcoming discussions focused on load balancing and traffic management.

That concludes this article. Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/da34bf7c-6568-4fbd-82a2-181ac35e826f/lesson/b2849be6-3d14-4c87-98e0-a678041c9c3c)**
>
> Watch video content
