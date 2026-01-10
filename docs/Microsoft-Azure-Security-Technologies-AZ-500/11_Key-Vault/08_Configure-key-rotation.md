# Configure key rotation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Configure-key-rotation)

---

## Table of Contents

- Configure key rotation
  - Key Rotation for Keys
  - Key Rotation for Secrets
  - Why Rotate Keys and Secrets?
  - Key Rotation Considerations
  - Configuring Key and Secret Rotation in the Azure Portal
  - Summary
  - Watch Video
    - Configuring Key Rotation
    - Configuring Certificate Rotation
    - Automating Secret Rotation

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Configure key rotation

In this guide, we will explain how to configure key rotation in Azure to enhance security and meet compliance standards. Key rotation is an effective strategy to limit the risks associated with compromised keys or secrets.

## Key Rotation for Keys

Key rotation for keys is straightforward. In Azure, you can enable an auto-rotation policy directly from the key settings. This feature allows you to specify both the rotation interval and exact time for rotation, as well as configure notifications via Event Hub.

For example, if your key has an expiry time, you can configure the system to trigger auto-renewal a few days (e.g., 7 days) before the actual expiration. This proactive approach helps ensure that a new key is generated before any potential compromise.

## Key Rotation for Secrets

Unlike keys, Azure does not offer built-in secret rotation. Instead, you can automate secret rotation by integrating Azure Key Vault with Azure Event Grid. When the Key Vault detects events related to secret expiry, Event Grid publishes these events. A Function App, authenticated by either a managed identity or service principal, is then triggered to create a new version of the secret. With the correct Role-Based Access Control (RBAC) permissions, the updated secret is pushed automatically to your databases and applications.

## Why Rotate Keys and Secrets?

Rotating keys and secrets is essential for keeping your systems secure. Here are the primary benefits:

- **Mitigate Risks:** Frequent rotation reduces the chance of exposure when keys or secrets are compromised.
- **Enhance Security and Compliance:** Many organizations mandate periodic key and secret changes. Automated rotation meets such compliance requirements.
- **Prevent Unauthorized Access:** Regularly updating credentials minimizes the risk of unauthorized or ex-employee access.
- **Maintain Application Availability:** Updated keys and secrets ensure that your applications always run with current credentials, leading to more reliable operations.

> [!important]
> **Key Rotation Benefits**
>
> Rotating keys and secrets helps secure your applications by proactively addressing potential vulnerabilities and maintaining compliance with security policies.

![The image illustrates a process for configuring secret rotation, involving components like Key Vault, Event Grid, and Function App, with benefits such as mitigating risks and maintaining security.](https://kodekloud.com/kk-media/image/upload/v1752881988/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/secret-rotation-configuration-diagram.jpg)

## Key Rotation Considerations

Before implementing key rotation, keep the following factors in mind:

- **Rotation Frequency:** Determine a key rotation schedule based on your organization's security requirements. Some organizations opt for intervals of four months, while others choose six months.
- **Secure Distribution and Storage:** Ensure that newly rotated keys are securely transmitted to your applications.
- **Application Updates:** Automate application updates using Azure DevOps or pipelines, ensuring that your services always reference the latest keys or secrets.
- **Monitoring and Auditing:** Implement thorough monitoring and auditing mechanisms to track key rotation activities and support compliance reporting.

![The image illustrates a process for configuring key rotation, showing a flow from a Key Vault through an Event Grid and Function App to update secrets. It also lists considerations for establishing rotation frequency, secure distribution, application updates, and compliance monitoring.](https://kodekloud.com/kk-media/image/upload/v1752881989/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/key-rotation-configuration-process.jpg)

## Configuring Key and Secret Rotation in the Azure Portal

Follow these steps to set up key and secret rotation in the Azure portal:

### Configuring Key Rotation

1.  Open your Azure Key Vault in the Azure portal.
2.  Select the key you want to configure.
3.  In the top section, locate the "Rotation Policy" panel.
4.  Enable the rotation policy (disabled by default).
5.  If the key currently lacks an expiry setting, set an expiry (e.g., 30 days) so that auto-rotation can trigger at least seven days before expiration (e.g., on day 23).
6.  Optionally, set up notifications (e.g., 30 days before expiry) to plan maintenance or immediate changes.
7.  Utilize the "Rotate Now" button if you need to immediately rotate the key.

![The image shows a Microsoft Azure portal interface displaying the details of a key vault named "app-key," including its version and status. On the right, there is a "Rotation policy" panel with options for setting expiry time, enabling auto-rotation, and configuring notifications.](https://kodekloud.com/kk-media/image/upload/v1752881991/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/azure-portal-key-vault-details.jpg)

### Configuring Certificate Rotation

To configure certificate rotation, navigate to the issuance policy section in your Azure portal. Here, you can manage certificate renewal settings, including triggering automatic renewal when the certificate has reached a specified portion (for example, 80%) of its validity period.

![The image shows a Microsoft Azure portal page for configuring an issuance policy for certificates. It includes options for certificate authority type, subject, DNS names, validity period, and renewal settings.](https://kodekloud.com/kk-media/image/upload/v1752881992/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/azure-portal-certificate-policy.jpg)

### Automating Secret Rotation

Since Azure does not offer a built-in secret rotation mechanism, you can automate the process using the following steps:

1.  In your Key Vault portal, access the "Events" section.
2.  Create an event subscription to link with Azure Logic Apps or Azure Functions, specifically targeting near-expiry secret events.
3.  Configure the event subscription via the Event Grid interface. When a secret is nearing expiry, the event triggers a Function App to generate a new secret version and update your applications accordingly.

![The image shows a Microsoft Azure portal interface focused on "Key vaults" with options for managing events, including Logic Apps, Azure Functions, and Web Hook. The interface displays navigation and configuration options for a specific key vault named "akvappsec."](https://kodekloud.com/kk-media/image/upload/v1752881993/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/azure-portal-key-vault-interface.jpg)

![The image shows a Microsoft Azure portal page for creating an event subscription in Event Grid. It includes fields for event subscription details, topic details, event types, and endpoint details.](https://kodekloud.com/kk-media/image/upload/v1752881994/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-rotation/azure-event-grid-subscription-portal.jpg)

By integrating these steps into your CI/CD pipelines—such as those using Azure Pipelines—you ensure that your applications always operate using the most current secret.

## Summary

Effective key, certificate, and secret rotation is essential for maintaining high levels of security, ensuring compliance, and keeping your applications available. In this guide, we discussed:

- Enabling key auto-rotation and configuring expiry settings in the Azure portal.
- Automating secret rotation using Azure Event Grid and Functions.
- Best practices including secure distribution, automated application updates, and continuous monitoring.

Implementing these practices helps mitigate risks linked to outdated or exposed keys and secrets, supporting a secure and compliant operational environment.

Next, we will explore Key Vault safety and recovery features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/583d4dd7-3dfa-42c2-a5a1-02c24f380bfe)**
>
> Watch video content
