# Bulk Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Bulk-Operations)

---

## Table of Contents

- Bulk Operations
  - Accessing Bulk Operations in Microsoft Entra ID
  - Using Bulk Create
  - Using Bulk Invite
  - Using Bulk Delete
  - Invitation Email Preview
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Bulk Operations

Efficiency in user management is essential for maintaining a secure and agile IT environment. This guide covers the key bulk operations available in Microsoft Entra ID that streamline administrative tasks by managing multiple user accounts simultaneously. Instead of processing user additions, deletions, or invitations one at a time, bulk operations let you handle them in large groups, cutting down on manual effort and reducing the risk of errors.

Below are the available bulk operations:

- **Bulk Create:** Upload a CSV file to rapidly add multiple new users to your directory. This is ideal for onboarding large groups of employees, ensuring a smooth setup from day one.
- **Bulk Invite:** Easily invite external users such as contractors, vendors, or partners. This feature sends an invitation, enabling users to sign in using either their existing Microsoft account or Microsoft Entra ID credentials.
- **Bulk Delete:** Remove multiple user accounts at once to keep your directory updated. This helps maintain an active directory with only current and relevant user accounts.
- **Download Users:** Export user data for reporting, auditing, or archival needs to promote transparency and effective record keeping.

Bulk operations not only increase efficiency but also minimize errors compared to repetitive manual entries. They are indispensable tools for administrators looking to optimize workflows in Microsoft Entra ID.

---

## Accessing Bulk Operations in Microsoft Entra ID

After logging into Microsoft Entra ID, go to the **Users** section. At the top of the page, you will find options for bulk operations including Bulk Create, Bulk Invite, and Bulk Delete. With recent updates, the Download Users option is also available here.

---

## Using Bulk Create

Start by selecting the Bulk Create option from the dropdown menu and download the CSV template provided.

![The image shows a Microsoft Azure portal interface displaying a list of users with details such as display names, user principal names, and user types. A dropdown menu for bulk operations is open, highlighting options like "Bulk create."](https://kodekloud.com/kk-media/image/upload/v1752884572/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Bulk-Operations/azure-portal-user-list-dropdown.jpg)

Open the downloaded CSV file in Microsoft Excel. The template includes one required field and several optional fields for additional user details. The screenshot below displays an example entry with columns for name, username, password, and job title.

![The image shows an Excel spreadsheet with columns for user information such as name, username, password, and job title. There is an example entry in the first row.](https://kodekloud.com/kk-media/image/upload/v1752884573/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Bulk-Operations/excel-user-information-spreadsheet.jpg)

For instance, fill in the required field with your domain name and enter a generated password (or any secure, random string) for the new user accounts. In this example, entries for "Captain America" and "Loki" were included using the same password for both users. After populating the CSV with the necessary details for all users, save the file to your computer.

Next, return to the Azure Portal and upload your CSV file by selecting the appropriate option. Once the file is uploaded successfully, click on **Submit**. Monitor the progress in the Bulk Operation Results section, which shows detailed status information for each account creation.

![The image shows a Microsoft Azure portal page displaying the results of a bulk user creation operation, with three users successfully created.](https://kodekloud.com/kk-media/image/upload/v1752884574/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Bulk-Operations/azure-portal-bulk-user-creation.jpg)

Finally, navigate to the **All Users** blade to verify that your new accounts have been added. While this guide uses an example with three users, this process can easily scale to hundreds of users.

---

## Using Bulk Invite

Bulk Invite follows a similar process to Bulk Create but simplifies user inclusion by eliminating the need for a password. Instead, invited users can sign in with their existing Microsoft account or Microsoft Entra ID credentials. The CSV template for Bulk Invite requires only the email address for each user and an optional redirection URL.

After uploading your invitation CSV file, the system sends an invitation email to each address. Users with an existing Microsoft account can use their current password; new users can register during the invitation process. Administrators also have the option to customize the invitation message or manually copy the invitation link if required—for example, when users do not have an Exchange license.

> [!important]
> **Note**
>
> Take advantage of the Bulk Invite feature to reduce onboarding times for external partners and ensure secure access to your tenant.

---

## Using Bulk Delete

Bulk Delete lets you efficiently remove multiple user accounts. To use this feature, download the CSV template provided for deletion, which requires only the User Principal Name (UPN) for each account you intend to delete.

For example, if you need to delete the users created earlier, copy their UPNs from the Bulk Create CSV file into the Bulk Delete template, save the file, and then upload it to the portal. After confirming the deletion prompt, click **Submit**.

Review the results of the bulk deletion in the Bulk Operation Results section. The screenshot below confirms that the deletion operation was completed successfully with three successful requests.

![The image shows the "Bulk operation results" page in Microsoft Azure, displaying the status of user creation and deletion operations, both completed successfully without errors.](https://kodekloud.com/kk-media/image/upload/v1752884575/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Bulk-Operations/bulk-operation-results-azure.jpg)

Then, inspect the **Users** section or the **Deleted Users** blade to verify that the specified accounts have been removed.

---

## Invitation Email Preview

The invitation email sent out during a Bulk Invite includes your organization’s name, tenant information, and an option for the user to accept the invitation. Once a user clicks **Accept Invitation**, they gain access to your tenant.

---

With these streamlined steps, you are now equipped to manage bulk operations in Microsoft Entra ID effectively. Up next, we will explore best practices for Group Account management. Explore more detailed guides at [Microsoft Entra ID documentation](https://docs.microsoft.com/entra-id).

Happy managing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/9638b0c2-d4bd-4acd-9516-209a9c4a30fe)**
>
> Watch video content
