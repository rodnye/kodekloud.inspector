# Working with open source software - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Implement-Security-and-Validate-Code-Bases-for-Compliance/Working-with-open-source-software)

---

## Table of Contents

- Working with open source software
  - Common Concerns with Open Source Components
  - Essentials of Open-Source Licensing
  - Types of Open-Source Licenses
  - Assessing License Impact
  - Links and References
  - Watch Video
    - Lack of Ongoing Maintenance
    - Malicious Code Injection
    - Vulnerability Management
    - Licensing Terms

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Implement Security and Validate Code Bases for Compliance

# Working with open source software

Open source software (OSS) is foundational to modern development workflows. By leveraging established libraries and tools, teams can accelerate delivery, foster innovation, and collaborate across global communities. However, integrating OSS also introduces unique challenges—ranging from security vulnerabilities to licensing obligations. This guide covers best practices for evaluating, adopting, and managing open source components in your projects.

## Common Concerns with Open Source Components

Organizations often hesitate to adopt OSS because of perceived risks in:

- Maintainability
- Reliability
- Performance

It’s critical to assess each dependency before integration, ensuring that it meets your quality and security standards.

![The image addresses corporate reservations about open-source software, highlighting potential quality issues with concerns on maintainability, reliability, and performance.](https://kodekloud.com/kk-media/image/upload/v1752868042/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/corporate-reservations-open-source-software.jpg)

### Lack of Ongoing Maintenance

Projects without active maintainers can stagnate, exposing your systems to compatibility issues and unpatched vulnerabilities.

![The image illustrates the issue of "Lack of Ongoing Maintenance" in open-source software, leading to code failure. It shows a flow from open-source software to lack of maintenance and then to code failure.](https://kodekloud.com/kk-media/image/upload/v1752868043/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/lack-of-maintenance-open-source-failure.jpg)

> [!important]
> **Best Practice**
>
> Select components with a vibrant community, frequent releases, and clear contribution guidelines. Monitor release cadence on repositories like [GitHub](https://github.com/) or [GitLab](https://about.gitlab.com/).

### Malicious Code Injection

Although rare, attackers may sneak harmful payloads into OSS packages. These can compromise your entire infrastructure if undetected.

![The image illustrates the risk of malicious code in open-source software, showing its incorporation into IT systems potentially leading to system failure.](https://kodekloud.com/kk-media/image/upload/v1752868044/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/malicious-code-open-source-risk-illustration.jpg)

> [!important]
> **Security Warning**
>
> Always run automated security scans (e.g., [Snyk](https://snyk.io/), [Dependabot](https://github.com/dependabot)) and perform manual code reviews on new dependencies.

### Vulnerability Management

Your application’s security posture is only as strong as its weakest dependency. Subscribe to security advisories and apply patches promptly.

### Licensing Terms

Open source licenses dictate how you can use, modify, and distribute software. Noncompliance may lead to legal exposure or forced disclosure of proprietary code. Always review licenses before adoption.

---

## Essentials of Open-Source Licensing

All OSI-approved licenses share these core freedoms:

1.  **Unhindered Redistribution**  
    Permission to distribute the software openly.
2.  **Access to Source Code**  
    Full source must be available for inspection and audit.

    ![The image is a slide titled "Essentials of Open-Source Licensing," highlighting "Access to Source Code" with a magnifying glass icon, indicating that the source code is fully available for examination.](https://kodekloud.com/kk-media/image/upload/v1752868045/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/essentials-open-source-licensing-access-code.jpg)

3.  **Freedom to Modify**  
    Ability to adapt the code and create derivatives.

    ![The image is a slide titled "Essentials of Open-Source Licensing," highlighting the "Freedom to Modify," which allows users to modify and create derivatives of the original source code.](https://kodekloud.com/kk-media/image/upload/v1752868046/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/open-source-licensing-freedom-modify.jpg)

4.  **Integrity of Author’s Source Code**  
    Authors can maintain a canonical version and issue patches.
5.  **Non-Discrimination**  
    No restrictions based on user identity or field of use.

    ![The image is a slide titled "Essentials of Open-Source Licensing" focusing on "Non-Discrimination," stating that the license must not discriminate against any individual or group.](https://kodekloud.com/kk-media/image/upload/v1752868047/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/essentials-open-source-licensing-non-discrimination.jpg)

6.  **Field of Endeavor Neutrality**  
    Software may be used in any domain—business, research, or personal.

    ![The image is a slide titled "Essentials of Open-Source Licensing," focusing on "Field of Endeavor Neutrality," which states that the license must allow unrestricted software use in any field.](https://kodekloud.com/kk-media/image/upload/v1752868048/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/essentials-open-source-licensing-neutrality.jpg)

7.  **Product Neutrality**  
    No requirement to tie usage to a specific product.

    ![The image is a slide titled "Essentials of Open-Source Licensing," focusing on "Product Neutrality of License," stating that the license should be independent of any specific product and not impose restrictions on other software.](https://kodekloud.com/kk-media/image/upload/v1752868049/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/essentials-open-source-licensing-product-neutrality.jpg)

---

## Types of Open-Source Licenses

Choose a license model that aligns with your project’s distribution and contribution strategy:

| License Category         | Restrictions                 | Examples                     |
| ------------------------ | ---------------------------- | ---------------------------- |
| Attribution (Permissive) | Credit required              | MIT, BSD, Apache 2.0         |
| Downstream Reciprocity   | Share modifications          | Mozilla Public License (MPL) |
| Strong Copyleft          | Derivatives under same terms | GNU GPL v3                   |

![The image categorizes open-source licenses into three types: Attribution Licenses (more permissive), Downstream Reciprocity Licenses (moderate restrictions), and Copyleft Licenses (more restrictive), listing examples for each.](https://kodekloud.com/kk-media/image/upload/v1752868051/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/open-source-licenses-categorization-diagram.jpg)

---

## Assessing License Impact

Before adopting, document each dependency’s license and its implications:

| Factor               | Description                                      |
| -------------------- | ------------------------------------------------ |
| License Impact Level | High, Medium, or Low (legal obligations)         |
| License Significance | Compliance requirements, IP rights, usage rights |

![The image explains the consequences and classifications of licenses, highlighting "License Impact Level" and "License Significance Rating" with a focus on compliance, intellectual property, and usage rights. It emphasizes the importance of adhering to licensing conditions when adopting a package.](https://kodekloud.com/kk-media/image/upload/v1752868052/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Working-with-open-source-software/license-impact-classifications-compliance-diagram.jpg)

When in doubt, consult your legal team or open source office before proceeding with adoption.

---

## Links and References

- [Open Source Initiative (OSI)](https://opensource.org/)
- [SPDX License List](https://spdx.org/licenses/)
- [GitHub Security Advisories](https://github.com/advisories)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

Remember: compliance with open source licenses is mandatory. Review and document license terms for every third-party component before integrating it into your codebase.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/1bd9c8cc-efae-414c-b4be-838e767634f6/lesson/b6bec1cd-d79c-47ff-8837-2c15b1a1e863)**
>
> Watch video content
