# Raise Alert using AlertManager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/Raise-Alert-using-AlertManager)

---

## Table of Contents

- Raise Alert using AlertManager
  - Step 1: Update Alertmanager Service to NodePort
  - Step 2: Explore Existing Prometheus Alert Rules
  - Step 3: Create a Custom ArgoCD Alert Rule
  - Step 4: Validate the New Alert Rule
  - Step 5: Test the Alert by Simulating an Out-of-Sync Application
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# Raise Alert using AlertManager

In this guide, you will learn how to raise ArgoCD alerts and view them in Alertmanager. Previously, we deployed a Kubernetes monitoring stack that included Alertmanager. In this tutorial, we will update Alertmanager to use a NodePort service and add a custom Prometheus alert based on ArgoCD metrics.

Follow this step-by-step procedure to configure and validate your alerts.

---

## Step 1: Update Alertmanager Service to NodePort

First, update the Alertmanager service so that it exposes a NodePort. In this example, the NodePort for Alertmanager is set to 32501.

To modify the Alertmanager service, run:

```
k -n monitoring edit svc my-kube-prometheus-stack-alertmanager
```

After saving the changes, you should see confirmation similar to:

```
service/my-kube-prometheus-stack-alertmanager edited
took 9s
```

Next, verify the service details using:

```
k -n monitoring get svc
```

The expected output includes:

```
NAME                                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                     AGE
alertmanager-operated                     ClusterIP   None            <none>        9093/TCP,9094/TCP,9094/UDP 25m
my-kube-prometheus-stack-alertmanager     NodePort    10.109.208.61   <none>       9093:32501/TCP              25m
my-kube-prometheus-stack-grafana          ClusterIP   10.108.205.232  <none>       80:31762/TCP                25m
my-kube-prometheus-stack-kube-state-metrics ClusterIP  10.107.154.159  <none>       8080/TCP                    25m
my-kube-prometheus-stack-prometheus       ClusterIP   10.101.105.243  <none>       443/TCP                     25m
my-kube-prometheus-stack-prometheus-node-exporter NodePort 10.104.79.233  <none>       9090:31534/TCP              25m
prometheus-operated                        ClusterIP   10.103.115.32   None         9100/TCP                    25m
```

This confirms that the Alertmanager service is now accessible via NodePort 32501.

---

## Step 2: Explore Existing Prometheus Alert Rules

Now, review the existing Prometheus alert rules to identify if there are any rules related to ArgoCD. Open the Prometheus UI and navigate to the rules tab. While you will see several rules like AlertmanagerFailedReload, AlertmanagerMembersInconsistent, and AlertmanagerFailedToSendAlerts, none are specifically configured for ArgoCD.

For instance, an existing set of rules appears as follows:

```
alert: AlertmanagerFailedReload
expr: max_over_time(alertmanager_config_last_reload_successful{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) == 0
for: 10m
labels:
  severity: critical
annotations:
  description: Configuration has failed to load for {{ $labels.namespace }}{{ $labels.pod }}.
  runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagerfailedreload
  summary: Reloading an Alertmanager configuration has failed.


alert: AlertmanagerMembersInconsistent
expr: max_over_time(alertmanager_cluster_members{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) < on(namespace, service) group_left() count by(namespace, service) (max_over_time(alertmanager_cluster_members{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]))
for: 15m
labels:
  severity: critical
annotations:
  description: Alertmanager {{ $labels.namespace }}{{ $labels.pod }} has only found {{ $value }} members of the {{ $labels.job }} cluster.
  runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagermembersinconsistent
  summary: A member of an Alertmanager cluster has not found all other cluster members.


alert: AlertmanagerFailedToSendAlerts
expr: (rate(alertmanager_notifications_failed_total{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) > 0.01)
for: 5m
labels:
  severity: warning
```

Since there is no specific rule for ArgoCD, we will add a custom alert rule next.

---

## Step 3: Create a Custom ArgoCD Alert Rule

Add a custom alert that triggers when an ArgoCD application is out of sync. This alert uses the Prometheus metric `argocd_app_info` (assumed to be available) to check if the sync status is "OutOfSync." If this condition persists for one minute, the alert is raised with a warning severity.

To add the new alert rule, edit the Prometheus rules in the monitoring namespace:

```
k -n monitoring edit prometheusrule my-kube-prometheus-stack-alertmanager.rules
```

Append the following configuration at the end of the file:

