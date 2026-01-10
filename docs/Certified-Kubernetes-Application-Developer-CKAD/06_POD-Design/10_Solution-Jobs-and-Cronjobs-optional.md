# Solution Jobs and Cronjobs optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Solution-Jobs-and-Cronjobs-optional)

---

## Table of Contents

- Solution Jobs and Cronjobs optional
  - 1. Deploying the Pod
  - 2. Creating a Job to Measure Attempts
  - 3. Updating the Job for Multiple Completions
  - 4. Running Jobs in Parallel
  - 5. Creating a CronJob
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Solution Jobs and Cronjobs optional

In this lesson, we will walk through a series of steps to deploy a pod, create and update a Job, run jobs in parallel, and set up a CronJob in Kubernetes. Follow along to see how each component is implemented.

─────────────────────────────

## 1\. Deploying the Pod

We begin with a pod definition in the file **throw-dice-pod.yaml**. This pod runs a container using the `kodekloud/throw-dice` image. The container randomly generates a number between one and six. Here, a six indicates success while any other number signals failure. Our goal is to deploy the pod and review its logs to inspect the generated number.

First, list the file and preview its contents:

```
root@controlplane ~ ➜ ls
throw-dice-pod.yaml


root@controlplane ~ ➜ cat throw-dice-pod.yaml
```

The contents of **throw-dice-pod.yaml** are as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: throw-dice-pod
spec:
  containers:
    - image: kodekloud/throw-dice
      name: throw-dice
  restartPolicy: Never
```

Deploy the pod using:

```
kubectl apply -f throw-dice-pod.yaml
```

Then, check the pod's status:

```
kubectl get pod
```

If the pod status shows **Error**, it means the container generated a number other than six. Verify the result by inspecting the logs:

```
kubectl logs throw-dice-pod
```

For example, an output like:

```
4
```

indicates the container generated a four.

─────────────────────────────

## 2\. Creating a Job to Measure Attempts

Next, we will create a Kubernetes Job named **throw-dice-job**. This Job uses the same pod definition (without extra commands) to determine how many attempts it takes to roll a six.

For further details, refer to the official Kubernetes Jobs documentation [here](https://kubernetes.io/docs/concepts/workloads/controllers/job/).

Create a file named **throw-dice-job.yaml** with the following content:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: throw-dice-job
spec:
  template:
    spec:
      containers:
      - name: throw-dice-job
        image: kodekloud/throw-dice
      restartPolicy: Never
  backoffLimit: 25
```

Deploy the Job:

```
kubectl apply -f throw-dice-job.yaml
```

Check its status with:

```
kubectl get job
```

You might see an output like:

```
NAME              COMPLETIONS   DURATION   AGE
throw-dice-job    0/1           9s         9s
```

To review detailed pod events and status, describe the Job:

```
kubectl describe job throw-dice-job
```

A sample output might display:

```
Labels:
  controller-uid: bbe00c05-eb94-4fed-a8b3-d064a2fd1dc5
  job-name: throw-dice-job
Annotations:
  batch.kubernetes.io/job-tracking:
Parallelism: 1
Completions: 1
Completion Mode: NonIndexed
Start Time: Wed, 03 Aug 2022 20:07:21 +0000
Completed At: Wed, 03 Aug 2022 20:07:39 +0000
Duration: 18s
Pods Statuses: 0 Active / 1 Succeeded / 3 Failed
...
```

> [!important]
> **Note**
>
> In this example, the Job ran a total of 4 attempts (1 succeeded and 3 failed) until a pod succeeded in generating a six.

─────────────────────────────

## 3\. Updating the Job for Multiple Completions

To modify the Job such that it continues running until it achieves three successful completions, follow these steps:

1.  Delete the current Job:

    ```
    kubectl delete -f throw-dice-job.yaml
    ```

2.  Update **throw-dice-job.yaml** to include the `completions` property. You can also increase the `backoffLimit` if more attempts are expected:

    ```
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: throw-dice-job
    spec:
      template:
        spec:
          containers:
          - name: throw-dice-job
            image: kodekloud/throw-dice
          restartPolicy: Never
      backoffLimit: 25
      completions: 3
    ```

3.  Apply the updated Job:

    ```
    kubectl apply -f throw-dice-job.yaml
    ```

Monitor the Job’s status using:

```
kubectl describe job throw-dice-job
```

A sample output might be:

```
Labels:
  controller-uid: 5b26aa1c-d92b-4634-85d3-ca1031f2ab0c
  job-name: throw-dice-job
Parallelism: 1
Completions: 3
Start Time: Wed, 03 Aug 2022 20:10:23 +0000
Completed At: Wed, 03 Aug 2022 20:10:37 +0000
Duration: 14s
Pods Statuses: 0 Active / 3 Succeeded / 1 Failed
...
```

This output indicates that the Job took 4 attempts (three successful and one failed) to complete.

─────────────────────────────

## 4\. Running Jobs in Parallel

To run the Job in parallel instead of sequentially, add the `parallelism` property to the definition. If necessary, delete the existing Job and update **throw-dice-job.yaml** as follows:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: throw-dice-job
spec:
  parallelism: 3
  completions: 3
  template:
    spec:
      containers:
      - name: throw-dice-job
        image: kodekloud/throw-dice
      restartPolicy: Never
  backoffLimit: 35
```

Deploy the updated Job:

```
kubectl apply -f throw-dice-job.yaml
```

You can describe the Job to verify that pods are now running in parallel and that you achieve three successful completions more quickly.

─────────────────────────────

## 5\. Creating a CronJob

The final task is to create a CronJob that executes the job daily at 21:30. Create a file named **throw-dice-cronjob.yaml** with the following definition:

```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: throw-dice-cron-job
spec:
  schedule: "30 21 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: throw-dice
            image: kodekloud/throw-dice
          restartPolicy: Never
```

> [!important]
> **Warning**
>
> Ensure that the restart policy is specified as **Never** (with a capital “N”). Using "never" (all lowercase) will result in an error.

Deploy the CronJob:

```
kubectl apply -f throw-dice-cronjob.yaml
```

A successful deployment might return:

```
cronjob.batch/throw-dice-cron-job created
```

─────────────────────────────

## Conclusion

In this lesson, we covered how to:

- Deploy a pod that performs a dice-rolling operation.
- Create a Job to measure the number of attempts required for a successful roll.
- Update the Job to require multiple completions.
- Configure the Job to run in parallel.
- Schedule the Job using a CronJob to run daily at a specified time.

These steps provide a comprehensive look at managing Kubernetes Jobs and CronJobs. Enjoy experimenting with these configurations in your Kubernetes environment!

For more detailed information on Kubernetes components, visit the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/ea8a85d4-572f-43c8-94db-07a7af717233)**
>
> Watch video content
