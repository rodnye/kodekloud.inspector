# IPTABLES Securing the Environment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Security-and-File-Permissions/IPTABLES-Securing-the-Environment)

---

## Table of Contents

- IPTABLES Securing the Environment
  - Configuring SSH Access
  - Configuring Outbound Traffic
  - Securing the Database Server
  - Watch Video
  - Practice Lab
    - Blocking Unauthorized SSH Attempts
    - Allowing Specific HTTPS Traffic
    - Deleting a Rule
    - Summary of DB Server Security
    - Handling Return Traffic

---

## Content

Learning Linux Basics Course & Labs

Security and File Permissions

# IPTABLES Securing the Environment

In this lesson, we will demonstrate how to configure iptables rules to secure a development environment. The primary objective is to allow SSH access only from a specified client while filtering other network traffic based on defined requirements.

---

## Configuring SSH Access

Begin by adding an incoming rule on the development server that permits SSH connections solely from the designated client. Execute the following command:

```
iptables -A INPUT -p tcp -s 172.16.238.187 --dport 22 -j ACCEPT
```

This command works as follows:

- `-A INPUT`: Appends a rule to the INPUT chain.
- `-p tcp`: Specifies the TCP protocol.
- `-s 172.16.238.187`: Restricts the rule to connections coming from the client laptop.
- `--dport 22`: Indicates that the rule applies to the SSH port (22).
- `-j ACCEPT`: Accepts the connection when all conditions are met.

After adding the rule, verify it by listing the iptables rules with:

```
iptables -L
```

### Blocking Unauthorized SSH Attempts

By default, if another client tries to access SSH without a specific allow rule, the connection would follow the default policy (typically accepting all connections). Since our requirement is to restrict SSH access to the specified client, add a rule that drops SSH traffic from all other sources:

```
iptables -A INPUT -p tcp --dport 22 -j DROP
```

Listing the iptables rules now will display an output similar to this:

```
[bob@devapp01 ~]$ iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     tcp  --  172.16.238.187      anywhere             tcp dpt:ssh
DROP       tcp  --  anywhere             anywhere             tcp dpt:ssh


Chain FORWARD (policy ACCEPT)
target     prot opt source               destination


Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

The order of these rules is critical because iptables processes rules sequentially. The client-specific ACCEPT rule is placed before the DROP rule, ensuring that SSH traffic from the designated client is allowed while all other SSH attempts are blocked.

---

## Configuring Outbound Traffic

On the development application server, additional configurations are needed to manage outbound connections:

- **Allow connections to the DB server on port 5432.**
- **Permit connections to the software repository server on port 80.**
- **Drop general HTTP (port 80) and HTTPS (port 443) traffic to the Internet.**
- **Explicitly allow HTTP access on port 80 from the client laptop.**

Add the following OUTPUT rules:

```
[bob@devapp01 ~]$ iptables -A OUTPUT -p tcp -d 172.16.238.11 --dport 5432 -j ACCEPT
[bob@devapp01 ~]$ iptables -A OUTPUT -p tcp -d 172.16.238.15 --dport 80 -j ACCEPT
[bob@devapp01 ~]$ iptables -A OUTPUT -p tcp --dport 443 -j DROP
[bob@devapp01 ~]$ iptables -A OUTPUT -p tcp --dport 80 -j DROP
```

Once these rules are applied, listing the iptables configuration will reveal three input rules and four output rules, ensuring that only the specified outbound communications are permitted.

### Allowing Specific HTTPS Traffic

If you need to access a particular site using HTTPS from the devapp-01 server (e.g., to 172.16.238.100), the general DROP rule for port 443 would normally block this connection. To allow HTTPS access to this specific destination, insert an ACCEPT rule at the top of the OUTPUT chain:

```
[bob@devapp01 ~]$ iptables -I OUTPUT -p tcp -d 172.16.238.100 --dport 443 -j ACCEPT
```

The `-I` option inserts the rule at the top of the chain, making sure it takes precedence over the subsequent DROP rules.

### Deleting a Rule

If you need to remove an iptables rule by its position (for example, deleting the rule at position 5 from the OUTPUT chain), use the `-D` option:

```
[bob@devapp01 ~]$ iptables -D OUTPUT 5
```

---

## Securing the Database Server

To ensure that only the development application server can access the PostgreSQL service on the database server (port 5432), configure the following rules on the DB server:

```
[bob@devdb01 ~]$ iptables -A INPUT -p tcp -s 172.16.238.10 --dport 5432 -j ACCEPT
[bob@devdb01 ~]$ iptables -A INPUT -p tcp --dport 5432 -j DROP
```

Listing the iptables rules on the DB server should produce output similar to:

```
[bob@devdb01 ~]$ iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     tcp  --  172.16.238.10       anywhere             tcp dpt:5432
DROP       tcp  --  anywhere             anywhere             tcp dpt:5432


Chain FORWARD (policy ACCEPT)
target     prot opt source               destination


Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

### Summary of DB Server Security

1.  **Application Server Output Rule:**  
    The development application server actively allows connections to the DB server on port 5432:

    ```
    iptables -A OUTPUT -p tcp -d 172.16.238.11 --dport 5432 -j ACCEPT
    ```

2.  **Database Server Accept Rule:**  
    An input rule on the DB server accepts connections originating from the application server on port 5432.
3.  **Database Server Drop Rule:**  
    A subsequent rule then drops any other connection attempts on port 5432.

This setup ensures that only the dev application server can establish a connection with the database server.

### Handling Return Traffic

When the dev application server initiates a database connection, an ephemeral source port (for example, 44060) is assigned. Once the connection is established, the database server sends the return traffic back to this ephemeral port. Since the overall inbound traffic is accepted (except for explicitly dropped SSH connections), there is no need for additional rules to handle the returning traffic. You can confirm the connection with:

```
[bob@devdb01 ~]$ netstat -an | grep 5432
tcp        0      0 172.16.238.10:44060   172.16.238.11:5432    ESTABLISHED
```

> [!important]
> **Note**
>
> Linux typically assigns ephemeral ports in the range of 32768 to 60999. This dynamic assignment facilitates proper handling of return traffic without manual configuration.

---

Now it's your turn to create custom iptables rules based on these examples. Experiment and adjust the rules to suit your specific network security requirements.

---

For further reading on iptables and network security best practices, consider checking out:

- [Understanding iptables](https://linux.die.net/man/8/iptables)
- [Linux Firewall Documentation](https://wiki.archlinux.org/title/iptables)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/c2d0531f-8eaf-429d-a56d-2c9693f7a3bb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/022332de-0140-41ff-a8cd-775edc19ddfa)**
>
> Practice lab