```
- alert: AlertmanagerClusterCrashlooping
  annotations:
    description: '{{ $value | humanizePercentage }} of Alertmanager instances within the {{ $labels.job }} cluster have restarted at least 5 times in the last 10m.'
    runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagerclustercrashlooping
  expr: |
    (
      count by (namespace, service) (
        changes(process_start_time_seconds{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[10m])
      )
    )
    /
    count by (namespace, service) (
      up{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}
    ) > 0.5
  for: 5m
  labels:
    severity: critical


- alert: ArgoApplicationOutOfSync
  expr: argocd_app_info{sync_status="OutOfSync"} == 1
  for: 1m
  labels:
    severity: warning
  annotations:
    summary: "'{{ $labels.name }}' Application has synchronization issue"
```

When you save your changes, the Prometheus operator will update the configuration to include these new rules.

To verify the update, run:

```
k -n monitoring get prometheusrules my-kube-prometheus-stack-alertmanager.rules -o yaml | grep -i argocd
```

If needed, you can edit the `'prometheusrule'` again:

```
k -n monitoring edit prometheusrule my-kube-prometheus-stack-alertmanager.rules
```

---

## Step 4: Validate the New Alert Rule

After updating the rules, check the Prometheus UI to confirm that the new ArgoCD alert appears alongside other Alertmanager rules. The rule for `ArgoApplicationOutOfSync` should be visible similar to the examples below:

```
alert: AlertmanagerFailedReload
expr: max_over_time(alertmanager_config_last_reload_successful{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) == 0
for: 10m
labels:
  severity: critical
annotations:
  description: Configuration has failed to load for {{ $labels.namespace }}{{ $labels.pod }}.
  runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagerfailedreload
  summary: Reloading an Alertmanager configuration has failed.
---
alert: AlertmanagerMembersInconsistent
expr: max_over_time(alertmanager_cluster_members{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) < on(namespace, service) group_left() count by(namespace, service) (max_over_time(alertmanager_cluster_members{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]))
for: 15m
labels:
  severity: critical
annotations:
  description: Alertmanager {{ $labels.namespace }}{{ $labels.pod }} has only found {{ $value }} members of the {{ $labels.job }} cluster.
  runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagermembersinconsistent
  summary: A member of an Alertmanager cluster has not found all other cluster members.
---
alert: AlertmanagerFailedToSendAlerts
expr: (rate(alertmanager_notifications_failed_total{job="my-kube-prometheus-stack-alertmanager", namespace="monitoring"}[5m]) > 0.01)
for: 5m
labels:
  severity: warning
annotations:
  summary: Alertmanager is failing to send alerts.
---
alert: ArgoApplicationOutOfSync
expr: argocd_app_info{sync_status="OutOfSync"} == 1
for: 1m
labels:
  severity: warning
annotations:
  summary: "'{{ $labels.name }}' Application has synchronization issue"
```

---

## Step 5: Test the Alert by Simulating an Out-of-Sync Application

To trigger the new alert, simulate an ArgoCD application going out of sync. For example, modify the replica count in a deployment definition. The following is an example for a deployment named "solar-system":

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
spec:
  replicas: 0
  selector:
    matchLabels:
      app: solar-system
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
      - image: siddharth67/solar-system:v9
        name: solar-system
        imagePullPolicy: Always
        ports:
        - containerPort: 80
```

After applying this change, the application status will change to "OutOfSync" and the `ArgoApplicationOutOfSync` alert should trigger within one minute.

Refresh the Alertmanager UI to view the generated alerts. You should see alerts for all out-of-sync ArgoCD applications. For example, the interface might display multiple alerts related to your ArgoCD applications.

![The image shows an Alertmanager interface displaying alerts related to "argocd-metrics," with details such as alert names, server instances, and severity levels.](https://kodekloud.com/kk-media/image/upload/v1752877504/notes-assets/images/GitOps-with-ArgoCD-Raise-Alert-using-AlertManager/alertmanager-argocd-metrics-alerts.jpg)

> [!important]
> **Note**
>
> This confirms that your ArgoCD Prometheus metrics are correctly triggering alerts in Alertmanager.

---

## Conclusion

In this lesson, you updated the Alertmanager service to use a NodePort, added a custom Prometheus alert for an ArgoCD application that went out of sync, and verified the new alert through the Alertmanager UI. This methodology can be extended to monitor and alert on additional ArgoCD scenarios.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/0335d260-46f6-4aa2-ae2e-b65ded9e145a)**
>
> Watch video content
