# Create Pipeline with Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Create-Pipeline-with-Parameters)

---

## Table of Contents

- Create Pipeline with Parameters
  - Comparing Jenkinsfiles for Test and Main Branches
  - Configuring a Parameterized Pipeline Job in Jenkins
  - Conclusion
  - Watch Video
    - Test Branch Jenkinsfile
    - Main Branch Jenkinsfile
    - 1. Create a New Pipeline Job
    - 2. Configure Source Control Management (SCM)
    - 3. Run a Quick Build
    - 4. Enable Parameterization
    - 5. Parameterizing the Pipeline Script
    - 6. Triggering Parameterized Builds
    - 7. Customizing for the Main Branch

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Create Pipeline with Parameters

In this guide, we demonstrate how to create a Jenkins pipeline that leverages parameters for building flexible and dynamic jobs. A parameterized build in Jenkins lets you pass in custom values when triggering a build, making your CI/CD process more versatile and easily configurable.

Below is an example repository called "parameterized-pipeline-job-init" on GitHub. This repository hosts a simple Java Spring Boot “Hello World” application with two branches—**test** and **main**—where the only difference is the Jenkinsfile. Each branch’s Jenkinsfile defines a different set of stages, which we will review next.

---

## Comparing Jenkinsfiles for Test and Main Branches

### Test Branch Jenkinsfile

In the **test** branch, the Jenkinsfile defines the following stages:

- Maven Version
- Build
- Test
- Local Deployment
- Integration Testing

Below is the initial Jenkinsfile from the test branch:

```
pipeline {
    agent any
    stages {
        stage('Maven Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests=true'
                archiveArtifacts 'target/hello-demo-*.jar'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                junit(testResults: 'target/surefire-reports/TST-*.xml', keepProperties: true, keepTestNames: true)
            }
        }
    }
}
```

To compare the differences between the two Jenkinsfiles, a third-party tool is used. In the comparison, the **test** branch Jenkinsfile appears on the left and the **main** branch Jenkinsfile on the right. Although both use the same pipeline agent and tools, the stages are slightly different. The **test** branch includes the Maven Version, Build, Test stages, and adds local deployment with the `java -jar` command for integration testing. In the test branch, the local deployment stage uses triple double quotes to allow for multiline string construction and pristine whitespace preservation:

```
stage('Local Deployment') {
    steps {
        sh """java -jar target/hello-demo-*.jar > /dev/null &"""
    }
}


stage('Integration Testing') {
    steps {
        sh 'sleep 5s'
        sh 'curl -s http://localhost:6767/hello'
    }
}
```

This approach runs the Java application in the background (thanks to the ampersand) while redirecting its output to `/dev/null`.

### Main Branch Jenkinsfile

In the **main** branch, the Jenkinsfile is designed to build a production-ready pipeline. Notice that the Maven Version stage is omitted. Instead, the stages include:

- Build
- Test
- Containerization
- Kubernetes Deployment
- Integration Testing

Below is a simplified version of the main branch Jenkinsfile:

```
/******  BRANCH - main  *****/
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests=true'
                archiveArtifacts 'target/hello-demo-*.jar'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                junit(testResults: 'target/surefire-reports/TEST-*.xml', keepProperties: true, keepTestNames: true)
            }
        }
        stage('Containerization') {
            steps {
                sh 'echo Docker Build Image..'
                sh 'echo Docker Tag Image....'
                sh 'echo Docker Push Image......'
            }
        }
        stage('Kubernetes Deployment') {
            steps {
                sh 'echo Deploy to Kubernetes using [GitOps with ArgoCD](https://learn.kodekloud.com/user/courses/gitops-with-argocd)'
            }
        }
        stage('Integration Testing') {
            steps {
                sh 'sleep 10s'
                sh 'echo Testing using cURL commands......'
            }
        }
    }
}
```

Here, the containerization stage simulates building, tagging, and pushing a Docker image, whereas the deployment stage simulates deploying to Kubernetes using ArgoCD. The integration testing stage verifies the deployment by pausing for a defined duration (using `sleep`) before issuing a test call.

