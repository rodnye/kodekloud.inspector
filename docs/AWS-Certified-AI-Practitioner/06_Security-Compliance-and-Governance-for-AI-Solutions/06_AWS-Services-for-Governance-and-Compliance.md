# AWS Services for Governance and Compliance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Security-Compliance-and-Governance-for-AI-Solutions/AWS-Services-for-Governance-and-Compliance)

---

## Table of Contents

- AWS Services for Governance and Compliance
  - Key AWS Governance and Compliance Services
  - AWS Artifact
  - Data Visualization and Governance Tools
  - AWS Lake Formation
  - AWS SageMaker Clarify
  - AWS Config and CloudTrail
  - AWS Inspector and Audit Manager
  - AWS Trusted Advisor
  - Conclusion
  - Watch Video
    - AWS Config
    - AWS CloudTrail
    - AWS Inspector
    - AWS Audit Manager

---

## Content

AWS Certified AI Practitioner

Security Compliance and Governance for AI Solutions

# AWS Services for Governance and Compliance

Welcome to this comprehensive guide on AWS services for governance and compliance. In this article, we explore a range of AWS services designed to help you meet regulatory requirements and implement robust governance practices in secure cloud environments. Before diving into the individual services, it's essential to understand the AWS Shared Responsibility Model.

In this model, AWS is responsible for securing the underlying infrastructure, while customers must secure their workloads and data. If you can access or configure a resource, the responsibility to secure it lies with you; if not, AWS manages that security aspect. This principle is fundamental when preparing for AWS certifications and establishing secure cloud practices.

