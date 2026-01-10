# enableServiceLinks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/enableServiceLinks)

---

## Table of Contents

- enableServiceLinks
  - Real-World Scenario: Troubleshooting Environment Variable Injection
  - Diagnosing the Issue
  - Impact of Environment Variable Injection
  - Disabling Service Links with enableServiceLinks
  - Summary
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# enableServiceLinks

In this lesson, we dive into the Kubernetes pod specification parameter called enableServiceLinks. This parameter, although not frequently encountered by beginners, is crucial for controlling how service-related environment variables are injected into your pods. Below, you'll find a detailed explanation and a real-world scenario that demonstrates the effect of this setting.

## Real-World Scenario: Troubleshooting Environment Variable Injection

While developing an application and writing the Kubernetes manifest, I initially tested the configuration in my development namespace. Everything worked as expected:

```
Context: kubernetes-admin@kubernetes
Cluster: kubernetes
User: kubernetes-admin
K9s Rev: v0.32.5
K8s Rev: v1.30.0
CPU: 0%
MEM: 0%


NAME                            PF   READY    STATUS      RESTARTS    CPU    MEM    %CPU/R    %CPU/L    %MEM/R    %MEM/L
app-backend-784d8b488-n46z7    ●    1/1      Running     0           0      0      7         n/a       n/a       n/a
app-frontend-5659bf9bf4-22xt4   ●    1/1      Running     0           0      0      5         n/a       n/a       n/a
```

However, upon deploying the same manifest to the staging namespace, the application began crashing. The only difference was the namespace—the manifest remained unchanged. Container logs revealed the following error:

```
standard_init_linux.go:228: exec user process caused: argument list too long
```

This error is common on Linux when a process is provided with an excessively long list of arguments, which in this case was due to a large number of environment variables injected into the pod. Although my application did not originally require many environment variables, the staging namespace had numerous additional services, leading to the buildup of excessive environment variables.

> [!important]
> **Observation**
>
> Kubernetes automatically injects environment variables for every service in the namespace into each pod, ensuring that pods can discover and connect with services without relying solely on DNS.

