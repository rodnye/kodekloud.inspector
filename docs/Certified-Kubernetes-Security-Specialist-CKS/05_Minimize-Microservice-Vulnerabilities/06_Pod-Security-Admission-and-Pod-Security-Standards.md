# Pod Security Admission and Pod Security Standards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Pod-Security-Admission-and-Pod-Security-Standards)

---

## Table of Contents

- Pod Security Admission and Pod Security Standards
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Pod Security Admission and Pod Security Standards

In this article, we explore Pod Security Admission (PSA) and Pod Security Standards as defined in Kubernetes Enhancement Proposal KEP-2579. PSA is designed to replace Pod Security Policies (PSP) with a solution that is safe to enable on new clusters, easy to use, and highly extensible. This approach meets several key requirements outlined in the proposal.

![The image lists pod security requirements, including validation, safety, built-in controller, Windows support, API responsiveness, ease of use, and extensibility, related to KEP 2579 PSP Replacement.](https://kodekloud.com/kk-media/image/upload/v1752871666/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Pod-Security-Admission-and-Pod-Security-Standards/frame_20.jpg)

The new implementation prioritizes simplicity and safety. Advanced or custom configurations can still be managed by third-party solutions such as KRAIL, Kyverno, or OPA Gatekeeper.

PSA operates as an Admission Controller and is enabled by default in Kubernetes clusters. To verify its activation, run the following command to display the enabled admission plugins in the kube-apiserver:

```
kubectl exec -n kube-system kube-apiserver-controlplane -it -- kube-apiserver -h | grep enable-admission-plugins
```

Since PSA is active by default, no extra steps are required to enroll it. Simply run the above command within the kube-apiserver pod and search for entries related to pod security to confirm its configuration.

PSA is applied at the namespace level by using specific labels. For example, to enforce Pod Security Standards on a namespace named "payroll", add the appropriate pod security settings to that namespace by specifying a mode and a security policy.

> [!important]
> **Available Pod Security Profiles**
>
> There are three built-in profiles provided by the Pod Security Standards:
>
> - **Privileged**: Offers nearly no restrictions, allowing extensive permissions and potential privilege escalation.
> - **Baseline**: Balances security and functionality by preventing unauthorized privilege escalation while supporting most containerized applications.
> - **Restricted**: Implements strict security measures based on pod hardening best practices, ensuring high security at the cost of potential compatibility challenges.

A mode determines the action taken when a policy violation occurs. The available modes are:

- **enforce**: Rejects pod creation requests that do not comply with the specified policy.
- **audit**: Allows pod creation but logs the policy violation in the audit logs.
- **warn**: Permits pod creation and issues a warning to the user regarding the policy violation.

![The image explains configuring PSA with modes (enforce, audit, warn) and profiles (Privileged, Baseline, Restricted), detailing actions on violations and policy descriptions.](https://kodekloud.com/kk-media/image/upload/v1752871667/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Pod-Security-Admission-and-Pod-Security-Standards/frame_160.jpg)

For instance, if you label a namespace to "enforce" the restricted policy, any pod that fails to meet the strict criteria will be refused. Conversely, setting the mode to "warn" under the restricted profile will allow pod deployment but alert the user with a warning.

The baseline profile is optimized for most containerized applications by preventing unauthorized elevated access. For further details on the restrictions applied by this profile, refer to the [Kubernetes Pod Security Standards documentation](https://kubernetes.io/docs/concepts/security/pod-security-standards/).

![The image shows a "Baseline Profile" for Kubernetes security, detailing policies and restrictions for host processes, namespaces, privileged containers, and more.](https://kodekloud.com/kk-media/image/upload/v1752871669/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Pod-Security-Admission-and-Pod-Security-Standards/frame_230.jpg)

In contrast, the restricted profile applies the latest security best practices. Although this may lead to compatibility challenges, it ensures a robust security posture.

![The image outlines Kubernetes pod security standards for a "Restricted Profile," detailing policies on volume types, privilege escalation, non-root user requirements, and capabilities.](https://kodekloud.com/kk-media/image/upload/v1752871670/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Pod-Security-Admission-and-Pod-Security-Standards/frame_250.jpg)

In our example setup, we demonstrate different security configurations across namespaces:

| Namespace | Mode    | Profile    | Description                                                             |
| --------- | ------- | ---------- | ----------------------------------------------------------------------- |
| payroll   | enforce | restricted | Pods must strictly adhere to the restricted policy.                     |
| hr        | enforce | baseline   | Pods are expected to follow baseline security practices.                |
| dev       | warn    | restricted | Pods receive warnings if they do not comply with the restricted policy. |

The commands to label the respective namespaces are as follows:

```
kubectl label ns payroll pod-security.kubernetes.io/enforce=restricted
kubectl label ns hr pod-security.kubernetes.io/enforce=baseline
kubectl label ns dev pod-security.kubernetes.io/warn=restricted
```

This configuration ensures that pods within the "payroll" namespace are strictly enforced under the restricted policy, pods in the "hr" namespace adhere to baseline security practices, and pods in the "dev" namespace trigger warnings for violations under the restricted policy.

> [!important]
> **Next Steps**
>
> We encourage you to experiment with Pod Security Admission and Pod Security Standards to better understand how they enhance security in Kubernetes clusters. For additional information, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/f83417e1-f0a2-4aa2-a2a0-348f72a0271d)**
>
> Watch video content
