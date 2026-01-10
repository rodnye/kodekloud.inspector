# Demo SonarQube Authentication Clarification - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-SonarQube-Authentication-Clarification)

---

## Table of Contents

- Demo SonarQube Authentication Clarification
  - Authentication Methods Compared
  - Original Pipeline (with -Dsonar.login)
  - Updated Pipeline (plugin-only authentication)
  - Minimal Jenkinsfile Example
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo SonarQube Authentication Clarification

In this guide, we’ll explain how to streamline SonarQube authentication in your Jenkins pipelines. You have two options:

- Supply a login token directly in the Maven CLI using `-Dsonar.login`.
- Let Jenkins inject the token via the `withSonarQubeEnv` wrapper.

Both methods work—choose one to avoid redundancy and improve security.

---

## Authentication Methods Compared

| Method             | Configuration Location | Example                                          | Pros & Cons                               |
| ------------------ | ---------------------- | ------------------------------------------------ | ----------------------------------------- |
| Maven CLI property | `sh "mvn ..."`         | `-Dsonar.login=YOUR_TOKEN`                       | Simple but exposes token in logs          |
| Plugin wrapper     | Jenkinsfile            | `withSonarQubeEnv('SonarQube') { sh "mvn ..." }` | Secure, centralized credential management |

---

## Original Pipeline (with `-Dsonar.login`)

```
pipeline {
  agent any
  stages {
    stage('Mutation Tests - PIT') {
      steps {
        sh "mvn org.pitest:pitest-maven:mutationCoverage"
      }
      post {
        always {
          pitmutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
        }
      }
    }


    stage('SonarQube - SAST') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "mvn sonar:sonar \
            -Dsonar.projectKey=numeric-application \
            -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000 \
            -Dsonar.login=0925129c435c63164d3e63c9fd988ea9f9fd705"
        }
        timeout(time: 2, unit: 'MINUTES') {
          script {
            waitForQualityGate abortPipeline: true
          }
        }
      }
    }


    stage('Docker Build and Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t sidhdhart67/numeric-app:"$GIT_COMMIT" .'
          sh 'docker push sidhdhart67/numeric-app:"$GIT_COMMIT"'
        }
      }
    }
  }
}
```

> [!important]
> **Warning**
>
> Using both `withSonarQubeEnv` and `-Dsonar.login` is redundant. Pick one to keep your pipeline clean and secure.

---

## Updated Pipeline (plugin-only authentication)

By removing the `-Dsonar.login` property, Jenkins uses the credentials defined in **Manage Jenkins → Configure System → SonarQube Servers**:

```
pipeline {
  agent any
  stages {
    stage('Mutation Tests - PIT') {
      steps {
        sh "mvn org.pitest:pitest-maven:mutationCoverage"
      }
      post {
        always {
          pitmutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
        }
      }
    }


    stage('SonarQube - SAST') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "mvn sonar:sonar \
            -Dsonar.projectKey=numeric-application \
            -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000"
        }
        timeout(time: 2, unit: 'MINUTES') {
          script {
            waitForQualityGate abortPipeline: true
          }
        }
      }
    }


    stage('Docker Build and Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t sidhdhart67/numeric-app:"$GIT_COMMIT" .'
          sh 'docker push sidhdhart67/numeric-app:"$GIT_COMMIT"'
        }
      }
    }
  }
}
```

When this pipeline runs, the SonarQube stage completes successfully without exposing the token in the Maven command.

---

## Minimal Jenkinsfile Example

For small projects, you can simplify your Jenkinsfile to just the SonarQube stage:

```
pipeline {
  agent any
  stages {
    stage('SonarQube - SAST') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh """
            mvn sonar:sonar \
              -Dsonar.projectKey=numeric-application \
              -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000
          """
        }
      }
    }
  }
  post {
    always {
      timeout(time: 2, unit: 'MINUTES') {
        script {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
```

> [!important]
> **Note**
>
> The `withSonarQubeEnv` step injects the authentication token automatically. No need for `-Dsonar.login`.

---

## Further Reading

- [Jenkins SonarQube Plugin](https://plugins.jenkins.io/sonar)
- [SonarQube Scanner for Maven](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-maven/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/a3d2a951-7232-4470-b672-f11ac772316a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/812d5090-a3a5-45eb-9d0e-1536216c922f)**
>
> Practice lab
