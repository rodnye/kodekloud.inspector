# Use static analysis of user workloads e - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Supply-Chain-Security/Use-static-analysis-of-user-workloads-e)

---

## Table of Contents

- Use static analysis of user workloads e
  - Getting Started with the Static Analysis Tool
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Supply Chain Security

# Use static analysis of user workloads e

In this lesson, we explore how to analyze Kubernetes resource definition files using static analysis tools, helping you catch security issues and enforce standards before deploying your resources. When you submit a request to create a pod, it passes through several stages handled by the configured admission controllers. Based on their checks, the pod is either accepted or rejected. However, these stages occur only after you’ve crafted the resource definition file and executed the corresponding kubectl command.

Consider the following pod definition file:

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

Static analysis enables you to detect security-related issues at an early stage—before deploying your configuration with kubectl. By reviewing your resource files during the development process, you can enforce security policies and promptly address critical issues.

> [!important]
> **Tip**
>
> One powerful tool for static analysis is integrated with the control plane and is accessible via kubectl. It scans your resource definition files and returns a score along with detailed information about potential issues.

When scanning the pod definition above, the analysis tool might produce an output similar to this:

```
{
  "object": "Pod/sample-pod.default",
  "valid": true,
  "fileName": "API",
  "message": "Failed with a score of -30 points",
  "score": -30,
  "scoring": {
    "critical": [
      {
        "id": "Privileged",
        "selector": "containers[].securityContext.privileged == true",
        "reason": "Privileged containers can allow almost complete system access."
      }
    ]
  },
  "advise": [
    {
      "id": "ApparmorAny",
      "selector": "metadata.annotations.\"container.apparmor.security.beta.kubernetes.io/ubuntu\"",
      "reason": "Well-defined AppArmor policies may provide enhanced security.",
      "points": 3
    },
    {
      "id": "ServiceAccountName",
      "selector": "spec.serviceAccountName",
      "reason": "Using service accounts restricts Kubernetes API access.",
      "points": 3
    }
  ]
}
```

In the output above, the tool has flagged the use of privileged containers as a critical security issue, assigning the pod a score of -30. The detailed reasoning provided helps you understand why this configuration poses a risk.

## Getting Started with the Static Analysis Tool

To begin, install the binary locally so that you can run the commands directly on your machine. Here’s how you can scan a resource file (for example, named pod.yaml):

```
kubecsec scan pod.yaml
```

Alternatively, you can send a request to a publicly hosted service using curl. The service is available at [v2.kubsec.io](https://v2.kubecsec.io). For instance, run:

```
curl -sSX POST --data-binary @"pod.yaml" https://v2.kubecsec.io/scan
```

You also have the option to run the tool as a local server on your machine. To start the HTTP server on port 8080, execute the following command:

```
kubecsec http 8080 &
```

> [!important]
> **Lab Exercise**
>
> In the labs, you will have the opportunity to practice with kubecsec, gaining practical experience on how static analysis of Kubernetes resource files can strengthen your security posture early in your development process.

Happy scanning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/1950504d-1bea-4ef0-a92c-683f9c5a0c23)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/11566885-cd7c-468d-a321-5d9d6fed5f46)**
>
> Practice lab
