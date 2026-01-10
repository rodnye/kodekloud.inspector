# Deploy Elasticsearch on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Elasticsearch-and-Kibana-Deployment-on-Kubernetes/Deploy-Elasticsearch-on-Kubernetes)

---

## Table of Contents

- Deploy Elasticsearch on Kubernetes
  - Pre-deployment Setup
  - Exploring the Repository Files
  - Inspecting the Elasticsearch StatefulSet
  - Volume Mount and Persistent Storage
  - Defining the Elasticsearch Service
  - Deploying the Elasticsearch Stack
  - Final Verification
  - Watch Video
  - Practice Lab

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Elasticsearch and Kibana Deployment on Kubernetes

# Deploy Elasticsearch on Kubernetes

Welcome to this comprehensive lesson on deploying Elasticsearch on a Kubernetes cluster. In this guide, you'll learn how to set up the cluster, inspect configuration files, and deploy Elasticsearch with persistent storage.

Let’s get started!

## Pre-deployment Setup

Before deploying the Elasticsearch cluster, execute a few preparatory commands. Start by tainting the control plane, creating a dedicated namespace called "efk", and setting the current context to that namespace. Then, clone the repository and navigate to the Elasticsearch/Kibana folder.

```
kubectl taint node controlplane node-role.kubernetes.io/control-plane-:NoSchedule
kubectl create namespace efk
kubectl config set-context --current --namespace=efk
# Context "kubernetes-admin@kubernetes" modified.
git clone https://github.com/kodekloudhub/efk-stack.git
# Cloning into 'efk-stack'...
cd /root/efk-stack/elasticsearch-kibana
```

## Exploring the Repository Files

After navigating to the proper directory, list the available files to understand the repository structure. There are five configuration files present. The three critical files for Elasticsearch are:

- es-statefulset.yaml (defines the StatefulSet)
- es-service.yaml (defines the Service)
- es-pvolume.yaml (defines the Persistent Volume)

```
ls -lrt
# total 4
cd efk-stack/
cd /root/efk-stack/elasticsearch-kibana


ls -lrt
# total 20
# -rw-r--r-- 1 root  root   184 Aug  6 14:18 kibana-service.yaml
# -rw-r--r-- 1 root  root   354 Aug  6 14:18 kibana-deployment.yaml
# -rw-r--r-- 1 root  root  1195 Aug  6 14:18 es-statefulset.yaml
# -rw-r--r-- 1 root  root   299 Aug  6 14:18 es-service.yaml
# -rw-r--r-- 1 root  root   185 Aug  6 14:18 es-pvolume.yaml
```

## Inspecting the Elasticsearch StatefulSet

The es-statefulset.yaml file contains the configuration for the Elasticsearch StatefulSet. This file includes metadata, pod specifications, and the Docker image version (8.13.0). It exposes ports 9200 and 9300 and sets essential environment variables, such as running in single-node mode and disabling x-pack security for demonstration purposes.

```
selector:
  matchLabels:
    app: elasticsearch
template:
  metadata:
    labels:
      app: elasticsearch
  spec:
    containers:
    - name: elasticsearch
      image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
      ports:
      - containerPort: 9200
        name: port1
      - containerPort: 9300
        name: port2
      env:
      - name: discovery.type
        value: single-node
      - name: xpack.security.enabled
        value: "false"
      volumeMounts:
      - name: es-data
        mountPath: /usr/share/elasticsearch/data
    initContainers:
    - name: fix-permissions
      image: busybox
      command: ["sh", "-c", "chown -R 1000:1000 /usr/share/elasticsearch/data"]
      securityContext:
        privileged: true
      volumeMounts:
      - name: es-data
        mountPath: /usr/share/elasticsearch/data
    volumeClaimTemplates:
    - metadata:
        name: es-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

Later in the same file, the persistent storage size is updated along with similar configurations. Note that the x-pack security is disabled, and the volume mount ensures persistent data storage across pod restarts.

```
metadata:
  labels:
    app: elasticsearch
spec:
  containers:
    - name: elasticsearch
      image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
      ports:
        - containerPort: 9200
          name: port1
        - containerPort: 9300
          name: port2
      env:
        - name: discovery.type
          value: single-node
        - name: xpack.security.enabled
          value: "false"
      volumeMounts:
        - name: es-data
          mountPath: /usr/share/elasticsearch/data
  initContainers:
    - name: fix-permissions
      image: busybox
      command: ["sh", "-c", "chown -R 1000:1000 /usr/share/elasticsearch/data"]
      securityContext:
        privileged: true
      volumeMounts:
        - name: es-data
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
    - metadata:
        name: es-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 5Gi
