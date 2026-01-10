# Configuring Advanced Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Advanced-Pipelines/Configuring-Advanced-Pipeline)

---

## Table of Contents

- Configuring Advanced Pipeline
  - Traditional vs. Advanced Workflow
  - Release Pipeline Process
  - Semantic Versioning and Conventional Commits
  - Code Quality Pipeline
  - Release Pipeline Detailed Workflow
  - Watch Video
    - Checking for an Existing Git Tag
    - Installing Dependencies
    - Creating a New Release
    - Build and Deploy Phase

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Advanced Pipelines

# Configuring Advanced Pipeline

This article explores the advanced principles behind our Jenkins pipeline, highlighting improvements and adjustments implemented for this project. We begin by reviewing the traditional pipeline trigger methods and then detail the sophisticated workflow currently in place.

## Traditional vs. Advanced Workflow

Traditionally, developers pushed code to Git—typically to the main branch—which automatically triggered a Jenkins pipeline. In contrast, our advanced approach maintains a stable main branch while all new features or bug fixes are developed on separate branches (e.g., "feature-x"). Once changes are finalized, a pull request is opened to merge the feature branch into the main branch, which in turn triggers the first pipeline: the code analysis pipeline.

During the **code analysis stage**, Jenkins performs the following steps:

- Checks out the code.
- Installs dependencies.
- Runs tests to ensure code integrity.

After the tests pass, the pull request undergoes a review by a team lead or manager. Once approved and merged into the main branch, the code changes automatically initiate the **release pipeline**.

![The image illustrates a code analysis pipeline configuration, showing a flow from a pull request to code checkout, dependency installation, and code testing, with a Jenkins logo at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752879837/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Advanced-Pipeline/code-analysis-pipeline-jenkins.jpg)

## Release Pipeline Process

Upon merging into the main branch, the release pipeline undertakes the following actions for every commit:

1.  Checks out the code.
2.  Bumps the semantic version of the application.
3.  Creates a Git tag and a Git release.
4.  Builds a Docker image.
5.  Pushes the Docker image to DockerHub.
6.  Deploys the new version to a Kubernetes cluster.

