# DevOps vs DevSecOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Introduction/DevOps-vs-DevSecOps)

---

## Table of Contents

- DevOps vs DevSecOps
  - What Is DevOps?
  - The Standard DevOps Pipeline
  - Introducing DevSecOps
  - Key Benefits of DevSecOps
  - Security Toolchain Overview
  - Best Practices for a Robust DevSecOps Pipeline
  - Links and References
  - Watch Video
    - The Cost of Late-Stage Security
    - Shift-Left Security in Action

---

## Content

DevSecOps - Kubernetes DevOps & Security

Introduction

# DevOps vs DevSecOps

In this article, we compare traditional DevOps with DevSecOps and show how embedding security into your CI/CD pipeline can cut risks, reduce costs, and speed up delivery.

## What Is DevOps?

DevOps unifies development, testing, and operations to enable rapid, continuous software delivery. Core DevOps practices include:

- Automated provisioning
- Continuous integration (CI)
- Continuous delivery/deployment (CD)
- Test-driven development (TDD)
- Continuous monitoring

Despite these efficiencies, security is often treated as a final step—introduced only after development and testing are complete. This late-stage approach can leave critical vulnerabilities unaddressed until production.

## The Standard DevOps Pipeline

A typical DevOps workflow covers these stages:

| Stage                     | Description                                                 | Common Tools        |
| ------------------------- | ----------------------------------------------------------- | ------------------- |
| Code Commit               | Developers push code to a central repository                | Git                 |
| Build & Unit Test         | CI server builds artifacts and runs unit tests              | Jenkins, Travis CI  |
| Integration & E2E Testing | Deploy to staging; execute integration and end-to-end tests | Docker, Kubernetes  |
| Production Deployment     | Promote containers to production                            | Docker, Kubernetes  |
| Monitoring & Logging      | Track uptime, performance, and application logs             | Prometheus, Grafana |

> [!important]
> **Note**
>
> Security scans often happen only after production deployment, leading to late discovery of critical issues.

### The Cost of Late-Stage Security

Consider discovering an SQL injection in production:

- You must patch code, rebuild, retest, and redeploy.
- This repeats the entire CI/CD pipeline, consuming extra CPU, memory, storage, and network resources.
- It delays feature delivery and elevates business risk if exploitation occurs before the patch is live.

## Introducing DevSecOps

DevSecOps “shifts security left” by integrating automated security checks into each phase of the pipeline—rather than as a post-deployment step.

![The image compares DevOps and DevSecOps using diagrams. DevOps focuses on development and operations, while DevSecOps integrates security into the process.](https://kodekloud.com/kk-media/image/upload/v1752873733/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-DevOps-vs-DevSecOps/devops-devsecops-comparison-diagrams.jpg)

### Shift-Left Security in Action

- **Static Application Security Testing (SAST):** Scans source code for vulnerabilities during the build.
- **Dependency Scanning (SCA):** Detects known vulnerabilities in third-party libraries.
- **Configuration Validation:** Ensures infrastructure as code (IaC) follows security best practices.
- **Container & Runtime Security:** Monitors container behavior and flags anomalies.

By automating these steps alongside unit tests and linting, only secure builds advance to staging and production.

![The image illustrates a typical DevOps process flow, showing stages from development to security, with timelines and associated costs, risks, and deployment speeds. It highlights the use of tools like Jenkins and emphasizes the importance of security in the process.](https://kodekloud.com/kk-media/image/upload/v1752873734/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-DevOps-vs-DevSecOps/devops-process-flow-development-security-tools.jpg)

## Key Benefits of DevSecOps

1.  **Lower Costs**  
    Early detection means fewer rebuilds and redeployments.
2.  **Faster Delivery**  
    Security tests run in parallel with CI/CD steps, eliminating late-stage bottlenecks.
3.  **Reduced Risk**  
    Proactive vulnerability scanning prevents exploitable bugs from reaching production.
4.  **Efficient Resource Usage**  
    Blocking insecure builds saves CPU, memory, storage, and network overhead.

## Security Toolchain Overview

| Security Phase      | Tool Category      | Example Tools                |
| ------------------- | ------------------ | ---------------------------- |
| Code Analysis       | SAST               | SonarQube, Checkmarx         |
| Dependency Scanning | SCA                | OWASP Dependency-Check, Snyk |
| IaC Configuration   | IaC Security       | Terraform Sentinel, Checkov  |
| Container & Runtime | Container Security | Aqua Security, Falco         |

> [!important]
> **Note**
>
> Integrate security tools into pull requests and pipeline stages to ensure automated, consistent checks.

## Best Practices for a Robust DevSecOps Pipeline

- Embed security tests into every Git workflow (pre-commit, PR validation).
- Use policy-as-code to enforce security standards automatically.
- Centralize vulnerability reporting in dashboards for rapid triage.
- Continuously update security rules, signatures, and scanners.

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OWASP Static Application Security Testing](https://owasp.org/www-community/Static_Application_Security_Testing)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/1cf25997-ddee-4b54-99f0-913974b58f7c/lesson/42fd39eb-e132-41d9-877f-74fa0276e945)**
>
> Watch video content
