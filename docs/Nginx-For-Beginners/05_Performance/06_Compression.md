# Compression - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Compression)

---

## Table of Contents

- Compression
  - What Can (and Cannot) Be Compressed?
  - Compression Methods in Nginx
  - Verifying Compression
  - References
  - Watch Video
    - GZIP
    - Brotli
      - Enabling GZIP in Nginx
      - Compiling Nginx with Brotli (Alternative)

---

## Content

Nginx For Beginners

Performance

# Compression

Imagine you’re packing for a week-long trip to Hawaii. If you just stuff your clothes into your suitcase without folding, you’ll struggle to close it. But if you fold them neatly and tightly, they take up far less space—and you can fit more.

![The image shows a person packing clothes into a suitcase with the text "Can fit more clothes now," illustrating the concept of compressing.](https://kodekloud.com/kk-media/image/upload/v1752882372/notes-assets/images/Nginx-For-Beginners-Compression/packing-clothes-suitcase-compress.jpg)

Compression is the same idea applied to data: shrink files so they consume less “space” when transferred. In waste management, garbage is compacted into small cubes to optimize storage:

![The image shows a person in a safety vest pushing a recycling bin and holding a trash bag, with a conveyor belt and recycling symbol in the background, illustrating a waste management or recycling process.](https://kodekloud.com/kk-media/image/upload/v1752882374/notes-assets/images/Nginx-For-Beginners-Compression/recycling-waste-management-process.jpg)

On the web, the server encodes (compresses) a file before sending it. Your browser then decompresses (unpacks) it and renders the original content:

![The image illustrates data compression, showing a laptop with a folder icon connected to a monitor displaying a ZIP file and various file types being compressed.](https://kodekloud.com/kk-media/image/upload/v1752882375/notes-assets/images/Nginx-For-Beginners-Compression/data-compression-laptop-monitor-zip.jpg)

Without compression, every page load requires downloading the full HTML, CSS, JavaScript, images, and more—slowing performance, especially on mobile devices or capped data plans:

![The image illustrates a "Fast Response" concept, showing a server sending only useful data to a browser.](https://kodekloud.com/kk-media/image/upload/v1752882376/notes-assets/images/Nginx-For-Beginners-Compression/fast-response-server-data-browser.jpg)

By compressing resources, you reduce transfer size, speed up page loads, and enhance the user experience.

---

## What Can (and Cannot) Be Compressed?

Nginx excels at compressing text-based resources:

![The image shows a list of file types (CSS, HTML, XML, JSON, JS, JPEG) under the title "Supported Compression" with a green check mark.](https://kodekloud.com/kk-media/image/upload/v1752882377/notes-assets/images/Nginx-For-Beginners-Compression/supported-compression-file-types.jpg)

| Compressible Formats      | Should Not Be Recompressed   |
| ------------------------- | ---------------------------- |
| CSS, HTML, XML, JSON, JS  | Audio (MP3), Video (MP4)     |
| SVG, RSS, plain text      | ZIP, TAR, other archives     |
| Even JPEG (minimal gains) | GIF, already-compressed data |

> [!important]
> **Warning**
>
> Recompressing already-compressed formats (e.g., MP3, MP4, ZIP) wastes CPU without meaningful size reduction.

---

## Compression Methods in Nginx

Nginx supports two main algorithms:

1.  **GZIP** (built-in)
2.  **Brotli** (module)

### GZIP

GZIP is the most ubiquitous compression format, dating back to the 1990s. Files use the `.gz` extension, and a CLI tool is available on most Linux/Unix systems.

![The image is an infographic about gzip, detailing its release in the 90s, file format (.gz), availability on Linux and Unix, and its use for compressing individual files with a CLI tool. It also shows a compression level scale from 1 to 9.](https://kodekloud.com/kk-media/image/upload/v1752882378/notes-assets/images/Nginx-For-Beginners-Compression/gzip-infographic-compression-levels.jpg)

To compress a file locally:

```
gzip ubuntu-jammy-jellyfish.iso
ls -l
# ubuntu-jammy-jellyfish.iso
# ubuntu-jammy-jellyfish.iso.gz
```

#### Enabling GZIP in Nginx

Most Nginx installations include these directives (often commented out) in the `http` block of `/etc/nginx/nginx.conf`:

```
http {
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types
        text/plain
        text/css
        text/html
        text/xml
        text/javascript
        application/json
        application/javascript
        application/rss+xml;
}
```

Key directives:

- `gzip on;` – Enable gzip compression
- `gzip_vary on;` – Send `Vary: Accept-Encoding` header
- `gzip_comp_level 6;` – Balance between speed (1) and size (9)
- `gzip_types` – Define which MIME types to compress
- `gzip_proxied any;` – Compress responses even when behind a proxy

> [!important]
> **Note**
>
> For a complete list of gzip settings, see the [Nginx gzip module documentation](https://nginx.org/en/docs/http/ngx_http_gzip_module.html).

### Brotli

Brotli often achieves higher compression ratios than gzip. Nginx Plus includes Brotli by default, while open-source Nginx requires installing a module.

![The image is a slide titled "Brotli – Nginx Plus" with a logo for Brotli and mentions of Debian/Ubuntu.](https://kodekloud.com/kk-media/image/upload/v1752882379/notes-assets/images/Nginx-For-Beginners-Compression/brotli-nginx-plus-debian-ubuntu.jpg)

**Install on Debian/Ubuntu:**

```
sudo apt install nginx-module-brotli
```

**Configuration** (add to the same `http` block):

```
http {
    brotli on;
    brotli_comp_level 4;
    brotli_types
        text/plain
        text/css
        text/html
        text/xml
        text/javascript
        application/json
        application/javascript
        application/rss+xml;
}
```

- Levels range from 0–11 (default ~4).
- `brotli_types` should mirror `gzip_types`.

#### Compiling Nginx with Brotli (Alternative)

```
wget https://nginx.org/download/nginx-1.27.0.tar.gz
tar xzf nginx-1.27.0.tar.gz
cd nginx-1.27.0


./configure \
  --sbin-path=/usr/local/nginx/nginx \
  --conf-path=/usr/local/nginx/nginx.conf \
  --pid-path=/usr/local/nginx/nginx.pid \
  --with-pcre=../pcre-10.42 \
  --with-zlib=../zlib-1.2.13 \
  --with-http_gzip_module \
  --with-stream \
  --with-mail=dynamic \
  --add-dynamic-module=/usr/build/ngx_brotli


make
sudo make install
```

After compiling, enable Brotli as shown above in your `nginx.conf`.

---

## Verifying Compression

1.  Open your browser’s **Developer Tools** and switch to the **Network** tab.
2.  Reload the page.
3.  Click any resource and inspect the **Response Headers**:

```
content-encoding: gzip
content-type: text/html; charset=UTF-8
```

![The image shows a screenshot of a browser's developer tools, specifically the "Network" tab, displaying response headers for a request to "www.google.com" with an arrow highlighting "content-encoding: gzip."](https://kodekloud.com/kk-media/image/upload/v1752882381/notes-assets/images/Nginx-For-Beginners-Compression/browser-dev-tools-network-gzip.jpg)

Modern browsers send an **Accept-Encoding** header to tell the server which algorithms they support:

![The image shows a screenshot of a web request header, highlighting the "accept-encoding" field with values "gzip, deflate, br," under the title "Compression Methods."](https://kodekloud.com/kk-media/image/upload/v1752882382/notes-assets/images/Nginx-For-Beginners-Compression/compression-methods-accept-encoding.jpg)

```
Accept-Encoding: gzip, deflate, br
```

Nginx selects the best mutual algorithm and applies it automatically.

---

## References

- [Nginx gzip module documentation](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)
- [ngx_brotli GitHub repository](https://github.com/google/ngx_brotli)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/f9e0c6ca-f04d-4d94-8b23-b342c8161065)**
>
> Watch video content
