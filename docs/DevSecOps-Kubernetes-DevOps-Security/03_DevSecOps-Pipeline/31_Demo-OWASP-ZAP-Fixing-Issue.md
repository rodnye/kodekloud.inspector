# Demo OWASP ZAP Fixing Issue - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-OWASP-ZAP-Fixing-Issue)

---

## Table of Contents

- Demo OWASP ZAP Fixing Issue
  - 1. Update pom.xml
  - 2. Create WebSecurityConfig
  - 3. Dependency-Check Failure (CVSS ≥ 8)
  - 4. Adjust failBuildOnCVSS
  - 5. Build Passes with CVSS 10
  - 6. OWASP ZAP DAST
  - 7. Verify Response Headers
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo OWASP ZAP Fixing Issue

In our previous tutorial, we ran an OWASP ZAP scan against a Spring Boot application and published an HTML report via Jenkins. This guide walks you through remediating the missing **X-Content-Type-Options** header in HTTP responses.

First, let’s inspect the vulnerability reported by ZAP:

![The image shows an OWASP ZAP HTML report highlighting a security issue where the "X-Content-Type-Options" header is missing. It provides details such as the description, affected URLs, methods, and a suggested solution.](https://kodekloud.com/kk-media/image/upload/v1752873635/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/owasp-zap-html-report-security-issue.jpg)

A quick search on [Stack Overflow](https://stackoverflow.com) suggests adding Spring Security Starter to include this header automatically. We’ll:

1.  Add the `spring-boot-starter-security` dependency.
2.  Create a `WebSecurityConfig` class to disable CSRF (since we’re only using security for headers).

---

## 1\. Update pom.xml

Add Spring Security Starter (version managed by your parent POM):

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

After insertion, your `<dependencies>` block might resemble:

```
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>openapi-ui</artifactId>
    <version>1.2.30</version>
  </dependency>
  <!-- other dependencies -->
</dependencies>
```

> [!important]
> **Note**
>
> Spring Security automatically adds many secure headers, including `X-Content-Type-Options: nosniff`.

---

## 2\. Create WebSecurityConfig

In your IDE, right-click the package under `src/main/java` and select **New → Class**:

![The image shows a screenshot of a Spring Tool Suite IDE with a context menu open, displaying options for creating new Java elements like classes and packages. The background shows a POM file being edited.](https://kodekloud.com/kk-media/image/upload/v1752873636/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/spring-tool-suite-context-menu-java-elements.jpg)

Name the class `WebSecurityConfig` and add the following:

```
package com.devsecops;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
    }
}
```

Commit and push your changes (e.g., via GitHub Desktop):

![The image shows a GitHub Desktop interface with no local changes and options to push commits, open the repository in an editor, view files in Explorer, or open the repository on GitHub. A taskbar with various application icons is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752873637/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/github-desktop-interface-no-changes.jpg)

Once pushed, Jenkins will start a new build.

---

## 3\. Dependency-Check Failure (CVSS ≥ 8)

During the Maven dependency scan, the build fails due to high-severity issues in Spring Security:

```
mvn dependency-check:check
...
[ERROR] One or more dependencies were identified with vulnerabilities that have a CVSS score greater than or equal to '8.0':
[ERROR]   spring-security-core-5.3.5.RELEASE.jar (CVE-2021-21112)
[ERROR]   spring-security-web-5.3.5.RELEASE.jar (CVE-2021-21112)
```

Review the failed build in [Jenkins](https://www.jenkins.io) Build #59:

![The image shows a Jenkins build page for "Build #59" with details such as build artifacts, changes, and test results. The build is marked with a red cross, indicating a failure.](https://kodekloud.com/kk-media/image/upload/v1752873639/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/jenkins-build-59-failure-details.jpg)

Verify CVE-2021-21112 on the [NVD](https://nvd.nist.gov):

![The image shows a webpage from the National Vulnerability Database detailing CVE-2021-22112, a security vulnerability in Spring Security, with a high severity score of 8.8. The page includes a description of the issue and quick info about the CVE entry.](https://kodekloud.com/kk-media/image/upload/v1752873640/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/cve-2021-22112-spring-security-vulnerability.jpg)

Since no patched version is available yet, we’ll **temporarily** raise the CVSS threshold to **10**.

> [!important]
> **Warning**
>
> Raising the CVSS threshold should only be temporary. Revert once a fixed release is available.

---

## 4\. Adjust `failBuildOnCVSS`

In your `pom.xml`, configure the OWASP Dependency-Check plugin:

```
<build>
  <plugins>
    <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>6.1.6</version>
      <configuration>
        <format>ALL</format>
        <!-- Fail build on CVSS ≥ threshold -->
        <failBuildOnCVSS>10</failBuildOnCVSS>
        <!-- Optional internal mirrors and suppression files -->
        <!-- <cveUrlModified>http://internal-mirror/...json.gz</cveUrlModified> -->
        <!-- <suppressionFiles>... -->
      </configuration>
    </plugin>
    <!-- other plugins -->
  </plugins>
</build>
```

Commit and push again.

---

## 5\. Build Passes with CVSS 10

With the threshold raised, the dependency scan now succeeds, and Jenkins shows:

![The image shows a Jenkins dashboard displaying a list of recent builds for a project named "devsecops-numeric-application," with details such as status, run number, commit message, duration, and completion time.](https://kodekloud.com/kk-media/image/upload/v1752873641/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/jenkins-dashboard-devsecops-builds.jpg)

![The image shows a Jenkins interface displaying dependency-check results, highlighting vulnerabilities in specific files with their severity levels and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752873643/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OWASP-ZAP-Fixing-Issue/jenkins-dependency-check-results-vulnerabilities.jpg)

---

## 6\. OWASP ZAP DAST

The ZAP stage now completes, reporting only one warning:

```
PASS: X-Content-Type-Options [10021]
...
WARN-NEW: 1 WARN-ING: 1 INFO: 0 IGNORE: 0 PASS: 115
Exit Code: 2
OWASP ZAP Report has either Low/Medium Risk. Please check the HTML Report
```

---

## 7\. Verify Response Headers

Refresh your application endpoint in the browser. You should now see:

- **Before:** No `X-Content-Type-Options` header
- **After:** `X-Content-Type-Options: nosniff`

This confirms the header is correctly applied. The only remaining ZAP warning relates to **unexpected Content-Type**, which can be addressed by customizing ZAP’s scan rules.

---

## Links and References

- [OWASP ZAP Official Site](https://www.zaproxy.org)
- [Spring Boot Security Reference](https://docs.spring.io/spring-security/site/docs/current/reference/html5/)
- [OWASP Dependency-Check Maven Plugin](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/)
- [National Vulnerability Database (NVD)](https://nvd.nist.gov)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/5e67ad83-dfe2-4a7f-a40a-0ec00a26ff2e)**
>
> Watch video content
