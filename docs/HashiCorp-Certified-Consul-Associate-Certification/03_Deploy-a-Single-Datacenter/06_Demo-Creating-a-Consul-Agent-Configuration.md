# Demo Creating a Consul Agent Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Deploy-a-Single-Datacenter/Demo-Creating-a-Consul-Agent-Configuration)

---

## Table of Contents

- Demo Creating a Consul Agent Configuration
  - Consul Server Agent Configuration (JSON)
  - Minimal Consul Client Agent Configuration (JSON)
  - Links and References
  - Watch Video
    - Key Settings Overview

---

## Content

HashiCorp Certified: Consul Associate Certification

Deploy a Single Datacenter

# Demo Creating a Consul Agent Configuration

In this guide, you’ll learn how to configure a **HashiCorp Consul** agent—both server and client modes—using example files hosted on GitHub. Follow along by visiting the Consul folder in the repository:

https://github.com/btkrausen/hashicorp/tree/main/Consul

## Consul Server Agent Configuration (JSON)

Below is a complete JSON example for a Consul server agent. This configuration enables Raft consensus, TLS encryption, and ACL enforcement.

```
{
  "log_level": "INFO",
  "server": true,
  "key_file": "/etc/consul.d/cert.key",
  "cert_file": "/etc/consul.d/client.pem",
  "ca_file": "/etc/consul.d/chain.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "verify_server_hostname": true,
  "ui": true,
  "encrypt": "xxxxxxxxxxxxxx",
  "leave_on_terminate": true,
  "data_dir": "/opt/consul/data",
  "datacenter": "us-east-1",
  "client_addr": "0.0.0.0",
  "bind_addr": "10.11.11.11",
  "advertise_addr": "10.11.11.11",
  "bootstrap_expect": 5,
  "retry_join": [
    "provider=aws tag_key=Environment-Name tag_value=consul-cluster region=us-east-1"
  ],
  "enable_syslog": true,
  "acl": {
    "enabled": true,
    "default_policy": "deny",
    "down_policy": "extend-cache",
    "tokens": {
      "agent": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  },
  "performance": {
    "raft_multiplier": 1
  }
}
```

### Key Settings Overview

| Setting                                 | Description                                                                                               | Example                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| log\\\_level                            | Controls log verbosity (e.g., `INFO`, `DEBUG`).                                                           | `"INFO"`                                        |
| server                                  | Enables server mode; participates in Raft elections and stores cluster state.                             | `true`                                          |
| key\\\_file / cert\\\_file / ca\\\_file | Paths to TLS key, certificate, and CA used for mutual TLS on RPC and HTTP APIs.                           | `/etc/consul.d/cert.key`                        |
| verify\\\_incoming / outgoing           | Enforces mutual TLS for all RPC/API calls.                                                                | `true`                                          |
| verify\\\_server\\\_hostname            | Validates server hostname in TLS certificates.                                                            | `true`                                          |
| ui                                      | Enables the built-in Consul Web UI.                                                                       | `true`                                          |
| encrypt                                 | Gossip encryption key for securing cluster communication.                                                 | `"xxxxxxxxxxxxxx"`                              |
| leave\\\_on\\\_terminate                | Ensures the agent cleanly leaves the gossip pool when stopped.                                            | `true`                                          |
| data\\\_dir                             | Directory for storing Consul state and snapshots.                                                         | `/opt/consul/data`                              |
| datacenter                              | Logical datacenter identifier (default: `dc1`).                                                           | `"us-east-1"`                                   |
| client\\\_addr / bind\\\_addr           | Network addresses for HTTP/RPC bindings and gossip interface.                                             | `"0.0.0.0"`, `"10.11.11.11"`                    |
| advertise\\\_addr                       | Address announced to peers for incoming connections.                                                      | `"10.11.11.11"`                                 |
| bootstrap\\\_expect                     | Number of server nodes to wait for before bootstrapping the cluster.                                      | `5`                                             |
| retry\\\_join                           | Auto-join peers using AWS tags.                                                                           | `["provider=aws tag_key=Environment-Name ..."]` |
| enable\\\_syslog                        | Sends agent logs to the local syslog.                                                                     | `true`                                          |
| acl.enabled / default\\\_policy         | Enables ACLs with restrictive defaults—requires a token for all operations.                               | see JSON block                                  |
| down\\\_policy                          | Defines behavior when ACL system is down (e.g., `extend-cache`).                                          | `"extend-cache"`                                |
| performance.raft\\\_multiplier          | Multiplier for Raft timeouts; setting to `1` improves failure detection speed in production environments. | `1`                                             |

> [!important]
> **Note**
>
> For production clusters, configure at least 3–5 server agents and set `bootstrap_expect` accordingly to ensure high availability.

---

## Minimal Consul Client Agent Configuration (JSON)

Use the following JSON snippet for a lightweight Consul client that joins an existing cluster. It includes essential TLS settings, gossip encryption, and ACL tokens.

```
{
  "log_level": "INFO",
  "server": false,
  "node_name": "node-a.example.com",
  "key_file": "/etc/consul.d/cert.key",
  "cert_file": "/etc/consul.d/client.pem",
  "ca_file": "/etc/consul.d/chain.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "encrypt": "xxxxxxxxxxxxxxxxxxxx",
  "data_dir": "/opt/consul/data",
  "datacenter": "us-east-1",
  "bind_addr": "10.10.10.10",
  "client_addr": "0.0.0.0",
  "retry_join": [
    "provider=aws tag_key=Environment-Name tag_value=consul-cluster region=us-east-1"
  ],
  "enable_syslog": true,
  "acl": {
    "tokens": {
      "agent": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  }
}
```

> [!important]
> **Warning**
>
> Ensure your client node has network connectivity to the server agents and valid ACL tokens to authenticate API calls.

![The image shows a GitHub repository page for "hashicorp" with a list of configuration files, including JSON and HCL files, and a recent commit message about removing Consul items from the Vault folder.](https://kodekloud.com/kk-media/image/upload/v1752877808/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Creating-a-Consul-Agent-Configuration/github-repo-hashicorp-config-files.jpg)

## Links and References

- [Consul Agent Configuration | Consul Documentation](https://www.consul.io/docs/agent/options)
- [GitHub Repository: btkrausen/hashicorp](https://github.com/btkrausen/hashicorp)
- [Terraform AWS Provider – Auto-Join Configuration](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/a1f79019-1fbb-4b11-8935-0f09bdc9da3c/lesson/6e559769-c6ad-484f-ac9f-629b268e2969)**
>
> Watch video content
