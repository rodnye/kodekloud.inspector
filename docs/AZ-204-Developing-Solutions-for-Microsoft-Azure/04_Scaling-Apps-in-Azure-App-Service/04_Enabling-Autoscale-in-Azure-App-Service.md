# Enabling Autoscale in Azure App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Scaling-Apps-in-Azure-App-Service/Enabling-Autoscale-in-Azure-App-Service)

---

## Table of Contents

- Enabling Autoscale in Azure App Service
  - 1. Enable Autoscaling
  - 2. Configuring Autoscale in the Azure Portal
  - 3. Creating an Autoscale Rule
  - 4. Validating Autoscale Functionality
  - 5. Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Scaling Apps in Azure App Service

# Enabling Autoscale in Azure App Service

In this guide, you will learn how to enable and configure autoscaling for your Azure App Service. Autoscaling allows Azure to automatically adjust the number of application instances based on predefined conditions—ensuring optimal performance while managing costs effectively.

Below, we outline the essential steps to set up autoscaling.

---

## 1\. Enable Autoscaling

Begin by enabling the autoscale feature in the Azure portal. Doing so allows Azure to dynamically adjust the number of instances based on your specified conditions.

First, define the conditions that trigger scaling actions. For example, you might set the system to scale out when CPU usage exceeds a certain threshold or when memory usage becomes high. Clear conditions empower Azure to accurately decide when to scale your application.

Next, establish the scale rules. These rules dictate when and how many instances to add or remove. For instance, you could define a rule to add two instances if CPU usage exceeds 80% and remove one instance if usage drops below 60%. Together, these rules ensure your application scales appropriately based on real-time usage.

Finally, continuously monitor autoscale events and metrics to ensure your configuration is performing as expected. This ongoing observation will allow you to fine-tune your conditions and rules for further optimization.

![The image outlines four steps for enabling autoscale in Azure App Service: enabling autoscaling, adding scale conditions, creating scale rules, and monitoring autoscaling activity.](https://kodekloud.com/kk-media/image/upload/v1752866746/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Enabling-Autoscale-in-Azure-App-Service/azure-app-service-autoscale-steps.jpg)

---

## 2\. Configuring Autoscale in the Azure Portal

Follow these steps to navigate the Azure Portal and configure autoscale settings for your App Service:

1.  **Navigating to the App Service:**  
    Open the Azure Portal and select your Azure App Service. Remember, if your service is on a Basic plan, the autoscale feature is not available.
2.  **Reviewing Current Scale-Out Settings:**  
    In a Basic plan (e.g., B1), you might see:
    - Maximum instance count: 3
    - Current instance count: 1

    In this scenario, only manual scaling through a slider is available, and rule-based autoscaling is not enabled. Upgrading your plan is necessary to access autoscaling features.

3.  **Upgrading the Plan:**  
    Go to the Scale-Up section and upgrade your plan to Standard (e.g., S1, Standard One). After upgrading, return to the Scale-Out section. Although a basic automatic scaling feature based on traffic might be available, rule-based autoscaling requires a Premium V2 or Premium V3 plan.

    > [!important]
    > **Warning**
    >
    > Ensure you upgrade your plan to Premium V2 or Premium V3 to enable rule-based autoscaling.

4.  **Setting Up Rule-Based Autoscale:**  
    Click on the "Configure" button to start setting up autoscale settings. Select "Custom autoscale" and provide a descriptive name—such as "High Request Autoscale"—for easier management. A default condition will be created, which can be modified or supplemented with additional rules to meet your application's needs.

    ![The image shows a Microsoft Azure portal interface for configuring autoscale settings. It includes options for manual and custom autoscale, with a focus on setting rules based on CPU percentage metrics.](https://kodekloud.com/kk-media/image/upload/v1752866748/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Enabling-Autoscale-in-Azure-App-Service/azure-portal-autoscale-settings.jpg)

---

## 3\. Creating an Autoscale Rule

Creating an effective autoscale rule involves the following steps:

1.  **Define a Descriptive Rule Name:**  
    For clarity, name the rule something like "High Request Greater Than 1,000" to clearly indicate its purpose.
2.  **Add a Scaling Rule Based on a Metric:**  
    Click on "Add a Rule". In this configuration, choose a metric such as CPU percentage for scaling. Under normal conditions, CPU usage might average around 7-10%.
3.  **Specify the Scaling Condition:**  
    Configure the rule so that if CPU usage exceeds 70% for five minutes, the system scales out by increasing the instance count by one. Additionally, set a cooldown period (for example, five minutes) to avoid rapid, successive scaling actions.
4.  **Adding a Scale-In Rule:**  
    Add another rule to scale in when necessary. For example, if the CPU usage drops below 10% for five minutes, the instance count can be decreased or reset to one, based on your requirements.

    ![The image shows a configuration screen for setting up autoscaling rules in a cloud service platform. It includes options for scaling based on CPU percentage metrics and setting thresholds for scaling actions.](https://kodekloud.com/kk-media/image/upload/v1752866749/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Enabling-Autoscale-in-Azure-App-Service/autoscaling-rules-configuration-screen.jpg)

5.  **Configuring Scheduled Scaling:**  
    You can also set scheduling rules, such as running 10 instances over the weekend. Note that instance limits must be adjusted accordingly; for example, if the minimum, maximum, and default are all set to one, scaling will not occur. Adjust the maximum instance count (e.g., set it to 3) to enable autoscaling.
6.  **Saving the Configuration:**  
    After defining all rules and conditions, click "Save" to apply your settings.

    ![The image shows the "Autoscale setting" page in Microsoft Azure, where scaling rules and instance limits are configured for an app service plan. It includes options for scaling based on CPU percentage and a weekend schedule for specific instance counts.](https://kodekloud.com/kk-media/image/upload/v1752866750/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Enabling-Autoscale-in-Azure-App-Service/azure-autoscale-settings-page.jpg)

---

## 4\. Validating Autoscale Functionality

Ensure your autoscale configuration is working correctly by following these steps:

1.  **Load Testing:**  
    Use Azure Load Testing to simulate high traffic on your App Service. Create a test that sends numerous requests to your application. As the load increases and CPU percentage exceeds the 70% threshold, verify that additional instances are added as per your autoscale rules.
2.  **Monitoring Autoscale Events:**  
    While the test is running, observe key metrics like requests per second. For example, if your service receives 521 requests per second, the autoscale configuration should trigger an increase in CPU load and subsequently add an extra instance. Monitor the "Run History" to review autoscale events. The cooldown period will prevent further scaling until its duration (e.g., five minutes) has elapsed.

    ![The image shows a Microsoft Azure Load Testing dashboard displaying metrics such as virtual users, response time, and requests per second for a test run.](https://kodekloud.com/kk-media/image/upload/v1752866752/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Enabling-Autoscale-in-Azure-App-Service/azure-load-testing-dashboard-metrics.jpg)

After confirming that the instance count increases, allow sufficient time for the cooldown period to end, which might trigger additional scaling actions up to the predefined maximum.

---

## 5\. Conclusion

In summary, this guide demonstrated how autoscale works in Azure App Service by covering the following key points:

- Enabling the autoscale feature in the Azure portal.
- Configuring scale conditions and rules based on critical application metrics.
- Validating autoscale functionality using Azure Load Testing.

By following these steps, you can ensure that your application automatically scales to meet fluctuating demands—maximizing performance and cost efficiency.

Happy scaling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/96ea47e7-884e-4ffd-ba77-303a9276bc31/lesson/1316a6de-f098-4cfa-9964-311575b78f4d)**
>
> Watch video content
