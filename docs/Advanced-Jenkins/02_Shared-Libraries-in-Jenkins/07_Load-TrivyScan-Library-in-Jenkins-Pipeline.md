# Load TrivyScan Library in Jenkins Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/Load-TrivyScan-Library-in-Jenkins-Pipeline)

---

## Table of Contents

- Load TrivyScan Library in Jenkins Pipeline
  - 1. TrivyScan Groovy Script
  - 2. Configure Global Trusted Library in Jenkins
  - 3. Reference the Feature Branch in Your Jenkinsfile
  - 4. Invoking Shared-Library Methods
  - 5. Handling Common “Method Calls Not Allowed” Errors
  - 6. Reviewing Pipeline Run and Artifacts
  - Summary
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# Load TrivyScan Library in Jenkins Pipeline

Enhance your Jenkins CI/CD workflow by integrating a custom TrivyScan shared library. This guide walks you through creating the library, configuring Jenkins, referencing a feature branch, invoking scan methods, handling common errors, and reviewing pipeline artifacts.

In this tutorial we will cover:

1.  Creating the `TrivyScan` Groovy script
2.  Configuring a global trusted library in Jenkins
3.  Referencing a feature branch in the `Jenkinsfile`
4.  Invoking library methods (`vulnerability` and `reportsConverter`)
5.  Handling “method calls not allowed” errors
6.  Reviewing the final pipeline run and published artifacts

---

## 1\. TrivyScan Groovy Script

Start by creating a new Git branch and adding the `TrivyScan.groovy` file under `vars/`. This shared library defines two methods:

```
git checkout -b featureTrivyScan
```

```
// vars/TrivyScan.groovy


def vulnerability(String imageName) {
    sh """
    echo "Scanning image: ${imageName}"
    trivy image ${imageName} \
        --severity LOW,MEDIUM,HIGH \
        --exit-code 0 \
        --quiet \
        --format json \
        -o trivy-image-MEDIUM-results.json


    trivy image ${imageName} \
        --severity CRITICAL \
        --exit-code 1 \
        --quiet \
        --format json \
        -o trivy-image-CRITICAL-results.json
    """
}


def reportsConverter() {
    sh """
    trivy convert \
        --format template \
        --template "@/usr/local/share/trivy/templates/html.tpl" \
        --output trivy-image-MEDIUM-results.html \
        trivy-image-MEDIUM-results.json


    trivy convert \
        --format template \
        --template "@/usr/local/share/trivy/templates/html.tpl" \
        --output trivy-image-CRITICAL-results.html \
        trivy-image-CRITICAL-results.json


    trivy convert \
        --format template \
        --template "@/usr/local/share/trivy/templates/junit.tpl" \
        --output trivy-image-MEDIUM-results.xml \
        trivy-image-MEDIUM-results.json


    trivy convert \
        --format template \
        --template "@/usr/local/share/trivy/templates/junit.tpl" \
        --output trivy-image-CRITICAL-results.xml \
        trivy-image-CRITICAL-results.json
    """
}
```

| Method Name      | Purpose                                     | Output Files                                                                    |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| vulnerability    | Scan Docker image for vulnerabilities       | `trivy-image-MEDIUM-results.json`, `trivy-image-CRITICAL-results.json`          |
| reportsConverter | Convert JSON scan reports to HTML and JUnit | `trivy-image-MEDIUM-results.html`, `trivy-image-CRITICAL-results.html`, `*.xml` |

> [!important]
> **Note**
>
> Branching allows you to test changes in `featureTrivyScan` without affecting your main pipeline.

---

## 2\. Configure Global Trusted Library in Jenkins

As a Jenkins administrator:

1.  Navigate to **Manage Jenkins > Configure System > Global Pipeline Libraries**.
2.  Add a new library:
    - Name: `dasher-trusted-shared-library`
    - Default version: `main`
    - **Allow default version to be overridden**: **Enabled**

