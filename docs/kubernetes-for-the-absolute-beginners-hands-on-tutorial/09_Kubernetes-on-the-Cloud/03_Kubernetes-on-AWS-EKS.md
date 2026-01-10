# Kubernetes on AWS EKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-on-the-Cloud/Kubernetes-on-AWS-EKS)

---

## Table of Contents

- Kubernetes on AWS EKS
  - Installing and Configuring the AWS CLI
  - Setting Up kubectl
  - Creating the EKS Cluster
  - Adding a Node Group
  - Configuring kubectl for the EKS Cluster
  - Deploying the Voting Application
  - Cleanup
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes on the Cloud

# Kubernetes on AWS EKS

In this lesson, we will guide you through creating an Amazon Elastic Kubernetes Service (EKS) cluster—Amazon’s managed Kubernetes solution. Before proceeding, ensure you have met the prerequisites listed below:

![The image lists prerequisites for AWS setup, including an AWS account, KubeCtl CLI, EKS roles, IAM roles, VPC, EC2 key pair, and AWS basics.](https://kodekloud.com/kk-media/image/upload/v1752884924/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_10.jpg)

> [!important]
> **Prerequisites**
>
> • An active AWS account (new users can explore free access via the AWS Free Tier).
> • Installation of the [kubectl](https://kubernetes.io/docs/tasks/tools/) utility.
> • Basic AWS knowledge to configure a cluster role for EKS, create an IAM role for the node group, set up a VPC, and generate an EC2 key pair (the key pair is helpful for SSH access if needed).
> • The AWS CLI installed and configured with your credentials.

---

## Installing and Configuring the AWS CLI

First, verify that the AWS CLI is installed by running:

```
aws --version
```

If the AWS CLI is missing, install it using one of the following methods:

**On macOS:**

```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

**Using pip3:**

```
pip3 install awscli --upgrade --user
```

After installation, ensure that the AWS CLI is properly configured with your credentials.

---

## Setting Up kubectl

Since kubectl is already installed, you can verify its version and update your PATH if necessary. First, move the binary to a directory in your home and update your PATH:

```
mkdir -p $HOME/bin && mv ./kubectl $HOME/bin/ && export PATH=$PATH:$HOME/bin
```

(Optional) To permanently add `$HOME/bin` to your PATH, append the following line to your shell initialization file (e.g., `~/.bash_profile`):

```
echo 'export PATH=$PATH:$HOME/bin' >> ~/.bash_profile
```

Finally, check the kubectl client version to ensure it is ready:

```
kubectl version --short --client
```

---

## Creating the EKS Cluster

Before creating your cluster, confirm you have set up the required IAM role for your EKS cluster and prepared a VPC (or you can choose the default VPC). Follow these steps:

1.  Log in to your AWS account and navigate to **Services**.
2.  Search for **EKS** and select the service.
3.  Click **Create cluster** and configure the cluster:
    - **Cluster Configuration:**  
      Provide a name for your cluster (e.g., `example-voting-app`) and keep the default Kubernetes version (e.g., 1.16). Select the appropriate IAM role for your cluster.

      ![The image shows the AWS EKS console interface for configuring a Kubernetes cluster, including options for naming, version selection, and secrets encryption.](https://kodekloud.com/kk-media/image/upload/v1752884925/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_120.jpg)

    - Click **Next**.

4.  **Networking Configuration:**  
    Choose the default VPC in your region (e.g., US West 2 (Oregon 2)) and select all available subnets.

    ![The image shows the "Specify networking" step in creating an Amazon EKS cluster, where VPC and subnets are selected for network configuration.](https://kodekloud.com/kk-media/image/upload/v1752884926/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_140.jpg)

5.  Continue through the review pages by clicking **Next**, then click **Create**. Creation may take up to 10 minutes.

When the cluster status becomes active (checkmark visible), you can proceed to add a node group.

---

## Adding a Node Group

A node group represents a set of worker nodes that run your application workloads. To add a node group, follow these steps:

1.  In your EKS cluster's **Compute** section, click **Add node group**.
2.  Name the node group (e.g., `demo-workers`) and select the previously created EKS node IAM role.
3.  Choose the default subnets (or select those that correspond with your network setup).

    ![The image shows an AWS EKS console screen for configuring a node group, including fields for naming, IAM role selection, and subnet configuration.](https://kodekloud.com/kk-media/image/upload/v1752884927/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_200.jpg)

4.  Optionally, select an EC2 key pair if you wish to enable SSH access to the worker nodes.
5.  In the **Compute Configuration** section, review settings like AMI type, instance type, and disk size. Default values are generally acceptable.

    ![The image shows an AWS EKS console screen for setting node compute configuration, including AMI type, instance type, and disk size for a cluster.](https://kodekloud.com/kk-media/image/upload/v1752884928/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_230.jpg)

6.  Set the auto scaling parameters (minimum, maximum, and desired number of nodes), review your configuration, and click **Create**. Provisioning may take several minutes.

When the node group status is active and the worker nodes are visible (as EC2 instances), your cluster is now fully set up.

![The image shows an Amazon EKS console with a node group configuration for "demo-workers," indicating an active status and details like Kubernetes version and instance type.](https://kodekloud.com/kk-media/image/upload/v1752884930/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_270.jpg)

---

## Configuring kubectl for the EKS Cluster

Your local kubectl might be configured for a different cluster (e.g., Minikube). To switch to your new AWS EKS cluster, update your kubeconfig file using the AWS CLI. Replace the region and cluster name as needed:

```
aws eks --region us-west-2 update-kubeconfig --name example-voting-app
```

This command adds a new context to your kubeconfig file (typically located at `~/.kube/config`). Test your configuration by listing the nodes:

```
kubectl get nodes
```

You should see your worker nodes listed. Keep in mind that in managed Kubernetes services like EKS, the master nodes are maintained by AWS and are neither accessible for SSH nor intended for running workloads.

---

## Deploying the Voting Application

With your EKS cluster ready and kubectl configured, it’s time to deploy the sample voting application. Start by cloning the GitHub repository:

```
# git clone https://github.com/kODEKLOUDHUB/example-voting-app.git
Cloning into 'example-voting-app'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 872 (delta 5), reused 11 (delta 5), pack-reused 860
Receiving objects: 100% (872/872), 958.67 KiB | 1.25 MiB/s, done.
Resolving deltas: 100% (307/307), done.
# cd example-voting-app/k8s-specifications
```

Inside the `k8s-specifications` directory, you will find several YAML files defining deployments and services:

```
postgres-deploy.yaml    redis-deploy.yaml      voting-app-deploy.yaml
postgres-service.yaml   result-app-deploy.yaml voting-app-service.yaml
                        worker-app-deploy.yaml
```

Deploy the Kubernetes resources in the order outlined below:

1.  **Voting App Deployment and Service:**

    ```
    kubectl create -f voting-app-deploy.yaml
    kubectl create -f voting-app-service.yaml
    ```

2.  **Redis Deployment and Service:**

    ```
    kubectl create -f redis-deploy.yaml
    kubectl create -f redis-service.yaml
    ```

3.  **PostgreSQL Deployment and Service:**

    ```
    kubectl create -f postgres-deploy.yaml
    kubectl create -f postgres-service.yaml
    ```

4.  **Worker and Results App Deployments and Services:**

    ```
    kubectl create -f worker-app-deploy.yaml
    kubectl create -f result-app-deploy.yaml
    ```

After deploying these resources, verify their status by running:

```
kubectl get deployments,svc
```

A typical output might resemble:

```
NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/postgres-deploy         1/1     1            1           26s
deployment.apps/redis-deploy            1/1     1            1           34s
deployment.apps/result-app-deploy       1/1     1            1           13s
deployment.apps/voting-app-deploy       1/1     1            1           43s
deployment.apps/worker-app-deploy       0/1     1            0           18s

NAME                        TYPE           CLUSTER-IP      PORT(S)         AGE
service/db                 ClusterIP      10.100.250.53   <none>          22s
service/kubernetes         ClusterIP      10.100.0.1      443/TCP         22m
service/redis              ClusterIP      10.100.46.144   443/TCP         30s
service/result-service     LoadBalancer   10.100.222.36   <port-info>     9s
service/voting-service     LoadBalancer   10.100.173.35   <port-info>     39s
```

Once all deployments (including the worker application) have the desired number of ready pods, access the application using the Load Balancer URLs provided for the `voting-service` and `result-service`. Open the voting service URL in your web browser to view the voting interface.

![A webpage titled "Cats vs Dogs!" with voting buttons for "CATS" and "DOGS," allowing users to change their vote.](https://kodekloud.com/kk-media/image/upload/v1752884931/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-AWS-EKS/frame_550.jpg)

Vote for your preferred option and verify that the results update accordingly.

---

## Cleanup

> [!important]
> **Cleanup Reminder**
>
> After reviewing the application, ensure that you delete the EKS cluster and any deployed resources to avoid unnecessary charges.

Thank you for following this lesson. Happy clustering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/2f291cbc-acc2-4250-b96c-2094daff556d/lesson/07c2aa87-c9ea-47c1-b254-f3a6504f16b0)**
>
> Watch video content
