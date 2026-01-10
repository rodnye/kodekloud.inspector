# Admission Controllers 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Admission-Controllers-2025-Updates)

---

## Table of Contents

- Admission Controllers 2025 Updates
  - Authentication and Authorization Flow
  - The Role of Admission Controllers
  - Detailed Example: Namespace Existence Check
  - Configuring Admission Controllers
  - Transition from Deprecated Controllers
  - Watch Video
  - Practice Lab
    - Built-In Admission Controllers
    - Enabling Admission Controllers
    - Auto-Provisioning a Namespace
      - Traditional Kube API Server Service
      - Kubeadm-Based Setup (API Server as a Pod)

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Admission Controllers 2025 Updates

In this lesson, we explore admission controllers in Kubernetes and understand how they play a crucial role in enforcing security policies beyond basic RBAC. When you execute commands using the kubectl utility—such as creating a pod—the request is first sent to the API server, which then processes and persists the data in the etcd database.

## Authentication and Authorization Flow

When a command like creating a pod is issued, the following steps occur:

1.  **Authentication:**  
    The API server authenticates the request. For example, when you run a command via kubectl, the KubeConfig file provides the necessary certificates. Consider the following configuration:

    ```
    > cat ~/.kube/config
    apiVersion: v1
    clusters:
    - cluster:
        certificate-authority-data: LS0tCIlRjdG......BQyMjAwFURs9tCg==
        server: https://example.com
      name: example-cluster
    ```

2.  **Authorization (RBAC):**  
    Once authenticated, the API server checks if the user is authorized to perform the requested action. Role-based Access Control (RBAC) is commonly used here. For instance, if a user is assigned the following role:

    ```
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: developer
    rules:
    - apiGroups: [""]
      resources: ["pods"]
      verbs: ["list", "get", "create", "update", "delete"]
    ```

    The user is permitted to list, get, create, update, or delete pods. RBAC can also restrict access to specific resource names or namespaces:

    ```
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: developer
    rules:
    - apiGroups: [""]
      resources: ["pods"]
      verbs: ["create"]
      resourceNames: ["blue", "orange"]
    ```

    > [!important]
    > **Note**
    >
    > These RBAC rules are enforced at the API level and determine which API operations a user can access.

## The Role of Admission Controllers

While RBAC handles basic authorization, it does not offer advanced validations or mutations. Admission controllers step in to provide additional security by:

- Validating pod specifications (e.g., ensuring that images are not from a public Docker Hub registry or enforcing the prohibition of the "latest" tag).
- Rejecting pods running containers as the root user, or enforcing specific Linux capabilities.
- Ensuring required metadata like labels is included.

Admission controllers can validate requests, modify configurations, or perform extra operations before the resources are persisted to etcd.

![The image is a flowchart illustrating the process of creating a pod in Kubernetes, involving steps like authentication, authorization, and admission controllers.](https://kodekloud.com/kk-media/image/upload/v1752869884/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Admission-Controllers-2025-Updates/kubernetes-pod-creation-flowchart.jpg)

### Built-In Admission Controllers

Some of the built-in admission controllers in Kubernetes include:

- **AlwaysPullImages:** Forces image pulling on each pod creation.
- **DefaultStorageClass:** Automatically assigns a default storage class to PVCs if none is specified.
- **EventRateLimit:** Limits the number of concurrent API server requests to prevent overload.
- **NamespaceExists:** Rejects requests to operate in non-existent namespaces.

## Detailed Example: Namespace Existence Check

Consider attempting to create a pod in a non-existent namespace named "blue." When you execute:

```
kubectl run nginx --image nginx --namespace blue
```

The request proceeds through authentication and authorization, then reaches the admission controllers. The NamespaceExists admission controller checks for the "blue" namespace and rejects the request if it does not exist:

```
Error from server (NotFound): namespaces "blue" not found
```

Alternatively, Kubernetes offers the NamespaceAutoProvision admission controller (not enabled by default) to automatically create a missing namespace.

To check the enabled admission controllers, run:

```
kube-apiserver -h | grep enable-admission-plugins
```

This command lists the active admission plugins, including defaults such as NamespaceLifecycle, LimitRanger, ServiceAccount, among others.

## Configuring Admission Controllers

### Enabling Admission Controllers

To add a new admission controller, update the `enable-admission-plugins` flag on the Kube API server service. For a kubeadm-based setup, modify the kube-apiserver manifest file.

#### Traditional Kube API Server Service

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

#### Kubeadm-Based Setup (API Server as a Pod)

```
apiVersion: v1
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
    image: k8s.gcr.io/kube-apiserver-amd64:v1.11.3
    name: kube-apiserver
```

> [!important]
> **Disabling Admission Controllers**
>
> To disable specific admission controllers, use the `disable-admission-plugins` flag in a similar manner.

### Auto-Provisioning a Namespace

Once the admission controller is correctly configured, executing the pod creation command in a previously non-existent namespace "blue" will trigger the NamespaceAutoProvision controller, which will automatically create the namespace and allow the pod creation to succeed. For example:

```
kubectl run nginx --image nginx --namespace blue
Pod/nginx created!
```

Listing the namespaces confirms the creation of "blue":

```
kubectl get namespaces
NAME         STATUS   AGE
blue         Active   3m
default      Active   23m
kube-public  Active   24m
kube-system  Active   24m
```

## Transition from Deprecated Controllers

It is important to note that the NamespaceAutoProvision and NamespaceExists admission controllers have been deprecated. They have been replaced by the NamespaceLifecycle admission controller, which:

- Rejects requests to non-existent namespaces.
- Protects default namespaces (default, kube-system, kube-public) from deletion.

This ensures a robust and consistent namespace management mechanism.

---

This lesson has provided an in-depth look at how admission controllers enhance Kubernetes security by validating, mutating, and even auto-provisioning resources as required. Head over to the labs to practice working with admission controllers and further solidify your understanding.

For more information, explore the following resources:

| Resource Type | Use Case                  | Example                                         |
| ------------- | ------------------------- | ----------------------------------------------- |
| Pod           | Basic unit of deployment  | `kubectl run nginx --image=nginx`               |
| Deployment    | Managed pods with scaling | `kubectl create deployment nginx --image=nginx` |
| Service       | Network access to pods    | `kubectl expose deployment nginx --port=80`     |

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/30310f99-eca1-44a7-a564-ce20246e48eb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/d9398583-1f11-4b74-a8ee-2bc0790f3193)**
>
> Practice lab
