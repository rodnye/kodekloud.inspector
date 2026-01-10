# Port Mania - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Port-Mania)

---

## Table of Contents

- Port Mania
  - Inspecting Kubernetes Resources
  - Establishing Port Forwarding
  - Diagnosing the Port Configuration Mismatch
  - Resolving the Issue
  - Verifying the Fix
  - Watch Video
    - Service Definition
    - Deployment Configuration

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Port Mania

In this lesson, we troubleshoot an accessibility issue with our NeonCat application. We deploy both a service and a deployment on Kubernetes, then use kubectl port-forward to diagnose why the application is unreachable. This guide walks through inspecting resources, establishing port forwarding, identifying configuration mismatches, and resolving the issue.

---

## Inspecting Kubernetes Resources

Start by confirming that your pod, service, and deployment are running correctly:

```
controlplane ~ ➜  k get all
NAME                                           READY   STATUS    RESTARTS   AGE
pod/nyancat-deployment-7484696f66-shvhk       1/1     Running   0          8m28s


NAME                                           TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/kubernetes                             ClusterIP      10.96.0.1      <none>        443/TCP         62m
service/nyancat-service                        ClusterIP      10.106.230.203  <none>        80/TCP          8m28s


NAME                                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nyancat-deployment             1/1     1            1           8m29s


NAME                                           DESIRED   CURRENT   READY   AGE
replicaset.apps/nyancat-deployment-7484696f66   1         1         1       8m28s
```

Notice that the service `nyancat-service` is configured to expose port 80. This is the port that you plan to forward local traffic to.

---

## Establishing Port Forwarding

Next, set up port forwarding by choosing a local port (for example, 3000) and forwarding it to your service’s port 80:

```
controlplane ~ ➜  k port-forward svc/nyancat-service 3000:80
```

Open a separate terminal and verify connectivity by running:

```
curl localhost:3000
```

If you encounter an error like:

```
curl: (52) Empty reply from server
```

it indicates a misconfiguration in your resource definitions.

---

## Diagnosing the Port Configuration Mismatch

The detailed output from the port-forward command might reveal an error such as:

```
controlplane ~ ➜  k port-forward svc/nyancat-service 3000:80
Forwarding from 127.0.0.1:3000 -> 8000
Handling connection for 3000
E0629 20:33:07.147258   27861 portforward.go:413] an error occurred forwarding 3000 -> 8000: error forwarding port 8000 to pod 974be1c7dcce7935a477faa4051ee8d3d61ebe8f112fc112701515331e672a9, uid : failed to execute portforward in network namespace "/var/run/netns/cni-0d9dad6a-e4c8-5a477faa4051ee8d3d61ebe8f112fc112701515331e672a9": dial tcp4 127.0.0.1:8000 inside namespace "974be1c7dcce7935a477faa4051ee8d3d61ebe8f112fc112701515331e672a9": connect: connection refused
error: lost connection to pod
```

This error indicates that the port-forward command is attempting to map local port 3000 to port 8000 on the pod rather than port 80.

> [!important]
> **Understanding the Mismatch**
>
> The service is configured to listen on port 80 but forwards traffic to targetPort 8000 on the pod. However, the deployment’s container is actually listening on port 80.

### Service Definition

Below is the current service configuration:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"name":"nyancat-service","namespace":"default"},"spec":{"ports":[{"port":80,"protocol":"TCP","targetPort":8000}],"selector":{"app":"nyancat"},"type":"ClusterIP"}}
  creationTimestamp: "2024-06-29T20:19:51Z"
  name: nyancat-service
  namespace: default
  resourceVersion: "5026"
  uid: 05f351bc-c5a1-467f-b204-78b120a26bff
spec:
  clusterIP: 10.106.230.203
  clusterIPs:
    - 10.106.230.203
  internalTrafficPolicy: Cluster
  ipFamilies:
    - IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - port: 80
      protocol: TCP
      targetPort: 8000
  selector:
    app: nyancat
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
```

### Deployment Configuration

And here is the deployment configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nyancat-deployment
  labels:
    app: nyancat
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nyancat
  template:
    metadata:
      labels:
        app: nyancat
    spec:
      containers:
        - name: nyancat
          image: public.ecr.aws/pahudnet/nyancat-docker-image:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 80
              protocol: TCP
          resources: {}
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
```

The table below summarizes the configuration discrepancy:

| Component    | Expected Port | Configured TargetPort |
| ------------ | ------------- | --------------------- |
| Service Port | 80            | 8000 (misconfigured)  |
| Container    | 80            | 80                    |

---

## Resolving the Issue

To correct the problem, update the service configuration so that its targetPort matches the container's listening port. Change the service’s targetPort from 8000 to 80.

You can edit the service with the following command:

```
controlplane ~ ➜  edit svc/nyancat-service
service/nyancat-service edited
```

After updating, run the port-forward command again to map local port 3000 to the service’s port 80:

```
controlplane ~ ➜  k port-forward svc/nyancat-service 3000:80
Forwarding from 127.0.0.1:3000 -> 80
```

---

## Verifying the Fix

Test the application again by curling localhost on port 3000 or by opening [http://localhost:3000](http://localhost:3000) in your browser. A successful response might look similar to this:

```
<div id="wave-a" class="hot rainbow"></div>
<div id="wave-a" class="cold rainbow"></div>


<div id="wave-b" class="hot rainbow"></div>
<div id="wave-b" class="cold rainbow"></div>


<div id="nyan-cat" class="frame1">
    <div id="tail"></div>
    <div id="paws"></div>
    <div id="pop-tarts-body">
        <div id="pop-tarts-body-cream"></div>
    </div>
    <div id="head">
        <div id="face"></div>
    </div>
</div>


<a href="https://github.com/cristurm/nyan-cat" title="Nyan Cat's home at GitHub" class="repo">
    <i class="octicon octicon-mark-github"></i>
    <span>My Github Repo</span>
</a>


<audio autoplay="true" loop="true">
    <source src="audio/nyan-cat.ogg" type="audio/ogg" />
    <source src="audio/nyan-cat.mp3" type="audio/mpeg" />
</audio>
<script src="js/nyan.js"></script>
```

Now, traffic flows correctly from local port 3000 to service port 80 and finally to the container’s port 80.

> [!important]
> **Key Takeaway**
>
> Ensuring that the service's targetPort matches the container’s listening port removes unnecessary translation layers and prevents connection issues.

---

By aligning your port configurations, you eliminate the extra hop (from port 80 to 8000) that caused the connection refusal. This exercise emphasizes the importance of consistent port settings across your Kubernetes resources for reliable application accessibility.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/52ea4462-fc9c-4083-acb3-8e9640eaef8c)**
>
> Watch video content
