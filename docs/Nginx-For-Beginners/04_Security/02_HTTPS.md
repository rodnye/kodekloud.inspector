# HTTPS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/HTTPS)

---

## Table of Contents

- HTTPS
  - Why HTTPS Matters
  - SSL and TLS Protocols
  - How TLS Works: A Checkout Example
  - Asymmetric Encryption Explained
  - Obtaining TLS Certificates
  - Configuring Nginx for HTTPS
  - Links and References
  - Watch Video
    - 1. Security
    - 2. SEO Benefits
    - SSL vs TLS: A Quick Comparison
    - 1. Let’s Encrypt + Certbot
    - 2. mkcert (Self-Signed for Local Testing)

---

## Content

Nginx For Beginners

Security

# HTTPS

In this article, we’ll dive into HTTPS—what it is, why it matters, and how to implement it to secure your website and boost SEO.

## Why HTTPS Matters

### 1\. Security

When you access a website via HTTPS, all communication between your browser and the server is encrypted. On an unencrypted connection (HTTP), anyone on the same network—such as a coffee shop Wi-Fi—could intercept your passwords, credit-card numbers, or personal details.

![The image illustrates the importance of HTTPS for security, showing people using laptops in a coffee shop with a visible Wi-Fi symbol.](https://kodekloud.com/kk-media/image/upload/v1752882473/notes-assets/images/Nginx-For-Beginners-HTTPS/https-security-coffee-shop-laptops.jpg)

With HTTP, data is sent in plain text. An attacker can easily read it.  
With HTTPS, intercepted data is encrypted and unreadable.

![The image illustrates the importance of HTTPS for security, showing people using laptops in a coffee shop with a Wi-Fi symbol, emphasizing secure connections.](https://kodekloud.com/kk-media/image/upload/v1752882474/notes-assets/images/Nginx-For-Beginners-HTTPS/https-security-coffee-shop-laptops-2.jpg)

### 2\. SEO Benefits

Search engines like Google prioritize secure sites in search rankings. Enabling HTTPS not only protects user data but also improves your site’s visibility and trustworthiness.

![The image highlights the importance of HTTPS, emphasizing its SEO benefits, protection of customer data, and enhancement of search engine visibility.](https://kodekloud.com/kk-media/image/upload/v1752882474/notes-assets/images/Nginx-For-Beginners-HTTPS/https-seo-benefits-customer-data.jpg)

## SSL and TLS Protocols

SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols that secure data in transit. Although we still colloquially call them “SSL certificates,” modern sites use TLS under the hood.

![The image illustrates the concept of SSL and TLS protocols ensuring privacy and integrity between a browser and a web server, with icons representing each.](https://kodekloud.com/kk-media/image/upload/v1752882476/notes-assets/images/Nginx-For-Beginners-HTTPS/ssl-tls-privacy-integrity-diagram.jpg)

### SSL vs TLS: A Quick Comparison

| Protocol | Status      | Typical Use Case              |
| -------- | ----------- | ----------------------------- |
| SSL      | Deprecated  | Legacy or unsupported systems |
| TLS 1.2  | Widely Used | Production environments       |
| TLS 1.3  | Recommended | Best performance and security |

## How TLS Works: A Checkout Example

Imagine you’re on an e-commerce checkout page and submit your name, address, and credit-card details. TLS protects this process in four steps:

1.  **Connection Initiation**  
    Your browser connects to the server over HTTPS.

    ![The image illustrates a connection between a user's browser and a store's web server, highlighting a payment form with fields for a credit card number and address. It is part of a diagram explaining SSL and TLS.](https://kodekloud.com/kk-media/image/upload/v1752882476/notes-assets/images/Nginx-For-Beginners-HTTPS/ssl-tls-browser-server-diagram.jpg)

2.  **Certificate Exchange**  
    The server responds by sending its TLS certificate, which includes its public key and identity details.

    ![The image illustrates a process where a server responds by sending its SSL/TLS certificate during a payment transaction, involving a user and a store's web server.](https://kodekloud.com/kk-media/image/upload/v1752882478/notes-assets/images/Nginx-For-Beginners-HTTPS/ssl-tls-certificate-payment-process.jpg)

3.  **Certificate Authority (CA)**  
    A trusted CA—like Let’s Encrypt, DigiCert, or Comodo—verifies the domain owner and signs the certificate.

    ![The image illustrates the concept of a Certificate Authority, showing a building and person linked to a digital certificate containing user, company, and website information.](https://kodekloud.com/kk-media/image/upload/v1752882478/notes-assets/images/Nginx-For-Beginners-HTTPS/certificate-authority-concept-illustration.jpg)

4.  **Domain Verification**  
    Your browser checks that the certificate matches the domain (e.g., `https://onlinestore.com`), ensuring you’re communicating with the real site.

    ![The image illustrates the concept of SSL certificates, showing a browser window with a URL and a certificate icon, emphasizing that a certificate verifies domain ownership.](https://kodekloud.com/kk-media/image/upload/v1752882480/notes-assets/images/Nginx-For-Beginners-HTTPS/ssl-certificates-browser-verification.jpg)

## Asymmetric Encryption Explained

TLS employs asymmetric encryption (public-key cryptography), similar to SSH. A public key encrypts data, and only the corresponding private key can decrypt it.

![The image illustrates the concept of asymmetric encryption, showing a pair of keys labeled as "Public Key" and "Private Key."](https://kodekloud.com/kk-media/image/upload/v1752882481/notes-assets/images/Nginx-For-Beginners-HTTPS/asymmetric-encryption-key-pair.jpg)

1.  The server publishes its public key (an “open padlock”) to your browser.
2.  Your browser encrypts sensitive data—like credit-card details—using that public key.

![The image illustrates a public key encryption process, showing a web server providing a public key to a browser, which then encrypts the data being sent.](https://kodekloud.com/kk-media/image/upload/v1752882482/notes-assets/images/Nginx-For-Beginners-HTTPS/public-key-encryption-process-diagram.jpg)

3.  The server applies its private key to decrypt the data, keeping it secure even if intercepted.

![The image illustrates how encryption keys work in practice, showing the process of encrypting data in a browser, sending it to a server, decrypting it, and processing a payment.](https://kodekloud.com/kk-media/image/upload/v1752882483/notes-assets/images/Nginx-For-Beginners-HTTPS/encryption-keys-data-process-diagram.jpg)

## Obtaining TLS Certificates

Choose a tool and provider based on your environment:

| Tool    | Provider      | Best For                         |
| ------- | ------------- | -------------------------------- |
| Certbot | Let’s Encrypt | Free, automated production certs |
| mkcert  | Self-signed   | Local development and testing    |

### 1\. Let’s Encrypt + Certbot

Certbot is an ACME client that automates issuance and renewal of free TLS certificates from Let’s Encrypt.

```
sudo apt update
sudo apt install certbot


sudo certbot certonly \
  --standalone \
  --preferred-challenges http \
  -d example.com \
  -d www.example.com
```

> [!important]
> **Note**
>
> Certbot creates a daily cron job for automatic renewal. Ensure ports 80 and 443 are available.

Certificates are saved at:

- `/etc/letsencrypt/live/example.com/fullchain.pem`
- `/etc/letsencrypt/live/example.com/privkey.pem`

### 2\. mkcert (Self-Signed for Local Testing)

mkcert sets up a local CA and issues certificates trusted by your development machine. Not suitable for production.

```
sudo apt update
sudo apt install mkcert


# Change to your certificates directory
cd /etc/ssl/private


# Install mkcert’s local CA
mkcert --install


# Generate a wildcard certificate for *.example.com
mkcert *.example.com
```

> [!important]
> **Warning**
>
> Self-signed certificates from `mkcert` won’t be trusted by remote browsers or services. Use only for local development.

![The image highlights Let's Encrypt as a reputable Certificate Authority that offers free TLS certificates.](https://kodekloud.com/kk-media/image/upload/v1752882484/notes-assets/images/Nginx-For-Beginners-HTTPS/lets-encrypt-free-tls-certificates.jpg)

## Configuring Nginx for HTTPS

Once you have your certificate and private key, update your Nginx server block to listen on port 443:

```
server {
    listen 443 ssl;
    server_name honda.cars.com;


    ssl_certificate     /etc/ssl/certs/honda.cars.com.pem;
    ssl_certificate_key /etc/ssl/certs/honda.cars.com-key.pem;


    root  /var/www/honda.cars.com/html;
    index index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Reload Nginx and verify your site at `https://honda.cars.com`.

## Links and References

- [HTTPS on Wikipedia](https://en.wikipedia.org/wiki/HTTPS)
- [TLS on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)
- [SSL on Wikipedia](https://en.wikipedia.org/wiki/Secure_Sockets_Layer)
- [Let’s Encrypt](https://letsencrypt.org)
- [Certbot](https://certbot.eff.org)
- [mkcert](https://mkcert.dev)
- [Nginx](https://nginx.org)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/a4af90be-9d47-4d0b-a285-bec7a50ef02a)**
>
> Watch video content
