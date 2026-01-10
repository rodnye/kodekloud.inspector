# Installing Helm Chart - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Installing-Helm-Chart)

---

## Table of Contents

- Installing Helm Chart
  - Installing Helm
  - Adding the Prometheus Repository and Installing the Chart
  - Customizing the Chart Values
  - Summary
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Installing Helm Chart

In this lesson, we will guide you step-by-step through installing Helm and deploying the Prometheus Helm chart (kube-prometheus-stack) on your Kubernetes cluster. Follow these instructions to set up monitoring in your environment.

## Installing Helm

Before installing the Prometheus chart, you need to have Helm installed on your system. For detailed installation instructions specific to your operating system, refer to the official [Helm Documentation](https://helm.sh/docs/intro/install/). For a standard Linux machine, you can use the built-in installer script.

1.  Download the Helm installer script:

    ```
    $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    ```

2.  Change the script’s permissions to make it executable and run the installer:

    ```
    $ chmod 700 get_helm.sh
    $ ./get_helm.sh
    ```

3.  Verify the installation by checking the Helm version:

    ```
    $ helm version
    version.BuildInfo{Version:"v3.10.2", GitCommit:"50f003e5ee8704ec937a756c646870227d7c8b58", GitTreeState:"clean", GoVersion:"go1.18.8"}
    ```

Alternatively, you can install Helm using popular package managers. For example:

```
brew install helm
```

```
choco install kubernetes-helm
```

```
scoop install helm
```

The installer script is favorable because it automatically detects your operating system and manages the installation process.

On the Helm documentation page, you'll see instructions similar to the example below:

![The image is a webpage from the Helm documentation, providing instructions on how to install the Helm CLI, including methods from the Helm project and binary releases.](https://kodekloud.com/kk-media/image/upload/v1752882984/notes-assets/images/Prometheus-Certified-Associate-PCA-Installing-Helm-Chart/helm-cli-installation-instructions.jpg)

Scroll down on the page to review alternative installation options for your package manager of choice.

## Adding the Prometheus Repository and Installing the Chart

With Helm installed, you can now add the Prometheus Community repository and deploy the kube-prometheus-stack chart.

1.  Add the Prometheus Community repository:

    ```
    $ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    ```

2.  Update your Helm repositories:

    ```
    $ helm repo update
    ```

3.  Install the kube-prometheus-stack chart with your chosen release name (in this example, we use "prometheus"):

    ```
    $ helm install prometheus prometheus-community/kube-prometheus-stack
    ```

This command deploys the chart using default configuration values. You can choose any release name that aligns with your naming conventions.

The Helm documentation provides a detailed walkthrough for these installation methods. Below is a screenshot from the GitHub repository page for the kube-prometheus-stack chart:

![The image shows a GitHub repository page for the "kube-prometheus-stack" under the "prometheus-community/helm-charts" project. It includes a list of files and folders, along with a README section describing the stack's purpose and prerequisites.](https://kodekloud.com/kk-media/image/upload/v1752882985/notes-assets/images/Prometheus-Certified-Associate-PCA-Installing-Helm-Chart/kube-prometheus-stack-github-repo.jpg)

For reference, the documentation recommends the following commands:

```
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
$ helm repo update
$ helm install [RELEASE_NAME] prometheus-community/kube-prometheus-stack
$ helm uninstall [RELEASE_NAME]
```

When you run these commands, you might see messages indicating that the repository already exists or displaying update status messages. For instance:

```
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
"prometheus-community" already exists with the same configuration, skipping


$ helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "prometheus-community" chart repository
Update Complete. ⏰Happy Helming!⏰
```

After installing the chart, you will see output similar to:

```
$ helm install prometheus prometheus-community/kube-prometheus-stack
NAME: prometheus
LAST DEPLOYED: Mon Nov 21 13:22:39 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
kube-prometheus-stack has been installed. Check its status by running:
  kubectl --namespace default get pods -l "release=prometheus"


Visit https://github.com/prometheus-operator/kube-prometheus for instructions on how to create & configure Alertmanager and Prometheus instances using the Operator.
```

> [!important]
> **Note**
>
> If you encounter issues during installation, double-check your Helm version and repository configuration.

## Customizing the Chart Values

Each Helm chart allows you to override default configuration values. To explore configurable options for the kube-prometheus-stack chart, export the default configuration into a file:

```
$ helm show values prometheus-community/kube-prometheus-stack > values.yaml
```

Review the generated `values.yaml` file to see all the custom configuration options. Below is an excerpt that illustrates some of the configurable sections:

```
containers: []


# Additional volumes on the output StatefulSet definition.
volumes: []


# Additional VolumeMounts on the output StatefulSet definition.
volumeMounts: []


## InitContainers allows injecting additional initContainers. This is meant to allow doing some changes
## (permissions, directory tree modifications) on mounted volumes before starting Prometheus.
initContainers: []


## Priority class assigned to the Pods.
priorityClassName: ""


## PortName to use for ThanosRuler.
portName: "web"


## ExtraSecret can be used to store various data in an extra secret (e.g., hashed basic auth credentials).
extraSecret:
  name: ""
  annotations: {}
  data: {}


## Setting to true produces cleaner resource names, but requires a data migration due to persistent volume name changes.
cleanPrometheusOperatorObjectNames: false
```

Another section might include:

```
nameOverride: ""
namespaceOverride: ""
kubeTargetVersionOverride: ""
kubeVersionOverride: ""
fullnameOverride: ""
commonLabels: {}
  scmhash: abc123
```

And additional service-specific configurations:

```
externalTrafficPolicy: Cluster
type: ClusterIP


servicePerReplica:
  enabled: false
  annotations: {}


port: 9093
targetPort: 9093
nodePort: 30904
```

Once you have customized the `values.yaml` file, deploy your configuration using the `-f` flag:

```
$ helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml
```

For this lesson, we will proceed with the default deployment settings.

## Summary

You have successfully learned how to install Helm, add the Prometheus Community repository, and deploy the kube-prometheus-stack chart on your Kubernetes cluster. In the upcoming lesson, we will dive deeper into the components deployed by this chart and explain the various Kubernetes resources created during the installation.

Happy Helming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/601c8a1d-c743-457e-85e5-a39ea757c476)**
>
> Watch video content
