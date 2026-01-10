# kubectl port forward - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-port-forward)

---

## Table of Contents

- kubectl port forward
  - Viewing Cluster Services
  - Creating a Secure Tunnel with Port Forwarding
  - Verifying Service Configuration
  - Accessing Other Internal Services
  - Additional Use: Service Account Tokens
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl port forward

In this lesson, you'll learn how to use the kubectl port-forward command—a powerful technique that enables local access to internal Kubernetes cluster resources without exposing them to the internet. This method is ideal for testing, debugging, or accessing services in development and user acceptance testing environments.

Port forwarding is particularly useful when working with ClusterIP services, such as a typical "notes-app-deployment" running in the "uat" (user acceptance testing) namespace. Since ClusterIP services are only accessible within the cluster, port forwarding creates a secure tunnel from your local machine directly to the service.

## Viewing Cluster Services

First, you can list all services across namespaces with the following command:

```
controlplane ~ ➜ k get svc -A
NAMESPACE             NAME                                         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
default               kubernetes                                   ClusterIP   10.96.0.1        <none>        443/TCP                     44m
dev                   nginx-nginx                                  NodePort    10.110.4.112     <none>        80:31000/TCP                43m
ingress-nginx         ingress-nginx-controller                     NodePort    10.110.86.144    <none>        80:32077/TCP,443:31387/TCP    42m
kube-system           kube-dns                                     ClusterIP   10.108.196.245   <none>        53/UDP,53/TCP,9153/TCP       42m
kube-system           metrics-server                               ClusterIP   10.96.0.10       <none>        443/TCP                     43m
kubernetes-dashboard  kubernetes-dashboard-api                     ClusterIP   10.103.170.18    <none>        443/TCP                     42m
kubernetes-dashboard  kubernetes-dashboard-auth                    ClusterIP   10.102.75.66     <none>        8000/TCP                    43m
kubernetes-dashboard  kubernetes-dashboard-home                    NodePort    10.110.56.139    <none>        8001:32151/TCP,8445:30806/TCP 43m
kubernetes-dashboard  kubernetes-dashboard-kong-proxy              ClusterIP   10.99.121.107    <none>        443/TCP                     42m
kubernetes-dashboard  kubernetes-dashboard-metrics-scraper         ClusterIP   10.104.148.150   <none>        8000/TCP                    43m
kubernetes-dashboard  kubernetes-dashboard-web                     ClusterIP   10.102.150.94    <none>        8000/TCP                    43m
monitoring            grafana                                      ClusterIP   10.109.162.199   <none>        8081/TCP                    42m
monitoring            prometheus-alertmanager                      ClusterIP   10.111.237.88    <none>        9093/TCP                    43m
monitoring            prometheus-alertmanager-headless             ClusterIP   None             <none>        9093/TCP                    43m
monitoring            prometheus-kube-state-metrics                 ClusterIP   10.109.19.42     <none>        9100/TCP                    43m
monitoring            prometheus-prometheus-node-exporter          ClusterIP   10.100.83.134    <none>        9100/TCP                    43m
monitoring            prometheus-prometheus-pushgateway            ClusterIP   10.111.84.241    <none>        9091/TCP                    42m
qa                    argo-cd-argocd-applicationset-controller     ClusterIP   10.99.129.210    <none>        5556/TCP,5557/TCP           42m
qa                    argo-cd-argocd-dex-server                    ClusterIP   10.102.199.57    <none>        6379/TCP                    42m
qa                    argo-cd-argocd-repo-server                   ClusterIP   10.100.214.156   <none>        8081/TCP                    42m
staging               vault-agent-injector-svc                     ClusterIP   10.96.0.195      <none>        80/TCP,443/TCP              42m
staging               vault-internal                               ClusterIP   10.97.174.170    <none>        443/TCP                    42m
uat                   notes-app-deployment                         ClusterIP   None             <none>        8200/TCP,8201/TCP           42m
controlplane ~ ➜
```

Here, the "notes-app-deployment" service in the uat namespace is configured as ClusterIP, making it accessible only from within the cluster.

