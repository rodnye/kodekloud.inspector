# Load Balancing GKE Traffic Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/Load-Balancing-GKE-Traffic-Services)

---

## Table of Contents

- Load Balancing GKE Traffic Services
  - Load Balancer Types in GKE
  - Configuring a LoadBalancer Service
  - GKE Subsetting for Layer-4 Internal Load Balancing
  - References
  - Watch Video
    - External Load Balancer
    - Internal Load Balancer
    - External Traffic Policy

---

## Content

GKE - Google Kubernetes Engine

Networking for GKE clusters

# Load Balancing GKE Traffic Services

Google Kubernetes Engine (GKE) offers a powerful LoadBalancer Service to expose your applications externally while distributing incoming requests across backend pods. When you create a Service of type `LoadBalancer`, GKE automatically provisions and configures the appropriate Google Cloud load balancer, streamlining your networking setup.

## Load Balancer Types in GKE

GKE supports two main load balancer types. Choose the one that matches your application’s accessibility and security requirements:

| Load Balancer Type     | IP Scope       | Use Case                                | Visibility        |
| ---------------------- | -------------- | --------------------------------------- | ----------------- |
| External Load Balancer | Public IP      | Internet-facing services                | Global/Public     |
| Internal Load Balancer | VPC-private IP | Internal microservices, multi-tier apps | VPC/Internal only |

### External Load Balancer

An External Load Balancer Service provisions a publicly accessible IP address. It routes traffic from clients outside your VPC to pods running in your GKE cluster—ideal for web applications, APIs, and services that require Internet exposure.

### Internal Load Balancer

An Internal Load Balancer Service uses an IP address from your VPC’s subnet. This setup routes traffic privately within the VPC or across peered networks, perfect for multi-tier architectures or services that must remain internal.

![The image illustrates the use of an internal load balancer in Google Kubernetes Engine (GKE) as part of a multi-tier architecture, facilitating internal communication within a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752875692/notes-assets/images/GKE-Google-Kubernetes-Engine-Load-Balancing-GKE-Traffic-Services/gke-internal-load-balancer-vpc-architecture.jpg)

> [!important]
> **Note**
>
> Internal Load Balancer Services do not allocate a public IP. Ensure your subnets and firewall rules allow traffic between your services and clients within the VPC.

Google Cloud provides a decision tree to guide you in selecting the right load balancer based on reachability, traffic policies, and network design:

![The image is a decision tree for selecting a load balancer on Google Cloud Platform (GCP), showing options between external and internal load balancers based on service reachability and traffic policies.](https://kodekloud.com/kk-media/image/upload/v1752875693/notes-assets/images/GKE-Google-Kubernetes-Engine-Load-Balancing-GKE-Traffic-Services/gcp-load-balancer-decision-tree.jpg)

## Configuring a LoadBalancer Service

The behavior of your load balancer is driven by fields in the Kubernetes Service manifest. Below is a sample configuration followed by key parameter descriptions.

```
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  annotations:
    cloud.google.com/load-balancer-type: "Internal"  # or "External"
spec:
  type: LoadBalancer
  loadBalancerIP: 10.0.0.50                           # Optional static IP
  externalTrafficPolicy: Local
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

| Parameter               | Description                                                                        | Example                               |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| `type`                  | Must be set to `LoadBalancer` to provision a Google Cloud load balancer.           | `LoadBalancer`                        |
| `loadBalancerIP`        | (Optional) Assigns a reserved static IP address.                                   | `10.0.0.50`                           |
| `externalTrafficPolicy` | Defines how client source IPs are handled.                                         | `Cluster` or `Local`                  |
| `annotations`           | Configure advanced features (e.g., GKE subsetting for internal L4 load balancing). | `cloud.google.com/load-balancer-type` |

> [!important]
> **Warning**
>
> Reserving a static IP using `gcloud compute addresses create` ensures your LoadBalancerIP remains unchanged after service updates or rescheduling.

### External Traffic Policy

Control how the load balancer forwards requests and preserves source IP:

| Policy  | Preserves Client IP | Node SNAT | Traffic Routing                                                    |
| ------- | ------------------- | --------- | ------------------------------------------------------------------ |
| Cluster | No                  | Yes       | Any node with healthy pods can receive and proxy traffic.          |
| Local   | Yes                 | No        | Only nodes with ready pods receive traffic (Direct Server Return). |

- **Cluster** (default):
  - Source IP is replaced by the node’s IP (SNAT).
  - Distributes traffic evenly across all healthy pods.

- **Local**:
  - Preserves the original client IP.
  - Direct Server Return ensures responses go back directly to clients, reducing latency.

## GKE Subsetting for Layer-4 Internal Load Balancing

GKE subsetting optimizes internal load balancers by limiting the backend nodes to only those running active pods for a service:

- Creates a Network Endpoint Group (NEG) per service per zone.
- Registers only nodes with at least one ready pod.
- Improves performance and scales efficiently in large clusters.

Without subsetting, the load balancer uses a single instance group containing all nodes, which can become a bottleneck.

**Example Scenario:**  
In a zonal cluster with 3 nodes and 2 internal services:

- Enabling subsetting creates 2 NEGs per zone.
- Each NEG contains only the nodes hosting the corresponding service.
- Traffic is distributed solely to relevant nodes, optimizing resource usage.

## References

- [GKE Service Load Balancing](https://cloud.google.com/kubernetes-engine/docs/concepts/service-load-balancing)
- [Kubernetes Service Type LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer)
- [Google Cloud Load Balancing Documentation](https://cloud.google.com/load-balancing/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/e39613e2-4771-4eaa-a8cf-6360f282895a/lesson/14cbacb9-d54a-4457-a900-0915ad3e3572)**
>
> Watch video content
