# Glue Records - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/Glue-Records)

---

## Table of Contents

- Glue Records
  - Understanding Glue Records
  - Updating the Zone File
  - Applying the Changes
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# Glue Records

In this article, we explore how glue records work and why they are essential for proper DNS configuration. When setting up DNS, it is crucial to ensure that the nameserver's domain name is resolvable by its IP address. Without a glue record, DNS queries for the nameserver itself might never find the corresponding IP, leading to resolution failures.

## Understanding Glue Records

A glue record directly associates a nameserver's domain name with its IP address in the DNS zone file. This prevents queries from getting lost, ensuring a reliable resolution path. For example, if your nameserver is "ns1.my.kodekloudlab.com", adding a glue record will map this domain to the correct IP address.

> [!important]
> **Note**
>
> In the example below, the nameserver is mapped to the loopback address (127.0.0.1). This setup works only when querying from node-01. In a production environment, replace it with a valid, routable IP address.

## Updating the Zone File

To add a glue record, start by editing your DNS zone file. In this example, we specify that our nameserver, ns1.my.kodekloudlab.com, is associated with the IP address 127.0.0.1. Additionally, the SOA Serial is incremented to 2. The complete updated zone file is shown below:

```
$TTL        300
@           IN      SOA     ns1.my.kodekloudlab.com. admin.my.kodekloudlab.com. (
                            2        ; Serial
                            604800   ; Refresh
                            86400    ; Retry
                            2419200  ; Expire
                            604800 ) ; Negative Cache TTL
@           IN      NS      ns1.my.kodekloudlab.com.
ns1         IN      A       127.0.0.1
```

## Applying the Changes

After saving the changes to the zone file, reload the DNS service so the updates take effect. Use the following commands to edit the zone file, reload the DNS server, and test the configuration with the dig command:

```
bob@node01 ~  →  sudo vi /etc/bind/db.my.kodekloudlab.com
bob@node01 ~  →  sudo systemctl reload named
bob@node01 ~  →  dig @localhost my.kodekloudlab.com
```

If the gluing process is successful, the dig command should return the expected answer without any NXDOMAIN error. This confirms that the glue record is properly configured and is assisting with the DNS resolution.

Enhance your DNS setup by ensuring that all nameservers have accurately configured glue records to maintain a robust and error-free system.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/2e8e0239-1cc4-4058-ae4b-b6cd402daed1)**
>
> Watch video content
