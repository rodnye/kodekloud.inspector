# Create Organization Folder Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/Create-Organization-Folder-Project)

---

## Table of Contents

- Create Organization Folder Project
  - Watch Video

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# Create Organization Folder Project

In this lesson, you will learn how to use the Jenkins Organization Folder project type. Previously, you worked with freestyle and pipeline projects. Now, we will migrate and manage projects efficiently using an organization folder.

Before creating the project, you'll need to import a repository. We start by migrating the Solar System repository from GitHub to your Gitea instance.

![The image shows a GitHub repository page for "solar-system-gitea" with a list of files and commit history. The repository includes files like `.dockerignore`, `.gitignore`, and `Dockerfile`, and the primary language used is JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752879761/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/github-repo-solar-system-gitea.jpg)

Copy the repository endpoint from GitHub and sign in to your Git client as the Git admin.

![The image shows a webpage for Gitea, a self-hosted Git service, with the tagline "Git with a cup of tea." It highlights features like easy installation and cross-platform compatibility.](https://kodekloud.com/kk-media/image/upload/v1752879762/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/gitea-webpage-git-with-tea.jpg)

Within the Dasher organization (refer to our [Jenkins For Beginners](https://learn.kodekloud.com/user/courses/jenkins-for-beginners) course), navigate to the migration section and import the Solar System repository. Click the plus icon and select “New Migration.”

![The image shows a Gitea dashboard for the organization "dasher-org," displaying two Java repositories: "parameterized-pipeline-job-init" and "jenkins-hello-world." It also shows options for creating a new repository or migration, and information about members and teams.](https://kodekloud.com/kk-media/image/upload/v1752879763/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/gitea-dashboard-dasher-org-repositories.jpg)

Choose “New Migration,” select GitHub as the source, and paste the endpoint. Set the owner to “dasher-org” and name the repository “solar-system.”

![The image shows a Gitea interface for migrating a repository, with options for selecting the owner, repository name, and visibility. There are also checkboxes for migration options and items, and a "Migrate Repository" button.](https://kodekloud.com/kk-media/image/upload/v1752879763/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/gitea-repository-migration-interface.jpg)

After starting the migration, wait a few seconds until the repository appears with the other repositories in your Git organization. While pipeline jobs for the other two repositories were created manually, manually creating a job for this repository in Jenkins would be inefficient, especially when new branches or repositories are added frequently.

> [!important]
> **Automation Advantage**
>
> Instead of manually creating pipelines via the Jenkins dashboard, we will automate the process using multi-branch or organization folder pipelines. These automatically detect, update, and delete jobs based on the repositories present in your SCM.

![The image shows a Jenkins interface for creating a new item, with options to select different project types such as Freestyle project, Pipeline, Multi-configuration project, and Folder.](https://kodekloud.com/kk-media/image/upload/v1752879765/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-new-item-interface.jpg)

If you choose the multi-branch or organization folder pipeline option, Jenkins will automatically detect new repositories, branches, and pull requests. For GitHub-hosted repositories, the organization folder project type is the most efficient solution. In this lesson, we create an organization folder named “GitHub organization.”

After clicking OK for the organization folder project, set the repository source. Click on “Add” and choose the GitHub organization option. By default, you may see only Bitbucket team and single repository sources. If the GitHub option is missing, install the GitHub plugin first.

![The image shows a Jenkins configuration page with options for setting a display name, description, and adding repository sources like Bitbucket, GitHub, or a single repository.](https://kodekloud.com/kk-media/image/upload/v1752879765/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-configuration-page-repositories.jpg)

Proceed to Manage Jenkins → Manage Plugins. Locate the GitHub plugin (recently updated) and install it. Enable the restart option, and once Jenkins restarts, log in again to verify that the GitHub plugin is active.

![The image shows a Jenkins interface displaying the download progress of plugins, with several tasks marked as successful and Jenkins currently restarting.](https://kodekloud.com/kk-media/image/upload/v1752879766/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-plugin-download-progress.jpg)

Next, configure your GitHub server within Jenkins:

1.  Go to Manage Jenkins → System.
2.  Search for “GitHub” and add a new GitHub server.
3.  Provide a name (e.g., “GitHub server”) and the URL of your GitHub instance.
4.  Jenkins will automatically detect the server version (for example, “powered by GitHub version 1.22.2”).
5.  Enable “Managed Hooks” to allow Jenkins to automatically create webhooks for every project on the server.

Before saving the configuration, add global credentials in Jenkins:

- Use the “Username with Password” type.
- Enter “GitHub admin” as the username and provide the corresponding password.
- Name the credentials (for example, “GitHub server creds”) and add an optional description.

![The image shows a Jenkins Credentials Provider interface where a user is configuring credentials, including a username and password, with options for different credential types like Gitea Server and AWS.](https://kodekloud.com/kk-media/image/upload/v1752879768/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-credentials-provider-interface.jpg)

After applying the changes, return to the dashboard and open the configuration for your “GitHub organization” project.

![The image shows a Jenkins dashboard displaying a list of jobs with their statuses, last success, last failure, and duration.](https://kodekloud.com/kk-media/image/upload/v1752879769/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-dashboard-jobs-statuses.jpg)

In the repository source section, select “GitHub organization.” The server field should auto-populate as “GitHub server” and select the corresponding credentials “GitHub admin.” Specify the owner (in our example, “dasher-org”) and leave the other options like branch and pull request discovery at their defaults. The default behavior is to search for a file named “Jenkinsfile” in the repository root; if found, a pipeline job is automatically created. If your repository uses a custom path for the Jenkinsfile, specify that path in the configuration.

![The image shows a configuration screen for a Gitea organization, displaying fields for credentials, owner, and behavior settings related to branch and pull request strategies.](https://kodekloud.com/kk-media/image/upload/v1752879770/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/gitea-organization-configuration-screen.jpg)

Save the configuration. Jenkins will scan the organization and create job specifications based on the repositories it finds. The console output will indicate which repositories meet the criteria for a pipeline job (i.e., those containing a Jenkinsfile in the root directory).

Below is an example of the console log output after a scan:

```
Checking repository parameterized-pipeline-job-init
Proposing parameterized-pipeline-job-init
Looking up repository dasher-org/parameterized-pipeline-job-init


Checking branches...
Checking branch main
'Jenkinsfile' found
Met criteria


1 branches were processed (query completed)


Checking repository solar-system
Proposing solar-system
Looking up repository dasher-org/solar-system


Checking branches...
Checking branch main
'Jenkinsfile' not found
Does not meet criteria


1 branches were processed
Checking pull requests...
0 pull requests were processed


3 repositories were processed
[Mon Sep 23 07:23:10 UTC 2024] Finished organization scan. Scan took 1.8 sec
Finished: SUCCESS
```

In the above log, Jenkins detected that the repository "parameterized-pipeline-job-init" contains a Jenkinsfile on the main branch, so it meets the criteria. The Solar System repository did not include a Jenkinsfile, so no job was created for it. For the parameterized pipeline job, multiple branches (such as main and test) were detected, and each will run its corresponding pipeline as defined in the Jenkinsfile.

![The image shows a Jenkins dashboard displaying the status of a pipeline job, with all stages successfully completed and no test failures.](https://kodekloud.com/kk-media/image/upload/v1752879772/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-dashboard-pipeline-status.jpg)

As an additional check, open the parameterized pipeline job to view pipelines for both the main and test branches. The repository also features the standard GitHub icon with detailed repository information.

![The image shows a GitHub repository interface for a project named "parameterized-pipeline-job-init," featuring files like `.gitignore`, `Jenkinsfile`, and `pom.xml`, with a README section titled "Springboot Hello World App."](https://kodekloud.com/kk-media/image/upload/v1752879773/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/github-repo-parameterized-pipeline.jpg)

When you inspect the repository settings in Gitea, notice that Jenkins has automatically added a webhook. This webhook is configured as follows:

- HTTP POST method
- Content type: application/json
- Points to the IP address and port of your Jenkins instance (e.g., /gitlab-webhook/post)
- Triggers on events like branch/tag creation, pushes, pull requests, and other repository events

![The image shows a Jenkins dashboard displaying the status of a parameterized pipeline job, with a visual representation of the build stages and test results.](https://kodekloud.com/kk-media/image/upload/v1752879774/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-dashboard-pipeline-status-2.jpg)

For instance, if you edit the README file in the main branch of the "parameterized-pipeline-job-init" repository, commit and push the change, the webhook will trigger Jenkins. You can verify this by checking the recent delivery status in the repository’s webhook settings.

![The image shows a settings page of a repository named "parameterized-pipeline-job-init" on a code hosting platform, with options for basic settings, webhooks, and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752879776/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/parameterized-pipeline-job-settings.jpg)

Upon pushing the change, Jenkins will initiate a new build for the affected branch, demonstrating the automated workflow between your SCM and Jenkins.

![The image shows a Git repository interface with a list of files and their commit messages. It includes details like the number of commits, branches, and file sizes.](https://kodekloud.com/kk-media/image/upload/v1752879777/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/git-repository-interface-commit-list.jpg)

This automation minimizes manual configuration and ensures that any new repository, branch, or pull request containing a Jenkinsfile will automatically have an associated Jenkins pipeline job, whether created, updated, or deleted.

In the next lesson, we will create a Jenkinsfile for the Solar System repository and observe how the Organization Folder project picks up changes automatically.

Thank you.

![The image shows a Jenkins dashboard displaying a list of jobs with their statuses, last success, last failure, and duration. The interface includes options for managing Jenkins, viewing build history, and accessing various project-related features.](https://kodekloud.com/kk-media/image/upload/v1752879779/notes-assets/images/Jenkins-Pipelines-Create-Organization-Folder-Project/jenkins-dashboard-job-statuses.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/71ab8bca-6a9c-43a9-ac6e-807643972577)**
>
> Watch video content
