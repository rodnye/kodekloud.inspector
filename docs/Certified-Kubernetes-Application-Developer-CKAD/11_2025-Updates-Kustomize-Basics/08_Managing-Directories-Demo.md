# Managing Directories Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Managing-Directories-Demo)

---

## Table of Contents

- Managing Directories Demo
  - Deploying Without Kustomize
  - Introducing Kustomize
  - Refining the Directory Structure with Nested Kustomization Files
  - Watch Video
  - Practice Lab
    - For the API Folder
    - For the Cache Folder
    - For the DB Folder

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Managing Directories Demo

In this lesson, you'll learn how to organize Kubernetes manifests into directories and apply them using both standard kubectl commands and Kustomize. This approach helps maintain a clean, modular structure for your Kubernetes configurations, improving manageability and scalability.

The directory structure is organized as follows:

- A main "K8s" directory containing:
  - An "api" folder that holds Kubernetes configurations for your API.
  - A "cache" folder that contains configurations for your cache service (for example, a Redis instance).
  - A "db" folder that stores configurations for your database service (for example, a MongoDB instance).

Within each folder, YAML files define deployments, services, and config maps. For example, the database folder includes a deployment YAML for a MongoDB container, while the other folders typically feature either a ClusterIP or LoadBalancer service and, optionally, a config map.

---

Below is an example Kubernetes Service configuration for Redis:

```
apiVersion: v1
kind: Service
metadata:
  name: redis-cluster-ip-service
spec:
  type: ClusterIP
  selector:
    component: redis
  ports:
    - port: 6379
      targetPort: 6379
```

Before using Kustomize, resources are deployed using the standard methodologies. For instance, here is a ConfigMap definition for Redis credentials:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-credentials
data:
  username: "redis"
  password: "password123"
```

---

## Deploying Without Kustomize

To deploy resources without Kustomize, open your terminal, navigate into each directory, and run the appropriate commands. For example:

```
kubectl apply -f k8s/api
deployment.apps/api-deployment created
service/api-service created
kubectl apply -f k8s/cache
```

You can apply the resources sequentially for clarity:

```
kubectl apply -f k8s/api
deployment.apps/api-deployment created
service/api-service created


kubectl apply -f k8s/cache
configmap/redis-credentials created
deployment.apps/redis-deployment created
service/redis-cluster-ip-service created


kubectl apply -f k8s/db
configmap/db-credentials created
deployment.apps/db-deployment created
service/db-service created
```

Alternatively, you can deploy all resources in one command. Note that reapplying resources will not change their state if nothing has been updated:

```
kubectl apply -f k8s/db -f k8s/cache -f k8s/api
```

To clean up the applied resources, execute:

```
kubectl delete -f k8s/db -f k8s/cache -f k8s/api
```

> [!important]
> **Note**
>
> Deploying resources sequentially can help troubleshoot issues more effectively, as you can pinpoint where a problem occurs.

---

## Introducing Kustomize

Kustomize simplifies resource management by allowing you to create a single, consolidated kustomization file at the root of your "K8s" directory. Begin by creating a `kustomization.yaml` file in the K8s directory with the content below:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - cache/
  - db/
```

Before proceeding, delete the previously applied resources to avoid conflicts:

```
kubectl delete -f k8s/db -f k8s/cache -f k8s/api
configmap "db-credentials" deleted
deployment.apps "db-deployment" deleted
service "db-service" deleted
configmap "redis-credentials" deleted
deployment.apps "redis-deployment" deleted
service "redis-cluster-ip-service" deleted
deployment.apps "api-deployment" deleted
service "api-service" deleted
```

The kustomization file begins by defining the API version and the kind. Next, specify the paths of the individual resource directories (or individual YAML files if desired). For example, to include resources from the API folder:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
```

A complete kustomization file that imports configurations from all directories might look like this:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/api-depl.yaml
  - api/api-service.yaml
  - cache/redis-config.yaml
  - cache/redis-depl.yaml
  - cache/redis-service.yaml
  - db/db-config.yaml
  - db/db-depl.yaml
  - db/db-service.yaml
```

Run the following command to perform a Kustomize build, which outputs the consolidated Kubernetes manifests:

```
kustomize build k8s/
```

The output will include configurations from the cache, database, and API folders. Keep in mind that `kustomize build` only displays the final output without applying the configurations. To apply the built manifests, pipe the output into `kubectl apply`:

```
kustomize build k8s/ | kubectl apply -f -
```

Alternatively, use the built-in Kustomize functionality built into kubectl:

```
kubectl apply -k k8s/
```

A successful output should indicate that all resources have been created:

```
configmap/db-credentials created
configmap/redis-credentials created
service/api-service created
service/db-service created
service/redis-cluster-ip-service created
deployment.apps/api-deployment created
deployment.apps/db-deployment created
deployment.apps/redis-deployment created
```

Verify that your pods are running with:

```
kubectl get pods
NAME                                      READY   STATUS    RESTARTS   AGE
api-deployment-64dd567b46-1mw4c          1/1     Running   0          27s
db-deployment-657c8ffbd-vnjs7            1/1     Running   0          26s
redis-deployment-587fd758cf-7pt57        1/1     Running   0          26s
```

> [!important]
> **Tip**
>
> Using Kustomize can significantly reduce the complexity of managing resources in your cluster, especially as your application scales.

---

## Refining the Directory Structure with Nested Kustomization Files

For enhanced scalability, you can place a `kustomization.yaml` file within each subdirectory. This modular approach lets each folder manage its own resources independently. The root `kustomization.yaml` then simply references these subdirectories.

### For the API Folder

Create a `kustomization.yaml` file inside the "api" folder with the following content:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
```

### For the Cache Folder

Inside the "cache" folder, create a `kustomization.yaml` file:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - redis-config.yaml
  - redis-depl.yaml
  - redis-service.yaml
```

### For the DB Folder

Similarly, in the "db" folder, create a `kustomization.yaml` file:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
```

Finally, update the root `kustomization.yaml` to reference the subdirectories, each containing its own `kustomization.yaml`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - cache/
  - db/
```

After deleting any old resources, apply the new configuration with:

```
kubectl apply -k k8s/
```

The output should confirm that all resources have been created:

```
configmap/redis-credentials created
service/api-service created
service/db-service created
service/redis-cluster-ip-service created
deployment.apps/api-deployment created
deployment.apps/db-deployment created
deployment.apps/redis-deployment created
```

Verify the status of your pods with:

```
kubectl get pods
NAME                                      READY   STATUS    RESTARTS   AGE
api-deployment-64dd567b46-lmw4c           1/1     Running   0          27s
db-deployment-657c8ffb8-vmjs7              1/1     Running   0          26s
redis-deployment-587fd758cf-7pt57         1/1     Running   0          26s
```

---

This modular approach, which utilizes nested `kustomization.yaml` files, makes managing and scaling your Kubernetes configurations easier as your application grows. For more in-depth information on Kubernetes resources and configuration best practices, explore the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/pages/applying_manifests/kustomize.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/a5f8f67c-8464-47f3-bce5-af33781f3964)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/cc61109a-4e64-441d-9896-b25712f0d63c)**
>
> Practice lab
