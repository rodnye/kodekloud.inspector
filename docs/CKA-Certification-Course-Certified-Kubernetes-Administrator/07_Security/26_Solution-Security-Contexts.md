# Solution Security Contexts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-Security-Contexts)

---

## Table of Contents

- Solution Security Contexts
  - 1. Checking the User Running the Sleep Process in the Ubuntu Sleeper Pod
  - 2. Updating the Ubuntu Sleeper Pod to Run with User ID 1010
  - 3. Analyzing a Multi-Container Pod Definition
  - 4. Configuring the Ubuntu Sleeper Pod to Run as Root with SYS_TIME Capability
  - 5. Adding the NET_ADMIN Capability to the Ubuntu Sleeper Pod
  - Watch Video
    - Q1: With which user does the web container run?
    - Q2: With which user does the sidecar container run?

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution Security Contexts

In this article, we address common questions about managing security contexts for pods and containers in Kubernetes. Learn how to verify which user is executing a process, modify pod configurations to run under a specific user ID, and adjust container capabilities. These step-by-step examples are designed to help you secure your containerized applications effectively.

---

## 1\. Checking the User Running the Sleep Process in the Ubuntu Sleeper Pod

To verify which user is running the sleep process in your Ubuntu sleeper pod, follow these steps:

1.  List the running pods to identify the pod name.
2.  Execute the command inside the pod using the `whoami` command to check the current user.

Execute the following commands:

```
# List all pods; look for the pod named "ubuntu-sleeper"
kubectl get pods


# Execute a command within the pod to display the current user
kubectl exec ubuntu-sleeper -- whoami
```

The output confirms that the sleep process is running as the root user:

```
controlplane ~ ➜ whoami
root
controlplane ~ ➜ kubectl get pod
NAME              READY   STATUS    RESTARTS   AGE
ubuntu-sleeper    1/1     Running   0          7ms58s
```

> [!important]
> **Note**
>
> If you see `root` as the output, it indicates that no user override has been set, and the container is running with root privileges.

---

## 2\. Updating the Ubuntu Sleeper Pod to Run with User ID 1010

To update the pod so that the sleep process is executed as user ID 1010, proceed as follows:

1.  Retrieve the current pod configuration and write it to a file:

    ```
    kubectl get pod ubuntu-sleeper -o yaml > ubuntu-sleeper.yaml
    ```

2.  Open the `ubuntu-sleeper.yaml` file in your preferred text editor.
3.  Locate the `securityContext` section and add or update the `runAsUser` field to `1010`.
4.  Save your changes.
5.  Delete the existing pod. Using the `--force` flag can expedite deletion:

    ```
    kubectl delete pod ubuntu-sleeper --force
    ```

6.  Reapply the modified configuration file:

    ```
    kubectl apply -f ubuntu-sleeper.yaml
    ```

After reapplying, validate that the pod now runs with user ID 1010.

---

## 3\. Analyzing a Multi-Container Pod Definition

Consider a pod definition file named `multi-pod.yaml` that includes multiple containers with different security contexts set at the pod and container levels. Below is the configuration snippet:

```
apiVersion: v1
kind: Pod
metadata:
  name: multi-pod
spec:
  securityContext:
    runAsUser: 1001
  containers:
    - image: ubuntu
      name: web
      command: ["sleep", "5000"]
      securityContext:
        runAsUser: 1002
    - image: ubuntu
      name: sidecar
      command: ["sleep", "5000"]
```

### Q1: With which user does the web container run?

- The pod-level context sets `runAsUser: 1001`, but the web container’s own security context overrides this with `runAsUser: 1002`.
- **Answer:** The web container runs as user **1002**.

### Q2: With which user does the sidecar container run?

- The sidecar container does not have a specified security context. It inherits the pod-level setting.
- **Answer:** The sidecar container runs as user **1001**.

For more details on Kubernetes security contexts, check out the [Kubernetes Documentation](https://kubernetes.io/docs/).

---

## 4\. Configuring the Ubuntu Sleeper Pod to Run as Root with SYS_TIME Capability

To update the Ubuntu sleeper pod so that it runs as root with the additional `SYS_TIME` capability, follow these instructions:

1.  Open the existing configuration file (`ubuntu-sleeper.yaml`).
2.  Remove any lines in the security context that force the pod to run as a non-root user.
3.  Add a container-level security context that specifies the `SYS_TIME` capability. Your updated configuration should resemble the following:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper
  namespace: default
  creationTimestamp: "2023-07-26T22:12:07Z"
  resourceVersion: "945"
  uid: 34ce800d-d278-4988-bdbe-f9e41086be9f
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      imagePullPolicy: Always
      command:
        - sleep
        - "4800"
      securityContext:
        capabilities:
          add: ["SYS_TIME"]
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-km279
          readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: controlplane
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
```

4.  Save the changes.
5.  Delete the existing pod using:

    ```
    kubectl delete pod ubuntu-sleeper --force
    ```

6.  Reapply the updated configuration:

    ```
    kubectl apply -f ubuntu-sleeper.yaml
    ```

Ensure the pod is running with the `SYS_TIME` capability as expected.

---

## 5\. Adding the NET_ADMIN Capability to the Ubuntu Sleeper Pod

To enhance the Ubuntu sleeper pod so that it includes both the `SYS_TIME` and `NET_ADMIN` capabilities, update the configuration file as follows:

1.  Open the `ubuntu-sleeper.yaml` file.
2.  Locate the container's `securityContext` section that defines the capabilities.
3.  Modify the capabilities to include both `SYS_TIME` and `NET_ADMIN`:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper
  namespace: default
  creationTimestamp: "2023-07-26T22:12:07Z"
  resourceVersion: "945"
  uid: 34ce800d-d278-4988-bdbe-f9e41086be9f
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      imagePullPolicy: Always
      command:
        - sleep
        - "4800"
      securityContext:
        capabilities:
          add: ["SYS_TIME", "NET_ADMIN"]
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-km279
          readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: controlplane
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
```

4.  Save the file.
5.  Delete the current pod:

    ```
    kubectl delete pod ubuntu-sleeper --force
    ```

6.  Apply the new configuration:

    ```
    kubectl apply -f ubuntu-sleeper.yaml
    ```

After these steps, verify that the pod runs with both the `SYS_TIME` and `NET_ADMIN` capabilities enabled.

> [!important]
> **Final Note**
>
> You have now successfully adjusted the security contexts for your Ubuntu sleeper pod. This guide covered verifying container users, configuring pods to run with specific user IDs, and modifying container capabilities to enhance security.

For further reading on Kubernetes security best practices, visit the [Kubernetes Security Documentation](https://kubernetes.io/docs/concepts/security/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/7c215ca1-7d31-493a-b3d0-ef4fe39db467)**
>
> Watch video content
