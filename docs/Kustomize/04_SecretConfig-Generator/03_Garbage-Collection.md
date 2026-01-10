# Garbage Collection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/SecretConfig-Generator/Garbage-Collection)

---

## Table of Contents

- Garbage Collection
  - The Problem: Stale ConfigMaps & Secrets
  - Solution Overview: kubectl apply --prune
  - Quick Reference
  - Further Reading
  - Watch Video
    - Step 1: Add a Common Label
    - Step 2: Update Your Generator
    - Step 3: Apply with Prune
    - Step 4: Verify Cleanup

---

## Content

Kustomize

SecretConfig Generator

# Garbage Collection

When you use Kustomize’s `configMapGenerator` or `secretGenerator`, each modification produces a brand-new ConfigMap or Secret. Over time, this leads to multiple stale objects cluttering your cluster. This guide shows how to label and prune unused resources to keep your namespace clean.

## The Problem: Stale ConfigMaps & Secrets

Run the following command to list all ConfigMaps:

```
kubectl get configmap
```

You might see output like this:

```
NAME                       DATA   AGE
db-cred-b6fhfd8c67         1      38h
db-cred-bf778fgm5h         1      2m13s
db-cred-mh7c9fbtfc         1      2m5s
kube-root-ca.crt           1      9d
redis-cred-229bkfk6cd      1      82s
redis-cred-b6fhfd8c67      1      38h
redis-cred-kh464kfbf2      1      118s
```

Here, you can spot three versions each of `db-cred` and `redis-cred`, but only the most recent ones are actually in use. The rest are stale leftovers.

## Solution Overview: `kubectl apply --prune`

By adding a shared label to all generated ConfigMaps/Secrets and running `kubectl apply --prune`, Kubernetes will automatically delete any resource with that label that is no longer part of your current build.

### Step 1: Add a Common Label

In your `kustomization.yaml`, include identical labels under `options` for each generator:

```
# kustomization.yaml
configMapGenerator:
  - name: db-cred
    literals:
      - password=password122
    options:
      labels:
        app-config: my-config
  - name: redis-cred
    literals:
      - password=password122
    options:
      labels:
        app-config: my-config
```

### Step 2: Update Your Generator

When you change a literal—e.g., updating the password—keep the same label:

```
# kustomization.yaml (after update)
configMapGenerator:
  - name: db-cred
    literals:
      - password=password1224
    options:
      labels:
        app-config: my-config
  - name: redis-cred
    literals:
      - password=password1224
    options:
      labels:
        app-config: my-config
```

### Step 3: Apply with Prune

Use the `--prune` flag along with `-l` to target your shared label:

```
kubectl apply -k k8s/overlays/prod/ --prune -l app-config=my-config
```

> [!important]
> **Warning**
>
> `kubectl apply --prune` will delete **any** resource in the namespace matching the label selector that isn’t in the current Kustomize output. Make sure only intended resources use this label.

### Step 4: Verify Cleanup

After pruning, run:

```
kubectl get configmap
```

You should now see only the active ConfigMaps:

```
NAME                      DATA   AGE
db-cred-44h89htdm7        1      27m
kube-root-ca.crt          1      9d
redis-cred-c6k6d6bh64     1      2m7s
```

## Quick Reference

| Action                     | Command / Config Snippet                                     |
| -------------------------- | ------------------------------------------------------------ |
| Label generators           | `options.labels.app-config: my-config`                       |
| Apply with pruning         | `kubectl apply -k <overlay> --prune -l app-config=my-config` |
| List ConfigMaps post-prune | `kubectl get configmap`                                      |

## Further Reading

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Prune Flag Guide](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/51823d3e-7be4-4792-836a-2c4690c0c547/lesson/f2d30e37-cef9-4725-97e9-69f2380e9a2d)**
>
> Watch video content
