# Solution Lightning Lab 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Lightning-Labs/Solution-Lightning-Lab-1)

---

## Table of Contents

- Solution Lightning Lab 1
  - Task 1: Create a Persistent Volume
  - Task 2: Create a Persistent Volume Claim
  - Task 3: Mount the Volume in a Pod
  - Task 4: Troubleshoot Network Connectivity for Secure Pod
  - Task 5: Create a Time-Check Pod Using a ConfigMap
  - Task 6: Create and Upgrade an Nginx Deployment
  - Task 7: Create a Redis Deployment with Resource Limits and Volume Mounts
  - Watch Video
  - Practice Lab
    - Step 1: Generate the Initial Pod YAML
    - Step 2: Edit the YAML to Add Volumes and Volume Mounts
    - Step 1: Verify Pods and Service
    - Step 2: Test Connectivity from the webapp-color Pod
    - Step 3: Check the Existing Network Policy
    - Step 4: Identify Pod Labels
    - Step 5: Create a Network Policy
    - Step 6: Retest Connectivity
    - Step 1: Create the Namespace
    - Step 2: Create the ConfigMap
    - Step 3: Generate the Pod YAML
    - Step 4: Edit the Pod Configuration
    - Step 1: Generate the Deployment YAML
    - Step 2: Edit the Deployment for Rolling Updates
    - Step 3: Upgrade the Deployment
    - Step 4: Rollback the Deployment
    - Step 1: Generate the Deployment YAML
    - Step 2: Edit the Deployment File

---

## Content

Certified Kubernetes Application Developer - CKAD

Lightning Labs

# Solution Lightning Lab 1

In this guide, we walk through the solutions for Lightning Lab 1 step by step. Each task includes detailed configuration files and commands to accomplish the requirements effectively.

---

## Task 1: Create a Persistent Volume

The first task is to create a persistent volume named **log-volume** with the following specifications:

- **Storage Class:** manual
- **Access Mode:** ReadWriteMany (RWX)
- **Capacity:** 1Gi
- **Host Path:** /opt/volume/nginx

A common starting point is referencing the Kubernetes documentation. Here’s an example snippet that you might have encountered:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: foo-pvc
  namespace: foo
spec:
  storageClassName: "" # Empty string must be explicitly set otherwise default StorageClass will be set
  volumeName: foo-pv
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: foo-pv
spec:
  storageClassName: ""
  claimRef:
    name: foo-pvc
    namespace: foo
```

Adjust this example to match our requirements. The complete persistent volume configuration becomes:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: log-volume
spec:
  storageClassName: manual
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: /opt/volume/nginx
```

Apply the configuration:

```
kubectl apply -f log-volume.yaml
```

Then verify the persistent volume is created:

```
kubectl get pv
```

---

## Task 2: Create a Persistent Volume Claim

Next, create a persistent volume claim (PVC) named **log-claim** with these requirements:

- **Access Mode:** ReadWriteMany
- **Storage Request:** 8Gi of storage
- **Storage Class:** manual

Use the following YAML configuration:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: log-claim
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 8Gi
  storageClassName: manual
```

Save this as `log-claim.yaml` and apply it:

```
kubectl apply -f log-claim.yaml
```

After applying, check the PVC status:

```
kubectl get pvc
```

---

## Task 3: Mount the Volume in a Pod

Now, mount the PVC into a pod named **logger** at the mount path **/var/www/nginx**. This pod will run a container using the `nginx:alpine` image.

### Step 1: Generate the Initial Pod YAML

Create the pod configuration using a dry-run:

```
kubectl run logger --image=nginx:alpine --dry-run=client -o yaml > logger.yaml
```

### Step 2: Edit the YAML to Add Volumes and Volume Mounts

Modify `logger.yaml` to include:

- A **volumes** section to reference the PVC.
- A **volumeMounts** section under the container to specify the mount path.

Place the following snippet under the `spec`:

```
volumes:
  - name: log
    persistentVolumeClaim:
      claimName: log-claim
