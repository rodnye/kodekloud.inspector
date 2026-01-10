# Demo Service Mesh - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-a-Service-Proxy/Demo-Service-Mesh)

---

## Table of Contents

- Demo Service Mesh
  - 1. Enable Consul Connect
  - 2. Register and Configure Services
  - 3. Start Services and Sidecar Proxies
  - 4. Verify Connectivity
  - 5. Manage Intentions
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab
    - 2.1 Counting Service
    - 2.2 Dashboard Service
    - 3.1 Counting Service & Proxy
    - 3.2 Dashboard Service & Proxy

---

## Content

HashiCorp Certified: Consul Associate Certification

Register a Service Proxy

# Demo Service Mesh

In this guide, we’ll deploy a sample application on a HashiCorp Consul Service Mesh. You’ll use Consul Connect to secure communication between two microservices—**dashboard** and **counting**—each with its own sidecar proxy. Finally, you’ll control traffic using Consul **intentions**.

Based on the [HashiCorp Learn tutorial on Consul Service Mesh](https://learn.hashicorp.com/tutorials/consul/service-mesh), we assume you have a Consul cluster with two server nodes and two web servers. We’ll:

1.  Enable Consul Connect for TLS encryption
2.  Register counting and dashboard services
3.  Launch services with sidecar proxies
4.  Verify mutual TLS traffic
5.  Manage service intentions

![The image shows a diagram of a service communication flow between a "Dashboard Service" and a "Counting Service," with ports and proxy symbols. It is part of a tutorial on the HashiCorp Learn website.](https://kodekloud.com/kk-media/image/upload/v1752877906/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/service-communication-flow-dashboard-counting.jpg)

## 1\. Enable Consul Connect

First, activate Consul Connect on each server node so sidecar proxies can establish mutual TLS.

> [!important]
> **Prerequisites**
>
> – Consul 1.7+ installed
> – Systemd or another init system
> – Network connectivity between nodes

Edit `/etc/consul.d/config.hcl` on **consul-node-a**:

```
# /etc/consul.d/config.hcl
log_level          = "INFO"
node_name          = "consul-node-a"
server             = true
ui                 = true
leave_on_terminate = true
data_dir           = "/etc/consul.d/data"
datacenter         = "us-east-1"
client_addr        = "0.0.0.0"
bind_addr          = "10.0.101.110"
advertise_addr     = "10.0.101.110"
retry_join         = ["10.0.101.248"]
bootstrap_expect   = 2
enable_syslog      = true

connect {
  enabled     = true
  performance {
    raft_multiplier = 1
  }
}
```

Save and restart Consul:

```
sudo systemctl restart consul
```

Repeat on **consul-node-b**, adjusting `node_name`, `bind_addr`, `advertise_addr`, and `retry_join`. When both nodes are up, verify membership:

```
consul members
```

![The image shows a computer screen with a terminal window open, displaying a command prompt, and a web browser tab showing a Consul services page with one service listed.](https://kodekloud.com/kk-media/image/upload/v1752877907/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/computer-terminal-command-prompt-consul-services.jpg)

## 2\. Register and Configure Services

Now register the two application services on separate web servers:

| Service   | Node      | Port | Definition File |
| --------- | --------- | ---- | --------------- |
| counting  | counting  | 9003 | counting.hcl    |
| dashboard | dashboard | 9002 | dashboard.hcl   |

![The image shows a web interface for HashiCorp Consul, displaying a services page with one service named "consul" and two instances.](https://kodekloud.com/kk-media/image/upload/v1752877908/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/hashicorp-consul-services-page-instance.jpg)

### 2.1 Counting Service

On the **counting** server, create `counting.hcl`:

```
# counting.hcl
node_name = "counting"

service {
  name = "counting"
  id   = "counting-1"
  port = 9003

  connect {
    sidecar_service {}
  }

  check {
    id       = "counting-check"
    http     = "http://localhost:9003/health"
    method   = "GET"
    interval = "1s"
    timeout  = "1s"
  }
}
```

Register it:

```
consul services register counting.hcl
```

### 2.2 Dashboard Service

On the **dashboard** server, create `dashboard.hcl`:

```
# dashboard.hcl
node_name = "dashboard"

service {
  name = "dashboard"
  port = 9002

  connect {
    sidecar_service {
      proxy {
        upstreams = [
          {
            destination_name = "counting"
            local_bind_port  = 5000
          }
        ]
      }
    }
  }

  check {
    id       = "dashboard-check"
    http     = "http://localhost:9002/health"
    method   = "GET"
    interval = "15s"
    timeout  = "1s"
  }
}
```

Register it:

```
consul services register dashboard.hcl
```

> [!important]
> **Health Checks**
>
> Services are registered immediately but not yet running—health checks will show “critical” until the application and proxy start.

## 3\. Start Services and Sidecar Proxies

Launch each application and its sidecar proxy so traffic is routed via Consul Connect.

### 3.1 Counting Service & Proxy

On the **counting** server:

```
export PORT=9003
./counting-service &

# Start Consul sidecar proxy for counting
consul connect proxy --sidecar-for counting-1 > counting-proxy.log &
```

Check the status in Consul’s UI:

![The image shows a Consul web interface displaying service details for "counting-1" on a node named "web-server-01," including health checks and status information.](https://kodekloud.com/kk-media/image/upload/v1752877910/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/consul-web-interface-counting-1-status.jpg)

### 3.2 Dashboard Service & Proxy

On the **dashboard** server:

```
export PORT=9002
export COUNTING_SERVICE_URL="http://localhost:5000"
./dashboard-service &

# Start Consul sidecar proxy for dashboard
consul connect proxy --sidecar-for dashboard > dashboard-proxy.log &
```

Now both sidecars are active and enforce mTLS.

## 4\. Verify Connectivity

Open your browser to `http://<dashboard-node-ip>:9002` and refresh the page. You should see the counter increment via the proxy:

![The image shows a computer screen displaying a dashboard with a large number "1" and an IP address. There are multiple browser tabs open, and a terminal window is visible in the background.](https://kodekloud.com/kk-media/image/upload/v1752877910/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/computer-dashboard-ip-address-browser-tabs.jpg)

In the Consul UI you’ll also see the service topology and traffic distribution:

![The image shows a Consul dashboard interface displaying a service topology with a connection between "dashboard" and "counting" services. The "counting" service has a load distribution of 75% and 25%.](https://kodekloud.com/kk-media/image/upload/v1752877912/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/consul-dashboard-service-topology-75-25.jpg)

Monitor overall health checks:

![The image shows a web interface displaying various service health checks, including details like service names, check IDs, types, and outputs. It appears to be part of a monitoring or management dashboard for network services.](https://kodekloud.com/kk-media/image/upload/v1752877913/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/service-health-checks-dashboard-interface.jpg)

## 5\. Manage Intentions

By default, Consul permits all service-to-service calls. Use **intentions** to enforce allow/deny policies.

Create a new intention to allow **dashboard → counting**:

![The image shows a web interface for creating a new intention in a service management tool, with options to select source and destination services, and to allow or deny connections.](https://kodekloud.com/kk-media/image/upload/v1752877914/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/service-management-tool-intention-creation.jpg)

Once saved, you’ll see it in the UI:

![The image shows a web interface for managing service intentions in HashiCorp Consul, displaying a permission setting from "dashboard" to "counting" with an "Allow" action.](https://kodekloud.com/kk-media/image/upload/v1752877916/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/hashicorp-consul-service-intentions-dashboard.jpg)

To test a deny rule, switch the intention to **Deny**:

![The image shows a web interface for editing service intentions, with options to allow, deny, or set application-aware connections between a source and destination service. The user is about to save the configuration.](https://kodekloud.com/kk-media/image/upload/v1752877917/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Mesh/web-interface-editing-service-intentions.jpg)

Save and refresh the dashboard—updates stop, confirming the proxy enforces your policy. Revert to **Allow** to resume traffic.

## Conclusion

You’ve successfully:

- Enabled **Consul Connect** for mutual TLS service mesh
- Registered services with sidecar proxies
- Started applications and proxies
- Verified secure communication
- Managed traffic via **intentions**

Consul’s service mesh lets you implement fine-grained security and traffic policies without modifying application code. Happy networking!

---

## Links and References

- [Consul Connect Documentation](https://www.consul.io/docs/connect)
- [Intentions in Consul](https://www.consul.io/docs/connect/intentions)
- [HashiCorp Learn: Service Mesh Tutorial](https://learn.hashicorp.com/tutorials/consul/service-mesh)
- [Consul CLI Reference](https://www.consul.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/be057676-1d98-4d78-89c8-b8be2a9c2967/lesson/2e25754f-8976-44e6-9108-94aa3e1768b7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/be057676-1d98-4d78-89c8-b8be2a9c2967/lesson/88e0f50a-4cce-457e-bc5f-bf5fe2d298a8)**
>
> Practice lab
