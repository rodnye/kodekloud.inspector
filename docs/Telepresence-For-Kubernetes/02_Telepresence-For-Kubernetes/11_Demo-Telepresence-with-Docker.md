# Demo Telepresence with Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Demo-Telepresence-with-Docker)

---

## Table of Contents

- Demo Telepresence with Docker
  - Table of Contents
  - 1. Run Telepresence in Docker
  - 2. Intercepting the Auth Service
  - 3. Intercepting the Products Service
  - 4. Hot-Reload with Bind Mounts
  - 5. Automatic Image Build with --docker-build
  - 6. References
  - Watch Video
    - Verify Telepresence Status
    - Confirm the Daemon Container
    - 2.1 Inspect Cluster Services
    - 2.2 Update Local Auth Service
    - 2.3 Build the Auth Docker Image
    - 2.4 Create the Telepresence Intercept
    - 2.5 Verify the Auth Container
    - 3.1 Modify the Products Endpoint
    - 3.2 Build and Intercept
    - 3.3 Test the Products Intercept
    - 4.1 Dockerfile for Hot-Reload
    - 4.2 Update package.json
    - 4.3 Run with Bind Mount and Nodemon

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Demo Telepresence with Docker

In this guide, you'll learn how to run the Telepresence daemon inside a Docker container. This method avoids modifications to the host’s network configuration and does not require admin privileges.

## Table of Contents

- [1\. Run Telepresence in Docker](#1-run-telepresence-in-docker)
- [2\. Intercepting the Auth Service](#2-intercepting-the-auth-service)
- [3\. Intercepting the Products Service](#3-intercepting-the-products-service)
- [4\. Hot-Reload with Bind Mounts](#4-hot-reload-with-bind-mounts)
- [5\. Automatic Image Build with `--docker-build`](#5-automatic-image-build-with--docker-build)
- [6\. References](#6-references)

---

## 1\. Run Telepresence in Docker

First, ensure any existing Telepresence session is terminated, then start a new session with the daemon running inside a Docker container.

```
telepresence quit
telepresence connect --docker
# Launching Telepresence User Daemon
# Connected to context arn:aws:eks:us-east-1:195725640053:cluster/telepresence, namespace default (...)
```

> [!important]
> **Note**
>
> Make sure your Kubernetes context and namespace are correctly configured before running `telepresence connect --docker`.

### Verify Telepresence Status

```
telepresence status
# OSS Daemon in container arn:aws:eks:us-east-1:195725640053:cluster_telepresence-default-cn: Running
# Version            : 2.20.0
# Status             : Connected
# Kubernetes context : arn:aws:eks:us-east-1:195725640053:cluster/telepresence
# ... (additional info) ...
```

### Confirm the Daemon Container

```
docker ps
# CONTAINER ID   IMAGE                                        COMMAND                  CREATED         STATUS         PORTS
# 469b3f77cdcb   ghcr.io/telepresenceio/telepresence:2.20.0   "telepresence connec…"   18 seconds ago  Up 17 seconds  127.0.0.1:42715->42715/tcp   tp-arn_aws_eks_us-east-1_195725640053_cluster_telepresence-default-cn
```

---

## 2\. Intercepting the Auth Service

### 2.1 Inspect Cluster Services

```
kubectl get svc
# NAME               TYPE           CLUSTER-IP      PORT(S)          AGE
# auth-service       ClusterIP      10.100.10.52    3000/TCP         4h57m
# inventory-service  ClusterIP      10.100.246.69   3000/TCP         5h34m
curl http://auth-service:3000
# {"message":"this is the auth service"}
```

### 2.2 Update Local Auth Service

In your `auth/index.js`:

```
const express = require("express");
const app = express();
const port = 8000;


app.get("/", (req, res) => {
  res.json({ message: "this is the auth service running on my machine" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### 2.3 Build the Auth Docker Image

```
cd auth
docker build -t telepresence-auth:v2 .
# ... build output ...
```

### 2.4 Create the Telepresence Intercept

```
telepresence intercept auth-depl \
  --port 8000 \
  --docker-run telepresence-auth:v2
# Using Deployment auth-depl
# Intercept name: auth-depl
# State: ACTIVE
# Workload kind: Deployment
# Destination: 127.0.0.1:8000
# Service Port Identifier: 3000/TCP
# Intercepting: all TCP connections
# Example app listening on port 8000
```

### 2.5 Verify the Auth Container

```
docker ps
# CONTAINER ID   IMAGE                     NAMES   COMMAND   STATUS
# ...            telepresence-auth:v2      ...     ...       Up ...
```

---

## 3\. Intercepting the Products Service

### 3.1 Modify the Products Endpoint

Edit `products/index.js` to confirm local behavior:

```
app.get("/", async (req, res) => {
  // ... fetch data ...
  res.json({ data: productsWithInventory, message: "running on container on local machine" });
});
```

### 3.2 Build and Intercept

```
cd products
docker build -t my-test-image .
telepresence intercept products-depl \
  --port 8000 \
  --docker-run -- my-test-image
# Using Deployment products-depl
# Intercept name: products-depl
# ...
# Example app listening on port 8000
```

### 3.3 Test the Products Intercept

```
kubectl get svc products-service
curl http://a2517fc7ee41999dd7c47eed9f866-376507947.us-east-1.elb.amazonaws.com:3000/?product_ids=1,2,3
# {"data":[...],"message":"running on container on local machine"}
```

---

## 4\. Hot-Reload with Bind Mounts

Rebuilding images after each change can slow development. Instead, use a bind mount with Nodemon for hot-reload.

### 4.1 Dockerfile for Hot-Reload

```
FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .
```

### 4.2 Update `package.json`

```
{
  "scripts": {
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5"
  }
}
```

### 4.3 Run with Bind Mount and Nodemon

```
telepresence intercept products-depl \
  --port 8000 \
  --docker-run -- \
    -v $(pwd):/usr/src/app my-test-image npm run dev
# [nodemon] 3.1.7
# [nodemon] to restart at any time, enter `rs`
# [nodemon] starting `node index.js`
# Example app listening on port 8000
```

Any change in the `products` directory now triggers an auto-reload inside the container.

---

## 5\. Automatic Image Build with `--docker-build`

Skip manual builds by letting Telepresence build your image during intercept:

```
telepresence intercept products-depl \
  --port 8000 \
  --docker-build products \
  --docker-build-opt tag=my-debug-image \
  -- my-debug-image
# Using Deployment products-depl
# Intercept name: products-depl
# State: ACTIVE
# ...
# Example app listening on port 8000
```

This command:

- Builds the image from the `products/` directory
- Tags it as `my-debug-image`
- Starts the intercept in one step

---

## 6\. References

- [Telepresence CLI Reference](https://www.telepresence.io/docs/latest/reference/cli/)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Docker Engine CLI](https://docs.docker.com/engine/reference/commandline/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/409f313b-7c84-4815-b0ba-6973f5a1975f)**
>
> Watch video content
