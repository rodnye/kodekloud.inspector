# Malicious Code Execution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Malicious-Code-Execution)

---

## Table of Contents

- Malicious Code Execution
  - What Is Malicious Code Execution?
  - Attack Vectors and Threat Model
  - Mitigation Strategies
  - Summary of Container Security Measures
  - References
  - Watch Video
    - Post-Compromise via Kubernetes API
    - Poisoning the Image Repository
    - 1. Scan and Patch Vulnerabilities
    - 2. Restrict API Server Access
    - 3. Secure Image Repositories and Pull Secrets
    - 4. Monitor and Alert
    - 5. Audit and Review

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Malicious Code Execution

In this guide, we explore how attackers can execute unauthorized code in a Kubernetes cluster, identify common attack vectors, and implement robust mitigation strategies. You’ll learn to harden your environment against container exploits, API abuse, and repository poisoning.

## What Is Malicious Code Execution?

Malicious code execution occurs when an adversary leverages a vulnerability in your application or cluster configuration to run unauthorized commands or binaries inside a container or on the host system. This can lead to privilege escalation, data exfiltration, or full cluster compromise.

## Attack Vectors and Threat Model

Attackers may use one or more of the following methods:

| Attack Vector                | Description                                                                     | Potential Impact                      |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| Import Tools or Scripts      | Containers with `curl`, `wget`, or package managers download extra payloads.    | Arbitrary code execution inside pods. |
| Modify Host Files            | Mounted host filesystem allows tampering with config files or startup scripts.  | Persistence and stealthy backdoors.   |
| Host-Level Process Injection | Abusing host PID namespace or `SYS_PTRACE` to trace/inject into host processes. | Host compromise and lateral movement. |

> [!important]
> **Warning**
>
> Granting `SYS_PTRACE` or enabling host PID namespaces is highly risky. Review [Kubernetes Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) before enabling any privileged capabilities.

![The image is a flowchart illustrating various methods for executing processes in a running container, including importing malicious code, modifying host files, and starting processes with specific container privileges.](https://kodekloud.com/kk-media/image/upload/v1752880819/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/container-process-execution-flowchart.jpg)

### Post-Compromise via Kubernetes API

Once inside the container, an attacker can call the [Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview) to spawn new pods, trigger Denial of Service, or harvest credentials.

![The image is a diagram titled "Compromised Application," showing a network of interconnected components, including pods, nodes, and APIs, with some elements marked as compromised.](https://kodekloud.com/kk-media/image/upload/v1752880820/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/compromised-application-diagram.jpg)

### Poisoning the Image Repository

If attackers obtain an image pull secret, they can push backdoored images to your registry. Subsequent deployments that pull these images will run malicious containers.

![The image is a diagram illustrating the concept of "Poisoning the Image Repository," showing a flow of containers and pods interacting with Docker Hub and a host system. It includes elements like Nginx, Node.js, and MySQL, highlighting potential vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752880821/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/poisoning-image-repository-diagram.jpg)

---

## Mitigation Strategies

### 1\. Scan and Patch Vulnerabilities

Regularly scan container images and host OS for CVEs. Integrate vulnerability scanners like [Trivy](https://github.com/aquasecurity/trivy) in your CI/CD pipeline and apply security patches promptly.

![The image is a slide titled "Malicious Code Execution – Mitigating Risks," featuring icons for "Scanning vulnerabilities" and "Applying patches," with a note about updating servers and backend with security patches to reduce exploitation risk.](https://kodekloud.com/kk-media/image/upload/v1752880822/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/malicious-code-execution-mitigating-risks.jpg)

> [!important]
> **Note**
>
> Automate image scanning with every build. Block deployments if high-severity vulnerabilities are found.

### 2\. Restrict API Server Access

Enforce strong authentication and granular [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) policies so that only trusted identities can call sensitive API endpoints.

![The image illustrates a concept of mitigating risks in malicious code execution, showing a user being blocked from accessing an API, with references to unauthorized command execution and RBAC (Role-Based Access Control).](https://kodekloud.com/kk-media/image/upload/v1752880823/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/mitigating-risks-malicious-code-execution.jpg)

### 3\. Secure Image Repositories and Pull Secrets

Store your image pull secrets in encrypted vaults (e.g., [HashiCorp Vault](https://www.vaultproject.io/)). Limit service accounts that can reference them and enforce [image signing](https://www.sigmavisibility.com/) to verify integrity.

```
kubectl create secret docker-registry my-image-pull-secret \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-server=<registry-url> \
  --namespace=default
```

```
apiVersion: v1
kind: Pod
metadata:
  name: my-secure-pod
  namespace: default
spec:
  serviceAccountName: specific-service-account
  containers:
    - name: myapp
      image: <registry-url>/myapp:latest
  imagePullSecrets:
    - name: my-image-pull-secret
```

### 4\. Monitor and Alert

Use audit logs and monitoring tools to detect exec calls, secret changes, or anomalous API usage. For Kubernetes clusters with Prometheus:

```
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: security-monitoring-rules
  namespace: default
spec:
  groups:
    - name: security-alerts
      rules:
        - alert: SecretChangeDetected
          expr: kube_secret_info
          for: 1m
          labels:
            severity: critical
          annotations:
            summary: "Secret Change Detected"
            description: "A change was detected in a Kubernetes Secret, which could indicate unauthorized access or tampering."
        - alert: CommandExecutionInContainer
          expr: increase(kube_audit_event_total{verb="exec"}[5m]) > 0
          for: 1m
          labels:
            severity: warning
          annotations:
            summary: "Exec API call detected in container"
            description: "An exec call was detected in container {{ $labels.container }} via the API. This might indicate suspicious activity."
```

### 5\. Audit and Review

Periodically review RBAC roles, service account permissions, and image registry policies. Conduct penetration tests to validate your security posture.

![The image is a slide titled "Malicious Code Execution – Mitigating Risks," featuring three key points: permissions for service accounts, security of image repositories, and access controls for API servers, along with an icon for auditing and reviewing.](https://kodekloud.com/kk-media/image/upload/v1752880824/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/malicious-code-execution-mitigating-risks-2.jpg)

---

## Summary of Container Security Measures

1.  Restrict API server access to authorized roles.
2.  Secure image registries and enforce signed images.
3.  Monitor audit logs and set up real-time alerts.
4.  Keep containers and hosts up to date with patches.
5.  Regularly audit RBAC, service accounts, and CI/CD pipelines.

![The image is a summary slide listing five security measures for containers, including restricting API access, securing image repositories, monitoring activities, and updating applications. The slide has a gradient background with numbered points.](https://kodekloud.com/kk-media/image/upload/v1752880826/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Malicious-Code-Execution/container-security-measures-summary.jpg)

---

## References

- [Kubernetes API Overview](https://kubernetes.io/docs/reference/using-api/api-overview)
- [Kubernetes Role-Based Access Control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Trivy: Vulnerability Scanner](https://github.com/aquasecurity/trivy)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Kubernetes Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/bf0751b4-47db-4be2-abf1-15d30593659f)**
>
> Watch video content
