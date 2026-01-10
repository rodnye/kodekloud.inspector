# Alerts amp Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Notification-Controller/Alerts-amp-Providers)

---

## Table of Contents

- Alerts amp Providers
  - Overview
  - Configuring Slack Notifications
  - Flux Notification Resources at a Glance
  - References
  - Watch Video
    - 1. Create the Slack Webhook Secret
    - 2. Define an AlertProvider
    - 3. Create an Alert

---

## Content

GitOps with FluxCD

Notification Controller

# Alerts amp Providers

## Overview

The Flux Notification Controller bridges external event sources (e.g., GitHub, S3 buckets, Helm repositories, Docker registries) with notification targets (Slack, Teams, Discord, Telegram). It comprises:

- **Receiver**: Watches changes in external sources and informs Flux controllers.
- **Provider**: Encodes and delivers events to external systems based on defined channels and formats.

Events emitted by Flux controllers (Source, Kustomize, Helm, Image) are matched against Alert rules and dispatched via Providers.

![The image is a diagram illustrating a notification controller system, showing the flow of source changes and events through various controllers to receivers and providers, with icons representing different platforms and services.](https://kodekloud.com/kk-media/image/upload/v1752877672/notes-assets/images/GitOps-with-FluxCD-Alerts-amp-Providers/notification-controller-system-diagram.jpg)

## Configuring Slack Notifications

In this example, we’ll use [Slack’s legacy incoming webhook API](https://api.slack.com/messaging/webhooks) to post Flux events to a channel.

### 1\. Create the Slack Webhook Secret

Store your webhook URL in the `flux-system` namespace:

```
kubectl -n flux-system create secret generic slack-webhook \
  --from-literal=address=https://hooks.slack.com/services/SLACK/WEBHOOK/URL
```

> [!important]
> **Note**
>
> Ensure your Slack workspace has incoming webhooks enabled on the target channel. You can configure and rotate webhooks via [Slack App Management](https://api.slack.com/apps).

### 2\. Define an AlertProvider

Create an `AlertProvider` named `slack-example` of type `slack`, pointing at the `general` channel and referencing the `slack-webhook` secret:

```
flux create alert-provider slack-example \
  --type slack \
  --channel general \
  --username flux-webhook \
  --secret-ref slack-webhook
```

### 3\. Create an Alert

Define an `Alert` resource to filter and route events of `info` severity from all Flux controllers in `flux-system`:

```
flux create alert slack-notification \
  --event-severity info \
  --provider-ref slack-example \
  --event-source GitRepository/* \
  --event-source HelmRepository/* \
  --event-source Kustomization/* \
  --event-source Bucket/* \
  --event-source OCIRepository/* \
  --event-source HelmChart/* \
  --event-source HelmRelease/* \
  --event-source ImageRepository/* \
  --event-source ImagePolicy/* \
  --event-source ImageUpdateAutomation/*
```

> [!important]
> **Warning**
>
> Slack’s legacy incoming webhooks may be deprecated in favor of the newer [Slack Apps & Block Kit APIs](https://api.slack.com/block-kit); plan to migrate when possible.

## Flux Notification Resources at a Glance

| Resource Type | Purpose                              | Example Command                                   |
| ------------- | ------------------------------------ | ------------------------------------------------- |
| AlertProvider | Defines channel, format, and secrets | `flux create alert-provider slack-example ...`    |
| Alert         | Filters events by severity/source    | `flux create alert slack-notification ...`        |
| Secret        | Stores webhook URLs or API tokens    | `kubectl create secret generic slack-webhook ...` |

## References

- [Flux Notification Controller](https://fluxcd.io/docs/components/notification/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/6f4f2854-e5a5-4f3e-8910-85c47c018029/lesson/1c7905b5-02b2-4b19-a022-2e57b100549b)**
>
> Watch video content
