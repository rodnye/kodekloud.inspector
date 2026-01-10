# Azure AD DS and Self Managed AD DS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Secure-Azure-solution-with-Azure-Active-Directory/Azure-AD-DS-and-Self-Managed-AD-DS)

---

## Table of Contents

- Azure AD DS and Self Managed AD DS
  - Azure AD Domain Services
  - Self-Managed Active Directory Domain Services
  - Summary and Next Steps
  - Watch Video
    - 1. Standalone Cloud-Only AD DS
    - 2. Hybrid Deployment

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Secure Azure solution with Azure Active Directory

# Azure AD DS and Self Managed AD DS

In this guide, we explore two approaches to deploying Active Directory Domain Services in the cloud: Azure AD Domain Services (a fully managed service) and Self-Managed Active Directory Domain Services. We'll first review the advantages of Azure AD Domain Services, then dive into the key features and deployment options for Self-Managed AD DS.

---

## Azure AD Domain Services

Azure AD Domain Services provides a managed domain experience where Microsoft handles all backend operations. This service offers significant benefits:

- **Managed Infrastructure:**  
  Microsoft provisions, maintains, and scales the necessary infrastructure, allowing your team to focus on core business goals rather than resource management.
- **Continuous Service Updates:**  
  Key directory service components are constantly deployed and maintained, ensuring a reliable and up-to-date environment without manual intervention.
- **Simplified Operations:**  
  With no need to deploy, patch, or secure the infrastructure yourself, you receive a streamlined domain experience that cuts down on typical operational complexity.
- **Enhanced Cloud Application Support:**  
  Azure AD Domain Services bridges the gap between legacy authentication protocols and modern cloud environments, making it easier to support cloud-based applications that rely on traditional authentication mechanisms.

> [!important]
> **Note**
>
> If the managed service limitations do not meet your business requirements, consider implementing a Self-Managed Active Directory Domain Services deployment.

---

## Self-Managed Active Directory Domain Services

When you deploy Self-Managed AD DS, your team takes full responsibility for deploying and managing domain controllers. There are two primary deployment models:

### 1\. Standalone Cloud-Only AD DS

In the standalone cloud-only configuration, Azure Virtual Machines are used to host the domain controllers. Key features include:

- **Deployment on Azure VMs:**  
  Utilize Azure VMs to host your domain controllers, benefiting from Azure's scalability and reliability while enjoying full administrative control.
- **Cloud-Only Operation:**  
  This setup operates independently of any on-premises Active Directory environment, ideal for greenfield deployments where no legacy integration is required.
- **Custom Trust Relationships:**  
  Although Azure AD Domain Services does not support domain trust, deploying independent VMs allows you to establish trust relationships among them if necessary. Note that you are responsible for all management tasks—patching, administration, and upgrades.
- **Enhanced Security with Separate Credentials:**  
  Separate and distinct credentials for VM sign-in and domain administration improve overall security and help delineate operational roles.

### 2\. Hybrid Deployment

The hybrid model also leverages Azure VMs as domain controllers, with integration into an existing on-premises Active Directory forest. This model offers:

- **Seamless Integration:**  
  Extend your on-premises directory into Azure without creating a separate forest, ensuring continued adherence to existing policies and security settings.
- **Established Trust Relationships:**  
  Trust is configured between on-premises and Azure-hosted domain controllers to enable seamless user authentication across environments.
- **Unified Group Policy Management:**  
  Azure VMs join the existing domain and enforce consistent group policies and security configurations across all machines, whether on-premises or in the cloud.
- **Secure User Authentication:**  
  Users authenticate over secure channels such as Azure VPN or ExpressRoute, providing a secure and seamless experience across both environments.

The following diagram outlines the key differences between the Standalone Cloud-Only AD DS and Hybrid Deployment models:

![The image is a diagram comparing "Standalone Cloud-Only AD DS" and "Hybrid Deployments" for Azure AD DS and Self-Managed AD DS, highlighting their configurations and features.](https://kodekloud.com/kk-media/image/upload/v1752882190/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-DS-and-Self-Managed-AD-DS/cloud-only-vs-hybrid-ad-ds-diagram.jpg)

---

## Summary and Next Steps

In summary, your choice between Azure AD Domain Services and Self-Managed AD DS depends on your specific deployment needs:

- **Azure AD Domain Services:**  
  A fully managed domain experience with minimal operational overhead.
- **Self-Managed AD DS (Standalone Cloud-Only):**  
  Ideal for greenfield deployments requiring independent cloud-based domain controllers.
- **Self-Managed AD DS (Hybrid Deployment):**  
  Perfect for extending your existing on-premises Active Directory into the cloud while maintaining seamless integration and unified security policies.

> [!important]
> **Next Steps**
>
> Proceed to the Azure portal to create your Azure AD Domain Services instance and learn how to join a virtual machine to the domain.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c0f70ae1-790f-4a5d-8e09-29450b5ee610/lesson/de462daa-f564-49bc-b1fb-65fb9cc0e298)**
>
> Watch video content
