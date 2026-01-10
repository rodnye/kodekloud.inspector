# Demo HTTPS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/Demo-HTTPS)

---

## Table of Contents

- Demo HTTPS
  - 1. Simple HTTP → HTTPS Redirect
  - 2. HTTPS Reverse Proxy to Apache Backends
  - Configuration Reference
  - Links and References
  - Watch Video
  - Practice Lab
    - 1.1 Open Port 443 in the Firewall
    - 1.2 Switch from HTTP-Only to HTTPS
    - 1.3 Generate a Test SSL Certificate with mkcert
    - 2.1 Configure Nginx Upstream and proxy_pass
    - 2.2 Configure Apache Backends

---

## Content

Nginx For Beginners

Security

# Demo HTTPS

In this guide, you’ll learn how to:

1.  Redirect all HTTP traffic to HTTPS using Nginx.
2.  Generate a local SSL certificate for testing.
3.  Configure Nginx as an HTTPS reverse proxy forwarding encrypted requests to Apache backends on port 443.

![The image illustrates a network architecture with users connecting through a network cloud to an NGINX reverse proxy, which then routes traffic to Apache web servers on port 443.](https://kodekloud.com/kk-media/image/upload/v1752882460/notes-assets/images/Nginx-For-Beginners-Demo-HTTPS/network-architecture-nginx-apache-diagram.jpg)

---

## 1\. Simple HTTP → HTTPS Redirect

### 1.1 Open Port 443 in the Firewall

Verify that TCP port 443 is allowed through UFW:

```
# Check current UFW status
sudo ufw status


# If 443/tcp is not listed, enable it:
sudo ufw allow 443/tcp
```

### 1.2 Switch from HTTP-Only to HTTPS

Remove the old HTTP site and enable the HTTPS configuration:

```
# Disable HTTP site
sudo rm /etc/nginx/sites-enabled/example-http


# List available site configs
ls -l /etc/nginx/sites-available
# Edit the HTTPS site template
sudo vim /etc/nginx/sites-available/example-https
```

Add the following to `example-https`:

```
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}


server {
    listen 443 ssl;
    server_name example.com;


    ssl_certificate     /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/certs/example.com-key.pem;


    root /var/www/html;
    index index.html index.htm;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable the site and test Nginx:

```
sudo ln -s /etc/nginx/sites-available/example-https /etc/nginx/sites-enabled/
sudo nginx -t
```

> [!important]
> **Certificates Not Found Yet**
>
> Nginx will report missing certificate files until you generate them in the next step.

### 1.3 Generate a Test SSL Certificate with mkcert

We’ll use [mkcert](https://github.com/FiloSottile/mkcert) to create a local CA and certificate:

```
cd /etc/ssl/certs
sudo mkcert example.com
```

Sample output:

```
Created a new local CA 🏴
Note: the local CA is not installed in the system trust store. Run "mkcert -install" to trust it automatically.
Created a certificate valid for:
 - "example.com"
The certificate is at "./example.com.pem"
The key is at "./example.com-key.pem"
```

Reload Nginx with the new certificates:

```
sudo nginx -t
sudo nginx -s reload
```

Now visit:  
https://example.com

![The image shows a terminal interface for an NGINX lab setup, with instructions on accessing the NGINX UI and a pop-up window prompting for a port number to view a service.](https://kodekloud.com/kk-media/image/upload/v1752882463/notes-assets/images/Nginx-For-Beginners-Demo-HTTPS/nginx-lab-setup-terminal-interface.jpg)

---

## 2\. HTTPS Reverse Proxy to Apache Backends

### 2.1 Configure Nginx Upstream and proxy_pass

Edit `/etc/nginx/sites-available/example-https` to add an `upstream` block:

```
# Upstream Apache backends on port 443
upstream example {
    server 192.230.210.3:443;
    server 192.230.210.6:443;
}


# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}


# HTTPS listener forwarding to upstream
server {
    listen 443 ssl;
    server_name example.com;


    ssl_certificate     /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/certs/example.com-key.pem;


    root /var/www/html;
    index index.html index.htm;


    location / {
        proxy_pass https://example;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Test and reload:

```
sudo nginx -t
sudo nginx -s reload
```

### 2.2 Configure Apache Backends

On each Apache node:

1.  Allow HTTPS in the firewall:  
    `sudo ufw allow 443/tcp`
2.  Create `/etc/apache2/sites-available/example.conf`:

```
<VirtualHost *:80>
    ServerName example.com
    Redirect permanent / https://%{HTTP_HOST}%{REQUEST_URI}
</VirtualHost>


<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/html


    SSLEngine on
    SSLCertificateFile    /etc/ssl/certs/example.com.pem
    SSLCertificateKeyFile /etc/ssl/certs/example.com-key.pem


    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

3.  Enable the site and reload Apache:

```
sudo a2ensite example.conf
sudo systemctl reload apache2
```

Now, https://example.com → Nginx → one of your Apache backends over HTTPS.

---

## Configuration Reference

| File                                      | Purpose                                         |
| ----------------------------------------- | ----------------------------------------------- |
| /etc/nginx/sites-available/example-https  | Nginx HTTP→HTTPS redirect & HTTPS reverse proxy |
| /etc/apache2/sites-available/example.conf | Apache vhosts for HTTP and HTTPS                |

---

## Links and References

- [mkcert GitHub Repository](https://github.com/FiloSottile/mkcert)
- [Nginx SSL Module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)
- [Apache SSL/TLS Encryption](https://httpd.apache.org/docs/2.4/ssl/)
- [Flask Documentation](https://flask.palletsprojects.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/af1b832f-e266-40ac-b2f3-86945bc5805b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/64f0226a-545c-4456-b704-e4ee931b410f)**
>
> Practice lab
