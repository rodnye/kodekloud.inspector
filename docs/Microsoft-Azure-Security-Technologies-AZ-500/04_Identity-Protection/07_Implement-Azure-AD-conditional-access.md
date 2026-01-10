# Implement Azure AD conditional access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Identity-Protection/Implement-Azure-AD-conditional-access)

---

## Table of Contents

- Implement Azure AD conditional access
  - How It Works
  - Key Features of Azure AD Conditional Access Policies
  - Benefits of Using Azure AD Conditional Access
  - How Conditional Access Works
  - Setting Up a Conditional Access Policy in the Azure Portal
  - Configuring Named Locations
  - Testing and Troubleshooting the Policy
  - Conclusion
  - Watch Video
    - 1. Conditions
    - 2. Access Control
    - Customized Access
    - Enhanced Security
    - Unified Policy Platform
    - 1. Sign in to the Azure Portal
    - 2. Disable Security Defaults (if necessary)
    - 3. Create a New Conditional Access Policy
    - 4. Configure Users and Target Resources
    - 5. Specify Conditions (Optional)
    - 6. Define Access Controls
    - 7. Enable and Create the Policy

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Identity Protection

# Implement Azure AD conditional access

In this lesson, we explore how to implement Azure AD Conditional Access—a critical security feature that enables you to define policies determining who can access your cloud-based applications. These policies are essential for protecting sensitive information by ensuring that only authorized users gain access.

Imagine working for a company where you want to restrict access to a specific application to employees physically present in the office. With Azure AD Conditional Access, you can create a policy that allows access only from the internal corporate network. Even if someone has the correct password, they will be denied access if they are not on the trusted network. This additional security layer safeguards your applications and data.

## How It Works

Azure AD Conditional Access policies are evaluated during each access attempt by considering several signals:

- User and location
- Device being used
- Application being accessed
- Real-time risk (derived from user risk and sign-in risk policies)

These signals help determine whether to grant access, prompt for multi-factor authentication (MFA), or block the access attempt.

