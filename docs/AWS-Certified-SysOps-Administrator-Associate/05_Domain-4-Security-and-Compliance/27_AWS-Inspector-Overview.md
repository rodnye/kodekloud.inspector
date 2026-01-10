# AWS Inspector Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/AWS-Inspector-Overview)

---

## Table of Contents

- AWS Inspector Overview
  - Getting Started with AWS Inspector
  - Continuous Scanning and Detailed Reporting
  - Assessment Rules and Findings
  - AWS Inspector Workflow
  - Severity and Reporting
  - Supported Scan Types and Output Formats
  - In-Depth Scanning for EC2, ECR, and Lambda
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# AWS Inspector Overview

AWS Inspector is a robust security assessment service that automatically audits your AWS resources for vulnerabilities and compliance issues. It acts like a professional security inspector for your infrastructure by continuously scanning your environment, which includes EC2 instances, container images in ECR, Lambda functions, and more.

![The image shows AWS Inspector analyzing AWS resources, specifically EC2, ECS, and Lambda services.](https://kodekloud.com/kk-media/image/upload/v1752860381/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/aws-inspector-analyzing-ec2-ecs-lambda.jpg)

## Getting Started with AWS Inspector

Begin your AWS Inspector journey by setting up a resource group based on AWS tags. This enables you to define which resources are included in the assessment. For EC2 instances, it is critical to install an agent on each instance. Without the agent, AWS Inspector limits its scan to the external view, which might overlook internal vulnerabilities.

![The image illustrates AWS Inspector components, showing two assessment targets: one for a development environment and another for a production environment.](https://kodekloud.com/kk-media/image/upload/v1752860383/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/aws-inspector-assessment-targets.jpg)

> [!important]
> **Note**
>
> For EC2 instances, installing the agent is essential to ensure a comprehensive internal scan.

## Continuous Scanning and Detailed Reporting

AWS Inspector continuously scans resources throughout their lifecycle. When there is any change—such as an update to a package or configuration—Inspector will issue a Common Vulnerabilities and Exposures (CVE) alert if a vulnerability is detected. These findings are then aggregated and stored in AWS Security Hub, complete with scoring and detailed reports accessible from a custom dashboard.

![The image lists seven features with icons: centrally manage your environment, easy to activate, continuous scanning, lifecycle scanning, responsive scanning, findings, and scoring.](https://kodekloud.com/kk-media/image/upload/v1752860384/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/features-icons-environment-scanning.jpg)

## Assessment Rules and Findings

AWS Inspector operates using an assessment rules package that covers critical areas such as network reachability, known CVEs, security best practices, and CIS benchmarks. The rules can be customized to evaluate the relevant aspects of your environment.

![The image lists AWS Inspector Assessment Rule Packages, including network reachability, common vulnerabilities and exposures, security best practices, and CIS Benchmarks.](https://kodekloud.com/kk-media/image/upload/v1752860385/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/aws-inspector-assessment-rules.jpg)

The service categorizes its findings into various types, including package vulnerabilities, code vulnerabilities, and network reachability issues. This categorization makes it easier to prioritize remediation efforts.

![The image shows three types of Amazon Inspector findings: Package Vulnerability, Code Vulnerability, and Network Reachability, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752860386/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/amazon-inspector-findings-icons.jpg)

## AWS Inspector Workflow

The typical workflow with AWS Inspector involves the following steps:

1.  Define assessment targets by selecting specific resources.
2.  Specify assessment templates, which include your chosen evaluation criteria.
3.  Run assessments to scan for vulnerabilities.
4.  Review findings and remediate any identified issues.

![The image outlines the AWS Inspector Workflow, detailing four steps: setting up AWS Inspector, defining assessment targets, defining assessment templates, and running the assessment.](https://kodekloud.com/kk-media/image/upload/v1752860386/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/aws-inspector-workflow-steps.jpg)

When a target group includes multiple resources (e.g., EC2 and ECR), the assessment comprises both internal scans (via installed agents) and external scans. The scanning process generates events that can trigger notifications or automated remediation actions via integrations with services like Lambda or SNS through EventBridge.

![The image illustrates the workflow of AWS Inspector, showing a sequence from an Assessment Target Group to EventBridge, Lambda, and SNS.](https://kodekloud.com/kk-media/image/upload/v1752860388/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/aws-inspector-workflow-diagram.jpg)

## Severity and Reporting

Findings from AWS Inspector are displayed in its native dashboard as well as in AWS Security Hub. They are scored based on severity levels—from informational to high priority—similar to the reports in AWS GuardDuty. This detailed scoring system helps in efficiently prioritizing the remediation of vulnerabilities.

![The image shows a table categorizing software package vulnerability severity based on scores, with ratings ranging from "Informational" to "High."](https://kodekloud.com/kk-media/image/upload/v1752860389/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/software-package-vulnerability-severity-table.jpg)

## Supported Scan Types and Output Formats

AWS Inspector supports multiple scan types including:

- **EC2 Scanning:** Requires an agent for in-depth internal vulnerability detection.
- **ECR Scanning:** Offers both basic scanning (triggered during image push) and enhanced scanning (providing deeper registry-level analysis).
- **Lambda Scanning:** Continuously monitors for code vulnerabilities, dependency issues, and misconfigurations.

Additionally, output formats such as CycloneDX and SPDX 2.3 are available to suit various compliance and reporting standards.

![The image shows three types of Amazon Inspector scan types: Amazon EC2 scanning, Amazon ECR scanning, and Lambda standard scanning. Each type is represented by an icon and a label.](https://kodekloud.com/kk-media/image/upload/v1752860391/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/amazon-inspector-scan-types-icons.jpg)

For CIS benchmark scans, AWS Inspector evaluates whether your configurations pass, are skipped, or have failed specific checks based on standards from the Center for Internet Security.

![The image illustrates Amazon Inspector CIS Scans, showing an assessment target group based on tags and a defined schedule, alongside CIS security benchmarks with scan results categorized as passed, skipped, or failed checks.](https://kodekloud.com/kk-media/image/upload/v1752860392/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/amazon-inspector-cis-scans-results.jpg)

## In-Depth Scanning for EC2, ECR, and Lambda

For EC2 instances, AWS Inspector leverages both AWS Systems Manager (SSM) and a local agent to perform comprehensive internal and external scans. In the absence of a local agent, the scanner falls back to evaluating the EBS snapshot, which identifies passive software package vulnerabilities but does not detect runtime issues.

Similarly, for ECR scanning:

- **Basic Scanning:** Detects vulnerabilities during the image push process.
- **Enhanced Scanning:** Conducts deeper inspections, analyzing the underlying operating system and programming language dependencies.

![The image compares basic and enhanced scanning with Amazon Inspector for Amazon ECR, highlighting differences in vulnerability detection and scanning processes. Basic scanning detects vulnerabilities in container images, while enhanced scanning offers registry-level scans with continuous monitoring for deeper vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752860393/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Inspector-Overview/amazon-inspector-ecr-scanning-comparison.jpg)

Lambda functions benefit from continuous scanning to identify issues related to code vulnerabilities, excessive permissions, and outdated dependencies. AWS Inspector can also be integrated into CI/CD pipelines to trigger scans during the build process, ensuring vulnerabilities are identified immediately after deployment.

## Conclusion

AWS Inspector is an essential tool for maintaining a secure AWS environment by auditing EC2, ECR, and Lambda resources. Its automated and continuous scanning capabilities, along with deep integration into AWS Organizations and detailed reporting features, empower organizations to proactively monitor and remediate vulnerabilities.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/043f68f0-948a-483a-925f-64049599c836)**
>
> Watch video content
