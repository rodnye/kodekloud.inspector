# SonarQube Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Code-Quality-and-Testing/SonarQube-Intro)

---

## Table of Contents

- SonarQube Intro
  - Benefits of Static Analysis
  - Quality Gates and Code Metrics
  - Watch Video

---

## Content

Jenkins Pipelines

Code Quality and Testing

# SonarQube Intro

In this lesson, we explore Static Application Security Testing (SAST), often referred to as Static Analysis. This process examines your application's source code to identify potential security vulnerabilities, acting as a sophisticated code scanner that points out areas needing improvement.

We use SonarQube—an open-source platform from SonarSource—to perform our static analysis. SonarQube continuously monitors your code quality by conducting automated code reviews to ensure that your coding standards are met and maintained.

## Benefits of Static Analysis

Static analysis offers several key benefits:

- Detects bugs early in the development lifecycle, saving time and reducing the cost of fixes.
- Identifies sections of your code that may require restructuring or simplification.
- Automatically enforces project-specific coding rules to promote consistency and maintainability.

> [!important]
> **Tip**
>
> Analyzing your code is only the first step. Addressing the flagged issues using SonarQube's detailed data is essential to improve your application's security and performance.

![The image shows a SonarQube interface highlighting a security issue in an HTML file, suggesting the addition of "lang" and/or "xml:lang" attributes to the `<html>` element.](https://kodekloud.com/kk-media/image/upload/v1752879614/notes-assets/images/Jenkins-Pipelines-SonarQube-Intro/sonarqube-security-issue-html-attributes.jpg)

SonarQube scans your entire codebase and highlights specific lines where vulnerabilities are detected, providing actionable insights to reduce your project's risk and improve reliability.

## Quality Gates and Code Metrics

SonarQube introduces quality gates as checkpoints to ensure that your project meets predefined security and quality standards. You can set thresholds for various metrics, including:

- **Code Smells:** Indicators of potentially problematic coding practices.
- **Security Hotspots:** Sections of code that might expose vulnerabilities.
- **Code Coverage:** The percentage of your codebase covered by automated tests.

![The image outlines quality standards for new code, including metrics like coverage, duplicated lines, and security ratings, alongside definitions for code smells, security hotspots, and code coverage.](https://kodekloud.com/kk-media/image/upload/v1752879615/notes-assets/images/Jenkins-Pipelines-SonarQube-Intro/quality-standards-new-code-metrics.jpg)

If any quality gate condition is not met, the build process is halted. This ensures that only code meeting your high quality standards moves forward in the development pipeline.

![The image shows a quality gate status indicating a failed build due to non-compliance, with a condition coverage of 50% being less than the required 80%.](https://kodekloud.com/kk-media/image/upload/v1752879616/notes-assets/images/Jenkins-Pipelines-SonarQube-Intro/quality-gate-failed-build-coverage.jpg)

> [!important]
> **Attention**
>
> Ensure that your quality gate thresholds are properly configured to prevent substandard code from progressing into production.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/bcd4711c-8a69-4218-a65c-113fd7a7a88d/lesson/1a54d06c-af35-481a-ad3f-b8e0dbbb6f94)**
>
> Watch video content