```

And under the container definition, add:

```
volumeMounts:
  - name: log
    mountPath: /var/www/nginx
```

After ensuring the field name is correctly spelled (`persistentVolumeClaim` with an "s"), apply the updated configuration:

```
kubectl apply -f logger.yaml
```

If you encounter an error like:

> [!important]
> **Warning**
>
> Ensure that the field name `persistentVolumeClaim` is spelled correctly and that you have saved the file appropriately before re-applying.

Verify the pod creation:

```
kubectl get pod
```

---

## Task 4: Troubleshoot Network Connectivity for Secure Pod

A pod named **secure-pod** and a service named **secure-service** are deployed. However, incoming and outgoing connections to the secure pod are currently failing, and traffic from the **webapp-color** pod using **secure-service** is not working.

### Step 1: Verify Pods and Service

Check the pods:

```
kubectl get pod
```

Expected output:

```
NAME           READY   STATUS    RESTARTS   AGE
logger         1/1     Running   0          98s
secure-pod     1/1     Running   0          88s
webapp-color   1/1     Running   0          8m7s
```

Check the service:

```
kubectl get svc
```

Expected output:

```
NAME             TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kubernetes       ClusterIP   10.96.0.1      <none>        443/TCP    61m
secure-service   ClusterIP   10.102.116.150 <none>        80/TCP     96s
```

### Step 2: Test Connectivity from the webapp-color Pod

Enter the pod shell:

```
kubectl exec -it webapp-color -- sh
```

Inside the pod, test connectivity with netcat:

```
nc -v -z -w 2 secure-service 80
```

A timeout error confirms the issue.

### Step 3: Check the Existing Network Policy

Run:

```
kubectl get netpol
kubectl describe netpol default-deny
```

The output will reveal that a default deny policy is in effect.

### Step 4: Identify Pod Labels

Determine the pod labels with:

```
kubectl get pod --show-labels
```

Example output:

```
NAME          READY   STATUS    RESTARTS   AGE     LABELS
logger        1/1     Running   0          3m31s   run=logger
secure-pod    1/1     Running   0          3m21s   run=secure-pod
webapp-color  1/1     Running   0          10m     name=webapp-color
```

### Step 5: Create a Network Policy

Create a network policy YAML (`netpol.yaml`) to allow ingress traffic from pods labeled `name=webapp-color` to the pod labeled `run=secure-pod` on port 80:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      run: secure-pod
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              name: webapp-color
      ports:
        - protocol: TCP
          port: 80
```

Apply the policy:

```
kubectl apply -f netpol.yaml
```

### Step 6: Retest Connectivity

From the **webapp-color** pod, execute:

```
nc -v -z -w 2 secure-service 80
```

A successful connection message confirms that the issue has been resolved.

---

## Task 5: Create a Time-Check Pod Using a ConfigMap

In this task, we create a pod that periodically checks the system time. This pod is deployed in a new namespace (for example, `dv11987`).

### Step 1: Create the Namespace

If the namespace doesn’t already exist, create it:

```
kubectl create ns dv11987
```

### Step 2: Create the ConfigMap

Create a ConfigMap named **time-config** with the key-value pair `TIME_FREQ=10`:

```
kubectl create cm time-config -n dv11987 --from-literal=TIME_FREQ=10
```

Verify the ConfigMap:

```
kubectl get cm -n dv11987
```

### Step 3: Generate the Pod YAML

Generate a pod configuration for **time-check** using the `busybox` image:

```
kubectl run time-check --image=busybox --dry-run=client -o yaml > time-check.yaml
```

### Step 4: Edit the Pod Configuration

Update `time-check.yaml` to include the environment variable from the ConfigMap, a command that logs the current date, and a volume mounted at `/opt/time` using `emptyDir`:

