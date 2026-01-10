# Cron Jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/POD-Design/Cron-Jobs)

---

## Table of Contents

- Cron Jobs
  - Converting a Basic Job to a CronJob
  - Creating and Verifying Your CronJob
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

POD Design

# Cron Jobs

Welcome to this comprehensive guide on CronJobs in Kubernetes. In this article, you'll learn how to schedule and execute recurring jobs in your Kubernetes cluster, similar to using a Cron tab in Linux.

A CronJob allows you to run tasks on a recurring schedule. For example, you might have a job that generates reports and sends emails. Rather than triggering the job immediately with the "kubectl create" command, you can schedule it with a CronJob to occur periodically.

## Converting a Basic Job to a CronJob

Consider the following basic Job template:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: reporting-job
spec:
  completions: 3
  parallelism: 3
  template:
    spec:
      containers:
      - name: reporting-tool
        image: reporting-tool
      restartPolicy: Never
```

To convert this into a CronJob, you need to update the API version to "batch/v1beta1" and change the kind to "CronJob". Then, add a schedule field with a Cron-formatted string, and embed the original Job template within the CronJob definition under the `jobTemplate` section.

> [!important]
> **Note**
>
> The schedule field uses a standard Cron format. In this example, `"*/1 * * * *"` schedules the job to run every minute.

Below is the complete YAML definition for a CronJob that runs every minute:

```
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: reporting-cron-job
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      completions: 3
      parallelism: 3
      template:
        spec:
          containers:
          - name: reporting-tool
            image: reporting-tool
          restartPolicy: Never
```

## Creating and Verifying Your CronJob

After saving your CronJob definition (for example, as `cron-job-definition.yaml`), you can create the CronJob in your Kubernetes cluster with the following command:

```
kubectl create -f cron-job-definition.yaml
```

To verify that your CronJob has been created correctly, run:

```
kubectl get cronjob
```

A typical output might resemble:

```
NAME                  SCHEDULE      SUSPEND   ACTIVE
reporting-cron-job    */1 * * * *   False     0
```

> [!important]
> **Tip**
>
> Ensure your YAML file is properly formatted and saved before executing the `kubectl create` command to avoid any deployment issues.

## Conclusion

With this guide, you now understand how to transform a standard Kubernetes Job into a CronJob, enabling you to automate and schedule recurring tasks. Practice with different scheduling configurations to get the most out of CronJobs in your Kubernetes environment.

For further reading, explore additional resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Happy scheduling and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/749aa3f9-5de0-4897-8fca-b2bc4b941a84)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/c44b5e7c-5854-4c65-87bf-7e07cb026e71/lesson/10f8bcaf-b92d-44ea-aa9e-08dd70b9ddbd)**
>
> Practice lab
