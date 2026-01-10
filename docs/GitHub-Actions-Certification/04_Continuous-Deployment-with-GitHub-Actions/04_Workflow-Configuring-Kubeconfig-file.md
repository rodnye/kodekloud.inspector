# Workflow Configuring Kubeconfig file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Workflow-Configuring-Kubeconfig-file)

---

## Table of Contents

- Workflow Configuring Kubeconfig file
  - 1. Base Workflow: No Kubeconfig Context
  - 2. Store Your Kubeconfig as a Secret
  - 3. Choose the azure/k8s-set-context Action
  - 4. Update Your Workflow with the Kubeconfig Step
  - 5. Verify the Workflow Run
  - References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Workflow Configuring Kubeconfig file

Enable seamless authentication between `kubectl` and your Kubernetes cluster by injecting your Kubeconfig into a GitHub Actions workflow. This tutorial covers every step—from adding your Kubeconfig as a secret to verifying cluster connectivity.

## 1\. Base Workflow: No Kubeconfig Context

Below is an example `dev-deploy` job defined in `.github/workflows/ci.yml`. It installs `kubectl` but cannot fetch cluster data until a valid context is configured.

```
dev-deploy:
  needs: docker
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4


    - name: Install kubectl CLI
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.26.0'


    - name: Fetch Kubernetes cluster details
      run: |
        kubectl version --short
        echo '---------------------------'
        kubectl get nodes
```

## 2\. Store Your Kubeconfig as a Secret

Copy the contents of your local Kubeconfig file. It typically includes your cluster endpoint, certificate data, and user credentials:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: <base64-encoded-ca-cert>
    server: https://your-cluster-endpoint:6443
  name: your-cluster
contexts:
- context:
    cluster: your-cluster
    user: your-user
  name: your-context
current-context: your-context
users:
- name: your-user
  user:
    client-certificate-data: <base64-encoded-client-cert>
    client-key-data: <base64-encoded-client-key>
```

1.  In your GitHub repo, navigate to **Settings > Secrets and variables > Actions**.
2.  Click **New repository secret**.
3.  Name it `KUBECONFIG` and paste the full Kubeconfig content.

> [!important]
> **Warning**
>
> Never expose your Kubeconfig file in public repositories. Store it only as a GitHub Actions secret.

![The image shows a GitHub repository settings page for managing secrets and variables, with options to add new secrets and a list of existing repository secrets like `DOCKERHUB_PASSWORD`, `KUBECONFIG`, and `MONGO_PASSWORD`.](https://kodekloud.com/kk-media/image/upload/v1752875918/notes-assets/images/GitHub-Actions-Certification-Workflow-Configuring-Kubeconfig-file/github-repo-settings-secrets-variables.jpg)

## 3\. Choose the `azure/k8s-set-context` Action

To apply your Kubeconfig in the workflow environment, use the [azure/k8s-set-context](https://github.com/Azure/k8s-set-context) action. It handles writing the secret to a file and switching the current Kubernetes context.

![The image shows a GitHub Marketplace search results page for "kubeconfig" under the Actions category, displaying various tools related to Kubernetes configuration.](https://kodekloud.com/kk-media/image/upload/v1752875919/notes-assets/images/GitHub-Actions-Certification-Workflow-Configuring-Kubeconfig-file/github-marketplace-kubeconfig-actions-tools.jpg)

## 4\. Update Your Workflow with the Kubeconfig Step

Integrate the context-setting action before any `kubectl` commands:

```
dev-deploy:
  needs: docker
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4


    - name: Install kubectl CLI
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.26.0'


    - name: Configure kubeconfig context
      uses: azure/k8s-set-context@v3
      with:
        method: kubeconfig
        kubeconfig: ${{ secrets.KUBECONFIG }}


    - name: Fetch Kubernetes cluster details
      run: |
        kubectl version --short
        echo '---------------------------------'
        kubectl get nodes
```

> [!important]
> **Note**
>
> The `azure/k8s-set-context` action decodes your `KUBECONFIG` secret, writes it to the runner’s file system, and then updates `KUBECONFIG` environment variables automatically.

## 5\. Verify the Workflow Run

After pushing the updated workflow, navigate to the **Actions** tab in GitHub. You should see:

![The image shows a GitHub Actions workflow summary for a project, displaying successful completion of jobs like unit testing, code coverage, containerization, and deployment. The workflow is named "setup kubeconfig context" and has a total duration of 1 minute and 57 seconds.](https://kodekloud.com/kk-media/image/upload/v1752875920/notes-assets/images/GitHub-Actions-Certification-Workflow-Configuring-Kubeconfig-file/github-actions-workflow-summary-kubeconfig.jpg)

…and the detailed `dev-deploy` job steps:

![The image shows a GitHub Actions workflow interface with a series of completed jobs related to a "dev-deploy" process, including unit testing, code coverage, and Kubernetes configuration.](https://kodekloud.com/kk-media/image/upload/v1752875921/notes-assets/images/GitHub-Actions-Certification-Workflow-Configuring-Kubeconfig-file/github-actions-dev-deploy-workflow.jpg)

You should now see both client and server versions of `kubectl` as well as node details. This confirms your CI pipeline can authenticate to the Kubernetes cluster using the provided Kubeconfig.

## References

- [azure/setup-kubectl GitHub Action](https://github.com/Azure/setup-kubectl)
- [azure/k8s-set-context GitHub Action](https://github.com/Azure/k8s-set-context)
- [GitHub Actions: Creating and storing encrypted secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/e1aaf50e-9205-45cb-9fe9-4153de822b08)**
>
> Watch video content
