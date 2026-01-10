# Solution Multi Container Pods Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Multi-Container-Pods/Solution-Multi-Container-Pods-Optional)

---

## Table of Contents

- Solution Multi Container Pods Optional
  - Identifying Containers in the Red Pod
  - Identifying Containers in the Blue Pod
  - Creating a Multi-Container Pod (Yellow Pod)
  - Exploring the Elastic Stack Logging Setup
  - Investigating the Application Pod
  - Adding a Sidecar Container for Log Shipping to Elasticsearch
  - Verifying Logs in Kibana
  - Watch Video
    - Step 1: Generate the Base Pod Definition
    - Step 2: Update the YAML
    - Verifying the Yellow Pod
    - Inspecting the Kibana UI
    - Editing the App Pod Definition
    - Updating the Pod

---

## Content

Certified Kubernetes Application Developer - CKAD

Multi Container Pods

# Solution Multi Container Pods Optional

In this article, we review a lab exercise on multi-container pods. The lab demonstrates how to identify container counts in pods, create multi-container pods using specified images, and add a sidecar container to forward logs to Elasticsearch. This step-by-step guide will help you understand these concepts and implement them in your Kubernetes environment.

---

## Identifying Containers in the Red Pod

To determine the number of containers in the red pod, you have two options:

1.  Check the "READY" column in the pod listing—the numbers indicate total containers versus how many are ready.
2.  Use the `describe` command to inspect the pod details. In the output, look for the "Containers:" section. For example, the following YAML snippet shows three container entries named `apple`, `wine`, and `searle`:

```
Containers:
  apple:
    Container ID: busybox
    Image: <none>
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      sleep
      4500
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7sggv (ro)
  wine:
    Container ID: busybox
    Image: <none>
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      sleep
      4500
    State: Waiting
    Reason: ContainerCreating
    Ready: False
    Restart Count: 0
    Environment: <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7sggv (ro)
  searle:
    Container ID: busybox
    Image: <none>
    Image ID: <none>
    Port:
    Host Port: <none>
    Command:
      <none>
```

Both methods confirm that the red pod contains three containers.

---

## Identifying Containers in the Blue Pod

Next, determine the container names in the blue pod. Examining its details reveals two containers, named `teal` and `navy`. Below is an excerpt of the pod details:

```
Node:                          controlplane/10.40.119.6
Start Time:                    Sun, 17 Apr 2022 18:16:47 +0000
Labels:                        <none>
Annotations:                   <none>
Status:                        Pending
IP:                            <none>
IPs:                           <none>
Containers:
  teal:
    Container ID:
    Image:                     busybox
    Image ID:                  <none>
    Port:                      <none>
    Host Port:                 <none>
    Command:
    - sleep
    - '4500'
    State:                      Waiting
    Reason:                     ContainerCreating
    Ready:                      False
    Restart Count:              0
    Environment:                <none>
    Mounts:                    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6qm72 (ro)
  navy:
    Container ID:
    Image:                     busybox
    Image ID:                  <none>
    Port:                      <none>
    Host Port:                 <none>
    Command:
    - sleep
    - '4500'
    State:                      Waiting
    Reason:                     ContainerCreating
    Ready:                      False
    Restart Count:              0
    Environment:                <none>
    Mounts:                    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6qm72 (ro)
```

This confirms that the blue pod runs two containers: `teal` and `navy`.

---

## Creating a Multi-Container Pod (Yellow Pod)

The next task is to create a multi-container pod named **yellow** that includes two containers. Follow these specifications:

- **Container 1**: Named **lemon**, uses the `busybox` image with a sleep command (`sleep 1000`) to prevent a CrashLoopBackOff state.
- **Container 2**: Named **gold**, uses the `redis` image.

An image from the lab instructions illustrates these details:

