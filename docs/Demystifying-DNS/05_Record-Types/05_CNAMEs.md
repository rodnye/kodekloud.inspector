# CNAMEs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/CNAMEs)

---

## Table of Contents

- CNAMEs
  - Step 1: Install and Start Nginx on Node-02
  - Step 2: Update the DNS Zone File on Node-01
  - Step 3: Update the Nameserver Configuration
  - Step 4: Testing the CNAME Record
  - Additional Consideration: Amazon Route 53 and CNAME Records
  - Conclusion
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# CNAMEs

This guide explains how to configure a CNAME record (canonical name) to point one domain name to another. CNAME records are typically used for subdomains (e.g., "www") and must point to another domain name—not directly to an IP address or the apex (root) domain.

## Step 1: Install and Start Nginx on Node-02

First, connect to Node-02 via SSH and install Nginx:

```
ssh node02
sudo apt install nginx
```

Once installed, start the Nginx service:

```
bob@node02 ~ $ sudo systemctl start nginx
bob@node02 ~ $
```

Verify that Nginx is running by curling localhost:

```
bob@node02 ~ $ curl localhost
```

If you receive an HTML page, Nginx is active and ready to serve your web content.

## Step 2: Update the DNS Zone File on Node-01

Next, log into Node-01 to update the DNS zone file with a new CNAME record. In this example, setting up a record for "www" means that accessing www.my.kodekloudlab.com will point to my.kodekloudlab.com. Remember to update the serial number in the SOA record whenever you modify the zone file.

Open the zone file using your preferred editor:

```
sudo vi /etc/bind/db.my.kodekloudlab.com
```

The DNS zone file should look like this:

```
$TTL  300
@   IN  SOA ns1.my.kodekloudlab.com. admin.my.kodekloudlab.com. (
        2               ; Serial
        604800          ; Refresh
        86400           ; Retry
        2419200         ; Expire
        604800          ; Negative Cache TTL
    )
@   IN  NS  ns1.my.kodekloudlab.com.
ns1 IN  A   127.0.0.1
@   IN  A   192.5.180.8
www IN  CNAME my.kodekloudlab.com.
```

## Step 3: Update the Nameserver Configuration

After editing the zone file, update your nameserver configuration. Editing the resolv.conf file ensures that the correct nameserver entry is in place. For instance, in a KodeKloud playground the file might initially look like this:

```
search us-central1-a.c.kk-lab-prod.internal c.kk-lab-prod.internal google.internal
nameserver 172.25.0.1
options ndots:0
```

Before making any modifications, it is recommended to back up your original nameserver information. Then, comment out the existing nameserver line if needed:

```
search us-central1-a.c.kk-lab-prod.internal c.kk-lab-prod.internal google.internal
#nameserver 172.25.0.1
options ndots:0
```

> [!important]
> **Backup Reminder**
>
> Always back up configuration files before making changes to ensure you can roll back if necessary.

After updating the configuration, restart BIND9 to apply the changes:

```
sudo systemctl reload named
```

## Step 4: Testing the CNAME Record

Now, test the configuration by curling the service via the CNAME:

```
bob@node01 ~ ➜  curl www.my.kodekloudlab.com
```

You should see the typical Nginx welcome page similar to the following:

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35qm;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>
<em>Thank you for using nginx.</em>
</body>
</html>
```

This confirms that the CNAME record in the "my.kodekloudlab.com" zone is resolving as expected.

## Additional Consideration: Amazon Route 53 and CNAME Records

> [!important]
> **Route 53 Alias Records**
>
> A unique characteristic of Amazon Route 53 is that it supports alias records for CNAMEs. This means you can point directly to AWS resources like S3 buckets or Elastic Load Balancers—even at the apex of a domain—a feature not supported by traditional CNAME records.

## Conclusion

This guide demonstrated how to set up a CNAME record for subdomains using a combination of Nginx and BIND. Following these steps ensures that your subdomain (www.my.kodekloudlab.com) correctly resolves to your main domain. By understanding this process, you can manage your DNS configurations efficiently for improved web service management.

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/73bc296f-5291-4ec5-9d2c-177aaf82f13e)**
>
> Watch video content
