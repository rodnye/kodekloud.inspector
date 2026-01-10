# Solution Services optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Solution-Services-optional)

---

## Table of Contents

- Solution Services optional
  - Listing Kubernetes Services
  - Checking the Service Type
  - Determining the Target Port
  - Examining Service Labels
  - Inspecting Service Endpoints
  - Exploring Deployments
  - Accessing the Web Application UI
  - Creating a Service for the Web Application
  - Visualizing Service Endpoints
  - Watch Video
    - Understanding Endpoints
    - Counting Deployments
    - Checking the Container Image

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Solution Services optional

In this article, we walk through a practical lab solution for managing Kubernetes services. We cover listing services, inspecting service details, reviewing deployments, and exposing a web application using a NodePort service. This guide is ideal for Kubernetes administrators and developers looking to understand service management in-depth.

## Listing Kubernetes Services

To determine how many services exist on the system, run the following commands:

```
kubectl get service
```

You can also use the shorthand:

```
kubectl get svc
```

The output is similar to:

```
kubectl get service
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1     <none>        443/TCP    10m
```

This output confirms that only one service exists—the default Kubernetes service. You can verify this with both commands:

```
controlplane ~ ⟩ kubectl get service
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1     <none>       443/TCP    10m

controlplane ~ ⟩ kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1     <none>       443/TCP    10m

controlplane ~ ⟩
```

> [!important]
> **Note**
>
> The default service is automatically created by Kubernetes and represents the API server.

## Checking the Service Type

From the output, you can observe that the service type is **ClusterIP**:

```
controlplane ~ ¬ kubectl get service
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP   10.43.0.1     <none>        443/TCP    10m

controlplane ~ ¬ kubectl get svc
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP   10.43.0.1     <none>        443/TCP    10m

controlplane ~ ¬
```

Later, we will explore the role of the API server in more detail. For now, think of this service like any other Kubernetes service you create.

## Determining the Target Port

Next, we determine the target port configured on the Kubernetes service by using the `kubectl describe` command:

```
controlplane ~ ⚡ kubectl get service
NAME        TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP  10.43.0.1    <none>        443/TCP    10m

controlplane ~ ⚡ kubectl get svc
NAME        TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP  10.43.0.1    <none>        443/TCP    10m

controlplane ~ ⚡ kubectl describe svc kubernetes
Name:              kubernetes
Namespace:         default
Labels:            component=apiserver
                   provider=kubernetes
Annotations:       <none>
Selector:          <none>
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                10.43.0.1
IPs:               10.43.0.1
Port:              <unset>
TargetPort:        6443/TCP
Endpoints:         10.53.180.9:6443
Session Affinity:  None
Events:            <none>

controlplane ~  ↣
```

This output shows that the service receives traffic on port 443 and forwards it to the target port **6443**.

## Examining Service Labels

Review the labels configured on the Kubernetes service by examining its description. You will see two labels:

- component: apiserver
- provider: kubernetes

These labels confirm that this service is associated with the Kubernetes API server. For more detailed insights, especially in preparation for the [Certified Kubernetes Application Developer (CKAD)](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad) exam, further examination of the API server is recommended.

## Inspecting Service Endpoints

Endpoints represent the Pod IPs where the service directs traffic. To inspect them, run:

```
controlplane ~ ⚡ kubectl get service
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1     <none>        443/TCP    10m

controlplane ~ ⚡ kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1     <none>        443/TCP    10m

controlplane ~ ⚡ kubectl describe svc kubernetes
Name:                     kubernetes
Namespace:                default
Labels:                   component=apiserver
                          provider=kubernetes
Annotations:              <none>
Selector:                 <none>
Type:                     ClusterIP
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.43.0.1
IPs:                      10.43.0.1
Port:                     https 443/TCP
TargetPort:               6443/TCP
Endpoints:                10.53.180.9:6443
Session Affinity:         None
Events:                   <none>

controlplane ~ ✗
```

The output confirms there is one endpoint: 10.53.180.9:6443.

### Understanding Endpoints

Endpoints are dynamically determined based on the labels and selectors defined in a service specification. When a service is created, it monitors Pods that match its specified selector. If there is a misconfiguration, the service could unintentionally attach extra endpoints, or conversely, none at all if labels are mismatched.

In our example, the service directs traffic to a single endpoint.

