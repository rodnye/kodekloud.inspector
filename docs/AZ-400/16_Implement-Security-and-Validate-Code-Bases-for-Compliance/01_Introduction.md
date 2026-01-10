# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Implement-Security-and-Validate-Code-Bases-for-Compliance/Introduction)

---

## Table of Contents

- Introduction
  - Shared Accountability in Azure Security
  - Infrastructure Fortification
  - Layered Defense: Stratified Security Design
  - Continuous Security Assurance
  - Proactive Threat Surveillance
  - Next Up: Mitigating SQL Injection Attacks
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Implement Security and Validate Code Bases for Compliance

# Introduction

Security is a shared responsibility in DevOps. In Azure, every stakeholder—from developers and operations teams to end users—must uphold best practices to protect systems and data. This lesson explores the foundational concepts and practices you need for the AZ-400 exam, focusing on building, monitoring, and continuously validating secure environments in Azure.

> [!important]
> **Note**
>
> Security isn’t a one-off task. Integrate it into every stage of your DevOps lifecycle to stay ahead of emerging threats.

## Shared Accountability in Azure Security

Responsibility for security spans the entire organization. Whether you’re writing code, provisioning infrastructure, or using applications, you have a part to play.

![The image illustrates the concept of "Shared Accountability" in securing a digital landscape, featuring icons for security and collaboration, and a cycle of infrastructure, app architecture, monitoring, and continuous validation.](https://kodekloud.com/kk-media/image/upload/v1752868019/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/shared-accountability-digital-security-illustration.jpg)

Key practices:

- Adopt a **“shift-left”** mentality: integrate security into development early.
- Enforce least-privilege access using **Azure Active Directory** and role-based access control (RBAC).
- Promote security awareness and training across teams.

## Infrastructure Fortification

Building security into your infrastructure lays the groundwork for resilient applications.

![The image is an introduction slide about "Infrastructure Fortification," focusing on securing a digital framework. It includes a circular diagram with stages like infrastructure, app architecture, continuous validation, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752868021/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/infrastructure-fortification-security-diagram.jpg)

Core components:

- **Network Security**: Azure Firewall, Network Security Groups (NSGs), Web Application Firewall (WAF).
- **Identity & Access Management**: Azure AD Conditional Access, Multi-Factor Authentication (MFA).
- **Encryption**: Data at rest with Azure Key Vault, data in transit using TLS.
- **Secure Configuration**: Use Azure Policy and Azure Security Center recommendations.

## Layered Defense: Stratified Security Design

Multiple defensive layers reduce risk if one control fails. Implement these at every tier of your architecture.

![The image illustrates a "Stratified Security Design" concept, emphasizing the need for multiple defensive layers to protect against various attack vectors. It includes icons representing infrastructure, app architecture, monitoring, and continuous validation.](https://kodekloud.com/kk-media/image/upload/v1752868022/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/stratified-security-design-defensive-layers.jpg)

| Layer                          | Purpose                                  | Example Azure Service          |
| ------------------------------ | ---------------------------------------- | ------------------------------ |
| Perimeter Protection           | Block unauthorized network access        | Azure Firewall, NSGs           |
| Intrusion Detection & Response | Identify and contain suspicious activity | Azure Sentinel (SIEM)          |
| Endpoint & Workload Security   | Protect VMs and containers               | Microsoft Defender for Cloud   |
| Data Protection                | Encrypt and manage keys                  | Azure Key Vault                |
| Application Controls           | Secure code, dependencies, and configs   | Azure DevOps Security Policies |

## Continuous Security Assurance

Security validation must be ongoing to address evolving threats.

![The image illustrates the concept of ongoing security assurance, emphasizing the importance of regular security checks and validations for effective defense against evolving threats. It includes icons representing security checks and defense, along with a circular diagram highlighting infrastructure, app architecture, monitoring, and continuous validation.](https://kodekloud.com/kk-media/image/upload/v1752868023/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/ongoing-security-assurance-diagram.jpg)

Ongoing activities:

- **Vulnerability Scanning**: Automated scans with Azure Defender and third-party tools.
- **Penetration Testing**: Simulate attacks to uncover weaknesses.
- **Security Audits & Compliance**: Leverage Azure Policy and Blueprints.
- **Threat Intelligence**: Subscribe to security advisories and update defenses.

## Proactive Threat Surveillance

Real-time monitoring and alerting help you detect and respond to incidents before they escalate.

![The image illustrates the concept of proactive surveillance for detecting and deterring cyber threats, featuring a diagram of a computer with a magnifying glass and a laptop with missiles. It also includes a circular diagram highlighting infrastructure, app architecture, continuous validation, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752868024/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/proactive-surveillance-cyber-threats-diagram.jpg)

Key techniques:

- **SIEM & SOAR**: Collect logs and automate responses with Azure Sentinel.
- **Anomaly Detection**: Configure alerts for unusual user behavior or traffic patterns.
- **Incident Response**: Define runbooks and escalation paths in Azure Monitor.

> [!important]
> **Warning**
>
> Alert fatigue can lead to missed incidents. Tune your alerts to reduce noise and focus on high-priority events.

## Next Up: Mitigating SQL Injection Attacks

Dive into the methods for detecting and preventing SQL injection in your Azure data services.

## References

- [Azure Security Center Documentation](https://docs.microsoft.com/azure/security-center/)
- [Azure Sentinel (SIEM) Overview](https://docs.microsoft.com/azure/sentinel/)
- [Azure Key Vault Best Practices](https://docs.microsoft.com/azure/key-vault/)
- [Azure Policy Definitions](https://docs.microsoft.com/azure/governance/policy/)
- [Microsoft Defender for Cloud](https://docs.microsoft.com/azure/defender-for-cloud/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/1bd9c8cc-efae-414c-b4be-838e767634f6/lesson/ce0132a0-710b-48f9-bc23-b059b44cf08c)**
>
> Watch video content
