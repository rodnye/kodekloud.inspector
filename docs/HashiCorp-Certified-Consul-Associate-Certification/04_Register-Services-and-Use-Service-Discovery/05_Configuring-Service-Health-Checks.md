# Configuring Service Health Checks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Configuring-Service-Health-Checks)

---

## Table of Contents

- Configuring Service Health Checks
  - Health Check Basics
  - Health Check Lifecycle
  - Available Health Check Types
  - Links and References
  - Watch Video
    - Example: Script Health Check
    - Example: HTTP Health Check
    - Example: TCP Health Check
    - Example: Docker Health Check

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Configuring Service Health Checks

In this lesson, you’ll learn how to configure health checks in Consul to monitor the status of services and nodes. You can register or update health checks through the Consul HTTP API or by embedding them directly in your service definition. Typically, you register a service and its associated health check simultaneously.

![The image is a slide titled "Configuring a Service Health Check," explaining how health checks determine service health and can be configured via API or service config, including parameters like name, arguments, interval, and additional parameters.](https://kodekloud.com/kk-media/image/upload/v1752877885/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configuring-Service-Health-Checks/configuring-service-health-checks-slide.jpg)

## Health Check Basics

When defining a health check, you specify a set of core fields:

- **id** or **name**: A unique identifier for the check.
- **type-specific fields** (args, http, tcp, ttl, etc.) to control check behavior.
- **interval**: Frequency of executions (e.g., `10s`, `30s`, `1m`).
- **timeout**: Maximum wait before marking the check as failed.
- **additional parameters**: HTTP headers, request bodies, TLS settings, or script arguments.

Consul supports two broad categories of checks:

- **Application-level checks**: Probe service endpoints, such as HTTP ports or custom scripts.
- **System-level (host) checks**: Monitor node health (CPU, memory, disk, etc.).

![The image explains configuring a service health check, highlighting application-level and system-level checks, with a diagram showing host-level and application-level health checks.](https://kodekloud.com/kk-media/image/upload/v1752877886/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configuring-Service-Health-Checks/service-health-check-configuration-diagram.jpg)

> [!important]
> **Warning**
>
> A failing host-level check removes **all** services on that node from Consul queries, even if their individual checks pass. Application-level failures only impact the specific service.

## Health Check Lifecycle

Every newly registered health check starts in the **Critical** state. Consul will keep the service out of rotation until the check passes:

![The image explains configuring a service health check, highlighting that multiple checks can be defined and newly registered checks are set to 'critical' by default. It includes a flowchart showing the states of health checks: Critical, Health Check, Passing, and Added to Service Pool.](https://kodekloud.com/kk-media/image/upload/v1752877887/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configuring-Service-Health-Checks/service-health-check-configuration-flowchart.jpg)

1.  **Critical**: Default state on registration.
2.  **Health Check Run**: Consul executes the check.
3.  **Passing**: Service enters the healthy pool upon success.
4.  **Critical**: On failure, the check returns to Critical until it succeeds.

If a service has multiple checks, any failing check will exclude the service or node from query results.

## Available Health Check Types

Consul provides several built-in health check types:

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| Script | Execute a local script; exit code 0 = passing.  |
| HTTP   | Send an HTTP(S) request; expect a 2xx response. |
| TCP    | Establish a TCP connection to host:port.        |
| TTL    | External agent must report status via API.      |
| Docker | Run a check inside a Docker container.          |
| gRPC   | Probe a gRPC health endpoint.                   |
| Alias  | Mirror the status of another Consul service.    |

![The image lists different types of health checks, such as Script, HTTP, TCP, TTL, Docker, gRPC, and Alias Health Checks, each with a brief description of their function.](https://kodekloud.com/kk-media/image/upload/v1752877888/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Configuring-Service-Health-Checks/health-checks-types-descriptions.jpg)

### Example: Script Health Check

```
{
  "check": {
    "id": "mem-util",
    "name": "Memory Utilization",
    "args": ["/opt/check_mem.py", "-limit", "256MB"],
    "interval": "10s",
    "timeout": "1s"
  }
}
```

This runs `/opt/check_mem.py -limit 256MB`. A zero exit code marks the check as **passing**; any non-zero code marks it **failing**.

### Example: HTTP Health Check

```
{
  "check": {
    "id": "api",
    "name": "HTTP API on port 5000",
    "http": "https://localhost:5000/health",
    "method": "POST",
    "tls_skip_verify": false,
    "header": {
      "Content-Type": ["application/json"]
    },
    "body": [{"method": "health"}],
    "interval": "10s",
    "timeout": "1s"
  }
}
```

Consul sends a POST request to the specified endpoint and verifies a 2xx status code. Customize headers and body as needed.

### Example: TCP Health Check

```
{
  "check": {
    "id": "ssh",
    "name": "SSH TCP on port 22",
    "tcp": "localhost:22",
    "interval": "10s",
    "timeout": "1s"
  }
}
```

This check attempts a TCP handshake on **localhost:22**.

### Example: Docker Health Check

```
{
  "check": {
    "id": "mem-util-docker",
    "name": "Memory Utilization in Container",
    "docker_container_id": "f972c95ebf0e",
    "shell": "/bin/bash",
    "args": ["/usr/local/bin/check_mem.py"],
    "interval": "10s",
    "timeout": "1s"
  }
}
```

Consul runs the specified script inside the given Docker container using your chosen shell.

---

All health checks are defined alongside service registration so that Consul can continuously monitor and only return healthy services to clients.

## Links and References

- [Consul HTTP API: Agent Checks](https://www.consul.io/api-docs/agent/checks)
- [Consul Service Registration](https://www.consul.io/api-docs/agent/service)
- [Terraform Consul Provider](https://registry.terraform.io/providers/hashicorp/consul/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/fd0ab3ba-06f7-4508-8b79-c92bb5eb181e)**
>
> Watch video content
