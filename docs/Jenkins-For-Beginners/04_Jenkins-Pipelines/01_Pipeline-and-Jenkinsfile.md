# Pipeline and Jenkinsfile - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Pipeline-and-Jenkinsfile)

---

## Table of Contents

- Pipeline and Jenkinsfile
  - Overview
  - Example Jenkinsfile
  - Declarative vs. Scripted Pipelines
  - Comparing Pipeline Projects and Freestyle Projects
  - Benefits of Using Jenkins Pipelines
  - Conclusion
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Pipeline and Jenkinsfile

In this guide, we explore the Jenkins Pipeline project and the Jenkinsfile—a script that automates sophisticated Continuous Integration (CI) and Continuous Deployment (CD) workflows. By using pipelines, you can design a detailed recipe for building and deploying your software, taking full control over every stage of the process.

## Overview

Jenkins Pipelines simplify your build process by breaking it down into logical stages such as Building, Unit Testing, Linting, Dockerizing, Security, Deployment, and Tests. Each stage groups related tasks together. For example, the "Dockerizing" stage may involve building a Docker image and pushing it to a container registry, while parallel execution of stages like linting and unit testing can reduce overall build time.

![The image shows a Jenkins Pipeline with stages: Building, Unit Testing, Linting, Dockerizing, Security, Deployment, and Tests. Each stage is represented by an icon and label.](https://kodekloud.com/kk-media/image/upload/v1752879513/notes-assets/images/Jenkins-For-Beginners-Pipeline-and-Jenkinsfile/jenkins-pipeline-stages-diagram.jpg)

Pipelines are defined using a Jenkinsfile, which is typically written in a Groovy-like domain-specific language. This script-based approach replaces traditional point-and-click configurations with a code-centric solution that supports complex logic and automation.

## Example Jenkinsfile

Below is an example Jenkinsfile that outlines four primary stages: Build, Unit Test, Dockerize, and Deploy.

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn build'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Dockerize') {
            steps {
                sh 'docker build -t imageName:version .'
                sh 'docker push imageName:version'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
            }
        }
    }
}
```

> [!important]
> **Note**
>
> This Jenkinsfile demonstrates a clear separation of concerns by organizing tasks into distinct stages, improving both readability and maintainability.

## Declarative vs. Scripted Pipelines

Jenkins offers two primary types of pipelines:

- **Declarative Pipeline:** Uses a simplified and human-readable syntax that is easy to learn—ideal for straightforward and well-defined workflows.
- **Scripted Pipeline:** Allows for full Groovy scripting, providing greater control and flexibility for complex logic, although it has a steeper learning curve.

To illustrate these differences, consider the following diagram:

![The image compares two types of pipeline projects: Scripted Pipeline, which is code-centric, flexible, and has a learning curve; and Declarative Pipeline, which is human-readable, easier to learn, and has limited complexity.](https://kodekloud.com/kk-media/image/upload/v1752879514/notes-assets/images/Jenkins-For-Beginners-Pipeline-and-Jenkinsfile/pipeline-projects-scripted-declarative.jpg)

The choice between these pipeline styles depends largely on your project requirements and familiarity with Groovy scripting.

## Comparing Pipeline Projects and Freestyle Projects

Earlier, Jenkins Freestyle Projects were the standard method for configuring build processes. However, they come with limitations such as rigid sequential steps and a dependence on a web-based configuration. In contrast, Pipeline projects provide a range of benefits:

| Benefit        | Pipeline Projects                                        | Freestyle Projects                     |
| -------------- | -------------------------------------------------------- | -------------------------------------- |
| Execution Flow | Logical stages with parallel task execution              | Rigid sequential processing            |
| Configuration  | Defined via code in the Jenkinsfile (version-controlled) | Configured through the web interface   |
| Resilience     | Can survive unexpected controller restarts               | Less resilient in dynamic environments |
| Flexibility    | Supports pausing for manual intervention/approvals       | Limited in handling complex workflows  |

![The image is a comparison chart between "Pipeline" and "Freestyle" approaches, highlighting differences in structure, configuration, and complexity. Pipelines allow parallel task execution and are ideal for complex workflows, while Freestyle follows a sequential order and is suitable for basic automation tasks.](https://kodekloud.com/kk-media/image/upload/v1752879515/notes-assets/images/Jenkins-For-Beginners-Pipeline-and-Jenkinsfile/pipeline-vs-freestyle-chart.jpg)

> [!important]
> **Tip**
>
> Storing the pipeline configuration in the Jenkinsfile alongside your project code not only promotes version control but also facilitates collaborative editing and transparent build management.

## Benefits of Using Jenkins Pipelines

Jenkins pipelines enable a more streamlined CI/CD process with key advantages such as:

- Code-as-configuration for easy version control and sharing.
- Resilience with features like pause and resume.
- Efficient handling of complex build processes with minimal job maintenance.
- Seamless integration with numerous Jenkins plugins that extend pipeline capabilities.

![The image lists the benefits of pipelines, including code as configuration, resilience by design, human interaction integration, handling complexity with ease, extensibility beyond limits, and streamlined build management.](https://kodekloud.com/kk-media/image/upload/v1752879516/notes-assets/images/Jenkins-For-Beginners-Pipeline-and-Jenkinsfile/benefits-of-pipelines-list.jpg)

## Conclusion

Jenkins pipelines transform how you manage CI/CD workflows by offering a flexible, resilient, and efficient approach to automation. Whether you choose a declarative or scripted pipeline, this method of configuration vastly improves the maintenance and scalability of your build processes.

Thank you for reading this guide on Jenkins Pipelines and the Jenkinsfile. We hope it provides a solid introduction to help you optimize your CI/CD strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/13b11d65-9ce8-40bf-ae13-1f7f836e6e7b)**
>
> Watch video content