![The image shows a diagram of a Git branching model with "main" and "feature-x" branches, alongside a release pipeline process with steps like checking out code, bumping semantic version, tagging, releasing, building, and pushing a Docker image.](https://kodekloud.com/kk-media/image/upload/v1752879839/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Advanced-Pipeline/git-branching-model-release-pipeline.jpg)

> [!important]
> **Note**
>
> Programmatically creating a Git tag and release requires an access token to interact with GitHub's API.

Several credentials are critical for secure operations within our pipeline:

- A kubeconfig file for Kubernetes deployments.
- Docker credentials for image uploads to DockerHub.
- A GitHub token for tag and release creation.
- AWS credentials for authentication with our AWS-hosted Kubernetes cluster.

## Semantic Versioning and Conventional Commits

Understanding semantic versioning is vital. It assigns three numeric indicators: major, minor, and patch.

- **Major Version** increases with breaking changes or significant modifications.
- **Minor Version** increases with new, backward-compatible features.
- **Patch Version** increases with small fixes or bug patches.

Our CI/CD pipeline utilizes a tool that interprets commit messages written in the conventional commits format to determine which segment of the version number to update:

- A commit starting with `fix:` bumps the patch version.
- A commit starting with `feat:` bumps the minor version.
- A commit starting with `feat!:` signals a breaking change and bumps the major version.

![The image explains semantic versioning, detailing major, minor, and patch versions with examples of changes for each.](https://kodekloud.com/kk-media/image/upload/v1752879839/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Advanced-Pipeline/semantic-versioning-major-minor-patch.jpg)

Furthermore, the conventional commits format directly influences the version update process by dictating whether the major, minor, or patch number increases.

![The image illustrates the concept of conventional commits with examples, showing a version number "v3.6.2" and three commit messages: "fix: timeout bug," "feat: Chat functionality," and "feat!: Added Authentication."](https://kodekloud.com/kk-media/image/upload/v1752879840/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Configuring-Advanced-Pipeline/conventional-commits-examples-v3-6-2.jpg)

## Code Quality Pipeline

The code quality pipeline is designed to efficiently validate incoming changes. Its stages include checking for a pull request, installing dependencies, and running tests.

Below is the Groovy snippet for the code quality pipeline:

```
stages {
    stage('Pull Request Number') {
        when {
            changeRequest target: 'main'
        }
        steps {
            echo "PR: ${CHANGE_ID}"
        }
    }
    stage('Setup') {
        steps {
            sh 'poetry install --with dev'
        }
    }
    stage('Test') {
        steps {
            sh 'poetry run pytest'
        }
    }
}
```

This pipeline is triggered under two scenarios:

- When a push occurs to any branch (except main).
- When a pull request destined for the main branch is created.

The "Pull Request Number" stage prints the pull request identifier (stored in the `CHANGE_ID` environment variable), aiding in debugging and tracking.

## Release Pipeline Detailed Workflow

The release pipeline begins by establishing necessary environment variables and loading credentials. The following snippet demonstrates the pipeline’s environment configuration:

```
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'sanjeevkt720/jenkins-flask-app'
        IMAGE_TAG = "${IMAGE_NAME}:${env.GIT_COMMIT}"
        KUBECONFIG = credentials('kubeconfig-credentials-id')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        GH_TOKEN = credentials('github-token')
    }
}
```

### Checking for an Existing Git Tag

Before proceeding, the pipeline checks whether the current commit is associated with a Git tag. If a tag exists, it sets the environment variable accordingly; otherwise, it remains empty:

```
stages {
    stage("Check for Git Tag") {
        steps {
            script {
                def tag = sh(returnStdout: true, script: "git tag --contains").trim()

                if (tag != null && tag != "") {
                    env.GIT_TAG = tag
                } else {
                    env.GIT_TAG = ''
                }
                echo "GIT_TAG is set to: ${env.GIT_TAG}"
                env.IMAGE_TAG_RELEASE = "${IMAGE_NAME}:${GIT_TAG}"
            }
        }
    }
}
```

### Installing Dependencies

After the tag check, the pipeline installs all required dependencies:

```
stage('Setup') {
    steps {
        script {
            sh "poetry install --with dev"
        }
    }
}
```

### Creating a New Release

If no Git tag is detected (i.e., the `GIT_TAG` variable is empty), the pipeline proceeds to create a release using the `semantic-release` tool:

```
stage('Create Release') {
    when {
        expression {
            return env.GIT_TAG == "" // Only run if GIT_TAG is not set
        }
    }
    steps {
        script {
            def tag = sh(returnStdout: true, script: "poetry run semantic-release version").trim()
            echo "${tag}"

            sh "poetry run semantic-release publish"

            echo "Published new tag: ${tag}"
        }
    }
}
```

After the release, a new Git tag is created, which will trigger the build and deploy phases during subsequent pipeline runs.

### Build and Deploy Phase

Once a Git tag is present, the pipeline proceeds with building and deploying the application. The following snippet outlines these tasks:

```
stage("Build and Deploy") {
    when {
        expression {
            return env.GIT_TAG != "" // Only run if GIT_TAG is not empty
        }
    }
    steps {
        // Docker login
        withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh 'echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin'
            echo 'Login successful'
        }
        // Build and tag Docker image here (not shown for brevity)
        // Push Docker image to DockerHub and deploy to Kubernetes
    }
}
```

After successfully building, tagging, and pushing the Docker image, the application is deployed to the Kubernetes cluster, completing the release cycle.

---

This advanced pipeline setup enhances quality control and automates deployments by integrating code analysis, semantic versioning, and a robust release process. For more insights and documentation on similar topics, consider exploring our [Jenkins Documentation](https://www.jenkins.io/doc/) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/79ea1422-fc3a-48da-851d-232fc09690de/lesson/c21f7069-353a-498b-a5a9-b01a195d1b48)**
>
> Watch video content
