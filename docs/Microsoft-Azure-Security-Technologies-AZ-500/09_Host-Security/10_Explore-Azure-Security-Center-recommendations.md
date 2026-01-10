# Explore Azure Security Center recommendations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Explore-Azure-Security-Center-recommendations)

---

## Table of Contents

- Explore Azure Security Center recommendations
  - Overview
  - Viewing Recommendations
  - Using Microsoft Defender for Cloud
  - Example: Managing Virtual Machine Recommendations
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Explore Azure Security Center recommendations

This article delves into Microsoft Defender for Cloud recommendations, emphasizing host-level security for Azure virtual machines. While there is a dedicated module for Microsoft Defender for Cloud, this lesson specifically focuses on the recommendations generated from a host security perspective.

## Overview

At its core, a security policy serves as a blueprint, outlining suggested controls for resources in a subscription or resource group. For these policies to be effectively enforced, proper data collection must be enabled. Microsoft Defender for Cloud depends on data from your virtual machines to assess their security posture, deliver tailored recommendations, and promptly alert you to potential threats.

Microsoft Defender for Cloud goes beyond reactive measures by offering proactive security guidance. It continuously monitors your cloud environment and presents recommendations based on industry best practices, compliance requirements, and Microsoft’s extensive security expertise.

Key features include:

- **Customized Security Controls:** Recommendations are tailored based on factors such as network design, identity governance, data protection, and access controls.
- **Prioritized Risk Mitigation:** Each recommendation is ranked by risk severity, ensuring that the most critical vulnerabilities are addressed first.
- **Automation and Integration:** These security recommendations seamlessly integrate with your existing systems and processes, including Azure services and various third-party solutions.
- **Compliance and Audit Readiness:** Implementing these recommendations helps align your resources with industry standards and facilitates audit processes.
- **Continuous Improvement:** Microsoft regularly updates these recommendations to stay agile with the evolving security landscape.

## Viewing Recommendations

The recommendations in Microsoft Defender for Cloud primarily focus on host security. You can filter recommendations by resource type—for example, to view all virtual machine recommendations.

![The image shows a Microsoft Defender for Cloud Recommendations dashboard, listing various security controls for virtual machines, their scores, and potential improvements. It includes details on resource health and actions needed for each control.](https://kodekloud.com/kk-media/image/upload/v1752881883/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Security-Center-recommendations/microsoft-defender-cloud-recommendations-dashboard.jpg)

These recommendations for virtual machines include:

- Securing management ports
- Remediating vulnerabilities
- Applying system updates
- Encryption at rest
- Security configuration enhancements
- Preventing unauthorized network access

Microsoft Defender for Cloud conducts scans of your virtual machines and compiles this list of recommendations to help maintain a robust secure environment.

## Using Microsoft Defender for Cloud

By default, Microsoft Defender for Cloud provides these recommendations at no extra cost. However, for features like full remediation, enhanced automation, secure score improvements, and other advanced capabilities, additional purchases may be required. These advanced features will be discussed in a subsequent lesson.

When you access the Azure portal and navigate to Defender for Cloud, you will find a dedicated section for security recommendations. For instance, selecting "All recommendations" displays a comprehensive dashboard:

![The image shows a Microsoft Defender for Cloud dashboard with security recommendations, displaying a secure score of 31% and listing various security tasks with their statuses and potential score increases.](https://kodekloud.com/kk-media/image/upload/v1752881884/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Security-Center-recommendations/microsoft-defender-cloud-dashboard-security.jpg)

From this view, you can efficiently filter and identify recommendations specifically related to your virtual machines.

## Example: Managing Virtual Machine Recommendations

Some recommendations may already be in progress or completed. For example, protecting management ports on virtual machines with just-in-time access might be partially implemented, as indicated by a status such as three out of five recommendations being complete. When you select a recommendation, detailed information is provided, such as the presence of unhealthy machines with public IP addresses. You can then choose to remediate the issue directly from the portal—a key advantage of using Microsoft Defender for Cloud.

![The image shows a Microsoft Defender for Cloud dashboard with security recommendations, highlighting active recommendations by severity and resource health status. It includes a list of specific security issues with their severity, status, and insights.](https://kodekloud.com/kk-media/image/upload/v1752881885/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Azure-Security-Center-recommendations/microsoft-defender-cloud-dashboard-security-recommendations.jpg)

> [!important]
> **Note**
>
> It is essential to regularly review and act upon the recommended security measures to continuously enhance the security posture of your virtual machines.

## Conclusion

This article demonstrates that all virtual machine (VM)-related security recommendations from Microsoft Defender for Cloud are easily accessible through the Azure portal. In future lessons within this series, we will dive deeper into the advanced capabilities and integrations of Microsoft Defender for Cloud, further enhancing your cloud security strategy.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/83b3f459-f9a8-42c4-bf79-406198826c25)**
>
> Watch video content
