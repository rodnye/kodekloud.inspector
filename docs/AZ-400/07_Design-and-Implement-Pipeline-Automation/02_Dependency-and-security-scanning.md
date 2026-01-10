# Dependency and security scanning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipeline-Automation/Dependency-and-security-scanning)

---

## Table of Contents

- Dependency and security scanning
  - Dependency Scanning Tools
  - Setting Up Dependency Scanning in Azure Pipelines
  - Security Scanning Tools
  - Implementing a Security Scanner in Azure Pipelines
  - Example: SonarQube Integration
  - Watch Video
    - WhiteSource Bolt
    - Snyk
    - OWASP Dependency Check
    - SonarQube
    - Aqua Security
    - Fortify

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipeline Automation

# Dependency and security scanning

In modern DevOps, continuously checking for outdated or vulnerable components is essential. Dependency scanning inspects your code’s libraries, frameworks, and packages against live vulnerability databases. Security scanning extends this coverage to source code flaws and infrastructure misconfigurations. Together, they form a critical part of any secure CI/CD workflow—and feature prominently on the [AZ-400 exam](https://learn.microsoft.com/en-us/certifications/exams/az-400/).

![The image is an introduction to dependency scanning in Azure Pipelines, showing a computer screen with code and a label indicating "Dependency scanning." It highlights the identification of outdated or vulnerable libraries and dependencies in code.](https://kodekloud.com/kk-media/image/upload/v1752867742/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/azure-pipelines-dependency-scanning-introduction.jpg)

By integrating specialized tools into Azure Pipelines, you automate these checks during build and release stages. This “shift-left” approach catches issues early, reduces manual effort, and delivers rapid feedback to developers.

![The image is a diagram illustrating the process of dependency scanning in Azure Pipelines, showing integration with tools and automation of processes to ensure secure, up-to-date components.](https://kodekloud.com/kk-media/image/upload/v1752867742/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/azure-pipelines-dependency-scanning-diagram.jpg)

---

## Dependency Scanning Tools

Azure Pipelines offers a range of extensions and tasks for open-source and commercial scanners. Below is a quick comparison:

| Tool                   | Database Type          | Integration         | Key Output                      |
| ---------------------- | ---------------------- | ------------------- | ------------------------------- |
| WhiteSource Bolt       | Proprietary OSS DB     | Extension / Task    | Severity reports & remediation  |
| Snyk                   | Community & Commercial | Task + Policy Check | Fix suggestions & policy alerts |
| OWASP Dependency Check | NVD & Community        | CLI task            | CVE-based findings & CSV/HTML   |

### WhiteSource Bolt

Automated open-source vulnerability analysis with continuous database updates. Generates severity-ranked reports, displays affected components, and recommends fixes. Integrates as a build or release task in Azure Pipelines.

![The image is an infographic about "WhiteSource Bolt," a tool for dependency scanning that detects open-source vulnerabilities and generates comprehensive reports.](https://kodekloud.com/kk-media/image/upload/v1752867743/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/whitesource-bolt-dependency-scanning-infographic.jpg)

### Snyk

Real-time monitoring of dependencies for known vulnerabilities. Provides actionable remediation advice—package updates, code patches, or workarounds. Embeds into your pipeline to enforce policy-based blocking of risky dependencies.

![The image is about "Tools for Dependency Scanning" and features the logo of Snyk, which provides insights to fix or mitigate vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752867744/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/tools-for-dependency-scanning-snyk-logo.jpg)

### OWASP Dependency Check

Open-source scanner that compares project libraries against the National Vulnerability Database (NVD) and community feeds. Integrates via CLI or pipeline task to automate periodic scans and produce standardized reports.

![The image is about "OWASP Dependency Check," a tool for detecting public vulnerabilities in dependencies, as part of tools for dependency scanning.](https://kodekloud.com/kk-media/image/upload/v1752867745/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/owasp-dependency-check-vulnerability-scanning.jpg)

---

## Setting Up Dependency Scanning in Azure Pipelines

1.  Select the scanner that best fits your tech stack and reporting needs.
2.  Install or add the extension/task to your pipeline YAML or Classic editor.
3.  Configure authentication and project settings (API tokens, project keys).
4.  Schedule scans on every build, nightly run, or on-demand.
5.  Review findings and automate work items for high-severity issues.

> [!important]
> **Note**
>
> Automate recurring scans—even if dependencies haven’t changed—to catch newly disclosed vulnerabilities.

![The image is a flowchart outlining steps for setting up dependency scanning in Azure Pipelines, including selecting a tool, configuring it, scheduling scans, and reviewing findings.](https://kodekloud.com/kk-media/image/upload/v1752867746/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/azure-pipelines-dependency-scanning-flowchart.jpg)

---

Security scanning targets code and infrastructure weaknesses—identifying injection flaws, insecure configurations, and runtime threats before deployment.

- Code analysis for SQL injection, cross-site scripting (XSS), insecure patterns
- Infrastructure audits of cloud resources, container images, IaC templates

![The image is an introduction to security scanning, illustrating the detection of security flaws in codebases and infrastructure. It shows a flowchart with icons representing these concepts.](https://kodekloud.com/kk-media/image/upload/v1752867747/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/security-scanning-flowchart-detection-icons.jpg)

Embedding security scans in your CI/CD pipeline delivers continuous feedback. Pipelines can block a release on critical findings or generate alerts for remediation.

![The image is an introduction to security scanning, highlighting two key aspects: facilitating early detection and resolution of security issues.](https://kodekloud.com/kk-media/image/upload/v1752867748/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/security-scanning-introduction-detection-resolution.jpg)

---

## Security Scanning Tools

| Tool          | Focus               | Scan Types            | Integration      |
| ------------- | ------------------- | --------------------- | ---------------- |
| SonarQube     | Code Quality & SAST | Vulnerabilities, Debt | Marketplace Task |
| Aqua Security | Container & Runtime | Image & Config scans  | CLI / Task       |
| Fortify       | SAST & DAST         | Static & Dynamic      | REST API / Task  |

![The image lists three tools for security scanning: SonarQube, Aqua Security, and Fortify, each with their respective logos.](https://kodekloud.com/kk-media/image/upload/v1752867749/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/security-scanning-tools-sonarqube-aqua-fortify.jpg)

### SonarQube

Analyzes code for security vulnerabilities (e.g., XSS, SQL injection), code smells, duplication, and complexity. Quality gates enforce blocking builds until issues are resolved.

![The image is a diagram showing SonarQube's process of analyzing source code to identify security vulnerabilities, code quality, and technical debt issues.](https://kodekloud.com/kk-media/image/upload/v1752867751/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/sonarqube-source-code-analysis-diagram.jpg)

### Aqua Security

Specializes in container image security—scanning during build, pre-push, and at runtime for vulnerabilities, malware, and misconfigurations. Ideal for AKS and Kubernetes pipelines.

![The image is a slide about Aqua Security, featuring a logo and a description stating it specializes in container security to ensure images are free of vulnerabilities before deployment.](https://kodekloud.com/kk-media/image/upload/v1752867752/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/aqua-security-container-vulnerabilities-slide.jpg)

### Fortify

Combines static application security testing (SAST) with dynamic analysis (DAST). Static scanning finds code-level flaws; dynamic scanning probes a running application for runtime issues.

![The image is a diagram showing two types of testing, static and dynamic, both leading to the identification of security flaws.](https://kodekloud.com/kk-media/image/upload/v1752867753/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/static-dynamic-testing-security-flaws-diagram.jpg)

---

## Implementing a Security Scanner in Azure Pipelines

1.  Choose a scanner based on supported languages and vulnerability focus.
2.  Add the respective task or script to your YAML pipeline.
3.  Configure credentials, endpoints, and thresholds.
4.  Run the pipeline, analyze scan output, and triage issues.
5.  Automate periodic scans and keep scanner definitions up to date.

![The image outlines four steps to implement a security scanning tool, including selecting a scanner, integrating it into Azure Pipelines, testing, and establishing guidelines for regular updates.](https://kodekloud.com/kk-media/image/upload/v1752867754/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/security-scanning-tool-implementation-steps.jpg)

---

## Example: SonarQube Integration

1.  Select your SonarQube edition (Community or Developer).
2.  Provision and configure the SonarQube server.
3.  In Azure DevOps, install the **SonarQube** extension.
4.  In your pipeline YAML:

    ```
    - task: SonarQubePrepare@5
      inputs:
        SonarQube: 'YourServiceConnection'
        scannerMode: 'CLI'
        configMode: 'manual'
        cliProjectKey: 'my-project'
        cliSources: '.'
    - task: SonarQubeAnalyze@5
    - task: SonarQubePublish@5
    ```

5.  Define quality gates in the SonarQube dashboard to fail on critical issues.

---

Continuous dependency and security scanning is a DevSecOps imperative. Automate both open-source component checks and code/infrastructure vulnerability scans to:

- Catch issues earlier and reduce remediation costs
- Enforce policy gates to prevent insecure releases
- Maintain an audit trail of findings and fixes

By mastering these tools and patterns, you’ll be well-equipped for the AZ-400 exam and for designing robust, secure CI/CD pipelines in Azure DevOps.

![The image contains a slide titled "Conclusion and Best Practices," highlighting the importance of dependency and security scanning for software integrity, and the need for continuous updates to address evolving security threats.](https://kodekloud.com/kk-media/image/upload/v1752867755/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Dependency-and-security-scanning/conclusion-best-practices-security-scanning.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/f114915a-674b-4c1a-a7f2-7a5444db938b/lesson/3d391197-a20c-4b48-bc9e-d8d67636b441)**
>
> Watch video content
