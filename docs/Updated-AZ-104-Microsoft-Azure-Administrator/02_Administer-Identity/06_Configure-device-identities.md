# Configure device identities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Configure-device-identities)

---

## Table of Contents

- Configure device identities
  - Registered Devices
  - Joined Devices
  - Hybrid Joined Devices
  - Viewing Devices in the Azure Portal
  - Joining a Device to Microsoft Entra ID
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Configure device identities

In this guide, we explain how to configure device identities in Microsoft Entra ID—a critical aspect of modern IT management. Although configuring device identities is optional for the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) exam, previous versions included it for users interested in advanced device management topics.

In today’s modern workspace, managing device identities improves security and productivity. Microsoft Entra ID supports several types of device identities, each tailored to different organizational needs. Let’s explore the three main types:

## Registered Devices

Registered Devices are primarily personal devices, such as smartphones or tablets, that users add to Microsoft Entra ID. These devices enable convenient access to organizational resources like emails and documents and support a bring-your-own-device (BYOD) strategy. Managed via Microsoft Intune, Registered Devices support various operating systems, including Windows 10, iOS, Android, and macOS.

## Joined Devices

Joined Devices are company-owned devices that are exclusively intended for work. They are directly joined to Microsoft Entra ID and require a company account for sign-in. By leveraging cloud-driven security features such as Conditional Access, these devices are ideal for cloud-centric organizations. Joined Devices are mainly compatible with Windows 10 and later operating systems.

![The image illustrates three types of device identities: Registered Devices, Joined Devices, and Hybrid Joined Devices, with diagrams and a list of features for cloud-centric organizations.](https://kodekloud.com/kk-media/image/upload/v1752884576/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/device-identities-diagram-cloud-features.jpg)

## Hybrid Joined Devices

Hybrid Joined Devices serve organizations that blend cloud services with on-premises infrastructure. These devices are joined to both the local Active Directory and Microsoft Entra ID. This dual configuration supports environments that rely on legacy desktop applications and Group Policy management, and it is compatible with Windows 7 and later versions. Hybrid Joined Devices enable the deployment of preconfigured system images along with seamless integration.

![The image illustrates three types of device identities: Registered Devices, Joined Devices, and Hybrid Joined Devices, with diagrams and a list of features for hybrid joined devices.](https://kodekloud.com/kk-media/image/upload/v1752884577/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/device-identities-registered-joined-hybrid.jpg)

Each device identity configuration offers unique benefits:

- **Registered Devices:** Flexibility with personal devices.
- **Joined Devices:** Enhanced security for company-owned machines.
- **Hybrid Joined Devices:** Seamless integration for mixed on-premises and cloud environments.

Selecting the optimal configuration is a strategic decision that can significantly boost both organizational productivity and security.

## Viewing Devices in the Azure Portal

To view the configured devices, sign in to the Azure Portal and navigate to Microsoft Entra ID. Then select Devices to see the list of devices in your environment.

In a demo environment, you may only notice a few unmanaged devices. These devices appear as unmanaged because they are not controlled by a device management solution like Intune, though they remain Entra-joined machines.

![The image shows a Microsoft Azure portal interface displaying a list of devices, including details such as device name, OS version, join type, and registration date.](https://kodekloud.com/kk-media/image/upload/v1752884578/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/azure-portal-device-list-interface.jpg)

When devices are created as work or school account machines, they display as Microsoft Entra ID Joined devices. For example, if you join your personal phone, it appears as a Registered Device since it is added as a personal device.

By clicking on a device in the Azure Portal, you can view detailed information such as the user principal name of the owner.

![The image shows a Microsoft Azure portal interface displaying the properties of a device named "DESKTOP-R1A05D7," including details like device ID, OS, version, and user principal name.](https://kodekloud.com/kk-media/image/upload/v1752884579/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/azure-portal-device-properties-desktop.jpg)

> [!important]
> **Note**
>
> The Mobile Device Management (MDM) field may show "none," indicating that the device is unmanaged. To test device joining, you can use a Windows 10 or Windows 11 machine.

![The image shows a Microsoft Azure portal dashboard for device management, displaying alerts and statistics about stale, noncompliant, and unmanaged devices. It also includes navigation options and feature highlights related to device settings and troubleshooting.](https://kodekloud.com/kk-media/image/upload/v1752884580/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/azure-portal-device-management-dashboard.jpg)

## Joining a Device to Microsoft Entra ID

Follow these steps to join a device to Microsoft Entra ID:

1.  Open Windows Settings.
2.  Navigate to Accounts and select Access work or school.
3.  Connect your work or school account to Microsoft Entra ID. (Note: You might also see Azure AD referenced interchangeably.)
4.  Enter your work or school email address when prompted, which redirects you to the sign-in page.

![The image shows a Windows settings screen for setting up a work or school account, with a field to enter an email address. The left sidebar displays various settings options like System, Bluetooth & devices, and Accounts.](https://kodekloud.com/kk-media/image/upload/v1752884581/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configure-device-identities/windows-settings-work-school-account.jpg)

After signing in, if the device is not connected already, it will be joined to Microsoft Entra ID automatically.

## Conclusion

In this article, we explored the different types of device identity configurations supported in Microsoft Entra ID and demonstrated how to view and manage these devices using the Azure Portal. Configuring device identities strengthens secure access management—whether you are leveraging personal devices, dedicated work machines, or hybrid setups.

We will continue our exploration by covering effective strategies for managing user and group accounts within Microsoft Entra ID.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/723a0bf2-fa70-4323-9bdf-d1e2599585dd)**
>
> Watch video content
