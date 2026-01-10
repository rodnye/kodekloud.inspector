# Microsoft Entra Domain Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Identity-Access-and-Security/Microsoft-Entra-Domain-Services)

---

## Table of Contents

- Microsoft Entra Domain Services
  - Key Features
  - Benefits of Microsoft Entra Domain Services
  - Use Cases
  - Next Steps: Authentication and Authorization
  - Watch Video
    - Domain Join
    - Group Policy
    - LDAP and Kerberos/NTLM Authentication
    - Integrated Management
    - Simplified Administration
    - Reliability and Scalability
    - Security and Compliance

---

## Content

AZ900: Microsoft Azure Fundamentals

Identity Access and Security

# Microsoft Entra Domain Services

Microsoft Entra Domain Services provides a managed directory service that operates similarly to a phone book for your computer network. Just as a phone book lists names alongside phone numbers, this directory service maintains detailed records of computers, users, and network resources. It plays a crucial role in identity management and access control within your network.

Traditional directory services—such as Windows Active Directory (also known as Active Directory Domain Services)—have long been the backbone for joining PCs, storing user information, and managing network resources. Microsoft Entra Domain Services modernizes this approach by offering a cloud-based, managed solution. With this service, you no longer need to worry about underlying infrastructure management; Microsoft takes care of it all. Deploy the service, and benefit from scalability, high availability, and seamless compatibility with legacy Windows Server technologies.

## Key Features

### Domain Join

One of the standout features of Microsoft Entra Domain Services is the ability to join Windows servers and computers to a secure domain without requiring a traditional domain controller. Typically, devices need to be part of a domain managed by a dedicated controller. By offering domain join as a managed service, Microsoft Entra Domain Services eliminates the need for manually maintaining Windows servers, streamlining the process and reducing administrative overhead.

### Group Policy

Group Policy enables centralized management of security settings and configurations across all corporate devices. With Microsoft Entra Domain Services, you can uniformly enforce organizational policies, ensuring that every device complies with your security requirements and operational standards.

### LDAP and Kerberos/NTLM Authentication

![The image lists key features of Microsoft Entra Domain Services: Domain Join, Group Policy, and LDAP and Kerberos/NTLM Authentication.](https://kodekloud.com/kk-media/image/upload/v1752868430/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Microsoft-Entra-Domain-Services/microsoft-entra-domain-services-features.jpg)

The service supports both legacy authentication protocols such as LDAP and Kerberos/NTLM. While modern applications usually leverage protocols like OpenID, OAuth, and SAML through Microsoft Entra ID, many legacy applications rely on LDAP and Kerberos for authentication. This dual compatibility ensures that your older applications remain secure and fully integrated with your directory services.

### Integrated Management

Integrated management seamlessly coordinates Microsoft Entra Domain Services with existing Azure services. This unified approach simplifies overall management and operations, allowing IT teams to focus on strategic initiatives rather than day-to-day infrastructure maintenance.

## Benefits of Microsoft Entra Domain Services

### Simplified Administration

By transferring the management responsibilities of domain controllers and underlying infrastructure to Microsoft, administration becomes significantly more straightforward. Configure your domain services while Microsoft handles the heavy lifting, freeing up resources for other critical tasks.

### Reliability and Scalability

Microsoft Entra Domain Services is designed with growth in mind. It scales alongside your organization to accommodate increasing demands without sacrificing performance or availability. This ensures that your network operations remain consistent and reliable even as your business evolves.

### Security and Compliance

Security and regulatory compliance are at the core of Microsoft Entra Domain Services. The service adheres to industry compliance standards and implements robust security measures, allowing you to focus on leveraging the service without worrying about meeting complex regulatory requirements.

![The image outlines the benefits of Microsoft Entra Domain Services, highlighting simplified administration, scalability and reliability, and security and compliance.](https://kodekloud.com/kk-media/image/upload/v1752868431/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Microsoft-Entra-Domain-Services/microsoft-entra-domain-services-benefits.jpg)

## Use Cases

Microsoft Entra Domain Services is an ideal solution for organizations aiming to migrate on-premises Active Directory roles to the cloud. This migration enables businesses to retain essential features—like group policy management and legacy authentication—without the need to overhaul existing systems.

![The image shows three use cases for Microsoft Entra Domain Services: active directory migration, maintaining group policy, and authentication for legacy apps.](https://kodekloud.com/kk-media/image/upload/v1752868432/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Microsoft-Entra-Domain-Services/microsoft-entra-domain-services-use-cases.jpg)

## Next Steps: Authentication and Authorization

The upcoming section delves into authentication and authorization, exploring how Microsoft Entra Domain Services supports secure access and comprehensive control over your network resources.

> [!important]
> **Next Steps**
>
> Learn more about how authentication and authorization work together to protect your infrastructure in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/89fa8b43-65f9-450e-9f65-ebd0bcd5ca8b/lesson/37a49738-ed3b-4be0-b6b5-e9fee765f402)**
>
> Watch video content
