# Configure cloud instances Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Configure-cloud-instances-Kubernetes)

---

## Table of Contents

- Configure cloud instances Kubernetes
  - 1. Install the Kubernetes Plugin
  - 2. Verify Plugin Installation
  - 3. Add a Kubernetes Cloud
  - 4. (Option A) Use a Full Kubeconfig File
  - 5. Create a Dedicated Namespace and Service Account
  - 6. Configure the Cloud with Token Credentials
  - 7. Grant Namespace Permissions
  - 8. Advanced Connection Settings
  - 9. Define Pod Templates and Retention
  - 10. Finalize and Save
  - Watch Video

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Configure cloud instances Kubernetes

Integrating Jenkins with Kubernetes enables dynamic agent provisioning, improving build scalability and resource utilization. This guide walks through installing the Kubernetes plugin, setting up credentials, and configuring a cloud instance in Jenkins.

## 1\. Install the Kubernetes Plugin

1.  In Jenkins, go to **Manage Jenkins** → **Manage Plugins**.
2.  Under the **Available** tab, filter for **Cloud** plugins.
3.  Find **Kubernetes** and click **Install without restart**.
4.  To install via CLI (pin to a specific version):

    ```
    jenkins-plugin-cli --plugins kubernetes:4295.v7fa_01b_309c95
    ```

5.  To upload an `.hpi` manually, switch to the **Advanced** tab and enter:

    ```
    https://updates.jenkins.io/download/plugins/kubernetes/4295.v7fa_01b_309c95/kubernetes.hpi
    ```

6.  Restart Jenkins after installation.

![The image shows a Jenkins plugin management interface with a list of available plugins related to cloud providers, such as Docker, Kubernetes, and Amazon EC2. The interface includes options to install and manage these plugins.](https://kodekloud.com/kk-media/image/upload/v1752868751/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-plugin-management-cloud-providers.jpg)

## 2\. Verify Plugin Installation

After Jenkins restarts:

1.  Go to **Manage Jenkins** → **Manage Plugins** → **Installed**.
2.  Search for “Kubernetes” to confirm the plugin is active.

![The image shows a Jenkins dashboard displaying installed plugins related to Kubernetes. The interface includes options for managing and enabling these plugins.](https://kodekloud.com/kk-media/image/upload/v1752868751/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-dashboard-kubernetes-plugins.jpg)

## 3\. Add a Kubernetes Cloud

1.  Navigate to **Manage Jenkins** → **Manage Nodes and Clouds** → **Configure Clouds**.
2.  Click **Add a new cloud** (➕) and choose **Kubernetes**.
3.  Give it a name (e.g., `prod-k8s-us-east`). Leave other fields blank for now; you’ll configure credentials next.

![The image shows a Jenkins interface for creating a new cloud configuration, with fields for entering details like name, Kubernetes URL, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752868752/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-cloud-configuration-interface.jpg)

## 4\. (Option A) Use a Full Kubeconfig File

> [!important]
> **Warning**
>
> Using a full kubeconfig grants admin-level access. Do **not** use this in production.

1.  Verify your nodes:

    ```
    kubectl get nodes
    ```

2.  Export the raw config:

    ```
    kubectl config view --raw > kubeconfig.yaml
    ```

3.  In Jenkins **Credentials**, add a **Secret file** credential and upload `kubeconfig.yaml`.
4.  In the cloud settings, select this credential under **Kubernetes Namespace** and **Test Connection**.

> After testing, remove this credential and follow the least-privilege approach below.

## 5\. Create a Dedicated Namespace and Service Account

Use the least-privilege principle:

```
kubectl create namespace jenkins
kubectl -n jenkins create serviceaccount jenkins-service-account
kubectl -n jenkins create token jenkins-service-account --duration=9999999s
```

In Jenkins **Credentials**, add a **Secret text** credential:

- **Kind**: Secret text
- **Secret**: Paste the token
- **ID**: `jenkins-service-account-token`

## 6\. Configure the Cloud with Token Credentials

1.  In the Kubernetes cloud settings:
    - **Kubernetes URL**: Your cluster endpoint (e.g., `https://<cluster-endpoint>`)
    - **Credentials**: `jenkins-service-account-token`
    - **Kubernetes Namespace**: `jenkins`
2.  Click **Test Connection**.

If you see certificate errors, either check **Skip Certificate Verification** or supply your CA certificate.

On first try you might get **403 Forbidden**—proceed to bind roles.

![The image shows a Jenkins configuration page with an error message indicating a connection test failure due to a certification path issue. There are fields for credentials, WebSocket, direct connection, Jenkins URL, and connection timeout.](https://kodekloud.com/kk-media/image/upload/v1752868753/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-configuration-error-certification.jpg)

## 7\. Grant Namespace Permissions

Bind the `admin` role to your service account in the `jenkins` namespace:

```
kubectl -n jenkins create rolebinding jenkins-admin-binding \
  --clusterrole=admin \
  --serviceaccount=jenkins:jenkins-service-account
```

Retry **Test Connection**; it should now succeed.

![The image shows a Jenkins interface where a user is configuring a new cloud, with options for Kubernetes Namespace and credentials selection. A notification at the bottom indicates that credentials have been created.](https://kodekloud.com/kk-media/image/upload/v1752868754/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-cloud-configuration-kubernetes.jpg)

## 8\. Advanced Connection Settings

- **TCP (JNLP) Ports**: Default agent communication.
- **WebSocket**: Use if TCP ports are blocked.
- **Direct Connection**: Override Jenkins URL (for proxies or gateways).

| Setting           | Use Case                                                |
| ----------------- | ------------------------------------------------------- |
| TCP (JNLP)        | Standard agent connections                              |
| WebSocket         | In restrictive network environments                     |
| Direct Connection | Custom URL for Jenkins server behind a proxy or ingress |

![The image shows a Jenkins configuration screen for setting up a new cloud, with options for Docker registry, credentials, and connection settings to Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752868755/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-cloud-configuration-docker-kubernetes.jpg)

## 9\. Define Pod Templates and Retention

1.  Set a **Pod Label** (e.g., `organization=KodeKloudAzureArc`).
2.  Add **Container Templates** for your build tools and environments.
3.  Configure **Pod Retention**:

| Retention Option | Behavior                          |
| ---------------- | --------------------------------- |
| Never            | Delete pods once builds finish    |
| On failure       | Keep pods only if the build fails |
| Always           | Never delete pods (for debugging) |

![The image shows a Jenkins configuration screen for setting up a new cloud, with fields for concurrency limit, pod labels, and Kubernetes API connections.](https://kodekloud.com/kk-media/image/upload/v1752868756/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-cloud-configuration-screen.jpg)

## 10\. Finalize and Save

Review your settings, then click **Save**. Your Jenkins instance can now dynamically provision Kubernetes agents for pipelines.

![The image shows a Jenkins configuration page for setting up a new cloud, with options for Kubernetes API connections, pod running time, and other settings. There are checkboxes for transferring environment variables and restricting pipeline support, along with a save button.](https://kodekloud.com/kk-media/image/upload/v1752868756/notes-assets/images/Advanced-Jenkins-Configure-cloud-instances-Kubernetes/jenkins-cloud-configuration-page.jpg)

---

Now you’re ready to run CI/CD pipelines using Kubernetes-based agents. For more details, see the [Jenkins Kubernetes Plugin Documentation](https://plugins.jenkins.io/kubernetes/) and the [Kubernetes Service Account Concepts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/1dc5ff53-dfac-4010-82b1-f592cc555ede)**
>
> Watch video content
