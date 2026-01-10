# Demo Declarative vs Scripted Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Structure-and-Scripted-vs-Declarative/Demo-Declarative-vs-Scripted-Pipeline)

---

## Table of Contents

- Demo Declarative vs Scripted Pipeline
  - Repository Structure
  - Jenkinsfile.declarative
  - Jenkinsfile.scripted
  - 1. Create the Pipeline Job
  - 2. Configure the Declarative Pipeline
  - 3. Running the Declarative Pipeline
  - 4. Switch to the Scripted Pipeline
  - 5. Add Checkout to Scripted Pipeline
  - Summary of Differences
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Pipeline Structure and Scripted vs Declarative

# Demo Declarative vs Scripted Pipeline

In this guide, we’ll compare **Declarative** and **Scripted** Jenkins pipelines using two separate `Jenkinsfile`s in the same Git repository. By the end, you’ll understand the key differences in configuration, SCM handling, and runtime behavior.

---

## Repository Structure

Our repo **declarative-vs-scripted-pipeline** has two branches (`demo-1` and `demo-2`) and two Jenkinsfiles:

![The image shows a Gitea repository interface for "declarative-vs-scripted-pipeline" with two branches and files named "Jenkinsfile.declarative" and "Jenkinsfile.scripted."](https://kodekloud.com/kk-media/image/upload/v1752868904/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/gitea-repository-declarative-scripted.jpg)

- **Jenkinsfile.declarative**
- **Jenkinsfile.scripted**

---

## Jenkinsfile.declarative

The Declarative Pipeline syntax includes an implicit checkout and a `post` section for cleanup:

```
pipeline {
  agent any

  stages {
    stage('Echo Message') {
      steps {
        sh 'ls -ltr'
        sh 'echo "This is executed within a DECLARATIVE Pipeline"'
      }
    }
  }

  post {
    always {
      sh 'echo "This will always run"'
      sh 'rm -rf *'
    }
  }
}
```

> [!important]
> **Warning**
>
> The `post { always { rm -rf * } }` step will delete all files in the workspace. Use with caution.

---

## Jenkinsfile.scripted

Scripted Pipelines rely on explicit SCM operations and Groovy control flow:

```
node {
  try {
    stage('Echo Message') {
      sh 'ls -ltr'
      sh 'echo "This is executed within a SCRIPTED Pipeline"'
    }
  } catch (err) {
    echo "Failed: ${err}"
  } finally {
    sh 'echo "This will always run."'
    // sh 'rm -rf *'
  }
}
```

> [!important]
> **Note**
>
> Scripted Pipelines **do not** perform an automatic `checkout scm`. You must add it manually where needed.

---

## 1\. Create the Pipeline Job

1.  In Jenkins, click **New Item**.
2.  Enter **d-v-s-pipeline**, select **Pipeline**, and click **OK**.

![The image shows a Jenkins interface for creating a new item, with options to select different project types such as Freestyle project, Pipeline, Multi-configuration project, and Folder. The item name "d-v-s-pipeline" is entered in the text field.](https://kodekloud.com/kk-media/image/upload/v1752868906/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/jenkins-new-item-dvs-pipeline.jpg)

---

## 2\. Configure the Declarative Pipeline

1.  Under **Pipeline** → **Definition**, choose **Pipeline script from SCM**.
2.  Enter your Git **Repository URL**, credentials (if any), and branch `demo-1`.
3.  In **Script Path**, set `Jenkinsfile.declarative`.
4.  Save and click **Build**.

![The image shows a Jenkins configuration screen for setting up a pipeline, with options for specifying the SCM, repository URL, credentials, and branch to build.](https://kodekloud.com/kk-media/image/upload/v1752868906/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/jenkins-pipeline-configuration-screen.jpg)

![The image shows a Jenkins pipeline configuration screen with options for setting branches, repository browser, and script path. There are buttons for saving and applying changes.](https://kodekloud.com/kk-media/image/upload/v1752868909/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/jenkins-pipeline-configuration-screen-2.jpg)

---

## 3\. Running the Declarative Pipeline

After the build starts, you’ll see these stages:

1.  **Declarative: Checkout SCM** (automatic)
2.  **Echo Message**
3.  **Declarative: Post Actions**

![The image shows a Jenkins dashboard displaying the status of a pipeline named "d-v-s-pipeline," with stages like "Checkout SCM" and "Echo Message" marked as completed. The interface includes options for configuring and managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752868910/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/jenkins-dashboard-d-v-s-pipeline.jpg)

**Sample log excerpt:**

```
[Pipeline] checkout scm
 > git config core.sparsecheckout # timeout=10
[Pipeline] sh
+ echo This is executed within a DECLARATIVE Pipeline
This is executed within a DECLARATIVE Pipeline
[Pipeline] sh
+ echo This will always run
This will always run
```

Declarative pipelines handle SCM checkout and cleanup automatically.

---

## 4\. Switch to the Scripted Pipeline

1.  Return to **Configure**.
2.  Change **Script Path** to `Jenkinsfile.scripted`.
3.  Save and **Build**.

**Log excerpt:**

```
[Pipeline] stage (Echo Message)
[Pipeline] sh
+ ls -ltr
total 0
[Pipeline] sh
+ echo This is executed within a SCRIPTED Pipeline
This is executed within a SCRIPTED Pipeline
[Pipeline] sh
+ echo This will always run.
This will always run.
```

Notice: No checkout stage—only your custom steps run.

---

## 5\. Add Checkout to Scripted Pipeline

Edit **Jenkinsfile.scripted** to include `checkout scm` inside the `stage`:

```
node {
  try {
    stage('Echo Message') {
      checkout scm
      sh 'ls -ltr'
      sh 'echo "This is executed within a SCRIPTED Pipeline"'
    }
  } catch (err) {
    echo "Failed: ${err}"
  } finally {
    sh 'echo "This will always run"'
    // sh 'rm -rf *'
  }
}
```

Commit and build. You’ll now see both checkout and shell steps:

![The image shows a Jenkins dashboard displaying the status of a pipeline named "d-v-s-pipeline," with stages like "Start," "Echo Message," and "End." The interface includes options for configuring and managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752868912/notes-assets/images/Advanced-Jenkins-Demo-Declarative-vs-Scripted-Pipeline/jenkins-dashboard-dvs-pipeline-status.jpg)

**Log excerpt:**

```
[Pipeline] checkout scm
 > git fetch --tags --force --progress http://... # timeout=10
[Pipeline] sh
+ ls -ltr
total 8
-rw-r--r-- 1 jenkins jenkins 311 Nov 10 12:29 Jenkinsfile.scripted
...
```

---

## Summary of Differences

| Feature               | Declarative Pipeline            | Scripted Pipeline                |
| --------------------- | ------------------------------- | -------------------------------- |
| SCM Handling          | Implicit `checkout scm`         | Requires manual `checkout scm`   |
| Post-/Cleanup Actions | Built-in `post {}` blocks       | `try/catch/finally` in Groovy    |
| Stage Restart         | Supported out of the box        | Not supported                    |
| Syntax                | Simplified, YAML-like structure | Full Groovy with scripting power |

For seamless SCM integration, stage restarts, and easier maintenance, **Declarative Pipelines** are generally recommended.

---

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Declarative Pipeline Directive Reference](https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline)
- [Scripted Pipeline](https://www.jenkins.io/doc/book/pipeline/scripted/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/3454a17d-b4d0-4b5c-ac4b-0c8c9080aacb)**
>
> Watch video content
