# Deploy Demo Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Deploy-Demo-Application)

---

## Table of Contents

- Deploy Demo Application
  - Node.js Application Setup
  - Containerizing the Application
  - Deploying on Kubernetes
  - Next Steps
  - Watch Video
    - Deployment Configuration
    - Service Configuration
    - Verifying the Deployment

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Deploy Demo Application

In this guide, you will learn how to configure Prometheus—installed via the Prometheus Operator—to monitor a Node.js application running in a Kubernetes cluster. In addition to tracking your Kubernetes infrastructure, Prometheus will also scrape metrics directly from our application by targeting the /swagger-stats/metrics endpoint.

## Node.js Application Setup

Below is a simple Node.js application that uses the Express framework along with the swagger-stats middleware to expose Prometheus metrics. The application listens on port 3000 and defines several endpoints that return dummy data.

```
const express = require("express");
const swStats = require("swagger-stats");
const app = express();


// Set up swagger-stats middleware to expose Prometheus metrics at /swagger-stats/metrics
app.use(swStats.getMiddleware());


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.get("/comments", (req, res) => {
    res.send("Comments");
});


app.get("/threads", (req, res) => {
    res.send("Threads");
});


app.get("/replies", (req, res) => {
    res.send("Replies");
});


app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});
```

Remember to configure your Kubernetes Service to forward traffic to port 3000, which is used by the application.

## Containerizing the Application

To deploy your application in a containerized environment, create a Docker image using the following Dockerfile:

```
FROM node:16


# Create the application directory
WORKDIR /usr/src/app


# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# For production builds, consider using:
# Copy the remaining application code
COPY . .


# Expose the port on which the application listens
EXPOSE 3000


# Start the application
CMD ["node", "index.js"]
```

Build your Docker image with a descriptive tag and your Docker Hub username. For example:

```
docker build -t sanjeevkt720/prometheus-demo .
```

> [!important]
> **Permission Issues**
>
> If you encounter permission issues when building the Docker image, try running the build command using `sudo`:
>
> ```
> sudo docker build -t sanjeevkt720/prometheus-demo .
> ```

Once built, push the image to Docker Hub:

```
sudo docker push sanjeevkt720/prometheus-demo
```

The push output will display progress similar to the following:

```
Using default tag: latest
The push refers to repository [docker.io/sanjeevkt720/prometheus-demo]
91f31d757fd7: Pushing [==================================================>]  92.67kB
be6b84f51e: Preparing
20de42680ea1: Preparing
58959534fd62: Preparing
65570773dc057: Preparing
3639ead5fca4: Waiting
595ddb2d3de6: Waiting
371d43a25876: Waiting
381f4a00ea68: Waiting
155c77c25cb5: Waiting
4d19f3efa378: Waiting
6ddff9eed369: Waiting
```

## Deploying on Kubernetes

The next step is to deploy your containerized application on a Kubernetes cluster. This involves creating Kubernetes manifests for both the Deployment and the Service.

### Deployment Configuration

Create a manifest file (e.g., api-deploy.yaml) to define a Deployment that runs two replicas of your application. The container image is pulled from Docker Hub, and port 3000 is exposed to match the port used by your application.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: sanjeevkt720/prometheus-demo
          ports:
            - containerPort: 3000
```

### Service Configuration

In the same manifest file, define a ClusterIP Service that enables pod-to-pod communication inside your cluster. The Service will use the same label selector as the Deployment and will forward traffic on port 3000.

```
apiVersion: v1
kind: Service
metadata:
  name: api-service
  labels:
    job: node-api
    app: api
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - name: web
      protocol: TCP
      port: 3000
      targetPort: 3000
```

Apply the manifest file to your Kubernetes cluster with:

```
kubectl apply -f api-deploy.yaml
```

You should see output similar to:

```
deployment.apps/api-deployment created
service/api-service created
```

### Verifying the Deployment

After applying your manifests, verify that the Service and Deployment are running correctly.

Check the Service:

```
kubectl get service
```

Expected output:

```
NAME                          TYPE        CLUSTER-IP      EXTERNAL-IP  PORT(S)             AGE
api-service                   ClusterIP   10.100.40.38    <none>       3000/TCP           11s
```

Verify the Deployment status:

```
kubectl get deployment
```

Expected output:

```
NAME             READY   UP-TO-DATE   AVAILABLE   AGE
api-deployment   1/2     2            1           20s
```

After a short period, both replicas should become available, indicating that your application is running successfully on your cluster.

## Next Steps

In the upcoming article, we will explore how to configure Prometheus to scrape metrics from your application by targeting the /swagger-stats/metrics endpoint.

Happy deploying!

For more information on Kubernetes deployments, consider checking the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/1edc5b8a-3b83-46f0-95d4-29351ed9cfe8)**
>
> Watch video content
