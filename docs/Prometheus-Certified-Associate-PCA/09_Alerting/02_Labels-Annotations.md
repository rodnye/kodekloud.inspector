# Labels Annotations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Labels-Annotations)

---

## Table of Contents

- Labels Annotations
  - Labels: Classifying and Routing Alerts
  - Annotations: Adding Descriptive Context
  - Further Reading
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Labels Annotations

In this guide, we explore how to use labels and annotations in Alertmanager to enhance the context provided with your alerts. These features allow you to classify alerts effectively and add detailed descriptive information for clearer incident responses.

## Labels: Classifying and Routing Alerts

Labels are essential for classifying and matching alerts in Alertmanager. By adding key-value pairs as labels in your alert rule configuration, you can filter and route alerts according to specific criteria. For example, the following configuration demonstrates two alert rules with different severity levels:

```
groups:
  - name: node
    rules:
      - alert: Node down
        expr: up{job="node"} == 0
        labels:
          severity: warning
      - alert: Multiple Nodes down
        expr: avg_without(instance)(up{job="node"}) <= 0.5
        labels:
          severity: critical
```

When you inspect the alerts in Prometheus, you will see the labels contributing to the alert details:

```
- name: Node down
  expr: up{job="node"} == 0
  for: 3m
  labels:
    severity: warning
- name: Multiple Nodes down
  expr: avg_without(instance)(up{job="node"}) <= 0.5
  labels:
    severity: critical
```

> [!important]
> **Note**
>
> Labels are not only used for alert identification but also play a crucial role in establishing routing rules within Alertmanager, ensuring that alerts reach the appropriate teams.

## Annotations: Adding Descriptive Context

Annotations complement labels by providing additional descriptive details about an alert. They do not influence alert matching or routing but instead offer valuable context for understanding the alert's condition. Annotations use the Go templating language, enabling dynamic insertion of alert-related information.

For instance, you can access alert labels within an annotation using the following syntax:

- Use `{{ .labels }}` to retrieve all labels.
- Use `{{ .labels.instance }}` to get the value of the `instance` label.
- Use `{{ .value }}` to display the metric value at the time of the alert.

Consider an annotation named "description" that assembles information about the file system, device label, instance name, and current metric value. When triggered, the annotation might state: "file system /dev/sda3 on \[target instance\] is low on space. Current available space is 20.40345."

![The image shows an alert annotation indicating that the filesystem `/dev/sda3` on `192.168.1.168:9100` is low on space, with a current available space of 20.40345.](https://kodekloud.com/kk-media/image/upload/v1752882954/notes-assets/images/Prometheus-Certified-Associate-PCA-Labels-Annotations/low-space-alert-dev-sda3-192-168-1-168.jpg)

> [!important]
> **Warning**
>
> Ensure that the annotations you add are concise and provide only the necessary contextual information to avoid overwhelming the alert recipients.

When alerts are sent via email or SMS, these descriptive annotations provide your team with the crucial context needed to understand and respond to the alert effectively.

## Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [Alerts and Alertmanager Setup](https://prometheus.io/docs/alerting/latest/alertmanager/)

Understanding how to implement labels and annotations effectively in Alertmanager will streamline your incident response process and improve overall system monitoring.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/49dae37b-171f-416f-a715-28a083b2b436)**
>
> Watch video content
