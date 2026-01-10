# Demo Perform an Nmap Port Scan - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Demo-Perform-an-Nmap-Port-Scan)

---

## Table of Contents

- Demo Perform an Nmap Port Scan
  - What Is Nmap?
  - How Port Scans Work
  - Scanning Techniques with Nmap
  - Lab Walkthrough
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Example Nmap Command
    - Question 1: What is the Primary Purpose of Nmap?
    - Exploring Nmap Options
    - Question 2: What Does the "-p" Option Specify?
    - Question 3: Which Option Performs a Stealth Scan?
    - Question 4: What Does the "-A" Option Do?
    - Question 5: Which Option Increases Verbosity?
    - Question 6: How Do You Save Scan Output to a File?
    - Lab Activity: Service and OS Detection

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Demo Perform an Nmap Port Scan

Welcome to this hands-on lesson on Nmap port scanning. In this guide, we will explore the basics of Nmap, its scan techniques, and how to interpret its output. Whether you are using Nmap for legitimate network administration or security assessments, this walkthrough will help you understand how to map a network and detect open ports.

## What Is Nmap?

Nmap—short for "Network Mapper"—is a powerful open-source tool used to scan networks. It identifies active IP addresses, detects open ports, and builds a map of devices along with the services running on them.

![The image features the Nmap logo with a description stating it is a network scanning tool that discovers devices and open ports, creating a map of network connections.](https://kodekloud.com/kk-media/image/upload/v1752872559/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-network-scanning-tool-logo.jpg)

Nmap is a favorite during the reconnaissance phase of security assessments as well as in everyday network administration. Its ability to quickly and accurately determine which services are running makes it very useful. Since it is open-source, installing and using Nmap comes at no cost.

![The image describes the purpose and usage of NMAP, highlighting its use in security assessment, gathering network information, and network administration.](https://kodekloud.com/kk-media/image/upload/v1752872560/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-security-assessment-usage.jpg)

> [!important]
> **Warning**
>
> Although Nmap is legal to use in the US and the EU, some of its switches can generate significant network traffic. Aggressive scanning may even disrupt target systems and can result in legal consequences if performed without authorization. Always ensure you have the necessary permissions before scanning any network.

![The image outlines risks and warnings associated with using NMAP, including excessive traffic, potential server crashes, traceability, ISP complaints, and legal issues from unauthorized scanning.](https://kodekloud.com/kk-media/image/upload/v1752872561/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-risks-warnings-diagram.jpg)

Because scan traffic can be traced back to its source, unauthorized scanning poses significant risks. For safe practices, always refer to the [Nmap website](https://nmap.org) for tutorials and dedicated practice sites.

![The image outlines best practices for using Nmap, including obtaining authorization, avoiding unauthorized scanning, using practice websites, following tutorials, and practicing in authorized test environments.](https://kodekloud.com/kk-media/image/upload/v1752872562/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-best-practices-guide.jpg)

## How Port Scans Work

Nmap scans serve two primary functions:

- Discovering live hosts by identifying active IP addresses.
- Determining which applications or servers are listening on specific ports.

These scans can target individual systems or entire networks.

![The image is an infographic about network discovery scans, highlighting IP addresses to check for live hosts and ports to identify running applications or services. It mentions scanning a single host or entire networks.](https://kodekloud.com/kk-media/image/upload/v1752872563/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/network-discovery-scans-infographic.jpg)

Nmap leverages the TCP three-way handshake to establish connections. This handshake involves:

- A SYN packet from the source.
- A SYN-ACK response from the destination.
- A final ACK from the source to complete the connection.

For example, when scanning an HTTP server (typically on TCP port 80), this handshake confirms that the port is open and accepting connections.

![The image illustrates the TCP 3-way handshake process between two computers, showing the exchange of SYN, SYN/ACK, and ACK packets. It includes descriptions of each step and the purpose of the handshake.](https://kodekloud.com/kk-media/image/upload/v1752872564/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/tcp-3way-handshake-process-diagram.jpg)

## Scanning Techniques with Nmap

When performing network discovery, Nmap offers several switches to modify its behavior:

- **TCP SYN Scan (Half-Open Scan):**  
  Sends a SYN packet and checks for a SYN-ACK reply without completing the full handshake. This stealthy method avoids forming a full TCP connection.
- **TCP Connect Scan:**  
  With the `-sT` option (case sensitive), this scan completes a full TCP handshake.

![The image is a diagram comparing two types of network discovery scans: TCP Syn Scan and TCP Connect Scan, detailing their functions and characteristics.](https://kodekloud.com/kk-media/image/upload/v1752872565/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/tcp-syn-connect-scan-comparison.jpg)

Nmap categorizes port statuses into:

- **Open:** The target responded, indicating the port is available.
- **Closed:** The target responded, but no service is running on the port.
- **Filtered:** A firewall or filter is blocking the traffic, making it unclear whether the port is open.

![The image shows a diagram of port status with three categories: Open, Closed, and Filtered, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752872566/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/port-status-diagram-open-closed-filtered.jpg)

### Example Nmap Command

Below is an example command that scans a target, with TCP port 22 open and TCP port 25 closed:

```
nmap -T4 -A -v scanme.nmap.org
```

- `-T4` increases the scan speed.
- `-A` enables aggressive scanning, including OS detection, version detection, script scanning, and traceroute.
- `-v` increases verbosity for more detailed output.

After scanning, Nmap may display additional tabs with detailed information about open ports, discovered IP addresses, and network topology.

![The image shows a network topology map from Nmap, illustrating router/firewall hops with nodes and connections. It includes tabs for different Nmap functions like output, ports, hosts, and scans.](https://kodekloud.com/kk-media/image/upload/v1752872567/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-network-topology-map.jpg)

## Lab Walkthrough

Once logged into the KodeKloud Hands-on Labs environment, you can begin with the following questions and exercises to reinforce your learning.

### Question 1: What is the Primary Purpose of Nmap?

- Monitor system performance
- **Scan and map networks**
- Design network hardware
- Develop network applications

Nmap is designed to scan and map networks, not for performance monitoring, hardware design, or application development.

### Exploring Nmap Options

For example, the `-p` option allows you to specify which ports to scan. Always refer to the official documentation for a comprehensive understanding of available options.

Below is an excerpt from the usage information provided by Nmap:

```
Nmap 7.93SVN ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] [target specification]
TARGET SPECIFICATION:
        Can pass hostnames, IP addresses, networks, etc.
        Ex: scanme.nmap.org, microsoft.com, 192.168.0.1, 10.0.0.0-255.1-254
        -iL <inputfilename>: Input from list of hosts/networks
        -iR <num hosts>: Choose random targets
        --exclude <host1[,host2][,host3]>: Exclude hosts/networks
        --exclude-file <exclude file>: Exclude list from file


HOST DISCOVERY
        -sL: List Scan - simply list targets to scan
        -sn: Ping Scan - disable port scan
        -Pn: Treat all hosts as online -- skip host discovery
        -PS[ports]: TCP SYN, ACK, UDP or SCTP discovery to given ports
        -PA[ports]: TCP ACK ping
        -PU[ports]: UDP ping
        -PY: Neve do DNS resolution/always resolve: [sometimes]
        -PE: Echo request (ICMP)
        -PP: Timestamp query (ICMP)
        -PR: ARP Ping
        --dns-servers <serv1[,serv2]>: Specify custom DNS servers
        --traceroute: Trace hop path to each host


SCAN TECHNIQUES
        -sS/SF/--sA: TCP SYN/Connect()/ACK/Window/Man-in-the-middle scans
        -sU: UDP Scan
        -sN/SF: TCP NULL, FIN, and Xmas scans
        -sA/--scanflags <flags>: Customize TCP scan flags
        -sI <id>: Idle Scan
        -sO: IP protocol scan


PORT SPECIFICATION
        -p <port ranges>: Only scan specified ports
        -p-: equivalent to -p 1-65535; Scan all ports
        -p 21,22,80,139,8080: Scan specific ports
        -p-: Fast note: scan ports that provide services usually
```

### Question 2: What Does the "-p" Option Specify?

The `-p` option tells Nmap which port range to scan.

### Question 3: Which Option Performs a Stealth Scan?

A stealth scan, also known as a TCP SYN scan, is performed using the `-sS` option. This scan sends a SYN packet and, if a SYN-ACK is received, indicates an open port without completing the TCP handshake.

![The image shows a search results page from the Nmap.org website, displaying results for the query "stealth" related to network scanning techniques. The page has a dark purple theme with navigation options at the top.](https://kodekloud.com/kk-media/image/upload/v1752872568/notes-assets/images/CompTIA-Security-Certification-Demo-Perform-an-Nmap-Port-Scan/nmap-search-results-stealth-network-scanning.jpg)

The demonstration below shows a sample stealth scan:

```
krad# nmap -p22,113,139 scanme.nmap.org
Starting Nmap ( https://nmap.org )
Nmap scan report for scanme.nmap.org (64.113.134.52)
PORT   STATE    SERVICE
22/tcp open     ssh
113/tcp closed   auth
139/tcp filtered netbios-ssn


Nmap done: 1 IP address (1 host up) scanned in 1.35 seconds
```

### Question 4: What Does the "-A" Option Do?

The `-A` option enables aggressive scanning. This includes OS detection, version detection, script scanning, and traceroute. Note that this option does not affect the scan speed.

### Question 5: Which Option Increases Verbosity?

The lowercase `-v` (verbose) option increases the verbosity level of the scan output by providing more detailed information.

### Question 6: How Do You Save Scan Output to a File?

Use the `-o` option followed by a specifier (for example, `-oN` for normal output) and a filename. For example:

```
nmap -sV -oN scanme_output.txt scanme.nmap.org
```

### Lab Activity: Service and OS Detection

1.  **Determining Nping Echo Service:**  
    Run a basic scan on the test host:

    ```
    nmap scanme.nmap.org
    ```

    A sample output might show:

    ```
    kali-host ~ ➜ nmap scanme.nmap.org
    Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-02 09:55 UTC
    Nmap scan report for scanme.nmap.org (45.33.32.156)
    Host is up (0.84s latency).
    Other addresses for scanme.nmap.org (not scanned): 2600:3c01:f03c:91ff:fe18:bb2f
    Not shown: 996 closed tcp ports (reset)
    PORT       STATE    SERVICE
    22/tcp     open     ssh
    80/tcp     open     http
    9929/tcp   open     nping-echo
    31337/tcp  open     Elite


    Nmap done: 1 IP address (1 host up) scanned in 1.17 seconds
    ```

    The output indicates that the Nping Echo service is running on port 9929.

2.  **Determining Elite Service:**  
    Run the same scan to observe that the Elite service runs on port 31337.
3.  **OS Detection:**  
    Use additional switches to detect the operating system:

    ```
    nmap -sV -O scanme.nmap.org
    ```

    The results may indicate that the target system is running Ubuntu Linux.

4.  **Identifying the Web Server:**  
    Run a version scan:

    ```
    nmap -sV scanme.nmap.org
    ```

    A sample output shows:

    ```
    kali-host ~ ➜ nmap -sV scanme.nmap.org
    Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-02 09:58 UTC
    Nmap scan report for scanme.nmap.org (45.33.32.156)
    Host is up (0.040s latency).
    Other addresses for scanme.nmap.org (not scanned): 2600:3c01:f03c:91ff:fe18:bb2f


    PORT      STATE  SERVICE    VERSION
    22/tcp    open   ssh        OpenSSH 6.6p1 Debian 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)
    80/tcp    open   http       Apache httpd 2.4.7 ((Ubuntu))
    9929/tcp  open   ping-echo  nginx (1.4.7)


    OS details: Linux 5.0 - 5.4 (94%), Linux 4.15 - 5.8 (95%), Linux 5.0 - 5.5 (94%), Linux 5.1 (94%), Linux 2.6.32 - 3.13 (9%)
    Network Distance: 1 hops


    OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/
    Nmap done: 1 IP address (1 host up) scanned in 11.70 seconds
    ```

    From this output, the web server running on port 80 is identified as Apache HTTPd version 2.4.7.

## Additional Resources

For more detailed information, refer to these useful links:

- [Nmap Documentation](https://nmap.org/book/man.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **Note**
>
> Always ensure that you have proper authorization before scanning any network to avoid potential legal issues.

Happy scanning, and remember to always scan networks responsibly and with proper authorization!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/2852a5de-df97-4639-a040-3d70b41ce3a1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/e7b98cb7-9bac-4fc7-8348-21f2146f2648)**
>
> Practice lab
