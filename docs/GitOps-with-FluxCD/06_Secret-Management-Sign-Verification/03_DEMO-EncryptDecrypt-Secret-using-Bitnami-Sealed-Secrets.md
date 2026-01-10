# DEMO EncryptDecrypt Secret using Bitnami Sealed Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-EncryptDecrypt-Secret-using-Bitnami-Sealed-Secrets)

---

## Table of Contents

- DEMO EncryptDecrypt Secret using Bitnami Sealed Secrets
  - Table of Contents
  - 1. Background: Plaintext Secret in Git
  - 2. Demonstrate Automatic Reconciliation
  - 3. Suspend Reconciliation
  - 4. Trigger Pod Failure
  - 5. Encrypt the Secret with kubeseal
  - 6. Replace the Plaintext Secret
  - 7. Resume Reconciliation
  - 8. Verify the Decrypted Secret
  - 9. Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO EncryptDecrypt Secret using Bitnami Sealed Secrets

In this guide, we’ll cover how to secure Kubernetes Secrets by encrypting them with [Bitnami Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) and manage them declaratively using FluxCD and Kustomize.

## Table of Contents

| Step                          | Description                                | Reference Command                   |
| ----------------------------- | ------------------------------------------ | ----------------------------------- |
| 1\\. Background               | Plaintext Secret in Git                    | –                                   |
| 2\\. Automatic Reconciliation | FluxCD constantly applies Git manifests    | `kubectl -n database get po,secret` |
| 3\\. Suspend Reconciliation   | Pause FluxCD Kustomization                 | `flux suspend kustomization …`      |
| 4\\. Trigger Pod Failure      | Restart Pod to observe missing Secret      | `kubectl rollout restart …`         |
| 5\\. Encrypt with kubeseal    | Generate a `SealedSecret`                  | `kubeseal --cert …`                 |
| 6\\. Replace Plaintext        | Commit encrypted manifest to Git           | `git add sealed-secret-mysql.yaml`  |
| 7\\. Resume Reconciliation    | Apply updated Git source and resume FluxCD | `flux resume kustomization …`       |
| 8\\. Verify Decryption        | Confirm the decrypted Secret in cluster    | `kubectl get secret …`              |

---

## 1\. Background: Plaintext Secret in Git

We have a FluxCD `Kustomization` that applies manifests from a Git repository:

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: infra-database-kustomize-git-mysql
  namespace: flux-system
spec:
  interval: 10s
  path: ./database
  prune: true
  sourceRef:
    kind: GitRepository
    name: infra-source-git
  targetNamespace: database
```

Under `./database/secret-mysql.yaml`, the MySQL password is stored in plaintext:

```
apiVersion: v1
kind: Secret
metadata:
  name: secret-mysql
  namespace: database
stringData:
  password: mysql-password-0123456789
```

> [!important]
> **Warning**
>
> Storing passwords or tokens in plaintext within Git exposes them to unauthorized access. Always encrypt sensitive data before committing.

FluxCD’s Kustomize controller reconciles this Secret every 10 seconds, ensuring it’s present in the cluster.

---

## 2\. Demonstrate Automatic Reconciliation

Verify the Secret and Pod exist:

```
kubectl -n database get pods,secret
```

Delete the Secret to see automatic re-creation:

```
kubectl -n database delete secret secret-mysql
# Wait a few seconds…
kubectl -n database get secret secret-mysql
```

FluxCD detects the drift and re-applies the manifest, recreating the Secret.

---

## 3\. Suspend Reconciliation

Pause the `Kustomization` so FluxCD stops reconciling this directory:

```
flux suspend kustomization infra-database-kustomize-git-mysql
flux get kustomization infra-database-kustomize-git-mysql
```

Now, deleting the Secret **will not** trigger re-creation:

```
kubectl -n database delete secret secret-mysql
kubectl -n database get secrets
```

---

## 4\. Trigger Pod Failure

Force a deployment restart to spawn a new Pod, which will fail due to the missing Secret:

```
kubectl -n database rollout restart deployment mysql
kubectl -n database get pods -w
```

Observe a `CreateContainerConfigError`:

```
kubectl -n database describe pod mysql-*
# ...
# Warning  Failed  Error: cannot find secret "secret-mysql"
```

---

## 5\. Encrypt the Secret with kubeseal

Ensure you have:

- The [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets#kubeseal) CLI installed.
- The Sealed Secrets public key (`sealed-secrets.pub`).

Encrypt the existing Secret manifest:

```
kubeseal --cert ../../sealed-secrets.pub \
  --scope cluster-wide \
  -o yaml < secret-mysql.yaml > sealed-secret-mysql.yaml
```

This creates a `SealedSecret` resource:

```
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: secret-mysql
  namespace: database
  annotations:
    sealedsecrets.bitnami.com/cluster-wide: "true"
spec:
  encryptedData:
    password: AgBv9SokhhVk4WNdTmmPxd9D0J2ETJY...
  template:
    metadata:
      name: secret-mysql
      namespace: database
```

> [!important]
> **Note**
>
> Only the Secret’s values are encrypted. The keys (`password`) stay in cleartext for mapping.

---

## 6\. Replace the Plaintext Secret

Backup the original manifest and commit the sealed version:

```
mv secret-mysql.yaml secret-mysql.yaml.bak
git add sealed-secret-mysql.yaml
git commit -m "Add SealedSecret for MySQL password"
git push
```

---

## 7\. Resume Reconciliation

Sync your Git source and resume the Kustomization:

```
flux reconcile source git flux-system
flux resume kustomization infra-database-kustomize-git-mysql
```

FluxCD applies the `SealedSecret`, and the Bitnami controller decrypts it into a normal Kubernetes Secret in `database`.

---

## 8\. Verify the Decrypted Secret

Check that the Secret has been created:

```
kubectl -n database get secret secret-mysql
```

Decode and inspect the password:

```
kubectl -n database get secret secret-mysql -o jsonpath='{.data.password}' | base64 -d
# => mysql-password-0123456789
```

Confirm the Pod is now running:

```
kubectl -n database get pods
```

---

## 9\. Conclusion

You have successfully:

1.  Suspended FluxCD reconciliation.
2.  Deleted a plaintext Secret and saw a Pod failure.
3.  Used `kubeseal` to create an encrypted `SealedSecret`.
4.  Committed the `SealedSecret` to your Git repo.
5.  Resumed FluxCD reconciliation and verified automatic decryption.

By integrating Bitnami Sealed Secrets with FluxCD and Kustomize, you can store encrypted secrets in Git, maintain GitOps workflows, and ensure secrets only decrypt inside your Kubernetes cluster.

---

## Links and References

- [Bitnami Sealed Secrets GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [FluxCD Kustomization Documentation](https://fluxcd.io/docs/components/kustomize/kustomization/)
- [Kustomize Tooling](https://kubectl.docs.kubernetes.io/guides/introduction/kustomization/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/ab6dc091-5ddd-40ce-935b-09d5f0f091c6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/05fbab53-e949-4d5f-aadc-8ba1950fbc5c)**
>
> Practice lab
