# Demo Working with Health Checks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Demo-Working-with-Health-Checks)

---

## Table of Contents

- Demo Working with Health Checks
  - Registering a Basic Consul Service
  - Adding a TCP Health Check
  - Observing Health Check Status
  - Service Definition Comparison
  - Links and References
  - Watch Video
  - Practice Lab
    - Simulating Failure and Recovery

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Demo Working with Health Checks

In this tutorial, we’ll walk through enhancing a Consul service definition by adding a TCP health check. You will learn how to:

- Register a basic Consul service
- Add a TCP health check on port 80
- Observe and interpret the service’s health status in the Consul UI

> **Prerequisites**  
> You need a running Consul agent and an Apache HTTP server on your node.

---

## Registering a Basic Consul Service

First, create a minimal service definition and register it with Consul.

```
# Open the service definition file
ec2-user@ip-10-0-101-177:~$ vi service.json


# Register the service
ec2-user@ip-10-0-101-177:~$ consul services register service.json
Registered service: front-end-eCommerce
```

Simulate a service restart to see how Consul handles temporary outages:

```
ec2-user@ip-10-0-101-177:~$ sudo systemctl stop httpd
ec2-user@ip-10-0-101-177:~$ sudo systemctl start httpd
```

When you’re done, deregister the service:

```
ec2-user@ip-10-0-101-177:~$ consul services deregister service.json
Deregistered service: web-server-01
```

> [!important]
> **Note**
>
> The basic service definition offers no health checks, so Consul assumes it is always healthy.

---

## Adding a TCP Health Check

To ensure only healthy instances are returned by service discovery, update the definition to include a TCP health check on port 80. Save the following as `service-with-health.json`:

```
{
  "node_name": "web-server-01",
  "service": {
    "id": "web-server-01",
    "name": "front-end-eCommerce",
    "tags": ["v7.05", "production"],
    "address": "10.0.101.177",
    "port": 80,
    "check": {
      "id": "web",
      "name": "Check web on port 80",
      "tcp": "localhost:80",
      "interval": "10s",
      "timeout": "1s"
    }
  }
}
```

Register the enhanced service:

```
ec2-user@ip-10-0-101-177:~$ consul services register service-with-health.json
Registered service: front-end-eCommerce
```

> [!important]
> **Warning**
>
> Until the first TCP check passes, Consul marks the service as **failing** and will not return it in discovery queries.

---

## Observing Health Check Status

1.  Open the [Consul UI](http://localhost:8500/ui).
2.  Look for the **front-end-eCommerce** entry under **Services**.
3.  If the check is still pending or failing, you’ll see a red “X” icon.

After approximately 10 seconds, Consul performs the TCP check against `localhost:80`. A successful connection flips the status to passing, indicated by a green checkmark.

### Simulating Failure and Recovery

To test Consul’s failure detection:

```
ec2-user@ip-10-0-101-177:~$ sudo systemctl stop httpd
```

Within the next interval, the Consul UI shows the failure details:

| Check Name           | Status  | Output                                             |
| -------------------- | ------- | -------------------------------------------------- |
| Check web on port 80 | failed  | dial tcp 127.0.0.1:80: connect: connection refused |
| Serf Health Status   | passing | Agent alive and reachable                          |

Restart Apache to restore health:

```
ec2-user@ip-10-0-101-177:~$ sudo systemctl start httpd
```

After the next 10-second interval, the TCP check passes and Consul marks the service as healthy again.

---

## Service Definition Comparison

| Feature                 | Basic Definition | With TCP Health Check                     |
| ----------------------- | ---------------- | ----------------------------------------- |
| `check` block           | Not present      | Present with `tcp`, `interval`, `timeout` |
| Initial health status   | Always passing   | Marked failing until first check          |
| Service discoverability | Immediate        | Delayed until healthy                     |

---

## Links and References

- [Consul Health Checks Documentation](https://www.consul.io/docs/health-checks)
- [Service Discovery with Consul](https://www.consul.io/docs/discovery)
- [Consul CLI Reference](https://www.consul.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/4c363349-582a-4758-b624-557be75cc4c8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/eca5f924-71a3-45a5-961a-eb2184cfac93)**
>
> Practice lab
