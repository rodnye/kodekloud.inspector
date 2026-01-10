# Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Secrets)

---

## Table of Contents

- Secrets
  - 1. Application Overview
  - 2. Storing Non-sensitive Configuration
  - 3. Creating Kubernetes Secrets
  - 4. Viewing Secrets
  - 5. Injecting Secrets into Pods
  - Links and References
  - Watch Video
    - 3.1 Imperative Method
    - 3.2 Declarative Method
    - 5.1 As Environment Variables
    - 5.2 As Files in a Volume

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Secrets

Welcome to this lesson on Kubernetes Secrets. In this guide, we’ll refactor a simple Python web app that connects to MySQL and demonstrate how to replace hardcoded credentials with Kubernetes Secrets.

> [!important]
> **Warning**
>
> Hardcoding sensitive data like database passwords in your application is insecure. Always store secrets in a dedicated secret store rather than plain text files or code.

## 1\. Application Overview

Here’s the original Flask application with hardcoded credentials:

```
import mysql.connector
from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def main():
    mysql.connector.connect(
        host="mysql",
        database="mysql",
        user="root",
        password="paswrd"
    )
    return render_template("hello.html", color=fetchcolor())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080")
```

By externalizing configuration into ConfigMaps and Secrets, we improve security and flexibility.

## 2\. Storing Non-sensitive Configuration

Use a ConfigMap for non-sensitive data such as hostnames and users:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_Host: mysql
  DB_User: root
```

Avoid placing `DB_Password` here—this belongs in a Secret.

## 3\. Creating Kubernetes Secrets

There are two ways to create Secrets in Kubernetes:

| Method      | Command Pattern                                                                                    | Description                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Imperative  | `kubectl create secret generic <name> --from-literal=<key>=<value>`                                | Quick, ad-hoc creation from the CLI                 |
| Declarative | Create a YAML manifest with base64-encoded values and apply via `kubectl apply -f <manifest>.yaml` | Version-controlled, repeatable deployment manifests |

### 3.1 Imperative Method

Generate a generic Secret directly:

```
kubectl create secret generic app-secret \
  --from-literal=DB_Host=mysql \
  --from-literal=DB_User=root \
  --from-literal=DB_Password=paswrd
```

Or load from files:

```
kubectl create secret generic app-secret \
  --from-file=DB_Host=./db_host.txt \
  --from-file=DB_User=./db_user.txt \
  --from-file=DB_Password=./db_password.txt
```

### 3.2 Declarative Method

1.  Base64-encode each value:

    ```
    echo -n 'mysql'    | base64  # bXlzcWw=
    echo -n 'root'     | base64  # cm9vdA==
    echo -n 'paswrd'   | base64  # cGFzd3Jk
    ```

2.  Create `app-secret.yaml`:

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: app-secret
    type: Opaque
    data:
      DB_Host: bXlzcWw=
      DB_User: cm9vdA==
      DB_Password: cGFzd3Jk
    ```

3.  Apply the manifest:

    ```
    kubectl apply -f app-secret.yaml
    ```

> [!important]
> **Note**
>
> The `type: Opaque` is the default Secret type for arbitrary user-defined data.
> Learn more in the [Kubernetes Secrets documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

## 4\. Viewing Secrets

- List all Secrets:

  ```
  kubectl get secrets
  ```

- Describe a Secret (values are masked):

  ```
  kubectl describe secret app-secret
  ```

- View encoded data in YAML:

  ```
  kubectl get secret app-secret -o yaml
  ```

- Decode a specific value:

  ```
  echo -n 'bXlzcWw=' | base64 --decode
  # mysql
  ```

## 5\. Injecting Secrets into Pods

### 5.1 As Environment Variables

Inject all keys at once:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp:latest
      ports:
        - containerPort: 8080
      envFrom:
        - secretRef:
            name: app-secret
```

Or inject specific keys:

```
      env:
        - name: DB_Password
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_Password
```

### 5.2 As Files in a Volume

Mount the Secret as a read-only volume; each key becomes a file:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp:latest
      volumeMounts:
        - name: app-secret-volume
          mountPath: /etc/secrets
          readOnly: true
  volumes:
    - name: app-secret-volume
      secret:
        secretName: app-secret
```

Inside the container:

```
ls /etc/secrets
cat /etc/secrets/DB_Password
# paswrd
```

---

## Links and References

- [Kubernetes Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [ConfigMaps Overview](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Flask Documentation](https://flask.palletsprojects.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/b1b5028f-3e44-4867-93a8-621308da3b56)**
>
> Watch video content
