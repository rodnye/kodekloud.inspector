# Lab Solution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Services/Lab-Solution)

---

## Table of Contents

- Lab Solution
  - Identifying Existing Services
  - Checking the Service Type
  - Inspecting the Target Port
  - Verifying Service Labels
  - Exploring Endpoints
  - Reviewing Deployments
  - Accessing the Web Application UI
  - Creating a Service to Expose the Web Application
  - Additional Ways to Create Services
  - Watch Video
    - What Are Endpoints?
    - Inspecting the Deployment

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Services

# Lab Solution

In this guide, we will walk through the solution for the lab on Services in Kubernetes. The instructions include identifying existing services, checking service types, inspecting target ports, verifying labels and endpoints, reviewing deployments, and finally creating a service to expose a web application.

## Identifying Existing Services

The first step is to check how many services are running on your system. Run one of the commands below:

```
kubectl get service
```

or use the shorthand:

```
kubectl get svc
```

The output should look similar to:

```
kubectl get service
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP   10.43.0.1      <none>        443/TCP    10m
```

This output confirms that there is only one service running—the default Kubernetes service.

## Checking the Service Type

Next, verify the type of the default service by executing:

```
kubectl get service
```

and

```
kubectl get svc
```

You should see output like this:

```
controlplane ~ ➜ kubectl get service
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1       <none>        443/TCP    10m


controlplane ~ ➜ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.43.0.1       <none>        443/TCP    10m


controlplane ~ ➜
```

This confirms that the service type is "ClusterIP". We will focus on this configuration for now, with further details to be discussed later. To verify, run:

```
kubectl get service
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP   10.43.0.1       <none>        443/TCP    10m
```

```
kubectl get svc
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes  ClusterIP   10.43.0.1       <none>        443/TCP    10m
```

## Inspecting the Target Port

To determine the target port configured on the Kubernetes service, use the following command:

```
kubectl describe svc kubernetes
```

You will see output similar to:

```
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
Port:                     https  443/TCP
TargetPort:               6443/TCP
Endpoints:                10.53.180.9:6443
Session Affinity:         None
Events:                   <none>
```

Notice that the target port is set to 6443.

## Verifying Service Labels

Next, check the labels that are configured on the Kubernetes service. From the output above, you can see two labels:

- component: apiserver
- provider: kubernetes

These labels indicate that the service is associated with the Kubernetes API server. Details about the API server will be covered in a later section.

## Exploring Endpoints

Endpoints represent the pods that the service directs traffic to. The output shows one endpoint:

```
kubectl describe svc kubernetes
...
Endpoints:                10.53.180.9:6443
...
```

### What Are Endpoints?

Endpoints list the pods selected by the service based on specified labels. For example, if a service targets three pods (all matching the label selector), then three endpoints will be listed. Conversely, if an extra pod is unintentionally matched, the endpoints list will increase, which could affect traffic routing.

Endpoints are essential for troubleshooting. If the service's selector does not match any pod labels, the endpoints list will be empty, indicating why the application may not be accessible. In a properly configured scenario, services map pod endpoints by associating the service with the IP addresses of matching pods.

Here are two diagrams provided for visualization:

