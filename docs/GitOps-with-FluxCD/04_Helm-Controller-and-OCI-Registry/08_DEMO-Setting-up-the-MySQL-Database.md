# DEMO Setting up the MySQL Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/DEMO-Setting-up-the-MySQL-Database)

---

## Table of Contents

- DEMO Setting up the MySQL Database
  - 1. Update the PHP Application
  - 2. Inspect the Infrastructure Branch
  - 3. Create a Flux GitRepository Source
  - 4. Create a Flux Kustomization
  - 5. Reconcile and Verify
  - Flux Resources Overview
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# DEMO Setting up the MySQL Database

In this guide, we’ll walk through deploying a MySQL database on Kubernetes using Flux’s GitRepository and Kustomization controllers along with Kustomize manifests. By following these steps, you will:

1.  Update the PHP application to connect to MySQL
2.  Define Kubernetes manifests for MySQL
3.  Use Flux GitRepository and Kustomization resources for GitOps deployment

---

## 1\. Update the PHP Application

On the `7-demo` branch, the PHP app has been extended to store high scores in a MySQL database. The connection logic in `highscore.php` now looks like:

```
<?php
$servername = "mysql.database.svc.cluster.local";
$username   = "root";
$password   = "mysql-password-0123456789";
$dbname     = "bricks";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Escape and use the posted high score
$highscore = mysqli_real_escape_string($conn, $_POST['highscore']);
// ... (insert logic)
```

Ensure you’re on the correct branch in your terminal:

```
git checkout 7-demo
# root ~/bb-app-source 7-demo [?]
```

---

## 2\. Inspect the Infrastructure Branch

All MySQL manifests and namespace definitions reside in the `infrastructure` branch under the `database/` directory:

```
git checkout infrastructure
ls
# bitnami-sealed-secrets/  cert-manager/  database/  ingress-nginx/  block-buster-helm-app-7.7.1.tgz
```

Inside `database/`, you’ll find:

- `namespace.yaml`
- `configmap.yaml`
- `secret.yaml`
- `deployment.yaml`
- `service.yaml`
- PersistentVolume and PersistentVolumeClaim manifests

```
# database/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-mysql
  namespace: database
stringData:
  password: mysql-password-0123456789
```

> [!important]
> **Warning**
>
> Storing passwords in plain text is insecure. Use sealed-secrets or another secret management solution for production environments.

---

## 3\. Create a Flux GitRepository Source

Define a `GitRepository` resource in your Flux cluster repo (`flux-clusters/dev-cluster`) to track the `infrastructure` branch:

```
# infra-source-git.yml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: infra-source-git
  namespace: flux-system
spec:
  interval: 1m0s
  url: https://github.com/sidd-harth-2/bb-app-source
  ref:
    branch: infrastructure
```

Export it with the Flux CLI:

```
cd ~/block-buster/flux-clusters/dev-cluster
flux create source git infra-source-git \
  --url https://github.com/sidd-harth-2/bb-app-source \
  --branch infrastructure \
  --timeout 10s \
  --export > infra-source-git.yml
```

---

## 4\. Create a Flux Kustomization

Use a Kustomization to apply resources under `database/`:

```
# infra-database-kustomize-git-mysql.yml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: infra-database-kustomize-git-mysql
  namespace: flux-system
spec:
  interval: 1m40s
  path: ./database
  prune: true
  sourceRef:
    kind: GitRepository
    name: infra-source-git
  targetNamespace: database
```

Generate via:

```
flux create kustomization infra-database-kustomize-git-mysql \
  --source GitRepository/infra-source-git \
  --path ./database \
  --prune true \
  --target-namespace database \
  --interval 100s \
  --export > infra-database-kustomize-git-mysql.yml
```

Commit and push both manifests:

```
git add infra-source-git.yml infra-database-kustomize-git-mysql.yml
git commit -m "Add MySQL DB source and kustomization"
git push
```

---

## 5\. Reconcile and Verify

Force Flux to apply changes immediately:

```
flux reconcile source git infra-source-git
flux reconcile kustomization infra-database-kustomize-git-mysql
```

Check that the `database` namespace is created:

```
kubectl get ns
# NAME        STATUS   AGE
# database    Active   <age>
```

Inspect Flux sources and kustomizations:

```
flux get sources git infra-source-git
flux get kustomizations infra-database-kustomize-git-mysql
```

Verify MySQL resources in `database` namespace:

```
kubectl -n database get all,cm,secret
# NAME                                READY   STATUS    RESTARTS   AGE
# pod/mysql-xxxxxxxxxx-xxxxx          1/1     Running   0          <age>
# service/mysql                       ClusterIP 10.96.x.x 3306/TCP    <age>
# deployment.apps/mysql               1/1       Available   0        <age>
#
# NAME                             AGE
# configmap/mysql-initdb-config    <age>
# secret/secret-mysql              <age>
```

The MySQL database is now up and running! Next, we’ll pull the PHP application image from an OCI registry and deploy it with Flux.

---

## Flux Resources Overview

| Resource Type | Purpose                                  | Flux CLI Example                                                                                             |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| GitRepository | Track changes in a Git repo              | `flux create source git infra-source-git --url <repo> --branch infrastructure`                               |
| Kustomization | Apply and manage manifests via Kustomize | `flux create kustomization infra-database --source GitRepository/infra-source-git --path ./database --prune` |

---

## Links and References

- [Flux GitRepository Documentation](https://fluxcd.io/docs/components/source/git/)
- [Flux Kustomization Documentation](https://fluxcd.io/docs/components/kustomize/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [MySQL Official Docs](https://dev.mysql.com/doc/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/938cb579-768a-48b1-8184-3fe116c36db3)**
>
> Watch video content
