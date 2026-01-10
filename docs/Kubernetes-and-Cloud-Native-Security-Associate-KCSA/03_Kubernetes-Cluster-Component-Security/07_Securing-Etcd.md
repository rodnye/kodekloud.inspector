# Securing Etcd - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Cluster-Component-Security/Securing-Etcd)

---

## Table of Contents

- Securing Etcd
  - 1. Encrypting Data at Rest
  - 2. Encrypting Data in Transit
  - 3. Backup and Disaster Recovery
  - Summary
  - Links and References
  - Watch Video
    - Step 1. Create an EncryptionConfiguration
    - Step 2. Update the Etcd Static Pod
    - Step 1. Provision Certificates
    - Step 2. Configure TLS Flags
    - Taking a Snapshot

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Cluster Component Security

# Securing Etcd

Etcd is the backbone of your Kubernetes control plane, storing all cluster state and configuration data. Ensuring its security protects sensitive information and maintains cluster reliability. This guide covers:

1.  Encrypting data at rest
2.  Encrypting data in transit
3.  Backup and disaster recovery

---

## 1\. Encrypting Data at Rest

By default, etcd writes plaintext data to disk. To safeguard sensitive objects—such as Secrets—enable Kubernetes’ built-in EncryptionConfiguration.

### Step 1. Create an EncryptionConfiguration

Save the following manifest as `encryption-config.yaml`:

```
kind: EncryptionConfiguration
apiVersion: apiserver.config.k8s.io/v1
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-encryption-key>
      - identity: {}
```

| Field     | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| resources | List of resource types to encrypt (e.g., `secrets`, `configmaps`). |
| providers | Ordered providers:                                                 |

- `aescbc` uses AES-CBC. Replace `<base64-encoded-encryption-key>` with a 32-byte Base64 key.
- `identity` leaves data unencrypted as a fallback. |

> [!important]
> **Generate a Strong Key**
>
> Run the following command to create a 32-byte random key:
>
> ```
> openssl rand -base64 32
> ```
>
> Copy the output into your `encryption-config.yaml`.

### Step 2. Update the Etcd Static Pod

Modify `/etc/kubernetes/manifests/etcd.yaml` to include the provider config:

```
containers:
  - name: etcd
    image: k8s.gcr.io/etcd:3.4.13-0
    command:
      - etcd
      # ... other flags ...
      - --encryption-provider-config=/etc/kubernetes/encryption-config.yaml
```

Kubernetes will detect the change and restart etcd. New Secrets will now be written encrypted.

---

## 2\. Encrypting Data in Transit

Protect etcd client-to-server and peer-to-peer communication with TLS certificates.

### Step 1. Provision Certificates

You need:

- CA certificate (`ca.crt`)
- Server cert/key (`etcd-server.crt`, `etcd-server.key`)
- Peer cert/key (`etcd-peer.crt`, `etcd-peer.key`)
- Client cert/key (`etcd-client.crt`, `etcd-client.key`)

### Step 2. Configure TLS Flags

Extend your etcd manifest:

```
containers:
  - name: etcd
    image: k8s.gcr.io/etcd:3.4.13-0
    command:
      - etcd
      # Server TLS
      - --cert-file=/etc/etcd/tls/etcd-server.crt
      - --key-file=/etc/etcd/tls/etcd-server.key
      - --client-cert-auth
      - --trusted-ca-file=/etc/etcd/tls/ca.crt
      # Peer TLS
      - --peer-cert-file=/etc/etcd/tls/etcd-peer.crt
      - --peer-key-file=/etc/etcd/tls/etcd-peer.key
      - --peer-client-cert-auth
      - --peer-trusted-ca-file=/etc/etcd/tls/ca.crt
      # Encryption at rest
      - --encryption-provider-config=/etc/kubernetes/encryption-config.yaml
```

| Flag                      | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| \\--cert-file             | Path to server TLS certificate for client connections |
| \\--key-file              | Path to server TLS private key                        |
| \\--client-cert-auth      | Require client certificates for authentication        |
| \\--trusted-ca-file       | CA certificate to verify clients                      |
| \\--peer-cert-file        | TLS certificate for peer communication                |
| \\--peer-key-file         | TLS private key for peer communication                |
| \\--peer-client-cert-auth | Require peer certificates for mutual TLS              |
| \\--peer-trusted-ca-file  | CA certificate to verify peer certificates            |

> [!important]
> **Certificate Expiration**
>
> Monitor your certificates’ expiration dates. Expired certificates break cluster communication and can cause downtime.

---

## 3\. Backup and Disaster Recovery

Regular snapshots of etcd are essential for restoring cluster state in case of data loss or corruption.

### Taking a Snapshot

```
ETCDCTL_API=3 etcdctl snapshot save /backups/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/etcd/tls/ca.crt \
  --cert=/etc/etcd/tls/etcd-client.crt \
  --key=/etc/etcd/tls/etcd-client.key
```

| Option                    | Description                                  |
| ------------------------- | -------------------------------------------- |
| ETCDCTL\\\_API=3          | Use the v3 etcdctl API                       |
| snapshot save             | Command to write snapshot to disk            |
| \\--endpoints             | Comma-separated list of etcd server URLs     |
| \\--cacert, --cert, --key | TLS credentials for authenticating with etcd |

Schedule snapshots via cron or your preferred scheduler. Store backups in a secure, offsite location.

---

## Summary

Securing etcd involves:

1.  **Encryption at Rest**  
    Use `EncryptionConfiguration` to encrypt Secrets (and other resources) on disk.
2.  **Encryption in Transit**  
    Enforce TLS for all client and peer connections.
3.  **Regular Backups**  
    Automate `etcdctl snapshot` to maintain up-to-date backups.

These practices protect the confidentiality, integrity, and availability of your Kubernetes control plane.

---

## Links and References

- [Kubernetes Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [etcd TLS Guide](https://etcd.io/docs/v3.4/op-guide/security/)
- [etcdctl Snapshot and Restore](https://etcd.io/docs/v3.4/op-guide/snapshot/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/ca772db3-53aa-44c1-b424-3d32a046b683/lesson/84fa8f3c-904d-4287-a5ae-22a58cdef35b)**
>
> Watch video content
