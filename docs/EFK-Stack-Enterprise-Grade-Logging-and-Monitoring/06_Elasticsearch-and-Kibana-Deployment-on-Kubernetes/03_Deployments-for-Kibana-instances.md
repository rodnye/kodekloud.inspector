# Deployments for Kibana instances - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Elasticsearch-and-Kibana-Deployment-on-Kubernetes/Deployments-for-Kibana-instances)

---

## Table of Contents

- Deployments for Kibana instances
  - 1. Verifying the Cluster Status
  - 2. Reviewing the Kibana Deployment Manifest
  - 3. Reviewing the Kibana Service Manifest
  - 4. Deploying Kibana
  - 5. Connecting to the Kibana UI
  - Conclusion
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Step 1: Apply the Deployment Manifest
    - Step 2: Apply the Service Manifest
    - Step 3: Verify the Pod Status
    - Testing Elasticsearch Connectivity

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Elasticsearch and Kibana Deployment on Kubernetes

# Deployments for Kibana instances

Hello and welcome back!

In this article, we will guide you through deploying a Kibana pod on your Kubernetes cluster. You will learn how to verify your cluster’s status, review the necessary deployment and service manifests, and confirm that Kibana connects effectively with Elasticsearch.

---

## 1\. Verifying the Cluster Status

Before proceeding, ensure your cluster is healthy by checking the status of your pods. Run the following command:

```
kubectl get pods
```

You should see output similar to this:

```
NAME                                READY   STATUS    RESTARTS   AGE
elasticsearch-0                     1/1     Running   0          2m50s
```

Next, verify that the required manifest files are available in your current working directory. List the files by executing:

```
ls -lrt
```

A sample output might be:

```
total 20
-rw-r--r--  1 root root   184 Aug  6 14:18 kibana-service.yaml
-rw-r--r--  1 root root   354 Aug  6 14:18 kibana-deployment.yaml
-rw-r--r--  1 root root  1195 Aug  6 14:18 es-statefulset.yaml
-rw-r--r--  1 root root   209 Aug  6 14:18 es-service.yaml
-rw-r--r--  1 root root   185 Aug  6 14:18 es-volume.yaml
```

---

## 2\. Reviewing the Kibana Deployment Manifest

The `kibana-deployment.yaml` file defines how Kubernetes should deploy the Kibana pod. Open the file to review its contents:

```
cat kibana-deployment.yaml
```

The manifest content is as follows:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: efk
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana:8.13.0
        ports:
        - containerPort: 5601
```

This manifest specifies:

- **Resource Kind:** A Deployment used to manage the lifecycle of the Kibana pod.
- **Namespace:** The `efk` namespace.
- **Replica Count:** A single instance (replica) of Kibana.
- **Container Configuration:** Utilizes the official Kibana Docker image from Elastic and exposes port 5601.

> [!important]
> **Note**
>
> Ensure that the versions of Elasticsearch and Kibana are compatible. Always review the corresponding release notes from Elastic before selecting your Docker image.

---

## 3\. Reviewing the Kibana Service Manifest

The `kibana-service.yaml` file exposes Kibana using a NodePort. Open and inspect the service manifest:

```
cat kibana-service.yaml
```

The manifest content should appear as:

```
apiVersion: v1
kind: Service
metadata:
  name: kibana
  namespace: efk
spec:
  type: NodePort
  selector:
    app: kibana
  ports:
    - protocol: TCP
      port: 5601
      nodePort: 30601
```

This service configuration:

- Uses the **NodePort** type to make Kibana accessible externally.
- Routes traffic from the cluster’s internal port 5601 to the node’s port 30601.
- Targets pods labeled with `app: kibana` in the `efk` namespace.

> [!important]
> **Important**
>
> By default, the Kibana Docker image searches for Elasticsearch within the same namespace. Ensure that Elasticsearch is deployed in the `efk` namespace to allow automatic connection.

---

## 4\. Deploying Kibana

### Step 1: Apply the Deployment Manifest

Deploy the Kibana pod by applying the deployment manifest:

```
kubectl apply -f kibana-deployment.yaml
```

A successful operation will confirm with a message similar to:

```
deployment.apps/kibana created
```

### Step 2: Apply the Service Manifest

Next, expose the Kibana pod by applying the service manifest:

```
kubectl apply -f kibana-service.yaml
```

You should see an output like:

```
service/kibana created
```

### Step 3: Verify the Pod Status

Clear your terminal and run the following command to check the status of the pods:

```
kubectl get pods
```

The output may resemble:

```
NAME                                READY   STATUS              RESTARTS   AGE
elasticsearch-0                     1/1     Running             0          4m47s
kibana-5bf7c766b4-pgdz              0/1     ContainerCreating   0          14s
```

Wait a minute or two for the Kibana pod to transition to the **Running** state. To monitor the progress in real-time, use:

```
kubectl get pods -w
```

Once the pod shows as running, proceed to verify your services:

```
kubectl get svc
```

A sample output might be:

```
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
elasticsearch   NodePort    10.96.188.157   <none>        9200:32000/TCP,9300:30300/TCP     5m30s
kibana          NodePort    10.103.134.155  <none>        5601:30601/TCP                  55s
```

> [!important]
> **Deployment Tip**
>
> Depending on your specific requirements, you might consider using a load balancer instead of NodePort for production environments.

---

## 5\. Connecting to the Kibana UI

Follow these steps to access the Kibana user interface:

1.  **Identify the NodePort:** In our example, the NodePort is **30601**.
2.  **Access through Browser:** Open your web browser and enter the following URL, replacing `<NODE_IP>` with the IP address of your node:

    http://<NODE_IP>:30601

Once the Kibana UI loads, click on **"Explore on my own"** (or a similar option) and proceed to the **"Dev Tools"** section. This interactive console allows you to run queries against the connected Elasticsearch cluster.

### Testing Elasticsearch Connectivity

Use the Dev Tools console in Kibana to execute the following commands:

1.  **Run a Search Query:**

    ```
    GET _search
    {
      "query": {
        "match_all": {}
      }
    }
    ```

2.  **Check Cluster Health:**

    Clear the previous output and run:

    ```
    GET /_cluster/health
    ```

A successful response will be similar to:

```
{
  "cluster_name": "docker-cluster",
  "status": "green",
  "timed_out": false,
  "number_of_nodes": 1,
  "number_of_data_nodes": 1,
  "active_primary_shards": 28,
  "active_shards": 28,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 0,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 100
}
```

A status of **green** means your Elasticsearch cluster is healthy and that Kibana is properly connected.

---

## Conclusion

In this guide, you learned how to deploy and expose Kibana on your Kubernetes cluster within the `efk` namespace. By carefully following the verification, deployment, and connectivity tests, you can replicate this setup in your environment—whether on-premises or in the cloud.

Happy deploying, and see you in the next article!

---

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kibana Documentation](https://www.elastic.co/guide/en/kibana/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/)

If you have any questions, feel free to consult the linked resources or reach out for further assistance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/79ef74c6-138f-4dd8-b5fb-e8a8050b59a5/lesson/b27a24c8-3103-4a19-b9c8-8267d53d3237)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/79ef74c6-138f-4dd8-b5fb-e8a8050b59a5/lesson/f2aed817-c481-4f3e-8b53-a4221749ef8c)**
>
> Practice lab
