# Chart Hooks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Chart-Hooks)

---

## Table of Contents

- Chart Hooks
  - Understanding the Workflow
  - Configuring Hooks
  - Watch Video
  - Practice Lab

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Chart Hooks

In this article, we explore how Helm chart hooks can extend the functionality of Kubernetes deployments. Beyond deploying Kubernetes objects to run an application, hooks allow you to automate additional actions. For instance, before performing a Helm upgrade, you might want to back up your database to ensure a reliable recovery point. You can do this by executing:

```
$ helm upgrade wordpress-release bitnami/wordpress
```

This backup process can be complemented by other operations, such as sending an email alert or displaying a temporary site-wide announcement.

## Understanding the Workflow

When you install or upgrade a Helm chart using commands like `helm install` or `helm upgrade`, Helm first validates the chart’s files and templates. It then renders the manifest files in their final form before applying them as resources in your Kubernetes cluster. This overall process is typically broken down into several phases:

- **Verification Phase:** Ensures all files and templates are correct.
- **Rendering Phase:** Transforms templates into deployable manifest files.
- **Execution Phase:** Applies these manifests to the Kubernetes cluster.

To perform specific tasks—such as backing up a database before an upgrade—a pre-upgrade hook is used. This hook triggers a predefined action, and Helm waits until the action is complete and the resources are ready before continuing with the upgrade.

After the upgrade phase, you may want to perform cleanup or notify stakeholders. A post-upgrade hook comes into play at this stage, running after a successful install and executing additional tasks like sending a notification email.

Other available hooks include:

- **Pre-install and Post-install Hooks:** Execute during the installation.
- **Pre-delete and Post-delete Hooks:** Run during resource deletion.
- **Pre-rollback and Post-rollback Hooks:** Operate during rollback operations.

A typical lifecycle for these operations can be summarized as follows:

| Command      | Phases Sequence                                        |
| ------------ | ------------------------------------------------------ |
| helm install | verify → render → pre-install → install → post-install |
| helm delete  | verify → render → pre-delete → delete → post-delete    |
| helm upgrade | verify → render → pre-upgrade → upgrade → post-upgrade |

## Configuring Hooks

Consider a scenario where you have a script named `backup.sh` designed to perform a one-time database backup. In Kubernetes, instead of running this script as a continuously running pod, you can run it as a Job.

Below is an example manifest file that creates a Job using an Alpine image. This file should be placed in the chart’s `templates` directory alongside your other Kubernetes manifests. To ensure the Job runs as a hook (e.g., a pre-upgrade hook), you need to add specific annotations that instruct Helm to treat the file differently from standard templates.

> [!important]
> **Tip**
>
> To designate a resource as a hook, add the annotation key `helm.sh/hook` with a value such as `pre-upgrade`. This tells Helm to execute the Job as part of the pre-upgrade process rather than a regular installation.

Below is the manifest file for a Job configured as a pre-upgrade hook:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ .Release.Name }}-nginx
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-weight": "5"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    metadata:
      name: {{ .Release.Name }}-nginx
    spec:
      restartPolicy: Never
      containers:
        - name: pre-upgrade-backup-job
          image: "alpine"
          command: ["/bin/backup.sh"]
```

In the above manifest:

- The annotation `"helm.sh/hook": pre-upgrade` signals that the Job should run before the upgrade phase.
- The `"helm.sh/hook-weight": "5"` annotation controls the execution order. Hooks with lower weights execute before those with higher weights. If hooks share the same weight, they are sorted by resource kind and name.
- The `"helm.sh/hook-delete-policy": hook-succeeded` annotation ensures that the Job resource is deleted after successfully running, which prevents potential conflicts from duplicate objects during future upgrades.

> [!important]
> **Warning**
>
> If the hook fails, the Job resource will not be deleted automatically. This can be useful for debugging, but be mindful of lingering resources that might require manual cleanup.

Other available deletion policies include:

- `hook-failed`: Deletes the resource even if the hook fails.
- `before-hook-creation`: Deletes any existing resource before launching a new hook.

Using the default deletion policy (`before-hook-creation`) helps avoid conflicts with duplicate resources during subsequent Helm upgrades.

By using hooks strategically, you ensure that necessary pre- and post-deployment actions are executed, making your Helm deployments more robust and reliable.

That concludes our comprehensive look at Helm chart hooks, their role in the deployment lifecycle, and how to configure them for various Kubernetes operations. Happy charting, and see you in the next article!

For further reading on Kubernetes deployments and Helm charts, check out these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Bitnami Helm Charts](https://github.com/bitnami/charts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/28973a08-1894-4976-ad1c-1df96e338d4c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/a10902cb-0503-4b02-8815-d0c6ab3ecd29)**
>
> Practice lab
