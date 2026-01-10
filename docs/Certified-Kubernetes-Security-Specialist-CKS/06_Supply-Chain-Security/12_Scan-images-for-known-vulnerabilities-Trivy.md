# Scan images for known vulnerabilities Trivy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Supply-Chain-Security/Scan-images-for-known-vulnerabilities-Trivy)

---

## Table of Contents

- Scan images for known vulnerabilities Trivy
  - Understanding CVEs
  - Scanning with Trivy
  - Best Practices for Image Scanning
  - In Summary
  - Watch Video
  - Practice Lab
    - Installing Trivy on Debian-based Systems

---

## Content

Certified Kubernetes Security Specialist (CKS)

Supply Chain Security

# Scan images for known vulnerabilities Trivy

Welcome to this comprehensive guide on securing your container images by scanning them for known security vulnerabilities. In this article, we'll explore the fundamentals behind CVEs (Common Vulnerabilities and Exposures) and demonstrate how to use Trivy—a powerful vulnerability scanner—to secure your container images. This guide is designed to improve the flow of information while ensuring all images, diagrams, and code blocks remain intact.

## Understanding CVEs

CVE stands for Common Vulnerabilities and Exposures. Since no code is perfect, vulnerabilities may exist in software that attackers can exploit. When security researchers discover these vulnerabilities, they report them to a centralized CVE database which helps:

• Simplify bug reporting and avoid duplicate entries.  
• Assign a unique identifier to each vulnerability.  
• Provide detailed information for developers and system administrators to prioritize and remediate issues.

