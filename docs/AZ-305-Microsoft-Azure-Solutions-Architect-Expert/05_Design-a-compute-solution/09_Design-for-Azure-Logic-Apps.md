# Design for Azure Logic Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Design-for-Azure-Logic-Apps)

---

## Table of Contents

- Design for Azure Logic Apps
  - Building a Logic App in the Azure Portal
  - Conclusion
  - Watch Video
    - Step 1. Create the Logic App
    - Step 2. Configure the Email Trigger
    - Step 3. Setting Up the Microsoft Teams Action
    - Step 4. Adding Conditional Logic Based on User Response
    - Testing the Logic App

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Design for Azure Logic Apps

In this article, we explore when and how to use Azure Logic Apps to implement event-driven, low-code solutions. Azure Logic Apps is ideal for integration scenarios, offering a designer-first approach with hundreds of pre-built connectors. Unlike Azure Functions—which require code—Logic Apps lets you create powerful workflows through a visual interface, streamlining the creation of event-driven processes, especially those with short-lived durations.

To illustrate the differences between these two services, consider the following flowchart:

![The image is a flowchart from KodeKloud explaining when to use Azure Logic Apps, with examples of tasks like forwarding emails, analyzing tweets, and posting messages to Microsoft Teams.](https://kodekloud.com/kk-media/image/upload/v1752866863/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-flowchart-examples.jpg)

Logic Apps works in a manner similar to the Shortcuts App on your iPhone or iPad, where you can easily build workflows through a series of customizable steps. Although minimal coding might be needed (for tasks such as string manipulation), most of the process leverages connectors that integrate with services like OneDrive, Salesforce, Google Drive, Gmail, and many more. If needed, custom connectors can be developed using REST APIs.

Below are some common use cases for Azure Logic Apps:

- Automatically forward emails in Office 365 to a designated user.
- Save email attachments directly to OneDrive for Business.
- Analyze tweet sentiments using Text Analytics and notify customer service based on the results.
- Post messages to Microsoft Teams channels.
- Set out-of-office emails automatically on weekends, ensuring timely responses even when manual activation is missed.

> [!important]
> **Note**
>
> If you have previously used Power Automate Flow, you will find many similarities in the available connectors and workflow processes.

Let's compare the two Azure services at a high level:

- **Azure Functions:** Employs a code-first strategy, enabling custom workflows using languages like PowerShell, .NET, or Python.
- **Azure Logic Apps:** Uses a designer-first strategy with a visual interface (Logic Apps Designer) and pre-built actions, reducing the need for manual coding.

![The image is a comparison between Azure Functions and Azure Logic Apps, highlighting a code-first approach for Azure Functions and a designer-first approach for Azure Logic Apps.](https://kodekloud.com/kk-media/image/upload/v1752866865/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-functions-logic-apps-comparison.jpg)

For workflows that demand complex custom code, Azure Functions may be a better fit. However, when looking for a low-code solution with extensive integration capabilities—provided that the external applications support open API specifications—Logic Apps is often the preferred choice.

## Building a Logic App in the Azure Portal

Follow this step-by-step example to create a business workflow using Azure Logic Apps. In our scenario, a new team member named Linda receives an email containing invoice numbers. The goal is to process these invoices and send back a confirmation number. To ensure Linda never misses an invoice, a workflow is designed so that every incoming invoice email triggers a message to her Microsoft Teams account. Upon her response, a confirmation email is automatically sent to notify the team.

### Step 1. Create the Logic App

1.  Log in to the [Azure Portal](https://portal.azure.com) and search for "Logic Apps".
2.  Click on "Add" to create a new resource.
3.  Create a new resource group if required.
4.  Select the **Consumption model** for a serverless, cost-effective solution that charges per execution.
5.  Enter a name (for example, "Linda Teams Workflow") and select a region (such as "East US").
6.  Create the Logic App.

![The image shows a Microsoft Azure portal interface for creating a Logic App, with fields for project and instance details, and options for plan type and zone redundancy.](https://kodekloud.com/kk-media/image/upload/v1752866866/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-portal-logic-app-creation.jpg)

Once the Logic App is created, click "Go to resource" to open the Logic Apps Designer, where you will see a list of available triggers.

![The image shows the Microsoft Azure Logic Apps Designer interface, featuring a video introduction and options to start with common triggers for creating workflows.](https://kodekloud.com/kk-media/image/upload/v1752866868/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-designer-interface.jpg)

### Step 2. Configure the Email Trigger

Since the workflow initiates with an email from a specific sender containing "INV" in the subject, select the **Outlook 365** trigger ("When a new email arrives").

![The image shows the Microsoft Azure Logic Apps Designer interface, displaying a list of triggers related to Office 365 Outlook, such as "When a new email arrives."](https://kodekloud.com/kk-media/image/upload/v1752866869/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-designer-outlook-triggers.jpg)

Steps to configure:

1.  Connect the Outlook 365 connector using Linda’s account.
2.  Set up the trigger with filters such as the "Inbox" folder, importance level, and a subject filter for "INV."

![The image shows the Microsoft Azure Logic Apps Designer interface, specifically a configuration screen for setting up a trigger for when a new email arrives, with options to specify parameters like folder, importance, and attachments.](https://kodekloud.com/kk-media/image/upload/v1752866871/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-email-trigger.jpg)

### Step 3. Setting Up the Microsoft Teams Action

After the email trigger, add an action to send a message in Microsoft Teams:

1.  Select the Microsoft Teams connector.
2.  Connect using Linda’s account.
3.  Choose the "Post a message" action (or similar) to display a notification that includes dynamic content from the email, such as the invoice number from the subject.

![The image shows the Microsoft Azure Logic Apps Designer interface, specifically displaying options for Microsoft Teams actions and triggers.](https://kodekloud.com/kk-media/image/upload/v1752866872/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-teams-interface.jpg)

Ensure the message parameters include dynamic content (e.g., headline and body) that automatically integrates the invoice details from the email trigger.

### Step 4. Adding Conditional Logic Based on User Response

In order to verify whether the invoice was processed (e.g., a response of "completed" or "pending"), add a conditional branch:

1.  Use the Control action "Condition".
2.  Configure the condition to evaluate the "Selected Option" returned by the Teams connector.
    - **If the condition is true (response equals "completed"):**
      - Use the Outlook 365 action "Send an email" to notify Rithin while cc’ing Linda.
      - Include dynamic content, such as the confirmation number extracted from the Teams response.

      ![The image shows the Microsoft Azure Logic Apps Designer interface, where an email automation workflow is being configured. It includes settings for sending an email with dynamic content based on certain conditions.](https://kodekloud.com/kk-media/image/upload/v1752866874/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-email-workflow-2.jpg)

    - **If the condition is false (response equals "pending"):**
      - Terminate the workflow, optionally logging an error message like "User did not complete" with an error code (e.g., 500).

      ![The image shows a Microsoft Azure Logic Apps Designer interface, where a workflow is being set up to trigger actions when a new email arrives, including posting options to a user via a bot.](https://kodekloud.com/kk-media/image/upload/v1752866875/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-email-workflow.jpg)

After setting up the conditional logic and corresponding actions, save your Logic App.

> [!important]
> **Tip**
>
> Before testing, double-check that all dynamic content parameters are correctly mapped from previous steps to ensure the workflow runs smoothly.

### Testing the Logic App

To verify the workflow:

1.  Send an email from Linda’s mailbox with a subject containing "INV" along with the invoice number.
2.  The Logic App will trigger and subsequently send a Teams message with the invoice details.
3.  When Linda replies (for example, with "completed" and a confirmation number), the Logic App will automatically send an email notification confirming that the invoice has been processed.

Below is a sample JSON output from the trigger:

```
{
  "subscribe": {
    "method": "post",
    "queries": {
      "fetchOnlyWithAttachment": "False",
      "folderPath": "Inbox",
      "importance": "Any"
    }
  }
}
```

And a sample payload for the email trigger:

```
{
  "BodyPreview": "please process.",
  "importance": "normal.",
  "conversationId": "AAQAGQZzJk4OTQkLWFmZDQ2NGIyNC04NTRlTM2Yjk4",
  "isRead": false,
  "isHtml": true,
  "body": "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></head><body>",
  "from": "rithin@azuretales.com",
  "toRecipients": ["jiones@azuretales.com"]
}
```

After Linda receives the email, she will see a notification on Microsoft Teams:

![The image shows a Microsoft Teams chat window with a Power Automate card displaying a pending invoice notification. There are options to mark the invoice as "Completed" or "Pending," and a comment section with a submit button.](https://kodekloud.com/kk-media/image/upload/v1752866876/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/microsoft-teams-invoice-notification.jpg)

Once Linda responds, Rithin will receive an email containing the invoice details and confirmation number. The dynamic content populated from earlier steps ensures a seamless, low-code integration process.

![The image shows the Microsoft Azure Logic Apps Designer interface with a workflow that triggers on a new email, posts options to a user, and includes conditional logic for sending an email or terminating the process.](https://kodekloud.com/kk-media/image/upload/v1752866878/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-apps-workflow-designer.jpg)

Finally, check the run status in the Logic Apps interface. A successful run displays a "Succeeded" status along with step-by-step details, which can help troubleshoot if any issues arise.

![The image shows a Microsoft Azure Logic App run interface, displaying a workflow with steps for handling emails, including conditions and actions like sending an email or terminating the process.](https://kodekloud.com/kk-media/image/upload/v1752866880/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Logic-Apps/azure-logic-app-workflow-email.jpg)

## Conclusion

Azure Logic Apps offer a low-code, designer-first alternative for building complex integrations. By leveraging a visual designer and hundreds of connectors for Office 365, Microsoft Teams, and other systems, you can create efficient, streamlined workflows with minimal coding effort. This tutorial demonstrated how to integrate email triggers, conditional logic, and dynamic content into a cohesive business process.

Before moving on, ensure you have fully explored this scenario and completed all associated quiz questions to reinforce your learning.

Thank you for following along.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/25b96c5d-3c61-43d7-ac15-2fac523ee721)**
>
> Watch video content
