# Solution Taints and Tolerations Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Solution-Taints-and-Tolerations-Optional)

---

## Table of Contents

- Solution Taints and Tolerations Optional
  - 1. Counting the Nodes
  - 2. Checking for Taints on node01
  - 3. Adding a Taint to node01
  - 4. Creating the "mosquito" Pod (Without Tolerations)
  - 5. Creating the "bee" Pod with a Toleration
  - 6. Removing the Control Plane Taint
  - 7. Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Solution Taints and Tolerations Optional

In this lesson, you will learn how to work with taints and tolerations in Kubernetes. The walkthrough covers checking the cluster's nodes, examining and modifying taints on a node, deploying pods with and without tolerations, and finally, removing a taint from the control plane node.

---

## 1\. Counting the Nodes

First, determine the total number of nodes (including the control plane) in your cluster. Run the following command to view the nodes:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS   ROLES                  AGE    VERSION
controlplane   Ready    control_plane,master   17m    v1.20.0
node01         Ready    <none>                16m    v1.20.0
root@controlplane:~#
```

As shown, the cluster contains two nodes: one control plane node and one worker node (node01).

---

## 2\. Checking for Taints on node01

To verify if there are any taints on node01, list the nodes again:

```
root@controlplane:~# kubectl get nodes
NAME          STATUS   ROLES                     AGE   VERSION
controlplane  Ready    control_plane,master      17m   v1.20.0
node01        Ready    <none>                    16m   v1.20.0
root@controlplane:~#
```

Next, inspect node01 in detail:

```
root@controlplane:~# kubectl describe node node01
Name:               node01
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=node01
                    kubernetes.io/os=linux
