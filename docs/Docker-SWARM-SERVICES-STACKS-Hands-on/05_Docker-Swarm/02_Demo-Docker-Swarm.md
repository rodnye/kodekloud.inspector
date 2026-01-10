# Demo Docker Swarm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Swarm/Demo-Docker-Swarm)

---

## Table of Contents

- Demo Docker Swarm
  - Setting Up the Swarm Cluster
  - Adding Worker Nodes
  - Removing a Node from the Cluster
  - Adding Manager Nodes
  - Promoting a Worker to a Manager
  - Simulating Node Failures and Managing Quorum
  - Recovering from a Manager Failure
  - Recap
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Swarm

# Demo Docker Swarm

Welcome to this detailed guide on creating and managing a Docker Swarm cluster. In this tutorial, you'll learn how to initialize a Docker Swarm cluster, add worker and manager nodes, simulate node failures, and recover from manager failures—all while maintaining a healthy quorum. This guide serves as an essential resource for DevOps engineers and system administrators looking to deploy resilient container orchestration with Docker Swarm.

---

## Setting Up the Swarm Cluster

In this demo, three servers are used. One server acts as the Docker master, while the other two serve as Docker nodes. Initially, each server only has Docker installed, differing only by their hostnames.

To establish the swarm cluster, identify the Docker master among the three servers and initialize the swarm. Running the following command without an advertised address causes an error because the Docker host has multiple network interfaces:

```
root@DOCKER_MASTER:/root # docker swarm init
Error response from daemon: could not choose an IP address to advertise since this system has multiple addresses on different interfaces (192.168.1.9 on eth0 and 192.168.56.101 on eth1) - specify one with --advertise-addr
```

Since the master has two network interfaces, specify the IP address using the `--advertise-addr` flag. In this example, we choose to advertise the IP address 192.168.56.101:

```
root@DOCKER_MASTER:/root # docker swarm init --advertise-addr 192.168.56.101
Swarm initialized: current node (uiddwelph55pjtk6vi97tsn5s) is now a manager.


To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-5hp18wx356c33n90tlyv40b4a68g9gylqbb3iz2xnk0fneu1-5a6525x9twuwpdg8v46jj29ul 192.168.56.101:2377


To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
root@DOCKER_MASTER:/root #
```

The output provides the necessary command for adding a node to the swarm. The generated token serves as authentication for a worker node to join the cluster.

When running the command `docker node ls` on the master, only the master node appears (marked as active and the leader), since no additional nodes have been added yet.

---

## Adding Worker Nodes

To add worker nodes, follow these steps:

1.  Copy the generated `docker swarm join` command.
2.  Execute it on each worker server.

For example, executing the join command on a worker node produces the following confirmation:

```
root@Docker_NODE1:/root # docker swarm join --token SWMTKN-1-5hp18wx356c33n90tlyv40b4a68g9gylqbb3iz2xnk0fneui4-5a6525x9tvwwpdg
This node joined a swarm as a worker.
```

Once a worker node successfully joins, the master node's listing will include both the master (marked with a star and labeled as Leader) and the new worker:

```
root@DOCKER_MASTER:/root # docker node ls
ID                           HOSTNAME        STATUS  AVAILABILITY  MANAGER STATUS
uildwelph5spjtk6vi97tsn5s *   docker-master   Ready   Active        Leader
lzd18400ditete34e5nvsdn4n    docker-node1    Ready   Active
```

Repeat the same process on the second worker node. Once both nodes are connected, `docker node ls` displays three nodes in total: one master and two workers.

---

## Removing a Node from the Cluster

If you need to remove a node, execute the following on the node you wish to leave the swarm:

```
root@DOCKER_NODE2:/root # docker swarm leave
Node left the swarm.
```

> [!important]
> **Note**
>
> Keep in mind that there may be a short delay before the node's status changes from “Ready” to “Down” in the swarm listing. To completely remove a node that remains in the list, run the following command from the master node:

```
root@DOCKER_MASTER:/root # docker node rm docker-node1
```

After removal, running `docker node ls` confirms that the node has been deleted from the swarm.

---

## Adding Manager Nodes

A Docker Swarm cluster can support multiple manager nodes, which significantly improves high availability. To add a new manager:

1.  Change the hostname of the node if necessary.
2.  Retrieve the manager join token by running:

```
root@docker-master:/root # docker swarm join-token manager
To add a manager to this swarm, run the following command:


    docker swarm join --token SWMTKN-1-5hp18wx356c33n90tly40b4a68g9gy1qbb3iz2xnk0fneu4-7jbbj8kldn4jaj2naidz9lh7 192.168.56.101:2377
```

