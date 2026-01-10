# Multiple Schedulers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Multiple-Schedulers)

---

## Table of Contents

- Multiple Schedulers
  - Configuring Schedulers with YAML
  - Deploying an Additional Scheduler
  - Deploying the Custom Scheduler as a Pod
  - Deploying the Custom Scheduler as a Deployment
  - Configuring Workloads to Use the Custom Scheduler
  - Verifying Scheduler Operation
  - Conclusion
  - Watch Video
  - Practice Lab
    - Step 1: Download the kube-scheduler Binary
    - Step 2: Create Service Files
    - Step 3: Define Scheduler Configuration Files
    - Example Pod Definition
    - Step 1: Build and Push a Custom Scheduler Image
    - Step 2: Create ServiceAccount and RBAC Configurations
    - Step 3: Create a ConfigMap for Scheduler Configuration
    - Step 4: Define the Deployment

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Multiple Schedulers

Welcome to this lesson on deploying multiple schedulers in a Kubernetes cluster. In this guide, you will learn how to deploy custom schedulers alongside the default scheduler, configure them correctly, and validate their operation.

Kubernetes' default scheduler distributes pods across nodes evenly while considering factors such as taints, tolerations, and node affinity. However, certain use cases may require a custom scheduling algorithm. For instance, when an application needs to perform extra verification before placing its components on specific nodes, a custom scheduler becomes essential. By writing your own scheduler, packaging it, and deploying it alongside the default scheduler, you can tailor pod placement to your specific needs.

> [!important]
> **Note**
>
> Ensure that every additional scheduler has a unique name. The default scheduler is conventionally named "default-scheduler," and any custom scheduler must be registered with its own distinct name in the configuration files.

## Configuring Schedulers with YAML

Below are examples of configuration files for both the default and a custom scheduler. Each YAML file uses a profiles list to define the scheduler's name.

```
# my-scheduler-config.yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: my-scheduler
```

```
# scheduler-config.yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: default-scheduler
```

---

## Deploying an Additional Scheduler

You can deploy an additional scheduler using the existing kube-scheduler binary, tailoring its configuration through specific service files.

### Step 1: Download the kube-scheduler Binary

Begin by downloading the kube-scheduler binary:

```
wget https://storage.googleapis.com/kubernetes-release/release/v1.12.0/bin/linux/amd64/kube-scheduler
```

### Step 2: Create Service Files

Create separate service files for each scheduler. For example, consider the following definitions:

```
# kube-scheduler.service
ExecStart=/usr/local/bin/kube-scheduler --config=/etc/kubernetes/config/kube-scheduler.yaml
```

```
# my-scheduler-2.service
ExecStart=/usr/local/bin/kube-scheduler --config=/etc/kubernetes/config/my-scheduler-2-config.yaml
```

### Step 3: Define Scheduler Configuration Files

Reference the scheduler names in the associated configuration files:

```
# my-scheduler-2-config.yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: my-scheduler-2
```

```
# my-scheduler-config.yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: my-scheduler
```

> [!important]
> **Note**
>
> Several code blocks might look similar or repeated. The examples above represent a consolidated view for clarity.

---

## Deploying the Custom Scheduler as a Pod

In addition to running the scheduler as a service, you can deploy it as a pod inside the Kubernetes cluster. This method involves creating a pod definition that references the scheduler’s configuration file.

### Example Pod Definition

```
apiVersion: v1
kind: Pod
metadata:
  name: my-custom-scheduler
  namespace: kube-system
spec:
  containers:
    - name: kube-scheduler
      image: k8s.gcr.io/kube-scheduler-amd64:v1.11.3
      command:
        - kube-scheduler
        - --address=127.0.0.1
        - --kubeconfig=/etc/kubernetes/scheduler.conf
        - --config=/etc/kubernetes/my-scheduler-config.yaml
```

The corresponding custom scheduler configuration file might look like:

```
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: my-scheduler
```

> [!important]
> **Note**
>
> Leader election is an important configuration for high-availability environments. It ensures that while multiple scheduler instances are running, only one actively schedules the pods.

---

## Deploying the Custom Scheduler as a Deployment

In many modern Kubernetes setups—especially those using kubeadm—control plane components run as pods or deployments. Below is an example of deploying a custom scheduler as a Deployment.

### Step 1: Build and Push a Custom Scheduler Image

Create a Dockerfile for your custom scheduler:

```
FROM busybox
ADD ./.output/local/bin/linux/amd64/kube-scheduler /usr/local/bin/kube-scheduler
```

Build and push the Docker image:

```
docker build -t gcr.io/my-gcp-project/my-kube-scheduler:1.0 .
gcloud docker -- push gcr.io/my-gcp-project/my-kube-scheduler:1.0
```

### Step 2: Create ServiceAccount and RBAC Configurations

Prepare the following YAML to create a service account and set appropriate RBAC permissions:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-scheduler
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: my-scheduler-as-kube-scheduler
subjects:
  - kind: ServiceAccount
    name: my-scheduler
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: system:kube-scheduler
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: my-scheduler-as-volume-scheduler
subjects:
  - kind: ServiceAccount
    name: my-scheduler
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: system:volume-scheduler
  apiGroup: rbac.authorization.k8s.io
