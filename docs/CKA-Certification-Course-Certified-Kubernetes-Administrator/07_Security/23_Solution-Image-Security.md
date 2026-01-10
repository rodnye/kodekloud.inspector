# Solution Image Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-Image-Security)

---

## Table of Contents

- Solution Image Security
  - Choosing the Right Secret Type for a Docker Registry
  - Checking the Current Deployment
  - Inspecting the Deployment Configuration
  - Updating the Deployment to Use a Private Registry Image
  - Troubleshooting: ImagePullBackOff Error
  - Creating the Docker Registry Secret
  - Updating the Pod Template for Image Pull Secrets
  - Final Verification
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution Image Security

In this guide, we will walk through a hands-on lab focusing on securing container images within a Kubernetes environment. We will cover how to correctly use a Docker registry secret and update a deployment to pull an image from a private registry.

## Choosing the Right Secret Type for a Docker Registry

Kubernetes supports three types of secrets: Docker registry, generic, and TLS. For our use case, as we need to authenticate with a Docker registry, we will be using the Docker registry secret.

Below is the help output for the secret creation command:

```
root@controlplane:/# kubectl create secret
Create a secret using specified subcommand.


Available Commands:
  docker-registry   Create a secret for use with a Docker registry
  generic           Create a secret from a local file, directory or literal value
  tls               Create a TLS secret


Usage:
  kubectl create secret [flags] [options]


Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).
root@controlplane:/#
```

## Checking the Current Deployment

We begin by examining our cluster’s web application deployment. Running the following command shows that the deployment named `web` is running two replicas with the `nginx:alpine` image:

```
root@controlplane:/# kubectl get deploy
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
web    2/2     2            2           48s
```

Since our goal is to pull the image from an internal private registry, we need to update the deployment to use an image hosted at `myprivateregistry.com:5000` instead of the default Docker Hub image.

## Inspecting the Deployment Configuration

To understand the current state of the deployment, inspect its detailed configuration with:

```
root@controlplane:/# k describe deploy web
Name:                   web
Namespace:              default
CreationTimestamp:      Mon, 18 Apr 2022 01:22:13 +0000
Labels:                 app=web
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=web
Replicas:               2 desired | 2 updated | 2 total | 2 available | 0 unavailable
StrategyType:          RollingUpdate
MinReadySeconds:       0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=web
  Containers:
   nginx:
    Image:         nginx:alpine
    Port:          <none>
    Host Port:     <none>
    Environment:   <none>
    Mounts:        <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   web-bd975bd87 (2/2 replicas created)
Events:
  Type    Reason                  Age   From                     Message
  ----    ------                  ----  ----                     -------
  Normal  ScalingReplicaSet       47s   deployment-controller    Scaled up replica set web-bd975bd87 to 2
root@controlplane:/#
```

## Updating the Deployment to Use a Private Registry Image

Edit the deployment configuration to specify the new image and prepare to add the required image pull secret. Below is an excerpt of the updated configuration (parts that remain unchanged have been omitted for brevity):

```
annotations:
  deployment.kubernetes.io/revision: "1"
creationTimestamp: "2022-04-18T01:22:13Z"
generation: 1
labels:
  app: web
name: web
namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        imagePullPolicy: IfNotPresent
        resources: {}
        terminationMessagePath: /dev/termination-log
      restartPolicy: Always
      dnsPolicy: ClusterFirst
      schedulerName: default-scheduler
```

After saving the updated deployment, verify that the new image name is set. As part of the rolling update process, a new replica set is created:

```
root@controlplane:/# k describe deploy web
Name:               web
Namespace:          default
Labels:             app=web
Annotations:        deployment.kubernetes.io/revision: 2
Selector:           app: web
Replicas:           2 desired | 1 updated | 3 total | 2 available | 1 unavailable
StrategyType:       RollingUpdate
MinReadySeconds:    0
RollingUpdateStrategy: 25% max unavailable, 25% max surge
Pod Template:
  Labels:           app: web
  Containers:
   nginx:
    Image:        myprivateregistry.com:5000/nginx:alpine
    Port:         <none>
    Host Port:    <none>
    Environment:   <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  Available      True    MinimumReplicasAvailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSets:  web-bd975bd87 (2/2 replicas created)
NewReplicaSet:   web-85fcf65896 (1/1 replicas created)
Events:
  Type    Reason             Age   From                           Message
  Normal  ScalingReplicaSet  1065s deployment-controller          Scaled up replica set web-bd975bd87 to 2
  Normal  ScalingReplicaSet  6s    deployment-controller          Scaled up replica set web-85fcf65896 to 1
```

## Troubleshooting: ImagePullBackOff Error

When checking the pods, you may notice that while the old pods remain active, the new pod reports an ImagePullBackOff error:

```
root@controlplane:/# k get pods
NAME                          READY   STATUS              RESTARTS   AGE
web-85fcf65896-rbsmq         0/1     ImagePullBackOff    0          20s
web-bd975bd87-jjbnx          1/1     Running             0          2m
web-bd975bd87-mf9vg          1/1     Running             0          2m
root@controlplane:/#
```

Inspect the pod details to reveal an error message indicating an authentication failure when pulling the image:

```
State:                Waiting
Reason:               ErrImagePull
...
Warning Failed:       Failed to pull image "myprivateregistry.com:5000/nginx:alpine": rpc error: code = Unknown desc = Error response from daemon: Get http://myprivateregistry.com:5000/v2/: net/http: HTTP/1.1 transport connection broken: malformed HTTP response “\x15\x03\x01”
```

> [!important]
> **Warning**
>
> The error indicates that the credentials for accessing your private registry are missing. Without valid credentials, Kubernetes will not be able to pull the image.

## Creating the Docker Registry Secret

To resolve this issue, create a secret containing the necessary credentials. Replace the placeholders with your actual registry information:

```
kubectl create secret docker-registry my-secret --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
```

For example, to create the secret for our private registry, run:

```
kubectl create secret docker-registry private-reg-cred --docker-server=myprivateregistry.com --docker-username=dock_user --docker-password=dock_password --docker-email=dock_user@myprivateregistry.com
```

## Updating the Pod Template for Image Pull Secrets

After successfully creating the secret, update the deployment’s pod template to include the image pull secret. According to the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/containers/images/), add the following block under the pod specification:

```
imagePullSecrets:
- name: private-reg-cred
```

Below is a complete example of a pod configuration that pulls an image from a private registry:

```
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
  - name: private-reg-container
    image: <your-private-image>
  imagePullSecrets:
  - name: regcred
```

Edit the deployment with the following command to include the image pull secret:

```
k edit deploy web
```

After saving your changes, Kubernetes will update the deployment by terminating old pods and creating new ones that use the private registry image along with the correct authentication.

## Final Verification

Ensure that all pods are updated and running with the new image and the secret is applied correctly. Use the following command to verify:

```
root@controlplane:/# kubectl get pods
```

Once you confirm that all pods have successfully pulled the image and are running, the lab is complete. Enjoy the enhanced security and efficiency of your Kubernetes deployments!

> [!important]
> **Note**
>
> For more information on securing Kubernetes deployments and managing Docker registry secrets, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/containers/images/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/ebf3d1f0-d521-4cc0-9abf-2cba44df245e)**
>
> Watch video content
