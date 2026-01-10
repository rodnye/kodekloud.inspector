# Solution Multiple Scheduler - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Solution-Multiple-Scheduler)

---

## Table of Contents

- Solution Multiple Scheduler
  - 1. Identify the Default Scheduler
  - 2. Verify Service Account and Cluster Role Binding
  - 3. Create a ConfigMap for the Custom Scheduler Configuration
  - 4. Deploy the Custom Scheduler
  - 5. Create a Pod Using the Custom Scheduler
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Solution Multiple Scheduler

In this lesson, you will learn how to deploy multiple schedulers in Kubernetes. We will go through the steps to identify the default scheduler, create and deploy a custom scheduler configuration, and finally run a pod using the new scheduler.

---

## 1\. Identify the Default Scheduler

Begin by inspecting the cluster's pods to identify the default Kubernetes scheduler pod. In most installations, the pod name is similar to `kube-scheduler-controlplane`. Use the following command to list all pods across namespaces:

```
root@controlplane ~ ⟩ kubectl get pods -A
NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
kube-system   coordns-64897985d-6qwf5             1/1     Running   0          6m14s
kube-system   coordns-64897985d-9rdt8             1/1     Running   0          6m14s
kube-system   etcd-controlplane                   1/1     Running   0          6m25s
kube-system   kube-apiserver-controlplane         1/1     Running   0          6m30s
kube-system   kube-controller-manager-controlplane 1/1     Running   0          6m14s
kube-system   kube-proxy-tzkwm                    1/1     Running   0          6m14s
kube-system   kube-scheduler-controlplane         1/1     Running   0          6m25s
root@controlplane ~ ⟩
```

Next, determine the image used by the default scheduler. Describe the scheduler pod in the `kube-system` namespace:

```
kubectl describe pod kube-scheduler-controlplane -n kube-system
```

In the description output, look for an entry similar to:

```
Image:         k8s.gcr.io/kube-scheduler:v1.23.0
```

This image will be necessary when configuring your custom scheduler.

---

## 2\. Verify Service Account and Cluster Role Binding

Before deploying the custom scheduler, ensure that the service account and cluster role binding required for it are in place. Verify the service account with the following commands:

```
root@controlplane ~ ⊢ kubectl get sa my-scheduler
Error from server (NotFound): serviceaccounts "my-scheduler" not found


root@controlplane ~ ⊢ kubectl get sa my-scheduler -n kube-system
NAME          SECRETS   AGE
my-scheduler  1         26s
```

Since the necessary resources exist, you can proceed to the next step.

---

## 3\. Create a ConfigMap for the Custom Scheduler Configuration

Create a configuration file for the custom scheduler at `/root/my-scheduler-config.yaml` with the following content:

```
apiVersion: kubescheduler.config.k8s.io/v1beta2
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: my-scheduler
    leaderElection:
      leaderElect: false
```

You can verify the file content using:

```
root@controlplane ~ ✗  cat /root/my-scheduler-config.yaml
apiVersion: kubescheduler.config.k8s.io/v1beta2
kind: KubeSchedulerConfiguration
profiles:
- schedulerName: my-scheduler
  leaderElection:
    leaderElect: false
```

Now, create a ConfigMap from this file in the `kube-system` namespace. Note that the correct flag is used rather than `--name`:

```
root@controlplane ~ ✗  kubectl create configmap my-scheduler-config --from-file=/root/my-scheduler-config.yaml -n kube-system
configmap/my-scheduler-config created
```

Verify that the ConfigMap was created successfully:

```
root@controlplane ~ ✗  kubectl get configmap my-scheduler-config -n kube-system
NAME                  DATA   AGE
my-scheduler-config   1      17s
```

> [!important]
> **Tip**
>
> Ensure that the ConfigMap is correctly created and mounted to avoid configuration issues with your custom scheduler.

---

## 4\. Deploy the Custom Scheduler

Deploy the custom scheduler using a manifest file (e.g., `/root/my-scheduler.yaml`). The manifest below deploys a custom scheduler pod using the same image as the default scheduler. Replace `<use-correct-image>` with `k8s.gcr.io/kube-scheduler:v1.23.0` as shown:

```
metadata:
  labels:
    run: my-scheduler
  name: my-scheduler
  namespace: kube-system
spec:
  serviceAccountName: my-scheduler
  containers:
    - command:
        - /usr/local/bin/kube-scheduler
        - --config=/etc/kubernetes/my-scheduler/my-scheduler-config.yaml
      image: k8s.gcr.io/kube-scheduler:v1.23.0
      livenessProbe:
        httpGet:
          path: /healthz
          port: 10259
          scheme: HTTPS
        initialDelaySeconds: 15
      name: kube-second-scheduler
      readinessProbe:
        httpGet:
          path: /healthz
          port: 10259
          scheme: HTTPS
      resources:
        requests:
          cpu: "0.1"
      securityContext:
        privileged: false
      volumeMounts:
        - name: config-volume
          mountPath: /etc/kubernetes/my-scheduler
  hostNetwork: false
  hostPID: false
  volumes:
    - name: config-volume
      configMap:
        name: my-scheduler-config
```

Deploy the custom scheduler by running:

```
root@controlplane ~ ⛰ kubectl create -f my-scheduler.yaml
pod/my-scheduler created
```

After deployment, confirm that all pods in the `kube-system` namespace are running as expected:

```
root@controlplane ~ ⛰ kubectl get pods -n kube-system
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-64897985d-6qwf5                  1/1     Running   0          11m
coredns-64897985d-9rdt8                  1/1     Running   0          11m
etcd-controlplane                        1/1     Running   0          11m
kube-apiserver-controlplane              1/1     Running   0          11m
kube-controller-manager-controlplane     1/1     Running   0          11m
kube-flannel-ds-rl72v                     1/1     Running   0          11m
kube-proxy-tzwkm                         1/1     Running   0          11m
kube-scheduler-controlplane              1/1     Running   0          11m
my-scheduler                             1/1     Running   0          7s
```

> [!important]
> **Note**
>
> Always verify your deployment by checking the pod status, ensuring that no critical errors persist.

---

## 5\. Create a Pod Using the Custom Scheduler

The final step involves creating a pod that explicitly uses the newly deployed custom scheduler. Below is an example manifest for an nginx pod. Notice that we specify `schedulerName: my-scheduler` to bind the pod to the custom scheduler:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  schedulerName: my-scheduler
  containers:
    - image: nginx
      name: nginx
```

Save this manifest to a file named `nginx-pod.yaml`, then create the pod:

```
root@controlplane ~ # kubectl create -f nginx-pod.yaml
pod/nginx created
```

Confirm that the pod is running as expected in the default namespace (or your desired namespace):

```
root@controlplane ~ # kubectl get pods
NAME     READY   STATUS    RESTARTS   AGE
nginx    1/1     Running   0          4s
```

---

This completes the lab for deploying a custom scheduler in Kubernetes and scheduling a pod using that scheduler.

For more detailed information on Kubernetes scheduling, please check out the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/d23e904d-4172-4665-b776-57ed44964755)**
>
> Watch video content
