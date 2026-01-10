# Helm Question 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Helm/Helm-Question-3)

---

## Table of Contents

- Helm Question 3
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Helm

# Helm Question 3

Which Helm repository do you use today to store and access your Helm charts?

In this article, we explore the tooling and best practices for storing Helm charts in a well-managed repository. Storing your charts properly not only ensures easy accessibility but also guarantees proper versioning, which is critical for smooth rollbacks and seamless upgrades.

Before diving into the storage options, let's revisit what a Helm chart is and how it plays a vital role in Kubernetes deployments.

![The image contains text about storing Helm charts, mentioning services like Cloudsmith, JFrog Artifactory, AWS S3, and Google Cloud Storage, with a link to Artifact Hub.](https://kodekloud.com/kk-media/image/upload/v1752873365/notes-assets/images/DevOps-Interview-Preparation-Course-Helm-Question-3/helm-charts-storage-services.jpg)

When you prepare or deploy a Helm chart, storing it in a repository allows your Kubernetes cluster to fetch the chart during deployment. Most repository solutions come with built-in versioning, meaning you can maintain multiple versions of the same chart (like version 1, version 2, etc.), which is especially useful for rolling back to a previous state or upgrading as necessary.

> [!important]
> **Key Consideration**
>
> Always ensure that your Helm charts are stored in a versioned repository, as this practice is critical for maintaining consistency and reliability in production environments.

Some popular storage options for Helm charts include:

- Cloudsmith
- JFrog Artifactory
- Amazon S3
- Google Cloud Storage

For open source Helm charts, [Artifact Hub](https://artifacthub.io) is an excellent resource. [Artifact Hub](https://artifacthub.io) hosts a vast repository of open source Helm charts, allowing you to browse, download, and even review detailed usage information and security reports for various applications. For instance, searching for "Tomcat" on [Artifact Hub](https://artifacthub.io) will yield the corresponding Helm chart accompanied by detailed metadata and reports.

Below is an example of how to add a popular Helm repository and install the Tomcat chart from Bitnami:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-release bitnami/tomcat
$ helm delete my-release
```

When discussing Helm chart repositories during interviews or in documentation, consider the following points:

- If you are part of a DevOps team, mention the specific Helm chart repository used by your team for chart storage.
- If you are learning or practicing DevOps, you might refer to popular storage solutions such as AWS S3 or JFrog Artifactory, which are often integrated into organizational workflows.
- Additionally, [Artifact Hub](https://artifacthub.io) serves as a central source for discovering and accessing open source Helm charts.

That concludes this article. See you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/b1c121cb-d954-4b22-baa7-1f0ba566688b/lesson/d6f8cc19-d7d8-4625-a5b6-175c335ee4e1)**
>
> Watch video content
