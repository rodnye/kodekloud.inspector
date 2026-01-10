# Demo Adding and Removing Consul Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Deploy-a-Single-Datacenter/Demo-Adding-and-Removing-Consul-Agents)

---

## Table of Contents

- Demo Adding and Removing Consul Agents
  - Viewing the Current Cluster
  - Adding a New Client Agent
  - Removing a Client Agent
  - References
  - Watch Video
  - Practice Lab
    - Cluster Members Overview
    - Graceful Leave
    - Forceful Removal

---

## Content

HashiCorp Certified: Consul Associate Certification

Deploy a Single Datacenter

# Demo Adding and Removing Consul Agents

![The image is mostly black with a small, dark purple rectangle in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752877806/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Adding-and-Removing-Consul-Agents/black-background-purple-rectangle-image.jpg)

In this tutorial, you'll learn how to view your current Consul cluster, add a new client agent, and remove an agent—either gracefully or forcefully. This ensures your service mesh remains healthy and up to date.

## Viewing the Current Cluster

On your server node (`consul-node-a`), verify the existing members and Raft peers:

```
# List all cluster members
consul members


# Check Raft peer status
consul operator raft list-peers
```

Example output:

```
Node            Address             Status  Type    Build       Protocol  DC         Segment
consul-node-a   10.0.101.110:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
consul-node-b   10.0.101.248:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
```

```
Node            ID                                   Address              State     Voter  RaftProtocol
consul-node-a   9655caa5-8d6d-bb5b-b087-df7acc277d60  10.0.101.110:8300    leader    true   3
consul-node-b   7d69d582-7308-b1e8-ff51-8c4899f2df43  10.0.101.248:8300    follower  true   3
```

> [!important]
> **Note**
>
> `consul-node-a` is the Raft leader, while `consul-node-b` is a follower. Maintaining at least three servers is recommended for high availability.

### Cluster Members Overview

| Node          | Address           | Status | Type   | DC        | Segment |
| ------------- | ----------------- | ------ | ------ | --------- | ------- |
| consul-node-a | 10.0.101.110:8301 | alive  | server | us-east-1 | <all>   |
| consul-node-b | 10.0.101.248:8301 | alive  | server | us-east-1 | <all>   |

## Adding a New Client Agent

1.  **Prepare the client config**  
    On your new machine (`web-server-01`), create `/etc/consul.d/config.hcl`:

    ```
    node_name  = "web-server-01"
    server     = false
    datacenter = "us-east-1"
    ```

2.  **Start the Consul agent**

    ```
    sudo systemctl start consul
    ```

3.  **Verify local membership**

    ```
    consul members
    ```

    Expected:

    ```
    Node            Address             Status  Type    Build       Protocol  DC         Segment
    web-server-01   10.0.101.177:8301   alive   client  1.9.3+ent   2         us-east-1  <default>
    ```

4.  **Join the cluster**

    ```
    consul join 10.0.101.110
    ```

    ```
    Successfully joined cluster by contacting 10.0.101.110
    ```

5.  **Confirm membership across the cluster**

    ```
    consul members
    ```

    All nodes:

    ```
    Node            Address             Status  Type    Build       Protocol  DC         Segment
    consul-node-a   10.0.101.110:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
    consul-node-b   10.0.101.248:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
    web-server-01   10.0.101.177:8301   alive   client  1.9.3+ent   2         us-east-1  <default>
    ```

> [!important]
> **Note**
>
> For automatic retries, add a `retry_join` block in your client config. You can also leverage cloud auto-join or gossip keys—see [Consul auto-join](https://www.consul.io/docs/commands/join) for details.

## Removing a Client Agent

### Graceful Leave

On the client (`web-server-01`), run:

```
consul leave
```

```
==> Graceful leave complete, shutting down agent...
```

On any server, you’ll see the client marked as `left`:

```
consul members
```

```
Node            Address             Status  Type    Build       Protocol  DC         Segment
consul-node-a   10.0.101.110:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
consul-node-b   10.0.101.248:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
web-server-01   10.0.101.177:8301   left    client  1.9.3+ent   2         us-east-1  <default>
```

### Forceful Removal

If a client is unresponsive or destroyed, use `force-leave` with pruning:

```
consul force-leave --prune web-server-01
```

```
consul members
```

```
Node            Address             Status  Type    Build       Protocol  DC         Segment
consul-node-a   10.0.101.110:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
consul-node-b   10.0.101.248:8301   alive   server  1.9.3+ent   2         us-east-1  <all>
```

> [!important]
> **Warning**
>
> `force-leave` is destructive and should only be used when an agent cannot leave gracefully. It immediately prunes the node from the membership list.

## References

- [Consul Documentation](https://www.consul.io/docs)
- [consul members](https://www.consul.io/docs/commands/members)
- [consul join](https://www.consul.io/docs/commands/join)
- [consul force-leave](https://www.consul.io/docs/commands/force-leave)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/a1f79019-1fbb-4b11-8935-0f09bdc9da3c/lesson/90fb1417-882a-4adb-8074-aa1d32b302e2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/a1f79019-1fbb-4b11-8935-0f09bdc9da3c/lesson/8e98ff95-3956-49ad-be78-8b5a3980145f)**
>
> Practice lab
