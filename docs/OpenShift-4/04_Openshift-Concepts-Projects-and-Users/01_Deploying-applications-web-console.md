# Deploying applications web console - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Concepts-Projects-and-Users/Deploying-applications-web-console)

---

## Table of Contents

- Deploying applications web console
  - Method 1: Creating a Deployment via the Workloads Interface
  - Deploying a Sample Nginx Application
  - Method 2: Deploying an Application by Importing a Git Repository
  - Summary
  - Watch Video

---

## Content

OpenShift 4

Openshift Concepts Projects and Users

# Deploying applications web console

Deploy applications on OpenShift quickly and efficiently using multiple methods. In this guide, we cover two primary approaches: deploying via the Workloads > Deployments interface and importing a Git repository. We also briefly touch on using the terminal with kubectl for deployment.

---

## Method 1: Creating a Deployment via the Workloads Interface

To create a deployment manually using the web console, follow these steps:

1.  Navigate to **Workloads** and then **Deployments**.
2.  Click on **Create Deployment**.

![The image shows the Red Hat OpenShift Container Platform dashboard, highlighting the "Deployments" section in the sidebar and providing options for getting started with resources and exploring new admin features.](https://kodekloud.com/kk-media/image/upload/v1752882699/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-dashboard-deployments-sidebar.jpg)

In the editor provided, you can paste a standard Kubernetes manifest. For example, the YAML below deploys an HTTP server:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: httpd
spec:
  containers:
    - name: httpd
      image: image-registry.openshift-image-registry.svc:5000/opens
      ports:
        - containerPort: 8080
```

> [!important]
> **Note**
>
> For applications with multiple components (e.g., services, deployments, daemon sets), consider using automated methods to deploy all configurations simultaneously.

---

## Deploying a Sample Nginx Application

For demonstration, deploy a stateless Nginx application with the following Kubernetes manifest:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2  # instructs the deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

1.  Copy the manifest into the editor and click **Create Deployment**.
2.  The deployment process will start, and you can verify its status after a few moments.

Once running, you can view key details like the namespace, deployment name, update strategy, node selector, and pod selector. The dashboard also provides options to view the YAML configuration and a list of running pods.

![The image shows a Red Hat OpenShift Container Platform interface displaying deployment details for an "nginx-deployment" with 2 pods. The sidebar includes options like Home, Operators, and Workloads.](https://kodekloud.com/kk-media/image/upload/v1752882701/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-nginx-deployment-details.jpg)

To inspect deployed pods:

- Navigate to **Pods** under the deployment.
- Click on a specific pod to view its details, logs, and even access an embedded terminal (similar to executing "kubectl exec").

![The image shows the Red Hat OpenShift Container Platform interface, displaying a list of running pods under the "nginx-deployment" with their status, readiness, and other details.](https://kodekloud.com/kk-media/image/upload/v1752882703/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-nginx-deployment-pods.jpg)

![The image shows the Red Hat OpenShift Container Platform interface, displaying details of a running Nginx deployment pod. It includes tabs for metrics, YAML, environment, logs, events, and terminal.](https://kodekloud.com/kk-media/image/upload/v1752882704/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-nginx-deployment-interface.jpg)

For example, executing this command in the interactive terminal:

```
# ls
bin   dev   boot   docker-entrypoint.sh  home   lib64   mnt   proc   run   srv   tmp   var
docker-entrypoint.d  etc   lib   media   opt   root   sbin   sys   usr
#
```

displays the pod’s file structure. This manual approach is ideal for a few deployments, but it can be less efficient when managing numerous configurations.

---

## Method 2: Deploying an Application by Importing a Git Repository

For a streamlined deployment process, import your application directly from a Git repository. In this example, we deploy a basic Go Web API application that returns "Welcome to the Go Web API!" on its homepage and provides a JSON endpoint.

Below is the primary Go code for this application:

```
package main


import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)


type whoami struct {
    Name  string
    Title string
    State string
}


func main() {
    request()
}


func whoAmI(response http.ResponseWriter, r *http.Request) {
    who := []whoami{
        {
            Name:  "Michael Levan",
            Title: "Kubernetes Engineer",
            State: "ND",
        },
    }
    json.NewEncoder(response).Encode(who)
    fmt.Println("Endpoint Hit:", who)
}


func homePage(response http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(response, "Welcome to the Go Web API!")
    fmt.Println("Endpoint Hit: homePage")
}


func aboutMe(response http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(response, "A little bit about Michael Levan...")
    fmt.Println("Endpoint Hit: MichaelLevan")
}


func request() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/whoami", whoAmI)
    http.HandleFunc("/about", aboutMe)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

To deploy this Go Web API application:

1.  Copy the HTTPS link of the Git repository.
2.  In the Developer view of the OpenShift web console, click **Add**, then scroll down to **Git Repository**.
3.  Paste the Git repository URL. The web console will detect the Dockerfile in the repository and use it to build and deploy your application.
4.  Provide a unique name for your application (e.g., GoWebAPI or goweb).

![The image shows the Red Hat OpenShift Container Platform interface, specifically the "Import from Git" section where a Git repository URL is being validated.](https://kodekloud.com/kk-media/image/upload/v1752882706/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-import-from-git-interface.jpg)

![The image shows a Red Hat OpenShift Container Platform interface where a user is configuring a Dockerfile import strategy, entering an application name "goweb" and a component name "go-web-api-git."](https://kodekloud.com/kk-media/image/upload/v1752882707/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-dockerfile-import-goweb.jpg)

5.  Configure additional settings such as the target port, which sets the exposed port of your application. OpenShift automatically creates a route—a public URL—so your application can be accessed externally.

![The image shows a Red Hat OpenShift Container Platform interface, specifically the "DeploymentConfig" section with advanced options for setting a target port and creating a route to the application.](https://kodekloud.com/kk-media/image/upload/v1752882708/notes-assets/images/OpenShift-4-Deploying-applications-web-console/openshift-deploymentconfig-interface.jpg)

After clicking **Create**, the build starts automatically. Once the build completes successfully, verify the pod status by navigating to **Workloads** > **Pods**.

![The image shows the Red Hat OpenShift Container Platform interface, displaying a topology view with applications and resources like pods and builds. The sidebar includes options such as Topology, Observe, and Search.](https://kodekloud.com/kk-media/image/upload/v1752882709/notes-assets/images/OpenShift-4-Deploying-applications-web-console/red-hat-openshift-topology-view.jpg)

![The image shows a Red Hat OpenShift Container Platform interface displaying details of a pod named "goweb-1-build" with a status of "Completed." The interface includes various tabs and a sidebar with options like "Pods" and "Deployments."](https://kodekloud.com/kk-media/image/upload/v1752882710/notes-assets/images/OpenShift-4-Deploying-applications-web-console/red-hat-openshift-pod-goweb-1.jpg)

Finally, check the **Routes** section under **Networking**. Click the route URL to confirm that the homepage displays “Welcome to the Go Web API!”—indicating your application is running properly.

---

## Summary

This guide demonstrated two methods to deploy applications using the OpenShift web console:

- Manually creating a deployment with a custom YAML manifest.
- Importing an application directly from a Git repository, which automatically builds and deploys your code using the provided Dockerfile and configuration settings.

Both methods streamline deployment management and offer flexibility based on your project needs. In upcoming sections, we will discuss deploying full-blown applications via the terminal using kubectl.

For more information on related topics, visit the following resources:

- [OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/0bce3da1-167c-4f11-a004-4d57bfc7adac/lesson/80a1a010-3255-44cc-a605-98ed79d9edfa)**
>
> Watch video content
