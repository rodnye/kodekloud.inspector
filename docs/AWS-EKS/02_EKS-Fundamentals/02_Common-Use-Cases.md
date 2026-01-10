# Common Use Cases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Fundamentals/Common-Use-Cases)

---

## Table of Contents

- Common Use Cases
  - 1. Self-Managed Kubernetes on EC2 Instances
  - 2. Kubernetes Cluster Architecture
  - 3. Amazon EKS (Managed Control Plane)
  - 4. Integrating Kubernetes with AWS Services
  - References
  - Watch Video

---

## Content

AWS EKS

EKS Fundamentals

# Common Use Cases

Amazon Elastic Kubernetes Service (EKS) is AWS’s fully managed solution for running Kubernetes clusters. You get the same control plane and worker node model—but AWS handles control plane availability, etcd management, and version upgrades. This lesson compares self-managed Kubernetes on EC2 with a managed EKS control plane, and shows how EKS integrates with other AWS services.

---

## 1\. Self-Managed Kubernetes on EC2 Instances

With a self-managed approach, you provision EC2 VMs for both the control plane (etcd, API server, scheduler) and worker nodes. Tools like [KOPS](https://kops.sigs.k8s.io/) or [KubeSpray](https://github.com/kubernetes-sigs/kubespray) automate provisioning, but you remain fully responsible for cluster operations.

| Aspect        | Benefits                                                                | Drawbacks                                                     |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| Control Plane | Full control over scheduler flags, version upgrades, and cluster sizing | You must manage etcd backups, restores, HA, and patching      |
| Worker Nodes  | Flexibility to spin up large or temporary clusters                      | Operational overhead for OS updates, security, and monitoring |

> [!important]
> **Warning**
>
> If you lose etcd data, your entire Kubernetes cluster state is irretrievably lost. Implement reliable backup and restore procedures.

![The image is a diagram of a Kubernetes cluster, showing the control plane with components like etcd, API server, and scheduler, and the data plane with worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752862777/notes-assets/images/AWS-EKS-Common-Use-Cases/kubernetes-cluster-diagram-control-plane.jpg)

---

## 2\. Kubernetes Cluster Architecture

etcd is the distributed key-value store that underpins every Kubernetes cluster. It holds all resource definitions, pod states, and configuration data. Managing etcd yourself requires careful handling of backups, restores, and high availability.

> [!important]
> **Note**
>
> A production etcd cluster should run in a highly available configuration (odd number of nodes) and have automated snapshot backups.

![The image illustrates a Kubernetes cluster architecture, showing a database connected to the control plane (with etcd, API server, and scheduler) and the data plane (with worker nodes).](https://kodekloud.com/kk-media/image/upload/v1752862778/notes-assets/images/AWS-EKS-Common-Use-Cases/kubernetes-cluster-architecture-diagram.jpg)

---

## 3\. Amazon EKS (Managed Control Plane)

Amazon EKS shifts control plane (including etcd) management to AWS. You still launch and scale worker nodes within your VPC—either on EC2 or with Fargate—but AWS handles availability, upgrades, and patching for you.

**AWS Handles**

- etcd backups, restores, and multi-AZ high availability
- Control plane version upgrades and security patching
- API server scaling under load

**You Handle**

- Worker node provisioning, scaling, and lifecycle
- VPC/subnet configuration, IAM roles, and ENI permissions

> [!important]
> **Note**
>
> Use [Amazon EKS best practices](https://docs.aws.amazon.com/eks/latest/userguide/best-practices.html) for VPC design, IAM policies, and node group configuration.

![The image is a diagram of a Kubernetes cluster, showing the control plane with components like etcd, API server, and scheduler, and the data plane with worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752862780/notes-assets/images/AWS-EKS-Common-Use-Cases/kubernetes-cluster-diagram-control-plane-2.jpg)

---

## 4\. Integrating Kubernetes with AWS Services

Most organizations deploy Kubernetes alongside other AWS services—RDS for databases, S3 for object storage, ELB for ingress, and Route 53 for DNS. EKS simplifies service discovery, permissions, and network integration.

- Amazon RDS and Aurora for managed relational databases
- Amazon S3 for persistent object storage and backups
- Elastic Load Balancing to expose Ingress controllers
- Amazon Route 53 for internal and external DNS routing

![The image shows a central Kubernetes icon surrounded by icons representing various AWS services, illustrating EKS as an integrator.](https://kodekloud.com/kk-media/image/upload/v1752862781/notes-assets/images/AWS-EKS-Common-Use-Cases/kubernetes-eks-aws-services-diagram.jpg)

---

## References

- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [AWS Best Practices for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/best-practices.html)
- [KOPS GitHub](https://github.com/kubernetes/kops)
- [KubeSpray GitHub](https://github.com/kubernetes-sigs/kubespray)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/b84e1a30-d946-4325-96d8-f457dd1817f8/lesson/4f479f0a-230d-4eef-93c8-36f76a4427ea)**
>
> Watch video content
