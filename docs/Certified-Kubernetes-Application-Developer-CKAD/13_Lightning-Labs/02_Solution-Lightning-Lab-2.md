# Solution Lightning Lab 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Lightning-Labs/Solution-Lightning-Lab-2)

---

## Table of Contents

- Solution Lightning Lab 2
  - Task 1: Identify and Troubleshoot the Problematic Pod
  - Task 2: Create a CronJob Named "dice"
  - Task 3: Create a "my-busybox" Pod in a Specific Namespace
  - Task 4: Create an Ingress Resource for Virtual Hosting Routing
  - Task 5: Inspect Pod Logs and Redirect Warnings
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Lightning Labs

# Solution Lightning Lab 2

In this lesson, we walk through the solutions for Lightning Lab Two. This lab consists of several tasks designed to help you troubleshoot pods, update their configurations, create a CronJob, deploy a pod with custom parameters, set up an Ingress resource for virtual hosting routing, and inspect logs for warning messages.

---

## Task 1: Identify and Troubleshoot the Problematic Pod

First, identify which pod is not in a "Ready" state. Several pods are deployed across various namespaces. Run the following command to list all pods:

```
kubectl get pod --all-namespaces
```

You will see output similar to this:

```
NAMESPACE      NAME                          READY   STATUS    RESTARTS   AGE
default        dev-pod-dind-878516          3/3     Running   0          4m21s
default        pod-xyz123                    1/1     Running   0          4m20s
default        webapp-color                  1/1     Running   0          4m21s
dev0403        nginx0403                     1/1     Running   0          4m22s
dev0403        pod-dar85                     1/1     Running   0          4m21s
dev1401        nginx1401                     1/1     Running   0          4m21s
dev2406        pod-kab87                     1/1     Running   0          4m21s
dev2406        nginx2406                     1/1     Running   0          4m20s
dev2406        pod-var2016                   1/1     Running   0          4m21s
e-commerce     e-com-1123                   1/1     Running   0          31m
kube-system    coredns-74ff55c5b-c2mdt      1/1     Running   0          31m
kube-system    coredns-74ff55c5b-w774j4     1/1     Running   0          31m
kube-system    etcd-controlplane             1/1     Running   0          31m
kube-system    kube-apiserver-controlplane   1/1     Running   0          31m
kube-system    kube-controller-manager-controlplane   1/1     Running   0          31m
kube-system    kube-proxy-k6kg8              1/1     Running   0          31m
kube-system    kube-proxy-nv9b1              1/1     Running   0          30m
kube-system    kube-scheduler-controlplane    1/1     Running   0          31m
kube-system    weave-net-s64p6               2/2     Running   0          30m
kube-system    weave-net-sbt9v               2/2     Running   1          31m
marketing      redis-bf75d68-fjvw6          1/1     Running   0          4m20s
```

Inspect the problematic pod—identified here as `nginx1401` in the `dev1401` namespace—by running:

```
kubectl describe pod nginx1401 -n dev1401
```

Examine the events section for clues. In this example, the events indicate that the readiness probe has failed, suggesting a misconfiguration. Next, extract the pod configuration to a YAML file for further inspection:

```
kubectl get pod nginx1401 -n dev1401 -o yaml > nginx1401.yaml
```

Review the configuration, which includes probe settings. A snippet from the YAML output might look like this:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"creationTimestamp":null,"labels":{"run":"nginx"},"name":"nginx1401","namespace":"dev1401"},"spec":{"containers":[{"image":"kodekloud/nginx","imagePullPolicy":"IfNotPresent","name":"nginx","ports":[{"containerPort":8080}],"readinessProbe":{"httpGet":{"path":"/","port":8080},"initialDelaySeconds":10,"periodSeconds":60},"resources":{}},{"dnsPolicy":"ClusterFirst","restartPolicy":"OnFailure"}],"status":{}}}
  creationTimestamp: '2022-08-08T03:39:07Z'
  labels:
    run: nginx
managedFields:
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:annotations: {}
        f:kubectl.kubernetes.io/last-applied-configuration: {}
        f:labels: {}
        f:run: {}
      f:spec:
        f:containers:
          k:{"name":"nginx"}:
            f:image: {}
            f:imagePullPolicy: {}
            f:name: {}
            f:ports:
              k:{"containerPort":8080,"protocol":"TCP"}: {}
```

Notice that although the readiness probe is set to check port 8080, other parts of the configuration might be expecting port 9080. To correct the inconsistency, update the configuration as follows:

```
# Updated pod configuration for nginx1401
spec:
  containers:
    - image: kodekloud/nginx
      imagePullPolicy: IfNotPresent
      name: nginx
      ports:
        - containerPort: 9080
          protocol: TCP
      readinessProbe:
        failureThreshold: 3
        httpGet:
          path: /
          port: 9080
          scheme: HTTP
        periodSeconds: 10
        successThreshold: 1
        timeoutSeconds: 1
      livenessProbe:
        exec:
          command:
            - ls
            - /var/www/html/file_check
        periodSeconds: 60
  resources: {}
  terminationMessagePath: /dev/termination-log
  terminationMessagePolicy: File
  volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-7b8v2
