# Demo Create a VPC native cluster and configure max allowed pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/Demo-Create-a-VPC-native-cluster-and-configure-max-allowed-pods)

---

## Table of Contents

- Demo Create a VPC native cluster and configure max allowed pods
  - 1. Set the Compute Zone
  - 2. Create a Custom VPC
  - 3. Add a Regional Subnet
  - 4. Launch an IP-Alias (VPC-native) GKE Cluster
  - 5. Verify Secondary Ranges
  - 6. Clean Up Resources
  - Links and References
  - Watch Video
    - Console View
    - CLI Verification
    - Delete the GKE Cluster
    - Remove Subnet and VPC

---

## Content

GKE - Google Kubernetes Engine

Networking for GKE clusters

# Demo Create a VPC native cluster and configure max allowed pods

In this tutorial, you’ll learn how to provision a VPC-native Google Kubernetes Engine (GKE) cluster with IP aliasing and manage its secondary IP ranges. We’ll walk through:

| Step | Description                                 |
| ---- | ------------------------------------------- |
| 1    | Set your Compute Zone                       |
| 2    | Create a custom VPC                         |
| 3    | Add a regional subnet                       |
| 4    | Launch an IP-alias (VPC-native) GKE cluster |
| 5    | Verify the secondary IP ranges              |
| 6    | Clean up all resources                      |

---

## 1\. Set the Compute Zone

Configure your default compute zone to `us-west1-a` (or your preferred region).

```
gcloud config set compute/zone us-west1-a
```

---

## 2\. Create a Custom VPC

Create a VPC in custom subnet mode so you can define your own IP ranges.

```
gcloud compute networks create gke-deep-dive-vpc \
  --subnet-mode=custom
```

In the Google Cloud Console, navigate to **VPC network → VPC networks**. You should see `gke-deep-dive-vpc` listed, but no subnets yet.

---

## 3\. Add a Regional Subnet

Define a subnet in `us-west1` with a /24 CIDR block.

```
gcloud compute networks subnets create gke-deep-dive-subnet \
  --network=gke-deep-dive-vpc \
  --range=10.10.0.0/24 \
  --region=us-west1
```

> [!important]
> **Note**
>
> VPC networks are global, whereas subnets are regional. Choose the region that best suits your workload.

Refresh **VPC networks → Subnets** in the Console to confirm the `gke-deep-dive-subnet` (10.10.0.0/24) appears under your VPC.

---

## 4\. Launch an IP-Alias (VPC-native) GKE Cluster

Use IP aliasing to allocate two secondary IP ranges—one for Pods and one for Services.

```
gcloud container clusters create gke-dive-vpc-native \
  --zone=us-west1-a \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10 \
  --enable-ip-alias \
  --network=gke-deep-dive-vpc \
  --subnetwork=gke-deep-dive-subnet \
  --cluster-secondary-range-name=pods-range \
  --services-secondary-range-name=services-range \
  --cluster-ipv4-cidr=/21 \
  --services-ipv4-cidr=/21
```

| Flag                              | Purpose                                         |
| --------------------------------- | ----------------------------------------------- |
| `--enable-ip-alias`               | Enable VPC-native IP aliasing                   |
| `--cluster-secondary-range-name`  | Name for the Pods’ secondary IP range           |
| `--services-secondary-range-name` | Name for the Services’ secondary IP range       |
| `/21` CIDR                        | Allocates a block with ~2048 IPs for each range |

Cluster provisioning can take several minutes.

---

## 5\. Verify Secondary Ranges

### Console View

In the Cloud Console, open **VPC networks → Subnets** and select `gke-deep-dive-subnet`. You should see two new secondary IP ranges:

![The image shows a Google Cloud Platform interface displaying details of a VPC subnet named "gke-deep-dive-subnet," including its IP ranges, region, and other network settings.](https://kodekloud.com/kk-media/image/upload/v1752875675/notes-assets/images/GKE-Google-Kubernetes-Engine-Demo-Create-a-VPC-native-cluster-and-configure-max-allowed-pods/google-cloud-vpc-subnet-details.jpg)

### CLI Verification

Describe the cluster’s IP allocation policy:

```
gcloud container clusters describe gke-dive-vpc-native \
  --zone=us-west1-a \
  --format="yaml(ipAllocationPolicy)"
```

Look for these fields in the output:

- `clusterIpv4Cidr`
- `servicesIpv4Cidr`
- `clusterSecondaryRangeName`
- `servicesSecondaryRangeName`

---

## 6\. Clean Up Resources

### Delete the GKE Cluster

```
gcloud container clusters delete gke-dive-vpc-native \
  --zone=us-west1-a --quiet
```

Secondary ranges are automatically detached from `gke-deep-dive-subnet` upon cluster deletion.

### Remove Subnet and VPC

```
gcloud compute networks subnets delete gke-deep-dive-subnet \
  --region=us-west1 --quiet


gcloud compute networks delete gke-deep-dive-vpc --quiet
```

Back in the Console, verify that only the default VPC remains:

![The image shows a Google Cloud Platform interface for managing VPC networks, displaying options for network analytics and a list of existing VPC networks with details like subnets and firewall rules.](https://kodekloud.com/kk-media/image/upload/v1752875677/notes-assets/images/GKE-Google-Kubernetes-Engine-Demo-Create-a-VPC-native-cluster-and-configure-max-allowed-pods/google-cloud-platform-vpc-network-management.jpg)

> [!important]
> **Warning**
>
> Resource deletion is irreversible. Ensure no critical workloads are running before you clean up.

---

## Links and References

- [GKE IP Aliasing](https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips)
- [Configuring VPC Networks](https://cloud.google.com/vpc/docs)
- [Google Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/e39613e2-4771-4eaa-a8cf-6360f282895a/lesson/682a569a-e383-4732-b1af-4ba7b3debb0b)**
>
> Watch video content
