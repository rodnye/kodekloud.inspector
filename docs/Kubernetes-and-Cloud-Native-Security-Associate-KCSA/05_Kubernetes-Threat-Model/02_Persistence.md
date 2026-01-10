# Persistence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Threat-Model/Persistence)

---

## Table of Contents

- Persistence
  - Example Scenario
  - Attack Vectors for Persistence
  - Mitigations for Persistent Threats
  - References
  - Watch Video
    - 1. Foothold with No Resilience
    - 2. Foothold with Resilience to Container Restart
    - 3. Foothold with Resilience to Node Restart
    - 4. Foothold via Kubernetes API & PKI
    - 5. Leveraging Privileged Workloads
    - 1. Role-Based Access Control (RBAC)
    - 2. Secrets Management
    - 3. Pod Security Standards
    - 4. Regular Updates & Patching
    - 5. Monitoring & Auditing

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Threat Model

# Persistence

In this lesson, we explore how attackers establish persistence in Kubernetes clusters to maintain unauthorized access over time. Persistence enables an attacker to remain in a compromised environment despite reboots, upgrades, or resource rotations.

> [!important]
> **Note**
>
> Persistence in Kubernetes refers to an attacker’s ability to survive pod restarts, node reboots, or configuration changes by planting backdoors or manipulating resources.

