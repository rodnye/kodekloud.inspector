# Cloud and Supply Chain Vulnerabilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Cloud-and-Supply-Chain-Vulnerabilities)

---

## Table of Contents

- Cloud and Supply Chain Vulnerabilities
  - Core Cloud Concepts
  - Cloud Service Models
  - Supply Chain Dependencies
  - Conclusion
  - Watch Video

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Cloud and Supply Chain Vulnerabilities

In this article, we explore how cloud computing offers numerous benefits to organizations while introducing new security challenges. Understanding these risks is critical to securing both your cloud infrastructure and your supply chain.

Cloud computing reduces operational costs by allowing companies to access virtualized IT services over the Internet instead of investing in on-premises infrastructure. However, these services can also introduce potential attack vectors if not properly secured.

> [!important]
> **Note**
>
> Before diving into vulnerabilities, it is crucial to have a solid grasp of core cloud concepts, as these form the foundation for identifying and mitigating risks.

## Core Cloud Concepts

Cloud platforms deliver virtualized IT services that companies can rent, significantly lowering costs and management overhead compared to maintaining internal infrastructure.

![The image illustrates a flowchart showing cloud security vulnerabilities, depicting a company connected to the cloud, which in turn connects to virtualized IT services like servers and computers.](https://kodekloud.com/kk-media/image/upload/v1752872528/notes-assets/images/CompTIA-Security-Certification-Cloud-and-Supply-Chain-Vulnerabilities/cloud-security-vulnerabilities-flowchart.jpg)

## Cloud Service Models

Cloud services typically follow one of these models:

| Service Model                      | Description                                                                                                                                     | Examples                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Software as a Service (SaaS)       | Provides fully functional software on a pay-as-you-go basis. Users access applications directly over the Internet without local installation.   | Microsoft Office 365, Salesforce |
| Infrastructure as a Service (IaaS) | Offers virtualized IT components such as networks, servers, and storage. Allows organizations to configure and manage their own infrastructure. | Amazon EC2, Microsoft Azure VM   |
| Platform as a Service (PaaS)       | Provides a developer-friendly environment for building and deploying applications in the cloud without managing the underlying infrastructure.  | Heroku, AWS Elastic Beanstalk    |

![The image outlines cloud security vulnerabilities, focusing on three service models: Software as a Service (SaaS), Infrastructure as a Service (IaaS), and Platform as a Service (PaaS), each with brief descriptions and examples.](https://kodekloud.com/kk-media/image/upload/v1752872529/notes-assets/images/CompTIA-Security-Certification-Cloud-and-Supply-Chain-Vulnerabilities/cloud-security-vulnerabilities-saas-iaas-paas.jpg)

When addressing cloud security, remember that the customer is responsible for securing the components they configure. This shared responsibility applies particularly to IaaS and PaaS elements, while the cloud provider secures the underlying cloud infrastructure.

## Supply Chain Dependencies

Many organizations depend on external suppliers, vendors, and business partners to support manufacturing and distribution processes. These relationships often require external entities to have connectivity to your systems, expanding your security perimeter.

![The image illustrates cloud security vulnerabilities related to the supply chain, highlighting suppliers, vendors, and business partners.](https://kodekloud.com/kk-media/image/upload/v1752872530/notes-assets/images/CompTIA-Security-Certification-Cloud-and-Supply-Chain-Vulnerabilities/cloud-security-supply-chain-vulnerabilities.jpg)

Even if your internal systems are secure, threat actors might target a less-secure external partner to gain indirect access to your primary infrastructure. In cloud environments, reliance on third-party providers further underscores the significance of maintaining robust security practices across all connections.

> [!important]
> **Warning**
>
> In a SaaS model, your security is tied to the provider’s practices. If they fail to adhere to the Confidentiality, Integrity, and Availability (CIA) principles or employ weak security measures, both your organization and the provider may be at increased risk.

![The image illustrates cloud security vulnerabilities in the SaaS model, highlighting the reliance on the SaaS provider to implement security measures between the client and provider.](https://kodekloud.com/kk-media/image/upload/v1752872533/notes-assets/images/CompTIA-Security-Certification-Cloud-and-Supply-Chain-Vulnerabilities/cloud-security-vulnerabilities-saas.jpg)

## Conclusion

Understanding both the cloud service models and the dependencies in your supply chain is essential for identifying and mitigating vulnerabilities. Securing your organization requires diligent internal configuration and ensuring that external partners adhere to strong security practices. For more information on cloud security best practices, consider exploring additional [cloud security documentation](https://www.cloudflare.com/learning/security/what-is-cloud-security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/7783b68c-e8f2-4386-89c6-7ac6b288465b)**
>
> Watch video content
