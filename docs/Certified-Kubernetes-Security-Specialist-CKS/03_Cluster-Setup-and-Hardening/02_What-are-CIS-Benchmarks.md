# What are CIS Benchmarks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/What-are-CIS-Benchmarks)

---

## Table of Contents

- What are CIS Benchmarks
  - Understanding Security Benchmarks
  - Introduction to CIS Benchmarks
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# What are CIS Benchmarks

Welcome to this lesson on CIS benchmarks. In this article, we will explore the importance of CIS benchmarks in securing systems and walk through the best practices used to safeguard IT environments.

## Understanding Security Benchmarks

Before diving into CIS benchmarks, it is essential to understand what a security benchmark entails. If you have experience as a systems administrator or have performed security audits, you are likely familiar with the process of hardening systems. For instance, imagine deploying a fresh Ubuntu 18.04 server in your data center. Before hosting production applications on it, securing the system is a critical first step.

Systems face numerous vulnerabilities. For example, an unauthorized individual might plug a USB drive into your server to introduce malware. To counter such risks, unused USB ports and peripheral slots should be disabled. Similarly, robust access control measures are necessary; instead of enabling direct root logins, administrators should configure individual user accounts with sudo privileges. This approach promotes accountability and minimizes the risk of inadvertent or unauthorized changes.

Here are some key security best practices to consider:

- Configure sudo so that only designated users receive elevated permissions.
- Implement strict firewall or IPTables rules to allow only essential network traffic.
- Disable all non-essential services, ensuring that mission-critical services such as NTP for time synchronization remain active.
- Set proper file permissions and disable unnecessary file systems.
- Enable auditing and logging to monitor any modifications or potential intrusions.

![The image outlines a "Security Benchmark" with categories: Access, Network, Services, Physical Devices (USB), Logging, Auditing, and Filesystems, centered around a device icon.](https://kodekloud.com/kk-media/image/upload/v1752871619/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-What-are-CIS-Benchmarks/frame_140.jpg)

New vulnerabilities are continuously emerging. It is crucial to stay updated by continually upgrading, patching, and reconfiguring your systems to mitigate potential attacks.

## Introduction to CIS Benchmarks

CIS, or the Center for Internet Security, is a nonprofit organization focused on enhancing cybersecurity through community-driven best practices. Their mission is to create a safer connected world by developing, validating, and promoting actionable security recommendations. Visit the [CIS website](https://www.cisecurity.org) to explore cybersecurity benchmarks across more than 25 technology categories, such as:

- Operating Systems (Linux, Windows, macOS)
- Public Cloud Platforms (Google Cloud, Azure, AWS)
- Mobile Platforms (iOS, Android)
- Network Devices (Check Point, Cisco, Juniper, Palo Alto Networks)
- Desktop Software (web browsers, MS Office, Zoom)
- Server Software (web servers like Tomcat and Nginx)
- Virtualization Technologies (VMware, Docker, Kubernetes)

Users can register on the CIS website to download the benchmarks that suit their specific environment.

![The image is a table from the Center for Internet Security, listing various technology categories like OS, Cloud, Mobile, Network, Desktop, and Server, with examples under each.](https://kodekloud.com/kk-media/image/upload/v1752871620/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-What-are-CIS-Benchmarks/frame_250.jpg)

Each CIS benchmark includes detailed security recommendations:

- An explanation of the risks associated with non-compliant configurations.
- Step-by-step instructions to verify if a security risk exists, including the necessary commands.
- Procedures to resolve identified issues.

For example, to check the configuration for USB storage, you can execute the following command:

```
# modprobe -n -v usb-storage
```

> [!important]
> **Note**
>
> CIS not only provides these best practices but also offers tools for automated assessments. The [CIS CAT](https://www.cisecurity.org/cis-cat-pro/) (Configuration Assessment Tool) automates the process of comparing your server's configuration against CIS benchmarks and generates a comprehensive HTML report.

The CIS CAT report summarizes which security recommendations have been implemented and identifies areas requiring attention.

![The image shows a security configuration summary from the Center for Internet Security, detailing test results with pass, fail, and scoring percentages for various setup and service categories.](https://kodekloud.com/kk-media/image/upload/v1752871621/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-What-are-CIS-Benchmarks/frame_310.jpg)

This assessment displays which tests passed and which failed, along with corresponding scores for each category. Users can click on each group for a detailed breakdown of the results.

![The image shows a CIS assessment results table, listing filesystem configuration checks with "Fail" and "Pass" results for various benchmark items.](https://kodekloud.com/kk-media/image/upload/v1752871623/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-What-are-CIS-Benchmarks/frame_330.jpg)

In a later section of this lesson, you will perform a CIS Benchmark assessment on an Ubuntu system. You will review the generated report, remediate specific issues based on the findings, and run the assessment again to confirm that all security concerns have been addressed.

Good luck, and we look forward to guiding you through the next lesson on enhancing system security with CIS benchmarks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/9ae0e34b-1251-45d2-8b10-12e59f2d3c83)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/1f579418-522f-4c04-81f8-4b8ae7f6a2dc)**
>
> Practice lab
