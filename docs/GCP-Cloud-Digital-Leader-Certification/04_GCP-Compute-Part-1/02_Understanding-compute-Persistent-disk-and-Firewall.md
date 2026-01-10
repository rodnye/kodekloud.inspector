# Understanding compute Persistent disk and Firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-1/Understanding-compute-Persistent-disk-and-Firewall)

---

## Table of Contents

- Understanding compute Persistent disk and Firewall
  - Compute Instances
  - Persistent Disks
  - VPC Firewall Rules
  - Integration of Services
  - Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 1

# Understanding compute Persistent disk and Firewall

In this article, we explore key Google Cloud Platform (GCP) concepts, including compute instances, persistent disks, and VPC firewall rules, and illustrate how they work together to support and secure your applications.

Google Cloud organizes resources into a hierarchical structure: organizations, projects, regions, and zones. For our examples, we'll use the "US Central1" region. Within this region, you choose a specific zone where your compute instances will run.

## Compute Instances

A compute instance is a virtual machine that powers your application. You can customize these instances by configuring parameters such as CPU, RAM, and storage options. Unlike physical servers in a data center, compute instances are managed by GCP, meaning you have limited direct access to the underlying hardware.

## Persistent Disks

Persistent disks provide the storage necessary for your compute instances. They host your operating system, applications, logs, and vital data. Depending on your workload requirements, you can choose from various disk types such as HDD or SSD, offering a balance between performance and cost.

## VPC Firewall Rules

VPC firewall rules help manage and secure network access to your compute instances and the applications running on them. These rules define which ports are accessible and restrict connections based on IP ranges. For example, configuring a firewall rule with the source range of 0.0.0.0/0 exposes your instance to all IP addresses, which is typically not recommended. Instead, it is best practice to limit access to specific IP ranges, such as those of your office network or approved VPN configurations.

> [!important]
> **Security Reminder**
>
> When configuring VPC firewall rules, avoid using broad rules that expose your infrastructure to unnecessary risks. Always restrict access to trusted IP ranges.

## Integration of Services

Compute instances, persistent disks, and VPC firewall rules work together to establish a secure and efficient environment on GCP. The integration includes:

- **Compute:** Hosts your virtual machines where applications run.
- **Storage:** Persistent disks hold operating systems, applications, and critical data.
- **Networking:** VPC firewall rules secure your environment by controlling incoming connections.

Selecting the optimal region and zone is critical for performance. For example, hosting your application closer to your customer base (such as in Japan for Japanese users) can significantly reduce latency and improve response times.

## Conclusion

By understanding and properly configuring compute instances, persistent disks, and VPC firewall rules, you can enhance the efficiency and security of your applications on GCP. In our next article, we will build on these basics by exploring advanced configuration scenarios.

Thank you for reading, and we look forward to diving deeper into these topics in future articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/015fc866-5579-442a-80f8-f4e795b70c33/lesson/70f3a2eb-bd26-4e1e-b079-a7ba93e39fe7)**
>
> Watch video content
