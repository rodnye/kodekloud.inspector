# Factors Affecting Cost - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Cost-Management/Factors-Affecting-Cost)

---

## Table of Contents

- Factors Affecting Cost
  - 1. Type of Resource
  - 2. Consumption Model
  - 3. Lack of Maintenance
  - 4. Region
  - 5. Ingress and Egress
  - 6. Subscription Type
  - Conclusion
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Cost Management

# Factors Affecting Cost

Welcome to the first topic in our cost management series. In this module, we explore the key factors that influence the cost of deploying resources on Azure. Bella Innovation, for example, applies lessons from previous modules to determine the necessary resources and best solutions for hosting their applications. Now, the focus shifts to evaluating which cost factors are most critical, particularly for multi-region deployments. In Azure, cost management centers around six primary factors: type of resource, consumption model, maintenance practices, region, ingress and egress, and subscription type. Let’s dive into each factor for a clearer understanding.

## 1\. Type of Resource

Just as different models of cars come with distinct price tags, each Azure service or asset is billed based on its specific attributes and consumption metrics. For example:

- **Virtual Machines:** Billed based on the number of hours your VM is running.
- **Storage Accounts:** Costs depend on the number of operations and the volume of data stored.
- **Compute Solutions:** Similar services, such as container instances versus container apps, use distinct billing metering methods due to differing scaling mechanisms.

Every Azure service is associated with its own billing meter, ensuring that costs reflect the unique characteristics of the resource.

## 2\. Consumption Model

Azure’s pay-as-you-go model directly ties resource usage to cost. Running a Virtual Machine continuously for roughly 730 hours in a month incurs the full monthly cost, while using it only a few hours each day results in lower charges. This model emphasizes that increased usage leads to increased cost.

![The image illustrates a "Consumption Model" with a focus on a "Pay-as-you-go model," highlighting cost as the primary factor.](https://kodekloud.com/kk-media/image/upload/v1752868338/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Factors-Affecting-Cost/consumption-model-pay-as-you-go.jpg)

## 3\. Lack of Maintenance

Proper management and regular maintenance of your Azure environment are essential to avoid unnecessary expenses. Without periodic monitoring, resources that are no longer needed—like forgotten Virtual Machines—can continue incurring charges. Establishing a routine for auditing and decommissioning unused resources can help significantly reduce costs.

> [!important]
> **Maintenance Tip**
>
> Regularly review your deployed resources to ensure you are not paying for unused or underutilized services.

![The image illustrates a concept titled "Lack of Maintenance," highlighting the importance of regular surveillance, Azure usage, and proactive system management for expense discovery and reduction.](https://kodekloud.com/kk-media/image/upload/v1752868339/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Factors-Affecting-Cost/lack-of-maintenance-azure-management.jpg)

## 4\. Region

The geographic location of your deployed resources has a direct impact on pricing. For example, running the same service in East US might differ in cost compared to West Europe. Choosing the right region involves weighing both performance requirements and cost implications to optimize your Azure spending.

![The image shows a world map with dollar symbols in different regions, illustrating how location impacts Azure pricing. On the left, there are gear icons labeled "Type of Resource."](https://kodekloud.com/kk-media/image/upload/v1752868339/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Factors-Affecting-Cost/world-map-azure-pricing-gears.jpg)

## 5\. Ingress and Egress

Data transfer costs, including ingress (incoming data) and egress (outgoing data), also influence your overall expenditure. Ingress is typically free—comparable to receiving mail without any charge as long as you have an address—while egress incurs fees based on the amount of data transferred and its destination, much like postage charges determined by weight and distance. Azure manages these costs through its billing zones.

![The image illustrates the concepts of ingress (incoming data transfer) and egress (outgoing data transfer) with symbols indicating no cost for ingress and a cost for egress, using the Azure logo.](https://kodekloud.com/kk-media/image/upload/v1752868340/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Factors-Affecting-Cost/ingress-egress-azure-illustration.jpg)

## 6\. Subscription Type

Choosing the right Azure subscription is akin to selecting the most suitable membership plan. Subscription types vary in pricing based on your usage and benefits. Here are some common subscription models:

- **Pay-As-You-Go Subscription:** Standard pricing with costs proportional to usage.
- **MSDN Subscription:** Offers additional benefits for Visual Studio subscribers.
- **Free Trial:** Provides initial credits (usually $200) for early consumption.
- **Azure for Students:** Grants free access along with credits for eligible students.
- **DevTest Subscriptions:** Tailored for development and testing environments, these subscriptions often come at a lower cost compared to production services.

![The image shows different types of subscriptions, including PAYG, MSDN, Free Trial, Azure for Students, and Dev/Test Type, with a focus on discount rates.](https://kodekloud.com/kk-media/image/upload/v1752868341/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Factors-Affecting-Cost/subscription-types-discount-rates.jpg)

## Conclusion

Understanding these six critical factors—resource type, consumption model, maintenance practices, region, ingress and egress, and subscription type—is vital for effectively managing and forecasting Azure costs. By aligning your resource usage with these factors, you can ensure your cloud spending remains efficient and controlled.

Stay tuned for more insights as we continue to explore best practices in Azure cost management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/e35bb215-c8ca-410f-815d-5f59659dc9ce/lesson/db872cc7-bef6-420d-90ee-6adccdcc30c9)**
>
> Watch video content
