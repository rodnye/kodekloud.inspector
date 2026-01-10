# Lab Solution Notifications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Lab-Solution-Notifications)

---

## Table of Contents

- Lab Solution Notifications
  - Step 1: Enable Workspace Notifications
  - Step 2: Create an Email Notification
  - Step 3: Test and Trigger a Terraform Run
  - Additional Notification Destinations
  - References
  - Watch Video
    - 2.1 Configure Email Settings

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Lab Solution Notifications

Terraform Cloud notifications let you track workspace events—such as runs completing, errors, or drift detection—in real time. By integrating email, Slack, Microsoft Teams, or generic webhooks, you can keep your team informed and responsive throughout the Terraform workflow.

## Step 1: Enable Workspace Notifications

1.  Log in to Terraform Cloud and select the **DevOps AWS MyApp Dev** workspace.
2.  Navigate to **Settings > Notifications**.

![The image shows a KodeKloud lab interface with instructions for creating Terraform Cloud notifications on the left and a Visual Studio Code editor with a welcome message on the right.](https://kodekloud.com/kk-media/image/upload/v1752878686/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/kodekloud-lab-terraform-cloud-notifications.jpg)

If this workspace has no notifications configured, the list will be empty:

![The image shows a Terraform Cloud interface for a workspace named "devops-aws-myapp-dev," with a focus on the Notifications section, where users can create notifications for workspace events.](https://kodekloud.com/kk-media/image/upload/v1752878687/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/terraform-cloud-devops-aws-notifications.jpg)

Click **Create notification** to begin.

## Step 2: Create an Email Notification

Terraform Cloud supports four notification destinations:

- Email
- Slack
- Microsoft Teams
- Generic Webhook

![The image shows a user interface for creating a notification, offering options to send messages via Webhook, Email, Slack, or Microsoft Teams. The sidebar includes workspace settings like Notifications, Run Tasks, and Team Access.](https://kodekloud.com/kk-media/image/upload/v1752878689/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/notification-creation-user-interface.jpg)

### 2.1 Configure Email Settings

1.  Select **Email** as the destination.
2.  Enter **Terraform run completed** as the notification name.
3.  From **Recipient**, choose your Terraform Cloud login email.
4.  Under **Events**, uncheck **All events**, then select only **Completed**.

![The image shows a settings menu for configuring notifications in a software application, with options for different run events like "Created," "Planning," "Needs Attention," "Applying," "Completed," and "Errored."](https://kodekloud.com/kk-media/image/upload/v1752878690/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/settings-menu-notifications-configure-options.jpg)

Click **Create notification**. You will see the new email alert listed and enabled:

![The image shows a Terraform Cloud interface with a notification setting for email alerts when a Terraform run is completed. The notification is enabled and set to send to a specified email address.](https://kodekloud.com/kk-media/image/upload/v1752878691/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/terraform-cloud-email-alerts-notification.jpg)

> [!important]
> **Note**
>
> Use the **Send test** link next to any notification to verify delivery before you rely on real run events.

## Step 3: Test and Trigger a Terraform Run

1.  Click **Send test** on your email notification.
2.  Check your inbox for a message titled **Terraform run completed**—it should include workspace details and a test-run ID.

Next, trigger an actual Terraform run:

```
terraform apply
```

Once the run finishes, you’ll receive a live email with a direct link to the run details in your **DevOps AWS MyApp Dev** workspace:

![The image shows a Terraform Cloud interface with a workspace named "devops-aws-myapp-dev," indicating a successful plan run with no changes needed. A notification about improved navigation is also visible.](https://kodekloud.com/kk-media/image/upload/v1752878692/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Notifications/terraform-cloud-devops-aws-myapp.jpg)

## Additional Notification Destinations

You can extend alerts to other platforms:

| Destination     | Description                                     | Setup Method                        |
| --------------- | ----------------------------------------------- | ----------------------------------- |
| Email           | Direct inbox alerts for run lifecycle events    | Workspace UI > Notifications        |
| Slack           | Post events to any channel via incoming webhook | Provide Slack Webhook URL           |
| Microsoft Teams | Send updates into a Teams channel connector     | Configure Teams incoming webhook    |
| Generic Webhook | Forward payloads to custom HTTP endpoints       | Enter target URL and authentication |

> [!important]
> **Warning**
>
> Ensure your webhook endpoints are publicly reachable, and secure them with authentication or IP allowlists to prevent unauthorized requests.

You can also subscribe to **health events** (for drift detection) or additional run statuses like **Errored** and **Needs Attention**. Tailor notifications to align with your team’s monitoring and incident response processes.

## References

- [Terraform Cloud Notifications Guide](https://www.terraform.io/docs/cloud/notifications/index.html)
- [Terraform Cloud API Overview](https://www.terraform.io/docs/cloud/api/index.html)
- [Incoming Webhooks for Slack](https://api.slack.com/messaging/webhooks)
- [Microsoft Teams Incoming Webhook Connectors](https://docs.microsoft.com/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/ffccfca0-a574-41b6-82f5-cc1d6683c083)**
>
> Watch video content
