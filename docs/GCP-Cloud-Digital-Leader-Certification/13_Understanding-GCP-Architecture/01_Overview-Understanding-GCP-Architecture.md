# Overview Understanding GCP Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Understanding-GCP-Architecture/Overview-Understanding-GCP-Architecture)

---

## Table of Contents

- Overview Understanding GCP Architecture
  - Scenario: On-Premises to GCP Connectivity
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Understanding GCP Architecture

# Overview Understanding GCP Architecture

Hello and welcome back.

In this lesson, we dive into several architectural diagrams that illustrate how an organization's on-premises environment connects with Google Cloud Platform (GCP). We will also introduce additional GCP services that expand your understanding of cloud connectivity and migration.

## Scenario: On-Premises to GCP Connectivity

Our first architectural diagram represents a scenario where an organization’s on-premises infrastructure is linked to GCP. This connection is essential during migration, allowing services and data to transition gradually rather than via a direct cut-over.

On the left side of the diagram, you will notice the on-premises setup, which includes local compute resources, storage, network components, and a gateway. This gateway is a hardware device responsible for managing both inbound and outbound traffic.

To establish a secure connection between on-premises and Google Cloud, we utilize Google Cloud Interconnect and VPN. These services provide encrypted, reliable channels for transferring data securely between the two environments.

On the GCP side, a corresponding gateway manages incoming traffic. An edge filter is employed to further enhance security and optimize latency, ensuring that after filtration, traffic reaches critical services such as Compute Engine and Cloud Storage.

> [!important]
> **Key Consideration**
>
> In this architecture, the Compute Engine may need to communicate with local on-premises storage that has not yet been migrated to GCP. This design supports thorough testing of cloud applications by preserving essential connections to legacy data.

![The image illustrates an architecture diagram showing the connection between on-premises infrastructure and Google Cloud Platform (GCP) using Google Cloud Interconnect and VPN. It includes components like local compute, storage, gateways, and cloud services such as Compute Engine and Cloud Storage.](https://kodekloud.com/kk-media/image/upload/v1752875370/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Overview-Understanding-GCP-Architecture/on-premises-gcp-architecture-diagram.jpg)

In the diagram, the Compute Engine hosts an application that may require direct access to data still residing on-premises. The connectivity provided via Interconnect and VPN allows the application to be tested in the cloud, ensuring that it performs as expected and maintains its functionality from the on-premises environment.

This use case clearly demonstrates how Google Cloud Interconnect and VPN enable seamless connectivity between on-premises infrastructure and GCP. For exam preparations and practical implementations, taking note of varying architectural designs can simplify your understanding of service use cases and help answer related questions more effectively.

That concludes this use case. In our next article, we will explore another GCP architecture.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/d31d9cda-d4bd-482b-981c-12bc7f6fb4e9/lesson/05f28cc1-ee7b-4210-816a-c109c0854f69)**
>
> Watch video content
