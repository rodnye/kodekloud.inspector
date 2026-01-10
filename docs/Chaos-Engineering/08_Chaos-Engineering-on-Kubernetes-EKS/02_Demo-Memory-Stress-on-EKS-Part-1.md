# Demo Memory Stress on EKS Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Demo-Memory-Stress-on-EKS-Part-1)

---

## Table of Contents

- Demo Memory Stress on EKS Part 1
  - 1. SSH into EC2 & Navigate to the Experiment Directory
  - 2. Create the IAM Role for FIS
  - 3. Attach IAM Policies to the FIS Role
  - 4. Configure kubectl & Apply RBAC
  - 5. Verify Metrics-Server & Pod Metrics
  - References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Demo Memory Stress on EKS Part 1

In this guide, we’ll prepare your environment for running AWS Fault Injection Simulator (FIS) experiments on Amazon EKS. By the end of this lesson, you will have:

- Logged into an EC2 host and navigated to your working directory
- Created an IAM role dedicated to AWS FIS
- Attached all required IAM policies to the role
- Configured `kubectl` and applied Kubernetes RBAC
- Verified that the metrics-server is operational and checked pod metrics

For more on AWS FIS, visit the [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html).

---

## 1\. SSH into EC2 & Navigate to the Experiment Directory

First, connect to your EC2 instance (e.g., via EC2 Instance Connect), switch to root, and change into the workshop folder:

```
# Elevate to root
sudo su -


# Move to the EKS FIS workshop directory
cd ~/environment/workshopfiles/fis-workshop/eks-experiment/
```

List the files to confirm you have the expected prerequisites:

```
ls -l
# total 8
# -rw-r--r-- 1 root root 212 Aug 17 16:14 fis-trust-policy.json
# -rw-r--r-- 1 root root 977 Aug 17 16:14 rbac.yaml
```

---

## 2\. Create the IAM Role for FIS

Your `fis-trust-policy.json` defines which AWS service can assume this role. Create the role using:

```
aws iam create-role \
  --role-name eks-fis-role \
  --assume-role-policy-document file://fis-trust-policy.json
```

Sample response:

```
{
  "Role": {
    "RoleName": "eks-fis-role",
    "Arn": "arn:aws:iam::123456789012:role/eks-fis-role",
    "AssumeRolePolicyDocument": {
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": { "Service": ["fis.amazonaws.com"] },
          "Action": "sts:AssumeRole"
        }
      ]
    }
  }
}
```

> [!important]
> **Note**
>
> Ensure the path to `fis-trust-policy.json` is correct and your AWS CLI is configured with sufficient permissions.

---

## 3\. Attach IAM Policies to the FIS Role

Grant the `eks-fis-role` permissions to manage EKS clusters, EC2 instances, Systems Manager, CloudWatch, and networking. You can attach them in a loop or individually. Below is a table of required policies:

| Policy Name                             | Purpose                                | AWS CLI Example                                                                |
| --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| AWSFaultInjectionSimulatorNetworkAccess | VPC and networking operations          | `arn:aws:iam::aws:policy/service-role/AWSFaultInjectionSimulatorNetworkAccess` |
| AWSFaultInjectionSimulatorEKSAccess     | EKS API actions                        | `arn:aws:iam::aws:policy/service-role/AWSFaultInjectionSimulatorEKSAccess`     |
| AWSFaultInjectionSimulatorEC2Access     | EC2 instance management                | `arn:aws:iam::aws:policy/service-role/AWSFaultInjectionSimulatorEC2Access`     |
| AWSFaultInjectionSimulatorSSMAccess     | Systems Manager for remote commands    | `arn:aws:iam::aws:policy/service-role/AWSFaultInjectionSimulatorSSMAccess`     |
| CloudWatchLogsFullAccess                | CloudWatch Logs for experiment logging | `arn:aws:iam::aws:policy/CloudWatchLogsFullAccess`                             |
| CloudWatchAgentServerPolicy             | CloudWatch Agent metrics push          | `arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy`                          |

Example of attaching one policy:

```
aws iam attach-role-policy \
  --role-name eks-fis-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSFaultInjectionSimulatorNetworkAccess
```

Repeat for each policy listed above.

---

## 4\. Configure `kubectl` & Apply RBAC

Update your kubeconfig to point at the target EKS cluster (replace `$AWS_REGION` and `PetSite` as needed):

```
aws eks update-kubeconfig \
  --name PetSite \
  --region $AWS_REGION
```

> [!important]
> **Warning**
>
> Be sure your AWS CLI profile has permission to call `eks:UpdateKubeconfig`. Incorrect context may lead to applying objects to the wrong cluster.

Next, apply the RBAC manifests to map the IAM role to a Kubernetes service account:

```
kubectl apply -f rbac.yaml


# serviceaccount/eks-fis-role created
# role.rbac.authorization.k8s.io/experiments created
# rolebinding.rbac.authorization.k8s.io/bind-role-experiments created
```

These objects allow FIS to interact with your pods using the service account credentials.

---

## 5\. Verify Metrics-Server & Pod Metrics

Ensure the metrics-server pod is running in your cluster:

```
kubectl get pods --all-namespaces | grep metrics-server


# kube-system   metrics-server-6d49bc694-c6stk    1/1     Running   0          15m
```

Once available, fetch pod-level metrics in the `default` namespace:

```
kubectl top pod --namespace default


# NAME                             CPU(cores)   MEMORY(bytes)
# petfood-74f5d6b95-2xgmn          1m           188Mi
# petfood-74f68d887d-6v7rs         1m           196Mi
# petfood-metric-7b68d8b87d-c4ndk  1m           187Mi
# pethistory-deployment-7c4f8696f8-qd263 57m     89Mi
# petsite-deployment-568567f5c8-qghr2    57m    131Mi
# xray-daemon-v87f6                     2m     19Mi
```

With these prerequisites in place, you’re ready to launch your first AWS FIS memory-stress experiment on EKS!

---

## References

- [AWS Fault Injection Simulator User Guide](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/1ed99780-9932-4590-8039-96113c04e730)**
>
> Watch video content
