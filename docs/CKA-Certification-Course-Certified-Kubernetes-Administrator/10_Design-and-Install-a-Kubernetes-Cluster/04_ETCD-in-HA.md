# ETCD in HA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Design-and-Install-a-Kubernetes-Cluster/ETCD-in-HA)

---

## Table of Contents

- ETCD in HA
  - What is ETCD?
  - Distributed ETCD Clusters
  - The Raft Consensus Protocol
  - Quorum and Fault Tolerance
  - Installing and Configuring ETCD
  - Using etcdctl
  - Choosing the Right Cluster Size
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Design and Install a Kubernetes Cluster

# ETCD in HA

Welcome to this lesson on deploying ETCD in a high-availability (HA) configuration. In this guide, we will review ETCD fundamentals, explain how to configure a distributed cluster, and detail how data consistency is maintained across nodes using the Raft protocol. This HA setup is a critical requirement for running Kubernetes in a resilient manner.

## What is ETCD?

ETCD is a distributed, reliable key-value store that is both fast and secure. Unlike traditional databases that store data in tables, ETCD organizes data as documents or pages. Each document holds all necessary information about a specific entity and can be formatted in JSON, YAML, or other structures. Changing one document does not affect others, which makes ETCD an excellent choice for modern, scalable architectures.

![The image lists objectives related to ETCD, including understanding key-value stores, distributed systems, RAFT protocol, and best practices for node numbers.](https://kodekloud.com/kk-media/image/upload/v1752869770/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_40.jpg)

## Distributed ETCD Clusters

ETCD’s design is inherently distributed. Picture three different servers each running an identical instance of ETCD. This redundancy ensures that if one server (or node) fails, the remaining nodes continue to have an accurate copy of the data.

![The image describes ETCD as a distributed, reliable key-value store that is simple, secure, and fast, with a blue paint splash background.](https://kodekloud.com/kk-media/image/upload/v1752869771/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_100.jpg)

ETCD supports both read and write operations on any node. However, write operations require careful coordination. While clients might send write requests to any node, only the leader node processes these writes. If a write request lands on a follower, it is forwarded to the leader. The write operation is only confirmed after the leader gets an acknowledgement from a majority of the nodes.

![The image illustrates a consistent data system with three servers, each labeled "2379," supporting read/write operations.](https://kodekloud.com/kk-media/image/upload/v1752869771/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_140.jpg)

Read operations are simpler since every node contains the same data. Despite this, write operations necessitate a leader election through the Raft consensus protocol.

![The image shows three server icons labeled "2379," each with an upward arrow labeled "READ," indicating data reading operations.](https://kodekloud.com/kk-media/image/upload/v1752869772/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_150.jpg)

## The Raft Consensus Protocol

Raft plays a crucial role in ensuring data consistency within an ETCD cluster. When the cluster boots up, no leader is present until one node’s randomized timeout expires, triggering an election. During this election, the candidate node requests votes from its peers. Once it obtains the necessary votes, it is crowned the leader and begins sending regular heartbeat messages to assert its control.

If the leader fails or experiences network issues, the remaining nodes automatically trigger a new election to establish a new leader. This robust process guarantees that all write requests are processed correctly and that every node's data remains synchronized.

![The image illustrates the RAFT consensus algorithm's leader election process, showing a leader and followers with thumbs-up icons indicating votes or agreement.](https://kodekloud.com/kk-media/image/upload/v1752869773/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_270.jpg)

## Quorum and Fault Tolerance

For a write operation to be successful in an ETCD cluster, it must be replicated to a majority of nodes, which is referred to as a quorum. For instance, in a three-node cluster, the update must reach at least two nodes. The quorum is calculated using the formula:

quorum = (total number of nodes / 2) + 1

This means a three-node cluster requires a quorum of 2, a five-node cluster requires 3, etc. Odd-numbered clusters are preferred because even-numbered ones may split into equal groups during network partitions, preventing either group from achieving quorum and potentially causing cluster failure.

Consider a six-node cluster: if a network partition results in subgroups of four and two, the larger group meets quorum and continues operation. However, if the split creates two groups of three, neither side meets the quorum of four nodes. In contrast, a seven-node cluster might split into groups of four and three, allowing the larger group to maintain functionality. For these reasons, odd node counts (e.g., three, five, seven) are strongly recommended for a robust HA cluster.

![The image shows a table of instances, quorum, and fault tolerance, alongside a diagram of nodes with ETCD, API Server, Controller Manager, and Scheduler components.](https://kodekloud.com/kk-media/image/upload/v1752869774/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_690.jpg)

## Installing and Configuring ETCD

To install ETCD, follow these steps:

1.  Download the latest supported binary.
2.  Extract the downloaded archive.
3.  Create the required directory structure.
4.  Copy the generated certificate files to their designated locations.

For example, to download and extract the ETCD binary, use the following commands:

```
wget -q --https-only "https://github.com/coreos/etcd/releases/download/v3.3.9/etcd-v3.3.9-linux-amd64.tar.gz"
tar -xvf etcd-v3.3.9-linux-amd64.tar.gz
```

Next, configure the ETCD service. A critical configuration parameter is the "initial cluster" option, which introduces each ETCD instance to its peers. Below is an example of an ETCD service configuration:

```
ExecStart=/usr/local/bin/etcd \
  --name ${ETCD_NAME} \
  --cert-file=/etc/etcd/kubernetes.pem \
  --key-file=/etc/etcd/kubernetes-key.pem \
  --peer-cert-file=/etc/etcd/kubernetes.pem \
  --peer-key-file=/etc/etcd/kubernetes-key.pem \
  --trusted-ca-file=/etc/etcd/ca.pem \
  --peer-trusted-ca-file=/etc/etcd/ca.pem \
  --peer-client-cert-auth \
  --client-cert-auth \
  --initial-advertise-peer-urls https://${INTERNAL_IP}:2380 \
  --listen-peer-urls https://${INTERNAL_IP}:2380 \
  --listen-client-urls https://${INTERNAL_IP}:2380,https://127.0.0.1:2379 \
  --advertise-client-urls https://${INTERNAL_IP}:2379 \
  --initial-cluster-token etcd-cluster-0 \
  --initial-cluster peer-1=https://${PEER1_IP}:2380,peer-2=https://${PEER2_IP}:2380 \
  --initial-cluster-state new \
  --data-dir=/var/lib/etcd
```

> [!important]
> **Tip**
>
> Ensure your certificate files and network configurations are correctly set up before starting the ETCD service.

## Using etcdctl

The command-line tool, etcdctl, is used to interact with the ETCD store by managing key-value pairs. This lesson uses the v3 API of etcdctl. Set the API version using the following command:

```
export ETCDCTL_API=3
```

You can add a key-value pair to the ETCD store with:

```
etcdctl put name john
```

Then, retrieve the stored value using:

```
etcdctl get name
```

If successful, the output will be:

```
name
john
```

## Choosing the Right Cluster Size

For a highly available environment, a minimum cluster size of three nodes is required. Deploying only one or two nodes is insufficient as it compromises the quorum—if one node fails, the cluster will not have enough nodes to operate. While a three-node cluster provides basic fault tolerance, a five-node cluster typically offers enhanced resilience without unnecessary complexity.

![The image depicts a network design diagram featuring a load balancer, ETCD master nodes, and worker nodes, with logos for Kubernetes and Weaveworks.](https://kodekloud.com/kk-media/image/upload/v1752869776/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-ETCD-in-HA/frame_740.jpg)

> [!important]
> **Caution**
>
> Deploying fewer than three nodes in production may lead to a split-brain scenario during network partitions, severely impacting cluster functionality.

For environments with limited resources, such as on a laptop, a two-node setup might be used for experimentation; however, this does not provide true fault tolerance. In production environments, always aim for a minimum of three nodes to maintain an effective HA configuration.

That concludes our lesson on deploying ETCD in a high-availability setup. Thank you for reading, and we look forward to seeing you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/245617d7-2c45-44bc-84f8-5209c0e816d0/lesson/5b7c1213-a294-48b8-a7d8-adc80757c2e5)**
>
> Watch video content
