# Configure Packet Filtering Firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Configure-Packet-Filtering-Firewall)

---

## Table of Contents

- Configure Packet Filtering Firewall
  - Getting Started with UFW
  - Restricting SSH Access by IP Address
  - Allowing Traffic from an IP Range and Excluding Specific IPs
  - Blocking Outgoing Traffic on a Specific Interface
  - Building Complex UFW Rules
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Configure Packet Filtering Firewall

In this lesson, you will learn how to configure a firewall on Ubuntu machines to strengthen your server's defense against potential threats. A firewall acts as a barrier that blocks unwanted network data from reaching your server, effectively securing both incoming and outgoing traffic.

For example, consider an attacker who sends a malicious network packet designed to exploit an SSH daemon vulnerability. If the SSH daemon processes this packet, your system could be compromised. A packet filtering firewall identifies and rejects such malicious packets before they reach the SSH daemon, ensuring your system remains secure.

![The image illustrates the concept of packet filtering, showing a network data packet and a computer setup.](https://kodekloud.com/kk-media/image/upload/v1752881306/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Packet-Filtering-Firewall/packet-filtering-network-illustration.jpg)

This preventive mechanism ensures that the SSH daemon never processes exploit attempts. Various types of firewalls exist; for instance, an application firewall monitors specific applications and applies custom rules to allow or block traffic. On Windows, you might allow traffic for Chrome while blocking it for the Windows Calculator. In contrast, Linux comes with a default packet filtering firewall that directly deals with network packets rather than individual applications.

![The image illustrates "Packet Filtering in Linux" with icons representing Linux, a network data packet, and an application.](https://kodekloud.com/kk-media/image/upload/v1752881306/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Configure-Packet-Filtering-Firewall/packet-filtering-linux-diagram.jpg)

Now, let’s explore how to use a firewall on your Ubuntu machine.

---

## Getting Started with UFW

The simplest way to configure packet filtering rules on Ubuntu is by using UFW (Uncomplicated Firewall). By default, UFW is disabled; you can verify its status with:

```
sudo ufw status
```

You should see an output indicating that the firewall is inactive. Before enabling UFW, add at least one rule to allow SSH traffic to avoid locking yourself out. UFW uses a whitelist approach—only explicitly allowed traffic will pass through, while everything else is blocked.

To allow SSH (default port 22), use the following command:

```
sudo ufw allow 22
```

By default, this rule permits both TCP and UDP traffic, but since SSH uses TCP, you can specify it explicitly if needed.

Next, enable UFW:

```
sudo ufw enable
```

> [!important]
> **Warning**
>
> Enabling UFW may temporarily disrupt any active SSH connections. Confirm the SSH rule is in place before proceeding.

To view the detailed status, including active rules and default policies, run:

```
sudo ufw status verbose
```

After enabling UFW, you'll notice two rules for port 22 (one for IPv4 and one for IPv6), along with the following default policies:

- Incoming traffic is denied by default.
- Outgoing traffic is allowed.
- Routed packets are initially disallowed (this will be revised later when covering port redirection and NAT \[Network Address Translation\]).

---

## Restricting SSH Access by IP Address

The default SSH rule allows connections from any IP address on port 22. In a production environment, you may want to restrict access to a known IP address. For example, if your SSH connection originates from IP address 10.0.0.192, restrict access with:

```
sudo ufw allow from 10.0.0.192 to any port 22
```

The term "any" means the rule applies to all network interfaces on your machine. If you need to restrict the rule to a specific interface IP, replace "any" with that IP address.

To display your firewall rules in an ordered list, run:

```
sudo ufw status numbered
```

An example output might be:

```
Status: active

To                     Action      From
[ 1] 22               ALLOW IN    Anywhere
[ 2] 22               ALLOW IN    10.0.0.192
[ 3] 22 (v6)          ALLOW IN    Anywhere (v6)
```

Note that the generic rule (rule 1) permits all incoming SSH connections. Since the firewall processes rules sequentially (top to bottom), rule 1 will match before rule 2. To enforce the IP restriction, remove the generic rule.

First, list the rules:

```
sudo ufw status numbered
```

Then, delete the generic rule by its index:

```
sudo ufw delete 1
```

Confirm the deletion when prompted. Alternatively, you can remove the generic SSH rule by specifying its rule:

```
sudo ufw delete allow 22
```

If a rule does not exist (for example, if only the IPv6 rule is present), UFW will notify you that it could not find the specified rule.

---

## Allowing Traffic from an IP Range and Excluding Specific IPs

At times, you might prefer to allow an entire network range rather than a single IP address. To permit connections from the subnet 10.0.0.0/24 on port 22, use:

```
sudo ufw allow from 10.0.0.0/24 to any port 22
```

This rule allows traffic from any IP address between 10.0.0.0 and 10.0.0.255.

However, if you need to block a specific IP (for example, 10.0.0.37) while allowing the rest of the range, add a deny rule. Remember that firewall rules are processed sequentially; if an allow rule for the entire range is above the deny rule, the deny rule will not take effect.

For instance, consider the current set of rules:

```
sudo ufw status numbered
```

```
Status: active

To                     Action      From
[ 1] 22               ALLOW IN    10.0.0.192
[ 2] 22               ALLOW IN    10.0.0.0/24
[ 3] Anywhere         ALLOW IN    10.0.0.0/24
[ 4] Anywhere         DENY IN     10.0.0.37
```

In this setup, traffic from 10.0.0.37 will match rule 2 and be allowed, bypassing the deny rule. To ensure that the deny rule is processed first, insert it at the very top.

First, if necessary, delete the existing deny rule. Then insert it at index 1:

```
sudo ufw insert 1 deny from 10.0.0.37
```

Check the rules again:

```
sudo ufw status numbered
```

The expected output should be similar to:

```
Status: active

To                         Action      From
[ 1] Anywhere             DENY IN     10.0.0.37
[ 2] Anywhere             ALLOW IN    10.0.0.0/24
```

With the deny rule now placed first, any traffic from 10.0.0.37 will be blocked as desired.

---

## Blocking Outgoing Traffic on a Specific Interface

A server might have multiple network interfaces—for example, one for external Internet traffic and another for internal communication. To apply a firewall rule to a specific interface, first identify the interface name. In this example, it is "enp0s3".

Verify external connectivity by pinging an external server (e.g., Google DNS at 8.8.8.8):

```
ping -c 4 8.8.8.8
```

You should see successful responses. To block outgoing traffic on the "enp0s3" interface to 8.8.8.8, execute:

```
sudo ufw deny out on enp0s3 to 8.8.8.8
```

After applying this rule, subsequent ping commands to 8.8.8.8 should fail, indicating that the rule is working as intended.

> [!important]
> **Note**
>
> For incoming traffic, "to" refers to your machine's destination IP, and "from" specifies the source. For outgoing traffic, the fields are inverted: "from" is your machine’s IP, while "to" is the destination external IP.

---

## Building Complex UFW Rules

UFW allows you to create detailed rules by specifying the interface, source IP, destination IP, port, and protocol. Suppose your machine’s IP on interface enp0s3 is 10.0.0.100 and you want to permit incoming TCP traffic from IP 10.0.0.192 on port 80.

First, confirm your IP configuration:

```
ip a
```

A typical output might be:

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:6f:4e:da brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.100/24 brd 10.0.0.255 scope global dynamic enp0s3
```

Allow incoming TCP traffic with:

```
sudo ufw allow in on enp0s3 from 10.0.0.192 to 10.0.0.100 proto tcp
```

For outgoing traffic where your machine is the sender, reverse the source and destination:

```
sudo ufw allow out on enp0s3 from 10.0.0.100 to 10.0.0.192 proto tcp
```

View all current rules with:

```
sudo ufw status numbered
```

A sample final rule set might look like:

```
Status: active

To                             Action      From
[ 1] Anywhere                 DENY IN     10.0.0.37
[ 2] Anywhere                 ALLOW IN    10.0.0.0/24
[ 3] 8.8.8.8                  DENY OUT    Anywhere on enp0s3
[ 4] 10.0.0.100/tcp on enp0s3   ALLOW IN    10.0.0.192/tcp
[ 5] 10.0.0.192/tcp on enp0s3   ALLOW OUT   10.0.0.100/tcp
```

For advanced rule building, refer to the UFW manual by running `ufw --help` or consult the official [UFW documentation](https://help.ubuntu.com/community/UFW).

---

## Conclusion

In this lesson, you learned how to configure the Ubuntu firewall using UFW. The topics covered include:

- Checking the firewall status and enabling UFW
- Creating basic SSH allow rules
- Restricting SSH access by IP address and understanding rule order
- Inserting deny rules to override broader allow rules
- Configuring outbound rules on specific network interfaces
- Building complex UFW commands with detailed parameters

Even if you forget some of the commands, UFW’s help documentation is an excellent reference for constructing advanced firewall rules. With these tools, you can fine-tune your server’s network security to meet your specific requirements.

Now, let's move on to our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/7eb2bdde-b7eb-4122-ad57-a153b796d407)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/69d09fb0-507e-4d2f-b690-217fb63349be)**
>
> Practice lab
