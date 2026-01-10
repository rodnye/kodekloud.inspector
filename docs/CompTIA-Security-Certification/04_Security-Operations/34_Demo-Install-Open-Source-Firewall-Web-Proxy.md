# Demo Install Open Source Firewall Web Proxy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Operations/Demo-Install-Open-Source-Firewall-Web-Proxy)

---

## Table of Contents

- Demo Install Open Source Firewall Web Proxy
  - Step 1: Restrict Access to the Web Server Using iptables
  - Step 2: Install and Configure the Squid Proxy Server
  - Watch Video
  - Practice Lab

---

## Content

CompTIA Security+ Certification

Security Operations

# Demo Install Open Source Firewall Web Proxy

Welcome to this detailed lesson on setting up an open-source firewall and web proxy. In this guide, we explain how web proxies work as intermediaries for internet traffic by receiving requests from internal hosts and fetching the corresponding web pages from the internet. This design offers several benefits:

- Enhanced security by isolating internal hosts from malicious internet scripts and programs.
- Centralized monitoring and protection since only the proxy server needs to be secured.
- Improved performance through caching of frequently accessed content, thereby reducing overall traffic.

Our lab setup mimics this environment with a web server and two hosts: • One host runs the proxy server (using Kali Linux), and  
• The other serves as the internal web server.

---

## Step 1: Restrict Access to the Web Server Using iptables

Start by SSH-ing into the web server to configure iptables as your primary firewall.

1.  **Verify iptables Installation**

    Connect to the web server and check if iptables is installed:

    ```
    ssh bob@web-server
    iptables --version
    ```

2.  **Install iptables if Missing**

    If the command shows that iptables is not installed, update your package list and install it:

    ```
    sudo apt update && sudo apt install -y iptables
    iptables --version
    ```

3.  **Restrict Traffic from Node 2**

    Determine Node 2’s IP address using nslookup:

    ```
    nslookup node02
    ```

    Assume the output indicates Node 2’s IP is 192.147.220.6. Add a rule to drop all incoming traffic from this node:

    ```
    sudo iptables -A INPUT -s 192.147.220.6 -j DROP
    ```

    > [!important]
    > **Note**
    >
    > This rule prevents Node 2 from accessing the web server directly, ensuring that all traffic must route through the proxy server.

---

## Step 2: Install and Configure the Squid Proxy Server

To regulate access further, we will install the Squid proxy server. This section explains how to install and configure Squid on the proxy server.

1.  **SSH into the Proxy Server**

    Open another terminal window and connect to the proxy server:

    ```
    ssh bob@proxy-server
    ```

2.  **Install Squid Proxy**

    Install Squid. The installation process may vary by distribution; in our lab, the installation output confirms that Squid and its dependencies were successfully installed. Verify by checking the service status during installation.

3.  **Configure Squid**

    Open the Squid configuration file using your preferred text editor:

    ```
    sudo vi /etc/squid/squid.conf
    ```

    Within this file, locate the sections for Access Control Lists (ACLs) and access rules. Below is an example excerpt illustrating the recommended settings:

    ```
    #
    # Recommended minimum configuration:
    #
    # Example rule allowing access from your local networks.
    # Adapt these rules to reflect your internal IP networks.
    acl localnet src 0.0.0.0/0.0.0.0    # RFC 1122 "this" network (LAN)
    acl localnet src 10.0.0.0/8         # RFC 1918 local private network (LAN)
    acl localnet src 172.16.0.0/12      # RFC 1918 local private network (LAN)
    acl localnet src 192.168.0.0/16     # RFC 1918 local private network (LAN)
    acl localnet src fc00::/7           # RFC 4193 local private network range
    acl localnet src fe80::/10          # RFC 4291 link-local (directly plugged) machines


    #
    acl SSL_ports port 443
    acl Safe_ports port 80    # http
    acl Safe_ports port 21    # ftp
    acl Safe_ports port 443   # https
    acl Safe_ports port 70    # gopher
    acl Safe_ports port 210   # wais
    acl Safe_ports port 280   # http-mgmt
    acl Safe_ports port 488   # gss-http
    acl Safe_ports port 591   # filemaker
    acl Safe_ports port 777   # multiling http


    #
    # Access Permission Configuration:
    #
    # Deny requests to certain unsafe ports
    http_access deny !Safe_ports


    # Deny CONNECT to non-SSL ports
    http_access deny CONNECT !SSL_ports


    # Only allow cache manager access from localhost
    http_access allow localhost manager
    http_access deny manager


    # It is recommended to protect access to localhost-based services.
    # http_access deny to_localhost
    ```

4.  **Insert Custom Rules**

    Scroll down to where you can add your own rules. To manage access from your clients, add the following ACLs and access rules. Assume Node 2’s IP is 192.147.220.6 and the internal web server’s IP is 192.147.220.3:

    ```
    # INSERT YOUR OWN RULE(S) HERE TO ALLOW ACCESS FROM YOUR CLIENTS


    # Define ACLs for specific hosts
    acl node02 src 192.147.220.6
    acl web_server src 192.147.220.3


    # Optionally, define a destination ACL for the internal web server
    acl web_server_dst dst 192.147.220.3


    #
    # Allow access from local networks and localhost
    http_access allow localnet
    http_access allow localhost


    # Finally, deny all other access to this proxy
    http_access deny all


    # Squid normally listens on port 3128
    http_port 3128


    # Uncomment and adjust the following to add a disk cache directory.
    # cache_dir ufs /var/spool/squid 100 16 256


    # Specify the directory for coredumps
    coredump_dir /var/spool/squid
    ```

    > [!important]
    > **Note**
    >
    > These configuration rules ensure that general internal traffic is permitted while access from Node 2 to the web server is only allowed through the proxy server.

5.  **Restart Squid Service**

    After saving your changes, restart the Squid service to apply the new configuration:

    ```
    sudo systemctl restart squid
    ```

    Confirm that the Squid service has restarted successfully.

---

Now it’s your turn to practice configuring a web proxy through hands-on labs. This lesson demonstrated how to secure an internal web server using iptables and how to manage client access via a Squid proxy server, enhancing both your security and network performance.

For more detailed information, explore these useful resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/b13ce20f-66c3-4d31-b6df-23192480b4d4/lesson/f03eefcd-e6b6-4677-bcec-54b07915b3e8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/b13ce20f-66c3-4d31-b6df-23192480b4d4/lesson/42574e2b-a307-4197-bedd-8ff17c33d80f)**
>
> Practice lab
