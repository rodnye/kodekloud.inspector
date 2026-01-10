# Deploy to a cloud provider using a GitHub Actions workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow)

---

## Table of Contents

- Deploy to a cloud provider using a GitHub Actions workflow
  - Prerequisites
  - Official Deployment Docs & Resources
  - Create Azure App Service via CLI
  - Quick CI/CD Workflow Overview
  - Step 1: Create App Service in Azure Portal
  - Step 2: Authorize GitHub Access
  - Step 3: Secure GitHub Environment
  - Step 4: Automatic Workflow Commit
  - Step 5: Inspect GitHub Changes
  - Step 6: View Your Live App
  - Step 7: Review Deployment Logs
  - Sample Node.js Application Code
  - Manual Publish Profile Download
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Deploy to a cloud provider using a GitHub Actions workflow

Learn how to automate a complete CI/CD pipeline for your Node.js application using GitHub Actions and Azure App Service. In this guide, you’ll:

- Prepare Azure resources with the CLI or Portal
- Configure GitHub Actions workflows
- Securely connect GitHub to Azure
- Verify deployments in Azure and GitHub
- Optionally download a publish profile for manual setup

## Prerequisites

- A GitHub repository with your Node.js application
- An active [Azure subscription](https://azure.microsoft.com/free/)
- Azure CLI installed and authenticated (`az login`)
- Basic knowledge of GitHub Actions and YAML workflows

---

## Official Deployment Docs & Resources

GitHub maintains comprehensive guides for CI/CD with Azure. For more examples and advanced configuration, refer to:

- [GitHub Actions Documentation: Deploy to Azure](https://docs.github.com/actions/deployment/targeting-infrastructure-as-code/deploying-to-azure)
- [Azure App Service Documentation](https://learn.microsoft.com/azure/app-service/)

![The image shows a GitHub documentation page about deploying a Node.js project to Azure App Service using GitHub Actions. It includes sections like Introduction and Prerequisites.](https://kodekloud.com/kk-media/image/upload/v1752875884/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/github-actions-nodejs-azure-deployment.jpg)

---

## Create Azure App Service via CLI

Use the Azure CLI to provision your App Service plan and web app quickly.

```
# 1. Create an App Service plan (Linux, B1 SKU)
az appservice plan create \
  --resource-group MY_RESOURCE_GROUP \
  --name MY_PLAN_NAME \
  --is-linux \
  --sku B1


# 2. Create a Web App with Node.js runtime
az webapp create \
  --resource-group MY_RESOURCE_GROUP \
  --plan MY_PLAN_NAME \
  --name MY_WEBAPP_NAME \
  --runtime "NODE|14-lts"


# 3. Retrieve publish profile XML (for GitHub Secrets)
az webapp deployment list-publishing-profiles \
  --name MY_WEBAPP_NAME \
  --resource-group MY_RESOURCE_GROUP \
  --xml
```

> [!important]
> **Tip**
>
> Store the XML output as a GitHub Secret named `AZURE_WEBAPP_PUBLISH_PROFILE` for seamless deployment.

---

## Quick CI/CD Workflow Overview

Your GitHub Actions workflow typically defines two jobs:

| Job    | Purpose                                         | Key Actions                                  |
| ------ | ----------------------------------------------- | -------------------------------------------- |
| build  | Prepare application artifact                    | Checkout → Setup Node.js → Test → Zip        |
| deploy | Publish the build artifact to Azure App Service | Download → Unzip → `azure/webapps-deploy@v2` |

Here’s a minimal example (`.github/workflows/azure-nodejs.yml`):

```
name: Build and Deploy to Azure Web App


on:
  push:
    branches: [ main ]
  workflow_dispatch:


jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with: { node-version: '20.x' }
      - name: Install & Test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present
      - name: Package App
        run: zip release.zip . -r
      - uses: actions/upload-artifact@v3
        with: { name: node-app, path: release.zip }


  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: production
      url: ${{ steps.deploy.outputs.webapp-url }}
    steps:
      - uses: actions/download-artifact@v3
        with: { name: node-app }
      - name: Unzip Artifact
        run: unzip release.zip
      - id: deploy
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

---

## Step 1: Create App Service in Azure Portal

1.  Navigate to **App Services** → **Create**.
2.  Select your Subscription and Resource Group.
3.  Configure instance details (Runtime: Node.js, OS: Linux).

![The image shows a configuration screen for setting up an Azure App Service, including options for subscription, resource group, instance details, runtime stack, operating system, and region.](https://kodekloud.com/kk-media/image/upload/v1752875884/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/azure-app-service-configuration-screen.jpg)

4.  Choose a pricing plan (e.g., Basic B1).

![The image shows a table listing various computing options with details such as ACU/vCPU, vCPU, memory, remote storage, and scale. A "Basic B1" option is selected, highlighting its specifications.](https://kodekloud.com/kk-media/image/upload/v1752875885/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/computing-options-table-basic-b1.jpg)

5.  Under **Deployment**, enable **GitHub Actions** and authenticate.

---

## Step 2: Authorize GitHub Access

When prompted, grant Azure permission to your GitHub account and repository:

![The image shows a Microsoft Azure portal screen for creating a web app, with a pop-up window for authorizing Azure App Service to access a GitHub account. The pop-up includes options to authorize access to repositories and update GitHub Action workflow files.](https://kodekloud.com/kk-media/image/upload/v1752875887/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/azure-portal-web-app-github-access.jpg)

- Select Organization
- Choose Repository (e.g., **GA Cloud Deploy Demo**)
- Pick Branch (**main**)
- Preview & Confirm

---

## Step 3: Secure GitHub Environment

1.  In GitHub, go to **Settings** → **Environments**.
2.  Create an environment named `production`.
3.  (Optional) Add protection rules or required reviewers.

![The image shows a GitHub repository settings page, specifically the "Environments" section for configuring production deployment protection rules. It includes options for required reviewers, wait timers, and custom rules with GitHub Apps.](https://kodekloud.com/kk-media/image/upload/v1752875888/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/github-repo-settings-environments-deployment.jpg)

---

## Step 4: Automatic Workflow Commit

Azure provisions the resources and commits a workflow file to `.github/workflows/`:

![The image shows a Microsoft Azure portal page indicating that a web app deployment is complete, with details about the resources and their status.](https://kodekloud.com/kk-media/image/upload/v1752875890/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/azure-portal-web-app-deployment-complete.jpg)

---

## Step 5: Inspect GitHub Changes

- **Secrets**: A new `AZURE_WEBAPP_PUBLISH_PROFILE` appears under **Settings** → **Secrets**.
- **Workflow**: `.github/workflows/main_<webapp>.yaml` is added.
- **Actions**: View your first run.

![The image shows a GitHub Actions workflow summary for building and deploying a Node.js app to Azure Web App. The workflow was successful, with separate build and deploy steps, and includes warnings about deprecated Node.js actions.](https://kodekloud.com/kk-media/image/upload/v1752875891/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/github-actions-nodejs-azure-deploy.jpg)

---

## Step 6: View Your Live App

GitHub Actions outputs the application URL after deployment. Click the link to verify your app:

![The image shows a digital representation of the solar system with planets orbiting the sun, accompanied by a description and interactive elements for exploring the planets.](https://kodekloud.com/kk-media/image/upload/v1752875892/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/solar-system-planets-orbiting-sun.jpg)

---

## Step 7: Review Deployment Logs

- **Build Job**: Checkout, Node.js setup, install, build, test, and packaging.
- **Deploy Job**: Artifact download, unzip, and Azure webapp zip-deploy.

![The image shows a GitHub Actions page where a Node.js app is being deployed to an Azure Web App. The deployment process is complete, as indicated by the success message.](https://kodekloud.com/kk-media/image/upload/v1752875893/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/github-actions-nodejs-azure-deployment-2.jpg)

---

## Sample Node.js Application Code

Below is a simple Express app. **Do not** hardcode credentials in production—use GitHub Secrets and environment variables.

```
// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://cluster.mongodb.net/superData', {
  user: 'superuser',
  pass: 'SuperPassword',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) console.error('MongoDB connection error:', err);
});


// Define Schema
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String
});


