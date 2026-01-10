# Send Slack Notification - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Send-Slack-Notification)

---

## Table of Contents

- Send Slack Notification
  - Step 1: Create a Feature Branch
  - Step 2: Modify the Jenkinsfile to Configure Slack Notifications
  - Step 3: Implement Slack Notifications in the Post Section
  - Step 4: Create a Reusable Groovy Notification Method
  - Step 5: Integrate the Notification Method into Your Pipeline
  - Step 6: Handling Specific Build Scenarios
  - Conclusion
  - Watch Video
  - Practice Lab
    - Example: Stage with Post Block

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Send Slack Notification

In this tutorial, we demonstrate how to modify your Jenkinsfile to send Slack notifications based on build status. By following these steps, you can integrate Slack alerts without affecting your main branch.

## Step 1: Create a Feature Branch

Before making any changes, create a new branch to work on Slack notifications safely. For example, create a branch named `feature/enabling-slack`:

```
root@jenkins-controller-1 in solar-system on  🌿 main via 🦕 v20.16.0 on 🌍 (us-east-2)
➜  git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on  🌿 feature/enabling-slack via 🦕 v20.16.0 on 🌍 (us-east-2)
➜
```

## Step 2: Modify the Jenkinsfile to Configure Slack Notifications

Update your Jenkinsfile to include Slack notifications. Open the Pipeline Syntax Generator and search for Slack commands like `slackSend`, `slackUploadFile`, or those used for user ID resolution. In this guide, we focus on the `slackSend` command.

You will need to specify:

- The Slack channel (e.g., "dasher-notifications")
- A message (e.g., "Testing")
- An optional color based on the build result (green for success, red for failure)

Below is a screenshot of the Jenkins Pipeline configuration screen:

