# Demo Resource Allocation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Demo-Resource-Allocation)

---

## Table of Contents

- Demo Resource Allocation
  - Configuring Resource Requests and Limits
  - Extended Configuration with Additional Environment Variables
  - Verifying Resource Allocation
  - Managing Resource Allocation in Larger Environments
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Demo Resource Allocation

In this article, we explore how to configure resource requests and limits for the CartsDB deployment—an essential component of the Socks Shop application. By setting specific CPU and memory values, you ensure efficient resource usage and guarantee that your application performs reliably under different workloads.

## Configuring Resource Requests and Limits

The following YAML configuration sets the resource requests and limits for the CartsDB deployment. In this example, the container is allocated 64Mi of memory and 250m of CPU as requests, with a memory limit of 128Mi:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    name: carts-db
spec:
  containers:
    - name: carts-db
      image: centos/mongodb-34-centos7
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
      ports:
        - name: mongo
          containerPort: 27017
      env:
        - name: MONGODB_USER
```

All other configuration details remain unchanged except for the resource definitions. Additional settings such as environment variables, volume mounts, and node selectors are specified as shown below:

```
value: admin
volumeMounts:
  - mountPath: /tmp
    name: tmp-volume
volumes:
  - name: tmp-volume
    emptyDir:
      medium: Memory
nodeSelector:
  beta.kubernetes.io/os: linux
```

> [!important]
> **Note**
>
> To update the deployment, open your OpenShift platform, navigate to Workloads > Deployments, and click on "Create New Deployment." Switch to the YAML view and paste the configuration above.

## Extended Configuration with Additional Environment Variables

For a more detailed configuration, include additional environment variables as demonstrated in the snippet below. This enhanced setup improves the management of login credentials and database settings:

```
cpu: "250m"
limits:
  memory: "128Mi"
ports:
  - name: mongo
    containerPort: 27017
env:
  - name: MONGODB_USER
    value: sock-user
  - name: MONGODB_PASSWORD
    value: password
  - name: MONGODB_DATABASE
    value: data
  - name: MONGODB_URI_PASSWORD
    value: some-password
```

After clicking "Create," allow a few moments for the deployment to initialize. Once your pod is running, you can verify the applied resource settings by examining the pod's YAML.

## Verifying Resource Allocation

Scroll down in the pod YAML to locate the container resources section. It should include settings that confirm the memory limits and CPU/memory requests, similar to the snippet below:

```
nodeName: crc-p9hmx-master-0
securityContext: {}
containers:
  - resources:
      limits:
        memory: 128Mi
      requests:
        cpu: 250m
        memory: 64Mi
      terminationMessagePath: /dev/termination-log
      name: carts-db
```

> [!important]
> **Tip**
>
> Reviewing the pod's YAML configuration is an easy way to ensure that your resource settings have been correctly applied.

## Managing Resource Allocation in Larger Environments

In environments with many deployments, adjusting resource values individually for each deployment can become time-consuming. Resource quotas provide an efficient way to manage resource allocation across multiple deployments. In our next section, we will dive into how resource quotas can simplify this process.

For further reading, consider exploring additional resources on [Kubernetes Documentation](https://kubernetes.io/docs/) and [OpenShift](https://www.openshift.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/ac8a7ab4-0d47-43d9-a009-06b3e865e8df)**
>
> Watch video content
