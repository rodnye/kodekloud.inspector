# Solution Readiness and Liveness Probes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Solution-Readiness-and-Liveness-Probes)

---

## Table of Contents

- Solution Readiness and Liveness Probes
  - 1. Inspecting the Initial Deployment
  - 2. Testing the Application with a Script
  - 3. Scaling Up: Adding a Second Pod
  - 4. Configuring a Readiness Probe for Pod Two
  - 5. Verifying Load Balancing After Applying the Readiness Probe
  - 6. Simulating a Pod Crash
  - 7. Implementing a Liveness Probe to Handle Freezing
  - Summary
  - Watch Video
    - Update the Configuration for Both Pods
    - Test the Liveness Probe

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Solution Readiness and Liveness Probes

This lesson explains how to implement and validate readiness and liveness probes on your Kubernetes web application. Follow along as we inspect your deployment, test with HTTP requests, scale your application, and configure probes to ensure only healthy pods receive traffic and that failing pods are automatically recovered.

---

## 1\. Inspecting the Initial Deployment

To begin, verify that your application is running by inspecting the pods and services in your cluster. Execute the following commands:

```
root@controlplane ~ ➜ kubectl get pod
NAME               READY   STATUS     RESTARTS   AGE
simple-webapp-1    1/1     Running    0          2m28s


root@controlplane ~ ➜ kubectl get service
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP         6m39s
webapp-service     NodePort    10.96.70.224    <none>        8080:30080/TCP   2m34s
```

Opening the web portal via the Kubernetes dashboard confirms that the application is accessible.

---

## 2\. Testing the Application with a Script

A provided test script (`curl-test.sh`) sends HTTP requests to verify the web server’s response. Run the script as shown below:

```
root@controlplane ~ ➜ ./curl-test.sh
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
^C
root@controlplane ~ ✗
```

At this stage, only one pod (simple-webapp-1) is handling the traffic.

---

## 3\. Scaling Up: Adding a Second Pod

To improve scaling, a second pod (simple-webapp-2) is introduced. Run the test script again to observe the behavior:

```
root@controlplane ~ ➜ ./curl-test.sh
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Failed
Failed
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Failed
Failed
Failed
Failed
```

Here, although simple-webapp-1 responds correctly, some requests to simple-webapp-2 fail because it is receiving traffic even though it’s not yet ready.

> [!important]
> **Note**
>
> The readiness probe will ensure that a pod only receives traffic when it is ready, preventing failed requests.

---

## 4\. Configuring a Readiness Probe for Pod Two

To stop the failed requests, configure a readiness probe for simple-webapp-2. This probe sends an HTTP GET request to the `/ready` endpoint on port 8080.

1.  Export the current configuration of simple-webapp-2:

    ```
    root@controlplane ~ ➜ kubectl get pod simple-webapp-2 -o yaml > webapp2.yaml
    ```

2.  Delete the existing pod to prepare for the updated configuration:

    ```
    root@controlplane ~ ➜ kubectl delete pod simple-webapp-2
    ```

