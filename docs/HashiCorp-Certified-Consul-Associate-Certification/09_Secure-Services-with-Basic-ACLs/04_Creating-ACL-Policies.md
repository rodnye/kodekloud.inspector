# Creating ACL Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Creating-ACL-Policies)

---

## Table of Contents

- Creating ACL Policies
  - What Is a Policy?
  - Default Consul Policies
  - Policy Control Levels
  - ACL Resource Types
  - Exact vs. Prefix Matching
  - Full Policy Example
  - Creating Policies via CLI
  - Creating Policies via API
  - Anonymous Token Policy
  - Node-Specific Policies
  - Links and References
  - Watch Video
    - Exact Match
    - Prefix Match

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Creating ACL Policies

Learn how to define and manage ACL policies in HashiCorp Consul to enforce fine-grained access control and enhance security.

## What Is a Policy?

An ACL policy in Consul is a named collection of rules that govern the permissions of one or more tokens. Policies are:

- **Reusable**: Attach the same policy to multiple tokens.
- **Composable**: A token’s effective permissions are the union of all its policies.
- **Modular**: In production, you might create distinct policies for:
  - Each Consul server node
  - Different client applications
  - The Consul Snapshot Agent (for backups)
  - Any other process interacting with Consul

Each policy includes:

- **ID**: Auto-generated, immutable public identifier
- **Name**: Unique within the Consul cluster
- **Description** (optional): Human-readable notes
- **Rules**: HCL or JSON granting or denying permissions
- **Datacenters** (optional): Scopes where the policy applies
- **Namespace** (Enterprise only): Limits policy to a namespace

## Default Consul Policies

When you bootstrap Consul’s ACL system, two built-in policies are created by default:

![The image is a slide detailing default policies for "Global-Management" and "Namespace-Management (Ent)" in a system, highlighting access permissions and policy management features.](https://kodekloud.com/kk-media/image/upload/v1752877946/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-ACL-Policies/global-management-namespace-management-policies.jpg)

1.  **Global-Management**
    - Policy ID: `00000000-0000-0000-0000-000000000001`
    - Unrestricted access to the entire cluster
    - Cannot be deleted or modified (rename allowed)
    - Auto-assigned to the bootstrap master token

2.  **Namespace-Management** (Enterprise only)
    - Created per namespace
    - Manages policies and tokens within its namespace
    - Behaves like a user-defined policy

## Policy Control Levels

Control levels determine how rules interact with resources. Consul supports four levels:

| Control Level | Description                                      |
| ------------- | ------------------------------------------------ |
| read          | Retrieve resource data                           |
| write         | Modify or create resources and read them         |
| deny          | Block access regardless of other policies        |
| list          | Enumerate keys or resources under a given prefix |

![The image illustrates policy control levels with permissions: READ, WRITE, DENY, and LIST, each with a brief description, alongside a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752877947/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-ACL-Policies/policy-control-levels-permissions-illustration.jpg)

## ACL Resource Types

Consul ACL rules apply to various resource types. Below is a breakdown of **common** and **advanced** resources:

| Resource Type                                    | Description                              | Use Case           |
| ------------------------------------------------ | ---------------------------------------- | ------------------ |
| `key`, `key_prefix`                              | KV store operations                      | Common             |
| `node`, `node_prefix`                            | Node registration and catalog            | Common             |
| `service`, `service_prefix`                      | Service discovery and health checks      | Common             |
| `acl`, `agent`, `event`, `keyring`               | ACL management, agent operations, events | Advanced scenarios |
| `operator`, `query`, `session`, `prepared_query` | Cluster control, queries, and sessions   | Advanced scenarios |

![The image is a colorful chart listing various ACL resources available for rules, such as ACL, AGENT, EVENT, and others, each with a brief description of their operations. Some resources are marked with a yellow star, indicating they are commonly used for basic operations.](https://kodekloud.com/kk-media/image/upload/v1752877948/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-ACL-Policies/acl-resources-chart-basic-operations.jpg)

## Exact vs. Prefix Matching

### Exact Match

Grant permissions on a single, named resource:

```
key "kv/apps/web-app-01" {
  policy = "write"
}


service "customer-db" {
  policy = "read"
}
```

- Only the key at `kv/apps/web-app-01` is writable.
- Only the service `customer-db` is readable.

### Prefix Match

Cover multiple resources under a common prefix:

```
key_prefix "kv/" {
  policy = "read"
}


service_prefix "" {
  policy = "read"
}
```

- Any key under `kv/` is readable.
- All services (empty prefix) are readable.

## Full Policy Example

Below is a complete policy granting specific rights to a web server and application:

```
# Allow only web-server-01 to register itself
node "web-server-01" {
  policy = "write"
}


# Grant write access to the eCommerce KV subtree
key_prefix "kv/apps/eCommerce" {
  policy = "write"
}


# Allow creating any new session
session_prefix "" {
  policy = "write"
}


# Allow managing the eCommerce-Front-End service
service "eCommerce-Front-End" {
  policy = "write"
}
```

## Creating Policies via CLI

Use the `consul acl policy` command to create a policy from your HCL file:

```
$ consul acl policy create \
    --name "ecommerce" \
    --description "eCommerce App" \
    --rules @rules.hcl
ID:          06acc965-df4b-5a99-58cb-3250930c6324
Name:        eCommerce
Description: eCommerce App
Datacenters:
Rules:
  service "eCommerce" {
    policy = "write"
  }
```

> [!important]
> **Note**
>
> You can also supply rules inline using `--rules 'service "eCommerce" { policy = "write" }'` if you prefer not to use a file.

## Creating Policies via API

Send a PUT request to the ACL policy endpoint:

```
$ curl -X PUT \
  --header "X-Consul-Token: 45a3bd52-07c7-47a4-52fd-0745e0cfe967" \
  --data @payload.json \
  https://consul.example.com:8500/v1/acl/policy
```

```
// payload.json
{
  "Name":        "eCommerce",
  "Description": "eCommerce App",
  "Rules":       "service \"eCommerce\" { policy = \"write\" }"
}
```

> [!important]
> **Note**
>
> If your default ACL policy is `allow`, you can omit the `X-Consul-Token` header.

## Anonymous Token Policy

When no token is provided, Consul uses the anonymous token. Typical read-only permissions include:

```
service_prefix "" {
  policy = "read"
}


query_prefix "" {
  policy = "read"
}


node_prefix "" {
  policy = "read"
}
```

> [!important]
> **Warning**
>
> Grant only minimal privileges to the anonymous token to avoid exposing sensitive data.

## Node-Specific Policies

HashiCorp best practice is to create one policy per node to tightly control registration and catalog operations:

```
# Policy for web-server-01
node "web-server-01" {
  policy = "write"
}
service_prefix "" {
  policy = "read"
}


# Policy for web-server-02
node "web-server-02" {
  policy = "write"
}
service_prefix "" {
  policy = "read"
}
```

Assign each policy to its node’s token so only that node can perform registration and catalog updates.

---

We will explore a hands-on lab to practice creating and managing ACL policies in Consul.

## Links and References

- [Consul ACL Overview](https://www.consul.io/docs/security/acl)
- [HashiCorp Consul Documentation](https://www.consul.io/docs)
- [HCL Language Syntax](https://github.com/hashicorp/hcl)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/1e66f0db-656d-460f-be77-89e34ca058e8)**
>
> Watch video content
