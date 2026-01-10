# Static vs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Static-vs)

---

## Table of Contents

- Static vs
  - Challenges with Static Secrets
  - Benefits of Dynamic Secrets
  - Dynamic Secrets Use Cases
  - Example: Application Integration with Vault
  - Example: CI/CD Pipeline with Vault
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Static vs

In modern infrastructure, managing credentials securely is critical. Static secrets—credentials created manually and long-lived—pose several risks. Vault’s dynamic secrets provide an automated, secure alternative that minimizes human error and reduces attack surface.

## Challenges with Static Secrets

Static secrets are credentials you create manually (e.g., a “password never expires” service account in Active Directory, an on-prem or RDS database user, or a long-lived vendor API key). While common, they introduce significant security and operational drawbacks:

| Issue              | Impact                                                                              |
| ------------------ | ----------------------------------------------------------------------------------- |
| Expiration         | Often never expire by design, increasing exposure if compromised.                   |
| Secrecy & Sharing  | Replicated across servers or shared among teams—effectively non-secret.             |
| Accountability     | Impossible to audit usage when multiple users share the same credential.            |
| Always Valid       | Valid 24/7, even when not needed—prime target for automated scanners and attackers. |
| Rare Rotation      | Manual and infrequent rotation increases the window of vulnerability.               |
| Long-Lived Secrets | Linger indefinitely and often go unrevoked when staff or applications retire.       |

![The image outlines problems with managing static secrets, including issues with expiration, secrecy, validity, rotation, and longevity, each highlighted with icons and brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752878119/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Static-vs/static-secrets-management-issues-diagram.jpg)

> [!important]
> **Warning**
>
> Using static credentials at scale without strict rotation policies can lead to compliance violations and increased breach risk.

## Benefits of Dynamic Secrets

Dynamic secrets are generated on-demand by Vault and tied to a configurable lease (TTL). They solve the drawbacks of static credentials:

- **On-Demand Generation**  
  Secrets only exist when needed (e.g., a Terraform run requests API keys at execution time).
- **Configurable Leases**  
  Each secret has a TTL. Once expired, Vault revokes the credential at the source (e.g., drops the database user).
- **Defined Validity**  
  Set initial and maximum TTLs to enforce strict lifespan limits.
- **Automatic Revocation**  
  Vault automatically cleans up unused or orphaned credentials, preventing “technical debt.”
- **Fine-Grained Renewal**  
  Control which secrets can be renewed and for how long—supporting both short-lived jobs and long-running services.

![The image is an infographic titled "Why You Should Use Dynamic Secrets," highlighting benefits such as on-demand creation, technical debt resolution, associated leases, renewal, validity period, and revocation. It features a central icon surrounded by these points, with a character illustration in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878120/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Static-vs/dynamic-secrets-infographic-benefits.jpg)

> [!important]
> **Note**
>
> Dynamic secrets enhance security posture by minimizing manual intervention and reducing the lifetime of exposed credentials.

## Dynamic Secrets Use Cases

Vault’s dynamic secrets support a wide range of production workflows:

- **CI/CD Pipelines**  
  Short-lived credentials for provisioning AWS, Azure, GCP, or on-prem resources.
- **Vulnerability Scanning**  
  Temporary elevated accounts for tools like Rapid7 or Nessus, revoked post-scan.
- **Administrative Access**  
  Time-bound privileged accounts for ops teams, auto-rotated and revoked daily.
- **Application Database Access**  
  Apps fetch dynamic DB credentials at startup and release them when done.

![The image is a diagram titled "Why You Should Use Dynamic Secrets," illustrating four use cases: CI/CD pipeline access to public cloud environments, elevated account for vulnerability scanning, privileged access for administrators, and database credentials for applications. It features colorful icons and a character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878121/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Static-vs/dynamic-secrets-use-cases-diagram.jpg)

## Example: Application Integration with Vault

A typical flow for an application retrieving secrets at startup:

1.  Application launches.
2.  It authenticates to Vault (AppRole, Kubernetes, AWS, Azure, or GCP auth methods).
3.  Vault issues a short-lived token.
4.  The app uses the token to read required secrets (static or dynamic).
5.  It connects to the database or service.
6.  Token or lease expires—access is revoked automatically.
7.  Optionally, the application renews the lease or requests a new token.

![The image illustrates a process flow for an application using Vault, detailing steps from application launch to database connectivity removal, including obtaining a token, reading a secret, and accessing data.](https://kodekloud.com/kk-media/image/upload/v1752878122/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Static-vs/vault-application-process-flow-diagram.jpg)

## Example: CI/CD Pipeline with Vault

In a CI/CD workflow, Vault provides secure, temporary credentials for provisioning:

1.  Developer pushes code to the repository.
2.  Automated build and tests run.
3.  Pipeline authenticates to Vault and obtains a dynamic secret.
4.  Terraform (or similar) uses this secret to create infrastructure.
5.  Applications are deployed.
6.  Pipeline revokes the secret at job completion.

![The image illustrates a pipeline using Vault, showing stages from code development to revoking a secret, with icons representing each step.](https://kodekloud.com/kk-media/image/upload/v1752878124/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Static-vs/vault-pipeline-code-development-revoke-secret.jpg)

---

By shifting from static credentials to Vault’s dynamic secrets, you automate secret lifecycle management, tighten access controls, and boost overall security.

## Links and References

- [HashiCorp Vault Overview](https://www.vaultproject.io/docs)
- [Dynamic Secrets Engine Documentation](https://www.vaultproject.io/docs/secrets)
- [Vault AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/6d8cc651-429b-4485-9736-e3ebdcaef956)**
>
> Watch video content
