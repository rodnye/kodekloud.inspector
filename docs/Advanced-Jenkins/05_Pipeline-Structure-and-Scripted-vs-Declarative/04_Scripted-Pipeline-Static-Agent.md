# Scripted Pipeline Static Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Structure-and-Scripted-vs-Declarative/Scripted-Pipeline-Static-Agent)

---

## Table of Contents

- Scripted Pipeline Static Agent
  - 1. Assigning a Static Agent
  - 2. Adding a Unit Test Stage with MongoDB Credentials
  - 3. Complete Jenkinsfile
  - 4. Verifying the Build
  - References
  - Watch Video
    - Pipeline Stages Summary

---

## Content

Advanced Jenkins

Pipeline Structure and Scripted vs Declarative

# Scripted Pipeline Static Agent

In this guide, we’ll extend an existing Jenkins Scripted Pipeline so that all stages run on a dedicated static agent instead of the controller. You’ll also learn how to inject MongoDB credentials for a **Unit Testing** stage.

## 1\. Assigning a Static Agent

By default, a Scripted Pipeline executes on the Jenkins controller when no agent label is specified. To delegate it to a static node:

1.  Open your Jenkins dashboard and locate the agent you want to use.
2.  Copy its label—in this example, `Ubuntu-Docker-JDK-17-node20`.

![The image shows a Jenkins dashboard for an agent named "ubuntu-agent," displaying its status, monitoring data, and available disk space. The agent is connected, with labels and no projects tied to it.](https://kodekloud.com/kk-media/image/upload/v1752868922/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Static-Agent/jenkins-dashboard-ubuntu-agent-status.jpg)

Wrap all pipeline stages in a `node` block with that label:

```
node('Ubuntu-Docker-JDK-17-node20') {
  // Your pipeline stages go here
}
```

> [!important]
> **Note**
>
> Ensure your static agent has Docker, JDK, and any required tools installed before running the pipeline.

## 2\. Adding a Unit Test Stage with MongoDB Credentials

We’ll introduce a **Unit Testing** stage that runs `npm test`. Since these tests connect to MongoDB, we inject credentials at runtime using Jenkins’ `withCredentials`.

1.  Navigate to **Pipeline Syntax** in Jenkins.
2.  Open the **Snippet Generator**.
3.  Select **withCredentials: Username and password (separated)**.
4.  Enter:
    - Credential ID: `mongo-db-creds`
    - Username Variable: `MONGO_USERNAME`
    - Password Variable: `MONGO_PASSWORD`

![The image shows a Jenkins interface with a "Snippet Generator" for creating pipeline scripts. A dropdown menu is open, displaying options for selecting credentials like AWS access keys and SSH user private keys.](https://kodekloud.com/kk-media/image/upload/v1752868924/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Static-Agent/jenkins-snippet-generator-pipeline-scripts.jpg)

The generated snippet looks like this:

```
withCredentials([usernamePassword(
    credentialsId: 'mongo-db-creds',
    usernameVariable: 'MONGO_USERNAME',
    passwordVariable: 'MONGO_PASSWORD'
)]) {
    // your commands
}
```

## 3\. Complete Jenkinsfile

Below is the full `Jenkinsfile` that checks out the code, installs dependencies, and runs unit tests with MongoDB credentials:

```
node('Ubuntu-Docker-JDK-17-node20') {


  stage('Checkout') {
    checkout scm
  }


  stage('Install Dependencies') {
    sh 'npm install'
  }


  stage('Unit Testing') {
    // Define the MongoDB URI
    env.MONGO_URI = 'mongodb+srv://supercluster.d3j...'


    // Inject MongoDB credentials
    withCredentials([usernamePassword(
        credentialsId: 'mongo-db-creds',
        usernameVariable: 'MONGO_USERNAME',
        passwordVariable: 'MONGO_PASSWORD'
    )]) {
      sh 'node -v'
      sh 'npm test'
    }
  }
}
```

After saving the `Jenkinsfile`, commit and push it to a new branch:

```
git checkout -b pipeline/scripted
git add Jenkinsfile
git commit -m "Run scripted pipeline on static agent with MongoDB credentials"
git push origin pipeline/scripted
```

## 4\. Verifying the Build

Once the branch is pushed, Jenkins automatically triggers the pipeline. In **Blue Ocean**, you’ll see each stage execute on the specified Ubuntu agent:

![The image shows a Jenkins pipeline interface with multiple build stages, including "Checkout," "Installing Dependencies," and "Unit Testing," each marked with progress indicators. The sidebar contains options like "Build Now," "View Configuration," and "Pipeline Syntax."](https://kodekloud.com/kk-media/image/upload/v1752868925/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Static-Agent/jenkins-pipeline-interface-build-stages.jpg)

Inspect the console output to ensure credentials were injected and tests ran successfully:

![The image shows a Jenkins console output screen displaying the progress of a pipeline job, including details about the execution environment and steps being performed.](https://kodekloud.com/kk-media/image/upload/v1752868926/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Static-Agent/jenkins-console-output-pipeline-job.jpg)

### Pipeline Stages Summary

| Stage                | Purpose                                | Command            |
| -------------------- | -------------------------------------- | ------------------ |
| Checkout             | Clone source code from SCM             | `checkout scm`     |
| Install Dependencies | Install npm modules                    | `sh 'npm install'` |
| Unit Testing         | Run tests using injected MongoDB creds | `sh 'npm test'`    |

Now all stages run on your static Ubuntu agent, and unit tests connect to MongoDB with the provided credentials.

## References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Snippet Generator](https://www.jenkins.io/doc/book/pipeline/syntax/#snippet-generator)
- [Blue Ocean Plugin](https://www.jenkins.io/projects/blueocean/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/c5fd2d73-5044-45b3-b944-eeb726d341a8)**
>
> Watch video content
