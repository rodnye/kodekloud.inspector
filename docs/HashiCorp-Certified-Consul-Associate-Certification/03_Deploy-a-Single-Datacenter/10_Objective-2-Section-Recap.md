# Objective 2 Section Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Deploy-a-Single-Datacenter/Objective-2-Section-Recap)

---

## Table of Contents

- Objective 2 Section Recap
  - Key Takeaways
  - 1. Starting and Managing the Consul Process
  - 2. Interpreting Consul Agent Configurations
  - 3. Configuring Network Addresses and Ports
  - 4. Agent Join and Leave Behaviors
  - Next Steps
  - Links and References
  - Watch Video
    - Joining a Cluster
    - Graceful Leave

---

## Content

HashiCorp Certified: Consul Associate Certification

Deploy a Single Datacenter

# Objective 2 Section Recap

In this section, we reviewed the essential steps to install, configure, and operate Consul agents in both **server** and **client** modes.

## Key Takeaways

| Task                    | Description                                                                  | Example/Command                        |
| ----------------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| Agent Startup           | Launch Consul from the CLI or via a JSON/HCL config file                     | `consul agent -dev -bind 192.168.1.10` |
| Configuration Formats   | Define common settings, server/client roles, and register services           | HCL or JSON snippets                   |
| Network Binding & Ports | Set `bind_addr`, and customize RPC, HTTP, and DNS port assignments           | `bind_addr = "0.0.0.0"`                |
| Cluster Join & Leave    | Add nodes with `consul join` and gracefully remove them using `consul leave` | `consul join 10.0.0.1`                 |

> [!important]
> **Note**
>
> Before restarting agents, validate your configuration:
>
> ```
> consul validate /path/to/config.hcl
> ```

---

## 1\. Starting and Managing the Consul Process

You can start a Consul agent directly from the command line:

```
consul agent \
  -dev \
  -bind 192.168.1.10 \
  -config-dir /etc/consul.d
```

Or use an HCL/JSON configuration file (`consul.hcl`):

```
datacenter       = "dc1"
node_name        = "consul-server-1"
server           = true
bootstrap_expect = 3
bind_addr        = "0.0.0.0"


ports {
  http = 8500
  rpc  = 8400
  dns  = 8600
}
```

---

## 2\. Interpreting Consul Agent Configurations

Both HCL and JSON support the same agent options.  
Example HCL for a **client** agent registering a web service:

```
service {
  name = "web"
  port = 80
  tags = ["nginx", "frontend"]
}
```

## 3\. Configuring Network Addresses and Ports

Fine-tune Consul network settings to optimize performance and security:

- `bind_addr`: IP/interface for RPC, HTTP, DNS
- `advertise_addr`: Publicly advertised address
- `ports.rpc`, `ports.http`, `ports.dns`

```
bind_addr = "10.0.0.5"
advertise_addr = "203.0.113.10"


ports {
  http = 8500
  rpc  = 8400
  dns  = 8600
}
```

---

## 4\. Agent Join and Leave Behaviors

### Joining a Cluster

Use the `consul join` command to add a new node:

```
consul join 10.0.0.1 10.0.0.2
```

### Graceful Leave

For clients and especially servers, remove nodes gracefully to maintain cluster health:

```
consul leave
```

> [!important]
> **Warning**
>
> Always drain and remove server nodes gracefully to avoid quorum loss.
> Use `consul leave` rather than killing the process.

---

## Next Steps

Move on to **Objective 3: Service Discovery & Health Checking** to learn how Consul automatically tracks and verifies service health.

## Links and References

- [Consul Official Documentation](https://www.consul.io/docs)
- [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl)
- [Consul Agent Configuration Options](https://www.consul.io/docs/agent/options)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/a1f79019-1fbb-4b11-8935-0f09bdc9da3c/lesson/29a2efee-b387-4212-b0ff-28e97dab4ec5)**
>
> Watch video content