```

### Step 3: Create a ConfigMap for Scheduler Configuration

Define a ConfigMap that includes your custom scheduler configuration:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-scheduler-config
  namespace: kube-system
data:
  my-scheduler-config.yaml: |
    apiVersion: kubescheduler.config.k8s.io/v1beta2
    kind: KubeSchedulerConfiguration
    profiles:
      - schedulerName: my-scheduler
        leaderElection:
          leaderElect: false
```

### Step 4: Define the Deployment

Deploy the custom scheduler as a Deployment with the following YAML:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-scheduler
  namespace: kube-system
  labels:
    component: scheduler
    tier: control-plane
spec:
  replicas: 1
  selector:
    matchLabels:
      component: scheduler
      tier: control-plane
  template:
    metadata:
      labels:
        component: scheduler
        tier: control-plane
        version: second
    spec:
      serviceAccountName: my-scheduler
      containers:
        - name: kube-second-scheduler
          image: gcr.io/my-gcp-project/my-kube-scheduler:1.0
          command:
            - /usr/local/bin/kube-scheduler
            - --config=/etc/kubernetes/my-scheduler/my-scheduler-config.yaml
          livenessProbe:
            httpGet:
              path: /healthz
              port: 10259
              scheme: HTTPS
            initialDelaySeconds: 15
          readinessProbe:
            httpGet:
              path: /healthz
              port: 10259
              scheme: HTTPS
          volumeMounts:
            - name: config-volume
              mountPath: /etc/kubernetes/my-scheduler
      volumes:
        - name: config-volume
          configMap:
            name: my-scheduler-config
```

Also, ensure a proper ClusterRole exists for the scheduler. For example:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: system:kube-scheduler
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
rules:
  - apiGroups:
      - coordination.k8s.io
    resources:
      - leases
    verbs:
      - create
  - apiGroups:
      - coordination.k8s.io
    resourceNames:
      - kube-scheduler
      - my-scheduler
    resources:
      - leases
    verbs:
      - get
      - list
      - watch
```

---

## Configuring Workloads to Use the Custom Scheduler

To have specific pods or deployments use your custom scheduler, add the "schedulerName" field in the pod's specification. For example:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx
  schedulerName: my-custom-scheduler
```

Deploy this pod with:

```
kubectl create -f pod-definition.yaml
```

If the custom scheduler configuration is incorrect, the pod may remain in the Pending state. Conversely, a properly scheduled pod will transition to the Running state.

---

## Verifying Scheduler Operation

To confirm which scheduler assigned a pod, review the events in your namespace:

```
kubectl get events -o wide
```

A sample output might appear as follows:

```
LAST SEEN   COUNT   NAME        KIND   TYPE    REASON      SOURCE                  MESSAGE
9s          1       nginx.15    Pod    Normal  Scheduled   my-custom-scheduler     Successfully assigned default/nginx to node01
8s          1       nginx.15    Pod    Normal  Pulling     kubelet, node01         pulling image "nginx"
2s          1       nginx.15    Pod    Normal  Pulled      kubelet, node01         Successfully pulled image "nginx"
2s          1       nginx.15    Pod    Normal  Created     kubelet, node01         Created container
2s          1       nginx.15    Pod    Normal  Started     kubelet, node01         Started container
```

Notice that the event source is "my-custom-scheduler," confirming that the pod was scheduled by your custom scheduler.

If you encounter issues, view the scheduler logs with:

```
kubectl logs my-custom-scheduler --namespace=kube-system
```

A sample log output might include messages like:

```
I0204 09:42:25.819338   1 server.go:126] Version: v1.11.3
W0204 09:42:25.822720   1 authorization.go:47] Authorization is disabled
W0204 09:42:25.822745   1 authentication.go:55] Authentication is disabled
I0204 09:42:25.822801   1 insecure_serving.go:47] Serving healthz insecurely on 127.0.0.1:10251
I0204 09:45:14.725407   1 controller_utils.go:1025] Waiting for caches to sync for scheduler controller
I0204 09:45:14.825634   1 controller_utils.go:1032] Caches are synced for scheduler controller
I0204 09:45:14.825814   1 leaderelection.go:185] attempting to acquire leader lease kube-system/my-custom-scheduler...
I0204 09:45:14.834953   1 leaderelection.go:194] successfully acquired lease kube-system/my-custom-scheduler
```

This confirms that the custom scheduler is up and functioning as expected.

---

## Conclusion

By following these techniques, you can run both the default Kubernetes scheduler and one or more custom schedulers concurrently. This flexibility allows you to assign specific workloads to the most appropriate scheduler based on your cluster’s requirements.

Happy scheduling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/a1359d88-99be-4049-905c-32c0226da353)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/e237ec9f-3c5a-4ed4-ada8-ab3769579775)**
>
> Practice lab
