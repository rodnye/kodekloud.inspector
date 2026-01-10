# Solutions Service Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Solutions-Service-Account)

---

## Table of Contents

- Solutions Service Account
  - 1. Identifying Service Accounts in the Default Namespace
  - 2. Checking the Secret Token for the Default Service Account
  - 3. Inspecting the Dashboard Deployment
  - 4. Determining the Service Account Used by the Dashboard Application
  - 5. Creating a New Service Account for the Dashboard
  - 6. Updating the Deployment to Use the New Service Account
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Solutions Service Account

In this lesson, we will explore how to inspect and modify service account configurations in Kubernetes, focusing on the Kubernetes dashboard application's interaction with the Kubernetes API.

──────────────────────────────

## 1\. Identifying Service Accounts in the Default Namespace

To begin, check the number of service accounts in the default namespace by running:

```
kubectl get sa
```

The output might look like this:

```
controlplane ~ → kubectl get sa
NAME       SECRETS   AGE
default    0         20m
dev        0         35s


controlplane ~ →
```

This output shows two service accounts: **default** and **dev**.

──────────────────────────────

## 2\. Checking the Secret Token for the Default Service Account

Next, verify whether the default service account has an associated secret token. Run the following command:

```
kubectl describe serviceaccount default
```

Inspect the "Tokens" section in the output. In this case, it indicates that no token is set.

──────────────────────────────

## 3\. Inspecting the Dashboard Deployment

After deploying the dashboard application, inspect its deployment configuration and container image details.

1.  **List Deployments:**

    ```
    kubectl get deployments
    ```

2.  **Describe the Dashboard Deployment:**

    ```
    kubectl describe deployment web-dashboard
    ```

    Focus on the "Pod Template" section under "Containers." An example of the output is:

    ```
    Name:                   web-dashboard
    Namespace:              default
    CreationTimestamp:      Wed, 26 Jul 2023 22:41:47 +0000
    Labels:                 <none>
    Annotations:            deployment.kubernetes.io/revision: 1
    Selector:               name=web-dashboard
    Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
    StrategyType:           RollingUpdate
    MinReadySeconds:        0
    RollingUpdateStrategy:  25% max unavailable, 25% max surge
    Pod Template:
      Labels:  name=web-dashboard
      Containers:
       web-dashboard:
        Image:          gcr.io/kodekloud/customimage/my-kubernetes-dashboard
        Port:           8080/TCP
        Host Port:      0/TCP
        Environment:
          PYTHONUNBUFFERED:  1
        Mounts:        <none>
    Volumes:             <none>
    Conditions:
      Type             Status  Reason
      ----             ------  ------
      Available        True    MinimumReplicasAvailable
      Progressing      True    NewReplicaSetAvailable
    OldReplicaSets:     <none>
    NewReplicaSet:      web-dashboard-97c9c59f6 (1 replicas created)
    Events:
      Type    Reason                  Age   From                   Message
    ```

    At one point, an error occurs:

    ```
    pods is forbidden: User "system:serviceaccount:default:default" cannot list resource "pods" in API group "" in the namespace "default"
    ```

This error indicates that the dashboard application is using the default service account, which lacks the required permissions.

──────────────────────────────

## 4\. Determining the Service Account Used by the Dashboard Application

The logs and error messages confirm that the default service account is being used. To verify which service account is mounted on the dashboard pod, execute:

```
kubectl get pod
kubectl describe pod <pod-name>
```

Within the pod description, locate the **Service Account** section, which should indicate it is set to "default." Additionally, note that the credentials are mounted from:

```
/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-swjvh (ro)
```

This directory is where the dashboard pod accesses its service account tokens and related secrets.

──────────────────────────────

## 5\. Creating a New Service Account for the Dashboard

Since the default service account has limited permissions, create a new service account (named **dashboard-sa**) with enhanced rights.

1.  **Create the New Service Account:**

    ```
    kubectl create serviceaccount dashboard-sa
    ```

    You should see a confirmation message:

    ```
    serviceaccount/dashboard-sa created
    ```

