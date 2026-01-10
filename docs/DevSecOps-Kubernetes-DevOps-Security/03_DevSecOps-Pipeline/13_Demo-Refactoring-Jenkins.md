# Demo Refactoring Jenkins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Refactoring-Jenkins)

---

## Table of Contents

- Demo Refactoring Jenkins
  - Why Consolidate post { always } Blocks?
  - Original Jenkinsfile with Repeated Post Sections
  - Consolidating Post Actions
  - Refactored Jenkinsfile
  - Verifying the Refactor
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab
    - Post Actions Summary

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Refactoring Jenkins

In this tutorial, we'll streamline a Jenkins Declarative Pipeline by moving multiple `post { always { … } }` blocks from individual stages into a single, pipeline-level `post` section. This approach enhances readability, reduces duplication, and makes future maintenance simpler.

## Why Consolidate `post { always }` Blocks?

When you have several stages that each publish reports or perform cleanup, repeating the same `post` block can clutter your Jenkinsfile. Instead, you can leverage the pipeline-level `post` block to handle all “always” actions in one place.

## Original Jenkinsfile with Repeated Post Sections

Below is a snippet of the existing pipeline. Notice the three stages that each contain their own `post { always { … } }` block:

```
stage('Unit Tests - JUnit and JaCoCo') {
    steps {
        sh 'mvn test'
    }
    post {
        always {
            junit 'target/surefire-reports/*.xml'
            jacoco execPattern: 'target/jacoco.exec'
        }
    }
}


stage('Mutation Tests - PIT') {
    steps {
        sh 'mvn org.pitest:pitest-maven:mutationCoverage'
    }
    post {
        always {
            pitmutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
        }
    }
}


stage('SonarQube') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'mvn sonar:sonar \
                -Dsonar.projectKey=numeric-application \
                -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000'
        }
    }
    timeout(time: 2, unit: 'MINUTES') {
        script {
            waitForQualityGate abortPipeline: true
        }
    }
}


stage('Vulnerability Scan - Docker') {
    steps {
        sh 'mvn dependency-check:check'
    }
    post {
        always {
            dependencyCheckPublisher pattern: 'target/dependency-check-report.xml'
        }
    }
}
```

We’re duplicating the same “always” publishing logic in three places. Let’s consolidate.

## Consolidating Post Actions

Jenkins Declarative Pipeline allows a `post` section at the root of the `pipeline` block. All specified actions run after every stage completes.

![The image shows a webpage from the Jenkins documentation, specifically focusing on "Pipeline Syntax." It includes a table of contents and sections on declarative pipelines.](https://kodekloud.com/kk-media/image/upload/v1752873656/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Refactoring-Jenkins/jenkins-pipeline-syntax-documentation.jpg)

For reference, check the official [Jenkins Pipeline Syntax documentation](https://www.jenkins.io/doc/book/pipeline/syntax/).

> [!important]
> **Note**
>
> A pipeline-level `post` block can contain `always`, `success`, `failure`, and `unstable` directives.

### Post Actions Summary

| Report Type                | Original Location                      | New Location                 |
| -------------------------- | -------------------------------------- | ---------------------------- |
| JUnit & JaCoCo             | Unit Tests stage `post.always`         | Pipeline-level `post.always` |
| PIT Mutation Reports       | Mutation Tests stage `post.always`     | Pipeline-level `post.always` |
| Dependency-Check Publisher | Vulnerability Scan stage `post.always` | Pipeline-level `post.always` |

## Refactored Jenkinsfile

1.  Remove all individual `post { always { … } }` sections.
2.  Add one `post` block under the `pipeline` root.
3.  Copy each `always` step into that block.

```
pipeline {
    agent any


    stages {
        stage('Unit Tests - JUnit and JaCoCo') {
            steps {
                sh 'mvn test'
            }
        }


        stage('Mutation Tests - PIT') {
            steps {
                sh 'mvn org.pitest:pitest-maven:mutationCoverage'
            }
        }


        stage('SonarQube - SAST') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar \
                        -Dsonar.projectKey=numeric-application \
                        -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000'
                }
                timeout(time: 2, unit: 'MINUTES') {
                    script {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }


        stage('Vulnerability Scan - Docker') {
            steps {
                sh 'mvn dependency-check:check'
            }
        }


        stage('Docker Build and Push') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
                    sh 'printenv'
                    sh 'docker build -t siddharth67/numeric-app:${GIT_COMMIT} .'
                    sh 'docker push siddharth67/numeric-app:${GIT_COMMIT}'
                }
            }
        }


        stage('Kubernetes Deployment - DEV') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'sed -i "s/#replace#siddharth67\\/numeric-app:${GIT_COMMIT}/g" k8s_deployment_service.yaml'
                    sh 'kubectl apply -f k8s_deployment_service.yaml'
                }
            }
        }
    }


    post {
        always {
            junit 'target/surefire-reports/*.xml'
            jacoco execPattern: 'target/jacoco.exec'
            pitmutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
            dependencyCheckPublisher pattern: 'target/dependency-check-report.xml'
        }
    }
}
```

## Verifying the Refactor

After updating your Jenkinsfile, commit and push to trigger a new build:

```
git add Jenkinsfile
git commit -m "Refactor: consolidate all post.always actions to pipeline level"
git push
```

In the Jenkins dashboard, you should see all post actions executed at the end of the pipeline:

![The image shows a Jenkins dashboard with a list of projects, their last success and failure times, and build durations. The sidebar includes options like "New Item," "Build History," and "Manage Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752873657/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Refactoring-Jenkins/jenkins-dashboard-projects-build-history.jpg)

![The image shows a Jenkins dashboard with build history in a stage view and graphs for code coverage and dependency-check trends. It includes details of various stages like checkout, build, tests, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752873658/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Refactoring-Jenkins/jenkins-dashboard-build-history-stage-view.jpg)

![The image shows a Jenkins pipeline dashboard with a stage view of various build processes, including test results and execution times, along with a graph displaying vulnerability trends.](https://kodekloud.com/kk-media/image/upload/v1752873660/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Refactoring-Jenkins/jenkins-pipeline-dashboard-build-processes.jpg)

## Next Steps

Jenkins pipelines can also leverage:

- **Environment directives** for global variables
- **Parallel stages** with `failFast` to optimize runtime
- **Embedded scripted logic** (`script { … }`) for loops, conditionals, and error handling

Here’s a brief example showcasing parallel execution and a `script` block:

```
pipeline {
    agent any


    stages {
        stage('Initial Stage') {
            steps {
                echo 'Executing first stage.'
            }
        }


        stage('Parallel Stage') {
            when { branch 'master' }
            failFast true
            parallel {
                stage('Branch A') {
                    agent { label 'for-branch-a' }
                    steps { echo 'Running on Branch A' }
                }
                stage('Branch B') {
                    agent { label 'for-branch-b' }
                    steps { echo 'Running on Branch B' }
                }
            }
        }


        stage('Browser Tests') {
            steps {
                script {
                    def browsers = ['chrome', 'firefox']
                    browsers.each { browser ->
                        echo "Testing in ${browser}"
                    }
                }
            }
        }
    }
}
```

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Declarative Pipeline](https://www.jenkins.io/doc/book/pipeline/development/#pipeline-structure)
- [Jenkins with Docker](https://www.jenkins.io/doc/tutorials/build-a-java-app-with-maven/#use-docker)
- [Kubernetes Plugin for Jenkins](https://plugins.jenkins.io/kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/22f13d2c-e534-48d9-814e-454861e62239)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/5c44e914-218a-43ce-a7ea-f8325fdc28ce)**
>
> Practice lab
