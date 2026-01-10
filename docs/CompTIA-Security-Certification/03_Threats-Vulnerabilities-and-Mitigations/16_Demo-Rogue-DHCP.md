# Demo Rogue DHCP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Demo-Rogue-DHCP)

---

## Table of Contents

- Demo Rogue DHCP
  - How DHCP Works
  - Rogue DHCP Servers
  - Lab Questions
  - Installing and Running Ettercap
  - Testing the Rogue DHCP Server
  - Conclusion
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Configuring Ettercap's DHCP Settings

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Demo Rogue DHCP

Welcome to this lab article on the DHCP Rogue Service. In this guide, we will explore how DHCP (Dynamic Host Configuration Protocol) works, the risks associated with rogue DHCP servers, and how to set up a rogue DHCP server using Ettercap.

DHCP is essential for network management as it automatically assigns IP configuration details—such as IP addresses, subnet masks, default gateways, and DNS servers—to hosts. This automation simplifies network management, especially in environments with numerous devices. For instance, rather than manually configuring a thousand workstations, DHCP enables each device to receive its network configuration at startup.

![The image illustrates the concept of simplifying IP management using DHCP, showing a network of workstations connected to a DHCP server, which assigns IP addresses, subnet masks, and default gateways.](https://kodekloud.com/kk-media/image/upload/v1752872569/notes-assets/images/CompTIA-Security-Certification-Demo-Rogue-DHCP/dhcp-ip-management-network-diagram.jpg)

## How DHCP Works

When a client powers on, it initiates the DHCP process by broadcasting a DHCP Discover message that seeks a DHCP server to provide the necessary configuration details. Upon receiving this broadcast, a DHCP server responds with a DHCP Offer containing an IP lease. The client then selects an offer and sends a DHCP Request to confirm the chosen server's offer. Finally, the DHCP server sends a DHCP ACK (acknowledgment), finalizing the configuration process.

![The image illustrates the DHCP process between a client and a server, showing the sequence of DHCP Discover, Offer, Request, and ACK messages.](https://kodekloud.com/kk-media/image/upload/v1752872570/notes-assets/images/CompTIA-Security-Certification-Demo-Rogue-DHCP/dhcp-process-client-server-diagram.jpg)

## Rogue DHCP Servers

A rogue DHCP server is an unauthorized server that can distribute false network configuration settings. Attackers can exploit this by providing incorrect information to clients—for example, designating the rogue server as the default gateway. This misdirection causes clients to send all outbound traffic through the attacker-controlled gateway, allowing the attacker to intercept, manipulate, or capture data. Since the rogue server can seamlessly forward traffic to the intended destination like a proxy, the attack may remain undetected.

![The image illustrates a DHCP rogue server scenario, showing a client PC requesting an IP address and receiving responses from both legitimate DHCP servers and rogue servers.](https://kodekloud.com/kk-media/image/upload/v1752872572/notes-assets/images/CompTIA-Security-Certification-Demo-Rogue-DHCP/dhcp-rogue-server-diagram.jpg)

Consider a scenario where a client's request to access a website (e.g., [KodeKloud](https://www.kodekloud.com)) is intercepted by a rogue DHCP server. Instead of routing the traffic through the legitimate gateway, the rogue server directs it through a malicious gateway. The attacker then retrieves the content from the intended destination and sends it back to the client. Since the rogue server works as a transparent proxy, the client remains unaware of this interception.

![The image illustrates a "Rogue DHCP Server Attack" where a client PC receives a rogue DHCP offer from rogue servers, leading to traffic being sent to a rogue gateway, which then forwards requests to a legitimate site.](https://kodekloud.com/kk-media/image/upload/v1752872573/notes-assets/images/CompTIA-Security-Certification-Demo-Rogue-DHCP/rogue-dhcp-server-attack-diagram.jpg)

Due to the easy availability of DHCP server software online, setting up a rogue DHCP server can be straightforward yet highly damaging.

![The image describes a "Rogue DHCP Server Attack," highlighting its difficulty to detect, the availability of DHCP server software for attacks, and how a rogue server can intercept traffic by acting as a fake gateway or router.](https://kodekloud.com/kk-media/image/upload/v1752872574/notes-assets/images/CompTIA-Security-Certification-Demo-Rogue-DHCP/rogue-dhcp-server-attack-diagram-2.jpg)

> [!important]
> **Lab Objective**
>
> In this lab, you will learn how to set up a rogue DHCP server using Ettercap and understand its impact on network security.

## Lab Questions

1.  **What is the primary goal of a rogue DHCP server attack?**  
    The main objective is to disrupt network services by misconfiguring client networks and directing traffic through an attacker-controlled gateway.
2.  **Which protocol does a rogue DHCP server use to offer IP addresses?**  
    The rogue server uses the **DHCP** protocol.
3.  **What information can a rogue DHCP server provide to a client?**  
    It can supply the IP address, default gateway, and DNS server information.
4.  **How can a rogue DHCP server affect network security?**  
    A rogue server can redirect network traffic to malicious servers, compromising data integrity and confidentiality.
5.  **Which tool is commonly used to set up a rogue DHCP server for educational purposes?**  
    Among the available options, **Ettercap** is frequently used, while tools like Nmap are more suited for network discovery.

## Installing and Running Ettercap

To set up the rogue DHCP service, start by installing Ettercap on the control plane node. Ensure you are logged in as a root or an authorized user, then execute the following command:

```
root@controlplane ~ >
```

After installation, verify that Ettercap is properly installed and then configure it to run a rogue DHCP server.

### Configuring Ettercap's DHCP Settings

Edit the Ettercap DHCP configuration file to include the following settings:

```
iface = eth1
subnet = 172.28.128.0
netmask = 255.255.255.0
range = 172.28.128.200 172.28.128.250
```

In this configuration:

- `iface` specifies the network interface (eth1).
- `subnet` and `netmask` define the network parameters.
- `range` determines the IP lease range offered to clients.

Once configured, launch Ettercap with the DHCP spoof plugin by running:

```
ettercap -T -q -i eth1 -P dhcp_spoof
```

You should see output similar to the following, indicating that Ettercap is running:

```
Setting up ettercap-common (1:0.8.3.1-5) ...
Setting up libasplit0.2:amd64 (2.4.0-3) ...
Setting up libcairo2:amd64 (1.16.0-5ubuntu2) ...
Setting up libgtk-3-bin (3.24.20-0ubuntu1) ...
Setting up libglib2.0-0:amd64 (2.64.6-1ubuntu1) ...
Setting up ubuntu-mono (20.10-0ubuntu1) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for libc-bin (2.35-0ubuntu3.7) ...
Scanning processes...
Scanning linux images...


Running kernel seems to be up-to-date.
No services need to be restarted.
No containers need to be restarted.
No user sessions are running outdated binaries.
No VM guests are running outdated hypervisor (qemu) binaries on this host.
root@controlplane ~ #
```

Ensure that Ettercap activates its DHCP spoof plugin and begins intercepting DHCP traffic on the specified interface.

## Testing the Rogue DHCP Server

To verify that your rogue DHCP server is operational, follow these steps on a client node:

1.  Release the current DHCP lease and request a new one:

    ```
    sudo dhclient -r eth1
    sudo dhclient eth1
    ```

2.  Run Ettercap on the control plane to initiate DHCP spoofing:

    ```
    ettercap -T -q -i eth1 -P dhcp_spoof
    ```

When the client renews its DHCP lease, you should observe the DHCP Discover and Request messages, and the rogue server will respond accordingly:

```
ettercap 0.8.3.1 copyright 2001-2020 Ettercap Development Team


Listening on:
  eth1 -> 52:54:00:CD:BE:4A
  172.28.128.203/255.255.255.0
  fe80::5054:ff:fe4a:be4a/64


SSL dissection needs a valid `redir_command_on' script in the etter.conf file
Ettercap might not work correctly. /proc/sys/net/ipv6/conf/all/use_tempaddr is not set to 0.
Privileges dropped to EUID 65534 EGID 65534...


34 plugins
42 protocol disectors
57 ports monitored
28230 mac vendor fingerprints
1766 tcp OS fingerprint
2182 known services
Lua: no scripts were specified, not starting up!


Sorry, plugin 'dhcp_spoof' can not be found - skipping!


Randomizing 255 hosts for scanning...
Scanning the whole netmask for 255 hosts...
* |===============================>| 100.00 %


2 hosts added to the hosts list...
Starting Unified sniffing...


Text only Interface activated...
Hit 'h' for inline help


DHCP: [52:54:00:46:E4:90] DISCOVER
DHCP: [52:54:00:46:E4:90] REQUEST 172.28.128.209
```

> [!important]
> **Observation**
>
> When you see DHCP Discover and Request messages followed by responses from the rogue server, it confirms that the rogue DHCP server is actively intercepting traffic.

## Conclusion

In this lab article, you learned:

- How DHCP automatically assigns essential network configuration details.
- The step-by-step process of DHCP communication, including Discover, Offer, Request, and ACK.
- How a rogue DHCP server can intercept network traffic and redirect it to a malicious gateway.
- The process of setting up and testing a rogue DHCP server using Ettercap.

Now it’s your turn to explore the DHCP rogue server lab in your environment. Happy learning and stay secure!

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)
- [KodeKloud](https://www.kodekloud.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/696913a1-0d43-4cd2-b817-ed7b6e52b2e1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/bdc0cdaa-3768-40e7-a1d7-c44b1dfb749e)**
>
> Practice lab
