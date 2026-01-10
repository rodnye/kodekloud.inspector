# Control Plane Failure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Troubleshooting/Control-Plane-Failure)

---

## Table of Contents

- Control Plane Failure
  - 1. Verify Cluster Node Health
  - 2. Confirm Control Plane Component Status
  - 3. Review Control Plane Logs
  - 4. Additional Resources
  - Watch Video
  - Practice Lab
    - a. Checking the Kubernetes API Server
    - b. Checking the Controller Manager
    - c. Checking the Scheduler
    - a. Retrieving Pod Logs (When Using kubeadm)
    - b. Using the Journal for Native Service Logs

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Troubleshooting

# Control Plane Failure

In this guide, we explore effective methods for troubleshooting control plane failures in your Kubernetes cluster. The process begins with checking the health of the nodes, followed by verifying the status of control plane components—whether they are deployed as pods or native services—and finally, reviewing detailed logs to identify any issues.

## 1\. Verify Cluster Node Health

Begin by ensuring all cluster nodes are operational. Execute the command below to list the status of each node:

```
kubectl get nodes
```

This step helps quickly identify any node-related issues that might impact the control plane.

## 2\. Confirm Control Plane Component Status

Control plane components can either be deployed as pods (common with kubeadm setups) or as native system services. Depending on your configuration, follow the appropriate checks.

> [!important]
> **Note**
>
> If your control plane components are deployed as pods in the kube-system namespace, ensure each pod is healthy. For configurations using native services, verify that the Kubernetes API server, controller manager, scheduler, and the kube-proxy service (on worker nodes) are running properly.

### a. Checking the Kubernetes API Server

For systems using native services, inspect the API server status with:

```
service kube-apiserver status
● kube-apiserver.service - Kubernetes API Server
   Loaded: loaded (/etc/systemd/system/kube-apiserver.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-03-20 07:57:25 UTC; 1 weeks 1 days ago
   Docs: https://github.com/kubernetes/kubernetes
 Main PID: 15767 (kube-apiserver)
   Tasks: 13 (limit: 2362)
```

### b. Checking the Controller Manager

Next, verify that the kube-controller-manager is up and running:

```
service kube-controller-manager status
● kube-controller-manager.service - Kubernetes Controller Manager
   Loaded: loaded (/etc/systemd/system/kube-controller-manager.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-03-20 07:57:25 UTC; 1 weeks 1 days ago
   Docs: https://github.com/kubernetes/kubernetes
 Main PID: 15771 (kube-controller)
   Tasks: 10 (limit: 2362)
```

### c. Checking the Scheduler

Also, verify the status of the kube-scheduler service by running:

```
service kube-scheduler status
```

Ensure that this command returns complete and active service details.

## 3\. Review Control Plane Logs

After confirming the service statuses, proceed to review the logs for deeper insights.

### a. Retrieving Pod Logs (When Using kubeadm)

If the control plane components are deployed as pods, fetch the logs for the API server from the kube-system namespace:

```
kubectl logs kube-apiserver-master -n kube-system
```

An example excerpt from the logs might appear as follows:

```
I0401 13:45:38.190735       1 server.go:703] external host was not specified, using 172.17.0.117
I0401 13:45:38.194290       1 server.go:145] Version: v1.11.3
I0401 13:45:38.819075       1 plugins.go:158] Loaded 8 mutating admission controller(s) successfully in the following order:
NamespaceLifecycle,LimitRanger,ServiceAccount,NodeRestriction,Priority,DefaultTolerationSeconds,DefaultStorageClass,MutatingAdmissionWebhook.
...
W0401 13:45:41.381736       1 genericapiserver.go:319] Skipping API scheduling.k8s.io/v1alpha1 because it has no resources.
```

### b. Using the Journal for Native Service Logs

For control plane components configured as native services on the master nodes, use the journal control utility to view the logs:

```
sudo journalctl -u kube-apiserver
```

This command allows you to review the logs specific to the kube-apiserver service, helping in pinpointing issues.

## 4\. Additional Resources

For further details and advanced troubleshooting techniques, refer to the official [Kubernetes Documentation](https://kubernetes.io/docs/).

By following these steps, you can systematically diagnose and address control plane issues within your Kubernetes cluster, ensuring a stable and resilient environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/aff99955-65fd-443e-950f-3b25d3311bc2/lesson/be8f7418-88a5-4334-b2fa-4dec10e195f5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/aff99955-65fd-443e-950f-3b25d3311bc2/lesson/12c4a55c-16f5-48d1-8b7f-b2c33c706b25)**
>
> Practice lab
