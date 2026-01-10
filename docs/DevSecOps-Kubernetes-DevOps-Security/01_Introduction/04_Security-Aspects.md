# Security Aspects - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Introduction/Security-Aspects)

---

## Table of Contents

- Security Aspects
  - Shifting Security Left in the SDLC
  - Security Controls by CI/CD Pipeline Stage
  - Kubernetes-Specific Security Considerations
  - References
  - Watch Video
    - 1. Developer Workstation
    - 2. Source Code Management
    - 3. Testing Phase
    - 4. Build Phase
    - 5. Deployment & Staging
    - 6. Pre-Production Security
    - 7. Runtime Monitoring

---

## Content

DevSecOps - Kubernetes DevOps & Security

Introduction

# Security Aspects

Integrating security throughout your software development lifecycle (SDLC) dramatically reduces risk and speeds up delivery. In this guide, we’ll cover how to shift security left, embed controls into every CI/CD stage, and harden your Kubernetes environments.

## Shifting Security Left in the SDLC

Embedding security practices early—often called “shifting left”—ensures vulnerabilities are detected and remediated before they reach production. Key checkpoints include:

- Configuration governance to prevent sensitive data leaks in source control
- Static code analysis for code smells, coverage gaps, and quality issues
- Dependency scanning to detect vulnerable libraries
- Dynamic application security testing (DAST)\[^1\] against API interfaces
- Container image scanning for misconfigurations or root-run containers
- Runtime security to monitor clusters and applications for anomalies and new CVEs\[^2\]

> [!important]
> **Note**
>
> Early remediation reduces both cost and time to fix defects—build security gates into pull requests and CI pipelines.

## Security Controls by CI/CD Pipeline Stage

Below is a high-level overview of each pipeline stage, the associated security controls, and example tools.

| Pipeline Stage         | Security Control                                 | Example Tools                                   |
| ---------------------- | ------------------------------------------------ | ----------------------------------------------- |
| Developer Workstation  | Pre-commit/pre-push hooks                        | `pre-commit`, `husky`                           |
| Source Code Management | Secrets management & branch protection           | \\[HashiCorp Vault\\], GitHub Branch Protection |
| Testing Phase          | Unit tests, mutation tests, static code analysis | `pytest`, `MutPy`, SonarQube                    |
| Build Phase            | Dependency scanning & container image checks     | OWASP Dependency-Check, Trivy                   |
| Deployment & Staging   | Image signature verification & integration tests | cosign, Snyk Container                          |
| Pre-Production         | DAST\\[^1\\] & infrastructure compliance scans   | OWASP ZAP, Kube-Bench                           |
| Runtime Monitoring     | Log aggregation, anomaly detection, alerts       | ELK Stack, Falco                                |

> [!important]
> **Note**
>
> Automate security checks in CI pipelines to enforce consistency and reduce manual overhead.

### 1\. Developer Workstation

- **Pre-commit/pre-push hooks**: Block commits that contain secrets or policy violations using tools like `pre-commit` and `husky`.
- Automatically deny pushes when checks fail.

### 2\. Source Code Management

- **Secrets management**: Centralize credentials in \[HashiCorp Vault\] rather than environment variables or plaintext files.
- Enforce branch protection rules and mandatory pull-request reviews.

### 3\. Testing Phase

- **Unit tests**: Validate individual functions and modules.
- **Mutation tests**: Ensure test suites catch intentional code changes.
- **Static code analysis**: Use SonarQube or similar to measure coverage, find duplication, and flag code smells.

### 4\. Build Phase

- **Dependency scanning**: Run OWASP Dependency-Check or Trivy to spot vulnerable packages.
- **Container image checks**:
  - Scan base images and layers for CVEs
  - Lint Dockerfiles to enforce security best practices
  - Sign images for provenance with tools like cosign

### 5\. Deployment & Staging

- **Image signature verification**: Validate provenance before deployment.
- **Integration tests**: Ensure inter-service workflows operate as expected.

### 6\. Pre-Production Security

- **Dynamic Application Security Testing (DAST)\[^1\]**: Simulate runtime attacks on APIs and web interfaces.
- **Infrastructure compliance scans**: Validate clusters against security benchmarks using Kube-Bench.

> [!important]
> **Warning**
>
> DAST can be intrusive—run it in isolated environments to avoid service disruptions.

### 7\. Runtime Monitoring

- **Log aggregation**: Centralize logs from applications and infrastructure.
- **Anomaly detection**: Use Falco or similar to watch for unusual activity or zero-day CVEs\[^2\].
- **Alerts & incident response**: Integrate with your SOC and incident-response workflow to automate notifications.

## Kubernetes-Specific Security Considerations

When running workloads on \[Kubernetes\], bolster your defenses with:

- Role-Based Access Control (RBAC) policies
- SELinux or AppArmor profiles
- NetworkPolicies for pod isolation
- Mutual TLS for service-to-service authentication
- Audit logging for all cluster activity

By weaving these controls into your pipeline and runtime environment, you’ll maintain a robust, continuously secure delivery process.

---

## References

\[^1\]: Dynamic application security testing (DAST) - https://en.wikipedia.org/wiki/Dynamic\_application\_security\_testing  
\[^2\]: Common Vulnerabilities and Exposures (CVE) - https://cve.mitre.org/  
\[HashiCorp Vault\]: https://www.vaultproject.io/  
\[Kubernetes\]: https://kubernetes.io/

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/1cf25997-ddee-4b54-99f0-913974b58f7c/lesson/0face3dd-62af-4318-a447-80f243ad4313)**
>
> Watch video content
