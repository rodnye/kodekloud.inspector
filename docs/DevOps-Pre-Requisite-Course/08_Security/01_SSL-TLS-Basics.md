# SSL TLS Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Security/SSL-TLS-Basics)

---

## Table of Contents

- SSL TLS Basics
  - Securing SSH Access with Key Pairs
  - Securing HTTPS with a Combination of Asymmetric and Symmetric Encryption
  - Preventing Impersonation with Digital Certificates
  - Obtaining a Certificate from a Certificate Authority
  - Summary of the SSL/TLS Process
  - A Note on Key Usage and Naming Conventions
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Security

# SSL TLS Basics

Welcome to this comprehensive lesson on SSL/TLS certificates. In this guide, you will learn the fundamentals of TLS certificates, why they are essential for secure communications, and how to configure them to protect SSH and web servers. A certificate establishes a secure trust relationship between two parties during a transaction. For instance, when a user visits a web server, a TLS certificate ensures that the communication is encrypted and verifies that the server is authentic.

![A diagram showing a user, a certificate, and a server connected by arrows, symbolizing secure communication or authentication.](https://kodekloud.com/kk-media/image/upload/v1752873510/notes-assets/images/DevOps-Pre-Requisite-Course-SSL-TLS-Basics/frame_30.jpg)

Imagine a scenario without secure connectivity. If you access your online banking application without encryption, your credentials are transmitted in plain text. A hacker could then intercept this data, leading to serious compromises of your bank account. To prevent such scenarios, data is encrypted with encryption keys that transform readable information into an unreadable format. However, symmetric encryption—where both sender and receiver use the same key—introduces the risk of key interception during transmission.

> [!important]
> **Asymmetric Encryption Advantage**
>
> Asymmetric encryption uses a pair of keys—a private key and a public key. When data is encrypted with the public key, only the corresponding private key can decrypt it, enhancing security over symmetric encryption.

![The image illustrates asymmetric encryption, featuring a private key and a public key, represented by a key and a padlock icon, respectively.](https://kodekloud.com/kk-media/image/upload/v1752873512/notes-assets/images/DevOps-Pre-Requisite-Course-SSL-TLS-Basics/frame_150.jpg)

In practice, your private key remains securely stored on your device, while the public key can be shared openly. Only the corresponding private key can unlock messages encrypted with the public key.

![The image illustrates asymmetric encryption, showing a private key, a public lock, and encrypted data.](https://kodekloud.com/kk-media/image/upload/v1752873513/notes-assets/images/DevOps-Pre-Requisite-Course-SSL-TLS-Basics/frame_180.jpg)

## Securing SSH Access with Key Pairs

A common use case of asymmetric encryption is the secure access to servers via SSH. Instead of using passwords—which can be easily compromised—SSH key pairs provide a more secure authentication method.

1.  Generate a key pair using the SSH keygen command. This command creates two files: `id_rsa` for the private key and `id_rsa.pub` for the public key.

    ```
    ssh-keygen
    # This generates id_rsa (private key) and id_rsa.pub (public key)
    ```

2.  Configure your server to allow only key-based authentication by adding your public key to the server's `~/.ssh/authorized_keys` file. When initiating an SSH connection, specify your private key's location:

    ```
    ssh -i id_rsa user1@server1
    # Expected output: Successfully Logged In!
    ```

3.  For multiple servers, copy your public key into each server's `authorized_keys` file. Similarly, if additional users require access, they should generate their own key pairs and have their public keys added by the server administrator.

For example, viewing multiple authorized keys on a server might appear as follows:

```
cat ~/.ssh/authorized_keys
# Example output:
# ssh-rsa AAAAB3NzaC1yc...KhtUBfotzlBqRV1NThv0o4opzEwRq01lmWx user1
# ssh-rsa AAAXCVJSDFF...SLKJSDLKFw23423xckjSDFDLKJLSDFKJlX user2
```

## Securing HTTPS with a Combination of Asymmetric and Symmetric Encryption

Securing web server communications poses a challenge with symmetric encryption because the encryption key must be shared between the client and server, risking exposure to interception. Asymmetric encryption is used in combination with symmetric encryption to securely exchange keys.

The process operates as follows:

1.  **Key Generation:**  
    The server creates an asymmetric key pair (private and public keys) using a tool like OpenSSL. For example:

    ```
    openssl genrsa -out my-bank.key 1024
    openssl rsa -in my-bank.key -pubout > mybank.pem
    ```

2.  **Certificate Exchange:**  
    When a user connects via HTTPS, the server sends its public key, usually embedded in a digital certificate, to the client. Even if intercepted, the public key cannot be used to decrypt the symmetric key encrypted by the client.
3.  **Symmetric Key Exchange:**  
    The user's browser generates a symmetric key, encrypts it with the server's public key, and sends it back. The server then decrypts this message using its private key to retrieve the symmetric key. All subsequent communications are encrypted using this symmetric key.

This dual use of asymmetric and symmetric encryption ensures a secure key exchange and robust data protection.

## Preventing Impersonation with Digital Certificates

An attack vector to be aware of involves hackers creating fake websites to impersonate legitimate institutions like banks. An attacker can generate their own keys and a fake certificate to lure users into giving up sensitive credentials. To counteract this risk, servers send digital certificates during an HTTPS handshake. These certificates include the public key and vital identification information such as the domain name and issuer details.

Consider this example certificate snippet:

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
      DNS:my-bank.com, DNS:i-bank.com, DNS:we-bank.com,
    Subject Public Key Info:
      00:b9:b0:55:24:fb:a4:ef:77:73:7c:9b
```

The "Subject" field is critical as it specifies the identity to which the certificate is issued. Additional fields like Subject Alternative Name allow flexibility if the website is accessible through multiple domain names.

> [!important]
> **Self-Signed Certificates**
>
> Browsers flag self-signed certificates, which are signed by their own creator, as untrustworthy. Always obtain a certificate from a trusted Certificate Authority (CA) to ensure browser compatibility and end-user security.

Browsers rely on built-in validation mechanisms that confirm a certificate is signed by a trusted CA. Certificates signed by recognized CAs such as Symantec, DigiCert, Comodo, or GlobalSign are automatically trusted because their public keys are pre-installed in browsers.

![The image illustrates online banking security, showing a certificate authority, a secure website, and a digital certificate for "my-bank.com."](https://kodekloud.com/kk-media/image/upload/v1752873515/notes-assets/images/DevOps-Pre-Requisite-Course-SSL-TLS-Basics/frame_840.jpg)

## Obtaining a Certificate from a Certificate Authority

To secure your web server with a trusted certificate, follow these steps:

1.  **Generate a Certificate Signing Request (CSR):**  
    Use OpenSSL along with your private key and domain name:

    ```
    openssl req -new -key my-bank.key -out my-bank.csr \
    -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"
    ```

2.  **Submit the CSR to a CA:**  
    After verification, the CA signs your certificate and returns it. The certificate is then trusted by web browsers as it can be validated using the CA's pre-installed public key.

## Summary of the SSL/TLS Process

| Step | Description                                      | Example/Command                                                                                       |
| ---- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 1    | Secure SSH access using key pairs                | `ssh-keygen`                                                                                          |
| 2    | Configure servers with public keys               | Add key to `~/.ssh/authorized_keys`                                                                   |
| 3    | Generate CSR for HTTPS encryption                | `openssl req -new -key my-bank.key -out my-bank.csr -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"` |
| 4    | Certificate issuance by trusted CA               | Certificate signed by CA                                                                              |
| 5    | Establish HTTPS session                          | Browser verifies certificate and encrypts symmetric key                                               |
| 6    | Ongoing communication secured with symmetric key | Secure symmetric encryption session                                                                   |

The process involves:

- Using key pairs to secure SSH and HTTPS.
- Generating a CSR and obtaining a trusted certificate.
- The browser verifying the certificate using the CA's public key.
- Exchanging a symmetric key for further communication encryption.

Client certificates are also available for authenticating users. In this approach, clients generate their own key pairs and receive a signed certificate from a trusted CA to securely authenticate to a server.

## A Note on Key Usage and Naming Conventions

Remember the simple analogy: a private key is kept secret like a personal key, while a public key is shared openly like a lock. Although both keys can encrypt data, only the corresponding opposite key can decrypt it. For example, encryption with your private key allows anyone with your public key to decrypt the message, which is why private keys must remain confidential.

Common file extensions help differentiate keys and certificates:

- Public key certificates often use extensions such as .crt or .pem (e.g., server.crt, server.pem).
- Private keys typically have extensions like .key or include “key” in the filename (e.g., server.key or server-dash-key.pem).

![The image illustrates the difference between public and private keys, showing file extensions and key representations for encryption purposes.](https://kodekloud.com/kk-media/image/upload/v1752873516/notes-assets/images/DevOps-Pre-Requisite-Course-SSL-TLS-Basics/frame_1180.jpg)

That concludes this lesson on SSL/TLS basics. By understanding the role of digital certificates, key pairs, and the underlying encryption techniques, you can establish secure communication channels for both SSH and HTTPS. Stay tuned for our next article where we'll dive deeper into advanced topics in secure communications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/078af284-cd5c-4557-81ee-73e680b8f300/lesson/a9b52f6d-c4e5-4440-9ec4-123d110efabc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/078af284-cd5c-4557-81ee-73e680b8f300/lesson/8d1bb779-6950-45f3-95cb-53dbec22885d)**
>
> Practice lab
