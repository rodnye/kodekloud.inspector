# Recap Deployments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Recap-Deployments)

---

## Table of Contents

- Recap Deployments
  - Creating a Deployment
  - Watch Video
  - Practice Lab
    - Verifying the Deployment

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Recap Deployments

Hello and welcome. My name is Mumshad Mannambeth. In this article, we’ll explore Kubernetes Deployments, a vital tool for managing applications in production environments. Kubernetes Deployments simplify rolling updates, rollbacks, and coordinated changes, ensuring your applications remain highly available and robust.

Imagine you need to deploy a production web server. Instead of running a single instance, you’ll need multiple instances for load balancing and high availability. When new builds are available in your Docker registry, updating all instances simultaneously isn’t ideal—this might impact users. Instead, a Rolling Update allows you to upgrade instances one by one, and if an error occurs, you can quickly roll back to a stable version. Additionally, if you need to update various aspects of your environment—like upgrading web server versions, scaling resources, or adjusting resource allocations—it’s best to pause, apply all changes together, and then resume operations.

Kubernetes Deployments provide these capabilities. Pods represent a single instance of your application, and they are managed by ReplicaSets (or replication controllers). The Deployment object orchestrates these Pods, enabling seamless updates and coordinated changes.

## Creating a Deployment

To create a Deployment, you begin by writing a Deployment definition file. The primary difference between a ReplicaSet and a Deployment definition is that the `kind` is set to Deployment.

Below is an example of a valid Deployment YAML definition:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 3
  selector:
    matchLabels:
      type: front-end
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
      - name: nginx-container
        image: nginx
```

This YAML file includes the following key sections:

- **API Version:** Uses `apps/v1` for the Deployment.
- **Metadata:** Provides a unique name (`myapp-deployment`) and labels to identify the Deployment.
- **Specification (spec):**
  - **Replicas:** Defines the desired number of pod copies.
  - **Selector:** Matches the defined labels.
  - **Template:** Describes the pod configuration, including container specifications.

> [!important]
> **Note**
>
> Make sure to save your YAML file, for example, as `deployment-definition.yml` before proceeding with deployment creation.

Once your file is ready, create the Deployment using the following command:

```
kubectl create -f deployment-definition.yml
```

You should see confirmation similar to:

```
deployment "myapp-deployment" created
```

### Verifying the Deployment

After creating the Deployment, verify that it is running as expected by executing:

```
kubectl get deployments
```

The output should resemble:

```
NAME               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment   3         3         3            3           21s
```

When a Deployment is created, Kubernetes automatically generates a corresponding ReplicaSet. To view this ReplicaSet, run:

```
kubectl get replicasets
```

And to see the Pods managed by the ReplicaSet, execute:

```
kubectl get pods
```

To display all related Kubernetes objects simultaneously, use:

```
kubectl get all
```

An example output might be:

```
NAME                              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/myapp-deployment           3         3         3            3           9h


NAME                              DESIRED   CURRENT   READY   AGE
rs/myapp-deployment-6795844b58     3         3         3       9h


NAME                                       READY   STATUS    RESTARTS   AGE
po/myapp-deployment-6795844b58-5rbj1         1/1     Running   0          9h
po/myapp-deployment-6795844b58-h4w55          1/1     Running   0          9h
po/myapp-deployment-6795844b58-1fjhv          1/1     Running   0          9h
```

This output confirms that your Deployment, the associated ReplicaSet, and all Pods are operating as intended.

> [!important]
> **Key Takeaway**
>
> Kubernetes Deployments not only simplify the management of your application’s lifecycle but also provide powerful features such as automated scaling, rolling updates, and instant rollback capabilities.

That concludes this article on Kubernetes Deployments. Stay tuned for upcoming lessons where we will dive deeper into advanced features like rolling updates, rollbacks, and coordinated changes to further enhance your application's deployment strategy.

---

For additional details and tutorials, consider checking out:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/d538bf77-9221-444d-b6c1-d6fde5685d33)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/69b32ee9-2d09-4a65-9f0c-5607ceadebff)**
>
> Practice lab
