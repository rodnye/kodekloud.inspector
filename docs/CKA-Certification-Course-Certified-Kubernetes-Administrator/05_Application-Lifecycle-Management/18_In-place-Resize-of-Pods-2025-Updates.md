# In place Resize of Pods 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/In-place-Resize-of-Pods-2025-Updates)

---

## Table of Contents

- In place Resize of Pods 2025 Updates
  - Understanding the Default Behavior
  - The In-Place Update Mechanism
  - Limitations of In-Place Pod Resizing
  - Looking Ahead: Vertical Pod Autoscaler
  - Watch Video
    - Example of In-Place Update Manifest
    - Configuring Resize Policies

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# In place Resize of Pods 2025 Updates

In this guide, we explore how to perform in-place resizing of Pod resources—a feature that streamlines updates to resource changes without recreating the entire Pod. This innovative approach reduces downtime, especially for stateful workloads, by updating resource requirements directly on the running Pods.

## Understanding the Default Behavior

By default, Kubernetes (v1.32 and later) replaces the existing Pod when you modify resource requests or limits in a Deployment. Consider the following deployment configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
```

When you update the resource requirements, Kubernetes terminates the existing Pod and creates a new one with the updated resource specifications. This behavior may lead to temporary service disruption.

## The In-Place Update Mechanism

To address the disruption from full Pod recreation, Kubernetes is developing an in-place update mechanism for Pod resources. This feature has been available in alpha since Kubernetes 1.27 and is not enabled by default. It is expected to transition to beta—and eventually be enabled by default—as it matures.

### Example of In-Place Update Manifest

Below is an example where the CPU resource is increased from "250m" to "1". Thanks to the in-place update feature, this change can be applied without deleting the Pod:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx
        resources:
          requests:
            cpu: "1"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
```

To activate this feature, enable the in-place Pod vertical scaling feature flag with the following command:

```
$ FEATURE_GATES=InPlacePodVerticalScaling=true
```

Once enabled, you can specify additional resize policy parameters to control restart behavior for each resource. For instance, a policy can ensure that updating CPU resources does not trigger a Pod restart, while memory updates might still require one.

### Configuring Resize Policies

The following manifest demonstrates a resize policy for the CPU resource, allowing an update without restarting the Pod:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx
        resizePolicy:
          - resourceName: cpu
            restartPolicy: NotRequired
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
```

When the in-place update feature is active, increasing the CPU resource value (for example, from "250m" to "1") updates the running Pod directly without termination, ensuring smooth scalability and minimal service interruption.

> [!important]
> **Note**
>
> The in-place resizing feature currently supports only CPU and memory resources. Familiarize yourself with these constraints before implementation.

## Limitations of In-Place Pod Resizing

It is important to note the following limitations with the current implementation of in-place resizing:

- Only CPU and memory resources can be updated in place.
- Changes to Pod QoS classes and certain other attributes are not supported.
- Init containers and ephemeral containers are not eligible for in-place resizing.
- Resource requests and limits, once assigned to a container, cannot be shifted to another container.
- A container's memory limit cannot be reduced below its current usage; if such a request is made, the resize operation will remain in progress until the new memory limit is achievable.
- Windows Pods are not supported by this feature.

## Looking Ahead: Vertical Pod Autoscaler

While this article focused on manually resizing Pod resources, Kubernetes also offers the Vertical Pod Autoscaler (VPA) to automate scaling based on resource usage. VPA continuously monitors your application's resource consumption and adjusts requests and limits as needed, further reducing manual intervention.

For more details on Kubernetes resource management, visit the [Kubernetes Documentation](https://kubernetes.io/docs/) or explore [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

That's it for this topic. Enjoy seamless in-place updates and improved resource scaling with Kubernetes!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/d5e5b8f0-c3e0-4e88-ae16-800d6bba187f)**
>
> Watch video content
