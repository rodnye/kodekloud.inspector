# Using Runtimes in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Using-Runtimes-in-Kubernetes)

---

## Table of Contents

- Using Runtimes in Kubernetes
  - Create a RuntimeClass
  - Deploying a Pod with the gVisor Runtime
  - Verifying the Configuration
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Using Runtimes in Kubernetes

In this lesson, we demonstrate how to configure a specific runtime for Kubernetes pods. Previously, we introduced gVisor—which leverages the runsc runtime to create containers. In this guide, we assume that gVisor is already installed on your Kubernetes nodes, and we will now explicitly configure pods to use this runtime.

## Create a RuntimeClass

To use gVisor with Kubernetes, you need to create a RuntimeClass object. This object contains two important fields:

1.  **Name**: An identifier for the RuntimeClass (in this example, "gvisor").
2.  **Handler**: Specifies the runtime to use (for gVisor, this is `runsc`).

Below is the YAML definition for the RuntimeClass:

```
apiVersion: node.k8s.io/v1beta1
kind: RuntimeClass
metadata:
  name: gvisor
handler: runsc
```

Save this configuration to a file (for example, `gvisor.yaml`), and then create the RuntimeClass by running:

```
kubectl create -f gvisor.yaml
# Expected output:
# runtimeclass.node.k8s.io/gvisor created
```

> [!important]
> **Tip**
>
> You can assign any name you prefer to the RuntimeClass, but the `handler` must always be a valid runtime (e.g., `runsc` for gVisor or `kata` for Kata Containers).

## Deploying a Pod with the gVisor Runtime

Next, create a pod that uses the gVisor runtime. The pod definition below launches an Nginx container with the specified runtime by including the `runtimeClassName` field in the pod spec:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx
  name: nginx
spec:
  runtimeClassName: gvisor
  containers:
    - image: nginx
      name: nginx
```

Apply the pod definition using the following command:

```
kubectl create -f <pod-definition.yaml>
```

After the pod is created, it will run using the gVisor runtime.

## Verifying the Configuration

To ensure that the Nginx container is isolated from the host Linux kernel:

1.  Check for the Nginx process on the node by running:

    ```
    node01:~# pgrep -a nginx
    ```

    If the command returns no results, it indicates that gVisor is effectively sandboxing the container.

2.  You may also notice a `runsc` runtime process running on the node, confirming that the container is using the specified runtime.

> [!important]
> **Next Steps**
>
> Proceed to the Hands-on Labs to practice working with container runtimes and further enhance your Kubernetes skills.

![The image contains the text "Hands-on Labs" centered on a plain white background.](https://kodekloud.com/kk-media/image/upload/v1752871676/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Using-Runtimes-in-Kubernetes/frame_140.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/545940f3-49bd-4810-95f3-227913e329c1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/00d9d823-77cb-43cb-9229-ad9faea41282)**
>
> Practice lab
