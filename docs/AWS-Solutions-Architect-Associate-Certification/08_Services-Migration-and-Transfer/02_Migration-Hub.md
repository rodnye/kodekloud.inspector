# Migration Hub - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Migration-Hub)

---

## Table of Contents

- Migration Hub
  - Discovery Phase
  - Assessment Phase
  - Migration Process
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Migration Hub

In this lesson, we explore AWS Migration Hub—a powerful service from AWS designed to assist enterprises and organizations in planning and managing application and workload migrations to the AWS cloud. With a centralized view, Migration Hub enables you to monitor and track migration progress across multiple AWS and partner solutions efficiently.

## Discovery Phase

Before initiating your cloud migration, gathering detailed information about your on-premises environment is crucial. AWS Migration Hub facilitates this through a discovery process that collects extensive data about your servers and services. You can choose from two discovery methods:

- **Agent-based discovery:** Install an agent on your servers to retrieve detailed metrics and insights.
- **Agentless discovery:** Collect essential data without installing any software on your servers.

This process compiles information such as CPU utilization, memory usage, and network traffic, providing you with the necessary details to plan your migration accurately.

![The image is a diagram illustrating the AWS Migration Hub's discovery process, showing agent and agentless discovery from data centers leading to insights on service inventory, CPU usage, memory usage, and network utilization.](https://kodekloud.com/kk-media/image/upload/v1752865461/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Migration-Hub/aws-migration-hub-discovery-diagram.jpg)

> [!important]
> **Note**
>
> For optimal accuracy, ensure that the chosen discovery method aligns with your current infrastructure and privacy requirements.

## Assessment Phase

After completing the discovery phase, AWS Migration Hub transitions into the assessment phase. Here, the service analyzes the gathered data to recommend ideal target EC2 instance sizes and provide cost estimates. This phase addresses important questions such as:

- Am I selecting the optimal EC2 instance size for my workloads?
- Will this migration be cost-effective based on projected resource usage?

These assessments simplify the planning process by offering actionable insights tailored to your specific environment.

![The image is a flowchart illustrating the assessment process in AWS Migration Hub, showing inputs like service inventory, CPU usage, memory usage, and network utilization leading to assessment outcomes.](https://kodekloud.com/kk-media/image/upload/v1752865462/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Migration-Hub/aws-migration-hub-assessment-flowchart.jpg)

## Migration Process

Upon finalizing instance sizing and evaluating costs, you can move forward with the migration process. AWS Migration Hub serves as the central management console, integrating seamlessly with several AWS migration services, including:

- AWS Application Migration Service
- AWS Database Migration Service

...as well as various partner migration tools.

During this stage, Migration Hub continuously provides updates on your migration progress until the entire process is successfully completed.

![The image is a diagram illustrating the AWS Migration Hub, showing data flow from a data center to AWS Cloud using MGN and DMS services.](https://kodekloud.com/kk-media/image/upload/v1752865463/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Migration-Hub/aws-migration-hub-diagram.jpg)

> [!important]
> **Tip**
>
> Integrate with multiple migration tools to leverage specialized functionalities and streamline the overall migration process.

## Summary

AWS Migration Hub offers a streamlined and centralized approach for managing your migration projects. Its key features include:

- **Centralized View:** Monitor the entire migration process from a single dashboard.
- **Application Cataloging:** Discover and catalog on-premises applications, along with their dependencies, to prepare an effective migration plan.
- **Organized Migration Groups:** Group related applications and workloads to enhance management and tracking.
- **Integration with Migration Tools:** Seamlessly work with various AWS and partner migration services.
- **Reporting and Analytics:** Generate detailed reports and analytics to optimize migration strategy and effectiveness.

![The image is a summary slide with four key points about migration progress, application cataloging, organization into migration groups, and integration with migration tools. It features a gradient background and numbered icons for each point.](https://kodekloud.com/kk-media/image/upload/v1752865464/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Migration-Hub/migration-progress-summary-slide.jpg)

> [!important]
> **Conclusion**
>
> AWS Migration Hub simplifies your migration journey by offering a comprehensive set of tools to handle discovery, assessment, and management. This centralized console helps ensure your migration is efficient, well-planned, and cost-effective.

By leveraging AWS Migration Hub, you can confidently transition your on-premises workload to the cloud while minimizing complexity and optimizing performance. For more detailed guidance, consider exploring additional resources on [AWS Migration Hub Documentation](https://aws.amazon.com/migration-hub/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/2beb1bdc-ae99-46ae-b7e0-5888bac3f561)**
>
> Watch video content
