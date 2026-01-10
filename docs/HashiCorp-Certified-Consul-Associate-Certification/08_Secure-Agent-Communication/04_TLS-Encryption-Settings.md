# TLS Encryption Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Agent-Communication/TLS-Encryption-Settings)

---

## Table of Contents

- TLS Encryption Settings
  - Quick Reference
  - 1. verify_server_hostname
  - 2. verify_incoming
  - 3. verify_outgoing
  - Links and References
  - Watch Video
    - SAN Requirements
      - Example: Web Server Agent

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Agent Communication

# TLS Encryption Settings

In this guide, we’ll explore the three core TLS encryption options you can enable in your Consul agent’s configuration. By default, these settings are set to `false`, so you must explicitly activate them in your JSON or HCL config file. Enabling these options ensures all RPC/API calls in your Consul cluster are both encrypted and authenticated.

## Quick Reference

| Setting                      | Purpose                                            | Default |
| ---------------------------- | -------------------------------------------------- | ------- |
| verify\\\_incoming           | Enforce TLS on all incoming RPC and HTTP API calls | false   |
| verify\\\_outgoing           | Enforce TLS on all outgoing connections            | false   |
| verify\\\_server\\\_hostname | Validate server hostname against certificate SAN   | false   |

Here’s an example snippet showing all three enabled in JSON:

```
{
  "log_level": "INFO",
  "server": true,
  "key_file": "/etc/consul.d/cert.key",
  "cert_file": "/etc/consul.d/client.pem",
  "ca_file": "/etc/consul.d/chain.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "verify_server_hostname": true,
  "ui": true,
  "encrypt": "xxxxxxxxxxxxxx"
}
```

---

## 1\. verify_server_hostname

When `verify_server_hostname` is enabled, the agent checks that every outgoing TLS connection matches the server’s hostname against the certificate’s Subject Alternative Name (SAN). Without this check, Consul only validates the CA signature but not the actual hostname, leaving room for certificate spoofing.

![The image provides information on TLS encryption settings, specifically focusing on hostname verification for outgoing connections and certificate requirements for Consul. It includes a diagram illustrating the certificate chain from root to intermediate to a specific node.](https://kodekloud.com/kk-media/image/upload/v1752877943/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-TLS-Encryption-Settings/tls-encryption-hostname-verification-diagram.jpg)

### SAN Requirements

- **With Consul CA Server**: Node certificates automatically include `server.datacenter.consul` by default.
- **With an External CA**: You must add the SAN `server.<datacenter>.consul` (e.g., `server.dc1.consul`) when issuing certificates. Failing to do so will stop nodes from joining the cluster if `verify_server_hostname` is on.

> [!important]
> **SAN Requirement Warning**
>
> If you switch a client node to `server: true` without a proper SAN, the node will fail to join the cluster due to a hostname mismatch in its certificate.

#### Example: Web Server Agent

```
{
  "log_level": "INFO",
  "server": false,
  "key_file": "/etc/consul.d/cert.key",
  "cert_file": "/etc/consul.d/client.pem",
  "ca_file": "/etc/consul.d/chain.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "verify_server_hostname": true,
  "encrypt": "xxxxxxxxxxxxxx"
}
```

---

## 2\. verify_incoming

Enable `verify_incoming` to require TLS for **all incoming** connections, including both RPC and the HTTP API. The presenting certificate must be signed by a CA listed in your `ca_file` or `ca_path`.

![The image explains TLS encryption settings, specifically the "verify_incoming" option, and includes a diagram showing client connections.](https://kodekloud.com/kk-media/image/upload/v1752877944/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-TLS-Encryption-Settings/tls-encryption-verify-incoming-diagram.jpg)

```
{
  "verify_incoming": true
}
```

---

## 3\. verify_outgoing

When `verify_outgoing` is set to `true`, Consul enforces TLS on **all outgoing** connections from both clients and servers. The remote peer’s certificate must be signed by a trusted CA.

![The image explains TLS encryption settings, specifically the "verify_outgoing" option, which requires outgoing connections to use TLS with a certificate signed by a CA. It includes a diagram showing connections between a server and clients.](https://kodekloud.com/kk-media/image/upload/v1752877945/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-TLS-Encryption-Settings/tls-encryption-verify-outgoing-diagram.jpg)

```
{
  "verify_outgoing": true
}
```

---

By combining `verify_incoming`, `verify_outgoing`, and `verify_server_hostname`, you lock down your Consul cluster with end-to-end TLS encryption and strict certificate verification.

## Links and References

- [Consul TLS Documentation](https://www.consul.io/docs/security/encryption/tls)
- [Subject Alternative Name (SAN) Overview](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6)
- [Consul Agent Configuration](https://www.consul.io/docs/agent/options)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/777a613c-50bc-474c-9597-aec67eec52e0/lesson/be43c648-017a-4ec9-bfde-e4f79266bf45)**
>
> Watch video content
