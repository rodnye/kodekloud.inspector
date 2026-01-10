# Build Docker Image - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Containerization-and-Deployment/Build-Docker-Image)

---

## Table of Contents

- Build Docker Image
  - Jenkinsfile Stage for Building the Docker Image
  - Dockerfile for Building the Image
  - The .dockerignore File
  - Build Output
  - Watch Video

---

## Content

Jenkins Pipelines

Containerization and Deployment

# Build Docker Image

In this lesson, we demonstrate how to build a Docker image within a Jenkins pipeline. After the [SonarQube](https://www.sonarqube.org/) stage, the pipeline includes a stage to build the Docker image using the Docker CLI. The image is tagged with your [Docker Hub](https://hub.docker.com) username (siddharth67), the image name (solar-system), and the Git commit hash obtained from the environment variable GIT_COMMIT.

> [!important]
> **Important**
>
> Ensure that your pipeline has executed a checkout stage before this build step so that the necessary environment variables, including the Git commit hash, are available.

## Jenkinsfile Stage for Building the Docker Image

Below is the Groovy snippet for the Docker image build stage. It uses the `docker build` command to tag the image with the specified username, image name, and Git commit:

```
stage('Build Docker Image') {
    steps {
        sh 'docker build -t siddharth67/solar-system:$GIT_COMMIT .'
    }
}
```

The complete pipeline structure, with the new stage added, is shown below:

```
stages {
    stage('Installing Dependencies') {
        // Steps to install dependencies
    }
    stage('Dependency Scanning') {
        // Steps for dependency scanning
    }
    stage('Unit Testing') {
        // Steps for running unit tests
    }
    stage('Code Coverage') {
        // Steps for code coverage analysis
    }
    stage('SAST - SonarQube') {
        // Steps for static analysis with SonarQube
    }
    stage('Build Docker Image') {
        steps {
            sh 'printenv'
            sh 'docker build -t siddharth67/solar-system:$GIT_COMMIT .'
        }
    }
}


post {
    always {
        // Post-build actions
    }
}
```

In this updated pipeline, the `printenv` command is invoked to display all environment variables available in the pipeline. These variables include custom ones defined in the Jenkinsfile and built-in variables such as the Git commit hash, build ID, job URL, branch name, among others. This output is useful for debugging and ensuring that the correct values are being used.

## Dockerfile for Building the Image

Next, review the Dockerfile that is used to build the Docker image. This file performs the following actions:

- Uses a Node 18 Alpine base image.
- Sets the working directory to `/usr/app`.
- Copies package files and installs dependencies.
- Copies the remaining source code.
- Sets placeholder environment variables for MongoDB.
- Exposes port 3000.
- Starts the application using `npm start`.

```
FROM node:18-alpine3.17
WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install
COPY . .
ENV MONGO_URI=uriPlaceholder
ENV MONGO_USERNAME=usernamePlaceholder
ENV MONGO_PASSWORD=passwordPlaceholder
EXPOSE 3000
CMD [ "npm", "start" ]
```

> [!important]
> **Tip**
>
> Use a `.dockerignore` file to exclude unnecessary files and directories from the Docker build context, improving build performance.

## The .dockerignore File

The `.dockerignore` file functions similarly to a `.gitignore` file and prevents certain files from being copied to the Docker image during the build. Below is an example of its contents:

```
npm-debug.log
.git
.cache
# ignore all markdown files (md) besides all README*.md except README-secret.md
.md
README.md
README-secret.md
# GitHub related files
.github/
# Node-related files
node_modules
solar-system.png
.nyc_output
.talismanrc
coverage
test-results.xml
# Reports
zap*
dependency*
jenkins*
trivy-image*
```

This file helps speed up the build process by ensuring only necessary files are sent to the Docker build context.

## Build Output

After saving and committing these changes, a new pipeline job is triggered. The build output will display the `printenv` command output along with the `docker build` command that uses the Git commit hash to build the image. Below is an example snippet from the build output:

```
docker build -t siddharth67/solar-system:$GIT_COMMIT .
```

The environment variables printed include key information such as job URL, build number, and workspace paths. The Git commit hash used in the Docker tag should correspond to the most recent commit in your repository.

For instance, a [GitHub](https://github.com) log may display:

```
* docker build -t siddharth67/solar-system:9dc4ba421562f14b04dec2141938fd02a5ac0ad1 .
#0 building with "default" instance using docker driver
#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 282B done
#2 [internal] load metadata for docker.io/library/node:18-alpine3.17
#2 DONE 1.8s
#3 [internal] load .dockerignore
#3 transferring context: 754B done
#4 [5/5] FROM docker.io/library/node:18-alpine3.17@sha256:6293c86a33900ed145ae71957411b2c2e37e839a5632beff8292a579102cdf2
#5 [internal] load build context
#5 transferring context: 169.77kB 0.0s
# DONE 0.1s
#6 [3/5] COPY package*.json /usr/app/
#7 [2/5] WORKDIR /usr/app
#8 CACHED
#9 [4/5] RUN npm install
#10 CACHED
#11 [5/5] COPY . .
```

An extended build output example that shows image export details is provided below:

```
docker build -t siddharth67/solar-system:$GIT_COMMIT - < Dockerfile
#1 transferring dockerfile: 282B done
#2 [internal] load metadata for docker.io/library/node:18-alpine3.17
#2 DONE 1.8s
#3 [internal] load .dockerignore
#3 DONE 0.0s
#4 [1/5] FROM docker.io/library/node:18-alpine3.17@sha256:6293c8a63890ed145ae719574112bc2e3e7389a56328f8d292a579102dcf2
#4 DONE 0.0s
#5 [internal] load build context
#5 transferring context: 169.77kB 0.1s done
#5 DONE 0.1s
#6 [3/5] COPY package*.json /usr/app/
#6  CACHED
#7 [2/5] WORKDIR /usr/app
#7  CACHED
#8 [4/5] RUN npm install
#8  CACHED
#9 [5/5] COPY . .
#9 DONE 0.1s
#10 exporting to image
#10 exporting layers 0.0s done
#10 writing image sha256:378b62314367eb1bb48ef99115cfa621af16b0445453964cf743af57b42cf done
#10 naming to docker.io/siddharth67/solar-system:94bcab44b21562f410bdec214193f8fd2a5ac0bad1 done
#10 DONE 0.0s
```

After a successful build, the image is ready to be pushed to Docker Hub. In the upcoming session, we will cover vulnerability scanning on the Docker image followed by pushing the image to Docker Hub.

![The image shows a webpage displaying a list of global variables and their descriptions for a Jenkins pipeline syntax.](https://kodekloud.com/kk-media/image/upload/v1752879627/notes-assets/images/Jenkins-Pipelines-Build-Docker-Image/jenkins-pipeline-global-variables-list.jpg)

For a comprehensive overview of global environment variables available in Jenkins pipelines—including details such as the job display URL, build number, tag name, and branch name—refer to the [Official Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/).

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/a1289a46-be38-4446-a056-0b9730d05dfd/lesson/4573256a-b229-4448-b0ea-46d886177a1a)**
>
> Watch video content
