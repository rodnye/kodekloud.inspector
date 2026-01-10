# Setting up Fluentbit to Monitor Application Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Deploying-E-Commerce-Application-on-K8s/Setting-up-Fluentbit-to-Monitor-Application-Logs)

---

## Table of Contents

- Setting up Fluentbit to Monitor Application Logs
  - Listing the Fluent Bit Files
  - DaemonSet for Fluent Bit
  - ConfigMap: Fluent Bit Configuration and Parsers
  - ServiceAccount for Fluent Bit
  - ClusterRole for Fluent Bit
  - Deploying Fluent Bit
  - Verifying Fluent Bit Logging
  - Next Steps
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Deploying E Commerce Application on K8s

# Setting up Fluentbit to Monitor Application Logs

Welcome to this lesson. In the previous lesson, we successfully installed our Event Generator App. In this session, we configure Fluent Bit to monitor application logs. All configuration files are located in the current working directory, and each file plays a crucial role in deploying Fluent Bit on your Kubernetes cluster.

---

## Listing the Fluent Bit Files

First, let's list the files related to Fluent Bit:

```
controlplane efk-stack/event-generator on ⎈ main ➜ ls -lrt
total 24
-rw-r--r-- 1 root root  372 Jun 29 13:49 webapp-fluent-bit.yaml
-rw-r--r-- 1 root root 2245 Jun 29 13:49 fluent-bit.yaml
-rw-r--r-- 1 root root  112 Jun 29 13:49 fluent-bit-sa.yaml
-rw-r--r-- 1 root root 1400 Jun 29 13:49 fluent-bit-configmap.yaml
-rw-r--r-- 1 root root  181 Jun 29 13:49 fluent-bit-clusterrole.yaml
-rw-r--r-- 1 root root  260 Jun 29 13:49 fluent-bit-clusterrolebinding.yaml
```

Each file is responsible for different configuration aspects of Fluent Bit—from deploying a DaemonSet to specifying the ServiceAccount, ConfigMap, and RBAC permissions.

---

## DaemonSet for Fluent Bit

The `fluent-bit.yaml` file creates a DaemonSet in the `efk` namespace. This DaemonSet deploys Fluent Bit on every node, ensuring that logs are collected consistently. Below is an excerpt from the file:

```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: efk
  labels:
    app.kubernetes.io/instance: fluent-bit
    app.kubernetes.io/name: fluent-bit
spec:
  selector:
    matchLabels:
      app.kubernetes.io/instance: fluent-bit
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: fluent-bit
        app.kubernetes.io/name: fluent-bit
    spec:
      volumes:
      - name: config
        configMap:
          name: fluent-bit
          defaultMode: 420
      containers:
      - name: varlog
        image: varlibdockercontainers
        hostPath:
          path: /var/log
          type: Directory
```

This configuration mounts the ConfigMap named “fluent-bit” as a volume to drive the Fluent Bit configuration within each pod.

---

## ConfigMap: Fluent Bit Configuration and Parsers

The ConfigMap (`fluent-bit-configmap.yaml`) defines how Fluent Bit processes logs, sets service parameters, and configures inputs, filters, and outputs. A custom parser `docker_no_time` is defined to correctly handle Docker JSON logs. Here is the consolidated configuration:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit
  namespace: efk
data:
  custom_parsers.conf: |
    [PARSER]
        Name docker_no_time
        Format json
        Time_Keep Off
        Time_Key time
        Time_Format %Y-%m-%dT%H:%M:%S.%L
  fluent-bit.conf: |
    [SERVICE]
        Daemon Off
        Flush 1
        Log_Level info
        Parsers_File /fluent-bit/etc/parsers.conf
        Parsers_File /fluent-bit/etc/conf/custom_parsers.conf
        HTTP_Server On
        HTTP_Listen 0.0.0.0
        HTTP_Port 2020
        Health_Check On


    [INPUT]
        Name tail
        Path /var/log/containers/app-event-simulator*.log
        Multiline.parser docker, cri
        Tag kube.*
        Mem_Buf_Limit 5MB
        Skip_Long_Lines On


    [INPUT]
        Name systemd
        Tag host.*
        Systemd_Filter _SYSTEMD_UNIT=kubelet.service
        Read_From_Tail On


    [FILTER]
        Name kubernetes
        Match kube.*
        Merge_Log On
        Keep_Log Off
        K8S-Logging.Parser On
        K8S-Logging.Exclude On


    [OUTPUT]
        Name es
        Match kube.*
        Host elasticsearch
        Logstash_Format On
        Retry_Limit False
        Suppress_Type_Name On


    [OUTPUT]
        Name es
        Match host.*
        Host elasticsearch
        Logstash_Format On
        Logstash_Prefix node
        Retry_Limit False
        Suppress_Type_Name On
