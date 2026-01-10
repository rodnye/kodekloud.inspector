# DEMO Alerts amp Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Notification-Controller/DEMO-Alerts-amp-Providers)

---

## Table of Contents

- DEMO Alerts amp Providers
  - 1. Prepare Your Slack Workspace and Channel
  - 2. Create and Configure a Slack App
  - 3. Configure Flux Notification Controller
  - 4. Confirm Setup
  - 5. Trigger and Observe Notifications
  - 6. Verify the Update in Kubernetes
  - Links and References
  - Watch Video
    - 2.1 Create the Slack App
    - 2.2 Configure OAuth & Permissions
    - 2.3 Invite the Bot to Your Alert Channel
    - 3.1 Create the Slack Bot Token Secret
    - 3.2 Define the Slack Provider
    - 3.3 Define an Alert

---

## Content

GitOps with FluxCD

Notification Controller

# DEMO Alerts amp Providers

In this tutorial, you'll configure the Flux Notification Controller to automatically send GitOps alerts to a Slack channel. By the end, you will have a working Slack App, Flux provider, and alert definitions driving real-time notifications.

---

## 1\. Prepare Your Slack Workspace and Channel

If you don’t have a Slack workspace yet, create one by following [Slack’s Help Center instructions](https://slack.com/help/articles/218080037-Create-a-Slack-workspace):

![The image shows a Slack Help Center webpage with instructions on creating a workspace for a team, including steps for desktop, iOS, and Android.](https://kodekloud.com/kk-media/image/upload/v1752877673/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-help-center-create-workspace.jpg)

Once your workspace is ready, create a new channel (public or private) for Flux alerts. In this demo, we’ll use `flux-alerts-channel`:

![The image shows a Slack workspace with a private channel named "flux-alerts-channel" that has just been created. The interface displays the channel's name, a welcome message, and a user who joined the channel.](https://kodekloud.com/kk-media/image/upload/v1752877674/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-workspace-flux-alerts-channel.jpg)

If you need to customize the channel settings, use the channel-creation pop-up:

![The image shows a Slack interface with a pop-up window for creating a new channel, where you can enter a name, description, and set the channel to private.](https://kodekloud.com/kk-media/image/upload/v1752877675/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-new-channel-popup-interface.jpg)

---

## 2\. Create and Configure a Slack App

### 2.1 Create the Slack App

1.  Go to the [Slack API dashboard](https://api.slack.com/apps).
2.  Click **Create an App**, give it a name (e.g., **Flux Alerts Application**), and select your workspace.

![The image shows a Slack API interface where a user is naming an app "Flux Alert" and choosing a workspace to develop it in. There are options to cancel or create the app.](https://kodekloud.com/kk-media/image/upload/v1752877677/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-api-flux-alert-app-creation.jpg)

### 2.2 Configure OAuth & Permissions

Under **Features → OAuth & Permissions**, add the following **Bot Token Scopes**:

| Scope                | Description                        |
| -------------------- | ---------------------------------- |
| chat:write           | Send messages as the app           |
| channels:read        | Read public channel information    |
| chat:write.customize | Send messages with a custom avatar |

![The image shows the Slack API interface, specifically the "OAuth & Permissions" section, where options for advanced token security and OAuth tokens for a workspace are displayed.](https://kodekloud.com/kk-media/image/upload/v1752877678/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-api-oauth-permissions-interface.jpg)

After adding the scopes, install the app:

![The image shows a Slack API settings page with a list of bot token scopes, including permissions like "chat:write" and "channels:read." There's a success message at the top indicating changes have been saved.](https://kodekloud.com/kk-media/image/upload/v1752877679/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-api-settings-bot-token-scopes.jpg)

On the authorization screen, click **Allow**:

![The image shows a Slack authorization page where the Flux Alerts Application is requesting permission to access the "mcd-level2" Slack workspace. It includes options to view content and perform actions in channels and conversations, with "Cancel" and "Allow" buttons.](https://kodekloud.com/kk-media/image/upload/v1752877680/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-authorization-flux-alerts-mcd-level2.jpg)

Once installed, copy the **Bot User OAuth Token** from the **OAuth & Permissions** page.

![The image shows a Slack API settings page focused on OAuth & Permissions, displaying options for token security and an OAuth token for a workspace.](https://kodekloud.com/kk-media/image/upload/v1752877681/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-api-oauth-permissions-settings.jpg)

> [!important]
> **Warning**
>
> Keep your Bot User OAuth Token secure. Treat it like any sensitive credential.

### 2.3 Invite the Bot to Your Alert Channel

If your alerts channel is private, you must add the app as a member:

![The image shows a Slack workspace interface with a private channel named "flux-alerts-channel" open. A dropdown menu is visible, offering options to notify everyone in the channel.](https://kodekloud.com/kk-media/image/upload/v1752877682/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-workspace-flux-alerts-channel-2.jpg)

Once invited, you’ll see a confirmation in the channel:

![The image shows a Slack workspace with a private channel named "flux-alerts-channel." It includes messages about a user joining the channel and an application being added.](https://kodekloud.com/kk-media/image/upload/v1752877683/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-workspace-flux-alerts-channel-3.jpg)

---

## 3\. Configure Flux Notification Controller

### 3.1 Create the Slack Bot Token Secret

Store your Slack Bot Token in the `flux-system` namespace:

```
kubectl -n flux-system create secret generic slack-bot-token \
  --from-literal=token=xoxb-xxxxxxxxxxxxxxxxxxxx
```

> [!important]
> **Note**
>
> Replace `xoxb-xxxxxxxxxxxxxxxxxxxx` with your actual Bot User OAuth Token.

### 3.2 Define the Slack Provider

Flux’s Provider API lets you specify how notifications are sent. See [Flux Notification Providers](https://kodekloud.com/kk-media/image/upload/v1752877685/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/flux-documentation-notification-providers.jpg):

![The image shows a webpage from the Flux documentation listing various notification providers such as Discord, GitHub, Google Chat, and Slack. The left sidebar contains navigation links for different components and guides.](https://kodekloud.com/kk-media/image/upload/v1752877685/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/flux-documentation-notification-providers.jpg)

**Option A: Apply a YAML manifest**  
Create `notification-provider-slack.yaml`:

```
apiVersion: notification.toolkit.fluxcd.io/v1beta2
kind: Provider
metadata:
  name: notification-provider-slack
  namespace: flux-system
spec:
  type: slack
  channel: flux-alerts-channel
  address: https://slack.com/api/chat.postMessage
  secretRef:
    name: slack-bot-token
  username: flux-bot
```

Apply it:

```
kubectl -n flux-system apply -f notification-provider-slack.yaml
```

**Option B: Generate with the Flux CLI**

```
flux create provider notification slack notification-provider-slack \
  --channel flux-alerts-channel \
  --username flux-bot \
  --secret-ref slack-bot-token \
  --address https://slack.com/api/chat.postMessage \
  --export > notification-provider-slack.yaml
```

---

### 3.3 Define an Alert

Alerts let you filter events by severity and resource type before sending them via your provider.

Create `notification-alert-slack.yaml`:

```
apiVersion: notification.toolkit.fluxcd.io/v1beta2
kind: Alert
metadata:
  name: notification-alert-slack
  namespace: flux-system
spec:
  eventSeverity: info
  eventSources:
    - kind: Kustomization; name: "*"
    - kind: GitRepository; name: "*"
    - kind: Bucket; name: "*"
    - kind: OCIRepository; name: "*"
    - kind: HelmChart; name: "*"
    - kind: HelmRepository; name: "*"
    - kind: HelmRelease; name: "*"
    - kind: ImageRepository; name: "*"
    - kind: ImagePolicy; name: "*"
    - kind: ImageUpdateAutomation; name: "*"
  providerRef:
    name: notification-provider-slack
```

Or generate with the Flux CLI:

```
flux create alert notification-alert-slack \
  --event-severity info \
  --provider-ref notification-provider-slack \
  --event-source Kustomization/* \
  --event-source GitRepository/* \
  --event-source Bucket/* \
  --event-source OCIRepository/* \
  --event-source HelmChart/* \
  --event-source HelmRepository/* \
  --event-source HelmRelease/* \
  --event-source ImageRepository/* \
  --event-source ImagePolicy/* \
  --event-source ImageUpdateAutomation/* \
  --export > notification-alert-slack.yaml
```

Apply your Alert:

```
kubectl -n flux-system apply -f notification-alert-slack.yaml
```

---

## 4\. Confirm Setup

Make sure Flux picks up your changes and that both the provider and alert are `READY`:

```
flux reconcile source git flux-system
flux get alert
flux get providers notification
```

---

## 5\. Trigger and Observe Notifications

Change something in your Git repository—for example, reduce the replica count in your deployment:

```
# in bb-app-source/2-demo/deployment.yaml
spec:
  replicas: 1
```

Commit and push the update. Once Flux reconciles, you will see a notification in **flux-alerts-channel**:

![The image shows a Slack workspace with a channel named "flux-alerts-channel" where users and bots are interacting, including messages about a Flux Alerts Application and a git repository update.](https://kodekloud.com/kk-media/image/upload/v1752877686/notes-assets/images/GitOps-with-FluxCD-DEMO-Alerts-amp-Providers/slack-workspace-flux-alerts-channel-4.jpg)

---

## 6\. Verify the Update in Kubernetes

Confirm that your deployment reflects the new replica count:

```
kubectl -n 2-demo get pods
```

---

Congratulations! You have successfully configured Flux Notification Controller to deliver Slack alerts for all your Flux events.

---

## Links and References

- [Flux Notification Providers](https://fluxcd.io/docs/components/notification/providers/)
- [Flux CLI](https://fluxcd.io/docs/cmd/flux/)
- [Kubernetes kubectl Reference](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Slack API Documentation](https://api.slack.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/6f4f2854-e5a5-4f3e-8910-85c47c018029/lesson/dced4ec0-5ccc-4a5b-8603-b9cf5d737de4)**
>
> Watch video content
