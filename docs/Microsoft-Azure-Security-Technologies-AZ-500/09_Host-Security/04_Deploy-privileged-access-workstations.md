# Deploy privileged access workstations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Deploy-privileged-access-workstations)

---

## Table of Contents

- Deploy privileged access workstations
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Deploy privileged access workstations

The Privileged Access Device Strategy establishes a secure foundation for managing sensitive tasks. This strategy emphasizes deploying Privileged Access Workstations (PADs) to ensure that all privileged user actions are managed and monitored in real time.

At the heart of this strategy is the use of PADs—specially designed, secure environments that handle critical tasks. These workstations are engineered to resist cyber threats while providing sanitized and controlled interfaces to sensitive systems and data. By strategically deploying PADs, organizations build a robust barrier that minimizes the risk of unauthorized access or exposure of privileged accounts.

Attackers are unable to breach admin PADs due to their advanced security configuration. This setup, known as a Tier 0 Privileged Operating System (POS), represents the highest level of trust and is reserved for a select group—typically fewer than 10 individuals—who perform highly sensitive administrative duties. A prominent feature of these workstations is the dedicated hardware that enforces a stringent clean keyboard policy, effectively reducing keylogging risks.

> [!important]
> **Operational Flow**
>
> In practice, a POS serves as a remote client to a hardened Tier 0 terminal or jump box, where sensitive administrative tasks are executed. The terminal server or jump box is accessible exclusively via PADs, ensuring that both security and scalability are maintained while defending against physical and cyber threats.

Critical resources such as databases, virtual machines, and other essential assets are protected by granting access exclusively through the jump box. This ensures that only Privileged Admin Workstations can authorize and mediate access.

Below are the key features of Privileged Access Workstations (POS):

1.  **Isolated Administrative Environment**  
    PADs are designated solely for critical tasks and are used only by authorized personnel. Since they are not intended for routine activities—like accessing social media—they significantly reduce the risk of spreading security threats.
2.  **Restricted Internet Access**  
    Internet capabilities on these workstations are either severely curtailed or entirely blocked. This measure protects against online threats, including potentially harmful websites and phishing scams.
3.  **Strong Access Controls**  
    Robust security measures, including multi-step verification and strict password policies, regulate access to PADs. This ensures that only authorized users can log in, dramatically reducing the chances of unauthorized access.
4.  **Application Whitelisting**  
    Only pre-approved applications are permitted to run on PADs. This whitelist approach prevents non-essential or insecure software (such as games) from executing, thereby shielding the workstation from malware and other application-based threats.
5.  **Enhanced Monitoring and Auditability**  
    Continuous monitoring and comprehensive logging are integral components of PADs. Detailed logs of all activities not only aid in investigating security issues but also ensure compliance with organizational policies and regulatory requirements.
6.  **Regular Patching and Updates**  
    Routine updates and timely security patches maintain PAD integrity. These practices ensure that workstations are well-prepared to mitigate new and emerging cyber threats.

In summary, Privileged Access Workstations are a vital element of a comprehensive security strategy. They provide a secure, controlled environment for handling sensitive tasks while incorporating best practices in access control, monitoring, and system maintenance.

![The image illustrates a security workflow for deploying privileged access workstations, highlighting steps to block attackers and ensure secure access to assets, along with key security features like isolated environments and strong access controls.](https://kodekloud.com/kk-media/image/upload/v1752881866/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-privileged-access-workstations/security-workflow-privileged-access.jpg)

Next, we explore virtual machine templates.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/5c1c2fa8-c6a0-4f87-bb3a-dd1eb0bf1ea2)**
>
> Watch video content
