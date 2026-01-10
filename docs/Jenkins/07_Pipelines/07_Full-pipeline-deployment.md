# Full pipeline deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Pipelines/Full-pipeline-deployment)

---

## Table of Contents

- Full pipeline deployment
  - Jenkins Pipeline Overview
  - Pipeline Configuration in YAML
  - Observing the Pipeline in Action
  - Handling Console Output Warnings
  - Next Steps
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Pipelines

# Full pipeline deployment

In this guide, we will walk you through setting up a complete Jenkins pipeline to build, test, and run a Go web application. In previous lessons, you learned how to test your code, pull it from GitHub, and build it. Now, we'll execute an entire code pipeline end-to-end, ensuring that every stage of your Go application's lifecycle is automated.

## Jenkins Pipeline Overview

The final configuration provided below defines a Jenkins pipeline with three key stages:

1.  **Test:** Runs the Go test suite.
2.  **Build:** Compiles the Go application.
3.  **Run:** Executes the compiled binary.

Each stage checks out the source code from GitHub and executes the corresponding commands to progress your application through the pipeline.

```
pipeline {
    agent any
    tools {
        go 'go-1.17'
    }
    environment {
        GO111MODULE = 'on'
    }
    stages {
        stage('Test') {
            steps {
                git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
                sh 'go test ./...'
            }
        }
        stage('Build') {
            steps {
                git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
                sh 'go build .'
            }
        }
        stage('Run') {
            steps {
                sh 'cd /var/lib/jenkins/workspace/go-full-pipeline && go-webapp-sample &'
            }
        }
    }
}
```

> [!important]
> **Important**
>
> Ensure that the "Run" stage uses the Jenkins workspace directory to locate and execute the binary built in the earlier stage. Without running the build commands, the `go-webapp-sample` binary would not be available, leading to execution errors.

## Pipeline Configuration in YAML

Below is an example of the equivalent pipeline written in YAML. Note that the environment variable typo has been corrected in this version.

```
agent any
tools {
    go 'go-1.17'
}


environment {
    GO111MODULE='on'
}


stages {
    stage('Test') {
        steps {
            git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
            sh 'go test ./...'
        }
    }
    stage('Build') {
        steps {
            git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
            sh 'go build .'
        }
    }
    stage('Run') {
        steps {
            sh 'cd /var/lib/jenkins/workspace/go-full-pipeline && go-webapp-sample &'
        }
    }
}
```

After configuring your pipeline job in Jenkins, simply run it by following these steps:

1.  Open your web browser and navigate to the Jenkins dashboard.
2.  Create a new pipeline job and name it "GoFullPipeline" (or choose an appropriate name and update related configurations if necessary).

## Observing the Pipeline in Action

When you run the pipeline, you will see output in the Jenkins console similar to the following:

```
> git rev-parse refs/remotes/origin/master^{commit} # timeout=10
> git config core.sparsecheckout # timeout=10
> git checkout -f 09b607224df9bb27580dafc7ec249fe2e805cbfbb # timeout=10
...
+ go test ./...
?  	github.com/ybkuroki/go-webapp-sample	[no test files]
?  	github.com/ybkuroki/go-webapp-sample/config	[no test files]
?  	github.com/ybkuroki/go-webapp-sample/controller	(cached)
...
```

The test stage confirms that the tests run successfully, even if some directories do not contain test files. After testing, the build stage compiles the binary, and the run stage then navigates to the workspace directory to start the Go application.

![The image shows a Jenkins dashboard displaying a pipeline's stage view, including average stage times for tool installation, testing, building, and running processes.](https://kodekloud.com/kk-media/image/upload/v1752880088/notes-assets/images/Jenkins-Full-pipeline-deployment/frame_90.jpg)

After a successful build, open your browser and navigate to the Jenkins host IP address on the default port (8000) to see your application running.

## Handling Console Output Warnings

Sometimes, you might see a message similar to this in the console output:

```
+ cd /var/lib/jenkins/workspace/go-full-pipeline
+ go-webapp-sample
/var/lib/jenkins/workspace/go-full-pipeline@tmp/durable-c32dd620/script.sh: 1: go-webapp-sample: not found
Finished: SUCCESS
```

> [!important]
> **Warning**
>
> Although the error message appears due to the shell's execution reporting, this does not prevent your application from running successfully. This behavior has been observed consistently in previous builds.

## Next Steps

Now that you have seen the complete Jenkins pipeline in action, it's time for you to experiment with the configuration. Tweak the settings as needed and verify that each stage—testing, building, and running—executes as expected.

For more detailed guidance on Jenkins and Go application deployment, refer to the following resources:

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Go Programming Language](https://golang.org/doc/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/4eff829b-dd2c-4051-8090-35e8525b8874/lesson/c690654f-bd91-4c3d-b419-b1ffed2b4060)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/4eff829b-dd2c-4051-8090-35e8525b8874/lesson/65b8dbb5-a926-4538-8fd4-3c1cda5ed5db)**
>
> Practice lab
