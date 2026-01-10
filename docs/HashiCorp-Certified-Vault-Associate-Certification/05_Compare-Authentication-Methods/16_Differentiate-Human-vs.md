# Differentiate Human vs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Differentiate-Human-vs)

---

## Table of Contents

- Differentiate Human vs
  - Human-Based Authentication Methods
  - System-Based Authentication Methods
  - Summary Table
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Differentiate Human vs

Understanding the distinction between human-based and system-based authentication methods in Vault helps you choose the right approach for users, administrators, and applications. Vault supports a wide range of auth methods—some designed for interactive logins, others optimized for machine-to-machine workflows.

## Human-Based Authentication Methods

Human-based methods rely on interactive flows and integrate with identity providers (IdPs) for seamless user login. These are ideal for administrators, operators, and any scenario where a person needs to initiate and control the session.

![The image is a presentation slide about human-based authentication methods, featuring icons and text for Userpass, RADIUS, GitHub, JWT/OIDC, and Okta, along with a list of related features.](https://kodekloud.com/kk-media/image/upload/v1752878026/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Differentiate-Human-vs/human-authentication-methods-presentation-slide.jpg)

- Login via browser or CLI:

  ```
  vault login -method=userpass username=alice
  ```

- Supported methods:
  - Userpass
  - RADIUS
  - GitHub
  - JWT/OIDC
  - Okta
- Features:
  - Multi-factor authentication (MFA)
  - Custom policies per user or group
  - Session tokens scoped to user identity

> [!important]
> **Note**
>
> OIDC flows typically redirect you to your IdP (e.g., Azure AD, PingFederate) to authenticate and then return a JWT to Vault.

## System-Based Authentication Methods

System-based methods are non-interactive and tailored for workloads needing to authenticate without human intervention. These methods verify platform-specific metadata or credentials and issue tokens for applications and services.

![The image is a presentation slide about system-based authentication methods, featuring logos of various platforms like AWS, Microsoft Azure, Oracle Cloud, and Kubernetes, along with terms like tokens, TLS certificates, and Kerberos.](https://kodekloud.com/kk-media/image/upload/v1752878027/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Differentiate-Human-vs/system-authentication-methods-logos-slide.jpg)

- Typical credentials:
  - TLS certificates
  - Cloud platform metadata
  - Service account tokens
- Common integrations:
  - AWS IAM (`vault login -method=aws`)
  - Azure Managed Identity
  - GCP Service Account
  - Kubernetes ServiceAccount
  - Kerberos, Cloud Foundry, Oracle Cloud, Alibaba Cloud

```
vault login -method=aws role=my-role \
  header_value=$(curl http://169.254.169.254/latest/meta-data/instance-id)
```

> [!important]
> **Warning**
>
> Ensure your IAM roles, service accounts, and instance profiles have least-privilege policies. Overly broad permissions increase security risks.

## Summary Table

| Authentication Type | Intended For                             | Examples                    |
| ------------------- | ---------------------------------------- | --------------------------- |
| Human-Based         | Admins, Operators (interactive)          | userpass, GitHub, Okta      |
| System-Based        | Applications, Services (non-interactive) | AWS, Azure, GCP, Kubernetes |

## Best Practices

- Use human-based methods for personnel who need direct control and MFA.
- Use system-based methods for services, CI/CD pipelines, and microservices.
- Regularly rotate credentials and review policies to maintain least privilege.

## Links and References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [HashiCorp Vault Best Practices](https://learn.hashicorp.com/collections/vault/best-practices)
- [Kubernetes ServiceAccount Authentication](https://www.vaultproject.io/docs/auth/kubernetes)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/9d918806-2406-473a-aaab-f8cc950ae812)**
>
> Watch video content
