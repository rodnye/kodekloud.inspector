# Define defense in depth - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Perimeter-Security/Define-defense-in-depth)

---

## Table of Contents

- Define defense in depth
  - Physical Security
  - Identity and Access Management
  - Perimeter Security
  - Network Security
  - Compute Security
  - Application Security
  - Data Security
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Perimeter Security

# Define defense in depth

As we explore the Azure security model, we focus on the layered approach known as defense in depth. This strategy enhances security by implementing multiple layers of protection between potential threats and your Azure resources. Below is an in-depth explanation of each layer, starting from physical security and working inward toward data protection.

> [!important]
> **Key Insight**
>
> Implementing multiple security layers ensures that even if one layer is breached, the remaining layers continue to protect your environment.

## Physical Security

The physical security layer is the foundation of the Azure security model. It involves safeguarding data centers against physical threats. Microsoft data centers employ a comprehensive suite of measures—including biometric scanners, security personnel, and surveillance systems—to ensure that physical infrastructure remains secure and unauthorized access is prevented.

## Identity and Access Management

The identity and access layer is critical because it guarantees that only authorized users and services gain access to your resources. Features such as multi-factor authentication, conditional access policies, and role-based access control (RBAC) form the backbone of this security measure. By systematically regulating and verifying identities, this layer significantly strengthens your overall defense in depth strategy.

## Perimeter Security

Perimeter security focuses on protecting the edge of your network. Services like Azure Application Gateway and Azure Firewall play key roles in filtering malicious traffic before it reaches your resources. For instance, deploying Azure DDoS Protection safeguards your environment against distributed denial-of-service attacks that could disrupt service availability.

## Network Security

At the network layer, security is enhanced with measures such as segmentation and robust network policies. Tools like Network Security Groups (NSGs) and Application Security Groups (ASGs) control inbound and outbound traffic, ensuring that only authorized traffic flows between different network segments. These practices help minimize the overall attack surface.

## Compute Security

The compute security layer protects the core processing components of your environment, including virtual machines, containers, and serverless computing services. Using solutions such as Microsoft Defender for Cloud ensures that your virtual machines follow best practices—like timely system updates and effective endpoint protection—to detect and remove malicious software. This layer also covers host security and container security, which are essential for approaches involving Azure Kubernetes Service (AKS) and Azure Container Registry (ACR).

## Application Security

Application security integrates protection into the design, development, and deployment phases. Leveraging tools such as Azure DevOps and Azure App Service, you can implement secure DevOps practices (SecDevOps). This ensures that your continuous integration and deployment pipelines continuously update applications with the latest security measures.

## Data Security

Data security is central to the defense in depth strategy as it focuses on protecting data at rest and in transit. Key protective measures include encryption, auditing, and strict access controls. For example, Azure SQL Database supports Transparent Data Encryption (TDE) to secure data at rest, while Advanced Threat Protection (ATP) alerts you to anomalous activities that may signal attempted breaches. Additionally, Azure Defender for Cloud helps safeguard SQL databases and Azure Storage.

Reviewing the overall strategy reveals that each layer—from identity and access management to network, compute, and application—builds upon one another, forming a comprehensive defense in depth strategy with data security at its core.

> [!important]
> **Additional Measures**
>
> Later in the discussion, we will expand on this layered model by addressing additional aspects such as virtual network security, host security, container security, and further protective measures that enhance both the perimeter and data layers.

The subsequent sections will cover virtual network security, which forms the outer perimeter of your infrastructure, ensuring that every point of access to your environment is safeguarded.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/cb10a3ae-53f4-4588-ad61-042af34f31ab/lesson/31b5f406-17a8-4f6e-901b-923e00bb1bd3)**
>
> Watch video content
