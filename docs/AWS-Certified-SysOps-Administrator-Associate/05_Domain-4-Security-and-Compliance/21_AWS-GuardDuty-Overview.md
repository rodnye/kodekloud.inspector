# AWS GuardDuty Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/AWS-GuardDuty-Overview)

---

## Table of Contents

- AWS GuardDuty Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# AWS GuardDuty Overview

Dive into the powerful world of AWS GuardDuty, a threat detection service designed to secure your AWS environment by proactively monitoring for suspicious activities. GuardDuty leverages machine learning, threat intelligence, and real-time analysis to identify unauthorized access, compromised instances, and malicious network traffic.

GuardDuty collects data from a wide array of sources including CloudTrail events, VPC flow logs, DNS logs, control plane events (such as S3 and EKS audit logs), and login events. It then analyzes these inputs for patterns that signal potential malicious intent. Once identified, GuardDuty can trigger automated responses or alert you for further investigation.

![The image is a diagram explaining how GuardDuty works, showing the process of collecting data from various sources, detecting threats, and triggering responses.](https://kodekloud.com/kk-media/image/upload/v1752860374/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-GuardDuty-Overview/guardduty-threat-detection-diagram.jpg)

GuardDuty categorizes security findings by severity:

- **High Severity:** Indicates a compromised resource that demands immediate remediation.
- **Medium Severity:** Signals suspicious activity warranting investigation to verify its legitimacy.
- **Low Severity:** Suggests minor issues such as port scans or failed login attempts that could be indicative of broader malicious behavior.

![The image is a severity level scale ranging from 0 to 9, with categories labeled as Low, Medium, and High, and includes a note about investigating suspicious activity.](https://kodekloud.com/kk-media/image/upload/v1752860375/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-GuardDuty-Overview/severity-level-scale-0-9.jpg)

> [!important]
> **Trusted vs. Threat IP Lists**
>
> GuardDuty supports the use of both trusted and threat IP lists. Trusted IP lists include IP addresses known to be safe (e.g., used for security scanning), while threat IP lists contain addresses associated with malicious activity. GuardDuty ignores entries on the trusted list but flags those on the threat list as dangerous. Note that these lists can include up to 250,000 CIDR ranges or individual IP addresses.

![The image is a table comparing Trusted IP Lists and Threat IP Lists, detailing their purpose, effect, and limitations in the context of AWS security.](https://kodekloud.com/kk-media/image/upload/v1752860376/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-GuardDuty-Overview/trusted-ip-vs-threat-ip-table.jpg)

GuardDuty detects suspicious activity across four key categories:

- **Reconnaissance:** Unusual port scanning or unauthorized port probing.
- **Instance Compromise:** Activities such as using instances for cryptocurrency mining, deploying malware, or launching denial-of-service attacks.
- **Account Compromise:** Suspicious API calls, attempts to disable logging, modifications to password policies, or unexpected resource deployments.
- **Bucket Compromise:** Unusual activities linked to Amazon S3 operations.

![The image lists GuardDuty detection categories related to account compromise, including suspicious API activity, attempts to disable AWS CloudTrail logging, changes that weaken password policies, and unexpected resource deployments or region changes.](https://kodekloud.com/kk-media/image/upload/v1752860377/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-GuardDuty-Overview/guardduty-account-compromise-detection.jpg)

![The image lists GuardDuty detection categories related to security threats, including suspicious data access patterns, unusual Amazon S3 activity, unauthorized S3 access, and unusual data retrieval requests.](https://kodekloud.com/kk-media/image/upload/v1752860380/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-GuardDuty-Overview/guardduty-detection-categories-threats.jpg)

> [!important]
> **Summary**
>
> In summary, AWS GuardDuty serves as a vigilant guardian for your AWS infrastructure, continuously monitoring network traffic and control plane activities to promptly detect potential intrusions or threats. This proactive approach is pivotal in protecting your cloud resources against evolving security challenges.

We hope you found this overview informative. Happy securing!

For more insights into AWS security best practices, check out [AWS Security Documentation](https://aws.amazon.com/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/70372c35-7822-420d-81bc-75bd1b93efb1)**
>
> Watch video content
