# Apache Web Server - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Web-Server/Apache-Web-Server)

---

## Table of Contents

- Apache Web Server
  - Installation on CentOS
  - Log Files and Configuration
  - Server Name Configuration
  - Virtual Hosts
  - Splitting Virtual Host Configurations
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Web Server

# Apache Web Server

In this guide, we explore the Apache web server—an open-source HTTP server developed and maintained by the [Apache Software Foundation](https://www.apache.org/). Apache is predominantly used to serve web content such as HTML, CSS, and JavaScript files. Often, it operates in concert with an application server to process backend business logic. This article, however, focuses exclusively on the Apache web server.

![The image features the Apache Web Server logo, highlighting it as an open-source web server.](https://kodekloud.com/kk-media/image/upload/v1752873526/notes-assets/images/DevOps-Pre-Requisite-Course-Apache-Web-Server/frame_10.jpg)

## Installation on CentOS

On CentOS, Apache is available from the default software repository, meaning no additional repository configuration is needed. Simply install Apache using the package manager, start the HTTP service, and verify its status. If your system has a firewall enabled, make sure to add a rule that permits HTTP traffic.

> [!important]
> **Installation Tip**
>
> Use the package manager to install, start, and check the Apache service with the commands shown below.

```
yum install httpd
service httpd start
service httpd status
```

A sample output from the `service httpd status` command might look like this:

```
Redirecting to /bin/systemctl status httpd.service
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; disabled; vendor preset: disabled)
   Active: active (running) since Sun 2020-03-22 12:01:42 UTC; 56s ago
     Docs: man:httpd(8)
           man:apachectl(8)
 Main PID: 4253 (httpd)
   Status: "Total requests: 0; Current requests/sec: 0; Current traffic:  0 B/sec"
```

## Log Files and Configuration

Apache places its log files within the `/var/log/httpd` directory. There are two primary logs:

- **Access Logs:** Updated whenever a user accesses the website.
- **Error Logs:** Updated whenever an error occurs.

The main configuration file is located at `/etc/httpd/conf/httpd.conf`. This file manages various operational parameters, including the port number, location of static content, SSL/HTTPS settings, and log configurations. A simplified example of the default settings is:

```
Listen 80
DocumentRoot "/var/www/html"
```

With this configuration, Apache listens on port 80 for all IP addresses on the host. The `DocumentRoot` specifies the directory containing your static files. To launch your custom website, simply move your static files into this directory. Once you refresh your browser, the default Apache test page will be supplanted by your website’s content.

## Server Name Configuration

Setting a server name in the configuration allows Apache to correctly recognize requests for your website. For instance, consider the following configuration for a website about houses:

```
Listen 80
DocumentRoot "/var/www/"
ServerName www.houses.com:80
```

This configuration lets you access your website via `www.houses.com`. For this to work seamlessly, the domain name must resolve to your server’s IP address. In a local testing environment, add the following entry to your `/etc/hosts` file:

```
127.0.0.1   www.houses.com
```

> [!important]
> **Local Testing**
>
> Mapping your domain in the `/etc/hosts` file can help simulate DNS resolution for local server development.

## Virtual Hosts

Apache supports hosting multiple websites on a single server using virtual hosts. Each virtual host is defined by its own configuration, including a separate server name and document root. This is useful for hosting multiple domains (e.g., `www.houses.com` and `www.oranges.com`) on one machine.

Below is an example configuration for hosting two websites:

```
<VirtualHost *:80>
    ServerName www.houses.com
    DocumentRoot /var/www/houses
</VirtualHost>


<VirtualHost *:80>
    ServerName www.oranges.com
    DocumentRoot /var/www/oranges
</VirtualHost>
```

When a user navigates to either domain, Apache selects the appropriate document root based on the domain in the request. Ensure that the corresponding files (HTML, CSS, JavaScript, images, etc.) for each website are properly placed in their designated directories.

Any modifications to the configuration require a restart of the Apache service:

```
service httpd restart
```

## Splitting Virtual Host Configurations

For better organization, you can split virtual host configurations into separate files instead of maintaining everything in the primary configuration file. An example include directive in the main configuration might be:

```
ServerName www.houses.com:80


Include conf/houses.conf
Include conf/oranges.conf
```

The contents of `/etc/httpd/conf/houses.conf` could be:

```
<VirtualHost *:80>
    ServerName www.houses.com
    DocumentRoot /var/www/houses
</VirtualHost>
```

Similarly, `/etc/httpd/conf/oranges.conf` might contain:

```
<VirtualHost *:80>
    ServerName www.oranges.com
    DocumentRoot /var/www/oranges
</VirtualHost>
```

For effective local testing, add these entries to your `/etc/hosts` file:

```
# Host Database
127.0.0.1       localhost
127.0.0.1       www.houses.com
127.0.0.1       www.oranges.com
```

> [!important]
> **Virtual Host Tip**
>
> Splitting configuration files can streamline managing multiple virtual hosts, making maintenance and troubleshooting easier.

These configurations ensure that requests to `www.houses.com` or `www.oranges.com` are directed to your local Apache server on port 80.

## Conclusion

By following the steps outlined in this guide, you can efficiently deploy and manage the Apache web server on CentOS. Experiment with the configurations, set up virtual hosts, and monitor the server logs to deepen your understanding of Apache’s functionality. For additional resources, visit the [Apache Documentation](https://httpd.apache.org/docs/).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/952c839c-8af5-467d-92b7-3cb2f6ee5405)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/50d83ffe-f9f1-47ef-8bc2-0d2779aeb0fb)**
>
> Practice lab
