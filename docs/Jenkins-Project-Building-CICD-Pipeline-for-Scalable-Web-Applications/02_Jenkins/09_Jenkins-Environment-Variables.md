# Jenkins Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Jenkins-Environment-Variables)

---

## Table of Contents

- Jenkins Environment Variables
  - Types of Environment Variables in Jenkins
  - Configuring Environment Variables in a Jenkins Pipeline
  - Built-in Environment Variables in Jenkins
  - Watch Video
    - Scope of Environment Variables
    - Global Environment Variable Example
    - Stage-Specific Environment Variable Example

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Jenkins Environment Variables

In this lesson, we explore environment variables in Jenkins and their importance in modern application deployments. Environment variables are key-value pairs that configure the behavior of processes across different environments. They allow your application to dynamically adjust settings without modifying the source code, which is especially valuable when moving between development, staging, and production environments.

Imagine an application that connects to a database. During development, the application might connect to a development database; however, in production, it needs to communicate with a production database. Hardcoding the development database's IP address is not a viable solution because the connection details must change in production. Instead, storing these details as environment variables ensures that the correct settings are applied based on the deployment target. The operating system supplies the appropriate configuration, enabling seamless transitions between environments.

![The image illustrates the concept of environment variables, showing an application connected to a database, with a key-value pair icon, and labels for development and production databases.](https://kodekloud.com/kk-media/image/upload/v1752879904/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Jenkins-Environment-Variables/environment-variables-app-database-diagram.jpg)

By storing your database connection details as environment variables on the target machine, your application can retrieve dynamic values at runtime. For instance, when deploying to production, you update the environment variables on the production server, allowing your application to connect to the production database without modifying code.

Environment variables can store a wide range of information, including credentials, API keys, SSL certificates, secrets, SSH keys, and other critical configuration details. This approach not only adds flexibility but also enhances security by keeping sensitive data out of version-controlled source code.

![The image shows three icons labeled "Credentials," "Secrets," and "Keys" under the heading "Environment Variables."](https://kodekloud.com/kk-media/image/upload/v1752879905/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Jenkins-Environment-Variables/environment-variables-credentials-secrets-keys.jpg)

Using environment variables is crucial in Jenkins because the Jenkinsfile is stored in your Git repository. Hardcoding sensitive information could expose it to unauthorized access. By leveraging environment variables, you ensure that sensitive data remains secure and is managed separately from your code.

![The image shows icons representing "Key value pair" and "Jenkins" under the heading "Environment Variables."](https://kodekloud.com/kk-media/image/upload/v1752879906/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Jenkins-Environment-Variables/key-value-pair-jenkins-environment-variables.jpg)

## Types of Environment Variables in Jenkins

There are two main categories of environment variables in Jenkins:

1.  **System Environment Variables**: Set on the operating system where Jenkins is running. Examples include `PATH` and other system-specific settings that influence Jenkins operations.
2.  **Jenkins-Specific Environment Variables**: Defined within Jenkins and can be scoped globally, per job, or even to a particular stage within a pipeline.

### Scope of Environment Variables

When working with environment variables in Jenkins, they are available at different levels of visibility:

- **Global**: Accessible to all jobs and pipelines.
- **Job-Specific**: Available only within a particular job.
- **Pipeline Stage-Specific**: Limited to a specific stage within the pipeline, reducing variable exposure and enhancing security.

## Configuring Environment Variables in a Jenkins Pipeline

The following examples demonstrate how to configure environment variables in Jenkins pipelines.

### Global Environment Variable Example

The example below shows how to define an environment variable globally in a Jenkinsfile:

```
pipeline {
    agent any
    environment {
        MY_VAR = 'value'
    }
    stages {
        stage('Example') {
            steps {
                echo "The value of MY_VAR is ${MY_VAR}"
            }
        }
    }
}
```

In this example, `MY_VAR` is set at the pipeline level, making it available in all stages. Referencing `${MY_VAR}` will return the value `'value'`.

### Stage-Specific Environment Variable Example

You can also scope environment variables to a specific pipeline stage. Consider the following example:

```
pipeline {
    agent any
    stages {
        stage('Build') {
            environment {
                HOSTNAME = "my-host"
                PORT = "5432"
            }
            steps {
                echo "Hostname is ${env.HOSTNAME}"
                echo "Port is ${env.PORT}"
            }
        }
        stage('Test') {
            steps {
                // HOSTNAME and PORT are not available in this stage since they were defined only in the Build stage.
                echo "Testing stage: HOSTNAME and PORT are not defined here."
            }
        }
    }
}
```

In this pipeline, the `HOSTNAME` and `PORT` environment variables are only accessible within the Build stage, demonstrating how scoping minimizes potential security risks.

## Built-in Environment Variables in Jenkins

Jenkins provides several built-in environment variables that offer useful information about the build process. Some examples include:

- `BUILD_ID`
- `BUILD_NUMBER`
- `BUILD_TAG`
- `BUILD_URL`
- `EXECUTOR`
- `JAVA_HOME`
- `JENKINS_URL`
- `JOB_NAME`
- `NODE_NAME`
- `WORKSPACE`

These variables can be utilized in your pipeline scripts. For example:

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
    }
}
```

In this script, the build ID and Jenkins URL are printed during the build stage.

> [!important]
> **Best Practices**
>
> - Use the Jenkins Credentials Plugin to inject secrets into environment variables instead of hardcoding them.
> - Maintain consistent naming conventions across all projects to improve clarity and maintenance.
> - Document the usage and purpose of each environment variable within your Jenkins jobs and pipelines.

![The image outlines three best practices: keeping systems secure, maintaining consistency, and ensuring documentation. Each practice is represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752879907/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Jenkins-Environment-Variables/best-practices-security-consistency-documentation.jpg)

By leveraging environment variables effectively, you can create flexible, secure, and maintainable Jenkins pipelines that adapt seamlessly to different deployment environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/12c83378-e826-4ed4-9161-be0e29c4a4f9)**
>
> Watch video content
