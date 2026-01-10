# Configure Shared Library in Jenkins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/Configure-Shared-Library-in-Jenkins)

---

## Table of Contents

- Configure Shared Library in Jenkins
  - 1. Example: Slack Notification Script
  - 2. Register the Shared Library
  - 3. Reference the Library in Your Pipeline
  - 4. Next Steps
  - Links and References
  - Watch Video
    - 3.1 Fetching Third-Party Dependencies

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# Configure Shared Library in Jenkins

Centralize reusable Groovy scripts by registering a [Jenkins Shared Library](https://www.jenkins.io/doc/book/pipeline/shared-libraries/). This guide covers:

- Defining library functions (e.g., Slack notifications)
- Adding a Shared Library in Jenkins
- Referencing and importing library code in pipelines
- Fetching third-party dependencies with `@Grab`
- Bundling and retrieving resource files

![The image shows a Jenkins documentation page about using shared libraries in pipelines, with a form for configuring a global trusted pipeline library.](https://kodekloud.com/kk-media/image/upload/v1752868928/notes-assets/images/Advanced-Jenkins-Configure-Shared-Library-in-Jenkins/jenkins-shared-libraries-pipelines.jpg)

## 1\. Example: Slack Notification Script

Place this Groovy function under `vars/notify.groovy` in your Shared Library to send build status updates to Slack:

```
def call(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESS'
    def color = (buildStatus == 'SUCCESS') ? '#47ec05' :
                (buildStatus == 'UNSTABLE') ? '#d5ee0d' : '#ec2805'
    def msg = "${buildStatus}: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
    slackSend(color: color, message: msg)
}
```

| Build Status | Color Code |
| ------------ | ---------- |
| SUCCESS      | `#47ec05`  |
| UNSTABLE     | `#d5ee0d`  |
| FAILED/OTHER | `#ec2805`  |

## 2\. Register the Shared Library

1.  Go to **Manage Jenkins** → **Configure System**.
2.  Scroll to **Global Pipeline Libraries**.

> [!important]
> **Note**
>
> By default, libraries run in Jenkins’ Groovy sandbox.
> Disabling the sandbox allows static calls, `@Grab`, and advanced APIs but bypasses script-security checks.

| Field                             | Description                                                   | Example                  |
| --------------------------------- | ------------------------------------------------------------- | ------------------------ |
| **Name**                          | Unique identifier for the library                             | `DasherSharedLib`        |
| **Default version**               | Git branch or tag used when unqualified                       | `main`                   |
| **Load implicitly**               | Auto-load library without `@Library`                          | `Off`                    |
| **Allow version override**        | Permit `@Library('name@branch')` to select alternate branches | `Enabled`                |
| **Include in job recent changes** | Trigger pipelines when the library code changes               | `Opt-in`                 |
| **Retrieval method**              | SCM plugin to fetch the library (Git, SVN, etc.)              | `Git`                    |
| **Project repository**            | Repository URL                                                | `https://github.com/...` |

3.  Click **Add** under **Global Pipeline Libraries**.
4.  Fill out the form using the table above.
5.  Click **Apply** and **Save**.

![The image shows a Jenkins configuration screen for managing shared libraries, with options for setting the default version, loading implicitly, and retrieval methods using SCM.](https://kodekloud.com/kk-media/image/upload/v1752868929/notes-assets/images/Advanced-Jenkins-Configure-Shared-Library-in-Jenkins/jenkins-shared-libraries-config.jpg)

![The image shows a Jenkins system configuration page with options for managing shared libraries, including settings for library changes, retrieval methods, and source code management using Git.](https://kodekloud.com/kk-media/image/upload/v1752868930/notes-assets/images/Advanced-Jenkins-Configure-Shared-Library-in-Jenkins/jenkins-system-configuration-shared-libraries.jpg)

## 3\. Reference the Library in Your Pipeline

Add the library at the top of your `Jenkinsfile`:

```
@Library('DasherSharedLib@main') _
import com.mycorp.pipeline.slack.notify

pipeline {
    agent any
    stages {
        stage('Notify Start') {
            steps {
                notify('STARTED')
            }
        }
    }
}
```

### 3.1 Fetching Third-Party Dependencies

Trusted Shared Libraries can include `@Grab` annotations to pull Maven artifacts:

```
@Grab('org.apache.commons:commons-math3:3.4.1')
import org.apache.commons.math3.primes.Primes

void checkPrime(int count) {
    if (!Primes.isPrime(count)) {
        error "${count} is not prime"
    }
}
```

Retrieve packed resources (e.g., JSON templates) with `libraryResource`:

```
def template = libraryResource 'com/mycorp/pipeline/somelib/request.json'
```

> [!important]
> **Warning**
>
> `@Grab` and `libraryResource` require the library to run outside the sandbox.
> Sandboxed mode will block these calls with security exceptions.

## 4\. Next Steps

- Create a pipeline to invoke your Shared Library methods.
- Explore [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/) for advanced usage.

## Links and References

- [Jenkins Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Script Security Plugin](https://plugins.jenkins.io/script-security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/ee85b493-cfe4-4563-ba3b-6c3e42991658)**
>
> Watch video content
