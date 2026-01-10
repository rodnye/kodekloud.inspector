# Solution Helm Concepts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Solution-Helm-Concepts)

---

## Table of Contents

- Solution Helm Concepts
  - 1. Searching for a Helm Chart Package
  - 2. Adding a Bitnami Helm Chart Repository
  - 3. Listing Helm Repositories
  - 4. Installing and Uninstalling a Drupal Helm Chart
  - 5. Downloading the Bitnami Apache Package
  - 6. Modifying the Apache Helm Chart Configuration
  - 7. Accessing the Apache Service
  - Watch Video
    - Installing the Chart
    - Uninstalling the Chart

---

## Content

Certified Kubernetes Application Developer - CKAD

Helm Fundamentals

# Solution Helm Concepts

In this lesson, you’ll learn how to perform various tasks with Helm—from searching for chart packages and adding repositories to configuring and installing charts. Follow the steps below, and refer to the command outputs to validate your progress.

---

## 1\. Searching for a Helm Chart Package

To search for a WordPress Helm chart package on Artifact Hub, run the following command:

```
helm search hub wordpress
```

This command displays all available WordPress-related chart packages.

---

## 2\. Adding a Bitnami Helm Chart Repository

First, add the Bitnami Helm chart repository on your control plane node by executing:

```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Once added, search the repository for the Joomla package with:

```
helm search repo joomla
```

A sample output might look like:

```
root@controlplane ~ ➜ helm repo add bitnami https://charts.bitnami.com/bitnami
"bitnami" has been added to your repositories

root@controlplane ~ ➜ helm search repo joomla
NAME           CHART VERSION APP VERSION DESCRIPTION
bitnami/joomla 13.2.16     4.1.5     Joomla! is an award winning open source CMS pla...
```

From this output, observe that the Joomla package has an app version of 4.1.5 and a chart version of 13.2.16.

---

## 3\. Listing Helm Repositories

To review all repositories configured on the control plane node, run:

```
helm repo list
```

A typical output might be:

```
root@controlplane ~ ➜ helm repo list
NAME      URL
bitnami   https://charts.bitnami.com/bitnami
puppet    https://puppetlabs.github.io/puppetserver-helm-chart
hashicorp https://helm.releases.hashicorp.com
```

This indicates that there are three repositories currently added.

---

## 4\. Installing and Uninstalling a Drupal Helm Chart

### Installing the Chart

Install the Drupal Helm chart from the Bitnami repository using the release name "bravo":

```
helm install bravo bitnami/drupal
```

After installation, verify the release by listing all Helm releases:

```
helm list
```

The output should include an entry for "bravo", similar to:

```
root@controlplane ~ ➜ helm list
NAME    NAMESPACE   REVISION   UPDATED                                STATUS    CHART          APP VERSION
bravo   default     1          2022-08-04 18:50:12.967402693 +0000 UTC deployed  drupal-12.3.3  9.4.4
```

### Uninstalling the Chart

To remove the Drupal Helm package (release "bravo"), execute:

```
helm uninstall bravo
```

The command should confirm the uninstallation:

```
root@controlplane ~ ➜ helm uninstall bravo
release "bravo" uninstalled
```

---

## 5\. Downloading the Bitnami Apache Package

Download the Bitnami Apache package from the repository to your `/root` directory without installing it. Use the `--untar` flag:

```
helm pull --untar bitnami/apache
```

After downloading, verify that a new directory named `apache` has been created:

```
root@controlplane ~ ➜ ls
apache
```

Then, change to the Apache directory with:

```
cd apache/
```

---

## 6\. Modifying the Apache Helm Chart Configuration

Open the `values.yaml` file within the Apache chart directory to make two essential changes:

1.  Set the replica count for the web server to 2.
2.  Configure the HTTP service to expose NodePort 30080.

Search the file for the replica settings. You might see a section like:

```
## @section Global parameters
global:
  imageRegistry: ""
  imagePullSecrets: []
  storageClass: ""

## @section Common parameters
kubeVersion: ""
nameOverride: ""
fullnameOverride: ""
```

Make the necessary modifications by adding or updating the entries for the replica count and the service configuration. For assistance on the file structure, refer to the official Helm or Bitnami documentation.

Once the changes are complete, install the Apache chart from the current directory using the release name "mywebapp":

```
helm install mywebapp .
```

Confirm the deployment by listing your Helm releases:

```
helm list
```

---

## 7\. Accessing the Apache Service

Retrieve and set the service IP by extracting the external IP of the Apache service, then print the URL:

```
export SERVICE_IP=$(kubectl get svc --namespace default mywebapp-apache --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
echo URL : http://$SERVICE_IP/
```

Visit the printed URL in your web browser to confirm that the Apache page is successfully loading.

---

> [!important]
> **Summary**
>
> This lesson demonstrated how to interact with Helm in a Kubernetes environment: from searching and adding repositories to deploying, configuring, and accessing services using Helm. For further details and best practices, consider exploring the [Helm Documentation](https://helm.sh/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/f61d0f08-4542-4dd1-8742-11d367c554d9)**
>
> Watch video content
