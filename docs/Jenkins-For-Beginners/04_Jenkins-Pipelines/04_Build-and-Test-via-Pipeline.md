# Build and Test via Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Build-and-Test-via-Pipeline)

---

## Table of Contents

- Build and Test via Pipeline
  - Overview
  - Build Stage Example
  - Complete Pipeline Script with Multiple Stages
  - Using a Self-Hosted Git Service
  - Maven Commands Used in the Pipeline
  - Git Server Running as a Docker Container
  - Application Source Code
  - Unit Test Cases
  - Pipeline Syntax and Git Branch Update
  - Summary and Next Steps
  - Watch Video
    - Hello Controller

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Build and Test via Pipeline

In this lesson, we enhance our Jenkins Pipeline by adding multiple stages to build and test a Java application. The sections below explain the updates and modifications, preserving the original content structure and technical diagrams.

---

## Overview

Previously, we configured the Maven tool and printed the Maven version. In that example, the Pipeline featured only an "Echo Version" stage while the build stage was commented out. Refer to the following Jenkins dashboard snapshot:

![The image shows a Jenkins dashboard displaying the status of a "hello-world-pipeline" with stages like "Tool Install" and "Echo Version" marked as completed. The interface includes options for configuring and managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752879479/notes-assets/images/Jenkins-For-Beginners-Build-and-Test-via-Pipeline/jenkins-dashboard-hello-world-pipeline.jpg)

In this updated Pipeline, we add two new stages:

- **Build**: Retrieve the code from a Git repository and build the application using Maven.
- **Unit Test**: Execute unit tests for verification.

---

## Build Stage Example

In the build stage, the code is first fetched from a Git repository, and then Maven is used to build the application. Commands differ based on the operating system: on a Unix agent, we use `sh`, while `bat` is utilized for Windows agents.

```
stage('Build') {
    steps {
        // Get some code from a GitHub repository
        git 'https://github.com/igluok/simple-maven-project-with-tests.git'
        // Run Maven on a Unix agent.
        sh 'mvn -Dmaven.test.failure.ignore=true clean package'
        // To run Maven on a Windows agent, use:
        // bat 'mvn -Dmaven.test.failure.ignore=true clean package'
    }
    post {
        // Record the test results and archive the jar if Maven runs the tests,
        // even if some tests fail.
        success {
            junit '**/target/surefire-reports/TEST-*.xml'
            archiveArtifacts 'target/*.jar'
        }
    }
}
```

Here, Maven’s `clean package` command is used with the option to ignore test failures during packaging. Post-build actions then archive the test results and packaged JAR file.

---

## Complete Pipeline Script with Multiple Stages

The complete Pipeline script now includes:

- **Echo Version**: Prints Maven version details.
- **Build**: Fetches the source code from the Git repository and builds the application.
- **Unit Test**: Runs unit tests in a separate stage.

