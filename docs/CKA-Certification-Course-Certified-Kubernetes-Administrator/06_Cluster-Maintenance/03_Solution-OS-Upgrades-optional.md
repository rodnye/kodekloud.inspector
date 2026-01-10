# Solution OS Upgrades optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Solution-OS-Upgrades-optional)

---

## Table of Contents

- Solution OS Upgrades optional
  - Checking Nodes and Deployments
  - Locating the Pods
  - Draining Node01 for Maintenance
  - Uncordoning Node01
  - Scheduling Considerations on the Control Plane
  - Second Maintenance Window and the HR App Issue
  - Preventing Future Scheduling on Node01
  - Tables and References
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Cluster Maintenance

# Solution OS Upgrades optional

In this lesson, we walk through a cluster maintenance lab. We begin by exploring the current cluster environment and inspecting its nodes before proceeding to maintenance tasks on node01.

## Checking Nodes and Deployments

First, verify the cluster nodes by setting an alias for kubectl and running the following commands:

```
root@controlplane:~# alias k=kubectl
root@controlplane:~# k get nodes
NAME           STATUS   ROLES                    AGE   VERSION
controlplane   Ready    control-plane,master     12m   v1.20.0
node01         Ready    <none>                   12m   v1.20.0
root@controlplane:~#
```

There are two nodes in the cluster: the control plane and node01.

Next, check the deployments running in the default namespace:

```
root@controlplane:~# k get deploy
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
blue   3/3     3            3           7s
root@controlplane:~#
```

The output indicates that the "blue" deployment is running three pods.

## Locating the Pods

To determine which nodes are hosting these application pods, use the wide option to list pods with additional details:

```
root@controlplane:~# k get pods -o wide
NAME                                  READY   STATUS    RESTARTS   AGE      IP             NODE         NOMINATED NODE
blue-746c87566d-mp45f                 1/1     Running   0          63s     10.244.0.5     controlplane  <none>
blue-746c87566d-mp8t8                 1/1     Running   0          63s     10.244.0.6     controlplane  <none>
blue-746c87566d-vdx2b                 1/1     Running   0          63s     10.244.0.4     controlplane  <none>
root@controlplane:~#
```

All pods are currently running on the control plane node.

## Draining Node01 for Maintenance

It is time to remove node01 from scheduling temporarily for maintenance. Draining the node marks it as unschedulable and evicts non-DaemonSet pods. Executing the drain command without additional flags results in an error due to pods managed by DaemonSets:

```
root@controlplane:~# k drain node01
node/node01 cordoned
error: unable to drain node "node01", aborting command...


There are pending nodes to be drained:
 node01
error: cannot delete DaemonSet-managed Pods (use --ignore-daemonsets to ignore): kube-system/kube-flannel-ds-4k7hj, kube-system/kube-proxy-5hcnr
root@controlplane:~#
```

> [!important]
> **Tip**
>
> To successfully drain the node, use the `--ignore-daemonsets` flag, which bypasses eviction of DaemonSet-managed pods.

Running the command with the flag evicts the pods under the "blue" deployment:

```
root@controlplane:~# k drain node01 --ignore-daemonsets
node/node01 already cordoned
WARNING: ignoring DaemonSet-managed Pods: kube-system/kube-flannel-ds-4k7hj, kube-system/kube-proxy-5hcw
evicting pod default/blue-746c87566d-vq7pq
evicting pod default/blue-746c87566d-bn5gc
evicting pod default/blue-746c87566d-t2tgs
```

After waiting for the eviction, confirm that all pods have been rescheduled on the control plane:

```
root@controlplane:~# k get pods -o wide
NAME                                  READY   STATUS    RESTARTS   AGE     IP              NODE         NOMINATED NODE
blue-746c87566d-mp45f                 1/1     Running   0          63s     10.244.0.5     controlplane  <none>
blue-746c87566d-mp8t8                 1/1     Running   0          63s     10.244.0.6     controlplane  <none>
blue-746c87566d-vdx2b                 1/1     Running   0          63s     10.244.0.4     controlplane  <none>
root@controlplane:~#
```

Also, verify the node status for node01:

```
root@controlplane:~# k get nodes
NAME            STATUS                     ROLES                     AGE     VERSION
controlplane    Ready                      control-plane,master      15m     v1.20.0
node01         Ready,SchedulingDisabled   14m     v1.20.0
```

Node01 now displays as "SchedulingDisabled."

## Uncordoning Node01

To allow node01 to accept new pods, uncordon it. This command restores the node to a normal schedulable state:

```
root@controlplane:~# k get nodes
NAME            STATUS                     ROLES                     AGE     VERSION
controlplane    Ready                      control-plane,master      15m     v1.20.0
node01         Ready,SchedulingDisabled   15m     v1.20.0
root@controlplane:~# k uncordon node01
node "node01" uncordoned
root@controlplane:~# k get nodes
NAME           STATUS   ROLES                  AGE   VERSION
controlplane   Ready    control-plane,master   15m   v1.20.0
node01         Ready    <none>                 15m   v1.20.0
```

Note that even after uncordoning, existing pods remain on the control plane because they were already rescheduled there. Confirm that node01 currently has zero pods:

