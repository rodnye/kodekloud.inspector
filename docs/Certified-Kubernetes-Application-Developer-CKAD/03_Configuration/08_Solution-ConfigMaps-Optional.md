# Solution ConfigMaps Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Solution-ConfigMaps-Optional)

---

## Table of Contents

- Solution ConfigMaps Optional
  - 1. Determining the Number of Pods
  - 2. Identifying the Environment Variable in the Pod
  - 3. Verifying the Environment Variable Value
  - 4. Viewing the Web Application
  - 5. Updating the Environment Variable for a Green Background
  - 6. Listing ConfigMaps in the Default Namespace
  - 7. Identifying the Database Host in the ConfigMap
  - 8. Creating a New ConfigMap for the Webapp-Color Pod
  - 9. Updating the Pod to Use the New ConfigMap
  - 10. Verifying the Updated Web Application
  - Watch Video
    - 5.1 Exporting the Current Pod YAML
    - 5.2 Deleting the Current Pod
    - 5.3 Modifying and Applying the Pod Configuration
    - 9.1 Deleting the Existing Pod
    - 9.2 Modifying the Pod YAML

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Solution ConfigMaps Optional

Hi, I'm Sanjeev, one of the co-instructors for this course. In this lesson, we will walk through the solution for the ConfigMap section of the assignment in a step-by-step manner.

─────────────────────────────

## 1\. Determining the Number of Pods

Begin by checking how many pods are currently running in your system. Execute the following command:

```
controlplane ~ ➜ kubectl get pods
NAME            READY   STATUS    RESTARTS   AGE
webapp-color    1/1     Running   0          54s
controlplane ~ ➜
```

This confirms that there is one active pod, named **webapp-color**.

─────────────────────────────

## 2\. Identifying the Environment Variable in the Pod

Next, determine which environment variable is configured in the container by describing the pod:

```
kubectl describe pod webapp-color
```

Search for the **Environment** section in the output. An example excerpt might look like:

```
IP:
  10.42.0.9
Containers:
  webapp-color:
    Container ID:   containerd://750b751f5351c7edbaaaaf33e77d8f9709ed85ea4862914bbe4d79c1254b54fb7
    Image:          kodekloud/webapp-color
    Image ID:       docker.io/kodekloud/webapp-color@sha256:99c3821ea49b89c7a22d3eebab5c2e1ec651452e7675af2434850
    Port:           <none>
    Host Port:      <none>
    State:          Running
    Started:        Wed, 27 Jul 2022 05:21:49 +0000
    Ready:          True
    Restart Count:  0
    Environment:
      APP_COLOR: pink
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-rs7nh (ro)
```

From the **Environment** section, note that the variable **APP_COLOR** is set (ensure you select the correct one if multiple similar names are present).

─────────────────────────────

## 3\. Verifying the Environment Variable Value

Verify the value of the **APP_COLOR** variable. The output above indicates that its value is **pink**.

─────────────────────────────

## 4\. Viewing the Web Application

Click on the web app color tab to open the application in your browser. When the page loads, you should see the application displaying the color corresponding to the **APP_COLOR** value (in this case, pink). Once confirmed, click **OK** to proceed.

![The image shows a KodeKloud practice test interface for Kubernetes, with a terminal and a question about setting an environment variable name in a pod container.](https://kodekloud.com/kk-media/image/upload/v1752871156/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-ConfigMaps-Optional/frame_30.jpg)

─────────────────────────────

## 5\. Updating the Environment Variable for a Green Background

The next task is to update the pod configuration so that the background changes to green. This involves deleting and recreating the pod with the necessary modification while keeping the pod name unchanged.

### 5.1 Exporting the Current Pod YAML

First, verify the pod again:

```
controlplane ~ ➜ kubectl get pods
NAME            READY   STATUS    RESTARTS   AGE
webapp-color    1/1     Running   0          8m40s
```

Then, export the pod configuration to a file:

```
kubectl get pod webapp-color -o yaml > pod.yaml
```

### 5.2 Deleting the Current Pod

Remove the running pod to make way for the updated configuration:

```
kubectl delete pod webapp-color
pod "webapp-color" deleted
```

### 5.3 Modifying and Applying the Pod Configuration

Open the exported **pod.yaml** file in your favorite text editor, such as using `vi`:

```
vi pod.yaml
```

Locate the **env** section under the container definition and change the value of **APP_COLOR** from **pink** to **green**. Save your modifications.

Apply the updated configuration:

```
kubectl apply -f pod.yaml
```

Finally, verify that the pod is running and that the background has changed to green.

![The image shows a KodeKloud practice test interface for Kubernetes, instructing to update a pod's environment variable to display a green background.](https://kodekloud.com/kk-media/image/upload/v1752871157/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-ConfigMaps-Optional/frame_120.jpg)

─────────────────────────────

## 6\. Listing ConfigMaps in the Default Namespace

To determine how many ConfigMaps are available in the default namespace, run:

```
kubectl get cm
```

The expected output is:

```
NAME               DATA   AGE
kube-root-ca.crt   1      20m
db-config          3      50s
```

This output shows there are two ConfigMaps.

─────────────────────────────

## 7\. Identifying the Database Host in the ConfigMap

Next, identify the database host by inspecting the ConfigMap named **db-config**:

```
kubectl describe cm db-config
```

Within the **Data** section of the output, you might find:

```
Data
====
DB_PORT:   3306
DB_HOST:   SQL01.example.com
DB_NAME:   SQL01
```

Here, **DB_HOST** is set to **SQL01.example.com**.

─────────────────────────────

## 8\. Creating a New ConfigMap for the Webapp-Color Pod

Create a new ConfigMap named **webapp-config-map** that defines the **APP_COLOR** variable with a value of **darkblue** by executing:

```
kubectl create cm webapp-config-map --from-literal=APP_COLOR=darkblue
```

Verify that the new ConfigMap has been created successfully.

─────────────────────────────

## 9\. Updating the Pod to Use the New ConfigMap

The next step is to update the **webapp-color** pod so that it sources the **APP_COLOR** environment variable from the new ConfigMap.

### 9.1 Deleting the Existing Pod

Delete the current pod with this command:

```
kubectl delete pod webapp-color
```

### 9.2 Modifying the Pod YAML

Update the **pod.yaml** file to reference the ConfigMap rather than using a hard-coded environment variable value. Modify the container specification under the **env** section as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: webapp-color
  labels:
    name: webapp-color
    namespace: default
spec:
  containers:
  - name: webapp-color
    image: kodekloud/webapp-color
    imagePullPolicy: Always
    env:
    - name: APP_COLOR
      valueFrom:
        configMapKeyRef:
          name: webapp-config-map
          key: APP_COLOR
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-4bwn
      readOnly: true
  # Other pod specifications remain unchanged.
```

Save your changes and apply the updated file:

```
kubectl apply -f pod.yaml
```

After applying the configuration, verify that the pod is running and displays a background color of **darkblue**.

─────────────────────────────

## 10\. Verifying the Updated Web Application

Finally, open the web app color interface once more and refresh the page. Confirm that the background has successfully changed to **darkblue**. When this change is verified, click **OK** to complete the exercise.

─────────────────────────────  
This concludes the assignment for the ConfigMap lab session.

> [!important]
> **Tip**
>
> Ensure that you carefully check the environment variable sections in both the pod description and the YAML file when making updates to avoid configuration errors.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/b6e82d3c-8b8b-46b1-bef8-873b6da440d3)**
>
> Watch video content
