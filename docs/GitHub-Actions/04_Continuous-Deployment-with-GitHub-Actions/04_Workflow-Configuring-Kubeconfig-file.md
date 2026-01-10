# Workflow Configuring Kubeconfig file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Workflow-Configuring-Kubeconfig-file)

---

## Table of Contents

- Workflow Configuring Kubeconfig file
  - Initial Workflow
  - Adding the Kubeconfig Secret
  - Selecting the Context Action
  - Final Workflow with Kubeconfig
  - Monitoring Workflow Results
  - Links and References
  - Watch Video
    - Workflow Step Summary
    - Sample Logs

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Workflow Configuring Kubeconfig file

In this guide, you'll learn how to configure a Kubeconfig file within a GitHub Actions workflow, enabling `kubectl` to authenticate and interact with a remote Kubernetes cluster as part of your CI/CD pipeline.

## Initial Workflow

Below is the existing `dev-deploy` job before integrating the Kubeconfig step:

```
dev-deploy:
  needs: docker
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Repository
      uses: actions/checkout@v4


    - name: Install kubectl CLI
      uses: azure/setup-kubectl@v3
      with:
        version: '1.26.0'


    - name: Fetch Kubernetes Cluster Details
      run: |
        kubectl version --short
        echo "-----------------------------------------"
        kubectl get nodes
```

> [!important]
> **Note**
>
> Without a configured context, `kubectl` cannot authenticate against your Kubernetes cluster in GitHub Actions.

## Adding the Kubeconfig Secret

To securely provide your cluster credentials, add the Base64-encoded Kubeconfig to GitHub Actions secrets:

1.  In your repository, go to **Settings > Secrets and variables > Actions**.
2.  Click **New repository secret**.
3.  Name the secret `KUBECONFIG`.
4.  Paste your Base64-encoded Kubeconfig content and save.

> [!important]
> **Warning**
>
> Never commit your plain Kubeconfig file to source control. Always store it as an encrypted secret.

![The image shows a GitHub repository settings page where a new secret named "KUBECONFIG" is being added under "Actions secrets." The secret value is a long encoded string, and there is an "Add secret" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752876466/notes-assets/images/GitHub-Actions-Workflow-Configuring-Kubeconfig-file/github-repo-settings-add-kubeconfig.jpg)

## Selecting the Context Action

Use the [azure/k8s-set-context@v3](https://github.com/Azure/k8s-set-context) action to apply the Kubeconfig in your workflow. You can find it by searching “kubeconfig” in the GitHub Marketplace under Actions.

![The image shows a GitHub Marketplace search results page for "kubeconfig" under the Actions category, displaying various tools and actions related to Kubernetes configuration.](https://kodekloud.com/kk-media/image/upload/v1752876468/notes-assets/images/GitHub-Actions-Workflow-Configuring-Kubeconfig-file/github-marketplace-kubeconfig-actions-tools.jpg)

## Final Workflow with Kubeconfig

Update your `dev-deploy` job to include a step that sets the Kubernetes context using the secret:

```
dev-deploy:
  needs: docker
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Repository
      uses: actions/checkout@v4


    - name: Install kubectl CLI
      uses: azure/setup-kubectl@v3
      with:
        version: '1.26.0'


    - name: Set Kubeconfig Context
      uses: azure/k8s-set-context@v3
      with:
        method: kubeconfig
        kubeconfig: ${{ secrets.KUBECONFIG }}


    - name: Fetch Kubernetes Cluster Details
      run: |
        kubectl version --short
        echo "----------------------------------------------------------------"
        kubectl get nodes
```

### Workflow Step Summary

| Step Name                | Action                     | Purpose                                 |
| ------------------------ | -------------------------- | --------------------------------------- |
| Checkout Repository      | `actions/checkout@v4`      | Retrieves code from your repo           |
| Install kubectl CLI      | `azure/setup-kubectl@v3`   | Installs specified `kubectl` version    |
| Set Kubeconfig Context   | `azure/k8s-set-context@v3` | Applies the `KUBECONFIG` secret         |
| Fetch Kubernetes Details | Shell command              | Verifies cluster access and lists nodes |

Commit and push these changes to trigger the GitHub Actions workflow. The pipeline will now read the `KUBECONFIG` secret, configure context, and run `kubectl` commands against your remote cluster.

## Monitoring Workflow Results

After completion, you should see a green checkmark on all jobs, including `dev-deploy`. The **Set Kubeconfig Context** step applies your credentials, and the subsequent step confirms connectivity.

![The image shows a GitHub Actions workflow summary for a project, displaying successful jobs including unit testing, code coverage, containerization, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752876468/notes-assets/images/GitHub-Actions-Workflow-Configuring-Kubeconfig-file/github-actions-workflow-summary-successful-jobs.jpg)

### Sample Logs

```
# Run azure/k8s-set-context@v3
with:
  method: kubeconfig
  kubeconfig: ***
  cluster-type: generic
env:
  MONGO_URI: mongodb+srv://supercluster.d83jj.mongodb.net/superData
  MONGO_USERNAME: superuser
  MONGO_PASSWORD: ***


# Run kubectl version --short
Flag --short has been deprecated and will be removed in the future. The --short output will become the default.
Client Version: v1.26.0
Kustomize Version: v4.5.7
Server Version: v1.26.9


# Run kubectl get nodes
NAME                           STATUS   ROLES   AGE   VERSION
lke136455-201804-875c46000000  Ready    node    2d    v1.26.3
```

Using this setup, `kubectl` authenticates with your remote cluster via the secure Kubeconfig file stored in GitHub Actions secrets.

## Links and References

- [azure/setup-kubectl](https://github.com/Azure/setup-kubectl) – GitHub Action to install `kubectl`
- [azure/k8s-set-context](https://github.com/Azure/k8s-set-context) – GitHub Action to configure Kubernetes context
- [GitHub Actions Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/f3f51b8d-1a5a-4060-86c6-fb65233bd156)**
>
> Watch video content
