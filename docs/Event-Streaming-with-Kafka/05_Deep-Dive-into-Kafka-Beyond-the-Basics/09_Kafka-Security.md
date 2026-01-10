# Kafka Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Deep-Dive-into-Kafka-Beyond-the-Basics/Kafka-Security)

---

## Table of Contents

- Kafka Security
  - Use Case Overview
  - Key Security Layers
  - Kafka Security Features
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Event Streaming with Kafka

Deep Dive into Kafka Beyond the Basics

# Kafka Security

Welcome to this deep dive into Kafka security. In this guide, we'll explore how to protect sensitive data in transit, in use, and at rest using Kafka’s built-in mechanisms.

---

## Use Case Overview

Imagine a banking application that publishes two types of events to a Kafka cluster:

- **Login Events**  
  When a customer logs in, the app writes a message to the `login-events` topic.
- **Card Payment Events**  
  When a payment is processed, the app writes a message to the `card-payment-events` topic.

Downstream microservices consume these events for auditing, notifications, analytics, and more.

---

## Key Security Layers

Both login and payment events contain sensitive customer data. To safeguard this information, address these three layers:

| Layer           | Goal                                                               | Kafka Feature                         |
| --------------- | ------------------------------------------------------------------ | ------------------------------------- |
| Data in Transit | Encrypt and authenticate communication between clients and brokers | TLS / SSL                             |
| Data in Use     | Authenticate clients and authorize topic-level operations          | SASL Authentication + ACLs            |
| Data at Rest    | Encrypt log segments and snapshots on disk                         | Volume encryption or Native Kafka DSP |

> [!important]
> **Note**
>
> Always rotate certificates and keys periodically to minimize risk in case of credential leakage.

---

## Kafka Security Features

Kafka provides several built-in mechanisms to meet these requirements:

| Feature             | Description                                                                                       | Reference                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| TLS Encryption      | Encrypt data in transit between producers, brokers, and consumers.                                | [TLS Setup](https://kafka.apache.org/documentation/#security_ssl)        |
| SASL Authentication | Support for SCRAM, GSSAPI (Kerberos), OAUTHBEARER, and PLAIN mechanisms.                          | [SASL Mechanisms](https://kafka.apache.org/documentation/#security_sasl) |
| ACL Authorization   | Fine-grained control over which principals can read/write specific topics and consumer groups.    | [ACLs](https://kafka.apache.org/documentation/#security_authz)           |
| Disk Encryption     | Use OS-level volume encryption or integrate third-party solutions for encrypting log directories. | —                                                                        |

---

## Next Steps

1.  Configure **TLS** on brokers and clients.
2.  Enable **SASL** for authenticating producers and consumers.
3.  Define **ACLs** to restrict topic access.
4.  Implement **disk encryption** for log segments and snapshots.

By following these steps, you’ll achieve end-to-end protection of sensitive Kafka data.

---

## Links and References

- [Kafka Security Documentation](https://kafka.apache.org/documentation/#security_overview)
- [Kafka Operations](https://kafka.apache.org/documentation/#operations)
- [Apache Zookeeper Security](https://zookeeper.apache.org/doc/current/security.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/9aa104e8-faa5-4099-977f-71744306b99d/lesson/1686796f-850f-4a9e-a360-996cbeab8364)**
>
> Watch video content
