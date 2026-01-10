# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Venator Corp Requirements
  - Three-Tier Application Requirements
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Section Introduction

In this lesson, we will design a robust network infrastructure module by implementing key network architecture components such as Virtual Networks, firewalling, routing, security measures, and load balancing. These concepts build upon those introduced in the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course, providing a comprehensive overview of how to integrate these elements into your overall architecture.

Before discussing the implementation details, let's consider a scenario for Venator Corp to understand the requirements and design considerations.

## Venator Corp Requirements

Venator Corp has set the following requirements for its network infrastructure:

- Establish a private connection between the on-premises environment and Azure.
- Include a failover path in case the private connection experiences downtime.

![The image outlines a scenario for Vendetta Corp's network requirements, including private Azure connections, failover paths, and a central virtual network with specific traffic and application needs. It also details requirements for a three-tier application, such as web request inspection and load balancing.](https://kodekloud.com/kk-media/image/upload/v1752867100/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Section-Introduction/vendetta-corp-network-requirements-diagram.jpg)

> [!important]
> **Scenario Overview**
>
> The diagram above illustrates the network requirements for Venator Corp. It details how private connections, failover strategies, and centralized virtual networks come together to support mission-critical applications.

In addition, Venator Corp requires a central virtual network that adheres to the following specifications:

- All traffic entering or leaving Azure must be inspected before reaching its destination.
- Users should securely connect via RDP or SSH without the need to manage IaaS servers or rely on public IP addresses.
- The architecture should incorporate two spoke networks designed to host a three-tier application, with deployments in West US and West Europe.

## Three-Tier Application Requirements

The three-tier application within this network infrastructure must meet these specific requirements:

- **Web Request Inspection:** All incoming web requests should be inspected prior to reaching the business logic tier.
- **Load Balancing:** Requests directed to the business logic tier must be load balanced across virtual machines on port 8080.
- **Private Database Communication:** The communication between the business logic tier and the SQL PaaS database should occur exclusively over a private connection.
- **Latency-Based Routing:** Users should be routed to their nearest region based on latency, with the choice between West Europe and East US.
- **Subnet Isolation:** Traffic from front-end subnets must not have access to the database subnets.

These defined requirements create the foundational scenario for our network infrastructure design discussions in this lesson. By addressing these points, we aim to build a secure, resilient, and scalable network architecture tailored to Venator Corp's needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/d8604a8d-59c1-4215-a9ec-8bdf5e20a5c7)**
>
> Watch video content
