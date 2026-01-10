# Solution Cluster Upgrade Process - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Solution-Cluster-Upgrade-Process)

---

## Table of Contents

- Solution Cluster Upgrade Process
  - Inspecting the Current Cluster
  - Upgrade Strategy
  - Checking the Latest Stable Version with kubeadm
  - Upgrading the Control Plane Node
  - Upgrading the Worker Node
  - Reference to Kubernetes Documentation
  - Conclusion
  - Watch Video
    - Draining the Control Plane
    - Upgrading kubeadm and the Control Plane Components
    - Upgrading kubelet and kubectl
    - Draining the Worker Node
    - Upgrading kubeadm on the Worker Node
    - Upgrading kubelet and kubectl on the Worker Node

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Cluster Maintenance

# Solution Cluster Upgrade Process

In this lesson, we will walk through a hands-on lab demonstrating the process of upgrading a Kubernetes cluster running production applications. This upgrade covers inspecting the current cluster state, draining nodes, upgrading control plane and worker node components, and validating the new version—all while ensuring zero downtime during the migration of workloads.

---

## Inspecting the Current Cluster

Before upgrading, we need to verify the existing cluster configuration. Start by checking the current version of the Kubernetes cluster and confirming the node status by running:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS   ROLES    AGE   VERSION
controlplane   Ready    master   147m  v1.19.0
node01         Ready    <none>   146m  v1.19.0
root@controlplane:~#
```

The output confirms that the cluster is running version v1.19.0 with one master and one worker node. Next, check for any node taints to determine if nodes are available to host applications:

```
root@controlplane:~# kubectl describe node | grep Taints
Taints:             <none>
Taints:             <none>
root@controlplane:~#
```

Since no taints are present, both nodes can host workloads.

Now, verify the deployed applications (deployments) in the cluster:

```
root@controlplane:~# kubectl get deploy
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
blue   5/5     5            5           95s
root@controlplane:~#
```

Here, we observe that a single application named “blue” is running. To further validate distribution, check which nodes the pods are scheduled on:

```
root@controlplane:~# kubectl get pods -o wide
```

The output indicates that pods are running on both the control plane and node01.

---

## Upgrade Strategy

Since application uptime is critical and no additional virtual machines are available, the recommended strategy is to upgrade one node at a time. This sequential approach allows workloads to be migrated safely between nodes, thus avoiding downtime. Upgrading all nodes simultaneously would disrupt active workloads, so a staged upgrade—first the control plane, then the worker node—is the optimal solution.

!!! note "Important" Ensure that the upgrade is done following this strategy to prevent any service interruptions during the process.

---

## Checking the Latest Stable Version with kubeadm

Before initiating the upgrade, determine the latest stable Kubernetes version available via kubeadm:

```
root@controlplane:~# kubeadm upgrade plan
[upgrade/config] Making sure the configuration is correct:
[upgrade/config] Reading configuration from cluster...
[upgrade/config] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -oyaml'
[preflight] Running pre-flight checks.
[upgrade] Running cluster health checks.
[upgrade] Fetching available versions to upgrade to
[upgrade/versions] Cluster version: v1.19.0
[upgrade/versions] kubeadm version: v1.19.0
[upgrade/versions] Latest stable version: v1.19.16
[upgrade/versions] Latest stable version: v1.19.16
[upgrade/versions] Latest version in the v1.19 series: v1.19.16
Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT    CURRENT       AVAILABLE
kubelet      2 x v1.19.0   v1.19.16


Upgrade to the latest version in the v1.19 series:
COMPONENT                CURRENT    AVAILABLE
kube-apiserver         v1.19.0    v1.19.16
kube-controller-manager v1.19.0    v1.19.16
kube-scheduler         v1.19.0    v1.19.16
kube-proxy             v1.19.0    v1.19.16
CoreDNS               1.7.0      1.7.0
etcd                  3.4.9-1    3.4.9-1


You can now apply the upgrade by executing the following command:
kubeadm upgrade apply v1.19.16


