# Slack Notify GitHub Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Slack-Notify-GitHub-Action)

---

## Table of Contents

- Slack Notify GitHub Action
  - 1. Overview
  - 2. Create a Slack Channel & Webhook
  - 3. Store the Webhook as a GitHub Secret
  - 4. Add the Slack Notification Job
  - 5. Verify always() Behavior
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Slack Notify GitHub Action

Integrate Slack notifications into your GitHub Actions CI/CD pipeline using the `rtCamp/action-slack-notify@v2` action. This guide covers setting up a Slack Incoming Webhook, securing it as a GitHub secret, and adding a notification job that always runs.

## 1\. Overview

The Slack Notify action sends a customizable message to your Slack channel at the end of a workflow. You provide it with environment variables for configuration:

| Variable          | Description                                | Example                                      |
| ----------------- | ------------------------------------------ | -------------------------------------------- |
| SLACK\\\_WEBHOOK  | Your Slack Incoming Webhook URL (secret)   | `${{ secrets.SLACK_WEBHOOK }}`               |
| SLACK\\\_CHANNEL  | Channel name or ID                         | `general`                                    |
| SLACK\\\_COLOR    | Attachment color (`good`, `#ff0000`, etc.) | `${{ job.status }}`                          |
| SLACK\\\_ICON     | URL for a custom icon                      | `https://github.com/rtCamp.png?size=48`      |
| SLACK\\\_MESSAGE  | The notification text                      | `"Build *${{ github.workflow }}* completed"` |
| SLACK\\\_TITLE    | Title shown above the message              | `"CI/CD Pipeline"`                           |
| SLACK\\\_USERNAME | Username for the Slack bot                 | `rtCamp`                                     |

Here’s a minimal step configuration:

```
- name: Slack Notification
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_CHANNEL: general
    SLACK_COLOR: ${{ job.status }}
    SLACK_ICON: https://github.com/rtCamp.png?size=48
    SLACK_MESSAGE: "Build *${{ github.workflow }}* completed"
    SLACK_TITLE: "CI/CD Pipeline"
    SLACK_USERNAME: rtCamp
```

## 2\. Create a Slack Channel & Webhook

1.  In Slack, create a new channel (e.g., `github-actions-channel`).
2.  Visit Incoming Webhooks in the [Slack API](https://api.slack.com/messaging/webhooks) and click **Create an App** → **From scratch**.
3.  Enable **Incoming Webhooks** and add to your channel.

![The image shows the Slack API settings page for building apps, featuring options like Incoming Webhooks, Interactive Components, and Slash Commands. The sidebar lists various settings and features available for app configuration.](https://kodekloud.com/kk-media/image/upload/v1752876339/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/slack-api-settings-apps-incoming-webhooks.jpg)

4.  Select your channel; Slack generates a Webhook URL. Test it with:

```
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Hello, World!"}' YOUR_WEBHOOK_URL_HERE
```

![The image shows a Slack authorization page where the GitHub Actions application is requesting permission to access the "mcd-level2" Slack workspace, with a dropdown menu to select a channel for posting.](https://kodekloud.com/kk-media/image/upload/v1752876340/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/slack-authorization-github-actions-mcd-level2.jpg)

## 3\. Store the Webhook as a GitHub Secret

1.  Navigate to your repo’s **Settings → Secrets and variables → Actions**.
2.  Click **New repository secret** and add:
    - **Name**: `SLACK_WEBHOOK`
    - **Value**: `<your-slack-webhook-url>`

> [!important]
> **Warning**
>
> Keep your Webhook URL confidential. Anyone with this URL can post messages to your Slack channel.

![The image shows a GitHub repository settings page, specifically the "Secrets and variables" section, displaying environment and repository secrets like AWS keys and passwords.](https://kodekloud.com/kk-media/image/upload/v1752876341/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/github-repo-settings-secrets-variables.jpg)

![The image shows a GitHub repository settings page, specifically the "Secrets and variables" section under "Actions," listing various environment and repository secrets.](https://kodekloud.com/kk-media/image/upload/v1752876342/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/github-repo-settings-secrets-variables-2.jpg)

## 4\. Add the Slack Notification Job

Append this job to your workflow file (e.g., `.github/workflows/solar-system.yml`). It uses `if: always()` so it runs regardless of success, failure, or cancellation, and `continue-on-error: true` to avoid blocking the pipeline.

```
jobs:
  # ... other jobs ...


  slack-notification:
    if: always()
    name: Slack Notification
    needs: [dev-integration-testing, prod-integration-testing]
    continue-on-error: true
    runs-on: ubuntu-latest


    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Send Slack notification
        uses: rtCamp/action-slack-notify@v2
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          SLACK_CHANNEL: github-actions-channel
          SLACK_COLOR: ${{ job.status }}
          SLACK_ICON: https://gitlab.com/sidd-harth/solar-system/-/raw/main/images/saturn.png
          SLACK_MESSAGE: ":hammer_and_wrench: Triggered by ${{ github.actor }}"
          SLACK_TITLE: "Pipeline Status"
```

Once pushed, your workflow graph will include the new notification job:

![The image shows a GitHub Actions workflow interface with a workflow named "Solar System" in progress, displaying job statuses and a visual representation of the workflow steps.](https://kodekloud.com/kk-media/image/upload/v1752876343/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/github-actions-solar-system-workflow.jpg)

After completion, you’ll see its result in the summary:

![The image shows a GitHub Actions workflow summary for a project, indicating a successful run with various jobs like unit testing, code coverage, and Slack notification.](https://kodekloud.com/kk-media/image/upload/v1752876344/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/github-actions-workflow-summary-success.jpg)

## 5\. Verify `always()` Behavior

Even if the workflow is canceled or fails, the Slack notification runs because of `if: always()`:

![The image shows a GitHub Docs page about GitHub Actions expressions, specifically focusing on the "always" and "cancelled" expressions, with examples and a warning about using "always."](https://kodekloud.com/kk-media/image/upload/v1752876346/notes-assets/images/GitHub-Actions-Certification-Slack-Notify-GitHub-Action/github-actions-expressions-always-cancelled.jpg)

---

With this setup, every GitHub Actions run—successful, failed, or canceled—triggers a Slack notification, keeping your team informed in real time.

## Links and References

- [Incoming Webhooks Documentation](https://api.slack.com/messaging/webhooks)
- [GitHub Actions Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [rtCamp/action-slack-notify](https://github.com/rtCamp/action-slack-notify)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/f51a21d3-2cf9-442a-9bc8-55d2f8870375)**
>
> Watch video content
