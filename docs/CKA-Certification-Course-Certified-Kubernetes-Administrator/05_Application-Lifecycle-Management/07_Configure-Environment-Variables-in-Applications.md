# Configure Environment Variables in Applications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Configure-Environment-Variables-in-Applications)

---

## Table of Contents

- Configure Environment Variables in Applications
  - Setting Environment Variables Using Docker
  - Configuring Environment Variables in Kubernetes Pods
  - Leveraging ConfigMaps and Secrets for Environment Variables
  - Summary
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Configure Environment Variables in Applications

In this article, we'll explore how to configure environment variables for applications deployed with Kubernetes. First, we review a basic Docker example that establishes an environment variable, then we demonstrate how to specify environment variables directly within a Kubernetes pod manifest. This guide is essential for developers looking to streamline container configuration and deployment.

## Setting Environment Variables Using Docker

When running a Docker container, you can set environment variables using the `-e` flag. For example, the command below sets the `APP_COLOR` environment variable to "pink":

```
docker run -e APP_COLOR=pink simple-webapp-color
```

This command assigns the value "pink" to `APP_COLOR` while launching the `simple-webapp-color` container.

## Configuring Environment Variables in Kubernetes Pods

Kubernetes allows you to define environment variables within your pod definitions. In the pod manifest, environment variables are listed under the `env` property, which is an array. Each entry in the array should specify:

- `name`: The name of the environment variable.
- `value`: The corresponding value assigned to that environment variable.

Below is an example pod definition that explicitly sets the environment variable:

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
        - containerPort: 8080
      env:
        - name: APP_COLOR
          value: pink
```

In this configuration, the container running the `simple-webapp-color` image will have `APP_COLOR` set to "pink".

## Leveraging ConfigMaps and Secrets for Environment Variables

Instead of hardcoding values into your pod manifest, you can enhance flexibility and security by referencing external configuration sources such as ConfigMaps or Secrets. This approach simplifies maintenance and helps protect sensitive information.

To define an environment variable directly, use:

```
env:
  - name: APP_COLOR
    value: pink
```

To reference a ConfigMap for the environment variable, update the definition as follows:

```
env:
  - name: APP_COLOR
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: color
```

Similarly, to source the environment variable from a Secret, configure it like this:

```
env:
  - name: APP_COLOR
    valueFrom:
      secretKeyRef:
        name: app-secrets
        key: color
```

In both cases, Kubernetes retrieves the value for `APP_COLOR` from the specified external resource.

> [!important]
> **Note**
>
> Using ConfigMaps and Secrets promotes better security practices and easier management of configuration drift. Ensure these objects are updated consistently with your application requirements.> [!important]
> **Warning**
>
> Avoid hardcoding sensitive data directly into your manifests. Always use Secrets when dealing with sensitive information such as passwords or API keys.

## Summary

In this article, we covered:

- How to set environment variables using a Docker command.
- Defining environment variables within Kubernetes pod definitions.
- The benefits of leveraging ConfigMaps and Secrets for managing environment configurations.

For additional details and best practices, visit [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

That concludes this guide. In our next article, we will explore more advanced Kubernetes configuration techniques, further enhancing your container orchestration capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/48a369f6-4e52-4199-83e2-c7d522f30251)**
>
> Watch video content
