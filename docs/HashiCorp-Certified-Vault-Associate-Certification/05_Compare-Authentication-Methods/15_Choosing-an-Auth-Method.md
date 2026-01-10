# Choosing an Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Choosing-an-Auth-Method)

---

## Table of Contents

- Choosing an Auth Method
  - Platform Versus Flexibility
  - Narrowing Down by Integration Characteristics
  - Summary Table
  - Links and References
  - Watch Video
    - 1. Frequently Rotated
    - 2. Removing Secrets from a Process or Pipeline
    - 3. Using Existing User Credentials

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Choosing an Auth Method

In this lesson, we’ll walk through how to select the optimal Vault authentication method for your environment. Vault supports various Auth Methods—each with unique benefits. By aligning your security requirements with Vault’s capabilities, you can ensure seamless, secure access.

## Platform Versus Flexibility

You don’t have to be locked into your hosting platform’s native Auth Method. Whether you’re on Azure, AWS, or Kubernetes, you can choose any Vault Auth Method that meets your needs.

- **Azure VMs** can use the Azure auth method—or AppRole, Userpass, TLS, or OIDC.
- **AWS workloads** can authenticate via AWS—yet AppRole or Kubernetes Auth also work.
- **Kubernetes pods** often use Kubernetes Auth but are free to switch if integration or policy demands differ.

> [!important]
> **Note**
>
> Platform-native methods simplify integration and audit trails, but you can mix and match methods to satisfy complex requirements.

## Narrowing Down by Integration Characteristics

Identify keywords in your use case—such as “frequently rotated” or “existing user credentials”—to eliminate unsuitable Auth Methods quickly.

![The image is a slide titled "Choosing an Auth Method," discussing key considerations for authentication methods, including frequent rotation and removing secrets from processes, with examples of what meets or does not meet the requirements.](https://kodekloud.com/kk-media/image/upload/v1752878010/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Choosing-an-Auth-Method/choosing-auth-methods-considerations-slide.jpg)

### 1\. Frequently Rotated

Dynamic credentials are essential when secrets must rotate often. Avoid baking static tokens into your images or CI/CD pipelines.

- Meets requirement (dynamic):  
  • AWS, Azure, GCP, Kubernetes Auth Methods  
  • LDAP (with regular rotation)
- Does **not** meet requirement (static):  
  • Userpass  
  • TLS Certificates  
  • AppRole

> [!important]
> **Warning**
>
> Avoid embedding Userpass, TLS certificates, or AppRole secrets directly in images or pipelines—they are static and not automatically rotated.

### 2\. Removing Secrets from a Process or Pipeline

When build or deployment workflows must avoid hardcoded secrets, choose platform-integrated or auto-generated methods.

- Best choices: AWS, Azure, GCP, Kubernetes Auth Methods
- To avoid: Userpass, TLS, AppRole

### 3\. Using Existing User Credentials

Leverage your identity provider if you prefer human-centric logins without managing extra secrets.

- Meets requirement (human-centric):  
  • OIDC  
  • LDAP  
  • Okta  
  • GitHub
- Does **not** meet requirement (requires separate credentials):  
  • Userpass  
  • AWS, Azure, GCP Auth Methods

![The image is a slide titled "Choosing an Auth Method," discussing the use of existing user credentials for authentication. It lists methods that meet requirements (OIDC, LDAP, Okta, GitHub) and those that do not (Userpass, AWS, Azure, GCP).](https://kodekloud.com/kk-media/image/upload/v1752878011/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Choosing-an-Auth-Method/choosing-auth-method-user-credentials.jpg)

---

## Summary Table

| Scenario                          | Recommended Auth Methods                    | To Avoid                  |
| --------------------------------- | ------------------------------------------- | ------------------------- |
| Frequently rotated                | AWS, Azure, GCP, Kubernetes, LDAP (rotated) | Userpass, TLS, AppRole    |
| Removing secrets from pipelines   | AWS, Azure, GCP, Kubernetes                 | Userpass, TLS, AppRole    |
| Existing user credentials (human) | OIDC, LDAP, Okta, GitHub                    | Userpass, AWS, Azure, GCP |

By matching keywords—dynamic vs. static, integrated vs. standalone, identity provider vs. new credentials—you’ll converge on the Vault Auth Method that best fits your use case.

## Links and References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [OIDC Auth Method](https://www.vaultproject.io/docs/auth/jwt)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/c71da459-b644-4f7a-acf2-891d1cf670a0)**
>
> Watch video content