## Exploring Deployments

Next, let's examine the deployments in the default namespace.

### Counting Deployments

List the deployments with:

```
kubectl get deploy
```

The output shows that there is one deployment deployed.

### Checking the Container Image

To verify the container image used within the deployment, inspect the deployment details:

```
controlplane ~ ➜ kubectl get deploy
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
simple-webapp-deployment   0/4     4            0           15s

controlplane ~ ➜ kubectl describe deploy simple-webapp-deployment
Name:                   simple-webapp-deployment
Namespace:              default
CreationTimestamp:      Fri, 15 Apr 2022 20:35:47 +0000
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               name=simple-webapp
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  name=simple-webapp
  Containers:
    simple-webapp:
      Image: kodekloud/simple-webapp:red
      Port: 8080/TCP
      Host Port: 0/TCP
      Environment: <none>
      Mounts: <none>
      Volumes: <none>
Conditions:
  Type               Status  Reason
  ----               ------  ------
  Available          True    MinimumReplicasAvailable
  Progressing        True    NewReplicaSetAvailable
OldReplicaSet:      <none>
NewReplicaSet:      simple-webapp-deployment-7b59598d59 (4/4 replicas created)
Events:
  Type    Reason              Age   From                     Message
  ----    ------              ----  ----                     ------
  Normal  ScalingReplicaSet   63s   deployment-controller    Scaled up replica set simple-webapp-deployment-7b59598d59 to 4
```

The container image used is `kodekloud/simple-webapp:red`.

## Accessing the Web Application UI

Attempting to access the web application UI may result in a "bad gateway" error. This occurs because there is no service defined to expose the web application.

> [!important]
> **Warning**
>
> Without a proper service configuration, your web application will remain inaccessible externally.

To resolve this, you need to create a new service using a service definition file.

## Creating a Service for the Web Application

Below is a template for a service definition:

```
apiVersion: v1
kind: Service
metadata:
  name:
spec:
  type:
  ports:
    - targetPort:
      port:
      nodePort:
  selector:
    name:
```

For reference, the [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/) offers sample YAML definitions. An example is:

```
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

For our web application, update the service definition with the following parameters:

- Name: `webapp-service`
- Type: `NodePort`
- Port: `8080`
- TargetPort: `8080`
- NodePort: `30080`
- Selector: `name: simple-webapp`

The complete YAML definition is:

```
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  type: NodePort
  ports:
    - targetPort: 8080
      port: 8080
      nodePort: 30080
  selector:
    name: simple-webapp
```

After saving this definition (for example, as `service-definition-1.yaml`), verify the file content:

```
controlplane ~ → ls
service-definition-1.yaml

controlplane ~ → cat service-definition-1.yaml
---
apiVersion: v1
kind: Service
metadata:
  name:
spec:
  type:
  ports:
    - targetPort:
      port:
      nodePort:
  selector:
    name:
```

Open the file with your preferred editor:

```
controlplane ~ → vi service-definition-1.yaml
```

Create the service with:

```
controlplane ~ → kubectl create -f service-definition-1.yaml
service/webapp-service created

controlplane ~ →
```

Now, you can access the web application using the newly created service. In future lessons, we will also explore imperative commands to create services. For example, try the following commands:

```
kubectl expose pod redis --port=6379 --name=redis-service --dry-run=client -o yaml
```

```
kubectl create service clustip redis --tcp=6379:6379 --dry-run=client -o yaml
```

```
kubectl expose pod nginx --type=NodePort --port=80 --name=nginx-service --dry-run=client -o yaml
```

```
kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml
```

## Visualizing Service Endpoints

For a better understanding of how services direct traffic to Pods, consider the following hand-drawn diagram. It illustrates a service directing traffic to three distinct Pods labeled "app: FE" and "app: FG":

![A hand-drawn diagram with a triangle connected to three circles, labeled "app: FE" and "app: FG" on the side.](https://kodekloud.com/kk-media/image/upload/v1752871313/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Services-optional/frame_220.jpg)

This visual representation reinforces how the service uses endpoints to direct incoming traffic to the correct Pods.

That concludes this lab. By following these steps, you now know how to list services, inspect service configurations and endpoints, review deployments, and expose a web application via a NodePort service in Kubernetes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/afb8b875-51af-4704-a354-c8ba6cbc0a7a)**
>
> Watch video content
