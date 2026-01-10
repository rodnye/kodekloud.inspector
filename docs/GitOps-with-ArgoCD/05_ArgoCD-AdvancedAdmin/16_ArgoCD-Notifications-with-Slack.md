# ArgoCD Notifications with Slack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/ArgoCD-Notifications-with-Slack)

---

## Table of Contents

- ArgoCD Notifications with Slack
  - 1. Creating a Slack Application
  - 2. Configuring OAuth Permissions
  - 3. Configuring the ArgoCD Notifications Secret
  - 4. Configuring the Notifications ConfigMap
  - 5. Annotating Applications or Projects for Notifications
  - 6. Testing the Notifications
  - 7. Expanding Notification Templates
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# ArgoCD Notifications with Slack

Learn how to configure ArgoCD to send notifications to a Slack channel using a custom Slack application. This guide covers the complete process—from creating a Slack application to configuring ArgoCD secrets, setting up notification templates, and testing the notifications.

---

## 1\. Creating a Slack Application

To send notifications through Slack, start by creating a Slack application. You will need an active Slack workspace. Follow these steps:

1.  Navigate to the Slack Apps page and click on **Create New App from scratch**.
2.  Provide a name for your app (e.g., _Agostini Notification App_) and select your desired workspace (e.g., _MCD level 2_).
3.  Once the app is created, click on it to open its settings.

