# Service Mesh - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Service-Mesh)

---

## Table of Contents

- Service Mesh
  - What Is a Service Mesh?
  - Sidecar Architecture and mTLS
  - Defining Access Control with Intentions
  - Traffic Flow in the Mesh
  - Links and References
  - Watch Video
    - Key Benefits of Consul Service Mesh

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Service Mesh

Service meshes provide a dedicated infrastructure layer to secure, observe, and control traffic between microservices. By leveraging sidecar proxies, mutual TLS (mTLS) encryption, and fine-grained policies, Consul Service Mesh ensures encrypted, authenticated communication without any changes to application code.

## What Is a Service Mesh?

A service mesh decouples network-level logic from application logic by injecting lightweight proxies alongside each service instance. These proxies handle:

- Traffic encryption and decryption
- Service discovery and load balancing
- Access control policies

## Sidecar Architecture and mTLS

In Consul Service Mesh, every service instance runs with an Envoy sidecar proxy. Envoy intercepts all inbound/outbound requests, transparently handling certificate management, TLS handshakes, and routing.

![The image is a slide about "Service Mesh," highlighting its role in enabling secure communication between services using mTLS, sidecar architecture, and defined access control.](https://kodekloud.com/kk-media/image/upload/v1752877864/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Mesh/service-mesh-secure-communication-slide.jpg)

### Key Benefits of Consul Service Mesh

| Feature                        | Benefit                 | Description                                                      |
| ------------------------------ | ----------------------- | ---------------------------------------------------------------- |
| mTLS Encryption                | Secure by default       | All traffic is encrypted using certificates issued by Consul CA. |
| Sidecar Proxies (Envoy)        | Transparent integration | Proxies handle TLS handshakes and routing without code changes.  |
| Intentions (Access Control)    | Fine-grained policies   | Define which services can or cannot communicate.                 |
| Automatic Certificate Rotation | Zero-touch security     | Consul issues and rotates certificates automatically.            |

> [!important]
> **Note**
>
> Consul’s built-in Certificate Authority (CA) automatically issues, renews, and revokes TLS certificates, reducing operational overhead.

## Defining Access Control with Intentions

Consul uses **intentions** to enforce service-to-service policies. An intention is a rule that explicitly `allow`s or `deny`s traffic between two services.

| Intention Type | Effect          | CLI Example                                    |
| -------------- | --------------- | ---------------------------------------------- |
| Allow          | Permits traffic | `consul intention create web payment`          |
| Deny           | Blocks traffic  | `consul intention create -deny search payment` |

```
# Allow web → payment
consul intention create web payment


# Deny search → payment
consul intention create -deny search payment
```

Once defined, Consul distributes intentions to every Envoy proxy. As services scale dynamically, the same rules apply uniformly—no manual firewall changes required.

## Traffic Flow in the Mesh

1.  **Service Registration**  
    Each service and its Envoy sidecar register with the Consul server (service registry and CA).
2.  **Service Discovery**  
    When Service A calls Service B, Envoy A queries Consul for B’s healthy endpoints.
3.  **mTLS Handshake**  
    Envoy A and Envoy B perform a mutual TLS handshake using Consul-issued certificates.
4.  **Secure Proxy-to-Proxy Communication**  
    Encrypted traffic flows between the Envoy sidecars. Applications communicate only with their local proxy (e.g., via port 5000).

> [!important]
> **Warning**
>
> If an intention denies communication, the mTLS handshake will fail and Envoy will reject the connection, enforcing your security policies.

---

By combining Envoy sidecars, mTLS encryption, and intention-based access control, Consul Service Mesh delivers robust security, observability, and reliability—all without modifying your application code or managing complex firewall rules.

## Links and References

- [Consul Service Mesh Overview](https://www.consul.io/docs/service-mesh)
- [Envoy Proxy Documentation](https://www.envoyproxy.io/docs)
- [Mutual TLS (mTLS) Explained](https://www.cloudflare.com/learning/ssl/what-is-mutual-tls/)
- [Consul CLI Reference](https://www.consul.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/69287beb-c9a5-4eaf-ad4f-01f954d30a57)**
>
> Watch video content
