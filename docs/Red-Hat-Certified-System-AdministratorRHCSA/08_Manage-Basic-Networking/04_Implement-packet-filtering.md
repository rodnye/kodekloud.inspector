# Implement packet filtering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Basic-Networking/Implement-packet-filtering)

---

## Table of Contents

- Implement packet filtering
  - Filtering Traffic by Source
  - Making Rules Permanent
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Basic Networking

# Implement packet filtering

In this lesson, we explore how to implement packet filtering in Linux. Packet filtering is essential for network security as it controls which network packets are allowed to pass through the system—helping protect against unwanted or malicious traffic.

Data transmitted over a network is divided into small pieces called packets. For instance, when a JPEG image is sent from Computer A to Computer B, it may be split into hundreds of packets. By default, a computer accepts any packet it receives, and these packets are processed in one of two ways:

1.  A program intercepts and processes the packet.
2.  If no program is configured to process the packet, it is discarded.

To secure your system, you can introduce a firewall that filters incoming and outgoing network packets. On Red Hat-based systems (including CentOS), the tool FirewallD simplifies packet filtering. FirewallD uses zones to organize network interfaces, with each zone having its own set of rules.

Imagine a server with two network interfaces—one wireless and one wired. You might assign the wireless interface to a restrictive zone called "Drop" (which blocks all incoming connections) and the wired interface to a zone called "Trusted" (where all connections are accepted due to the trusted nature of office network traffic).

![The image is a diagram illustrating a firewall setup with two zones: "trusted" and "Drop," connected to a computer labeled "FirewallD Computer B."](https://kodekloud.com/kk-media/image/upload/v1752883585/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Implement-packet-filtering/firewall-setup-trusted-drop-diagram.jpg)

> [!important]
> **Firewall Zones Overview**
>
> By default, the active zone in many systems is "public." In the public zone, every incoming connection is blocked unless explicitly allowed. This setup helps protect the system against unsolicited access.

To check which zone is currently set as default, use these commands:

```
$ firewall-cmd --get-default-zone
public


$ firewall-cmd --set-default-zone=public


$ sudo firewall-cmd --list-all
```

The output from these commands shows which incoming connections are accepted. The "services" line indicates allowed connections. These services are associated with specific ports. For example, to check the port used for the Cockpit service, run:

```
$ firewall-cmd --get-default-zone
public


$ firewall-cmd --set-default-zone=public


$ sudo firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: enp0s3
  sources:
  services: cockpit dhcpv6-client ssh


$ sudo firewall-cmd --info-service=cockpit
Ports: 9090/tcp
```

This result confirms that incoming TCP connections on port 9090 are allowed for the Cockpit service.

There are two methods to allow traffic to a specific port. For instance, if you have installed an HTTP server such as Apache or Nginx, you can allow traffic by enabling the HTTP service:

```
$ sudo firewall-cmd --add-service=http
success
```

Alternatively, you can allow TCP connections directly to port 80:

```
$ sudo firewall-cmd --add-port=80/tcp
success
```

> [!important]
> **Important Reminder**
>
> Choose one method for configuring your rules—either by service name or direct port specification—to avoid conflicts. After adding a new rule, verify your FirewallD configuration to ensure the rule was applied successfully.

To remove an allowed service, you can either remove it by name or by specifying the port number. In the public zone, the default policy is to deny all incoming connections unless explicitly permitted through a service or port rule.

## Filtering Traffic by Source

You can also filter traffic based on its source. Instead of solely considering incoming ports, you can restrict traffic based on its origin. For example, you might allow traffic from a specific network range if it adheres to a trusted policy.

![The image shows a dark-themed interface for implementing packet filtering, with a command input area on the left and a "Trusted zone" IP range (10.11.12.0 to 10.11.12.255) on the right.](https://kodekloud.com/kk-media/image/upload/v1752883586/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Implement-packet-filtering/packet-filtering-interface-dark-theme.jpg)

To configure a trusted zone for IP addresses in the 10.11.12.0/24 range, use the following command:

```
$ sudo firewall-cmd --add-source=10.11.12.0/24 --zone=trusted
success
```

This command directs all traffic from the specified IP range to be handled under the trusted zone rules, which accept all incoming traffic—ideal for networks that are considered secure.

To verify active zones and their configurations, run:

```
$ sudo firewall-cmd --add-source=10.11.12.0/24 --zone=trusted
success


$ firewall-cmd --get-active-zones
public
  interfaces: enp0s3
trusted
  sources: 10.11.12.0/24
```

To remove an IP-based rule, use a similar command that specifies both the source IP and the zone from which it should be removed.

## Making Rules Permanent

Note that by default, all rules you add are temporary and will be reset upon reboot. It is important to test new rules before saving them permanently. For example, if you want to allow incoming traffic to port 12345, you would first add a temporary rule:

```
$ sudo firewall-cmd --add-port=12345/tcp
success
```

After confirming that the application listening on port 12345 is accessible, you can save the rule permanently with a subsequent command.

This concludes our lesson on implementing packet filtering in Linux. In upcoming lessons, we will delve deeper into additional FirewallD configurations and scenarios—helping you build a more secure environment.

For further reading, check out the following resources:

- [Linux Firewall Documentation](https://firewalld.org/documentation/)
- [Red Hat Enterprise Linux Security Guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/)

Happy filtering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/11d431e1-813c-43c0-a118-0b2f5a7ddc2d)**
>
> Watch video content
