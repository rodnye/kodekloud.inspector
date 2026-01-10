# Demo Prepared Queries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-Services-and-Use-Service-Discovery/Demo-Prepared-Queries)

---

## Table of Contents

- Demo Prepared Queries
  - Consul Cluster Overview
  - Service Registration in the Consul UI
  - Creating a Prepared Query
  - Querying via DNS
  - Updating the Prepared Query to v8
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Consul Associate Certification

Register Services and Use Service Discovery

# Demo Prepared Queries

In this guide, we’ll cover how to leverage Consul Prepared Queries for metadata-driven traffic routing. You’ll learn to create, inspect, and update prepared queries to shift traffic seamlessly between service versions.

## Consul Cluster Overview

Start by verifying your cluster members on a server node:

```
consul members
```

Sample output:

```
Node            Address               Status  Type    Build      Protocol  DC          Segment
consul-node-a   10.0.101.110:8301     alive   server  1.9.3+ent  2         us-east-1   <all>
consul-node-b   10.0.101.248:8301     alive   server  1.9.3+ent  2         us-east-1   <all>
web-server-01   10.0.101.177:8301     alive   client  1.9.3+ent  2         us-east-1   <default>
web-server-02   10.0.101.114:8301     alive   client  1.9.3+ent  2         us-east-1   <default>
```

For clarity, here’s the same data in a table:

| Node          | Address           | Status | Type   | Protocol | Datacenter |
| ------------- | ----------------- | ------ | ------ | -------- | ---------- |
| consul-node-a | 10.0.101.110:8301 | alive  | server | 2        | us-east-1  |
| consul-node-b | 10.0.101.248:8301 | alive  | server | 2        | us-east-1  |
| web-server-01 | 10.0.101.177:8301 | alive  | client | 2        | us-east-1  |
| web-server-02 | 10.0.101.114:8301 | alive  | client | 2        | us-east-1  |

Each client hosts an Apache-based e-commerce front end, registering the `front-end-eCommerce` service with version tags.

## Service Registration in the Consul UI

In the Consul web interface, you’ll see two instances of `front-end-eCommerce`. One is tagged `v7.05` and the other `v8`, both in the `production` environment.

![The image shows a web interface for managing services, specifically displaying two web servers under "front-end-eCommerce," with all service checks passing.](https://kodekloud.com/kk-media/image/upload/v1752877893/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Prepared-Queries/web-interface-managing-services-ecommerce.jpg)

| Server        | IP Address   | Version Tag |
| ------------- | ------------ | ----------- |
| web-server-02 | 10.0.101.114 | v7.05       |
| web-server-01 | 10.0.101.177 | v8          |

## Creating a Prepared Query

1.  Save this JSON as `prepared-query.json`:

    ```
    {
      "Name": "eCommerce",
      "Service": {
        "Service": "front-end-eCommerce",
        "Tags": ["v7.05", "production"]
      }
    }
    ```

2.  Register the query via Consul’s HTTP API:

    ```
    curl --request POST --data @prepared-query.json http://10.0.101.110:8500/v1/query | jq
    ```

    Response:

    ```
    {
      "ID": "b34f3b89-68be-9285-8f3e-c05d5d09f7le"
    }
    ```

3.  Inspect the full query definition:

    ```
    curl http://10.0.101.110:8500/v1/query/b34f3b89-68be-9285-8f3e-c05d5d09f7le | jq
    ```

    ```
    {
      "ID": "b34f3b89-68be-9285-8f3e-c05d5d09f7le",
      "Name": "eCommerce",
      "Service": {
        "Service": "front-end-eCommerce",
        "Failover": { "NearestN": 0, "Datacenters": null }
      },
      "OnlyPassing": false,
      "Tags": ["v7.05", "production"]
      // ... other fields ...
    }
    ```

> [!important]
> **Best Practice**
>
> Set `"OnlyPassing": true` in your query definition to ensure only healthy service instances are returned.

## Querying via DNS

Consul exposes prepared queries under the `*.query.consul` DNS domain. Run:

```
dig @10.0.101.110 -p 8600 eCommerce.query.consul
```

You should see the IP of the `v7.05` instance:

```
;; ANSWER SECTION:
eCommerce.query.consul. 0 IN A 10.0.101.114
```

## Updating the Prepared Query to v8

When it’s time to shift traffic to version `v8`, update `prepared-query.json`:

```
{
  "Name": "eCommerce",
  "Service": {
    "Service": "front-end-eCommerce",
    "Tags": ["v8", "production"]
  }
}
```

Apply the update with a `PUT` request (replace the ID):

```
curl --request PUT --data @prepared-query.json \
  http://10.0.101.110:8500/v1/query/b34f3b89-68be-9285-8f3e-c05d5d09f7le
```

Then verify with DNS again:

```
dig @10.0.101.110 -p 8600 eCommerce.query.consul
```

```
;; ANSWER SECTION:
eCommerce.query.consul. 0 IN A 10.0.101.177
```

> [!important]
> **Ensure Correct ID**
>
> Always replace the query ID in your API URL when inspecting or updating prepared queries.

## Conclusion

Consul Prepared Queries enable you to route client requests based on service metadata without touching client configurations. By updating the query payload, you can perform zero-downtime version rollouts and A/B testing with ease.

## Links and References

- [Consul Prepared Queries](https://www.consul.io/docs/discovery/prepared-queries)
- [Consul DNS Interface](https://www.consul.io/docs/agent/dns)
- [Service Mesh with Consul Connect](https://www.consul.io/docs/connect)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/d3a6a6ef-355e-418f-85ab-b66f07ca6e9c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/c93b029c-49ea-4720-b869-60ee503c5fce/lesson/7b8c5411-b589-4e88-9af2-f9dbec859e44)**
>
> Practice lab
