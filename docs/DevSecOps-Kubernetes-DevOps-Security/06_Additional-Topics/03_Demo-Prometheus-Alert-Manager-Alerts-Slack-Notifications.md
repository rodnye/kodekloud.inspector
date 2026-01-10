# Demo Prometheus Alert Manager Alerts Slack Notifications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Additional-Topics/Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications)

---

## Table of Contents

- Demo Prometheus Alert Manager Alerts Slack Notifications
  - 1 Inspect the default Istio Prometheus configuration
  - 2 Integrate Prometheus with Alertmanager
  - 3 Define custom alerting rules
  - 4 Configure Alertmanager for Slack notifications
  - 5 Test end-to-end alerting
  - Conclusion
  - Links and References
  - Watch Video
    - 3.1 Example rule group
    - 5.1 Simulate HTTP 403 errors
    - 5.2 Silence active alerts
    - 5.3 Test the InstanceDown alert

---

## Content

DevSecOps - Kubernetes DevOps & Security

Additional Topics

# Demo Prometheus Alert Manager Alerts Slack Notifications

In this tutorial, you’ll learn how to integrate Prometheus (deployed by Istio) with Alertmanager, define custom alerting rules, and send notifications to Slack. We’ll cover:

- Inspecting Istio’s default Prometheus configuration
- Adding Alertmanager to Prometheus
- Writing and applying alerting rules
- Configuring Slack notifications in Alertmanager
- Testing alerts and silencing notifications

## 1 Inspect the default Istio Prometheus configuration

Istio’s add-ons include a Prometheus deployment whose `ConfigMap` defines scrape targets and placeholder alerts. It also deploys:

- A ServiceAccount for Prometheus
- A ConfigMap containing `prometheus.yml` and `alerting_rules.yml`
- ClusterRoles, RoleBindings, Service, and Deployment specs

Browse the Istio v1.9.0 repository on GitHub:

![The image shows a GitHub repository page for "istio/istio," displaying branches, tags, and recent commits. The user is viewing the branches and tags dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752873536/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/github-repo-istio-branches-tags.jpg)

Under `samples/addons`, you’ll find the Prometheus example:

