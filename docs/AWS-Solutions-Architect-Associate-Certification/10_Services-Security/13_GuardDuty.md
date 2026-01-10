# GuardDuty - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/GuardDuty)

---

## Table of Contents

- GuardDuty
  - Detection Categories
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# GuardDuty

In this article, we explore AWS GuardDuty—a powerful security service that continuously monitors your AWS environment for suspicious and malicious activity. By leveraging machine learning and threat intelligence, GuardDuty detects potential threats, including unauthorized access, compromised instances, and harmful network traffic. When threats are identified, GuardDuty promptly generates alerts and provides actionable insights to help you respond effectively.

GuardDuty analyzes logs from several critical sources:

- **CloudTrail logs:** Detect unusual API activity.
- **VPC flow logs:** Monitor for irregular internal traffic and suspicious IP addresses.
- **DNS logs:** Identify signs of compromised EC2 instances.
- **EKS audit logs:** Track unusual activity within your EKS cluster.

Aggregating data from these sources allows GuardDuty to identify suspicious patterns and produce detailed reports on its findings.

GuardDuty can also be integrated with other AWS services to automate remediation processes, such as triggering a Lambda function or notifying the appropriate teams when threats are detected.

![The image illustrates how GuardDuty works, showing a flow from data collection (CloudTrail events, VPC flow logs, etc.) to detection, triggering, and taking action using AWS services.](https://kodekloud.com/kk-media/image/upload/v1752865801/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-GuardDuty/guardduty-data-flow-illustration.jpg)

When a potential threat is detected, GuardDuty assigns a severity score ranging from 1 to 10:

- **Low severity (1-3):** The event is unusual but typically does not require immediate action.
- **Medium severity (4-6):** Suspicious activity deviates from the norm and may indicate a resource compromise.
- **High severity (7-10):** Indicates a critical issue where a resource is almost certainly compromised and demands immediate attention.

This scoring system helps prioritize your response efforts effectively.

GuardDuty also supports the use of custom datasets for enhanced threat detection. You can configure two sets of IP addresses:

- **Trusted IP List (Whitelist):** Identifies safe IP addresses within your AWS infrastructure, reducing false positives.
- **Threat IP List:** Contains known malicious IPs—supplied by third parties or defined internally—to ensure that any interaction with these addresses triggers an alert.

> [!important]
> **Note**
>
> Integrating custom IP lists can significantly enhance the detection accuracy by minimizing false positives and enabling a more targeted security posture.

## Detection Categories

GuardDuty classifies detected threats into several categories. The table below provides an overview of each category and its common characteristics:

| Detection Category  | Description                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reconnaissance      | Includes unusual API activity, port scanning, atypical login patterns or failures, and unauthorized port probing from known malicious IPs.                                                                                                                    |
| Instance Compromise | Indicates possible unauthorized cryptocurrency mining, the presence of malware that employs evasion techniques, malicious command and control, outbound denial of service attacks, or erratic network traffic.                                                |
| Account Compromise  | Encompasses suspicious activities such as API calls from unusual locations, use of anonymizing proxies, attempts to disable logging, changes that weaken password policies, unexpected resource deployments, region changes, or API calls from malicious IPs. |
| Bucket Compromise   | Involves irregular S3 data access patterns, potential credential misuse, abnormal S3 activity from remote locations, or unauthorized access attempts from suspicious IP addresses.                                                                            |

![The image lists four GuardDuty detection categories: reconnaissance, instance compromise, account compromise, and bucket compromise, each represented by a numbered icon.](https://kodekloud.com/kk-media/image/upload/v1752865802/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-GuardDuty/guardduty-detection-categories-icons.jpg)

> [!important]
> **Warning**
>
> High severity alerts should be prioritized immediately. Make sure your incident response plan is up-to-date and that your team is prepared to act swiftly in the event of a critical threat.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/02c1cbd9-3a90-4966-ab2f-301cd5c55ce8)**
>
> Watch video content
