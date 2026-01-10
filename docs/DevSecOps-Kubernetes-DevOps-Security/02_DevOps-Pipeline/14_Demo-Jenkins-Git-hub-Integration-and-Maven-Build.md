# Demo Jenkins Git hub Integration and Maven Build - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Demo-Jenkins-Git-hub-Integration-and-Maven-Build)

---

## Table of Contents

- Demo Jenkins Git hub Integration and Maven Build
  - 1. Set Up GitHub Webhook
  - 2. Create a New Jenkins Pipeline Job
  - 3. Configure the Pipeline
  - 4. Define Your Jenkinsfile
  - 5. Run Your First Build
  - 6. Automate Builds via Webhook
  - 7. Verify Webhook Deliveries
  - 8. Sample Webhook Payload
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Demo Jenkins Git hub Integration and Maven Build

In this guide, you’ll learn how to integrate GitHub with Jenkins using webhooks to trigger automated builds. We’ll also demonstrate how to configure a simple Maven build within a Jenkins pipeline. By the end, you’ll have a fully automated CI workflow for your Java projects.

## 1\. Set Up GitHub Webhook

1.  Open your GitHub repository in the browser.
2.  Navigate to **Settings** > **Webhooks**.
3.  Click **Add webhook**.

![The image shows a GitHub repository page with a list of files and directories, including setup, slack-emojis, and src, along with details about recent commits.](https://kodekloud.com/kk-media/image/upload/v1752873571/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/github-repo-files-directories-commits.jpg)

4.  Configure the webhook fields as follows:

| Setting      | Value                                        | Description                         |
| ------------ | -------------------------------------------- | ----------------------------------- |
| Payload URL  | `https://<your-jenkins-url>/github-webhook/` | Jenkins listens here for events.    |
| Content type | `application/json`                           | Ensures JSON payload delivery.      |
| Events       | Just the push event                          | Triggers on `git push` to branches. |

5.  Click **Add webhook**.

> [!important]
> **Warning**
>
> Make sure your Jenkins instance is accessible from the internet or via VPN so GitHub can reach the webhook endpoint.

![The image shows a GitHub repository settings page for adding a webhook, with fields for Payload URL, Content type, and event triggers. The browser has multiple tabs open, including Azure and Jenkins.](https://kodekloud.com/kk-media/image/upload/v1752873572/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/github-repo-webhook-settings-page.jpg)

## 2\. Create a New Jenkins Pipeline Job

1.  Go to your Jenkins dashboard.
2.  Click **New Item**.
3.  Enter a name (e.g., `devsecops-numeric-application`).
4.  Select **Pipeline**, then click **OK**.

![The image shows a Jenkins dashboard with a list of build jobs, including one named "checking-versions" that has recent success and failure statuses. The left sidebar contains options like "New Item," "People," and "Build History."](https://kodekloud.com/kk-media/image/upload/v1752873574/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/jenkins-dashboard-build-jobs-statuses.jpg)

![The image shows a Jenkins interface where a user is entering an item name for a new project. Various project types like Freestyle project, Pipeline, and Multi-configuration project are listed as options.](https://kodekloud.com/kk-media/image/upload/v1752873575/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/jenkins-interface-new-project-item.jpg)

## 3\. Configure the Pipeline

In the job’s **Configure** screen:

1.  Under **Build Triggers**, enable **GitHub hook trigger for GIT SCM polling**.
2.  Scroll to **Pipeline**:
    - **Definition**: Pipeline script from SCM
    - **SCM**: Git
    - **Repository URL**: `https://github.com/your-org/your-repo.git`
    - **Branch**: `main`

3.  Click **Save**.

![The image shows a Jenkins configuration screen for a pipeline project, with options for setting the repository URL and branch to build.](https://kodekloud.com/kk-media/image/upload/v1752873577/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/jenkins-pipeline-project-configuration-screen.jpg)

> [!important]
> **Note**
>
> Ensure the **GitHub Integration** and **Pipeline** plugins are installed in Jenkins to enable SCM polling and webhook triggers.

## 4\. Define Your Jenkinsfile

At the root of your GitHub repository, add a file named `Jenkinsfile`:

```
pipeline {
    agent any


    stages {
        stage('Build Artifact') {
            steps {
                // Compile and package without running tests
                sh "mvn clean package -DskipTests=true"
                // Archive the JAR for download
                archive 'target/*.jar'
            }
        }
    }
}
```

This pipeline uses the `any` agent, runs the Maven `package` goal, skips tests, and archives the resulting JAR.

## 5\. Run Your First Build

1.  Commit and push the `Jenkinsfile`:

    ```
    git add Jenkinsfile
    git commit -m "Add Jenkins pipeline for Maven build"
    git push origin main
    ```

2.  In Jenkins, open your pipeline job and click **Build Now**.
3.  Monitor the console output. The initial build will download all dependencies.

![The image shows a Jenkins pipeline interface for "devsecops-numeric-application," displaying a successful build with stage view details and options for managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752873578/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/jenkins-pipeline-devsecops-successful-build.jpg)

## 6\. Automate Builds via Webhook

Now every push to `main` triggers a new build automatically. For example:

```
git commit -am "Remove outdated comment"
git push origin main
```

Jenkins will start a fresh build as soon as GitHub sends the webhook event.

## 7\. Verify Webhook Deliveries

To inspect delivery logs:

1.  In your GitHub repo, go to **Settings** > **Webhooks**.
2.  Click on the webhook entry.
3.  Review **Recent Deliveries** for payloads and response codes.

![The image shows a GitHub webhook settings page with options for triggering events and recent delivery logs. A person is visible in a small video call window at the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873579/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Git-hub-Integration-and-Maven-Build/github-webhook-settings-trigger-logs.jpg)

## 8\. Sample Webhook Payload

Below is a trimmed example of the JSON GitHub sends on a push:

```
{
  "ref": "refs/heads/main",
  "before": "45be219a25dfe24f251196152de6df004b7c02e",
  "after": "2d66f5307c8f2d0d9ea1e6b1982ef187f8b33a21",
  "repository": {
    "id": 376897057,
    "name": "devsecops-k8s-demo",
    "full_name": "sidd-harth/devsecops-k8s-demo",
    "private": false,
    "owner": {
      "login": "sidd-harth",
      "id": 2892541,
      "avatar_url": "https://avatars.githubusercontent.com/u/2892541?v=4"
    }
  }
}
```

---

## Links and References

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
- [Maven Getting Started Guide](https://maven.apache.org/guides/getting-started/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/b761a185-cfa3-4dad-8d2b-192d7dcee80d)**
>
> Watch video content
