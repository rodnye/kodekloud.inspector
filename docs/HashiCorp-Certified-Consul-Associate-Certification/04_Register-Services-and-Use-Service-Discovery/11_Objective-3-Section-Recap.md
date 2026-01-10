# Objective 3 Section Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Objective-3-Section-Recap)

---

## Table of Contents

- Objective 3 Section Recap
  - 1. Interpreting a Service Registration
  - 2. Registering a Service
  - 3. Adding Health Checks
  - 4. Querying the Service Catalog
  - 5. Prepared Queries & Failover
  - Links & References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Objective 3 Section Recap

In this lesson, we’ve covered the core tasks for service registration and discovery with Consul. By understanding these five areas, you’ll be able to register, monitor, and query services reliably.

---

## 1\. Interpreting a Service Registration

Every service registration file or API call includes several fields that tell Consul how to manage your service:

- **ID**: A unique identifier (defaults to the service name if not set).
- **Name**: Logical service name used for discovery.
- **Tags**: Custom labels for grouping or routing.
- **Port**: Listening port of your service.
- **Address**: Optional IP address (otherwise uses the agent’s IP).
- **Checks**: Health check definitions (see next section).

> [!important]
> **Note**
>
> A well-structured registration makes automated tooling and monitoring far easier to implement.

---

## 2\. Registering a Service

You have three primary options to register a new service:

| Method                      | Description                                                         | Example                                                                               |
| --------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| HTTP API                    | Send a `PUT` request to the local Consul agent.                     | `curl --request PUT --data @svc.json http://localhost:8500/v1/agent/service/register` |
| Config Directory File       | Drop a JSON or HCL file into `/etc/consul.d/` and reload the agent. | `/etc/consul.d/my-service.hcl` then `consul reload`                                   |
| Direct CLI Config Reference | Point the agent to a specific file and trigger a reload.            | `consul agent -config-file=/path/to/service.json`                                     |

> [!important]
> **Warning**
>
> After adding or modifying a file in the config directory, always run `consul reload` to apply changes without downtime.

---

## 3\. Adding Health Checks

Health checks ensure Consul only routes traffic to healthy instances. Common check types:

- **HTTP**

  ```
  {
    "http": "http://localhost:8080/health",
    "interval": "10s",
    "timeout": "1s"
  }
  ```

- **TCP**

  ```
  {
    "tcp": "localhost:8080",
    "interval": "10s"
  }
  ```

- **Script**

  ```
  {
    "script": "/usr/local/bin/check.sh",
    "interval": "15s"
  }
  ```

See the [Consul Health Checks](https://www.consul.io/docs/agent/checks) guide for advanced options.

---

## 4\. Querying the Service Catalog

Verify your services and their health status using:

| Interface | Command / Query                                     | Notes                                       |
| --------- | --------------------------------------------------- | ------------------------------------------- |
| DNS       | `dig @127.0.0.1 -p 8600 web.service.consul SRV`     | Native DNS lookup for service discovery     |
| HTTP API  | `curl http://localhost:8500/v1/catalog/service/web` | Detailed JSON output, including node info   |
| Web UI    | Browse `http://localhost:8500/ui/services`          | Interactive view of all registered services |

---

## 5\. Prepared Queries & Failover

Prepared queries let you define advanced routing and failover rules:

1.  **Create a Prepared Query**

    ```
    curl --request PUT --data @prepared.json http://localhost:8500/v1/query
    ```

2.  **Define Failover Strategy**  
    Include multiple service pools with weights or priorities.
3.  **Execute via API or DNS**
    - HTTP: `GET /v1/query/{query_id}/execute`
    - DNS: `dig @127.0.0.1 -p 8600 {query_name}.query.consul SRV`

Prepared queries automatically reroute traffic when services become unhealthy.

---

## Links & References

- [Consul HTTP API – Service Registration](https://www.consul.io/api-docs/agent/service)
- [Consul Health Checks](https://www.consul.io/docs/agent/checks)
- [Consul DNS Interface](https://www.consul.io/docs/discovery/dns)
- [Consul Web UI](https://www.consul.io/docs/interface/web)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/1a7d90b2-6329-44f5-9a16-44ca7ee7ad9f)**
>
> Watch video content
