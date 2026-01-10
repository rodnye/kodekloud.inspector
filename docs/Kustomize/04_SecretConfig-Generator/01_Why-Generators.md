# Why Generators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/SecretConfig-Generator/Why-Generators)

---

## Table of Contents

- Why Generators
  - Initial Setup
  - Verifying the Environment Variable
  - Changing the Password
  - Manual Rollout Restart
  - Common Kubectl Commands
  - The Challenge
  - References
  - Watch Video
    - 1. Create a ConfigMap for Database Credentials
    - 2. Deploy an NGINX Pod Referencing the ConfigMap

---

## Content

Kustomize

SecretConfig Generator

# Why Generators

In Kubernetes, workloads often rely on ConfigMaps or Secrets for configuration data. However, when these resources change, pods do not automatically pick up the updates. Config generators (and secret generators) solve this by automating rollouts whenever underlying ConfigMaps or Secrets are modified. In this lesson, we’ll demonstrate this problem and prepare for the next section on generators.

## Initial Setup

### 1\. Create a ConfigMap for Database Credentials

First, define a ConfigMap to hold your database password. In production, you should use a Secret, but for demonstration the behavior is identical.

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-credentials
data:
  password: "password1"
```

> [!important]
> **Note**
>
> Use a [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) in real deployments to protect sensitive data.

Save this as `configmap.yaml` and apply:

```
kubectl apply -f configmap.yaml
```

### 2\. Deploy an NGINX Pod Referencing the ConfigMap

Next, deploy an NGINX container that injects the password as an environment variable:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: nginx
  template:
    metadata:
      labels:
        component: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
          env:
            - name: DB_PASSWORD
              valueFrom:
                configMapKeyRef:
                  name: db-credentials
                  key: password
```

Save as `deployment.yaml` and apply:

```
kubectl apply -f deployment.yaml
```

## Verifying the Environment Variable

1.  List the running pods:

    ```
    kubectl get pods
    ```

2.  Exec into the NGINX pod and print the `DB_PASSWORD`:

    ```
    POD=$(kubectl get pods -l component=nginx -o jsonpath="{.items[0].metadata.name}")
    kubectl exec "$POD" -- printenv | grep -i db
    ```

Expected output:

```
DB_PASSWORD=password1
```

## Changing the Password

After some time, update the database password in your ConfigMap:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-credentials
data:
  password: "password2"
```

Reapply the manifest:

```
kubectl apply -f configmap.yaml
```

Even though the ConfigMap reflects the new value:

```
kubectl describe configmap db-credentials
```

```
Data
====
password:
----
password2
```

the pod still reports the old password:

```
kubectl exec "$POD" -- printenv | grep -i db
# DB_PASSWORD=password1
```

> [!important]
> **Warning**
>
> Kubernetes does **not** automatically redeploy pods when a referenced ConfigMap or Secret is updated. You must manually trigger a restart.

## Manual Rollout Restart

To pick up the new password, force a rollout restart of the deployment:

```
kubectl rollout restart deployment nginx-deployment
```

Watch for the new pod:

```
kubectl get pods
```

Verify the updated environment variable:

```
NEW_POD=$(kubectl get pods -l component=nginx -o jsonpath="{.items[0].metadata.name}")
kubectl exec "$NEW_POD" -- printenv | grep -i db
# DB_PASSWORD=password2
```

## Common Kubectl Commands

| Command                                     | Purpose                              |
| ------------------------------------------- | ------------------------------------ |
| `kubectl apply -f configmap.yaml`           | Create or update a ConfigMap         |
| `kubectl apply -f deployment.yaml`          | Create or update a Deployment        |
| `kubectl get pods`                          | List all pods                        |
| `kubectl exec <pod> -- printenv`            | Inspect environment variables in pod |
| `kubectl rollout restart deployment <name>` | Restart pods to pick up changes      |

## The Challenge

Every time a ConfigMap or Secret changes, Kubernetes leaves existing pods untouched. Manually restarting each deployment can become error-prone at scale.

In the next section, we’ll introduce config generators to automate this process, ensuring your applications always run with the latest configuration.

## References

- [Kubernetes ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/)
- [kubectl rollout restart](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#rollout)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/51823d3e-7be4-4792-836a-2c4690c0c547/lesson/1481509c-b71c-4836-8e1b-d55117f5c673)**
>
> Watch video content
