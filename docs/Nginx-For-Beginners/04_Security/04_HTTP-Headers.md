# HTTP Headers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/HTTP-Headers)

---

## Table of Contents

- HTTP Headers
  - Request–Response Flow
  - Anatomy of an HTTP Header
  - Types of HTTP Headers
  - Security Headers
  - Authentication Headers
  - Caching Headers
  - CORS Headers
  - Proxy Headers
  - Custom Headers
  - Nginx Built-in Variables
  - Example Nginx Configuration
  - Links and References
  - Watch Video
    - General Headers
    - Request Headers
    - Response Headers

---

## Content

Nginx For Beginners

Security

# HTTP Headers

HTTP headers are metadata exchanged between a client (e.g., your browser) and a web server. Much like the information on an envelope, headers indicate how to process the payload and which instructions to follow.

## Request–Response Flow

When you navigate to a website:

1.  Your browser sends an HTTP request with **request headers** describing the desired resource.
2.  The server processes the request and replies with an HTTP response, including **response headers** that describe the returned content.

![The image illustrates the concept of HTTP headers, showing a computer sending a request to a server and receiving a response, with questions about website name, request origin, device/software, content type, and caching duration.](https://kodekloud.com/kk-media/image/upload/v1752882465/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/http-headers-request-response-diagram.jpg)

## Anatomy of an HTTP Header

Each header line follows the format `Key: Value`. For example:

```
GET / HTTP/2
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT) Firefox/103.0
Accept: text/html
Accept-Language: en-US
Connection: keep-alive
Cache-Control: no-cache
```

- **Host**: Specifies the target domain (`example.com`).
- **User-Agent**: Provides details about the client software.
- **Accept**: Indicates which content types the client can process.
- **Cache-Control**: Instructs caching behavior.

> [!important]
> **Note**
>
> In HTTP/2, pseudo-headers (like `:method`, `:path`) precede regular headers and always start with `:`.

## Types of HTTP Headers

HTTP headers are grouped by their roles. Below is a visual overview followed by a summary table.

![The image lists types of HTTP headers, categorized into "General Headers" and "Request/Response Headers," which include security, authentication, caching, CORS, proxy, and custom headers.](https://kodekloud.com/kk-media/image/upload/v1752882466/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/http-headers-general-request-response.jpg)

| Header Category | Purpose                              | Common Example                 |
| --------------- | ------------------------------------ | ------------------------------ |
| General         | Used in both requests and responses  | `Connection`, `Cache-Control`  |
| Request         | Sent by clients to servers           | `User-Agent`, `Accept`         |
| Response        | Sent by servers back to clients      | `Content-Type`, `Server`       |
| Security        | Mitigate web vulnerabilities         | `Content-Security-Policy`      |
| Authentication  | Verify client identity               | `Authorization`                |
| Caching         | Control resource caching             | `Expires`, `ETag`              |
| CORS            | Enable cross-origin resource sharing | `Access-Control-Allow-Origin`  |
| Proxy           | Convey client info through proxies   | `X-Forwarded-For`, `X-Real-IP` |
| Custom          | Application-specific metadata        | `X-Custom-Header`              |

### General Headers

General headers carry metadata applicable to both requests and responses, such as connection management and caching directives.

![The image shows a section of general headers for a web request, including details like the request URL, method, status code, remote address, and referrer policy.](https://kodekloud.com/kk-media/image/upload/v1752882467/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/web-request-headers-section.jpg)

### Request Headers

Clients send these headers to the server:

```
:authority: kodekloud.com
:method: GET
:path: /
:scheme: https
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Cache-Control: max-age=0
Cookie: session=abcd1234
Referer: https://www.google.com/
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

- **Accept**: Media types the client prefers.
- **User-Agent**: Browser and OS identification.
- **Accept-Language**: Preferred languages.
- **Cookie**: Session data stored by the browser.

### Response Headers

Servers include these headers in replies:

```
Age: 387887
Cache-Control: max-age=3600
Content-Encoding: br
Content-Type: text/html
Date: Fri, 17 Jan 2025 18:44:46 GMT
Server: cloudflare
Vary: Accept-Encoding
X-Cache: HIT
```

- **Content-Type**: Media type of the response body.
- **Cache-Control**: Caching policy instructions.
- **Server**: Server software identifier.
- **X-Cache**: Indicates cache hits or misses.

## Security Headers

Security headers guard against common web threats like XSS, clickjacking, and mixed-content issues.

```
alt-svc: clear
cache-control: no-cache, no-store, max-age=0, must-revalidate
content-encoding: gzip
content-security-policy:
  script-src 'nonce-6tCRsH62nR2cX-vHxm5A' 'strict-dynamic'
  https: 'unsafe-eval'; object-src 'none'; base-uri 'self';
  report-uri https://mail.google.com/mail/cspreport
content-type: text/html; charset=utf-8
strict-transport-security: max-age=1088400; includeSubDomains
x-frame-options: SAMEORIGIN
x-xss-protection: 0
```

> [!important]
> **Warning**
>
> Improperly configured security headers can break site functionality or leave vulnerabilities. Always test in staging before deploying.

![The image shows a screenshot of HTTP response headers from a GET request to a Gmail URL, including details like status, content type, and security policies. Some headers are highlighted, such as strict-transport-security and x-frame-options.](https://kodekloud.com/kk-media/image/upload/v1752882468/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/http-response-headers-gmail-screenshot.jpg)

## Authentication Headers

Authenticate requests using credentials or tokens:

```
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **Basic**: Base64-encoded `username:password`.
- **Bearer**: Token-based (e.g., OAuth 2.0, JWT).

## Caching Headers

Manage how clients and proxies cache responses:

```
Cache-Control: max-age=0, must-revalidate
Expires: Wed, 21 Oct 2025 07:28:00 GMT
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
X-Cache: Miss from cloudfront
```

- **Cache-Control**: Fine-grained caching instructions.
- **Expires**: Absolute expiry date/time.
- **ETag**: Entity tag for version validation.

## CORS Headers

Enable controlled cross-origin requests to protect resources:

![The image illustrates how CORS headers control resource requests from different domains, showing data retrieval and inclusion of CORS headers to restrict external website access for data protection.](https://kodekloud.com/kk-media/image/upload/v1752882470/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/cors-headers-resource-requests-diagram.jpg)

```
Access-Control-Allow-Origin: https://petexchangehk-frontend.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: content-type, authorization
Access-Control-Allow-Credentials: true
```

> [!important]
> **Note**
>
> Browsers enforce CORS; servers must explicitly allow desired origins and methods.

## Proxy Headers

When requests pass through load balancers or reverse proxies, these headers preserve client information:

```
Host: web:8001
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64)
X-Forwarded-For: 192.168.122.4
X-Forwarded-Host: web.domain.com
X-Forwarded-Proto: https
X-Forwarded-Server: 172.19.0.5
X-Real-IP: 192.168.122.4
```

- **X-Forwarded-For**: Original client IP through multiple proxies.
- **X-Forwarded-Host**: Original `Host` header.
- **X-Forwarded-Proto**: Protocol used by the client.
- **X-Real-IP**: Direct client IP (single proxy scenario).

## Custom Headers

Define your own headers for feature flags, tracing, or legacy integrations:

```
GET /api HTTP/1.1
Host: example.com
User-Agent: curl/8.1.2
Accept: */*
X-Custom-Header1: Value1
```

Custom headers must begin with `X-` (for legacy) or a vendor namespace.

## Nginx Built-in Variables

Nginx uses `$`\-prefixed variables to access request and server data dynamically.

![The image lists Nginx built-in variables with descriptions, such as `$remote_addr` for the client's IP address and `$request_uri` for the full request including arguments.](https://kodekloud.com/kk-media/image/upload/v1752882471/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/nginx-built-in-variables-list.jpg)

Common variables:

- `$remote_addr`: Client IP address
- `$host`: Host header value
- `$scheme`: Protocol (`http` or `https`)
- `$request_uri`: Full request URI including query string

![The image lists Nginx built-in variables with descriptions, such as `$http_referer`, `$status`, and `$host`, explaining their functions in web server requests.](https://kodekloud.com/kk-media/image/upload/v1752882472/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/nginx-built-in-variables-descriptions.jpg)

Combine variables to reconstruct the full URL:

```
$scheme://$host$request_uri
```

## Example Nginx Configuration

Below is a sample Nginx `server` block that sets security headers and proxies traffic to an upstream backend:

```
server {
    listen       80;
    server_name  honda.cars.com;


    root   /var/www/honda.cars.com/html;
    index  index.html;


    # Security response headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Content-Security-Policy "default-src 'self'";
    add_header Referrer-Policy "origin";


    location / {
        # Preserve original client headers
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass         http://backend_upstream;
    }
}
```

- **add_header**: Appends headers to outbound responses.
- **proxy_set_header**: Customizes headers sent to upstream servers.

---

## Links and References

- [MDN Web Docs: HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/889d65af-d23e-4813-98fb-afae795ba3e9)**
>
> Watch video content
