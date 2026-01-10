# Demo Volumes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Demo-Volumes)

---

## Table of Contents

- Demo Volumes
  - Table of Contents
  - Prerequisites
  - Node.js Service Example
  - Kubernetes Deployment with ConfigMap Volume
  - ConfigMap Definition
  - Intercepting with Telepresence and Mounting Volumes
  - Exploring the Mounted Volume
  - Customizing the Local Mount Path
  - References
  - Watch Video

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Demo Volumes

Intercept a Kubernetes pod using Telepresence, mount its ConfigMap volume on your local machine, and access configuration data as if the service were running in-cluster.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Node.js Service Example](#nodejs-service-example)
- [Kubernetes Deployment with ConfigMap Volume](#kubernetes-deployment-with-configmap-volume)
- [ConfigMap Definition](#configmap-definition)
- [Intercepting with Telepresence and Mounting Volumes](#intercepting-with-telepresence-and-mounting-volumes)
- [Exploring the Mounted Volume](#exploring-the-mounted-volume)
- [Customizing the Local Mount Path](#customizing-the-local-mount-path)
- [References](#references)

## Prerequisites

- Kubernetes cluster access with `kubectl` configured
- Telepresence installed
- A local `.env` file for environment variables

> [!important]
> **Note**
>
> Ensure your `kubectl` context is pointing to the intended cluster before starting the intercept.

## Node.js Service Example

The **products** service is an Express.js app that reads `API_URL` from environment variables:

```
require('dotenv').config({ override: true });
const express = require("express");
const app = express();
const port = 8000;


const apiURL = process.env.API_URL;
console.log("API_URL:", apiURL);


const products = [
  {
    id: 1,
    name: "iPhone 14",
    price: 900,
    category: "electronics",
    onSale: false,
  },
];


app.get("/products", (req, res) => {
  res.json(products);
});


app.listen(port, () => {
  console.log(`Products service listening on port ${port}`);
});
```

## Kubernetes Deployment with ConfigMap Volume

Deploy the `products-depl` Deployment and mount a ConfigMap called `db-info` at `/tmp`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: products-depl
spec:
  selector:
    matchLabels:
      app: products
  template:
    metadata:
      labels:
        app: products
    spec:
      volumes:
        - name: db-config
          configMap:
            name: db-info
      containers:
        - name: products
          image: sanjeevkt720/telepresence-products
          imagePullPolicy: Always
          ports:
            - containerPort: 8000
              name: web
          volumeMounts:
            - name: db-config
              mountPath: /tmp
          env:
            - name: API_URL
              value: "http://api.example.com"
```

## ConfigMap Definition

Define your database connection details in a ConfigMap:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-info
data:
  DB_HOST: "prod.db"
  DB_USERNAME: "myusername123"
  DB_PASSWORD: "mypassword123"
```

| Key            | Value         |
| -------------- | ------------- |
| DB\\\_HOST     | prod.db       |
| DB\\\_USERNAME | myusername123 |
| DB\\\_PASSWORD | mypassword123 |

## Intercepting with Telepresence and Mounting Volumes

1.  Check for existing intercepts:

    ```
    telepresence list
    ```

2.  Create an intercept on port 8000, inject your `.env`, and mount the pod’s volumes:

    ```
    telepresence intercept products-depl \
      --port 8000 \
      --env-file .env \
      --mount
    ```

> [!important]
> **Warning**
>
> Redirecting service traffic through your local machine may impact production workloads. Proceed with caution.

Example output (identifiers will vary):

```
Using Deployment products-depl
  Intercept name          : products-depl
  State                   : ACTIVE
  Workload kind           : Deployment
  Destination             : 127.0.0.1:8000
  Service Port Identifier : 8000/TCP
  Volume Mount Point      : /tmp/telfs-2391723209
  Intercepting            : all TCP connections
```

## Exploring the Mounted Volume

In a new terminal:

```
cd /tmp/telfs-2391723209/tmp
ls
cat DB_HOST
# prod.db
```

You now have file-based access to the ConfigMap data.

## Customizing the Local Mount Path

1.  End the current intercept:

    ```
    telepresence leave products-depl
    ```

2.  Start a new intercept with a custom mount location:

    ```
    telepresence intercept products-depl \
      --port 8000 \
      --env-file .env \
      --mount=/tmp/example123
    ```

Files now appear under `/tmp/example123/tmp`:

```
cd /tmp/example123/tmp
ls
# DB_HOST  DB_PASSWORD  DB_USERNAME
```

Adjust your application or use symbolic links to consume these local files seamlessly.

## References

- [Telepresence Documentation](https://www.telepresence.io/docs/)
- [Kubernetes ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/c92e854c-3059-4a2d-9082-e9c021269560)**
>
> Watch video content
