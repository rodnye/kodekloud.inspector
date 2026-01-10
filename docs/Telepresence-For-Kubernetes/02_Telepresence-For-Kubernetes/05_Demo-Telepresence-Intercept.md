# Demo Telepresence Intercept - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Demo-Telepresence-Intercept)

---

## Table of Contents

- Demo Telepresence Intercept
  - Prerequisites
  - 1. List Your Deployments
  - 2. Create an Intercept
  - 3. Run the Service Locally
  - 4. Verify the Intercept
  - 5. Inspect the Pod
  - 6. Remove the Intercept
  - 7. Switch to the Products Service
  - 8. Debugging an Error
  - 9. Import Environment Variables
  - Links and References
  - Watch Video

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Demo Telepresence Intercept

In this lesson, you’ll learn how to use Telepresence to intercept traffic from a Kubernetes service and run the workload locally for fast, iterative debugging.

![The image shows a Visual Studio Code interface with a terminal open, displaying a command prompt connected via SSH. The file explorer on the left lists several project files and directories.](https://kodekloud.com/kk-media/image/upload/v1752884089/notes-assets/images/Telepresence-For-Kubernetes-Demo-Telepresence-Intercept/vscode-terminal-ssh-file-explorer.jpg)

## Prerequisites

- A Kubernetes cluster and `kubectl` configured to the correct context
- Telepresence CLI installed (`brew install telepresence` or see the [official docs](https://www.telepresence.io/docs/))
- Node.js (v14+) and npm

> [!important]
> **Note**
>
> Make sure your Kubernetes context is set to the target namespace, and you have permissions to create interceptions.

## 1\. List Your Deployments

Identify the deployment you want to intercept:

```
kubectl get deployment
# Example output:
# NAME             READY   UP-TO-DATE   AVAILABLE   AGE
# auth-depl        1/1     1            1           4h55m
# inventory-depl   1/1     1            1           5h32m
# products-depl    1/1     1            1           4h47m
```

## 2\. Create an Intercept

First, connect Telepresence to your cluster if you haven’t already:

```
telepresence connect
```

Then run:

```
telepresence intercept auth-depl -p 8000:3000
```

| Local Port | Container Port | Description               |
| ---------- | -------------- | ------------------------- |
| 8000       | 3000           | Auth service HTTP traffic |

Here’s the relevant snippet from the Kubernetes manifest:

```
# Deployment spec excerpt
spec:
  template:
    spec:
      containers:
      - name: auth
        image: sanjeevkt720/telepresence-auth
        ports:
        - containerPort: 3000
          name: web
---
apiVersion: v1
kind: Service
metadata:
  name: auth-service
spec:
  selector:
    app: auth
  ports:
    - port: 3000
      targetPort: 3000
```

You should see output similar to:

```
Using Deployment auth-depl
  Intercept name          : auth-depl
  State                   : ACTIVE
  Workload kind           : Deployment
  Destination             : 127.0.0.1:8000
  Service Port Identifier : 3000/TCP
  Volume Mount Point      : /tmp/telfs-1680244885
  Intercepting            : all TCP connections
```

## 3\. Run the Service Locally

Switch to your local service directory and start the server on port 8000:

```
cd ~/telepresence/auth
npm install
npm run dev
```

Ensure your Express app listens on port 8000:

```
// index.js
const express = require("express");
const app = express();
const port = 8000;


app.get("/", (req, res) => {
  res.json({ message: "auth service running locally via Telepresence" });
});


app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
```

## 4\. Verify the Intercept

Use `curl` to hit the Kubernetes service name. Telepresence will route this to your local process:

```
curl http://auth-service:3000
```

Expected response:

```
{"message":"auth service running locally via Telepresence"}
```

## 5\. Inspect the Pod

Observe both the original container and Telepresence’s traffic agent:

```
POD_NAME=$(kubectl get pod -l app=auth -o jsonpath='{.items[0].metadata.name}')
kubectl describe pod $POD_NAME
```

Look for two containers:

- **auth** (port 3000/TCP)
- **traffic-agent** (port 9900/TCP)

## 6\. Remove the Intercept

When you’re done debugging, clear the intercept:

```
telepresence leave auth-depl
telepresence list
# Should report: No active intercepts
```

## 7\. Switch to the Products Service

1.  Stop your local auth service (`Ctrl+C`)
2.  List deployments again:

    ```
    kubectl get deployment
    ```

3.  Intercept the products deployment:

    ```
    telepresence intercept products-depl -p 8000:3000
    ```

4.  Run the products service locally:

    ```
    cd ~/telepresence/products
    npm install
    npm run dev
    ```

5.  Verify with:

    ```
    curl "http://products-service:3000/?product_ids=1,2,3"
    ```

## 8\. Debugging an Error

If your request hangs and you see:

```
TypeError: Failed to parse URL from undefined?product_ids=1,2,3
```

Inspect your route handler:

```
app.get("/", async (req, res) => {
  try {
    const productIds = req.query.product_ids;
    const idsArray = productIds.split(",").map(id => parseInt(id, 10));
    const response = await fetch(`${apiURL}?product_ids=${idsArray.join(",")}`);
    // ...
  } catch (error) {
    console.error(error);
  }
});
```

> [!important]
> **Warning**
>
> `apiURL` is undefined locally because the environment variable from the Pod isn’t set in your shell.

## 9\. Import Environment Variables

To mirror the Pod’s settings, pull the env vars into your local shell:

```
# Fetch one of the app pods
POD_NAME=$(kubectl get pod -l app=products -o jsonpath='{.items[0].metadata.name}')
# Export all environment variables from the container to your local session
kubectl exec $POD_NAME -- printenv | grep API_URL | sed 's/^/export /' > pod-env.sh
source pod-env.sh
```

Now restart your local service so it picks up `API_URL` and any other Pod-specific variables.

## Links and References

- [Telepresence Documentation](https://www.telepresence.io/docs/)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Express.js Guide](https://expressjs.com/)
- [Docker Hub: sanjeevkt720/telepresence-auth](https://hub.docker.com/r/sanjeevkt720/telepresence-auth)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/93238627-79c8-49f3-b86d-cdff5e1a91b9)**
>
> Watch video content
