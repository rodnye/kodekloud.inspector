# Introduction to the Consul ACL System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Introduction-to-the-Consul-ACL-System)

---

## Table of Contents

- Introduction to the Consul ACL System
  - Core Concepts
  - ACL Setup Workflow
  - Links and References
  - Watch Video
    - Tokens and Policies
    - Service Identities
    - Roles

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Introduction to the Consul ACL System

Consul’s Access Control List (ACL) system is an optional, built-in feature that governs every interaction with Consul—whether through the CLI, HTTP API, or UI. Once ACLs are enabled and configured, all requests must include a valid token. Policies attach to those tokens and define fine-grained permissions such as key/value operations, service registration, and prepared queries.

![The image is an introduction to the Consul ACL System, explaining its purpose and key components, including tokens, policies, roles, and service identities. It highlights the system's role in controlling access to data and the Consul API.](https://kodekloud.com/kk-media/image/upload/v1752877955/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Introduction-to-the-Consul-ACL-System/consul-acl-system-introduction-diagram.jpg)

## Core Concepts

Consul’s ACL system is built around four primary components. Use the table below as a quick reference for each:

| Component        | Description                                                                               | Key Fields                                                       |
| ---------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Token            | Bearer token sent with every API request to authenticate and authorize actions.           | `AccessorID`, `SecretID`, `Policies[]`                           |
| Policy           | Defines allow/deny rules for operations (e.g., read/write K/V, service registration).     | `Name`, `Description`, `Rules`                                   |
| Service Identity | Policy template for Connect-enabled services to automate mTLS and discovery permissions.  | `Service`, `Datacenters` (optional)                              |
| Role             | Groups multiple policies and service identities; simplifies token permissions management. | `ID`, `Name`, `Description`, `Policies[]`, `ServiceIdentities[]` |

### Tokens and Policies

- **Token**  
  A bearer token required on each request. It maps to one or more policies that allow or deny specific operations.
- **Policy**  
  A set of HCL or JSON rules defining what a token can do, such as reading from a specific K/V path or registering a service.
- **Association**  
  The link between tokens and policies determines a token’s effective permissions.

### Service Identities

Service identities accelerate ACL configuration for service-to-service authentication within a Consul Service Mesh (Connect). They provide a reusable policy template so you don’t need to hand-craft rules for each service.

- `service`: The name of your application or sidecar proxy.
- `datacenters` _(optional)_: Limits the policy to specific Consul datacenters.

> [!important]
> **Note**
>
> Service identities automatically grant mTLS and discovery permissions for your Connect services. No additional rules are required.

### Roles

Roles combine policies and service identities into a single entity, making it easier to manage permissions across many tokens.

- **ID**: Auto-generated unique identifier.
- **Name**: Unique within your Consul workspace.
- **Description**: Human-readable summary.
- **Policies**: List of policy IDs.
- **Service Identities**: List of service identity templates.

![The image describes the core components of Consul ACLs, focusing on roles and their elements such as ID, name, description, policy set, and service identities. It features a pixelated design on the right and a cartoon character at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752877956/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Introduction-to-the-Consul-ACL-System/consul-acls-core-components-diagram.jpg)

---

By default, ACL enforcement is turned off. To activate it, update the `acl` stanza in **both** your server and client agent configurations:

```
{
  "acl": {
    "enabled": true,
    "default_policy": "deny",
    "down_policy": "extend-cache",
    "tokens": {
      "agent": "aba7cbe5-879b-999a-07cc-2efd9ac0ffe"
    }
  }
}
```

Field breakdown:

| Field             | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| enabled           | Set to `true` to turn on ACL enforcement.                                                  |
| default\\\_policy | `deny` (production) or `allow` (initial setup).                                            |
| down\\\_policy    | Behavior when the ACL service is unreachable. `extend-cache` preserves cached permissions. |
| tokens.agent      | Agent token used by Consul for internal communication.                                     |

![The image is a slide titled "Set Up and Configure a Basic ACL System," detailing steps for bootstrapping the ACL system, including administrative actions and policy settings.](https://kodekloud.com/kk-media/image/upload/v1752877957/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Introduction-to-the-Consul-ACL-System/set-up-configure-basic-acl-system.jpg)

> [!important]
> **Note**
>
> If you set `default_policy` to `allow` during setup, switch it to `deny` as soon as your policies are in place to avoid accidental exposure.

---

Once ACLs are enabled, the next step is to **bootstrap** to generate your master tokens and global policy:

```
consul acl bootstrap
```

This command yields:

1.  **Bootstrap Token**: Full administrative privileges (store securely!).
2.  **Anonymous Token**: For unauthenticated requests (typically limited to read-only).
3.  **Global Management Policy**: Grants unrestricted access to any token that uses it.

> [!important]
> **Warning**
>
> The bootstrap token is your “root” credential. Treat it like a database superuser password—store it in a secure vault and rotate it if exposed.

![The image is a flowchart illustrating the steps to enable the Consul ACL system, including provisioning the cluster, bootstrapping the system, creating policies and tokens, configuring agents, and updating the default policy.](https://kodekloud.com/kk-media/image/upload/v1752877959/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Introduction-to-the-Consul-ACL-System/consul-acl-system-setup-flowchart.jpg)

---

## ACL Setup Workflow

1.  **Provision** your Consul cluster with ACLs enabled in the agent configurations.
2.  **Bootstrap** the ACL system to obtain the bootstrap and anonymous tokens.
3.  **Create Policies** that reflect your organization’s security requirements.
4.  **Generate Tokens** for servers, clients, and applications—each tied to appropriate policies.
5.  **Configure Agents** and services to use their assigned tokens.
6.  **Enforce** production mode by setting `default_policy` to `deny`.

With this workflow, every request to Consul requires a valid token, ensuring a robust, production-ready security posture.

---

## Links and References

- [Consul ACLs](https://www.consul.io/docs/security/acl)
- [Consul Documentation](https://www.consul.io/docs)
- [HashiCorp Learn: Consul Security](https://learn.hashicorp.com/consul/security)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/f75d230a-0c93-4f74-8f85-f747ced629c7)**
>
> Watch video content