![The image explains a Linux command error "Argument List Too Long" due to a long list of arguments or environment variables, with a comparison between development and staging environments.](https://kodekloud.com/kk-media/image/upload/v1752880448/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-enableServiceLinks/linux-command-error-argument-list.jpg)

## Diagnosing the Issue

To diagnose the problem, I recreated both the staging and development namespaces. After starting a shell in the container and executing a simple print command, I discovered a lengthy list of environment variables in the staging namespace. These included variables such as DevOps, Auth, API, ML Pipeline, Recommendations, and Security, corresponding to other applications running in that namespace.

For instance, the staging namespace had many service-related environment variables:

```
SERVICE_PAYMENTS_PORT_80_TCP=tcp://10.111.106.141:80
SERVICE_USER_MANAGEMENT_PORT_80_TCP=tcp://10.110.195.14:80
SERVICE_ML_PORT_80_TCP_ADDR=10.98.108.170
SERVICE_CUSTOMER_SUPPORT_PORT=tcp://10.106.113.178:80
KUBERNETES_SERVICE_HOST=10.96.0.1
KUBERNETES_PORT=tcp://10.96.0.1:443
...
```

In contrast, the development namespace only injected environment variables for two services—the frontend and the backend:

```
root@app-frontend-5659bf9bf4-hszqp:/# printenv
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_SERVICE_PORT=443
HOSTNAME=app-frontend-5659bf9bf4-hszqp
SERVICE_FRONTEND_SERVICE_PORT=80
SERVICE_BACKEND_PORT_88_TCP_PROTO=tcp
SERVICE_FRONTEND_PORT_80_TCP_PROTO=tcp
PWD=/
...
```

This comparison highlights how the default behavior of Kubernetes leads to the accumulation of environment variables, which can cause issues such as the "argument list too long" error.

![The image describes a "Primary Approach - DNS Plugin," highlighting it as a reliable and common method where resolution happens using DNS.](https://kodekloud.com/kk-media/image/upload/v1752880449/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-enableServiceLinks/primary-approach-dns-plugin.jpg)

## Impact of Environment Variable Injection

When a new pod starts, let's say for Service D, Kubernetes injects environment variables from existing services (A, B, and C) into that pod. For example, the logging application in such a scenario might show the following output when running:

```
printenv | grep LO
```

This command outputs several logging-related variables:

```
root@app-frontend-5659bf9bf4-g5mkv:/# printenv | grep LOGGING
SERVICE_LOGGING_PORT=tcp://10.107.148.177:80
SERVICE_LOGGING_PORT_80_TCP=tcp://10.107.148.177:80
SERVICE_LOGGING_PORT_80_TCP_ADDR=10.107.148.177
SERVICE_LOGGING_PORT_80_TCP_PROTO=tcp
SERVICE_LOGGING_PORT_80_TCP_PORT=80
SERVICE_LOGGING_SERVICE_HOST=10.107.148.177
SERVICE_LOGGING_SERVICE_PORT=80
```

Such injected information enables applications to connect to services without DNS queries. However, in environments with thousands of services, the cumulative length of environment variables can become unmanageable.

![The image illustrates a Kubernetes cluster with services A, B, C, and D, where Service D deploys with injected environment variables from Services A, B, and C.](https://kodekloud.com/kk-media/image/upload/v1752880451/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-enableServiceLinks/kubernetes-cluster-services-a-b-c-d.jpg)

A side-by-side comparison between development and staging environments might look like this:

![The image shows a comparison between Development and Staging Environments, listing environment variables (env_var_1 to env_var_4) under each. The Development Environments section highlights env_var_1 and env_var_2.](https://kodekloud.com/kk-media/image/upload/v1752880452/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-enableServiceLinks/development-staging-env-comparison.jpg)

## Disabling Service Links with enableServiceLinks

Since we use CoreDNS in production, the automatically injected environment variables are redundant. Kubernetes provides an option to disable this behavior by setting enableServiceLinks to false in your pod specification. This prevents the injection of unrelated service environment variables, addressing issues like the "argument list too long" error.

Below is an example of a deployment manifest with enableServiceLinks disabled:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-frontend
  namespace: staging
  annotations:
    deployment.kubernetes.io/revision: "1"
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"name":"app-frontend","namespace":"staging"},"spec":{"replicas":1,"selector":{"matchLabels":{"app":"frontend"}},"template":{"metadata":{"labels":{"app":"frontend"}},"spec":{"containers":[{"image":"nginx:1.19","name":"app-frontend","ports":[{"containerPort":80}]}]}}}}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      enableServiceLinks: false
      containers:
        - image: nginx:1.19
          name: app-frontend
          ports:
            - containerPort: 80
```

After applying this updated manifest, your new pods will no longer include the extraneous service environment variables. Verify this by executing a print command within the pod:

```
root@app-frontend-5f84894df8-xqpp4:/# printenv
KUBERNETES_SERVICE_PORT=443
KUBERNETES_SERVICE_PORT_HTTPS=443
HOSTNAME=app-frontend-5f84894df8-xqpp4
PWD=/
PKG_RELEASE=1~buster
HOME=/root
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
NJS_VERSION=0.5.3
TERM=term
SHLVL=1
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
KUBERNETES_SERVICE_HOST=10.96.0.1
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP_PORT=443
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
NGINX_VERSION=1.19.10
_= /usr/bin/printenv
```

> [!important]
> **Key Takeaway**
>
> The enableServiceLinks parameter is enabled by default, leading to the injection of environment variables for every service in the namespace. When using a DNS plugin like CoreDNS, disable this behavior by setting enableServiceLinks to false to prevent potential errors.

## Summary

In summary, enableServiceLinks controls how Kubernetes injects service environment variables into your pods. By setting enableServiceLinks to false, you can improve resource efficiency and avoid errors like "argument list too long," especially when many services coexist in the same namespace. Leveraging DNS via CoreDNS for service discovery is a best practice that renders these environment variables unnecessary.

Happy deploying, and see you in the next article!

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Getting Started with CoreDNS](https://coredns.io/)
- [Kubernetes Pod Design Best Practices](https://kubernetes.io/docs/concepts/workloads/pods/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/145f4424-ee1d-4e0c-b117-321501e6db15)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/03d199f6-ed62-4459-98fc-bb88f6842b77)**
>
> Practice lab
