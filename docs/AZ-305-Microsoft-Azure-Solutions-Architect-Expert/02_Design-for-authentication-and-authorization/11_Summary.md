# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Summary)

---

## Table of Contents

- Summary
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Summary

Below is an overview of various scenarios along with the recommended solutions to enhance identity and access management:

1.  For external collaboration with partners where there is no need for managing separate usernames and passwords, utilize Azure AD B2B.
2.  To enable app users to sign in to the e-commerce website using their Apple, Google, or Microsoft email IDs, implement Azure AD B2C.
3.  To restrict access to corporate applications to the specific network 52.11.11.0/27, configure a Conditional Access policy based on the IP range.
4.  For users attempting to access corporate applications from outside the corporate network, enforce Multi-Factor Authentication (MFA) using an additional Conditional Access policy.
5.  Address issues with leaked passwords and compromised accounts by implementing the Identity Protection User Risk Policy.
6.  Ensure that all administrators receive a weekly report listing their role assignments. Regular review of these access rights helps determine if continued access is justified.
7.  For storing SSL certificates required by several HTTPS applications, the recommended solution is Azure Key Vault.
8.  The SQL application currently uses an encrypted form of credentials stored within the code.  
    ![The image is a scenario description from KodeKloud about Vendetta Corp's requirements for using Azure AD as their identity and access management solution, with specific tasks highlighted in blue boxes.](https://kodekloud.com/kk-media/image/upload/v1752867244/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/vendetta-corp-azure-ad-requirements.jpg)

    Instead of embedding credentials in the code, leverage managed identities to securely access the SQL Database without the need to expose any keys. This approach significantly enhances security by eliminating direct handling of secrets.

> [!important]
> **Next Steps**
>
> This lesson provided a solid foundation on tackling common identity and access management scenarios. Up next, we will delve into designing a comprehensive governance solution.

![The image is a scenario description from KodeKloud about Vendetta Corp's requirements for using Azure AD as their identity and access management solution, with specific tasks highlighted in blue boxes.](https://kodekloud.com/kk-media/image/upload/v1752867246/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/vendetta-corp-azure-ad-requirements-2.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/e14ceae1-bdf4-495c-a700-2b040673268e)**
>
> Watch video content
