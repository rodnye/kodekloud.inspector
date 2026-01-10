# Building a CD Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Pipelines/Building-a-CD-Pipeline)

---

## Table of Contents

- Building a CD Pipeline
  - Jenkinsfile Pipeline Configuration
  - Configuring Jenkins
  - Monitoring and Verifying the Build
  - Conclusion
  - Watch Video

---

## Content

Jenkins

Pipelines

# Building a CD Pipeline

This guide explains how to set up a CI/CD pipeline using Jenkins and Docker. We will create a pipeline that retrieves code from a Git repository, optionally runs tests, and builds a Docker image. Follow along to configure your Jenkinsfile and set up your Jenkins instance.

## Jenkinsfile Pipeline Configuration

Below is the Jenkinsfile used to create the pipeline:

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
        stage('Development') {
            steps {
                git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
                // ,[object Object],
                // sh 'go test ./...'
            }
        }
        stage('Building our image') {
            steps {
                script {
                    app = docker.build("adminturneddevops/go-webapp-sample")
                }
            }
        }
    }
}
```

The pipeline is divided into two principal stages:

1.  **Development Stage:** Checks out the code from the Git repository.
2.  **Building our image Stage:** Builds a Docker image using the Docker plugin.

## Configuring Jenkins

Follow these steps to configure your Jenkins instance for running the pipeline:

1.  **Install Docker-Related Plugins:**
    - Open Jenkins and navigate to **Manage Jenkins** > **Manage Plugins**.
    - Under the **Installed** tab, search for Docker-related plugins and ensure you have installed:
      - Docker API Plugin
      - Docker Commons Plugin
      - Docker Pipeline Plugin
      - Docker Plugin

    Additionally, confirm that Docker is installed on your build server (in this example, our Jenkins server).

    ![The image shows a plugin manager interface listing various Docker-related plugins, their descriptions, versions, and options to uninstall them.](https://kodekloud.com/kk-media/image/upload/v1752880084/notes-assets/images/Jenkins-Building-a-CD-Pipeline/frame_90.jpg)

2.  **Create a New Pipeline Job:**
    - Return to the Jenkins dashboard and select **New Item**.
    - Enter a name for your pipeline job, choose **Pipeline**, and click **OK**.
    - In the **Pipeline** section, paste the Jenkinsfile script provided above into the Pipeline script area.

    ![The image shows a Jenkins interface with "Advanced Project Options" for configuring a pipeline script, including options to save or apply changes.](https://kodekloud.com/kk-media/image/upload/v1752880086/notes-assets/images/Jenkins-Building-a-CD-Pipeline/frame_100.jpg)

3.  **Initiate the Pipeline:**
    - Save the configuration and click **Build Now** to start the pipeline.
    - The pipeline will display both the "Development" and "Building our image" stages. You can monitor its progress from the Jenkins dashboard.

    ![The image shows a Jenkins pipeline dashboard for "godocker," displaying stage view times and build history options.](https://kodekloud.com/kk-media/image/upload/v1752880087/notes-assets/images/Jenkins-Building-a-CD-Pipeline/frame_120.jpg)

## Monitoring and Verifying the Build

If the Docker image is not already present locally, the pipeline may take a little longer, as Jenkins will pull and build the image. Once the pipeline completes, review the console output to verify the successful checkout, build, and creation of the Docker image. Example console output:

```
Step 7 / 9 : RUN cd /build/go-webapp-sample && go build
 ---> Using cache
8b7abe3f09fdc
Step 8 / 9 : EXPOSE 8080
 ---> Using cache
7a58545ce61d
Step 9 / 9 : ENTRYPOINT [ "/build/go-webapp-sample" ]
 ---> Using cache
483409ad1030
Successfully built 483409ad1030
Successfully tagged adminturneddevops/go-webapp-sample:latest
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] // script
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] // stage
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```

> [!important]
> **Note**
>
> Ensure that your build server has sufficient resources and proper Docker configuration to execute the pipeline successfully.

## Conclusion

This guide has walked you through setting up a CI/CD pipeline with Jenkins and Docker. By following the steps above, you now have a working pipeline that checks out code from Git, optionally runs tests, and builds a Docker image. For further learning and best practices, check out the [Jenkins Documentation](https://www.jenkins.io/doc/) and [Docker Documentation](https://docs.docker.com/).

Happy building and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/4eff829b-dd2c-4051-8090-35e8525b8874/lesson/41e3958b-2e37-47f1-85f8-d7e18d5157b3)**
>
> Watch video content
