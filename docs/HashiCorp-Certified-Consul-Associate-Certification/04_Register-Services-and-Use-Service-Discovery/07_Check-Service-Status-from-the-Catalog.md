# Check Service Status from the Catalog - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Check-Service-Status-from-the-Catalog)

---

## Table of Contents

- Check Service Status from the Catalog
  - 1. DNS Queries
  - 2. API Requests
  - 3. Consul UI
  - Links and References
  - Watch Video
    - How It Works
    - Example: dig against Consul DNS
    - Steps
    - Example: curl against the Catalog API

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Check Service Status from the Catalog

With services and health checks registered in Consul, you can verify which nodes are healthy using three primary interfaces:

| Interface | Description                                  | Example Command                                             |
| --------- | -------------------------------------------- | ----------------------------------------------------------- |
| DNS       | Resolve `name.service.consul` via DNS lookup | `dig @10.0.3.45 -p 8600 front-end-eCommerce.service.consul` |
| API       | Query Consul’s HTTP API for service entries  | `curl http://10.0.3.45:8500/v1/catalog/service/my-service`  |
| UI        | Browse the Consul web interface              | Open `http://<consul-server>:8500/ui` in your browser       |

In the sections below, we’ll walk through each method step by step.

---

## 1\. DNS Queries

Using DNS is often the simplest way to discover services in Consul, since most applications already support DNS resolution.

### How It Works

1.  Your corporate DNS forwards queries for the `.consul` domain to Consul’s DNS port (8600).
2.  The application looks up `database.service.consul` as an A record.
3.  Consul responds with the IP addresses of healthy service instances.
4.  The application selects an IP and connects to the service.

![The image illustrates a DNS query process involving a Java app microservice and a MySQL database, with a DNS forwarder for consul nodes.](https://kodekloud.com/kk-media/image/upload/v1752877880/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Check-Service-Status-from-the-Catalog/dns-query-java-microservice-mysql.jpg)

![The image is a flowchart illustrating the process of checking service status from a catalog using DNS queries, involving a Java app microservice, DNS, and a MySQL database. It shows the steps of DNS request, forwarding to Consul, returning healthy nodes, responding to the DNS query, and establishing connectivity.](https://kodekloud.com/kk-media/image/upload/v1752877881/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Check-Service-Status-from-the-Catalog/service-status-check-dns-flowchart.jpg)

> [!important]
> **Note**
>
> Ensure your firewall allows traffic to port `8600/udp` for DNS forwarding.

### Example: `dig` against Consul DNS

```
dig @10.0.3.45 -p 8600 front-end-eCommerce.service.consul
```

Sample output:

```
; <<>> DiG 9.10.6 <<>> @10.0.3.45 -p 8600 front-end-eCommerce.service.consul
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR
;; QUESTION SECTION:
;front-end-eCommerce.service.consul.   IN A


;; ANSWER SECTION:
front-end-eCommerce.service.consul. 0 IN A 10.3.15.67
...
;; SERVER: 10.0.3.45#8600(10.0.3.45)
```

Consul returned the healthy instance at `10.3.15.67`.

---

## 2\. API Requests

When your application can make HTTP requests, the Consul HTTP API lets you retrieve service entries in JSON format.

![The image is a diagram showing an API request process involving a Java app microservice and a MySQL database. It illustrates the flow of checking service status from a catalog.](https://kodekloud.com/kk-media/image/upload/v1752877882/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Check-Service-Status-from-the-Catalog/api-request-java-microservice-mysql-diagram.jpg)

### Steps

1.  Send a GET request to:

    ```
    http://<consul-server>:8500/v1/catalog/service/<service-name>
    ```

2.  Consul returns a JSON array of nodes passing health checks.
3.  Your code parses the array and picks an IP to connect.

### Example: `curl` against the Catalog API

```
curl --request GET http://10.0.3.45:8500/v1/catalog/service/front-end-eCommerce
```

Sample JSON response:

```
[
  {
    "Node": "web-server-01",
    "Address": "10.3.15.67",
    "ServiceName": "front-end-eCommerce",
    "ServiceTags": ["v7.05","production"]
  }
]
```

Here, only `10.3.15.67` is healthy.

---

## 3\. Consul UI

For human operators, the Consul web UI offers an intuitive overview of services and checks.

1.  Open your browser at `http://<consul-server>:8500/ui`.
2.  Click **Services** in the sidebar to list all registered services.
3.  Select a service (e.g., **customer-database-ecommerce**) to view node details, health status, tags, and metadata.

![The image shows a Consul UI displaying the service status from a catalog, highlighting healthy database and front-end services, along with tags and node information.](https://kodekloud.com/kk-media/image/upload/v1752877884/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Check-Service-Status-from-the-Catalog/consul-ui-service-status-catalog.jpg)

> [!important]
> **Warning**
>
> The Consul UI is unauthenticated by default. Consider enabling ACLs or reverse-proxy authentication in production.

---

With DNS queries, REST API calls, and the web UI, you have flexible options to check service status in Consul’s catalog and ensure your applications connect to healthy nodes.

## Links and References

- [Consul DNS Interface](https://www.consul.io/docs/dns)
- [Consul HTTP API Reference](https://www.consul.io/api-docs)
- [Consul Web UI Guide](https://www.consul.io/docs/ui)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/af8dd1f3-0f7d-4cd0-bf03-9300bbe17013)**
>
> Watch video content
