# Kubernetes Secrets its Drawbacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Kubernetes-Secrets-its-Drawbacks)

---

## Table of Contents

- Kubernetes Secrets its Drawbacks
  - Why Use Kubernetes Secrets?
  - Creating a Generic Secret
  - Viewing Secrets Directly in etcd
  - Mitigation: Encryption at Rest
  - Best Practices for Kubernetes Secrets
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Kubernetes Secrets its Drawbacks

Welcome to the HashiCorp Vault series! In this lesson, we’ll review how Kubernetes stores sensitive data in Secrets, highlight key drawbacks, and prepare for a secure injection of dynamic secrets using Vault.

## Why Use Kubernetes Secrets?

Managing sensitive data—passwords, API tokens, SSH keys—is critical in any deployment. Kubernetes Secrets help you:

- Decouple credentials from application pods and container images
- Store sensitive values centrally in etcd (the Kubernetes key-value store)
- Consume secrets as mounted volumes or environment variables

| Mount Method    | Use Case                              | Example                  |
| --------------- | ------------------------------------- | ------------------------ |
| Volume mount    | Inject files (e.g., TLS certs)        | `volumes: - name: creds` |
| Environment var | Pass small values (e.g., DB password) | `env: - name: DB_PASS`   |

> [!important]
> **Warning**
>
> Kubernetes Secrets are only base64-encoded, not encrypted by default. Any user with API or etcd access can decode them.

Learn more in the [Kubernetes Secrets documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

## Creating a Generic Secret

Create a simple Secret in one command:

```
kubectl create secret generic mysql-crds \
  --from-literal=password=s3cR3t!
```

Inspect it as YAML:

```
kubectl get secret mysql-crds -o yaml
```

```
apiVersion: v1
data:
  password: czNjUjN0IQ==
kind: Secret
metadata:
  name: mysql-crds
  namespace: default
type: Opaque
```

Decode it easily:

```
echo czNjUjN0IQ== | base64 -d
# s3cR3t!
```

## Viewing Secrets Directly in etcd

With etcd client certificates, stored Secrets appear in plain text:

```
ETCDCTL_API=3 etcdctl get /registry/secrets/default/mysql-crds \
  --cacert /etc/kubernetes/pki/etcd/ca.crt \
  --cert    /etc/kubernetes/pki/etcd/server.crt \
  --key     /etc/kubernetes/pki/etcd/server.key
```

```
/registry/secrets/default/mysql-crds
k8s.io/v1Secret: |
  {"password":"s3cR3t!"}
```

## Mitigation: Encryption at Rest

Kubernetes supports encrypting Secrets in etcd with an `EncryptionConfiguration`.

1.  Create `/etc/kubernetes/pki/encryption-config.yaml`:

    ```
    apiVersion: apiserver.config.k8s.io/v1
    kind: EncryptionConfiguration
    resources:
      - resources:
          - secrets
        providers:
          - aescbc:
              keys:
                - name: key1
                  secret: RSYzZbCmZbshlScWcjm+zAbB83coDIJ47HTRLOOW4=
          - identity: {}
    ```

2.  Update the API server flags:

    ```
    --encryption-provider-config=/etc/kubernetes/pki/encryption-config.yaml
    ```

3.  Restart the kube-apiserver. All new Secrets will be encrypted in etcd.

> [!important]
> **Note**
>
> To encrypt existing Secrets, run:
>
> ```
> kubectl get secrets --all-namespaces -o json \
> | kubectl replace -f -
> ```

After re-encryption, etcd shows only metadata:

```
ETCDCTL_API=3 etcdctl get /registry/secrets/default/mysql-crds \
  --cacert /etc/kubernetes/pki/etcd/ca.crt \
  --cert    /etc/kubernetes/pki/etcd/server.crt \
  --key     /etc/kubernetes/pki/etcd/server.key
```

```
/registry/secrets/default/mysql-crds
k8s:enc:aescbc:v1:key1
```

## Best Practices for Kubernetes Secrets

| Best Practice                | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| Restrict etcd access         | Limit etcdctl and API access to cluster administrators only. |
| Enforce TLS                  | Enable TLS for all component communications.                 |
| Audit logging                | Turn on audit logs for `kubectl` and API server operations.  |
| Use an external secret store | Integrate HashiCorp Vault for dynamic, auditable secrets.    |

## Next Steps

In the next lesson, we’ll dive into the Vault Kubernetes Agent Injector—a mutating admission webhook that injects secrets via init and sidecar containers, removing static Kubernetes Secrets altogether.

---

## Links and References

- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Encrypting Data at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [HashiCorp Vault](https://www.vaultproject.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/56de0285-8e7e-48b7-9429-58c23fa7bd5a)**
>
> Watch video content
