# Demo Image Streams - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Demo-Image-Streams)

---

## Table of Contents

- Demo Image Streams
  - Navigating the OpenShift Console
  - Creating a New ImageStream for the Carts App
  - Inspecting the Deployment Manifest
  - Deploying the Application Using the ImageStream
  - Watch Video
    - Resolving Deployment Conflicts

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Demo Image Streams

In this guide, we walk through creating and deploying an ImageStream in OpenShift. ImageStreams are essential in OpenShift as they help manage container images and their tags, streamlining your deployment workflow.

## Navigating the OpenShift Console

First, open the OpenShift console and navigate to the Builds section, then select ImageStreams. You will notice that many deployments already have their own ImageStreams.

![The image shows the Red Hat OpenShift Container Platform interface, specifically the "ImageStreams" section, listing image streams like "approved-apache" and "goweb" with their creation times and labels.](https://kodekloud.com/kk-media/image/upload/v1752882585/notes-assets/images/OpenShift-4-Demo-Image-Streams/openshift-imagestreams-interface.jpg)

Next, by clicking on "Microservice Demo Git," you can inspect the SockShop application that was previously deployed. This application already has an associated ImageStream.

![The image shows a Red Hat OpenShift Container Platform interface displaying project details, including labels and image repository information for a microservices demo.](https://kodekloud.com/kk-media/image/upload/v1752882586/notes-assets/images/OpenShift-4-Demo-Image-Streams/red-hat-openshift-project-details.jpg)

## Creating a New ImageStream for the Carts App

Suppose you want to create a new ImageStream for a specific deployment within SockShop, such as the Carts app. To do this, click on the "Create ImageStream" option. Remove any undesired default content and paste the following configuration:

```
kind: ImageStream
metadata:
  name: carts
spec:
  lookupPolicy:
    local: false
  tags:
    - name: "0.4.8"
      from:
        kind: DockerImage
        name: weaveworksdemos/carts:0.4.8
      referencePolicy:
        type: Source
```

This YAML configuration sets up an ImageStream for the Carts app using the tag "0.4.8," which is sourced from the specified Docker image.

> [!important]
> **Note**
>
> ImageStreams help you manage different versions of container images efficiently, ensuring consistency across your deployments.

## Inspecting the Deployment Manifest

If you are curious about the underlying container image configuration, you can examine the deployment manifest in an editor such as VS Code. Here is the deployment configuration for the Carts app:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: carts
  labels:
    name: carts
spec:
  replicas: 1
  selector:
    matchLabels:
      name: carts
  template:
    metadata:
      labels:
        name: carts
    spec:
      containers:
        - name: carts
          image: weaveworksdemos/carts:0.4.8
          ports:
            - containerPort: 80
```

## Deploying the Application Using the ImageStream

Once the ImageStream is in place, you can deploy an application based on it. Open your terminal and execute the command below to deploy the Carts app from the "default" project:

```
oc new-app --image-stream=default/carts:0.4.8
```

At this point, you might receive output similar to the example below, indicating that the deployment already exists:

```
oc new-app --image-stream=default/carts:0.4.8
--> Found image c004737 (5 years old) in image stream "default/carts" under tag "0.4.8" for "default/t/carts:0.4.8"
--> Creating resources ...
error: deployments.apps "carts" already exists
--> Failed
mlevan@littleship01 ~  [] Desktop  microservices-demo-openshift  🡆 master ≡ 0 ?1  🡆
oc
```

> [!important]
> **Warning**
>
> An error indicating that the deployment already exists means that a previous deployment is conflicting with the new one.

### Resolving Deployment Conflicts

To resolve this issue, delete the existing deployment by running:

```
oc delete deployment carts
```

After confirming the deletion, verify the list of remaining deployments with:

```
oc get deployments
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
approved-apache     1/1     1            1           8m29s
carts               1/1     1            1           3m2s
catalogue           1/1     1            1           3d18h
catalogue-db        1/1     1            1           3d18h
front-end           1/1     1            1           3d18h
goweb               1/1     1            1           3d18h
mongodb             0/1     1            0           5m36s
nginx-deployment    2/2     2            1           3d18h
orders              1/1     1            1           3d18h
orders-db           1/1     1            1           3d18h
payment             1/1     1            1           3d18h
queue-master        1/1     1            1           3d18h
rabbitmq            1/1     1            1           3d18h
shipping            1/1     1            1           3d18h
user                1/1     1            1           3d18h
user-db             1/1     1            1           3d18h
```

Now, run the deployment command again:

```
oc new-app --image-stream=default/carts:0.4.8
--> Found image c004737 (5 years old) in image stream "default/carts" under tag "0.4.8" for "default/t/carts:0.4.8"
--> Creating resources ...
    deployment.apps "carts" created
--> Success
   Run 'oc status' to view your app.
mlevan@littleship01 ~/Desktop/microservices-demo-openshift (master) $
```

To confirm that the Carts app is now running, execute:

```
oc get deployments
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
approved-apache     1/1     1            1           8m58s
carts               1/1     1            1           8s
catalogue           1/1     1            1           3d18h
catalogue-db        1/1     1            1           3d18h
front-end           1/1     1            1           3d18h
goweb               1/1     1            1           3d18h
mongodb             0/1     1            0           6m5s
nginx-deployment    2/2     2            2           3d18h
orders              1/1     1            1           3d18h
orders-db           1/1     1            1           3d18h
payment             1/1     1            1           3d18h
queue-master        1/1     1            1           3d18h
rabbitmq            1/1     1            1           3d18h
shipping            1/1     1            1           3d18h
user                1/1     1            1           3d18h
user-db             1/1     1            1           3d18h
```

With these steps, the new ImageStream for the Carts app has been successfully deployed. This method allows you to target and deploy individual microservices using ImageStreams in OpenShift, thereby simplifying application management in a containerized environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/27cfad89-1e21-4550-8bc4-cc667147d405)**
>
> Watch video content
