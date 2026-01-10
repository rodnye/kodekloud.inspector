# Demo Service Definition and Registration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Demo-Service-Definition-and-Registration)

---

## Table of Contents

- Demo Service Definition and Registration
  - Verify Cluster Membership
  - Service Definition File
  - Register the Service
  - Testing Without a Health Check
  - Deregister the Service
  - Links and References
  - Watch Video
    - Service Definition Fields

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Demo Service Definition and Registration

In this lesson, you’ll learn how to register a service in Consul, watch it appear in the UI, test it without a health check, and finally deregister it. Our environment consists of two Consul servers and one web client node (`web-server-01`).

## Verify Cluster Membership

On one of the Consul servers (`consul-node-a`), confirm that all nodes have joined the cluster:

```
[ec2-user@consul-node-a ~]$ consul members
Node            Address            Status  Type    Build      Protocol  DC        Segment
consul-node-a   10.0.101.110:8301  alive   server  1.9.3+ent  2         us-east-1 <all>
consul-node-b   10.0.101.248:8301  alive   server  1.9.3+ent  2         us-east-1 <all>
web-server-01   10.0.101.177:8301  alive   client  1.9.3+ent  2         us-east-1 <default>
```

Switch to the web client node (`web-server-01`) to define and register your service. You can watch these changes propagate instantly in the Consul UI:

![The image shows a terminal window and a web browser displaying a Consul interface with a list of nodes, including "consul-node-a," "consul-node-b," and "web-server-01."](https://kodekloud.com/kk-media/image/upload/v1752877894/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Definition-and-Registration/consul-interface-terminal-browser-nodes.jpg)

## Service Definition File

On `web-server-01`, create a JSON file to describe your service:

```
[ec2-user@ip-10-0-101-177 ~]$ vi service.json
```

Add the following content:

```
{
  "ID": "web-server-01",
  "Name": "front-end-eCommerce",
  "Tags": ["v7.05", "production"],
  "Address": "10.0.101.177",
  "Port": 80
}
```

> [!important]
> **Note**
>
> The `service.json` file follows Consul’s service definition schema. You can extend it later with health checks under the `"Check"` block.

### Service Definition Fields

| Field   | Description                       | Example               |
| ------- | --------------------------------- | --------------------- |
| ID      | Unique identifier for the service | `web-server-01`       |
| Name    | Logical name of the service       | `front-end-eCommerce` |
| Tags    | Metadata labels                   | `v7.05`, `production` |
| Address | Service IP address                | `10.0.101.177`        |
| Port    | Listening port                    | `80`                  |

## Register the Service

Register your service definition with Consul:

```
[ec2-user@ip-10-0-101-177 ~]$ consul services register service.json
Registered service: front-end-eCommerce
```

In the Consul UI, the new service appears under **Services** with a healthy status:

![The image shows a web interface for managing services, specifically displaying details for a service named "front-end-eCommerce" with a healthy status for "web-server-01." It includes options for searching and filtering by health status.](https://kodekloud.com/kk-media/image/upload/v1752877895/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Definition-and-Registration/web-interface-managing-services-frontend-ecommerce.jpg)

Meanwhile, Apache is serving its default test page:

![The image shows a default Apache HTTP server test page, indicating the server is installed but not yet configured with content.](https://kodekloud.com/kk-media/image/upload/v1752877896/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Service-Definition-and-Registration/apache-http-server-test-page.jpg)

## Testing Without a Health Check

Stop the Apache HTTP server:

```
[ec2-user@ip-10-0-101-177 ~]$ sudo systemctl stop httpd
```

Reloading the test page in your browser times out, but in Consul, the `front-end-eCommerce` service still shows as `passing` because no application-level health check is defined.

> [!important]
> **Warning**
>
> Without a defined health check, Consul cannot detect application failures. Always configure checks to get accurate health status!

Restore the default page by restarting Apache:

```
[ec2-user@ip-10-0-101-177 ~]$ sudo systemctl start httpd
```

## Deregister the Service

To remove the service from Consul:

```
[ec2-user@ip-10-0-101-177 ~]$ consul services deregister service.json
Deregistered service: web-server-01
```

> [!important]
> **Note**
>
> You can also deregister services via the Consul UI or the HTTP API by specifying the service ID.

The `front-end-eCommerce` entry disappears from the Consul UI.

## Links and References

- [Consul Service Definition Documentation](https://www.consul.io/docs/agent/services)
- [Consul HTTP API: Service Registration](https://www.consul.io/api-docs/agent/service)
- [Consul UI Guide](https://www.consul.io/docs/gui)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/86aa5baa-3841-40af-9b1b-67e85c7f142a)**
>
> Watch video content
