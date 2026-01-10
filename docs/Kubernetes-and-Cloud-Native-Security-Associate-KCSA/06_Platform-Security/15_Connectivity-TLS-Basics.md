# Connectivity TLS Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Connectivity-TLS-Basics)

---

## Table of Contents

- Connectivity TLS Basics
  - Introduction to SSL/TLS Certificates
  - Symmetric vs. Asymmetric Encryption
  - Securing SSH Access with Key Pairs
  - HTTPS Key Exchange Process
  - Digital Certificates and Trust
  - Browser Trust Chain
  - Summary
  - Mutual TLS (mTLS)
  - Key–Lock Analogy Clarification
  - Naming Conventions
  - References
  - Watch Video
    - Symmetric Encryption
    - Asymmetric Encryption

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Connectivity TLS Basics

## Introduction to SSL/TLS Certificates

Secure Sockets Layer (SSL) and Transport Layer Security (TLS) certificates establish trust and encrypt data between clients and servers. Without them, sensitive information—such as banking credentials—travels in plaintext and can be intercepted.

![The image shows a diagram of online banking with a user icon, login credentials, a URL, and a server icon, illustrating a connection to a bank's website.](https://kodekloud.com/kk-media/image/upload/v1752880877/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Connectivity-TLS-Basics/online-banking-diagram-user-server.jpg)

## Symmetric vs. Asymmetric Encryption

### Symmetric Encryption

Symmetric encryption uses a single secret key for both encryption and decryption. While efficient, distributing the shared key securely is challenging—if the key is intercepted, the data is compromised.

![The image shows a green key icon next to the text "SYMMETRIC ENCRYPTION" inside a green-bordered rectangle.](https://kodekloud.com/kk-media/image/upload/v1752880879/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Connectivity-TLS-Basics/symmetric-encryption-green-key-icon.jpg)

### Asymmetric Encryption

Asymmetric encryption solves the key-distribution problem by using a key pair:

- **Private Key**: Kept secret by the owner.
- **Public Key (Lock)**: Distributed openly.

Data encrypted with the public key can only be decrypted by the corresponding private key.

![The image illustrates asymmetric encryption, featuring a green key labeled "Private Key" and a green lock labeled "Public Lock."](https://kodekloud.com/kk-media/image/upload/v1752880879/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Connectivity-TLS-Basics/asymmetric-encryption-private-key-public-lock.jpg)

| Encryption Type | Key(s)                        | Use Case                              |
| --------------- | ----------------------------- | ------------------------------------- |
| Symmetric       | Single shared secret          | Bulk data transfer (e.g., HTTPS bulk) |
| Asymmetric      | Public key + Private key pair | Key exchange, digital signatures      |

## Securing SSH Access with Key Pairs

SSH replaces password logins with an asymmetric key pair:

```
ssh-keygen
# id_rsa     -> private key (keep secure)
# id_rsa.pub -> public key (place on server)
```

On each target server, append the public key to `~/.ssh/authorized_keys`:

```
cat ~/.ssh/authorized_keys
# ssh-rsa AAAAB3NzaC...KhtUBfoTzlBqRV1NThvOo4opzEwRQo1mWx user1
```

Connect using your private key:

```
ssh -i ~/.ssh/id_rsa user1@server1
# Successfully Logged In!
```

To grant access on multiple servers, copy your public key to each server’s `authorized_keys`. To onboard other users, they generate their own key pairs and provide you with their `.pub` file.

> [!important]
> **Note**
>
> Keep your private key (`id_rsa`) out of version control and never share it. If compromised, revoke and generate a new key pair.

## HTTPS Key Exchange Process

Web servers combine asymmetric and symmetric encryption to optimize performance:

1.  Server generates an RSA key pair.
2.  Client (browser) downloads the server’s public key.
3.  Browser generates a random symmetric session key.
4.  Browser encrypts the session key with the server’s public key.
5.  Server decrypts the session key using its private key.
6.  Both sides use the symmetric key for bulk data encryption.

Generate the server’s RSA pair with [OpenSSL](https://www.openssl.org/):

```
openssl genrsa -out my-bank.key 2048
openssl rsa -in my-bank.key -pubout > my-bank.pem
```

The public key (`my-bank.pem`) is served to clients; the private key (`my-bank.key`) remains secure on the server.

## Digital Certificates and Trust

A self-generated public key provides no identity proof. Digital certificates bind your public key to your domain, signed by a trusted Certificate Authority (CA).

```
Certificate:
    Data:
        Serial Number: 420327018966204255
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=kubernetes
        Validity
            Not After : Feb  9 13:41:28 2020 GMT
        Subject: CN=my-bank.com
        X509v3 Subject Alternative Name:
            DNS:mybank.com, DNS:i-bank.com,
            DNS:we-bank.com
        Subject Public Key Info:
            00:b9:b0:55:24:fb:a4:ef:77:73:7c:9b
```

Generate a Certificate Signing Request (CSR) and submit it to a CA, such as [DigiCert](https://www.digicert.com/) or [GlobalSign](https://www.globalsign.com/):

```
openssl req -new -key my-bank.key -out my-bank.csr \
  -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"
# my-bank.csr → send to CA for signing
```

![The image illustrates the process of obtaining a digital certificate from a Certificate Authority (CA), featuring logos of various CAs and a sample certificate for "MY-BANK.COM." It includes steps like Certificate Signing Request (CSR), information validation, and certificate signing.](https://kodekloud.com/kk-media/image/upload/v1752880880/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Connectivity-TLS-Basics/digital-certificate-process-ca-logos.jpg)

## Browser Trust Chain

Browsers ship with a root store of trusted CA public keys. When presented with your signed certificate, the browser:

1.  Verifies the CA signature using the trusted root key.
2.  Confirms the certificate’s validity period and domain match.
3.  Establishes a secure HTTPS session.

![The image shows a concept of online banking security with a browser displaying a secure website and a digital certificate issued to "my-bank.com" by a certificate authority.](https://kodekloud.com/kk-media/image/upload/v1752880881/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Connectivity-TLS-Basics/online-banking-security-digital-certificate.jpg)

> [!important]
> **Note**
>
> For internal applications, consider deploying your own private CA and distributing its root certificate to employee devices.

## Summary

- Symmetric encryption is fast but needs a secure key exchange.
- Asymmetric encryption uses public/private key pairs to exchange secrets safely.
- SSH relies on key pairs for authentication.
- HTTPS uses asymmetric encryption to bootstrap a symmetric session key.
- Digital certificates prove ownership of a public key, validated by CAs.
- Browsers trust certificates based on their embedded root CA list.
- Private CAs work well for internal service authentication.

## Mutual TLS (mTLS)

Mutual TLS adds client certificate authentication, requiring both server and client to present valid certificates during the TLS handshake. This strengthens security for APIs and inter-service communication.

## Key–Lock Analogy Clarification

Although we talk about a “lock” (public key) and a “key” (private key), either key can encrypt or decrypt. Encrypt with one; decrypt with the other. Private-key encryption is commonly used for digital signatures and identity verification.

## Naming Conventions

| File Type   | Extension    | Example      |
| ----------- | ------------ | ------------ |
| Public Cert | .crt or .pem | `server.crt` |
| Private Key | .key or .pem | `server.key` |

Always secure private keys and limit their filesystem permissions.

## References

- [OpenSSL Documentation](https://www.openssl.org/docs/)
- [DigiCert](https://www.digicert.com/)
- [GlobalSign](https://www.globalsign.com/)
- [Kubernetes Security](https://kubernetes.io/docs/concepts/security/overview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/dee32061-d4e1-4fc8-ba3b-c3630f294225)**
>
> Watch video content
