# Falco Overview and Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Falco-Overview-and-Installation)

---

## Table of Contents

- Falco Overview and Installation
  - How Falco Operates
  - Installing Falco on a Node
  - Deploying Falco as a DaemonSet
  - Verifying the Installation
  - Links and References
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Falco Overview and Installation

In this guide, we will walk through installing Falco on a Kubernetes cluster and show you how to use it to detect and analyze potential threats.

Falco works by monitoring system calls from user-space applications into the Linux kernel. It captures these calls and processes them with its policy engine, which uses predefined rules to identify suspicious activities. When an anomaly is detected, Falco can alert administrators via syslog, standard output, Slack, email notifications, and other channels.

## How Falco Operates

Falco has two methods to interact with the Linux kernel:

1.  **Kernel Module Method**  
    Falco can insert a kernel module, adding extra code to the Linux kernel. Although this approach is effective, it is considered intrusive. Some managed Kubernetes service providers restrict the use of kernel modules due to security policies.
2.  **eBPF (Extended Berkeley Packet Filter) Method**  
    Alternatively, Falco leverages eBPF to interact with the kernel in a less invasive way. This method is generally preferred by many providers for its lower impact on system integrity.

Once system calls are captured by either method, they are passed through user-space syscall libraries and then filtered by Falco's policy engine. This engine evaluates the data using Falco rules and generates alerts if any suspicious events occur.

![The image illustrates Falco's architecture, showing components like applications, syscalls, kernel modules, eBPF, policy engine, libraries, and Falco rules, leading to output generation.](https://kodekloud.com/kk-media/image/upload/v1752871681/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Falco-Overview-and-Installation/frame_90.jpg)

> [!important]
> **Falco Security Advantage**
>
> Installing Falco directly on a node as a service ensures that even in the event of a compromise, Falco remains isolated from the Kubernetes environment and continues to effectively detect suspicious behavior.

## Installing Falco on a Node

Since Falco interacts directly with the kernel, installing it as a standard software package involves also installing the corresponding kernel module. Follow these steps to install Falco on a node:

1.  Import the Falco public key and add the repository:

    ```
    curl -s https://falco.org/repo/falcosecurity-3672BA8F.asc | apt-key add -
    echo "deb https://download.falco.org/packages/deb stable main" | tee -a /etc/apt/sources.list.d/falcosecurity.list
    ```

2.  Update the package list, install the appropriate kernel headers and Falco, then start the service:

    ```
    apt update -y
    apt-get install -y linux-headers-$(uname -r)
    apt install -y falco
    systemctl start falco
    ```

## Deploying Falco as a DaemonSet

If installing Falco directly on the node is not feasible, you can deploy it as a DaemonSet across all cluster nodes. The easiest way to achieve this is by using Helm charts. For detailed deployment instructions, please refer to the detailed steps provided in the [reference section](#links-and-references) below.

## Verifying the Installation

After installing Falco, verify that the Falco pods are running on all nodes by executing:

```
kubectl get pods

NAME          READY   STATUS    RESTARTS   AGE
falco-7grdt   1/1     Running   0          2m21s
falco-tmq28   1/1     Running   0          2m21s
```

If the pods are running, your Falco installation is successfully monitoring your Kubernetes environment for any anomalous behavior.

> [!important]
> **Next Steps**
>
> With Falco up and running, you are well-equipped to utilize its robust rules engine to detect potential threats and secure your Kubernetes cluster.

## Links and References

- [Falco Official Documentation](https://falco.org/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Charts Repository](https://artifacthub.io/)

By following these steps, you will ensure a secure and efficient Falco deployment that continuously monitors your Kubernetes environment for any suspicious activity. Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/33a62604-1e7b-4e9a-950e-5e7a0302b141)**
>
> Watch video content
