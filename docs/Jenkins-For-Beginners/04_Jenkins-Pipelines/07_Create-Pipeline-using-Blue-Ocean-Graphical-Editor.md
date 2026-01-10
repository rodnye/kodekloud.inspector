# Create Pipeline using Blue Ocean Graphical Editor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Create-Pipeline-using-Blue-Ocean-Graphical-Editor)

---

## Table of Contents

- Create Pipeline using Blue Ocean Graphical Editor
  - Creating a New Pipeline
  - Configuring the Pipeline
  - Archiving Artifacts
  - Archiving Test Reports
  - Full Jenkinsfile Recap
  - Final Remarks
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Create Pipeline using Blue Ocean Graphical Editor

In this tutorial, you'll learn how to create and configure a Jenkins pipeline using the Blue Ocean graphical editor for an enhanced continuous integration experience.

To get started, access your Jenkins instance and navigate to the plugins management page. Search for "Blue Ocean" and install the plugin. Blue Ocean bundles modern plugins that revamp the Jenkins user interface, focusing on simplifying pipeline creation and management.

![The image shows a Jenkins plugin management interface with a search for "blueocean," displaying a list of related plugins, including "Blue Ocean" and its integrations. One of the plugins is marked as deprecated.](https://kodekloud.com/kk-media/image/upload/v1752879488/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-plugin-management-blueocean.jpg)

After the installation is complete, your main dashboard will reveal an "Open Blue Ocean" option. This view not only refreshes the visualization of your pipelines but also offers an easy switch-back to the classic interface with a simple arrow icon.

![The image shows a Jenkins dashboard displaying the download progress of plugins, with successful connectivity checks and plugin installations.](https://kodekloud.com/kk-media/image/upload/v1752879489/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-dashboard-plugin-downloads.jpg)

The Jenkins dashboard now displays a list of jobs with their statuses, including details such as last success, failure, and duration. The sidebar gives you access to options like "Build History" and the new "Open Blue Ocean" view.

![The image shows a Jenkins dashboard displaying a list of jobs with their statuses, last success, last failure, and duration. The sidebar includes options like "Build History" and "Open Blue Ocean."](https://kodekloud.com/kk-media/image/upload/v1752879490/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-dashboard-job-statuses.jpg)

## Creating a New Pipeline

To create a new pipeline, click on the "New Pipeline" button. The first step integrates Blue Ocean with your Source Control Management (SCM) tool. Jenkins supports popular SCM platforms, including GitHub, Bitbucket, and GitHub Enterprise.

If you plan to use GitHub, select the Git option, paste your repository URL, and enter your GitHub credentials (e.g., user "GitHub-admin"). Jenkins leverages the credential binding plugin to securely store these credentials.

![The image shows a Jenkins interface for creating a pipeline, where a user is connecting to a Git repository by entering a repository URL and selecting user credentials.](https://kodekloud.com/kk-media/image/upload/v1752879491/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-pipeline-git-connection.jpg)

Once authentication is complete, Jenkins scans your GitHub repository for branches that contain a Jenkinsfile. If found, the pipeline triggers automatically; if not, you will be prompted to create one. In our example, the repository already includes a Jenkinsfile with multiple stages such as "Unit Test."

In the Jenkinsfile example below, the "Unit Test" stage incorporates a loop that introduces a 60-second delay before proceeding:

```
stage('Build') {
    steps {
        // Get some code from a Gitea repository
        // git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
        // Run Maven Package CMD
        sh 'mvn clean package -DskipTests=true'
    }
}

stage('Unit Test') {
    steps {
        script {
            for (int i = 0; i < 60; i++) {
                echo "${i + 1}"
                sleep 1
            }
        }
        sh 'mvn test'
    }
}
```

After saving the pipeline configuration, Blue Ocean presents all build steps, including "Echo Version," "Build," and "Unit Test," along with real-time logs on a single page. You might need to wait a moment as the stages complete.

![The image shows a Jenkins pipeline interface with a progress bar indicating stages from "Start" to "End," currently at the "Unit Test" stage. Below, there are details of unit tests being executed, with each step marked as completed.](https://kodekloud.com/kk-media/image/upload/v1752879492/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-pipeline-progress-unit-test.jpg)

Additional details such as the branch that triggered the build, build duration, commit ID, and a summary of changes are readily available within the interface.

## Configuring the Pipeline

By clicking the pencil icon, you can edit the pipeline directly in the Blue Ocean interface. This feature lets you modify commands or shell scripts for any stage. For instance, you can adjust the "Unit Test" stage as follows:

```
for (int i = 0; i < 60; i++) {
    echo "${i + 1}"
}
```

Press Ctrl S (or Command S on macOS) to save any changes, which are then updated in your Jenkinsfile.

Below is an updated snippet of the Jenkinsfile with modifications for archiving artifacts and processing test results:

```
stage('Build') {
    steps {
        sh 'mvn clean package -DskipTests=true'
        archiveArtifacts 'target/hello-demo-*.jar'
    }
}

stage('Unit Test') {
    steps {
        sh 'mvn test'
        junit(testResults: 'target/surefire-reports/TEST-*.xml', keepProperties: true, keepTestNames: true)
    }
}

tools {
    maven 'M398'
}
```

## Archiving Artifacts

Once the build stage generates a JAR file in the target directory, you can archive it as an artifact by following these steps:

1.  Within the build stage, click the plus icon to add a new step.
2.  Choose the "Archive the artifacts" option.
3.  Specify the JAR file path using a wildcard (e.g., `target/hello-demo-*.jar`) to automatically accommodate version changes.

To verify the artifact is generated, SSH into the Jenkins controller and list the workspace directories:

```
root@jenkins-controller-1:~#
cd /var/lib/jenkins/workspace/
ll
```

Identify the workspace (e.g., `jenkins-hello-world_main`) and inspect the target directory:

```
cd jenkins-hello-world_main
ll target/
```

You should see a file similar to `hello-demo-0.0.1-SNAPSHOT.jar`.

## Archiving Test Reports

After running the unit tests, JUnit XML reports are generated in the `target/surefire-reports/` directory. To archive these reports:

1.  Add a new step in the "Unit Test" stage.
2.  Choose "Archive JUnit formatted test results."
3.  Enter the path such as `target/surefire-reports/TEST-*.xml`.

Verify the test reports by listing the directory via the Jenkins controller:

```
ll target/surefire-reports/
```

You should observe the XML and related text files corresponding to your tests.

![The image shows a Jenkins interface with the "Installed plugins" section open, displaying the JUnit Plugin, which is enabled.](https://kodekloud.com/kk-media/image/upload/v1752879493/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-installed-plugins-junit.jpg)

The JUnit plugin then processes these reports and displays test trends, including summaries of passed, skipped, and failed tests.

## Full Jenkinsfile Recap

Below is the complete updated Jenkinsfile incorporating all modifications:

```
pipeline {
    agent any
    tools {
        // Install the Maven version configured as "M398" and add it to the path.
        maven 'M398'
    }
    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                // Get code from Git repository
                git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
                sh 'mvn clean package -DskipTests=true'
                archiveArtifacts 'target/hello-demo-*.jar'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'mvn test'
                junit(testResults: 'target/surefire-reports/TEST-*.xml', keepProperties: true, keepTestNames: true)
            }
        }
    }
}
```

After saving and committing the Jenkinsfile, Jenkins will trigger a new build. A commit message like "Added artifact archive for build stage and JUnit reports" is recorded automatically. In case the artifact pattern does not match (for instance, using `hello-world` instead of `hello-demo`), update the Jenkinsfile accordingly.

Inspect the Jenkins logs to ensure that the Maven build produces the JAR file and that the unit tests run successfully.

![The image shows a Jenkins pipeline interface with a build process. The build step failed due to a configuration error related to archiving artifacts.](https://kodekloud.com/kk-media/image/upload/v1752879495/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-pipeline-build-error-artifacts.jpg)

After updating the file path to match the correct artifact name and re-running the build, the process completes successfully and executes the unit tests:

```
mvn clean package -DskipTests=true
```

and

```
mvn test
```

The JUnit plugin then displays test results alongside options for downloading artifacts.

![The image shows a Jenkins interface indicating that all tests have passed successfully, with a list of six test cases that were executed.](https://kodekloud.com/kk-media/image/upload/v1752879496/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-using-Blue-Ocean-Graphical-Editor/jenkins-test-results-successful.jpg)

## Final Remarks

This lesson demonstrated how you can leverage the Blue Ocean plugin to efficiently create, configure, and visualize Jenkins pipelines. The intuitive interface makes it easy to edit your pipeline, update the Jenkinsfile, and archive both build artifacts and test reports.

> [!important]
> **Note**
>
> The classic Jenkins UI remains available for inspecting build history and tracking test result trends over time.

Happy building and continuous integration with Jenkins!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/fcb90aec-6d4a-4822-bb1e-d7c80cc043e5)**
>
> Watch video content