Note: Before you can perform this upgrade, you have to update kubeadm to v1.19.16
```

Although newer versions (for example, v1.23.5) may exist, this lab uses the upgrade path within the v1.19 series.

---

## Upgrading the Control Plane Node

### Draining the Control Plane

Start by draining the control plane node to safely migrate workloads. Because DaemonSet-managed pods are running, be sure to include the ignore flag:

```
root@controlplane:~# kubectl drain controlplane --ignore-daemonsets
WARNING: ignoring DaemonSet-managed Pods: kube-system/kube-flannel-ds-9q9h4, kube-system/kube-proxy-vfd7p
evicting pod default/blue-746c8756d-r8h27
evicting pod kube-system/cordens-f9fd979d6-jzt89
evicting pod default/blue-746c8756d-2c8rs
evicting pod/blue-746c8756d-2c8rs evicted
evicting pod/cordens-f9fd979d6-rh287 evicted
evicting pod/default/blue-746c8756d-r8h27 evicted
evicting pod kube-system/cordens-f9fd979d6-jzt89 evicted
evicting pod/default/blue-746c8756d-2c8rs evicted
node/controlplane evicted
root@controlplane:~#
```

Confirm that the node is now unschedulable:

```
root@controlplane:~# kubectl get nodes
NAME          STATUS                     ROLES    AGE   VERSION
controlplane  Ready,SchedulingDisabled   master   153m  v1.19.0
node01        Ready                      <none>  152m  v1.19.0
root@controlplane:~#
```

Next, verify that the pods have migrated to node01:

```
root@controlplane:~# kubectl get pods -o wide
```

### Upgrading kubeadm and the Control Plane Components

The upgrade process involves updating the kubeadm tool, control plane components, and finally the kubelet. The goal is to upgrade from v1.19.0 to v1.20.0. Follow these steps:

1.  **Update the Package Cache and Check Available Versions**

    ```
    apt update
    apt-cache madison kubeadm
    # Identify the latest 1.20.x-00 version (e.g., 1.20.0-00)
    ```

2.  **Upgrade kubeadm**

    Depending on your environment, apply one of the methods below:

    ```
    # Method 1: Using apt-mark holders
    apt-mark unhold kubeadm && \
    apt-get update && apt-get install -y kubeadm=1.20.0-00 && \
    apt-mark hold kubeadm
    ```

    Or:

    ```
    # Method 2: Allowing changes for held packages
    apt-get update && \
    apt-get install -y --allow-change-held-packages kubeadm=1.20.0-00
    ```

    Verify the upgrade by running:

    ```
    kubeadm version
    ```

3.  **Check the Upgrade Plan Again**

    ```
    kubeadm upgrade plan
    ```

4.  **Apply the Upgrade to the Control Plane**

    Upgrade the control plane components using:

    ```
    sudo kubeadm upgrade apply v1.20.0
    ```

    If successful, you will see confirmation messages such as:

    ```
    [upgrade/successful] SUCCESS! Your cluster was upgraded to "v1.20.0"! Enjoy!
    [upgrade/notice] Now that your control plane is upgraded, please proceed with upgrading your kubelets if you haven't already done so.
    ```

### Upgrading kubelet and kubectl

To synchronize the node components with the control plane, upgrade kubelet and kubectl:

```
# Replace x in 1.20.x-00 with the latest patch version if necessary
apt-mark unhold kubelet kubectl && \
apt-get update && apt-get install -y kubelet=1.20.0-00 kubectl=1.20.0-00 && \
apt-mark hold kubelet kubectl
```

If your apt-get version is 1.1 or higher, you may alternatively use:

```
apt-get update && \
apt-get install -y --allow-change-held-packages kubelet=1.20.0-00 kubectl=1.20.0-00
```

Reload and restart the kubelet service:

```
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

After upgrading, uncordon the control plane node to allow it to schedule new workloads:

```
kubectl uncordon controlplane
```

Finally, verify that the control plane node is back to a Ready state:

```
kubectl get nodes
```

---

## Upgrading the Worker Node

### Draining the Worker Node

Before upgrading the worker node (node01), drain it to migrate its workloads:

```
kubectl drain node01 --ignore-daemonsets
```

Confirm that workloads have been rescheduled onto the control plane:

```
kubectl get pods -o wide
```

### Upgrading kubeadm on the Worker Node

SSH into node01 using its IP or configured settings, then update the kubeadm tool:

```
# Replace x in 1.20.x-00 with the latest patch version if necessary
apt-mark unhold kubeadm && \
apt-get update && apt-get install -y kubeadm=1.20.0-00 && \
apt-mark hold kubeadm
```

Apply the kubeadm node upgrade:

```
sudo kubeadm upgrade node
```

This will update the local kubelet configuration.

### Upgrading kubelet and kubectl on the Worker Node

Upgrade kubelet and kubectl on node01:

```
# Replace x in 1.20.x-00 with the latest patch version if necessary
apt-mark unhold kubelet kubectl && \
apt-get update && apt-get install -y kubelet=1.20.0-00 kubectl=1.20.0-00 && \
apt-mark hold kubelet kubectl
```

Reload and restart the kubelet service:

```
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

After completing the upgrades on the worker node, exit the session and verify from the control plane that both nodes are running the upgraded version:

```
kubectl get nodes
```

Expected output:

```
NAME           STATUS   ROLES                  AGE     VERSION
controlplane   Ready    control-plane,master   165m    v1.20.0
node01         Ready    <none>                 164m    v1.20.0
```

Finally, mark node01 as schedulable again by uncordoning it:

```
kubectl uncordon node01
```

Verify that node01 is now schedulable:

```
kubectl get nodes
```

---

## Reference to Kubernetes Documentation

For more detailed instructions on upgrading kubeadm clusters, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/cluster-upgrade/).

An example screenshot from the documentation is shown below:

![The image is a webpage from Kubernetes documentation detailing how to upgrade kubeadm clusters, including steps and links for different version upgrades.](https://kodekloud.com/kk-media/image/upload/v1752869699/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Cluster-Upgrade-Process/frame_420.jpg)

---

## Conclusion

In this lab, you successfully upgraded the Kubernetes control plane and worker node by executing a series of well-coordinated steps. Workloads were safely migrated between nodes to ensure service continuity throughout the process. Follow these step-by-step instructions, and refer to the [Kubernetes Documentation](https://kubernetes.io/docs/) for further details to achieve a smooth, no-downtime cluster upgrade.

End of lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/51676566-4860-4564-ad8e-4723a266211e/lesson/5ef28fb1-90ae-46cb-a71e-1dd3acc0ff28)**
>
> Watch video content
