# Deployment Automation with GitHub Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Deployment-Automation-with-GitHub-Actions)

---

## Table of Contents

- Deployment Automation with GitHub Actions
  - 1. Setting Up GitHub Actions
  - 2. Provisioning an Azure Web App
  - 3. Extending the Workflow for Azure Deployment
  - 4. Configuring GitHub Secrets
  - 5. Observing the Pipeline
  - 6. Verifying in Azure
  - Recap
  - Links and References
  - Watch Video
    - 1.1 Simple Deploy-to-Azure Workflow

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Deployment Automation with GitHub Actions

Automating your deployment pipeline is essential for delivering fast, reliable updates. In this guide, we’ll build a CI/CD workflow using **GitHub Actions** to deploy a Node.js app—the KodeKloud Coffee Shop website—to **Azure App Service**. This end-to-end example covers:

- Defining workflows in `.github/workflows`
- Provisioning an App Service
- Splitting build and deploy jobs
- Securing credentials with GitHub Secrets

![The image shows a webpage for "KodeKloud Coffee Shop" with a photo of people standing at a coffee shop counter. It includes sections about their coffees, mission, and an invitation to visit.](https://kodekloud.com/kk-media/image/upload/v1752867823/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/kodekloud-coffee-shop-webpage-photo.jpg)

## 1\. Setting Up GitHub Actions

Workflows live in the `.github/workflows` folder. They can compile code, run tests, build artifacts, and deploy—all triggered by GitHub events or manual dispatch.

Here’s our sample repo structure for **KodeKloudCoffee**:

![The image shows a GitHub repository page for "KodeKloudCoffee," featuring a list of files and a README section describing a coffee shop website project. The repository includes various files and has no stars or forks.](https://kodekloud.com/kk-media/image/upload/v1752867824/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/kodekloudcoffee-github-repo-readme.jpg)

You can start from scratch or pick a template in the Actions UI:

![The image shows a GitHub Actions interface with options for configuring various deployment and continuous integration workflows, such as deploying Node.js to Azure and Amazon ECS.](https://kodekloud.com/kk-media/image/upload/v1752867825/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/github-actions-deployment-workflows-interface.jpg)

### 1.1 Simple Deploy-to-Azure Workflow

This minimal workflow runs on every push to `main`, sets up Node.js, builds, and tests your app.

```
name: Deploy to Azure
on:
  push:
    branches: [ main ]


jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2


      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14.x'


      - run: npm install
      - run: npm run build --if-present
      - run: npm test --if-present
```

Key concepts:

| Trigger   | Runner          | Actions vs. Commands                         |
| --------- | --------------- | -------------------------------------------- |
| `on.push` | `ubuntu-latest` | `uses:` pre-built actions; `run:` shell code |

## 2\. Provisioning an Azure Web App

Create an Azure App Service to host your Node.js site. In the Azure portal:

1.  Go to **App Services** > **Create**.
2.  Configure basics:

| Setting        | Recommended Value       |
| -------------- | ----------------------- |
| Subscription   | Your Azure subscription |
| Resource group | Create or select one    |
| Name           | `kodekloudcoffee`       |
| Publish        | Code                    |
| Runtime stack  | Node.js                 |
| Region         | Central US              |
| OS             | Linux                   |

![The image shows the Microsoft Azure portal interface for creating a new web app, with options for subscription, resource group, instance details, runtime stack, operating system, and region selection.](https://kodekloud.com/kk-media/image/upload/v1752867827/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/azure-portal-new-web-app-interface.jpg)

3.  Choose a pricing plan (Free tier is fine) and click **Review + create**:

![The image shows the "Create Web App" page on Microsoft Azure, where options for runtime stack, operating system, region, pricing plans, and zone redundancy are being configured.](https://kodekloud.com/kk-media/image/upload/v1752867830/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/create-web-app-azure-configurations.jpg)

> [!important]
> **Warning**
>
> Linux apps don’t support automatic GitHub Actions setup in the portal. We’ll configure our CI/CD workflow manually below.

4.  Skip the “Get GitHub Actions” prompt and click **Create**:

![The image shows the "Create Web App" page on Microsoft Azure, where settings for continuous deployment and GitHub integration are being configured.](https://kodekloud.com/kk-media/image/upload/v1752867831/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/create-web-app-azure-github-settings.jpg)

5.  Once provisioning completes, download the **Publish Profile** (XML). Store this file securely outside your repo.

![The image shows a Microsoft Azure portal page for creating a web app, displaying details like subscription, resource group, and app service plan. The configuration includes a free SKU, Node 20 LTS runtime stack, and Linux operating system.](https://kodekloud.com/kk-media/image/upload/v1752867832/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/azure-portal-web-app-configuration.jpg)

## 3\. Extending the Workflow for Azure Deployment

Enhance the workflow to split build and deploy, add manual triggers, environment variables, and use the Azure Deploy action.

```
name: Deploy to Azure


on:
  push:
    branches: [ main ]
  workflow_dispatch:


env:
  AZURE_WEBAPP_NAME: kodekloudcoffee
  AZURE_WEBAPP_PACKAGE_PATH: '.'
  NODE_VERSION: '20.x'


permissions:
  contents: read


jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4


      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm


      - name: Install, Build & Test
        run: |
          npm install
          npm run build --if-present
          npm test --if-present


      - name: Upload Artifact
        uses: actions/upload-artifact@v3
        with:
          name: node-app
          path: .


  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: none
    environment:
      name: Development
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}
    steps:
      - name: Download Artifact
        uses: actions/download-artifact@v3


      - name: Deploy to Azure WebApp
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
```

## 4\. Configuring GitHub Secrets

1.  In your repo, navigate to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**:
    - **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
    - **Value**: Paste the contents of your downloaded publish profile XML
3.  Commit your updated workflow file (`main.yml`). This triggers the pipeline.

## 5\. Observing the Pipeline

After you push, open the **Actions** tab to view your workflow runs. You’ll see two jobs—**build** and **deploy**—linked by the `needs` dependency:

![The image shows a GitHub Actions page with two workflow runs, "Update main.yml" and "Create main.yml," both successfully completed.](https://kodekloud.com/kk-media/image/upload/v1752867834/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/github-actions-workflows-update-create.jpg)

Drill into the **build** job to review each step and the uploaded artifact:

![The image shows a GitHub Actions workflow interface for a project named "KodeKloudCoffee," displaying the successful completion of a build job with detailed steps and annotations.](https://kodekloud.com/kk-media/image/upload/v1752867835/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/github-actions-kodekloudcoffee-workflow.jpg)

## 6\. Verifying in Azure

In the Azure portal, open your App Service and check **Deployment Center** or **Logs** to confirm a successful release:

![The image shows the Microsoft Azure portal interface for a web app named "kodekloudcoffee," displaying its overview, properties, and deployment details.](https://kodekloud.com/kk-media/image/upload/v1752867836/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Deployment-Automation-with-GitHub-Actions/azure-portal-kodekloudcoffee-overview.jpg)

Your **KodeKloud Coffee Shop** is now live, updating automatically on every push to `main`.

## Recap

- Defined multi-trigger GitHub Actions workflow with `push` and `workflow_dispatch`.
- Separated **build** and **deploy** jobs for clarity and efficiency.
- Cached dependencies, ran tests, and uploaded build artifacts.
- Deployed to Azure App Service using `azure/webapps-deploy` and a publish profile stored in GitHub Secrets.

This CI/CD pipeline demonstrates the fundamentals of **GitHub Actions** and **Azure deployment**, paving the way for advanced practices like infrastructure as code, staging environments, and multi-stage releases.

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [actions/setup-node](https://github.com/actions/setup-node)
- [azure/webapps-deploy](https://github.com/Azure/webapps-deploy)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/9dd9a3ad-277a-4f7a-a03b-ce547011aad6)**
>
> Watch video content
