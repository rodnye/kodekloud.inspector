# Intro to Auth Methods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Intro-to-Auth-Methods)

---

## Table of Contents

- Intro to Auth Methods
  - How Vault Handles Authentication
  - Vault Tokens: The Core of Authentication
  - Missing a Token Means Access Denied
  - Auth Method Workflow
  - Available Authentication Methods
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Intro to Auth Methods

When you check in at a hotel, you present your ID to the receptionist. Once verified, you receive a key card that grants access to your room and amenities for the duration of your stay. You never need to re-prove your identity at the front desk—you simply use the card to enter areas you’re authorized for.

HashiCorp Vault follows the same principle. You authenticate once by presenting credentials to an Auth Method, and Vault returns a token. This token represents your identity, carries your access policies, and has a configurable time-to-live (TTL). All subsequent requests to Vault use that token until it expires.

## How Vault Handles Authentication

Vault maps external identities (users or machines) into its own identity system via Auth Methods. Each Auth Method validates credentials against an external provider and issues a Vault token upon success.

![The image is a slide titled "Auth Methods," describing Vault components for authentication and identity management, including client token issuance and policy association. It features a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878032/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Auth-Methods/auth-methods-vault-authentication-slide.jpg)

> [!important]
> **Note**
>
> Auth Methods enable you to integrate Vault with various identity providers—human (username/password, Okta, GitHub) or machine-to-machine (AWS, Kubernetes). Regardless of the method, the goal is to obtain a Vault token.

## Vault Tokens: The Core of Authentication

Regardless of whether you sign in via LDAP, OIDC, AWS IAM, or another provider, Vault’s built-in token mechanism is always the final step. Tokens encapsulate:

- Your authenticated identity
- Attached policies defining your permissions
- A configurable TTL

![The image is a slide titled "Auth Methods," explaining the role of tokens in authentication within Vault, highlighting that tokens are essential, cannot be disabled, and are involved in external identity authentication. It features a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878033/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Auth-Methods/auth-methods-tokens-vault-slide.jpg)

## Missing a Token Means Access Denied

Every non-authentication request to Vault—whether reading secrets, writing data, listing keys, or enabling engines—requires a valid token. If you omit the token or provide an invalid one, Vault immediately returns a `403 Forbidden` error.

> [!important]
> **Warning**
>
> Always include `X-Vault-Token` in your HTTP headers or use the `VAULT_TOKEN` environment variable. Otherwise, Vault will not prompt for credentials and will deny access.

![The image is a slide titled "Auth Methods" explaining that without a token for non-authentication requests, a 403 Access Denied error will occur. It has a purple background with a pixelated design and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878034/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Auth-Methods/auth-methods-403-error-slide.jpg)

## Auth Method Workflow

The typical authentication flow in Vault looks like this:

1.  The Vault client (user or application) submits credentials to an Auth Method.
2.  Vault validates those credentials against the configured identity provider (LDAP, AWS IAM, OIDC, etc.).
3.  Upon successful validation, Vault generates a token, attaches the appropriate policies, and sets a TTL.
4.  Vault returns the token to the client.
5.  The client uses that token for all subsequent operations until it expires or is revoked.

![The image illustrates an authentication workflow, showing the process of authenticating with credentials, validating against a provider, and generating a vault token with policy and TTL. It includes icons representing an end user, application, server, vault policy, and vault token.](https://kodekloud.com/kk-media/image/upload/v1752878035/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Auth-Methods/authentication-workflow-credentials-token.jpg)

## Available Authentication Methods

Vault supports a broad range of Auth Methods for both humans and machines. Below is a summary of common types:

| Auth Method | Use Case                         | Enable Command                 |
| ----------- | -------------------------------- | ------------------------------ |
| Token       | Built-in Vault token auth        | `vault auth enable token`      |
| LDAP        | Corporate directory for users    | `vault auth enable ldap`       |
| AWS IAM     | EC2 and IAM-based machine auth   | `vault auth enable aws`        |
| Kubernetes  | In-cluster pod authentication    | `vault auth enable kubernetes` |
| OIDC        | Single sign-on (SSO) integration | `vault auth enable oidc`       |
| GitHub      | GitHub organization users        | `vault auth enable github`     |

![The image displays various authentication methods and logos of related technologies and services, such as AWS, GitHub, Kubernetes, and Okta, on a dark background.](https://kodekloud.com/kk-media/image/upload/v1752878036/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Auth-Methods/authentication-methods-logos-technologies.jpg)

Choose the methods that align with your organizational requirements for user and workload authentication. You can enable multiple methods simultaneously and assign different policies per method.

## Links and References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault Tokens](https://www.vaultproject.io/docs/concepts/tokens)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/897f50da-757a-4f35-9760-b8384827d3c8)**
>
> Watch video content
