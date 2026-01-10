# Auditing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Auditing)

---

## Table of Contents

- Auditing
  - Why Audit?
  - Audit Policies
  - Summary
  - Watch Video
    - Metadata Audit Policy
    - Request Audit Policy

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Auditing

In this lesson, we explore the concept of auditing in Kubernetes. Auditing involves recording and tracking every activity in the cluster to create a detailed history of events. This process is crucial for ensuring security, achieving compliance, and facilitating troubleshooting. With effective auditing, administrators can monitor resource access, detect potential security breaches, and verify that all actions comply with organizational policies. Audit logs capture important details including who made changes, when they were made, what was changed, and how the change was implemented.

Consider this sample audit event where an admin user creates an Nginx deployment. The event details include the user’s identity, the affected resource, and timestamps that indicate when the request was received and processed.

```
{
  "kind": "Event",
  "apiVersion": "audit.k8s.io/v1",
  "level": "Metadata",
  "auditID": "f4d9a5c1-5f4d-48cb-bd27-2f66c9d9c7c6",
  "stage": "ResponseComplete",
  "requestURI": "/apis/apps/v1/namespaces/default/deployments",
  "verb": "create",
  "user": {
    "username": "admin",
    "groups": [
      "system:masters",
      "system:authenticated"
    ]
  },
  "sourceIPs": ["192.168.1.10"],
  "userAgent": "kubectl/v1.20.0 (linux/amd64) kubernetes/af46c47",
  "objectRef": {
    "resource": "deployments",
    "namespace": "default",
    "name": "nginx-deployment",
    "apiVersion": "apps/v1"
  },
  "responseStatus": {
    "metadata": {},
    "code": 201
  },
  "requestReceivedTimestamp": "2024-07-29T07:50:04.123456Z",
  "stageTimestamp": "2024-07-29T07:50:04.223456Z",
  "annotations": {
    "authorization.k8s.io/decision": "allow",
    "authorization.k8s.io/reason": "RBAC: allowed by ClusterRoleBinding \"cluster-admin\" of ClusterRole \"cluster-admin\" to User \"admin\""
  }
}
```

In the example above, key details such as the API version, operation type, initiating user, and timestamps are logged. The user agent confirms that the request originated from a specific version of the kubectl command-line utility.

> [!important]
> **Note**
>
> Auditing logs are invaluable for tracing the source of issues, ensuring that resources are secured, and validating compliance with regulations such as GDPR, HIPAA, and PCI DSS.

## Why Audit?

Auditing is essential for tracking who did what, when, and where within a Kubernetes cluster. It plays a pivotal role in detecting unauthorized access and ensuring that resources are managed according to organizational policies. Detailed audit logs are also crucial for compliance with industry regulations and provide a thorough audit trail in the event of security incidents.

![The image outlines security and compliance, focusing on tracking user activities, regulatory compliance, and incident response with standards like GDPR, HIPAA, and PCI-DSS.](https://kodekloud.com/kk-media/image/upload/v1752871329/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Auditing/frame_100.jpg)

Furthermore, auditing helps administrators monitor changes to resources and configurations, making it easier to manage and troubleshoot issues by isolating the root cause of problems.

## Audit Policies

Kubernetes supports several audit policy levels that can be tailored to the required detail level:

- **None:** No events are logged.
- **Metadata:** Logs only request metadata (user, timestamp, resource, verb) without request/response bodies.
- **Request:** Logs both event metadata and the request body, but excludes the response body.
- **Request Response:** Logs event metadata, the request body, and the response body.

Below are examples that illustrate these configurations.

### Metadata Audit Policy

The following YAML configuration logs metadata for pod-related activities such as "get", "list", "create", "delete", and "update":

```
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Metadata
  verbs: ["get", "list", "create", "delete", "update"]
  resources:
  - group: ""
    resources: ["pods"]
```

When an event matches this policy, details such as the username, timestamp, and resource information are captured. An example audit event might look like:

```
{
  "kind": "Event",
  "apiVersion": "audit.k8s.io/v1",
  "level": "Metadata",
  "timestamp": "2024-10-11T12:34:56Z",
  "user": {
    "username": "system:serviceaccount:kube-system:default",
    "groups": ["system:serviceaccounts", "system:serviceaccounts:kube-system"]
  },
  "verb": "get",
  "namespace": "default",
  "resource": "pods",
  "stage": "ResponseComplete",
  "objectRef": {
    "resource": "pods",
    "namespace": "default",
    "name": "example-pod"
  }
}
```

### Request Audit Policy

This example shows how to configure an audit policy to capture both metadata and the full request details for "create", "delete", and "update" operations on pods:

```
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Request
  verbs: ["create", "delete", "update"]
  resources:
  - group: ""
    resources: ["pods"]
```

A sample audit event for a "create" operation might include the complete request object details:

```
{
  "kind": "Event",
  "apiVersion": "audit.k8s.io/v1",
  "level": "Request",
  "timestamp": "2024-10-11T12:34:56Z",
  "user": {
    "username": "system:serviceaccount:kube-system:default",
    "groups": ["system:serviceaccounts", "system:serviceaccounts:kube-system"]
  },
  "verb": "create",
  "namespace": "default",
  "resource": "pods",
  "stage": "ResponseComplete",
  "objectRef": {
    "resource": "pods",
    "namespace": "default",
    "name": "example-pod"
  },
  "requestObject": {
    "metadata": {
      "name": "example-pod",
      "namespace": "default"
    },
    "spec": {
      "containers": [
        {
          "name": "example-container",
          "image": "nginx"
        }
      ]
    }
  }
}
```

![The image shows an "Audit Policy" with four options: None, Metadata, Request, and Request Response, each in separate boxes.](https://kodekloud.com/kk-media/image/upload/v1752871330/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Auditing/frame_170.jpg)

## Summary

Kubernetes audit logs are essential for securing and managing clusters. These logs provide comprehensive details about every access request and change, making it easier to maintain compliance, detect security incidents, and troubleshoot issues. By understanding and implementing the appropriate audit policies, administrators can ensure a well-monitored and secure Kubernetes environment.

That's the end of this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/40739f67-05b7-4bda-9cd8-e8fa9cb5c0ba)**
>
> Watch video content
