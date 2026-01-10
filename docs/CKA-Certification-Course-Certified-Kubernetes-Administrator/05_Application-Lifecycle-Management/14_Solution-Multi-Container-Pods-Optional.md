# Solution Multi Container Pods Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Multi-Container-Pods-Optional)

---

## Table of Contents

- Solution Multi Container Pods Optional
  - Identifying Containers in Pods
  - Creating a Multi-Container Pod
  - Setting Up a Simple Logging Application
  - Adding a Sidecar Container for Log Shipping
  - Verifying Logs in Kibana
  - Watch Video
    - Red Pod
    - Blue Pod
    - Generating the Pod Manifest
    - Editing the Manifest
    - Inspecting the Application Pod
    - Editing the Pod for a Sidecar

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Solution Multi Container Pods Optional

In this guide, we explore a lab exercise on multi-container pods in Kubernetes. We will inspect pods to determine the number of containers contained, create a multi-container pod, and update an existing pod by adding a sidecar container that ships logs to Elasticsearch. All diagrams have been retained in their original placements.

---

## Identifying Containers in Pods

Understanding the container composition within each pod is a critical first step.

### Red Pod

Begin by inspecting the red pod to determine the total number of containers. In the cluster, observe that the "READY" column displays the number of containers versus those that are ready. In this example, there are three containers. You can verify this by running the command:

```
kubectl describe pod red
```

In the output, under "Containers", you will see entries for "apple", "wine", and "scarlet" that confirm the existence of three distinct containers. Below is an excerpt of the container details for the red pod:

```
Containers:
  apple:
    Container ID: busybox
    Image: busybox
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      - sleep
      - "4500"
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      - /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7sggv (ro)
  wine:
    Container ID: busybox
    Image: busybox
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      - sleep
      - "4500"
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      - /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7sggv (ro)
  scarlet:
    Container ID: busybox
    Image: busybox
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      ...
```

### Blue Pod

For the blue pod, inspect the container details similarly. This pod includes two containers, "teal" and "navy". The command below confirms their configuration:

```
kubectl describe pod blue
```

The output will include details similar to:

```
Node: controlplane/10.40.119.6
Start Time: Sun, 17 Apr 2022 18:16:47 +0000
Labels: <none>
Annotations: <none>
Status: Pending
IP:
IPs: <none>
Containers:
  teal:
    Container ID:
    Image: busybox
    Image ID:
    Port: <none>
    Host Port: <none>
    Command:
      - sleep
      - "4500"
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      - /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6qm72 (ro)
  navy:
    Container ID:
    Image: busybox
    Image ID:
    Port: <none>
    Host Port: <none>
    Command:
      - sleep
      - "4500"
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      - /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6qm72 (ro)
```

---

## Creating a Multi-Container Pod

The next task involves creating a multi-container pod with two containers that conform to the following specifications:

- **Pod Name:** yellow
- **Container 1:**
  - Uses the BusyBox image
  - Renamed to **lemon** (instead of inheriting the pod name)
  - Optionally runs the command `sleep 1000`
- **Container 2:**
  - Uses the Redis image
  - Named **gold**

An image summarizing this task is provided below:

