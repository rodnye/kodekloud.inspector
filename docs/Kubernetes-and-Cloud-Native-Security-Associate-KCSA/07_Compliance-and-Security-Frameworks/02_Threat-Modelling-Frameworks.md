# Threat Modelling Frameworks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Compliance-and-Security-Frameworks/Threat-Modelling-Frameworks)

---

## Table of Contents

- Threat Modelling Frameworks
  - Compliance Frameworks vs Threat Modeling
  - STRIDE: Six Threat Categories
  - MITRE ATT&CK: Real-World Tactics & Techniques
  - Summary
  - Links and References
  - Watch Video
    - 1. Spoofing
    - 2. Tampering
    - 3. Repudiation
    - 4. Information Disclosure
    - 5. Denial of Service
    - 6. Elevation of Privilege
    - MITRE Kubernetes Threat Matrix

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Compliance and Security Frameworks

# Threat Modelling Frameworks

In this lesson, we’ll dive into popular threat modeling frameworks that guide security teams on **how** to secure systems by identifying threats, visualizing attack paths, and suggesting mitigations. We’ll contrast these with compliance frameworks that focus on **what** to achieve to meet legal or industry standards.

## Compliance Frameworks vs Threat Modeling

Compliance frameworks—such as GDPR, HIPAA, PCI DSS, NIST, and CIS Benchmarks—define **what** security controls and processes are required for regulatory or industry compliance:

