# Inspector - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Inspector)

---

## Table of Contents

- Inspector
  - Setting Up AWS Inspector
  - Key Features of AWS Inspector
  - Types of Findings
  - AWS Inspector Workflow
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Inspector

In this article, we explore the robust security capabilities of AWS Inspector—a service designed to continuously scan your AWS workloads for software vulnerabilities and unintended network exposures. AWS Inspector automatically discovers and assesses EC2 instances, container images stored in the Elastic Container Registry (ECR), and AWS Lambda functions for potential security issues.

![The image shows a diagram of AWS resources, specifically EC2, ECS, and Lambda, with an "Inspector" label and a magnifying glass icon.](https://kodekloud.com/kk-media/image/upload/v1752865875/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Inspector/aws-resources-ec2-ecs-lambda-diagram.jpg)

One significant advantage of AWS Inspector is its continuous assessment capability throughout the resource lifecycle. Whether you're installing a new package, applying a patch, or addressing a new CVE disclosure, AWS Inspector will automatically re-scan the impacted resources to uncover vulnerabilities.

When a vulnerability or open network path is identified, AWS Inspector generates a detailed finding. Each finding provides comprehensive information about the security risk, the affected resource, and actionable recommendations for remediation.

## Setting Up AWS Inspector

Before initiating assessments, you need to define the AWS resources to be scanned by setting up an assessment target—a specific resource group. This allows you to target only production environments, for instance, while excluding development resources.

![The image illustrates AWS Inspector components, showing two assessment targets: one for a development environment and another for a production environment, each with associated icons.](https://kodekloud.com/kk-media/image/upload/v1752865879/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Inspector/aws-inspector-assessment-targets-diagram.jpg)

To configure AWS Inspector effectively:

1.  Create an assessment target by grouping resources based on appropriate tags.
2.  Select the rules packages that align with your security requirements.
3.  Initiate the assessment to start scanning the defined resources.

> [!important]
> **Note**
>
> For detailed guidance on tagging resources for assessment targets, refer to the [AWS Inspector documentation](https://docs.aws.amazon.com/inspector/latest/userguide/inspector_introduction.html).

## Key Features of AWS Inspector

AWS Inspector offers a centralized management approach through integration with AWS Organizations, which allows you to oversee vulnerability assessments across multiple AWS accounts. Its one-click activation and continuous monitoring provide a user-friendly yet powerful security solution.

Key features include:

- **Continuous and Responsive Scanning:** AWS Inspector monitors for vulnerabilities in real time and triggers re-scans automatically after any significant system modifications.
- **Detailed Findings and Severity Scoring:** The service generates in-depth findings with severity scores, enabling you to prioritize remediation efforts based on risk.
- **Customizable Centralized Dashboard:** A user-friendly dashboard displays all findings, helping you to focus on resolving critical security issues.

![The image lists nine features of a software product, including centralized management, easy activation, continuous scanning, lifecycle scanning, responsive scanning, findings, scoring, dashboard, and customizable views.](https://kodekloud.com/kk-media/image/upload/v1752865881/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Inspector/software-product-features-list.jpg)

## Types of Findings

AWS Inspector classifies its findings into three primary categories:

1.  **Package Vulnerability:**  
    These findings highlight vulnerabilities in software packages that could be exploited to compromise the confidentiality, integrity, or availability of your systems, potentially leading to unauthorized access.
2.  **Code Vulnerability:**  
    These alerts identify exploitable segments in your code, which might result in injection flaws, data exposure, weak cryptographic practices, or insufficient encryption. AWS Inspector leverages automated reasoning and Amazon CodeGuru to assess the security compliance of your Lambda function code.
3.  **Network Reachability:**  
    These findings point out open network paths to Amazon EC2 instances or overly permissive network configurations, including misconfigured security groups, access control lists, or Internet Gateways.

![The image shows three icons representing different types of vulnerabilities: package vulnerability, code vulnerability, and network reachability. Each icon is accompanied by a label and has a distinct color.](https://kodekloud.com/kk-media/image/upload/v1752865882/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Inspector/vulnerability-icons-package-code-network.jpg)

## AWS Inspector Workflow

The AWS Inspector workflow is straightforward and can be summarized with the following steps:

1.  Define assessment targets by specifying the resources to be scanned.
2.  Select the relevant rules packages to identify vulnerabilities and ensure compliance.
3.  Launch the assessment to scan your configured environment.
4.  Review the findings generated by AWS Inspector.
5.  Investigate and remediate any issues detected.

![The image outlines the "Inspector workflow" with six steps: setting up AWS Inspector, defining assessment targets and templates, running the assessment, reviewing findings, and remediating issues.](https://kodekloud.com/kk-media/image/upload/v1752865883/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Inspector/inspector-workflow-aws-steps.jpg)

> [!important]
> **Note**
>
> This continuous, responsive, and centralized scanning process makes AWS Inspector an essential security tool in dynamic AWS environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/d04e561b-3015-483e-9aa3-abba7dfbddac)**
>
> Watch video content
