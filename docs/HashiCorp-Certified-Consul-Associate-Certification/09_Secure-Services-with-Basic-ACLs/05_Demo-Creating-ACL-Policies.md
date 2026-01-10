# Demo Creating ACL Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Demo-Creating-ACL-Policies)

---

## Table of Contents

- Demo Creating ACL Policies
  - Prerequisites
  - 1. Bootstrap the ACL System
  - 2. Verify Cluster Members
  - 3. Create Your Policy Definition
  - 4. Inspect Existing KV Entries
  - 5. Attempt Policy Creation Without Token
  - 6. Create the ACL Policy With Bootstrap Token
  - Further Reading & References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Demo Creating ACL Policies

In this tutorial, you'll learn how to securely create ACL policies in a Consul cluster. We'll walk through bootstrapping ACLs, defining policy rules, and applying them using the Consul CLI.

## Prerequisites

- A running Consul cluster with ACLs enabled
- Access to one of the Consul server nodes
- Your Consul bootstrap (master) token

> [!important]
> **Note**
>
> Make sure ACLs are enabled in your `consul.hcl` configuration under `acl { enabled = true }`.

## 1\. Bootstrap the ACL System

On your Consul server node, initialize ACLs:

```
[ec2-user@ip-10-0-101-110 ~]$ consul acl bootstrap
AccessorID:  0955ctdf-a531-3165-fa8e-2e5715cb5e66
SecretID:    c7142d5a-8ab1-f78a-f521-18971e29c24
Namespace:   default
Description: Bootstrap Token (Global Management)
Local:       false
Create Time: 2021-02-12 20:01:19.247927413 +0000 UTC
Policies:
00000000-0000-0000-0000-000000000001 - global-management
```

Save the `SecretID`—this is your bootstrap token for all future ACL operations.

## 2\. Verify Cluster Members

Confirm all nodes are healthy and online:

```
[ec2-user@ip-10-0-101-110 ~]$ consul members
Node            Address           Status  Type    Build       Protocol  DC        Segment
consul-node-a   10.0.101.110:8301 alive   server  1.9.3+ent  2         us-east-1 <all>
consul-node-b   10.0.101.248:8301 alive   server  1.9.3+ent  2         us-east-1 <all>
web-server-01   10.0.101.177:8301 alive   client  1.9.3+ent  2         us-east-1 <default>
web-server-02   10.0.101.114:8301 alive   client  1.9.3+ent  2         us-east-1 <default>
```

## 3\. Create Your Policy Definition

1.  Create a working directory and open a new HCL file:

    ```
    [ec2-user@ip-10-0-101-110 ~]$ mkdir -p /tmp/consul-acl
    [ec2-user@ip-10-0-101-110 ~]$ vi /tmp/consul-acl/rules.hcl
    ```

2.  Define the policy rules for your `eCommerce` front-end application:

    ```
    node "web-server-01" {
      policy = "write"
    }


    key_prefix "apps/eCommerce" {
      policy = "write"
    }


    session_prefix "" {
      policy = "write"
    }


    service "eCommerce-Front-End" {
      policy = "write"
    }
    ```

## 4\. Inspect Existing KV Entries

Before applying new policies, list the current KV store:

| Key                             | Value                 |
| ------------------------------- | --------------------- |
| apps/eCommerce                  | billing               |
| apps/eCommerce/database\\\_host | customer\\\_db        |
| apps/eCommerce/environment      | production            |
| apps/eCommerce/version          | 4.5                   |
| apps/search/url                 | search.service.consul |
| apps/search/version             | 4                     |
| consul-snapshot/lock            |                       |

## 5\. Attempt Policy Creation Without Token

Running the create command without a token will fail:

```
[ec2-user@ip-10-0-101-110 tmp]$ consul acl policy create \
  -name "eCommerce" \
  -description "eCommerce App" \
  -rules @rules.hcl


Failed to create new policy: Unexpected response code: 403 (Permission denied)
```

> [!important]
> **Warning**
>
> Always include your bootstrap token when creating or managing ACL policies.
> Without it, Consul will deny your request.

## 6\. Create the ACL Policy With Bootstrap Token

Use the `-token` flag and your `SecretID` to successfully create the policy:

```
[ec2-user@ip-10-0-101-110 tmp]$ consul acl policy create \
  -name "eCommerce" \
  -description "eCommerce App" \
  -rules @rules.hcl \
  -token c7142d5a-8ab1-f78a-f521-18971e29c24


ID:          f333e9a4-df7-05ac-753a-98e040878e68
Name:        eCommerce
Namespace:   default
Description: eCommerce App
Datacenters: default
Rules:
node "web-server-01" {
  policy = "write"
}


key_prefix "apps/eCommerce" {
  policy = "write"
}


session_prefix "" {
  policy = "write"
}


service "eCommerce-Front-End" {
  policy = "write"
}
```

You can now use the returned policy ID when creating tokens for your application.

---

## Further Reading & References

- [Consul ACL Documentation](https://www.consul.io/docs/security/acl)
- [HashiCorp Best Practices](https://www.hashicorp.com/best-practices)
- [Consul CLI Reference](https://www.consul.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/809955a4-ecba-43b8-956b-69f62c62c50d)**
>
> Watch video content
