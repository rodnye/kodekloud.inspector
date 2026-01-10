# Rate Limiting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Rate-Limiting)

---

## Table of Contents

- Rate Limiting
  - What Is Rate Limiting?
  - NGINX Rate Limiting Methods
  - References
  - Watch Video
    - Why Rate Limiting Matters
    - 1. Request Rate Limiting
    - 2. Connection Rate Limiting
      - Brute-Force Attacks
      - Web Scraping
      - API Overuse

---

## Content

Nginx For Beginners

Performance

# Rate Limiting

Manage incoming client requests by controlling both the request rate and concurrent connections. This prevents resource exhaustion, abuse, and helps mitigate DDoS, brute-force attacks, web scraping, and API overuse.

## What Is Rate Limiting?

Imagine you’re driving in a 100 km/h zone at 90 km/h—well under the limit—while another car speeds past at 130 km/h.

![The image shows two cars on a road, with the blue car driving at 90 and the orange car at 130, illustrating the concept of driving under the speed limit.](https://kodekloud.com/kk-media/image/upload/v1752882429/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/cars-speed-limit-illustration.jpg)

A traffic officer pulls over the speeder and issues a ticket when the limit is exceeded.

![The image shows a police officer issuing a speeding ticket to a driver standing next to a car on the road. The car has a "130" sign above it, indicating the speed.](https://kodekloud.com/kk-media/image/upload/v1752882430/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/police-officer-speeding-ticket.jpg)

Rate limiting applies the same principle to web servers: defining thresholds so that any client exceeding the limit receives an HTTP 429 (Too Many Requests).

![The image illustrates the concept of rate limiting, showing a person at a computer with servers, and includes a definition explaining it as a technique to control the number of requests a user or IP address can make to a server within a certain timeframe.](https://kodekloud.com/kk-media/image/upload/v1752882432/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/rate-limiting-definition-illustration.jpg)

### Why Rate Limiting Matters

- Protects against [DDoS (Distributed Denial of Service)](https://en.wikipedia.org/wiki/Denial-of-service_attack)
- Thwarts brute-force password guessing
- Prevents large-scale web scraping
- Controls API abuse for endpoints like social networks

#### Brute-Force Attacks

Automated scripts try credentials repeatedly—targeting login pages until they succeed.

![The image illustrates a "Bruce Force" attack, showing a script or bot targeting a server, with a note about attacks on websites with login pages.](https://kodekloud.com/kk-media/image/upload/v1752882433/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/brute-force-attack-script-diagram.jpg)

#### Web Scraping

Scripts extract valuable data from sites (e.g., copying car listings from Autotrader).

![The image illustrates the concept of web scraping, showing a person working on a laptop with a web page and HTML elements in the background. It includes a description: "A method in which a script extracts valuable information from a website."](https://kodekloud.com/kk-media/image/upload/v1752882433/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/web-scraping-laptop-html-elements.jpg)

![The image shows two laptops displaying similar car listings from different websites, illustrating data scraping. The text highlights that scripts can copy content from one site to another.](https://kodekloud.com/kk-media/image/upload/v1752882435/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/data-scraping-car-listings-laptops.jpg)

#### API Overuse

Endpoints (like Instagram’s post, like, follow, DM APIs) must limit calls to stay responsive.

![The image illustrates the concept of excessive API requests, showing multiple users sending requests to an API, resulting in a "Too Many Requests" warning. It highlights the impact of excessive requests on APIs.](https://kodekloud.com/kk-media/image/upload/v1752882436/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/excessive-api-requests-warning.jpg)

![The image is a diagram illustrating how limiting requests on Instagram (such as posts, likes, follows, and DMs) can prevent server overload.](https://kodekloud.com/kk-media/image/upload/v1752882437/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/instagram-request-limiting-diagram.jpg)

Every rate-limit implementation tracks:

![The image illustrates the process of rate limiting, showing a magnifying glass over an IP address search bar, with speech bubbles indicating requests and an hourglass symbol. It explains that IP addresses, request intervals, and total requests within a timeframe are tracked.](https://kodekloud.com/kk-media/image/upload/v1752882438/notes-assets/images/Nginx-For-Beginners-Rate-Limiting/rate-limiting-ip-address-diagram.jpg)

- Client IP address
- Interval between requests
- Total requests within a time window

If a client exceeds the configured limit, NGINX returns HTTP 429 until the next window or token refill.

## NGINX Rate Limiting Methods

NGINX provides two core rate-limiting mechanisms:

| Method                   | Purpose                               | Core Directives                 |
| ------------------------ | ------------------------------------- | ------------------------------- |
| Request rate limiting    | Limit requests per time interval      | `limit_req_zone`, `limit_req`   |
| Connection rate limiting | Limit simultaneous connections per IP | `limit_conn_zone`, `limit_conn` |

For more details, see the [NGINX documentation](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html).

### 1\. Request Rate Limiting

Implements a token bucket algorithm, allowing a defined number of requests per time unit. Excess requests get delayed or rejected with HTTP 429.

> [!important]
> **Tip**
>
> Adjust the `rate` parameter to `r/s`, `r/m`, or `r/h` depending on expected traffic.

In the `http` context:

```
http {
    # Allocate 10 MB shared memory for tracking each IP ($binary_remote_addr)
    # and allow up to 2r/m (2 requests per minute).
    limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=2r/m;


    # When limit is exceeded, respond with 429 Too Many Requests.
    limit_req_status 429;
}
```

Apply the limit to a specific location within your `server` block:

```
server {
    listen 80;
    server_name example.com www.example.com;


    root /var/www/example.com/html;
    index index.html;


    location /admin {
        # Enforce request limit for this location
        limit_req zone=req_limit_per_ip;


        # Standard file serving
        try_files $uri $uri/ =404;
    }
}
```

### 2\. Connection Rate Limiting

Restricts the number of concurrent connections per client IP—ideal against SYN floods or slow-loris style attacks.

> [!important]
> **Warning**
>
> Ensure the shared memory zone size (e.g., `10m`) is sufficient for the number of tracked IPs to avoid performance issues.

In the `http` context:

```
http {
    # Zone for tracking connections per IP
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;


    # Return 429 when connection limit is reached
    limit_conn_status 429;
}
```

Then in your `server` block:

```
server {
    listen 80;
    server_name example.com www.example.com;


    location /admin {
        # Allow only 1 simultaneous connection per IP
        limit_conn conn_limit_per_ip 1;


        try_files $uri $uri/ =404;
    }
}
```

Increase the last parameter (e.g., `2`) to allow more parallel connections.

---

Implement these NGINX configurations to safeguard your web server against abuse and ensure consistent performance under load.

## References

- [NGINX Limit Request Module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html)
- [NGINX Limit Connection Module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html)
- [Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket)
- [Denial-of-Service Attack](https://en.wikipedia.org/wiki/Denial-of-service_attack)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/83239034-1ac5-475b-bdf5-d6805c67a613)**
>
> Watch video content