```

Key points in this configuration:

- The \[SERVICE\] section sets global properties such as flush intervals, log level, and HTTP server settings used for health checks.
- The \[INPUT\] sections define sources: one tailing container logs and one collecting systemd logs (filtered for `kubelet.service`).
- The \[FILTER\] section enriches logs with Kubernetes metadata and handles merging and parsing.
- The \[OUTPUT\] sections forward logs to Elasticsearch with proper formatting and connection parameters.

---

## ServiceAccount for Fluent Bit

The ServiceAccount defined in `fluent-bit-sa.yaml` ensures that Fluent Bit can authenticate with the Kubernetes API for log metadata collection:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: fluent-bit
  namespace: efk
  labels:
    app: fluent-bit
```

---

## ClusterRole for Fluent Bit

To grant Fluent Bit the necessary permissions to access Kubernetes resources, a ClusterRole is defined in `fluent-bit-clusterrole.yaml`. This role grants comprehensive access to the required resources:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fluent-bit
  labels:
    app: fluent-bit
rules:
- apiGroups:
  - "*"
  resources:
  - "*"
  verbs:
  - "*"
```

The corresponding ClusterRoleBinding (in `fluent-bit-clusterrolebinding.yaml`) binds this role to the Fluent Bit ServiceAccount.

---

## Deploying Fluent Bit

With all configuration files in place, deploy Fluent Bit with the following command:

```
kubectl apply -f .
```

The expected output should be similar to:

```
clusterrole.rbac.authorization.k8s.io/fluent-bit created
configmap/fluent-bit created
serviceaccount/fluent-bit created
daemonset.apps/fluent-bit created
pod/app-event-simulator configured
clusterrolebindings.rbac.authorization.k8s.io/fluent-bit created
```

> [!important]
> **Note**
>
> Since the Event Generator App is already deployed, only the Fluent Bit configuration is updated without redeploying the app.

---

## Verifying Fluent Bit Logging

To ensure Fluent Bit is running and correctly processing logs, follow these steps:

1.  Check the pods:

    ```
    kubectl get pods
    ```

2.  View the logs of a Fluent Bit pod:

    ```
    kubectl logs -f fluent-bit-9729l
    ```

Example output:

```
2023/06/29 13:59:04] [info] [fluent bit] version=3.0.3, commit=3529bbb132, pid=1
[2023/06/29 13:59:04] [info] [storage] ver=1.5.2, type=memory, sync=normal, checksum=off, max_chunks_up=128
[2023/06/29 13:59:04] [info] [metrics] version=0.9.0
[2023/06/29 13:59:04] [info] [ctraces] version=0.5.1
[2023/06/29 13:59:04] [info] [input:tail:0] initializing
[2023/06/29 13:59:04] [info] [input:tail:0] storage_strategy='memory' (memory only)
[2023/06/29 13:59:04] [info] [input:tail:1] initializing
[2023/06/29 13:59:04] [info] [input:tail:1] storage_strategy='memory' (memory only)
[2023/06/29 13:59:04] [info] [input:stdin:0] multi line co started
[2023/06/29 13:59:04] [info] [filter:kubernetes:kubernetes.0] token updated
[2023/06/29 13:59:04] [info] [filter:kubernetes:kubernetes.0] local PDB info OK
[2023/06/29 13:59:04] [info] [filter:kubernetes:kubernetes.0] testing connectivity with API server...
[2023/06/29 13:59:04] [warn] [filter:kubernetes:kubernetes.0] could not get meta for POD fluent-bit-9729l
[2023/06/29 13:59:04] [error] [input:tail:0] notify_fs_add(): inode=52465099 watch_fd=1 name=/var/log/containers/app_event-simulator_efk_app-f1020-2020
```

This output indicates that Fluent Bit is properly collecting logs and will soon forward them to Elasticsearch.

---

## Next Steps

In the next lesson, we will explore how to visualize the log data in Kibana, confirming that logs are successfully reaching Elasticsearch via Fluent Bit.

Happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/b1b021b3-26c0-4701-aa90-d98fd3d8dc49/lesson/58247a38-3003-418c-b21e-c278cccd74e0)**
>
> Watch video content
