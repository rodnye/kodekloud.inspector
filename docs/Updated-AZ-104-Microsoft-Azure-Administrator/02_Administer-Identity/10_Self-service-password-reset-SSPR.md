# Self service password reset SSPR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Self-service-password-reset-SSPR)

---

## Table of Contents

- Self service password reset SSPR
  - Configuring SSPR in Azure
  - Testing the SSPR Setup
  - Updating Your Security Information
  - Resetting a Forgotten Password
  - Multi-Tenant Environments
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Self service password reset SSPR

Self-Service Password Reset (SSPR) offers a secure, streamlined approach to managing your passwords without having to rely on IT support. Instead of waiting on hold every time you forget your password, SSPR empowers you to reset it independently with just a few clicks—saving time and reducing frustration.

Many of us have experienced the hassle of contacting IT support and enduring long wait times just to reset a password. With SSPR, you can bypass these delays by choosing from multiple authentication methods such as email, phone, or mobile app verification. The process is similar to resetting your internet banking password: click "Forgot Password," complete a verification step (using a one-time code or answering security questions), and reset your password securely.

> [!important]
> **Note**
>
> In Azure, SSPR is available as a premium feature requiring a P2 license. However, administrators have SSPR enabled by default for their accounts. This feature can be applied organization-wide or targeted to specific groups for added flexibility.

Getting started with SSPR involves the following steps:

1.  **Enable SSPR** – Choose to enable the feature for all users or selected groups.
2.  **Configure Authentication Methods** – Set up the required authentication methods for password reset.
3.  **User Registration Prompt** – Ensure users are prompted to register their reset methods at their next sign-in.

![The image is an infographic about Self-Service Password Reset (SSPR) in Microsoft Azure, explaining its features, requirements, and setup steps. It includes a screenshot of the Azure interface for configuring authentication methods.](https://kodekloud.com/kk-media/image/upload/v1752884598/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/self-service-password-reset-azure-infographic.jpg)

---

## Configuring SSPR in Azure

To configure SSPR in the Azure portal, follow these steps:

1.  **Access the SSPR Feature**  
    Sign in to the Azure portal and navigate to Microsoft Entra ID. You can access SSPR via the password reset blade or through the user's blade. Note that while SSPR is typically disabled for users by default, it is enabled automatically for administrators.
2.  **Select Targeted Groups**  
    In our configuration example, we select the "Selected" option and target a specific group (such as the Avengers group created previously). After choosing the group, click **Save** to establish a password reset policy for that group.
3.  **Configure Authentication Methods**  
    Decide on the number of authentication methods required to reset a password. In our example, we require only one method, the mobile app code. This setting requires users to verify the reset process using an authenticator app. Remember to click **Save** after making any changes.
4.  **Enforce Registration Settings**  
    Under the registration settings, you can enforce SSPR registration. By default, users are prompted to register for SSPR at their next sign-in if they haven't already done so. You also have the option to configure how frequently users need to reconfirm their authentication information (in days) to keep their details up to date.

![The image shows a Microsoft Azure portal page for password reset registration settings, where users can configure options like requiring registration upon sign-in and setting the number of days before users must reconfirm their authentication information.](https://kodekloud.com/kk-media/image/upload/v1752884600/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/azure-password-reset-registration-settings.jpg)

After configuring these settings, your SSPR setup is complete.

---

## Testing the SSPR Setup

To ensure your SSPR configuration works as expected:

1.  **Sign Out and Sign In**  
    Log out of a user account (for example, an account named Iron Man) and sign in again. You should see a prompt stating, "Your organization needs more information to keep your account secure." This indicates that some required password reset information is missing and triggers the registration process.
2.  **Proceed with Registration**  
    Click **Next** when prompted.

![The image shows a Microsoft Azure login screen requesting more information to secure an account, with a "Next" button highlighted.](https://kodekloud.com/kk-media/image/upload/v1752884601/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/azure-login-screen-secure-account.jpg)

3.  **Set Up the Microsoft Authenticator App**  
    The process will guide you to download and set up the Microsoft Authenticator app. Follow the instructions by scanning the provided QR code and verifying the setup with a six-digit code.

    Click **Next** to continue with the Authenticator setup.

![The image shows a Microsoft Authenticator setup page prompting the user to download the app to keep their account secure. There is a "Next" button and an option to skip the setup.](https://kodekloud.com/kk-media/image/upload/v1752884602/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/microsoft-authenticator-setup-page.jpg)

4.  **Scan the QR Code**  
    Use your phone to scan the QR code presented on the screen.

![The image shows a Microsoft Authenticator setup page with a QR code for scanning, and options to go back or skip the setup.](https://kodekloud.com/kk-media/image/upload/v1752884603/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/microsoft-authenticator-setup-qr-code.jpg)

5.  **Enter the Verification Code**  
    After scanning, enter the six-digit code (e.g., 278382) displayed on your screen and click **Next**. This confirms that SSPR is configured correctly.
6.  **Finalize Setup**  
    A confirmation screen will appear once the security information has been successfully registered.

![The image shows a confirmation screen indicating successful setup of security information using an authenticator app. A message at the top confirms the registration of the app.](https://kodekloud.com/kk-media/image/upload/v1752884604/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/security-setup-confirmation-authenticator.jpg)

---

## Updating Your Security Information

If you ever need to update or change your security details, navigate to [https://aka.ms/SSPRsetup](https://aka.ms/SSPRsetup). This page allows you to add, update, or delete your sign-in methods, depending on the permissions set by your administrator.

![The image shows a "Security info" page from a Microsoft account settings interface, displaying sign-in methods such as password and authenticator app. The interface includes options to change or delete these methods.](https://kodekloud.com/kk-media/image/upload/v1752884605/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/microsoft-account-security-info-page.jpg)

---

## Resetting a Forgotten Password

If a user, such as Iron Man, forgets their password, they can reset it using either of the following methods:

1.  **Via the SSPR Page**
    - Navigate to [https://aka.ms/SSPRsetup](https://aka.ms/SSPRsetup).
    - Enter your username, complete the CAPTCHA, and input the verification code from your authenticator app.

2.  **Using the "Can't access your account" Link**
    - Click on the "Can't access your account" hyperlink on the login page.
    - Choose "Work or School Account" when prompted.
    - Complete the CAPTCHA and enter the verification code.
    - Once verified, you will be prompted to set a new password.

![The image shows a Microsoft account recovery page where users are prompted to enter their email or username and solve a CAPTCHA to verify their identity.](https://kodekloud.com/kk-media/image/upload/v1752884606/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Self-service-password-reset-SSPR/microsoft-account-recovery-captcha.jpg)

This process provides a secure and efficient method for password recovery.

---

## Multi-Tenant Environments

The procedures described above apply primarily to single-tenant environments (e.g., a single instance of Microsoft Entra ID). In multi-tenant environments, the same principles apply, though additional considerations for managing and delegating SSPR across different tenants are necessary.

---

In conclusion, SSPR is a critical tool for ensuring that password recovery is both efficient and secure, minimizing the need for IT intervention. By following the configured steps in the Azure portal, users can easily manage and reset their passwords, ensuring continuous access to essential services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/7d734330-1593-45a8-bbf8-8a14f6f4ef93)**
>
> Watch video content