![The image shows a webpage listing Common Vulnerabilities and Exposures (CVE) search results, detailing specific security issues with descriptions and identifiers.](https://kodekloud.com/kk-media/image/upload/v1752871717/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Scan-images-for-known-vulnerabilities-Trivy/frame_50.jpg)

CVEs are generally classified as:

1.  Vulnerabilities that allow bypassing security controls (for instance, accessing sensitive information intended for authorized users only).
2.  Vulnerabilities that degrade system performance, cause service interruptions, or otherwise destabilize the system.

Each CVE is rated using a severity scale—from none to critical—based on a numerical value (typically 0 to 10). A score of 9.5 or a "critical" rating signifies a severe vulnerability that requires immediate remediation, whereas lower scores indicate lesser risks.

![The image shows a color-coded CVE severity score scale from 0 to 10, with CVSS v2.0 and v3.0 rating comparisons.](https://kodekloud.com/kk-media/image/upload/v1752871718/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Scan-images-for-known-vulnerabilities-Trivy/frame_130.jpg)

For example, a vulnerability in the NGINX controller installer was discovered where it downloads Kubernetes packages using an insecure HTTP URL instead of HTTPS on Debian and Ubuntu systems. This issue is rated a high severity with a score of 7.3.

![The image shows details of CVE-2020-5911, highlighting a high severity score of 7.3 for a vulnerability in NGINX Controller on Debian/Ubuntu systems.](https://kodekloud.com/kk-media/image/upload/v1752871720/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Scan-images-for-known-vulnerabilities-Trivy/frame_190.jpg)

In systems containing numerous packages and containerized services, tracking the vulnerability status of each component can be challenging. Vulnerability scanners come into play by analyzing container images and verifying if certain packages (like a specific version of NGINX, e.g., 1.14.2) have known vulnerabilities.

![The image shows a "CVE Scanner" with a smartphone icon and a list of CVE identifiers and descriptions related to software vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752871722/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Scan-images-for-known-vulnerabilities-Trivy/frame_240.jpg)

Once vulnerabilities are identified, you can:

- Upgrade to a fixed version.
- Apply additional security measures.
- Remove unnecessary vulnerable packages.

The overall security principle is clear: the fewer packages in your container image, the smaller your attack surface.

## Scanning with Trivy

Trivy by Aqua Security is a straightforward yet powerful vulnerability scanner for container images and other artifacts. It integrates seamlessly with CI/CD pipelines, making it an essential tool for modern DevOps practices. For more details, visit the [Trivy documentation](https://aquasecurity.github.io/trivy/).

### Installing Trivy on Debian-based Systems

Follow these steps to install Trivy:

```
$ sudo apt-get install wget apt-transport-https gnupg lsb-release
$ wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
$ echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list
$ sudo apt-get update
$ sudo apt-get install trivy
```

> [!important]
> **Note**
>
> Ensure your system meets all prerequisites before installation.

After installing, initiate a scan by specifying the container image name exactly as used in a Docker run command. For instance, to scan the image `nginx:1.18.0`, use the following command:

```
$ trivy image nginx:1.18.0
```

The scan output might look like this:

```
2021-03-21T02:54:18.240Z     INFO    Detecting Debian vulnerabilities...
2021-03-21T02:54:18.295Z     INFO    Trivy skips scanning programming language libraries because no supported file was detected


nginx:1.18.0 (debian 10.8)
Total: 155 (UNKNOWN: 0, LOW: 110, MEDIUM: 9, HIGH: 33, CRITICAL: 3)


+------------------+---------------------+----------+-----------------+-----------------------------------------+
|      LIBRARY     |    VULNERABILITY ID | SEVERITY | INSTALLED VERSION|                  TITLE                 |
+------------------+---------------------+----------+-----------------+-----------------------------------------+
| apt              | CVE-2011-3374       | LOW      | 1.8.2.2         | It was found that apt-key in apt, all versions, do not correctly..  |
| bash             | CVE-2019-18276      |          | 5.0-4           | bash: when effective UID is not equal to its real UID the...       |
|                  | TEMP-0841856-B188AF |          |                 | -->security-tracker.debian.org/tracker/TEMP-0841856-B188AF        |
| coreutils      | CVE-2016-2781       |          | 8.30-3          | Non-privileged session can escape to the parent session in chroot  |
|                  | CVE-2017-18018      |          |                 | Race condition vulnerability in chown and chgrp                  |
| curl             | CVE-2020-8169       | HIGH     | 7.64.0-4+deb10u1 | libcurl: Partial password disclosure                             |
+------------------+---------------------+----------+-----------------+-----------------------------------------+
```

Trivy offers additional options to filter and customize your scan results. For example, you can limit the output to only critical or high-severity vulnerabilities, or ignore issues that lack a fix:

```
$ trivy image --severity CRITICAL nginx:1.18.0
$ trivy image --severity CRITICAL,HIGH nginx:1.18.0
$ trivy image --ignore-unfixed nginx:1.18.0
```

If you have stored a Docker image as a tar archive, you can scan it using the `--input` option:

```
$ docker save nginx:1.18.0 > nginx.tar
$ trivy image --input nginx.tar
```

> [!important]
> **Note**
>
> Comparing images from different distributions can be eye-opening. For instance, while an `nginx:1.18.0` image on Debian might report many vulnerabilities, a leaner image like `nginx:1.18.0-alpine` might show none.

## Best Practices for Image Scanning

Regular scanning of your container images is essential for long-term security. Even if a scan shows no vulnerabilities today, new issues can emerge later. Consider the following best practices:

• Periodically rescan images to maintain security over time.  
• Integrate scanning into your deployment workflow using Kubernetes Admission Controllers to inspect images before pod deployment (be mindful of potential delays).  
• Maintain an internal registry with pre-scanned, trusted images to reduce recurring scan overhead.  
• Incorporate vulnerability scanning into your CI/CD pipeline to automatically detect issues in every new build.

![The image lists best practices for image scanning, including continuous rescanning, using Kubernetes Admission Controllers, maintaining a pre-scanned repository, and integrating scanning into CI/CD pipelines.](https://kodekloud.com/kk-media/image/upload/v1752871723/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Scan-images-for-known-vulnerabilities-Trivy/frame_450.jpg)

## In Summary

Scanning container images for vulnerabilities is a critical step in ensuring a secure deployment environment. With tools like Trivy, you can efficiently detect and remediate vulnerabilities, thereby reducing your overall attack surface and enhancing your container security posture.

Practice these techniques and integrate regular scans into your workflow to safeguard your systems. For additional information on image scanning and container security, refer to relevant documentation and security guidelines.

Happy scanning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/23e7cda2-6540-4704-9e6b-5754cefc2a55)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/43e9d2a7-8f3a-447d-ba9e-586ab14d165b)**
>
> Practice lab
