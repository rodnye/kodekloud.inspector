# Admission Controllers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Admission-Controllers)

---

## Table of Contents

- Admission Controllers
  - Built-in Admission Controllers
  - Configuring Admission Controllers
  - Auto-Provisioning Example
  - References
  - Watch Video
  - Practice Lab
    - Example: Namespace Existence Check

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Admission Controllers

In this lesson, we’ll explore admission controllers—an essential component of Kubernetes that enforces additional security measures and modifies requests before they are persisted. Understanding how admission controllers work and how to configure them is key to enhancing your cluster’s security and operations.

When you use the kubectl utility to interact with a Kubernetes cluster (for example, to create a pod), the request first reaches the API server. The following sequence outlines the process:

1.  The API server receives the request.
2.  It authenticates the request—commonly using certificates specified in your KubeConfig file. For example, inspect your KubeConfig with:

    ```
    cat ~/.kube/config
    apiVersion: v1
    clusters:
    - cluster:
        certificate-authority-data: LS0t...
        # Truncated for brevity
    ```

3.  Once authenticated, the request proceeds to the authorization phase where Kubernetes checks if the user has permission to perform the operation, typically using Role-Based Access Control (RBAC). For example, a developer role can be defined as follows:

    ```
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: developer
    rules:
    - apiGroups: [""]
      resources: ["pods"]
      verbs: ["list", "get", "create", "update", "delete"]
      resourceNames: ["blue", "orange"]
    ```

    In this example, the developer role is limited to operations on pods named "blue" or "orange". These RBAC rules operate solely at the API level to control permitted operations.

After authentication and authorization, you might need to enforce restrictions beyond what RBAC offers. Consider these scenarios:

- Preventing images from public Docker Hub by allowing only images from a specific internal registry.
- Enforcing that images never use the "latest" tag.
- Rejecting pod creation when a container is configured to run as the root user.
- Allowing specific capabilities (like "MAC_ADMIN") only under certain conditions.
- Ensuring resource metadata always includes specific labels.

To address such policies, admission controllers are used. They operate after authentication and authorization but before the request is saved in etcd. Admission controllers can validate configurations, modify requests, or trigger additional operations.

Below is an overview of the Kubernetes process flow with admission controllers positioned between the authorization phase and resource creation:

![The image illustrates the Kubernetes process flow: Kubectl to Authentication, Authorization, Admission Controllers, and finally, Create Pod.](https://kodekloud.com/kk-media/image/upload/v1752871273/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Admission-Controllers/frame_210.jpg)

## Built-in Admission Controllers

Kubernetes includes several built-in admission controllers, such as:

- **Always Pull Images:** Ensures that images are pulled every time a pod is created.
- **Default Storage Class:** Automatically assigns a default storage class to PersistentVolumeClaims (PVCs) when none is specified.
- **Event Rate Limit:** Throttles the number of requests processed by the API server to prevent overload.
- **Namespace Exists:** Rejects requests for resources in namespaces that do not exist.

### Example: Namespace Existence Check

Consider the "namespace exists" admission controller. When you attempt to create a pod in a namespace that doesn’t exist, for instance:

```
kubectl run nginx --image nginx --namespace blue
```

The API server goes through authentication and RBAC authorization. Then, the namespace exists controller checks for the "blue" namespace. Since it isn’t found, the request is rejected with an error similar to:

```
Error from server (NotFound): namespaces "blue" not found
```

> [!important]
> **Namespace Auto-Provisioning**
>
> Some clusters may have the namespace auto-provision admission controller enabled (disabled by default) to automatically create missing namespaces.

To list the admission controllers enabled by default, run:

```
kube-apiserver -h | grep enable-admission-plugins
```

If you’re using a kubeadm-based setup, execute this command inside the kube-apiserver control plane pod using the kubectl exec command.

## Configuring Admission Controllers

To add an admission controller, update the `--enable-admission-plugins` flag on the Kubernetes API server. In a kubeadm-based setup, modify the kube-apiserver manifest file accordingly. For example, to enable both NodeRestriction and NamespaceAutoProvision, update the ExecStart command as follows:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --runtime-config=api/all \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  --v=2 \
  --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
```

For clusters running the API server as a pod (common in kubeadm setups), the manifest might look like this:

```
apiVersion: vl
kind: Pod
metadata:
  creationTimestamp: null
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --authorization-mode=Node,RBAC
    - --advertise-address=172.17.0.107
    - --allow-privileged=true
    - --enable-bootstrap-token-auth=true
    - --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
    image: k8s.gcr.io/kube-apiserver-amd64:vl.11.3
    name: kube-apiserver
```

To disable specific admission controller plugins, use the `--disable-admission-plugins` flag similarly.

## Auto-Provisioning Example

With NamespaceAutoProvision enabled, running the following command:

```
kubectl run nginx --image nginx --namespace blue
```

passes through authentication and authorization. The auto-provision controller detects that the "blue" namespace is missing, creates it automatically, and the pod creation completes successfully. The output would be:

```
kubectl run nginx --image nginx --namespace blue
Pod/nginx created!
```

Verifying the existing namespaces:

```
kubectl get namespaces
NAME         STATUS   AGE
blue         Active   3m
default      Active   23m
kube-public  Active   24m
kube-system  Active   24m
```

This example shows that admission controllers not only validate and potentially reject requests but can also perform background operations and modify the request content as needed.

> [!important]
> **Deprecated Controllers**
>
> Note that the NamespaceAutoProvision and NamespaceExists admission controllers are deprecated. They have been replaced by the Namespace Lifecycle admission controller, which now ensures that requests to non-existent namespaces are rejected and protects default namespaces (such as default, kube-system, and kube-public) from deletion.

This concludes our lesson on admission controllers. By practicing with these controllers, you can gain a deeper understanding of how to enhance Kubernetes security and manage your cluster effectively.

## References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/3daea1a8-e40b-4ec9-8621-84abcb4e015c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/4c63ee14-dd02-4c4d-be87-17685de01d13)**
>
> Practice lab