---

## Configuring a Parameterized Pipeline Job in Jenkins

Parameterizing your pipeline job enables a single job to run across branches and customize build options dynamically. Follow these steps in Jenkins:

### 1\. Create a New Pipeline Job

- In Jenkins Classic UI, click **New Item**.
- Name the job (e.g., "parameterized-pipeline-job") and select the **Pipeline** project type.

![The image shows a Jenkins interface for creating a new item, with options to select different project types such as Freestyle project, Pipeline, Multi-configuration project, and Folder. The item name "parameterized-pipeline-job" is entered in the text field.](https://kodekloud.com/kk-media/image/upload/v1752879497/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-new-item-parameterized-pipeline.jpg)

### 2\. Configure Source Control Management (SCM)

- Enter the repository URL for your pipeline script.
- Specify the branch. Initially, use the test branch by setting the script path to `Jenkinsfile`.

![The image shows a configuration page for a parameterized pipeline job, with various options like discarding old builds, GitHub project integration, and build triggers.](https://kodekloud.com/kk-media/image/upload/v1752879498/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/parameterized-pipeline-job-config.jpg)

### 3\. Run a Quick Build

- Click **Apply** and then **Build Now** to validate the configuration.
- The run should display the build and test stages, along with the deployment phase. Use the Blue Ocean interface to view detailed logs.

![The image shows a Jenkins dashboard displaying a parameterized pipeline job with various stages, including "Checkout SCM," "Tool Install," "Maven Version," "Build," "Test," "Local Deployment," and "Integration Test." The stages are marked with checkmarks indicating completion.](https://kodekloud.com/kk-media/image/upload/v1752879500/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-dashboard-parameterized-pipeline.jpg)

### 4\. Enable Parameterization

- In the job configuration, enable the **This project is parameterized** option.
- Add the following parameters to the job:

| Parameter      | Type   | Default Value | Description                                                                                       |
| -------------- | ------ | ------------- | ------------------------------------------------------------------------------------------------- |
| BRANCH\\\_NAME | String | main          | Specifies which Git branch to build.                                                              |
| APP\\\_PORT    | String | 6767          | The port on which the application will run during integration testing.                            |
| SLEEP\\\_TIME  | Choice | 5s            | Sets the sleep duration before the integration test. Choices include: 5s, 10s, 15s, 20s, and 25s. |

![The image shows a Jenkins configuration screen for a parameterized pipeline job, with a string parameter named "BRANCH_NAME" set to a default value of "main."](https://kodekloud.com/kk-media/image/upload/v1752879501/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-parameterized-pipeline-branch-name.jpg)

![The image shows a Jenkins configuration screen for a parameterized pipeline job, with a string parameter named "APP_PORT" set to a default value of 6767.](https://kodekloud.com/kk-media/image/upload/v1752879502/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-parameterized-pipeline-app-port.jpg)

![The image shows a configuration screen for a parameterized pipeline job, where a choice parameter named "SLEEP_TIME" is being set with options ranging from 5s to 25s.](https://kodekloud.com/kk-media/image/upload/v1752879503/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/parameterized-pipeline-sleep-time-config.jpg)

### 5\. Parameterizing the Pipeline Script

Modify the Jenkinsfile to reference the defined parameters using the syntax `${params.PARAMETER_NAME}`. For example, update the Maven Version stage in the test branch as follows:

```
pipeline {
    agent any
    stages {
        stage('Maven Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
                sh "echo Sleep-Time - ${params.SLEEP_TIME}, Port - ${params.APP_PORT}, Branch - ${params.BRANCH_NAME}"
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests=true'
                archiveArtifacts 'target/hello-demo-*.jar'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
                junit(testResults: 'target/surefire-reports/TEST-*.xml', keepProperties: true, keepTestNames: true)
            }
        }
        stage('Local Deployment') {
            steps {
                sh 'java -jar target/hello-demo-*.jar > /dev/null &'
            }
        }
    }
}
```

Ensure that the integration testing stage also utilizes the parameterized sleep duration:

```
stage('Integration Testing') {
    steps {
        sh "sleep ${params.SLEEP_TIME}"
        sh 'curl -s http://localhost:6767/hello'
    }
}
```

> [!important]
> **Note**
>
> Remember to use double quotes in shell commands when referencing parameters to allow for proper variable substitution.

### 6\. Triggering Parameterized Builds

- After committing the changes to the repository (for example, on the test branch), refresh the Jenkins job page. You should now see a **Build with Parameters** option.
- Clicking on **Build with Parameters** allows you to adjust default values (e.g., switching the branch to `test` or setting the sleep time to `5s`) before triggering the build.

![The image shows a Jenkins dashboard for a parameterized pipeline job, displaying build status, test result trends, and a successful build process with various stages completed.](https://kodekloud.com/kk-media/image/upload/v1752879505/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-dashboard-parameterized-pipeline-2.jpg)

- Once the build starts, you can use Blue Ocean to review detailed logs.

![The image shows a Jenkins dashboard displaying the activity of a parameterized pipeline job, with details about recent runs, their status, duration, and completion time.](https://kodekloud.com/kk-media/image/upload/v1752879506/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-dashboard-parameterized-pipeline-3.jpg)

The logs will confirm that the parameters (sleep time, port, branch name) are correctly substituted, as shown below:

```
+ sleep 5s
+ curl -s http://localhost:6767/hello
Hello, KodeKloud community!
```

### 7\. Customizing for the Main Branch

Edit the Jenkinsfile on the **main** branch to incorporate parameters during integration testing:

```
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'mvn test'
                junit(testResults: 'target/surefire-reports/TEST-*.xml', keepProperties: true, keepTestNames: true)
            }
        }
        stage('Containerization') {
            steps {
                sh 'echo Docker Build Image..'
                sh 'echo Docker Tag Image....'
                sh 'echo Docker Push Image......'
            }
        }
        stage('Kubernetes Deployment') {
            steps {
                sh 'echo Deploy to Kubernetes using [GitOps with ArgoCD](https://learn.kodekloud.com/user/courses/gitops-with-argocd)'
            }
        }
        stage('Integration Testing') {
            steps {
                sh "sleep ${params.SLEEP_TIME}"
                sh 'echo Testing using CURL commands......'
            }
        }
    }
    tools {
        maven 'M398'
    }
}
```

Commit these changes and trigger a new build, selecting the **main** branch and an appropriate sleep time (for example, `15s`). The build log will reflect the updated parameters, and the integration testing stage will pause for the specified duration before proceeding.

![The image shows a Jenkins pipeline interface with a job named "parameterized-pipeline-job" that has successfully completed several stages, including Maven Version, Build, Test, Local Deployment, and Integration Testing. The details of the Maven Version stage are expanded, showing various steps and their execution times.](https://kodekloud.com/kk-media/image/upload/v1752879507/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-pipeline-parameterized-job.jpg)

![The image shows a Jenkins pipeline console for a build labeled "Build #3," which has successfully completed several stages, including "Integration Testing." Each step within the stage is marked as successful, with details on execution time.](https://kodekloud.com/kk-media/image/upload/v1752879508/notes-assets/images/Jenkins-For-Beginners-Create-Pipeline-with-Parameters/jenkins-pipeline-build-3-successful.jpg)

> [!important]
> **Warning**
>
> Ensure that you update all necessary areas in your Jenkinsfiles to reflect the new parameterized approach. Missing a reference may lead to build inconsistencies.

---

## Conclusion

By utilizing parameters in your Jenkins pipelines, you can dynamically switch between branches and customize build options—such as sleep time and application port—with ease. This approach allows a single pipeline job to handle different workflows for test and main branches, enhancing the robustness and flexibility of your CI/CD process.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/7a0e1db9-2683-4c69-b4f1-a17732953d8e)**
>
> Watch video content
