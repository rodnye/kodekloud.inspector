# Env file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Env-file)

---

## Table of Contents

- Env file
  - 1. Intercept the Remote Service
  - 2. Inspect the Deployment’s Environment Variables
  - 3. Generate a Local .env File
  - 4. Load the .env File in Your Local Process
  - 5. Summary of Key Flags
  - Links and References
  - Watch Video

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Env file

In this guide, we’ll show you how to capture and reuse environment variables from a remote Kubernetes container when intercepting a service with Telepresence. By exporting these variables into a local `.env` file, you ensure your local process runs with the exact same configuration as in the cluster.

## 1\. Intercept the Remote Service

Suppose you have a `products` service deployed in your Kubernetes cluster. To forward traffic from that service to your local machine, run:

```
telepresence intercept products-depl --port 8000:3000
```

This command maps remote port `3000` to your local port `8000`, but it doesn’t pull in any environment variables by default.

## 2\. Inspect the Deployment’s Environment Variables

Your Kubernetes deployment might define variables like this:

```
spec:
  containers:
    - name: products
      image: sanjeevkt720/telepresence-products
      ports:
        - containerPort: 3000
          name: web
      env:
        - name: API_URL
          value: http://inventory-service:3000/
        - name: LOG_LEVEL
          value: debug
```

When you run your service locally, it needs access to `API_URL`, `LOG_LEVEL`, and any other container-specific settings.

## 3\. Generate a Local `.env` File

Telepresence can automatically dump all container environment variables into a file. Simply add the `--env-file` flag to your intercept command:

```
telepresence intercept products-depl \
  --port 8000:3000 \
  --env-file .env
```

After the command runs, you’ll find a `.env` file in your current directory containing:

```
API_URL=http://inventory-service:3000/
LOG_LEVEL=debug
# ...other variables
```

> [!important]
> **Note**
>
> You can choose any filename for the environment file (e.g., `dev.env` or `products.env`). Just update your intercept command accordingly.

## 4\. Load the `.env` File in Your Local Process

Most development tools support dotenv files out of the box. For example, with a Node.js application you can:

```
npm install dotenv
```

```
// index.js
require('dotenv').config();
console.log('API URL:', process.env.API_URL);
```

Or, if you prefer a one-liner in Bash:

```
export $(grep -v '^#' .env | xargs) && npm start
```

> [!important]
> **Warning**
>
> Avoid committing your `.env` file to version control if it contains sensitive data. Add it to your `.gitignore` instead.

## 5\. Summary of Key Flags

| Flag         | Description                                  | Example            |
| ------------ | -------------------------------------------- | ------------------ |
| `--port`     | Forward remote port to local                 | `--port 8000:3000` |
| `--env-file` | Dump container environment variables to file | `--env-file .env`  |

## Links and References

- [Telepresence Documentation](https://www.telepresence.io/docs/)
- [GitHub: telepresence-command-reference](https://github.com/telepresenceio/telepresence)
- [dotenv npm package](https://www.npmjs.com/package/dotenv)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/d6bda8d0-e3f3-4f40-a5ad-3d63a3fe86b2)**
>
> Watch video content
