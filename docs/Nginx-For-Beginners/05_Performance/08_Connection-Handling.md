# Connection Handling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Connection-Handling)

---

## Table of Contents

- Connection Handling
  - Nginx Master and Worker Processes
  - Keep-Alive Connections
  - Evolution of HTTP
  - Optimizing File Transfers with sendfile
  - Reducing TCP Overhead with tcp_nopush
  - Links and References
  - Watch Video
    - Configuring Workers
    - Upstream Keep-Alive
    - TCP vs. UDP

---

## Content

Nginx For Beginners

Performance

# Connection Handling

In this guide, we’ll explore Nginx connection handling, from master–worker processes to keep-alive tuning, HTTP evolution, and TCP optimizations. By the end, you’ll know how to fine-tune your Nginx server for high concurrency and low latency.

## Nginx Master and Worker Processes

Nginx follows a master–worker architecture:

- The **master process** reads configuration files, manages worker lifecycles, and monitors for reloads.
- Each **worker process** runs an event loop, independently handling client connections and events.

![The image illustrates a connection handling process with a master process distributing requests to multiple worker processes, each containing an event loop to monitor events simultaneously.](https://kodekloud.com/kk-media/image/upload/v1752882383/notes-assets/images/Nginx-For-Beginners-Connection-Handling/connection-handling-master-worker-processes.jpg)

By default, Nginx detects CPU cores and spawns one worker per core. On a 4-core machine, you get 4 workers handling connections in parallel.

### Configuring Workers

Place the following in your **nginx.conf**:

```
worker_processes auto;


events {
    worker_connections 512;
}
```

- `worker_processes auto;` auto-detects CPU cores.
- `worker_connections 512;` sets max concurrent connections per worker (default: 512).

> [!important]
> **Warning**
>
> Setting `worker_connections` too high may exhaust file descriptors. Monitor with `ulimit -n` and adjust your OS limits accordingly.

![The image shows a diagram labeled "Worker Processes" with an icon of a microchip connected to a box labeled "Worker."](https://kodekloud.com/kk-media/image/upload/v1752882384/notes-assets/images/Nginx-For-Beginners-Connection-Handling/worker-processes-microchip-diagram.jpg)

On a 4-core VM:

- Workers: 4
- Connections: 4 × 512 = 2048

To support more clients, simply increase `worker_connections`:

```
events {
    worker_connections 1024;
}
```

---

## Keep-Alive Connections

Persistent (keep-alive) connections reuse a single TCP socket for multiple HTTP requests, reducing handshake overhead:

![The image illustrates a "Keep Alive" connection between a browser and a server, showing the transfer of files like JS, HTML, JSON, XML, and CSS, with benefits such as speeding up the process and reducing CPU and network overhead.](https://kodekloud.com/kk-media/image/upload/v1752882385/notes-assets/images/Nginx-For-Beginners-Connection-Handling/keep-alive-connection-browser-server.jpg)

Add these directives in the `http` block:

```
http {
    # Max requests per keep-alive connection
    keepalive_requests 100;


    # Idle timeout (seconds) for keep-alive
    keepalive_timeout 65;
}
```

### Upstream Keep-Alive

If Nginx proxies to backend servers, maintain idle connections upstream:

```
http {
    upstream backend {
        server 10.10.0.101:80;
        server 10.10.0.102:80;
        server 10.10.0.103:80;
        keepalive 32;
    }
}
```

Then, in your `server` block:

```
server {
    listen 80;


    location / {
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_pass http://backend;
    }
}
```

- `proxy_http_version 1.1;` ensures HTTP/1.1 persistent connections.
- `proxy_set_header Connection "";` avoids sending `Connection: close`.

You can verify HTTP version with:

```
curl --head https://www.google.com
```

> [!important]
> **Note**
>
> Persistent upstream connections can significantly reduce backend latency. Always test under load!

---

## Evolution of HTTP

HTTP has evolved to improve performance, security, and flexibility.

| HTTP Version | Key Features                                                                        | Release |
| ------------ | ----------------------------------------------------------------------------------- | ------- |
| HTTP/0.9     | Simple GET, no headers or status codes                                              | 1991    |
| HTTP/1.0     | Added status codes (200, 404), GET/POST methods                                     | 1996    |
| HTTP/1.1     | Persistent connections, chunked transfer, caching, cookies, compression, pipelining | 1997    |
| HTTP/2       | Multiplexing, header compression (HPACK), binary framing                            | 2015    |
| HTTP/3       | QUIC over UDP, 0-RTT, built-in TLS 1.3, connection migration                        | 2020    |

![The image illustrates the evolution of HTTP versions using a progression of human silhouettes, highlighting key features of HTTP 1.1 such as persistent connections, caching, cookies, compression, and reduced latency.](https://kodekloud.com/kk-media/image/upload/v1752882386/notes-assets/images/Nginx-For-Beginners-Connection-Handling/http-evolution-human-silhouettes.jpg)

- **HTTP/2**: Multiplex streams over one TCP connection; header compression.
- **HTTP/3**: Runs on QUIC/UDP, reduces latency, supports connection migration.

![The image illustrates the evolution of HTTP versions using a progression of human-like figures, with details about HTTP 3.0, including its features like being built on QUIC and requiring TLS 1.3.](https://kodekloud.com/kk-media/image/upload/v1752882387/notes-assets/images/Nginx-For-Beginners-Connection-Handling/http-evolution-http3-features-diagram.jpg)

### TCP vs. UDP

| Protocol | Reliability            | Use Cases                 | Transport Model     |
| -------- | ---------------------- | ------------------------- | ------------------- |
| TCP      | Ordered, error-checked | Web, email, file transfer | Connection-oriented |
| UDP      | Unordered, best-effort | Gaming, streaming, VoIP   | Connectionless      |

Currently, ~34.6% of sites use HTTP/2, 34.0% HTTP/3, and 31.4% still run HTTP/1.1.

![The image shows two graphs depicting the historical trends in the usage of HTTP/2 and HTTP/3 on websites, with HTTP/2 used by 34.6% and HTTP/3 by 34.0% of websites.](https://kodekloud.com/kk-media/image/upload/v1752882388/notes-assets/images/Nginx-For-Beginners-Connection-Handling/http2-http3-usage-trends-graphs.jpg)

---

## Optimizing File Transfers with sendfile

Default file transfers read data into user space, then write to the network. This double-buffering adds CPU and memory overhead.

![The image is a diagram illustrating the process of sending files in a Linux environment, showing interactions between user space, system call interface, Linux kernel, and hardware components.](https://kodekloud.com/kk-media/image/upload/v1752882390/notes-assets/images/Nginx-For-Beginners-Connection-Handling/linux-file-transfer-diagram.jpg)

Enable zero-copy to let the kernel send file data directly from disk to socket:

```
http {
    sendfile on;
}
```

This improves throughput and reduces CPU cycles.

> [!important]
> **Note**
>
> On some platforms (e.g., older BSD variants), `sendfile` may behave differently. Test before deploying to production.

---

## Reducing TCP Overhead with tcp_nopush

Small TCP packets increase protocol overhead. `tcp_nopush` delays sending until a full packet is ready:

```
http {
    tcp_nopush on;
}
```

This directive groups headers and file chunks into larger packets, cutting network congestion.

---

By tuning these core options—master/worker processes, keep-alive, sendfile, and TCP flags—you’ll boost Nginx performance and resource efficiency.

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [HTTP/2 (RFC 7540)](https://httpwg.org/specs/rfc7540.html)
- [QUIC and HTTP/3 Explained](https://http3-explained.haxx.se/)
- [curl Manual](https://curl.se/docs/manpage.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/7ad3d436-d724-42e8-b440-80791ec5f9b5)**
>
> Watch video content
