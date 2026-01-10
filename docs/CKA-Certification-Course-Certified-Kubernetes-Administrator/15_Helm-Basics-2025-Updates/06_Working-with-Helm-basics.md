# Working with Helm basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Working-with-Helm-basics)

---

## Table of Contents

- Working with Helm basics
  - Managing Chart Repositories
  - Deploying an Application on Kubernetes
  - Searching for Charts
  - Managing Helm Releases
  - Managing Local Helm Repository Data
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Helm Basics 2025 Updates

# Working with Helm basics

This article explains basic Helm operations using the command-line interface. When you run the Helm command without any subcommands, it provides a list of common actions and available commands.

For example, executing:

```
$ helm --help
```

displays:

```
The Kubernetes package manager


Common actions for Helm:
- helm search: search for charts
- helm pull: download a chart to your local directory to view
- helm install: upload the chart to Kubernetes
- helm list: list releases of charts


Usage:
  helm [command]


Available Commands:
  completion   generate autocompletion scripts for the specified shell
  create       create a new chart with the given name
  dependency   manage a chart's dependencies
  env          helm client environment information
  get          download extended information of a named release
  help         Help about any command
  history      fetch release history
```

This output serves as a quick reference to the available Helm commands. For instance, if you need to revert a failed upgrade, you can quickly find out by searching within the help details that the correct command is `helm rollback`, not “restore.”

## Managing Chart Repositories

Exploring repository-related commands is straightforward. Running:

```
$ helm repo --help
```

produces:

```
This command consists of multiple subcommands to interact with chart repositories.


It can be used to add, remove, list, and index chart repositories.


Usage:
  helm repo [command]


Available Commands:
  add     add a chart repository
  index   generate an index file given a directory containing packaged charts
  list    list chart repositories
  remove  remove one or more chart repositories
  update  update information of available charts locally from chart repositories
```

This clearly outlines the commands for managing chart repositories—whether you need to add, list, remove, or update them.

## Deploying an Application on Kubernetes

Imagine you want to launch a WordPress website on Kubernetes using a chart from an online repository, such as [Artifact Hub](https://artifacthub.io/). Charts with an official or verified publisher badge ensure authenticity and reliability. Follow these steps:

1.  > **Note:** First, add the Bitnami repository:

    ```
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    ```

2.  > **Note:** Then, install the WordPress chart:

    ```
    $ helm install my-release bitnami/wordpress
    ```

After running these commands, you should see an output similar to:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
"bitnami" has been added to your repositories


$ helm install my-release bitnami/wordpress
NAME: my-release
LAST DEPLOYED: Wed Nov 10 18:03:50 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: wordpress
CHART VERSION: 12.1.27
APP VERSION: 5.8.1


** Please be patient while the chart is being deployed **
Your WordPress site can be accessed through the following DNS name
from within your cluster:
my-release-wordpress.default.svc.cluster.local (port 80)
```

This output confirms that your WordPress application is successfully deployed and provides details on how to access it from within the Kubernetes cluster.

## Searching for Charts

Helm offers robust search functionality to help you find specific charts. To search for a chart on Artifact Hub, you can use:

```
$ helm search hub wordpress
```

This command returns a list of available WordPress charts with details such as chart version, app version, and a short description. If you prefer to search within your local repositories, simply run:

```
$ helm search wordpress
```

This command provides similar information that helps you identify the correct chart version corresponding to the WordPress version you intend to deploy.

## Managing Helm Releases

Once a chart is deployed, it is managed as a release. To view all existing releases, run:

```
$ helm list
NAME        NAMESPACE   REVISION    UPDATED                             STATUS      CHART               APP VERSION
my-release  default     1           2021-11-10 18:03:50.414174217 +0000 UTC deployed    wordpress-12.1.27  5.8.1
```

If you later decide to remove the deployed release (for instance, the WordPress website), you can uninstall it with:

```
$ helm uninstall my-release
```

This command cleans up all Kubernetes objects that were created during deployment.

## Managing Local Helm Repository Data

To view your configured chart repositories, execute:

```
$ helm repo list
NAME    URL
bitnami https://charts.bitnami.com/bitnami
```

Over time, locally cached repository data can become outdated. To refresh this information, run:

```
$ helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "bitnami" chart repository
Update Complete. ⏫Happy Helming!⏫
```

This command ensures you have the latest chart data locally.

> **Wrapping Up:** This article provided an overview of basic Helm CLI operations—from accessing help information to deploying and managing applications on Kubernetes. Experiment with these commands in your environment to become more confident with Helm.

Happy Helming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/b1fd59a3-5ff8-4501-824b-037f122c8481)**
>
> Watch video content
