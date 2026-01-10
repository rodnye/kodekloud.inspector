# Evaluating Tools for Package Security and License Compliance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Implement-Security-and-Validate-Code-Bases-for-Compliance/Evaluating-Tools-for-Package-Security-and-License-Compliance)

---

## Table of Contents

- Evaluating Tools for Package Security and License Compliance
  - Two Complementary Strategies
  - Key Tooling Solutions
  - Links and References
  - Watch Video
    - Artifactory
    - SonarQube
    - Mend Bolt

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Implement Security and Validate Code Bases for Compliance

# Evaluating Tools for Package Security and License Compliance

Ensuring that every software package in your CI/CD pipeline is free from vulnerabilities and compliant with licensing terms is a cornerstone of a robust DevOps security strategy. In this guide, we’ll cover two complementary approaches and highlight leading tools to help you secure your software supply chain.

## Two Complementary Strategies

1.  **Centralized Artifact Repository Scanning**  
    All build artifacts are published to a single repository (e.g., Artifactory or Nexus), where they automatically undergo security and license compliance checks before release.
2.  **Build-Phase Tooling Integration**  
    Security and license scans are embedded into each build job, enforcing compliance gates at build time and preventing non-compliant artifacts from ever reaching the repository.

> [!important]
> **Note**
>
> Combining both repository-based scans and build-phase tooling ensures maximum coverage and early detection of issues.

| Strategy                             | Description                                             | Benefits                                    |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------- |
| Centralized Artifact Repository Scan | Artifacts are scanned post-build in a central registry. | Consistent policy enforcement, audit trails |
| Build-Phase Tooling Integration      | Scans occur during the build process (CI job).          | Immediate feedback, prevents bad artifacts  |

![The image outlines two strategies for evaluating tools for package security and license compliance: implementing scanning within a centralized artifact repository and integrating tooling within the build phase of the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752868007/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Evaluating-Tools-for-Package-Security-and-License-Compliance/package-security-license-compliance-strategies.jpg)

## Key Tooling Solutions

Below is an overview of popular tools aligned to these strategies, each playing a distinct role in a comprehensive DevOps security workflow:

![The image is a table listing tools for package security and license compliance, with "Artifactory," "SonarQube," and "Mend Bolt" categorized as "Artifact Repository," "Code Quality Assessment," and "Build Process Scanning," respectively.](https://kodekloud.com/kk-media/image/upload/v1752868008/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Evaluating-Tools-for-Package-Security-and-License-Compliance/package-security-tools-table.jpg)

| Tool        | Category               | Primary Function                                             |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| Artifactory | Artifact Repository    | Stores binaries and dependencies; integrates with scanners   |
| SonarQube   | Static Code Analysis   | Detects code smells, security vulnerabilities, and standards |
| Mend Bolt   | Build Process Scanning | Enforces open-source vulnerability and license policies      |

### Artifactory

A universal repository manager that securely stores build artifacts, metadata, and container images. Integrates with security and license scanners to validate every component before release.  
[Learn more ›](https://jfrog.com/artifactory/)

### SonarQube

Performs deep static analysis on your source code to catch security issues, code smells, and maintain code quality standards ahead of the packaging stage.  
[Learn more ›](https://www.sonarqube.org/)

### Mend Bolt

(formerly WhiteSource Bolt) A lightweight scanner that plugs into CI pipelines—GitHub Actions, Azure DevOps, Jenkins—to automatically detect open-source vulnerabilities and licensing risks with each build.  
[Learn more ›](https://www.mend.io/products/bolt/)

Each of these solutions helps enforce security and compliance controls as close to the source as possible, reducing risk and accelerating release velocity.

---

## Links and References

- [DevOps Security Best Practices](https://www.redhat.com/en/topics/devops/what-is-devops-security)
- [CI/CD Pipeline Tools Overview](https://www.atlassian.com/continuous-delivery/ci-vs-cd)
- [Artifact Repository Patterns](https://martinfowler.com/articles/microservices.html#RepositoryPattern)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/1bd9c8cc-efae-414c-b4be-838e767634f6/lesson/4968f8b8-cd2a-4af7-9b14-8336868d1be7)**
>
> Watch video content
