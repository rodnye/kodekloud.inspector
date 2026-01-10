# Create ArgoCD Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/Create-ArgoCD-Project)

---

## Table of Contents

- Create ArgoCD Project
  - Reviewing the Default Project
  - Checking Applications and Projects
  - Creating a Custom Project
  - Configuring the Custom Project via the UI
  - Verifying the Custom Project via CLI
  - Creating and Testing an Application with the Custom Project
  - Synchronizing the Application and Handling Denied Resources
  - Application Details
  - Summary
  - Watch Video
  - Practice Lab
    - Setting Source Repository Restrictions
    - Defining Deployment Destinations
    - Configuring Resource Denial

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# Create ArgoCD Project

In this guide, you'll learn how to create a custom ArgoCD project that enforces specific restrictions on source repositories and cluster-level resources. We begin by reviewing the default project configuration, then move on to creating and configuring a custom project, and finally deploy and synchronize an application to validate the restrictions.

---

## Reviewing the Default Project

Before implementing a custom project, it is important to understand how the default project is configured. The default project is highly permissive—it allows deployments to any destination and namespace without restrictions on source repositories or resources.

Run the following command to list the projects:

```
argocd proj list
```

The output will show that the default project accepts any source (`*`) and destination (`*,*`), with no restrictions on cluster-level or namespace-level resources:

```
NAME     DESCRIPTION        DESTINATIONS   SOURCES   CLUSTER-RESOURCE-WHITELIST   NAMESPACE-RESOURCE-BLACKLIST   SIGNATURE-KEYS   ORPHANED-RESOURCES
default  *i,*               *             */*                                    <none>                        disabled
```

For clarity, here's another similar output:

```
argocd proj list
```

```
NAME      DESCRIPTION    DESTINATIONS    SOURCES    CLUSTER-RESOURCE-WHITELIST    NAMESPACE-RESOURCE-BLACKLIST    SIGNATURE-KEYS    ORPHANED-RESOURCES
default   *.*            *               */*        <none>                        <none>                          disabled
```

> [!important]
> **Note**
>
> The default project does not limit which clusters or namespaces can be deployed to, nor does it restrict source repositories. This open configuration may not be suitable for every production environment.

---

## Checking Applications and Projects

You may also want to verify the current applications and projects using the Kubernetes CLI within the ArgoCD namespace.

To list all applications:

```
k -n argocd get applications
```

Output:

```
NAME                     SYNC STATUS   HEALTH STATUS
solar-system-app-2       Synced        Healthy
```

To list the projects available in ArgoCD:

```
k -n argocd get appproj
```

Output:

```
NAME       AGE
default    102m
```

---

## Creating a Custom Project

Next, we will create a new custom project. This project will restrict allowed source repositories and control cluster-level resource deployment. You can create this project using either the UI or CLI. Below is the CLI output that shows the default state before introducing our custom project:

```
argocd proj list
```

```
NAME       DESCRIPTION     DESTINATIONS       SOURCES       CLUSTER-RESOURCE-WHITELIST   NAMESPACE-RESOURCE-BLACKLIST   SIGNATURE-KEYS   ORPHANED-RESOURCES
default    *,*             *                   */*           <none>                          disabled
```

Additionally, review the current applications and projects:

```
k -n argocd get applications
```

```
NAME                       SYNC STATUS     HEALTH STATUS
solar-system-app-2         Synced          Healthy
```

```
k -n argocd get appproj
```

```
NAME       AGE
default    102m
```

---

## Configuring the Custom Project via the UI

To start, open the ArgoCD user interface and navigate to the Projects configuration via the sidebar. You will see the default project configuration listed. Click on "Create a new project" to begin setting up your custom project, for instance named "special-project". Provide a clear description outlining the restrictions that will be applied.

