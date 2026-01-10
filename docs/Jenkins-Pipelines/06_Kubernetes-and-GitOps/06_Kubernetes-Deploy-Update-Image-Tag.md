# Kubernetes Deploy Update Image Tag - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/Kubernetes-Deploy-Update-Image-Tag)

---

## Table of Contents

- Kubernetes Deploy Update Image Tag
  - 1. Updating the Deployment YAML
  - 2. Jenkins Pipeline Stage to Update the Image Tag
  - 3. Configuring Jenkins Credentials
  - 4. Verifying the Process
  - Conclusion
  - Watch Video

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# Kubernetes Deploy Update Image Tag

In this lesson, you will learn how to update the Docker image tag in a Kubernetes deployment manifest and integrate this change using a Jenkins pipeline that triggers Argo CD. Previously, the manifest repository "solar-system-gitops-argo-cd" was imported, which contains a Kubernetes folder holding the deployment YAML file. Now, we need to update the image tag in that file so that the deployment reflects the Docker image built by Jenkins.

─────────────────────────────────────────────

## 1\. Updating the Deployment YAML

The deployment YAML file defines the image that Kubernetes will run. For example, the file may look like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
  namespace: solar-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: solar-system
  strategy: {}
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
        - image: siddharth67/solar-system:3e906e3be959342b1916f720c34344fb267
          imagePullPolicy: Always
          name: solar-system
          ports:
            - containerPort: 3000
              name: http
              protocol: TCP
          envFrom:
            - secretRef:
                name: mongo-db-cred
```

Every time a new Docker image is built by Jenkins, the image tag in this file must be updated. After making the change, synchronize the update using Argo CD.

Below is a screenshot of Argo CD showing an application (solar-system-argo-app) in an OutOfSync state:

![The image shows an Argo CD interface displaying an application named "solar-system-argo-app" with a status of "OutOfSync" and "Missing" health status. It includes a visual representation of the application's components, such as "solar-system" and "mongo-db-creds."](https://kodekloud.com/kk-media/image/upload/v1752879729/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/argo-cd-solar-system-app-outofsync.jpg)

To verify that the Kubernetes cluster has not yet applied the deployment, run:

```
kubectl -n solar-system get all
```

This command confirms that no resources exist because Argo CD has not synced the changes.

─────────────────────────────────────────────

## 2\. Jenkins Pipeline Stage to Update the Image Tag

The Jenkins pipeline stage named "K8S Update Image Tag" is designed to update the image tag and is executed only on pull request branches (i.e., branches whose names start with "PR"). This stage performs the following actions:

1.  Clones the manifest repository from the main branch.
2.  Changes into the Kubernetes directory.
3.  Creates a new feature branch using the Jenkins environment variable `$BUILD_ID`.
4.  Utilizes the `sed` command to update the image tag in the deployment YAML file to match the commit hash stored in `$GIT_COMMIT`.
5.  Configures Git, commits the change, and pushes the feature branch to the remote repository.

Below is an example of this pipeline stage:

```
stage('K8S Update Image Tag') {
    when {
        branch 'PR*'
    }
    steps {
        sh 'git clone -b main http://64.227.187.25:5555/dasher-org/solar-system-gitops-argocd'
        dir('solar-system-gitops-argocd/kubernetes') {
            sh '''
                ##### Replace Docker Tag #####
                git checkout main
                git checkout -b feature-$BUILD_ID
                sed -i "s#siddharth67/solar-system:$GIT_COMMIT#siddharth67/solar-system:$GIT_COMMIT#g" deployment.yml
                cat deployment.yml


                ##### Commit and Push to Feature Branch #####
                git config --global user.email "jenkins@dasher.com"
                git config --global user.name "Jenkins"
                git remote set-url origin http://$GITEA_TOKEN@64.227.187.25:5555/dasher-org/solar-system-gitops-argocd
                git add .
                git commit -am "Updated docker image"
                git push -u origin feature-$BUILD_ID
            '''
        }
    }
    post {
        always {
            // Clean up the manifest repository to avoid clone conflicts in subsequent runs.
            script {
                if (fileExists('solar-system-gitops-argocd')) {
                    sh 'rm -rf solar-system-gitops-argocd'
                }
            }
        }
    }
}
```

Additionally, a pipeline stage responsible for pushing the Docker image may look like this:

```
stage('Push Docker Image') {
    steps {
        withDockerRegistry(credentialsId: 'docker-hub-credentials', url: "") {
            sh 'docker push siddharth67/solar-system:$GIT_COMMIT'
        }
    }
}
```

─────────────────────────────────────────────

## 3\. Configuring Jenkins Credentials

Before committing the changes, Jenkins must be configured with the appropriate credentials. A Gitea (or GitHub) token is stored in Jenkins and referenced as the environment variable GITEA_TOKEN. An example environment section in the Jenkinsfile is as follows:

```
pipeline {
    agent any
    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
        MONGO_DB_CREDS = credentials('mongo-db-credentials')
        MONGO_USERNAME = credentials('mongo-db-username')
        MONGO_PASSWORD = credentials('mongo-db-password')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
        GITEA_TOKEN = credentials('gitea-api-token')
    }
    stages {
        // Your stages such as "Installing Dependencies", "Unit Testing", etc.
    }
}
```

> [!important]
> **Note**
>
> To generate the Gitea token, navigate to your repository’s settings (in Gitea, for example) and create a new access token with read/write repository permissions.

The following image illustrates the Gitea token generation process:

![The image shows a user interface for managing access tokens in Gitea, where a new token named "jenkins-token" is being generated with repository and organization access settings.](https://kodekloud.com/kk-media/image/upload/v1752879730/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/gitea-access-tokens-jenkins-token.jpg)

─────────────────────────────────────────────

## 4\. Verifying the Process

Once the Jenkins pipeline runs, a new feature branch (for example, feature-1) is created in the manifest repository with the updated deployment configurations. You can verify this by inspecting the repository branches:

![The image shows a Git repository interface with a branch named "feature-1" and files related to Kubernetes, including "deployment.yml," "secret.yml," and "service.yml." A recent update to the Docker image is noted.](https://kodekloud.com/kk-media/image/upload/v1752879731/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/git-repo-feature-1-kubernetes-files.jpg)

Keep in mind that Argo CD is configured to monitor only the main branch. Since these updates reside in a feature branch, they are not yet deployed. Once you initiate and merge a pull request from the feature branch into main, Argo CD will detect the changes and perform a sync.

For example, after merging, the deployment YAML in the main branch might appear as follows:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
  namespace: solar-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: solar-system
  strategy: Recreate
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
      - name: solar-system
        image: siddharth67/solar-system:5fac47d1247e567b284288f81cf452f831341b
```

