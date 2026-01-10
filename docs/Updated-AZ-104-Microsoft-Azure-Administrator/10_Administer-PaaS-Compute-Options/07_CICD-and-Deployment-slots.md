# CICD and Deployment slots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/CICD-and-Deployment-slots)

---

## Table of Contents

- CICD and Deployment slots
  - CI/CD Overview
  - Configuring CI/CD in Azure App Service
  - Deployment Slots Explained
  - Working with Branches and Slots
  - Summary
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# CICD and Deployment slots

Learn how to streamline your development workflow using Continuous Integration/Continuous Deployment (CI/CD) and deployment slots for Azure App Service. This guide covers best practices for automated deployments, managing multiple environments, and ensuring smooth rollbacks.

---

## CI/CD Overview

CI/CD enhances code quality and accelerates delivery by automating integration and deployment processes. Azure App Service supports two primary deployment methods that help teams minimize downtime and improve reliability:

1.  **Automated Deployment**  
    Developers push new code—including features, patches, and bug fixes—to repositories such as GitHub, Bitbucket, Local Git, or Azure Repos. When integrated with CI/CD, these updates are automatically propagated to the App Service with minimal impact on end users.
2.  **Manual Deployment**  
    Developers store code in remote cloud storage services (e.g., OneDrive or Dropbox) or external Git repositories, then manually trigger updates to the App Service.

> [!important]
> **Note**
>
> As of September 30, 2023, integrations for Microsoft OneDrive and Dropbox have been retired for Azure App Service and Azure Functions. Ensure any cascading deployments are disabled since these options no longer appear in the Azure portal.

