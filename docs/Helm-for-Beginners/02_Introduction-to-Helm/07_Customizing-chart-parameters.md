# Customizing chart parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Introduction-to-Helm/Customizing-chart-parameters)

---

## Table of Contents

- Customizing chart parameters
  - Understanding the Default Configuration
  - Customizing Values Using Command Line Parameters
  - Using a Custom Values File
  - Modifying the Built-In values.yaml File
  - Summary of Customization Methods
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Helm for Beginners

Introduction to Helm

# Customizing chart parameters

In this lesson, we explain how to customize chart parameters when installing a Helm chart for deploying WordPress. By default, Helm installs the WordPress chart using the parameters listed in the chart’s values.yaml file, but you may often wish to override these settings—for instance, changing the default blog name "User's Blog!" to a name that better fits your deployment.

## Understanding the Default Configuration

When deploying WordPress, the application configuration is defined via YAML files. For example, the Deployment template below sets several environment variables, such as WORDPRESS_BLOG_NAME, which derives its value from the values.yaml file.

Below is an excerpt from the deployment file:

```
image:
  registry: docker.io
  repository: bitnami/wordpress
  tag: 5.8.2-debian-10-r0
##
wordpressUsername: user
##
wordpressPassword: ""
##
existingSecret: ""
##
wordpressEmail: user@example.com
##
wordpressFirstName: WordPress user first name
##
wordpressBlogName: User's Blog!

apiVersion: {{ include "apiVersion" . }}
kind: Deployment
metadata:
  name: {{ include "common.names.fullname" . }}
  namespace: {{ .Release.Namespace | quote }}
  labels: {{- include "common.labels.standard" . | nindent 4 }}
spec:
  selector:
    matchLabels: {{- include "common.labels.matchLabels" . | nindent 4 }}
  replicas: {{- .Values.replicaCount }}
  {{- end }}
  template:
    spec:
      containers:
        - name: wordpress
          image: {{ template "wordpress.image" . }}
          env:
            - name: WORDPRESS_DATABASE_NAME
              value: {{ include "wordpress.databaseName" . | quote }}
            - name: WORDPRESS_DATABASE_USER
              value: {{ include "wordpress.databaseUser" . | quote }}
            - name: WORDPRESS_USERNAME
              value: {{ .Values.wordpressUsername | quote }}
            - name: WORDPRESS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ include "wordpress.secretName" . }}
                  key: wordpress-password
            - name: WORDPRESS_BLOG_NAME
              value: {{ .Values.wordpressBlogName | quote }}
```

The default values are specified in the values.yaml file as follows:

```
image:
  registry: docker.io
  repository: bitnami/wordpress
  tag: 5.8.2-debian-10-r0
##
## @param wordpressUsername WordPress username
##
wordpressUsername: user
## @param wordpressPassword WordPress user password
## Defaults to a random 10-character alphanumeric string if not set
##
wordpressPassword: ""
## @param existingSecret
existingSecret: ""
## @param wordpressEmail WordPress user email
wordpressEmail: user@example.com
## @param wordpressFirstName WordPress user first name
## @param wordpressBlogName Blog name
##
wordpressBlogName: User's Blog!
```

A similar configuration appears in the deployment template:

