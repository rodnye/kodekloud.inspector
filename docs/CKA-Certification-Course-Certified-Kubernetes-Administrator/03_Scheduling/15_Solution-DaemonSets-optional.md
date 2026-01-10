# Solution DaemonSets optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Solution-DaemonSets-optional)

---

## Table of Contents

- Solution DaemonSets optional
  - 1. Listing DaemonSets in All Namespaces
  - 2. Identifying the Namespace of DaemonSets
  - 3. Examining Pod Scheduling for Kube-Proxy
  - 4. Inspecting the Kubelet DaemonSet (Kube-Flannel)
  - 5. Deploying a DaemonSet for Logging
  - Watch Video
    - Option 1: Using an Official Sample from Documentation
    - Option 2: Converting a Deployment to a DaemonSet

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Solution DaemonSets optional

In this lesson, we explore DaemonSets in a Kubernetes cluster. We will answer key questions about creating DaemonSets, their namespaces, and pod scheduling. In addition, you'll learn how to deploy a logging DaemonSet using Fluentd and Elasticsearch.

---

## 1\. Listing DaemonSets in All Namespaces

To begin, determine how many DaemonSets exist across all namespaces in your Kubernetes cluster. Execute the following command:

```
root@controlplane:~# kubectl get daemonsets -A
```

The output confirms that there are two DaemonSets in the cluster: `kube-flannel-ds` and `kube-proxy`, both located in the `kube-system` namespace:

```
NAMESPACE     NAME                DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR
kube-system   kube-flannel-ds     1         1         1       1            1           <none>
kube-system   kube-proxy          1         1         1       1            1           kubernetes.io/os=linux
```

> [!important]
> **Tip**
>
> Always verify the namespace of your DaemonSets to ensure proper deployment and troubleshooting.

---

## 2\. Identifying the Namespace of DaemonSets

The `NAMESPACE` column in the output above shows that both DaemonSets are deployed in `kube-system`. To further validate that no DaemonSets are running in the default namespace, run:

```
root@controlplane:~# kubectl get daemonsets
No resources found in default namespace.
```

Running the following command again:

```
root@controlplane:~# kubectl get daemonsets -A
```

confirms that the only active DaemonSets are in the `kube-system` namespace:

```
NAMESPACE     NAME               DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR
kube-system   kube-flannel-ds    1         1         1       1            1           <none>
kube-system   kube-proxy         1         1         1       1            1           kubernetes.io/os=linux
```

Thus, the `kube-flannel-ds` and `kube-proxy` are the only DaemonSets running in the cluster.

---

## 3\. Examining Pod Scheduling for Kube-Proxy

To assess on how many nodes the pods managed by the `kube-proxy` DaemonSet are scheduled, start by reviewing the initial DaemonSet listing:

```
root@controlplane:~# kubectl get daemonsets -A
```

Notice that for `kube-proxy`, the desired, current, and ready counts are all one. For a deeper look into its configuration, run:

```
root@controlplane:~# kubectl describe daemonsets kube-proxy -n kube-system
```

The detailed output confirms that exactly one node is scheduled for the `kube-proxy` pods:

```
Name:           kube-proxy
Selector:       k8s-app=kube-proxy
Node-Selector:  kubernetes.io/os=linux
Labels:         k8s-app=kube-proxy
Annotations:    deprecated.daemonset.template.generation: 1
Desired Number of Nodes Scheduled: 1
Current Number of Nodes Scheduled: 1
Number of Nodes Scheduled with Up-to-date Pods: 1
Number of Nodes Scheduled with Available Pods: 1
Number of Nodes Misscheduled: 0
Pods Status:    1 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:     k8s-app=kube-proxy
  Service Account: kube-proxy
  Containers:
   kube-proxy:
     Image:          k8s.gcr.io/kube-proxy:v1.20.0
     Port:           <none>
     Host Port:      <none>
     Command:
       /usr/local/bin/kube-proxy
       --config=/var/lib/kube-proxy/config.conf
       --hostname-override=$(NODE_NAME)
     Environment:
       NODE_NAME:      (v1.spec.nodeName)
     Mounts:
      /lib/modules from lib-modules (ro)
      /run/x_tables.lock from x_tables-lock (rw)
```

