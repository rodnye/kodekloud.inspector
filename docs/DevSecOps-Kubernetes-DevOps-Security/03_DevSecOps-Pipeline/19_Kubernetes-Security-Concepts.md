# Kubernetes Security Concepts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Kubernetes-Security-Concepts)

---

## Table of Contents

- Kubernetes Security Concepts
  - Table of Contents
  - Common Kubernetes Vulnerabilities
  - Scanning and Policy Enforcement
  - Defining and Applying securityContext
  - Additional Kubernetes Security Features
  - Demo: Validating Deployments with OPA Conftest
  - Links & References
  - Watch Video
    - Example securityContext

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Kubernetes Security Concepts

In this guide, we’ll cover critical Kubernetes security concepts, highlight common vulnerabilities in deployments and container images, and show you how to enforce policies using industry-standard tools like [OPA Conftest](https://www.conftest.dev), [Kubesec](https://kubesec.io), and [Trivy](https://aquasecurity.github.io/trivy/). By the end, you’ll have actionable steps to harden your clusters and CI/CD pipelines.

---

## Table of Contents

1.  [Common Kubernetes Vulnerabilities](#common-kubernetes-vulnerabilities)
2.  [Scanning and Policy Enforcement](#scanning-and-policy-enforcement)
3.  [Defining and Applying securityContext](#defining-and-applying-securitycontext)
4.  [Additional Kubernetes Security Features](#additional-kubernetes-security-features)
5.  [Demo: Validating Deployments with OPA Conftest](#demo-validating-deployments-with-opa-conftest)
6.  [Links & References](#links--references)

---

## Common Kubernetes Vulnerabilities

Attackers often exploit misconfigurations or unpatched components. Typical risks include:

- **Privileged Containers**
- **Images with Known CVEs**
- **Excessive RBAC Permissions**
- **Unrestricted Network Access**
- **Improper Secret Management**

Addressing these early in your development lifecycle prevents costly incidents later on.

---

## Scanning and Policy Enforcement

Leverage automated scanners and policy-as-code to detect risks before deployment. Below is a comparison:

| Tool         | Use Case                          | Example Command                                    |
| ------------ | --------------------------------- | -------------------------------------------------- |
| Trivy        | Image & filesystem CVE scanning   | `trivy image my-app:latest`                        |
| Kubesec      | Static manifest analysis          | `kubesec scan deployment.yaml`                     |
| OPA Conftest | Custom policy checks against YAML | `conftest test deployment.yaml --policy policies/` |

> [!important]
> **Note**
>
> Integrate these tools into your CI pipelines for continuous assessment. For example, add a GitHub Action step to run `trivy` on every push.

---

## Defining and Applying securityContext

A `securityContext` sets Linux privileges and filesystem controls for Pods and containers. Enforcing non-root users and read-only filesystems significantly reduces attack surface.

| Field                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `runAsUser`                | Numeric UID the container must run as                        |
| `runAsNonRoot`             | Ensures the container UID is non-zero                        |
| `readOnlyRootFilesystem`   | Mounts the root filesystem read-only                         |
| `allowPrivilegeEscalation` | Defaults to `false` to block setuid binaries and escalations |

> [!important]
> **Warning**
>
> Running containers as root (UID 0) may allow privilege escalation and lateral movement within your cluster. Always set `runAsNonRoot: true` unless absolutely necessary.

### Example securityContext

```
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsUser: 1000
    runAsNonRoot: true
    readOnlyRootFilesystem: true
  containers:
    - name: app
      image: your-registry/secure-app:latest
      securityContext:
        allowPrivilegeEscalation: false
      volumeMounts:
        - name: tmp-volume
          mountPath: /tmp
  volumes:
    - name: tmp-volume
      emptyDir: {}
```

---

## Additional Kubernetes Security Features

Beyond `securityContext`, Kubernetes offers:

- **AppArmor & SELinux** policies for Mandatory Access Control
- **Pod Security Admission** & legacy PodSecurityPolicy
- **NetworkPolicies** to isolate traffic at the pod level
- **Audit Logging** for forensic analysis
- **Air-gapped Cluster Deployments** for sensitive environments
- **TLS Encryption** for API and etcd communication

---

## Demo: Validating Deployments with OPA Conftest

1.  **Write a Rego Policy**  
    Create `policies/run_as_non_root.rego`:

    ```
    package k8s.security


    deny[msg] {
      input.kind == "Pod"
      not input.spec.securityContext.runAsNonRoot
      msg = "Pods must set securityContext.runAsNonRoot = true"
    }
    ```

2.  **Create a Sample Deployment**  
    Save as `deployment.yaml`:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: insecure-deployment
    spec:
      replicas: 1
      template:
        metadata:
          labels:
            app: insecure
        spec:
          containers:
            - name: app
              image: busybox
    ```

3.  **Run Conftest**

    ```
    conftest test deployment.yaml --policy policies/
    ```

    You should see an error indicating the missing `runAsNonRoot` setting.

---

## Links & References

- [OPA Conftest](https://www.conftest.dev)
- [Kubesec.io](https://kubesec.io)
- [Trivy by Aqua Security](https://aquasecurity.github.io/trivy/)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/overview/)
- [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/9cddc9b9-2fb6-4b17-9318-8a1203addbb8)**
>
> Watch video content
