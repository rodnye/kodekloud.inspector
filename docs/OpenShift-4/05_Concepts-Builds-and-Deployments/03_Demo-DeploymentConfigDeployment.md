# Demo DeploymentConfigDeployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Demo-DeploymentConfigDeployment)

---

## Table of Contents

- Demo DeploymentConfigDeployment
  - Deploying CartsDB with a Standard Deployment
  - Deploying CartsDB with a DeploymentConfig
  - Summary
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Demo DeploymentConfigDeployment

In this guide, we'll walk through a hands-on example to deploy the CartsDB database on OpenShift. We will cover two methods: using a standard Deployment from the AppsV1 API and using a DeploymentConfig. Both methods will help you understand how to manage a MongoDB-based database deployment in OpenShift.

---

## Deploying CartsDB with a Standard Deployment

First, we will deploy CartsDB using a standard Deployment. This method uses the AppsV1 API and is similar to deploying other applications on Kubernetes.

1.  Open the OpenShift console and click on **Create Deployment**.
2.  Open your preferred editor (e.g., VS Code) and paste the following Deployment specification:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: carts-db
  labels:
    name: carts-db
spec:
  replicas: 1
  selector:
    matchLabels:
      name: carts-db
  template:
    metadata:
      labels:
        name: carts-db
    spec:
      containers:
      - name: carts-db
        image: centos/mongodb-34-centos7
        ports:
        - name: mongo
          containerPort: 27017
        env:
        - name: MONGODB_USER
          value: sock-user
        - name: MONGODB_PASSWORD
          value: password
        - name: MONGODB_DATABASE
          value: data
        - name: MONGODB_ADMIN_PASSWORD
          value: admin
```

This specification will deploy a single replica using the MongoDB image with the necessary environment variables and port configuration for CartsDB.

After pasting the configuration into the OpenShift console, click **Create** and wait a few moments. You should see one Pod running for CartsDB.

Below is an image showing the deployment details in the OpenShift Container Platform interface:

![The image shows the Red Hat OpenShift Container Platform interface, displaying deployment details for "carts-db" with a scaling status. The sidebar includes options like Pods, Deployments, and ConfigMaps.](https://kodekloud.com/kk-media/image/upload/v1752882578/notes-assets/images/OpenShift-4-Demo-DeploymentConfigDeployment/openshift-carts-db-deployment-details.jpg)

You can inspect the deployment details to view information such as the name, namespace, labels, update strategy, and pod selector. This visual interface in OpenShift provides a comprehensive view that is often more intuitive than terminal output.

Additionally, here's a quick look at the individual environment variable settings:

```
MONGODB_USER: sock-user
MONGODB_PASSWORD: password
MONGODB_DATABASE: data
MONGODB_ADMIN_PASSWORD: admin
```

After the deployment, you can review the Replica Sets and any events generated. For example, an event may indicate that CartsDB was deployed successfully:

![The image shows a Red Hat OpenShift Container Platform interface displaying the events for a deployment named "carts-db" in the default project. It indicates a recent scaling event for a replica set.](https://kodekloud.com/kk-media/image/upload/v1752882580/notes-assets/images/OpenShift-4-Demo-DeploymentConfigDeployment/openshift-carts-db-deployment-events.jpg)

If desired, you can delete this deployment after verifying that the Pod is running as expected.

---

## Deploying CartsDB with a DeploymentConfig

Next, we will deploy CartsDB using a DeploymentConfig. This OpenShift-specific configuration is similar to the standard Deployment but uses the OpenShift API (`apps.openshift.io/v1`) and omits an explicit selector.

1.  In the OpenShift console, click on **Create a new Deployment Config**.
2.  Clear any pre-populated content and paste in the following DeploymentConfig:

```
apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: carts-db
  labels:
    name: carts-db
spec:
  replicas: 1
  template:
    metadata:
      labels:
        name: carts-db
    spec:
      containers:
      - name: carts-db
        image: centos/mongodb-34-centos7
        ports:
        - name: mongo
          containerPort: 27017
        env:
        - name: MONGODB_USER
          value: sock-user
        - name: MONGODB_PASSWORD
          value: password
        - name: MONGODB_DATABASE
          value: data
        - name: MONGODB_ADMIN_PASSWORD
          value: admin
        volumeMounts:
        - mountPath: /tmp
          name: tmp-volume
      volumes:
      - name: tmp-volume
        emptyDir:
          medium: Memory
      nodeSelector:
        beta.kubernetes.io/os: linux
```

This DeploymentConfig creates a Replication Controller-based deployment for CartsDB with the same container image, environment variables, and additional volume configurations.

After pasting the configuration, click **Create** and wait until the Pod becomes available.

Review the DeploymentConfig details within the OpenShift console. You will see various details, such as the name, namespace, labels, events, and associated Replication Controllers.

![The image shows a Red Hat OpenShift Container Platform interface displaying the "carts-db" deployment configuration details, specifically the "Events" tab, with a notification about a new replication controller creation.](https://kodekloud.com/kk-media/image/upload/v1752882582/notes-assets/images/OpenShift-4-Demo-DeploymentConfigDeployment/openshift-carts-db-events-notification.jpg)

> [!important]
> **Note**
>
> DeploymentConfigs use Replication Controllers to manage pods, unlike standard Deployments that use Replica Sets.

For additional context, compare this image with the standard Deployment view:

![The image shows the Red Hat OpenShift Container Platform interface displaying a list of deployments with their names, status, labels, and pod selectors.](https://kodekloud.com/kk-media/image/upload/v1752882583/notes-assets/images/OpenShift-4-Demo-DeploymentConfigDeployment/openshift-container-platform-deployments.jpg)

And view the detailed status for the CartsDB deployment:

![The image shows a Red Hat OpenShift Container Platform interface displaying details of a deployment configuration named "carts-db," with a replication controller tab open. The status indicates that one pod is complete.](https://kodekloud.com/kk-media/image/upload/v1752882584/notes-assets/images/OpenShift-4-Demo-DeploymentConfigDeployment/openshift-carts-db-deployment-status.jpg)

> [!important]
> **Warning**
>
> Although Red Hat recommends using standard Deployments as a best practice, DeploymentConfigs remain a valid choice when specific OpenShift features are necessary.

---

## Summary

By following this guide, you can deploy the CartsDB database in OpenShift using either a standard Deployment or a DeploymentConfig. Both approaches are effective, with each offering different management features:

| Deployment Type  | Key Features                                         | Use Case                                    |
| ---------------- | ---------------------------------------------------- | ------------------------------------------- |
| Deployment       | Uses Replica Sets, standard Kubernetes API           | Ideal for users familiar with Kubernetes    |
| DeploymentConfig | Uses Replication Controllers, OpenShift specific API | When leveraging OpenShift specific features |

This walkthrough should help you understand and monitor your CartsDB deployment effectively within the OpenShift environment. For more details on OpenShift deployments, consider reviewing the [OpenShift Documentation](https://docs.openshift.com/container-platform/).

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/b827395f-08e6-4e66-bce3-da52905e464e)**
>
> Watch video content