![The image illustrates the AWS Compliance and Governance introduction, highlighting the shared responsibility model between AWS and customers, with AWS securing infrastructure and customers securing their workloads.](https://kodekloud.com/kk-media/image/upload/v1752857724/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-compliance-governance-introduction.jpg)

## Key AWS Governance and Compliance Services

Below is an overview of the key AWS services that simplify compliance tasks and support effective governance:

## AWS Artifact

Every AWS account benefits from AWS Artifact, a central repository that provides access to all enterprise agreements with AWS, along with regulatory attestations and global compliance certifications such as PCI DSS and ISO 27001. Although the interface may appear slightly different per account, its core function remains the same: delivering centralized, comprehensive compliance information and third-party reports to streamline audit processes.

![The image is a dashboard showcasing AWS Artifact for simplifying compliance reporting, featuring charts and data tables on compliance and non-compliance metrics. It highlights access to third-party compliance reports and reduced audit scope for customers.](https://kodekloud.com/kk-media/image/upload/v1752857725/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-artifact-compliance-dashboard.jpg)

## Data Visualization and Governance Tools

For effective regulatory compliance, analyzing and visualizing data is critical. AWS offers several tools to help you monitor data quality, identify gaps, detect Personally Identifiable Information (PII), and enforce governance policies. Key tools include:

- **SageMaker Data Wrangler**
- **AWS Glue DataBrew**
- **Custom Jupyter Notebooks** using Python libraries such as Pandas, Scikit-Learn, and Seaborn

These tools collectively empower you to gain actionable insights into your data, ensuring that your compliance and governance strategies are data-driven.

![The image shows a screenshot of AWS Glue DataBrew, a tool for data preparation, with a focus on data governance. It includes a data profile overview with columns, data quality metrics, value distribution, and correlations.](https://kodekloud.com/kk-media/image/upload/v1752857726/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-glue-databrew-data-governance.jpg)

## AWS Lake Formation

AWS Lake Formation simplifies the process of setting up and managing secure data lakes on Amazon S3 with granular access controls. You can define permissions at the column, row, and cell levels—capabilities that go beyond standard IAM policies. This fine-grained control is crucial for restricting data access to authorized users only.

Additionally, Amazon S3 now offers eight tiers of data management, including a high-performance tier, enabling better lifecycle management and cost optimization. These enhanced storage options help ensure that archived data remains immutable and compliant with regulatory standards.

![The image illustrates AWS Lake Formation's fine-grained data access control, showing a data lake divided into public and private zones with different access levels. It highlights the management of permissions at column, row, and cell levels.](https://kodekloud.com/kk-media/image/upload/v1752857727/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-lake-formation-data-access-control.jpg)

![The image is an infographic about Amazon S3 data management, highlighting multiple storage classes and lifecycle rules for compliance and cost optimization. It includes a flowchart of different S3 storage options like Standard, Intelligent-Tiering, and Glacier.](https://kodekloud.com/kk-media/image/upload/v1752857729/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/amazon-s3-data-management-infographic.jpg)

> [!important]
> **Lifecycle Policies in S3**
>
> Lifecycle policies in Amazon S3 help ensure that data, once archived, remains immutable until explicitly retrieved—an important factor for compliance and audit readiness.

## AWS SageMaker Clarify

AWS SageMaker Clarify provides critical insights into your machine learning models by analyzing input and output data, detecting biases, and monitoring for drift. This ensures your models remain fair and perform consistently over time, supporting accountability and transparency in AI deployments.

![The image illustrates the process of Amazon SageMaker Clarify for ensuring model accountability, highlighting bias detection and monitoring feature attribution drift. It includes a flowchart showing data processing and model hosting clusters.](https://kodekloud.com/kk-media/image/upload/v1752857730/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/amazon-sagemaker-clarify-flowchart.jpg)

## AWS Config and CloudTrail

### AWS Config

AWS Config continuously monitors and records your AWS resource configurations against both AWS-managed and custom rules. For example, if an EC2 instance is accidentally left exposed to the public internet, AWS Config can trigger notifications or automated remediation actions to maintain compliance and support self-healing infrastructures.

![The image is an infographic about AWS Config, highlighting its role in continuous monitoring for compliance, managing resources, evaluating compliance, and simplifying operations. It also mentions monitoring AWS resource configurations and tracking compliance against rules.](https://kodekloud.com/kk-media/image/upload/v1752857731/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-config-compliance-infographic.jpg)

### AWS CloudTrail

AWS CloudTrail logs every API call and user activity within your account, which is essential for forensic analysis and regulatory audits. By capturing detailed event histories, CloudTrail provides a critical audit trail that helps enterprise environments maintain transparency and quickly address any security issues. It's important to enable CloudTrail in older accounts to ensure your audit trail is complete.

![The image shows a screenshot of AWS CloudTrail's event history, displaying a list of management events with details like event name, time, user name, and event source. It highlights the capability to log API calls and user activity across AWS.](https://kodekloud.com/kk-media/image/upload/v1752857732/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-cloudtrail-event-history-screenshot.jpg)

## AWS Inspector and Audit Manager

### AWS Inspector

Amazon Inspector automatically assesses the security of your virtual machines, containers, and serverless applications by identifying vulnerabilities based on known CVEs. This proactive scanning enables quicker remediation of security issues, playing a key role in maintaining a secure and compliant environment.

![The image is an overview of Amazon Inspector, highlighting its features of automated security assessments and vulnerability identification for compliance improvement, alongside a dashboard displaying security findings.](https://kodekloud.com/kk-media/image/upload/v1752857733/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/amazon-inspector-security-overview.jpg)

### AWS Audit Manager

AWS Audit Manager simplifies compliance management by automating the collection of evidence across your AWS services. It gathers auditable data from various sources, making audit preparation more efficient. Note that while Audit Manager streamlines the process, it does not automatically assess compliance.

![The image is a screenshot of the AWS Audit Manager interface, highlighting features like simplifying compliance management and automating evidence collection for audits. It includes a framework library with a list of standard frameworks.](https://kodekloud.com/kk-media/image/upload/v1752857734/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-audit-manager-compliance-screenshot.jpg)

## AWS Trusted Advisor

AWS Trusted Advisor provides ongoing recommendations across critical areas such as security, performance, fault tolerance, cost optimization, and service limits. It continuously checks your environment for potential issues like underutilized resources or security vulnerabilities. Trusted Advisor alerts, sent via email to the primary account owner and key stakeholders, help you quickly address any identified issues. Full functionality is available with a Business or Enterprise support plan.

![The image is a screenshot of AWS Trusted Advisor, showing best practices and compliance recommendations, including checks for security, fault tolerance, and potential cost savings.](https://kodekloud.com/kk-media/image/upload/v1752857735/notes-assets/images/AWS-Certified-AI-Practitioner-AWS-Services-for-Governance-and-Compliance/aws-trusted-advisor-best-practices.jpg)

## Conclusion

This guide has provided an overview of several key AWS services that facilitate governance and compliance. While not exhaustive, these tools offer a solid foundation for managing regulatory compliance and data governance in the AWS ecosystem. For additional details and in-depth service information, explore further [AWS documentation](https://aws.amazon.com/documentation/) and certification resources.

By leveraging these services, you can streamline compliance processes, ensure robust data governance, and maintain a secure and compliant cloud environment that meets industry standards and enterprise requirements.

> [!important]
> **Further Reading**
>
> For more insights into AWS governance and compliance practices, consider exploring the [AWS Compliance Center](https://aws.amazon.com/compliance/) and additional AWS security blogs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/ec2a70a1-c3fc-4b7a-adef-26ae64d8f107/lesson/88b83b43-44de-4883-816a-e59c1cf2675e)**
>
> Watch video content
