# Mock Exam 1 Solution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Mock-Exams/Mock-Exam-1-Solution)

---

## Table of Contents

- Mock Exam 1 Solution
  - Question 1: Deploy a Pod using the Nginx Alpine Image
  - Question 2: Create a Namespace
  - Question 3: Create a Deployment with Replicas
  - Question 4: Deploy a Messaging Pod with a Label
  - Question 5: Fix the ReplicaSet with Invalid Image Name
  - Question 6: Expose the Redis Deployment via a Service
  - Question 7: Update the Environment Variable on a Pod
  - Question 8: Create a ConfigMap with Key-Value Pairs
  - Question 9: Create a Secret with Given Data
  - Question 10: Update a Pod to Run as Root with SYS_TIME Capability
  - Question 11: Export Pod Logs to a File
  - Question 12: Create a Persistent Volume
  - Question 13: Create a Redis Deployment and Expose It
  - Question 14: Create a Network Policy for Redis Access
  - Question 15: Create a Pod with Two Containers
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Mock Exams

# Mock Exam 1 Solution

This guide provides comprehensive solutions for Mock Exam 1. Each section explains the commands and configurations for various Kubernetes tasks. All commands assume you are operating on a Kubernetes control plane. Follow the sections below for detailed instructions.

---

## Question 1: Deploy a Pod using the Nginx Alpine Image

Deploy a pod named "nginx-448839" using the Nginx Alpine image:

```
kubectl run nginx-448839 --image=nginx:alpine
```

You should see output similar to:

```
pod/nginx-448839 created
```

---

## Question 2: Create a Namespace

Create a namespace "apx-Z993845" by running:

```
kubectl create ns apx-Z993845
```

Expected output:

```
namespace/apx-Z993845 created
```

---

## Question 3: Create a Deployment with Replicas

Create a deployment named "httpd-frontend" using the `httpd:2.4-alpine` image and scale it to three replicas:

```
kubectl create deployment httpd-frontend --image=httpd:2.4-alpine --replicas=3
```

This command sets up the deployment as specified.

---

## Question 4: Deploy a Messaging Pod with a Label

Deploy a messaging pod using the Redis Alpine image and assign the label `tier=MSG`:

```
kubectl run messaging --image=redis:alpine -l tier=MSG
```

This command creates the pod with the appropriate image and label.

---

## Question 5: Fix the ReplicaSet with Invalid Image Name

A ReplicaSet named `rs-d33393` is not launching pods due to a typo in the image name. Follow these steps to fix the issue:

1.  Check the ReplicaSet status:

    ```
    kubectl get rs
    ```

2.  Describe the ReplicaSet to diagnose the problem:

    ```
    kubectl describe rs rs-d33393
    ```

    > [!important]
    > **Tip**
    >
    > Look for the container image field to identify the typo (`busyboxXXXXXXXX` instead of `busybox`).

3.  Edit the ReplicaSet to correct the image name:

    ```
    kubectl edit rs rs-d33393
    ```

    In the YAML, change:

    ```
    image: busyboxXXXXXXXX
    ```

    to

    ```
    image: busybox
    ```

    Also, update the number of replicas to 4 by ensuring:

    ```
    spec:
      replicas: 4
    ```

4.  Delete the misconfigured pods to allow the ReplicaSet to recreate them. First, list all pods:

    ```
    kubectl get pod
    ```

    Then, delete pods with the label `name=busybox-pod`:

    ```
    kubectl delete pod -l name=busybox-pod
    ```

5.  Verify that the ReplicaSet now has 4 ready pods:

    ```
    kubectl get rs
    ```

    Expected output:

    ```
    NAME          DESIRED   CURRENT   READY   AGE
    rs-d33393     4         4         4       <age>
    ```

---

## Question 6: Expose the Redis Deployment via a Service

Expose the Redis deployment in the `marketing` namespace by creating a service called "messaging-service" on port 6379:

```
kubectl expose deployment redis --port=6379 --name=messaging-service --namespace=marketing
```

This command sets up a ClusterIP service for the deployment.

---

## Question 7: Update the Environment Variable on a Pod

The pod `webapp-color` has an environment variable `APP_COLOR` set to `pink`. Update it to `green` by following these steps:

1.  Export the pod configuration to a YAML file:

    ```
    kubectl get pod webapp-color -o yaml > webapp-color.yaml
    ```

2.  Open `webapp-color.yaml` in your preferred editor and locate the environment variable section. Replace:

    ```
    - name: APP_COLOR
      value: pink
    ```

    with

    ```
    - name: APP_COLOR
      value: green
    ```

3.  Apply the updated configuration by replacing the pod:

    ```
    kubectl replace -f webapp-color.yaml --force
    ```

