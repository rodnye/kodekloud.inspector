# Design for MFA and Conditional Access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-MFA-and-Conditional-Access)

---

## Table of Contents

- Design for MFA and Conditional Access
  - Understanding Conditional Access Signals
  - Access Decisions Based on Signals
  - Best Practices for Implementing Conditional Access
  - Demonstrating Conditional Access Configuration in Azure
  - Watch Video
    - 1. Navigating to Azure Active Directory
    - 2. Resetting a User's Password
    - 3. Creating a Conditional Access Policy
    - 4. Reviewing Policy Settings and Testing
    - 5. Testing the Policy
    - 6. Reviewing Sign-In Logs

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for MFA and Conditional Access

In this guide, we dive into designing robust conditional access policies that utilize multiple signals to control user authentication and application access. With conditional access, you can set rules based on various factors—such as user identity, location, device state, and more—to determine whether to allow access, enforce multi-factor authentication (MFA), or block access altogether. This comprehensive approach ensures a secure balance between user productivity and corporate security.

---

## Understanding Conditional Access Signals

Conditional access policies utilize a variety of signals to determine the necessary level of security during the sign-in process. The key signals include:

1.  **User or Group**  
    The identity of the user or the associated group is fundamental. For example, if a high-risk user or group is signing in, additional verification may be required.
2.  **Application**  
    The specific cloud-hosted application being accessed also serves as a signal. Different applications can have tailored access policies.
3.  **Device State**  
    The compliance state of the device is crucial. Devices managed via solutions like Intune (whether hybrid AD joined, domain joined, or compliant) determine if further checks are needed.
4.  **Location**  
    The geographical location from which the user is signing in influences access control. For instance, if your organization is headquartered in Singapore, you might restrict access from regions outside Singapore.
5.  **IP Ranges**  
    Trusted IP ranges can be specified. If sign-in attempts originate from an IP address outside these ranges, access may be denied.
6.  **Client Application**  
    The type of client—such as Safari, Firefox, or a mobile app—can affect the decision to prompt for additional verification.
7.  **Sign-In Risk**  
    Provided by Microsoft Identity Protection, this signal assesses the risk associated with a sign-in attempt. If elevated risk is detected, measures such as MFA or a password reset can be executed.

> [!important]
> **Note**
>
> These signals are applicable when using Azure AD authentication, where properties like location, device compliance, and client application are evaluated to dictate access levels.

---

## Access Decisions Based on Signals

Based on these conditional access signals, there are three primary actions:

1.  **Allow Access**  
    For example, signing in from a trusted location (e.g., Singapore) can permit access without additional security prompts.

    ![The image is a flowchart illustrating "Conditional Access" with steps involving user/group, application, device state, location, IP range, client application, and sign-in risk, leading to actions like allowing access, enforcing MFA, or blocking access.](https://kodekloud.com/kk-media/image/upload/v1752867206/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/conditional-access-flowchart-steps.jpg)

2.  **Enforce MFA**  
    Consider an internal IP range (e.g., 52.11.11.0/27). If a sign-in originates from within this trusted range, access is granted. However, requests from outside this range trigger MFA via an authenticator app or text message to verify the user's identity.
3.  **Block Access**  
    When a user signs in from an untrusted location—for instance, accessing from Japan when your organization exclusively operates in Singapore—access is blocked outright.

---

## Best Practices for Implementing Conditional Access

Implementing conditional access policies successfully involves adhering to several best practices:

- **Enable MFA for Privileged Users**  
  Enforce MFA for administrators and high-privilege accounts. This safeguards against risks if credentials are compromised.
- **Require Managed Devices**  
  Only allow access from devices that are managed and compliant with organizational policies (e.g., via Intune), reducing the risk associated with personal or unmanaged devices.
- **Access Approved Client Applications Only**  
  Restrict access to corporate resources to approved client applications. For instance, allow personal devices to access Outlook and OneDrive, but limit access to Microsoft Teams.

  ![The image outlines best practices for conditional access, including enabling MFA, requiring managed devices, using approved client apps, excluding certain countries, responding to compromised accounts, and completely blocking access.](https://kodekloud.com/kk-media/image/upload/v1752867206/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/conditional-access-best-practices.jpg)

- **Exclude Specific Countries**  
  Exclude sign-ins from irrelevant geographical regions. For organizations based in Singapore, blocking sign-ins from other countries enhances security.
- **Respond to Compromised Accounts**  
  Utilize Identity Protection to monitor and flag suspicious sign-in activities. In cases of compromised accounts, enforce MFA and prompt for an immediate password change.
- **Block Legacy Authentication Protocols**  
  Prevent the use of legacy authentication methods, which rely solely on username and password and bypass MFA.
- **Use the "What-If" Tool**  
  Leverage the What-If tool to simulate sign-in scenarios based on user attributes, location, IP address, and device state. This helps troubleshoot and refine policies before production deployment.
- **Test Using Report-Only Mode**  
  Utilize report-only mode to evaluate the impact of conditional access policies before enforcing them widely. This mode generates audit logs for genuine sign-in attempts, helping to identify potential issues without locking users out.

  ![The image provides best practices for conditional access, including blocking legacy authentication protocols, using the What-if tool, and testing with "Report-only" mode.](https://kodekloud.com/kk-media/image/upload/v1752867208/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/conditional-access-best-practices-2.jpg)

---

## Demonstrating Conditional Access Configuration in Azure

In this section, we present a step-by-step process to configure conditional access policies using the Azure Portal.

### 1\. Navigating to Azure Active Directory

- Log in to the Azure Portal and navigate to Azure Active Directory.
- Select "Users" to view all users and filter by type to distinguish between guest accounts and members.

### 2\. Resetting a User's Password

- Choose a user account (e.g., Adam).
- Reset the user's password if required.
- Open an incognito browser window, go to portal.azure.com, and sign in as the user.  
  (The sign-in process may prompt for a password update and configuration of the Authenticator app if self-service password reset (SSPR) is enabled.)

### 3\. Creating a Conditional Access Policy

- In the Azure Portal, go to the Conditional Access section.
- Click on "+ New policy" to initiate a new policy.
- Configure assignments by selecting relevant users or groups, choosing cloud apps, and defining conditions.

  ![The image shows a Microsoft Azure interface for creating a new Conditional Access policy. It includes options for naming the policy, selecting users or groups, and configuring assignments and access controls.](https://kodekloud.com/kk-media/image/upload/v1752867209/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-conditional-access-policy-interface.jpg)

- You can create a policy, for instance, named "block-adam" to apply specific restrictions for certain users or groups.

  ![The image shows a Microsoft Azure interface for creating a new Conditional Access policy, with options to configure assignments, cloud apps, conditions, and access controls. The policy is named "block-adam" and is set to apply to specific users and groups.](https://kodekloud.com/kk-media/image/upload/v1752867210/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-conditional-access-policy-block-adam.jpg)

### 4\. Reviewing Policy Settings and Testing

- Finalize your policy by reviewing settings related to cloud apps, conditions, and access controls (e.g., enforcing MFA).

  ![The image shows a Microsoft Azure portal screen for creating a new Conditional Access policy. It includes options for naming the policy, assigning users, selecting cloud apps, and configuring access controls like multifactor authentication.](https://kodekloud.com/kk-media/image/upload/v1752867212/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-portal-conditional-access-policy.jpg)

- Return to the Conditional Access Policies page to view and manage your active policies.

  ![The image shows the Microsoft Azure portal, specifically the Conditional Access Policies page, with options for managing policies and VPN connectivity. A notification indicates the creation of a policy named "block-adam."](https://kodekloud.com/kk-media/image/upload/v1752867213/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-portal-conditional-access-policies.jpg)

### 5\. Testing the Policy

- Utilize the built-in "What-If" tool to simulate various sign-in scenarios.
- Select a user and configure conditions (such as IP address, device platform, and location) to validate the efficacy of your policies.

  ![The image shows a Microsoft Azure interface for testing conditional access policies, with options to select user identities and configure various conditions like IP address and device platform. A user selection panel is open, displaying a list of users to choose from.](https://kodekloud.com/kk-media/image/upload/v1752867215/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-conditional-access-testing-interface.jpg)

### 6\. Reviewing Sign-In Logs

- Finally, inspect the sign-in logs to confirm that the conditional access policy functions as expected. For example, review logs for a user such as Adam Lloyd to analyze any blocked sign-in attempts.

  ![The image shows a Microsoft Azure portal displaying sign-in logs for a user named Adam Lloyd, with details about sign-in attempts and conditional access policies. The logs indicate several failed sign-in attempts due to a block policy.](https://kodekloud.com/kk-media/image/upload/v1752867216/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-MFA-and-Conditional-Access/azure-signin-logs-adam-lloyd.jpg)

---

By following these steps and adhering to best practices, you can design an effective conditional access strategy that safeguards your critical applications while ensuring seamless access for trusted users and devices. For further insights, consider exploring additional resources such as [Azure Active Directory documentation](https://learn.microsoft.com/en-us/azure/active-directory/) and [Microsoft Identity Protection](https://learn.microsoft.com/en-us/azure/active-directory/identity-protection/overview).

> [!important]
> **Final Tip**
>
> Testing your policies in report-only mode before full enforcement is critical. It helps identify any potential issues without impacting user productivity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/d514c66c-6225-4ba9-8098-a222411dbeb8)**
>
> Watch video content