// ...routes and server startup...
```

> [!important]
> **Warning**
>
> Never commit secrets or plaintext credentials to your repository. Always leverage [GitHub Secrets](/docs/actions/security-guides/encrypted-secrets).

---

## Manual Publish Profile Download

If you prefer a manual setup:

1.  In the Azure portal, select your Web App → **Get publish profile**.
2.  Download the XML and save it as `AZURE_WEBAPP_PUBLISH_PROFILE` in GitHub Secrets.

![The image shows the Microsoft Azure portal interface for a web app named "ga-solar-system-demo," displaying its overview, properties, and deployment details. It includes information about the resource group, status, location, and associated GitHub project.](https://kodekloud.com/kk-media/image/upload/v1752875894/notes-assets/images/GitHub-Actions-Certification-Deploy-to-a-cloud-provider-using-a-GitHub-Actions-workflow/azure-portal-ga-solar-system-demo.jpg)

```
<publishData>
  <publishProfile
    profileName="ga-solar-system-demo - Web Deploy"
    publishMethod="MSDeploy"
    publishUrl="ga-solar-system-demo.scm.azurewebsites.net:443"
    msdeploySite="ga-solar-system-demo"
    userName="$ga-solar-system-demo"
    userPWD="YOUR_PASSWORD"
    destinationAppUrl="https://ga-solar-system-demo.azurewebsites.net/">
    <!-- ... -->
  </publishProfile>
</publishData>
```

---

Congratulations! You’ve now set up a full CI/CD pipeline to build, test, and deploy your Node.js app to Azure App Service with GitHub Actions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/93f4e3b3-416c-4e9a-bfd3-4f13499e9a53)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/8fdd90c2-c547-44dc-b6c5-c0ee11ab5ff4)**
>
> Practice lab