![The image shows a Jenkins pipeline syntax configuration screen for sending a Slack message, with fields for channel, message, and color settings.](https://kodekloud.com/kk-media/image/upload/v1752879688/notes-assets/images/Jenkins-Pipelines-Send-Slack-Notification/jenkins-pipeline-slack-message-config.jpg)

After configuring the options, your command may look similar to the following:

```
stage('DAST - OWASP ZAP') {
}


stage('Upload - AWS S3') {
}


stage('Deploy to Prod?') {
}


stage('Lambda - S3 Upload & Deploy') {
}


stage('Lambda - Invoke Function') {
}
```

```
root@jenkins-controller-1 in solar-system on  💻 main via   v20.16.0 on ☁️ (us-east-2)
```

## Step 3: Implement Slack Notifications in the Post Section

Add the Slack notification command in the `post` block of your stages to handle conditions like success, failure, aborted, or unstable builds. For example:

```
post {
    unstable {
        slackSend botUser: true, channel: 'dasher-notifications', color: '#439FE0', message: 'Build Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}'
    }
    aborted {
        slackSend botUser: true, channel: 'dasher-notifications', color: '#439FE0', message: 'Build Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}'
    }
    success {
        slackSend botUser: true, channel: 'dasher-notifications', color: '#439FE0', message: 'Build Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}'
    }
    failure {
        slackSend botUser: true, channel: 'dasher-notifications', color: '#439FE0', message: 'Build Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}'
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
```

> [!important]
> **Pro Tip**
>
> To simplify maintenance when working with many stages (20 or more), consider creating a reusable Groovy method for sending Slack notifications rather than adding duplicate post blocks in every stage.

## Step 4: Create a Reusable Groovy Notification Method

Add the following Groovy method before the pipeline block in your Jenkinsfile. This method accepts an optional build status (defaulting to 'STARTED'), determines the notification color, and constructs a message using the job details.

```
def slackNotificationMethod(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'


    def color


    if (buildStatus == 'SUCCESS') {
        color = '#47ec05'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#d5ee0d'
    } else {
        color = '#ec2805'
    }


    def msg = "${buildStatus}: *${env.JOB_NAME}* #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"


    slackSend(color: color, message: msg)
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on 📦 feature/enabling-slack via 🦊 v20.16.0 on ☁️ (us-east-2)
```

## Step 5: Integrate the Notification Method into Your Pipeline

Invoke the reusable notification method in the `post always` section of your pipeline to ensure that a notification is sent regardless of build outcome:

```
def slackNotificationMethod(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'


    def color
    if (buildStatus == 'SUCCESS') {
        color = '#47ec05'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#d5ee0d'
    } else {
        color = '#ec2805'
    }


    def msg = "${buildStatus}: `${env.JOB_NAME}` *#${env.BUILD_NUMBER}*:\n${env.BUILD_URL}"
    slackSend(color: color, message: msg)
}


pipeline {
    agent any
    tools {
        // Add tool configurations if necessary.
    }
    post {
        always {
            slackNotificationMethod("${currentBuild.result}")
        }
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on feature/enabling-slack
```

With this configuration, no matter which stage fails, the `post always` block will invoke the `slackNotificationMethod`, sending a Slack notification with details like the build ID, URL, and job name. Jenkins is preconfigured with the necessary channel and token credentials, so you don't have to manually set them in your script.

### Example: Stage with Post Block

This is an example of a stage with its corresponding post block that includes Slack notifications and additional cleanup steps:

```
stage('Lambda - S3 Upload & Deploy') {
    // Stage steps go here.
}


stage('Lambda - Invoke Function') {
    // Stage steps go here.
}


post {
    always {
        slackNotificationMethod("${currentBuild.result}")
        script {
            if (fileExists('solar-system-gitops-argocd')) {
                sh 'rm -rf solar-system-gitops-argocd'
            }
        }
        junit allowEmptyResults: true, testResults: 'test-results.xml'
        junit allowEmptyResults: true, testResults: 'dependency-check-junit.xml'
        junit allowEmptyResults: true, testResults: 'trivy-image-CRITICAL-results.xml'
        junit allowEmptyResults: true, testResults: 'trivy-image-MEDIUM-results.xml'
        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: './',
            reportFiles: 'zap_report.html',
            reportName: 'DAST - OWASP ZAP Report'
        ])
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
```

When a build is initiated on the `feature/enabling-slack` branch, the pipeline executes all stages and sends Slack notifications with detailed build information. You might notice console logs similar to:

```
SUCCESS: Gitea-Organization/solar-system/feature/%252Fenabling-slack #1:
http://64.227.187.25:8080/job/Gitea-Organization/job/solar-system/job/feature%252Fenabling-slack/1/
```

## Step 6: Handling Specific Build Scenarios

In your Jenkinsfile for code coverage, a `catchError` block can be used to adjust the build result, ensuring that the Slack notification method receives the correct parameter:

```
stage('Code Coverage') {
    steps {
        catchError(buildResult: 'SUCCESS', message: 'Oops! It will be fixed in future releases',
                   stageResult: 'UNSTABLE') {
            sh 'npm run coverage'
        }
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on ⏣ feature/enabling-slack via ⬢ v20.16.0 on (us-east-2)
```

To simulate a failure, you can add an `exit 1` command in a stage. For example:

```
pipeline {
    agent any,


    tools {
        // Define any required tools here.
    }
    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
        MONGO_DB_CREDS = credentials('mongo-db-credentials')
        MONGO_USERNAME = credentials('mongo-db-username')
        MONGO_PASSWORD = credentials('mongo-db-password')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
        GITEA_TOKEN = credentials('gitea-api-token')
    }


    stages {
        stage('Installing Dependencies') {
            options { timestamps() }
            steps {
                sh 'npm install --no-audit'
                sh 'exit 1'
            }
        }
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on feature/enabling-slack via v20.16.0 on (us-east-2)
```

In this case, the `post always` block will trigger a failure notification with the corresponding red color.

> [!important]
> **Reusable Notification Method Overview**
>
> Below is the final version of the reusable Groovy method used throughout the Jenkinsfile:

```
def slackNotificationMethod(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'


    def color
    if (buildStatus == 'SUCCESS') {
        color = '#47ec05'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#d5ee0d'
    } else {
        color = '#ec2805'
    }


    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"
    slackSend(color: color, message: msg)
}


pipeline {
    agent any
    tools {
        // Add your tool configurations here.
    }
}
```

```
git checkout -b feature/enabling-slack
Switched to a new branch 'feature/enabling-slack'
root@jenkins-controller-1 in solar-system on ⬢ feature/enabling-slack via 🐱 v20.16.0 on 💬 (us-east-2)
```

## Conclusion

In larger environments, consider using shared libraries to reuse common methods (like the Slack notification method) across multiple Jenkinsfiles. This approach maintains consistency while reducing duplicated code and simplifying maintenance.

![The image shows a Jenkins pipeline interface for a project named "solar-system," displaying various stages of the build process, including dependency installation, testing, and deployment, with some stages marked as successful and one with a warning. Integration testing details are also visible, including a Slack message step.](https://kodekloud.com/kk-media/image/upload/v1752879690/notes-assets/images/Jenkins-Pipelines-Send-Slack-Notification/jenkins-pipeline-solar-system-build.jpg)

That concludes our guide on integrating Slack notifications in a Jenkins pipeline. Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/a1d794c7-eb2a-4848-8765-426b976df5ab)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/833ee576-11b7-4cbe-872e-bf91c4d3f93c)**
>
> Practice lab
