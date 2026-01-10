# Quality of Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Quality-of-Service)

---

## Table of Contents

- Quality of Service
  - Guaranteed QoS
  - Burstable QoS
  - Best-Effort QoS
  - Network QoS
  - Storage QoS
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Quality of Service

In this article, we explore how Kubernetes implements Quality-of-Service (QoS) to manage resource allocation and ensure fair distribution of resources among tenants in multi-tenant environments. Kubernetes organizes pods into distinct QoS classes based on their resource requests and limits, which guarantees predictable resource availability while preventing any single tenant from monopolizing cluster resources.

Below, we detail several scenarios that illustrate the different QoS classes in Kubernetes.

---

## Guaranteed QoS

Pods receive the Guaranteed QoS classification when both CPU and memory requests and limits are set to identical values. With this configuration, Kubernetes guarantees that the pod always has the specified resources. The pod will not be evicted unless the host node experiences instability.

For example, consider a pod in namespace A running mission-critical production workloads:

```
apiVersion: v1
kind: Pod
metadata:
  name: critical-app
  namespace: namespace-a
spec:
  containers:
    - name: critical-container
      image: nginx
      resources:
        requests:
          memory: "500Mi"
          cpu: "500m"
        limits:
          memory: "500Mi"
          cpu: "500m"
```

In this configuration, both the requests and limits for memory and CPU are identical (500Mi and 500m, respectively), ensuring that the pod has a fixed allocation of resources.

---

## Burstable QoS

Pods that set resource requests to values lower than their limits belong to the Burstable QoS class. This configuration guarantees a minimum level of resources while allowing the pod to burst beyond that level if additional resources are available. This is particularly useful for workloads that can tolerate variability in resource consumption.

For instance, consider a pod in namespace B running burstable, less critical workloads:

```
apiVersion: v1
kind: Pod
metadata:
  name: burstable-app
  namespace: namespace-b
spec:
  containers:
    - name: burstable-container
      image: nginx
      resources:
        requests:
          memory: "200Mi"
          cpu: "200m"
        limits:
          memory: "16Gi"
          cpu: "1"
```

Here, the pod is guaranteed a minimum of 200Mi memory and 200m CPU but can scale up to 16Gi memory and 1 CPU if additional resources are available.

---

## Best-Effort QoS

Pods that do not specify any resource requests or limits fall under the Best-Effort QoS class. These pods do not benefit from guaranteed resources and will only consume resources when they are available. Under high resource pressure, Best-Effort pods are the first candidates to be evicted.

This QoS class is generally appropriate for development and testing workloads where resource guarantees are less critical.

---

## Network QoS

Although Kubernetes does not provide network QoS directly, it can be implemented using Container Network Interface (CNI) plugins such as Calico, or by leveraging Linux traffic control. Network QoS manages the network bandwidth usage of pods, which is essential when tenants have differing network performance requirements.

For example, a network policy implemented with Calico for namespace A might look like this:

```
apiVersion: crd.projectcalico.org/v1
kind: NetworkPolicy
metadata:
  name: tenant-a-network-policy
  namespace: namespace-a
spec:
  selector: all()  # Apply to all pods in Namespace A
  ingress:
    - action: Allow
      protocol: TCP
      destination:
        ports: [80]
      limits:
        rate: 10Mbps  # Limit ingress traffic to 10Mbps for tenant pods
  egress:
    - action: Allow
      protocol: TCP
      destination:
        ports: [80]
      limits:
        rate: 10Mbps  # Limit egress traffic to 10Mbps for tenant pods
```

> [!important]
> **Note**
>
> This network policy sets a maximum bandwidth limit of 10 Mbps, which is well-suited for production workloads such as streaming applications. For development environments (for example, in namespace B), you might enforce stricter bandwidth limits, such as 1 Mbps.

---

## Storage QoS

Storage QoS governs the number of I/O operations a pod can perform on its volumes. This is critical for workloads like databases that require high disk performance. Kubernetes indirectly supports storage QoS using storage classes and the underlying QoS features provided by your storage platform.

For a high-performance database workload in namespace A, you might use a StorageClass configured for high IOPS:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-performance
provisioner: kubernetes.io/aws-ebs
parameters:
  type: io1            # AWS io1 disks support high IOPS
  iopsPerGB: "50"      # Specify high IOPS per GB
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: Immediate
```

In contrast, namespace B, which may run development workloads, could use a standard storage class with lower IOPS that is adequate for general-purpose applications.

---

## Summary

Kubernetes QoS classes—Guaranteed, Burstable, Best-Effort, Network, and Storage QoS—play a crucial role in managing resource allocation in a multi-tenant environment. These mechanisms ensure that critical workloads receive the resources they need while permitting less critical workloads to access additional resources when available.

For further details, see the [Kubernetes Documentation](https://kubernetes.io/docs/) and explore additional resources on resource management and scheduling to optimize your Kubernetes clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/0c380fce-cff1-4913-8dcf-26f5ac3a6b8e)**
>
> Watch video content
