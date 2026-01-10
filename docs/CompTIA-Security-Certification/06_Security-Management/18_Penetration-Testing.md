# Penetration Testing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Management/Penetration-Testing)

---

## Table of Contents

- Penetration Testing
  - Active Reconnaissance
  - Passive Reconnaissance
  - Watch Video

---

## Content

CompTIA Security+ Certification

Security Management

# Penetration Testing

Penetration testing is a dynamic security assessment technique used to evaluate systems, networks, or applications by simulating real-world attacks. Unlike standard vulnerability assessments that identify potential issues, penetration testing actively exploits vulnerabilities—sometimes through methods like buffer overflow attacks—to determine if unauthorized access or system compromise is possible.

Penetration tests are generally categorized into three types based on the tester's level of prior knowledge:

- A **known** penetration test provides the tester with comprehensive documentation of the environment or application, allowing for an in-depth analysis.
- An **unknown** penetration test is conducted without any prior information, emulating the perspective of an external attacker with no insider insights.
- A **partially known** test offers limited information, striking a balance between the other two approaches.

![The image is a diagram explaining types of penetration testing: Unknown, Known, and Partially Known, each with a brief description of the level of information provided to the tester.](https://kodekloud.com/kk-media/image/upload/v1752872230/notes-assets/images/CompTIA-Security-Certification-Penetration-Testing/penetration-testing-types-diagram.jpg)

> [!important]
> **Key Information**
>
> Remember, penetration testing goes beyond identifying outdated software patches or misconfigurations; it mimics an attacker’s steps to breach a system.

A critical component of penetration testing is its resemblance to the reconnaissance phase employed by adversaries during a cyber attack. Reconnaissance techniques can be broadly grouped into two categories: active and passive.

## Active Reconnaissance

Active reconnaissance involves direct interaction with the target system. Testers use techniques like port scanning and service enumeration to extract details such as software versions, configuration data, and running services. This method provides real-time insights into potential vulnerabilities.

![The image is about penetration testing, specifically focusing on active reconnaissance, which involves sending traffic to a target system. It highlights port scanning and enumeration as components of this process.](https://kodekloud.com/kk-media/image/upload/v1752872231/notes-assets/images/CompTIA-Security-Certification-Penetration-Testing/penetration-testing-active-reconnaissance.jpg)

## Passive Reconnaissance

In contrast, passive reconnaissance gathers public information without directly engaging with the target. This approach leverages open-source intelligence (OSINT), WHOIS records to ascertain domain ownership, network traffic analysis for identifying IP addresses and ports, and even data from social media platforms.

![The image is about penetration testing, specifically focusing on passive reconnaissance, which involves gathering information without directly engaging with target systems. It also mentions OSINT (Open-Source Intelligence).](https://kodekloud.com/kk-media/image/upload/v1752872233/notes-assets/images/CompTIA-Security-Certification-Penetration-Testing/penetration-testing-passive-recon-osint.jpg)

> [!important]
> **Why Reconnaissance Matters**
>
> Both active and passive reconnaissance are essential for a comprehensive security assessment. While active methods reveal immediate vulnerabilities, passive techniques provide background context that can shape a more strategic testing approach.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/2ed228f2-896d-4847-a874-59c17394f560/lesson/afb4c882-d752-4703-bd0c-3efaa1cdbc76)**
>
> Watch video content
