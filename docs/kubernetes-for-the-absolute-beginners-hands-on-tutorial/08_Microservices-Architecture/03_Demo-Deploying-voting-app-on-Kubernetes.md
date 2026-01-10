# Demo Deploying voting app on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Microservices-Architecture/Demo-Deploying-voting-app-on-Kubernetes)

---

## Table of Contents

- Demo Deploying voting app on Kubernetes
  - Pod Definitions
  - Service Definitions
  - Deploying the Application
  - Conclusion
  - Watch Video
    - 1. Voting App Pod
    - 2. Result App Pod
    - 3. Redis Pod
    - 4. PostgreSQL (DB) Pod
    - 5. Worker Pod
    - 1. Redis Service (Internal)
    - 2. PostgreSQL (DB) Service (Internal)
    - 3. Voting App Service (External)
    - 4. Result App Service (External)

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Microservices Architecture

# Demo Deploying voting app on Kubernetes

In this tutorial, you will deploy a multi-tier voting application on a Minikube cluster. This guide explains step-by-step how to create the pod definition files for each application component and then expose them using Kubernetes services.

---

## Pod Definitions

Start by creating a new project folder (e.g., "voting-app") and defining the pods for each component in separate YAML files.

### 1\. Voting App Pod

Create a file named `voting-app-pod.yaml`. This file specifies the API version, kind, metadata (including name and labels), and the container details. The labels group all the components as part of the same application while differentiating each component.

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
      image: kodekloud/example-voting-app:_vote-v1
      ports:
        - containerPort: 80
```

### 2\. Result App Pod

Copy the voting app pod template to create the result app pod. Save it as `result-app-pod.yaml` and update the metadata (name, labels) and container details accordingly.

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
    - name: result-app
      image: kodekloud/examplevotingapp_result:v1
      ports:
        - containerPort: 80
```

### 3\. Redis Pod

For the Redis pod, create a file named `redis-pod.yaml`. Use the previous template and update the names accordingly. Note that the container port has been changed from 80 to 6379 (the default Redis port).

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

### 4\. PostgreSQL (DB) Pod

Using the Redis pod template, create the PostgreSQL pod definition file named `postgres-pod.yaml`. Update the pod and container names, use the official `postgres` image, and change the container port to 5432. Additionally, include environment variables for the initial username and password required by the worker and result pods.

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
      image: postgres
      ports:
        - containerPort: 5432
      env:
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          value: "postgres"
```

### 5\. Worker Pod

Finally, create the worker pod in a file named `worker-app-pod.yaml`. Use the voting app pod template as a base but update the name and container properties to indicate background processing. Since the worker does not run any service or listen on ports, remove the container port definition.

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
      image: kodekloud/examplevotingapp_worker:v1
```

---

## Service Definitions

After defining the pods, create the corresponding services to expose them. All components except the worker require external or internal services.

### 1\. Redis Service (Internal)

Create a file named `redis-service.yaml`. This service exposes the Redis pod on port 6379 internally, ensuring the selector matches the labels defined in the Redis pod.

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

### 2\. PostgreSQL (DB) Service (Internal)

Since the worker expects the Postgres service name to be "DB", create a file named `postgres-service.yaml`. This service exposes PostgreSQL on port 5432 and selects the appropriate pod.

```
apiVersion: v1
kind: Service
metadata:
  name: db
  labels:
    name: postgres-service
    app: demo-voting-app
spec:
  ports:
    - port: 5432
      targetPort: 5432
  selector:
    name: postgres-pod
    app: demo-voting-app
```

### 3\. Voting App Service (External)

To make the front-end voting app accessible externally, create a service named `voting-app-service.yaml`. Set the service type to `NodePort`, expose port 80, and assign a node port, such as 30004. Ensure that the selector matches the labels defined in the voting app pod.

```
apiVersion: v1
kind: Service
metadata:
  name: voting-service
  labels:
    name: voting-service
    app: demo-voting-app
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30004
  selector:
    name: voting-app-pod
    app: demo-voting-app
```

### 4\. Result App Service (External)

Similarly, create an external service for the result app. Save this file as `result-app-service.yaml`. This service is also set to type `NodePort`, exposing port 80 with a node port (e.g., 30005). Update the selector to match the result app pod.

```
apiVersion: v1
kind: Service
metadata:
  name: result-service
  labels:
    name: result-service
    app: demo-voting-app
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30005
  selector:
    name: result-app-pod
    app: demo-voting-app
```

---

## Deploying the Application

With all five pod and service definition files created, navigate to your project directory (e.g., `voting-app`) and deploy each object using the `kubectl create -f` command.

```
# Create Pods
kubectl create -f voting-app-pod.yaml
kubectl create -f result-app-pod.yaml
kubectl create -f redis-pod.yaml
kubectl create -f postgres-pod.yaml
kubectl create -f worker-app-pod.yaml


# Create Services
kubectl create -f redis-service.yaml
kubectl create -f postgres-service.yaml
kubectl create -f voting-app-service.yaml
kubectl create -f result-app-service.yaml
```

Verify that all pods and services are active using:

```
kubectl get pods,svc
```

You should see all five pods running, with the voting and result services listed as NodePort services and the Redis and PostgreSQL (DB) services exposed as ClusterIP.

> [!important]
> **Accessing the Application**
>
> To access the voting application, run:
>
> minikube service voting-service --url
>
> This opens the front-end interface where you can cast your vote.

Once you cast a vote, check the results by accessing the result service:

```
minikube service result-service --url
```

This will display the updated voting results.

> [!important]
> **Result Page Details**
>
> The results page visually represents vote totals along with percentage breakdowns, enhancing the overall user experience.

![The image shows a split screen with equal blue and teal sections, displaying a 50% vote for both "CATS" and "DOGS."](https://kodekloud.com/kk-media/image/upload/v1752884953/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Deploying-voting-app-on-Kubernetes/frame_1170.jpg)

![The image shows a voting result with "Cats" at 0% and "Dogs" at 100% on a turquoise background.](https://kodekloud.com/kk-media/image/upload/v1752884955/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Deploying-voting-app-on-Kubernetes/frame_1210.jpg)

---

## Conclusion

In this lesson, you successfully deployed a multi-tier voting application on a Kubernetes cluster. The architecture demonstrates the flow from the voting app pod to Redis, then through the worker pod to the PostgreSQL database, and finally to the result pod for display. This workflow highlights how to set up interconnected microservices using pods and services in Kubernetes.

Happy deploying, and see you in the next tutorial!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/a603e70d-8473-4de4-aec9-7cc76c396ad3/lesson/9901796e-7f0f-4d06-8e41-7b7f7a44bb0a)**
>
> Watch video content
