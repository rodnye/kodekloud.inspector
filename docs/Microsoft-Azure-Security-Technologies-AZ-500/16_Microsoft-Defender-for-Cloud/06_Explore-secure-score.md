# Explore secure score - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Defender-for-Cloud/Explore-secure-score)

---

## Table of Contents

- Explore secure score
  - Why Secure Score Matters
  - Integrated Security Management
  - Multi-Cloud Security Perspective
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Defender for Cloud

# Explore secure score

In this lesson, we dive into the concept of Secure Score and its significance in assessing your Azure environment's security posture.

Secure Score is a vital metric that measures your organization's security status by evaluating key aspects such as access control, threat protection, data security, compliance, and incident response. It is determined by how thoroughly you have implemented recommended security controls and configurations. For example, a score of 33% indicates that only one-third of the recommended security measures are in place.

> [!important]
> **Insight**
>
> A higher Secure Score generally translates to a stronger security posture. Aim for a score of at least 75%—bearing in mind that you can exempt recommendations that are not applicable to your organization.

## Why Secure Score Matters

Secure Score does more than just provide a number—it gives you actionable insights and prioritized recommendations for improving your security practices. Here are some key points:

- **Actionable Insights:** See immediately where your security efforts are succeeding and where improvements are needed.
- **Prioritization:** Different recommendations carry varying point values. For instance, addressing a recommendation that adds 10 points is more critical than one worth 2 points.
- **Continuous Monitoring:** As Microsoft Defender for Cloud integrates these insights, you get step-by-step guidance, including recommendation descriptions, remediation steps, and resource classifications (healthy, unhealthy, or not applicable).

All of these features converge to give you a single, easy-to-understand metric that reflects your security posture.

## Integrated Security Management

Secure Score is fully integrated within Microsoft Defender for Cloud, which means you don't have to juggle multiple tools to monitor your security status. Instead, you receive comprehensive insights and remediation actions directly through the platform. Additionally, Secure Score supports collaboration and reporting, enabling effective teamwork with your stakeholders.

For free, it continuously updates to address emerging threats and evolving standards. For example, if a new threat emerges, a new recommendation is added; if a significant vulnerability is found, your Secure Score will decline, highlighting the urgency for remediation.

Let's head back to the Azure portal to see this in action:

![The image shows a Microsoft Azure portal screen displaying the "Microsoft Defender for Cloud" recommendations. It includes a secure score of 33% and lists various security recommendations with their statuses and potential score increases.](https://kodekloud.com/kk-media/image/upload/v1752882024/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-secure-score/azure-portal-defender-cloud-recommendations.jpg)

In the portal, you can view the Secure Score along with various recommendations that contribute to it. Although not all recommendations have a specific score value, they collectively help guide your actions to boost your security measures—much like earning points in a game. This visual feedback offers an immediate understanding of overall security performance.

## Multi-Cloud Security Perspective

Secure Score goes beyond just Azure—it can also provide a consolidated security overview for other cloud platforms like AWS, GCP, GitHub organizations, and Azure DevOps. This broad perspective allows you to manage your multi-cloud environment effectively and maintain a strong centralized security posture.

## Summary

In summary, Secure Score serves as a crucial metric for evaluating and enhancing your organization’s security measures. It simplifies the complex process of security management by merging key insights into one score, enabling you to track security improvements over time. In the upcoming section, we will further investigate the dynamics of brute-force attacks and how Secure Score can help mitigate such threats.

For additional resources on cloud security, consider reviewing the following links:

- [Microsoft Defender for Cloud Documentation](https://docs.microsoft.com/en-us/azure/defender-for-cloud/)
- [Azure Security Center Overview](https://docs.microsoft.com/en-us/azure/security-center/security-center-intro)

Stay proactive and keep your Secure Score high to ensure optimal protection for your organization.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/aea85892-224f-4bd2-8013-e36764e15f37/lesson/c41438ec-e198-4ad6-baff-4295b62410ad)**
>
> Watch video content
