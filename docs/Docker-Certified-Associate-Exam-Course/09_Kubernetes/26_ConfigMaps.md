# ConfigMaps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/ConfigMaps)

---

## Table of Contents

- ConfigMaps
  - Why Use ConfigMaps?
  - ConfigMap Lifecycle
  - Comparing Injection Methods
  - Further Reading
  - References
  - Watch Video
    - 1. Creating a ConfigMap
    - 2. Injecting ConfigMaps into Pods
      - Imperative (kubectl) Approach
      - Declarative (YAML) Approach
      - Inspecting ConfigMaps
      - A. Environment Variables
      - B. File-based Injection
        - Bulk Injection with envFrom
        - Single Key Injection

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# ConfigMaps

ConfigMaps let you decouple configuration artifacts from image content, so containerized applications are easily portable. With ConfigMaps you can store configuration data in key–value pairs and inject them into Pods as environment variables or mounted files.

> [!important]
> **Note**
>
> ConfigMaps are not designed for sensitive information. Use [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) for credentials and tokens.

## Why Use ConfigMaps?

Hard-coding environment variables in Pod specs is tedious when you maintain multiple workloads. Consider this example:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
  - name: simple-webapp-color
    image: simple-webapp-color
    ports:
    - containerPort: 80
    env:
      - name: APP_COLOR
        value: blue
      - name: APP_MODE
        value: prod
```

Updating dozens of Pod definitions manually increases the risk of misconfiguration. Instead, extract these values into a single ConfigMap.

## ConfigMap Lifecycle

1.  **Create** a ConfigMap
2.  **Inject** it into your Pod

### 1\. Creating a ConfigMap

Kubernetes supports both imperative and declarative creation methods.

#### Imperative (`kubectl`) Approach

From literal key–value pairs:

```
kubectl create configmap app-config \
  --from-literal=APP_COLOR=blue \
  --from-literal=APP_MODE=prod
```

From a properties file (each file entry becomes a key):

```
kubectl create configmap app-config \
  --from-file=app_config.properties
```

#### Declarative (YAML) Approach

Define `config-map.yaml`:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: blue
  APP_MODE: prod
```

Apply the configuration:

```
kubectl apply -f config-map.yaml
```

> [!important]
> **Best Practice**
>
> Use descriptive names and labels for each ConfigMap (e.g., `app-config`, `mysql-config`, `redis-config`) so you can manage them easily across environments.

#### Inspecting ConfigMaps

List all ConfigMaps:

```
kubectl get configmaps
```

Describe a specific ConfigMap:

```
kubectl describe configmap app-config
```

Sample output:

```
Name:         app-config
Namespace:    default
Data
====
APP_COLOR: blue
APP_MODE:  prod
```

### 2\. Injecting ConfigMaps into Pods

You can consume ConfigMaps in two main ways:

- As environment variables
- As files via a mounted volume

#### A. Environment Variables

##### Bulk Injection with `envFrom`

Inject all keys as environment variables:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
  - name: simple-webapp-color
    image: simple-webapp-color
    ports:
    - containerPort: 80
    envFrom:
    - configMapRef:
        name: app-config
```

##### Single Key Injection

Inject a specific key:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
  - name: simple-webapp-color
    image: simple-webapp-color
    ports:
    - containerPort: 80
    env:
      - name: APP_COLOR
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: APP_COLOR
```

#### B. File-based Injection

Mount ConfigMap entries as files inside the container:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-with-files
spec:
  containers:
  - name: simple-webapp
    image: simple-webapp
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config
```

Each key in `app-config` appears as a separate file in `/etc/config`.

## Comparing Injection Methods

| Injection Type            | Use Case                              | Configuration Option            |
| ------------------------- | ------------------------------------- | ------------------------------- |
| Bulk environment loading  | Simple, all-in-one injection          | `envFrom.configMapRef`          |
| Single variable reference | Granular control per key              | `env.valueFrom.configMapKeyRef` |
| File mounting             | Applications reading configs as files | `volumes.configMap`             |

## Further Reading

- [Kubernetes ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)
- [Managing Resources in Kubernetes](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
- [Kubernetes Secrets vs ConfigMaps](https://kubernetes.io/docs/concepts/configuration/secret/#difference-between-configmap-and-secret)

## References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/cfe1cf8f-5d16-43d1-bbe3-661120b5813e)**
>
> Watch video content
