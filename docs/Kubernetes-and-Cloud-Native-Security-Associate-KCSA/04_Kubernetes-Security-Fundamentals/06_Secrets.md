# Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Secrets)

---

## Table of Contents

- Secrets
  - 1. Creating Secrets
  - 2. Viewing Secrets
  - 3. Injecting Secrets into Pods
  - Watch Video
  - Practice Lab
    - 1.1 Imperative Creation
    - 1.2 Declarative Creation
    - 3.1 All Keys as Environment Variables
    - 3.2 Single Key as an Environment Variable
    - 3.3 Mounting Secrets as Files

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Secrets

In this lesson, we’ll refactor a simple Python web application that connects to a MySQL database. Currently, the database hostname, username, and password are hardcoded in the source—an insecure practice. We'll move sensitive values into Kubernetes **Secrets** to keep credentials safe.

```
import os
from flask import Flask, render_template
import mysql.connector


app = Flask(__name__)


@app.route("/")
def main():
    conn = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        database="mysql",
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"]
    )
    return render_template("hello.html", color=fetchcolor())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

> [!important]
> **Warning**
>
> Never store plaintext passwords in your code or in a `ConfigMap`. Use [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) for all sensitive data.

| Resource  | Purpose                          | Example                                     |
| --------- | -------------------------------- | ------------------------------------------- |
| ConfigMap | Non-sensitive configuration data | `DB_HOST`, `DB_USER`                        |
| Secret    | Sensitive data (passwords, keys) | `DB_PASSWORD`, API tokens, TLS certificates |

---

## 1\. Creating Secrets

Secrets can be created imperatively with `kubectl` or declaratively with a YAML manifest.

### 1.1 Imperative Creation

Specify key-value pairs on the command line:

```
kubectl create secret generic app-secret \
  --from-literal=DB_HOST=mysql \
  --from-literal=DB_USER=root \
  --from-literal=DB_PASSWORD=paswrd
```

Or load from a file (`key=value` per line):

```
# app_secret.properties
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=paswrd


kubectl create secret generic app-secret --from-env-file=app_secret.properties
```

### 1.2 Declarative Creation

Define a `Secret` manifest in `secret-data.yaml`:

```
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_HOST: bXlzcWw=      # echo -n 'mysql' | base64
  DB_USER: cm9vdA==      # echo -n 'root'  | base64
  DB_PASSWORD: cGFzd3Jk  # echo -n 'paswrd'| base64
```

Apply the manifest:

```
kubectl apply -f secret-data.yaml
```

Generate base64-encoded values:

```
echo -n 'mysql'  | base64  # bXlzcWw=
echo -n 'root'   | base64  # cm9vdA==
echo -n 'paswrd' | base64  # cGFzd3Jk
```

> [!important]
> **Note**
>
> You can decode any value with `echo '<base64>' | base64 --decode`. Keep your raw files out of version control.

---

## 2\. Viewing Secrets

List all existing secrets:

```
kubectl get secrets
```

Inspect a specific secret:

```
kubectl describe secret app-secret
```

Output the raw YAML (with encoded data):

```
kubectl get secret app-secret -o yaml
```

Decode an encoded secret value:

```
echo 'cGFzd3Jk' | base64 --decode  # outputs: paswrd
```

---

## 3\. Injecting Secrets into Pods

You can consume Secrets as environment variables or as mounted volumes.

### 3.1 All Keys as Environment Variables

Add an `envFrom` directive to your Pod spec:

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

Apply the Pod definition:

```
kubectl apply -f pod-definition.yaml
```

### 3.2 Single Key as an Environment Variable

Use `valueFrom.secretKeyRef` for a specific key:

```
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: app-secret
        key: DB_PASSWORD
```

### 3.3 Mounting Secrets as Files

Mount the secret into a volume:

```
volumes:
  - name: app-secret-volume
    secret:
      secretName: app-secret


containers:
  - name: simple-webapp
    image: simple-webapp:latest
    volumeMounts:
      - name: app-secret-volume
        mountPath: /opt/secrets
```

Inside the running Pod:

```
ls /opt/secrets
cat /opt/secrets/DB_PASSWORD
# paswrd
```

---

Try the exercises to practice creating, viewing, and injecting Secrets in your Kubernetes clusters!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/4dca62df-d690-4360-99f0-10f24974f41f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/0f29d43a-a993-41fb-b58d-5c99f56c356a)**
>
> Practice lab
