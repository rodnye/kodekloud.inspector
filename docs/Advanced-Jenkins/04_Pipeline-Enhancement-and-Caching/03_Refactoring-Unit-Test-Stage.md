# Refactoring Unit Test Stage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Enhancement-and-Caching/Refactoring-Unit-Test-Stage)

---

## Table of Contents

- Refactoring Unit Test Stage
  - Table of Contents
  - Pipeline Configuration with Kubernetes Agent
  - Sequential Unit Testing and Coverage
  - Parallel Testing Across Node.js Versions
  - Diagnosing the Node.js 20 Failure
  - Installing Dependencies in Node.js 20 Stage
  - Next Steps and Further Reading
  - Links and References
  - Watch Video
    - Pipeline Snippet
    - Agent and Container Matrix
    - Option 1: Inline npm install
    - Option 2: Separate Install Step in Parallel Stage

---

## Content

Advanced Jenkins

Pipeline Enhancement and Caching

# Refactoring Unit Test Stage

In this tutorial, we'll refactor the **Unit Test** stage of a Jenkins pipeline to run tests across multiple Node.js versions—18, 19, and 20—using Kubernetes agents and Docker containers. This approach improves reliability and ensures compatibility before merging changes.

## Table of Contents

- [Pipeline Configuration with Kubernetes Agent](#pipeline-configuration-with-kubernetes-agent)
- [Sequential Unit Testing and Coverage](#sequential-unit-testing-and-coverage)
- [Parallel Testing Across Node.js Versions](#parallel-testing-across-nodejs-versions)
  - [Pipeline Snippet](#pipeline-snippet)
  - [Agent and Container Matrix](#agent-and-container-matrix)
- [Diagnosing the Node.js 20 Failure](#diagnosing-the-nodejs-20-failure)
- [Installing Dependencies in Node.js 20 Stage](#installing-dependencies-in-nodejs-20-stage)
- [Next Steps and Further Reading](#next-steps-and-further-reading)

---

## Pipeline Configuration with Kubernetes Agent

Below is an excerpt from the original `Jenkinsfile` that configures a Kubernetes agent, Node.js tool, and necessary environment variables:

```
@Library('dasher-trusted-shared-library@featureTrivyScan') _
pipeline {
  agent {
    kubernetes {
      cloud 'dasher-prod-k8s-us-east'
      yamlFile 'k8s-agent.yaml'
      defaultContainer 'node-18'
    }
  }
  tools {
    nodejs 'nodejs-22-6-0'
  }
  environment {
    MONGO_URI        = "mongodb://srv-cluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS   = credentials('mongo-db-credentials')
    MONGO_USERNAME   = credentials('mongo-db-username')
    MONGO_PASSWORD   = credentials('mongo-db-password')
  }
  // ...
}
```

> [!important]
> **Note**
>
> Adjust `yamlFile` and `defaultContainer` to match your Kubernetes Pod specification.

---

## Sequential Unit Testing and Coverage

Originally, the pipeline ran **Unit Testing** and **Code Coverage** sequentially on Node.js 18:

```
stage('Unit Testing') {
  options { retry(2) }
  steps {
    sh 'node -v'
    sh 'npm test'
  }
}

stage('Code Coverage') {
  steps {
    catchError(buildResult: 'SUCCESS',
               message: 'Coverage will be fixed in future releases',
               stageResult: 'UNSTABLE') {
      sh 'node -v'
      sh 'npm run coverage'
    }
  }
}
```

While straightforward, this setup doesn’t validate compatibility with newer Node.js versions.

---

## Parallel Testing Across Node.js Versions

To ensure your application works on Node.js 18, 19, and 20, we can run tests in parallel branches. This refactoring includes:

- **Installing dependencies** once on the Kubernetes agent
- **Running dependency scanning** (e.g., Snyk, Trivy)
- **Testing in parallel** across multiple Node.js versions
- **Aggregating code coverage**

### Pipeline Snippet

```
pipeline {
  agent {
    kubernetes {
      cloud 'dasher-prod-k8s-us-east'
      yamlFile 'k8s-agent.yaml'
      defaultContainer 'node-18'
    }
  }
  tools {
    nodejs 'nodejs-22-6-0'
  }
  environment {
    MONGO_URI          = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS     = credentials('mongo-db-credentials')
    MONGO_USERNAME     = credentials('mongo-db-username')
    MONGO_PASSWORD     = credentials('mongo-db-password')
    SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
    GITEA_TOKEN        = credentials('gitea-api-token')
  }
  options {
    disableResume()
    disableConcurrentBuilds(abortPrevious: true)
  }
  stages {
    stage('Installing Dependencies') {
      options { timestamps() }
      steps {
        sh 'node -v'
        sh 'npm install --no-audit'
      }
    }

    stage('Dependency Scanning') {
      parallel {
        // e.g., Trivy, Snyk, OWASP Dependency Check
      }
    }

    stage('Unit Testing') {
      parallel {
        stage('NodeJS 18') {
          options { retry(2) }
          steps {
            sh 'node -v'
            sh 'npm test'
          }
        }

        stage('NodeJS 19') {
          options { retry(2) }
          steps {
            container('node-19') {
              // Sleep to avoid port conflicts on shared volumes
              sh 'sleep 10s'
              sh 'node -v'
              sh 'npm test'
            }
          }
        }

        stage('NodeJS 20') {
          agent {
            docker { image 'node:20-alpine' }
          }
          options { retry(2) }
          steps {
            // npm install will be added here
            sh 'node -v'
            sh 'npm test'
          }
        }
      }
    }

    stage('Code Coverage') {
      steps {
        catchError(buildResult: 'SUCCESS',
                   message: 'Coverage will be fixed in future releases',
                   stageResult: 'UNSTABLE') {
          sh 'node -v'
          sh 'npm run coverage'
        }
      }
    }
  }
}
```

### Agent and Container Matrix

| Stage        | Environment          | Container/Agent         | Purpose                                  |
| ------------ | -------------------- | ----------------------- | ---------------------------------------- |
| Dependencies | Kubernetes Pod       | `node-18`               | Install `node_modules` via `npm install` |
| Scanning     | Kubernetes Pod       | `node-18`               | Security and license scanning            |
| NodeJS 18    | Kubernetes Pod       | `node-18`               | Default Node.js                          |
| NodeJS 19    | Kubernetes Pod       | `node-19` container     | Verify compatibility with v19            |
| NodeJS 20    | Docker-in-Docker Pod | `node:20-alpine` Docker | Validate on latest LTS                   |
| Coverage     | Kubernetes Pod       | `node-18`               | Generate and publish code coverage       |

---

## Diagnosing the Node.js 20 Failure

After pushing the refactored `Jenkinsfile`, the **NodeJS 20** branch failed:

```
+ node -v
v20.18.0
+ npm test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit
sh: mocha: not found
script returned exit code 127
```

> [!important]
> **Warning**
>
> The Docker container `node:20-alpine` starts with a clean filesystem—it doesn’t have your `node_modules`. Always install dependencies inside each container or agent before running tests.

---

## Installing Dependencies in Node.js 20 Stage

### Option 1: Inline `npm install`

Add `npm install` directly before running tests in the NodeJS 20 branch:

```
stage('NodeJS 20') {
  agent {
    docker { image 'node:20-alpine' }
  }
  options { retry(2) }
  steps {
    sh 'npm install'
    sh 'node -v'
    sh 'npm test'
  }
}
```

### Option 2: Separate Install Step in Parallel Stage

Alternatively, include installation as part of the **Unit Testing** parallel stage:

```
stage('Unit Testing') {
  parallel {
    // NodeJS 18 and 19 as before...

    stage('NodeJS 20') {
      agent {
        docker { image 'node:20-alpine' }
      }
      options { retry(2) }
      steps {
        sh 'npm install'
        sh 'node -v'
        sh 'npm test'
      }
    }
  }
}
```

Both ensure that each parallel branch has its own `node_modules` prior to execution.

---

## Next Steps and Further Reading

- Explore adding **test result archiving** with `junit` plugin.
- Integrate **SonarQube** for code quality reporting.
- Consider **dynamic matrix stages** for other runtimes (e.g., Node.js 21+).

## Links and References

- [Jenkins Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Node.js Docker Official Images](https://hub.docker.com/_/node)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Mocha Testing Framework](https://mochajs.org/)

---

That completes the refactoring of the Unit Test stage to support parallel testing across multiple Node.js versions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/bf5c477b-b0e2-4cd6-9380-afed8ed82060)**
>
> Watch video content
