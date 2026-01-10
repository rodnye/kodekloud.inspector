# Demo Enable and Configure the Consul ACL System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Demo-Enable-and-Configure-the-Consul-ACL-System)

---

## Table of Contents

- Demo Enable and Configure the Consul ACL System
  - Prerequisites
  - 1. Update Configuration on consul-node-a
  - 2. Update Configuration on consul-node-b
  - 3. Verify Cluster Membership
  - 4. Bootstrap the ACL System
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Demo Enable and Configure the Consul ACL System

In this guide, you’ll enable and configure the Consul ACL system to secure your service mesh. By default, Consul ACLs are disabled. We’ll update the agent configuration on both server nodes, restart the agents, verify cluster membership, and bootstrap the ACL subsystem.

> [!important]
> **Note**
>
> Consul ACLs are disabled out of the box. Enabling them enforces access control for API requests, service registrations, and key/value operations.

## Prerequisites

- Two Consul server nodes:
  - **consul-node-a** (10.0.101.110)
  - **consul-node-b** (10.0.101.248)
- SSH access to each node
- Consul 1.9+ installed and running without ACLs

| Resource           | Details                     |
| ------------------ | --------------------------- |
| Consul version     | ≥ 1.9.0 (Enterprise or OSS) |
| Configuration file | `/etc/consul.d/config.hcl`  |
| Data directory     | `/etc/consul.d/data`        |
| Consul datacenter  | `us-east-1`                 |

---

## 1\. Update Configuration on consul-node-a

1.  SSH into **consul-node-a**:

    ```
    ssh user@10.0.101.110
    ```

2.  Backup and open the Consul HCL file:

    ```
    sudo cp /etc/consul.d/config.hcl /etc/consul.d/config.hcl.bak
    sudo vi /etc/consul.d/config.hcl
    ```

3.  Append or update the following stanzas:

    ```
    node_name           = "consul-node-a"
    server              = true
    ui                  = true
    leave_on_terminate  = true
    data_dir            = "/etc/consul.d/data"
    datacenter          = "us-east-1"
    client_addr         = "0.0.0.0"
    bind_addr           = "10.0.101.110"
    advertise_addr      = "10.0.101.110"
    retry_join          = ["10.0.101.248"]
    bootstrap_expect    = 2
    enable_syslog       = true


    connect {
      enabled = true
    }


    acl {
      enabled        = true
      default_policy = "allow"
      down_policy    = "extend-cache"
    }


    performance {
      raft_multiplier = 1
    }
    ```

4.  Save and exit (`:wq`).
5.  Restart the Consul agent:

    ```
    sudo systemctl restart consul
    ```

---

## 2\. Update Configuration on consul-node-b

Repeat on **consul-node-b**:

1.  SSH into **consul-node-b**:

    ```
    ssh user@10.0.101.248
    ```

2.  Edit the configuration:

    ```
    sudo vi /etc/consul.d/config.hcl
    ```

3.  Ensure the file matches this configuration (update bind and advertise addresses):

    ```
    node_name           = "consul-node-b"
    server              = true
    ui                  = true
    leave_on_terminate  = true
    data_dir            = "/etc/consul.d/data"
    datacenter          = "us-east-1"
    client_addr         = "0.0.0.0"
    bind_addr           = "10.0.101.248"
    advertise_addr      = "10.0.101.248"
    retry_join          = ["10.0.101.110"]
    bootstrap_expect    = 2
    enable_syslog       = true


    connect {
      enabled = true
    }


    acl {
      enabled        = true
      default_policy = "allow"
      down_policy    = "extend-cache"
    }


    performance {
      raft_multiplier = 1
    }
    ```

4.  Save and restart:

    ```
    sudo systemctl restart consul
    ```

---

## 3\. Verify Cluster Membership

On either server, confirm both nodes are alive:

```
consul members
```

Expected output:

```
Node            Address             Status  Type    Build       Protocol  DC         Segment
consul-node-a   10.0.101.110:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
consul-node-b   10.0.101.248:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
```

> [!important]
> **Note**
>
> If a node isn’t listed as `alive`, check logs with `journalctl -u consul` and verify network connectivity.

---

## 4\. Bootstrap the ACL System

Bootstrap the ACL subsystem to generate your initial **management token**:

```
consul acl bootstrap
```

Sample output:

```
AccessorID:  0955cdf-4531-3165-fa8e-2e5715cb5e66
SecretID:    c71425da-8ab1-78ba-f521-189712e29c24
Namespace:   default
Description: Bootstrap Token (Global Management)
Local:       false
Create Time: 2021-02-12 20:01:19.247927413 +0000 UTC
Policies:    00000000-0000-0000-0000-000000000001 - global-management
```

- **AccessorID**: token identifier
- **SecretID**: the token for CLI/API authentication
- **Policies**: grants `global-management` privileges

Because `default_policy = "allow"`, you can still run commands like `consul members` without specifying `-token`. If you switch to `default_policy = "deny"`, every request will require a valid token.

> [!important]
> **Warning**
>
> Store the **SecretID** securely. Losing it may lock you out of ACL management. Consider rotating tokens after bootstrapping.

---

## Next Steps

- Create fine-grained policies to restrict access by service or path.
- Generate scoped tokens for applications, operators, and CI/CD pipelines.
- Practice authenticating with ACL tokens:

  ```
  consul kv put -token=<your-token> secret/application/key value
  ```

- Integrate Consul ACLs with Terraform or Vault for automated policy management.

---

## Links and References

- [Consul ACL Overview](https://developer.hashicorp.com/consul/docs/security/acl)
- [Consul Server Configuration](https://developer.hashicorp.com/consul/docs/install/config)
- [Managing Tokens and Policies](https://developer.hashicorp.com/consul/docs/security/acl/tokens)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/282bf537-e85d-4e49-823e-c0c90c3c9243)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/282eb5c2-09a8-4bf4-9ab3-510619548264)**
>
> Practice lab