```
apiVersion: v1
kind: Pod
metadata:
  name: time-check
  namespace: dv11987
  labels:
    run: time-check
spec:
  containers:
    - name: time-check
      image: busybox
      env:
        - name: TIME_FREQ
          valueFrom:
            configMapKeyRef:
              name: time-config
              key: TIME_FREQ
      command: ["/bin/sh", "-c"]
      args:
        - while true; do date >> /opt/time/time-check.log; sleep $TIME_FREQ; done
      volumeMounts:
        - name: time-volume
          mountPath: /opt/time
  volumes:
    - name: time-volume
      emptyDir: {}
  restartPolicy: Always
```

Apply the configuration:

```
kubectl apply -f time-check.yaml
```

Verify the pod is running in the `dv11987` namespace:

```
kubectl get pod -n dv11987
```

If you have any pods with conflicting names in the default namespace, delete them before applying the new configuration.

---

## Task 6: Create and Upgrade an Nginx Deployment

Create a deployment named **nginx-deploy** with the following requirements:

- **Image:** nginx:1.16 initially
- **Replicas:** 4
- **Rolling Update Strategy:**
  - maxSurge: 1
  - maxUnavailable: 2

### Step 1: Generate the Deployment YAML

Generate the deployment using a dry-run:

```
kubectl create deploy nginx-deploy --image=nginx:1.16 --replicas=4 --dry-run=client -o yaml > nginx-deploy.yaml
```

### Step 2: Edit the Deployment for Rolling Updates

Modify `nginx-deploy.yaml` to add the rolling update strategy:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    app: nginx-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: nginx-deploy
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 2
  template:
    metadata:
      labels:
        app: nginx-deploy
    spec:
      containers:
        - name: nginx
          image: nginx:1.16
          resources: {}
```

Apply the deployment:

```
kubectl apply -f nginx-deploy.yaml
```

### Step 3: Upgrade the Deployment

Upgrade the deployment to use `nginx:1.17`:

```
kubectl set image deployment/nginx-deploy nginx=nginx:1.17
```

Monitor the rollout:

```
kubectl get deploy
```

### Step 4: Rollback the Deployment

After the upgrade, rollback to the previous version if needed:

```
kubectl rollout undo deployment/nginx-deploy
```

---

## Task 7: Create a Redis Deployment with Resource Limits and Volume Mounts

Finally, create a deployment named **redis** with these parameters:

- **Image:** redis:alpine
- **Replicas:** 1
- **Resource Request:** 0.2 CPU
- **Label:** app=redis
- **Volumes:**
  - **data:** Use `emptyDir` mounted at `/redis-master-data`
  - **redis-config:** Use a ConfigMap (named redis-config) mounted at `/redis-master`
- **Exposed Port:** 6379

### Step 1: Generate the Deployment YAML

Generate the initial deployment:

```
kubectl create deploy redis --image=redis:alpine --replicas=1 --dry-run=client -o yaml > redis.yaml
```

### Step 2: Edit the Deployment File

Update `redis.yaml` with the correct resource requests, volumes, and volume mounts:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  labels:
    app: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      volumes:
        - name: data
          emptyDir: {}
        - name: redis-config
          configMap:
            name: redis-config
      containers:
        - name: redis
          image: redis:alpine
          resources:
            requests:
              cpu: "0.2"
          volumeMounts:
            - name: data
              mountPath: /redis-master-data
            - name: redis-config
              mountPath: /redis-master
          ports:
            - containerPort: 6379
```

Apply the deployment:

```
kubectl apply -f redis.yaml
```

---

After completing all the tasks, validate your configurations with the appropriate `kubectl get` commands to ensure that all pods, deployments, and services are running as expected.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/82805f4b-784c-4364-82ab-dfc139d96dda/lesson/55fde3a8-dcc4-401a-a11c-35dd08b25690)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/82805f4b-784c-4364-82ab-dfc139d96dda/lesson/f8f8cefc-83f9-4126-8d93-d99fa91682f8)**
>
> Practice lab
