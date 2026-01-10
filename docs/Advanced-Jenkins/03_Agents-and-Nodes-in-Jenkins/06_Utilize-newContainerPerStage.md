# Utilize newContainerPerStage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Utilize-newContainerPerStage)

---

## Table of Contents

- Utilize newContainerPerStage
  - Single-Container Pipeline
  - Enforcing Stage Isolation with newContainerPerStage
  - Links and References
  - Watch Video
  - Practice Lab
    - Execution Logs
    - Updated Pipeline Configuration
    - Comparison of Pipeline Behaviors

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Utilize newContainerPerStage

In this lesson, you will learn why the `newContainerPerStage` directive is essential when using a Dockerfile agent in a Jenkins Declarative Pipeline. By default, Jenkins runs all stages in a single container, sharing the workspace and any generated artifacts. We’ll explore both behaviors and show how to enforce stage-level isolation.

## Single-Container Pipeline

When you configure a pipeline with a global Dockerfile agent, every stage executes inside the same container. Artifacts created in one stage remain available in the next:

```
pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.cowsay'
      label 'ubuntu-docker-jdk17-node20'
    }
  }
  stages {
    stage('Stage-1') {
      steps {
        sh 'cat /etc/os-release'
        sh 'node -v'
        sh 'npm -v'
        echo '#############################'
        sh "echo $((RANDOM)) > /tmp/imp-file-$BUILD_ID"
        sh 'ls -ltr /tmp/imp-file-$BUILD_ID'
        sh 'cat /tmp/imp-file-$BUILD_ID'
        echo '#############################'
      }
    }
    stage('Stage-2') {
      steps {
        sh 'cat /etc/os-release'
        sh 'node -v'
        sh 'npm -v'
        echo 'Reading file generated in Stage-1:'
        sh 'cat /tmp/imp-file-$BUILD_ID'
      }
    }
    stage('Stage-3') {
      steps {
        sh 'cat /etc/os-release'
        sh 'node -v'
        sh 'npm -v'
      }
    }
    stage('Stage-4') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'cowsay -f dragon This is running on Docker Container'
        echo 'Final file check:'
        sh 'cat /tmp/imp-file-$BUILD_ID'
        sh 'sleep 120s'
      }
    }
  }
}
```

![The image shows a Jenkins dashboard displaying the activity of a pipeline named "pipeline-external-agent," with a list of recent runs, their status, duration, and completion times.](https://kodekloud.com/kk-media/image/upload/v1752868794/notes-assets/images/Advanced-Jenkins-Utilize-newContainerPerStage/jenkins-dashboard-pipeline-activity.jpg)

### Execution Logs

```
# Dockerfile build and container start
$ docker build -t pipeline-external-agent -f Dockerfile.cowsay .
...
$ docker run ...
# Stage-1
+ cat /etc/os-release
NAME="Alpine Linux" ...
+ node -v
v18.20.4
+ npm -v
10.7.0
+ echo $((RANDOM)) > /tmp/imp-file-7
+ ls -ltr /tmp/imp-file-7
-rw-r--r-- 1 root root 5 Nov 10 07:42 /tmp/imp-file-7
+ cat /tmp/imp-file-7
7577
# Stage-2, Stage-3, Stage-4 reuse the same container
+ cat /tmp/imp-file-7
7577
```

When the pipeline finishes, Jenkins stops and removes that single container.

## Enforcing Stage Isolation with newContainerPerStage

To run each stage in its own container—so artifacts from one stage aren’t carried over—enable the `newContainerPerStage()` option.

> [!important]
> **Note**
>
> Refer to the [Pipeline Syntax Reference](https://www.jenkins.io/doc/book/pipeline/syntax/#options) for details on `newContainerPerStage()`.

![The image shows a webpage from the Jenkins documentation, specifically focusing on pipeline syntax options. It includes a highlighted section about the "newContainerPerStage" option.](https://kodekloud.com/kk-media/image/upload/v1752868795/notes-assets/images/Advanced-Jenkins-Utilize-newContainerPerStage/jenkins-pipeline-syntax-newcontainerperstage.jpg)

### Updated Pipeline Configuration

Insert an `options` block with `newContainerPerStage()`:

```
pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.cowsay'
      label 'ubuntu-docker-jdk17-node20'
    }
  }
  options {
    newContainerPerStage()
  }
  stages {
    stage('Stage-1') {
      steps {
        sh 'cat /etc/os-release'
        sh 'node -v'
        sh 'npm -v'
        echo '********************'
        sh "echo $((RANDOM)) > /tmp/imp-file-$BUILD_ID"
        sh 'ls -ltr /tmp/imp-file-$BUILD_ID'
        sh 'cat /tmp/imp-file-$BUILD_ID'
        echo '********************'
      }
    }
    stage('Stage-2') {
      steps {
        sh 'cat /etc/os-release'
        sh 'node -v'
        sh 'npm -v'
        echo 'Trying to read file from Stage-1:'
        sh 'ls -ltr /tmp/imp-file-$BUILD_ID'
        sh 'cat /tmp/imp-file-$BUILD_ID'
      }
    }
  }
}
```

Now Jenkins rebuilds the Docker image and starts a fresh container for every stage. **Stage-2** will fail because the file from **Stage-1** no longer exists:

```
# Stage-2
$ docker build -t pipeline-external-agent -f Dockerfile.cowsay .
...
# Inside new container
$ ls -ltr /tmp/imp-file-9
ls: cannot access '/tmp/imp-file-9': No such file or directory
```

> [!important]
> **Warning**
>
> Using `newContainerPerStage()` increases build time due to repeated image builds. Evaluate the trade-off between isolation and performance.

### Comparison of Pipeline Behaviors

| Setting                    | Description                                              | Pros                     | Cons                                             |
| -------------------------- | -------------------------------------------------------- | ------------------------ | ------------------------------------------------ |
| Single container (default) | All stages share one Docker container and workspace      | Fast execution           | No stage-level isolation                         |
| newContainerPerStage()     | Each stage runs in a new container built from Dockerfile | Full isolation per stage | Longer builds due to repeated image construction |

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Jenkins Docker Pipeline](https://www.jenkins.io/doc/book/pipeline/docker/)
- [Pipeline Options: newContainerPerStage](https://www.jenkins.io/doc/book/pipeline/syntax/#newcontainerperstage)

That’s all for now—thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/35e85091-048f-4fcf-a013-edde048ace6a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/0dcae6c1-c8da-4ead-a160-d8e6c23bd8bf)**
>
> Practice lab