![The image illustrates a CI/CD process with two deployment methods: automated and manual, connected to various repositories and storage services like Azure Repos, Bitbucket, Git, OneDrive, and Dropbox.](https://kodekloud.com/kk-media/image/upload/v1752884753/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/ci-cd-process-automated-manual.jpg)

---

## Configuring CI/CD in Azure App Service

To configure CI/CD for your web app in Azure App Service, follow these steps:

1.  **Browse Code in the Azure Portal**  
    Start by exploring your code directly within the Azure portal. Below is an example of an HTML snippet from an application deployed earlier:

    ```
    <link href="assets/css/style.css" rel="stylesheet">
    <!--
    Template Name: NiceAdmin
    Updated: Nov 17 2023 with Bootstrap v5.3.2
    Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
    Author: BootstrapMade.com
    License: https://bootstrapmade.com/license/
    -->
    ```

2.  **Review Git Terminal Logs**  
    The following sample log snippets illustrate common Git operations during CI/CD processes:

    ```
    2023-12-17 10:19:49 | git status -z -uall [77ms]
    2023-12-17 10:18:17 | git diff --cached --files --stage C:\Users\RithinSkaria\App Service Demo Site\index.html [672ms]
    2023-12-17 10:18:17 | git show --textconv :index.html [609ms]
    ```

    These operations can be collectively referred to as the “code cloud dashboard.” Subsequent Git logs after saving changes might appear as follows:

    ```
    (upstream:remote:refs/heads/main refs/remotes/main [63ms]
    2023-12-12 17:10:09.494 [info] git status -z --all [77ms]
    2023-12-12 17:10:09.614 [info] git ls-files --stage 2> /dev/null [53ms]
    2023-12-12 17:10:09.723 [info] git show --textconv  65587bb26627 [69ms]
    [113ms]
    ```

Since the repository is linked to Azure Repos, you can directly view it in the portal. When you commit changes, they automatically reflect on your App Service. For example, after configuring CI/CD through the Deployment Center, you may observe a log entry like the one below:

![The image shows a screenshot of an Azure DevOps repository interface, displaying a list of HTML files and folders with details about their last changes and commit information.](https://kodekloud.com/kk-media/image/upload/v1752884754/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-devops-repo-html-files-screenshot.jpg)

Within Deployment Center, select Azure Repos (or alternatives like GitHub or Bitbucket), then choose the organization, project, repository, and branch as needed. After saving your configuration, inspect the deployment logs:

![The image shows the Deployment Center page of a web app in Microsoft Azure, displaying a successful deployment log entry with details such as time, commit ID, and author.](https://kodekloud.com/kk-media/image/upload/v1752884756/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-deployment-center-log-entry.jpg)

Changes made in Visual Studio Code—such as modifications to the index.html file—are automatically tracked, committed, and synchronized with your repository. Refreshing the Azure repository confirms the push, and your web app reflects these updates. Consider the following Git log outputs during development:

```
2023-12-12 17:20:33.838 [info] git for-each-ref --format=%(refname:short) %(objectname) %(upstream:track) %(upstream:remotename)%
2023-12-12 17:20:33.874 [info] git config --get commit.template [401ms]
2023-12-12 17:20:34.321 [info] git status --porcelain [341ms]
```

If further edits are made (such as renaming the dashboard to "KodeKloud demo dashboard"), these operations are tracked similarly:

```
2023-12-12 17:20:33.874 [info] git config --get commit.template [401ms]
2023-12-12 17:20:52.228 [info] git status --zaull [341ms]
2023-12-12 17:20:52.444 [info] git ls-files --stage -- C:\Users\RithinSkaria\App Service Demo Site\index.html [100ms]
2023-12-12 17:20:52.519 [info] git cat-file -s 238484d627e559be [83ms]
2023-12-12 17:20:53.400 [info] git show --textconv :index.html [94ms]
```

After committing these changes, the updated repository synchronizes with the App Service. The production environment remains unchanged until you merge into the main branch or manually swap deployment slots.

For instance, a further commit updating the production dashboard might include the following HTML snippet:

```
<h1>Kodekloud Production Dashboard</h1>
<nav>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
    </ol>
</nav>
```

And the corresponding Git operations could look like this:

```
2023-12-12 17:50:49.Z0  [info] git add -A -- [303ms]
2023-12-12 17:51:02.750 [info] git commit -C user.useRongularityhere commit --quiet --allow-empty-message --file - [53ms]
2023-12-12 17:51:03.142 [info] git config --get commit.template [259ms]
2023-12-12 17:51:03.584 [info] git for-each-ref --format=%(refname:short)%(objectname)%(upstream:track)%(upstream:remotename)... [428ms]
```

After syncing with the Azure portal, these changes are deployed successfully. Note that if you use separate branches (e.g., development vs. production), the production App Service remains on the older version until a merge or slot swap occurs.

![The image shows a dashboard interface from a web application, displaying sales, revenue, and customer metrics, along with graphs and recent activity logs.](https://kodekloud.com/kk-media/image/upload/v1752884757/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/web-application-dashboard-sales-metrics.jpg)

---

## Deployment Slots Explained

Deployment slots enable you to create multiple environments (such as staging, QA, UAT, or development) within a single Azure App Service. Testing new code in a staging slot prior to a production swap minimizes downtime and avoids performance issues like cold starts.

Key features of deployment slots include:

- **Environment Separation:**  
  Each slot represents an environment—production, QA, or development—allowing for isolated testing and validation.
- **Auto Swap:**  
  Automatically swap slots when validations are successful to eliminate service disruptions.
- **Rollback Capability:**  
  Quickly revert to a previous version by swapping back to the last known good configuration.
- **Service Plan Limitations:**
  - Free, Shared, and Basic: Deployment slots are not supported.
  - Standard: Supports up to 5 slots.
  - Premium and Isolated: Support up to 20 slots.

When creating a deployment slot, decide whether to clone the app configuration (from production or another slot) or start fresh. Understand which settings swap and which do not. Generally, swappable settings include general settings, WebJob contents, app settings, path mappings, hybrid connections, connection strings, service endpoints, handler mappings, and Azure CDN configurations. Non-swappable settings include publishing endpoints, scale settings, CORS, custom domains, IP restrictions, VNet integration, non-public certificates, always-on configuration, managed identities, TLS/SSL settings, diagnostic settings, and any setting ending with an extension version suffix.

![The image illustrates the process of deployment slots in Azure, showing the flow from Azure Repos to Staging and Production, along with considerations for settings that can and cannot be swapped.](https://kodekloud.com/kk-media/image/upload/v1752884758/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-deployment-slots-flow-diagram.jpg)

A common workflow involves committing code to a development branch, validating the changes via CI/CD, and then creating a pull request to merge into the main (production) branch. This triggers a production deployment automatically.

---

## Working with Branches and Slots

You can configure separate deployment slots for different branches to facilitate parallel development. For example, create a "dev" branch in Azure Repos containing the same content as the main branch, and then add a corresponding deployment slot in your App Service.

1.  Open the Azure portal and navigate to your App Service.
2.  Under Deployment Center, add a new slot (e.g., "dev").  
    When prompted, choose whether to clone the settings from the production app.

![The image shows the Microsoft Azure portal with a focus on the "Deployment Slots" section for a web app named "kodekloudemoapp." A panel is open to add a new slot named "dev," with an option to clone settings.](https://kodekloud.com/kk-media/image/upload/v1752884759/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-portal-deployment-slots-kodekloudemoapp.jpg)

3.  Configure CI/CD for the new slot to pull code from the "dev" branch. After saving, you will see a pending deployment log entry:

![The image shows the Deployment Center settings in Microsoft Azure, where Azure Repos is selected as the source for deploying and building code. It includes options for organization, project, repository, and branch selection.](https://kodekloud.com/kk-media/image/upload/v1752884761/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-deployment-center-repos-settings.jpg)

![The image shows the Deployment Center in Microsoft Azure, displaying a pending deployment log entry for a commit from VSTS on December 12, 2023.](https://kodekloud.com/kk-media/image/upload/v1752884762/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-deployment-center-pending-log.jpg)

Once the CI/CD process completes for the "dev" slot, preview the changes by refreshing the slot’s URL. Changes committed to the development branch will only affect the "dev" slot until merged with the main branch or manually swapped.

In Visual Studio Code, switching to the "dev" branch and committing changes might generate Git logs like:

```
2023-12-12 17:50:27.720 [info] git ls-files --stage -- C:\Users\RithinSkaria\App Service Demo Site\index.html [214ms]
2023-12-12 17:50:28.029 [info] git cat-file -s 800aac8961d7f959b221c21678c17 [240ms]
2023-12-12 17:50:28.032 [info] git show --textconv index.html [218ms]
2023-12-12 17:50:28.483 [info] git for-each-ref --format=%(refname:short)%(objectname)%(upstream:track)%(upstream:remotename) [265ms]
2023-12-12 17:50:28.658 [info] git status -v -z [342ms]
```

Once you push these changes to the "dev" branch, you can later merge them into the main branch through a pull request:

![The image shows an Azure DevOps interface displaying a repository named "App Service Demo Site" with a list of files and folders, including HTML files and directories like "assets" and "forms." The interface includes options for setting up a build and creating a pull request.](https://kodekloud.com/kk-media/image/upload/v1752884763/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-devops-app-service-repo.jpg)

If you choose not to create a pull request, you can swap the deployment slots directly. Swapping exchanges the contents of the "dev" and production slots, enabling a quick rollback if needed.

![The image shows a Microsoft Azure DevOps interface with a pull request titled "prod-change" proposing to merge a branch. A sidebar is open for completing the pull request with options like "Delete dev after merging" selected.](https://kodekloud.com/kk-media/image/upload/v1752884764/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-devops-pull-request-prod-change.jpg)

After additional commits—such as adding a version marker "build 1.0" in the "dev" slot—and verifying deployment logs, perform the swap:

![The image shows a Microsoft Azure portal interface displaying deployment slots for a web app named "kodekloudemoapp." It includes a swap configuration panel with source and target settings for deployment changes.](https://kodekloud.com/kk-media/image/upload/v1752884766/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-portal-deployment-slots-kodekloudemoapp-2.jpg)

Swapping pushes the new code from the "dev" slot into production while moving the old production code into the "dev" slot. This method enables quick rollbacks in case of deployment issues.

After a successful swap, both production and development slots display the updated builds. For example, refreshing the production site will show the updated “build 1.0” dashboard, while the development slot reverts to its previous state.

![The image shows a Microsoft Azure Deployment Center interface displaying deployment logs for a web app, including commit IDs, authors, statuses, and messages.](https://kodekloud.com/kk-media/image/upload/v1752884767/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/azure-deployment-center-logs-web-app.jpg)

---

## Summary

This guide demonstrated setting up CI/CD with Azure App Service and using deployment slots to efficiently manage multiple environments. These techniques not only streamline deployments but also ensure seamless testing and safe rollbacks to maintain production stability.

Next, explore Azure Container Instances in our upcoming lesson for containerized deployment solutions.

![The image shows a dashboard interface from "NiceAdmin" with various widgets displaying sales, revenue, customer data, recent activity, and budget reports. It includes graphs and tables for visualizing data trends and performance metrics.](https://kodekloud.com/kk-media/image/upload/v1752884769/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-CICD-and-Deployment-slots/niceadmin-dashboard-sales-revenue-widgets.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/1e055acf-9eab-4086-82b6-f5875b6660e4)**
>
> Watch video content
