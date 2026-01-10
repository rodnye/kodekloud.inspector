# Scripted Pipeline Initialize - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Structure-and-Scripted-vs-Declarative/Scripted-Pipeline-Initialize)

---

## Table of Contents

- Scripted Pipeline Initialize
  - 1. Create a New Branch
  - 2. Scripted Pipeline Overview
  - 3. Trigger and Verify Builds
  - 4. Complete Scripted Jenkinsfile
  - Links and References
  - Watch Video
    - 2.1 Configure Node.js Tool
    - 2.2 Pipeline Options Reference

---

## Content

Advanced Jenkins

Pipeline Structure and Scripted vs Declarative

# Scripted Pipeline Initialize

In this guide, we’ll convert a Declarative Pipeline into a Scripted Pipeline while retaining:

- Caching
- Timestamps
- Concurrent-build protection
- Node.js tool configuration

We start from the **Solar System** repository on branch `feature/advanced-demo`, which currently has this Declarative Pipeline:

```
@Library('dasher-trusted-shared-library@featureTrivyScan') _
pipeline {
    agent {
        tools {
            nodejs 'nodejs-22-6-0'
        }
    }
    environment {
        GITEA_TOKEN = credentials('gitea-api-token')
    }
    options {
        disableResume()
        disableConcurrentBuilds abortPrevious: true
    }
    stages {
        stage('Installing Dependencies') {
            agent any
            options { timestamps() }
            steps {
                cache(maxCacheSize: 550, caches: [
                    arbitraryFileCache(
                        cacheName: 'npm-dependency-cache',
                        cacheValidityDecidingFile: 'package-lock.json'
                    )
                ])
            }
        }
    }
}
```

## 1\. Create a New Branch

Create a feature branch to hold your Scripted Pipeline:

```
git checkout -b pipeline/scripted
```

## 2\. Scripted Pipeline Overview

In Scripted Pipelines, everything is wrapped in a single `node { … }` block. You must configure:

- Tools via `tool`
- Environment variables
- Job properties (e.g., `disableConcurrentBuilds`)
- Checkout
- `wrap` for timestamps
- `cache` for dependency caching

### 2.1 Configure Node.js Tool

According to the [Node.js plugin documentation](https://plugins.jenkins.io/nodejs/), set `env.NODEJS_HOME` and update `PATH`:

```
node {
    // 1. Tool configuration
    env.NODEJS_HOME = tool 'nodejs-22-6-0'
    env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"


    // 2. Prevent overlapping builds
    properties([
        disableConcurrentBuilds(abortPrevious: true)
    ])


    // 3. Source code checkout
    stage('Checkout') {
        checkout scm
    }


    // 4. Install dependencies with timestamps + cache
    wrap([$class: 'TimestampWrapper']) {
        stage('Installing Dependencies') {
            cache(maxCacheSize: 550, caches: [
                arbitraryFileCache(
                    cacheName: 'npm-dependency-cache',
                    cacheValidityDecidingFile: 'package-lock.json'
                )
            ])
        }
    }
}
```

> [!important]
> **Note**
>
> Use `properties([...])` in Scripted Pipelines to set job-level options like `disableConcurrentBuilds` instead of the `options {}` block in Declarative.

### 2.2 Pipeline Options Reference

Consult the [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/) guide for more options you can apply in Scripted Pipelines under **options** (e.g., `buildDiscarder`, `retry`, `timestamps`).

![The image shows a webpage from the Jenkins documentation, specifically detailing available options for pipeline syntax, such as `buildDiscarder` and `disableConcurrentBuilds`. The page includes a navigation menu on the left.](https://kodekloud.com/kk-media/image/upload/v1752868913/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Initialize/jenkins-pipeline-syntax-options.jpg)

## 3\. Trigger and Verify Builds

After committing and pushing your new `Jenkinsfile` on `pipeline/scripted`, Jenkins will:

1.  Run a **Checkout** stage without timestamps
2.  Run **Installing Dependencies** with timestamps
3.  Miss the cache on the first build (installs packages)
4.  Store cache for subsequent runs

Start two builds in quick succession. The first will be **aborted** (superseded) and the second will **restore from cache**. Check the build history to confirm this behavior.

![The image shows a Jenkins pipeline interface with three build stages, each displaying progress from "Start" to "End," and a build history on the left. The interface includes details about recent builds and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752868914/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-Initialize/jenkins-pipeline-build-stages-interface.jpg)

## 4\. Complete Scripted `Jenkinsfile`

```
node {
    // 1. Tool configuration
    env.NODEJS_HOME = tool 'nodejs-22-6-0'
    env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"


    // 2. Disable concurrent builds
    properties([
        disableConcurrentBuilds(abortPrevious: true)
    ])


    // 3. Checkout
    stage('Checkout') {
        checkout scm
    }


    // 4. Install dependencies with timestamps + cache
    wrap([$class: 'TimestampWrapper']) {
        stage('Installing Dependencies') {
            cache(maxCacheSize: 550, caches: [
                arbitraryFileCache(
                    cacheName: 'npm-dependency-cache',
                    cacheValidityDecidingFile: 'package-lock.json'
                )
            ])
        }
    }
}
```

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Node.js Plugin](https://plugins.jenkins.io/nodejs/)
- [Jenkins Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/e5f354b5-63eb-4598-90e5-70e7a9de976f)**
>
> Watch video content
