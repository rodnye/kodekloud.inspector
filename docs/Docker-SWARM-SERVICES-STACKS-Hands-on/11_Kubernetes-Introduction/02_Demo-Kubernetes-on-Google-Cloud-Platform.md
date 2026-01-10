# Demo Kubernetes on Google Cloud Platform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Kubernetes-Introduction/Demo-Kubernetes-on-Google-Cloud-Platform)

---

## Table of Contents

- Demo Kubernetes on Google Cloud Platform
  - Setting Up the Kubernetes Cluster
  - Creating Pod Definition Files
  - Creating Service Definition Files
  - Deploying to the Cluster
  - Conclusion
  - Watch Video
    - Voting App Pod
    - Worker Pod
    - Result App Pod
    - Redis Pod
    - PostgreSQL Pod
    - Redis Service
    - PostgreSQL (DB) Service
    - Voting App Service (LoadBalancer)
    - Result App Service (LoadBalancer)
    - Deploy the Voting App
    - Deploy Internal Components
    - Deploy the Worker and Result Pods

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Kubernetes Introduction

# Demo Kubernetes on Google Cloud Platform

Welcome to this comprehensive guide on deploying an application using Google Kubernetes Engine (GKE) on the Google Cloud Platform (GCP). In this article, you'll learn how to set up a Kubernetes cluster, create YAML definition files for pods and services, and deploy your multi-component application. Follow along as we walk through each step of the process.

---

## Setting Up the Kubernetes Cluster

Begin by signing in to your Google Cloud Platform account. Once logged in, your dashboard will resemble the image below:

