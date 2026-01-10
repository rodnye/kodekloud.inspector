# Stash and Unstash - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Enhancement-and-Caching/Stash-and-Unstash)

---

## Table of Contents

- Stash and Unstash
  - When to Use Stash-and-Unstash
  - Generating the stash Snippet
  - Adding stash to Your Jenkinsfile
  - Comparing stash and unstash
  - Using unstash in a Downstream Stage
  - References
  - Watch Video
    - Before
    - After

---

## Content

Advanced Jenkins

Pipeline Enhancement and Caching

# Stash and Unstash

In this lesson, you’ll learn how to use Jenkins’ `stash` and `unstash` directives to preserve files between stages in the same pipeline run. By default, stashed files are discarded at the end of the run. However, with the [Declarative Pipeline `preserveStashes` option](https://www.jenkins.io/doc/book/pipeline/syntax/#options) or the **Pipeline: Durable Task** plugin, you can retain them across a restart. Once stashed, files can be unstashed by name in any other stage—even on a different node.

![The image shows a webpage from the Jenkins documentation, specifically detailing the "stash" function used in pipeline builds. It includes a sidebar with links to various sections of the user handbook and tutorials.](https://kodekloud.com/kk-media/image/upload/v1752868901/notes-assets/images/Advanced-Jenkins-Stash-and-Unstash/jenkins-stash-function-documentation.jpg)

> [!important]
> **Note**
>
> Use unique stash names to avoid collisions when multiple modules or artifacts are stashed in the same build.

## When to Use Stash-and-Unstash

Consider a pipeline where your first stage installs Node.js dependencies, but a later stage runs on a different agent or container that can’t simply re-run `npm install` due to caching permissions or filesystem errors:

```
+ npm install --no-audit --cache .
npm ERR! code ENOTEMPTY
npm ERR! syscall rename
npm ERR! path /var/lib/jenkins/workspace/lar-system_feature_advanced-demo/node_modules/chai
npm ERR! dest /var/lib/jenkins/workspace/lar-system_feature_advanced-demo/node_modules/.chai-5ivncL6v
npm ERR! errno -39
npm ERR! ENOTEMPTY: directory not empty, rename '/var/lib/jenkins/workspace/lar-system_feature_advanced-demo/node_modules/chai' -> '/var/lib/jenkins/workspace/lar-system_feature_advanced-demo/logs/...-debug-0.log'
script returned exit code 217
```

To work around this, stash the entire `node_modules` folder after installation, then unstash it in any downstream stage.

## Generating the `stash` Snippet

1.  Go to **[Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)** in your Jenkins instance.
2.  Select **stash** from the “Steps” dropdown.
3.  Fill in a unique **Name** (e.g. `solar-system-node-modules`) and an **Includes** pattern (`node_modules/`).
4.  Click **Generate Pipeline Script**.

![The image shows a Jenkins interface with the "Snippet Generator" for creating pipeline scripts. It includes options for configuring a stash step with fields for name, includes, and excludes.](https://kodekloud.com/kk-media/image/upload/v1752868902/notes-assets/images/Advanced-Jenkins-Stash-and-Unstash/jenkins-snippet-generator-pipeline.jpg)

The generated snippet is:

```
stash includes: 'node_modules/', name: 'solar-system-node-modules'
```

## Adding `stash` to Your Jenkinsfile

Here’s a simple Declarative Pipeline before and after integrating the `stash` step:

### Before

```
pipeline {
  agent any
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'node -v'
        sh 'npm install --no-audit'
      }
    }
    stage('Dependency Scanning') {
      steps {
        // ...
      }
    }
  }
}
```

### After

```
pipeline {
  agent any
  options {
    timestamps()
  }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'node -v'
        sh 'npm install --no-audit'
        stash includes: 'node_modules/', name: 'solar-system-node-modules'
      }
    }
    stage('Dependency Scanning') {
      steps {
        // ...
      }
    }
  }
}
```

When this pipeline runs, you’ll see:

```
[Pipeline] stash
Stashed 4898 files
```

## Comparing `stash` and `unstash`

| Directive | Purpose                              | Example                                            |
| --------- | ------------------------------------ | -------------------------------------------------- |
| stash     | Saves files/folders for later stages | `stash includes: 'node_modules/', name: 'modules'` |
| unstash   | Restores previously stashed content  | `unstash 'modules'`                                |

## Using `unstash` in a Downstream Stage

In any later stage—regardless of agent or node—you can restore the stashed files instead of reinstalling:

```
pipeline {
  agent any
  stages {
    stage('NodeJS 20') {
      agent {
        // e.g. run in a Docker container or Kubernetes pod
      }
      stages {
        stage('Install Dependencies') {
          options {
            retry(2)
          }
          steps {
            sh 'node -v'
            // Restore the stash instead of npm install
            unstash 'solar-system-node-modules'
          }
        }
        stage('Testing') {
          steps {
            // Run tests against the restored node_modules
          }
        }
      }
    }
  }
}
```

After committing and pushing, the build log shows both operations:

![The image shows a Jenkins pipeline interface for a project named "solar-system" under the "Gitea-Organization," displaying various stages like installing dependencies, unit testing, and building a Docker image. The pipeline is for the branch "feature/advanced-demo" and includes details about the commit and execution time.](https://kodekloud.com/kk-media/image/upload/v1752868903/notes-assets/images/Advanced-Jenkins-Stash-and-Unstash/jenkins-pipeline-solar-system-feature.jpg)

```
[Pipeline] stash
Stashed 4898 files successfully for later use


[Pipeline] unstash
Restored files from stash 'solar-system-node-modules'
```

Both install and test stages complete successfully—even on different agents—because the `node_modules` directory was preserved via `stash`.

> [!important]
> **Warning**
>
> Stashes are scoped to a single pipeline run. Without `preserveStashes`, all stashes are discarded when the pipeline finishes. Ensure you enable the appropriate option if you need stash data after a pipeline restart.

---

Using `stash` and `unstash` in Jenkins pipelines lets you save and reuse any files or folders across stages and agents—ideal for large dependency trees, build artifacts, or generated assets.

## References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Declarative Pipeline Options](https://www.jenkins.io/doc/book/pipeline/syntax/#options)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/e5f94d8d-0d7c-40c9-9d00-5c52a1bbf099)**
>
> Watch video content
