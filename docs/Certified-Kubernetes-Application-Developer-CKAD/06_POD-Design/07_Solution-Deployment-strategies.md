# Solution Deployment strategies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Solution-Deployment-strategies)

---

## Table of Contents

- Solution Deployment strategies
  - Question 1: Identify the Deployment Strategy
  - Question 2: Identify the Correct Service
  - Question 3: Accessing the Web Application
  - Question 4: Traffic Splitting with a New Deployment
  - Question 5: Redirect All Traffic to the New Version (v2)
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Solution Deployment strategies

In this lesson, we will review the deployment strategies used in our lab exercise. This guide details how to identify the deployment strategy, verify service configurations, and gradually shift traffic between application versions for a safe rollout.

---

## Question 1: Identify the Deployment Strategy

Begin by identifying the deployment strategy used for the deployment in the default namespace.

1.  List all deployments by running:

    ```
    root@controlplane ~ ➜ kubectl get deployments
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    frontend  5/5     5            5           30s
    ```

2.  Next, inspect the details of the "frontend" deployment to check its strategy:

    ```
    root@controlplane ~ ➜ kubectl describe deployment frontend
    Name:                   frontend
    Namespace:              default
    CreationTimestamp:      Thu, 04 Aug 2022 23:30:33 +0000
    Labels:                 app=myapp
                            tier=frontend
    Annotations:            deployment.kubernetes.io/revision: 1
    Selector:               app=frontend
    Replicas:               5 desired | 5 updated | 5 total | 5 available | 0 unavailable
    StrategyType:           RollingUpdate
    MinReadySeconds:        0
    RollingUpdateStrategy:  25% max unavailable, 25% max surge
    Pod Template:
      Labels:        app=frontend
                     version=v1
      Containers:
       webapp-color:
         Image:          kodekloud/webapp-color:v1
         Port:           <none>
         Host Port:      <none>
         Environment:    <none>
         Mounts:         <none>
      Volumes:        <none>
    Conditions:
      Type             Status  Reason
    ```

From the output, notice the deployment strategy is **RollingUpdate**.

---

## Question 2: Identify the Correct Service

The "frontend" deployment is connected to a NodePort service. Follow these steps to verify the service:

1.  List the services:

    ```
    root@controlplane ~ ➜ kubectl get service
    NAME                TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)            AGE
    frontend-service    NodePort       10.97.89.251   <none>        8080:30080/TCP    65s
    kubernetes          ClusterIP      10.96.0.1      <none>        443/TCP           16m
    ```

2.  Describe the service to inspect its configuration:

    ```
    root@controlplane ~ ➜ kubectl describe service frontend-service
    Name:                     frontend-service
    Namespace:                default
    Labels:                   app=myapp
    Annotations:              <none>
    Selector:                 app=frontend
    Type:                     NodePort
    IP Family Policy:         SingleStack
    IP Families:              IPv4
    ```

Since the service selector (`app=frontend`) matches the pod labels in the "frontend" deployment, the correct service is **frontend-service**.

---

## Question 3: Accessing the Web Application

To confirm that the web application is running, click the web app button provided in the interface. This step verifies that the application is accessible and functioning as expected.

> [!important]
> **Testing Tip**
>
> Reload the web application multiple times to observe consistency in responses from the running version.

---

## Question 4: Traffic Splitting with a New Deployment

A new deployment, **frontend-v2**, has been created in the default namespace with an updated image. The goal is to divert less than 20% of traffic to this new version, while keeping the total number of pods unchanged.

1.  Verify both deployments:

    ```
    root@controlplane ~ ➜ kubectl get deployments
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    frontend       5/5     5            5           2m43s
    frontend-v2    2/2     2            2           35s
    ```

    With the same selector (`app=frontend`), traffic is balanced across 7 pods (5 for **frontend** and 2 for **frontend-v2**), meaning **frontend-v2** receives approximately 28% of the traffic.

2.  To reduce the traffic to about 16.7%, scale down **frontend-v2** to 1 replica:

    ```
    root@controlplane ~ ➜ kubectl scale deployment --replicas=1 frontend-v2
    deployment.apps/frontend-v2 scaled
    ```

3.  Confirm the change:

    ```
    root@controlplane ~ ➜ kubectl get deployments
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    frontend       5/5     5            5           4m52s
    frontend-v2    1/1     1            1           2m44s
    ```

With a total of 6 pods now running, **frontend-v2** receives roughly 16.7% of the traffic. Refresh the application in your browser several times to observe any version changes when a request is routed to **frontend-v2**.

---

## Question 5: Redirect All Traffic to the New Version (v2)

Once you have confirmed that the new version functions correctly, safely redirect all traffic to **frontend-v2** by following these steps:

1.  Scale down the original **frontend** deployment:

    ```
    root@controlplane ~ ➜ kubectl scale deployment --replicas=0 frontend
    deployment.apps/frontend scaled
    ```

2.  Scale up the **frontend-v2** deployment to handle all traffic:

    ```
    root@controlplane ~ ➜ kubectl scale deployment --replicas=5 frontend-v2
    deployment.apps/frontend-v2 scaled
    ```

3.  Verify the updates:

    ```
    root@controlplane ~ ➜ kubectl get deployments
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    frontend       0/0     0            0           4m52s
    frontend-v2    5/5     5            5           2m44s
    ```

4.  Finally, remove the old **frontend** deployment entirely:

    ```
    root@controlplane ~ ➜ kubectl delete deployment frontend
    ```

After reloading the application tab, only version 2 of the application should be active.

> [!important]
> **Important**
>
> Ensure that your testing confirms the new deployment is stable before fully decommissioning the original version.

---

![The image shows a green background with text displaying "Hello from frontend-v2-69d77d4d95-xgwj4!" and "Application Version: v2" in white.](https://kodekloud.com/kk-media/image/upload/v1752871260/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Deployment-strategies/frame_340.jpg)

This successful adjustment in the deployment strategy confirms that all user traffic is now routed to version 2 of the web application.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/2c217fe1-d916-42f0-b627-44f8a31028dd)**
>
> Watch video content
