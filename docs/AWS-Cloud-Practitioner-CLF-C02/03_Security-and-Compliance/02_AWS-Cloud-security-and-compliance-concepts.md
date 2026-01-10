# AWS Cloud security and compliance concepts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Security-and-Compliance/AWS-Cloud-security-and-compliance-concepts)

---

## Table of Contents

- AWS Cloud security and compliance concepts
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Security and Compliance

# AWS Cloud security and compliance concepts

In this lesson, we explore security and compliance within AWS and explain how AWS meets a variety of regulatory requirements.

Compliance means following the specific rules and laws that apply to your industry. For example, financial institutions must adhere to strict guidelines when managing bank accounts or processing credit card data. Similarly, healthcare providers and federal agencies must comply with regulations designed to safeguard sensitive information. Because these rules differ by country, it is crucial to understand the legal requirements that apply to your organization’s location.

Regulatory frameworks consist of guidelines and best practices that organizations should follow to meet legal standards. For instance:

![The image explains compliance, highlighting industry-specific rules and laws for finance, healthcare, and government, with frameworks like HIPAA/HITECH and PCI-DSS for regulatory adherence.](https://kodekloud.com/kk-media/image/upload/v1752861684/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud-security-and-compliance-concepts/frame_50.jpg)

If your organization manages credit card information, you must comply with the Payment Card Industry Data Security Standard (PCI-DSS). This standard protects credit cardholder data by enforcing rigorous security measures across banks, payment processors, and vendors. Similarly, in the United States, the Health Insurance Portability and Accountability Act (HIPAA) ensures that healthcare entities maintain the privacy and security of patient health data.

When migrating infrastructure to the cloud, maintaining compliance remains a key consideration. AWS supports a wide range of regulatory frameworks to serve diverse industries, including banking, finance, and healthcare. AWS not only meets these standards but also undergoes regular audits and verification reviews. Detailed audit reports are available through AWS Artifact:

![The image explains AWS Artifact, highlighting its role in certification reviews, audit report availability, and customer agreement acceptance for regulatory compliance.](https://kodekloud.com/kk-media/image/upload/v1752861686/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud-security-and-compliance-concepts/frame_200.jpg)

AWS Artifact provides organizations with access to audit reports and compliance documentation that can be vital during an audit, demonstrating that your cloud infrastructure meets all required regulatory standards.

In addition, AWS offers the Customer Compliance Center, a web application that serves as a central resource for researching cloud-related regulatory requirements. At the Customer Compliance Center you can:

- Identify specific regulatory requirements.
- Search by country to review relevant laws and rules.
- Learn how companies in your industry address compliance and governance challenges.
- Access auditing checklists, security best practices, and reference architectures.

> [!important]
> **Note**
>
> In deployments where regulatory compliance is crucial, such as adherence to both PCI and CIS standards, ensuring that all cloud resources meet these criteria is essential. AWS tools help automate this complex process.

To simplify compliance checks, AWS offers Audit Manager. Audit Manager continually collects data from your AWS resources and verifies their compliance with the specified regulatory frameworks (e.g., PCI, CIS, HIPAA). It automatically evaluates resource configurations, alerts you if a resource falls out of compliance, and enables you to generate audit-ready reports on demand.

![The image describes AWS Audit Manager, highlighting its role in data collection for audits and compliance with regulatory standards, and its capability to build audit-ready reports.](https://kodekloud.com/kk-media/image/upload/v1752861687/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud-security-and-compliance-concepts/frame_390.jpg)

Another fundamental tool is AWS Config. AWS Config monitors and records changes to AWS resource configurations in your account. For example, if you add a security group to an EC2 instance for HTTP access or attach an EBS volume, AWS Config creates a log of these activities. This continuous tracking provides a historical record of configuration changes that is essential for auditing and ensuring regulatory compliance.

![The image explains AWS Config, highlighting its ability to track resource configurations, changes, and historical data for auditing and compliance purposes.](https://kodekloud.com/kk-media/image/upload/v1752861688/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud-security-and-compliance-concepts/frame_460.jpg)

To summarize, this section highlights that:

- Compliance and regulatory frameworks establish the guidelines organizations must follow.
- AWS undergoes regular audits, and detailed audit reports are accessible via AWS Artifact.
- The AWS Customer Compliance Center is your central hub for researching cloud-related regulatory requirements and best practices.
- AWS Audit Manager automates continuous compliance monitoring and generates audit-ready reports.
- AWS Config offers continuous monitoring and logging of configuration changes, ensuring transparency and compliance.

![The image summarizes AWS security and compliance, highlighting guidelines, on-demand compliance reports, and the AWS Compliance Center for researching regulatory requirements.](https://kodekloud.com/kk-media/image/upload/v1752861690/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud-security-and-compliance-concepts/frame_490.jpg)

> [!important]
> **Final Note**
>
> This integrated approach ensures that AWS and its customers collaborate to maintain a secure and compliant cloud environment, meeting the needs of today's dynamic regulatory landscape.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/4528372a-a177-43ff-b4b6-236c0eee4029/lesson/1ae70846-d20b-43f9-8de4-be445bff2cf7)**
>
> Watch video content
