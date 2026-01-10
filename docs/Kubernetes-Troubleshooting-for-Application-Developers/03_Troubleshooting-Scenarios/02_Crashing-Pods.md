# Crashing Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Crashing-Pods)

---

## Table of Contents

- Crashing Pods
  - What Is a CrashLoopBackOff?
  - Pod Restart Policies
  - Troubleshooting CrashLoopBackOff
  - Watch Video
  - Practice Lab
    - MySQL Pod: Missing Environment Variables
    - Orders API Pod: Script Permission Issues
    - Nginx Pod: Missing Volume Mount for Configuration
    - Shipping API Pod: Memory Limits Causing OOMKilled
    - Notifications Pod: Failing Liveness Probe Due to 404 Response
    - Analytics Pod: Adjusting Liveness Probe Timings

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Crashing Pods

In this lesson, we explore common reasons behind a pod entering a CrashLoopBackOff state and provide troubleshooting steps to resolve these issues effectively.

## What Is a CrashLoopBackOff?

A CrashLoopBackOff is not an error by itself; rather, it is a symptom indicating that a container is repeatedly starting and then crashing. Similar to the ImagePullBackOff state, CrashLoopBackOff means Kubernetes is persistently trying to restart a failing container. Over successive failures, Kubernetes exponentially increases the restart delay (backoff duration). You'll notice the container status flipping to CrashLoopBackOff while the restart count continues to increment.

## Pod Restart Policies

Pod restart behavior is set by the `restartPolicy` in the pod specification. The default policy, `Always`, ensures that a container is restarted regardless of whether it terminates with a success or an error. Other available options include:

- **Never**: The container will not be restarted when it terminates.
- **OnFailure**: The container will be restarted only if it exits with a non-zero status code.

Consider the following configuration snippet that demonstrates these default settings:

```
terminationMessagePath: /dev/termination-log
terminationMessagePolicy: File
volumeMounts:
  - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
    name: kube-api-access-7hw5k
    readOnly: true
dnsPolicy: ClusterFirst
enableServiceLinks: true
nodeName: node01
preemptionPolicy: PreemptLowerPriority
priority: 0
restartPolicy: Always
schedulerName: default-scheduler
securityContext: {}
serviceAccountName: default
terminationGracePeriodSeconds: 30
tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
```

When configured with `OnFailure`, the container restarts only if it exits with a non-zero exit code, whereas the `Always` setting triggers a restart regardless of the exit status.

## Troubleshooting CrashLoopBackOff

Below are several scenarios that demonstrate why a pod may enter a CrashLoopBackOff state, along with targeted troubleshooting steps for each case.

### MySQL Pod: Missing Environment Variables

In one instance, a MySQL pod crashes because it lacks the necessary environment variables during initialization. An inspection of the pod description reveals that the container terminated with an exit code of 1, typically indicating an application error.

Sample pod description excerpt:

```
Describe(production-fire/mysql-5478f4db96-x2jv8)


Containers:
  app:
    Image: mysql
    State: Waiting
    Reason: CrashLoopBackOff
    Last State: Terminated
      Reason: Error
      Exit Code: 1
    Restart Count: 5
```

Investigation of the logs produces the following output:

```
2024-06-19 20:37:36+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
2024-06-19 20:37:36+00:00 [ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
You need to specify one of the following as an environment variable:
- MYSQL_ROOT_PASSWORD
- MYSQL_ALLOW_EMPTY_PASSWORD
- MYSQL_RANDOM_ROOT_PASSWORD
Stream closed EOF for production-fire/mysql-5478f4db96-x2jv8 (app)
```

The error indicates that required password-related environment variables are missing. To resolve this issue, ensure the correct environment variables are passed (through a ConfigMap, Secret, or direct configuration) so that MySQL can initialize properly.

---

### Orders API Pod: Script Permission Issues

The orders API pod encountered a startup failure because its startup script (`script.sh`) lacked executable permissions. Although the container was configured to execute `/script.sh`, it failed with a "permission denied" error:

```
Last State: Terminated
Reason: StartError
Message: failed to create containerd task: ... exec: "/script.sh": permission denied: unknown
Exit Code: 128
```

Troubleshooting steps include:

1.  Running the Docker image locally with `docker run` to inspect the file system.
2.  Listing files to verify that `script.sh` is present.
3.  Checking the permissions using `ls -l script.sh`.

Once you confirm that the file is not executable, use the `chmod` command to update its permissions and rebuild the image. Then, update the deployment to include the new image tag with proper permissions. For example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
  namespace: production-fire
spec:
  replicas: 1
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: exit-code-container
          image: rakshithraka/app:v1  # Ensure this image includes the chmod fix