![The image illustrates the concept of persistence in Kubernetes, showing an attacker gaining access to a system, with icons representing reboots, updates, and interruptions.](https://kodekloud.com/kk-media/image/upload/v1752880827/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/kubernetes-persistence-attacker-access-diagram.jpg)

Attackers typically leverage misconfigurations, stolen Kubernetes Secrets, or vulnerable container images to achieve persistence.

## Example Scenario

Consider a multi-tier web application running NGINX for the front end, Node.js for business logic, and MySQL as the data store. An initial breach may occur when a container vulnerability is exploited. Once inside, the attacker focuses on persistence to survive your cleanup efforts.

![The image is a diagram illustrating a scenario of gaining persistence in an application, featuring components like Nginx, Node.js, MySQL, and Kubernetes pods. It shows interactions between users, a host, and various application components.](https://kodekloud.com/kk-media/image/upload/v1752880828/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/persistence-scenario-nginx-nodejs-mysql-kubernetes.jpg)

## Attack Vectors for Persistence

The CNCF Financial Users Group defines the following key persistence vectors:

![The image is a flowchart titled "Attack Vectors for Persistence," detailing various methods to establish foothold and persistence in a system. It includes different paths and strategies for exploiting containers and Kubernetes resources.](https://kodekloud.com/kk-media/image/upload/v1752880829/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/attack-vectors-persistence-flowchart.jpg)

| Vector ID | Name                                          | Description                                                           |
| --------- | --------------------------------------------- | --------------------------------------------------------------------- |
| 1         | Foothold with No Resilience                   | Transient access inside a container; lost on pod restart or delete.   |
| 2         | Foothold with Resilience to Container Restart | Changes on mounted volumes or configs survive container restarts.     |
| 3         | Foothold with Resilience to Node Restart      | Host-level scripts or always-restart containers survive node reboots. |
| 4         | Foothold via Kubernetes API & PKI             | Compromise service account tokens or certificates to control the API. |
| 5         | Leveraging Privileged Workloads               | Abuse `privileged` pods or `hostPath` mounts to access the node.      |

### 1\. Foothold with No Resilience

This initial compromise lives only as long as the container does.

- **Running a Malicious Process:** Execute a backdoor binary inside the pod.
- **Using Native Tools:** Leverage `apt`, `yum`, `pip`, or scripting runtimes (`python`, `node`) to fetch and run code.
- **Container Hopping:** Identify other pods with matching runtimes and pivot laterally.

### 2\. Foothold with Resilience to Container Restart

Persistence here relies on writable volumes or config files:

- **Volume-Backed Config Tweaks:** Edit configs (e.g., NGINX settings) stored on a `PersistentVolumeClaim`.
- **Forcing a Restart:** Trigger a pod restart (`kubectl rollout restart deployment/nginx`) to pick up malicious changes.

### 3\. Foothold with Resilience to Node Restart

Attackers move outside the pod sandbox:

- **Always-Restart Containers:** Launch a Docker container on the host with `--restart=always`.
- **Init Scripts & Cron Jobs:** Append malicious commands to `/etc/rc.local` or create entries in `/etc/cron.d/`.
- **Host File System Implants:** Drop binaries or scripts directly onto the host for execution.

> [!important]
> **Warning**
>
> Host-level persistence bypasses Kubernetes controls. Monitor for unexpected containers on nodes and unauthorized changes to init files or cron entries.

### 4\. Foothold via Kubernetes API & PKI

Compromising API credentials grants cluster-wide power:

- **Service Account Token Theft:** Steal or mount tokens from `/var/run/secrets/kubernetes.io/serviceaccount`.
- **Certificate Forgery:** Extract or fabricate client certificates to impersonate admins.

### 5\. Leveraging Privileged Workloads

Privileged pods break out of the container isolation:

- **Privileged Mode:** Pods with `securityContext.privileged: true` can manipulate the host.
- **HostPath Mounts:** Access and modify host directories like `/etc` or `/var/lib/kubelet`.

---

## Mitigations for Persistent Threats

Defending against persistence requires a layered approach:

### 1\. Role-Based Access Control (RBAC)

![The image illustrates a Kubernetes architecture for mitigating persistence risks using Role-Based Access Controls (RBAC), showing different namespaces (Frontend, Backend, Database) with pods and services like Node.js and MySQL.](https://kodekloud.com/kk-media/image/upload/v1752880830/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/kubernetes-architecture-rbac-namespaces.jpg)

- Grant the least privilege to service accounts.
- Regularly audit `ClusterRole` and `Role` bindings.

### 2\. Secrets Management

![The image is a diagram illustrating a Kubernetes setup for mitigating persistence risks by restricting access to secrets, featuring pods, a frontend, Node.js, and MySQL components.](https://kodekloud.com/kk-media/image/upload/v1752880831/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/kubernetes-setup-mitigating-risks-diagram.jpg)

- Store credentials in [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
- Restrict secrets to only the pods that require them.

### 3\. Pod Security Standards

![The image is about mitigating persistence risks by hardening pod security, featuring a "psp" icon and emphasizing preventing privileged containers and enforcing read-only root filesystems.](https://kodekloud.com/kk-media/image/upload/v1752880831/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/mitigating-persistence-risks-pod-security.jpg)

- Enforce Pod Security Admission (PSA) or Pod Security Policies (PSP).
- Disallow `privileged` containers and `hostPath` mounts.
- Set `readOnlyRootFilesystem: true` where possible.

### 4\. Regular Updates & Patching

![The image illustrates the concept of mitigating persistence risks through regular updates and patching, emphasizing a regular update schedule for container images to prevent exploitation.](https://kodekloud.com/kk-media/image/upload/v1752880832/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/mitigating-persistence-risks-updates-patching.jpg)

- Use image scanning tools to detect vulnerabilities.
- Automate rolling updates for base images:

```
kubectl set image deployment/nginx nginx=nginx:1.21.6
```

### 5\. Monitoring & Auditing

![The image is about mitigating persistence risks through monitoring and auditing, highlighting the need to monitor for suspicious activities and regularly audit Kubernetes events.](https://kodekloud.com/kk-media/image/upload/v1752880833/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/mitigating-persistence-risks-kubernetes-auditing.jpg)

- Centralize logs (e.g., using Elasticsearch, Fluentd, Kibana).
- Alert on unexpected pod restarts, new privileged pods, or RBAC changes.
- Periodically review the audit log via `kubectl logs -n kube-system`.

---

Persistent threats allow attackers to survive cleanup, exfiltrate data, and hijack resources. Key defenses include:

![The image is a summary slide highlighting three key points about security: persistence in clusters, attackers leveraging secrets and misconfigurations, and restricting RBAC permissions to prevent unauthorized access.](https://kodekloud.com/kk-media/image/upload/v1752880834/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Persistence/security-summary-cluster-rbac.jpg)

- Enforce strict RBAC and Pod Security Standards
- Secure and rotate Secrets regularly
- Keep images and nodes up to date
- Monitor, audit, and alert on suspicious actions

## References

- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)
- [CNCF Security Special Interest Group](https://github.com/cncf/sig-security)
- [Kubernetes Audit Logging](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/6da25ade-b162-485c-b9b9-f351990e99c2/lesson/61619f9b-7287-4350-899e-420438b33f9a)**
>
> Watch video content
