# Alertmanager Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Alertmanager-Rules)

---

## Table of Contents

- Alertmanager Rules
  - Standard Alertmanager Configuration vs. AlertManagerConfig CRD
  - Updating the Helm Chart
  - Verifying the CRD and Update
  - Creating and Verifying an AlertManagerConfig
  - Accessing and Verifying Alertmanager
  - Conclusion
  - Watch Video
  - Practice Lab
    - Standard Alertmanager YAML (snake_case)
    - AlertManagerConfig YAML (camelCase)

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Alertmanager Rules

This guide explains how to configure Alertmanager rules with the Prometheus operator’s AlertManagerConfig Custom Resource Definition (CRD). The CRD allows you to register new alert rules with Alertmanager, and its configuration closely mirrors that of a standard Alertmanager configuration file.

Below is an example of an AlertManagerConfig where alerts are grouped by the "severity" label and a single webhook receiver is defined:

```
apiVersion: monitoring.coreos.com/v1alpha1
kind: AlertmanagerConfig
metadata:
  name: alert-config
  labels:
    resource: prometheus
spec:
  route:
    groupBy: ["severity"]
    groupWait: 30s
    groupInterval: 5m
    repeatInterval: 12h
    receiver: "webhook"
  receivers:
    - name: "webhook"
      webhookConfigs:
        - url: "http://example.com/"
```

The configuration under the `spec` section is straightforward. You define the route—including parameters such as `groupBy`, `groupWait`, `groupInterval`, and `repeatInterval`—and then list your receivers. This mirrors the setup of a regular Alertmanager rule.

> [!important]
> **Note**
>
> When you execute:
>
> ```
> $ kubectl get alertmanagers.monitoring.coreos.com -o yaml
> spec:
> alertmanagerConfigNamespaceSelector: {}
> alertmanagerConfigSelector: {}
> ```
>
> you may notice that the `alertmanagerConfigSelector` property is empty. This selector helps Alertmanager discover AlertManagerConfig objects in your cluster. By default, the Helm chart does not set any label for this selector. To resolve this, update the Helm chart to include a label that matches the one specified in your AlertManagerConfig (in this case, `resource: prometheus`).

## Standard Alertmanager Configuration vs. AlertManagerConfig CRD

When comparing the traditional Alertmanager configuration file (commonly outside of Kubernetes) with the AlertManagerConfig CRD format, you will observe some differences:

### Standard Alertmanager YAML (snake_case)

```
route:
  receiver: staff
  group_by: ['severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 12h
routes:
  - matchers:
      job: kubernetes
    receiver: infra
    group_by: ['severity']
```

### AlertManagerConfig YAML (camelCase)

```
spec:
  route:
    groupBy: ["alertname"]
    groupWait: 30s
    groupInterval: 5m
    repeatInterval: 12h
    receiver: "webhook"
  routes:
    - matchers:
        - name: job
          value: kubernetes
      receiver: "infra"
      groupBy: ["severity"]
```

Notice that in the CRD format, you must split matchers into separate `name` and `value` fields instead of using a simple key-value pair.

## Updating the Helm Chart

To enable the selector for your AlertManagerConfig, update your Helm chart configuration as follows:

1.  First, retrieve the current values and save them to a file:

    ```
    $ helm show values prometheus-community/kube-prometheus-stack > values.yaml
    ```

2.  Locate and update the `alertmanagerConfigSelector` property in your `values.yaml` file:

    ```
    alertmanagerConfigSelector:
      matchLabels:
        resource: prometheus
    ```

3.  Save the changes and upgrade your Helm release:

    ```
    $ helm upgrade prometheus prometheus-community/kube-prometheus-stack -f values.yaml
    ```

This update ensures that the Alertmanager instance can locate and register your AlertManagerConfig objects.

## Verifying the CRD and Update

To inspect the CustomResourceDefinitions (CRDs) for Alertmanager, run:

```
$ kubectl get crd
```

You should see entries such as `alertmanagerconfigs.monitoring.coreos.com` and `alertmanagers.monitoring.coreos.com`. Then, verify that the Alertmanager configuration now includes your selector by running:

```
$ kubectl get alertmanagers.monitoring.coreos.com -o yaml
```

The output should now show the `alertmanagerConfigSelector` property populated with the matching label.

## Creating and Verifying an AlertManagerConfig

After updating your Helm chart, create a new AlertManagerConfig file. For example, save the configuration below as `alert.yaml`:

```
apiVersion: monitoring.coreos.com/v1alpha1
kind: AlertmanagerConfig
metadata:
  name: alert-config
  labels:
    resource: prometheus
spec:
  route:
    groupBy: ["severity"]
    groupWait: 30s
    groupInterval: 5m
    repeatInterval: 12h
    receiver: "webhook"
  receivers:
    - name: "webhook"
      webhookConfigs:
        - url: "http://example.com/"
```

Apply the configuration with:

```
$ kubectl apply -f alert.yaml
```

Then, verify that AlertManagerConfig was successfully registered:

```
$ kubectl get alertmanagerconfig
NAME         AGE
alert-config 17s
```

## Accessing and Verifying Alertmanager

To confirm that your configuration is active, set up port forwarding to the Alertmanager service:

```
$ kubectl port-forward service/prometheus-kube-prometheus-alertmanager 9093:9093
```

After establishing port forwarding, open your browser and navigate to [http://localhost:9093](http://localhost:9093) to access the Alertmanager UI. On the status page, you should see your `alert-config` webhook along with other configuration details, such as:

```
global:
  resolve_timeout: 5m
  http_config:
    follow_redirects: true
  smtp_hello: localhost
  smtp_require_tls: true
  pagerduty_url: https://events.pagerduty.com/v2/enqueue
  opsgenie_api_url: https://api.opsgenie.com/
  wechat_api_url: https://qyapi.weixin.qq.com/cgi-bin/
  victorops_api_url: https://alert.victorops.com/integrations/generic/20131114/alert/
  telegram_api_url: https://api.telegram.org
route:
  receiver: "null"
```

Your AlertManagerConfig, complete with the webhook receiver, should be clearly reflected in these configurations.

## Conclusion

In this article, we covered how to configure Alertmanager rules using the AlertManagerConfig CRD in Kubernetes. By updating your Helm chart and properly configuring the AlertManagerConfig, you can effectively manage and deploy custom alert rules in your environment. This approach enables seamless integration with the Prometheus operator and ensures your alerting system stays robust and responsive.

For further reading, consider checking out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Operator GitHub Repository](https://github.com/prometheus-operator/prometheus-operator)
- [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/3310a7e3-7f20-47ef-a2cc-77babda5196a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/0cf3e9ef-4c72-45ec-b382-12275b356795)**
>
> Practice lab
