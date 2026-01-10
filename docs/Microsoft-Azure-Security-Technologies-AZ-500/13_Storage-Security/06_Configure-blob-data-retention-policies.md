# Configure blob data retention policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Configure-blob-data-retention-policies)

---

## Table of Contents

- Configure blob data retention policies
  - Features of Azure Blob Immutable Storage
  - Types of Immutability Mechanisms in Azure Storage
  - Implementing Immutable Storage Policies in the Azure Portal
  - Transitioning to Azure Files Authentication
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Configure blob data retention policies

Azure Blob Storage offers an advanced immutable storage feature that enables the storage of critical data in a WORM (Write Once, Read Many) format. With this capability, once data is written, it cannot be modified or deleted during a set retention period—making it ideal for regulatory and compliance scenarios. For example, financial institutions may retain transaction records for several years to meet legal mandates. After the retention period expires, retained data can be purged to optimize storage costs.

> [!important]
> **Key Benefits**
>
> • Data integrity: Ensures stored data remains unchanged.
> • Compliance: Meets regulatory and legal requirements efficiently.
> • Auditability: Enforces logging of all access or operations on the data.

## Features of Azure Blob Immutable Storage

There are two primary features of Azure Blob Immutable Storage:

1.  **Container-Level Policies**  
    Immutability policies at the container level impact every blob within the container. Once a policy is in place, any operation performed on the data is logged, creating a robust audit trail. For instance, a company may enforce a two-year retention policy on a container holding financial data, ensuring that any access or modifications are thoroughly recorded.
2.  **Policy Scope**  
    The immutability policy applies to both existing blobs and new uploads once implemented. For example, if a media company configures an immutable policy for its video container, all videos—whether uploaded before or after the policy is set—will adhere to the defined retention constraints.

In summary, Azure Blob Immutable Storage provides a reliable solution to maintain data integrity and compliance. By leveraging this feature, businesses can ensure that their critical data remains preserved and untouched according to regulatory standards.

---

## Types of Immutability Mechanisms in Azure Storage

Azure Storage offers various immutability mechanisms to safeguard your data:

- **Time-Based Retention Policies:**  
  This policy enforces a fixed period during which data in a blob container cannot be modified or deleted. For example, an organization might lock annual financial reports for one year, ensuring that the files (e.g., blob1.pdf, blob2.txt) remain unaltered.
- **Legal Holds:**  
  Legal holds prevent any modifications or deletions until they are explicitly removed, even if the time-based retention period has expired. This mechanism is particularly useful during litigation. For example, a company involved in legal proceedings can maintain documents such as blob3.doc in their original state by applying a legal hold.

Both these mechanisms ensure your business-critical information remains consistent, trustworthy, and compliant with both regulatory and legal requirements.

![The image illustrates the requirements for Azure Blob Immutable Storage, showing how data is stored in a WORM (Write Once, Read Many) format with lock time-based retention and legal hold policies, prohibiting write and delete operations.](https://kodekloud.com/kk-media/image/upload/v1752882279/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-blob-data-retention-policies/azure-blob-immutable-storage-requirements.jpg)

---

## Implementing Immutable Storage Policies in the Azure Portal

Follow these steps to configure immutability policies on your Azure Blob Storage:

1.  **Access Your Storage Account:**  
    Open the Azure Portal and navigate to the storage account you created.
2.  **Navigate to Containers:**  
    Go to the "Containers" section. You should see containers such as "images" and "$logs".

    ![The image shows a Microsoft Azure portal interface displaying storage account details, specifically the containers section with two containers named "$logs" and "images."](https://kodekloud.com/kk-media/image/upload/v1752882280/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-blob-data-retention-policies/azure-portal-storage-containers.jpg)

3.  **Select the Desired Container:**  
    Click on your selected container and choose “Access Policy” from the available options.
4.  **Configure Access Policies:**  
    In the stored access policies section, locate the immutable Blob Storage options and click “Add Policy” to create a new policy.
    - For a legal hold, you might assign a tag like “litigation” to indicate legal review, along with additional metadata such as a case number.
    - Optionally, you can configure protected append rights for block or append blobs. Setting these rights to “none” ensures the data remains immutable.

5.  **Test the Immutable Setting:**  
    When attempting to access a blob (for instance, by clicking on an image) and then trying to copy or delete it, the deletion will fail due to the enforced immutability from one or more legal holds.

    ![The image shows a Microsoft Azure portal interface displaying details of a blob named "City1.jpg" in a storage container. A notification indicates a failed attempt to delete the blob due to legal holds.](https://kodekloud.com/kk-media/image/upload/v1752882281/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-blob-data-retention-policies/azure-portal-blob-city1-failed-delete.jpg)

6.  **Modify or Delete Blobs:**  
    To change or remove a blob, you must first remove the applicable legal hold from the access policies.

For implementing a time-based retention policy:

- Click “Add Policy” and select the time-based retention option.
- Specify the retention duration (e.g., 10 days). During this period, the blob remains immutable and cannot be altered.

This process ensures that immutability is strictly maintained in your Azure Storage environment.

---

## Transitioning to Azure Files Authentication

Now that you have a clear understanding of Blob Storage immutability and Azure AD authentication, let’s explore Azure Files authentication next. Note that Azure Files does not support Azure AD authentication directly; instead, it integrates with Azure AD Domain Services or on-premises Active Directory. The next lesson will delve into the configuration process for Azure Files authentication.

---

For additional details and best practices, please refer to the [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview) and explore further resources on [Azure Security](https://learn.microsoft.com/en-us/azure/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/f0f12b01-81b0-41f0-8a5c-9130de56f8cb)**
>
> Watch video content
