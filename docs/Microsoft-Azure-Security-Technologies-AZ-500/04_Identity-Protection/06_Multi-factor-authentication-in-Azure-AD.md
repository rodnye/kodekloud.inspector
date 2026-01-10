# Multi factor authentication in Azure AD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Identity-Protection/Multi-factor-authentication-in-Azure-AD)

---

## Table of Contents

- Multi factor authentication in Azure AD
  - Why Use Multi-Factor Authentication?
  - Azure Multi-Factor Authentication
  - Benefits of Using MFA
  - Implementing MFA in Azure AD
  - Setting Up MFA via the Azure Portal
  - Additional MFA Settings in Azure AD
  - Configuring MFA Service Settings via the Azure Portal
  - Conclusion
  - Watch Video
    - User States in Azure AD MFA
    - Account Lockout
    - Block/Unblock Users
    - Fraud Alert
    - Notifications
    - OATH Tokens
    - Phone Call Settings
    - Providers

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Identity Protection

# Multi factor authentication in Azure AD

Deploying multi-factor authentication (MFA) in Azure enhances security by requiring an additional verification step during sign-in, significantly reducing the risk of unauthorized access. This guide explains why MFA is essential, how Azure integrates MFA into its identity platform, and the key benefits that come with its implementation.

## Why Use Multi-Factor Authentication?

Multi-factor authentication bolsters account security by requiring extra verification—such as a phone call, text message, or fingerprint—alongside the usual password. Relying solely on a password leaves accounts vulnerable to credential exploits.

