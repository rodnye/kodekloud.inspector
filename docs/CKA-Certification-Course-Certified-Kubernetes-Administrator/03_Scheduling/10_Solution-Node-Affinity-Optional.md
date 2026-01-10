# Solution Node Affinity Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Solution-Node-Affinity-Optional)

---

## Table of Contents

- Solution Node Affinity Optional
  - Step 1. Identify Node Labels
  - Step 2. Apply a Label to node01
  - Step 3. Create Deployment "blue" with Three Replicas
  - Step 4. Apply Node Affinity to the "blue" Deployment
  - Step 5. Create Deployment "red" with Two Replicas on the Control Plane
  - Summary
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Solution Node Affinity Optional

In this lesson, we will guide you through a practical lab exercise focused on implementing node affinity in Kubernetes. By following these steps, you will learn how to inspect node labels, add custom labels, and apply node affinity rules to your deployments for controlled pod scheduling.

---

## Step 1. Identify Node Labels

Begin by inspecting the details of node "node01" to review its current labels. Run the following command:

```
kubectl describe node node01
```

In the output, you will see a list of labels similar to these:

```
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=node01
```

Make sure to verify the label count and note the value of the label `beta.kubernetes.io/arch` (which is `amd64`).

---

## Step 2. Apply a Label to node01

Next, add a new label called `color` with the value `blue` to the node. Execute the following command:

```
kubectl label node node01 color=blue
```

After applying the label, confirm the update by running:

```
kubectl describe node node01
```

You should now see an additional label in the output:

```
Labels:             ...
                    color=blue
```

> [!important]
> **Note**
>
> Labeling nodes correctly is essential for using node affinity effectively in your deployments.

---

## Step 3. Create Deployment "blue" with Three Replicas

Now, create a deployment named `blue` using the nginx image and specify three replicas with the following command:

```
kubectl create deployment blue --image=nginx --replicas=3
```

The command output should confirm:

```
deployment.apps/blue created
```

Next, check the node assignments of the pods with:

```
kubectl get pods -o wide
```

At this stage, the pods may be scheduled on any available node because no node affinity rules have been applied yet.

---

## Step 4. Apply Node Affinity to the "blue" Deployment

To ensure that the pods in the `blue` deployment only run on node01 (which now has the label `color=blue`), update the deployment with a node affinity rule. Edit the deployment YAML and incorporate the following affinity configuration under the `template.spec` section:

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
      dnsPolicy: ClusterFirst
      restartPolicy: Always
```

After saving the changes, the scheduler will enforce that all pods for the `blue` deployment are placed on node01. Verify the updated placement with:

```
kubectl get pods -o wide
```

---

## Step 5. Create Deployment "red" with Two Replicas on the Control Plane

Now, create a deployment named `red` that targets the control plane node. The control plane is typically identified by the label `node-role.kubernetes.io/master` (which exists without a value).

Start by generating the deployment YAML using a dry run:

```
kubectl create deployment red --image=nginx --replicas=2 --dry-run=client -o yaml > red.yaml
```

Open the `red.yaml` file in an editor, and under the `template.spec` section, add the following node affinity block:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: red
  labels:
    app: red
spec:
  replicas: 2
  selector:
    matchLabels:
      app: red
  template:
    metadata:
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
        - name: nginx
          image: nginx
          imagePullPolicy: Always
          resources: {}
```

Save the file and then create the deployment with:

```
kubectl apply -f red.yaml
```

Confirm that the pods are scheduled on the control plane node by checking:

```
kubectl get pods -o wide
```

If there are any syntax or indentation issues in `red.yaml`, the deployment creation will fail. Make sure the YAML is correctly formatted.

> [!important]
> **Warning**
>
> Incorrect YAML formatting or indentation may lead to failure in deploying pods. Double-check your YAML syntax if you encounter any issues.

---

## Summary

In this exercise, you learned how to:

1.  Inspect node labels and verify their values.
2.  Apply a new label (`color=blue`) to a node.
3.  Create a deployment (`blue`) and configure node affinity to restrict its pods to the node with the matching label.
4.  Use a dry run to generate a deployment YAML for `red` and apply a node affinity rule so that its pods are scheduled exclusively on the control plane node (by verifying the existence of `node-role.kubernetes.io/master`).

By following these steps, you can ensure optimal pod placement and efficient use of your Kubernetes cluster resources. Happy deploying!

For more details, check out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Concepts: Node Affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)
- [Nginx Docker Hub](https://hub.docker.com/_/nginx)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/15d9d7b3-4fcf-404f-8ba7-fea0f0481ee5)**
>
> Watch video content
