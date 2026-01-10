# Demo Configure URL Rewrite - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Demo-Configure-URL-Rewrite)

---

## Table of Contents

- Demo Configure URL Rewrite
  - Scenario
  - Prerequisites
  - 1. Prepare the Content Directory
  - 2. Test Before Rewriting
  - 3. Review Initial Nginx Configuration
  - 4. Add the Rewrite Directive
  - 5. Verify the Rewrite
  - Quick Reference
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Nginx For Beginners

Intermediate Config

# Demo Configure URL Rewrite

In this tutorial, you’ll learn how to use Nginx’s `rewrite` directive to transparently redirect an old URL path to a new one. This approach preserves existing bookmarks and SEO value by issuing a permanent (301) redirect.

## Scenario

Your site `example.com` originally served images from:

```
https://example.com/images/pic01.jpg
```

After renaming the folder from `/images` to `/pics`, you want to redirect all traffic from `/images/...` to `/pics/...` without breaking links. A suitable rewrite rule is:

```
rewrite ^/images/(.*)$ /pics/$1 permanent;
```

This captures anything after `/images/` and issues a 301 redirect to `/pics/...`.

---

## Prerequisites

- A running Nginx server (≥1.14)
- SSH access to the server
- Root or sudo privileges
- A staging environment for testing

> [!important]
> **Note**
>
> Always test changes in a staging environment before deploying to production to avoid downtime.

---

## 1\. Prepare the Content Directory

On the Nginx server, duplicate the `images/` folder under the document root (`/var/www/html`):

```
cd /var/www/html
cp -R images/ pics/
```

Verify both directories exist:

```
ls -l /var/www/html
```

Expected output:

```
drwxr-xr-x 1 root root 4096 Feb 18 16:14 images/
drwxr-xr-x 1 root root 4096 Feb 18 16:29 pics/
```

Both directories should contain the same image files:

```
ls -l images/
```

```
pic01.jpg  pic02.jpg  …  pic15.jpg
```

---

## 2\. Test Before Rewriting

Ensure Nginx is running and serving files without any rewrite rules:

1.  Open your browser and visit:  
    `http://example.com/images/pic10.jpg`
2.  You should see the image load directly from `/images/pic10.jpg`.

---

## 3\. Review Initial Nginx Configuration

Open your server block configuration for `example.com` (commonly in `/etc/nginx/sites-available/example`):

```
server {
    listen 80;
    server_name example.com;
    root /var/www/html;


    index index.html index.htm index.nginx-debian.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Validate and reload Nginx:

```
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4\. Add the Rewrite Directive

Edit the same `server` block and insert the `rewrite` rule **before** `try_files`:

```
server {
    listen 80;
    server_name example.com;
    root /var/www/html;


    index index.html index.htm index.nginx-debian.html;


    location / {
        # Redirect all /images/... requests to /pics/...
        rewrite ^/images/(.*)$ /pics/$1 permanent;


        # Then attempt to serve the request
        try_files $uri $uri/ =404;
    }
}
```

Save the file, then test and reload:

```
sudo nginx -t
sudo systemctl reload nginx
```

> [!important]
> **Warning**
>
> A typo in the regex or placement of `rewrite` can lead to redirect loops. Double-check the pattern and test thoroughly.

---

## 5\. Verify the Rewrite

To avoid cached redirects, open an incognito/private browser window and navigate to:

```
http://example.com/images/pic08.jpg
```

You should be permanently redirected (301) to:

```
http://example.com/pics/pic08.jpg
```

and see the image served from the new location.

---

## Quick Reference

| Step | Action                               | Command / Pattern                            |
| ---- | ------------------------------------ | -------------------------------------------- |
| 1    | Duplicate directory                  | `cp -R images/ pics/`                        |
| 2    | Verify directories                   | `ls -l /var/www/html`                        |
| 3    | Review current Nginx server block    | `/etc/nginx/sites-available/example`         |
| 4    | Add rewrite rule before `try_files`  | `rewrite ^/images/(.*)$ /pics/$1 permanent;` |
| 5    | Test the redirect in private browser | Visit `/images/pic08.jpg`                    |

---

## Conclusion

Using Nginx’s `rewrite` directive with regular expressions allows seamless URL remapping and preserves SEO by issuing 301 redirects. Always:

- Validate your Nginx configuration (`nginx -t`)
- Reload Nginx to apply changes
- Test rewrites in a staging environment

---

## Links and References

- [Nginx Rewrite Module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html)
- [Regular Expression HOWTO](https://www.regular-expressions.info/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/329f508c-8da5-4a0a-ad7a-f9504ab5e4f7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/7716ca0d-be85-45f9-a67a-11e298853b2b)**
>
> Practice lab
