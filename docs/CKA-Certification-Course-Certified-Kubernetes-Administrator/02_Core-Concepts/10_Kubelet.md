# Kubelet - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kubelet)

---

## Table of Contents

- Kubelet
  - Installing the Kubelet
  - Next Steps
  - Watch Video
    - Step 1: Download the Kubelet Binary
    - Step 2: Configure and Run the Kubelet as a Service
    - Step 3: Verify the Kubelet Process

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Kubelet

Welcome to this lesson on the Kubelet. In this guide, you will learn about the responsibilities of the Kubelet, its role within the Kubernetes cluster, and how to install it on worker nodes.

The Kubelet is often described as the "captain of the ship." It oversees node activities by managing container operations such as starting and stopping containers based on instructions from the master scheduler. Additionally, the Kubelet registers the node with the Kubernetes cluster and continuously monitors the state of pods and their containers. It regularly reports the status of the node and its workloads to the Kubernetes API server.

When the Kubelet receives instructions to run a container or pod, it communicates with the container runtime (e.g., Docker) to download the required image and initiate the container. It then maintains the health of these containers and ensures they operate as expected.

![The image illustrates Kubernetes architecture, showing master and worker nodes, components like kube-apiserver, kube-scheduler, ETCD cluster, and Docker integration for managing containers.](https://kodekloud.com/kk-media/image/upload/v1752869725/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Kubelet/frame_50.jpg)

> [!important]
> **Key Takeaway**
>
> The Kubelet is essential for node management in Kubernetes, acting as the intermediary between the cluster's control plane and the container runtime.

## Installing the Kubelet

Unlike other Kubernetes components, the Kubelet is not automatically deployed when you set up your cluster using tools like kubeadm. It must be installed manually on each worker node. Follow the steps below to install the Kubelet:

### Step 1: Download the Kubelet Binary

Execute the following command to download the Kubelet binary:

```
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kubelet
```

### Step 2: Configure and Run the Kubelet as a Service

Set up the Kubelet with the required configuration by running it as a service. Use the command below to start the Kubelet with the necessary parameters:

```
ExecStart=/usr/local/bin/kubelet \
  --config=/var/lib/kubelet/kubelet-config.yaml \
  --container-runtime=remote \
  --container-runtime-endpoint=unix:///var/run/containerd/containerd.sock \
  --image-pull-progress-deadline=2m \
  --kubeconfig=/var/lib/kubelet/kubeconfig \
  --network-plugin=cni \
  --register-node=true \
  --v=2
```

### Step 3: Verify the Kubelet Process

After installation, verify that the Kubelet is running by checking its process status on the worker node. Run the following command:

```
ps -aux | grep kubelet
```

This command will display all active processes containing "kubelet" along with their configuration options. An example output might look like:

```
root    2095  1.8  2.4 960676 98788 ?    Ssl  02:32   0:36 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/var/lib/kubelet/config.yaml --cgroup-driver=cgroupfs --cni-bin-dir=/opt/cni/bin --cni-conf-dir=/etc/cni/net.d --network-plugin=cni
```

> [!important]
> **Important**
>
> Ensure that all paths and configuration files referenced in your commands exist and are correctly set up on your system.

## Next Steps

In the upcoming sections, we will explore additional Kubelet configurations, such as certificate generation and TLS bootstrapping, to further secure and optimize your Kubernetes nodes.

This concludes our lesson on the Kubelet. Continue learning in the next article to deepen your understanding of Kubernetes node management and cluster orchestration.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/156af3a0-64e2-4052-9a93-ef2e742c26bd)**
>
> Watch video content