![The image shows a task to create a multi-container pod with two containers using specified images, with instructions to handle a crashloopbackoff error.](https://kodekloud.com/kk-media/image/upload/v1752869673/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_80.jpg)

### Generating the Pod Manifest

First, generate a YAML manifest for a pod with a single container using a dry-run command:

```
k run yellow --image=busybox --dry-run=client -o yaml > yellow.yaml
```

The generated YAML will resemble:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: yellow
  name: yellow
spec:
  containers:
  - image: busybox
    name: yellow
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

### Editing the Manifest

Modify the YAML file to change the first container's name from **yellow** to **lemon**, add the sleep command, and include a second container named **gold** with the Redis image:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: yellow
  name: yellow
spec:
  containers:
  - image: busybox
    name: lemon
    resources: {}
    command: ["sleep", "1000"]
  - image: redis
    name: gold
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

Apply the manifest to create the pod. After the pod is created, verify that it contains two containers: one running BusyBox (with the specified sleep command) and the other running Redis.

> [!important]
> **Verification Tip**
>
> After deploying the pod, use `kubectl get pods` and `kubectl describe pod yellow` to ensure that both containers are correctly configured and running.

---

## Setting Up a Simple Logging Application

Next, we will set up a logging application within the **elastic-stack** namespace. This setup is composed of the following components:

- **Application Pod (app):** Simulates events and outputs logs.
- **Elasticsearch Pod:** Stores logs.
- **Kibana Pod:** Visualizes the logs.

First, list all pods in the `elastic-stack` namespace:

```
k get pods -n elastic-stack
```

The expected output is:

```
NAME           READY   STATUS    RESTARTS   AGE
app            1/1     Running   0          5m31s
elastic-search 1/1     Running   0          5m31s
kibana         1/1     Running   0          5m30s
```

### Inspecting the Application Pod

Review the details of the application pod to determine where logs are stored. The pod uses the `kodekloud/event-simulator` image, and its logs are written to a file (for example, `/log/app.log`). To inspect the pod, run:

```
kubectl describe pod app -n elastic-stack
```

You can also view the logs directly by using:

```
kubectl logs app -n elastic-stack
```

Within these logs, search for entries indicating login issues, such as:

```
[2022-04-17 18:21:58,698] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
```

This indicates that **USER5** is experiencing login problems.

To further confirm the logs stored on disk within the pod, execute:

```
kubectl -n elastic-stack exec -it app -- cat /log/app.log
```

---

## Adding a Sidecar Container for Log Shipping

To enable log shipping to Elasticsearch, update the `app` pod to include a sidecar container. This sidecar, named **sidecar**, uses a custom Filebeat image (`kodekloud/filebeat-configured`) and shares the same log volume as the application container.

An image illustrating the pod configuration with the Filebeat sidecar is shown below:

![The image shows a Kubernetes setup with a pod containing an app and a sidecar Filebeat container, sending logs to Elasticsearch and visualized in Kibana.](https://kodekloud.com/kk-media/image/upload/v1752869674/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_580.jpg)

### Editing the Pod for a Sidecar

Edit the pod manifest in the `elastic-stack` namespace:

```
kubectl edit pod app -n elastic-stack
```

Then update the YAML to include the sidecar container. Ensure that the volume mounts for logging refer to the same volume:

```
apiVersion: v1
kind: Pod
metadata:
  name: app
  namespace: elastic-stack
  labels:
    name: app
spec:
  containers:
  - name: sidecar
    image: kodekloud/filebeat-configured
    volumeMounts:
      - mountPath: /var/log/event-simulator/
        name: log-volume
  - name: app
    image: kodekloud/event-simulator
    imagePullPolicy: Always
    volumeMounts:
      - mountPath: /log
        name: log-volume
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-wnzb6
        readOnly: true
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

> [!important]
> **Important Note**
>
> Pod updates do not allow adding or removing containers directly. If you encounter an error during the update (e.g., "pods 'app' is invalid"), save your changes and force a replacement with:
>
> ```
> kubectl replace --force -f /tmp/kubectl-edit-3922970489.yaml
> ```
>
> This command will delete and recreate the pod using the updated manifest.

Once updated, the pod will have two containers:

- **Application Container:** Writes logs to `/log`.
- **Filebeat Sidecar:** Reads the logs and ships them to Elasticsearch.

---

## Verifying Logs in Kibana

After applying the changes, verify that logs are being shipped to and visualized in Kibana. Follow these steps:

1.  Open the Kibana UI.
2.  When prompted, create an index pattern (e.g., `filebeat-*` or as instructed in your lab).
3.  Set the time filter field name if required.
4.  Click "Start" or "Create" to finalize the index pattern.

The screenshot below shows the index pattern creation interface:

![The image shows a Kibana interface for creating an index pattern, with a successful match for "filebeat-6.4.2-2022.04.17" and navigation options on the left.](https://kodekloud.com/kk-media/image/upload/v1752869676/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_840.jpg)

Then, navigate to the "Discover" section to view the logs:

![The image shows a Kibana interface displaying index patterns, listing fields with their types, formats, and properties like searchable and aggregatable.](https://kodekloud.com/kk-media/image/upload/v1752869677/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_850.jpg)

Additional dashboards will highlight:

- Log entries with timestamps and corresponding messages.
- Detailed event information, including user actions, warnings, and order failures.

![The image shows a log management interface displaying log entries with timestamps, sources, and messages, likely from a system monitoring tool.](https://kodekloud.com/kk-media/image/upload/v1752869679/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_870.jpg)

![The image shows a log file interface displaying various event logs, including warnings and information about user actions and system events, with timestamps and source details.](https://kodekloud.com/kk-media/image/upload/v1752869680/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Multi-Container-Pods-Optional/frame_890.jpg)

With these steps completed, logs from the application are successfully forwarded to Elasticsearch and visualized in Kibana. This configuration can be extended to scale across multiple pods or deployments within your Kubernetes environment.

---

That concludes our guide on multi-container pods and log shipping in Kubernetes. Happy learning!

For further information, consider visiting the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/4b832f3b-d0c8-4358-b573-1deb7975dc7e)**
>
> Watch video content
