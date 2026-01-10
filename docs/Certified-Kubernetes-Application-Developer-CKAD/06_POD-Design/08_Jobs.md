# Jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Jobs)

---

## Table of Contents

- Jobs
  - Understanding Container Workloads
  - Simple Workload Example in Docker
  - Replicating the Task in Kubernetes
  - Introducing Jobs for Batch Processing
  - Running Multiple Pods with Job Completions
  - Handling Failures with Jobs
  - Running Pods in Parallel with Jobs
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Jobs

Welcome to this article on Kubernetes Jobs. In this guide, we’ll explore Jobs in Kubernetes and learn how they differ from long-running workloads. By the end, you’ll understand how to implement both simple operations and more complex batch processing tasks using Kubernetes Jobs.

## Understanding Container Workloads

Containerized workloads are typically classified into two categories:

- **Long-running workloads:** For example, web servers and database applications that continue to run until they are manually stopped.
- **Batch processing tasks:** These execute a specific operation—such as computation, image processing, data analysis, or report generation—and then terminate.

We'll start by examining how a simple workload behaves in Docker, and afterward, we’ll translate the concept into Kubernetes.

## Simple Workload Example in Docker

When you run a Docker container tasked with a basic math operation—like adding two numbers—the container starts, performs the calculation, prints the output, and then exits. For example:

```
docker run ubuntu expr 3 + 2
5
docker ps -a
CONTAINER ID        IMAGE               CREATED             STATUS                      PORTS
45aacca36850        ubuntu              43 seconds ago      Exited (0) 41 seconds ago
```

In this case, the task completed successfully as indicated by a return code of zero.

## Replicating the Task in Kubernetes

To replicate the math addition in Kubernetes, you first need to create a pod definition file. When this pod is created, it launches a container that performs the computation and exits. Here is the pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: math-pod
spec:
  containers:
  - name: math-add
    image: ubuntu
    command: ['expr', '3', '+', '2']
```

Create the pod using:

```
kubectl create -f pod-definition.yaml
```

Check the pod status with:

```
kubectl get pods
NAME      READY   STATUS    RESTARTS   AGE
math-pod  0/1     Running   0          1d
```

Even though the container finishes its task, Kubernetes will attempt to keep the pod running by default. After a short period, you will notice:

```
kubectl get pods
NAME       READY   STATUS      RESTARTS   AGE
math-pod   0/1     Completed   3          1d
```

This is due to the default restart policy being set to Always. To prevent Kubernetes from restarting the container after the job finishes, override the restart policy by setting it to Never (or OnFailure, as needed):

```
apiVersion: v1
kind: Pod
metadata:
  name: math-pod
spec:
  containers:
  - name: math-add
    image: ubuntu
    command: ['expr', '3', '+', '2']
  restartPolicy: Never
```

> [!important]
> **Note**
>
> Setting the restart policy to Never ensures that the pod does not restart automatically after the command has completed, which is ideal for one-off tasks.

## Introducing Jobs for Batch Processing

For batch processing or large-scale data tasks, you might need multiple pods working together concurrently. Unlike ReplicaSets, which ensure a certain number of pods remain running, Kubernetes Jobs are designed to run pods until the specified task is completed successfully.

To create a Job, start with a job definition file that uses the API version `batch/v1` and kind `Job`. In the job specification, a template holds the pod definition. Here’s an example job definition that performs our math addition:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: math-add-job
spec:
  template:
    spec:
      containers:
      - name: math-add
        image: ubuntu
        command: ['expr', '3', '+', '2']
      restartPolicy: Never
```

Create the job with:

```
kubectl create -f job-definition.yaml
```

Verify the job creation and its completion status:

```
kubectl get jobs
NAME          DESIRED   SUCCESSFUL   AGE
math-add-job  1         1            38s
```

Fetch the pod created by the job:

```
kubectl get pods
NAME                     READY   STATUS      RESTARTS   AGE
math-add-job-<suffix>    0/1     Completed   0          38s
```

The job remains in a completed state with zero restarts, indicating that Kubernetes did not attempt to restart the pod after a successful completion. You can view the output of the command inside the container using the `kubectl logs` command with the pod name.

To delete the job along with its associated pods, run:

```
kubectl delete job math-add-job
```

## Running Multiple Pods with Job Completions

In many real-world scenarios, you might require a job to run multiple pods simultaneously to process data in parallel or handle retries for failed operations. To run three pods for a single job, set the `completions` field to 3:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: math-add-job
spec:
  completions: 3
  template:
    spec:
      containers:
      - name: math-add
        image: ubuntu
        command: ['expr', '3', '+', '2']
      restartPolicy: Never
```

After creating the job:

```
kubectl create -f job-definition.yaml
kubectl get jobs
NAME            DESIRED   SUCCESSFUL   AGE
math-add-job    3         1            38s
```

And checking the pod status:

```
kubectl get pods
NAME                     READY   STATUS      RESTARTS   AGE
math-add-job-25j9p       0/1     Completed   0          2m
math-add-job-87g4m       0/1     Completed   0          2m
math-add-job-ds295       0/1     Completed   0          2m
```

By default, pods for a job are created sequentially—each pod starts only after the previous one completes.

## Handling Failures with Jobs

Consider a scenario where you use an image like `kodekloud/random-error` that randomly either completes successfully or fails. In such cases, if one pod fails, Kubernetes will create another pod until it achieves the specified number of successful completions.

Here is an example job definition to handle this scenario:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: random-error-job
spec:
  completions: 3
  template:
    spec:
      containers:
      - name: random-error
        image: kodekloud/random-error
      restartPolicy: Never
```

Create the job:

```
kubectl create -f job-definition.yaml
```

Check the job status:

```
kubectl get jobs
NAME               DESIRED   SUCCESSFUL   AGE
random-error-job   3         2            38s
```

And review the pods:

```
kubectl get pods
NAME                     READY   STATUS     RESTARTS
random-error-job-ktmtt   0/1     Completed  0
random-error-job-sdsrf   0/1     Error      0
random-error-job-wwqbn   0/1     Completed  0
```

Kubernetes continues to create new pods until three pods complete successfully.

## Running Pods in Parallel with Jobs

For scenarios where you want the pods to run concurrently, you can set the `parallelism` property. This allows multiple pods to be created simultaneously. For example, to run up to three pods in parallel:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: random-error-job
spec:
  completions: 3
  parallelism: 3
  template:
    spec:
      containers:
      - name: random-error
        image: kodekloud/random-error
      restartPolicy: Never
```

Create the job with:

```
kubectl create -f job-definition.yaml
```

Check the job status:

```
kubectl get jobs
NAME                DESIRED   SUCCESSFUL   AGE
random-error-job    3         2            38s
```

And inspect the pods:

```
kubectl get pods
NAME                       READY   STATUS      RESTARTS
random-error-job-ktmtt     0/1     Completed   0
random-error-job-sdsrf     0/1     Error       0
random-error-job-wwqbn     0/1     Completed   0
```

Kubernetes will intelligently create new pods as necessary until all three completions are successful.

> [!important]
> **Summary**
>
> Kubernetes Jobs are ideal for managing batch tasks where tasks must complete successfully before termination. They allow for sequential or parallel pod execution and include robust failure handling.

This concludes our article on Kubernetes Jobs. Try these examples yourself to reinforce your understanding, and explore further to see how Jobs can help you manage batch processing in Kubernetes effectively. Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/ecf1fd5a-3851-4d21-93c7-850cc652b61f)**
>
> Watch video content