Next, run the provided command on the intended manager node (e.g., `docker-master2`):

```
root@docker-master2:/root # docker swarm join --token SWMTKN-1-5hp18wx356c33n90tlyv40b4a68g9gylqbb3i2zxnk0fneu4-7jbbjj8kldn4jaj2naidz9lh7 192.168.56.101:2377
This node joined a swarm as a manager.
```

After adding, running `docker node ls` will show two managers: one labeled as Leader and the other as Reachable. Worker nodes will have no manager status listed.

To add an additional worker node, retrieve the worker join token with the following command:

```
root@docker-master:/root # docker swarm join-token worker
```

Then, execute the join command on the worker machine.

---

## Promoting a Worker to a Manager

At times, you might need to promote an existing worker node to a manager. To do so, run the promotion command from an active manager node:

```
root@docker-master:/root # docker node promote docker-node2
```

A subsequent execution of `docker node ls` confirms that `docker-node2` now shows a manager status—typically “Reachable” or “Leader”—while the remaining worker nodes continue to display a blank manager status.

---

## Simulating Node Failures and Managing Quorum

An important aspect of managing a Docker Swarm cluster is handling node failures. To simulate a manager node failure, shut down one of the manager nodes. For example, shutting down `docker-master3` will result in its status changing to “Unreachable,” as shown below:

```
root@docker-master:/root # docker node ls
ID                            HOSTNAME          STATUS      AVAILABILITY  MANAGER STATUS
qp9p5cmbhf3czl3rxy342pywc    docker-master3    Ready       Active        Unreachable
uildwelph5spjtk6vi97tsn5     docker-master     Ready       Active        Leader
zycf5u8yudke6nfzo74gryssx    docker-master2   Ready       Active        Reachable
```

> [!important]
> **Warning**
>
> A Docker Swarm cluster with three managers requires a majority (at least two) to maintain quorum. If too many managers go offline, you might encounter error messages when executing management commands:

```
Error response from daemon: rpc error: code = 2 desc = The swarm does not have a leader. It's possible that too few managers are online.
```

During a loss of quorum, running services on worker nodes remain operational, but management tasks such as adding new services or nodes will be unavailable until quorum is re-established.

---

## Recovering from a Manager Failure

If a manager failure causes the loss of quorum and it is not possible to bring all managers back online, you can force-create a new swarm cluster. Use the `--force-new-cluster` flag along with the `--advertise-addr` parameter:

```
root@docker-master:/root # docker swarm init --advertise-addr 192.168.56.101 --force-new-cluster
```

After initiating a new cluster, `docker node ls` will display the master node as the only manager. You can then rejoin the worker nodes to the new cluster. Note that previously registered manager nodes will lose their status in the process.

---

## Recap

In this guide, we covered the following key points:

| Task                         | Description                                                                               | Command/Example                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Initialize Docker Swarm      | Start a swarm on the designated master node with the correct advertised IP address.       | `docker swarm init --advertise-addr 192.168.56.101`                     |
| Add Worker Node              | Use the provided worker token to join a new worker node to the swarm.                     | `docker swarm join --token <worker-token> 192.168.56.101:2377`          |
| Remove Node                  | Remove a node from the swarm gracefully and then force-remove it from the master listing. | `docker swarm leave` and `docker node rm <node>`                        |
| Add Manager Node             | Retrieve the manager join token and execute the join command on the new manager node.     | `docker swarm join-token manager`                                       |
| Promote Worker               | Promote an existing worker node to a manager to expand the managerial capacity.           | `docker node promote <worker-node>`                                     |
| Simulate and Manage Failures | Observe how the cluster behaves when manager nodes go down and manage quorum issues.      | Shutdown a manager to simulate failure and run `docker node ls`         |
| Force New Cluster Recovery   | Recover from a manager failure and lost quorum by forcing a new cluster formation.        | `docker swarm init --advertise-addr 192.168.56.101 --force-new-cluster` |

Docker Swarm is designed to ensure that services continue to run even if some nodes fail, as long as a quorum of managers is maintained. Management functions may be temporarily blocked during these failures, but running containers will persist without disruption.

Thank you for reading this guide. We hope this detailed demo enhances your understanding of managing a Docker Swarm cluster and helps you implement robust orchestration in your environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/59d6dff1-0181-4a5e-9c05-6da9e38ae605/lesson/d3a45389-334b-4c61-bb82-9e86711bf0ee)**
>
> Watch video content