![The image lists various compliance frameworks, including GDPR, HIPAA, PCI DSS, NIST, and CIS Benchmarks, under the heading "Compliance Frameworks" with the note "Defines what to do."](https://kodekloud.com/kk-media/image/upload/v1752880730/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/compliance-frameworks-gdpr-hipaa-pci-dss.jpg)

For instance, GDPR mandates protecting personal data against unauthorized access but does not prescribe **how** to implement those safeguards:

![The image explains compliance frameworks, specifically GDPR, highlighting that it mandates securing personal data against unauthorized access without specifying how to achieve it.](https://kodekloud.com/kk-media/image/upload/v1752880731/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/gdpr-compliance-frameworks-personal-data.jpg)

Threat modeling frameworks fill this gap by offering structured methods—like attack trees or matrices—to discover potential attacks and recommend specific countermeasures. Two widely adopted models are:

- **[STRIDE](https://docs.microsoft.com/security/compass/stride)** (Microsoft)
- **[MITRE ATT&CK](https://attack.mitre.org/)** (Global knowledge base)

---

## STRIDE: Six Threat Categories

STRIDE breaks down threats into six distinct types, helping teams audit applications or infrastructure end to end:

| Threat Type            | Definition                                              | Common Mitigation                                    |
| ---------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| Spoofing               | Impersonation of a legitimate user or system            | Multi-factor authentication, certificate-based auth  |
| Tampering              | Unauthorized modification of data in transit or at rest | Encryption, digital signatures                       |
| Repudiation            | Denial of actions performed (e.g., transactions)        | Comprehensive logging, non-repudiation techniques    |
| Information Disclosure | Exposure of sensitive data                              | TLS for transit, disk encryption                     |
| Denial of Service      | Resource exhaustion or service disruption               | Rate limiting, resource quotas, autoscaling policies |
| Elevation of Privilege | Unauthorized gain of higher-level permissions           | Role-Based Access Control (RBAC), least privilege    |

### 1\. Spoofing

An attacker forges credentials to access the front end (e.g., NGINX).  
Mitigation: enforce strong authentication and certificate validation.

![The image illustrates a threat modeling framework involving spoofing, showing an attacker targeting an NGINX server.](https://kodekloud.com/kk-media/image/upload/v1752880732/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/threat-modeling-spoofing-nginx-attack.jpg)

### 2\. Tampering

An adversary alters data either in flight or at rest on backend services.  
Mitigation: apply end-to-end encryption and use checksums or digital signatures.

### 3\. Repudiation

Users or attackers deny performing specific actions (e.g., financial transfers).  
Mitigation: implement immutable audit logs and digital-signature-based non-repudiation.

![The image illustrates key threat modeling frameworks, focusing on "Repudiation" with icons representing a user and application logs.](https://kodekloud.com/kk-media/image/upload/v1752880733/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/threat-modeling-repudiation-frameworks-icons.jpg)

### 4\. Information Disclosure

Sensitive information (e.g., customer PII in a MySQL database) becomes exposed.  
Mitigation: encrypt data at rest and enforce TLS/TCP encryption in transit.

![The image illustrates a threat modeling framework focusing on information disclosure, showing a MySQL database with encryption in transit and at rest. It highlights the importance of securing data to prevent unauthorized access.](https://kodekloud.com/kk-media/image/upload/v1752880735/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/threat-modeling-framework-mysql-encryption.jpg)

### 5\. Denial of Service

Attackers flood the application, overwhelming resources and causing outages.  
Mitigation: configure rate limits, implement resource quotas in Kubernetes, and deploy autoscaling.

### 6\. Elevation of Privilege

An unauthorized principal gains admin-level rights within the cluster.  
Mitigation: enforce strict RBAC policies and conduct regular privilege reviews.

![The image illustrates key threat modeling frameworks, focusing on "Elevation of Privilege," "RBAC Policies," and "Admin Rights" related to high privilege.](https://kodekloud.com/kk-media/image/upload/v1752880736/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/threat-modeling-elevation-privilege-rbac.jpg)

> [!important]
> **Note**
>
> Integrating STRIDE early in your design process uncovers gaps before production deployment.

---

## MITRE ATT&CK: Real-World Tactics & Techniques

The [MITRE ATT&CK](https://attack.mitre.org/) framework catalogs adversary tactics (goals) and techniques (methods) observed in the wild. For Kubernetes environments, these techniques map to cluster-specific scenarios:

- **Initial Access**: Exploit weak authentication, compromise cloud credentials
- **Execution**: Deploy malicious containers or init-hooks
- **Persistence**: Create backdoor user accounts, install rogue controllers
- **Privilege Escalation**: Abuse misconfigured RBAC or admission controllers
- **Defense Evasion**: Disable logging, tamper with audit trails

![The image outlines the MITRE ATT&CK Framework, detailing various attack techniques such as initial access, execution, persistence, privilege escalation, and defense evasion.](https://kodekloud.com/kk-media/image/upload/v1752880737/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/mitre-attck-framework-attack-techniques.jpg)

### MITRE Kubernetes Threat Matrix

Microsoft’s Kubernetes threat matrix adapts ATT&CK to cluster contexts, enabling teams to visualize attacker pathways and design targeted mitigations:

![The image shows a section of the MITRE ATT&CK Framework, specifically a "Threat Matrix for Kubernetes," detailing various tactics and techniques used in cybersecurity. It includes categories like Initial Access, Execution, Persistence, and others, with specific methods listed under each.](https://kodekloud.com/kk-media/image/upload/v1752880738/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/mitre-attck-kubernetes-threat-matrix.jpg)

Under **Using Cloud Credentials** (Initial Access), ATT&CK recommends:

- Enabling multi‐factor authentication
- Restricting API server exposure with IP allowlists
- Applying least‐privilege principles to service accounts

![The image is a screenshot of the MITRE ATT&CK Framework for Kubernetes, focusing on using cloud credentials. It includes a list of mitigations with descriptions to prevent cluster takeover in cloud environments.](https://kodekloud.com/kk-media/image/upload/v1752880739/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Threat-Modelling-Frameworks/mitre-attck-kubernetes-cloud-credentials.jpg)

> [!important]
> **Warning**
>
> Neglecting to map MITRE techniques to your Kubernetes deployment can leave critical attack paths unaddressed.

---

## Summary

By combining compliance frameworks (GDPR, HIPAA, NIST) with threat modeling (STRIDE, MITRE ATT&CK), security teams can:

1.  Understand **what** requirements apply to your environment.
2.  Determine **how** to implement controls that mitigate real-world threats.
3.  Continuously refine defenses through structured threat analysis.

Integrate these models into your SDLC to identify risks early and build resilient, secure systems.

---

## Links and References

- [STRIDE Threat Model (Microsoft)](https://docs.microsoft.com/security/compass/stride)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [GDPR Compliance Guide](https://ec.europa.eu/info/law/law-topic/data-protection_en)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/2d1969ad-ad49-4d47-93ca-493416c81c76/lesson/2be448bc-19c6-41d2-ba4b-62d52c2ab071)**
>
> Watch video content
