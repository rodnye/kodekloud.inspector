# Application Discovery Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Application-Discovery-Service)

---

## Table of Contents

- Application Discovery Service
  - Agent-Based Discovery
  - Agentless Discovery
  - Watch Video
    - Use Cases

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Application Discovery Service

In this article, we explore the Application Discovery Service and its key role in the migration process. By gathering essential data about your on-premises applications and infrastructure, this service lays the foundation for effective migration planning. AWS Migration Hub then leverages this information to track and manage your migration journey.

The Application Discovery Service collects comprehensive details about your environment, including:

- Infrastructure components
- Application dependencies
- Network traffic
- Performance metrics

This data empowers businesses to make informed decisions and execute a seamless migration to the cloud.

![The image illustrates the AWS Application Discovery Service, showing its connection between a data center (with server and database) and a calendar, indicating a process flow.](https://kodekloud.com/kk-media/image/upload/v1752865407/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/aws-application-discovery-service-flow.jpg)

Understanding relationships and dependencies between applications, servers, and processes is crucial for planning migrations without disrupting critical services. The service supports two primary methods for data collection: Agent-Based Discovery and Agentless Discovery.

## Agent-Based Discovery

Agent-based discovery involves deploying lightweight software agents directly on your on-premises servers. These agents continuously scan your systems to collect detailed information, including:

- Network traffic
- Running processes
- Performance metrics
- Configuration settings

This approach provides an in-depth view of your current environment and a clear picture of interdependencies between applications and services.

![The image illustrates an "Agent Discovery" process, showing a corporate data center with servers and agents connecting to an application discovery service via TLS encryption, collecting system specifications, performance data, and network connections.](https://kodekloud.com/kk-media/image/upload/v1752865408/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/agent-discovery-process-data-center.jpg)

## Agentless Discovery

The agentless method simplifies deployment by using an agentless collector deployed as a virtual machine within your VMware vCenter server environment. This VM, which incorporates necessary agent functionalities, gathers essential information such as:

- Server profiles (CPU, RAM)
- Database metadata
- Utilization metrics

This approach eliminates the need for installing individual agents on each server, making it a streamlined solution for data collection.

![The image illustrates an "Agentless Discovery" process involving a VMware vCenter Server, an agent, and an agentless collector, highlighting components like CPU, RAM, database metadata, and utilization metrics.](https://kodekloud.com/kk-media/image/upload/v1752865410/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/agentless-discovery-vmware-architecture.jpg)

A visual comparison of the key differences between the agent-based and agentless methods is provided below. This comparison can assist you in determining the best approach for your environment:

![The image is a comparison table between Agentless Collector and Discovery Agent, detailing supported server types, deployment methods, collected data, supported operating systems, and databases.](https://kodekloud.com/kk-media/image/upload/v1752865411/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/agentless-collector-vs-discovery-agent.jpg)

Data collected by either method is securely transmitted to the Application Migration Service every 15 minutes over a TLS tunnel and stored in an Amazon S3 bucket for further analysis. Amazon Athena can be utilized to visualize and analyze this data, providing deeper insights into your migration readiness.

![The image is a flowchart illustrating a data processing workflow from a data center server to Amazon services, including Application Discovery Service, Amazon S3, and Amazon Athena.](https://kodekloud.com/kk-media/image/upload/v1752865412/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/data-processing-workflow-amazon-flowchart.jpg)

> [!important]
> **Key AWS Integrations**
>
> The Application Discovery Service integrates seamlessly with several AWS migration tools, such as AWS Database Migration Service (DMS), Migration Hub, and Migration Evaluator, enabling a coordinated migration strategy.

### Use Cases

The Application Discovery Service supports several critical use cases, including:

- Discovering on-premises server and database inventories to accelerate migration planning.
- Mapping network communication patterns to uncover hidden dependencies and form migration groups.
- Collecting utilization data to right-size Amazon EC2 instances via insights provided by Migration Hub or AWS DMS.

![The image outlines a use case with three steps: discovering on-premises servers and database inventories, mapping network communication patterns, and mobilizing integration.](https://kodekloud.com/kk-media/image/upload/v1752865413/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Application-Discovery-Service/use-case-discover-map-mobilize.jpg)

In summary, the Application Discovery Service delivers vital insights into your on-premises environment, laying the groundwork for an informed and smooth migration to AWS. For further reading on AWS migration tools, consider visiting the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/32a637d8-8e75-4720-bffb-9c4c4298254b)**
>
> Watch video content
