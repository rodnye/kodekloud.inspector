# Investigating ZAP for Penetration Testing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Implement-Security-and-Validate-Code-Bases-for-Compliance/Investigating-ZAP-for-Penetration-Testing)

---

## Table of Contents

- Investigating ZAP for Penetration Testing
  - Key Benefits
  - Testing Modes
  - Baseline vs. In-Depth Scans
  - Getting Started with ZAP CLI
  - Integrating ZAP into Your Workflow
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Implement Security and Validate Code Bases for Compliance

# Investigating ZAP for Penetration Testing

OWASP Zed Attack Proxy (ZAP) is a free, open-source web application security scanner trusted by developers and security teams. Operating as an HTTP/HTTPS proxy, ZAP intercepts and logs traffic between your browser and the target application. This setup lets you inspect, modify, and replay requests to uncover security flaws early.

## Key Benefits

- **Open-Source & Community-Driven**: Backed by OWASP with regular updates.
- **Extensible Add-Ons**: Customize scans with community scripts and extensions.
- **CI/CD Ready**: Automate security checks in your pipeline for continuous feedback.

## Testing Modes

| Scan Mode        | Description                                                                    | Ideal Use Case               |
| ---------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| Passive Scanning | Observes traffic without alteration, flags missing headers or insecure cookies | Ongoing development          |
| Active Scanning  | Injects payloads and probes responses to detect vulnerabilities automatically  | Pre-release security testing |

## Baseline vs. In-Depth Scans

| Scan Type           | Scope                             | Duration | Use Case                 |
| ------------------- | --------------------------------- | -------- | ------------------------ |
| Baseline Assessment | Quick, non-intrusive checks       | Minutes  | CI/CD pre-merge checks   |
| In-Depth Analysis   | Comprehensive, rule-based testing | Hours    | Nightly or weekly audits |

![The image is an infographic about using Zed Attack Proxy (ZAP) for penetration testing, detailing modes of testing, baseline assessments, and in-depth scanning schedules. It includes elements like active engagement, passive monitoring, swift scans, and detailed analysis.](https://kodekloud.com/kk-media/image/upload/v1752868025/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Investigating-ZAP-for-Penetration-Testing/zap-penetration-testing-infographic.jpg)

> [!important]
> **Warning**
>
> Only perform active scans on applications you own or have explicit permission to test. Unauthorized scanning may violate legal or organizational policies.> [!important]
> **Note**
>
> By default, ZAP listens as a proxy on `http://127.0.0.1:8080`. Configure your browser or API client to route traffic through ZAP for accurate results.

## Getting Started with ZAP CLI

Scan from the command line to integrate seamlessly with scripts and pipelines:

```
# Run a quick baseline scan and generate an HTML report
zap-baseline.py -t https://example.com -r baseline-report.html


# Execute a full-depth active scan with detailed reporting
zap-full-scan.py -t https://example.com -r full-scan-report.html
```

## Integrating ZAP into Your Workflow

- Automate baseline assessments on every build for immediate vulnerability feedback.
- Enable passive scanning during feature development to catch missing headers early.
- Schedule full active scans overnight for exhaustive coverage and historic tracking.

## Links and References

- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [CI/CD Integration Guide](https://www.zaproxy.org/docs/dev/ci/)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/1bd9c8cc-efae-414c-b4be-838e767634f6/lesson/0b2472eb-bbfd-4aff-931a-526dd0b116ed)**
>
> Watch video content
