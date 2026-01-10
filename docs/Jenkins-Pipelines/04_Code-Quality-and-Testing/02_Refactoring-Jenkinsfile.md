# Refactoring Jenkinsfile - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Code-Quality-and-Testing/Refactoring-Jenkinsfile)

---

## Table of Contents

- Refactoring Jenkinsfile
  - Console Output Examples
  - Summary
  - Watch Video

---

## Content

Jenkins Pipelines

Code Quality and Testing

# Refactoring Jenkinsfile

In this article, we refactor our Jenkinsfile to simplify credential management and improve the overall pipeline structure. Previously, multiple stages such as Unit Testing and Code Coverage used separate steps for handling MongoDB credentials. Now, we’ll centralize these credentials by defining them as environment variables.

Below is an excerpt from the original Jenkinsfile where both the Unit Testing and Code Coverage stages used an identical withCredentials block:

```
environment {
    MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
}


stages {
    stage('Installing Dependencies') {
        // Installation steps go here...
    }

    stage('Dependency Scanning') {
        // Dependency scanning steps...
    }

    stage('Unit Testing') {
        options { retry(2) }
        steps {
            withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
                sh 'npm test'
            }
            junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
        }
    }
}
```

```
root@jenkins-controller-1 in solar-system on ✗ feature/enabling-cicd via ⬢ v20.16.0
```

The credentials stored in Jenkins are used to connect to MongoDB. To reduce duplication, we can define these credentials directly in the environment block. For example:

```
environment {
    BITBUCKET_COMMON_CREDS = credentials('jenkins.bitbucket-common-creds')
}
```

When using the Bitbucket credentials via the BITBUCKET_COMMON_CREDS variable, you receive a string in the format `username:password`. If you require them separately, they are automatically exposed as the variables BITBUCKET_COMMON_CREDS_USR and BITBUCKET_COMMON_CREDS_PSW.

Let’s update our Jenkinsfile by removing repeated withCredentials steps and introducing a new environment variable:

```
environment {
    MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_Creds = credentials('mongo-db-credentials')
}
options {
    // Global options...
}
stages {
    stage('Installing Dependencies') {
        // Installation steps...
    }
    stage('Dependency Scanning') {
        // Scanning steps...
    }
    stage('Unit Testing') {
        options { retry(2) }
        steps {
            sh 'echo $MONGO_DB_Creds'
            sh 'echo $MONGO_DB_Creds_USR'
            sh 'echo $MONGO_DB_Creds_PSW'
            sh 'npm test'
        }
        junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
    }
}
```

A new build triggered after committing these changes will show the echoed environment variables. Note that the colon-separated variable masks sensitive data, while the username appears in clear text, and the password remains masked.

> [!important]
> **Tip**
>
> If your NPM tests require variables named MONGO_USERNAME and MONGO_PASSWORD, create two separate Secret Text credentials in Jenkins—one for the username and one for the password. Then update the environment block as shown below.

```
environment {
    MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_Creds = credentials('mongo-db-credentials')
    MONGO_USERNAME = credentials('mongo-db-username')
    MONGO_PASSWORD = credentials('mongo-db-password')
}
options {
    // Global options...
}
stages {
    stage('Installing Dependencies') {
        // Installation steps...
    }
    stage('Dependency Scanning') {
        // Scanning steps...
    }
    stage('Unit Testing') {
        options { retry(2) }
        steps {
            sh 'echo Colon-Separated - $MONGO_DB_Creds'
            sh 'echo Username - $MONGO_DB_Creds_USR'
            sh 'echo Password - $MONGO_DB_Creds_PSW'
            sh 'npm test'
        }
        junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
    }
}
```

Once these changes are committed and pushed, a new pipeline build will leverage the newly defined environment variables. During pipeline execution, Jenkins fetches credentials from its store, applying them across both unit testing and code coverage stages.

For additional report management, consider grouping tasks such as publishing HTML reports and archiving JUnit results within a post-build section. Instead of embedding these steps within individual stages, a post block can be utilized to run them under specified conditions (e.g., always, on success, or on failure).

Below is an example demonstrating how to define a post section in the Jenkinsfile:

```
pipeline {
    agent any


    tools {
        // Define tool installations if needed.
    }


    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
        MONGO_DB_Creds = credentials('mongo-db-credentials')
        MONGO_USERNAME = credentials('mongo-db-username')
        MONGO_PASSWORD = credentials('mongo-db-password')
    }


    options {
        // Global options...
    }


    stages {
        stage('Installing Dependencies') {
            steps {
                // Dependency installation steps...
            }
        }
        stage('Dependency Scanning') {
            parallel {
                stage('NPM Dependency Audit') {
                    steps {
                        // NPM audit steps...
                    }
                }
                stage('OWASP Dependency Check') {
                    steps {
                        dependencyCheck additionalArguments: '''
                            --scan './'
                            --out './'
                            --format 'ALL'
                            --prettyPrint
                            ''', odcInstallation: 'OWASP-DepCheck-10'

                        dependencyCheckPublisher failedTotalCritical: 1, pattern: 'dependency-check-report.xml'
                        junit allowEmptyResults: true, stdoutRetention: '', testResults: 'dependency-check-junit.xml'
                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '.'])
                    }
                }
            }
        }
        stage('Unit Testing') {
            options { retry(2) }
            steps {
                sh 'echo Colon-Separated - $MONGO_DB_Creds'
                sh 'echo Username - $MONGO_DB_Creds_USR'
                sh 'echo Password - $MONGO_DB_Creds_PSW'
                sh 'npm test'
            }
            junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
        }
        stage('Code Coverage') {
            steps {
                catchError(buildResult: 'SUCCESS', message: 'Oops! It will be fixed in future releases', stageResult: 'UNSTABLE') {
                    sh 'npm run coverage'
                }
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report'])
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
            junit allowEmptyResults: true, stdoutRetention: '', testResults: 'dependency-check-junit.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report'])
        }
    }
}
```

```
root@jenkins-controller-1 in solar-system on feature/enabling-cicd via v20.16.0
```

Notice how moving the JUnit report archiving and HTML report publishing into the post-always block ensures that these actions run after all stages regardless of the build outcome. In Jenkins’ classic UI, these post actions are executed at the end of the pipeline, confirming consistent handling of build reports.

## Console Output Examples

Below are sample console outputs demonstrating the execution of unit testing and code coverage commands:

```
echo Colon-Separated -$MONGO_DB_Creds  # Shell Script
echo Username -$MONGO_DB_Creds_USR       # Shell Script
echo Password -$MONGO_DB_Creds_PSW       # Shell Script
npm test                               # Shell Script


+ npm test
> Solar System@6.7.6 test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


Server successfully running on port - 3000
(node:99695) [DEP01270] DeprecationWarning: The URL mongodb://supercluster-shard-00-02.d83jj.mongodb.net:27017,supercluster-shard-00-00.d83jj.mongodb.net:27017,supercluster-shard-00-01.d83jj.mongodb.net:27017/superData?authSource=admin&ReplicaSet=atlas-l1bv0t-shard-0&ssl=true is invalid. Future versions of Node.js will throw an error.
(Use node --trace-deprecation ... to show where the warning was created)
```

The console output and Jenkins UI confirm that the post actions, such as archiving JUnit reports and publishing HTML reports, are successfully executed at the end of every pipeline run.

## Summary

There are two primary approaches for managing credentials in a Jenkinsfile:

1.  **Combined Credential Variable:** Define a single environment variable that contains both the username and password.
2.  **Separate Credential Variables:** Create distinct environment variables for the username and password when your tools require specific naming conventions.

By choosing the approach that best fits your requirements, you can reduce duplication across stages and centralize both credential management and reporting in your Jenkins pipeline.

For more detailed guidance, please refer to the [Jenkins documentation](https://www.jenkins.io/doc/).

![The image shows a webpage from the Jenkins documentation, specifically focusing on using a Jenkinsfile with credential environment variables. The page includes code snippets and explanations about handling credentials securely in a Jenkins pipeline.](https://kodekloud.com/kk-media/image/upload/v1752879602/notes-assets/images/Jenkins-Pipelines-Refactoring-Jenkinsfile/jenkinsfile-credentials-environment-variables.jpg)

![The image shows a Jenkins pipeline interface for a project named "solar-system" under "Gitea-Organization," displaying the stages of a build process with some stages marked as successful and others with warnings or errors.](https://kodekloud.com/kk-media/image/upload/v1752879602/notes-assets/images/Jenkins-Pipelines-Refactoring-Jenkinsfile/jenkins-pipeline-solar-system-gitea.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/bcd4711c-8a69-4218-a65c-113fd7a7a88d/lesson/0e42399c-5219-423c-b941-32896430e61f)**
>
> Watch video content