![The image shows a simple hierarchical diagram with a triangle connected to three circles, labeled "app: FE" and "app: fr" on the side.](https://kodekloud.com/kk-media/image/upload/v1752884965/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Lab-Solution/frame_220.jpg)

If additional pods inadvertently match the service selector, the endpoints list will expand, potentially impacting traffic routing:

![The image depicts a diagram with a triangle connected to four circles, labeled "app: FE" and "app: fr," possibly representing a network or system architecture.](https://kodekloud.com/kk-media/image/upload/v1752884966/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Lab-Solution/frame_290.jpg)

In our lab scenario, the Kubernetes service has just one endpoint:

```
controlplane ~ ↳ kubectl get service
NAME              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes       ClusterIP   10.43.0.1       <none>        443/TCP    10m


controlplane ~ ↳ kubectl get svc
NAME              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes       ClusterIP   10.43.0.1       <none>        443/TCP    10m


controlplane ~ ↳ kubectl describe svc kubernetes
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
Port:              https  443/TCP
TargetPort:        6443/TCP
Endpoints:         10.53.180.9:6443
Session Affinity:  None
Events:            <none>
```

## Reviewing Deployments

Now, let’s check the number of Deployments in the default namespace by running:

```
kubectl get deploy
```

The output indicates there is one deployment present.

### Inspecting the Deployment

Inspect the deployment responsible for creating the pods:

```
kubectl describe deploy simple-webapp-deployment
```

The detailed output shows the deployment specifics, including the container image:

```
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
  Labels:       name=simple-webapp
  Containers:
   simple-webapp:
     Image:      kodekloud/simple-webapp:red
     Port:       8080/TCP
     Host Port:  0/TCP
     Environment: <none>
     Mounts:     <none>
  Volumes:      <none>
Conditions:
  Type             Status   Reason
  Available        True     MinimumReplicasAvailable
  Progressing      True     NewReplicaSetAvailable
OldReplicaSets:     <none>
NewReplicaSet:      simple-webapp-deployment-7b59598d59 (4/4 replicas created)
Events:
  Type    Reason                  Age   From                     Message
  ----    ------                  ----  ----                     -------
  Normal  ScalingReplicaSet       63s   deployment-controller    Scaled up replica set simple-webapp-deployment-7b59598d59 to 4
```

The container image used to create the pods is:

```
kodekloud/simple-webapp:red
```

## Accessing the Web Application UI

At this point, you may try to access the web application UI using the link provided in the deployment tab; however, you will encounter a "bad gateway" error. This occurs because there is no service configured to expose the deployment:

```
controlplane ~ ✗ kubectl get deploy
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
simple-webapp-deployment   0/4     0            0           15s


controlplane ~ ✗ kubectl describe deploy simple-webapp-deployment
Name:                   simple-webapp-deployment
Namespace:              default
CreationTimestamp:      Fri, 15 Apr 2022 20:35:47 +0000
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  name=simple-webapp
  Containers:
   simple-webapp:
    Image:  kodekloud/simple-webapp:red
    Port:   8080/TCP
    Host Port:  0/TCP
    Environment:  <none>
    Mounts:  <none>
  Volumes:  <none>
Conditions:
  Type              Status  Reason
  Available         True    MinimumReplicasAvailable
  Progressing       True    NewReplicaSetAvailable
OldReplicaSet:      <none>
NewReplicaSet:      simple-webapp-deployment-7b59598d59 (4/4 replicas created)
Events:
  Type    Reason              Age   From                       Message
  Normal  ScalingReplicaSet   63s   deployment-controller      Scaled up replica set simple-webapp-deployment-7b59598d59 to 4
```

> [!important]
> **Warning**
>
> Since no service is exposing the deployment, the web application is not accessible.

To resolve this, create a new service using a YAML configuration file.

## Creating a Service to Expose the Web Application

Below is an example YAML configuration file that defines a Kubernetes service to expose the web application:

![The image shows a terminal interface and instructions for creating a Kubernetes service using a YAML file, specifying details like name, type, ports, and selector.](https://kodekloud.com/kk-media/image/upload/v1752884967/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Lab-Solution/frame_440.jpg)

The service YAML template is as follows:

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

A more complete example from the [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/) is:

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

For our web application, we will create a service with the following specifications:

- Name: webapp-service
- Type: NodePort
- Target port: 8080 (the port on which the application is running)
- Port: 8080 (the port to expose)
- NodePort: 30080
- Selector: name set to simple-webapp

Here is the complete YAML configuration:

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

Apply the configuration with the following command:

```
kubectl create -f service-definition-1.yaml
```

The command should output:

```
service/webapp-service created
```

After creating the service, verify that it is working by accessing the web application UI.

## Additional Ways to Create Services

In future sections, we will explore how to use imperative commands to create services. Here are some examples:

```
kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml
```

```
kubectl create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml
```

```
kubectl expose pod nginx --type=NodePort --port=80 --name=nginx-service --dry-run=client -o yaml
```

This concludes the lab walkthrough. By following these steps, you have learned how to manage services and deployments in Kubernetes effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/7e491918-c5e6-47e3-b4b2-54e6e311292c/lesson/be5b2d6a-1ab3-426b-824c-fc16756121be)**
>
> Watch video content