```
root@controlplane:~# k get pods -o wide
NAME                  READY   STATUS    RESTARTS   AGE    IP          NODE          NOMINATED NODE
blue-746c87566d-mp45f  1/1     Running   0          2m14s  10.244.0.5  controlplane  <none>
blue-746c87566d-mpkt8  1/1     Running   0          2m14s  10.244.0.6  controlplane  <none>
blue-746c87566d-vdx2b  1/1     Running   0          2m14s  10.244.0.4  controlplane  <none>
root@controlplane:~#
```

## Scheduling Considerations on the Control Plane

Typically, control plane nodes are tainted to prevent regular application pods from being scheduled on them. In this scenario, the control plane lacks such taints, which explains why pods remained there. To check for taints, inspect node details:

```
Taints: <none>
Unschedulable: false
```

This configuration is why pods did not automatically migrate back to node01 after being uncordoned.

## Second Maintenance Window and the HR App Issue

In a subsequent maintenance window, another drain command is executed on node01:

```
root@controlplane:~# kubectl drain node01 --ignore-daemonsets
node/node01 cordoned
error: unable to drain node "node01", aborting command...


There are pending nodes to be drained:
node01
error: cannot delete Pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet (use --force to override): default/hr-app
root@controlplane:~#
```

A new pod, "hr-app," is running on node01 and is not controlled by a higher-level controller. Its details are:

```
root@controlplane:~# k get pods -o wide
NAME                                READY   STATUS    RESTARTS   AGE     IP              NODE           NOMINATED NODE
blue-746c87566d-mp45f               1/1     Running   0          5m34s   10.244.0.5     controlplane   <none>
blue-746c87566d-mpkt8               1/1     Running   0          5m34s   10.244.0.6     controlplane   <none>
blue-746c87566d-vdx2b               1/1     Running   0          5m34s   10.244.0.4     controlplane   <none>
hr-app                              1/1     Running   0          78s     10.244.1.5     node01         <none>
root@controlplane:~#
```

Because "hr-app" isn’t managed by a Deployment (or equivalent controller), draining node01 without forcing eviction is blocked to prevent accidental data loss.

> [!important]
> **Warning**
>
> Forcing a drain on such pods using `--force` will delete them along with any local data permanently. Exercise caution when using such options.

If you force the drain, the pod is deleted as shown:

```
root@controlplane:~# kubectl drain node01 --ignore-daemonsets --force
WARNING: deleting Pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet: default/hr-app; ignoring DaemonSet-managed Pods: kube-system/kube-flannel-ds-4k7hj, kube-system/kube-proxy-xy-5hcwr
evicting pod default/hr-app
pod/hr-app evicted
node/node01 evicted
root@controlplane:~#
```

To prevent such disruptions for critical applications, the HR app is redeployed as a Deployment. This ensures that it is managed by a ReplicaSet, allowing automatic rescheduling if pods are evicted. Verify the updated deployments:

```
root@controlplane:~# k get deploy
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
blue       3/3     3            3           9m36s
hr-app     1/1     1            1           17s
root@controlplane:~#
```

Confirm that pods are now scheduled correctly:

```
root@controlplane:~# k get pods -o wide
NAME                          READY   STATUS    RESTARTS   AGE     IP           NODE         NOMINATED NODE
blue-746c87566d-mp45f         1/1     Running   0          8m29s   10.244.0.5   controlplane  <none>
blue-746c87566d-mpkt8         1/1     Running   0          8m29s   10.244.0.6   controlplane  <none>
blue-746c87566d-vdx2b         1/1     Running   0          8m29s   10.244.0.4   controlplane  <none>
hr-app-764d475c57d-9vmts      1/1     Running   0          24s     10.244.1.6   node01        <none>
root@controlplane:~#
```

## Preventing Future Scheduling on Node01

Because node01 is scheduled for maintenance and hosts the critical HR app, it is important to prevent new pods from being scheduled on it unintentionally. Although the HR app is now managed by a Deployment, new pods could still be scheduled on node01 if it remains in a "Ready" state.

To prevent this, mark node01 as unschedulable (cordon it) without affecting already running pods:

```
root@controlplane:~# k get nodes
NAME           STATUS                     ROLES                  AGE   VERSION
controlplane   Ready                      control-plane,master   23m   v1.20.0
node01         Ready                    <none>                 22m   v1.20.0
root@controlplane:~# k cordon node01
node/node01 cordoned
root@controlplane:~# k get nodes
NAME           STATUS                     ROLES                  AGE   VERSION
controlplane   Ready                      control-plane,master   23m   v1.20.0
node01         Ready,SchedulingDisabled   <none>                22m   v1.20.0
```

This action ensures that while the HR app continues running on node01, no new pods will be scheduled until maintenance is complete.

---

This concludes the lab on cluster maintenance, covering topics such as draining nodes, uncordoning, and managing critical applications during maintenance windows.

## Tables and References

Below is a summary table of key cluster commands:

| Command                                  | Description                                         | Example Output Snippet                    |
| ---------------------------------------- | --------------------------------------------------- | ----------------------------------------- |
| kubectl get nodes                        | Lists all nodes in the cluster                      | "controlplane Ready control-plane,master" |
| kubectl drain <node> --ignore-daemonsets | Drains a node while ignoring DaemonSet-managed pods | "node/node01 cordoned"                    |
| kubectl uncordon <node>                  | Marks a node as schedulable again                   | "node "node01" uncordoned"                |

For more information on Kubernetes cluster operations and maintenance, check out the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/51676566-4860-4564-ad8e-4723a266211e/lesson/764793fa-8f4d-4f2d-9521-4e94840f0a79)**
>
> Watch video content
