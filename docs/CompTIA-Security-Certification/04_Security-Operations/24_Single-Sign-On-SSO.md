# Single Sign On SSO - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Operations/Single-Sign-On-SSO)

---

## Table of Contents

- Single Sign On SSO
  - Watch Video

---

## Content

CompTIA Security+ Certification

Security Operations

# Single Sign On SSO

Single Sign-On (SSO) is a powerful technology that streamlines authentication and enhances enterprise security by allowing users to access multiple applications with a single set of credentials. Without SSO, enterprise users might face the tedious task of logging into each system separately, which can quickly become cumbersome in large organizations.

![The image illustrates a Single Sign-On (SSO) system where an employee uses one set of credentials to access multiple websites (A, B, C, D).](https://kodekloud.com/kk-media/image/upload/v1752872451/notes-assets/images/CompTIA-Security-Certification-Single-Sign-On-SSO/single-sign-on-sso-credentials.jpg)

SSO simplifies the login process by leveraging a central authentication mechanism—often the company’s directory services. This setup enables users to access various SaaS applications and internal services using their company domain credentials. A key component in many SSO environments is LDAP, a directory service based on X.500 standards, which stores essential information about users, computers, and services.

![The image is a diagram explaining LDAP as part of Single Sign-On (SSO), breaking it down into "Lightweight," "Directory," "Access," and "Protocol," with corresponding icons. It also mentions the X.500 Standard.](https://kodekloud.com/kk-media/image/upload/v1752872452/notes-assets/images/CompTIA-Security-Certification-Single-Sign-On-SSO/ldap-single-sign-on-diagram.jpg)

There are two prominent SSO protocols that organizations frequently implement:

1.  **OAuth (Open Authorization)**  
    OAuth is primarily focused on authorization. It utilizes REST APIs to perform various HTTP requests (GET, PUT, POST, DELETE), ensuring that secure access to data is maintained without revealing user credentials.
2.  **SAML (Security Assertions Markup Language)**  
    SAML, on the other hand, employs SOAP-based protocols along with XML-formatted assertions to manage both authentication and authorization. This protocol provides a comprehensive solution for identity verification and access control in one package.

> [!important]
> **SSO Benefits for SaaS Applications**
>
> Organizations leveraging a wide array of SaaS applications benefit tremendously from SSO. It minimizes repetitive logins, reduces password fatigue, and enhances overall user productivity while maintaining robust security measures.

![The image explains Single Sign-On (SSO) with an icon of a cloud and gears, highlighting its function to streamline access for employees in large companies using multiple SaaS apps by entering credentials once.](https://kodekloud.com/kk-media/image/upload/v1752872454/notes-assets/images/CompTIA-Security-Certification-Single-Sign-On-SSO/single-sign-on-cloud-gears-diagram.jpg)

It is also important to understand the concept of federation. While both SSO and federation allow access to multiple services with a single set of credentials, they differ in their scope. With SSO, the multiple sites or applications typically reside within the same domain. In contrast, federation extends this capability by enabling access across multiple external domains.

![The image illustrates a Single Sign-On (SSO) process where an employee uses a federation system to access multiple domains (A, B, C, D) with a single username and password.](https://kodekloud.com/kk-media/image/upload/v1752872454/notes-assets/images/CompTIA-Security-Certification-Single-Sign-On-SSO/sso-federation-multiple-domains.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/b13ce20f-66c3-4d31-b6df-23192480b4d4/lesson/ccfa47c1-a604-4e14-b33a-8ec8653d3e7a)**
>
> Watch video content
