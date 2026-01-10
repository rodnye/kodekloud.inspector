# Release Pipeline Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Advanced-Pipelines/Release-Pipeline-Demo)

---

## Table of Contents

- Release Pipeline Demo
  - Pipeline Script Overview
  - Create Release and Build Stages
  - Testing the Pipeline End-to-End
  - Pipeline Build Details and Deployment
  - Conclusion
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Advanced Pipelines

# Release Pipeline Demo

In this lesson, we'll walk through setting up a Jenkins-based release pipeline in your project directory. We start by creating a new pipeline item named "release" in Jenkins. This item is a standard Jenkins pipeline.

In your project directory, click "New Item" and enter the name **release**. Then, select the project type **Pipeline** as shown in the image below.

![The image shows a Jenkins interface for creating a new item, with options to select different project types such as Freestyle project, Pipeline, and Multibranch Pipeline. The item name "release" is entered in the text box.](https://kodekloud.com/kk-media/image/upload/v1752879842/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-new-item-release-options.jpg)

Next, configure the pipeline to trigger on Git SCM polling via a GitHub hook. Set the pipeline script from your Git repository by providing your repository URL, selecting the main branch, and setting the script name (for example, "Jenkinsfile-release").

![The image shows a configuration screen for setting up a pipeline script in a project, with options to save or apply changes.](https://kodekloud.com/kk-media/image/upload/v1752879843/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/pipeline-script-configuration-screen.jpg)

![The image shows a Jenkins configuration page for setting up a pipeline, with options for defining the pipeline script from SCM and specifying a Git repository URL. There is a warning indicating that the Git repository URL is missing.](https://kodekloud.com/kk-media/image/upload/v1752879845/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-pipeline-configuration-git-url.jpg)

![The image shows a Jenkins configuration screen for setting up a pipeline, with options to specify branches, repository browser, and script path. The script path is set to "Jenkinsfile" and there are buttons to save or apply the configuration.](https://kodekloud.com/kk-media/image/upload/v1752879846/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-pipeline-configuration-screen.jpg)

> [!important]
> **Note**
>
> Normally, these steps are sufficient. However, a couple of additional configuration adjustments are required due to internal processes within our pipeline.

Below is a simple HTML snippet from our repository that is part of the application's interface:

```
<html>
  <head>
    <style>
      /* Your CSS styles here */
    </style>
  </head>
  <body>
    <h1>Todo App: v2</h1>
    <!-- Add Task Form -->
    <form method="post">
      <input type="text" name="task_content" placeholder="Enter a new task" />
      <input type="submit" name="add_task" value="Add Task" />
    </form>
    <!-- Display Tasks -->
  </body>
</html>
```

Below is an example of the Git log output generated when creating a new branch and initiating a pull request:

```
remote: Create a pull request for 'feature1' on GitHub by visiting:
remote: https://github.com/kodekloudhub/course-jenkins-project/pull/new/feature1
remote: GitHub found 7 vulnerabilities on kodekloudhub/course-jenkins-project's default branch (1 high, 4 moderate, 2 low). To find out more, visit: https://github.com/kodekloudhub/course-jenkins-project/security/dependabot
remote: To https://github.com/kodekloudhub/course-jenkins-project
 * [new branch]      feature1 -> feature1


Jenkins-demo on 🐳 feature1 [$] via desktop-linux is v2.20.0 via v20.12.1 via @ v3.9.0 on (us-east-1)
```

---

## Pipeline Script Overview

The pipeline script handles several key tasks, starting with checking for a Git tag. When a commit occurs, the pipeline executes a command that checks if the commit is associated with a tag. The logic is similar to the following:

```
pipeline {
    environment {
        DOCKER_CLI_EXEC = credentials('kubeconfig-credentials-id')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        GH_TOKEN = credentials('github-access-token')
    }
    stages {
        stage("Check for Git Tag") {
            steps {
                script {
                    def tag = sh(returnStdout: true, script: "git tag --contains").trim()
                    if (tag) {
                        env.GIT_TAG = tag
                    } else {
                        env.GIT_TAG = ''
                    }
                    echo "GIT_TAG is set to: ${env.GIT_TAG}"
                    env.IMAGE_TAG_RELEASE = "${IMAGE_NAME}:${GIT_TAG}"
                }
            }
        }
    }
}
```

When you run the command `git tag --contains` locally, it returns the tag if one is present or it returns empty. This ensures that we deploy to production only when a tag is present.

> [!important]
> **Note**
>
> By default, Jenkins does not fetch tag information. To enable it, navigate to **Additional Behaviors** in your Git SCM configuration, choose **Advanced clone behaviors**, and check **Fetch tags**.

![The image shows a configuration page for a Jenkins pipeline, where options for repository settings and branch specifications are being set. There are fields for branch specifier, repository browser, and additional behaviors like fetching tags.](https://kodekloud.com/kk-media/image/upload/v1752879847/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-pipeline-configuration-page.jpg)

---

## Create Release and Build Stages

After the pipeline checks for a Git tag, further actions depend on whether a tag was detected. If no tag is found, the pipeline installs dependencies and creates a new release. The following snippet illustrates this logic:

```
pipeline {
    stages {
        stage('Setup') {
            steps {
                script {
                    sh "poetry install --with dev"
                }
            }
        }
        stage('Create Release') {
            when {
                expression {
                    return env.GIT_TAG == "" // Only run if GIT_TAG is not set
                }
            }
            steps {
                script {
                    sh 'printenv'
                    def tag = sh(returnStdout: true, script: "poetry run semantic-release version").trim()
                    echo "${tag}"
                    sh "poetry run semantic-release publish"
                }
            }
        }
    }
}
```

When this stage runs (because no tag was detected), the pipeline uses the command `poetry run semantic-release version` to determine the new version (for example, updating from 2.20.0 to 2.21.0) and then publishes the release with `poetry run semantic-release publish`. This creates a new commit with a tag in your GitHub repository, triggering a subsequent pipeline run. In that run, the presence of a Git tag causes the pipeline to bypass the release creation and continue with the build and deploy stages.

For builds with an existing tag, the pipeline executes the following stages: Docker login, pushing the Docker image, and deploying to the Kubernetes cluster:

```
pipeline {
    stages {
        stage("Build and Deploy") {
            when {
                expression {
                    return env.GIT_TAG != "" // Only run if GIT_TAG is set
                }
            }
            stages {
                stage('Docker Login') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'docker-creds',
                                usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin'
                            echo 'Login successfully'
                        }
                    }
                }
                stage('Push Image') {
                    steps {
                        sh 'docker push --all-tags ${IMAGE_NAME}'
                        echo "Docker image pushed successfully"
                    }
                }
                stage('Deploy') {
                    steps {
                        sh 'kubectl config use-context user@prod.us-east-1.eksctl.io'
                        sh 'kubectl config current-context'
                        sh "kubectl set image deployment/flask-app flask-app=${IMAGE_TAG_RELEASE}"
                    }
                }
            }
        }
    }
}
```

> [!important]
> **Note**
>
> Jenkins checks out code in a detached HEAD state by default. To ensure the pipeline uses the main branch, adjust your repository’s configuration under **Additional Behaviors** by selecting the option to check out a specified local branch (e.g., main).

![The image shows a Jenkins configuration screen for a project pipeline, with options for advanced clone behaviors and a dropdown menu for additional settings.](https://kodekloud.com/kk-media/image/upload/v1752879849/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-project-pipeline-configuration.jpg)

---

## Testing the Pipeline End-to-End

After configuring the release pipeline, switch back to your main branch and create a new feature branch. For example:

```
git checkout -b feature2
```

Update your code by modifying the HTML to reflect new changes. For instance, update the heading to indicate "v2 with feature2 changes":

```
<html>
  <head>
    <style>
      /* Your CSS styles here */
    </style>
  </head>
  <body>
    <h1>Todo App: v2 with feature2 changes</h1>
    <!-- Add Task Form -->
    <form method="post">
      <input type="text" name="task_content" placeholder="Enter a new task" />
      <input type="submit" name="add_task" value="Add Task" />
    </form>
    <!-- Display Tasks -->
  </body>
</html>
```

Next, stage and commit your changes (using a conventional commit message such as "feat: added feature two") and then push the branch to the remote repository:

```
git add .
git commit -m "feat: added feature two"
git push origin feature2
```

Pushing the new branch triggers a code quality pipeline. In your Jenkins dashboard under **Branches**, you'll see the build status for **feature2**:

![The image shows a Jenkins dashboard for a project named "Code-Quality," displaying details of a pull request with its last success and duration. The sidebar includes options like "Status," "Configure," and "Build History."](https://kodekloud.com/kk-media/image/upload/v1752879850/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-dashboard-code-quality-pull-request.jpg)

Once dependencies are installed and tests pass, open a pull request on GitHub:

![The image shows a GitHub interface for creating a pull request, with fields for adding a title and description, and options for reviewers, assignees, labels, and projects.](https://kodekloud.com/kk-media/image/upload/v1752879851/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/github-pull-request-interface.jpg)

According to semantic-release rules, merging a feature with conventional commits will bump the version (e.g., from 2.20.0 to 2.21.0). Jenkins detects the merge commit on the main branch and triggers the release pipeline again.

You can monitor branch builds via the Jenkins dashboard:

![The image shows a Jenkins dashboard for a project named "Code-Quality," displaying the status of two branches, "feature1" and "feature2," with details on their last success and duration.](https://kodekloud.com/kk-media/image/upload/v1752879853/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/jenkins-dashboard-code-quality-branches.jpg)

---

## Pipeline Build Details and Deployment

When the pull request is merged, Jenkins follows these steps:

1.  **Initial Build Trigger:**  
    The merge commit triggers a build where the pipeline first checks for a Git tag. Since no tag is present at first, it runs the **Setup** stage and then the **Create Release** stage. This stage installs dependencies and executes a command similar to:

    ```
    poetry run semantic-release version
    ```

    This command determines the next version (for example, 2.21.0) and then publishes the new release using:

    ```
    poetry run semantic-release publish
    ```

    As a result, a new commit with the tag (e.g., 2.21.0) is created, triggering another pipeline run.

2.  **Subsequent Build:**  
    In the following build, the pipeline detects the Git tag (e.g., 2.21.0) and skips the release creation. Instead, it proceeds to the **Build and Deploy** stages. These stages include:
    - **Docker Login:** Authenticate using Docker credentials.
    - **Push Image:** Push the new Docker image to the repository.
    - **Deploy:** Deploy the updated image to the Kubernetes cluster.

You can verify the release information on GitHub:

![The image shows a GitHub release page for version 2.21.0, detailing features and merged pull requests.](https://kodekloud.com/kk-media/image/upload/v1752879854/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Release-Pipeline-Demo/github-release-2-21-0-features.jpg)

Review the Jenkins console output to verify that tests have passed, a new tag was created, and the deployment steps executed successfully. An example output might look like:

```
+ ls -la
...
+ poetry run semantic-release version
The next version is: 2.21.0!
No build command specified, skipping
+ poetry run semantic-release publish
Published new tag: 2.21.0
...
```

Because a new commit is generated (with the new tag), the pipeline runs a second time to execute Docker login, image push, and the Kubernetes deployment.

---

## Conclusion

In this lesson, we demonstrated how to construct a sophisticated CI/CD pipeline with Jenkins by clearly separating code quality and release processes. The pipeline leverages Git tags to intelligently determine whether to create a new release or to build and deploy the updated application. With this setup, committing and merging changes to the main branch will automatically create a new release and deploy the updated application to production.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/79ea1422-fc3a-48da-851d-232fc09690de/lesson/e202134c-6bfb-4a33-8a18-41fa5476557a)**
>
> Watch video content
