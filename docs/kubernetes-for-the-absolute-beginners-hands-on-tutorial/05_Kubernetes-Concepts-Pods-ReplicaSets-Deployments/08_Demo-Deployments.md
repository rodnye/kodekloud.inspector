# Demo Deployments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Demo-Deployments)

---

## Table of Contents

- Demo Deployments
  - Step 1: Set Up the Deployment Directory
  - Step 2: Review the ReplicaSet Definition
  - Step 3: Create the Deployment Configuration
  - Step 4: Reference the Original ReplicaSet Definition
  - Step 5: Deploy the Configuration to Your Cluster
  - Step 6: Validate the Pods
  - Step 7: Review All Cluster Objects
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Demo Deployments

In this lesson, we will create a Kubernetes deployment by leveraging an existing ReplicaSet definition. This approach helps streamline the process by reusing a familiar structure.

## Step 1: Set Up the Deployment Directory

First, navigate to your project directory and create a new folder called `deployments`. Inside this folder, create a file named `deployment.yaml`.

## Step 2: Review the ReplicaSet Definition

For reference, open the existing ReplicaSet definition on the right side of your split editor:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 4
  template:
    metadata:
      name: nginx-2
      labels:
        app: myapp
    spec:
      containers:
      - name: nginx
        image: nginx
```

> [!important]
> **Note**
>
> Review this ReplicaSet definition carefully, as you will reuse its structure when defining your new deployment.

## Step 3: Create the Deployment Configuration

In your new `deployment.yaml` file, start with the `apiVersion` (apps/v1) as used in the ReplicaSet. Set the kind to `Deployment`, and then define the metadata with a unique name and appropriate labels. In our example, we use the name `myapp-deployment` with labels like `tier: frontend` and `app: nginx`.

For the spec section, copy the structure from the ReplicaSet but modify the configuration to meet the deployment requirements. In this case, we reduce the number of replicas from four to three.

Below is the final configuration for your deployment:

```
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    tier: frontend
    app: nginx
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 3
  template:
    metadata:
      name: nginx-2
      labels:
        app: myapp
    spec:
      containers:
        - name: nginx
          image: nginx
```

> [!important]
> **Hint**
>
> The deployment uses the same selector as the ReplicaSet, matching on `app: myapp`. This ensures that the deployment's pods are correctly managed.

## Step 4: Reference the Original ReplicaSet Definition

For comparison, here is the unchanged ReplicaSet definition saved in `replicaset.yaml`:

```
# replicaset.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 4
  template:
    metadata:
      name: nginx-2
      labels:
        app: myapp
    spec:
      containers:
        - name: nginx
          image: nginx
```

## Step 5: Deploy the Configuration to Your Cluster

Save your deployment configuration and create the deployment by running the following command in your terminal:

```
kubectl create -f deployment.yaml
```

After creating the deployment, verify it with:

```
kubectl get deployments
```

The output should resemble:

```
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment    3/3     3            3           10s
```

## Step 6: Validate the Pods

To inspect the pods created by the deployment, execute:

```
kubectl get pods
```

Expected output:

```
NAME                     READY   STATUS    RESTARTS   AGE
myapp-replicaset-pjs89   1/1     Running   0          34m
myapp-replicaset-pwv6h   1/1     Running   0          34m
myapp-replicaset-zr6c7   1/1     Running   0          23s
```

For more detailed information about your deployment, use:

```
kubectl describe deployment myapp-deployment
```

This command provides comprehensive details on metadata, pod specifications, and events. You will see that the deployment uses the same selector (`app: myapp`), ensuring three desired and three available pods are running.

## Step 7: Review All Cluster Objects

Finally, run the following command to list all objects created in the cluster:

```
kubectl get all
```

A sample output might look like this:

```
NAME                                   READY   STATUS      RESTARTS   AGE
pod/myapp-replicaset-pjs89             1/1     Running     0          35m
pod/myapp-replicaset-pwv6h             1/1     Running     0          35m
pod/myapp-replicaset-zr6c7             1/1     Running     0          104s


NAME                                   TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
service/kubernetes                     ClusterIP   10.96.0.1     <none>        443/TCP    65m


NAME                                   READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/myapp-deployment       3/3     3            3           105s


NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/myapp-replicaset       3         3         3       35m
```

This output confirms that both the deployment and its corresponding ReplicaSet have been successfully created, with the expected pods up and running.

> [!important]
> **Conclusion**
>
> You have now successfully deployed your application using Kubernetes Deployments. Experiment with these configurations in your practice environment for a deeper understanding of Kubernetes object management.

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/7e954681-d6dc-4997-9c21-d7ed27daff64)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/a04dde16-f00b-454b-8314-8e7357b3d7ad)**
>
> Practice lab
