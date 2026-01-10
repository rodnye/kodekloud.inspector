# Demo Deploy voting app on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Demo-Deploy-voting-app-on-Kubernetes)

---

## Table of Contents

- Demo Deploy voting app on Kubernetes
  - 1. Overview of Pod Definitions
  - 2. Service Definitions
  - 3. Applying Manifests
  - 4. Accessing the Application
  - 5. Testing the Voting Workflow
  - Watch Video
    - 1.1 voting-app-pod.yaml
    - 1.2 result-app-pod.yaml
    - 1.3 redis-pod.yaml
    - 1.4 postgres-pod.yaml
    - 1.5 worker-app-pod.yaml
    - 2.1 redis-service.yaml
    - 2.2 postgres-service.yaml
    - 2.3 voting-app-service.yaml
    - 2.4 result-app-service.yaml

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Demo Deploy voting app on Kubernetes

In this tutorial, we’ll walk through deploying a multi-tier voting application on a Minikube cluster. You’ll define Pods for each component, expose them via Services, and verify end-to-end functionality.

## 1\. Overview of Pod Definitions

All Pods use the label `app: demo-voting-app` to simplify grouping and service discovery.

| Pod Name       | Image                                  | Port |
| -------------- | -------------------------------------- | ---- |
| voting-app-pod | `kodekloud/examplevotingapp_vote:v1`   | 80   |
| result-app-pod | `kodekloud/examplevotingapp_result:v1` | 80   |
| redis-pod      | `redis:latest`                         | 6379 |
| postgres-pod   | `postgres:latest`                      | 5432 |
| worker-app-pod | `kodekloud/examplevotingapp_worker:v1` | —    |

> [!important]
> **Note**
>
> Ensure you have [Minikube](https://minikube.sigs.k8s.io/docs/) running and `kubectl` configured to use the Minikube context before applying these manifests.

### 1.1 voting-app-pod.yaml

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
      image: kodekloud/examplevotingapp_vote:v1
      ports:
        - containerPort: 80
```

![The image shows a GitHub repository page for "dockersamples/example-voting-app," displaying folders, files, and commit information. The interface includes options for code, issues, pull requests, and more.](https://kodekloud.com/kk-media/image/upload/v1752873980/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deploy-voting-app-on-Kubernetes/github-repo-dockersamples-voting-app.jpg)

- `image`: Hosted on [KodeKloud’s Docker Hub](https://hub.docker.com/u/kodekloud).
- `containerPort`: Listens on port 80.

---

### 1.2 result-app-pod.yaml

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

- Grouped by `app: demo-voting-app`.
- Exposes port 80 for the results UI.

---

### 1.3 redis-pod.yaml

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
      image: redis:latest
      ports:
        - containerPort: 6379
```

- Uses the official Redis image from Docker Hub.
- Default Redis listens on port 6379.

---

### 1.4 postgres-pod.yaml

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
      image: postgres:latest
      ports:
        - containerPort: 5432
      env:
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          value: "postgres"
```

> [!important]
> **Warning**
>
> These credentials are hard-coded for demo purposes only. Do **not** use plaintext passwords in production.

- Exposes port 5432.
- Environment variables set `POSTGRES_USER` and `POSTGRES_PASSWORD`.

---

### 1.5 worker-app-pod.yaml

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

- This background worker polls Redis for new votes and writes results to PostgreSQL.
- No ports exposed.

## 2\. Service Definitions

Define Services to enable intra-cluster communication and external access for frontends.

| Service Name   | Type      | Port | TargetPort | NodePort |
| -------------- | --------- | ---- | ---------- | -------- |
| redis          | ClusterIP | 6379 | 6379       | —        |
| db             | ClusterIP | 5432 | 5432       | —        |
| voting-service | NodePort  | 80   | 80         | 30004    |
| result-service | NodePort  | 80   | 80         | 30005    |

### 2.1 redis-service.yaml

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

- Internal ClusterIP service for Redis.

---

### 2.2 postgres-service.yaml

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

- Named `db` so the worker can connect using `db:5432`.

---

### 2.3 voting-app-service.yaml

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

- Exposes the voting UI externally on port `30004`.

---

### 2.4 result-app-service.yaml

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

- Exposes results UI externally on port `30005`.

## 3\. Applying Manifests

From the project root (e.g., `voting-app/`), create all Pods and Services:

```
kubectl apply -f voting-app-pod.yaml
kubectl apply -f result-app-pod.yaml
kubectl apply -f redis-pod.yaml
kubectl apply -f postgres-pod.yaml
kubectl apply -f worker-app-pod.yaml


kubectl apply -f redis-service.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f voting-app-service.yaml
kubectl apply -f result-app-service.yaml
```

Verify that everything is running:

```
kubectl get pods,svc
```

## 4\. Accessing the Application

Retrieve the external URLs for the frontends:

```
minikube service voting-service --url
minikube service result-service --url
# e.g.: http://192.168.99.101:30005
```

Open the voting UI in your browser to cast votes, then navigate to the results page.

## 5\. Testing the Voting Workflow

After submitting your first vote for “Dogs” you’ll see a 50/50 split:

![The image shows a split screen with a blue section labeled "CATS" and a teal section labeled "DOGS," each with 50.0% in the center.](https://kodekloud.com/kk-media/image/upload/v1752873982/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deploy-voting-app-on-Kubernetes/cats-dogs-split-screen-50percent.jpg)

Viewing results immediately after one vote:

![The image shows a voting result with "CATS" at 0.0% and "DOGS" at 100.0% on a turquoise background.](https://kodekloud.com/kk-media/image/upload/v1752873982/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deploy-voting-app-on-Kubernetes/voting-results-cats-dogs-100.jpg)

Casting another vote for “Cats” updates the results in real time:

![The image shows a voting result with "CATS" at 100.0% and "DOGS" at 0.0% against a blue background.](https://kodekloud.com/kk-media/image/upload/v1752873984/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deploy-voting-app-on-Kubernetes/voting-results-cats-dogs-100-2.jpg)

---

Congratulations! You’ve successfully deployed and tested a complete multi-tier application on Kubernetes. For more details, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/) and [Minikube Guides](https://minikube.sigs.k8s.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/8681edc1-fcb6-475f-b034-087b2f8d8577)**
>
> Watch video content
