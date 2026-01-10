# Why do we need Sealed Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Why-do-we-need-Sealed-Secrets)

---

## Table of Contents

- Why do we need Sealed Secrets
  - The risk of plain Kubernetes Secrets in Git
  - How Sealed Secrets protect your credentials
  - Key benefits
  - References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Why do we need Sealed Secrets

Before exploring how Sealed Secrets work, let’s examine the gap they fill in a GitOps-based Kubernetes workflow.

## The risk of plain Kubernetes Secrets in Git

In a GitOps pipeline, you typically declare your resources—including Secrets—as YAML manifests and commit them to your repository. Kubernetes offers two methods to create a Secret:

- **Imperative**:

  ```
  kubectl create secret generic database --from-literal=DB_PASSWORD=password123
  ```

- **Declarative** (preferred in GitOps):

  ```
  apiVersion: v1
  kind: Secret
  metadata:
    name: database
    namespace: default
  data:
    DB_PASSWORD: cGFzc3dvcmQxMjM=
  ```

When you apply the declarative manifest, Kubernetes Base64-encodes your password (`password123` → `cGFzc3dvcmQxMjM=`).

> [!important]
> **Note**
>
> Base64 encoding is **not** encryption. Anyone with read access to your cluster or Git repo can decode the value back to cleartext.

```
echo cGFzc3dvcmQxMjM= | base64 --decode
# output: password123
```

If these YAML files land in a public or team-wide repository, **anyone** with read permissions can retrieve your database credentials in seconds.

## How Sealed Secrets protect your credentials

Sealed Secrets let you store **encrypted** secrets safely in Git. You generate a SealedSecret that only your Kubernetes cluster can decrypt:

1.  Install the Sealed Secrets controller in your cluster.
2.  Seal your plain-Secret using the controller’s `kubeseal` CLI.
3.  Commit the resulting `SealedSecret` resource to Git.

At runtime, the controller automatically decrypts the sealed payload and creates a native `Secret` inside the cluster—no one else can reverse-engineer it from your repo.

## Key benefits

| Feature                  | Benefit                                          |
| ------------------------ | ------------------------------------------------ |
| End-to-end encryption    | Secrets remain encrypted at rest in Git          |
| GitOps-friendly workflow | Manage sealed resources alongside your manifests |
| Cluster-bound decryption | Only your cluster’s controller can unseal them   |

## References

- [Sealed Secrets GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [GitOps with Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets#usage)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/53d78662-3e7a-4fe7-9145-84a6bc0d90b8)**
>
> Watch video content