## Creating a Secure Tunnel with Port Forwarding

To securely access the internal service, you can use the kubectl port-forward command. This command establishes a local tunnel where traffic from a specified local port is redirected to the service's port in the cluster.

For example, to forward local port 8000 to the service's port 80 (which then directs traffic to the pod target port 3000), run the following command:

```
controlplane ~ ➜ k port-forward -n uat svc/notes-app-deployment 8000:80
Forwarding from 127.0.0.1:8000 -> 3000
```

Once the port forward is active, you can access the notes application locally. For instance, execute:

```
curl localhost:8000
```

The response might resemble a simple HTML page:

```
<!DOCTYPE html>
<html>
<head>
  <title>Note Keeper</title>
</head>
<body>
  <h1>Note Keeper</h1>
  <div style="display: flex;">
    <form action="/update" method="post">
      <input type="number" style="display: none;" name="noteId" value="1">
      <textarea rows="6" cols="30" placeholder="Type Here..." name="noteContent">
Hey guys, add your important notes here.
      </textarea>
      <br>
      <button type="submit">Update</button>
    </form>
    <form action="/delete" method="post">
      <input type="number" style="display: none;" name="noteId" value="1">
      <button type="submit" style="margin: 0 4px;">X</button>
    </form>
  </div>
  <h1>Add Note</h1>
  <form action="/" method="post">
    <input type="number" style="display: none;" name="noteId">
    <textarea rows="6" cols="30" placeholder="Type Here..." name="noteContent"></textarea>
    <br>
    <button type="submit">Add</button>
  </form>
</body>
</html>
```

> [!important]
> **Tip**
>
> Remember that port forwarding is temporary—it lasts as long as your terminal session remains active.

## Verifying Service Configuration

To inspect the service configuration and verify its port settings, retrieve the YAML definition with the following command:

```
controlplane ~ ➜ k get svc -n uat notes-app-deployment -o yaml
```

The command outputs a detailed YAML configuration similar to:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"name":"notes-app-deployment","namespace":"uat"},"spec":{"ports":[{"port":80,"targetPort":3000}],"selector":{"app":"notes-app"}}}
  creationTimestamp: "2024-04-25T14:22:29Z"
  name: notes-app-deployment
  namespace: uat
  resourceVersion: "592"
  uid: aa996b82-96a9-4e43-bf72-2fe1c21e777
spec:
  clusterIP: 10.102.16.119
  clusterIPs:
    - 10.102.16.119
  internalTrafficPolicy: Cluster
  ipFamilies:
    - IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
  selector:
    app: notes-app
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
```

In this YAML, notice that the service listens on port 80 and forwards the traffic to port 3000 on the pod.

## Accessing Other Internal Services

Similarly, you can port-forward other internal services. For example, if you need secure access to the Kubernetes Dashboard (a ClusterIP service), forward a local port to the Dashboard's port as shown:

```
controlplane ~ ➜ k port-forward -n kubernetes-dashboard svc/kubernetes-dashboard-web 8000:8000
```

After running the command, open your web browser and navigate to [http://localhost:8000](http://localhost:8000) to access the Kubernetes Dashboard securely.

## Additional Use: Service Account Tokens

For added flexibility, you can also create service account tokens when needed. This can be accomplished with the following command:

```
kubectl -n NAMESPACE create-token SERVICE_ACCOUNT
```

> [!important]
> **Security Warning**
>
> Use service account tokens cautiously—ensure they are stored securely and only used in trusted contexts.

## Summary

In summary, the kubectl port-forward command is an essential tool that enables a secure, temporary tunnel from your local machine directly to services or pods within a Kubernetes cluster. This technique is widely used for debugging, testing APIs, or accessing internal services without the need for an external load balancer.

For further reading on Kubernetes concepts and commands, check out these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

This concludes our comprehensive explanation of kubectl port-forward and its many practical applications in managing Kubernetes clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/a588cc9f-65fd-44e5-8275-ea4d9d4dfd54)**
>
> Watch video content
