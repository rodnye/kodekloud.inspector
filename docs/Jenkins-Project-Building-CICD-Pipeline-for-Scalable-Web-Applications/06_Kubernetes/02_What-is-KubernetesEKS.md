# What is KubernetesEKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Kubernetes/What-is-KubernetesEKS)

---

## Table of Contents

- What is KubernetesEKS
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Kubernetes

# What is KubernetesEKS

This article explores Kubernetes, the challenges it addresses, and its role in container orchestration. We also take a closer look at [Amazon EKS](https://learn.kodekloud.com/user/courses/aws-eks), a managed Kubernetes service that simplifies cluster management.

When deploying containerized applications, the process typically begins with running a container on a single host. However, relying on a single host is risky because if that host fails, the entire application goes down. To achieve high availability and resilience, applications must operate across multiple hosts. This scenario demands a system that can:

- Seamlessly deploy containers on different hosts.
- Perform load balancing to distribute incoming requests.
- Manage networking between containers across hosts.
- Automatically restart failed containers.
- Migrate containers to healthy nodes in case of host failure.
- Dynamically scale container instances based on traffic demands.

![The image illustrates "Container Challenges," showing a diagram with three hosts, where one host has a container issue marked with a red cross, while the other two hosts have multiple containers.](https://kodekloud.com/kk-media/image/upload/v1752879933/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-What-is-KubernetesEKS/container-challenges-diagram.jpg)

> [!important]
> **Key Insight**
>
> The challenges listed above highlight the need for a robust container orchestration solution.

A container orchestrator serves as the central management system for a containerized environment. It automates the deployment, scaling, and operation of containers across multiple hosts. Kubernetes, one of the most popular open-source orchestrators, rises to the challenge by offering comprehensive solutions for scheduling, load balancing, networking, and self-healing.

![The image describes container orchestrators, featuring Kubernetes, Apache Mesos, and ECS, along with their responsibilities such as deploying containers, load-balancing, and restarting failed containers.](https://kodekloud.com/kk-media/image/upload/v1752879934/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-What-is-KubernetesEKS/container-orchestrators-kubernetes-mesos-ecs.jpg)

Within a Kubernetes cluster, two primary node types play distinct roles:

1.  **Control Plane Nodes:**  
    These nodes are the brains of the cluster, responsible for making scheduling decisions, configuration management, and maintaining the desired state.
2.  **Worker Nodes:**  
    These nodes run the containerized applications, executing tasks as directed by the control plane.

![The image is a diagram explaining Kubernetes, showing a control plane and worker nodes, along with a brief description of their roles in managing and running containerized workloads.](https://kodekloud.com/kk-media/image/upload/v1752879935/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-What-is-KubernetesEKS/kubernetes-control-plane-worker-nodes-diagram.jpg)

> [!important]
> **Management Overhead**
>
> While managing both control plane and worker nodes is necessary, configuring and maintaining the control plane requires significant expertise and resources.

This is where [Amazon EKS](https://learn.kodekloud.com/user/courses/aws-eks) becomes invaluable. As a managed Kubernetes service, Amazon EKS offloads the complexities of managing the control plane to AWS. With EKS, AWS provisions, scales, and maintains control plane nodes across multiple availability zones to guarantee high availability. Consequently, users can concentrate on managing worker nodes—or use AWS Fargate to completely abstract worker node management.

![The image is an informational graphic about Elastic Kubernetes Service (EKS), showing a diagram of control plane and worker nodes, and explaining user responsibilities and management aspects of EKS.](https://kodekloud.com/kk-media/image/upload/v1752879936/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-What-is-KubernetesEKS/eks-control-plane-worker-nodes-diagram.jpg)

The key benefits of Amazon EKS include:

- High availability through control plane nodes running across multiple availability zones.
- Automatic scaling of control plane instances in response to load fluctuations.
- Seamless integration with other AWS services such as IAM (for authentication), Elastic Load Balancing (for distributing traffic), and ECR (for container image storage).

![The image outlines the benefits of Amazon EKS, highlighting its ability to run and scale control planes across multiple availability zones, integrate with AWS services like IAM and Elastic Load Balancing, and scale instances based on load.](https://kodekloud.com/kk-media/image/upload/v1752879937/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-What-is-KubernetesEKS/amazon-eks-benefits-control-planes.jpg)

By leveraging Kubernetes along with managed services such as [Amazon EKS](https://learn.kodekloud.com/user/courses/aws-eks), organizations can simplify container orchestration while reducing management overhead. This approach ensures that applications remain resilient, scalable, and secure in a dynamic cloud environment.

For further insights on container orchestration and best practices, consider exploring additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [EKS Best Practices](https://aws.amazon.com/eks/)
- [AWS Fargate](https://aws.amazon.com/fargate/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/1d8036bf-2606-4587-beef-925546e0c655/lesson/de3d4ceb-b972-4128-9be3-0b4367172763)**
>
> Watch video content