```

Apply the updated configuration by replacing the existing pod. Save the file (for example, as `nginx1401.yaml`) and then run:

```
kubectl replace -f nginx1401.yaml --force
```

Finally, verify that the pod is now in a ready state:

```
kubectl get pod nginx1401 -n dev1401 -o yaml > nginx1401.yaml
```

> [!important]
> **Tip**
>
> Ensure your pod configuration settings (such as `containerPort`) match across all probe definitions to avoid inconsistencies.

---

## Task 2: Create a CronJob Named "dice"

The next task involves creating a CronJob called "dice" that runs every minute. This job leverages the `kodekloud/throw-dice` image, which randomly returns a number between one and six. A roll of six indicates success; any other result is a failure.

Additional requirements for the CronJob include:

- Running jobs non-parallel (in series).
- Completing the task only once (completions: 1).
- Using a backoff limit of 25.
- Terminating the job if it runs longer than 20 seconds (using `activeDeadlineSeconds: 20`).
- Setting the restart policy to `Never`.

Create the CronJob definition in a file called `dice-job.yaml`:

```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: dice
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      completions: 1
      backoffLimit: 25
      activeDeadlineSeconds: 20
      template:
        spec:
          containers:
          - name: dice
            image: kodekloud/throw-dice
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - "date; echo Hello from the Kubernetes cluster"
          restartPolicy: Never
```

Save and apply the CronJob configuration:

```
kubectl apply -f dice-job.yaml
```

Verify the CronJob by running:

```
kubectl get cj
```

You should see an output similar to:

```
NAME   SCHEDULE       SUSPEND   ACTIVE   LAST SCHEDULE   AGE
dice   */1 * * * *    False     0        <none>          12S
```

---

## Task 3: Create a "my-busybox" Pod in a Specific Namespace

In this task, you will create a pod named "my-busybox" using the `busybox` image in the `dev2406` namespace. The pod requirements are as follows:

- The container inside the pod should be named `secret` and execute `sleep 3600`.
- Mount a read-only secret volume named `secret-volume` at `/etc/secret-volume`. (The secret `dotfile-secret` is pre-created.)
- Schedule the pod on the control plane by specifying `nodeName: controlplane`.

Start by generating a basic pod manifest using dry-run:

```
kubectl run my-busybox --image=busybox --dry-run=client -o yaml > my-busybox.yaml
```

Edit the generated `my-busybox.yaml` file to include the required customizations:

```
apiVersion: v1
kind: Pod
metadata:
  name: my-busybox
  namespace: dev2406
  labels:
    run: my-busybox
spec:
  nodeName: controlplane
  containers:
  - image: busybox
    name: secret
    command:
    - sleep
    - "3600"
    volumeMounts:
    - name: secret-volume
      mountPath: /etc/secret-volume
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: dotfile-secret
  restartPolicy: Always
```

Apply the configuration with:

```
kubectl apply -f my-busybox.yaml
```

---

## Task 4: Create an Ingress Resource for Virtual Hosting Routing

This task involves creating a single Ingress resource named `ingress-vh-routing` to handle virtual hosting routing for HTTP traffic. The configuration will route traffic as follows:

- Requests to `watch.ecom-store.com` with the path `/video` will be directed to the `video-service` on port 8080.
- Requests to `apparels.ecom-store.com` with the path `/wear` will be directed to the `apparels-service` on port 8080.

Create a file named `ingress.yaml` with the following content:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-vh-routing
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx-example
  rules:
  - host: watch.ecom-store.com
    http:
      paths:
      - pathType: Prefix
        path: "/video"
        backend:
          service:
            name: video-service
            port:
              number: 8080
  - host: apparels.ecom-store.com
    http:
      paths:
      - pathType: Prefix
        path: "/wear"
        backend:
          service:
            name: apparels-service
            port:
              number: 8080
```

Apply the Ingress resource:

```
kubectl apply -f ingress.yaml
```

Verify that the Ingress resource is successfully created with:

```
kubectl get ingress
```

> [!important]
> **Further Reading**
>
> For more details on configuring Ingress resources, visit [Ingress in Kubernetes](https://kubernetes.io/docs/concepts/services-networking/ingress/).

---

## Task 5: Inspect Pod Logs and Redirect Warnings

For the final task, inspect the logs of a pod in the `default` namespace that contains a container named `log-x`. Your goal is to redirect any warning messages to a file located at `/opt/warnings.log` on the control plane node.

First, list the pods to identify the target pod:

```
kubectl get pod
```

Assuming the pod identified is `dev-pod-dind-878516`, execute the following command to filter and redirect warning messages:

```
kubectl logs dev-pod-dind-878516 -c log-x | grep WARNING > /opt/warnings.log
```

To verify the log output, inspect the file:

```
cat /opt/warnings.log
```

> [!important]
> **Caution**
>
> Make sure you have the necessary permissions to write to `/opt/` on the control plane node.

---

This concludes all tasks for Lightning Lab Two. Follow each step carefully to ensure proper configuration and successful task completion. Happy Kubernetes troubleshooting!

For more Kubernetes tips and documentation, check out the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/82805f4b-784c-4364-82ab-dfc139d96dda/lesson/eb8693e4-9787-4419-8837-4f0a4f07c97e)**
>
> Watch video content