2.  **Review RBAC Configurations:**

    Check the RBAC configuration files (e.g., `dashboard-sa-role-binding.yaml` and `pod-reader-role.yaml`) located in the `/var/rbac/` directory. These files contain role and role-binding settings that grant additional permissions. For more details on RBAC, review the relevant documentation.

3.  **Generate an Access Token:**

    To authenticate with the dashboard application, generate an access token for **dashboard-sa**:

    ```
    kubectl create token dashboard-sa
    ```

    The output might be similar to:

    ```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdmF0YXJzaW1lLmFwcGxpbWF0aW9uIiwibmFtZSI6ImRhc2hib2FyZC1zYSIsImlhdCI6MTY5MjkzMDM4OCwiZXhwIjoxNzA4Mzk2Mzg4LCJhdWQiOiJodHRwczovL2FkbWluLmRhc2hib2FyZC5jb20iLCJpc3MiOiJodHRwczovL3dlYi16YWhhYW5pdGUuY29tIn0.ksP0DhTDxueD9... (truncated)
    ```

    Copy the token and paste it into the dashboard UI. Once authenticated, you should see all the pods running within your cluster.

> [!important]
> **Dashboard Authentication**
>
> After generating the token for **dashboard-sa**, enter it into the dashboard UI to access the cluster's detailed information.

![The image shows a Kubernetes dashboard with a running container named "web-dashboard" and its IP address, under a teal background.](https://kodekloud.com/kk-media/image/upload/v1752871161/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solutions-Service-Account/frame_300.jpg)

──────────────────────────────

## 6\. Updating the Deployment to Use the New Service Account

To eliminate the need for manual token retrieval, update the dashboard deployment so it automatically uses **dashboard-sa**.

1.  **Export the Current Deployment Configuration:**

    ```
    kubectl get deployment web-dashboard -o yaml > dashboard.yaml
    ```

2.  **Update the Deployment YAML:**

    Open `dashboard.yaml` in your preferred editor and locate the pod specification within the **spec** section. Add the `serviceAccountName` field with the value "dashboard-sa" under the pod spec. The updated portion should resemble:

    ```
    generation: 1
    name: web-dashboard
    namespace: default
    resourceVersion: "1024"
    uid: daaa0628-d1bd-4624-b5e3-9475f1958464
    spec:
      progressDeadlineSeconds: 600
      replicas: 1
      revisionHistoryLimit: 10
      selector:
        matchLabels:
          name: web-dashboard
      strategy:
        rollingUpdate:
          maxSurge: 25%
          maxUnavailable: 25%
        type: RollingUpdate
      template:
        metadata:
          creationTimestamp: null
          labels:
            name: web-dashboard
        spec:
          serviceAccountName: dashboard-sa
          containers:
          - env:
            - name: PYTHONUNBUFFERED
              value: "1"
            image: gcr.io/kodekloud/customimage/my-kubernetes-dashboard
            imagePullPolicy: Always
            name: web-dashboard
            ports:
            - containerPort: 8080
              protocol: TCP
            resources: {}
    ```

3.  **Apply the Updated Configuration:**

    ```
    kubectl apply -f dashboard.yaml
    ```

    You might see a warning about a missing annotation due to changes in resource management history; this warning is harmless as the configuration will be patched automatically.

4.  **Verify the Deployment:**

    Check the deployment status by running:

    ```
    kubectl get deployment
    ```

After applying these changes, refresh your dashboard application. The pod will now automatically mount the credentials for **dashboard-sa**, eliminating the need for manual token entry.

──────────────────────────────

## Conclusion

By following these steps, you have accomplished the following:

- Identified service accounts in the default namespace.
- Inspected the token associated with the default service account.
- Noted that the dashboard application was using a default account with insufficient permissions.
- Created a new service account (**dashboard-sa**) with enhanced permissions using RBAC.
- Updated the dashboard deployment to automatically use the new service account, streamlining the authentication process with the Kubernetes API.

> [!important]
> **Final Notes**
>
> Managing service accounts and RBAC configurations properly is vital for maintaining security and operational efficiency in your Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/5ab0c268-683e-4a9e-9903-b2b43ae17cc0)**
>
> Watch video content
