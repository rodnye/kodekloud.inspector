# How Do We Set All of this Up - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Replication/How-Do-We-Set-All-of-this-Up)

---

## Table of Contents

- How Do We Set All of this Up
  - 1. Enable DR Replication on the Primary Cluster
  - 2. Generate the Wrapped Secondary Token
  - 3. (Optional) Inspect the Wrapped Token
  - 4. Activate DR Replication on the Secondary Cluster
  - Further Reading
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Replication

# How Do We Set All of this Up

Disaster Recovery (DR) replication in HashiCorp Vault isn’t enabled by default. Follow these four steps to set up a DR replica set:

1.  Enable DR replication on the primary cluster
2.  Generate a wrapped secondary token
3.  _(Optional)_ Inspect the token’s contents
4.  Activate DR replication on the secondary cluster

---

## 1\. Enable DR Replication on the Primary Cluster

On your primary Vault cluster, enable DR replication. Vault will automatically:

- Provision an internal root CA
- Issue a root certificate and a client certificate for mutual TLS
- Prepare to generate secondary tokens

> [!important]
> **Note**
>
> These internal certificates are separate from the TLS certificates you configure for your Vault listener.

![The image is a slide about activating DR replication in Vault, detailing the need to enable replication on each cluster, the creation of a root certificate, and the use of mutual TLS connections. It also mentions potential issues with load balancers terminating TLS.](https://kodekloud.com/kk-media/image/upload/v1752878274/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Do-We-Set-All-of-this-Up/dr-replication-vault-activation-slide.jpg)

> [!important]
> **Warning**
>
> If your Vault nodes sit behind a load balancer that terminates TLS, ensure mTLS traffic on port 8201 is passed through end-to-end. Either disable TLS termination or configure a TCP passthrough.

```
# Example: Enable DR replication on primary
vault write -f sys/replication/dr/primary/enable
```

---

## 2\. Generate the Wrapped Secondary Token

Next, create a DR secondary token on the primary. This wrapped, single-use token contains:

- The primary’s unwrapping address
- The CA certificate for mTLS
- A client certificate and key

```
vault write -wrap-ttl=5m -f sys/replication/dr/secondary-token
```

![The image is a slide about "Secondary Token" requirements for cluster replication, detailing its sensitivity, single-use nature, and included information. It also features a certification badge and a cartoon character at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878275/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Do-We-Set-All-of-this-Up/secondary-token-requirements-cluster-replication.jpg)

---

## 3\. (Optional) Inspect the Wrapped Token

Typically you hand this wrapped token directly to the secondary without unwrapping. For demonstration, here’s the JSON after unwrapping:

```
{
  "request_id": "98d4c7a5-0f00-4872-1cad-6ab8fa35694c",
  "data": {
    "ca_cert": "MIIC/fCCAd ...",
    "client_cert": "MIICjCCAjgAwIBAgIIK4vDI ...",
    "client_key": {
      "type": "p521",
      "d": "...",
      "x": "...",
      "y": "..."
    }
  },
  "cluster_id": "0d12790a-996e-152f-0113-3b016812d64d",
  "id": "secondary"
}
```

You can skip this step in production—Vault handles unwrapping automatically on the secondary.

---

## 4\. Activate DR Replication on the Secondary Cluster

On your secondary cluster, supply the wrapped token when enabling DR replication. Vault will:

1.  Call back to the primary’s API on port 8200 to unwrap the token
2.  Extract mTLS credentials and primary address
3.  Establish inter-cluster connections on port 8201
4.  Begin streaming data from primary to secondary

```
vault write sys/replication/dr/secondary/enable \
    token="<wrapped_token_response>"
```

![The image is a flowchart illustrating the process of using a secondary token, showing steps from token creation to secondary cluster readiness. It includes icons and text explaining each stage, with a certification badge in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752878276/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-How-Do-We-Set-All-of-this-Up/secondary-token-flowchart-process-steps.jpg)

Once complete, your secondary cluster is fully synchronized and ready for disaster recovery.

---

## Further Reading

- [Vault DR Replication Documentation](https://www.vaultproject.io/docs/enterprise/replication/dr)
- [Mutual TLS in Vault](https://www.vaultproject.io/docs/concepts/tls)
- [Vault Enterprise Features](https://www.vaultproject.io/docs/enterprise)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cfd009a3-718e-46c1-b509-a1354fc1e2a6/lesson/ad6a1beb-6bd4-449e-8f38-021239754907)**
>
> Watch video content
