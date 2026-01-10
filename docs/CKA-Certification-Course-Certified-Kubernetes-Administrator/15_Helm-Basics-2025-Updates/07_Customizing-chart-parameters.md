# Customizing chart parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Customizing-chart-parameters)

---

## Table of Contents

- Customizing chart parameters
  - Understanding the Default Configuration
  - Overriding Default Values with Command-Line Parameters
  - Using a Custom Values File
  - Modifying the Built-in values.yaml File
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Helm Basics 2025 Updates

# Customizing chart parameters

In this guide, you'll learn how to customize chart parameters during a Helm chart installation. When you deploy WordPress using the Bitnami chart, it uses the default values defined in the chart’s values.yaml file. For example, the default blog name is set as "User's Blog!" in the values file. This article explains how this value is configured and outlines the various methods available for overriding it.

## Understanding the Default Configuration

The WordPress application is deployed using a Kubernetes Deployment resource. Its configuration is partly derived from the values set in `values.yaml`. Below is a snippet from the `values.yaml` file indicating the default settings:

```
# values.yaml snippet
image:
  registry: docker.io
  repository: bitnami/wordpress
  tag: 5.8.2-debian-10-r0
##
# @param wordpressUsername WordPress username
##
wordpressUsername: user
##
# @param wordpressPassword WordPress user password
# Defaults to a random 10-character alphanumeric string if not set
##
wordpressPassword: ""
##
# @param existingSecret
existingSecret: ""
##
# @param wordpressEmail WordPress user email
wordpressEmail: user@example.com
##
# @param wordpressBlogName Blog name
wordpressBlogName: User's Blog!
```

The corresponding Deployment template uses these values to configure the environment variables. For example, the `WORDPRESS_BLOG_NAME` is set as follows:

```
# Deployment template snippet
apiVersion: {{ include "apiVersion" }}
kind: Deployment
metadata:
  name: {{ include "common.names.fullname" }}
  namespace: {{ .Release.Namespace | quote }}
  labels: {{- include "common.labels.standard" | nindent 4 }}
spec:
  selector:
    matchLabels: {{- include "common.labels.matchLabels" }}
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: wordpress
          image: {{ template "wordpress.images" . }}
          env:
            - name: WORDPRESS_DATABASE_NAME
              value: {{ include "wordpress.databaseName" | quote }}
            - name: WORDPRESS_DATABASE_USER
              value: {{ include "wordpress.databaseUser" | quote }}
            - name: WORDPRESS_USERNAME
              value: {{ .Values.wordpressUsername | quote }}
            - name: WORDPRESS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ include "wordpress.secretName" }}
                  key: wordpress-password
            - name: WORDPRESS_BLOG_NAME
              value: {{ .Values.wordpressBlogName | quote }}
```

> [!important]
> **Note**
>
> The `WORDPRESS_BLOG_NAME` environment variable is directly set using the value from `values.yaml`, meaning that the application will deploy with "User's Blog!" as the default blog name unless it's overridden.

## Overriding Default Values with Command-Line Parameters

When you install WordPress with Helm, the chart deploys using the default values from the `values.yaml` file. To override these defaults on the fly, you can use the `--set` option with the `helm install` command. For example, to change the blog name from "User's Blog!" to "Helm Tut", use the following command:

```
$ helm install --set wordpressBlogName="Helm Tut" my-release bitnami/wordpress
```

You can override multiple parameters simultaneously. For instance, you may adjust both the WordPress blog name and the user email. Command-line parameters provided using `--set` will take precedence over the defaults defined in the `values.yaml` file.

## Using a Custom Values File

For numerous parameter overrides, maintaining a custom values file is more efficient than using multiple `--set` options. Follow these steps:

1.  Create a file named `custom-values.yaml` with your custom configurations:

    ```
    # custom-values.yaml snippet
    wordpressBlogName: Helm Tut
    wordpressEmail: john@example.com
    ```

2.  Deploy the chart using the custom values file by running:

    ```
    $ helm install my-release bitnami/wordpress --values custom-values.yaml
    ```

This instructs Helm to apply the configuration from `custom-values.yaml`, thereby overriding the corresponding default values.

## Modifying the Built-in values.yaml File

If you wish to modify the built-in `values.yaml` within the chart itself, you can do so by following these steps:

1.  Use `helm pull` to download the chart in an archived (compressed) form:

    ```
    $ helm pull bitnami/wordpress
    ```

2.  To automatically uncompress the chart into a directory, use the `--untar` option:

    ```
    $ helm pull --untar bitnami/wordpress
    ```

3.  List the directory to view the chart files, including `values.yaml`:

    ```
    $ ls
    wordpress


    $ ls wordpress
    ci                templates          Chart.lock
    Chart.yaml        README.md          values.schema.json
    values.yaml
    ```

4.  Open and edit the `values.yaml` file in your preferred text editor to set your custom configurations.
5.  Install the chart locally by referencing the modified chart path:

    ```
    $ helm install my-release ./wordpress
    ```

In this command, `./` indicates the current directory, and Helm installs the chart using your modified files.

> [!important]
> **Important**
>
> When modifying the built-in values.yaml file, ensure you maintain the correct file structure to avoid deployment issues.

---

This concludes our discussion on customizing chart parameters. You have learned how to override default values in a Bitnami WordPress Helm chart using command-line options with `--set`, by employing a custom values file, or by directly modifying the chart's source after pulling it locally. For more details on Helm and managing Kubernetes resources, explore the [official Helm documentation](https://helm.sh/docs/) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/10e2ec05-06e0-4d72-ae09-4f0505e5573a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/10d7440b-907c-46da-ac5c-d833e7022375/lesson/0f8530fe-a11e-4aa6-bbef-954eca42312d)**
>
> Practice lab
