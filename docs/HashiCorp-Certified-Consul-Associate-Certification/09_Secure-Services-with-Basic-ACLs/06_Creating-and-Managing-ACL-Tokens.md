# Creating and Managing ACL Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Creating-and-Managing-ACL-Tokens)

---

## Table of Contents

- Creating and Managing ACL Tokens
  - Token Fundamentals
  - Default Tokens
  - Additional Token Attributes
  - Tokens Needed for Production
  - Creating Tokens with the CLI
  - Creating Tokens via the HTTP API
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Creating and Managing ACL Tokens

Consul ACL tokens are bearer credentials that enforce access control when the default policy is set to `deny`. Whether you’re using the UI, CLI, or HTTP API, tokens authenticate requests and authorize actions based on attached policies.

![The image is an informational slide about the core components of Consul ACLs, focusing on tokens and their basic components. It includes details on bearer tokens, their creation, and components like Accessor, Secret ID, Policy Set, and Description.](https://kodekloud.com/kk-media/image/upload/v1752877949/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-and-Managing-ACL-Tokens/consul-acls-tokens-components-slide.jpg)

## Token Fundamentals

- **Bearer Token**  
  Presented by a client on each request for authentication.
- **Accessor ID**  
  Lookup identifier used to manage the token.
- **Secret ID**  
  The actual credential you include in requests.
- **Policies**  
  One or more named policies that define permitted actions.
- **Description**  
  A human-readable note explaining the token’s purpose.

Once a token is presented, Consul evaluates its policies to determine if the requested operation is allowed. If your Consul ACL default policy is `allow`, tokens aren’t required. When set to `deny`, every request must include a valid Secret ID.

## Default Tokens

Consul ships with two built-in tokens:

| Token Name    | ID Type   | Scope                       | Notes                                                            |
| ------------- | --------- | --------------------------- | ---------------------------------------------------------------- |
| **Bootstrap** | Secret ID | Global management           | Full privileges for initial setup. Store securely (e.g., Vault). |
| **Anonymous** | Secret ID | Read-only service discovery | Used when no token is presented; permissions editable.           |

> [!important]
> **Warning**
>
> Keep the bootstrap token offline or in a secure vault. It has unrestricted `global-management` rights and should only be used to create scoped tokens.

![The image explains default ACL tokens, detailing the Bootstrap/Master Token and Anonymous Token, including their privileges and usage guidelines.](https://kodekloud.com/kk-media/image/upload/v1752877951/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-and-Managing-ACL-Tokens/default-acl-tokens-bootstrap-anonymous.jpg)

If you lose the bootstrap Secret ID, disable and re-enable ACLs (for example, via `consul acl bootstrap`) to generate a new token. Each invocation produces a unique Secret ID.

## Additional Token Attributes

Tokens can carry extra metadata to fit advanced use cases:

| Attribute          | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| Expiration Time    | Optional TTL after which the token is automatically revoked.     |
| Roles              | Groups of policies and service identities for easier management. |
| Service Identities | Direct binding of tokens to specific Consul service names.       |

![The image describes additional token attributes, including expiration time, roles, and service identities, with a decorative pixelated design on the right.](https://kodekloud.com/kk-media/image/upload/v1752877952/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-and-Managing-ACL-Tokens/token-attributes-expiration-roles-design.jpg)

## Tokens Needed for Production

In a hardened, production-grade environment, you’ll typically create tokens for:

- **Consul Server Nodes**  
  Authorize inter-node consensus operations.
- **Consul Clients**  
  Register and discover services or access the KV store.
- **Snapshot Agents**  
  Read cluster state and create backups.
- **Operators & Administrators**  
  Perform management tasks via CLI/API.
- **Anonymous Access**  
  Fine-tune for read-only service discovery (DNS/API).

![The image is a slide titled "Tokens Needed for Production," listing examples of required tokens for Consul components like server nodes, clients, snapshot agents, and administrative tasks. It also mentions that an anonymous token can be configured for certain actions.](https://kodekloud.com/kk-media/image/upload/v1752877953/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-and-Managing-ACL-Tokens/tokens-needed-for-production-consul.jpg)

## Creating Tokens with the CLI

Use the `consul acl token create` command to generate a new token. You must specify at least one policy by its name or ID, and it’s best practice to include a description.

```
consul acl token create \
  --description "Token for eCommerce web" \
  --policy-id 06acc965-df4b-5a99-58cb-3250930c6324
```

Example response:

```
AccessorID: 986193b5-e2b5-eb26-6264-b524ea60cc6d
SecretID:   ec156765e-2999-d789-832e-8c4794daa8d7
Description: Token for eCommerce web
Local:       false
Create Time: 2021-02-14 02:14:31.421421 -0400 EDT
Policies:
  06acc965-df4b-5a99-58cb-3250930c6324 - eCommerce
```

> [!important]
> **Note**
>
> Clients must use the **SecretID** when making API calls. Supplying the AccessorID instead will result in a “permission denied” error.

## Creating Tokens via the HTTP API

You can also manage tokens programmatically by sending HTTP requests to the `/v1/acl/token` endpoint. Ensure you include an existing management token in the `X-Consul-Token` header if ACLs default to `deny`.

1.  Create a `payload.json` file:

    ```
    {
      "Description": "Token for eCommerce Web Servers",
      "Policies": [
        { "ID": "06acc965-df4b-5a99-58cb-3250930c6324" }
      ]
    }
    ```

2.  Issue the PUT request:

    ```
    curl -X PUT \
      --header "X-Consul-Token: 45a3bd52-07c7-47a4-52fd-0745e0cfe967" \
      --data @payload.json \
      https://consul.example.com:8500/v1/acl/token
    ```

The API response returns the new token’s AccessorID, SecretID, description, policies, and timestamps—mirroring the CLI output.

---

With these fundamentals and creation methods, you’re ready to jump into the hands-on lab and generate ACL tokens using your predefined policies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/2d3ca5b5-d924-4489-ad08-414ee6a9e95f)**
>
> Watch video content
