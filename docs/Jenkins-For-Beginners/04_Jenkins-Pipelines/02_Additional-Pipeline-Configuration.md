# Additional Pipeline Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Additional-Pipeline-Configuration)

---

## Table of Contents

- Additional Pipeline Configuration
  - 1. Environment Variables
  - 2. Post Actions
  - 3. Scripted Steps
  - 4. Conditional Execution and Credentials
  - 5. Interactive Input and Parameters
  - 6. Stashing and Unstashing Artifacts
  - 7. Parallel Execution
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Additional Pipeline Configuration

Understanding the syntaxes and components of a Jenkinsfile is key to mastering your CI/CD pipelines. A Jenkinsfile is a text-based script written in a Groovy-like language that defines and automates various phases of your software delivery process. In this lesson, we cover declarative pipelines. (A later lesson will detail scripted pipelines.) The Jenkinsfile is typically divided into distinct stages, each corresponding to a phase within your CI/CD process. Common stages include:

- **Source Code Management:** Checking out code from version control systems (e.g., GitHub, Bitbucket, GIT).
- **Build:** Compiling, building, and packaging your application.
- **Test:** Running test cases (unit, integration, etc.) to ensure quality.
- **Deploy:** Pushing build artifacts to staging or production environments.

Below is an overview of essential syntaxes and components used in a Jenkinsfile.

---

The `pipeline` keyword denotes the start of your pipeline definition. Immediately following is the `agent` directive, which specifies the execution environment for your pipeline stages. Commonly, you can use `any` (which will run on any available Jenkins agent, including the controller) or specify a Docker container. For instance, using a Docker image guarantees that your build stage runs in an environment with the required tools.

Within the pipeline, stages structure the workflow. Each `stage` block contains one or more `steps` that execute individual commands. These steps may run shell commands or invoke Jenkins Pipeline DSL commands. For more intricate logic beyond the declarative syntax, use the `script` step to incorporate complex Groovy code.

Below is a comprehensive example to illustrate these concepts:

```
pipeline {
    agent any // Alternatively, you can use a Docker agent like: docker { image 'ubuntu:alpine' }
    stages {
        stage('Building') {
            agent { docker 'ubuntu:alpine' } // This stage runs within an Ubuntu Alpine Docker container
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Unit Testing') {
            steps {
                script {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        stage('Deployment') {
            when {
                expression { branch == 'main' }
            }
            steps {
                sh 'deploy.sh'
            }
        }
    }
}
```

In the example above, the pipeline is configured to run on any available Jenkins agent, while the "Building" stage specifically utilizes a Docker container. The build stage executes Maven commands inside the Ubuntu Alpine container, ensuring that all required build tools are available. The test stage leverages the JUnit plugin for unit testing, and the deploy stage only runs when the pipeline is executed on the main branch.

---

> [!important]
> **Key Concepts**
>
> - **Declarative Pipelines:** Provide a structured and straightforward syntax.
> - **Stages and Steps:** Define the execution flow of the pipeline.
> - **Scripted Steps:** Allow for complex Groovy code within the declarative pipeline.

The Jenkinsfile can also include additional directives to enhance pipeline management and execution:

## 1\. Environment Variables

The `environment` directive lets you define key-value pairs for environment variables globally or within a specific stage. For example:

```
pipeline {
    environment {
        VAR1 = 'foo'
        VAR2 = 'bar'
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo $VAR1' // Output: foo
            }
        }
        stage('Test') {
            environment { VAR1 = "test" }
            steps {
                sh 'echo $VAR1' // Output: test
            }
        }
    }
}
```

## 2\. Post Actions

The `post` directive specifies actions that run after the pipeline completes, whether it succeeds or fails. This feature is perfect for cleanup tasks or sending notifications.

```
pipeline {
    // ... pipeline stages and environment configuration
    post {
        success {
            script {
                // Send success notification
            }
        }
        failure {
            script {
                // Send failure notification
            }
        }
    }
}
```

A popular use case is integrating with plugins such as Slack Notifier:

```
pipeline {
    // ... pipeline stages
    post {
        always {
            slackNotifier(
                channel: '#your-slack-channel',
                message: "${currentBuild.result}"
            )
        }
    }
}
```

## 3\. Scripted Steps

The `script` block is used for incorporating Groovy code within a declarative pipeline. It provides the flexibility to loop through files or execute conditional logic:

```
stage('Process Files') {
    steps {
        script {
            def files = ['file1.txt', 'file2.txt']
            files.each { file ->
                sh "echo Processing ${file}"
            }
        }
    }
}
```

## 4\. Conditional Execution and Credentials

The `when` directive conditionally executes a stage based on factors such as branch name or build result:

```
pipeline {
    stages {
        stage('Deploy') {
            when {
                expression { branch == 'main' }
            }
            steps {
                sh 'deploy.sh'
            }
        }
    }
}
```

For handling secure credentials, use the `withCredentials` step:

```
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'myCredentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    echo "Username: ${USERNAME}"
                }
            }
        }
    }
}
```

## 5\. Interactive Input and Parameters

During execution, the pipeline can prompt users using the `input` directive:

```
input {
    message 'Are you sure you want to deploy?'
    ok 'Yes'
    cancel 'No'
}
```

You can also define parameters to provide dynamic configuration when triggering a build:

```
pipeline {
    parameters {
        string(name: 'ENV_NAME', defaultValue: 'dev', description: 'Environment to deploy to')
    }
    environment {
        ENV = params.ENV_NAME
    }
    // ... pipeline stages
}
```

## 6\. Stashing and Unstashing Artifacts

With the `stash` and `unstash` directives, you can temporarily store build artifacts or files between stages or nodes. This method is especially useful for caching build results:

```
stage('Build') {
    steps {
        // ... build steps
        stash name: 'build-artifacts'
    }
}


stage('Deploy') {
    steps {
        unstash name: 'build-artifacts'
        // ... deployment steps using stashed artifacts
    }
}
```

## 7\. Parallel Execution

To optimize pipeline run times, stages can be executed concurrently using the `parallel` directive. Ensure that parallel stages are independent to avoid interfering with shared outputs:

```
pipeline {
    parallel {
        stage('Unit Testing') {
            steps {
                // ... unit test steps
            }
        }
        stage('Vulnerability Testing') {
            steps {
                // ... vulnerability test steps
            }
        }
    }
    // ... subsequent stages (optional)
}
```

> [!important]
> **Next Steps**
>
> This lesson covered the primary components and directives of a Jenkinsfile. Explore these features in your projects and look forward to upcoming lessons that delve into more advanced Jenkins configurations.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/c93ac078-4d03-4191-bb8f-7deae5a5e163)**
>
> Watch video content
