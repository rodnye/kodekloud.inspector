# Backup and Restore Methods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Backup-and-Restore-Methods)

---

## Table of Contents

- Backup and Restore Methods
  - What to Back Up
  - Imperative vs. Declarative Backup Approaches
  - Backing Up the etcd Cluster
  - Restoring from an etcd Backup
  - Choosing the Right Backup Approach
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Cluster Maintenance

# Backup and Restore Methods

Welcome to this guide on backup and restore strategies for Kubernetes environments. In this lesson, you’ll learn how to secure your Kubernetes deployments by backing up declarative configurations, imperative resource changes, and critical cluster components such as etcd.

## What to Back Up

For most Kubernetes deployments, consider backing up:

- **Declarative Configuration Files:** Files defining resources like Deployments, Pods, and Services.
- **Cluster State:** Information stored in the etcd cluster.
- **Imperative Objects:** Resources created on the fly (e.g., namespaces, secrets, configMaps) which might not be documented in files.

Using a declarative approach — creating definition files and applying them with kubectl — not only documents your configuration but also makes it reusable and shareable. For example, here’s a simple Pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

Apply the Pod definition with:

```
kubectl apply -f pod-definition.yml
```

> [!important]
> **Tip**
>
> Storing your configuration files in a version-controlled repository (such as GitHub) ensures you can quickly restore and redeploy your applications if needed.

## Imperative vs. Declarative Backup Approaches

While the declarative method is preferred, sometimes resources are created using imperative commands. These changes might not be stored in your version control system, which can lead to gaps in your backups. To capture all configurations, you can query the Kubernetes API server directly.

For instance, back up all resources across every namespace by running:

```
kubectl get all --all-namespaces -o yaml > all-deploy-services.yaml
```

This command generates a comprehensive YAML snapshot of pods, deployments, services, and other resources. To simplify and automate this process in production, consider using tools like [Velero](https://velero.io).

## Backing Up the etcd Cluster

The etcd cluster is the backbone of your Kubernetes system, storing critical state and configuration details. Typically located on the master nodes, etcd’s data resides in a dedicated directory determined during setup.

Below is an example of how etcd might be configured on a master node:

```
ExecStart=/usr/local/bin/etcd \\
   --name ${ETCD_NAME} \\
   --cert-file=/etc/etcd/kubernetes.pem \\
   --key-file=/etc/etcd/kubernetes-key.pem \\
   --peer-cert-file=/etc/etcd/kubernetes.pem \\
   --peer-key-file=/etc/etcd/kubernetes-key.pem \\
   --trusted-ca-file=/etc/etcd/ca.pem \\
   --peer-trusted-ca-file=/etc/etcd/ca.pem \\
   --client-cert-auth \\
   --initial-advertise-peer-urls https://${INTERNAL_IP}:2380 \\
   --listen-peer-urls https://${INTERNAL_IP}:2380 \\
   --advertise-client-urls https://${INTERNAL_IP}:2379 \\
   --initial-cluster etcd-cluster-0 \\
   --initial-cluster-token etcd-cluster-0 \\
   --initial-cluster controller-0=https://${CONTROLLER0_IP}:2379 \\
   --initial-cluster-state new \\
   --data-dir=/var/lib/etcd
```

etcd offers a built-in snapshot feature via the etcdctl command. To create a snapshot called "snapshot.db", run:

```
ETCDCTL_API=3 etcdctl snapshot save snapshot.db
```

After creating the snapshot, you can verify its existence:

```
ls
```

And check the snapshot status:

```
ETCDCTL_API=3 etcdctl snapshot status snapshot.db
```

## Restoring from an etcd Backup

In the event of a failure, restoring your cluster from an etcd backup involves several steps:

1.  **Stop the Kubernetes API Server:** The restore process requires stopping the API server.
2.  **Restore the Snapshot:** Restore the snapshot to a new data directory (e.g., `/var/lib/etcd-from-backup`):

    ```
    ETCDCTL_API=3 etcdctl snapshot restore snapshot.db \
    --data-dir /var/lib/etcd-from-backup
    ```

    This command initializes a new etcd data directory and reinitializes cluster members.

3.  **Update etcd Configuration:** Modify your etcd configuration file to point to the new data directory.
4.  **Restart Services:** Reload the system daemon, restart the etcd service, and finally restart the Kubernetes API server.

> [!important]
> **Remember**
>
> Always supply the required certificate files (CA certificate, etcd server certificate, and key) during backup and restore operations to ensure secure communications.

For an authenticated backup, use:

```
ETCDCTL_API=3 etcdctl snapshot save snapshot.db \
--endpoints=https://127.0.0.1:2379 \
--cacert=/etc/etcd/ca.crt \
--cert=/etc/etcd/etcd-server.crt \
--key=/etc/etcd/etcd-server.key
```

## Choosing the Right Backup Approach

Depending on your environment, the backup strategy might vary:

| Backup Approach                 | Use Case                                     | Command Example                                                       |
| ------------------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| Declarative File Backup         | When configurations are maintained as code   | `kubectl apply -f pod-definition.yml`                                 |
| API Server Configuration Backup | Capturing all cluster resources imperatively | `kubectl get all --all-namespaces -o yaml > all-deploy-services.yaml` |
| etcd Snapshot                   | Backing up the critical cluster state        | `ETCDCTL_API=3 etcdctl snapshot save snapshot.db`                     |

For managed Kubernetes environments where you might not have direct etcd access, relying on API queries is often the more practical solution.

Thank you for following this guide. By mastering these backup and restore strategies, you can enhance the resilience of your Kubernetes clusters and ensure business continuity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/51676566-4860-4564-ad8e-4723a266211e/lesson/ed4695b0-c02f-4837-87c2-eb66d1eaea29)**
>
> Watch video content
