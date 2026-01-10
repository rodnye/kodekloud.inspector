# Why Stateful Sets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Why-Stateful-Sets)

---

## Table of Contents

- Why Stateful Sets
  - Transitioning to Kubernetes
  - Introducing StatefulSets
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Why Stateful Sets

In this lesson, we will explore StatefulSets in Kubernetes, emphasizing their necessity compared to Deployments. To understand their importance, let's begin with a real-world scenario outside of Kubernetes.

Imagine you have a physical server running a database server, such as MySQL. After installing MySQL and creating the initial database, your database is up and running, accessible to client applications. To ensure high availability, you deploy additional servers with MySQL installed. However, these new servers start with empty databases, and you must replicate data from the original master database to them.

For illustration, we use MySQL replication. Although the details of MySQL replication are simplified here, the focus is on the high-level procedure for setting up dynamic replicas. In a common single-master multi-slave topology, all write operations are directed to the master server, while read operations can be served by any server. The process involves the following steps:

1.  Deploy the master server and bring it online.
2.  Clone the database from the master to the first slave.
3.  Enable continuous replication from the master to the first slave.
4.  Once the first slave is ready, clone its data to a second slave.
5.  Enable continuous replication on the second slave, configuring it to replicate from the master.

A critical aspect of this replication setup is configuring the slave servers with the master's hostname or address. This static reference is essential because if the master is replaced (for instance, due to a crash), its IP address might change if assigned dynamically. Therefore, a stable, static hostname is required. In typical deployments, pods are created with random names, which makes maintaining a static reference challenging. For example, if a master pod crashes and is recreated with a new name, the replication linkage is broken.

![The image illustrates a MySQL replication setup process, detailing steps to configure a master-slave database architecture with two slave servers replicating from a master.](https://kodekloud.com/kk-media/image/upload/v1752871322/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Why-Stateful-Sets/frame_230.jpg)

## Transitioning to Kubernetes

In Kubernetes, you might consider deploying each instance in your MySQL cluster (both master and slaves) as pods within a Deployment. Deployments are excellent for scaling and managing pods; however, they do not guarantee the startup order of the pods. In our replication setup, the master must be established before starting the slaves, and this sequential order is imperative.

Consider the following configuration snippet:

```
MASTER_HOST=mysql-master
MASTER_HOST=mysql-master
```

In this scenario, the master must start before any of the slave nodes. For example, slave one must initialize and clone data from the master, and later, slave two should clone data from slave one. Unfortunately, Deployments create all pods concurrently, so ensuring the necessary startup order becomes problematic.

Additionally, during the cloning and continuous replication phases, it is critical to clearly distinguish between the master and slave pods. The master requires a constant and static hostname instead of an IP address—which might change when a pod is recreated. With Deployments generating dynamically named pods, this requirement is not met. If the designated master pod crashes and is replaced by a new pod with a different name, your replication configuration will break.

> [!important]
> **Key Point**
>
> A stable and predictable pod naming convention is crucial for proper database replication in a stateful system.

## Introducing StatefulSets

StatefulSets address these challenges with features that resemble Deployments—such as pod templating, scaling, rolling updates, and rollbacks—but with a critical advantage: they enforce sequential pod creation. This ensures that the first pod is deployed, running, and ready before the next pod is initialized. This behavior directly caters to our requirement where the master must always start first, followed by the slaves.

StatefulSets assign a unique ordinal index to each pod, starting at zero, and each pod’s name is derived from the StatefulSet name combined with its ordinal index. For example, given a StatefulSet named mySQL:

- The first pod is named mySQL-0.
- The second pod is named mySQL-1.
- The third pod is named mySQL-2.

This predictable naming allows you to reliably designate mySQL-0 as the master pod. Slave pods can then be explicitly configured—for instance, mySQL-1 and mySQL-2 can be set up to clone data from the master, or further cascade replication among themselves. Even if the master pod fails and is recreated, it retains its stable name due to the sticky identity provided by StatefulSets.

![The image illustrates a step-by-step process for setting up MySQL stateful sets with master-slave replication, including cloning data and configuring master addresses.](https://kodekloud.com/kk-media/image/upload/v1752871323/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Why-Stateful-Sets/frame_550.jpg)

## Conclusion

StatefulSets offer significant advantages when deploying systems like a MySQL cluster on Kubernetes. They guarantee that pods are launched in a specific sequence and maintain a stable network identity essential for configuring master-slave replication.

> [!important]
> **Next Steps**
>
> This discussion sets the stage for a deeper exploration into Kubernetes topics such as creating StatefulSets, headless services, and configuring Persistent Volumes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/94d9a2fd-8426-4a9d-8ec3-fe6e54c0bd95)**
>
> Watch video content
