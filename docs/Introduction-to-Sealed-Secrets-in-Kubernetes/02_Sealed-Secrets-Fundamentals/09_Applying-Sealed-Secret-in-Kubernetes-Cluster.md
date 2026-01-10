# Applying Sealed Secret in Kubernetes Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Applying-Sealed-Secret-in-Kubernetes-Cluster)

---

## Table of Contents

- Applying Sealed Secret in Kubernetes Cluster
  - Prerequisites
  - 1. Encrypt and Apply the SealedSecret
  - 2. Verify the Decrypted Kubernetes Secret
  - 3. Inspect the Secret Manifest
  - 4. Decode the Secret Value
  - 5. Monitor the Sealed Secrets Resource
  - Links and References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Applying Sealed Secret in Kubernetes Cluster

In this guide, you’ll learn how to encrypt a Kubernetes Secret manifest with Bitnami’s Sealed Secrets, apply it to your cluster, and verify that it’s been decrypted back into a standard `Secret`. This workflow ensures sensitive data remains encrypted at rest and in version control.

## Prerequisites

- A running Kubernetes cluster
- `kubeseal` CLI installed
- Bitnami Sealed Secrets controller deployed in the `kube-system` namespace
- `sealed-secret.yaml` containing your Secret definition

## 1\. Encrypt and Apply the SealedSecret

First, seal (`encrypt`) your `sealed-secret.yaml` and then apply it:

```
kubeseal \
  --controller-name my-release-sealed-secrets \
  --controller-namespace kube-system \
  --format yaml \
  < sealed-secret.yaml \
  | tee sealed-secret.yaml
```

```
kubectl apply -f sealed-secret.yaml
```

You should see a confirmation:

```
sealedsecret.bitnami.com/database configured
```

> [!important]
> **Note**
>
> Make sure the `--controller-name` and `--controller-namespace` match your Sealed Secrets controller deployment.

## 2\. Verify the Decrypted Kubernetes Secret

Once the Sealed Secrets operator processes your `SealedSecret`, it will create a standard `Secret`. List all Secrets to confirm:

```
kubectl get secret
```

| NAME                    | TYPE              | DATA | AGE |
| ----------------------- | ----------------- | ---- | --- |
| database                | Opaque            | 1    | 13h |
| sealed-secrets-keymnn78 | kubernetes.io/tls | 2    | 14h |

## 3\. Inspect the Secret Manifest

To view the full YAML of the decrypted Secret:

```
kubectl get secret database -o yaml
```

```
apiVersion: v1
data:
  DB_PASSWORD: cGFzc3dvcmljMw==
kind: Secret
metadata:
  creationTimestamp: "2023-09-13T02:48:08Z"
  name: database
  namespace: default
  ownerReferences:
  - apiVersion: bitnami.com/v1alpha1
    controller: true
    kind: SealedSecret
    name: database
    uid: db083572-67f4-4293-ada7-a9a689bd04ba
  resourceVersion: "1305"
  uid: ad0fc95c-c026-4c62-bfa0-01bf7923f1a2
type: Opaque
```

## 4\. Decode the Secret Value

Retrieve and decode your secret value directly:

```
kubectl get secret database -o jsonpath="{.data.DB_PASSWORD}" | base64 -d
```

```
password123
```

> [!important]
> **Note**
>
> All data in a Kubernetes `Secret` is base64-encoded. Use `-o jsonpath` and `base64 -d` to decode sensitive values.

## 5\. Monitor the Sealed Secrets Resource

You can also inspect the status of your `SealedSecret`:

```
kubectl get sealedsecret
```

```
NAME      STATUS   SYNCED   AGE
database  True     True     13h
```

```
kubectl describe sealedsecret database
```

```
Name:         database
Namespace:    default
API Version:  bitnami.com/v1alpha1
Kind:         SealedSecret
Status:
  ObservedGeneration: 1
  Conditions:
  - Type: Synced
    Status: True
...
```

Ensure `STATUS: True` and `SYNCED: True` to confirm the operator successfully decrypted and created the Secret.

## Links and References

- [Bitnami Sealed Secrets GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [kubeseal CLI Documentation](https://github.com/bitnami-labs/sealed-secrets#kubeseal)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/e26c51fa-62eb-49c3-a4f9-e05f53a34409)**
>
> Watch video content
