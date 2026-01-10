# Solution Security Context - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Solution-Security-Context)

---

## Table of Contents

- Solution Security Context
  - 1. Which user executes the sleep process in the Ubuntu Sleeper pod?
  - 2. Edit the Ubuntu Sleeper pod to run the process as UID 1010
  - 3. Which user starts processes in the web container of multi-pod.yaml?
  - 4. Which user starts processes in the sidecar container?
  - 5. Update Ubuntu Sleeper to run as root and add the SYS_TIME capability
  - 6. Add the NET_ADMIN capability to the Ubuntu Sleeper pod
  - References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Solution Security Context

This guide walks through common `securityContext` configurations in Kubernetes pods and containers, demonstrating how to control process ownership and Linux capabilities. You’ll see how to:

- Determine the user that runs a process inside a container
- Override container user IDs with `runAsUser`
- Grant specific capabilities (e.g., `SYS_TIME`, `NET_ADMIN`)

For more details, refer to the [Kubernetes Pod Security Context documentation](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).

---

## 1\. Which user executes the `sleep` process in the Ubuntu Sleeper pod?

Run `whoami` locally and inside the container:

```
# Local shell
whoami
# Confirm pod is running
kubectl get pod
# NAME             READY   STATUS    RESTARTS   AGE
# Inside the container
kubectl exec ubuntu-sleeper -- whoami
# → root
```

**Answer:** The `sleep` process runs as **root** by default.

---

## 2\. Edit the Ubuntu Sleeper pod to run the process as UID 1010

1.  Export the existing Pod manifest:

    ```
    kubectl get pod ubuntu-sleeper -o yaml > ubuntu-sleeper.yaml
    ```

2.  In `ubuntu-sleeper.yaml`, add a container-level `securityContext`:

    ```
    spec:
      containers:
        - name: ubuntu
          image: ubuntu
          command: ["sleep", "4800"]
          securityContext:
            runAsUser: 1010
          # ...other fields...
    ```

3.  Delete and recreate the Pod:

    ```
    kubectl delete pod ubuntu-sleeper --force
    kubectl apply -f ubuntu-sleeper.yaml
    ```

4.  Verify inside the container:

    ```
    kubectl exec ubuntu-sleeper -- whoami
    # → 1010
    ```

> [!important]
> **Note**
>
> Using `--force` deletes the Pod immediately. In production clusters, prefer a graceful rollout (e.g., updating a Deployment).

**Result:** The `sleep` process now runs as UID **1010**.

---

## 3\. Which user starts processes in the `web` container of `multi-pod.yaml`?

```
apiVersion: v1
kind: Pod
metadata:
  name: multi-pod
spec:
  securityContext:
    runAsUser: 1001      # pod-level default
  containers:
    - name: web
      image: ubuntu
      command: ["sleep", "5000"]
      securityContext:
        runAsUser: 1002  # container override
    - name: sidecar
      image: ubuntu
      command: ["sleep", "5000"]
      # no override → inherits pod-level
```

Container-level settings override pod-level defaults.

**Answer:** The `web` container runs as **1002**.

---

## 4\. Which user starts processes in the `sidecar` container?

Since the `sidecar` container has no `runAsUser` block, it inherits from the Pod:

| Container | runAsUser |
| --------- | --------- |
| web       | 1002      |
| sidecar   | 1001      |

**Answer:** The `sidecar` container runs as **1001**.

---

## 5\. Update Ubuntu Sleeper to run as root and add the `SYS_TIME` capability

1.  Remove any `runAsUser` lines in `ubuntu-sleeper.yaml`.
2.  Under the container’s `securityContext`, add the `SYS_TIME` capability:

    ```
    spec:
      containers:
        - name: ubuntu
          image: ubuntu
          command: ["sleep", "4800"]
          securityContext:
            capabilities:
              add:
                - SYS_TIME
    ```

3.  Apply the changes:

    ```
    kubectl delete pod ubuntu-sleeper --force
    kubectl apply -f ubuntu-sleeper.yaml
    ```

> [!important]
> **Warning**
>
> Granting `SYS_TIME` allows processes to modify the system clock. Only use this capability if absolutely necessary.

**Result:** The pod runs as **root** with the **SYS_TIME** capability.

---

## 6\. Add the `NET_ADMIN` capability to the Ubuntu Sleeper pod

Extend the same `securityContext` to include both capabilities:

```
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "4800"]
      securityContext:
        capabilities:
          add:
            - SYS_TIME
            - NET_ADMIN
```

Reapply the manifest:

```
kubectl delete pod ubuntu-sleeper --force
kubectl apply -f ubuntu-sleeper.yaml
```

**Result:** The pod now has both **SYS_TIME** and **NET_ADMIN** capabilities.

---

## References

- [Pod Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
- [Container Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-of-a-container)
- [Capability Lists](https://man7.org/linux/man-pages/man7/capabilities.7.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/f35655a9-b8e7-4bac-b6a1-85c2ca4900be)**
>
> Watch video content
