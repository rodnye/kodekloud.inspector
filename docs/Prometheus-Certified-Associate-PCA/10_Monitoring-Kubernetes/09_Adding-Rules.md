# Adding Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Adding-Rules)

---

## Table of Contents

- Adding Rules
  - Defining a PrometheusRule
  - Understanding the Rule Selector
  - Creating and Applying New Rules
  - Verifying in Prometheus UI
  - Advanced Alerting Rules
  - Summary
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Adding Rules

In this lesson, you will learn how to add new alerting rules using the Prometheus operator. Similar to service monitors used for target registration, the Prometheus operator provides a Custom Resource Definition (CRD) called PrometheusRule. This CRD enables you to register alerting rules with a Prometheus instance. The configuration is nearly identical to that of a service monitor, with the main differences being the resource type and the specifics of the rule specification.

## Defining a PrometheusRule

Below is an example of a PrometheusRule definition:

```
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  labels:
    release: prometheus
  name: api-rules
spec:
  groups:
    - name: api
      rules:
        - alert: down
          expr: up == 0
          for: 0m
          labels:
            severity: critical
          annotations:
            summary: Prometheus target missing {{$labels.instance}}
```

This configuration is similar to the alerting rules you would normally define in the traditional `prometheus.yaml` file, but now it is encapsulated as a Kubernetes resource.

## Understanding the Rule Selector

When you run the command below:

```
kubectl get prometheuses.monitoring.coreos.com -o yaml
```

you might see an output like:

```
ruleSelector:
  matchLabels:
    release: prometheus
```

The `ruleSelector` property works similarly to a service discovery selector. It tells Prometheus which PrometheusRule resources to load dynamically by matching labels. Therefore, ensure that any PrometheusRule you create includes the label `release: prometheus` (or the corresponding label used in your configuration).

> [!important]
> **Tip**
>
> Ensure that your PrometheusRule metadata labels match the rule selector specified in your Prometheus configuration.

## Creating and Applying New Rules

To add new rules to your deployment, follow these steps:

1.  **Create a file** (e.g., `rules.yaml`) and paste your PrometheusRule configuration into it.
2.  **Apply the configuration** with the following command:

    ```
    kubectl apply -f rules.yaml
    ```

If you encounter an error indicating that no objects were provided for the apply command, verify that your file is saved and contains valid YAML content.

> [!important]
> **Verification**
>
> After applying the configuration, check the creation of your PrometheusRule by running:
>
> ```
> kubectl get prometheusrule
> ```

You should see output similar to the example below, where your API rule appears among the pre-existing rules:

```
kubectl apply -f rules.yaml
prometheusrule.monitoring.coreos.com/api-rules created
kubectl get prometheusrule
NAME
api-rules
prometheus-kube-prometheus-alertmanager.rules     16h
prometheus-kube-prometheus-config-loaders          16h
prometheus-kube-prometheus-etc                      16h
prometheus-kube-prometheus-general.rules           16h
prometheus-kube-prometheus-k8s.rules               16h
prometheus-kube-prometheus-kube-apiserver-availability.rules 16h
prometheus-kube-prometheus-burnrate.rules         16h
prometheus-kube-prometheus-history.rules          16h
prometheus-kube-prometheus-general.rules          16h
prometheus-kube-prometheus-node-recording.rules   16h
prometheus-kube-prometheus-kube-state-metrics     16h
prometheus-kube-prometheus-kubernetes-apps       52s
```

## Verifying in Prometheus UI

After applying the rule, you can verify its registration in the Prometheus UI:

1.  Navigate to the "Status" > "Rules" tab.
2.  Locate the "api" group with the registered alert.

This confirms that the rule was successfully detected and loaded by Prometheus.

## Advanced Alerting Rules

Below is an example of a more advanced alerting configuration that includes additional rules beyond the basic API alert:

```
api:
  alert: down
  expr: up == 0
  labels:
    severity: critical
  annotations:
    summary: Prometheus target missing {{ $labels.instance }}


alertmanager.rules:
  - alert: AlertmanagerFailedReload
    expr: max_over_time(alertmanager.config_last_reload_successful{job="prometheus-kube-prometheus-alertmanager", namespace="default"}[5m]) == 0
    for: 10m
    labels:
      severity: critical
    annotations:
      description: Configuration has failed to load for {{ $labels.namespace }} {{ $labels.pod }}.
      runbook_url: https://runbooks.prometheus-operator.dev/runbooks/alertmanager/alertmanagerfailedreload
      summary: Reloading an Alertmanager configuration has failed


  - alert: AlertmanagerMembersInconsistent
    expr: max_over_time(alertmanager.cluster_members{job="prometheus-kube-prometheus-alertmanager", namespace="default"}[5m]) < on (namespace, service) group_left () count by (namespace, service) (max_over_time(alertmanager.cluster_members{job="prometheus-kube-prometheus-alertmanager", namespace="default"}[5m]))
    for: 15m
```

## Summary

To register new alerting rules with Prometheus:

1.  Create a PrometheusRule resource with the desired groups and rules.
2.  Ensure the metadata labels match the rule selector used by your Prometheus instance.
3.  Apply the configuration using `kubectl apply -f rules.yaml`.
4.  Verify the rule registration via the Prometheus UI or with `kubectl get prometheusrule`.

By following these steps, you can efficiently add and manage alerting rules using the Prometheus operator.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/fa87266e-e72e-4431-b165-c99a30ec1a33)**
>
> Watch video content
