# Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Configuration)

---

## Table of Contents

- Configuration
  - Global Configuration
  - Routing Section
  - Nested Routes (Subroutes)
  - Managing Multiple Teams with Subroutes
  - Reloading the Alertmanager Configuration
  - Matching Multiple Routes
  - Alert Grouping
  - Watch Video
    - Default (Fallback) Route

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Configuration

In this guide, we will review the Alertmanager configuration and explain its primary components. The Alertmanager configuration (typically stored in alertmanager.yml) is divided into three main sections: the global configuration, routing rules, and receivers. Each section plays a distinct role in how alerts are processed and forwarded.

## Global Configuration

The global configuration sets default parameters for the entire Alertmanager setup. Settings defined here—such as SMTP settings for email notifications—serve as defaults that individual routes and receivers can override. This structure mirrors the global configuration approach in Prometheus.

Below is an example of a global configuration block with routing rules and receivers defined:

```
global:
  smtp_smarthost: 'mail.example.com:25'
  smtp_from: 'test@example.com'
route:
  receiver: staff
  group_by: ['alertname', 'job']
  routes:
    - match_re:
        job: (node|windows)
      receiver: infra-email
    - matchers:
        job: kubernetes
      receiver: k8s-slack
receivers:
  - name: k8s-slack
    slack_configs:
      - channel: '#alerts'
        text: 'https://exampl.com/alerts/{{ .GroupLabels.app }}'
```

Key components in this configuration include:

- **Global Settings:** Define SMTP parameters and other default configurations.
- **Route Section:** Establishes matching rules to determine which alerts are sent to which receivers.
- **Receivers Section:** Contains notifier configurations (e.g., Slack, email) that manage how alerts are delivered.

## Routing Section

The routing section assigns alerts to specific receivers based on matching criteria. Routes can use either `matchers` for direct label comparisons or `match_re` for regular expression-based matching.

> [!important]
> **Matching Rules**
>
> Use **matchers** for exact label value comparisons. Leverage **match_re** when you require more flexible, regular expression-based matching.

For example, the following route configuration uses both methods:

```
route:
  routes:
    - match_re:
        job: (node|windows)
      receiver: infra-email
    - matchers:
        job: kubernetes
        severity: ticket
      receiver: k8s-slack
```

Once an alert matches the defined criteria, it is forwarded to the corresponding receiver as specified in the receivers section.

### Default (Fallback) Route

You can define a default or fallback route at the top level of your routing configuration. These routes catch any alerts that do not match more specific rules. In the example below, alerts that do not match any nested routes are grouped by `alertname` and `job`, then sent to the receiver named `staff`:

```
route:
  receiver: staff
  group_by: ['alertname', 'job']
  routes:
    - match_re:
        job: (node|windows)
      receiver: infra-email
    - matchers:
        job: kubernetes
      receiver: k8s-slack
```

## Nested Routes (Subroutes)

Alertmanager supports nested routes (subroutes) to allow for additional filtering. With nested routes, a parent route can first match alerts with a specific label (such as `job`), and subroutes can further refine the selection based on additional criteria, like `severity`.

Consider the following configuration. Alerts with the label `job: kubernetes` are routed to `k8s-email` by default; however, if an alert also includes `severity: pager`, it is forwarded to `k8s-pager`:

```
route:
  routes:
    - matchers:
        job: kubernetes
      receiver: k8s-email
      routes:
        - matchers:
            severity: pager
          receiver: k8s-pager
```

Processing steps include:

1.  The alert is first evaluated against the parent route (matching `job: kubernetes`).
2.  If the alert has the label `severity: pager`, the subroute is matched and sent to the `k8s-pager` receiver.
3.  Alerts missing the extra `severity` label default to the parent route’s receiver (`k8s-email`).

## Managing Multiple Teams with Subroutes

You can further refine routing for multiple teams by using subroutes. This approach ensures that alerts reach the appropriate team's notifiers. The following configuration demonstrates how to set up parent routes based on a team label, with subroutes handling alert severity:

```
route:
  routes:
    # Database team configuration
    - match:
        team: database
      receiver: database-pager
      routes:
        - match:
            severity: page
          receiver: database-pager
        - match:
            severity: email
          receiver: database-email
    # API team configuration
    - match:
        team: api
      receiver: api-pager
      routes:
        - match:
            severity: page
            env: dev
          receiver: api-ticket
        - match:
            severity: page
          receiver: api-pager
        - match:
            severity: ticket
          receiver: api-ticket
```

In this configuration:

- Alerts for the **database team** default to `database-pager`, unless further specifications direct them to `database-email`.
- Alerts for the **API team** default to `api-pager`, with additional subroutes managing alerts based on environment or severity.

## Reloading the Alertmanager Configuration

After making changes to your alertmanager.yml file, Alertmanager does not automatically reload the updated configurations. You must take one of the following actions to apply changes:

- Restart the Alertmanager process.
- Send a SIGHUP signal. For example:

  ```
  sudo killall -HUP alertmanager
  ```

- Send an HTTP POST request to the /-/reload endpoint.

> [!important]
> **Important**
>
> For production environments, ensure that your configuration file is validated before reloading to avoid disruptions in alert processing.

## Matching Multiple Routes

By default, Alertmanager stops processing routes after the first match is found. In the example below:

```
route:
  routes:
    - receiver: alert-logs
    - matchers:
        job: kubernetes
      receiver: k8s-email
```

If an alert matches the first route (`alert-logs`), it will not be evaluated for further matches with the Kubernetes-specific rule. To allow an alert to trigger multiple receivers, use the `continue` property on a route. Setting `continue: true` instructs Alertmanager to evaluate subsequent routes even after a match.

## Alert Grouping

Alert grouping consolidates multiple alerts into a single notification based on specified label values. The `group_by` field controls how alerts are bundled, which can be particularly useful when organizing alerts by team or other criteria.

For example, grouping alerts by team ensures that alerts for the same team are sent together:

```
route:
  receiver: fallback-pager
  group_by: [team]
routes:
  - match:
      team: infra
    group_by: [region, env]
    receiver: infra-email
    routes:
      - match:
          severity: page
        receiver: infra-pager
```

In this configuration:

- The default route groups alerts based on the `team` label.
- A nested route for the infrastructure team further groups alerts by `region` and `env`.
- Child routes inherit the grouping rules unless they define their own `group_by` values.

This comprehensive overview of the Alertmanager configuration covers global settings, routing strategies (including nested routes), receivers, and alert grouping. By understanding and leveraging these configurations, you can customize alert notifications to align with your infrastructure and operational requirements.

For more detailed information, visit the [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/31176c29-9994-4240-b2d0-6a8301945c3e)**
>
> Watch video content
