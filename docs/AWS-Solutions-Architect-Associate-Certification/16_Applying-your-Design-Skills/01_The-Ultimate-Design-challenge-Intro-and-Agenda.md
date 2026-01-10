# The Ultimate Design challenge Intro and Agenda - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Applying-your-Design-Skills/The-Ultimate-Design-challenge-Intro-and-Agenda)

---

## Table of Contents

- The Ultimate Design challenge Intro and Agenda
  - Overview of the Challenge
  - Scenario Two: Development Environment Architecture
  - Scenario Three: Advanced Contact Center Architecture
  - Final Thoughts
  - Watch Video
    - Example Scenario: Laboratory Instrument Logs Pipeline

---

## Content

AWS Solutions Architect Associate Certification

Applying your Design Skills

# The Ultimate Design challenge Intro and Agenda

Welcome, Solutions Architects! In this lesson, presented by Michael Forrester, we introduce the innovative drag-and-drop design challenge—a new format debuting on KodeKloud. This challenge provides a hands-on opportunity to map AWS services into reference architectures using interactive scenarios.

## Overview of the Challenge

When you begin the challenge, you will encounter a list of scenarios represented by specific links (e.g., security, reliability, etc.). Clicking one of these links loads an example page similar to the one shown below.

On the challenge page you will find:

- Instructions in the upper left-hand corner.
- A reference diagram that illustrates the target architecture.
- A palette of AWS services that you can drag into designated areas. Gray boxes in the diagram indicate the missing components that you need to identify and complete.

### Example Scenario: Laboratory Instrument Logs Pipeline

Consider a challenge where you need to design a data pipeline for capturing and analyzing laboratory instrument logs. In this scenario, an unknown AWS service is responsible for seamlessly synchronizing files from on-premises storage to the cloud, enabling efficient processing and analysis through high-speed data transfer and metadata coordination. Your task is to identify and place the appropriate service into the missing component.

In the provided diagram, lab devices generate logs during experiments. An agent retrieves data from a file server and sends it to an unknown AWS service before synchronizing it with Amazon S3. Although additional components exist—such as AWS Lambda for processing, API Gateway and Amazon Cognito for authentication, and Kibana for dashboard visualization—the focus is on the storage-to-storage data transfer element.

Consider these available services:

- **Glue:** Designed for ETL tasks; it does not perform pure data synchronization.
- **FSx:** Provides file storage but does not support synchronization.
- **Direct Connect:** Sets up a network connection without data synchronization.
- **Storage Gateway:** Hosts on-premises storage.
- **SFTP:** Focused on secure file transfer.

> [!important]
> **Hint**
>
> The service that seamlessly transfers data between on-premises storage and the cloud is AWS DataSync.

To complete the challenge, drag DataSync into the corresponding gray box and click the submit button. If your selection is incorrect, the system will prompt you to try again until the correct service is identified.

![The image depicts an AWS architecture diagram for capturing and analyzing laboratory instrument logs, featuring services like Amazon S3, AWS Lambda, and Amazon Elasticsearch Service, among others. It outlines a data processing pipeline from experiment execution to data storage and analysis.](https://kodekloud.com/kk-media/image/upload/v1752863443/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-Ultimate-Design-challenge-Intro-and-Agenda/aws-architecture-laboratory-logs-diagram.jpg)

## Scenario Two: Development Environment Architecture

Imagine an environment where development teams require a robust monitoring system and a scalable database to manage multiple applications. In this scenario, the diagram includes three gray boxes that represent missing services for:

- Container orchestration
- Application monitoring
- Database scalability

![The image depicts a system architecture diagram for a development environment using AWS and IBM services, highlighting components like Instana SaaS, Amazon EC2, and various AWS services for container orchestration and database management. It includes a task to identify three integral services for container orchestration, application monitoring, and database scalability.](https://kodekloud.com/kk-media/image/upload/v1752863444/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-Ultimate-Design-challenge-Intro-and-Agenda/aws-ibm-architecture-diagram.jpg)

Key considerations for this scenario:

- Developers integrate with Instana SaaS, with Instana agents operating in the environment to feed sensor data.
- For container orchestration, select the service designed specifically to manage containers (not EC2, which represents virtual machines).
- For large-scale database management, choose Amazon Aurora, which is optimized for scalability compared to a traditional RDS database.
- For application monitoring, pick the service best suited to process incoming telemetry data.

Drag the selected services into the corresponding gray boxes and submit your configuration to validate your reference architecture.

## Scenario Three: Advanced Contact Center Architecture

This scenario involves a sophisticated contact center designed to leverage AI to enhance customer interactions and support agents. The design integrates multiple services:

- One service empowers agents with searchable enterprise information.
- A second service offers a conversational interface to interpret user queries.
- A third service synchronizes data across various sources.

Existing components in the design include AWS Lambda and Amazon Comprehend for processing data, an Agent Assist component that communicates with Amazon Kendra and CloudFront, and an integration with a generative AI service (Amazon Bedrock).

Consider these details:

- For searchable enterprise information, **Amazon Kendra** is the optimal choice.
- For the conversational interface, **Amazon Lex** provides a dedicated chat framework.
- For synchronizing data across sources, **AWS AppSync** is ideally suited to the task.

After placing the correct services in the gray boxes, drag them into position and submit your configuration. If any selections are incorrect, you will have the opportunity to review hints regarding container orchestration, monitoring, and database management before trying again.

## Final Thoughts

These challenges vary in complexity—from selecting a single service to configuring multiple integrations. The goal is to help you master the process of mapping AWS services into reference architectures effectively.

> [!important]
> **Further Assistance**
>
> If you have any questions or need clarification, please join our forums, Slack, or Discord communities.

Thank you for reading this lesson. This is Michael Forrester, signing off—enjoy the challenge!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9a305a3f-b116-4c63-adfe-f6f2104b336e/lesson/c88485a2-143d-4231-8231-64a15b6b2d98)**
>
> Watch video content