```

Verifying the permissions using an `ls` command inside the container should display:

```
/ # ls
bin   etc   lib   mnt   proc   run   root   sbin   script.sh   srv   sys   tmp   usr   var
```

---

### Nginx Pod: Missing Volume Mount for Configuration

A custom Nginx container experienced crashes because it could not locate its `nginx.conf` file. Although a volume was defined to hold the configuration file, the volume was not mounted within the container.

Volume definition snippet:

```
volumes:
  - configMap:
      defaultMode: 420
      items:
        - key: nginx.conf
          path: nginx.conf
      name: nginx-conf
```

The resolution is to add a volume mount in the container specification. For example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-project
  namespace: production-fire
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-project
  template:
    metadata:
      labels:
        app: nginx-project
    spec:
      containers:
      - name: nginx
        image: rakshithraka/custom-nginx:latest
        ports:
          - containerPort: 80
            protocol: TCP
        volumeMounts:
          - name: nginx-conf
            mountPath: /etc
      volumes:
      - name: nginx-conf
        configMap:
          name: nginx-conf
          defaultMode: 420
          items:
            - key: nginx.conf
              path: nginx.conf
```

After implementing this change, the Nginx container will be able to locate its configuration file, allowing the pod to run normally.

---

### Shipping API Pod: Memory Limits Causing OOMKilled

A pod running the `polinux/stress` image was terminated by the system due to memory over-allocation. Its container was configured with the following resource limits:

```
resources:
  limits:
    memory: 100Mi
  requests:
    memory: 50Mi
```

Given that the container needs 250M memory for its virtual machine workload, the limits are insufficient. The remedy is to update the memory limits in the deployment configuration. For example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shipping-api
  namespace: production-fire
spec:
  replicas: 1
  selector:
    matchLabels:
      app: shipping-api
  template:
    metadata:
      labels:
        app: shipping-api
    spec:
      containers:
      - name: memory-demo-2-ctr
        image: polinux/stress
        command: ["stress"]
        args: ["--vm", "1", "--vm-bytes", "250M", "--vm-hang", "1"]
        resources:
          requests:
            memory: "50Mi"
          limits:
            memory: "256Mi"
```

With increased memory allocation, the shipping API pod should no longer face Out-Of-Memory (OOMKilled) issues and will operate in a Running state.

---

### Notifications Pod: Failing Liveness Probe Due to 404 Response

The notifications pod uses a liveness probe set to access the `/healthz` endpoint. However, the probe keeps failing with a 404 error, causing the container to exit with code 137. Pod events indicate:

```
Warning Unhealthy   ...  Liveness probe failed: HTTP probe failed with statuscode: 404
```

It turns out that the application does not expose a `/healthz` endpoint; it uses a different endpoint (for example, `/health`). To fix this, update the deployment to use the correct liveness probe configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notifications
  namespace: production-fire
spec:
  replicas: 1
  selector:
    matchLabels:
      test: liveness
  template:
    metadata:
      labels:
        test: liveness
    spec:
      containers:
      - name: liveness
        image: rakshithraka/liveness
        ports:
          - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
            scheme: HTTP
          initialDelaySeconds: 3
          periodSeconds: 10
```

Once you deploy the updated configuration, the container should successfully pass the liveness probe and remain running.

---

### Analytics Pod: Adjusting Liveness Probe Timings

An analytics pod was failing its liveness probe with an exit code of 137 because it wasn’t ready to serve requests immediately on startup. Initially, the probe was configured with an `initialDelaySeconds` of 1 and `periodSeconds` of 1, which did not allow enough time for the web server to initialize. The error was observed as:

```
Warning  Unhealthy  ...  Liveness probe failed: Get "http://10.244.1.7:3000/health": dial tcp 10.244.1.7:3000: connect: connection refused
```

To address this, modify the liveness probe settings to grant the application more startup time and reduce the frequency of health checks. For example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: analytics
  namespace: production-fire
spec:
  replicas: 1
  selector:
    matchLabels:
      test: liveness
  template:
    metadata:
      labels:
        test: liveness
    spec:
      containers:
      - name: analytics
        image: rakshithraka/analytics:v1
        imagePullPolicy: IfNotPresent
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
            scheme: HTTP
          initialDelaySeconds: 20
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 1
```

With these updated probe settings, the analytics container has sufficient time to initialize before the first health check, reducing the chance of premature restarts.

---

> [!important]
> **Conclusion**
>
> This lesson has detailed several common causes of CrashLoopBackOff errors—from missing environment variables and file permission issues to misconfigurations and resource constraints. By carefully reviewing logs, events, and container states, you can identify the root cause and apply the appropriate fixes for more stable pod deployments.

Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/e453f1ba-98fb-4654-ab01-d959e59c2c1c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/6be2b74f-b9b4-4cd1-a01e-2d86344bfd01)**
>
> Practice lab
