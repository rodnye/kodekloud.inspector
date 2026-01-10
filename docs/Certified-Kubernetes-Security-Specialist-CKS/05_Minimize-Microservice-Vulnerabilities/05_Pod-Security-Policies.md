# Pod Security Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Pod-Security-Policies)

---

## Table of Contents

- Pod Security Policies
  - Sample Pod Definition
  - The Role of Pod Security Policies
  - Enabling PSP on the API Server
  - Defining a Pod Security Policy
  - How the Admission Controller Works
  - Summary and Challenges
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Pod Security Policies

In this lesson, we explore pod security in Kubernetes by examining a sample pod definition and discussing how Pod Security Policies (PSPs) were used to restrict insecure configurations. Although PSPs have been deprecated in favor of Pod Security Admission and Pod Security Standards (available since Kubernetes 1.25), understanding PSPs is still useful—especially when working with legacy clusters.

---

## Sample Pod Definition

Below is a sample pod definition that creates a pod running an Ubuntu container. The configuration includes permissive settings often unsuitable for production environments:

```
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        privileged: True
        runAsUser: 0
        capabilities:
          add: ["CAP_SYS_BOOT"]
  volumes:
    - name: data-volume
      hostPath:
        path: /data
        type: Directory
```

In this pod:

- The `privileged` flag is set to `True`, granting container processes elevated privileges.
- The container runs as root (`runAsUser: 0`).
- It adds specific capabilities like `CAP_SYS_BOOT`.
- A HostPath volume is used, exposing part of the host’s filesystem.

These settings can introduce security vulnerabilities. To safeguard your cluster, it is important to enforce policies that restrict such configurations.

---

## The Role of Pod Security Policies

Pod Security Policies were designed to validate pod creation requests against a set of pre-configured security rules. When the PSP admission controller is enabled, it intercepts pod creation requests and rejects those that do not comply with the defined policies. For example, a pod configured with the `privileged` flag set to `True` can be denied by an appropriately configured PSP.

> [!important]
> **Note**
>
> When a violation is detected, the system rejects the pod creation request and returns an error message, preventing insecure pods from running.

---

## Enabling PSP on the API Server

PSP functions as an Admission Controller. To enable it, add the `PodSecurityPolicy` plugin to the API server’s list of admission plugins. An example snippet from the API server’s startup command is shown below:

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
  --enable-admission-plugins=PodSecurityPolicy
```

Similarly, here’s an excerpt from the API server pod definition that confirms the admission plugin is enabled:

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
        - --enable-admission-plugins=PodSecurityPolicy
      image: k8s.gcr.io/kube-apiserver-amd64:v1.11.3
      name: kube-apiserver
```

Once the admission controller is activated, every pod creation request is validated against the PSP rules.

---

## Defining a Pod Security Policy

To enforce security, you can create a PSP that, for instance, disallows pods with the privileged flag enabled. Start by reviewing the original pod definition for context:

```
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        privileged: True
        runAsUser: 0
        capabilities:
          add: ["CAP_SYS_BOOT"]
  volumes:
    - name: data-volume
      hostPath:
        path: /data
        type: Directory
```

Now, define a Pod Security Policy that disallows privileged containers:

```
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: example-psp
spec:
  privileged: false
```

This basic PSP will reject any pod creation request that tries to run a container with the `privileged` flag.

You can further customize the policy to enforce stricter measures. For instance, the following definition disallows running as root, mandates dropping the `CAP_SYS_BOOT` capability, adds a default capability, and only permits specific volume types:

```
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        privileged: True
        runAsUser: 0
        capabilities:
          add: ["CAP_SYS_BOOT"]
  volumes:
    - name: data-volume
      hostPath:
        path: /data
        type: Directory
---
# psp.yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: example-psp
spec:
  privileged: false
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  runAsUser:
    rule: MustRunAsNonRoot
  requiredDropCapabilities:
    - CAP_SYS_BOOT
  defaultAddCapabilities:
    - CAP_SYS_TIME
  volumes:
    - persistentVolumeClaim
```

> [!important]
> **Important**
>
> It is important to understand that while PSPs can add default values to pod definitions, the new Pod Security Admission and Pod Security Standards do not support this mutating behavior.

---

## How the Admission Controller Works

When a pod creation request is submitted, the PSP admission controller:

- Queries all available Pod Security Policy objects.
- Validates the pod against the defined rules.
- Denies requests that conflict with the established policies (e.g., a pod using a disallowed `privileged` flag).

If the PSP admission controller is enabled without the proper PSP objects and roles, all pod creation requests may be blocked. This scenario emphasizes the need for correctly defined policies and associated Role and RoleBinding configurations.

For pods to access a PSP, they must be associated with a Service Account. By default, the `default` Service Account is used if none is specified. Then, you need to create a Role and RoleBinding to grant the Service Account permission to use the specific PSP. For example:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: psp-example-role
rules:
  - apiGroups: ["policy"]
    resources: ["podsecuritypolicies"]
    resourceNames: ["example-psp"]
    verbs: ["use"]
```

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: psp-example-rolebinding
subjects:
  - kind: ServiceAccount
    name: default
    namespace: default
roleRef:
  kind: Role
  name: psp-example-role
  apiGroup: rbac.authorization.k8s.io
```

With these permissions in place, any pod creation request that fails to meet the PSP criteria is denied by the admission controller.

---

## Summary and Challenges

To summarize:

- Pod Security Policies validate and potentially modify pod definitions based on strict security rules.
- Enabling PSPs requires changes both at the API server level (by enabling the admission controller) and at the cluster level (by creating the necessary PSP objects and RBAC permissions).
- An incomplete setup can result in the unintentional denial of all pod creation requests.
- Binding PSP access to specific Service Accounts might interfere with the functionality of controllers (like Deployments) if not correctly configured.

> [!important]
> **Caution**
>
> Due to the complexities and effort required to manage PSP configurations, they were deprecated in Kubernetes 1.21 and removed entirely in 1.25. The newer Pod Security Admission and Pod Security Standards provide a more streamlined approach to securing your cluster.

![The image outlines Kubernetes pod security, mentioning Pod Security Policy (deprecated), Pod Security Admission, and Pod Security Standards.](https://kodekloud.com/kk-media/image/upload/v1752871671/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Pod-Security-Policies/frame_530.jpg)

We will further explore the Pod Security Admission mechanism and explain how it simplifies securing your Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/a2615821-9959-462d-8869-080fb902705b)**
>
> Watch video content
