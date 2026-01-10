# Mitigation Techniques - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Mitigation-Techniques)

---

## Table of Contents

- Mitigation Techniques
  - Hardening
  - Access Control
  - Application Allow Lists
  - Network Segmentation
  - Principle of Least Privilege
  - Watch Video

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Mitigation Techniques

In this lesson, we explore various mitigation techniques designed to remediate vulnerabilities and strengthen your security posture. These methods help reduce potential attack vectors by addressing system gaps that could be exploited by threat actors.

## Hardening

Hardening is the process of reducing an attack surface by addressing vulnerabilities and closing security gaps. One of the most effective hardening methods is encryption:

- Encrypt data at rest using techniques such as full disk encryption on hard drives. This protects both the operating system and stored data. Removable media like USB drives should also be encrypted.
- Encrypt data in transit using mechanisms like Virtual Private Networks (VPNs) to ensure information remains confidential as it travels across the internet.

In addition to encryption, installing a host-based firewall and intrusion prevention system (IPS) provides further protection. These tools monitor and control traffic at the device level, complementing network-based security solutions.

Other endpoint hardening strategies include:

- Disabling unused ports and protocols.
- Changing default passwords.
- Removing unnecessary software.

For mobile devices, hardening can be managed centrally with Mobile Device Management (MDM) solutions. MDM allows administrators to inventory devices, enforce security settings, and configure encryption and screen locks. This approach is especially beneficial for legacy servers without patches or vendor support, as it minimizes their exposure to attacks.

## Access Control

Access control determines who can access various services and resources within an environment. Typically implemented through access control lists (ACLs) on firewalls, routers, and other security devices, ACLs define rules that either permit or deny access based on user credentials or IP addresses. Integrating ACLs with system permissions ensures that security restrictions are consistently enforced across all endpoints.

## Application Allow Lists

Application allow lists specify which applications are authorized to run on a system. By blocking any software not included on the approved list, organizations can prevent the accidental execution of malware. This proactive approach is particularly useful for restricting unauthorized software installations by end users, thereby reducing the overall risk of compromise.

## Network Segmentation

Network segmentation involves dividing a larger network into smaller, isolated subnets. This technique helps contain potential breaches by isolating compromised devices and controlling the flow of traffic between segments. Quick containment and tailored control reduce the impact of any security incident.

## Principle of Least Privilege

The principle of least privilege dictates that users and systems should only have the minimum access necessary to perform their functions. This minimizes the risk of unauthorized access, data breaches, or unintentional system modifications. For example, access to a sensitive system might be limited to a manager and a designated daily operations user.

![The image outlines mitigation techniques based on the Principle of Least Privilege, including limiting system access, granting necessary permissions, reducing unauthorized actions, using role-based permissions, and restricting user access.](https://kodekloud.com/kk-media/image/upload/v1752872607/notes-assets/images/CompTIA-Security-Certification-Mitigation-Techniques/least-privilege-mitigation-techniques.jpg)

> [!important]
> **Note**
>
> When enforcing the principle of least privilege, ensure that you strike a balance: overly restricting access can impede essential operations, while insufficient controls can expose the system to risks.

Each of these mitigation techniques works in concert to create a robust defense against potential vulnerabilities, reducing both the likelihood and impact of security breaches. By integrating hardening, strict access control measures, application allow lists, network segmentation, and the principle of least privilege, organizations can significantly enhance their overall security posture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/9e01eb14-9495-4755-be07-49cc7ca13c94)**
>
> Watch video content