![The image shows a Google Cloud Platform dashboard with project information, API requests graph, billing details, and error reporting. It includes a banner for setting up a Google Kubernetes Engine environment.](https://kodekloud.com/kk-media/image/upload/v1752874106/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Kubernetes-on-Google-Cloud-Platform/frame_50.jpg)

Kubernetes Engine provides a managed environment for deploying containerized applications. To get started with the command-line tool, run:

```
gcloud components install kubectl
```

Next, from the Cloud Console menu, select **Kubernetes Engine** to access the dashboard. If no cluster exists yet, click on **Create a Cluster** as shown below:

![The image shows the Google Cloud Platform interface for managing Kubernetes clusters, with options to create a cluster or take a quickstart tutorial.](https://kodekloud.com/kk-media/image/upload/v1752874107/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Kubernetes-on-Google-Cloud-Platform/frame_120.jpg)

Fill in the cluster details:

- **Name:** Use something descriptive like "example-voting-app"
- **Description:** (Optional) Provide a brief description
- Leave the remaining options as default and click **Create**.

This process provisions a master node along with three worker nodes. When setup is complete, you will see a green check mark confirming the cluster is ready.

Next, click on the **Google Cloud Shell** button located in the top right corner. The Cloud Shell offers a temporary terminal for running Kubernetes commands and will display a screen similar to the one below:

![The image shows the Google Cloud Platform interface displaying Kubernetes clusters, with a Cloud Shell terminal open at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752874108/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Kubernetes-on-Google-Cloud-Platform/frame_180.jpg)

Once your cluster is ready, click the **Connect** button for the Voting Application cluster. Follow the provided instructions to retrieve credentials and start a proxy by running:

```
gcloud container clusters get-credentials example-voting-app --zone us-central1-a --project plucky-order-181319
kubectl proxy
```

> [!important]
> **Note**
>
> If the command warns that the cluster is not running, wait until the green check mark appears and execute the command again. This step ensures that your kubeconfig is correctly configured for further commands.

To verify your cluster, list the nodes:

```
kubectl get nodes
```

You should see something similar to the following output:

```
NAME                                              STATUS   ROLES    AGE   VERSION
gke-example-voting-app-default-pool-2aad9e6c-d9n5   Ready    <none>   1m    v1.7.8-gke.0
gke-example-voting-app-default-pool-2aad9e6c-ldq4   Ready    <none>   1m    v1.7.8-gke.0
gke-example-voting-app-default-pool-2aad9e6c-x9pp   Ready    <none>   1m    v1.7.8-gke.0
```

Similarly, verify that no pods are running yet:

```
kubectl get pods
```

You can also list the Kubernetes-created default service with:

```
kubectl get services
```

With your cluster ready, the next step is to create YAML definition files for the application components.

---

## Creating Pod Definition Files

On your local development environment, create a folder called `example-voting-app-kube`. This folder will contain the YAML files for each component of the voting application.

### Voting App Pod

Create a file named `voting-app-pod.yaml` with the following content:

```
apiVersion: v1
kind: Pod
metadata:
  name: voting-app-pod
  labels:
    name: voting-app-pod
    app: demo-voting-app
spec:
  containers:
    - name: voting-app
      image: dockersamples/examplevotingapp_vote
      ports:
        - containerPort: 80
```

This definition creates a pod for the voting application. The labels will be used later for service selection.

### Worker Pod

Duplicate the previous file and save it as `worker-app-pod.yaml`. Modify the content as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: worker-app-pod
  labels:
    name: worker-app-pod
    app: demo-voting-app
spec:
  containers:
    - name: worker-app
      image: dockersamples/examplevotingapp_worker
```

This pod definition creates the backend worker, which does not require exposed ports.

### Result App Pod

Create a file named `result-app-pod.yaml` containing:

```
apiVersion: v1
kind: Pod
metadata:
  name: result-app-pod
  labels:
    name: result-app-pod
    app: demo-voting-app
spec:
  containers:
    - name: res-app
      image: dockersamples/examplevotingapp_result
      ports:
        - containerPort: 80
```

This pod exposes port 80 for the results application.

### Redis Pod

Define the Redis pod by creating a file named `redis-pod.yaml`:

```
apiVersion: v1
kind: Pod
metadata:
  name: redis-pod
  labels:
    name: redis-pod
    app: demo-voting-app
spec:
  containers:
    - name: redis
      image: redis
      ports:
        - containerPort: 6379
```

Redis listens on the default port 6379.

### PostgreSQL Pod

Finally, create a file named `postgres-pod.yaml` for the PostgreSQL database:

```
apiVersion: v1
kind: Pod
metadata:
  name: postgres-pod
  labels:
    name: postgres-pod
    app: demo-voting-app
spec:
  containers:
    - name: postgres
      image: postgres:9.4
      ports:
        - containerPort: 5432
```

PostgreSQL uses port 5432.

---

## Creating Service Definition Files

To allow the components to communicate internally (and externally when needed), you'll create services for the pods.

### Redis Service

Create a file named `redis-service.yaml` with this content:

```
apiVersion: v1
kind: Service
metadata:
  name: redis
  labels:
    name: redis-service
    app: demo-voting-app
spec:
  ports:
    - port: 6379
      targetPort: 6379
  selector:
    name: redis-pod
    app: demo-voting-app
```

This service exposes the Redis pod internally.

### PostgreSQL (DB) Service

For the PostgreSQL database, create a file named `postgres-service.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: db
  labels:
    name: db-service
    app: demo-voting-app
spec:
  ports:
    - port: 5432
      targetPort: 5432
  selector:
    name: postgres-pod
    app: demo-voting-app
```

The service is named "db" to match what the application expects.

### Voting App Service (LoadBalancer)

To expose the voting application externally, create a file named `voting-app-service.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: voting-service
  labels:
    name: voting-service
    app: demo-voting-app
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    name: voting-app-pod
    app: demo-voting-app
```

Setting the service type to LoadBalancer enables external access through a cloud provider’s load balancer.

### Result App Service (LoadBalancer)

Similarly, expose the result app externally by creating `result-service.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: result-service
  labels:
    name: result-service
    app: demo-voting-app
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    name: result-app-pod
    app: demo-voting-app
```

> [!important]
> **Tip**
>
> Although service labels can sometimes be optional, it is best practice to define them consistently for ease of management.

---

## Deploying to the Cluster

Before deployment, commit and push your YAML files to your GitHub repository. Then, open your Cloud Shell and clone your repository:

1.  **Clone the Repository:**

```
git clone <repository-url>
```

2.  **Change into the Directory:**

```
cd kubernetes-example-voting-app
```

Now, deploy each component individually.

### Deploy the Voting App

1.  **Create the Voting App Pod:**

```
kubectl create -f voting-app-pod.yaml
```

You should receive a confirmation such as:

```
pod "voting-app-pod" created
```

2.  **Verify Pod Status:**

```
kubectl get pods
```

3.  **Expose the Voting App:**

```
kubectl create -f voting-app-service.yaml
```

Check the service details. Initially, the external IP might be listed as `<pending>`:

```
kubectl get services
```

Monitor the load balancer creation in the "Discovery and load balancing" section of the Cloud Console. Once the external IP is provisioned, you can access the voting app in your browser.

### Deploy Internal Components

Deploy Redis and its corresponding service:

```
kubectl create -f redis-pod.yaml
kubectl create -f redis-service.yaml
```

Similarly, deploy the PostgreSQL pod and its service:

```
kubectl create -f postgres-pod.yaml
kubectl create -f postgres-service.yaml
```

### Deploy the Worker and Result Pods

Deploy the worker component with:

```
kubectl create -f worker-app-pod.yaml
```

Then deploy the result application pod and expose it externally:

```
kubectl create -f result-app-pod.yaml
kubectl create -f result-service.yaml
```

To review the status of your pods:

```
kubectl get pods
```

And to check your services, run:

```
kubectl get services
```

A typical output might look like this:

| NAME           | TYPE         | CLUSTER-IP     | EXTERNAL-IP    | PORT(S)      | AGE |
| -------------- | ------------ | -------------- | -------------- | ------------ | --- |
| db             | ClusterIP    | 10.19.245.11   | <none>         | 5432/TCP     | 2m  |
| kubernetes     | ClusterIP    | 10.19.240.201  | <none>         | 443/TCP      | 25m |
| redis          | ClusterIP    | 10.19.242.155  | <none>         | 6379/TCP     | 3m  |
| result-service | LoadBalancer | 35.188.172.125 | 35.184.173.162 | 80:30410/TCP | 12s |
| voting-service | LoadBalancer | 35.184.173.162 | <pending>      | 80:30176/TCP | 6m  |

Once the load balancer services are active and the external IP addresses are available, simply enter those IPs in your browser. As you cast votes, you will see the results update in near real-time.

---

## Conclusion

This guide demonstrated how to create a Kubernetes cluster on Google Cloud Platform, prepare YAML files for various pods and services, and deploy a multi-component application encompassing the voting app, worker, result app, Redis, and PostgreSQL. Services are configured to ensure seamless communication between components as well as external access via load balancers.

Thank you for reading this guide. Enjoy experimenting with Kubernetes and GCP, and happy deploying!

For further reading, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Google Cloud Platform Documentation](https://cloud.google.com/docs)

Happy Kubernetes-ing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9b8ffcd1-c5b0-45d0-968d-55a5146c3e39/lesson/a1211188-d46b-488d-bd88-67d4d03bae6d)**
>
> Watch video content
