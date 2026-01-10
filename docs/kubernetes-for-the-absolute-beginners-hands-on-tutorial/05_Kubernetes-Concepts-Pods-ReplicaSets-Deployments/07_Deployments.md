# Deployments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Deployments)

---

## Table of Contents

- Deployments
  - Creating a Kubernetes Deployment
  - Viewing All Created Objects
  - Watch Video
    - Verifying the Deployment

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Deployments

Welcome to this comprehensive guide on Kubernetes Deployments. In this article, we explore how Deployments simplify the rollout of production applications and ensure seamless updates with zero downtime.

Imagine having a web server that needs to run reliably in production. You require multiple instances of this web server to handle load distribution and high availability. Moreover, when a new version of the application is available on the Docker registry, you want to upgrade your instances one by one—a process known as a rolling update—to minimize user disruption. In case an update introduces an error, a quick rollback mechanism is essential. Additionally, you might need to modify various aspects of your environment, such as the web server version, deployment scaling, or resource allocations, and apply these changes simultaneously after a planned pause.

While individual Pods run your application instances, ReplicaSets (or Replication Controllers) manage these Pods, ensuring the correct number are always running. A Deployment builds on these components by offering a higher-level abstraction. It not only handles rolling updates and rollbacks but also lets you pause and resume deployments as needed.

![The image shows a cloud with Python icons labeled v1 and v2, connected to multiple Python icons below, indicating version deployment or distribution.](https://kodekloud.com/kk-media/image/upload/v1752884860/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments/frame_50.jpg)

The diagram above demonstrates a scenario where you deploy and upgrade versions of your web application incrementally, ensuring continuous availability.

![The image illustrates a Kubernetes deployment with a replica set containing multiple pods, each running a Python application, and versioning indicated in a cloud icon.](https://kodekloud.com/kk-media/image/upload/v1752884861/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deployments/frame_130.jpg)

This second diagram details how a Deployment coordinates with a ReplicaSet, which in turn creates and maintains multiple application Pods. The Deployment sits at the top of this hierarchy, enabling advanced management features such as rolling updates, rollbacks, and dynamic pausing/resuming of deployments.

## Creating a Kubernetes Deployment

To create a Deployment, you first define a deployment configuration file. This file's structure is similar to that of a ReplicaSet, with the key difference being that the `kind` is set to "Deployment". Below is an example of a Deployment manifest:

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

In this configuration:

- The `apiVersion` is set to `apps/v1`.
- The `kind` is "Deployment".
- The metadata section provides the name and relevant labels.
- The `spec` section defines the desired state, including the number of replicas, the pod selector, and the pod template which details metadata and container specifications.

Once you have your deployment definition file (e.g., `deployment-definition.yml`), create the Deployment with the following command:

```
kubectl create -f deployment-definition.yml
```

### Verifying the Deployment

After creation, verify the Deployment, ReplicaSet, and Pods using these commands:

1.  **Check Deployments:**

    ```
    kubectl get deployments
    ```

    Example output:

    ```
    NAME                DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
    myapp-deployment    3         3         3            3           21s
    ```

2.  **View the ReplicaSet:**

    ```
    kubectl get replicaset
    ```

    Example output:

    ```
    NAME                             DESIRED   CURRENT   READY   AGE
    myapp-deployment-6795844b58     3         3         3       2m
    ```

3.  **Examine the Pods:**

    ```
    kubectl get pods
    ```

    Example output:

    ```
    NAME                                         READY   STATUS    RESTARTS   AGE
    myapp-deployment-6795844b58-5rbj1            1/1     Running   0          2m
    myapp-deployment-6795844b58-h4w5t             1/1     Running   0          2m
    myapp-deployment-6795844b58-1fjhv             1/1     Running   0          2m
    ```

> [!important]
> **Note**
>
> The Deployment automates the creation of a ReplicaSet, which manages your Pods. This layering ensures that updates are rolled out in a controlled and managed manner.

## Viewing All Created Objects

To see all Kubernetes objects associated with your Deployment at once, run:

```
kubectl get all
```

Example output:

```
NAME                                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/myapp-deployment                 3         3         3            3           9h
NAME                                    DESIRED   CURRENT   READY   AGE
rs/myapp-deployment-6795844b58         3         3         3       9h
NAME                                    READY   STATUS    RESTARTS   AGE
po/myapp-deployment-6795844b58-5rbjl   1/1     Running   0          9h
po/myapp-deployment-6795844b58-h4w55    1/1     Running   0          9h
po/myapp-deployment-6795844b58-1fjhv    1/1     Running   0          9h
```

This comprehensive view confirms that your Deployment has successfully created all associated resources—Deployment, ReplicaSet, and Pods.

> [!important]
> **Next Steps**
>
> In the upcoming sections, we will dive deeper into advanced features like rolling updates, rollbacks, and pausing/resuming deployments. Stay tuned to master these powerful deployment mechanisms.

That concludes our guide on Kubernetes Deployments. Happy deploying!

For more insights and in-depth tutorials, explore the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/56bf05b9-7b84-4a69-a9bd-7a83a2b0f124)**
>
> Watch video content
