# Loading the Shared Library in Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/Loading-the-Shared-Library-in-Pipeline)

---

## Table of Contents

- Loading the Shared Library in Pipeline
  - Prerequisites
  - 1. Inline Slack Notification (Before)
  - 2. Switching to the Shared Library
  - 3. Shared Library Implementation
  - 4. Triggering and Verifying the Build
  - 5. Confirming Library Loading in Console
  - Conclusion
  - References
  - Watch Video
    - Drawbacks of Inline Methods
    - Environment Variables Reference

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# Loading the Shared Library in Pipeline

This guide demonstrates how to replace inline methods with a centrally managed Shared Library in Jenkins. By loading common steps—like Slack notifications—from a library, you simplify maintenance, enforce consistency, and version your pipeline logic.

## Prerequisites

- Jenkins instance with **Global Pipeline Libraries** configured
- Access to the Git repository hosting your shared library
- [Slack Plugin](https://plugins.jenkins.io/slack/) installed and a valid Slack bot token

Verify that your library appears under **Manage Jenkins » Configure System » Global Pipeline Libraries**:

![The image shows a Jenkins configuration screen for managing global trusted pipeline libraries, with options to set the library name, default version, and various settings related to library usage.](https://kodekloud.com/kk-media/image/upload/v1752868952/notes-assets/images/Advanced-Jenkins-Loading-the-Shared-Library-in-Pipeline/jenkins-global-pipeline-library-config.jpg)

After you save and refresh, Jenkins connects to your Git repo and displays the commit ID from the default branch—confirming connectivity.

---

## 1\. Inline Slack Notification (Before)

In a typical Jenkinsfile, you might define a `slackNotificationMethod` inline:

```
def slackNotificationMethod(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'
    def color = (buildStatus == 'SUCCESS')  ? '#47ec05' :
                (buildStatus == 'UNSTABLE') ? '#d5ee0d' :
                                              '#ec2805'
    def msg = "${buildStatus}: '${env.JOB_NAME}' #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
    slackSend(color: color, message: msg)
}


pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install --no-audit'
            }
        }
    }
    post {
        always {
            slackNotificationMethod()
        }
    }
}
```

### Drawbacks of Inline Methods

- Duplication across multiple Jenkinsfiles
- Harder to maintain and version
- Inconsistent behavior if modified in one pipeline only

---

## 2\. Switching to the Shared Library

Replace the inline function by adding the `@Library` annotation at the top of your Jenkinsfile:

```
@Library('dasher-trusted-shared-library') _


pipeline {
    agent any


    tools {
        // ...
    }


    environment {
        MONGO_URI          = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
        MONGO_DB_CREDS     = credentials('mongo-db-credentials')
        MONGO_USERNAME     = credentials('mongo-db-username')
        MONGO_PASSWORD     = credentials('mongo-db-password')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-6'
        GITEA_TOKEN        = credentials('gitea-api-token')
    }


    options {
        // ...
    }


    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install --no-audit'
            }
        }
    }


    post {
        always {
            // Delegates to vars/slackNotification.groovy in the shared library
            slackNotification()
        }
    }
}
```

> [!important]
> **Note**
>
> The underscore (`_`) after `@Library('…')` completes the annotation syntax but doesn’t affect runtime behavior.

### Environment Variables Reference

| Variable                 | Description                              | Source                 |
| ------------------------ | ---------------------------------------- | ---------------------- |
| MONGO\\\_URI             | MongoDB connection string                | Hardcoded              |
| MONGO\\\_DB\\\_CREDS     | MongoDB credentials (ID and secret)      | `mongo-db-credentials` |
| MONGO\\\_USERNAME        | MongoDB username (secret text)           | `mongo-db-username`    |
| MONGO\\\_PASSWORD        | MongoDB password (secret text)           | `mongo-db-password`    |
| SONAR\\\_SCANNER\\\_HOME | SonarQube Scanner installation directory | Jenkins Tool           |
| GITEA\\\_TOKEN           | API token for Gitea                      | `gitea-api-token`      |

> [!important]
> **Warning**
>
> Always store sensitive data—like database credentials or API tokens—as Jenkins **Credentials**.
> Never hardcode secrets directly in your Jenkinsfiles.

---

## 3\. Shared Library Implementation

In your shared library repository, under `vars/slackNotification.groovy`, define the `call` method Jenkins will load:

```
// vars/slackNotification.groovy
def call(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'
    def color = (buildStatus == 'SUCCESS')  ? '#47ec05' :
                (buildStatus == 'UNSTABLE') ? '#d5ee0d' :
                                              '#ee2805'
    def msg = "${buildStatus}: '${env.JOB_NAME}' #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
    slackSend(color: color, message: msg)
}
```

This single implementation is now reusable across any pipeline that loads the library.

---

## 4\. Triggering and Verifying the Build

After committing your updated Jenkinsfile on the `feature/advanced-demo` branch, Jenkins will detect the change and queue a new build:

![The image shows a Jenkins dashboard displaying the build status of a project named "solar-system" under the "Gitea-Organization." It lists several builds with their status, commit IDs, messages, durations, and completion times.](https://kodekloud.com/kk-media/image/upload/v1752868953/notes-assets/images/Advanced-Jenkins-Loading-the-Shared-Library-in-Pipeline/jenkins-dashboard-solar-system-builds.jpg)

The pipeline runs successfully and posts a notification to Slack for build #6.

---

## 5\. Confirming Library Loading in Console

To see how Jenkins fetches and loads your shared library, review the classic console output and filter for `library`:

```
> git ls-remote -h http://64.227.187.25:5555/dasher-org/shared-libraries # timeout=10
> git init /var/lib/jenkins/workspace/feature/advanced-demo/libs/dasher-org/shared-libraries
[Pipeline] library
Loading library dasher-trusted-shared-library @ main from http://64.227.187.25:5555/dasher-org/shared-libraries
> git fetch --no-tags --force --progress -- http://64.227.187.25:5555/dasher-org/shared-libraries +refs/heads/main:refs/remotes/dasher-org/shared-libraries/main
```

Later in the log, you’ll see the Slack step using values defined in the library:

```
Slack Send Pipeline step running, values are -
  baseUrl: <empty>,
  teamDomain: Jenkins,
  channel: dasher-notifications,
  color: #47ec05,
  botUser: true,
  tokenCredentialId: slack-bot-token,
  notifyCommitters: false
```

---

## Conclusion

By centralizing common pipeline logic in Jenkins Shared Libraries, you:

- Reduce code duplication
- Simplify maintenance and updates
- Manage multiple library versions via Git branches or tags

Now you can create additional reusable steps or even combine multiple libraries for more complex workflows.

---

## References

- [Jenkins Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Slack Plugin for Jenkins](https://plugins.jenkins.io/slack/)
- [Jenkins Credentials Documentation](https://www.jenkins.io/doc/book/using/using-credentials/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/a3384fd5-6a79-4a4c-b990-4d619693361c)**
>
> Watch video content
