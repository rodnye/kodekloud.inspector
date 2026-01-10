# Alertmanager Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Alertmanager-Architecture)

---

## Table of Contents

- Alertmanager Architecture
  - Alert Processing Flow
  - Alertmanager System Overview Diagram
  - Summary
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Alertmanager Architecture

Alertmanager is a critical component in the Prometheus monitoring ecosystem. It receives alerts from Prometheus, processes them through a series of filter and routing stages, and finally converts them into notifications via various channels such as web pages, webhooks, email, SMS, and more. Additionally, Alertmanager can consolidate alerts from multiple Prometheus servers, providing centralized management through its API.

## Alert Processing Flow

When Prometheus sends alerts to Alertmanager via its API, the processing involves several key stages:

1.  **Dispatcher**  
    The alert first enters the dispatcher, which is responsible for routing it to the appropriate processing nodes.
2.  **Inhibition Node**  
    Next, the alert is passed to the inhibition node. Here, you can define rules to suppress specific alerts when certain other alerts are active. For example, if Alert X is firing, you can configure a rule to automatically suppress Alert Y.

    > [!important]
    > **Note**
    >
    > Using inhibition rules helps reduce alert noise and ensures that notifications are only sent for truly significant events.

3.  **Silencing Node**  
    After inhibition, the alert reaches the silencing node. Silencing rules allow you to mute alerts temporarily, which is particularly useful during planned maintenance windows. This prevents unnecessary notifications when known conditions are being actively managed.
4.  **Routing Section**  
    The alert then proceeds to the routing section, where the routing engine evaluates rules to decide which team or integration should receive the notification. The engine maps alerts to the appropriate destinations based on the alert's characteristics and predefined configurations.
5.  **Notification Engine**  
    Finally, the alert is handed over to the notification engine. This engine integrates with third-party services—such as email providers, pager systems, and chat platforms—to deliver notifications to users effectively.

## Alertmanager System Overview Diagram

![The image illustrates the architecture of Alertmanager, showing the flow from the Alertmanager API through dispatching, inhibition, silencing, routing, and notifications to various receivers like chat, pager, and email.](https://kodekloud.com/kk-media/image/upload/v1752882944/notes-assets/images/Prometheus-Certified-Associate-PCA-Alertmanager-Architecture/alertmanager-architecture-flow-diagram.jpg)

## Summary

This detailed overview of Alertmanager outlines the following processing stages:

| Stage               | Function                                                                         | Example/Use Case                                    |
| ------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- |
| Dispatcher          | Receives and routes alerts from Prometheus                                       | Initial alert handoff                               |
| Inhibition Node     | Suppresses duplicate or less critical alerts when certain conditions are met     | Reducing noise by suppressing redundant alerts      |
| Silencing Node      | Temporarily mutes alerts during known events (e.g., planned maintenance)         | Preventing notifications during maintenance windows |
| Routing Section     | Directs alerts to appropriate teams or integrations based on predefined rules    | Mapping alerts to correct notification channels     |
| Notification Engine | Integrates with third-party services to deliver final notifications to end users | Delivering notifications via email, SMS, chat, etc. |

By understanding this architecture, you can configure Alertmanager to efficiently manage and route alerts—ensuring that the right teams receive timely notifications and can respond promptly.

> [!important]
> **Warning**
>
> Ensure that your inhibition and silencing rules are well-tested. Misconfigured rules can lead to missed alerts or notification floods.

For more detailed information on integrating Prometheus and Alertmanager, refer to the official [Prometheus Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/ab0e2c24-453b-49ce-be91-5344c9b697c8)**
>
> Watch video content
