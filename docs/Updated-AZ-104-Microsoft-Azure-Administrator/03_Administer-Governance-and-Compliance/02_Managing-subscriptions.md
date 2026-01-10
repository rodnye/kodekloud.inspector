# Managing subscriptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Managing-subscriptions)

---

## Table of Contents

- Managing subscriptions
  - Subscription Offer Types
  - Navigating Subscriptions in the Azure Portal
  - Watch Video
    - Enterprise Agreements
    - Pay-As-You-Go
    - Cloud Solution Provider (CSP)
    - Free Trial
    - Azure for Students
    - Visual Studio Subscription

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Managing subscriptions

Imagine a library with thousands of books where your library card helps you track what you have read and what you owe. In Microsoft Azure, subscriptions work like that library card in the cloud. They help you manage, organize, and monitor your resources effectively.

Azure Subscriptions are logical containers that not only define billing boundaries for resource usage but also establish environmental limits. This allows you to monitor consumption, maintain control over expenditure, and enforce tailored policies across your cloud resources.

> [!important]
> **Subscription Identifier**
>
> Every subscription is assigned a unique identifier, known as a subscription ID, which ensures that every transaction or service used is traceable to your account for better management and security.

Azure grants you the flexibility to have multiple subscriptions under a single account. Whether you are managing different projects or departments, each can have its own billing and policy enforcement. To sign up for an Azure subscription, you need a Microsoft Entra ID or a trusted personal Microsoft account.

The versatility of Azure Subscriptions is evident with the various types available. They can be customized to meet your specific needs—be it development, testing, production, or even training. Beyond billing, subscriptions serve as a scope for access management and policy enforcement, ensuring roles and policies can be assigned universally across all resources.

![The image is an infographic about Azure Subscriptions, highlighting features such as billing boundaries, resource mapping, environmental boundaries, unique IDs, multiple subscriptions, identity sign-up, subscription types, and access management.](https://kodekloud.com/kk-media/image/upload/v1752884552/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/azure-subscriptions-infographic-features.jpg)

Below, we explore the different subscription offer types available in Azure.

---

## Subscription Offer Types

Azure provides a variety of subscription options to cater to the needs of diverse users, from large enterprises to individual developers.

### Enterprise Agreements

Enterprise Agreements are tailored for large organizations needing comprehensive solutions with volume pricing. These agreements simplify the management of cloud services across entire enterprises by offering flexible pricing that scales with your business. Organizations often commit to a predetermined consumption level—such as $1 million, $5 million, or $10 million—paying the cost upfront.

### Pay-As-You-Go

The Pay-As-You-Go model offers maximum flexibility with no long-term commitment. You pay only for the resources you consume, allowing you to scale your usage up or down as needed while maintaining full control over your cloud spending.

### Cloud Solution Provider (CSP)

The Cloud Solution Provider (CSP) program allows businesses to partner with experts who create custom solutions. Instead of paying Microsoft directly, you purchase a subscription from a partner—often at a cost lower than the Pay-As-You-Go option—as the partner adds their own markup for the service.

### Free Trial

For new users eager to explore Azure, the Free Trial subscription provides a risk-free opportunity. This option lets you experiment with Azure’s capabilities without any initial financial commitment, making it perfect for learning and prototyping.

### Azure for Students

Azure for Students is designed to empower students by offering free access to Azure resources and credits. This subscription enables students to develop real-world skills and experiment with cloud technologies, usually verified by a student ID or an academic email address.

### Visual Studio Subscription

The Visual Studio subscription is ideal for developers, combining cloud resources with the powerful development tools of Visual Studio. Purchasing a Visual Studio Professional or Enterprise subscription includes an MSDN or Visual Studio subscription that offers a recurring monthly credit (for example, $100 or $150 depending on the license type).

![The image lists different subscription offer types: Enterprise Agreements, Pay-as-You-Go, Cloud Solution Provider, Free Trial, Azure for Students, and Visual Studio, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752884553/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/subscription-offer-types-list.jpg)

Additional subscriptions, like the DevTest offer found under Microsoft Azure Offer Details, further expand your options, varying by licenses, agreements, and specific Microsoft plans.

---

## Navigating Subscriptions in the Azure Portal

When you log into the [Azure Portal](https://portal.azure.com), you can easily view all your subscriptions. A search for “subscriptions” will display entries with details such as the offer ID, helping you identify and manage each one.

For example, consider a Visual Studio subscription that provides monthly credits for development and testing. In the portal, notifications might display an available balance of 6,000 rupees alongside the subscription details. Offer IDs, such as "62P" for platform subscriptions or "243P" for sponsorship-based subscriptions, help further distinguish them.

![The image shows a Microsoft Azure portal dashboard displaying subscription details for "MSDN Firbish RTN," including subscription ID, billing period, and cost management options. It also features charts for spending forecasts, resource costs, and Azure Defender coverage.](https://kodekloud.com/kk-media/image/upload/v1752884555/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/azure-portal-dashboard-msdn-firbish.jpg)

Some subscriptions are based on sponsorships. Searching for “Azure Pass” in the portal will quickly identify these special offers.

![The image shows a Microsoft Azure portal displaying subscription details for "Kodekloud Azure Admin - PoC 1," including subscription ID, offer details, and billing information. It also indicates that Azure Defender is not enabled for this subscription.](https://kodekloud.com/kk-media/image/upload/v1752884556/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/azure-portal-subscription-details.jpg)

Each subscription entry includes hyperlinks that provide more information on offer details and subscription management.

![The image shows a webpage listing various Microsoft Azure offers, each with an associated offer number and some with a checkmark indicating a spending limit. A cursor is pointing at the "Azure Pass Sponsorship" offer.](https://kodekloud.com/kk-media/image/upload/v1752884557/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/azure-offers-listing-checkmark.jpg)

If you wish to add a new subscription, navigate to the offer selection within the Azure Portal. The system will verify your eligibility and display the offers available to you. For instance, if you have exhausted your free trial, only alternative options like Pay-As-You-Go or Azure for Students may be available. Note that choosing Azure for Students will require university credential verification. Other offers include Pass Sponsorship, Visual Studio, Enterprise, Developer Support, and Azure in Open—a voucher-like option for recharging your Azure credits.

![The image shows a Microsoft Azure portal page where users can select offers for their subscriptions, with options like "Microsoft Partner Network" and "Azure in Open." There are buttons to check eligibility and select offers.](https://kodekloud.com/kk-media/image/upload/v1752884558/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Managing-subscriptions/azure-portal-offer-selection.jpg)

---

With a clear understanding of Azure Subscriptions and their various offer types, the next step is to focus on managing Resource Groups and Resource Limits, which further streamline resource organization and ensure operational efficiency.

For more insights on Azure resource management, consider exploring additional resources such as [Azure Documentation](https://docs.microsoft.com/azure).

Happy cloud managing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/50db585f-47cb-472b-bd18-a16c06b20b39)**
>
> Watch video content
