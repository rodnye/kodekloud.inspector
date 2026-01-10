# Additional Considerations API Priority Fairness - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Additional-Considerations-API-Priority-Fairness)

---

## Table of Contents

- Additional Considerations API Priority Fairness
  - API Priority and Fairness
  - Pod Priority and Preemption
  - Comparing API Priority and Pod Priority
  - Watch Video
    - Configuring API Priority
    - Configuring Pod Priority

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Additional Considerations API Priority Fairness

In multi-tenant Kubernetes environments, managing workload priorities is critical for ensuring that both the control plane and node resources are allocated efficiently. In this guide, we explore key concepts such as API priority and fairness, pod priority and preemption, and strategies for configuring DNS in a multi-tenant setup.

## API Priority and Fairness

Kubernetes processes all resource management operations through its singular API endpoint. This makes the API a focal point for managing requests like creating namespaces, scaling applications, and updating deployments. In clusters supporting multiple tenants—with varying levels of application criticality—it is crucial to ensure that essential API requests receive higher priority.

Consider a scenario with two tenants sharing a cluster. Tenant A (in namespace A) runs critical services that require rapid scaling, while Tenant B (in namespace B) handles less critical workloads. To avoid delays in request handling for Tenant A due to Tenant B’s traffic, Kubernetes allows configuring API priority and fairness settings.

### Configuring API Priority

You first define priority level configurations using the beta API from `flowcontrol.apiserver.k8s.io/v1beta3`. In the configuration below, the "high-priority" level is allocated a higher assured concurrency than the "low-priority" level:

```
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: PriorityLevelConfiguration
metadata:
  name: high-priority
spec:
  type: Limited
  limited:
    assuredConcurrencyShares: 10  # High priority gets more concurrency
    limitResponse:
      type: Queue
---
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: PriorityLevelConfiguration
metadata:
  name: low-priority
spec:
  type: Limited
  limited:
    assuredConcurrencyShares: 1  # Low priority gets less concurrency
    limitResponse:
      type: Queue
```

Next, create FlowSchema objects that map these priority levels to specific tenant requests. The following example assigns higher precedence to namespace A (critical tenant) over namespace B:

```
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: FlowSchema
metadata:
  name: high-priority-namespace-a
spec:
  priorityLevelConfiguration:
    name: high-priority  # Link to high priority
    matchingPrecedence: 1000
  rules:
    - subjects:
        - kind: ServiceAccount
          name: "system-account"  # Alternatively, match on user or service account
          namespace: "namespace-a"  # Target Namespace A
      resourceRules:
        - verbs: ["*"]
          apiGroups: ["*"]
          resources: ["*"]


---
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: FlowSchema
metadata:
  name: low-priority-namespace-b
spec:
  priorityLevelConfiguration:
    name: low-priority  # Link to low priority
    matchingPrecedence: 2000
  rules:
    - subjects:
        - kind: Group
          name: "regular-users"
        - kind: ServiceAccount
          name: "default"
          namespace: "namespace-b"  # Target Namespace B
      resourceRules:
        - verbs: ["*"]
          apiGroups: ["*"]
          resources: ["*"]
```

> [!important]
> **Key Insight**
>
> This configuration ensures that API requests from critical namespaces are prioritized, preserving the responsiveness of essential operations.

## Pod Priority and Preemption

Beyond API request handling, Kubernetes also supports pod priority and preemption to manage node resource allocation (including CPU, memory, etc.). This mechanism guarantees that critical pods gain necessary resources, even under resource pressure, by preempting or evicting less critical pods when needed.

![Diagram of a Kubernetes cluster with nodes A and B, showing namespaces for critical, regular, and development environments, illustrating pod priority and preemption.](https://kodekloud.com/kk-media/image/upload/v1752871628/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Additional-Considerations-API-Priority-Fairness/frame_200.jpg)

For example, if Tenant A (running critical workloads in namespace A) needs to ensure constant operation of production databases or core services, pod priority and preemption help maintain resource allocation, even if lower-priority Tenant B jobs are affected.

### Configuring Pod Priority

Begin by defining priority classes that distinguish between critical and non-critical workloads. In the configuration below, the "high-priority" class is assigned a higher value, ensuring its pods are scheduled preferentially:

```
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000  # High priority for critical workloads
globalDefault: false
description: "This priority class is for critical production workloads."
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: low-priority
value: 100  # Low priority for non-critical tasks
globalDefault: false
description: "This priority class is for non-critical development workloads."
```

Then, assign the appropriate priority class to your pod specifications. The following example shows how to define a critical application pod in namespace A:

```
apiVersion: v1
kind: Pod
metadata:
  name: critical-app
  namespace: namespace-a
spec:
  priorityClassName: high-priority
  containers:
  - name: app-container
    image: nginx
    resources:
      requests:
        memory: "500Mi"
        cpu: "500m"
      limits:
        memory: "500Mi"
        cpu: "500m"
```

This assignment ensures that pods associated with critical workloads receive the necessary scheduling preference during peak load scenarios.

## Comparing API Priority and Pod Priority

Both API priority and pod priority serve crucial yet distinct roles within a Kubernetes cluster:

- **API Priority and Fairness:**  
  These settings control the flow and processing of Kubernetes API requests. They manage operations such as creating, updating, or fetching cluster resources and ensure that critical API interactions are not stalled by heavy traffic from lower priority sources.
- **Pod Priority and Preemption:**  
  These mechanisms focus on resource allocation at the node level. They prioritize scheduling for critical pods and allow the system to evict lower priority pods when essential resources are required.

Below is a comparative illustration clarifying the roles of API priority versus pod priority:

![The image compares API Priority and Fairness with Pod Priority and Preemption, detailing their scope, purpose, controls, and handling, concluding they cannot replace each other.](https://kodekloud.com/kk-media/image/upload/v1752871629/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Additional-Considerations-API-Priority-Fairness/frame_380.jpg)

> [!important]
> **Important Reminder**
>
> Both mechanisms are integral for the stability and performance of multi-tenant clusters. It is important to carefully plan and test your configurations to ensure critical workloads receive the intended level of service.

By understanding and appropriately implementing API priority and pod priority configurations, you can effectively manage resource contention and maintain service quality across multi-tenant Kubernetes environments.

For more insights on Kubernetes configuration and best practices, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/68165e01-d5f6-406f-adc5-681c83aeddc2)**
>
> Watch video content
