# Configure ConfigMaps in Applications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Configure-ConfigMaps-in-Applications)

---

## Table of Contents

- Configure ConfigMaps in Applications
  - Using Environment Variables in a Pod
  - Centralizing Configuration with ConfigMaps
  - Creating ConfigMaps
  - Viewing ConfigMaps
  - Injecting a ConfigMap into a Pod
  - Alternative Injection Methods
  - Watch Video
  - Practice Lab
    - Imperative Approach
    - Declarative Approach

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Configure ConfigMaps in Applications

In this article, we'll explore how to externalize and manage configuration data in Kubernetes using ConfigMaps. Instead of hard-coding environment variables in each pod definition, ConfigMaps allow you to centrally manage key–value pairs, making your Kubernetes configurations easier to maintain and scale.

> [!important]
> **Overview**
>
> By leveraging ConfigMaps, you can separate configuration details from container images, reducing duplication and simplifying updates across multiple pods.

## Using Environment Variables in a Pod

Traditionally, environment variables are set directly within the pod specification. For example:

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

In this configuration, the environment variables are hard-coded into the pod definition, which can become cumbersome when managing multiple pods.

## Centralizing Configuration with ConfigMaps

To simplify the management of environment configurations, you can externalize the data using a ConfigMap. With this approach, Kubernetes injects centrally stored key–value pairs into your pods during creation.

For instance, modify the pod definition to use the `envFrom` property:

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
        name: app-color
```

Assume that the ConfigMap (named `app-color`) holds the following key–value pairs:

```
APP_COLOR: blue
APP_MODE: prod
```

## Creating ConfigMaps

There are two main approaches to create ConfigMaps in Kubernetes: the imperative method and the declarative method.

### Imperative Approach

If you prefer using the command line without a definition file, you can create a ConfigMap directly by specifying key–value pairs. For example, create a ConfigMap named `app-config` with specific environment variables:

```
kubectl create configmap app-config --from-literal=APP_COLOR=blue --from-literal=APP_MOD=prod
```

You can also generate a ConfigMap from a file using the `--from-file` option. For instance, if you have a file named `app_config.properties` containing configuration data:

```
kubectl create configmap app-config --from-file=app_config.properties
```

### Declarative Approach

With a declarative approach, you define your ConfigMap in a YAML file and apply it with kubectl. Here is an example ConfigMap definition:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: blue
  APP_MODE: prod
```

Create the ConfigMap in your cluster with:

```
kubectl create -f config-map.yaml
```

For larger deployments, consider organizing multiple ConfigMaps by logical grouping, such as for your application, MySQL, and Redis:

| ConfigMap Name | Description                  | Sample Data                                |
| -------------- | ---------------------------- | ------------------------------------------ |
| app-config     | Application configuration    | APP\\\_COLOR: blue, APP\\\_MODE: prod      |
| mysql-config   | MySQL database configuration | port: 3306, max\\\_allowed\\\_packet: 128M |
| redis-config   | Redis server configuration   | port: 6379, rdb-compression: yes           |

Naming ConfigMaps appropriately is essential because you will reference these names when associating them with pods.

## Viewing ConfigMaps

Once a ConfigMap is created, you can list it using:

```
kubectl get configmaps
```

To check the stored configuration data, use the describe command:

```
kubectl describe configmaps
```

The output will detail the key–value pairs stored in the ConfigMap, for example:

```
Name:           app-config
Namespace:      default
Labels:         <none>
Annotations:    <none>
Data
====
APP_COLOR:
----
blue
APP_MODE:
----
prod
Events:        <none>
```

> [!important]
> **Tip**
>
> Remember to frequently review and update your ConfigMaps to ensure your applications always run with the most current configurations.

## Injecting a ConfigMap into a Pod

After creating a ConfigMap, configure your pod to use the configuration data. Below is an example pod definition that injects the `app-config` ConfigMap into the container as environment variables:

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
  labels:
    name: simple-webapp-color
spec:
  containers:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
  envFrom:
    - configMapRef:
        name: app-config
```

The corresponding ConfigMap definition might look like this:

```
# config-map.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: blue
  APP_MODE: production
```

When you create the pod with this configuration, your web application receives the configured environment variables automatically.

## Alternative Injection Methods

In addition to using `envFrom`, there are other methods to inject configuration data from ConfigMaps into your pods. You can inject a single environment variable using the `valueFrom` property or mount the entire ConfigMap as a volume. For example:

```
envFrom:
  - configMapRef:
      name: app-config


env:
  - name: APP_COLOR
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: APP_COLOR


volumes:
  - name: app-config-volume
    configMap:
      name: app-config
```

Each method provides flexibility to fit the design of your application, whether you need specific environment variables or a complete set of configuration files mounted as volumes.

> [!important]
> **Important**
>
> Always validate the names and key references in your ConfigMaps to ensure that your pods load the correct configuration data.

---

Practice managing and troubleshooting ConfigMaps on your live Kubernetes environment to build a robust and scalable configuration management workflow. For more detailed information, visit [Kubernetes Configuration Best Practices](https://kubernetes.io/docs/tasks/configmap/) and [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/693933c5-abf5-4242-bd40-6bc6deefcfac)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/10eca8cd-5c55-4dbf-83a5-4a67a46de080)**
>
> Practice lab