![The image shows a task to create a multi-container pod with two containers using specified images, with instructions to handle a crashloopbackoff error.](https://kodekloud.com/kk-media/image/upload/v1752871235/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Multi-Container-Pods-Optional/frame_90.jpg)

### Step 1: Generate the Base Pod Definition

Run the following command using dry run to generate a YAML definition for the pod:

```
kubectl run yellow --image=busybox --dry-run=client -o yaml
```

The command produces a YAML definition similar to this:

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

### Step 2: Update the YAML

Rename the first container from **yellow** to **lemon** and add the sleep command. Then, include a second container named **gold** with the `redis` image. The updated YAML should look like this:

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

Save this file (e.g., as `yellow.yaml`) and apply the configuration:

```
kubectl apply -f yellow.yaml
```

### Verifying the Yellow Pod

After the pod is created, verify the status with:

```
kubectl get pods
```

You should see the yellow pod with two containers: **lemon** (busybox) running with `sleep 1000` and **gold** (redis).

---

## Exploring the Elastic Stack Logging Setup

This section covers the deployment of a simple application and a logging stack within the **elastic-stack** namespace. The deployment includes:

- **app** pod (running the event simulator)
- **elastic-search** pod
- **kibana** pod

Wait until all pods are in the running state:

```
kubectl get pods -n elastic-stack
```

Expected output:

```
root@controlplane ~ # kubectl get pods -n elastic-stack
NAME              READY   STATUS    RESTARTS   AGE
app               1/1     Running   0          5m31s
elastic-search    1/1     Running   0          5m31s
kibana            1/1     Running   0          5m30s
```

### Inspecting the Kibana UI

Once the pods are up and running, open the Kibana UI using the link provided above your terminal. Kibana serves as the dashboard for viewing the logs gathered by Elasticsearch. Elasticsearch collects log data—such as metrics and application logs—and Kibana visualizes them.

To view logs from Kibana, run:

```
kubectl -n elastic-stack logs kibana
```

---

## Investigating the Application Pod

Next, examine the **app** pod to verify its container configuration and image details. The **app** pod runs a single container with an event simulator that sends log messages to `/log/app.log`. An excerpt from its description is shown below:

```
Priority: 0
Node: controlplane/10.40.119.6
Start Time: Sun, 17 Apr 2022 18:14:50 +0000
Labels:
  name: app
Annotations: <none>
Status: Running
IPs:
  IP: 10.244.0.4
Containers:
  Container ID: docker://2770f0362307539e774d768fea3a27327257b7be7b460aad978a91c26bfb7c
  Image: kodekloud/event-simulator
  Image ID: docker-pullable://kodekloud/event-simulator@sha256:1e3e9c72136bbc76c96dd98f29c04f298c3ae241c7d44e2bf70bcc209b030bf9
  Port: <none>
  Host Port: <none>
  State: Running
  Started: Sun, 17 Apr 2022 18:15:06 +0000
  Ready: True
  Restart Count: 0
  Environment: <none>
  Mounts:
    /log from log-volume (rw)
    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-wnzb6 (ro)
Conditions:
  Type               Status
  Initialized        True
  Ready              True
  ContainersReady    True
  PodScheduled       True
Volumes:
  log-volume:
    Type:     HostPath (bare host directory volume)
    Path:     /var/log/webapp
    HostPathType: DirectoryOrCreate
  kube-api-access-wnzb6:
    Type:     Projected (a volume that contains injected data from multiple sources)
```

The event simulator writes its logs to `/log/app.log`. To view the log entries directly within the pod, execute:

```
kubectl -n elastic-stack exec -it app -- cat /log/app.log
```

Inspect the log entries to identify any user issues. For example, the logs indicate that **USER5** experienced login problems due to the account being locked after multiple failed attempts:

```
[2022-04-17 18:21:57,696] INFO in event-simulator: USER4 is viewing page3
[2022-04-17 18:21:58,698] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
...
```

Thus, the problematic user is **USER5**.

---

## Adding a Sidecar Container for Log Shipping to Elasticsearch

To forward logs from the **app** pod to Elasticsearch, a sidecar container must be added. This container, named **sidecar**, utilizes a custom Fluent Bit image (configured similarly to Filebeat) to read logs from a shared volume and forward them to Elasticsearch.

### Editing the App Pod Definition

The current definition of the **app** pod includes only the event simulator container. To implement log forwarding, modify the pod definition to include both the event simulator and the sidecar container, ensuring that they share the same volume.

Below is an example YAML snippet with the updated configuration:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: "2022-04-17T18:14:50Z"
  labels:
    name: app
  name: app
  namespace: elastic-stack
  resourceVersion: "1217"
  uid: 1d0aca45-2fd7-4c79-a6e3-e0c744e2dd3f
spec:
  containers:
    - image: kodekloud/filebeat-configured
      name: sidecar
      volumeMounts:
        - mountPath: /var/log/event-simulator/
          name: log-volume
    - image: kodekloud/event-simulator
      name: app
      imagePullPolicy: Always
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        - mountPath: /log
          name: log-volume
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: controlplane
  preemptionPolicy: PreemptLowerPriority
  priority: 0
```

In this configuration:

- The **sidecar** container mounts `log-volume` at `/var/log/event-simulator/` (where Filebeat expects the logs).
- The **app** container writes logs to `/log`.

### Updating the Pod

Since Kubernetes does not permit the modification of container sets on a live pod, you must force replace the existing pod with the updated YAML. If you try to edit the pod interactively, you might see an error similar to:

> [!important]
> **Warning**
>
> Editing an existing pod to add or remove containers is not allowed. Instead, update the configuration file and force replace the pod.

To apply the changes, use the force replace command:

```
kubectl replace --force -f /tmp/kubectl-edit-3922970489.yaml
```

The output should confirm the replacement:

```
pod "app" deleted
pod/app replaced
```

Finally, verify the pod status:

```
kubectl get pods -n elastic-stack
```

---

## Verifying Logs in Kibana

After updating the **app** pod with the sidecar container, open the Kibana UI to confirm that logs are flowing into the Discover section. Follow these steps:

1.  Create an index pattern in Kibana (for example, `filebeat-*`).
2.  Configure the time filter as needed.
3.  Navigate to the Discover section to view the log entries.

The following image shows the Kibana interface for creating an index pattern:

![The image shows a Kibana interface for creating an index pattern, with a successful match for one index named "filebeat-6.4.2-2022.04.17".](https://kodekloud.com/kk-media/image/upload/v1752871236/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Multi-Container-Pods-Optional/frame_840.jpg)

Once the index pattern is established, view the logs in the Discover section:

![The image shows a log management interface displaying event logs with timestamps, sources, messages, and other metadata related to user activities on a system.](https://kodekloud.com/kk-media/image/upload/v1752871239/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Multi-Container-Pods-Optional/frame_880.jpg)

This confirms that logs from the **app** pod are successfully forwarded to Elasticsearch and visualized in Kibana.

---

This concludes the guide on setting up multi-container pods and integrating a sidecar container for log shipping to Elasticsearch. Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c679b7ba-0bdd-4f3d-b4a6-296d299406fe/lesson/c8ae4065-e58a-49ea-92cd-a9a766e0a3ea)**
>
> Watch video content
