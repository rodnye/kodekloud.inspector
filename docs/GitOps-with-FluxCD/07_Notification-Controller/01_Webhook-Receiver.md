# Webhook Receiver - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Notification-Controller/Webhook-Receiver)

---

## Table of Contents

- Webhook Receiver
  - Why Use Webhooks?
  - Notification Controller Overview
  - Step 1: Create a Git Source
  - Step 2: Generate a Webhook Secret
  - Step 3: Expose the Notification Receiver
  - Step 4: Define the Receiver Resource
  - Step 5: Configure GitHub Webhook
  - How It Works
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Notification Controller

# Webhook Receiver

In this guide, we’ll dive into the Flux Notification Controller—the component that allows you to trigger on-demand reconciliations via webhooks. You’ll learn how to set up a secure receiver endpoint, configure GitHub webhooks, and instantly reconcile changes in your Git repository.

---

## Why Use Webhooks?

By default, the Flux Source Controller polls your Git repos at a specified interval (e.g., every 15 minutes):

```
flux create source git my-nginx \
  --url https://github.com/sidd-harth/nginx \
  --branch main \
  --interval 15m
```

When you push a change, Flux waits for the next scheduled poll before reconciling. Webhooks let you bypass that delay—immediately notifying Flux of new commits or tag updates.

---

## Notification Controller Overview

| Component         | Purpose                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Receiver          | Listens on HTTP port 9292 inside the cluster for inbound webhook events.                              |
| Secret Validation | Verifies each incoming POST request using a shared HMAC token.                                        |
| Event Handling    | Forwards validated events to Flux controllers (e.g., Source Controller) to trigger an immediate pull. |

---

## Step 1: Create a Git Source

First, define your Git repository as a Flux `GitRepository` source:

```
flux create source git my-nginx \
  --url https://github.com/sidd-harth/nginx \
  --branch main \
  --interval 15m
```

---

## Step 2: Generate a Webhook Secret

Create a Kubernetes secret to secure your receiver endpoint:

```
kubectl -n flux-system create secret generic webhook-token \
  --from-literal=token=secret-token-dont-share
```

> [!important]
> **Note**
>
> Keep your secret token safe—anyone with this token can trigger reconciliations.

---

## Step 3: Expose the Notification Receiver

Expose the Notification Controller on port 80 (target port 9292). Choose `LoadBalancer` or `NodePort` based on your cluster:

```
kubectl -n flux-system expose deployment notification-controller \
  --name receiver \
  --port 80 \
  --target-port 9292 \
  --type LoadBalancer
```

---

## Step 4: Define the Receiver Resource

Create a `Receiver` resource to handle GitHub `ping` and `push` events for your GitRepository:

```
flux create receiver github-receiver \
  --type github \
  --event ping,push \
  --secret-ref webhook-token \
  --resource GitRepository/my-nginx
```

Verify readiness:

```
flux get receivers github-receiver
```

Expected output:

```
NAME             SUSPENDED   READY    MESSAGE
github-receiver  False       True     Receiver initialized with URL: /hook/be1782fa344b4a24ea458be2dde11f9c289b91e
```

---

## Step 5: Configure GitHub Webhook

1.  Open your GitHub repository settings and select **Webhooks**.
2.  Click **Add webhook**.
3.  Set **Payload URL** to the path shown by `flux get receivers` (e.g., `https://<LB-IP>/hook/...`).
4.  Choose `application/json` as the content type.
5.  Enter the **Secret**: `secret-token-dont-share`.
6.  Select **Let me select individual events**, then check **Push** and **Ping**.

---

## How It Works

1.  **Push Event**  
    GitHub sends a POST to the Flux receiver endpoint.
2.  **Validation**  
    The Notification Controller computes an HMAC using the shared secret and compares it to the `X-Hub-Signature` header.
3.  **Reconciliation**  
    Upon successful validation, the controller signals the Source Controller. Flux pulls the latest manifests immediately, regardless of the polling interval.

> [!important]
> **Warning**
>
> Ensure your webhook endpoint is secured by a network policy or firewall to prevent unauthorized access.

---

## Next Steps

The Flux Notification Controller also supports alert providers and various event sources (e.g., DockerHub, SQS). Stay tuned for upcoming tutorials:

- Configuring Alert Providers
- Consuming DockerHub Image Update Events
- Integrating with Cloud Event Brokers

---

## Links and References

- [Flux Notifications Controller](https://fluxcd.io/docs/notifications/controller/)
- [GitHub Webhooks Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Flux CLI Reference](https://fluxcd.io/docs/flux-cli/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/6f4f2854-e5a5-4f3e-8910-85c47c018029/lesson/40be44b1-c6ce-4e0b-9fe2-9b27ff674cc4)**
>
> Watch video content
