# Billing 2FA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/Billing-2FA)

---

## Table of Contents

- Billing 2FA
  - Navigating to the Billing Dashboard
  - Setting Up a Budget
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# Billing 2FA

In this guide, we detail how to set up a budget in your AWS account to manage your spending effectively. Establishing a budget not only helps you avoid unexpected charges but also triggers email alerts when your spending nears or exceeds defined limits. This way, you can proactively adjust your AWS services and avoid incurring undesired costs.

## Navigating to the Billing Dashboard

To begin, log in to your AWS console. Locate your account name in the top right corner and select it to access the billing dashboard. This dashboard is your central hub for reviewing payment methods, past invoices, previous monthly payments, and real-time estimates of your current month’s spend. In a new AWS account, the dashboard might initially appear empty; however, as you begin using AWS resources, various fields, columns, and charts will populate with your financial data.

## Setting Up a Budget

Follow these steps to create a budget:

1.  In the billing dashboard, navigate to the budget section.
2.  Click on **Create a budget**.

When creating a budget, you will be prompted to select a template that best fits your needs. AWS offers built-in templates, such as:

- **Zero Spend Budget:** This template monitors your free tier usage and triggers an alert immediately if your spending exceeds $0.
- **Monthly Cost Budget:** This budget helps you manage a specific monthly dollar amount (for example, $100 per month). An alert will be triggered once your cost exceeds this specified threshold.

> [!important]
> **Tip**
>
> For this demonstration, we will use the _Monthly Cost Budget_ template with a set budget of $10.

Enter a descriptive name for your budget (e.g., "Monthly Budget $10") and provide the email address where you would like to receive notifications. AWS sends alerts at milestones such as 85% and 100% of your budget, and also if the forecasted spend is expected to reach 100% of your budget. This proactive alert mechanism is key to preventing overages.

![The image shows the AWS Billing Management Console, specifically the "Choose budget type" section, where users can select budget templates like "Zero spend budget" or "Monthly cost budget."](https://kodekloud.com/kk-media/image/upload/v1752858149/notes-assets/images/AWS-Certified-Developer-Associate-Billing-2FA/aws-billing-management-console-budget-types.jpg)

After entering the necessary details, click **Create Budget** to finalize the process. Your newly created budget is now visible in the billing console, and you can revisit or modify its settings at any time by selecting **Edit**.

![The image shows an AWS Billing Management Console screen where a user is setting up a monthly cost budget with a budgeted amount of $10 and an email recipient for notifications.](https://kodekloud.com/kk-media/image/upload/v1752858150/notes-assets/images/AWS-Certified-Developer-Associate-Billing-2FA/aws-billing-management-budget-setup.jpg)

> [!important]
> **Summary**
>
> AWS notifies you in three scenarios:
>
> - When your actual spend reaches 85% of your budget.
> - When it hits 100% of your budget.
> - When the forecasted spend is expected to hit 100% of your budget. This system helps ensure that you remain in control of your AWS spending.

You can review your budget details at any time on the billing dashboard. Should you need to make any adjustments, simply click **Edit** and update the relevant settings.

![The image shows an AWS Billing Management Console screen displaying details of a budget named "MonthlyBudget10" with a budget amount of $10.00 and no current spending.](https://kodekloud.com/kk-media/image/upload/v1752858151/notes-assets/images/AWS-Certified-Developer-Associate-Billing-2FA/aws-billing-monthlybudget10-details.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/f2a805f2-2969-4d82-a242-34eec91f36d5)**
>
> Watch video content