Annotations:        flannel.alpha.coreos.com/backend-data: {"VNI":1,"VtepMAC":"8e:62:74:26:35:47"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 10.58.27.11
                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    node.alpha.kubernetes.io/ttl: 0
CreationTimestamp:  Fri, 15 Apr 2022 22:57:19 +0000
Taints:             <none>
Unschedulable:      false
Lease:
  HolderIdentity:   node01
  AcquireTime:      <unset>
  RenewTime:        Fri, 15 Apr 2022 23:14:20 +0000
Conditions:
  Type                  Status  LastHeartbeatTime                  LastTransitionTime                Reason
  ----                  ------  -----------------                  ---------------------            ------
  NetworkUnavailable    False   Fri, 15 Apr 2022 22:57:25 +0000  Fri, 15 Apr 2022 22:57:25 +0000  Flannel
  IsUp                  True    Flannel is running on this node     Fri, 15 Apr 2022 22:57:19 +0000  Kubelet
  MemoryPressure        False   Fri, 15 Apr 2022 23:12:35 +0000  Kubelet has sufficient memory available
  DiskPressure          False   Fri, 15 Apr 2022 22:57:57 +0000  Kubelet has no disk pressure
```

> [!important]
> **Note**
>
> Since the "Taints" field shows `<none>`, node01 currently does not have any taints.

---

## 3\. Adding a Taint to node01

Now, add a taint to node01 that prevents pods without the necessary toleration from being scheduled there. Use the following parameters:

- **Key:** spray
- **Value:** moreteam
- **Effect:** NoSchedule

Execute this command:

```
root@controlplane:~# kubectl taint node node01 spray=moreteam:NoSchedule
```

After running this command, node01 now has the taint. Pods that do not tolerate this taint will not be scheduled on node01.

---

## 4\. Creating the "mosquito" Pod (Without Tolerations)

Next, create a pod named "mosquito" that uses the nginx image. Since this pod lacks a toleration for the taint on node01, it will remain in a pending state:

```
root@controlplane:~# kubectl run mosquito --image=nginx
pod/mosquito created
root@controlplane:~#
```

Verify the pod's status:

```
root@controlplane:~# kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
mosquito    0/1     Pending   0          3m37s
root@controlplane:~#
```

Inspect the pod details to confirm the scheduling issue:

```
root@controlplane:~# kubectl describe pod mosquito
Name:           mosquito
Namespace:      default
Priority:       0
Node:           <none>
Labels:         run=mosquito
Annotations:    <none>
Status:         Pending
IP:             <none>
Containers:
  mosquito:
    Image:      nginx
    Port:       <none>
    Host Port:  <none>
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-f6lxf (ro)
Conditions:
  Type           Status
  PodScheduled   False
Volumes:
  default-token-f6lxf:
    Type:       Secret (a volume populated by a Secret)
    SecretName: default-token-f6lxf
    Optional:   false
QoS Class:      BestEffort
Tolerations:    node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason             Age               From                Message
  ----     ------             ----              ----                -------
  Warning  FailedScheduling   45s (x2 over 45s) default-scheduler   0/2 nodes are available: 1 node(s) had taint {spray: moreteam:NoSchedule}, that the pod didn't tolerate, 1 node(s) had taint {node-role.kubernetes.io/master:NoSchedule}, that the pod didn't tolerate.
root@controlplane:~#
```

The error indicates that the pod did not tolerate the `{spray: moreteam:NoSchedule}` taint on node01.

---

## 5\. Creating the "bee" Pod with a Toleration

To schedule a pod with a toleration for the taint on node01, create a new pod called "bee" using the nginx image. Since you cannot specify tolerations directly with the `kubectl run` command, generate a YAML manifest with a dry run and edit it accordingly.

Generate the YAML manifest:

```
root@controlplane:~# kubectl run bee --image=nginx --dry-run=client -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: bee
  name: bee
spec:
  containers:
  - image: nginx
    name: bee
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

Redirect the output to a file:

```
root@controlplane:~# kubectl run bee --image=nginx --dry-run=client -o yaml > bee.yaml
```

Open the generated file (bee.yaml) and add the following "tolerations" section under the spec:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: bee
  name: bee
spec:
  containers:
  - image: nginx
    name: bee
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
  tolerations:
  - key: "spray"
    operator: "Equal"
    value: "moreteam"
    effect: "NoSchedule"
status: {}
```

Save the changes and apply the manifest:

```
root@controlplane:~# kubectl apply -f bee.yaml
pod/bee created
```

Monitor the creation process:

```
root@controlplane:~# kubectl get pods --watch
NAME        READY   STATUS              RESTARTS   AGE
bee         0/1     ContainerCreating   0          10s
mosquito    0/1     Pending             0          3m40s
...
bee         1/1     Running             0          14s
```

Finally, confirm that the "bee" pod is running on node01:

```
root@controlplane:~# kubectl get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE     IP            NODE    NOMINATED NODE   READINESS GATES
bee         1/1     Running   0          36s     10.244.1.2    node01  <none>           <none>
mosquito    0/1     Pending   0          4m6s    <none>        <none>  <none>           <none>
root@controlplane:~#
```

---

## 6\. Removing the Control Plane Taint

The control plane node initially had a taint that prevented regular pods from being scheduled on it. To allow the "mosquito" pod to run, remove this taint.

First, check the taint on the control plane:

```
root@controlplane:~# kubectl describe node controlplane
...
Taints:
  node-role.kubernetes.io/master:NoSchedule
...
```

Remove the taint with the following command:

```
root@controlplane:~# kubectl taint node controlplane node-role.kubernetes.io/master:NoSchedule-
```

Verify that the taint has been removed:

```
root@controlplane:~# kubectl describe node controlplane
...
Taints:            <none>
...
```

Once the taint is removed, the "mosquito" pod, which was pending earlier, is automatically scheduled on the control plane node. Confirm its status:

```
root@controlplane:~# kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
bee        1/1     Running   0          2m37s
mosquito   1/1     Running   0          6m7s
root@controlplane:~#
```

---

## 7\. Summary

This lesson demonstrated the following steps:

| Step                                             | Description                                                                                                                      |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Counting the Nodes                               | Verified that the cluster consists of two nodes: one control plane and one worker node.                                          |
| Checking for Taints on node01                    | Inspected node01 to confirm that it did not have any taints before applying changes.                                             |
| Adding a Taint                                   | Applied a taint (`spray=moreteam:NoSchedule`) to node01 to prevent pods without the appropriate toleration from being scheduled. |
| Creating the "mosquito" Pod (Without Toleration) | Deployed a pod that remained pending because it did not tolerate the taint on node01.                                            |
| Creating the "bee" Pod with a Toleration         | Generated and edited a YAML manifest to include a toleration, ensuring the pod was scheduled successfully on node01.             |
| Removing the Control Plane Taint                 | Removed the NoSchedule taint from the control plane node, allowing the pending pod to be scheduled.                              |

This concludes the lesson on taints and tolerations in Kubernetes. For more information, please refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/a5da9016-4d94-4920-a3c3-429462c0f814)**
>
> Watch video content
