# Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Options)

---

## Table of Contents

- Options
  - Example: Utilizing Multiple Pipeline Options
  - Demonstrating the Timeout Option
  - Updated Pipeline with Enhanced Credential Handling
  - Console Output Excerpt
  - Benefits of Configuring Pipeline Options
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Options

In this article, we delve into several pipeline options available for configuring your Jenkins pipelines. Although Jenkins offers many configuration options, we'll focus on three essential ones: timeout, skipDefaultCheckout, and retry. For additional details, refer to the [official Jenkins documentation](https://learn.kodekloud.com/user/courses/jenkins).

## Example: Utilizing Multiple Pipeline Options

Consider the following Jenkins pipeline example that leverages the options keyword:

```
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
        skipDefaultCheckout()
        retry(3)
    }
    stages {
        stage('Build') {
            steps {
                // steps to build
            }
        }
    }
}
```

This example illustrates how each pipeline option works:

- **timeout:** Limits the build duration to one hour. If the build runs longer, it will be automatically terminated.
- **skipDefaultCheckout:** Disables the automatic source code checkout, allowing you to handle the checkout process manually.
- **retry:** Sets the pipeline to retry up to three times upon failure, ensuring transient issues do not cause the entire pipeline to fail.

## Demonstrating the Timeout Option

Below is an example that demonstrates the timeout property in action. In this configuration, the pipeline is set to time out after 1 minute. The first stage includes a sleep command lasting 70 seconds, intentionally exceeding the timeout limit and causing the build to abort.

```
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'MINUTES')
    }
    stages {
        stage('lint and format') {
            steps {
                sh "sleep 70"
            }
        }
        stage('Setup') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'server-creds', ...)])
            }
        }
    }
}
```

> [!important]
> **Note**
>
> In this scenario, the sleep command's duration of 70 seconds exceeds the defined timeout of 60 seconds, leading to an aborted build.

## Updated Pipeline with Enhanced Credential Handling

Here’s an updated version of the pipeline with a slight modification in the credentials block for better clarity and structure:

```
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'MINUTES')
    }
    stages {
        stage('lint and format') {
            steps {
                sh "sleep 70"
            }
        }
        stage('Setup') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'server-creds')]) {
                    // Insert steps that require credentials here
                }
            }
        }
    }
}
```

## Console Output Excerpt

The console output below confirms that the pipeline attempted to execute the sleep command for 70 seconds. Since the timeout is set to one minute, the build is aborted once the timeout is exceeded:

```
90f4fcfb..7bae46b  main -> main
C:\Users\sanje\Documents\Jenkins-demo
> git add .
C:\Users\sanje\Documents\Jenkins-demo
> git co
```

```
> /usr/bin/git rev-parse --resolve-git-dir /var/lib/jenkins/workspace/flaskpipeline/.git # timeout=10
> /usr/bin/git config remote.origin.url https://github.com/kodekloudhub/course-jenkins-project # timeout=10
> /usr/bin/git --version # timeout=10
> git --version # git version 2.40.1
> /usr/bin/git fetch --tags --force --progress https://github.com/kodekloudhub/course-jenkins-project # timeout=10
> /usr/bin/git rev-parse refs/remotes/origin/main^{commit} # timeout=10
> /usr/bin/git config core.sparsecheckout # timeout=10
> /usr/bin/git checkout -f 7abe46b7a77e92c23123bf50a7e631 # timeout=10
Commit message: "parallel"
> /usr/bin/git rev-list --no-walk 90f4c6bf6b70be442804fc5c04c8b0ff05c # timeout=10
```

The output confirms that the pipeline's sleep command exceeded the timeout threshold, resulting in the build being terminated. This behavior underscores the importance of the timeout option in preventing indefinitely running builds and preserving system resources.

## Benefits of Configuring Pipeline Options

Configuring the appropriate pipeline options in Jenkins provides several benefits:

| Pipeline Option     | Purpose                                       | Example Use Case                                      |
| ------------------- | --------------------------------------------- | ----------------------------------------------------- |
| timeout             | Limits build duration to avoid runaway builds | Prevents a build from running longer than expected    |
| skipDefaultCheckout | Disables automatic source code checkout       | Allows manual handling of source checkout             |
| retry               | Automatically retries a failing build         | Increases reliability by rerunning transient failures |

By effectively managing build durations, source code checkouts, and retry behaviors, you can optimize your CI/CD pipelines to suit your project's requirements.

> [!important]
> **Warning**
>
> Be cautious when setting timeout values and retry counts. Overly aggressive values may lead to premature terminations or masking underlying build issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/e7ed1ace-04e0-48b3-ae2a-fa2b0e9d4eeb)**
>
> Watch video content
