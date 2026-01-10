# Creating Kubernetes Secret - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Creating-Kubernetes-Secret)

---

## Table of Contents

- Creating Kubernetes Secret
  - 1. Generate the Secret YAML
  - 2. Inspecting the Generated YAML
  - 3. Verifying the Base64 Encoding
  - 4. Next Steps: Sealing the Secret
  - References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Creating Kubernetes Secret

In this step, we’ll generate a standard Kubernetes Secret manifest that can later be sealed and encrypted with kubeseal. By outputting the YAML without applying it, you get full control over your secret definitions.

## 1\. Generate the Secret YAML

Use the following command to create a generic Secret named `database` in the `default` namespace. The `DB_PASSWORD` key is set to `password123`.

```
kubectl create secret generic database \
  -n default \
  --from-literal=DB_PASSWORD=password123 \
  --dry-run=client \
  -o yaml > secret.yaml
```

| Option                         | Description                                | Example                                  |
| ------------------------------ | ------------------------------------------ | ---------------------------------------- |
| `create secret generic <name>` | Creates a generic Secret resource          | `kubectl create secret generic database` |
| `-n <namespace>`               | Specifies the target namespace             | `-n default`                             |
| `--from-literal=KEY=VALUE`     | Adds literal key-value pairs to the Secret | `--from-literal=DB_PASSWORD=password123` |
| `--dry-run=client -o yaml`     | Outputs the manifest without applying it   | `--dry-run=client -o yaml`               |

> [!important]
> **Note**
>
> Kubernetes Secrets store data as base64-encoded strings, not encrypted values. Always seal or encrypt sensitive data before committing to version control.

## 2\. Inspecting the Generated YAML

Your `secret.yaml` will look like this:

```
apiVersion: v1
kind: Secret
metadata:
  name: database
  namespace: default
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=
```

## 3\. Verifying the Base64 Encoding

To confirm the encoding, decode the `DB_PASSWORD` field:

```
echo cGFzc3dvcmQxMjM= | base64 --decode
# password123
```

## 4\. Next Steps: Sealing the Secret

Now that you have `secret.yaml`, pass it through kubeseal to produce a secure SealedSecret:

```
kubeseal --format yaml < secret.yaml > sealedsecret.yaml
```

This encrypted manifest can be safely stored in Git and applied to any cluster that holds your Sealed Secrets key.

---

## References

- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Sealed Secrets (kubeseal)](https://github.com/bitnami-labs/sealed-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/0c6da7ae-2f36-40a2-9d6e-5dccdb4ed8d3)**
>
> Watch video content