```

> [!important]
> **Note**
>
> For enhanced security in production environments, explore additional configuration options to enable robust authentication and secure data communication.

## Volume Mount and Persistent Storage

The StatefulSet configures an "es-data" volume mount where Elasticsearch stores its data. This mount is defined via a Persistent Volume Claim, ensuring that data persists even if the pod is restarted or recreated.

```
metadata:
  labels:
    app: elasticsearch
spec:
  containers:
    - name: elasticsearch
      image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
      ports:
        - containerPort: 9200
          name: port1
        - containerPort: 9300
          name: port2
      env:
        - name: discovery.type
          value: single-node
        - name: xpack.security.enabled
          value: "false"
      volumeMounts:
        - name: es-data
          mountPath: /usr/share/elasticsearch/data
  initContainers:
    - name: fix-permissions
      image: busybox
      command: ["sh", "-c", "chown -R 1000:1000 /usr/share/elasticsearch/data"]
      securityContext:
        privileged: true
      volumeMounts:
        - name: es-data
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
    - metadata:
        name: es-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 5Gi
```

The Persistent Volume (defined in es-pvolume.yaml) is configured to use a hostPath at "/data/elasticsearch" with a storage capacity of 5Gi and access mode "ReadWriteOnce".

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-elasticsearch
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/elasticsearch
```

## Defining the Elasticsearch Service

The es-service.yaml file defines the Elasticsearch Service, which exposes ports 9200 and 9300. It leverages NodePort and ensures consistent metadata with the StatefulSet for proper traffic routing.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-elasticsearch
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/elasticsearch
---
apiVersion: v1
kind: Service
metadata:
  name: elasticsearch
  namespace: efk
spec:
  selector:
    app: elasticsearch
  ports:
  - port: 9200
    targetPort: 9200
    protocol: TCP
    name: http
  - port: 9300
    targetPort: 9300
    protocol: TCP
    name: nodePort
```

## Deploying the Elasticsearch Stack

After reviewing all configuration files, deploy the Elasticsearch stack by applying the Persistent Volume, StatefulSet, and Service configurations. First, confirm that all necessary files are present:

```
# List the files to ensure they are present
ls -lrt
# total 20
# -rw-r--r--  1 root root  184 Aug  6 14:18 kibana-service.yaml
# -rw-r--r--  1 root root  354 Aug  6 14:18 kibana-deployment.yaml
# -rw-r--r--  1 root root 1195 Aug  6 14:18 es-statefulset.yaml
# -rw-r--r--  1 root root  209 Aug  6 14:18 es-service.yaml
# -rw-r--r--  1 root root  105 Aug  6 14:18 es-pvolume.yaml
```

Apply the configuration files with the following commands:

```
kubectl apply -f es-pvolume.yaml
kubectl apply -f es-statefulset.yaml
kubectl apply -f es-service.yaml
# service/elasticsearch created
```

Next, monitor the status of the Elasticsearch pod:

```
kubectl get pods
# NAME             READY   STATUS              RESTARTS   AGE
kubectl get pods -w
# NAME             READY   STATUS    RESTARTS   AGE
# elasticsearch-0  1/1     Running   0          52s
```

To further troubleshoot or verify logs, run:

```
kubectl logs -f <pod-name>
```

An example snippet from the Elasticsearch pod logs might be:

```
{"elasticsearch.cluster.name":"docker-cluster"}
{"@timestamp":"2024-08-06T14:26:59.586Z","log.level":"INFO","message":"loaded module [wildcard]","ecs.version":"1.2.0","service.name":"ES_ECS","event.dataset":"elasticsearch.server"}
...
```

If no errors are reported, Elasticsearch is running correctly.

## Final Verification

Elasticsearch is now deployed in the "efk" namespace on Kubernetes. In the next lesson, we will deploy Kibana and demonstrate how to verify the Elasticsearch cluster status via the Kibana UI.

Thank you for following along. See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/79ef74c6-138f-4dd8-b5fb-e8a8050b59a5/lesson/610d0d20-face-4029-89db-d65c83a2abab)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/79ef74c6-138f-4dd8-b5fb-e8a8050b59a5/lesson/4cbae816-6bbc-48d4-9a75-4acaac81cccf)**
>
> Practice lab
