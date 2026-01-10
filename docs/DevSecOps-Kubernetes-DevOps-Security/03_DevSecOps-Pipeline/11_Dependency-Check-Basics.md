# Dependency Check Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Dependency-Check-Basics)

---

## Table of Contents

- Dependency Check Basics
  - Why Dependency Management Matters
  - What Is OWASP Dependency-Check?
  - Sample HTML Report
  - Integrating Dependency-Check with Jenkins
  - Links and References
  - Watch Video
    - Core Features

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Dependency Check Basics

In this lesson, we’ll explore OWASP Dependency-Check—an open-source Software Composition Analysis (SCA) tool—to detect and manage security vulnerabilities in your project’s open-source dependencies.

## Why Dependency Management Matters

As applications grow, they often incorporate numerous third-party libraries. Without proper oversight, these components can introduce known vulnerabilities that compromise your software’s security. Effective dependency management ensures you can:

- Maintain visibility into every external dependency and its version.
- Quickly identify known vulnerabilities and assess their severity.
- Take actionable steps to remediate or suppress issues before they reach production.

## What Is OWASP Dependency-Check?

OWASP Dependency-Check is a free SCA plugin that:

1.  **Scans** your project’s dependency files (e.g., POM, `package.json`, `Gemfile`).
2.  **Extracts** metadata to determine each component’s Common Platform Enumeration (CPE).
3.  **Matches** those CPEs against the [National Vulnerability Database (NVD)](https://nvd.nist.gov/) to find associated [CVEs](https://cve.mitre.org/).

![The image is an informational slide about "Dependency Check," an open-source project by OWASP that analyzes software dependencies for vulnerabilities. It outlines the problem of open-source dependencies with known vulnerabilities and presents a solution using Dependency-Check to identify and address these issues.](https://kodekloud.com/kk-media/image/upload/v1752873715/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Dependency-Check-Basics/dependency-check-owasp-vulnerabilities-slide.jpg)

### Core Features

| Feature                 | Description                                                                        | Example Configuration                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Data Feed Updates       | Downloads and processes the NVD feed.                                              | Initial run (~10+ minutes), weekly updates thereafter.                                    |
| Suppression & Threshold | Exclude specific CVEs or set a CVSS score threshold to ignore low-severity issues. | `<suppressions><file>ignore.xml</file></suppressions>`<br/>`<failOnCVSS>7.0</failOnCVSS>` |
| Reporting               | Generates HTML, XML, or JSON reports detailing each vulnerability.                 | `-format HTML -out reports/`                                                              |

> [!important]
> **Note**
>
> On the very first run, Dependency-Check must download and index the entire NVD feed, which can take **10+ minutes**. Running it at least once every 7 days keeps subsequent updates under a minute.

## Sample HTML Report

Here’s an example of the HTML report you’ll receive after a scan. It lists vulnerable files, CVE identifiers, severity levels, and weakness classifications.

![The image shows a sample Dependency Check HTML report highlighting vulnerabilities in software dependencies, with severity levels ranging from critical to medium. It includes details like file names, CVE identifiers, and weakness types.](https://kodekloud.com/kk-media/image/upload/v1752873716/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Dependency-Check-Basics/dependency-check-html-report-vulnerabilities.jpg)

## Integrating Dependency-Check with Jenkins

You can automate your scans in a Jenkins pipeline using the official Dependency-Check plugin. The following `Jenkinsfile` snippet demonstrates how to:

1.  Run the Dependency-Check analysis.
2.  Archive the HTML report.
3.  Fail or mark the build unstable based on a CVSS threshold.

```
pipeline {
  agent any


  tools {
    odc 'Dependency-Check'  // Name of your Dependency-Check installation
  }


  stages {
    stage('Dependency-Check Analysis') {
      steps {
        dependencyCheck additionalArguments: '-scan . -format HTML -out dependency-check-report'
      }
    }
  }


  post {
    always {
      archiveArtifacts artifacts: 'dependency-check-report/*', fingerprint: true
      recordIssues tools: [dependencyCheck(pattern: '**/dependency-check-report/dependency-check-report.xml')]
      publishHTML(target: [
        reportName: 'Dependency-Check Report',
        reportDir: 'dependency-check-report',
        reportFiles: 'dependency-check-report.html',
        keepAll: true,
        alwaysLinkToLastBuild: true
      ])
    }
    failure {
      echo 'Build failed due to vulnerabilities above the configured CVSS threshold.'
    }
  }
}
```

> [!important]
> **Warning**
>
> Set a realistic `<failOnCVSS>` threshold in your `dependency-check.xml` or CLI arguments to prevent build failures on low-severity CVEs. Failing on every issue can lead to pipeline fatigue.

## Links and References

- [OWASP Dependency-Check Documentation](https://jeremylong.github.io/DependencyCheck/)
- [National Vulnerability Database (NVD)](https://nvd.nist.gov/)
- [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/)
- [Jenkins Dependency-Check Plugin](https://plugins.jenkins.io/dependency-check/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/1ee52f22-13aa-45f1-9d7f-f0865f786aa2)**
>
> Watch video content
