# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Install-Config/Summary)

---

## Table of Contents

- Summary
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Nginx For Beginners

Install Config

# Summary

In this module, you’ll learn how to install, configure, and secure Nginx on Linux using native package managers—no custom compilation required.

- **Why use package managers?**  
  Package managers like `apt`, `yum`, or `dnf` handle dependencies, updates, and safe removal for you, so you’re not reinventing the wheel when deploying software such as Nginx.

  > [!important]
  > **Note**
  >
  > Compiling from source can give you fine-grained control, but it increases maintenance overhead. For most production environments, the prebuilt packages are reliable and secure.

- **Installing Nginx on Linux**  
  While Windows and macOS can be used for local testing, production deployments typically run on Linux distributions.
  - Ubuntu / Debian:

    ```
    sudo apt update
    sudo apt install nginx
    ```

  - CentOS / RHEL / Fedora:

    ```
    sudo yum install nginx      # CentOS/RHEL 7
    sudo dnf install nginx      # Fedora, CentOS/RHEL 8+
    ```

  - Start and enable Nginx:

    ```
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

- **Service Management with `systemctl`**  
  Use Nginx’s built-in controls to manage the daemon:

  ```
  sudo systemctl {start|stop|restart|reload} nginx
  sudo systemctl status nginx
  ```

- **Understanding nginx.conf Structure**  
  The main configuration file is divided into four sections:
  1.  **Global** (user, worker_processes)
  2.  **events** (worker_connections)
  3.  **http** (MIME types, logging, gzip)
  4.  **server blocks** (virtual hosts)

- **Serving Static Files & Virtual Hosts**  
  Nginx excels at delivering static content with minimal overhead. You can host multiple sites on a single IP by defining separate `server` blocks. Always set a unique `server_name` to prevent Nginx from defaulting to the first file alphabetically.
- **Customizing the Default Welcome Page**  
  Replace the built-in Nginx page with a simple “Hello World” HTML:

  ```
  <!-- /var/www/html/index.html -->
  <!DOCTYPE html>
  <html>
    <head><title>Hello World</title></head>
    <body><h1>Hello, Nginx!</h1></body>
  </html>
  ```

- **Firewall Configuration**  
  Ensure your firewall and any cloud security groups allow HTTP/HTTPS traffic only as needed:

  | Distribution    | Firewall Tool  | Common Commands                                                                      |
  | --------------- | -------------- | ------------------------------------------------------------------------------------ |
  | Ubuntu / Debian | UFW            | `sudo ufw allow 'Nginx Full'` <br> `sudo ufw enable`                                 |
  | CentOS / RHEL   | firewalld      | `sudo firewall-cmd --permanent --add-service=http` <br> `sudo firewall-cmd --reload` |
  | All (Cloud VPS) | Security Group | Configure ports 80/443 in AWS/GCP/Azure console or CLI                               |

  > [!important]
  > **Warning**
  >
  > Opening ports 80 and 443 without restrictions exposes your server to the public internet. Always verify your rule sets and consider limiting access by IP for staging environments.

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [Ubuntu UFW Guide](https://help.ubuntu.com/community/UFW)
- [firewalld Documentation](https://firewalld.org/documentation/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/0de43784-b08d-4ce0-8470-a7541b78fe58/lesson/48af9384-cad6-4cbf-a8c4-10299f8f241e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/0de43784-b08d-4ce0-8470-a7541b78fe58/lesson/4a9d775f-003d-4a42-8cc3-661b8dbde1eb)**
>
> Practice lab
