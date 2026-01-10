# DEMO Webhook Receiver - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Notification-Controller/DEMO-Webhook-Receiver)

---

## Table of Contents

- DEMO Webhook Receiver
  - 1. Setup & Scaling the Deployment
  - 2. Introducing Webhooks for Immediate Reconciliation
  - 3. Testing the Webhook-triggered Reconciliation
  - Conclusion
  - Links & References
  - Watch Video
    - 1.1 Scale the Deployment
    - 2.1 Expose Notification Controller
    - 2.2 Create the GitHub Webhook Secret
    - 2.3 Create a Flux Receiver
    - 2.4 Configure GitHub Webhook

---

## Content

GitOps with FluxCD

Notification Controller

# DEMO Webhook Receiver

In this tutorial, we’ll walk through how to use FluxCD’s Notification Controller Receiver API to trigger on-demand reconciliation of a `GitRepository` resource via GitHub webhooks. By the end, you’ll reduce your GitOps feedback loop from minutes to seconds.

## 1\. Setup & Scaling the Deployment

First, switch to the `2-demo` branch and inspect the existing pod:

```
git checkout 2-demo
kubectl -n 2-demo get pods
```

Example output:

```
NAME                               READY   STATUS    RESTARTS   AGE
block-buster-75f77549b-cjixm       1/1     Running   3          23h
```

### 1.1 Scale the Deployment

Edit the `block-buster` Deployment manifest to increase replicas from 1 to 2:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: block-buster
  namespace: 2-demo
spec:
  replicas: 2                      # was 1
  selector:
    matchLabels:
      app: block-buster
  template:
    metadata:
      labels:
        app: block-buster
        api: downward
        usage: global
    spec:
      containers:
        - name: block-buster
          image: your-image:7.2.0
```

Save, commit, and watch the new pods spin up:

```
git add .
git commit -m "Scale block-buster to 2 replicas"
kubectl -n 2-demo get pods -w
```

By default, Flux polls the Git repository every minute. The `GitRepository` in `flux-system` might look like this:

```
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: 2-demo-source-git-bb-app
  namespace: flux-system
spec:
  interval: 1m0s
  ref:
    branch: 2-demo
  url: https://github.com/sidd-harth-2/bb-app-source
```

Verify Flux polling status:

```
flux get sources git 2-demo-source-git-bb-app -w
```

## 2\. Introducing Webhooks for Immediate Reconciliation

Waiting for the static `interval` isn’t always ideal. FluxCD’s Notification Controller lets you trigger reconciliation on demand via webhooks. The high-level workflow is:

| Step | Action                                                    |
| ---- | --------------------------------------------------------- |
| 1    | Expose Notification Controller as a service               |
| 2    | Create a Kubernetes Secret with your GitHub webhook token |
| 3    | Generate a Receiver CR listening for `ping` and `push`    |
| 4    | Configure the GitHub webhook with payload URL and secret  |
| 5    | Push a commit and watch Flux reconcile immediately        |

### 2.1 Expose Notification Controller

Expose the `notification-controller` as a NodePort service:

```
kubectl -n flux-system expose deployment notification-controller \
  --name receiver \
  --port 80 \
  --target-port 9292 \
  --type NodePort
```

Confirm the service is up:

```
kubectl -n flux-system get svc receiver
```

Example:

```
NAME      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
receiver  NodePort    10.107.229.12   <none>        80:30547/TCP     8s
```

### 2.2 Create the GitHub Webhook Secret

Generate a Kubernetes secret in `flux-system`. The token must match the “Secret” configured in GitHub:

```
kubectl -n flux-system create secret generic github-webhook-token \
  --from-literal=token='secret-token-dont-share'
```

> [!important]
> **Note**
>
> Keep your webhook token secure. Never commit it to a public repo.

### 2.3 Create a Flux Receiver

Use `flux` CLI to create a Receiver CR that listens for `ping` and `push` events:

```
flux create receiver github-webhook-receiver \
  --type github \
  --event ping,push \
  --secret-ref github-webhook-token \
  --resource GitRepository/2-demo-source-git-bb-app \
  --export > github-webhook-receiver.yml
```

That generates:

```
apiVersion: notification.toolkit.fluxcd.io/v1beta2
kind: Receiver
metadata:
  name: github-webhook-receiver
  namespace: flux-system
spec:
  type: github
  events:
    - ping
    - push
  resources:
    - kind: GitRepository
      name: 2-demo-source-git-bb-app
  secretRef:
    name: github-webhook-token
```

Apply and push:

```
git add github-webhook-receiver.yml
git commit -m "Add GitHub webhook receiver"
git push
flux reconcile source git flux-system
```

Check the Receiver status:

```
flux get receivers
```

Example:

```
NAME                       SUSPENDED   READY   MESSAGE
github-webhook-receiver    False       True    Receiver initialized for path: /hook/ab09b3ac...
```

Copy the webhook path (`/hook/ab09b3ac...`) for GitHub configuration.

### 2.4 Configure GitHub Webhook

In your GitHub repo’s **Settings → Webhooks → Add webhook**, set:

- **Payload URL**: `https://<your-host>/hook/<receiver-path>`
- **Content type**: `application/json`
- **Secret**: your `github-webhook-token`

> [!important]
> **Note**
>
> Select only the **push** (and optionally **ping**) event to avoid unnecessary traffic.

If testing on a local cluster, you can expose your service via `localtunnel`:

```
npx localtunnel --port 30547
# or: lt --port 30547
```

The tool will return a public URL, e.g.:

```
https://tall-windows-guess-49-206-56-103.loca.lt
```

Append your `/hook/...` path to form the full Payload URL.

## 3\. Testing the Webhook-triggered Reconciliation

Now let’s scale the deployment again, this time to 4 replicas:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: block-buster
  namespace: 2-demo
spec:
  replicas: 4    # scaled up from 2
  selector:
    matchLabels:
      app: block-buster
  template:
    metadata:
      labels:
        app: block-buster
        api: downward
        usage: global
    spec:
      containers:
        - name: block-buster
          image: your-image:7.2.0
```

Commit and push your change:

```
git add .
git commit -m "Scale block-buster to 4 replicas"
git push
```

In another terminal, watch Flux detect the update via webhook:

```
flux get sources git 2-demo-source-git-bb-app -w
```

You should see the new revision appear almost instantly—no waiting for the 1m0s interval.

## Conclusion

By integrating FluxCD’s Notification Controller with GitHub webhooks, you gain near-instantaneous reconciliation on `push` events, accelerating your GitOps feedback loop and improving deployment velocity.

## Links & References

- [FluxCD Notification Controller](https://fluxcd.io/docs/components/notification/)
- [GitHub Webhooks Guide](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [FluxCD CLI Reference](https://fluxcd.io/docs/cmd/)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/6f4f2854-e5a5-4f3e-8910-85c47c018029/lesson/12051a70-33b7-49bf-bbce-50145d3fe4c7)**
>
> Watch video content
