# VPC native and Route based cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/VPC-native-and-Route-based-cluster)

---

## Table of Contents

- VPC native and Route based cluster
  - VPC-native Clusters
  - Route-based Clusters
  - Key Differences
  - Benefits of VPC-native Clusters
  - References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Networking for GKE clusters

# VPC native and Route based cluster

In Google Kubernetes Engine (GKE), clusters differ in how they route Pod-to-Pod traffic. You can choose between:

- **VPC-native clusters**
- **Route-based clusters**

Each approach has its own networking model and operational considerations.

---

## VPC-native Clusters

A VPC-native cluster leverages alias IP ranges so that each VM or Pod network interface can carry multiple IP addresses. This design allows Pods to have their own unique internal IP, simplifying network policies and firewall configurations.

![The image illustrates a VPC-Native Cluster with alias IP ranges, showing a GKE cluster with nodes and pods, and their respective IP ranges within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752875710/notes-assets/images/GKE-Google-Kubernetes-Engine-VPC-native-and-Route-based-cluster/vpc-native-cluster-gke-nodes-pods.jpg)

> [!important]
> **Note**
>
> GKE Autopilot clusters enable VPC-native routing by default, so you don’t need to configure alias IPs manually.

---

## Route-based Clusters

In a route-based cluster, Pod networking relies on custom static routes defined in your VPC. Each route has:

- A **destination range** (CIDR block)
- A **next-hop** (instance, VPN tunnel, or gateway)

When a Pod sends traffic, Google Cloud uses the destination IP to look up the matching route and forward the packet accordingly.

![The image is a diagram titled "Route-Based Cluster (Custom Static Routes)" explaining the use of custom static routes within a VPC network, with Google Cloud routes defining paths and each route consisting of a destination prefix and a next hop.](https://kodekloud.com/kk-media/image/upload/v1752875712/notes-assets/images/GKE-Google-Kubernetes-Engine-VPC-native-and-Route-based-cluster/route-based-cluster-custom-static-routes.jpg)

---

## Key Differences

| Feature              | VPC-native            | Route-based                      |
| -------------------- | --------------------- | -------------------------------- |
| IP assignment        | Pod alias IP ranges   | Static routes for Pod CIDR       |
| Scalability          | No route quota limits | Limited by custom route quotas   |
| Firewall granularity | Per-Pod IP ranges     | Per-Node or broad CIDR           |
| VPC peering          | Fully supported       | Requires extra route propagation |
| Autopilot default    | Enabled               | Not available                    |

---

## Benefits of VPC-native Clusters

VPC-native clusters deliver several advantages:

- **Native routability**  
  Pod IPs are fully routable within the cluster’s VPC and any peered networks.
- **No static route quotas**  
  Alias IPs remove the need for per-Pod static routes, avoiding route quota consumption.
- **Granular firewall rules**  
  Apply policies directly to Pod IP ranges for tighter security controls.
- **On-premises connectivity**  
  Secondary Pod IP ranges can be reached via [Cloud VPN](https://cloud.google.com/vpn) or [Cloud Interconnect](https://cloud.google.com/interconnect) using [Cloud Router](https://cloud.google.com/router).
- **Enhanced feature support**  
  Services such as [Network Endpoint Groups (NEGs)](https://cloud.google.com/load-balancing/docs/negs) are optimized for VPC-native networking.

![The image outlines the benefits of a VPC-Native Cluster, highlighting features like native routability, no custom static routes quota, granular firewall rules, on-premises networks, and enhanced feature compatibility.](https://kodekloud.com/kk-media/image/upload/v1752875713/notes-assets/images/GKE-Google-Kubernetes-Engine-VPC-native-and-Route-based-cluster/vpc-native-cluster-benefits-outline.jpg)

---

## References

- [Google Cloud VPN](https://cloud.google.com/vpn)
- [Cloud Interconnect](https://cloud.google.com/interconnect)
- [Cloud Router](https://cloud.google.com/router)
- [Network Endpoint Groups (NEGs)](https://cloud.google.com/load-balancing/docs/negs)
- [GKE Autopilot](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/e39613e2-4771-4eaa-a8cf-6360f282895a/lesson/4bdb2e96-e39b-448a-bbe8-ebb0bd7a27b2)**
>
> Watch video content
