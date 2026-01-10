# Solution Node Affinity Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Solution-Node-Affinity-Optional)

---

## Table of Contents

- Solution Node Affinity Optional
  - Step 1: Identify the Labels on node01
  - Step 2: Apply a New Label on node01
  - Step 3: Create the "blue" Deployment with Node Affinity for node01
  - Step 4: Create the "red" Deployment with Node Affinity for the Control Plane
  - Additional Diagram Reference
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Solution Node Affinity Optional

In this lesson, we demonstrate a practical test for node affinity configuration in Kubernetes. You will learn how to identify node labels, assign a new label to a node, and configure deployments with node affinity rules that restrict pod scheduling to specific nodes.

──────────────────────────────

## Step 1: Identify the Labels on node01

Begin by examining the labels on _node01_. Run the following command to obtain detailed node information:

```
root@controlplane:~# kubectl describe node node01
Name:               node01
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/os=linux
Annotations:        flannel.alpha.coreos.com/backend-data: {"VNI":1,"VtepMAC":"5a:c6:da:f2:19:f9"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 10.35.54.12
                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Sat, 16 Apr 2022 17:27:31 +0000
Taints:             <none>
Unschedulable:      false
Lease:
  HolderIdentity:   node01
  AcquireTime:      <unset>
  RenewTime:        Sat, 16 Apr 2022 17:39:41 +0000
Conditions:
  Type                Status  LastHeartbeatTime                 LastTransitionTime             Reason
  ----                ------  ------------------                 ------------------             ------
  NetworkUnavailable  False   Sat, 16 Apr 2022 17:27:38 +0000      Sat, 16 Apr 2022 17:27:38 +0000   Flannel
  MemoryPressure      False   Sat, 16 Apr 2022 17:37:46 +0000      Sat, 16 Apr 2022 17:27:31 +0000   Kubelet has sufficient memory available
  DiskPressure        False   Sat, 16 Apr 2022 17:37:46 +0000      Sat, 16 Apr 2022 17:27:31 +0000   Kubelet has no disk pressure
  PIDPressure         False   Sat, 16 Apr 2022 17:37:46 +0000      Sat, 16 Apr 2022 17:27:31 +0000   Kubelet has sufficient PID available
  Ready               True    Sat, 16 Apr 2022 17:37:46 +0000      Sat, 16 Apr 2022 17:27:42 +0000   Kubelet is posting ready status
Addresses:
  InternalIP:       10.35.54.12
```

From the output, note the label `beta.kubernetes.io/arch` with the value `amd64`.

──────────────────────────────

## Step 2: Apply a New Label on node01

Next, assign a new label `color=blue` to _node01_. Execute the following command:

```
root@controlplane:~# kubectl label node node01 color=blue
```

Verify that the label has been applied by inspecting the node details:

```
root@controlplane:~# kubectl describe node node01
...
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/hostname=node01
                    color=blue
...
```

> [!important]
> **Tip**
>
> Labeling nodes strategically can help in managing pod placement and workload isolation across your Kubernetes cluster.

──────────────────────────────

## Step 3: Create the "blue" Deployment with Node Affinity for node01

Create a deployment named **blue** utilizing the nginx image with three replicas:

```
root@controlplane:~# kubectl create deployment blue --image=nginx --replicas=3
deployment.apps/blue created
```

Before adding node affinity, confirm that no taints are present that could interfere with pod scheduling. Check for taints on node01:

```
root@controlplane:~# kubectl describe node node01 | grep Taints
Taints: <none>
```

Also, inspect the node status:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS   ROLES                     AGE   VERSION
controlplane   Ready    control-plane,master      15m   v1.20.0
node01         Ready    <none>                    14m   v1.20.0
```

Since there are no taints on the nodes, pods can be scheduled on any node by default.

Now, update the **blue** deployment to enforce node affinity. Edit the deployment's pod specification to include a node affinity rule that restricts pods to nodes labeled with `color=blue`. Integrate the following YAML snippet under the `spec.template.spec` section:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blue
  labels:
    app: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blue
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: blue
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: color
                    operator: In
                    values:
                      - blue
      containers:
        - name: nginx
          image: nginx
          imagePullPolicy: Always
          resources: {}
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
```

Save your changes. To verify that the pods are scheduled on _node01_, execute:

```
root@controlplane:~# kubectl get pods -o wide
NAME                         READY   STATUS      RESTARTS   AGE   IP           NODE    NOMINATED NODE   READINESS GATES
blue-566c768bd6-f8xzm        1/1     Running     0          16s   10.244.1.5   node01  <none>           <none>
blue-566c768bd6-jsz95        1/1     Running     0          9s    10.244.1.7   node01  <none>           <none>
blue-566c768bd6-sf9dk        1/1     Running     0          13s   10.244.1.6   node01  <none>           <none>
```

All **blue** deployment pods are now correctly placed on _node01_ as dictated by the node affinity rule.

──────────────────────────────

## Step 4: Create the "red" Deployment with Node Affinity for the Control Plane

In the next step, we create a deployment named **red** using the nginx image with two replicas. The deployment is configured to run its pods exclusively on the control plane node by leveraging the `node-role.kubernetes.io/master` label.

First, generate the deployment YAML file using a dry run:

```
root@controlplane:~# kubectl create deployment red --image=nginx --replicas=2 --dry-run=client -o yaml > red.yaml
```

Edit the generated `red.yaml` file to add the node affinity rule under the `spec.template.spec` section. Update the file to resemble the following:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: red
  name: red
spec:
  replicas: 2
  selector:
    matchLabels:
      app: red
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: red
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-role.kubernetes.io/master
                    operator: Exists
      containers:
        - image: nginx
          name: nginx
          resources: {}
status: {}
```

Save the changes and create the deployment by running:

```
root@controlplane:~# kubectl create -f red.yaml
deployment.apps/red created
```

Verify that the pods of the **red** deployment are scheduled on the control plane by checking their node assignments:

```
root@controlplane:~# kubectl get pods -o wide
```

> [!important]
> **Deployment Best Practice**
>
> Using a dry run to generate deployment YAML files allows you to safely modify pod specifications—such as adding node affinity—before applying the changes to your cluster.

──────────────────────────────

## Additional Diagram Reference

The image below illustrates the process for creating the **red** deployment with the nginx image, two replicas, and node affinity targeting the control plane node by checking for the label `node-role.kubernetes.io/master`:

![The image shows a task to create a Kubernetes deployment named "red" using the nginx image with 2 replicas, placed on the controlplane node.](https://kodekloud.com/kk-media/image/upload/v1752871158/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Node-Affinity-Optional/frame_370.jpg)

──────────────────────────────

## Conclusion

In this lesson, you learned how to:

- Identify node labels with the `kubectl describe node` command.
- Apply custom labels to nodes using the `kubectl label` command.
- Configure node affinity in a deployment to restrict pod scheduling based on node labels.
- Generate and modify deployment YAML files using a dry run to enforce node affinity settings for both worker nodes and control plane nodes.

This completes the lab on node affinity configuration in Kubernetes.

For further reading and more advanced scenarios, you may refer to [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/86c0a164-450d-45f8-ba69-97a92e02ad49)**
>
> Watch video content
