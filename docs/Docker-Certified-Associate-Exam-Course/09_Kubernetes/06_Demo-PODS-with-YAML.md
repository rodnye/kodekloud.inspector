# Demo PODS with YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Demo-PODS-with-YAML)

---

## Table of Contents

- Demo PODS with YAML
  - 1. Create the YAML file
  - 2. Add metadata
  - 3. Define the Pod spec
  - 4. Verify the manifest
  - 5. Deploy the Pod
  - 6. Inspect and debug
  - Quick Reference
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Demo PODS with YAML

In this guide, you'll author a `pod.yaml` manifest and deploy a simple NGINX Pod without using `kubectl run`. Defining Pods in YAML is ideal for version control, reproducibility, and automation in CI/CD pipelines.

## 1\. Create the YAML file

1.  Open your terminal and launch your editor to create **pod.yaml**:

    ```
    vim pod.yaml
    ```

2.  Every Pod manifest requires four top-level fields:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
    spec:
    ```

## 2\. Add metadata

Under `metadata`, set a unique name and labels to organize and select resources:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
    tier: frontend
spec:
```

> [!important]
> **Indentation Tip**
>
> YAML is sensitive to spaces. Always use **two spaces** per indent level and avoid tabs.

## 3\. Define the Pod spec

Inside `spec`, list your containers. Each entry needs at least `name` and `image`:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
    tier: frontend
spec:
  containers:
    - name: nginx
      image: nginx
```

Add more containers by appending additional list items under `containers`.

Save and exit your editor (e.g., in Vim: `Esc` then `:wq`).

## 4\. Verify the manifest

Inspect the content to ensure indentation and syntax are correct:

```
cat pod.yaml
```

Expected output:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
    tier: frontend
spec:
  containers:
    - name: nginx
      image: nginx
```

## 5\. Deploy the Pod

Apply the YAML manifest to create the Pod:

```
kubectl apply -f pod.yaml
```

You should see:

```
pod/nginx created
```

> [!important]
> **Apply vs. Create**
>
> `kubectl apply -f` is idempotent and tracks changes, while `kubectl create -f` errors if the object already exists. For iterative edits, prefer `apply`.

Use this command to check the Pod's status:

```
kubectl get pod nginx
```

Wait until `STATUS` transitions to **Running**.

## 6\. Inspect and debug

For detailed Pod information and events:

```
kubectl describe pod nginx
```

Sample output highlights Pod health, container state, and recent events:

```
Name:         nginx
Namespace:    default
Status:       Running
IP:           172.17.0.3
Containers:
  nginx:
    Image:     nginx
    State:     Running
    Ready:     True
    Restart Count: 0
Events:
  Type    Reason     Age   Message
  ----    ------     ----  -------
  Normal  Scheduled  10s   Successfully assigned default/nginx to minikube
  Normal  Pulling    10s   Pulling image "nginx"
```

## Quick Reference

| Command                   | Description                 | Example                      |
| ------------------------- | --------------------------- | ---------------------------- |
| Create or update resource | Apply YAML manifest         | `kubectl apply -f pod.yaml`  |
| List Pods                 | View Pod status             | `kubectl get pod nginx`      |
| Describe Pod              | Detailed Pod and event logs | `kubectl describe pod nginx` |

## Links and References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [YAML Specification](https://yaml.org/spec/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

Next, explore advanced manifest templating with Kustomize and Helm.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/8c84a314-515e-431e-9dbe-62c434da9772)**
>
> Watch video content
