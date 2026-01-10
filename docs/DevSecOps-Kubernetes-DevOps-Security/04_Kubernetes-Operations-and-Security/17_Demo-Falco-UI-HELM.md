# Demo Falco UI HELM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Falco-UI-HELM)

---

## Table of Contents

- Demo Falco UI HELM
  - Table of Contents
  - Prerequisites
  - Falco Sidekick Overview
  - Installing Helm 3
  - Deploying Falco with Sidekick
  - Verifying the Installation
  - Accessing the Falco Sidekick UI
  - Triggering an Alert
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Falco UI HELM

In this guide, you’ll learn how to extend Falco alerts using [Falco Sidekick](https://github.com/falcosecurity/falco-sidekick) and visualize them with a Web UI. We’ll cover installing Falco Sidekick via [Helm](https://helm.sh) on a Kubernetes cluster and configuring notifications (e.g., Slack, Teams, Datadog).

Falco Sidekick is a companion project that delivers Falco events to multiple endpoints—stdout, files, gRPC, shell commands, HTTP, and UIs. Enabling its Web UI lets you explore alerts in real time.

---

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Falco Sidekick Overview](#falco-sidekick-overview)
3.  [Installing Helm 3](#installing-helm-3)
4.  [Deploying Falco with Sidekick](#deploying-falco-with-sidekick)
5.  [Verifying the Installation](#verifying-the-installation)
6.  [Accessing the Falco Sidekick UI](#accessing-the-falco-sidekick-ui)
7.  [Triggering an Alert](#triggering-an-alert)
8.  [Next Steps](#next-steps)
9.  [Links and References](#links-and-references)

---

## Prerequisites

> [!important]
> **Note**
>
> - A running Kubernetes cluster
> - `kubectl` configured for your cluster
> - `helm` CLI installed locally

---

## Falco Sidekick Overview

Falco Sidekick extends Falco’s native alerting by routing events to various destinations:

| Destination     | Protocol  | Configuration Key                       |
| --------------- | --------- | --------------------------------------- |
| Web UI          | HTTP      | `falcosidekick.webui.enabled`           |
| Slack           | HTTP POST | `falcosidekick.config.slack.webhookurl` |
| Microsoft Teams | HTTP POST | `falcosidekick.config.teams.webhookurl` |
| Datadog         | HTTP POST | `falcosidekick.config.datadog.apiKey`   |
| gRPC            | gRPC      | `falcosidekick.config.grpc.*`           |
| Shell Command   | Shell     | `falcosidekick.config.shell.command`    |
| File            | File      | `falcosidekick.config.file.filename`    |

---

## Installing Helm 3

Helm is the Kubernetes package manager. To install Helm 3:

```
export VERIFY_CHECKSUM=false
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
helm version
```

Expected output:

```
version.BuildInfo{Version:"v3.x.x", GitCommit:"...", GitTreeState:"clean", GoVersion:"go1.x.x"}
```

---

## Deploying Falco with Sidekick

1.  Create the `falco` namespace:

    ```
    kubectl create namespace falco
    ```

2.  Add the Falco Security Helm repo:

    ```
    helm repo add falcosecurity https://falcosecurity.github.io/charts
    helm repo update
    ```

3.  Install Falco with Sidekick and the Web UI:

    > [!important]
    > **Warning**
    >
    > Replace the placeholder webhook URL with your actual Slack (or Teams/Datadog) endpoint.

    ```
    helm install falco falcosecurity/falco \
      --namespace falco \
      --set falcosidekick.enabled=true \
      --set falcosidekick.webui.enabled=true \
      --set falcosidekick.config.slack.webhookurl="https://hooks.slack.com/services/XXXX/YYYY/ZZZZ"
    ```

---

## Verifying the Installation

Check Helm releases and Kubernetes resources:

```
helm ls -n falco
kubectl -n falco get all
```

Sample output:

```
NAME    NAMESPACE REVISION UPDATED                 STATUS   CHART     APP VERSION
falco   falco     1        2021-07-01 12:34:56 UTC deployed falco-1.XX.0 0.29.0


NAME                                    TYPE        CLUSTER-IP      PORT(S)     AGE
service/falco-falcosidekick             ClusterIP   10.0.0.123      2801/TCP    1m
service/falco-falcosidekick-ui          ClusterIP   10.0.0.124      2802/TCP    1m


NAME                                                 READY   STATUS    AGE
daemonset.apps/falco                                 1/1     Running   1m
deployment.apps/falco-falcosidekick                  2/2     Running   1m
deployment.apps/falco-falcosidekick-ui               1/1     Running   1m
```

By default, the UI service is `ClusterIP`. To expose it:

```
kubectl -n falco edit service falco-falcosidekick-ui
# Change `type: ClusterIP` to `type: NodePort` and save.
kubectl -n falco get service falco-falcosidekick-ui
```

---

## Accessing the Falco Sidekick UI

Open your browser at:

```
http://<node-ip>:<node-port>/ui
```

The UI launches with default alerts for privileged container launches.

![The image shows a Falcosidekick UI displaying events related to the launch of privileged containers, with detailed information about each event. The interface includes a search bar and various data fields such as user name, container ID, and event time.](https://kodekloud.com/kk-media/image/upload/v1752873742/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Falco-UI-HELM/falcosidekick-ui-privileged-containers-events.jpg)

The dashboard provides charts for event priorities and rule counts:

![The image shows a dashboard from the Falcosidekick UI, displaying a pie chart of event priorities and a bar chart of rules related to container security events.](https://kodekloud.com/kk-media/image/upload/v1752873743/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Falco-UI-HELM/falcosidekick-dashboard-pie-bar-chart.jpg)

On the **Events** tab, you can filter by severity and drill into individual alerts:

![The image shows a dashboard interface of the Falcosidekick UI displaying event logs with notices about container activities. It includes details like time, priority, and specific container information.](https://kodekloud.com/kk-media/image/upload/v1752873744/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Falco-UI-HELM/falcosidekick-ui-dashboard-event-logs.jpg)

---

## Triggering an Alert

Generate a new Falco event by executing a shell in any pod:

```
kubectl exec -it n1 -n istio-system -- sh
# Run a command, then exit
exit
```

Refresh the UI to see the new alert.

---

## Next Steps

In the next article, we’ll configure Sidekick to send alerts to a Slack channel. Reinstall Falco with your Slack webhook:

```
kubectl delete release falco -n falco
helm install falco falcosecurity/falco \
  --namespace falco \
  --set falcosidekick.enabled=true \
  --set falcosidekick.webui.enabled=true \
  --set falcosidekick.config.slack.webhookurl="https://hooks.slack.com/services/XXXX/YYYY/ZZZZ"
```

---

## Links and References

- [Falco Documentation](https://falco.org/docs/)
- [Falco Sidekick GitHub](https://github.com/falcosecurity/falco-sidekick)
- [Helm Charts for Falco](https://falcosecurity.github.io/charts)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/aa3c0077-5a2a-4c01-afd0-b1298995833b)**
>
> Watch video content
