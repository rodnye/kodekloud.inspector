# SOA and NS Records - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/SOA-and-NS-Records)

---

## Table of Contents

- SOA and NS Records
  - 1. Check and Start the BIND9 Service
  - 2. Update the BIND Configuration
  - 3. Create the Zone File
  - 4. Validate and Test the DNS Configuration
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# SOA and NS Records

In this guide, we will walk through creating a DNS zone for my.kodekloudlab.com using BIND9. You will learn how to update the configuration file to define the zone and create its corresponding zone file with the proper SOA and NS records.

## 1\. Check and Start the BIND9 Service

Before modifying any configuration, check the status of the BIND9 service. If it isn’t running, start it with the command below:

```
bob@node01 ~ ➜  systemctl status named
● named.service - BIND Domain Name Server
     Loaded: loaded (/lib/systemd/system/named.service; enabled; vendor preset: enabled)
     Active: inactive (dead)
       Docs: man:named(8)


bob@node01 ~ ➜  sudo systemctl start named


bob@node01 ~ ➜  systemctl status named
● named.service - BIND Domain Name Server
     Loaded: loaded (/lib/systemd/system/named.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2025-01-24 02:20:28 EST; 3s ago
       Docs: man:named(8)
   Main PID: 4412 (named)
      Tasks: 38 (limit: 115795)
     Memory: 11.0M
     CGroup: /system.slice/named.service
             └─4412 /usr/sbin/named -f -u bind
```

## 2\. Update the BIND Configuration

To configure the new zone, open the file `named.conf.local` using a text editor like Vim. You may remove the default comments and any pre-populated lines to start fresh.

![The image shows a blank text editor screen with a dark background, likely indicating an empty file in a terminal-based editor like Vim.](https://kodekloud.com/kk-media/image/upload/v1752873259/notes-assets/images/Demystifying-DNS-SOA-and-NS-Records/blank-text-editor-dark-background.jpg)

Inside `named.conf.local`, add the following zone definition for my.kodekloudlab.com. The configuration specifies that this server is the primary (master) for the zone, and it points to the corresponding zone file where the DNS records are stored.

```
zone "my.kodekloudlab.com" {
    type master;                     # This indicates the server is the primary DNS server for this zone
    file "/etc/bind/db.my.kodekloudlab.com";  # Path to the zone file
};
```

Save the file once you have made these changes.

## 3\. Create the Zone File

By convention, the zone file resides in the `/etc/bind` directory and is usually named with a `db.` prefix followed by the domain name. Open both the configuration file and the zone file for editing with the following commands:

```
bob@node01 ~ $ sudo vi /etc/bind/named.conf.local


bob@node01 ~ $ sudo vi /etc/bind/db.my.kodekloudlab.com
```

Inside the zone file, start by defining the mandatory parameters:

- The TTL (Time To Live) value is set to 300 seconds, which establishes the default caching period for DNS records.
- The SOA (Start of Authority) record declares the primary name server for the zone and includes essential maintenance values such as Serial, Refresh, Retry, Expire, and Negative Cache TTL.

> [!important]
> **Note**
>
> Remember to increment the Serial number each time you update the zone file.

Enter the following content into the zone file:

```
@       $TTL    300
        IN      SOA     ns1.my.kodekloudlab.com. admin.my.kodekloudlab.com. (
                                1       ; Serial
                         604800       ; Refresh
                          86400       ; Retry
                        2419200       ; Expire
                         604800 )     ; Negative Cache TTL
```

After setting up the SOA record, add the NS record to identify the authoritative name server for the zone:

```
@       IN  NS   ns1.my.kodekloudlab.com.
```

These configurations establish the basic structure required for managing your DNS zone.

Save the zone file and exit the editor.

## 4\. Validate and Test the DNS Configuration

Even with the correct configuration, querying the domain (using a command-line tool like `dig`) may not yield the expected results if a glue record is missing for the declared name server. Without a proper glue record, queries for ns1.my.kodekloudlab.com might fail, leading to issues with resolving my.kodekloudlab.com.

Run the following command to verify:

```
bob@node01 ~  └─> dig @localhost my.kodekloudlab.com
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 51348
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 3a06ecf5c62daa7d01000000793408a0b6f4274aabb9756 (good)
;; QUESTION SECTION:
;my.kodekloudlab.com.       IN      A


;; AUTHORITY SECTION:
com.                       900     IN      SOA     a.gtld-servers.net. nstld.verisign-grs.com. 1737703548 1800 900 604800 900


;; Query time: 124 msec
;; SERVER: 127.0.0.1#53(localhost) (UDP)
;; WHEN: Fri Jan 24 02:26:02 EST 2025
;; MSG SIZE  rcvd: 155


bob@node01 ~  └─>
```

> [!important]
> **Warning**
>
> If you encounter an NXDOMAIN status, it may be due to the missing glue record for ns1.my.kodekloudlab.com. In the next article, we will discuss how to add this glue record, ensuring your local DNS server resolves the name server correctly.

By following these steps, you have successfully configured a DNS zone for my.kodekloudlab.com on your BIND9 server. For additional DNS configuration tips and best practices, explore our related documentation and resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/a78a50b7-8591-448a-bce8-5c2303d527b6)**
>
> Watch video content
