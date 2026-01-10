# Registering a Service Proxy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-a-Service-Proxy/Registering-a-Service-Proxy)

---

## Table of Contents

- Registering a Service Proxy
  - 1. Registering via Configuration File
  - 2. Adding Upstream Dependencies
  - 3. Deploying and Starting the Sidecar Proxy
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Register a Service Proxy

# Registering a Service Proxy

Consul Connect, the built-in service mesh of Consul, uses sidecar proxies to secure and manage traffic between services. By registering a sidecar proxy alongside your application, Consul can automatically route and secure calls through TLS-encrypted channels.

> [!important]
> **Note**
>
> Registering a service proxy in Consul does **not** launch it. You still need to start the proxy process (either Consul’s built-in proxy or an external proxy such as [Envoy](https://www.envoyproxy.io)).

Key tasks:

| Task                    | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| 1\\. Register the proxy | Add a `connect.sidecar_service` stanza in your service config |
| 2\\. Start the proxy    | Launch with `consul connect proxy -sidecar-for <service>`     |

## 1\. Registering via Configuration File

Instead of the [HTTP API](https://www.consul.io/api), declare your sidecar proxy in the same JSON or HCL file as your primary service. Include a `connect` block with an empty `sidecar_service` object:

```
{
  "service": {
    "name": "front-end-ecommerce",
    "port": 8080,
    "connect": {
      "sidecar_service": {}
    }
  }
}
```

- `"name"`: Service identifier (e.g., `front-end-ecommerce`).
- `"port"`: Port your application listens on.
- `"connect.sidecar_service": {}`: Signals Consul to register an integrated sidecar proxy.

Verify both the service and its proxy via the [Consul UI](https://www.consul.io/docs/commands/ui) or [API](https://www.consul.io/api).

## 2\. Adding Upstream Dependencies

Declare downstream services under `proxy.upstreams` within the `sidecar_service` block:

```
{
  "service": {
    "id": "web-01",
    "name": "front-end-ecommerce",
    "tags": ["v7.05", "production"],
    "address": "",
    "port": 8080,
    "connect": {
      "sidecar_service": {
        "proxy": {
          "upstreams": [
            {
              "destination_name": "db01"
            }
          ]
        }
      }
    }
  }
}
```

- `"id"`: Unique instance identifier.
- `"tags"`: Metadata (version, environment).
- `"address"`: If empty, defaults to the local agent address.
- `"connect.sidecar_service.proxy.upstreams"`: List of target services.
  - `"destination_name"`: Consul-registered name of the downstream service.

> [!important]
> **Note**
>
> To add more dependencies, append additional objects to the `upstreams` list.

```
"upstreams": [
  { "destination_name": "db01" },
  { "destination_name": "api-service" }
]
```

## 3\. Deploying and Starting the Sidecar Proxy

1.  Place your JSON file in Consul’s configuration directory (e.g., `/etc/consul.d/`).
2.  Reload or restart the Consul agent:
    - `consul reload`
    - or `systemctl restart consul`
3.  Launch the proxy process:  
    consul connect proxy -sidecar-for front-end-ecommerce

After these steps, both the application and its sidecar proxy are registered and active. Verify connectivity in the [Consul UI](https://www.consul.io/docs/commands/ui), via the [CLI](https://www.consul.io/docs/commands), or using the [API](https://www.consul.io/api).

## References

- [Consul Connect Overview](https://www.consul.io/docs/connect)
- [Consul HTTP API](https://www.consul.io/api)
- [Envoy Proxy](https://www.envoyproxy.io)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/be057676-1d98-4d78-89c8-b8be2a9c2967/lesson/4a9a997f-764b-41e7-a2c6-96ba8401b57d)**
>
> Watch video content
