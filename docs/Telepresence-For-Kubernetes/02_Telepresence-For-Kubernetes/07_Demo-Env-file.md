# Demo Env file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Demo-Env-file)

---

## Table of Contents

- Demo Env file
  - 1. Reproducing the Error
  - 2. Application Code (index.js)
  - 3. Kubernetes Deployment Spec
  - 4. Pulling Environment Variables with Telepresence
  - 5. Loading the .env File in Node.js
  - 6. Testing the Setup
  - Links and References
  - Watch Video

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Demo Env file

In this guide, we’ll walk through intercepting the `products` deployment with Telepresence, exporting its Kubernetes environment variables into a `.env` file, and running the service locally so it can call the `inventory` service exactly as it does inside the cluster.

## 1\. Reproducing the Error

First, start an intercept on the `products` deployment:

```
telepresence intercept products-depl -p 8000
```

When you request multiple products, you’ll see this in your local logs:

```
TypeError: Failed to parse URL from undefined?product_ids=1,2,3
    at new URL (node:internal/url:816:29)
    at new Request (node:internal/deps/undici:9474:25)
    at fetch (node:internal/deps/undici:10203:26)
  code: 'ERR_INVALID_URL',
  input: 'undefined?product_ids=1,2,3'
}
```

This error shows that `API_URL` is undefined in your local environment.

## 2\. Application Code (`index.js`)

The service reads `API_URL` from the environment and queries the inventory service:

```
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 8000;


const apiURL = process.env.API_URL; // undefined when running without .env
console.log("API_URL:", apiURL);


const products = [
  { id: 1, name: "iphone 14", price: 900, category: "electronics", onSale: false },
  { id: 2, name: "Samsung 40in TV", price: 500, category: "electronics", onSale: true },
  { id: 3, name: "Apple MacbookPro", price: 2500, category: "electronics", onSale: false }
];


app.get("/", async (req, res) => {
  try {
    const productIds = req.query.product_ids;
    const idsArray = productIds.split(",").map(id => parseInt(id.trim(), 10));
    const filtered = products.filter(p => idsArray.includes(p.id));


    const response = await fetch(`${apiURL}?product_ids=${idsArray.join(",")}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


    const data = await response.json();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Products service listening on port ${port}`);
});
```

## 3\. Kubernetes Deployment Spec

Normally, the Pod spec injects `API_URL`:

```
spec:
  template:
    spec:
      containers:
        - name: products
          ports:
            - containerPort: 8000
              name: web
          env:
            - name: API_URL
              value: "http://inventory-service:3000/"
---
apiVersion: v1
kind: Service
metadata:
  name: products-service
spec:
  type: LoadBalancer
```

Since Telepresence runs the container locally, those Pod environment variables won’t be available by default.

## 4\. Pulling Environment Variables with Telepresence

1.  **Stop and remove the current intercept**

    ```
    telepresence list
    telepresence leave products-depl
    ```

2.  **Restart with `.env` dump and mount**

    ```
    telepresence intercept products-depl \
      -p 8000 \
      --env-file my-envs.env \
      --mount=true
    ```

    This generates `my-envs.env`:

    ```
    API_URL=http://inventory-service:3000/
    AUTH_SERVICE_PORT=tcp://10.100.10.52:3000
    INVENTORY_SERVICE_PORT_3000_TCP_ADDR=10.100.246.69
    KUBERNETES_PORT_443_TCP_ADDR=10.100.1.1
    ...
    ```

> [!important]
> **Note**
>
> The `--mount=true` flag ensures your local process can read `my-envs.env` as if it were on your filesystem.

## 5\. Loading the `.env` File in Node.js

Install and configure [dotenv](https://www.npmjs.com/package/dotenv):

```
npm install dotenv
```

At the top of `index.js`, override existing env vars:

```
require("dotenv").config({ override: true });
const express = require("express");
const fetch = require("node-fetch");
// ... rest of the code ...
```

Now when you run the intercept, `process.env.API_URL` matches the cluster’s value.

## 6\. Testing the Setup

With the intercept active, send a request through your cluster’s LoadBalancer:

```
curl http://a45190821a848c3d9760c9e3b9-515600148.us-east-1.elb.amazonaws.com:3000/?product_ids=1,2,3
```

You should receive:

```
{
  "data": [
    {
      "id": 1,
      "name": "iphone 14",
      "price": 900,
      "category": "electronics",
      "onSale": false,
      "inventoryCount": 158
    },
    {
      "id": 2,
      "name": "Samsung 40in TV",
      "price": 500,
      "category": "electronics",
      "onSale": true,
      "inventoryCount": 54
    },
    {
      "id": 3,
      "name": "Apple MacbookPro",
      "price": 2500,
      "category": "electronics",
      "onSale": false,
      "inventoryCount": 607
    }
  ]
}
```

This confirms that your local service reads the same environment variables as in Kubernetes and correctly calls the inventory service.

## Links and References

- [Telepresence Documentation](https://www.telepresence.io/reference/)
- [dotenv on npm](https://www.npmjs.com/package/dotenv)
- [node-fetch GitHub](https://github.com/node-fetch/node-fetch)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/2a2316b1-448a-4d03-994b-8d5ce97d3edf)**
>
> Watch video content