```
apiVersion: {{ include "apiVersion" }}
kind: Deployment
metadata:
  name: {{ include "common.names.fullname" }}
  namespace: {{ .Release.Namespace | quote }}
  labels: {{- include "common.labels.standard" | nindent 4 }}
spec:
  selector:
    matchLabels: {{- include "common.labels.matchLabels" }}
  replicas: {{- end }}
  template:
    spec:
      containers:
        - name: wordpress
          image: {{ template "wordpress.image" }}
          env:
            - name: WORDPRESS_DATABASE_NAME
              value: {{ include "wordpress.databaseName" | quote }}
            - name: WORDPRESS_DATABASE_USER
              value: {{ include "wordpress.databaseuser" | quote }}
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
> The default values in the values.yaml file are intended to work “out-of-the-box.” Overriding them allows you to optimize the deployment for your specific needs.

## Customizing Values Using Command Line Parameters

Helm deploys the WordPress application immediately using a single command, with no interactive prompt to modify the values.yaml file. To override defaults at installation time, use the `--set` flag. For example, the command below changes the blog name from "User's Blog!" to "Helm Tut":

```
$ helm install --set wordpressBlogName="Helm Tut" my-release bitnami/wordpress
```

You can include multiple `--set` flags to customize several parameters simultaneously.

## Using a Custom Values File

When you need to override many default settings, using a custom values file is more efficient. Follow these steps to create and use a custom values file:

1.  Create a file named custom-values.yaml with the desired parameters:

    ```
    wordpressBlogName: Helm Tutorials
    wordpressEmail: john@example.com
    ```

2.  Install the chart and override the default values with your custom file:

    ```
    $ helm install --values custom-values.yaml my-release bitnami/wordpress
    ```

This method updates the chart's default settings with the parameters provided in your custom file.

## Modifying the Built-In values.yaml File

If you prefer making permanent changes to the chart's default configuration, you can pull the chart locally, edit the built-in values.yaml file, and deploy from your modified version. Here are the steps:

1.  Pull the chart in its compressed form:

    ```
    $ helm pull bitnami/wordpress
    ```

2.  To pull and untar the chart in one step, run:

    ```
    $ helm pull --untar bitnami/wordpress
    ```

After untarring, a directory named `wordpress` will be created. List its contents to verify the structure:

```
$ ls wordpress
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d----       13-Nov-21 10:36 PM                ci
d----       13-Nov-21 10:36 PM                templates
-a---       13-Nov-21 10:36 PM              354 .helmignore
-a---       13-Nov-21 10:36 PM              399 Chart.lock
-a---       13-Nov-21 10:36 PM             984 Chart.yaml
-a---       13-Nov-21 10:36 PM            51019 README.md
-a---       13-Nov-21 10:36 PM            5918 values.schema.json
-a---       13-Nov-21 10:36 PM           35737 values.yaml
```

Open the `values.yaml` file in your favorite text editor, apply your desired changes, and then install the chart from this local directory:

```
$ helm install my-release ./wordpress
```

> [!important]
> **Important**
>
> Always be sure to test your changes in a development environment before deploying to production.

## Summary of Customization Methods

Below is a quick reference table summarizing the three methods for customizing Helm chart parameters in a WordPress deployment:

| Method                                  | Use Case                                                  | Example Command                                                                |
| --------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Override with `--set` flag              | Change a few parameters on the fly                        | `helm install --set wordpressBlogName="Helm Tut" my-release bitnami/wordpress` |
| Use a custom values file                | Override several defaults using a separate YAML file      | `helm install --values custom-values.yaml my-release bitnami/wordpress`        |
| Modify the built-in values.yaml locally | Permanently adjust defaults and deploy from a local chart | `helm install my-release ./wordpress`                                          |

Each method provides different advantages depending on your deployment needs and workflow.

## Conclusion

In this lesson, we covered three primary ways to customize a WordPress Helm chart:

- Using the `--set` flag to override default values inline.
- Using a dedicated custom values file.
- Editing the built-in values.yaml file from a locally pulled chart.

These techniques give you the flexibility to tailor the Helm chart to meet your specific deployment requirements. Stay tuned for further lessons on advanced Helm chart customization.

For more information, check out the [Helm documentation](https://helm.sh/docs/) and [WordPress Helm chart repository](https://github.com/bitnami/charts/tree/master/bitnami/wordpress).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/45f37ed3-bd33-47e3-9721-3c1e361b800a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/eaf066a8-3dcc-4ead-b60c-8ec1d20d84de)**
>
> Practice lab