![The image explains the benefits of Multi-Factor Authentication (MFA), highlighting its role in limiting credential exposure and preventing unauthorized access.](https://kodekloud.com/kk-media/image/upload/v1752881962/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/mfa-benefits-credential-security.jpg)

With MFA in place, even if an attacker obtains a password, they must overcome an additional security layer. This extra step greatly reduces the potential for unauthorized access.

## Azure Multi-Factor Authentication

Azure MFA builds upon layered security by integrating seamlessly with the Azure AD identity platform. It allows administrators to enforce MFA based on user role, location, device compliance, and other factors, thereby delivering enterprise-level protection. Azure MFA supports several verification methods, including:

- Phone calls
- Text messages
- Authenticator app verifications

![The image is an informational graphic about Azure MFA, highlighting its role in enhancing security through multi-factor authentication and supporting various verification methods like phone calls, text messages, and mobile app verification.](https://kodekloud.com/kk-media/image/upload/v1752881964/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-mfa-security-graphic.jpg)

## Benefits of Using MFA

Azure MFA acts as a robust second layer of defense. After a password is entered, the user must verify possession of a registered device by receiving a text message with a verification code or using another approved method. This approach confirms that the individual signing in is in actual possession of the device linked to the account.

Another key benefit is Azure MFA’s environmental intelligence. It evaluates factors such as login location, time, and device compliance. For example, if you sign in from an unusual location (like a café while on vacation), Azure MFA may prompt for extra verification steps such as fingerprint recognition or security questions. These capabilities are further refined using conditional access policies.

MFA should be implemented as widely as possible across your organization, including on email platforms, cloud storage, and internal databases, to minimize the risk of breaches.

![The image outlines three benefits of a security feature: confirming user legitimacy, gathering additional security information, and enabling MFA for enhanced security. Each benefit is accompanied by a corresponding icon.](https://kodekloud.com/kk-media/image/upload/v1752881964/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/security-feature-benefits-icons.jpg)

> [!important]
> **Note**
>
> Enhancing security with MFA not only protects individual accounts but also supports regulatory compliance and reduces the overall risk of data breaches.

## Implementing MFA in Azure AD

Azure AD offers two primary methods to implement MFA for user sign-ins:

1.  **Conditional Access Policy**  
    MFA is triggered under pre-defined conditions such as user role, location, or application access.
2.  **Individual User MFA Activation**  
    MFA is enforced for every sign-in regardless of conditions (although configuration may allow trusted IP addresses or devices to bypass MFA).

### User States in Azure AD MFA

When MFA is enabled, user states in Azure AD transition through several stages:

- **Disabled:** MFA is not active.
- **Enabled:** After the user enrolls in MFA, their state changes to enabled.
- **Enforced:** Once the registration and device enrollment process is complete, MFA is enforced.

Administrators can manage these states to ensure that the appropriate security protocols are followed. Upon transitioning from disabled to enabled, users will complete the MFA configuration during their first sign-in.

![The image outlines three steps for implementing MFA in Azure AD: securing user sign-ins, understanding user states, and first-time sign-in post-MFA enablement.](https://kodekloud.com/kk-media/image/upload/v1752881965/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/mfa-implementation-azure-ad-steps.jpg)

During the initial sign-in after MFA enablement, users are prompted to configure their MFA settings. They might be directed to register a mobile device for authentication or verify their phone number if opting for text messaging. This process is crucial to ensuring compliance with your organization’s MFA policies.

## Setting Up MFA via the Azure Portal

Follow these steps to configure MFA for a user via the Azure portal:

1.  Log in to the Azure portal and navigate to **Azure Active Directory > Users**.
2.  Select **Per-user MFA** from the options at the top.
3.  Sign in with a global administrator account when prompted. (Global administrators who have not activated MFA will be required to set it up.)
4.  Search for the specific user, whose current MFA state is displayed as disabled.
5.  Click **Enable** to activate multi-factor authentication.

After MFA is enabled, the next time the user signs in, they will be prompted to complete the additional authentication steps. Typically, this involves downloading and setting up the Microsoft Authenticator app, which is the default method.

![The image shows a Microsoft Azure login screen with a prompt for additional security information, instructing the user to set up the Microsoft Authenticator app.](https://kodekloud.com/kk-media/image/upload/v1752881966/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-login-security-authenticator.jpg)

When setting up the app:

- Download [Microsoft Authenticator](https://www.microsoft.com/en-us/account/authenticator) from the Play Store or App Store.
- Click **Next** after installation.
- On your phone, add a new account (work or school) and scan the QR code displayed on the screen.

![The image shows a webpage instructing users to secure their account by setting up the Microsoft Authenticator app. It provides a link to download the app and a "Next" button to proceed.](https://kodekloud.com/kk-media/image/upload/v1752881967/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/microsoft-authenticator-account-setup.jpg)

After scanning the QR code, the platform tests the setup by sending a notification to your phone. Approve the notification (or complete the code verification if using number-based verification) to enroll your device.

![The image shows a webpage instructing users to scan a QR code with the Microsoft Authenticator app to secure their account. It includes options to go back or set up a different method.](https://kodekloud.com/kk-media/image/upload/v1752881968/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/qr-code-authenticator-setup.jpg)

Once the notification is approved, the Authenticator app will display a confirmation message.

![The image shows a Microsoft Authenticator setup page indicating that a notification has been approved. There are options to go back or proceed to the next step.](https://kodekloud.com/kk-media/image/upload/v1752881969/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/microsoft-authenticator-setup-approved.jpg)

Click **Done** to complete the setup process. Then sign in again from the Azure portal to confirm that the changes have taken effect; you will see the user’s status update from "disabled" to "enabled" and finally to "enforced".

![The image shows a webpage confirming the successful setup of security information using Microsoft Authenticator as the default sign-in method. The page is titled "Keep your account secure" and indicates success in setting up security info.](https://kodekloud.com/kk-media/image/upload/v1752881970/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/microsoft-authenticator-security-setup.jpg)

To verify the configuration, refresh the MFA settings page where the updated user status will be shown.

![The image shows a Microsoft Azure interface for managing multi-factor authentication settings, listing users with their authentication status set to "Disabled."](https://kodekloud.com/kk-media/image/upload/v1752881971/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-mfa-settings-disabled-users.jpg)

After the initial configuration, the user’s MFA status will be "enforced". Bulk updates for managing multiple users are also available within Azure AD.

![The image shows a Microsoft Azure interface for managing multi-factor authentication settings for users, displaying a list of users with their authentication status.](https://kodekloud.com/kk-media/image/upload/v1752881972/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-multi-factor-authentication-settings.jpg)

## Additional MFA Settings in Azure AD

Azure MFA offers various settings to further customize and secure the authentication process:

### Account Lockout

Prevent brute-force attempts by temporarily locking an account after consecutive failed MFA attempts. This feature is especially useful for users authenticating with a PIN.

### Block/Unblock Users

Administrators can proactively block or unblock selected users from receiving MFA prompts. A blocked status remains for 90 days or until manually reversed.

### Fraud Alert

This user-centric feature allows individuals to report fraudulent verification requests, immediately alerting an administrator if an unexpected authentication prompt is received.

### Notifications

Configure email notifications for MFA-related events to maintain awareness and respond quickly to security incidents.

### OATH Tokens

Azure MFA supports the use of OATH tokens for hardware-based authentication, adding another layer of protection.

![The image displays a menu of additional MFA (Multi-Factor Authentication) settings, including options like Account Lockout, Block/Unblock Users, Fraud Alert, Notifications, OATH Tokens, Phone Call Settings, and Providers.](https://kodekloud.com/kk-media/image/upload/v1752881973/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/mfa-settings-menu-options.jpg)

### Phone Call Settings

Customize phone call greetings and behavior for both cloud-based and on-premises environments.

### Providers

The Providers tab shows the associated authentication providers. Note that as of September 1, 2018, creating new providers is no longer permitted.

## Configuring MFA Service Settings via the Azure Portal

Within the Azure portal, you can also manage additional MFA service settings:

1.  **Account Lockout Settings:**  
    Configure the number of failed MFA attempts that trigger an account lockout, the duration of the lockout, and reset periods.

    ![The image shows a Microsoft Azure portal page for configuring multifactor authentication account lockout settings, including options for setting the number of denials to trigger a lockout and reset times.](https://kodekloud.com/kk-media/image/upload/v1752881974/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-portal-mfa-lockout-settings.jpg)

2.  **Block/Unblock Users:**  
    Manage the block list by adding or removing users to control who receives MFA requests.

    ![The image shows a Microsoft Azure portal page for managing multifactor authentication, specifically the section for blocking or unblocking users. The list of blocked users is currently empty.](https://kodekloud.com/kk-media/image/upload/v1752881975/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-mfa-user-management-blocked.jpg)

3.  **OATH Tokens:**  
    Upload and manage hardware OATH tokens for additional authentication options.

    ![The image shows a Microsoft Azure portal page for managing multifactor authentication, specifically focusing on OATH tokens. It includes options to upload, download, and manage token settings, with no results currently displayed.](https://kodekloud.com/kk-media/image/upload/v1752881976/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-portal-multifactor-authentication-oath-tokens.jpg)

4.  **Phone Call Settings and Providers:**  
    Customize phone call settings and review existing authentication providers.

Additionally, under the "Service Settings" section in the MFA interface, you can configure:

- Verification methods (e.g., text-to-phone notifications)
- Trusted IP addresses to bypass MFA under secure conditions
- Options for users to remember MFA on their devices for a specified period (e.g., 90 days)

![The image shows a Microsoft Azure multi-factor authentication settings page, where users can configure app passwords, trusted IPs, and verification options.](https://kodekloud.com/kk-media/image/upload/v1752881977/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Multi-factor-authentication-in-Azure-AD/azure-multi-factor-authentication-settings-2.jpg)

## Conclusion

Azure AD’s multi-factor authentication enhances security by adding critical verification layers and offering administrators flexible configuration options. By leveraging both conditional access policies and individual user MFA activation, organizations can protect user identities across multiple platforms.

Up next, we will explore conditional access policies and their integration with user and sign-in risk assessments, further strengthening your organization’s security posture.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d856cd5d-a782-4723-82b7-5a6e69cba71d/lesson/389834a0-8e4e-4aea-8b09-8e255e69401b)**
>
> Watch video content
