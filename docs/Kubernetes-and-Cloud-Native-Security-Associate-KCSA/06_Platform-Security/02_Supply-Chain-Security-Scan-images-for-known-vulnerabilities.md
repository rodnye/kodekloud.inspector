# Supply Chain Security Scan images for known vulnerabilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Supply-Chain-Security-Scan-images-for-known-vulnerabilities)

---

## Table of Contents

- Supply Chain Security Scan images for known vulnerabilities
  - What Is a CVE?
  - Understanding CVSS Severity Ratings
  - Example: CVE-2020-5911
  - Why Scan Container Images?
  - Container Vulnerability Scanner: Trivy
  - Filtering and Advanced Options
  - Reduce Your Image’s Attack Surface
  - Image Scanning Best Practices
  - Links and References
  - Watch Video
    - Installing Trivy on Debian/Ubuntu
    - Running a Basic Scan

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Supply Chain Security Scan images for known vulnerabilities

Container image scanning is a critical step in supply-chain security. In this guide, you’ll learn about CVEs, CVSS ratings, and how to use Trivy to automatically detect and remediate known vulnerabilities in your container images.

## What Is a CVE?

**Common Vulnerabilities and Exposures (CVE)** is the industry-standard database for public security flaws. Each vulnerability gets a unique identifier, helping you avoid duplicates and streamline research.

> [!important]
> **Note**
>
> Visit the [CVE Database](https://cve.mitre.org/) to search for published vulnerabilities and track remediation status.

![The image shows a webpage from the Common Vulnerabilities and Exposures (CVE) database, listing search results for various CVE records with their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752880916/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Security-Scan-images-for-known-vulnerabilities/cve-database-search-results.jpg)

Typical CVE categories include:

- Unauthorized access bypasses (e.g., confidential data exposure)
- Denial-of-service or performance degradation bugs

## Understanding CVSS Severity Ratings

The [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/) provides both a numeric score (0–10) and a qualitative severity label. Use the table below to interpret scores:

| Severity | CVSS Score Range |
| -------- | ---------------- |
| None     | 0.0              |
| Low      | 0.1 – 3.9        |
| Medium   | 4.0 – 6.9        |
| High     | 7.0 – 8.9        |
| Critical | 9.0 – 10.0       |

![The image shows a color gradient bar representing CVE severity scores from 0 to 10, along with tables comparing CVSS v2.0 and v3.0 ratings and their corresponding base score ranges.](https://kodekloud.com/kk-media/image/upload/v1752880917/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Security-Scan-images-for-known-vulnerabilities/icve-severity-scores-gradient-table.jpg)

## Example: CVE-2020-5911

**CVE-2020-5911** affects the NGINX Ingress Controller installer on Debian/Ubuntu by downloading packages over HTTP instead of HTTPS. Its CVSS base score is **7.3 (High)**, indicating a serious risk.

![The image shows details of a CVE (Common Vulnerabilities and Exposures) entry, specifically CVE-2020-5911, with a description of the vulnerability and a CVSS (Common Vulnerability Scoring System) base score of 7.3, indicating high severity.](https://kodekloud.com/kk-media/image/upload/v1752880918/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Security-Scan-images-for-known-vulnerabilities/cve-2020-5911-details-cvss-7-3.jpg)

## Why Scan Container Images?

Containers often bundle multiple libraries and OS packages, each a potential vector for attacks. Automated scanners help you:

- Identify and upgrade vulnerable packages
- Apply patches or workarounds
- Remove unused components to reduce risk

![The image shows a "CVE Scanner" title with an illustration of a smartphone displaying gear icons, alongside a list of CVE (Common Vulnerabilities and Exposures) entries with descriptions.](https://kodekloud.com/kk-media/image/upload/v1752880920/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Security-Scan-images-for-known-vulnerabilities/cve-scanner-smartphone-illustration.jpg)

## Container Vulnerability Scanner: Trivy

[Trivy](https://github.com/aquasecurity/trivy) by Aqua Security is a fast, user-friendly scanner that integrates easily into Docker workflows and CI/CD pipelines.

### Installing Trivy on Debian/Ubuntu

```
sudo apt-get update
sudo apt-get install -y wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" \
  | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install -y trivy
```

### Running a Basic Scan

```
trivy image nginx:1.18.0
```

```
2021-03-21T02:54:18.240Z    INFO    Detecting Debian vulnerabilities...
2021-03-21T02:54:18.295Z    INFO    Trivy skips scanning programming language libraries because no supported file was detected

nginx:1.18.0 (debian 10.8)
Total: 155 (UNKNOWN: 0, LOW: 110, MEDIUM: 9, HIGH: 33, CRITICAL: 3)

LIBRARY     VULNERABILITY ID  SEVERITY  INSTALLED VERSION    FIXED VERSION    TITLE
-------------------------------------------------------------------------------------------------------
apt         CVE-2011-3374     LOW       1.8.2.2                                Incorrect handling in apt-key
bash        CVE-2019-18276    MEDIUM    5.0-4                                  When effective UID != real UID
coreutils   CVE-2016-2781     MEDIUM    8.30-3                                 Session escape in chroot
curl        CVE-2020-8169     HIGH      7.64.0-4+deb10u1                       libcurl: partial password leak
...
```

## Filtering and Advanced Options

```
# Only CRITICAL and HIGH
trivy image --severity CRITICAL,HIGH nginx:1.18.0

# Skip vulnerabilities without available fixes
trivy image --ignore-unfixed nginx:1.18.0

# Scan a saved tar archive
docker save nginx:1.18.0 > nginx.tar
trivy image --input nginx.tar
```

> [!important]
> **Warning**
>
> Using `--ignore-unfixed` can hide critical risks if no patch is available. Always review the full report before deployment.

## Reduce Your Image’s Attack Surface

Smaller base images generally contain fewer vulnerabilities. Compare these scan results:

| Image                 | Total CVEs |
| --------------------- | ---------- |
| nginx:1.18.0 (debian) | 155        |
| nginx:1.18.0-alpine   | 0          |

Always prefer minimal, official base images.

![The image lists best practices for image scanning, including continuous rescanning, using Kubernetes Admission Controllers, maintaining a repository of pre-scanned images, and integrating scanning into the CI/CD pipeline.](https://kodekloud.com/kk-media/image/upload/v1752880920/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Security-Scan-images-for-known-vulnerabilities/image-scanning-best-practices.jpg)

## Image Scanning Best Practices

- Continuously re-scan images to catch newly disclosed CVEs
- Enforce admission controls to block or quarantine unscanned or unsafe images
- Maintain an internal registry of pre-scanned, approved images for rapid rollouts
- Integrate scanning into CI/CD pipelines so that every build is audited at source

---

## Links and References

- [CVE Database](https://cve.mitre.org/)
- [CVSS v3 Specification](https://www.first.org/cvss/specification-document)
- [Trivy GitHub Repository](https://github.com/aquasecurity/trivy)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/119c1f94-b919-4aa9-a597-7e077869b89a)**
>
> Watch video content
