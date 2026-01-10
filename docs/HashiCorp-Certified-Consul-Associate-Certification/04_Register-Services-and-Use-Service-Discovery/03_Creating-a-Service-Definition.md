# Creating a Service Definition - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Creating-a-Service-Definition)

---

## Table of Contents

- Creating a Service Definition
  - Service Definition Parameters
  - Example Service Definition
  - Discovery via DNS
  - High Availability and Elasticity
  - Next Steps
  - Links and References
  - Watch Video
    - Field Breakdown

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Creating a Service Definition

A **service definition** is a JSON file that the Consul agent uses to register your application in the Consul catalog. Once registered—and if any defined health checks pass—the service is discoverable by other nodes and can receive traffic. Failed health checks mark the service as unhealthy in the registry, and Consul will not return it in queries until it recovers.

## Service Definition Parameters

You can customize a service definition with the following fields:

| Parameter | Description                                                             | Example                  |
| --------- | ----------------------------------------------------------------------- | ------------------------ |
| id        | Unique identifier for this service instance (defaults to `name`)        | `web-server-01`          |
| name      | Logical service name (DNS-compliant) **\\[required\\]**                 | `front-end-ecommerce`    |
| tags      | Optional metadata to filter queries (e.g., version, environment)        | `["v7.05","production"]` |
| address   | IP address where the service listens (defaults to agent’s bind address) | `10.3.13.112`            |
| port      | Port on which the service is running                                    | `8080`                   |
| checks    | Array of health checks (script, HTTP, TCP, etc.)                        | See below                |

> [!important]
> **Note**
>
> Only the `name` field is required. If you omit `id`, Consul uses the value of `name`. Explicitly setting `id` helps avoid collisions when running multiple instances.

## Example Service Definition

```
{
  "service": {
    "id": "web-server-01",
    "name": "front-end-ecommerce",
    "tags": ["v7.05", "production"],
    "address": "10.3.13.112",
    "port": 8080,
    "checks": [
      {
        "args": ["/usr/local/bin/check_mem.py"],
        "interval": "30s"
      }
    ]
  }
}
```

### Field Breakdown

- **id**: Unique per instance (e.g., `web-server-01`, `web-server-02`).
- **name**: Service identifier for discovery (e.g., `front-end-ecommerce`).
- **tags**: Filterable attributes like `v7.05` or `production`.
- **address**: Interface IP for the service (agent bind address if omitted).
- **port**: Network port (e.g., `8080` for HTTP).
- **checks**: Health checks; here, a memory-check script running every 30 seconds.

> [!important]
> **Warning**
>
> If health checks continually fail, the service remains in the catalog but marked unhealthy—it will not receive traffic until the check passes.

## Discovery via DNS

Consul exposes services under the `service.consul` domain. Only healthy instances are returned:

```
dig A front-end-ecommerce.service.consul


;; ANSWER SECTION:
front-end-ecommerce.service.consul. 0 IN A 10.3.13.112
```

## High Availability and Elasticity

Registering multiple instances under the same `name` delivers:

- High availability: Traffic shifts to other healthy nodes if one fails.
- Elasticity: Scale instances up or down to match load and optimize resource usage.

![The image illustrates the concept of creating a service definition with multiple nodes providing the same service, emphasizing high availability and elasticity. It shows an API request and response process, highlighting that only registered services passing health checks are returned.](https://kodekloud.com/kk-media/image/upload/v1752877890/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Creating-a-Service-Definition/service-definition-multiple-nodes-high-availability.jpg)

## Next Steps

1.  Save your JSON definition in the Consul agent’s configuration directory (e.g., `/etc/consul.d/`).
2.  Reload or restart the Consul agent:

    ```
    consul reload      # For HCL- or JSON-based configs
    consul agent restart
    ```

3.  Verify registration and health status:

    ```
    consul catalog services
    consul health node web-server-01
    ```

## Links and References

- [Consul Service Registration](https://www.consul.io/docs/agent/services)
- [Consul Health Checks](https://www.consul.io/docs/agent/checks)
- [Consul DNS Interface](https://www.consul.io/docs/discovery/dns)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/22536511-1d81-4e11-8aad-9990870a56fe)**
>
> Watch video content
