# Create Application using CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/Create-Application-using-CLI)

---

## Table of Contents

- Create Application using CLI
  - Creating Applications
  - Creating a Git Directory Application
  - Synchronizing Applications
  - Verifying the Deployment
  - Updating the Application
  - Conclusion
  - Watch Video
    - Key Flags for the Sync Command

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# Create Application using CLI

In this guide, you will learn how to create, synchronize, and verify an ArgoCD application using the command-line interface (CLI). Previously, we explored creating and deleting applications via the UI. Now, we'll delve into performing these tasks with the CLI for a more automated and scriptable approach.

## Creating Applications

You can create an ArgoCD application with the `argocd app create` command. This command supports various configuration options, allowing you to deploy applications managed as Git directory-based manifests, Jsonnet, Helm (from both Git and Helm repositories), Kustomize, or even using a custom configuration management plugin.

Below are examples for different application types:

```
# Create a directory-based app
argocd app create guestbook \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path guestbook \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc \
  --directory-recurse


# Create a Jsonnet app
argocd app create jsonnet-guestbook \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path jsonnet-guestbook \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc \
  --jsonnet-ext-str replicas=2


# Create a Helm app from a Git repository
argocd app create helm-guestbook \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path helm-guestbook \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc \
  --helm-set replicaCount=2


# Create a Helm app from a Helm repository
argocd app create nginx-ingress \
  --repo https://charts.helm.sh/stable \
  --helm-chart nginx-ingress \
  --revision 1.24.3 \
  --dest-name nginx-ingress \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc


# Create a Kustomize app
argocd app create kustomize-guestbook \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path kustomize-guestbook \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc \
  --kustomize-image gcr.io/heptio-images/ks-guestbook-demo:0.1


# Create an app using a custom configuration management plugin (e.g., kasane)
argocd app create kasane \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path plugins/kasane \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc \
  --config-management-plugin kasane
```

In these examples, you provide the application name, repository URL, path to your manifest files within the repository, destination namespace, and target server details.

## Creating a Git Directory Application

Next, create a Git directory application named "solar-system-app-2". This command specifies all required parameters, including the repository URL, the path to the application manifests, destination namespace, and the Kubernetes API server.

```
argocd app create solar-system-app-2 \
  --repo http://139.59.21.103:3000/siddharth/gitops-argocd \
  --path ./solar-system \
  --dest-namespace solar-system \
  --dest-server https://kubernetes.default.svc
```

After creating the application, list all applications to verify its creation:

```
argocd app list
```

Once executed, the output will include the new application with details about its repository, destination namespace, and target server. Initially, the status may appear as "OutOfSync".

## Synchronizing Applications

Synchronizing your application with its repository is simple with the `argocd app sync` command. This command handles syncing for individual applications, multiple applications, or even resources filtered by label selectors.

```
# Sync a single application
argocd app sync solar-system-app-2


# Sync multiple applications at once
argocd app sync my-app other-app


# Sync applications by label (helpful for app-of-apps scenarios)
argocd app sync -l app.kubernetes.io/instance=my-app


# Sync a specific resource within an application
argocd app sync my-app --resource :Service:my-service
argocd app sync my-app --resource argoproj.io:Rollout:my-rollout
argocd app sync my-app --resource argoproj.io:Rollout:my-namespace/my-rollout
```

### Key Flags for the Sync Command

| Flag                | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| \\--assumeYes       | Automatically confirms all prompts.                                    |
| \\--async           | Does not wait for the sync process to complete.                        |
| \\--dry-run         | Previews changes without applying them.                                |
| \\--force           | Forces the apply action, useful for overriding conflicts.              |
| \\--info            | Provides key-value pairs used during synchronization.                  |
| \\--label           | Filters resources by label, supports label-based operations.           |
| \\--local           | Specifies a local directory, bypassing Git queries.                    |
| \\--local-repo-root | Defines the repository root when using a local directory.              |
| \\--preview-changes | Shows differences before applying changes.                             |
| \\--prune           | Enables removal of resources not defined in the Git repository.        |
| \\--replace         | Uses a create/replace strategy instead of patching existing resources. |

After syncing, ArgoCD will provide detailed output on the application's sync status. For example:

```
Name:              solar-system-app-2
Project:           default
Server:            https://kubernetes.default.svc
Namespace:         solar-system
URL:               https://10.98.110.228/applications/solar-system-app-2
Repo:              http://139.59.21.103:3000/siddharth/gitops-argocd
Target:            ./solar-system
SyncWindow:        Sync Allowed
Sync Policy:       <none>
Sync Status:       Synced to (cb535e5)
Health Status:     Progressing


Operation:         Sync
Sync Revision:     cb535e59f804f8d4e795e92737c1d75235d1b1d
Phase:             Succeeded
Start:             2022-09-23 15:28:51 +0000 UTC
Finished:          2022-09-23 15:28:51 +0000 UTC
Duration:          0s
Message:           successfully synced (all tasks run)


GROUP   KIND         NAMESPACE             NAME
apps    Deployment   solar-system          solar-system
Service               solar-system-service  Synced     Healthy  service/solar-system-service created
```

This output confirms that the Deployment and Service were successfully applied to your Kubernetes cluster.

## Verifying the Deployment

After synchronization, you can verify that the deployed resources are running correctly by using `kubectl`:

```
kubectl -n solar-system get all
```

A sample output might be:

```
NAME                                  READY   STATUS    RESTARTS   AGE
pod/solar-system-7c569b7bdb-csslx       1/1     Running   0          34s


NAME                                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
service/solar-system-service            NodePort    10.96.97.234    <none>        80:31761/TCP    34s


NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/solar-system             1/1     1            1           34s


NAME                                     DESIRED   CURRENT   READY   AGE
replicaset.apps/solar-system-7c569b7bdb    1         1         1       34s
```

> [!important]
> **Note**
>
> This output confirms that a new pod is running and that the service is exposed on a NodePort (31761).

## Updating the Application

When you update your application (for example, by switching to a new Docker image version), you can inspect the updated Deployment manifest. Below is an example manifest that uses an updated image version ("vi"), ensuring that all nine planets are displayed in the solar system view:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
  namespace: solar-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: solar-system
  strategy: {}
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
        - image: siddharth67/solar-system:vi
          imagePullPolicy: Always
          name: solar-system
          ports:
            - containerPort: 80
```

After updating the manifest, synchronize the application using the CLI. Once applied, accessing the application via the designated NodePort should display all nine planets of the solar system.

## Conclusion

This article demonstrated how to manage ArgoCD applications using the CLI. The guide included creating applications using various configuration management tools, synchronizing those applications, and verifying their deployments within a Kubernetes cluster. This CLI-based approach provides a flexible, efficient alternative to managing GitOps workflows via the UI.

For further details and related guides, explore the following resources:

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Helm Charts](https://helm.sh/docs/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/f00dc1b3-f817-4fcd-b614-f814e0fb05ba)**
>
> Watch video content
