# EKS Node Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Compute-Scaling/EKS-Node-Groups)

---

## Table of Contents

- EKS Node Groups
  - Unmanaged Node Groups
  - Managed Node Groups
  - Node Group Fundamentals
  - Scaling, Fargate, and Cluster Autoscaler
  - Custom AMIs with Managed Node Groups
  - Managed Upgrades and Churn
  - Links and References
  - Watch Video
    - Feature Comparison

---

## Content

AWS EKS

Compute Scaling

# EKS Node Groups

In this guide, we’ll dive into Amazon EKS Node Groups—the primary compute resource for your EKS cluster. A Node Group is simply a collection of EC2 instances (nodes) that register with the EKS control plane and run your Kubernetes workloads.

![The image shows a diagram labeled "Node Groups" with an "EKS Cluster" containing an "EC2 Instance" icon.](https://kodekloud.com/kk-media/image/upload/v1752862749/notes-assets/images/AWS-EKS-EKS-Node-Groups/node-groups-eks-cluster-ec2-diagram.jpg)

## Unmanaged Node Groups

Before Managed Node Groups existed, you had to “bring your own” nodes. You’d create an Auto Scaling Group (ASG) to launch EC2 instances and register each kubelet with your EKS API server. Scaling up or down was similar to managing a Deployment’s replica count.

![The image illustrates unmanaged node groups with a speech bubble requesting a specific type of EC2 instance, alongside a scale indicating the ability to scale up or down.](https://kodekloud.com/kk-media/image/upload/v1752862750/notes-assets/images/AWS-EKS-EKS-Node-Groups/unmanaged-node-groups-ec2-instance-scale.jpg)

With unmanaged Node Groups, you were responsible for:

- Creating and configuring the Auto Scaling Group
- Ensuring nodes join the correct cluster via kubelet
- Managing IAM roles and instance credentials
- Handling node lifecycle tasks (drain, replace, upgrade)

![The image is a diagram titled "Unmanaged Node Groups," showing four components: Autoscaling Group, Node Placement, Kubelet Clustering, and IAM Credentials, all associated with a customer.](https://kodekloud.com/kk-media/image/upload/v1752862751/notes-assets/images/AWS-EKS-EKS-Node-Groups/unmanaged-node-groups-diagram.jpg)

This approach worked, but it placed the full operational burden on you.

## Managed Node Groups

AWS Managed Node Groups simplify node operations by handling ASG provisioning, kubelet registration, and automated upgrades.

![The image shows a comparison between unmanaged and managed node groups, each represented by three hexagons with gear icons inside.](https://kodekloud.com/kk-media/image/upload/v1752862752/notes-assets/images/AWS-EKS-EKS-Node-Groups/unmanaged-managed-node-groups-comparison.jpg)

### Feature Comparison

| Feature                      | Unmanaged Node Groups   | Managed Node Groups      |
| ---------------------------- | ----------------------- | ------------------------ |
| Auto Scaling Group           | You configure ASG       | AWS manages ASG          |
| AMI Selection                | Manual AMI baking       | Launch template support  |
| Kubernetes Node Registration | Manual kubelet setup    | Automated registration   |
| IAM Role Management          | Manual role attachment  | IAM roles handled by AWS |
| Rolling Upgrades             | Custom scripts required | Built-in upgrade flow    |

By offloading these tasks, you can focus on your workloads instead of operational overhead.

## Node Group Fundamentals

Under the hood, every Node Group—managed or unmanaged—follows this workflow:

1.  You request nodes from EKS via the AWS API.
2.  The ASG spins up EC2 instances.
3.  Each node registers its kubelet with the EKS API server.
4.  Your Kubernetes scheduler places pods onto these nodes.

You can run multiple Node Groups per cluster—for high availability, GPU workloads, or mixed instance types.

![The image is a diagram illustrating how a node group works, showing nodes connected to an API server with memory and GPU specifications. It includes labels for node groups, memory, GPU, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752862753/notes-assets/images/AWS-EKS-EKS-Node-Groups/node-group-api-server-diagram.jpg)

## Scaling, Fargate, and Cluster Autoscaler

Label and taint your Node Groups to direct workloads where they belong—GPU jobs to GPU nodes, memory-heavy pods to high-memory instances, and so on. Keep each Node Group’s instance types similar to balance performance and cost.

Some control-plane add-ons or lightweight services (like the Cluster Autoscaler itself) can run on AWS Fargate to avoid scaling across many Node Groups.

![The image illustrates how a node group works, showing nodes organized into groups connected to an API server, with components like Fargate and Cluster Autoscaler.](https://kodekloud.com/kk-media/image/upload/v1752862754/notes-assets/images/AWS-EKS-EKS-Node-Groups/node-group-api-server-architecture.jpg)

> [!important]
> **Note**
>
> Use [taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) to isolate workloads to specific Node Groups and prevent scheduling conflicts.

## Custom AMIs with Managed Node Groups

If you need hardened or pre-baked images, Managed Node Groups support custom AMIs via launch templates. You can supply your own AMI ID, user data, and instance type overrides.

![The image outlines the benefits of Managed Node Groups, highlighting "Custom Amazon Managed Image (AMI)" and "Managed upgrades."](https://kodekloud.com/kk-media/image/upload/v1752862755/notes-assets/images/AWS-EKS-EKS-Node-Groups/managed-node-groups-benefits-ami-upgrades.jpg)

## Managed Upgrades and Churn

The standout feature of Managed Node Groups is built-in upgrades. When you bump your control plane version, AWS will:

1.  Generate a new launch template with the updated AMI/library versions
2.  Roll the ASG: terminate old nodes and launch new ones
3.  Drain each node so pods gracefully migrate

During this replacement, pods may be scheduled onto new and old nodes multiple times, causing churn. The Cluster Autoscaler may also react, so coordinate your upgrades carefully.

![The image illustrates a diagram of a cloud computing architecture involving Fargate, a cluster autoscaler, and a node group with multiple nodes. It shows the relationship between these components in managing churning workloads.](https://kodekloud.com/kk-media/image/upload/v1752862757/notes-assets/images/AWS-EKS-EKS-Node-Groups/cloud-computing-architecture-fargate-diagram.jpg)

> [!important]
> **Warning**
>
> Pod disruptions are expected during Node Group upgrades. Plan for `kubectl drain` windows and monitor the Cluster Autoscaler to avoid unexpected scale events.

---

Node Groups—whether unmanaged or AWS-managed—are the standard way to run Kubernetes nodes in EKS. Understanding their architecture, scaling patterns, and upgrade behavior ensures you build reliable, cost-effective clusters.

## Links and References

- [Amazon EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
- [AWS Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [Cluster Autoscaler on AWS](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1210661b-7eda-423b-b5f3-b758257d1221/lesson/676e0107-bb0a-43c5-8dbc-6a0a1d4bc6b4)**
>
> Watch video content