![The image shows a GitHub repository page for Istio, specifically the "samples/addons" directory, with a list of files and their update history. The page is viewed in a dark theme with several browser tabs open at the top.](https://kodekloud.com/kk-media/image/upload/v1752873537/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/github-istio-samples-addons-directory.jpg)

Excerpt from the default `ConfigMap`:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus
  namespace: istio-system
  labels:
    component: "server"
    app: prometheus
data:
  alerting_rules.yml: |
    alerts: {}


  prometheus.yml: |
    global:
      evaluation_interval: 1m
      scrape_interval: 15s
      scrape_timeout: 10s
    rule_files:
      - /etc/config/recording_rules.yml
      - /etc/config/alerting_rules.yml
      - /etc/config/rules
      - /etc/config/alerts
    scrape_configs:
      - job_name: prometheus
        static_configs:
          - targets: ["localhost:9090"]
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      # …additional scrape_configs…
```

> [!important]
> **Note**
>
> By default, there is no `alerting:` section in `prometheus.yml` pointing to Alertmanager.

## 2 Integrate Prometheus with Alertmanager

1.  Open the Prometheus `ConfigMap` in the `istio-system` namespace:

    ```
    kubectl -n istio-system edit configmap prometheus
    ```

2.  Under `prometheus.yml`, add:

    ```
    alerting:
      alertmanagers:
        - static_configs:
            - targets:
                - devsecops_demo.eastus.cloudapp.azure.com:9093
    ```

3.  Save, then restart Prometheus:

    ```
    kubectl -n istio-system delete pod -l app=prometheus
    ```

4.  In the Prometheus UI, go to **Status → Configuration** to verify the Alertmanager endpoint.

## 3 Define custom alerting rules

Edit `alerting_rules.yml` in the same `ConfigMap` to add your rules. For inspiration, see [Awesome Prometheus Alerts](https://github.com/samber/awesome-prometheus-alerts):

![The image shows a webpage titled "Awesome Prometheus alerts," featuring a collection of alerting rules with options to view global configuration, rules, and contribute on GitHub. There is also a caution note about alert thresholds and a chat widget on the left.](https://kodekloud.com/kk-media/image/upload/v1752873538/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/awesome-prometheus-alerts-webpage.jpg)

### 3.1 Example rule group

```
groups:
  - name: Infrastructure
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          title: "Instance {{ $labels.instance }} down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."


      - alert: KubernetesPodClientError
        expr: istio_requests_total{reporter="destination",response_code="403"} > 10
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Kubernetes pod client error (instance {{ $labels.instance }})"
          description: "Pod {{ $labels.instance }} of job {{ $labels.job }} reported client-side errors"
```

Apply the rules and restart Prometheus:

```
kubectl -n istio-system delete pod -l app=prometheus
```

In the Prometheus UI under **Alerts** or **Rules**, you should see both alerts listed (initially _inactive_):

![The image shows a Prometheus monitoring interface displaying query results for various Kubernetes instances and services, with details like instance IPs, namespaces, and pod names.](https://kodekloud.com/kk-media/image/upload/v1752873540/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/prometheus-monitoring-kubernetes-query-results.jpg)

## 4 Configure Alertmanager for Slack notifications

Update your `alertmanager.yml`:

```
global:
  resolve_timeout: 1m
  slack_api_url: 'https://hooks.slack.com/services/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'


route:
  receiver: 'slack-notifications'


receivers:
  - name: 'slack-notifications'
    slack_configs:
      - send_resolved: true
        channel: '#prometheus'
        icon_url: 'https://avatars3.githubusercontent.com/u/3380462'
        title: >
          {{ if eq .Status "firing" }}
            {{ .Alerts.Firing | len }} {{ .CommonLabels.alertname }} firing
          {{ else }}
            {{ .CommonLabels.alertname }} resolved
          {{ end }}
        title_link: '{{ template "slack.default.titlelink" . }}'
        text: |
          {{ range .Alerts }}
          *Alert:* {{ .Annotations.summary }} {{ if .Labels.severity }}- `{{ .Labels.severity }}`{{ end }}
          *Description:* {{ .Annotations.description }}
          *Details:*
          {{ range .Labels.SortedPairs }} • *{{ .Name }}:* {{ .Value }}
          {{ end }}
          {{ end }}
```

Reload Alertmanager:

```
curl -X POST http://<alertmanager-host>:9093/-/reload
```

## 5 Test end-to-end alerting

### 5.1 Simulate HTTP 403 errors

1.  Deploy an Nginx pod and service in namespace `prod`:

    ```
    kubectl -n prod run nginx-403-demo --image=nginx --port=80
    kubectl -n prod expose pod nginx-403-demo --port=80
    ```

2.  Disable Istio mTLS:

    ```
    kubectl -n istio-system patch peerauthentication default \
      --type merge \
      -p '{"spec":{"mtls":{"mode":"DISABLE"}}}'
    ```

3.  Remove the default page to force 403 responses:

    ```
    kubectl -n prod exec -it nginx-403-demo -- bash -c 'rm /usr/share/nginx/html/index.html'
    ```

4.  Flood the pod with requests:

    ```
    kubectl -n prod exec -it nginx-403-demo -- bash -c 'while true; do curl -s localhost; sleep 0.1; done'
    ```

After ~60 s, **KubernetesPodClientError** should fire:

![The image shows a Prometheus interface displaying query results for Istio requests with a response code of "403." The results are presented in a table format with various metrics and labels.](https://kodekloud.com/kk-media/image/upload/v1752873541/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/prometheus-istio-query-results-403.jpg)

![The image shows a Prometheus alerting interface with active alerts for "KubernetesPodClientError," indicating three firing alerts related to client errors in Kubernetes pods. The alerts include details such as labels, state, and activation time.](https://kodekloud.com/kk-media/image/upload/v1752873542/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/prometheus-alerts-kubernetes-client-errors.jpg)

Check Alertmanager for firing alerts, then inspect Slack:

![The image shows a Slack workspace with a channel named "#prometheus" open. It displays a message from the Prometheus App indicating a Kubernetes pod client error alert.](https://kodekloud.com/kk-media/image/upload/v1752873543/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/slack-workspace-prometheus-kubernetes-alert.jpg)

### 5.2 Silence active alerts

1.  In Alertmanager, go to **Silences → New Silence**
2.  Add matchers (e.g., `alertname="KubernetesPodClientError"`)
3.  Set the duration and save

![The image shows a web interface for creating a new silence in Alertmanager, with fields for start and end times, duration, and a list of matchers for alerts affected by the silence.](https://kodekloud.com/kk-media/image/upload/v1752873544/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/alertmanager-silence-creation-interface.jpg)

View active silences:

![The image shows a web interface for Alertmanager, displaying details of a silence configuration, including its ID, start and end times, creator, and various matchers. The state is marked as active, and there are several tags related to Kubernetes and service information.](https://kodekloud.com/kk-media/image/upload/v1752873545/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/alertmanager-silence-configuration-interface.jpg)

Deploy additional pods (`n2-403`, `n3-403`, `n4-403`); only unsilenced alerts will appear in Slack:

![The image shows a Slack interface with a channel named "prometheus" displaying an alert message about a KubernetesPodClientError for Kubernetes pods. The alert includes details such as the alert name, connection security policy, and other related information.](https://kodekloud.com/kk-media/image/upload/v1752873547/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/slack-prometheus-alert-kubernetes-error.jpg)

### 5.3 Test the InstanceDown alert

Delete one of the demo pods to trigger **InstanceDown**:

```
kubectl -n prod delete pod n5-403-demo
```

After ~1 min, **InstanceDown** will fire and send a Slack notification:

![The image shows a Slack interface with a channel named "prometheus" displaying alerts related to Kubernetes pods, including critical and warning messages. The alerts detail issues such as an instance being down and a client error.](https://kodekloud.com/kk-media/image/upload/v1752873549/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Prometheus-Alert-Manager-Alerts-Slack-Notifications/slack-prometheus-kubernetes-alerts-interface.jpg)

## Conclusion

You have now:

1.  Updated Istio’s Prometheus `ConfigMap` to point at Alertmanager
2.  Defined custom alerting rules in Prometheus
3.  Configured Alertmanager to send Slack notifications
4.  Tested alert firing, notification delivery, and silencing

Extend this setup with other receivers such as email, PagerDuty, or OpsGenie.

## Links and References

- [Istio Prometheus Add-ons](https://istio.io/latest/docs/ops/integrations/prometheus/)
- [Alertmanager Slack Integration](https://prometheus.io/docs/alerting/latest/configuration/#slack_config)
- [Awesome Prometheus Alerts](https://github.com/samber/awesome-prometheus-alerts/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/d25abb68-4f2f-496a-b389-993b5377cc63/lesson/fd4ede02-6d38-4a4b-b82b-c7868a0abcc4)**
>
> Watch video content
