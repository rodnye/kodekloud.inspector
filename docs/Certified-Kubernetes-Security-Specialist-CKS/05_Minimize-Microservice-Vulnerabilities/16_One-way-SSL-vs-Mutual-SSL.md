# One way SSL vs Mutual SSL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/One-way-SSL-vs-Mutual-SSL)

---

## Table of Contents

- One way SSL vs Mutual SSL
  - One-way SSL
  - Mutual TLS (mTLS)
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# One way SSL vs Mutual SSL

In this article, we explore the basics of mTLS (mutual TLS) and compare it with one-way SSL. We dive into how TLS encrypts traffic between systems, explains the process of creating and using SSL certificates, and highlights their importance in securing web servers and SSH, among other applications. For example, when a customer accesses online banking without encryption, an attacker could intercept network traffic to obtain sensitive credentials. However, by leveraging TLS certificates, a secure HTTPS connection is established, protecting user data.

## One-way SSL

When a client connects to a bank’s website using one-way SSL:

1.  The client receives the bank’s public certificate.
2.  The web browser verifies the certificate by ensuring the certificate authority (CA) that signed it is trusted. Browsers maintain a trust store with trusted CA public keys.
3.  The browser then uses the bank’s public certificate to encrypt a symmetric key, which is sent securely to the bank.
4.  The bank decrypts the symmetric key using its private key.

This process uses asymmetric encryption initially to securely share a symmetric key. Once the symmetric key is established, both the client and the bank use it to encrypt and decrypt the data exchanged in their communication. In one-way SSL, only the client verifies the server’s certificate. The bank does not authenticate the client certificate; it instead relies on additional credentials (such as username, password, or client number) to confirm the user's identity.

> [!important]
> **Note**
>
> One-way SSL is widely used for internet-based services like email accounts, social media, and online banking where verifying the server's authenticity is the primary concern.

## Mutual TLS (mTLS)

Consider a scenario where no human user is entering credentials—imagine two organizations exchanging confidential information. For instance, suppose mybank.com (acting as a client) needs to retrieve data from the server abc-financials. In this case, it is essential for the server to verify that the request comes from the legitimate mybank.com. This is where mutual TLS comes into play.

When using mTLS, both parties authenticate each other. Here is how the process works when mybank.com (client) requests data from abc-financials (server):

1.  The client requests the server’s public certificate.
2.  The server responds with its public certificate and simultaneously requests the client’s certificate.
3.  The client verifies the server’s certificate using the CA’s public keys from its trust store.
4.  After successful verification, the client sends its certificate to the server along with a symmetric key encrypted with the server’s public key.
5.  The server validates the client’s certificate using the CA to ensure it belongs to mybank.com.

Once both parties have mutually authenticated, they use the shared symmetric key to encrypt all subsequent communications, ensuring that data exchange remains secure.

> [!important]
> **Note**
>
> Mutual TLS is especially beneficial in scenarios where automated systems or organizations need to exchange data securely, as it provides strong authentication on both ends.

## Summary

The following table summarizes the key differences between one-way SSL and mutual TLS:

| Feature                  | One-way SSL                                                     | Mutual TLS                                                  |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------- |
| Certificate verification | Only the server's certificate is verified by the client         | Both client and server certificates are verified            |
| Typical use cases        | Web services (online banking, email, social media)              | Automated system-to-system communication (B2B data sharing) |
| Security level           | Secure communication; user authentication is handled separately | Enhanced security with mutual authentication                |

This concludes our exploration of one-way SSL and mutual TLS. For further reading on securing pod-to-pod communications in Kubernetes clusters and implementing mTLS, consider the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/e186af38-c267-427e-a3ae-cd849fb451aa)**
>
> Watch video content