3.  Edit the `webapp2.yaml` file to include the readiness probe under the container configuration. Insert the following snippet:

    ```
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
    ```

    Below is an example configuration for simple-webapp-2:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: "2022-08-03T15:13:44Z"
      labels:
        name: simple-webapp
      name: simple-webapp-2
      namespace: default
      resourceVersion: "1058"
      uid: ce7bcf8f-dfd4-42e0-a16f-54061fbeb85d
    spec:
      containers:
      - env:
        - name: APP_START_DELAY
          value: "80"
        image: kodekloud/webapp-delayed-start
        imagePullPolicy: Always
        name: simple-webapp
        ports:
        - containerPort: 8080
          protocol: TCP
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
    ```

4.  Re-deploy the updated pod configuration:

    ```
    root@controlplane ~ ➜ kubectl apply -f webapp2.yaml
    ```

Verify the effectiveness of the readiness probe by watching the status of your pods.

---

## 5\. Verifying Load Balancing After Applying the Readiness Probe

Re-run the test script to ensure that traffic is now only directed to pods that are ready. Initially, traffic might still be sent to simple-webapp-1, but once simple-webapp-2 becomes ready, load balancing will occur:

```
root@controlplane ~ ➜ kubectl apply -f webapp2.yaml
pod/simple-webapp-2 created
root@controlplane ~ ➜ ./curl-test.sh
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-1 : I am ready! OK
Message from simple-webapp-2 : I am ready! OK
^C
```

At this point, traffic is successfully balanced between the two pods.

---

## 6\. Simulating a Pod Crash

To understand the behavior when a pod fails, a crash script (`crash-app.sh`) is provided to simulate a failure in simple-webapp-2:

```
root@controlplane ~ ➜ ./crash-app.sh
Message from simple-webapp-2 : Mayday! Mayday! Going to crash!
root@controlplane ~ ➜
```

After running the crash script, check the pods using:

```
root@controlplane ~ ➜ kubectl get pod
```

The test script (`curl-test.sh`) will temporarily show that requests are routed only to simple-webapp-1 until Kubernetes restarts the crashed pod automatically.

> [!important]
> **Warning**
>
> When a pod crashes, Kubernetes automatically restarts it; however, during the downtime, ensure that your application can handle the temporary loss of a pod.

---

## 7\. Implementing a Liveness Probe to Handle Freezing

In this final section, you will configure a liveness probe to automatically recover pods that become unresponsive (frozen).

### Update the Configuration for Both Pods

1.  Export the current configuration for your pods:

    ```
    root@controlplane ~ ➜ kubectl get pod -o yaml > webapp.yaml
    ```

2.  Delete all existing pods to redeploy them with the new liveness probe configuration:

    ```
    root@controlplane ~ ➜ kubectl delete pod --all
    ```

3.  Open the `webapp.yaml` file and insert the liveness probe under the container specification for each pod. For example, for simple-webapp-1, add:

    ```
    livenessProbe:
      httpGet:
        path: /live
        port: 8080
      periodSeconds: 1
      initialDelaySeconds: 80
    ```

    The full configuration for simple-webapp-1 might look like this:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: "2022-08-03T15:10:30Z"
      labels:
        name: simple-webapp
      name: simple-webapp-1
      namespace: default
      resourceVersion: "825"
      uid: 694b5225-1ad4-422c-b514-4f139c84ecf2
    spec:
      containers:
      - image: kodekloud/webapp-delayed-start
        imagePullPolicy: Always
        name: simple-webapp
        ports:
        - containerPort: 8080
          protocol: TCP
        livenessProbe:
          httpGet:
            path: /live
            port: 8080
          periodSeconds: 1
          initialDelaySeconds: 80
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
    ```

    Similarly, update the configuration for simple-webapp-2 as follows:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: "2022-08-03T15:17:03Z"
      labels:
        name: simple-webapp
      name: simple-webapp-2
      namespace: default
      resourceVersion: "1858"
      uid: 82ec848b-b098-45f0-9975-513ef5d21b1d
    spec:
      containers:
      - env:
        - name: APP_START_DELAY
          value: "30"
        image: kodekloud/webapp-delayed-start
        imagePullPolicy: Always
        name: simple-webapp
        ports:
        - containerPort: 8080
          protocol: TCP
        readinessProbe:
          failureThreshold: 3
          httpGet:
            path: /ready
            port: 8080
            scheme: HTTP
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 1
        livenessProbe:
          httpGet:
            path: /live
            port: 8080
          periodSeconds: 1
          initialDelaySeconds: 80
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
    ```

4.  Redeploy the updated configuration:

    ```
    root@controlplane ~ ➜ kubectl apply -f webapp.yaml
    ```

### Test the Liveness Probe

Simulate a pod freeze by executing the freeze script:

```
root@controlplane ~ ➜ ./freeze-app.sh
```

Then, use the test script (`curl-test.sh`) to observe how traffic is affected. Finally, check the pod statuses:

```
root@controlplane ~ ➜ kubectl get pod
```

You should notice that Kubernetes restarts the frozen pod automatically, ensuring continuous service availability.

---

## Summary

- The **readiness probe** ensures that only pods that are ready receive traffic.
- The **liveness probe** automatically restarts pods that become unresponsive or frozen.

By following these configurations, you enhance the overall availability and reliability of your Kubernetes-deployed applications. Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/2e19721f-e80a-43e4-9006-26257b3ad18e)**
>
> Watch video content
