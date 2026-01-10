# Cryptography - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Controls-and-Security-Concepts/Cryptography)

---

## Table of Contents

- Cryptography
  - Public Key Infrastructure (PKI)
  - Encryption Methods
  - Digital Certificates
  - Watch Video

---

## Content

CompTIA Security+ Certification

Controls and Security Concepts

# Cryptography

In the final section of our discussion on Threats, Vulnerabilities, and Mitigations, we explore how cryptography can defend against security risks. Cryptography involves encoding and decoding data to protect its confidentiality and integrity. This article provides an in‐depth look at Public Key Infrastructure (PKI), encryption methods, digital certificates, and related cryptographic solutions.

## Public Key Infrastructure (PKI)

Public Key Infrastructure (PKI) is a cryptographic framework that establishes trust through encryption and digital signatures. It plays a crucial role in securing communications over public internet channels as well as within private networks.

To grasp how PKI operates, it is essential to understand the concept of asymmetric encryption, which secures data confidentiality by utilizing two distinct keys:

- **Public Key:** This key can be shared openly and is even available on the internet.
- **Private Key:** This key is kept exclusively by the owner and is never shared.

For instance, if someone wants to send data securely over the internet, they encrypt it using your Public Key. Only the corresponding Private Key—which only you possess—can decrypt the data.

However, if your Public Key is shared online, how can recipients verify its authenticity? That’s where certificate authorities (CAs) come into play. CAs are trusted entities that verify the identity of the key owner by digitally signing the Public Key with their own credentials. This process confirms that the key truly belongs to the claimed owner.

## Encryption Methods

Encryption is at the heart of cryptographic systems like PKI. There are two primary types of encryption:

1.  **Symmetric Encryption:** Uses the same key for both encryption and decryption.
2.  **Asymmetric Encryption:** Utilizes a pair of keys—one public and one private—for encryption and decryption.

Both methods safeguard data by transforming plaintext into an unusable form for unauthorized parties.

![The image illustrates the concept of encryption, showing symmetric and asymmetric encryption methods, with a diagram of key exchanges between two individuals, Bob and Alice.](https://kodekloud.com/kk-media/image/upload/v1752871993/notes-assets/images/CompTIA-Security-Certification-Cryptography/encryption-symmetric-asymmetric-diagram.jpg)

In the case of symmetric encryption, if Alice encrypts data and sends it to Bob, then Bob must use the same key for decryption. A significant challenge with symmetric encryption is the secure transmission of the key from sender to recipient.

![The image illustrates the concepts of symmetric and asymmetric encryption, showing a diagram with Bob and Alice exchanging private and public keys.](https://kodekloud.com/kk-media/image/upload/v1752871994/notes-assets/images/CompTIA-Security-Certification-Cryptography/symmetric-asymmetric-encryption-diagram.jpg)

Asymmetric encryption overcomes this key distribution challenge by employing two separate keys. The public key is distributed openly while the private key remains confidential, streamlining secure communication.

## Digital Certificates

A digital certificate functions as a secure wrapper for a public key. It contains the public key along with information about its issuer, and it is digitally signed by a certificate authority. This signature validates the certificate and attests to the public key's trustworthiness.

> [!important]
> **Note**
>
> Understanding digital certificates is critical for ensuring the authenticity of public keys and maintaining secure communications.

This comprehensive overview covers essential cryptographic concepts including PKI, encryption methods, and digital certificates. Mastering these elements is fundamental for implementing secure communications and safeguarding data integrity across various network environments.

For further reading and advanced topics on cryptography, explore additional resources and technical documentation on cybersecurity best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/1846e159-7ab4-46d3-be5d-95c1a0eb51b9/lesson/35a1a25d-304e-4f5e-b103-cd4b8b3e6b82)**
>
> Watch video content
