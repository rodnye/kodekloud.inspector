# Demo OpenShift UI Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Getting-Started-with-Openshift/Demo-OpenShift-UI-Overview)

---

## Table of Contents

- Demo OpenShift UI Overview
  - OpenShift Web Console Overview
  - OpenShift Command-Line Interface (CLI) Overview
  - Further Resources
  - Watch Video
    - Developer Portal
    - Administrator Portal

---

## Content

OpenShift 4

Getting Started with Openshift

# Demo OpenShift UI Overview

In this lesson, we'll explore OpenShift through both its web console and CLI. Previously, you learned about various installation methods for OpenShift, such as CodeReady Containers (CRC), sandbox environments, and full production clusters. Now, we’ll take a high-level look at the user interface (UI) and command-line interface (CLI) before diving deeper into deployments and advanced features in later lessons.

## OpenShift Web Console Overview

The OpenShift console offers two primary views: one tailored for developers and another designed for administrators. Each view is organized to cater to its intended audience, ensuring that both development and administrative tasks are intuitive and accessible.

### Developer Portal

The Developer portal provides a visual representation of your cluster’s architecture and the resources deployed within it. The Topology view offers an overall picture of your projects:

![The image shows a Red Hat OpenShift Dedicated console with a project named "mikel1992-dev" and a topology view displaying resources like Deployments, ReplicaSets, and ConfigMaps. The interface includes navigation options on the left and resource details on the right.](https://kodekloud.com/kk-media/image/upload/v1752882638/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-openshift-topology-view.jpg)

Even if your cluster is new and has minimal activity, clicking on your workspace reveals detailed information about deployments, replica sets, config maps, labels, namespaces, annotations, and more.

The Observability section is where you can view logs, metrics, alerts, and events. Initially, activity might seem sparse, but as your cluster scales, this area will provide valuable insights:

![The image shows a Red Hat OpenShift Dedicated console displaying streaming events related to a project named "mikel1992-dev," with details about container and pod activities. The left sidebar includes navigation options like Developer, Builds, and ConfigMaps.](https://kodekloud.com/kk-media/image/upload/v1752882640/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-openshift-streaming-events.jpg)

For example, selecting performance metrics such as CPU usage is straightforward:

![The image shows a Red Hat OpenShift Dedicated interface with a metrics query selection dropdown, offering options like CPU usage, memory usage, and bandwidth.](https://kodekloud.com/kk-media/image/upload/v1752882640/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-openshift-metrics-dropdown.jpg)

Additionally, you can search for specific resources, view build configurations, or create a new build config directly from the portal:

![The image shows a Red Hat OpenShift Dedicated interface with a search panel for selecting resources, displaying a dropdown list of available resources. The left sidebar includes options like Topology, Observe, Builds, and more.](https://kodekloud.com/kk-media/image/upload/v1752882642/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-openshift-interface-dropdown.jpg)

In OpenShift, projects function similarly to namespaces in Kubernetes. You also have access to config maps and secrets, as shown in the following dashboard:

![The image shows a Red Hat OpenShift Dedicated dashboard for a project named "mikel1992-dev," displaying its active status, details, and recent events. The left sidebar includes navigation options like Developer, Project, and ConfigMaps.](https://kodekloud.com/kk-media/image/upload/v1752882643/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-openshift-dashboard-mikel1992-dev.jpg)

### Administrator Portal

Switching to the Administrator portal reveals additional management functionalities, such as operators, workloads, and networking. In the Workloads section, you can view pods, deployments, deployment configurations, and more. As you progress to the networking section, you’ll find services, ingress resources, and other networking components:

![The image shows a Red Hat OpenShift Dedicated interface displaying a list of Kubernetes secrets for a project named "mikel1992-dev." The secrets include various types such as docker configuration and service account tokens, with details like size and creation date.](https://kodekloud.com/kk-media/image/upload/v1752882644/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/openshift-kubernetes-secrets-mikel1992.jpg)

Other important tools accessible in this view include persistent volumes, storage classes, builds, user management, service accounts, roles, role bindings, and cluster settings.

When you navigate to the Deployments section and click on "create deployment," OpenShift provides you with a Kubernetes manifest similar to the YAML example below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  namespace: mikel1992-dev
spec:
  selector:
    matchLabels:
      app: httpd
  replicas: 3
  template:
    metadata:
      labels:
        app: httpd
    spec:
      containers:
      - name: httpd
        image: image-registry.openshift-image-registry.svc:5000/openshift/
        ports:
        - containerPort: 8080
```

> [!important]
> **Note**
>
> This YAML follows the standard Kubernetes format by specifying the API version, kind, metadata, and specifications required for deployment. Even seasoned Kubernetes users can benefit from the clear breakdown provided by OpenShift.

## OpenShift Command-Line Interface (CLI) Overview

The OpenShift CLI (oc) is designed to mirror the behavior of kubectl, providing a familiar environment to manage your resources.

For instance, you can log into your OpenShift environment using the CLI with the following commands:

```
oc login --token=sha256~mC1qEdARbsLxD-agVHo9eZMYAFYo2Tx7GCulza-r9E --server=https://api.sandbox.x815.p1.openshiftapps.com:6443
curl -H "Authorization: Bearer sha256~mC1qEdARbsLxD-agVHo9eZMYAFYo2Tx7GCulza-r9E" "https://api.sandbox.x815.p1.openshiftapps.com:6443/apis/user.openshift.io/v1/users/~"
```

After successfully logging in, you can list all pods in your current project using:

```
oc get pods
```

A sample output might look like this:

```
oc-4.10.12-macosx ./oc login --token=sha256~mCl9aEdARbsLxD-agVHo9eZMYAFYo2Tx7GCulza-r9E --server=https://api.sandbox.x81i5.p1.openshiftapps.com:6443
Logged into "https://api.sandbox.x81i5.p1.openshiftapps.com:6443" as "mikel1992" using the token provided.

Using project "mikel1992-dev".
oc-4.10.12-macosx ./oc get pods
NAME                                          READY   STATUS    RESTARTS   AGE
workspaced0af5646651143db-56cfddf4b7-jwc2s      2/2     Running   0          6m12s
```

These examples demonstrate that the OpenShift CLI uses a command structure similar to kubectl. Many operations available via kubectl are directly transferable to oc commands.

> [!important]
> **Tip**
>
> If you prefer to use a terminal outside the OpenShift web console, you can download and install the oc CLI on your local machine. This provides you with the flexibility to manage your resources from your own environment.

To install the oc CLI, navigate to the Red Hat Hybrid Cloud Console:

![The image shows a webpage from the Red Hat Hybrid Cloud Console, specifically the downloads section for command-line interface (CLI) tools for OpenShift, with options for different OS types and architectures.](https://kodekloud.com/kk-media/image/upload/v1752882646/notes-assets/images/OpenShift-4-Demo-OpenShift-UI-Overview/red-hat-hybrid-cloud-cli-downloads.jpg)

Select the appropriate version for your operating system, install the tool, and authenticate using the provided login command from the console’s dropdown menu. Once connected, you'll be ready to manage your OpenShift environment with ease.

---

Throughout this lesson, we've provided an overview of both the OpenShift UI and CLI. In upcoming lessons, we’ll explore advanced topics such as deployments, configurations, and the extensive capabilities that OpenShift offers for modern cloud-native applications.

## Further Resources

- [OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Red Hat Hybrid Cloud Console](https://console.redhat.com/)

Happy exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/7ba3dd10-68d9-414d-b26b-8e9109a4a3d3/lesson/62a4cad0-0af0-4068-83f9-7b3568f994aa)**
>
> Watch video content
