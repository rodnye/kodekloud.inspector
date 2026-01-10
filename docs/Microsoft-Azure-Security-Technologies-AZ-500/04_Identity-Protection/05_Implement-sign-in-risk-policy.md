# Implement sign in risk policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Identity-Protection/Implement-sign-in-risk-policy)

---

## Table of Contents

- Implement sign in risk policy
  - Key Benefits of the Sign-In Risk Policy
  - Configuring the Sign-In Risk Policy
  - Activating the Policy
  - Up Next
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Identity Protection

# Implement sign in risk policy

This guide details how to configure and activate the sign-in risk policy within Azure AD Identity Protection. While sign-in risk and user risk policies may seem similar, understanding the distinction is crucial. Previously, we discussed the user risk policy in depth; now, let's focus on the sign-in risk policy.

The sign-in risk policy is designed to detect unusual or potentially harmful authentication attempts by evaluating the risk level of each sign-in event. In contrast to the user risk policy—which assesses the probability of a user's account being compromised—the sign-in risk policy is exclusively concerned with the authentication event itself.

> [!important]
> **Note**
>
> Although Microsoft recommends using a conditional access policy for enhanced flexibility and control, you can still configure the sign-in risk policy through the Azure Portal similarly to how you set up the user risk policy.

## Key Benefits of the Sign-In Risk Policy

Implementing the sign-in risk policy in your Azure AD environment provides several significant advantages:

- **Enhanced Security:** Real-time detection and mitigation of suspicious sign-in attempts help prevent potential breaches.
- **Flexible Control:** Administrators can tailor responses based on the risk level, such as enforcing multi-factor authentication (MFA) or blocking access.
- **Proactive Protection:** Early threat detection enables prompt action to neutralize potential security incidents.

![The image is a benefits chart highlighting three features: Enhanced Security, Flexible Control, and Proactive Protection, each with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752881957/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-sign-in-risk-policy/benefits-chart-security-control-protection.jpg)

## Configuring the Sign-In Risk Policy

When you log into the Azure Portal, the sign-in risk policy will appear just below the user risk policy. The configuration interface is similar, with settings specifically designed for evaluating authentication events. For example, you have the option to either block access or allow access with additional safeguards like MFA. This contrasts with the user risk policy, where actions might include enforcing a password reset.

![The image shows a Microsoft Azure portal screen displaying the "Sign-in risk policy" settings under "Identity Protection." It includes options for policy assignments, controls, and access enforcement settings.](https://kodekloud.com/kk-media/image/upload/v1752881958/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-sign-in-risk-policy/azure-portal-sign-in-risk-policy.jpg)

The Azure Portal also recommends migrating from the sign-in risk policy to a conditional access policy. Conditional access provides more granular controls, flexible conditions, and improved overall policy management. More information on setting up conditional access will be discussed in a later section.

## Activating the Policy

After you have configured the necessary parameters for the sign-in risk policy, simply enable and save your settings. This action immediately activates the policy, ensuring that your organization benefits from enhanced protections against risky authentications.

![The image shows a Microsoft Azure portal screen for configuring a "Sign-in risk policy" under Identity Protection, with options to block or allow access and require multifactor authentication.](https://kodekloud.com/kk-media/image/upload/v1752881959/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-sign-in-risk-policy/azure-sign-in-risk-policy-configuration.jpg)

## Up Next

We have now covered the implementation of Azure AD Identity Protection's sign-in risk policy. In the next section, we will guide you through setting up multi-factor authentication (MFA) in Azure and verifying its functionality, further strengthening your security posture.

Thank you for reading. More content is coming soon.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d856cd5d-a782-4723-82b7-5a6e69cba71d/lesson/69a5ac3c-f121-4a76-9d9a-dc35c99fd674)**
>
> Watch video content
