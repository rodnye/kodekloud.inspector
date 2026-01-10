# Security Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/Security-Introduction)

---

## Table of Contents

- Security Introduction
  - 1. Enabling HTTPS with Self-Signed Certificates
  - 2. How TLS Protects Data in Transit
  - 3. Secure HTTP Response Headers
  - 4. Protecting Endpoints with Basic Authentication
  - 5. Allowing, Denying, and Automating Bans with fail2ban
  - Links and References
  - Watch Video

---

## Content

Nginx For Beginners

Security

# Security Introduction

In this lesson, we’ll focus on securing your web applications end-to-end. You’ll learn how to:

1.  Enable HTTPS using TLS certificates
2.  Understand TLS protocols and data encryption
3.  Implement secure HTTP response headers
4.  Protect resources with Nginx Basic Authentication
5.  Control access and integrate fail2ban for automated bans

![The image lists three objectives related to web security: understanding the importance of HTTPS, exploring SSL/TLS protocols, and learning about HTTP headers and their applications.](https://kodekloud.com/kk-media/image/upload/v1752882485/notes-assets/images/Nginx-For-Beginners-Security-Introduction/web-security-objectives-https-ssl-tls.jpg)

---

## 1\. Enabling HTTPS with Self-Signed Certificates

To get HTTPS running locally, we’ll use [mkcert](https://github.com/FiloSottile/mkcert) for generating a trusted, self-signed certificate without needing a public domain.

> [!important]
> **Note**
>
> mkcert is perfect for development and testing environments because it automatically adds the generated CA to your local trust store. For production, switch to automated certificates from [Let’s Encrypt](https://letsencrypt.org/) using [Certbot](https://certbot.eff.org/).

```
# Install mkcert (macOS example)
brew install mkcert nss


# Create a local CA
mkcert -install


# Generate a cert for localhost
mkcert localhost 127.0.0.1 ::1


# You’ll get files: localhost.pem (cert) and localhost-key.pem (key)
```

Next, configure Nginx to use these files:

```
server {
    listen       443 ssl;
    server_name  localhost;


    ssl_certificate     /path/to/localhost.pem;
    ssl_certificate_key /path/to/localhost-key.pem;


    location / {
        root   html;
        index  index.html index.htm;
    }
}
```

---

## 2\. How TLS Protects Data in Transit

TLS ensures data integrity and confidentiality with:

| Feature            | Description                                   |
| ------------------ | --------------------------------------------- |
| Encryption         | Encrypts payload to prevent eavesdropping     |
| Authentication     | Verifies server identity via certificates     |
| Integrity Checking | Detects tampering with message authentication |

---

## 3\. Secure HTTP Response Headers

Adding HTTP headers can mitigate common web attacks. Configure these in your Nginx `server` block:

| Header                  | Purpose                         | Example Value                |
| ----------------------- | ------------------------------- | ---------------------------- |
| Content-Security-Policy | Prevents XSS and data injection | `default-src 'self';`        |
| X-Frame-Options         | Stops clickjacking              | `DENY`                       |
| X-Content-Type-Options  | Disallows MIME-type sniffing    | `nosniff`                    |
| Referrer-Policy         | Controls referral information   | `no-referrer-when-downgrade` |

```
add_header Content-Security-Policy "default-src 'self';" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## 4\. Protecting Endpoints with Basic Authentication

Nginx’s `auth_basic` module offers a simple user/password prompt for selected locations.

```
# Install apache2-utils for htpasswd
sudo apt-get install apache2-utils


# Create credentials file
htpasswd -c /etc/nginx/.htpasswd user1
```

```
server {
    listen 80;
    server_name example.com;


    location /secure {
        auth_basic           "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

> [!important]
> **Warning**
>
> Basic authentication uses a flat file for credentials and should only be used for low-risk or internal applications. Consider OAuth or LDAP for stronger authentication mechanisms.

---

## 5\. Allowing, Denying, and Automating Bans with fail2ban

Control access with `allow` and `deny` directives, then integrate [fail2ban](https://www.fail2ban.org/) to automatically block repeated offenders:

```
server {
    listen 80;
    server_name example.com;


    # Allow only internal network
    allow 10.0.0.0/24;
    deny all;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

![The image lists two objectives: protecting a website with basic authentication and blocking potentially harmful traffic. It features a gradient background with numbered points.](https://kodekloud.com/kk-media/image/upload/v1752882486/notes-assets/images/Nginx-For-Beginners-Security-Introduction/website-protection-objectives-gradient.jpg)

Finally, configure fail2ban’s Nginx filter and jail:

```
# /etc/fail2ban/jail.local
[nginx-http-auth]
enabled = true
filter  = nginx-http-auth
port    = http,https
logpath = /var/log/nginx/*error*.log
maxretry = 3
```

---

Let’s get started with HTTPS configuration in the next section.

## Links and References

- [mkcert GitHub Repository](https://github.com/FiloSottile/mkcert)
- [Let’s Encrypt](https://letsencrypt.org/)
- [Certbot — EFF](https://certbot.eff.org/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [fail2ban Official Site](https://www.fail2ban.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/f7f66739-dcb8-4386-976f-30308b76016c)**
>
> Watch video content
