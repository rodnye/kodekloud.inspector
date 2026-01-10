# Jenkins Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Jenkins-and-CICD/Jenkins-Question-1)

---

## Table of Contents

- Jenkins Question 1
  - Isolating Pipeline Steps with Docker Containers
  - How the Docker-Based Pipeline Works
  - Implementing This Setup in an Interview
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Jenkins and CICD

# Jenkins Question 1

Can we run a Jenkins agent inside a Docker container and execute our tests within that container?

Before diving into the technical details, take a moment to consider how you might answer this interview question. In this article, we thoroughly explain the concept and provide practical guidance on using Docker containers to isolate pipeline steps in Jenkins.

## Isolating Pipeline Steps with Docker Containers

Running Jenkins agents within Docker containers has become a best practice in modern CI/CD pipelines. This approach isolates environment dependencies for each build step, ensuring that every test runs in a clean, consistent environment.

Consider a scenario with one or two slave nodes connected to your Jenkins master. For example, if these nodes are configured to run tests for a Java project, they might have specific packages installed. Later, when you need to run tests for a Python project, additional packages must be installed on the same nodes. This can lead to a heavily customized and fragile environment, where losing a node might mean losing critical configurations.

> [!important]
> **Docker for Test Isolation**
>
> By leveraging Docker containers, you can spin up an isolated environment for each build or test stage on demand. After the tests are complete, the container is torn down, preserving the pristine state of your Jenkins agent.

Below is an example of a Jenkins Declarative Pipeline that uses a Docker container as the agent. In this configuration, a custom Node Alpine image is pulled from Docker Hub during pipeline execution. The test stage runs a command to print the Node version inside the container.

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent {
        docker { image 'node:16.13.1-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
```

## How the Docker-Based Pipeline Works

In the configuration above:

- The Docker image (`node:16.13.1-alpine`) is automatically pulled during pipeline execution.
- A new container is created specifically for the pipeline stage.
- The command `node --version` is executed within the container.
- There is no need for Node.js to be pre-installed on the Jenkins host, as the container provides the required environment.

This method reduces the necessity for extensive pre-configuration on Jenkins agents and allows for dynamic, on-demand provisioning of build environments.

## Implementing This Setup in an Interview

When discussing this approach during an interview, you could explain:

"In our Jenkins pipeline, we utilize Docker containers to run each stage in an isolated and consistent environment. This allows us to pull the necessary Docker image from Docker Hub or our own registry, ensuring that each stage has a clean setup. For instance, for a Node.js application, we use the `node:16.13.1-alpine` image, which encapsulates all dependencies required for testing. This strategy minimizes maintenance overhead on our Jenkins agents and simplifies scaling our CI/CD infrastructure."

The corresponding Jenkins pipeline configuration is illustrated below:

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent {
        docker { image 'node:16.13.1-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
```

## Conclusion

Using Docker containers as Jenkins agents is a robust solution for isolating pipeline steps and ensuring consistent build environments. This technique eliminates dependency on pre-configured Jenkins nodes, simplifies environment provisioning, and enhances the scalability of your CI/CD process.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/b318d56b-a3c3-4050-b49d-2bed3bec3898/lesson/0f7a434d-6ecb-4f9a-9ed7-4aeec9b6bbe5)**
>
> Watch video content