To verify that your cluster has a single node, run:

```
root@controlplane:~# kubectl get nodes
```

Expected output:

```
NAME          STATUS          ROLES         AGE     VERSION
controlplane  Ready           control-plane 26m     v1.20.0
```

This confirms that the `kube-proxy` DaemonSet is scheduled on one node, matching the cluster configuration.

---

## 4\. Inspecting the Kubelet DaemonSet (Kube-Flannel)

To examine the specific image used by the `kube-flannel-ds` (managed as a DaemonSet by kubelet), run:

```
root@controlplane:~# kubectl describe ds kube-flannel-ds -n kube-system
```

Within the output details of the pod template, locate the container image:

```
Image: quay.io/coreos/flannel:v0.13.1-rc1
```

This confirms that the `kube-flannel-ds` uses the CoreOS Flannel image.

> [!important]
> **Image Verification**
>
> Ensuring the correct container image for your networking components is crucial for cluster stability.

---

## 5\. Deploying a DaemonSet for Logging

In this section, you'll deploy a DaemonSet for logging using Fluentd and Elasticsearch. There are two common methods to obtain the DaemonSet specification.

### Option 1: Using an Official Sample from Documentation

Refer to the Kubernetes documentation for a sample DaemonSet YAML. Below is an example configuration:

```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
  namespace: kube-system
  labels:
    k8s-app: fluentd-logging
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      tolerations:
        # This toleration ensures the DaemonSet can run on master nodes.
        # Remove it if your master nodes cannot run pods.
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
      containers:
        - name: fluentd-elasticsearch
          image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2
          resources:
            limits:
              memory: 200Mi
            requests:
              cpu: 100m
              memory: 200Mi
          volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
```

### Option 2: Converting a Deployment to a DaemonSet

Since Kubernetes doesn’t offer a direct command for creating a DaemonSet, you can start by generating a deployment manifest in dry-run mode and then convert it. Run:

```
kubectl create deployment elasticsearch --image=k8s.gcr.io/fluentd-elasticsearch:1.20 --dry-run=client -o yaml > fluentd.yaml
```

Edit the generated `fluentd.yaml` file to change the kind from Deployment to DaemonSet and remove the replicas and strategy fields, so it closely resembles:

```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  creationTimestamp: null
  labels:
    app: elasticsearch
  name: elasticsearch
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: elasticsearch
    spec:
      containers:
      - image: k8s.gcr.io/fluentd-elasticsearch:1.20
        name: fluentd-elasticsearch
        resources: {}
status: {}
```

After making the necessary modifications, create the DaemonSet:

```
kubectl create -f fluentd.yaml
```

Verify the newly created DaemonSet by listing all DaemonSets in the `kube-system` namespace:

```
kubectl get ds -n kube-system
```

The output should resemble:

```
NAME                   DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR           AGE
elasticsearch          1         1         1       0            <none>      <none>                10s
kube-flannel-ds        1         1         1       1            <none>      <none>                29m
kube-proxy             1         1         1       1            kubernetes.io/os=linux         29m
```

> [!important]
> **Deployment Note**
>
> The example provided represents a basic logging configuration. Be sure to customize resource limits, volume mounts, and other parameters to match your production environment.

---

This concludes the lab on DaemonSets in Kubernetes. You learned how to list and inspect DaemonSets, examine their node scheduling, and deploy a new DaemonSet specifically for logging purposes.

For further details on Kubernetes concepts and best practices, explore the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/c349185b-5deb-4001-83ad-e41c1634fd35)**
>
> Watch video content
