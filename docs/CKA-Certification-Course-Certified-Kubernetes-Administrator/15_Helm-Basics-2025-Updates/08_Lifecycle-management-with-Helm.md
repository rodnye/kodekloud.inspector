# Lifecycle management with Helm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Lifecycle-management-with-Helm)

---

## Table of Contents

- Lifecycle management with Helm
  - Creating and Managing Releases
  - Upgrading Releases
  - Rollbacks
  - Upgrading Complex Charts
  - Summary
  - Watch Video
  - Practice Lab
    - Installing an Older Version

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Helm Basics 2025 Updates

# Lifecycle management with Helm

In this article, we explore how to effectively manage the lifecycle of Kubernetes applications using Helm. Learn how Helm handles releases, upgrades, and rollbacks through real-world examples that simplify complexity and enhance application management.

## Creating and Managing Releases

When you install a Helm chart, a release is created. Each release is like an application package—a collection of related Kubernetes objects. Since Helm tracks all objects associated with a release, it allows you to upgrade, downgrade, or uninstall a release without affecting other deployments. For instance, even if you deploy the same chart twice, each release remains independent:

```
$ helm install my-site bitnami/wordpress
$ helm install my-SECOND-site bitnami/wordpress
```

### Installing an Older Version

To see Helm in action, let's create a new release by installing an older version of the NGINX chart. Use the version flag during installation:

```
$ helm install nginx-release bitnami/nginx --version 7.1.0
```

This command deploys an NGINX release named "nginx-release" using an earlier version of NGINX. After installation, verify the Pod status and details of the image:

```
$ kubectl get pods
NAME                                     READY   STATUS             RESTARTS   AGE
nginx-release-687cdd5c75-ztn2n          0/1     ContainerCreating  0          13s
```

Once the Pod is running, get detailed information about the image:

```
$ kubectl describe pod nginx-release-687cdd5c75-ztn2n
Containers:
  nginx:
    Container ID:   docker://81bb5ad6b5...
    Image:          docker.io/bitnami/nginx:1.19.2-debian-10-r28
    Image ID:       docker-pullable://bitnami/nginx@sha256:2fcaf026b8acb7a...
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
```

In this case, the installed NGINX version is 1.19.2, which might become outdated over time.

> [!important]
> **Note**
>
> If you discover security vulnerabilities or need feature updates, Helm makes it easy to upgrade your application along with all associated Kubernetes configurations.

## Upgrading Releases

Helm’s upgrade functionality allows seamless transition to new versions. When you upgrade a release, Helm replaces the old Pod with a new one that includes updated settings and images. Here’s an example of upgrading the existing NGINX release:

```
$ helm upgrade nginx-release bitnami/nginx
Release "nginx-release" has been upgraded. Happy Helming!
NAME: nginx-release
LAST DEPLOYED: Mon Nov 15 19:25:55 2021
NAMESPACE: default
STATUS: deployed
REVISION: 2
TEST SUITE: None
NOTES:
CHART NAME: nginx
CHART VERSION: 9.5.13
APP VERSION: 1.21.4
```

After upgrading, verify the updates with the following commands:

```
$ helm list
NAME            NAMESPACE       REVISION        STATUS      CHART            APP VERSION
nginx-release   default         2               deployed    nginx-9.5.13     1.21.4
```

Check the revision history to get more insights into the changes:

```
$ helm history nginx-release
REVISION        UPDATED                         STATUS      CHART            APP VERSION        DESCRIPTION
1               Mon Nov 15 19:20:51 2021       superseded  nginx-7.1.0     1.19.2            Install complete
2               Mon Nov 15 19:25:55 2021       deployed    nginx-9.5.13     1.21.4            Upgrade complete
```

## Rollbacks

If an upgrade leads to unexpected behavior, Helm supports rollbacks. Rolling back reverts the release to its previous known-good state. For example, to rollback the NGINX release to revision 1, run:

```
$ helm rollback nginx-release 1
Rollback was a success! Happy Helming!
```

After a rollback, the configuration reverts to the settings in revision 1. However, note that Helm records this as a new revision, providing a complete history for audit and troubleshooting.

> [!important]
> **Warning**
>
> Remember that while rollbacks restore Kubernetes manifest configurations, they do not include the actual data stored in persistent volumes or external databases. Always ensure you have a separate backup solution for persistent data.

## Upgrading Complex Charts

When working with more complex applications, such as WordPress, additional parameters might be required during an upgrade. Missing these parameters can result in errors like the one below:

```
$ helm upgrade wordpress-release bitnami/wordpress
Error: UPGRADE FAILED: template: wordpress/templates/NOTES.txt:83:4: executing "wordpress/templates/NOTES.txt" at <include "common.errors.upgrade.passwords.empty" ...>: error calling include: template: wordpress/charts/common/templates/_errors.tpl:21:48: executing "common.errors.upgrade.passwords.empty" at <fail>: error calling fail:
PASSWORDS ERROR: You must provide your current passwords when upgrading the release.
Note that even after reinstallation, old credentials may be needed as they may be kept in persistent volume claims.
Further information can be obtained at https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases


'wordpressPassword' must not be empty, please add '--set wordpressPassword=$WORDPRESS_PASSWORD' to the command. To get the current value:
    export WORDPRESS_PASSWORD=$(kubectl get secret --namespace "default" wordpress-release -o jsonpath="{.data.wordpress-password}" | base64 --decode)


'mariadb.auth.rootPassword' must not be empty, please add '--set mariadb.auth.rootPassword=$MARIADB_ROOT_PASSWORD' to the command. To get the current value:
    export MARIADB_ROOT_PASSWORD=$(kubectl get secret --namespace "default" wordpress-release-mariadb -o jsonpath="{.data.mariadb-root-password}" | base64 --decode)


'mariadb.auth.password' must not be empty, please add '--set mariadb.auth.password=$MARIADB_PASSWORD' to the command. To get the current value:
    export MARIADB_PASSWORD=$(kubectl get secret --namespace "default" wordpress-release-mariadb -o jsonpath="{.data.mariadb-password}" | base64 --decode)
```

This error indicates that administrative credentials must be provided for certain components during the upgrade. Always supply the necessary parameters to ensure that all Kubernetes objects and application components are appropriately updated.

## Summary

Helm simplifies lifecycle management by:

| Action   | Description                                                                     | Command Example                                       |
| -------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Install  | Create a new release from a Helm chart.                                         | helm install my-release bitnami/nginx --version 7.1.0 |
| Upgrade  | Update an existing release to a new version with all associated configurations. | helm upgrade my-release bitnami/nginx                 |
| Rollback | Revert a release to a previous configuration state in case of issues.           | helm rollback my-release 1                            |

By following the practices outlined in this article, you can streamline application management across your Kubernetes clusters. Practice these Helm commands with hands-on exercises to deepen your understanding and improve your deployment workflows.

For more information, consider exploring the [Helm Documentation](https://helm.sh/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/8d9213b8-0a2f-4c2e-8209-8d1dbcd13615)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/da5fa576-a6b2-4066-8d87-22e4a56b0105)**
>
> Practice lab