The pod will be re-created with the updated environment variable.

---

## Question 8: Create a ConfigMap with Key-Value Pairs

Create a ConfigMap named "cm-3392845" with the following key-value pairs:

- DB_NAME: SQL3322
- DB_HOST: sql322.mycompany.com
- DB_PORT: 3306

Execute the command:

```
kubectl create configmap cm-3392845 --from-literal=DB_NAME=SQL3322 --from-literal=DB_HOST=sql322.mycompany.com --from-literal=DB_PORT=3306
```

Verify the ConfigMap contents:

```
kubectl describe cm cm-3392845
```

---

## Question 9: Create a Secret with Given Data

Create a secret named "db-secret" with the specified key-value pairs:

```
kubectl create secret generic db-secret --from-literal=DB_Host=sql01 --from-literal=DB_User=root --from-literal=DB_Password=password123
```

This command creates the secret with the provided configurations.

---

## Question 10: Update a Pod to Run as Root with SYS_TIME Capability

For the pod `app-sec-kff3345`, update the security context to run as root and enable the `SYS_TIME` capability:

1.  Export the pod configuration to a YAML file:

    ```
    kubectl get pod app-sec-kff3345 -o yaml > app-sec.yaml
    ```

2.  Edit `app-sec.yaml` with the following modifications:
    - Under `spec.securityContext`, set `runAsUser: 0`:

      ```
      securityContext:
        runAsUser: 0
      ```

    - Under the container section (e.g., container "ubuntu"), add a security context to include the `SYS_TIME` capability:

      ```
      securityContext:
        capabilities:
          add:
            - SYS_TIME
      ```

    A sample modified section appears as:

    ```
    spec:
      containers:
        - name: ubuntu
          image: ubuntu
          command:
            - sleep
            - "4800"
          securityContext:
            capabilities:
              add:
                - SYS_TIME
      securityContext:
        runAsUser: 0
    ```

3.  Apply the updated configuration by replacing the pod:

    ```
    kubectl replace -f app-sec.yaml --force
    ```

---

## Question 11: Export Pod Logs to a File

Export the logs of pod `e-com-1123` in the `e-commerce` namespace to a file:

```
kubectl logs e-com-1123 -n e-commerce > /path/to/your/logfile.txt
```

This command redirects the pod logs to your specified destination.

---

## Question 12: Create a Persistent Volume

Create a Persistent Volume named "pv-analytics" with the specified details:

- Capacity: 100Mi
- Access mode: ReadWriteMany
- Host path: /PV/data-analytics

Create a file called `pv.yaml` with the following content:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-analytics
spec:
  capacity:
    storage: 100Mi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: Slow
  hostPath:
    path: /PV/data-analytics
```

Apply the configuration:

```
kubectl apply -f pv.yaml
```

---

## Question 13: Create a Redis Deployment and Expose It

1.  Create a deployment named "redis" using the `redis:alpine` image with one replica:

    ```
    kubectl create deployment redis --image=redis:alpine --replicas=1
    ```

2.  Expose the deployment with a ClusterIP service on port 6379:

    ```
    kubectl expose deployment redis --name=redis --port=6379 --target-port=6379
    ```

---

## Question 14: Create a Network Policy for Redis Access

Allow traffic to Redis only from pods with the label `access=redis` by creating a network policy. Create a file named `networkpolicy.yaml` with the following content:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: redis-access
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: redis
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          access: redis
    ports:
    - protocol: TCP
      port: 6379
```

Apply the network policy:

```
kubectl apply -f networkpolicy.yaml
```

---

## Question 15: Create a Pod with Two Containers

Create a pod named "sega" that includes two containers:

- Container "tails": uses the `busybox` image and runs a sleep command for 3600 seconds.
- Container "sonic": uses the `nginx` image and sets the environment variable `NGINX_PORT` to "8080".

Create a file called `sega.yaml` with the following content:

```
apiVersion: v1
kind: Pod
metadata:
  name: sega
spec:
  containers:
    - name: tails
      image: busybox
      command:
        - sleep
        - "3600"
    - name: sonic
      image: nginx
      env:
        - name: NGINX_PORT
          value: "8080"
```

Apply the pod configuration:

```
kubectl apply -f sega.yaml
```

If an update is required later, replace the pod with:

```
kubectl replace -f sega.yaml --force
```

---

That concludes the steps for Mock Exam 1. Each section documents the command or configuration change required. Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/36d5003c-cbf5-4311-9e52-78a17776f919/lesson/2d24748c-3f4c-4ecc-b9fa-a1ef91b240d5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/36d5003c-cbf5-4311-9e52-78a17776f919/lesson/3253aaee-d6ce-4d4c-aadf-b855ebebcc70)**
>
> Practice lab
