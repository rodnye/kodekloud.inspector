# Azure Defender with AKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/AKS-Security/Azure-Defender-with-AKS)

---

## Table of Contents

- Azure Defender with AKS
  - What Is Azure Defender for Cloud?
  - Defender for AKS: Core Components
  - Azure Container Registry (ACR) Scanning
  - Features and Capabilities
  - Links and References
  - Watch Video
    - Defender for Cloud Plans
    - Defender Profile DaemonSets

---

## Content

Azure Kubernetes Service

AKS Security

# Azure Defender with AKS

In this guide, we explore how to secure Azure Kubernetes Service (AKS) using Azure Defender for Cloud—formerly known as Security Center. You’ll learn about its plans, core components for AKS integration, image scanning in Azure Container Registry (ACR), and advanced detection features.

## What Is Azure Defender for Cloud?

Azure Defender for Cloud delivers unified security management and advanced threat protection for workloads across Azure, AWS, GCP, and on-premises environments. It provides:

- Continuous vulnerability assessment
- Advanced threat detection with Microsoft Threat Intelligence
- Security posture monitoring and actionable recommendations

![The image shows the Microsoft Defender for Cloud overview page, displaying security posture, regulatory compliance, and various security metrics for Azure, AWS, and GCP. It includes sections for subscriptions, assessed resources, and recommendations, with a secure score of 100% for Azure.](https://kodekloud.com/kk-media/image/upload/v1752869423/notes-assets/images/Azure-Kubernetes-Service-Azure-Defender-with-AKS/microsoft-defender-cloud-overview-security-metrics.jpg)

### Defender for Cloud Plans

| Plan                     | Cost     | Coverage                              | Key Features                                        |
| ------------------------ | -------- | ------------------------------------- | --------------------------------------------------- |
| CSPM Foundational (free) | Free     | All resources                         | Basic posture management, compliance benchmarks     |
| Defender (paid)          | Per node | Selected workloads (e.g., Containers) | Continuous vulnerability scanning, threat detection |

![The image shows the Microsoft Azure portal displaying the "Defender plans" settings page, detailing various security plans, pricing, resource quantities, and monitoring statuses for cloud services.](https://kodekloud.com/kk-media/image/upload/v1752869424/notes-assets/images/Azure-Kubernetes-Service-Azure-Defender-with-AKS/azure-portal-defender-plans-settings.jpg)

> [!important]
> **Note**
>
> You can enable the Defender plan only for container workloads while keeping other services on the free CSPM tier.

- Continuous workload vulnerability scans
- Container-specific threat detection
- Posture assessment and remediation recommendations

## Defender for AKS: Core Components

Azure Defender for Kubernetes leverages two native integrations:

1.  **Defender profile**  
    A DaemonSet that runs on every AKS node, collects security events, logs, and inventory, then ships them securely to Defender for Cloud.
2.  **Azure Policy add-on**  
    Extends Gatekeeper to enforce built-in security policies managed by Azure Policy and Defender for Cloud. Can also be used standalone.

### Defender Profile DaemonSets

The profile deploys three pods per node to capture and forward security data:

![The image is a table titled "The Defender Profile," detailing three Kubernetes Daemonsets related to Microsoft Defender, including their pod names, namespace, kind, and descriptions of their functions.](https://kodekloud.com/kk-media/image/upload/v1752869425/notes-assets/images/Azure-Kubernetes-Service-Azure-Defender-with-AKS/defender-profile-kubernetes-daemonsets-table.jpg)

- Two pods collect and aggregate security events/logs.
- One pod sends aggregated data to Defender for Cloud (requires outbound HTTPS on port 443).

> [!important]
> **Warning**
>
> Ensure your network security groups and firewalls allow outbound port 443 from AKS nodes for Defender data upload.

At a glance, Defender for AKS will:

- Collect control-plane and workload logs
- Feed logs to the Defender engine for analysis
- Enforce and report on security policies via Azure Policy

## Azure Container Registry (ACR) Scanning

Azure Defender integrates with ACR to scan container images using Qualys. Scans are triggered:

| Trigger                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| On Push                   | Immediately after an image is pushed                     |
| On Import                 | When importing external images into ACR                  |
| Recent Pull (weekly)      | If an image is pulled and hasn’t been scanned in 30 days |
| Scheduled Continuous Scan | Recurring vulnerability assessments                      |

![The image is about Azure Container Registry (ACR) Scanning, showing a table with vulnerability scores and icons representing different scanning triggers: On Push, Recently Pulled, On Import, and Continuous Scan.](https://kodekloud.com/kk-media/image/upload/v1752869426/notes-assets/images/Azure-Kubernetes-Service-Azure-Defender-with-AKS/azure-container-registry-scanning-table.jpg)

Defender pulls each image into a secure sandbox for Qualys to extract CVEs and severity data, then presents prioritized recommendations:

![The image shows a security dashboard displaying advanced threat detection for a specific image, highlighting 66 vulnerabilities categorized by severity, with details on a high-severity Debian security update.](https://kodekloud.com/kk-media/image/upload/v1752869427/notes-assets/images/Azure-Kubernetes-Service-Azure-Defender-with-AKS/security-dashboard-threat-detection-debian.jpg)

The report includes remediation steps, linked [CVEs](https://cve.mitre.org/), and severity-based prioritization.

## Features and Capabilities

Once Defender for Containers receives logs and scan results, you gain:

- AI-powered and anomaly-based threat alerts
- Mapping of alerts to [MITRE ATT&CK](https://attack.mitre.org/) tactics with Kubernetes context
- Integration with Logic Apps or webhooks for automated incident response
- Continuous export of security incidents and recommendations

---

## Links and References

- [Azure Defender for Cloud documentation](https://docs.microsoft.com/azure/defender-for-cloud/)
- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks/)
- [Azure Container Registry documentation](https://docs.microsoft.com/azure/container-registry/)
- [Microsoft Threat Intelligence](https://www.microsoft.com/threat-intelligence)
- [Qualys](https://www.qualys.com/)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/d229c32e-4ff2-47ce-8be7-3dd99d62753f/lesson/3163242d-456a-4aad-b996-be3166c4ab29)**
>
> Watch video content
