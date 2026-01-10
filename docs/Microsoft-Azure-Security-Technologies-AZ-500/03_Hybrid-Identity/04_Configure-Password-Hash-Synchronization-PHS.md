# Configure Password Hash Synchronization PHS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Configure-Password-Hash-Synchronization-PHS)

---

## Table of Contents

- Configure Password Hash Synchronization PHS
  - Overview of the PHS Workflow
  - Authentication Flow Using PHS
  - Advantages of Password Hash Synchronization
  - Next Steps: Exploring Pass-Through Authentication (PTA)
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Configure Password Hash Synchronization PHS

Password Hash Synchronization (PHS) is a core method for synchronizing user credentials between on-premises Active Directory and Azure Active Directory (Azure AD). With PHS, users can seamlessly sign in to both on-premises and cloud-based applications using the same password, ensuring a secure and consistent authentication process.

## Overview of the PHS Workflow

PHS works by synchronizing user password hashes from your on-premises Active Directory to Azure AD. This synchronization process allows Azure AD to validate user credentials entirely in the cloud, as it holds the necessary password hash values. Below is an outline of the PHS workflow:

1.  **Azure AD Connect Server Integration**
    - An Azure AD Connect server, which is domain-joined, works in conjunction with your on-premises Active Directory.
    - Active Directory stores user passwords as hash values rather than plaintext.

2.  **Regular Synchronization via MS DRSR Protocol**
    - The Azure AD Connect server queries your domain controller every two minutes using the MS DRSR (Directory Replication Service Remote) protocol to retrieve password hashes.

3.  **Hash Transformation Process**
    - Within Active Directory, user passwords are stored as MD4 hashes.
    - Upon a query, the Domain Controller re-hashes the MD4 value to MD5, adding a salt derived from the RPC session key. This method ensures that the Azure AD Connect server only processes the MD4 hash and never the plaintext password.

4.  **Secure Transmission and Reversion**
    - The MD5 hash is transmitted securely from the Domain Controller to the Azure AD Connect server via RPC.
    - The server then converts the MD5 hash back into the original MD4 format.

5.  **Final Hash Generation with Enhanced Security**
    - The MD4 hash is expanded to 64 bytes and mixed with a per-user salt, followed by the addition of a 10-byte salt.
    - The combined value is processed using a PBKDF2 function with 1,000 iterations of HMAC SHA-256, resulting in a final SHA-256 hash.
    - This SHA-256 hash is then securely transmitted to Azure AD over TLS.

> [!important]
> **Key Security Highlights**
>
> - The MD4 hash from on-premises Active Directory is transformed into a SHA-256 hash stored in Azure AD.
> - The distinct transformation means a pass-the-hash attack cannot leverage the Azure AD hash back on-premises.
> - Azure AD Connect never accesses the plaintext password.
> - The process incorporates 1,000 iterations of HMAC SHA-256 along with mechanisms like smart lockout and IP lockout for enhanced security.
> - Azure AD Identity Protection monitors credentials for exposure on malicious websites or the dark web.

## Authentication Flow Using PHS

When a user sends an authentication request (for example, to access SharePoint Online, which uses Azure AD as its identity provider), the process unfolds as follows:

- The authentication request is redirected to Azure AD.
- The user is prompted to enter their username and password.
- The password entered is validated against the SHA-256 hash that was synchronized from the on-premises Active Directory.
- If the hashed values match, the user gains access; otherwise, the sign-in attempt is denied.

![The image illustrates the process of configuring Password Hash Synchronization (PHS) between on-premises Active Directory and Azure Active Directory, detailing the steps and encryption methods involved. It shows the flow from Active Directory through Azure AD Connect to Azure AD, using MD4, MD5, SHA256, and RSA2048 encryption.](https://kodekloud.com/kk-media/image/upload/v1752881917/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Password-Hash-Synchronization-PHS/password-hash-synchronization-configuration.jpg)

## Advantages of Password Hash Synchronization

By handling the entire authentication process in the cloud, PHS simplifies the login experience while maintaining robust security measures. Its ease of implementation makes PHS an attractive option for organizations looking to secure their authentication infrastructure.

## Next Steps: Exploring Pass-Through Authentication (PTA)

For a deeper understanding, our next section will delve into Pass-Through Authentication (PTA), which employs a more complex process than PHS. Stay tuned to learn how PTA compares with Password Hash Synchronization and when it might be the appropriate choice for your environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/bad76575-1b6d-494a-b334-cb7309e31f24)**
>
> Watch video content
