# How Vault Works - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Introduction-to-Vault/How-Vault-Works)

---

## Table of Contents

- How Vault Works
  - Vault Interfaces: API, UI, and CLI
  - Authentication and Token Issuance
  - Retrieving Secrets with a Token
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Introduction to Vault

# How Vault Works

In this guide, we’ll explore how HashiCorp Vault operates by comparing it to a hotel. This analogy comes from the first chapter of the [Running HashiCorp Vault in Production book](https://www.oreilly.com/library/view/running-hashicorp-vault/9781098106611/). Think of Vault as Hotel Atlantis on Paradise Island, Bahamas, which has multiple entrances:

- **Main guest entrance**
- **Pool or beach access**
- **Employee parking**
- **Conference wing entrance**

Similarly, Vault provides several interfaces to interact with its service.

## Vault Interfaces: API, UI, and CLI

Vault offers three primary access methods—each like a different hotel door:

| Interface | Use Case                        | Hotel Entrance Analogy          |
| --------- | ------------------------------- | ------------------------------- |
| **API**   | Machine-to-machine integrations | Back‐of‐house employee entrance |
| **UI**    | Human interaction via browser   | Hotel lobby                     |
| **CLI**   | Scripts and interactive use     | Side door for staff or guests   |

![The image illustrates how Vault works, showing interfaces like CLI, UI, and API, with arrows indicating their interaction with Vault.](https://kodekloud.com/kk-media/image/upload/v1752878190/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Vault-Works/vault-architecture-cli-ui-api-diagram.jpg)

![The image illustrates how Vault works, showing interfaces like CLI for machines and humans, UI for humans, and API for machines.](https://kodekloud.com/kk-media/image/upload/v1752878191/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Vault-Works/vault-architecture-cli-ui-api.jpg)

## Authentication and Token Issuance

When you arrive at the hotel, you first stop at reception. The receptionist verifies your ID and issues a keycard. In Vault, this keycard is equivalent to a **token**:

- **Identification** → Present an ID at reception
- **Verification** → Receptionist confirms your identity
- **Key Issued** → You receive a card granting access to your room and amenities
- **TTL** → The keycard is valid only for your stay (e.g., three days)

![The image illustrates a hotel reception scene with a receptionist handing a room key to a guest, alongside icons representing hotel amenities like a room, gym, VIP lounge, and spa. It also includes a key card with instructions and a note that it is valid for three days.](https://kodekloud.com/kk-media/image/upload/v1752878192/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Vault-Works/hotel-reception-key-handout-amenities.jpg)

When authenticating with Vault:

| Auth Method           | Description                              |
| --------------------- | ---------------------------------------- |
| Username & Password   | Traditional user login                   |
| AppRole               | Machine login using Role ID + Secret ID  |
| TLS Certificate       | Client certificate-based authentication  |
| Cloud IAM Credentials | IAM-based auth for AWS, GCP, Azure, etc. |

1.  You authenticate via one of the methods above.
2.  Vault validates your credentials.
3.  Vault issues a **token** with a configurable TTL (e.g., 4 hours, 12 hours).
4.  This token grants specific capabilities (read, write, delete, list) on designated Vault paths.

> [!important]
> **Note**
>
> Tokens in Vault can be **renewed** before they expire, extending their TTL without re-authentication.

![The image illustrates a process of token generation in vault interfaces, showing authentication methods and token validity, with a focus on security credentials and access permissions.](https://kodekloud.com/kk-media/image/upload/v1752878194/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Vault-Works/token-generation-vault-authentication-security.jpg)

## Retrieving Secrets with a Token

Once you have a valid token, you can reuse it—just like swiping your hotel keycard at the gym or spa without returning to reception:

1.  An application or user presents the token to Vault.
2.  Vault checks that the token:
    - Is not expired
    - Has permission for the requested path (e.g., `kv-apps-secret`)
3.  If authorized, Vault returns the requested data.

Attempting to access a forbidden area (like swiping a non-VIP card at the VIP lounge) results in a denial.

![The image illustrates the process of using a token to retrieve data from a path in a vault interface, highlighting token validity, expiration, and permission. It includes a diagram with arrows indicating data retrieval and return, and a character icon.](https://kodekloud.com/kk-media/image/upload/v1752878194/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Vault-Works/token-data-retrieval-vault-diagram.jpg)

> [!important]
> **Warning**
>
> Always monitor token expiration and rotate or revoke tokens promptly to maintain strong security posture.

This “authenticate once → receive a token → reuse the token” pattern applies to all Vault operations—whether you’re retrieving static secrets, generating dynamic credentials, or using any secrets engine.

---

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Running HashiCorp Vault in Production (O’Reilly)](https://www.oreilly.com/library/view/running-hashicorp-vault/9781098106611/)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Tokens](https://www.vaultproject.io/docs/concepts/tokens)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/b8d194ad-b4a2-463b-826a-5ad71a059e36/lesson/c22e1c89-cf9a-425a-b2bc-b7d505fdf662)**
>
> Watch video content