![The image shows a Jenkins configuration screen for managing global trusted pipeline libraries, with options to set the library name, default version, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752868950/notes-assets/images/Advanced-Jenkins-Load-TrivyScan-Library-in-Jenkins-Pipeline/jenkins-global-trusted-libraries-config.jpg)

> [!important]
> **Warning**
>
> Enabling “default version override” lets you specify feature branches like `featureTrivyScan` in your `Jenkinsfile`.

---

## 3\. Reference the Feature Branch in Your Jenkinsfile

At the top of your `Jenkinsfile`, use the `@Library` annotation to load the shared library from the `featureTrivyScan` branch:

```
@Library('dasher-trusted-shared-library@featureTrivyScan') _
```

Define the rest of your declarative pipeline:

```
pipeline {
    agent any


    tools {
        // Define tools here if needed
    }


    environment {
        MONGO_URI          = "mongodb+srv://.../superData"
        MONGO_DB_CREDS     = credentials('mongo-db-credentials')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
        GITEA_TOKEN        = credentials('gitea-api-token')
    }


    stages {
        stage('Install Dependencies') {
            options { timestamps() }
            steps {
                // Your dependency install steps
            }
        }


        stage('Build Docker Image') {
            steps {
                sh 'docker build -t siddharth67/solar-system:$GIT_COMMIT .'
            }
        }


        stage('Trivy Vulnerability Scanner') {
            steps {
                script {
                    trivyScan.vulnerability("siddharth67/solar-system:$GIT_COMMIT")
                }
            }
            post {
                always {
                    script {
                        trivyScan.reportsConverter()
                    }
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: './'
                    ])
                }
            }
        }


        // stage('Push Docker Image') { ... }
    }
}
```

---

## 4\. Invoking Shared-Library Methods

In declarative pipelines, **all** calls to shared-library methods (for example, `trivyScan.vulnerability(...)`) **must** be wrapped inside a `script` block:

```
script {
    trivyScan.vulnerability("your/image:tag")
}
```

---

## 5\. Handling Common “Method Calls Not Allowed” Errors

If you encounter an error like:

```
Method calls on objects not allowed outside "script" blocks.
```

ensure you’ve moved every shared-library invocation into a `script { ... }` section, as shown above.

---

## 6\. Reviewing Pipeline Run and Artifacts

Once you push your updated `Jenkinsfile`, your pipeline (e.g., build #8) will:

- Fetch your shared library from `featureTrivyScan`
- Execute Trivy vulnerability scans
- Convert JSON results into HTML/JUnit reports

Console snippet:

```
> git fetch ... origin/featureTrivyScan
> git checkout -f refs/remotes/origin/featureTrivyScan
...
trivy image siddharth67/solar-system:<commit> --severity LOW,MEDIUM,HIGH ...
trivy image siddharth67/solar-system:<commit> --severity CRITICAL ...
trivy convert --format template ... html.tpl ...
```

Artifacts include JSON, HTML, and XML reports:

![The image shows a Jenkins interface displaying artifacts from a build pipeline, including a pipeline log and Trivy vulnerability reports.](https://kodekloud.com/kk-media/image/upload/v1752868951/notes-assets/images/Advanced-Jenkins-Load-TrivyScan-Library-in-Jenkins-Pipeline/jenkins-build-pipeline-artifacts.jpg)

---

## Summary

- Add your Groovy methods under `vars/TrivyScan.groovy`.
- Enable “default version override” in Jenkins global libraries.
- Reference your feature branch with `@Library`.
- Wrap all shared-library method calls in `script` blocks.
- Use `trivyScan.vulnerability(...)` and `trivyScan.reportsConverter()` for scanning and report conversion.
- Publish results with `publishHTML`.

By modularizing your vulnerability scanning logic into a shared library, you keep your `Jenkinsfile` clean, reusable, and easy to maintain.

---

## Links and References

- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Jenkins Pipeline Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [publishHTML Plugin](https://plugins.jenkins.io/publishhtml/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/d5f7a1c2-06c4-418e-84b3-330596bc91b6)**
>
> Watch video content
