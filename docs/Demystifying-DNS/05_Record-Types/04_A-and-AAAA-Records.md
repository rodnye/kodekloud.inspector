# A and AAAA Records - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Record-Types/A-and-AAAA-Records)

---

## Table of Contents

- A and AAAA Records
  - Obtaining the IP Address from node02
  - Adding the A Record to the Zone File
  - Testing DNS Resolution for a Subdomain
  - Configuring the Apex Domain
  - Next Steps: Configuring a CNAME Record
  - Watch Video

---

## Content

Demystifying DNS

Record Types

# A and AAAA Records

In this lesson, we will explore how to configure A and AAAA records in DNS. While the demo will focus on A records, configuring AAAA records follows an identical process—the only difference is that AAAA records map domain names to IPv6 addresses instead of IPv4.

An A record maps a domain name to an IPv4 address by using a 4-byte address field in DNS packets, whereas a AAAA record maps a domain name to an IPv6 address with a 16-byte address field. Additionally, DNS packet headers include flags to identify the type of each record.

## Obtaining the IP Address from node02

Before updating the DNS zone file, determine the IP address for node02. Since the IP address may change in each playground session, run the following command to capture its current IPv4 address:

```
bob@node01 ~ > ping node02
PING node02 (192.5.180.8) 56(84) bytes of data.
64 bytes from sandbox-ubuntu-multi-node-tyqrvp25f4w255rv_vm02.1.lej1m5c8m0xsx1upftq3psgz.sandbox-ubuntu-multi-node-tyqrvp25f4w255rv_k: icmp_seq=1 ttl=64 time=0.070 ms
64 bytes from sandbox-ubuntu-multi-node-tyqrvp25f4w255rv_vm02.1.lej1m5c8m0xsx1upftq3psgz.sandbox-ubuntu-multi-node-tyqrvp25f4w255rv_k: icmp_seq=2 ttl=64 time=0.077 ms
```

## Adding the A Record to the Zone File

With the IP address in hand, open your DNS zone file and add an A record to map node02 to its current IPv4 address:

```
$TTL  300
@  IN  SOA  ns1.my.kodekloudlab.com. admin.my.kodekloudlab.com. (
                  2         ; Serial
              604800         ; Refresh
               86400         ; Retry
              2419200       ; Expire
               604800 )     ; Negative Cache TTL


@  IN  NS  ns1.my.kodekloudlab.com.
ns1    IN  A   127.0.0.1
node02 IN  A   192.5.180.8
```

After saving your changes, restart BIND9 to update the configuration.

## Testing DNS Resolution for a Subdomain

Initially, node02 is treated as a subdomain. Use the commands below to verify DNS resolution:

```
bob@node01 ~ ➜ sudo vi /etc/bind/db.my.kodekloudlab.com
bob@node01 ~ ➜ sudo systemctl reload named
bob@node01 ~ ➜ dig @localhost node02.my.kodekloudlab.com


; <<>> DiG 9.18.30-Ubuntu <<>> @localhost node02.my.kodekloudlab.com
;; (2 servers found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35077
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: d465d946485bd720100000067934232e87eb022df3a8ff94 (good)
;; QUESTION SECTION:
;node02.my.kodekloudlab.com. IN A


;; ANSWER SECTION:
node02.my.kodekloudlab.com. 300 IN 192.5.180.8


;; Query time: 0 msec
;; SERVER: 127.0.0.1#53(localhost) (UDP)
;; WHEN: Fri Jan 24 02:33:18 EST 2025
;; MSG SIZE  rcvd: 99
bob@node01 ~ ➜
```

## Configuring the Apex Domain

For many web deployments, you may want the apex domain (e.g., my.kodekloudlab.com) to resolve directly to your server’s IP address. This is especially useful when hosting a web server. To do so, update your zone file so that the apex domain uses the at symbol (@) instead of an explicit subdomain:

1.  Open the zone file:

    ```
    bob@node01 ~ ➜ sudo vi /etc/bind/db.my.kodeloudlab.com
    ```

2.  Reload the DNS configuration:

    ```
    bob@node01 ~ ➜ sudo systemctl reload named
    ```

3.  Verify the DNS resolution for your domain:

    ```
    bob@node01 ~ ➜ dig @localhost node02.my.kodeloudlab.com


    ;; <<>> DiG 9.18.30-Ubuntu <<>> @localhost node02.my.kodeloudlab.com
    ;; (2 servers found)
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35077
    ;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


    ;; OPT PSEUDOSECTION:
    ; EDNS: version: 0, flags:; udp: 1232
    ; COOKIE: d465d94d6485bd720100000067934228e87eb022df3a8ff94 (good)
    ;; QUESTION SECTION:
    ;node02.my.kodeloudlab.com.  IN A


    ;; ANSWER SECTION:
    node02.my.kodeloudlab.com. 300 IN 192.5.180.8


    ;; Query time: 0 msec
    ;; SERVER: 127.0.0.1#53(localhost) (UDP)
    ;; WHEN: Fri Jan 24 02:33:18 EST 2025
    ;; MSG SIZE  rcvd: 99
    ```

Next, update the zone configuration to set the apex domain as follows:

```
$TTL 300
@ IN SOA ns1.my.kodekouldab.com. admin.my.kodekouldab.com. (
    2          ; Serial
    604800     ; Refresh
    86400      ; Retry
    2419200    ; Expire
    604800     ; Negative Cache TTL
)
@ IN NS ns1.my.kodekouldab.com.
ns1 IN A 127.0.0.1
@ IN A 192.5.180.8
```

Restart BIND9 once again and confirm that the apex domain resolves correctly:

```
bob@node01 ~ ➜ sudo vi /etc/bind/db.my.kodekloudlab.com
bob@node01 ~ ➜ sudo systemctl reload named
bob@node01 ~ ➜ dig @localhost my.kodekloudlab.com


;; <<>> DiG 9.18.30-Ubuntu <<>> @localhost my.kodekloudlab.com
;; (2 servers found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39219
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 0a28c953013cb81010000006793426ba2a0f365488a04bf (good)
;; QUESTION SECTION:
;my.kodekloudlab.com.        IN      A


;; ANSWER SECTION:
my.kodekloudlab.com. 300 IN A 192.5.180.8


;; Query time: 0 msec
;; SERVER: 127.0.0.1#53(localhost) (UDP)
;; WHEN: Fri Jan 24 02:34:03 EST 2025
;; MSG SIZE  rcvd: 92
```

With this configuration, accessing the apex domain (my.kodekloudlab.com) will directly reach the web server on node02.

> [!important]
> **Note**
>
> If you plan to configure a AAAA record, use the same process as for the A record. The only difference is that you will be mapping the domain to an IPv6 address.

## Next Steps: Configuring a CNAME Record

After successfully configuring the A record (and potentially a AAAA record), the next step is to configure a CNAME record. This record type allows you to alias one domain name to another. Detailed steps for configuring a CNAME record will be covered in the following lesson.

For additional DNS configuration best practices and further reading, check out the [DNS Concepts](https://en.wikipedia.org/wiki/Domain_Name_System) documentation.

Happy DNS configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/57433009-69d5-4b38-8c58-dde5c3354c62/lesson/b3cf28a3-3295-4d3f-b670-7322201db05f)**
>
> Watch video content
