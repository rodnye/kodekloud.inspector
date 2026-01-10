# Setting Up DNS Monitoring Tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Demystifying-DNS/Miscellaneous/Setting-Up-DNS-Monitoring-Tools)

---

## Table of Contents

- Setting Up DNS Monitoring Tools
  - Using Docker and netshoot for DNS Monitoring
  - Analyzing DNS Resolution Steps
  - Monitoring DNS Traffic with Wireshark
  - Capturing DNS Traffic with tcpdump
  - Conclusion
  - Watch Video

---

## Content

Demystifying DNS

Miscellaneous

# Setting Up DNS Monitoring Tools

Monitoring DNS can be complex, but this guide highlights several techniques to help you get started. Use these methods to troubleshoot and understand DNS behavior in containerized environments and Kubernetes setups.

> [!important]
> **Overview**
>
> In this guide, we cover DNS monitoring using tools such as netshoot, Wireshark, and tcpdump. We also demonstrate how to trace network system calls and review the detailed output from DNS queries.

## Using Docker and netshoot for DNS Monitoring

If you’re on macOS, one quick way to access various networking tools is by running the [netshoot Docker image](https://hub.docker.com/r/nicolaka/netshoot). This container includes pre-installed utilities that are perfect for DNS troubleshooting in containerized setups.

To run the netshoot container, execute:

```
docker run --rm -it nicolaka/netshoot
```

Inside the container, you can use tools like `strace` to trace system calls. For instance, the command below monitors network-related system calls during a DNS lookup. The `-f` flag instructs `strace` to follow any child processes, ensuring comprehensive activity logging, and the `-e trace=network` option limits the output to network system calls:

```
strace -f -e trace=network dig +trace +additional +all jcroyoan.io NS
```

When you search for the term "connect" in the output, you may notice it is followed by corresponding send and receive operations. This indicates which nameserver provides the DNS answer. For example, the beginning of the output might look like this:

```
strace: Process 89 attached
[pid 87] socket(AF_INET, SOCK_DGRAM, IPPROTO_IP) = 17
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEPORT, [1], 4) = 0
[pid 87] setsockopt(17, SOL_SOCKET, SO_INCOMING_CPU, [1], 4) = 0
[pid 87] setsockopt(17, SOL_IP, IP_MTU_DISCOVER, [5], 4) = 0
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
[pid 87] getpeername(17, 0xffff9216df98, [128]) = -1 ENOTCONN (Socket not connected)
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
[pid 87] bind(17, {sa_family=AF_INET, sin_port=htons(0), sin_addr=inet_addr("0.0.0.0")}, 16) = 0
[pid 87] connect(17, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("192.168.65.7")}, 16) = 0
[pid 87] sendmsg(17, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="304\264\1 \0\1\0\0\0\0\0\200\200\0\0\0\10"..., iov_len=40}], msg_controllen=0, msg_flags=0}, 0) = 40
[pid 87] recvmsg(17, {msg_name={sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("192.168.65.7")}, msg_namelen=128} = 16, msg_iov=[{iov_base="\304\264\201\200\1\1\0\0\0\0\0\0\216\0\24\1"..., iov_len=131070}], msg_iovlen=1, msg_controllen=0, msg_flags=0}, 0) = 420
```

The above output typically originates from the resolver within the Docker environment. Recursive resolvers come pre-configured with a list of IP addresses (root hints) for the root nameservers, ensuring proper initiation of the DNS resolution process.

## Analyzing DNS Resolution Steps

Following the resolution chain further reveals subsequent nameserver responses. In the next example, the second DNS response is received from a different IP address:

```
strace -f -e trace=network dig +trace +additional +all jcroyoan.io NS
```

This segment of the `strace` output shows communication with the nameserver at IP address 205.251.195.12:

```
[pid 87] setsockopt(17, SOL_SOCKET, SO_INCOMING_CPU, [1], 4) = 0
[pid 87] setsockopt(17, SOL_IP, IP_MTU_DISCOVER, [5], 4) = 0
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
[pid 87] getpeername(17, 0xffff9216da88, [128]) = -1 ENOTCONN (Socket not connected)
[pid 87] setsockopt(17, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
[pid 87] bind(17, {sa_family=AF_INET, sin_port=htons(0), sin_addr=inet_addr("0.0.0.0")}, 16) = 0
[pid 87] connect(17, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("205.251.195.12")}, 16) = 0
[pid 87] sendmsg(17, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="\305\22\0\0\1\tjcroyoaun\2io\0\0\2\0\1\0\0", iov_len=53}], msg_iovlen=1, msg_controllen=0, msg_flags=0}, 0) = 53
[pid 87] recvmsg(17, {msg_name={sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("205.251.195.12")}, msg_namelen=128, msg_iov=[{iov_base="\305\22\204\0\1\0\4\0\0\0\1tjcroyoan.io\0\0\2\0\1\0", iov_len=131070}], msg_iovlen=1, msg_controllen=0, msg_flags=0}, 0) = 181
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50450
;; flags: qr aa ad; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: do; udp: 4096
;; QUESTION SECTION:
; jcroyoaun.io.		IN	NS
;; ANSWER SECTION:
```

A reverse DNS lookup confirms that the IP address 205.251.195.12 is associated with an AWS nameserver. Use the following command:

```
dig -x 205.251.195.12
```

The output confirms the AWS nameserver mapping:

```
;; <<>> DiG 9.18.25 <<>> -x 205.251.195.12
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 17258
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0


;; QUESTION SECTION:
;12.195.251.205.in-addr.arpa.      IN      PTR


;; ANSWER SECTION:
12.195.251.205.in-addr.arpa. 4502 IN PTR ns-780.awsdns-33.net.


;; Query time: 2 msec
;; SERVER: 192.168.65.7#53(192.168.65.7) (UDP)
;; WHEN: Thu Feb 06 11:13:40 UTC 2025
;; MSG SIZE  rcvd: 106
```

This indicates that the recursive resolver likely returned a cached answer for the AWS nameserver’s IP instead of performing a full DNS resolution from scratch.

## Monitoring DNS Traffic with Wireshark

Another powerful tool for DNS monitoring is [Wireshark](https://www.wireshark.org/). On macOS, Wireshark enables you to capture and inspect DNS traffic in real time. After launching Wireshark, follow these steps:

1.  Select the network interface (typically `EN0` for internet connectivity).
2.  Apply a filter to display only DNS traffic. A common filter is to capture UDP and TCP traffic on port 53.
3.  Run a DNS query, for example:

    ```
    dig kodekloud.com
    ```

The resulting output might resemble:

```
;; <<>> DiG 9.10.6 <<>> kodekloud.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 16960
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;kodekloud.com.			IN	A


;; ANSWER SECTION:
kodekloud.com.	300	IN	A	104.26.11.250
kodekloud.com.	300	IN	A	104.26.10.250
kodekloud.com.	300	IN	A	172.67.68.105


;; Query time: 40 msec
;; SERVER: 2806:10c0:ffff:e#53(2806:10c0:ffff::e)
;; WHEN: Thu Feb 06 05:41:36 CST 2025
;; MSG SIZE  rcvd: 90
```

This packet information lets you drill down into the query and response details, enabling deeper insights into DNS operations.

## Capturing DNS Traffic with tcpdump

For command-line enthusiasts, [tcpdump](https://www.tcpdump.org/) provides an effective way to monitor DNS traffic. Use the command below to capture all traffic on the default DNS port (53):

```
sudo tcpdump -i any port 53
```

After authenticating, tcpdump will begin displaying live DNS traffic. Below is an example snippet from tcpdump output:

```
2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.61267: 8761 3/0/0 CNAME ocs p2.g.aaplimg.com., AAAA 2620:149:a32:f000::140, AAAA 2620:149:a32:f000::146 (136)
05:42:56.523882 IP6 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain > 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.50581: 10239 0/1/0 (108)
05:42:56.769404 IP6 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.59993 > 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain: 7332+ Type65? ssl.gstatic.com. (33)
05:42:56.769597 IP6 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.50067 > 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain: 16758+ AAAA? ssl.static.com. (33)
05:42:56.769660 IP6 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.53470 > 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain: 28683+ A? ssl.static.com. (33)
05:42:56.785218 IP6 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain > 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.50067: 16758 1/0/0 AAAA 2607:f8b0:4012:81e::2003 (61)
05:42:56.781221 IP6 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain > 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.53470: 28683 1/0/0 A 172.52.163 (49)
05:42:56.785223 IP6 2806:10c:ffff:0000:0000:0000:0000:000e.ipv6.infinitum.net.mx.domain > 2806:108e:0011:d44d:bcf4:3ce5:b3d0:12cd.ipv6.infinitum.net.mx.59993: 7332 0/1/0 (90)
```

> [!important]
> **Tip**
>
> Because DNS logs can be very detailed, leveraging AI chatbots or other interpretative tools can help demystify the complex outputs from tools like tcpdump.

## Conclusion

Effective DNS monitoring requires the use of multiple tools and techniques. By combining the use of netshoot for system call tracing, Wireshark for detailed packet analysis, and tcpdump for capturing live traffic, you can gain valuable insights into your DNS processes. Remember to always handle log data carefully and avoid exposing any sensitive information.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/demystifying-dns/module/eb686425-78d9-4e58-9903-c2ee56b25f3c/lesson/20548ba7-eb86-4a56-b543-829c14a3dfa7)**
>
> Watch video content
