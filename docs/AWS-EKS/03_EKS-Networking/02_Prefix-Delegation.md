# Prefix Delegation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Networking/Prefix-Delegation)

---

## Table of Contents

- Prefix Delegation
  - ENI Attachment and Pod IP Allocation
  - Warm ENI and Warm IP Pools
  - Prefix Delegation
  - Real-World Example
  - References
  - Watch Video
    - Example Capacities
    - WARM_ENI_TARGET
    - WARM_IP_TARGET

---

## Content

AWS EKS

EKS Networking

# Prefix Delegation

Now that you understand how the AWS VPC CNI plugin powers pod networking in Amazon EKS, this guide dives into its key configuration options—ENI attachment, warm pools, and prefix delegation—to maximize pod IP capacity and speed up scaling.

## ENI Attachment and Pod IP Allocation

In EKS, each worker node attaches an Elastic Network Interface (ENI) to the VPC subnet. The ENI’s primary IP serves the node itself (kubelet, kube-proxy, etc.), while secondary IPs are allocated to pods.

When a pod launches, the VPC CNI plugin requests a free IP from the node’s ENIs. Since each ENI can hold multiple secondary IPs, you can run many pods off one physical interface:

![The image illustrates the process of attaching a node to a cluster using an Elastic Network Interface (ENI) connected to a Virtual Private Cloud (VPC) with the IP range 10.16.0.0/24.](https://kodekloud.com/kk-media/image/upload/v1752862802/notes-assets/images/AWS-EKS-Prefix-Delegation/eni-attachment-node-cluster-vpc-diagram.jpg)

However, EC2 instance types impose limits on both the number of ENIs and IPs per ENI. For example, an instance with **1 ENI** and **5 IP addresses** will fill all addresses once you schedule four pods (plus the primary). Further pods cannot get an IP until another ENI attaches, which can take tens of seconds or more—and if you hit the maximum ENIs, pods remain `Pending`.

![The image illustrates a network of EC2 instances with various IP addresses, represented by gears and icons, with one instance labeled as having "No IP Address."](https://kodekloud.com/kk-media/image/upload/v1752862804/notes-assets/images/AWS-EKS-Prefix-Delegation/ec2-instances-network-ip-addresses-diagram.jpg)

You can either move to larger instance types (with higher ENI/IP limits) or enable **Prefix Delegation** to boost pod IP capacity per ENI:

![The image illustrates a network diagram showing "Prefix Delegation" with a central node connected to multiple "IP Address" nodes.](https://kodekloud.com/kk-media/image/upload/v1752862805/notes-assets/images/AWS-EKS-Prefix-Delegation/prefix-delegation-network-diagram-ip-nodes.jpg)

### Example Capacities

| Max ENIs per instance | IPs per ENI | Max Pods (without prefix delegation) |
| --------------------- | ----------- | ------------------------------------ |
| 1                     | 5           | 4                                    |
| 2                     | 5           | 9                                    |

## Warm ENI and Warm IP Pools

Attaching ENIs is relatively slow. To mitigate scheduling delays, the VPC CNI lets you keep extra resources “warm”:

### WARM_ENI_TARGET

This setting ensures a specified number of unused ENIs remain attached. For example, `WARM_ENI_TARGET=1` keeps one spare ENI ready. If you’re using 3 of 5 IPs on your primary ENI, the CNI will pre-attach a second ENI so that new pods get IPs immediately.

![The image illustrates a network configuration concept labeled "WARM_ENI_TARGET," showing a VPC-CNI setup with IP addresses linked to pods, and a note about adding one more ENI for three more pods.](https://kodekloud.com/kk-media/image/upload/v1752862806/notes-assets/images/AWS-EKS-Prefix-Delegation/warm-eni-target-vpc-cni-setup.jpg)

### WARM_IP_TARGET

Instead of full ENIs, you can maintain a pool of free IPs across all ENIs. The CNI calculates how many ENIs are needed to meet the target and pre-allocates them.

![The image illustrates a concept related to "WARM_IP_TARGET" with a node containing multiple "IP Address Slots" and a VPC-CNI component.](https://kodekloud.com/kk-media/image/upload/v1752862807/notes-assets/images/AWS-EKS-Prefix-Delegation/warm-ip-target-ip-address-slots-vpc-cni.jpg)

- On an instance with **5 IPs/ENI**, setting `WARM_IP_TARGET=10` attaches two ENIs (5 IPs each):

  ![The image illustrates a concept related to "WARM_IP_TARGET" with a target of 10, showing large instances, VPC-CNI, and 20 IPs per ENI.](https://kodekloud.com/kk-media/image/upload/v1752862808/notes-assets/images/AWS-EKS-Prefix-Delegation/warm-ip-target-large-instances-vpc-cni.jpg)

- On larger instances (e.g., 20 IPs/ENI), the same warm IP target can be satisfied by a single ENI.

## Prefix Delegation

Prefix Delegation lets each secondary allocation on an ENI be a `/28` block (16 addresses) instead of a single IP. Enable it via the `ENABLE_PREFIX_DELEGATION` environment variable:

![The image shows a diagram related to "ENABLE_PREFIX_DELEGLAGTION" with a toggle switch for "Prefix Delegation" and a Boolean option indicating True/False or Yes/No. It also includes a VPC-CNI icon.](https://kodekloud.com/kk-media/image/upload/v1752862809/notes-assets/images/AWS-EKS-Prefix-Delegation/enable-prefix-delegation-toggle-diagram.jpg)

When enabled, the CNI requests a `/28` prefix from the VPC and programs routes so that the node becomes the next hop for all 16 addresses. From one prefix you now get 16 pod IPs:

![The image illustrates a network configuration with "ENABLE_PREFIX_DELEGATION" showing a VPC-CNI setup, distributing multiple sets of 16 IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752862810/notes-assets/images/AWS-EKS-Prefix-Delegation/vpc-cni-network-configuration-ip-delegation.jpg)

On an ENI limited to 5 IPs (1 primary + 4 secondary), prefix delegation yields 4 × 16 = 64 pod IPs. Adding a second ENI gives another 64, for 128 total—without waiting for new attachments:

![The image illustrates a network configuration with "ENABLE_PREFIX_DELEGATION" showing a /28 CIDR block being divided into multiple groups of 16 IPs, connected to VPC-CNI.](https://kodekloud.com/kk-media/image/upload/v1752862811/notes-assets/images/AWS-EKS-Prefix-Delegation/network-configuration-enable-prefix-delegation.jpg)

> [!important]
> **Note**
>
> Enabling prefix delegation is an EKS best practice when you need high pod density per node.> [!important]
> **Warning**
>
> Your VPC subnet must have available `/28` CIDR blocks. Each delegated prefix consumes one `/28`.

## Real-World Example

1.  List your nodes:

    ```
    kubectl get nodes
    ```

2.  Check attached ENIs and delegated prefixes:

    ```
    eksdemo get eni
    ```

3.  Sort pods by IP to observe `/28` ranges:

    ```
    kubectl get pods -o wide --sort-by='.status.podIP'
    ```

    ```
    NAME                         READY STATUS  AGE   IP               NODE
    podinfo-7fd777f97c-tjhwd     1/1   Running 4m    192.168.114.27   i-029af76c1ec14277e.us-west-2.compute.internal
    podinfo-7fd777f97c-fpjtk     1/1   Running 4m    192.168.114.28   i-029af76c1ec14277e.us-west-2.compute.internal
    ...
    podinfo-7fd777f97c-zp2kw     1/1   Running 4m    192.168.114.31   i-029af76c1ec14277e.us-west-2.compute.internal
    podinfo-7fd777f97c-dk7nr     1/1   Running 4m    192.168.116.27   i-029af76c1ec14277e.us-west-2.compute.internal
    ...
    podinfo-7fd777f97c-cdmw      1/1   Running 4m    192.168.173.170  i-01d4c98ecb95cdb99.us-west-2.compute.internal
    ```

You’ll see blocks like `192.168.114.16–31` routed to one ENI. Scaling pods with prefix delegation is significantly faster than single-IP allocation since you avoid repeated ENI attachments.

---

While the AWS VPC CNI plugin offers many tunables, using the defaults plus **Prefix Delegation** is a powerful way to maximize pod IP capacity and accelerate scale-out without resorting to large instance types.

## References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [VPC CNI Plugin for Kubernetes](https://github.com/aws/amazon-vpc-cni-k8s)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/fdf5f38f-ffcc-4b70-bde9-751c06d39ac1/lesson/f655faeb-7dd4-462d-8bcd-3e1327935427)**
>
> Watch video content
