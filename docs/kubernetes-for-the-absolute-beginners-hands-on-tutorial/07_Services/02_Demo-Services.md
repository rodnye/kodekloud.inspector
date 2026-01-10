# Demo Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Services/Demo-Services)

---

## Table of Contents

- Demo Services
  - Verify Your Deployment
  - Create a Service Configuration
  - Deploy the Service
  - Access Your Application
  - Watch Video
    - Define the Service API and Specifications
    - Bind the Service to Your Pods

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Services

# Demo Services

In this guide, we'll walk through exposing a Kubernetes application using a Service resource. After deploying your application using a Deployment resource, you can make it accessible to users through a web browser by creating a Service.

## Verify Your Deployment

Before exposing your application, verify that your deployment is running correctly. In our example, we have a deployment named "myapp-deployment" that manages six replicas (six Pods) in the cluster:

```
kubectl get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment   6/6     6            6           23m
```

## Create a Service Configuration

Now that your application is running, let’s expose it using a Kubernetes Service. Follow these steps:

1.  Open your editor and navigate to the directory where you store your configuration files. For better organization, you can create a directory called `service`.
2.  Inside the `service` directory, create a file named `service-definition.yaml`.

> [!important]
> **Directory Structure Flexibility**
>
> You are not required to use the suggested directory structure. If preferred, all configuration files may be kept in a single directory.

### Define the Service API and Specifications

Begin by defining the API version and kind within your YAML file. Paste in the following configuration:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30004
```

In this configuration:

- The `apiVersion` is set to `v1` as this is the version used for services.
- The `kind` is specified as `Service`.
- The `metadata` section assigns the service a name: `myapp-service`.
- Within the `spec` section:
  - The service type is `NodePort`, which allows external access via a node port (ideal for Minikube).
  - The service listens on port 80, mapping it directly to port 80 on the Pods.
  - The `nodePort` is set to 30004 – an allowable value between 30000 and 32767 that exposes the service externally.

### Bind the Service to Your Pods

To associate the service with the correct set of Pods, add a selector. Verify that your deployment YAML includes appropriate labels (e.g., `app: myapp`). Then, update your YAML file with the `selector` field:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30004
  selector:
    app: myapp
```

## Deploy the Service

Once your service definition is complete, save the file and navigate to its directory to confirm its existence:

```
admin@ubuntu-server service # ls
service-definition.yaml
admin@ubuntu-server service # cat service-definition.yaml
```

Next, create the service in your Kubernetes cluster by executing:

```
kubectl create -f service-definition.yaml
service/myapp-service created
kubectl get svc
```

The output will list your services, including the new NodePort service with its corresponding ClusterIP and port mappings:

```
NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP         24h
myapp-service    NodePort    10.101.76.121    <none>        80:30004/TCP    5s
```

## Access Your Application

Since we're using Minikube, retrieve the service URL with:

```
minikube service myapp-service --url
```

This command will output a URL resembling:

```
http://192.168.99.101:30004
```

Copy the URL and paste it into your web browser. You should see the default Nginx web page, confirming that the Nginx application is accessible and running as expected.

> [!important]
> **Deployment Complete**
>
> This concludes the demo on creating and exposing a Kubernetes Service. Your application is now accessible externally, and you can use this approach to manage exposure in various Kubernetes environments.

Happy deploying, and see you in the next tutorial!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/7e491918-c5e6-47e3-b4b2-54e6e311292c/lesson/9d5fc51f-cd86-4dc0-af27-08282b5a18d9)**
>
> Watch video content