![The image shows the settings page of Argo CD, displaying options to configure repositories, certificates, GnuPG keys, clusters, projects, and accounts. The interface includes a sidebar with navigation icons.](https://kodekloud.com/kk-media/image/upload/v1752877526/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/argo-cd-settings-page-interface.jpg)

### Setting Source Repository Restrictions

Within the project settings, limit the allowed source repositories by replacing the default wildcard (`*`) with the specific Git repository URL containing the pod metadata resources. For example, allow only the "pod metadata" repository:

![The image shows a web interface of a code repository on Gitea, displaying details like branches, commits, and options to create a new file or pull request.](https://kodekloud.com/kk-media/image/upload/v1752877527/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/gitea-code-repository-interface.jpg)

### Defining Deployment Destinations

Under the Destinations section, restrict deployments to the current cluster by specifying its server URL (e.g., `https://kubernetes.default.svc`). You may keep the namespace wildcard (`*`) to allow flexible namespace usage.

![The image shows a web interface for managing a project, displaying sections for source repositories, scoped repositories, and destinations. It includes options to edit, save, or cancel changes, and shows a destination server URL.](https://kodekloud.com/kk-media/image/upload/v1752877529/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/project-management-web-interface.jpg)

### Configuring Resource Denial

To enhance security, configure the project to deny certain cluster-level resources. In this example, we restrict ClusterRole resources to prevent unauthorized full-access permissions. Suppose you have a manifest for a ClusterRole resource as shown below:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  creationTimestamp: null
  name: pod-master
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - "*"
```

Add an entry to the project’s deny list for ClusterRole resources. When editing, select "ClusterRole" as the kind and leave the group field empty.

![The image shows a web interface for managing project settings, specifically focusing on cluster and namespace resource allow and deny lists. It includes options to add resources and buttons to save or cancel changes.](https://kodekloud.com/kk-media/image/upload/v1752877530/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/project-settings-cluster-namespace-management.jpg)

After saving your settings, view the new project summary in the UI:

![The image shows a web interface for managing a project named "special-project," displaying sections for general information, source repositories, and other project settings. The interface includes options to edit details and manage roles, sync windows, and events.](https://kodekloud.com/kk-media/image/upload/v1752877531/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/special-project-web-interface-management.jpg)

---

## Verifying the Custom Project via CLI

After configuration, verify that the new "special-project" has been created alongside the default project using:

```
argocd proj list
```

Expected output:

```
NAME                DESCRIPTION                                       DESTINATIONS                         SOURCES                                         CLUSTER-RESOURCE-WHITELIST    NAMESPACE-RESOURCE-BLACKLIST     SIGNATURE-KEYS      ORPHANED-RESOURCES
default             /*                                                 *,*                                 *                                              /*                           /*                              <none>              disabled
special-project     This project has restrictions                     https://kubernetes.default.svc,*    http://139.59.21.103:3000/siddharth/pod-metadata    <none>                      disabled
```

To view detailed configuration in YAML format, run:

```
argocd proj get special-project -o yaml
```

Below is an example snippet of the YAML output:

```
metadata:
  creationTimestamp: "2022-09-23T15:44:52Z"
  generation: 4
  name: special-project
  namespace: argocd
spec:
  clusterResourceBlacklist:
    - group: ''
      kind: 'ClusterRole'
      description: This project has restrictions
  description: This project has restrictions
  destinations:
    - name: in-cluster
      namespace: '*'
      server: https://kubernetes.default.svc
  sourceRepos:
    - http://139.59.21.103:3000/siddharth/pod-metadata
status: {}
```

Verify these settings again after any updates with:

```
argocd proj get special-project -o yaml
```

> [!important]
> **Important**
>
> Ensure that all fields are correctly populated. For instance, an empty `group` field for a ClusterRole should be represented properly in YAML quotes.

---

## Creating and Testing an Application with the Custom Project

Now, create an application that is associated with the "special-project" custom project. When creating the application (e.g., "special-pod-app"), verify that the connected repository is correct. Note that the application sync policy should be set to manual and the namespace will be auto-created if necessary.

If you try deploying an application from a disallowed repository, an error will appear similar to the following:

![The image shows an Argo CD interface with a configuration screen for creating an application. An error message indicates that the application spec is invalid due to a repository permission issue.](https://kodekloud.com/kk-media/image/upload/v1752877532/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/argo-cd-application-error-message.jpg)

Once you select the approved pod metadata repository and set the application manifest path (e.g., "manifest"), click "Create." The application should now appear in the dashboard.

![The image shows a user interface for creating or managing an application in Argo CD, with options for setting the application name, project, and various sync settings.](https://kodekloud.com/kk-media/image/upload/v1752877533/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/argo-cd-application-management-ui.jpg)

The ArgoCD dashboard will display both "special-pod-app" and the previously existing "solar-system-app-2":

![The image shows a dashboard from Argo CD displaying two application tiles: "special-pod-app" with a status of "Missing" and "OutOfSync," and "solar-system-app-2" with a status of "Healthy" and "Synced."](https://kodekloud.com/kk-media/image/upload/v1752877534/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/argo-cd-dashboard-app-statuses.jpg)

---

## Synchronizing the Application and Handling Denied Resources

To deploy the application, click "Sync" for "special-pod-app." During synchronization, ArgoCD will try to apply all resources defined in the repository—including a ClusterRole resource. Since the custom project denies ClusterRole resources, the sync will fail with an error indicating that the resource is not permitted.

![The image shows a dashboard interface indicating a failed synchronization operation for an application, with a message stating that one or more synchronization tasks are not valid. The result section highlights a "SyncFailed" status due to a "ClusterRole" not being permitted in the specified project.](https://kodekloud.com/kk-media/image/upload/v1752877535/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/failed-sync-dashboard-interface.jpg)

To resolve this, deselect the ClusterRole resource during the sync operation. This will deploy the remaining resources (the deployment and service) successfully. After resynchronizing, "special-pod-app" should deploy the pod metadata application and expose it via the configured service.

---

## Application Details

Upon successful synchronization, the application deploys a simple PHP application that displays pod details (such as pod IP, pod name, UID, CPU requests, etc.) using the Kubernetes Downward API.

For reference, here is part of the deployment manifest:

```
replicas: 1
revisionHistoryLimit: 10
selector:
  matchLabels:
    app: pod-metadata
strategy:
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 25%
  type: RollingUpdate
template:
  metadata:
    labels:
      api: downward
      app: pod-metadata
      env: dev
      usage: global
  spec:
    containers:
      - name: test-container
        env:
          - name: MY_NODE_IP
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
          - name: MY_POD_ID
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
          - name: MY_POD_UID
            valueFrom:
              fieldRef:
                fieldPath: metadata.uid
          - name: MY_CPU_REQUEST
            valueFrom:
              resourceFieldRef:
                containerName: test-container
                resource: requests.cpu
          - name: MY_CPU_LIMIT
            valueFrom:
              resourceFieldRef:
                containerName: test-container
                resource: limits.cpu
```

The following service manifest exposes the application via a node port (e.g., 32651):

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"pod-metadata"},"name":"pod-metadata-service","namespace":"default"},"spec":{"clusterIP":"10.107.42.62","clusterIPs":["10.107.42.62"],"externalTrafficPolicy":"Cluster","internalTrafficPolicy":"Cluster","ipFamilies":["IPv4"],"ipFamilyPolicy":"SingleStack","ports":[{"nodePort":32651,"port":80,"protocol":"TCP","targetPort":80}],"selector":{"app":"pod-metadata"}}}
  creationTimestamp: "2022-09-23T18:05:38Z"
  labels:
    app: pod-metadata
  name: pod-metadata-service
  namespace: default
spec:
  clusterIP: 10.107.42.62
  clusterIPs:
  - 10.107.42.62
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - nodePort: 32651
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: pod-metadata
```

After deployment, access the application via node port 32651 to view pod details, including pod name, IP, UID, host IP, and other metadata retrieved via the Downward API.

![The image displays a table with Kubernetes pod details such as Pod Name, Pod IP, Pod UID, and other metadata, retrieved via the Downward API.](https://kodekloud.com/kk-media/image/upload/v1752877536/notes-assets/images/GitOps-with-ArgoCD-Create-ArgoCD-Project/kubernetes-pod-details-table.jpg)

---

## Summary

In this lesson, you have learned how to:

- Review the default ArgoCD project configuration.
- Create a custom project with restrictions on source repositories and cluster-level resource deployment.
- Configure project settings via the UI by whitelisting an approved repository and denying ClusterRole resources.
- Deploy an application using the custom project, address synchronization errors due to denied resources, and verify a successful deployment of allowed resources.

Implementing project restrictions in ArgoCD allows you to enforce fine-grained control over application deployments, ensuring that only authorized resources and repositories are used.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/633ab121-4c42-4e13-aec9-bf5d798bd947)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/de9a1652-a68e-49b9-921b-76d9e351c425)**
>
> Practice lab
