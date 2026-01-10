# Demo Play with Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Kubernetes-Introduction/Demo-Play-with-Kubernetes)

---

## Table of Contents

- Demo Play with Kubernetes
  - Initializing the Kubernetes Cluster
  - Cloning the Application Repository
  - Deploying the Voting Application
  - Deploying the Remaining Application Components
  - Deploying All Components Simultaneously
  - Resetting Your Environment
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Kubernetes Introduction

# Demo Play with Kubernetes

Welcome to this comprehensive lesson on setting up a Kubernetes test environment using PlayWithK8s.com. In this guide, you'll quickly learn how to experiment with Kubernetes without needing your own infrastructure or a public cloud account by following a step-by-step procedure similar to our previous demos, with environment-specific adjustments.

![The image is a slide titled "DEMO" outlining steps for setting up a Kubernetes test environment, creating pods, and services with ClusterIP and LoadBalancer.](https://kodekloud.com/kk-media/image/upload/v1752874109/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_10.jpg)

When you navigate to PlayWithK8s.com, you'll get free access to Kubernetes clusters with sessions lasting four hours. Simply click on "Add New Instance" to provision a cluster instance and begin your tests immediately.

![The image shows a Kubernetes login page with a reCAPTCHA verification, featuring the Kubernetes logo and branding by Google.](https://kodekloud.com/kk-media/image/upload/v1752874111/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_80.jpg)

Once logged in, you'll notice a session timer counting down from four hours. This environment is ideal for quick tests and experiments.

---

## Initializing the Kubernetes Cluster

Begin by initializing your Kubernetes cluster using the provided YAML definition files from previous demos. Execute the following commands on your provisioned instance:

```
kubeadm init --apiserver-advertise-address $(hostname -i)


kubectl apply -n kube-system -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"


curl -L -s https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml | sed 's/targetPort: 8443/targetPort: 8443\n  type: LoadBalancer/' | kubectl apply -f -
```

After executing these commands, you should see output similar to the snippet below:

```
[apiclient] All control plane components are healthy after 36.501139 seconds
[token] Using token: 0f5aa8.4abec8c7a16185d
[apiconfig] Created RBAC rules
[addons] Applied essential addon: kube-proxy
[addons] Applied essential addon: kube-dns


Your Kubernetes master has initialized successfully!
To start using your cluster, you need to run (as a regular user):
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config


You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
http://kubernetes.io/docs/admin/addons/


You can now join any number of machines by running the following on each node as root:
kubeadm join --token 0f5aa8.4abec8c7a16185d 10.0.63.4:6443
```

The second command sets up the networking for your cluster. In this demo, we'll skip the optional deployment of the Kubernetes Dashboard. Once your master node is running and networking is configured, you are ready to deploy your application.

---

## Cloning the Application Repository

Next, clone our GitHub repository containing the Kubernetes YAML files for a sample voting application. First, ensure that Git is installed on your instance:

```
yum install git
```

Clone the repository using:

```
git clone https://github.com/mmumshad/kubernetes-example-voting-app.git
```

After cloning, verify the repository contents:

```
ls
```

You should see files such as:

- postgres-pod.yml
- redis-pod.yml
- result-app-pod.yml
- voting-app-pod.yml
- worker-app-pod.yml
- postgres-service.yml
- redis-service.yml
- result-app-service.yml
- voting-app-service.yml

![The image shows a GitHub repository page for a Kubernetes example voting app, with options to clone or download the repository.](https://kodekloud.com/kk-media/image/upload/v1752874112/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_210.jpg)

---

## Deploying the Voting Application

Start by deploying the voting app pod, then expose it through a service. Create the voting app pod with:

```
kubectl create -f voting-app-pod.yml
```

Check the pod status:

```
kubectl get pods
```

If the pod shows as "Pending", inspect further details with:

```
kubectl describe pods voting-app-pod
```

> [!important]
> **Scheduling Tip**
>
> If you see an error about no available nodes that match the scheduling predicates, it may be because the master node is tainted by default.

Allow scheduling on the master node by removing the taint (replace <nodeName> with your actual node name, e.g., "node1"):

```
kubectl taint nodes <nodeName> node-role.kubernetes.io/master:NoSchedule-
```

Once untainted, verify that the pod transitions to a Running state:

```
kubectl get pods
```

After confirming, create the service to expose the voting app:

```
kubectl create -f voting-app-service.yml
```

Check that the service is running:

```
kubectl get services
```

Click the link provided by PlayWithK8s.com to open the voting app in your browser.

---

## Deploying the Remaining Application Components

Deploy additional components required by the voting app, including Redis, Postgres, the worker, and the result app pods, along with their corresponding services. Execute the following commands one after another:

```
kubectl create -f redis-pod.yml
kubectl create -f redis-service.yml


kubectl create -f postgres-pod.yml
kubectl create -f postgres-service.yml


kubectl create -f worker-app-pod.yml


kubectl create -f result-app-pod.yml
kubectl create -f result-app-service.yml
```

Monitor the status of all pods:

```
kubectl get pods
```

A typical output might look like:

```
NAME               READY   STATUS              RESTARTS   AGE
postgres-pod       1/1     Running             0          32s
redis-pod          1/1     Running             0          48s
result-app-pod     0/1     ContainerCreating   0          13s
voting-app-pod     1/1     Running             0          5m
worker-app-pod     0/1     ContainerCreating   0          21s
```

Once all pods are Running, check that the services are created:

```
kubectl get services
```

Access the voting application via the external link. The interface should display the current vote counts (initially 50-50, before any votes are cast). Casting a vote (e.g., selecting "CATS" or "DOGS") will update the results as the services communicate.

![A web page titled "Cats vs Dogs!" with buttons to vote for either "CATS" or "DOGS," processed by a container ID.](https://kodekloud.com/kk-media/image/upload/v1752874113/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_620.jpg)

![The image shows a voting result with "Cats" at 0.0% and "Dogs" at 100.0%, with a total of 1 vote.](https://kodekloud.com/kk-media/image/upload/v1752874114/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_630.jpg)

---

## Deploying All Components Simultaneously

Instead of deploying resources individually, you can deploy all YAML files from the repository at once. Execute the following command from within the repository directory:

```
kubectl create -f .
```

This command initiates all pods and services. Verify the deployment using:

```
kubectl get pods
kubectl get services
```

A sample pods output might be:

```
NAME               READY   STATUS    RESTARTS   AGE
postgres-pod       1/1     Running   0          11s
redis-pod          1/1     Running   0          11s
result-app-pod     1/1     Running   0          10s
voting-app-pod     1/1     Running   0          10s
worker-app-pod     1/1     Running   0          10s
```

---

## Resetting Your Environment

After the demo, you can clean up by deleting all deployed resources simultaneously. Run the following command:

```
kubectl delete -f .
```

This command removes all specified resources (pods, services, etc.). Confirm deletion with:

```
kubectl get pods
kubectl get services
```

![The image features a dark background with hexagonal patterns and a central text box stating "Reset - Delete all at once" in white font.](https://kodekloud.com/kk-media/image/upload/v1752874115/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Play-with-Kubernetes/frame_700.jpg)

A typical deletion output might be:

```
pod "postgres-pod" deleted
service "db" deleted
pod "redis-pod" deleted
service "redis" deleted
pod "result-app-pod" deleted
service "result-service" deleted
pod "voting-app-pod" deleted
service "voting-service" deleted
pod "worker-app-pod" deleted
```

---

Thank you for following this demo on deploying an application using PlayWithK8s.com. We hope you found this guide helpful, and we look forward to supporting your next Kubernetes adventure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9b8ffcd1-c5b0-45d0-968d-55a5146c3e39/lesson/4b5effe9-243d-43c7-928c-4316db4f91ec)**
>
> Watch video content
