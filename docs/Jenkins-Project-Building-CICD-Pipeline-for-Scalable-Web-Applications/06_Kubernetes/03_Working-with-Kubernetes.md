# Working with Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Kubernetes/Working-with-Kubernetes)

---

## Table of Contents

- Working with Kubernetes
  - Understanding Pods in Kubernetes
  - Deployments in Kubernetes
  - Managing Multiple Clusters with kubectl
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Kubernetes

# Working with Kubernetes

In this guide, you'll learn the fundamentals of working with Kubernetes while integrating it into a CI/CD pipeline alongside [Jenkins](https://learn.kodekloud.com/user/courses/jenkins). Although this article does not cover every detail of Kubernetes, you will gain a solid understanding of core components necessary for effective cluster management.

## Understanding Pods in Kubernetes

In Kubernetes, you deploy applications as pods rather than as individual containers. A pod is an abstraction layer that encapsulates one or more containers that work in unison, making it easier to manage them as a single unit. For instance, if your application requires three instances, you deploy three pods instead of dealing with three separate containers.

Below is an example YAML configuration for creating a pod:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    name: myapp
spec:
  containers:
    - name: myapp
      image: <Image>
      resources:
        limits:
          memory: "128Mi"
          cpu: "500m"
      ports:
        - containerPort: 5000
```

Key aspects of the YAML file include:

- **Kind**: Specifies that the resource is a Pod.
- **Metadata**: Contains the pod name and labels (key-value pairs used to tag resources).
- **Spec**: Defines the configuration, including the list of containers, each with their name, image (which can be sourced from [Docker Hub](https://hub.docker.com) or private repositories), resource limits, and ports.

To deploy this pod, run the following command using the Kubernetes CLI (`kubectl`):

```
# kubectl apply -f pod.yaml
```

Below is an illustrative diagram explaining a Kubernetes pod setup:

![The image illustrates a Kubernetes pod containing Python and Logging components, with an arrow pointing to a Kubernetes cluster represented by three icons.](https://kodekloud.com/kk-media/image/upload/v1752879938/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Working-with-Kubernetes/kubernetes-pod-python-logging-diagram.jpg)

> [!important]
> **Note**
>
> Pods are the smallest deployable units in Kubernetes, and understanding them is crucial for designing effective containerized applications.

## Deployments in Kubernetes

While deploying pods directly is possible, Kubernetes provides an abstraction called a "deployment" to simplify the management of pod lifecycles. A deployment not only creates multiple pod replicas but also monitors them, restarts failed pods, handles scaling, and manages rollouts and rollbacks. For example, if your application needs a continuous presence of three instances, a deployment ensures that exactly three pods remain active.

Here is a typical deployment YAML configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      name: myapp
  template:
    metadata:
      labels:
        name: myapp
    spec:
      containers:
        - name: myapp
          image: <Image>
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 5000
```

This configuration highlights:

- **apiVersion & Kind**: Uses `apps/v1` for deployments.
- **Replicas**: Specifies the desired number of pod instances.
- **Selector & Template**: The selector identifies which pods the deployment should manage and links to the pod template that defines the pod specification.

Deploy the configuration using:

```
# kubectl apply -f deployment.yaml
```

The diagram below illustrates how a deployment manages multiple pods and maintains application stability:

![The image illustrates a Kubernetes deployment with three pods, each containing Python and Logging components. It highlights features like monitoring and restarting failed pods and scaling pod instances.](https://kodekloud.com/kk-media/image/upload/v1752879939/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Working-with-Kubernetes/kubernetes-deployment-pods-monitoring.jpg)

> [!important]
> **Deployment Benefits**
>
> Deployments offer powerful management capabilities that ensure high availability and seamless updates for your applications.

## Managing Multiple Clusters with kubectl

Many organizations operate multiple Kubernetes clusters, such as production, staging, and development, and managing them efficiently is key. The `kubectl` CLI supports connecting to multiple clusters via a kubeconfig file, which stores all the relevant configuration details and credentials.

Below is a sample kubeconfig file:

```
apiVersion: v1
kind: Config
preferences: {}
clusters:
- name: cluster2
  cluster:
    server: https://192.168.54.19:8443
- name: cluster1
  cluster:
    server: https://192.168.59.123:8443
contexts:
- name: john@cluster1
  context:
    cluster: cluster1
    user: john
- name: mike@cluster2
  context:
    cluster: cluster2
    user: mike
current-context: cluster1
users:
- name: john
  user:
    client-certificate: <path-to-client-certificate>
    client-key: <path-to-client-key>
- name: mike
  user:
    client-certificate: <path-to-client-certificate>
    client-key: <path-to-client-key>
```

Explanation of the kubeconfig structure:

- **Clusters**: Lists each Kubernetes cluster with its API server endpoint.
- **Users**: Specifies credentials for accessing the clusters.
- **Contexts**: Ties each user to a specific cluster.
- **Current Context**: Determines the default context used by `kubectl`.

By default, `kubectl` searches for this configuration file in the `$HOME/.kube/config` directory. You can also specify the configuration location using:

| Method                | Command/Variable                      |
| --------------------- | ------------------------------------- |
| Directory             | `$HOME/.kube/config`                  |
| Environment Variable  | `KUBECONFIG`                          |
| Command Line Argument | `kubectl --kubeconfig <path-to-file>` |

To switch between contexts (and hence clusters), use the following commands:

```
> kubectl config use-context john@cluster1
```

And to switch to another context:

```
> kubectl config use-context mike@cluster2
```

Using multiple contexts is essential in a CI/CD pipeline. For instance, you might deploy to a staging cluster first (e.g., using `mike@cluster2`) before promoting changes to the production cluster.

The following diagram shows how `kubectl` connects to various Kubernetes clusters:

![The image is a diagram showing "kubectl" connected to three Kubernetes clusters labeled Cluster1, Cluster2, and Cluster3.](https://kodekloud.com/kk-media/image/upload/v1752879940/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Working-with-Kubernetes/kubectl-kubernetes-clusters-diagram.jpg)

> [!important]
> **Best Practice**
>
> Always ensure your kubeconfig file is secured, as it contains sensitive credentials to access your Kubernetes clusters. Use RBAC and other security measures to safeguard your infrastructure.

By understanding these core concepts—pods, deployments, and kubeconfig management—you are now well-equipped to configure and manage Kubernetes environments within your CI/CD pipelines using Jenkins. For more detailed Kubernetes information, consider exploring the [Kubernetes Documentation](https://kubernetes.io/docs/) and other helpful resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/1d8036bf-2606-4587-beef-925546e0c655/lesson/0c653b80-3075-4e39-b7e1-79f5584f6568)**
>
> Watch video content
