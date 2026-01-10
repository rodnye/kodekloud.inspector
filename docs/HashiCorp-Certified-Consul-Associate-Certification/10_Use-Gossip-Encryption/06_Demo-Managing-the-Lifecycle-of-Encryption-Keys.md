# Demo Managing the Lifecycle of Encryption Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Use-Gossip-Encryption/Demo-Managing-the-Lifecycle-of-Encryption-Keys)

---

## Table of Contents

- Demo Managing the Lifecycle of Encryption Keys
  - 1. Review Current Configuration
  - 2. Generate a New Gossip Encryption Key
  - 3. Distribute the New Key Across the Cluster
  - 4. Promote the New Key to Primary
  - 5. Remove the Old Encryption Key
  - Command Reference
  - Links and References
  - Watch Video
  - Practice Lab
    - 3.1. Verify Key Distribution

---

## Content

HashiCorp Certified: Consul Associate Certification

Use Gossip Encryption

# Demo Managing the Lifecycle of Encryption Keys

Rotating gossip encryption keys in your Consul cluster helps maintain strong security posture. In this tutorial, we’ll walk through:

1.  Reviewing the current configuration
2.  Generating a new encryption key
3.  Distributing the key across the cluster
4.  Promoting the new key to primary
5.  Removing the old key

## 1\. Review Current Configuration

Inspect your existing gossip encryption key in `consul.d/config.hcl`:

```
{
  "log_level": "INFO",
  "node_name": "consul-node-b",
  "server": true,
  "ui": true,
  "leave_on_terminate": true,
  "data_dir": "/etc/consul.d/data",
  "datacenter": "us-east-1",
  "client_addr": "0.0.0.0",
  "bind_addr": "10.0.101.248",
  "advertise_addr": "10.0.101.248",
  "retry_join": ["10.0.101.110"],
  "bootstrap_expect": 2,
  "enable_syslog": true,
  "encrypt": "62qD/DH15Ax0lMRUpMKvttP53p4FAvu+FgARDU4MzA=",
  "encrypt_verify_incoming": true,
  "encrypt_verify_outgoing": true,
  "connect": {
    "enabled": true
  },
  "acl": {
    "enabled": true,
    "default_policy": "allow",
    "down_policy": "extend-cache"
  },
  "performance": {}
}
```

> [!important]
> **Note**
>
> Before you begin, back up your Consul configuration and data directory. This ensures you can recover quickly if something goes wrong.

## 2\. Generate a New Gossip Encryption Key

Run the following command on any Consul server or client to create a fresh base64-encoded key:

```
consul keygen
# Example output:
wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=
```

## 3\. Distribute the New Key Across the Cluster

Install the newly generated key into the cluster keyring:

```
consul keyring -install wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=
```

You should see:

```
Installing new key "wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4="
```

### 3.1. Verify Key Distribution

On another node, list installed keys:

```
consul keyring -list
```

Expected output:

```
==> Gathering installed encryption keys...
us-east-1 (LAN):
  62qD/DH15Ax0lMRUpMKvttP53p4FAvu+FgARDU4MzA=  [2/2]
  wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=  [2/2]
```

## 4\. Promote the New Key to Primary

Switch the cluster’s primary gossip encryption key:

```
consul keyring -use wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=
```

You’ll see:

```
Changing primary gossip encryption key to "wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4="
```

Confirm the change:

```
consul keyring -list
```

Should display the new key first under both WAN and LAN segments.

## 5\. Remove the Old Encryption Key

Once every node is using the new key, remove the old one:

```
consul keyring -remove 62qD/DH15Ax0lMRUpMKvttP53p4FAvu+FgARDU4MzA=
```

Output:

```
Removing encryption key "62qD/DH15Ax0lMRUpMKvttP53p4FAvu+FgARDU4MzA="
```

Verify only the new key remains:

```
consul keyring -list
```

```
==> Gathering installed encryption keys...
WAN:
  wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=  [2/2]
us-east-1 (LAN):
  wlVkhlSnyl7SEy63/XsXMJ/48gIQSghShhUqn/05C4=  [2/2]
```

> [!important]
> **Warning**
>
> Do **not** remove the old key until all nodes report the new key as primary. Premature removal can lead to cluster partitions and service disruptions.

## Command Reference

| Command                         | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `consul keygen`                 | Generates a new base64-encoded key              |
| `consul keyring -install <key>` | Installs a key into the cluster keyring         |
| `consul keyring -list`          | Lists installed keys and their usage counts     |
| `consul keyring -use <key>`     | Promotes a key to be the primary encryption key |
| `consul keyring -remove <key>`  | Deletes an old key from the keyring             |

## Links and References

- [Consul Encryption Keys Documentation](https://www.consul.io/docs/enterprise/encryption)
- [HashiCorp Consul Official Site](https://www.consul.io/)
- [HashiCorp Tutorials](https://learn.hashicorp.com/consul)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/9a4e194f-ec51-43be-a364-9db2ec36087c/lesson/d256f82f-c1cb-4bad-80c0-790ffa3cb05d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/9a4e194f-ec51-43be-a364-9db2ec36087c/lesson/e1e232fc-c8a0-43fc-a8a6-42107bbb69b0)**
>
> Practice lab
