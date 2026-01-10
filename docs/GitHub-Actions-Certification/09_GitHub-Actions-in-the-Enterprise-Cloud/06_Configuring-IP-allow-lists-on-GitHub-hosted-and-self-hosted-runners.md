# Configuring IP allow lists on GitHub hosted and self hosted runners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-in-the-Enterprise-Cloud/Configuring-IP-allow-lists-on-GitHub-hosted-and-self-hosted-runners)

---

## Table of Contents

- Configuring IP allow lists on GitHub hosted and self hosted runners
  - Using IP allow lists with GitHub Actions
  - Configuring IP allow lists at the enterprise level
  - Configuring IP allow lists at the organization level
  - Links and References
  - Watch Video
    - Handling dynamic IP addresses

---

## Content

GitHub Actions Certification

GitHub Actions in the Enterprise Cloud

# Configuring IP allow lists on GitHub hosted and self hosted runners

In this guide, we’ll show you how to secure your GitHub Organization or Enterprise by restricting access to private resources to specific IP addresses. By default, authorized users can connect from any IP. Enforcing an IP allow list limits access to trusted networks or hosts, reducing your attack surface and ensuring compliance.

![The image shows a GitHub documentation page about managing allowed IP addresses for an organization, with navigation links on the left and article sections on the right.](https://kodekloud.com/kk-media/image/upload/v1752876218/notes-assets/images/GitHub-Actions-Certification-Configuring-IP-allow-lists-on-GitHub-hosted-and-self-hosted-runners/github-managing-allowed-ip-addresses-docs.jpg)

This documentation covers:

- Adding and managing allowed IP addresses or CIDR ranges
- Enabling allow lists for GitHub Apps, GitHub Actions, and GitHub Pages
- Verifying whether an IP is permitted before enforcement

## Using IP allow lists with GitHub Actions

To ensure your workflows run only on known IPs, choose runners with static addresses. You have two options:

| Runner Type           | IP Stability        | Use Case                                                             |
| --------------------- | ------------------- | -------------------------------------------------------------------- |
| Self-hosted runners   | Static or dynamic   | You manage the environment and networking                            |
| GitHub-hosted “large” | Static IP available | Enhanced VMs with more RAM, CPU, disk, auto-scaling, and defined IPs |

> [!important]
> **Note**
>
> Workflows on static-IP runners won’t fail due to IP restrictions.
> Consider [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) or GitHub-hosted “large” runners if you need fixed IPs.

## Configuring IP allow lists at the enterprise level

When you enable an IP allow list at the Enterprise level, it applies to all member organizations. The steps mirror the organization-level process:

1.  Navigate to **Enterprise Settings**
2.  Select **Authentication security**
3.  Under **IP allow list**, click **Add IP** or **Add CIDR range**
4.  Use the built-in checker to validate an IP before enforcement
5.  Toggle **IP allow list** to **Enabled** and select services (Apps, Actions, Pages)

![The image shows a GitHub security settings page for managing IP allow lists, with an option to check if an IP address is permitted. An IP address "1.2.3.4" is entered, and a message indicates it is not permitted by the IP allow list.](https://kodekloud.com/kk-media/image/upload/v1752876219/notes-assets/images/GitHub-Actions-Certification-Configuring-IP-allow-lists-on-GitHub-hosted-and-self-hosted-runners/github-security-ip-allow-list-check.jpg)

Once enforced, only users, apps, and runners originating from your approved IP addresses can access private enterprise resources.

![The image shows a GitHub settings page focused on authentication security, including options for SAML single sign-on, SSH certificate authorities, and IP allow lists.](https://kodekloud.com/kk-media/image/upload/v1752876220/notes-assets/images/GitHub-Actions-Certification-Configuring-IP-allow-lists-on-GitHub-hosted-and-self-hosted-runners/github-settings-authentication-security-options.jpg)

### Handling dynamic IP addresses

If your self-hosted runners use dynamic IPs, automate updates to the allow list via a scheduled script or CI job that calls the [GitHub REST API](https://docs.github.com/rest). This prevents runner lockouts when IPs change.

> [!important]
> **Warning**
>
> Failing to refresh dynamic IP addresses can block your self-hosted runners and halt CI/CD pipelines.

## Configuring IP allow lists at the organization level

The organization-level workflow is identical to the enterprise process:

1.  Navigate to **Organization Settings**
2.  Select **Authentication security**
3.  Add and verify IP addresses or CIDR ranges
4.  Enable the IP allow list and choose applicable services (Apps, Actions, Pages)

With these settings enforced, only traffic from your specified IPs—including GitHub Actions workflows on static-IP runners—can reach your private repositories and organization resources.

---

## Links and References

- [Using IP allow lists to restrict access](https://docs.github.com/en/organizations/managing-security-settings-for-your-organization/using-ip-allow-lists-to-restrict-access-to-your-organization)
- [About self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners)
- [GitHub REST API documentation](https://docs.github.com/rest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/8873d075-e523-403c-933f-5bdf0620af09)**
>
> Watch video content