```
pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M398" and add it to the path.
        maven "M398"
    }

    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                // Get some code from a Gitea repository specifying the main branch
                git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
                // Run Maven Package command and skip tests
                sh 'mvn clean package -DskipTests=true'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

> [!important]
> **Note**
>
> The Git plugin is used to fetch source code from a self-hosted Git service, which, despite a URL similar to GitHub, is actually served by Gitea.

---

## Using a Self-Hosted Git Service

In this lesson, we use Gitea as our self-hosted Git service. Below is a screenshot showcasing the Dasher Technologies Git service interface:

![The image is a webpage for "Dasher Technologies," promoting a self-hosted Git service with the tagline "Git with a cup of tea." It highlights features like easy installation and cross-platform compatibility.](https://kodekloud.com/kk-media/image/upload/v1752879480/notes-assets/images/Jenkins-For-Beginners-Build-and-Test-via-Pipeline/dasher-technologies-git-service.jpg)

After signing in with the credentials (username: gitty-admin), navigate to the Dasher Team organization and open the "Jenkins Hello World" repository. This repository contains a Spring Boot-based Java application designed for Jenkins training. For an overview of the repository, view the screenshot below:

![The image shows a GitHub repository page for "jenkins-hello-world" with a list of files and recent commits. The README section describes a Springboot Hello World App used for Jenkins training.](https://kodekloud.com/kk-media/image/upload/v1752879482/notes-assets/images/Jenkins-For-Beginners-Build-and-Test-via-Pipeline/github-repo-jenkins-hello-world.jpg)

Since this project is built with Maven, we utilize Maven commands to generate the application JAR file and execute tests.

---

## Maven Commands Used in the Pipeline

```
mvn clean package -DskipTests=true
mvn test
java -jar target/hello-demo-*.jar
curl -s http://localhost:6767/hello
```

- The first command builds the application while skipping tests.
- The second command executes the unit tests.
- The third command deploys the application using the generated JAR file.
- Finally, the `curl` command tests the running application by accessing the `/hello` endpoint on port 6767, which returns a 200 OK response.

---

## Git Server Running as a Docker Container

Our Git server operates as a Docker container on a virtual machine. The container’s internal port 3000 is mapped to port 5555 on the host. You can verify the container status with:

```
docker ps
```

Sample output:

```
CONTAINER ID   IMAGE                COMMAND                  NAMES    CREATED        STATUS         PORTS
5133f2f22ae7   gitea/gitea:latest   "/usr/bin/entrypoint…"   gitea    22 hours ago   Up 22 hours   0.0.0.0:5555->3000/tcp, :::5555->3000/tcp
```

---

## Application Source Code

### Hello Controller

The main application includes a simple REST controller that responds to a GET request on `/hello`:

```
package com.kodeloud.hello_demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    String hello() {
        return "Hello, KodeKloud community!";
    }
}
```

The application runs on port 6767, as configured in the properties file:

```
spring.application.name=hello-demo
server.port=6767
```

---

## Unit Test Cases

The repository contains several JUnit test cases for the Hello Controller. One test was initially configured to expect an incorrect greeting, causing a failure:

```
@Test
public void welcome_startsWithExpectedGreeting() throws Exception {
    mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))
       .andExpect(status().isOk())
       .andExpect(content().string(startsWith("Hla")));
}
```

Since the actual response starts with "Hello", the test was updated accordingly:

```
@Test
public void welcome_startsWithExpectedGreeting() throws Exception {
    mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))
       .andExpect(status().isOk())
       .andExpect(content().string(startsWith("Hello")));
}
```

Additional test cases ensure that:

- The response is not null.
- The response string is not empty.
- The response has the expected length.
- The response ends with the expected text.

After updating the test, the Pipeline executed all six test cases successfully.

---

## Pipeline Syntax and Git Branch Update

An error occurred during Pipeline execution because Jenkins attempted to clone the repository’s master branch, while our repository uses the main branch. The Git checkout has been updated to specify the main branch:

```
git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
```

The updated Pipeline script now looks like this:

```
pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M398" and add it to the path.
        maven "M398"
    }

    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                // Get some code from a Gitea repository specifying the main branch
                git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
                // Run Maven Package command and skip tests
                sh 'mvn clean package -DskipTests=true'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

After redeploying, the build stage completed successfully (after downloading dependencies), and all unit tests passed.

---

## Summary and Next Steps

Using this Pipeline, we built the application and executed unit tests in separate stages. In the next session, we will:

- Transition the Pipeline script from the Jenkins UI to a Git repository for version control and collaboration.
- Explore further enhancements by implementing an end-to-end Pipeline with a Node.js application.

Refer to the following Jenkins dashboard snapshot to see an overview of the successful Pipeline execution:

![The image shows a Jenkins dashboard displaying the status of a "hello-world-pipeline" with multiple stages, including "Tool Install," "Echo Version," "Build," and "Unit Test." Some stages are marked as successful with green checkmarks, while others have failed with red crosses.](https://kodekloud.com/kk-media/image/upload/v1752879483/notes-assets/images/Jenkins-For-Beginners-Build-and-Test-via-Pipeline/jenkins-dashboard-hello-world-pipeline-3.jpg)

Thank you for following along with this lesson.

> [!important]
> **Next Steps**
>
> Stay tuned for our upcoming session, where we will integrate version control practices and demonstrate how to implement a Node.js application using a similarly structured Pipeline.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/edcdd1e5-6d7e-494d-a352-825794e77a70)**
>
> Watch video content
