# Connecting To Prometheus - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Connecting-To-Prometheus)

---

## Table of Contents

- Connecting To Prometheus
  - Listing Cluster Services
  - Inspecting the Prometheus Service Configuration
  - Enabling External Access
  - Accessing Prometheus via Port Forwarding
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Connecting To Prometheus

In this guide, you'll learn how to connect to a Prometheus server and access its web UI. We'll cover several methods, starting with inspecting the Prometheus service using kubectl.

## Listing Cluster Services

Begin by listing all services in your Kubernetes cluster to locate the Prometheus service:

```
kubectl get service
```

An example output might look similar to:

```
NAME                                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
alertmanager-operated                       ClusterIP   None            <none>        9093/TCP,9094/TCP,9094/UDP         4d5h
kubernetes                                  ClusterIP   10.100.0.1      <none>        443/TCP                         11h
prometheus-grafana                          ClusterIP   10.100.235.247  <none>        80/TCP                          11h
prometheus-kube-prometheus-alertmanager      ClusterIP   10.100.53.114   <none>        9093/TCP                        11h
prometheus-kube-prometheus-operator           ClusterIP   10.100.196.32   <none>        443/TCP                         11h
prometheus-kube-state-metrics                 ClusterIP   10.100.54.169   <none>        9090/TCP                        11h
prometheus-operated                         ClusterIP   10.100.133.149  <none>        8080/TCP                        11h
prometheus-prometheus-node-exporter         ClusterIP   10.100.248.61   <none>        9100/TCP                        11h
```

This output confirms that the Prometheus service is running. Notice that the service is of type ClusterIP, meaning it is accessible only within the cluster.

## Inspecting the Prometheus Service Configuration

To investigate further, output the service configuration to a YAML file. For instance, execute:

```
kubectl get service prometheus-kube-prometheus-prometheus -o yaml > service.yaml
```

Opening the YAML file, you will notice it is configured as a ClusterIP service. Below is an excerpt of key metadata sections:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    meta.helm.sh/release-name: prometheus
    meta.helm.sh/release-namespace: default
    creationTimestamp: "2022-11-21T18:23:09Z"
  labels:
    app: kube-prometheus-stack-prometheus
    app.kubernetes.io/instance: prometheus
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/part-of: kube-prometheus-stack
    app.kubernetes.io/version: 41.9.1
    chart: kube-prometheus-stack-41.9.1
    heritage: Helm
```

And the corresponding service specifications that confirm the ClusterIP setup:

```
resourceVersion: "801692"
spec:
  clusterIP: 10.100.54.169
  clusterIPs:
    - 10.100.54.169
  internalTrafficPolicy: Cluster
  ipFamilies:
    - IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - name: http-web
      port: 9090
      protocol: TCP
      targetPort: 9090
  selector:
    app.kubernetes.io/name: prometheus
    prometheus: prometheus-kube-prometheus-prometheus
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
```

> [!important]
> **Note**
>
> Since the service uses ClusterIP, it is only accessible from within your Kubernetes cluster.

## Enabling External Access

To access Prometheus externally, consider the following options:

- Change the service type to NodePort or LoadBalancer.
- Set up an Ingress resource to route traffic from a specific URL or domain to the Prometheus service.

For demo purposes, we'll use port forwarding.

## Accessing Prometheus via Port Forwarding

First, check the running pods in your cluster:

```
kubectl get pod
```

Once you have identified the correct Prometheus pod (for example, `prometheus-prometheus-kube-prometheus-0`), forward the pod’s port 9090 to your local machine:

```
kubectl port-forward prometheus-prometheus-kube-prometheus-0 9090
```

With port forwarding active, open your browser and navigate to [http://localhost:9090](http://localhost:9090) to access the Prometheus web UI. This confirms that Prometheus is actively running.

> [!important]
> **Warning**
>
> Port forwarding is ideal for demos and testing. For production environments, switch to NodePort, LoadBalancer, or configure an Ingress for secure and stable external access.

---

By following these steps, you can effectively connect to your Prometheus server and access its UI for monitoring and troubleshooting. For further reading and advanced configurations, consider exploring the [Kubernetes Documentation](https://kubernetes.io/docs/) and [Prometheus Documentation](https://prometheus.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/b88c394c-edce-4eb5-8fc4-c65759ecbf20)**
>
> Watch video content
