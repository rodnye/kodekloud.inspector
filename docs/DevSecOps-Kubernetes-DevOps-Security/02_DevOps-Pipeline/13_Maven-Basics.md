# Maven Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Maven-Basics)

---

## Table of Contents

- Maven Basics
  - What Is Maven?
  - Standard Project Structure
  - Core Lifecycle Phases
  - Running Tests
  - Packaging Artifacts
  - Integrating Maven with Jenkins
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Maven Basics

In this guide, you’ll learn what Apache Maven is, why it’s essential for Java project automation, and how to leverage its lifecycle and directory conventions to streamline your build, test, and deployment processes.

## What Is Maven?

Apache Maven is a powerful build automation and project management tool based on the Project Object Model (POM). By defining dependencies and build settings in a `pom.xml` file, Maven handles:

- Downloading and managing third-party libraries
- Compiling Java source code
- Running unit tests
- Packaging artifacts (JAR, WAR)
- Deploying to local or remote repositories

> [!important]
> **Note**
>
> Your `pom.xml` sits at the root of your project. It controls everything from dependency versions to plugin executions.

## Standard Project Structure

Maven enforces a conventional directory layout to keep builds predictable:

```
my-app
├── src
│   ├── main
│   │   ├── java            # Application source code
│   │   └── resources       # Configuration files & properties
│   └── test
│       ├── java            # Unit test source code
│       └── resources       # Test-specific resources
└── target                  # Compiled classes & packaged artifacts
```

## Core Lifecycle Phases

Maven executes build steps in a predefined sequence of lifecycle phases. Common phases you’ll use daily:

| Phase    | Description                                         | Outcome                                      |
| -------- | --------------------------------------------------- | -------------------------------------------- |
| validate | Ensure project is correct and all info is available | Checks `pom.xml` validity                    |
| compile  | Compile application source code                     | Generates `.class` files in `target/classes` |
| test     | Run unit tests                                      | Executes tests in `src/test/java`            |
| package  | Bundle compiled code into a JAR/WAR                 | Produces artifact in `target/`               |
| install  | Install package to local repository                 | Installs to `~/.m2/repository`               |
| deploy   | Copy final artifacts to remote repositories         | Publishes for sharing across teams           |

![The image provides an overview of Maven basics, explaining its role in automating Java projects and detailing phases like validate, compile, test, package, install, and deploy. It also lists default directory paths for source code, resources, tests, and compiled outputs.](https://kodekloud.com/kk-media/image/upload/v1752873602/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Maven-Basics/maven-basics-java-projects-overview.jpg)

## Running Tests

To compile your code and run all unit tests:

```
mvn test
```

This executes the **test** phase, compiling classes and running tests under `src/test/java`.

## Packaging Artifacts

When you’re ready to create your deployable artifact:

```
mvn package
```

Maven runs up to the **package** phase, producing a JAR or WAR (depending on your packaging setting) in the `target` directory.

> [!important]
> **Warning**
>
> Ensure your `pom.xml` `<packaging>` element matches your intended artifact type (`jar`, `war`, etc.) to avoid build failures.

## Integrating Maven with Jenkins

Automate your CI/CD pipeline by invoking Maven goals in a Jenkinsfile:

```
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean compile'
      }
    }
    stage('Test') {
      steps {
        sh 'mvn test'
      }
    }
    stage('Package') {
      steps {
        sh 'mvn package'
      }
    }
  }
  post {
    always {
      junit 'target/surefire-reports/*.xml'
    }
  }
}
```

This pipeline runs through the compile, test, and package phases and archives test results automatically.

## Links and References

- [Apache Maven Official Documentation](https://maven.apache.org/)
- [Introduction to the POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html)
- [Maven Lifecycle Reference](https://maven.apache.org/ref/3.8.4/maven-core/lifecycles.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/ac0830d8-ecb5-44ec-9436-18ee0afc5ea9)**
>
> Watch video content