After performing a manual refresh in Argo CD, the application dashboard should confirm the target revision and the updated image. Below is a screenshot of the Argo CD dashboard:

![The image shows a dashboard from Argo CD, displaying details of an application named "SOLAR-SYSTEM-ARGO-APP," including its project, cluster, namespace, and sync status. The application is currently out of sync and missing health status.](https://kodekloud.com/kk-media/image/upload/v1752879732/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/argo-cd-solar-system-dashboard.jpg)

Furthermore, the Jenkins dashboard provides pipeline activity details for branch-specific builds and pull requests:

![The image shows a Jenkins dashboard displaying a list of pipeline activities for a project named "solar-system" under the "Gitea-Organization." It includes details such as status, run number, commit ID, branch, message, duration, and completion time.](https://kodekloud.com/kk-media/image/upload/v1752879734/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/jenkins-dashboard-solar-system-pipelines.jpg)

Webhook configurations in your repository settings ensure that pull request events automatically trigger the Jenkins pipeline:

![The image shows a settings page for configuring webhook events related to issues and pull requests, with various options checked for different types of events. There are also fields for branch filtering and authorization headers.](https://kodekloud.com/kk-media/image/upload/v1752879735/notes-assets/images/Jenkins-Pipelines-Kubernetes-Deploy-Update-Image-Tag/webhook-settings-configuration-page.jpg)

─────────────────────────────────────────────

## Conclusion

This lesson demonstrated how to automate the update of a Kubernetes deployment's Docker image tag using Jenkins. By cloning the manifest repository, creating a feature branch, updating the YAML file using the `sed` command, and pushing changes with proper authentication, you can seamlessly integrate with Argo CD. The updated manifest is synchronized to the cluster only after merging the changes into the main branch, ensuring continuous deployment consistency.

Moving forward, we will explore automating the pull request process to merge manifest changes from feature branches into the main branch.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/8b770c43-87be-405a-906a-bb5ea4e468f0)**
>
> Watch video content
