# Pod Security Standards Pod Security Admissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Pod-Security-Standards-Pod-Security-Admissions)

---

## Table of Contents

- Pod Security Standards Pod Security Admissions
  - Pod Security Admission Overview
  - Pod Security Standards: Built-in Profiles
  - Pod Security Admission Modes
  - Profile Details
  - Applying Profiles to Namespaces
  - References
  - Watch Video
    - Baseline Profile
    - Restricted Profile
    - Privileged Profile

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Pod Security Standards Pod Security Admissions

In this lesson, we’ll dive into [Pod Security Admission (PSA)](https://kubernetes.io/docs/concepts/security/pod-security-admission/) and [Pod Security Standards (PSS)](https://kubernetes.io/docs/concepts/security/pod-security-standards/). Introduced via [KEP 2579](https://github.com/kubernetes/enhancements/tree/master/keps/sig-auth/2579-psp-migration), PSA replaces Pod Security Policies (PSP) with a safer, simpler, and extensible solution. For advanced checks, you can integrate external tools like [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/).

![The image lists the "Pod Security Requirements" for Kubernetes, including points like validation, safety in clusters, built-in controller, Windows support, API responsiveness, ease of use, and extensibility. It also references KEP 2579 for PSP replacement.](https://kodekloud.com/kk-media/image/upload/v1752880794/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Pod-Security-Standards-Pod-Security-Admissions/pod-security-requirements-kubernetes.jpg)

## Pod Security Admission Overview

PSA is an **Admission Controller** enabled by default in Kubernetes.  
Verify it by inspecting the API server’s enabled plugins:

```
kubectl exec -n kube-system kube-apiserver-controlplane -it -- \
  kube-apiserver -h | grep enable-admission-plugins
```

You should see `PodSecurity` listed.

Configure PSA at the **namespace level** by adding labels:

```
kubectl label namespace <NAMESPACE> pod-security.kubernetes.io/<mode>=<profile>
```

> [!important]
> **Note**
>
> PSA modes (`enforce`, `audit`, `warn`) and profiles (`privileged`, `baseline`, `restricted`) can be combined to meet your security requirements.

## Pod Security Standards: Built-in Profiles

PSA offers three out-of-the-box profiles:

| Profile    | Description                                         | Use Case                          |
| ---------- | --------------------------------------------------- | --------------------------------- |
| privileged | Unrestricted; allows all capabilities               | Debugging, system-level tooling   |
| baseline   | Minimal restrictions; prevents privilege escalation | Most standard applications        |
| restricted | Strict hardening; follows best practices            | High-security or compliance needs |

![The image is a slide titled "Configure PSA" showing tables that describe modes and profiles for security standards, including actions on violation and policy descriptions.](https://kodekloud.com/kk-media/image/upload/v1752880795/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Pod-Security-Standards-Pod-Security-Admissions/configure-psa-security-standards.jpg)

## Pod Security Admission Modes

A mode controls PSA’s response to policy violations:

| Mode    | Action on Violation                         |
| ------- | ------------------------------------------- |
| enforce | Rejects non-compliant pod creation requests |
| audit   | Logs an audit event; allows the pod         |
| warn    | Emits a user-facing warning; allows the pod |

You can combine modes and profiles, for example:

- `warn+restricted` — pods are allowed, violations generate warnings
- `enforce+restricted` — non-compliant pods are blocked

## Profile Details

### Baseline Profile

Designed for ease of adoption, the baseline profile prevents unauthorized privilege escalation while maintaining compatibility.

![The image shows a document titled "Baseline Profile" detailing Kubernetes security policies, including restricted fields and allowed values for various configurations. It includes sections on host processes, namespaces, privileged containers, capabilities, host path volumes, host ports, and AppArmor.](https://kodekloud.com/kk-media/image/upload/v1752880796/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Pod-Security-Standards-Pod-Security-Admissions/kubernetes-security-policies-baseline-profile.jpg)

### Restricted Profile

Enforces the latest pod-hardening best practices. Be aware that compatibility issues may arise.

![The image shows a slide titled "Restricted Profile" with text detailing Kubernetes security policies, including volume types, privilege escalation, and capabilities. It includes a link to Kubernetes documentation on pod security standards.](https://kodekloud.com/kk-media/image/upload/v1752880797/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Pod-Security-Standards-Pod-Security-Admissions/restricted-profile-kubernetes-security.jpg)

> [!important]
> **Warning**
>
> The restricted profile may require you to update container images or init scripts to comply with stricter defaults.

### Privileged Profile

Applies no restrictions; all capabilities are allowed. Use with caution.

## Applying Profiles to Namespaces

Label your namespaces to enforce specific profiles and modes:

```
kubectl label namespace payroll pod-security.kubernetes.io/enforce=restricted
kubectl label namespace hr      pod-security.kubernetes.io/enforce=baseline
kubectl label namespace dev     pod-security.kubernetes.io/warn=restricted
```

- In **payroll**: any pod violating the restricted policy is **rejected**.
- In **hr**: only pods meeting the baseline policy are **allowed**.
- In **dev**: all pods are created, but restricted violations **generate warnings**.

---

## References

- [Kubernetes Documentation: Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)
- [Kubernetes Documentation: Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/)
- [KEP 2579: PSP Migration](https://github.com/kubernetes/enhancements/tree/master/keps/sig-auth/2579-psp-migration)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/2adaacf7-51b1-4675-ba47-5b5818cbd2e3)**
>
> Watch video content
