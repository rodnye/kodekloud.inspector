# Compromised Applications in Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Compromised-Applications-in-Containers)

---

## Table of Contents

- Compromised Applications in Containers
  - Attack Scenario
  - Credential and Secret Misuse
  - Escalation via the Kubernetes API
  - Best Practices for Prevention
  - Links and References
  - Watch Video
    - Compromised-Container Attack Tree

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Compromised Applications in Containers

Containers are designed to isolate applications, but a single compromised app can lead to full container takeover—and ultimately threaten your entire Kubernetes cluster. In this lesson, we explore how vulnerabilities and misconfigurations enable attackers to pivot from application-level flaws to cluster-wide breaches.

## Attack Scenario

An attacker exploits a vulnerability in your application or backend service to gain shell access inside a container. From this foothold, they move laterally to compromise other resources in the cluster.

### Compromised-Container Attack Tree

| Attack Vector        | Description                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Poisoned Images      | Inject malicious code into a container image and push the poisoned image to your registry.                                                       |
| Repository Breach    | Gain unauthorized access to your image repository, pull down images, and harvest secrets or vulnerabilities.                                     |
| Data Exfiltration    | Extract sensitive data—API tokens, database credentials, environment variables—or deploy ransomware against connected data stores.               |
| Privilege Escalation | Abuse service account tokens or other credentials to interact with the Kubernetes API: list secrets, modify ConfigMaps, or create new resources. |

![The image is a flowchart titled "Compromised Container Attack Tree," illustrating various attack vectors and methods for compromising container environments, such as pushing poisoned images, exfiltrating data, and performing ransomware attacks.](https://kodekloud.com/kk-media/image/upload/v1752880806/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Compromised-Applications-in-Containers/compromised-container-attack-tree-flowchart.jpg)

## Credential and Secret Misuse

Attackers often exploit misconfigured Kubernetes secrets and image-pull credentials:

- Pull-only secrets misconfigured for push  
  An image-pull secret accidentally granted push permissions lets attackers upload malicious images to your registry.

> [!important]
> **Warning**
>
> Misconfigured secrets can grant attackers both pull and push access to your container registry. Always follow the principle of least privilege.

- Extracting secrets from Kubernetes  
  By deploying a malicious pod that mounts existing secrets, attackers gain immediate access to environment variables and service tokens.
- Attaching to a running container  
  If RBAC allows, an attacker can execute a shell inside a live pod and inspect its environment:

  ```
  kubectl exec -it <pod-name> -- /bin/sh
  ```

  This command exposes all mounted secrets and tokens visible in the container’s filesystem and env vars.

## Escalation via the Kubernetes API

With a valid service account or user token in hand, attackers can abuse the Kubernetes API:

- List and read Secrets

  ```
  kubectl get secrets --all-namespaces
  ```

- Inspect or modify ConfigMaps, Pods, Deployments, and Services
- Create or delete resources to maintain persistence
- Potentially escalate to cluster-admin by exploiting overly permissive RBAC rules

By chaining these steps—container compromise, secret extraction, and API abuse—attackers move laterally across your cluster, accessing more sensitive data and resources.

## Best Practices for Prevention

| Practice                   | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| Use Minimal Base Images    | Reduce OS-level vulnerabilities with lightweight, well-maintained images (e.g., distroless). |
| Enforce Image Signing      | Scan and sign images using tools like Notary or Cosign before deployment.                    |
| Rotate Secrets Regularly   | Automate secret rotation and avoid long-lived credentials.                                   |
| Apply Least-Privilege RBAC | Grant each service account only the permissions it needs.                                    |
| Implement Network Policies | Segment pod communication and limit egress to the Kubernetes API server.                     |

> [!important]
> **Note**
>
> Regularly audit your cluster and registries to detect unauthorized changes. Consider tools like [Kube-bench](https://github.com/aquasecurity/kube-bench) and [Clair](https://github.com/quay/clair) for ongoing security assessments.

## Links and References

- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/)
- [Docker Image Security](https://docs.docker.com/engine/security/)
- [HashiCorp Vault](https://www.vaultproject.io/) for centralized secret management

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/bd3e3b3f-5777-4ee8-9fc5-6b068d199ca1)**
>
> Watch video content
