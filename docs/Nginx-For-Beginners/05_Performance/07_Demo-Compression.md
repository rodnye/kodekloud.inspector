# Demo Compression - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Demo-Compression)

---

## Table of Contents

- Demo Compression
  - 1. Prepare Large JPEG Files
  - 2. Monitor Apache Access Logs
  - 3. Test Without gzip Compression
  - 4. Enable gzip in Nginx
  - 5. Verify Compression Performance
  - 6. Complete Example: Nginx Server Block
  - 7. Further Reading: HTTP Headers
  - Watch Video
  - Practice Lab

---

## Content

Nginx For Beginners

Performance

# Demo Compression

Learn how to optimize your Nginx reverse proxy by enabling gzip compression. We’ll demonstrate loading large JPEG files before and after gzip, measure performance gains, and configure a complete server block with SSL, caching, rate limiting, and security headers.

![The image illustrates a reverse proxy setup using NGINX with compression, routing requests from various file types (CSS, HTML, XML, JS, JPG) to Apache web servers.](https://kodekloud.com/kk-media/image/upload/v1752882398/notes-assets/images/Nginx-For-Beginners-Demo-Compression/nginx-reverse-proxy-setup.jpg)

## 1\. Prepare Large JPEG Files

By default, JPEGs are already compressed and benefit little from gzip. For demo purposes, inflate them to 20 MB:

> [!important]
> **Note**
>
> Inflating JPEGs simulates slow-loading assets. In production, you typically gzip text-based resources only.

```
# Move into the images directory
cd /var/www/html/images/


# Check original file sizes
ls -lh *.jpg


# Inflate each file to 20 MB
for file in *.jpg; do
  fallocate -l 20M "$file"
done


# Confirm new sizes
ls -lh *.jpg
```

## 2\. Monitor Apache Access Logs

Keep an eye on incoming requests while you load resources:

```
tail -F /var/log/apache2/access.log
```

Load the site in your browser or via `curl` to see entries in real time.

## 3\. Test Without gzip Compression

Open your web page in Incognito or Private mode. In Chrome DevTools:

1.  Switch to the **Network** tab.
2.  Reload the page.
3.  Observe image requests taking 4–5 seconds each.

![The image shows a web browser displaying a site template called "Phantom" alongside the browser's developer tools, specifically the Network tab, which lists various resources and their details.](https://kodekloud.com/kk-media/image/upload/v1752882399/notes-assets/images/Nginx-For-Beginners-Demo-Compression/phantom-template-browser-devtools.jpg)

In Firefox’s network panel, note that the **Transfer Size** equals the full ~20 MB:

![The image shows a browser window displaying a "Generic Page" with the network tab of developer tools open, listing various resources loaded by the page.](https://kodekloud.com/kk-media/image/upload/v1752882400/notes-assets/images/Nginx-For-Beginners-Demo-Compression/browser-network-tab-generic-page.jpg)

## 4\. Enable gzip in Nginx

Edit `/etc/nginx/nginx.conf` (or your include file) to add gzip settings under the `http` block:

```
http {
    # ---------------------------
    # Gzip Compression Settings
    # ---------------------------
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript
        image/jpg
        image/jpeg
        font/ttf
        font/eot;
    # ... other HTTP-level settings ...
}
```

Test and apply the configuration:

```
nginx -t
systemctl restart nginx
```

> [!important]
> **Warning**
>
> Always test your configuration (`nginx -t`) before reloading Nginx to avoid downtime.

## 5\. Verify Compression Performance

Reload the page in Chrome DevTools → **Network** → **All**. You should see image loads in milliseconds:

![The image shows a web browser with a split view: on the left, a webpage titled "Phantom" with a site template description and colorful boxes; on the right, a network activity panel displaying various resources loaded by the page.](https://kodekloud.com/kk-media/image/upload/v1752882402/notes-assets/images/Nginx-For-Beginners-Demo-Compression/web-browser-split-view-phantom.jpg)

Click any resource and inspect the **Response Headers** for:

```
Content-Encoding: gzip
```

In Firefox, confirm that **Transfer Size** is significantly lower and load times drop to the low hundreds of milliseconds.

## 6\. Complete Example: Nginx Server Block

Below is a full Nginx configuration combining upstream proxy, SSL, security headers, gzip, caching, and rate limiting:

```
# Define backend servers
upstream example {
    server node01:443;
    server node02:443;
}


# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}


# Main HTTPS server
server {
    listen 443 ssl;
    server_name example.com;


    ssl_certificate     /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/certs/example.com-key.pem;


    root /var/www/html;
    index index.html index.htm;


    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Content-Security-Policy "default-src 'self'";
    add_header Referrer-Policy "origin";
    add_header Cache-Control "public, max-age=3600";


    # Rate limiting
    limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=1000r/m;
    limit_req_status 429;


    # Proxy cache configuration
    proxy_cache_path /var/lib/nginx/cache levels=1:2 keys_zone=app_cache:10m;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_cache_valid 200 302 10m;
    proxy_cache_valid 404 1m;


    # Gzip settings (same as above)
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript
        image/jpg
        image/jpeg
        font/ttf
        font/eot;


    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache     app_cache;
        proxy_pass      https://example;
    }


    location /admin {
        auth_basic           "Restricted Access";
        auth_basic_user_file /etc/nginx/conf.d/.htpasswd;
    }
}
```

## 7\. Further Reading: HTTP Headers

Deep dive into HTTP headers for security, caching, CORS, and more. Useful references:

- [HTTP Headers on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [Understanding gzip Compression](https://tools.ietf.org/html/rfc7231)

![The image shows a webpage from MDN Web Docs about HTTP headers, detailing their purpose and types. The page includes a sidebar with related topics and a main section explaining HTTP headers.](https://kodekloud.com/kk-media/image/upload/v1752882403/notes-assets/images/Nginx-For-Beginners-Demo-Compression/mdn-http-headers-webpage.jpg) ![The image shows a webpage from MDN Web Docs detailing HTTP headers, including sections on authentication, caching, and conditionals. The page includes a sidebar with links to related topics.](https://kodekloud.com/kk-media/image/upload/v1752882404/notes-assets/images/Nginx-For-Beginners-Demo-Compression/mdn-http-headers-documentation.jpg) ![The image shows a webpage from MDN Web Docs about CORS (Cross-Origin Resource Sharing), detailing various HTTP headers related to CORS. The page includes a sidebar with links to related topics.](https://kodekloud.com/kk-media/image/upload/v1752882405/notes-assets/images/Nginx-For-Beginners-Demo-Compression/mdn-web-docs-cors-http-headers.jpg) ![The image shows a webpage from MDN Web Docs about HTTP headers, specifically focusing on security-related headers. The page includes a list of topics on the left and a detailed explanation of various headers in the main content area.](https://kodekloud.com/kk-media/image/upload/v1752882409/notes-assets/images/Nginx-For-Beginners-Demo-Compression/http-headers-security-mdn-web-docs.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/ab86ef5a-e11e-439b-9dbe-6aa962facf7b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/a5e800f9-add5-4f9d-9970-e3d9dfed2b9e)**
>
> Practice lab
