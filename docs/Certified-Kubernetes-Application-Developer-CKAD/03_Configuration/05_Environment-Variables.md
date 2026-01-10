# Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Environment-Variables)

---

## Table of Contents

- Environment Variables
  - Directly Defining Environment Variables
  - Managing Environment Variables with ConfigMaps and Secrets
  - Comparison of Environment Variable Methods
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Environment Variables

In this article, we explain how to set environment variables in a Kubernetes Pod. Environment variables can be defined directly in your Pod specification or managed externally using ConfigMaps and Secrets, offering flexibility for different deployment scenarios.

## Directly Defining Environment Variables

When creating a Pod, you can directly assign environment variables using the `env` property in the container specification. The `env` property is an array where each variable is defined with a `name` and `value`. For example, if you would run a Docker container with an environment variable like this:

```
docker run -e APP_COLOR=pink simple-webapp-color
```

you can define the same variable in your Kubernetes Pod manifest as follows:

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

In this YAML configuration, the environment variable `APP_COLOR` is directly set to `pink`.

> [!important]
> **Note**
>
> Direct assignment is a straightforward approach, ideal for simple scenarios or development environments.

## Managing Environment Variables with ConfigMaps and Secrets

For more dynamic configuration management, you can externalize environment variable data using ConfigMaps or Secrets. Instead of hardcoding a value, you reference the value using the `valueFrom` field. This helps decouple configuration from application code and allows a more secure and manageable configuration.

Consider the previous direct definition:

```
env:
- name: APP_COLOR
  value: pink
```

You can modify it to use a ConfigMap like this:

```
env:
- name: APP_COLOR
  valueFrom:
    configMapKeyRef:
      name: my-config
      key: app_color
```

In this configuration, Kubernetes retrieves the value for `APP_COLOR` from a ConfigMap named `my-config` instead of hardcoding it in the manifest.

> [!important]
> **Tip**
>
> Using ConfigMaps or Secrets is recommended in production environments to manage sensitive data and configuration changes without modifying the application code.

## Comparison of Environment Variable Methods

| Method              | Description                                             | Use Case                          |
| ------------------- | ------------------------------------------------------- | --------------------------------- |
| Direct Assignment   | Environment variable is hardcoded in the Pod manifest.  | Simple setups or development.     |
| ConfigMap Reference | Environment variable value is sourced from a ConfigMap. | Dynamic configuration management. |
| Secret Reference    | Environment variable value is sourced from a Secret.    | Managing sensitive data securely. |

## Conclusion

Managing environment variables effectively is essential for successful Kubernetes deployments. Whether you use direct assignments or manage them via ConfigMaps and Secrets, Kubernetes provides the flexibility to suit your application's needs.

That's it for this article. For more information on managing configurations in Kubernetes, visit [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/2335417e-c12b-45e5-9fa9-0fb919d588e8)**
>
> Watch video content