![The image is a diagram explaining Azure AD Conditional Access, showing how signals like user location, device, application, and real-time risk are used to verify access attempts, which can result in allowing access, requiring MFA, or blocking access.](https://kodekloud.com/kk-media/image/upload/v1752881936/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-ad-conditional-access-diagram.jpg)

In summary, when a user attempts access:

- If all conditions are favorable, access is granted.
- If additional verification is needed, the user is prompted for MFA.
- If the conditions are not met, access is blocked.

## Key Features of Azure AD Conditional Access Policies

### 1\. Conditions

Conditions define the “when” and “where” of security, specifying when a policy should trigger by evaluating factors such as:

- Risky or safe locations (e.g., secure office network vs. other networks)
- Device compliance (ensuring the device is managed and secure)
- User sign-in risk levels

These conditions allow you to monitor and alert you about abnormal or risky access attempts.

### 2\. Access Control

Access control determines the appropriate actions when a policy is triggered, defining “how” to respond:

- Prompting for MFA
- Requiring device compliance with organizational security standards (e.g., via Intune)
- Blocking access entirely if necessary

![The image outlines key features of a security policy, focusing on "Conditions" and "Access control," with brief descriptions and icons for each. Conditions involve user risk and device state, while access control includes authentication and compliance.](https://kodekloud.com/kk-media/image/upload/v1752881936/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/security-policy-conditions-access-control.jpg)

In essence, conditions alert you to potential issues, while access controls determine the response.

## Benefits of Using Azure AD Conditional Access

### Customized Access

Conditional Access enables you to tailor security rules based on a user’s role. For example, global administrators, user administrators, and standard users can have customized policies that align with their respective access needs and risk profiles.

### Enhanced Security

Relying solely on passwords is often insufficient. If an access attempt originates from a new or high-risk location, enhanced security measures—such as MFA—are enforced, adding an extra layer of protection to your resources.

### Unified Policy Platform

Azure AD Conditional Access offers a unified platform to apply consistent security rules across multiple Azure AD applications. This streamlined approach reduces administrative burdens while strengthening overall security.

![The image outlines three benefits: Customized Access, Enhanced Security, and Unified Policy Platform, each represented with icons and numbered 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752881937/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/benefits-customized-access-security-policy.jpg)

## How Conditional Access Works

Conditional Access policies act as a decision-making flow block. When a user attempts to access a resource, various signals—such as group membership, application type, device state, location, client application, and sign-in risk—are evaluated. Based on these conditions, the policy will either allow access, require MFA, or block access.

![The image is a flowchart illustrating access control conditions and actions, showing how user conditions like group, application, device state, location, client application, and sign-in risk determine access to cloud apps, on-premises, or result in blocked access.](https://kodekloud.com/kk-media/image/upload/v1752881938/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/access-control-flowchart-conditions-actions.jpg)

## Setting Up a Conditional Access Policy in the Azure Portal

Follow these step-by-step instructions to create a Conditional Access policy in the Azure portal.

### 1\. Sign in to the Azure Portal

- Open an incognito window and navigate to [portal.azure.com](https://portal.azure.com).
- Sign in using the appropriate credentials (for example, Abigail’s account).> [!important]
  > **Note**
  >
  > Even though you may sign in successfully, lacking an assigned role might restrict access to certain services.

### 2\. Disable Security Defaults (if necessary)

Azure AD includes default security policies that may need to be disabled to allow custom policies:

- Go to **Azure Active Directory** > **Properties**.
- Scroll down to the **Manage Security Defaults** option.
- Click **Disable** and provide a reason (e.g., “My organization is using Conditional Access.”).

Disabling security defaults enables you to create and manage your own policies.

![The image shows the properties page of an Azure Active Directory tenant named "Kodekloud" with security defaults disabled, highlighting a warning about vulnerability to identity-related attacks. It includes options for reasons to disable security defaults, such as using Conditional Access or having too many multifactor authentication sign-up requests.](https://kodekloud.com/kk-media/image/upload/v1752881939/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-active-directory-kodekloud-security-defaults.jpg)

### 3\. Create a New Conditional Access Policy

- Navigate to **Azure AD Conditional Access**.
- Click on **Create a new policy**.

  > [!important]
  > **Note**
  >
  > With security defaults disabled, you should no longer see warnings about defaults, and you can proceed to create your custom policy.

![The image shows a Microsoft Azure portal page for creating a new Conditional Access policy, with options for assignments, target resources, conditions, and access controls. A warning message at the bottom advises disabling security defaults before enabling the policy.](https://kodekloud.com/kk-media/image/upload/v1752881940/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-portal-conditional-access-policy.jpg)

### 4\. Configure Users and Target Resources

- Under **Users and Groups**, select the user(s) for whom the policy should apply; in this example, select Abigail’s account.
- Under **Target Resources**, click **Select** and choose the resource to protect—in this case, the Azure portal (Azure management).> [!important]
  > **Warning**
  >
  > Make sure not to lock yourself out. Always ensure an alternative access method is available.

![The image shows a Microsoft Azure portal screen for creating a new Conditional Access policy. It includes options for naming the policy, assigning users, and selecting conditions and access controls.](https://kodekloud.com/kk-media/image/upload/v1752881941/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-portal-conditional-access-policy-2.jpg)

### 5\. Specify Conditions (Optional)

While you have the option to configure conditions such as user risk, sign-in risk, device platforms, and locations, in this example, access is blocked regardless of these signals.

![The image shows a Microsoft Azure Conditional Access policy configuration screen, where a new policy named "Block-Abigail-AzPortal" is being set up with options for device platforms and other conditions.](https://kodekloud.com/kk-media/image/upload/v1752881942/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-conditional-access-policy-setup.jpg)

### 6\. Define Access Controls

Under **Grant**, select **Block access**. While other options include requiring MFA or ensuring device compliance, this example uses a simple block access configuration.

### 7\. Enable and Create the Policy

By default, the policy is set to **Report only**. Set it to **On** to enforce the policy immediately, then click **Create**.

![The image shows the Microsoft Azure Conditional Access overview page, featuring options to create new policies, view insights, and manage existing policies.](https://kodekloud.com/kk-media/image/upload/v1752881943/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-portal-conditional-access-overview.jpg)

## Configuring Named Locations

Azure AD Conditional Access allows you to define trusted locations for added security:

- Go to **Named Locations**.
- Add the countries you trust (e.g., India, United States) and configure specific IP ranges if needed.

These trusted locations can later be referenced in policies to restrict or allow access based on geographical criteria.

![The image shows a Microsoft Azure portal interface for configuring conditional access named locations, with options to select countries and determine location by IP address. A sidebar lists various countries for selection.](https://kodekloud.com/kk-media/image/upload/v1752881945/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-portal-conditional-access-locations.jpg)

When configuring a policy, include these trusted locations to ensure that access is granted only from approved regions.

![The image shows a Microsoft Azure Conditional Access policy configuration screen, where a user is setting up access controls and selecting trusted locations.](https://kodekloud.com/kk-media/image/upload/v1752881946/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Azure-AD-conditional-access/azure-conditional-access-policy-configuration.jpg)

## Testing and Troubleshooting the Policy

After setting up the policy:

- Open a new incognito window and navigate to [portal.azure.com](https://portal.azure.com) again.
- If the sign-in is successful but access is denied, you will receive a message indicating that your credentials are correct but you do not have permission to access the resource.

For troubleshooting:

- Click on the message for more details. The sign-in logs display both successful and failed attempts.
- Failed sign-in attempts will indicate that access has been blocked by a Conditional Access policy (e.g., “Access has been locked by a conditional access policy. This policy does not allow token issuance.”).
- Use the **What-if** tool under Conditional Access policies to simulate sign-in scenarios using user, device, and location details to see if the policy would trigger.

## Conclusion

This lesson has provided an in-depth overview of Azure AD Conditional Access by detailing its core components, benefits, and step-by-step instructions to set up a policy within the Azure portal. By implementing these policies, you strengthen your security posture by verifying user identities, enforcing multi-factor authentication when needed, and blocking access under risky conditions.

Further content will cover access reviews.

For additional guidance, consider reviewing the following resources:

- [Azure Active Directory Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- [Conditional Access Overview](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d856cd5d-a782-4723-82b7-5a6e69cba71d/lesson/2054c2d2-90a7-4261-98ed-f499287bd97f)**
>
> Watch video content