![The image shows a Slack API interface where a user is creating a new app named "ArgoCD Notification App" and selecting a workspace for development.](https://kodekloud.com/kk-media/image/upload/v1752877450/notes-assets/images/GitOps-with-ArgoCD-ArgoCD-Notifications-with-Slack/slack-api-creating-argocd-app.jpg)

---

## 2\. Configuring OAuth Permissions

After creating the app, configure the OAuth scopes to allow ArgoCD to send messages. Complete the following steps:

1.  Within your app settings, scroll down to **OAuth & Permissions**.
2.  Under the scopes section, add the following OAuth scopes:
    - `chat:write`
    - `chat:write.custom`
3.  Click **Install to Workspace** (or _Allow_ if prompted). This installs the app to your workspace and generates an OAuth token. Make sure to copy this token as it will be needed later.

![The image shows the Slack API dashboard, specifically the "OAuth & Permissions" section, where options for token security and OAuth tokens for a workspace are displayed.](https://kodekloud.com/kk-media/image/upload/v1752877451/notes-assets/images/GitOps-with-ArgoCD-ArgoCD-Notifications-with-Slack/slack-api-oauth-permissions-dashboard.jpg)

!!! note "Important" Keep your OAuth token secure and store it safely. You will use it to integrate Slack with ArgoCD.

---

## 3\. Configuring the ArgoCD Notifications Secret

Next, add the OAuth token to the ArgoCD notifications secret. This allows the notifications controller to access the token and send Slack messages.

1.  Locate the ArgoCD notifications deployment with the following command:

    ```
    kubectl -n argocd get all | grep -i notif
    ```

    You should see an output similar to:

    ```
    pod/argocd-notifications-controller-54dd686846-4b4r4  1/1   Running   0   30h
    service/argocd-notifications-controller-metrics      ClusterIP   10.110.116.143  <none> 9001/TCP   30h
    deployment.apps/argocd-notifications-controller       1/1   1         1   30h
    replicaset.apps/argocd-notifications-controller-54dd686846  1   1         1   30h
    ```

2.  Edit the `argocd-notifications-secret` to include your Slack token as plaintext data:

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: argocd-notifications-secret
      namespace: argocd
      annotations:
        kubectl.kubernetes.io/last-applied-configuration: |
          {"apiVersion":"v1","kind":"Secret","metadata":{"annotations":{},"name":"argocd-notifications-secret","namespace":"argocd"},"type":"Opaque"}
    stringData:
      slack-token: xoxb-332832875318-4128536871122-63SaTEva3dNgPKrMORIqHQT5
    type: Opaque
    ```

    Save the secret and verify that the Slack token is added. (Note: When retrieved, the token will be Base64-encoded.)

3.  (Optional) To add additional credentials, such as email credentials, use a similar approach. For example:

    ```
    export EMAIL_USER=<your-username>
    export PASSWORD=<your-password>
    kubectl apply -n argocd -f - << EOF
    apiVersion: v1
    kind: Secret
    metadata:
      name: argocd-notifications-secret
    stringData:
      email-username: $EMAIL_USER
      email-password: $PASSWORD
    type: Opaque
    EOF
    ```

---

## 4\. Configuring the Notifications ConfigMap

Now, configure the ArgoCD notifications ConfigMap to define the Slack service, triggers, and message templates. This ConfigMap specifies when notifications should be sent and what content they should include.

1.  Edit the ConfigMap `argocd-notifications-cm` in the `argocd` namespace to define the Slack service configuration:

    ```
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: argocd-notifications-cm
      namespace: argocd
      annotations:
        kubectl.kubernetes.io/last-applied-configuration: |
          {"apiVersion":"v1","kind":"ConfigMap","metadata":{"annotations":{},"name":"argocd-notifications-cm","namespace":"argocd"}}
    data:
      service.slack: |
        token: $slack-token
        username: argocd-bot
        icon: ":rocket:"
    ```

2.  Add a trigger and its corresponding template. For example, configure a trigger to send a notification when an application is synchronized:

    ```
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: argocd-notifications-cm
      namespace: argocd
    data:
      service.slack: |
        token: $slack-token
        username: argocd-bot
        icon: ":rocket:"
      trigger.on_sync-succeeded: |
        - when: app.status.sync.status == 'Synced'
          send: [app-sync-succeeded-slack]
      template.app-sync-succeeded-slack: |
        message: |
          Application {{ .app.metadata.name }} is now {{ .app.status.sync.status }}
        slack:
          attachments: |
          [{
            "title": "{{ .app.metadata.name }}",
            "title_link": "{{ .context.argocdUrl }}/applications/{{ .app.metadata.name }}",
            "color": "#18be52",
            "fields": [
              {
                "title": "Sync Status",
                "value": "{{ .app.status.sync.status }}",
                "short": false
              },
              {
                "title": "Repository",
                "value": "{{ .app.spec.source.repoURL }}",
                "short": false
              },
              {
                "title": "Revision",
                "value": "{{ .app.status.sync.revision }}",
                "short": false
              },
              {
                "title": "Commit Author",
                "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Author }}",
                "short": false
              },
              {
                "title": "Commit Message",
                "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Message }}",
                "short": false
              },
              {
                "title": "Commit Date Time",
                "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Date }}",
                "short": false
              }
            ]
          }]
    ```

This configuration sets a trigger that checks if the application's sync status is 'Synced.' When the condition is met, ArgoCD sends a detailed Slack message showing repository information, revision details, and commit metadata.

---

## 5\. Annotating Applications or Projects for Notifications

To enable notifications on specific applications or projects, add the appropriate annotations. This allows you to control which applications send notifications upon synchronization.

To have all applications under the default project send a Slack notification when synchronized, update the default AppProject as shown below:

```
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
  annotations:
    notifications.argoproj.io/subscribe-on-sync-succeeded.slack: argocd-notifications
spec:
  clusterResourceWhitelist:
    - group: '*'
      kind: '*'
  destinations:
    - server: '*'
      namespace: '*'
  sourceRepos:
    - '*'
```

For granular control, you can also annotate individual applications:

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-application
  namespace: argocd
  annotations:
    notifications.argoproj.io/subscribe-on-sync-succeeded.slack: my_channel
```

!!! note "Tip" Annotating projects or individual applications helps you manage notifications efficiently. Use project-level annotations to cover multiple applications and individual annotations for finer control.

---

## 6\. Testing the Notifications

Once all changes are applied, you can test the configuration by synchronizing an application and verifying the notifications in Slack.

1.  Synchronize an application using the ArgoCD UI; its status should change to _Synced_.
2.  Verify that the notification is sent to your designated Slack channel.

![The image shows a dashboard from a deployment management tool, displaying the application status and sync details for "solar-system-app-2" with a visual tree of its components. The current sync status is "Synced" and the app health is "Progressing."](https://kodekloud.com/kk-media/image/upload/v1752877453/notes-assets/images/GitOps-with-ArgoCD-ArgoCD-Notifications-with-Slack/deployment-dashboard-solar-system-app.jpg)

3.  Check the Slack channel (e.g., _argocd-notifications_) to view the detailed message with attachments showing sync status, repository details, revision info, commit author, commit message, and commit date.

![The image shows a Slack channel named "argocd-notifications" with messages from an ArgoCD bot indicating that various applications have been synced.](https://kodekloud.com/kk-media/image/upload/v1752877454/notes-assets/images/GitOps-with-ArgoCD-ArgoCD-Notifications-with-Slack/argocd-notifications-slack-channel.jpg)

---

## 7\. Expanding Notification Templates

The basic configuration provided above can be extended to include more detailed notifications. For instance, you can add multiple triggers and templates covering scenarios such as "Health Degraded," "Sync Failed," or "Status Unknown."

Below is an example of an expanded template including additional details like commit information:

```
template.app-sync-status: |
  message: |
    Application {{ .app.metadata.name }} sync is {{ .app.status.sync.status }}.
    Application details: [{{ .context.argocdUrl }}/applications/{{ .app.metadata.name }}].
  slack:
    attachments: |
      [{
        "title": "{{ .app.metadata.name }}",
        "title_link": "{{ .context.argocdUrl }}/applications/{{ .app.metadata.name }}",
        "color": "#18be52",
        "fields": [
          {
            "title": "Sync Status",
            "value": "{{ .app.status.sync.status }}",
            "short": true
          },
          {
            "title": "Repository",
            "value": "{{ .app.spec.source.repoURL }}",
            "short": true
          },
          {
            "title": "Revision",
            "value": "{{ .app.status.sync.revision }}",
            "short": true
          },
          {
            "title": "Commit Author",
            "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Author }}",
            "short": true
          },
          {
            "title": "Commit Message",
            "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Message }}",
            "short": true
          },
          {
            "title": "Commit Date Time",
            "value": "{{ (call .repo.GetCommitMetadata .app.status.sync.revision).Date }}",
            "short": true
          }
        ]
      }]
```

To deploy the complete notifications catalog with additional triggers and templates, run the following command:

```
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/notifications_catalog/install.yaml
```

This command updates your ArgoCD notifications ConfigMap with extra features that you can further customize.

![The image shows a webpage from the Argo CD documentation, specifically the "Triggers and Templates Catalog" section, listing various application triggers and their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752877455/notes-assets/images/GitOps-with-ArgoCD-ArgoCD-Notifications-with-Slack/argo-cd-triggers-templates-catalog.jpg)

---

## Conclusion

In this guide, you learned how to set up Slack notifications for ArgoCD. We began by creating a Slack application and configuring its OAuth permissions. Next, we integrated the OAuth token into ArgoCD’s notifications secret and configured the notifications through a ConfigMap by defining triggers and custom Slack message templates. Finally, we enabled notifications via annotations on applications or projects and verified the workflow through testing.

Thank you for reading, and happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/58d04f4b-2f57-4cd5-b9bc-fa3e8cdd2ef1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/430fd781-a175-4d57-a42d-f9237540ff39)**
>
> Practice lab
