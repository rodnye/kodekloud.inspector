# Utilize Kubernetes Pod as Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Utilize-Kubernetes-Pod-as-Agent)

---

## Table of Contents

- Utilize Kubernetes Pod as Agent
  - Prerequisites
  - 1. Create a New Pipeline Job
  - 2. Define a Basic Kubernetes Agent
  - 3. Inline Pod Template with YAML
  - 4. Run the Pipeline
  - 5. Default Cloud & Advanced Configuration
  - 6. Example: Multiple Containers
  - 7. Inspecting Pods and Events
  - Conclusion
  - Links and References
  - Watch Video
    - Select a Specific Cloud and Namespace

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Utilize Kubernetes Pod as Agent

In this guide, you’ll learn how to run Jenkins build agents inside Kubernetes Pods using a Declarative Pipeline. We assume you have already installed and configured the [Kubernetes plugin for Jenkins](https://plugins.jenkins.io/kubernetes).

## Prerequisites

- A running Jenkins instance with the Kubernetes plugin installed
- Access to a Kubernetes cluster and proper credentials configured under **Manage Jenkins → Configure System → Cloud → Kubernetes**

> [!important]
> **Note**
>
> Make sure your Jenkins service account has permissions to create and delete Pods in the target namespace.

---

## 1\. Create a New Pipeline Job

1.  Open the **Jenkins Dashboard** and click **New Item**.
2.  Enter a name, for example `k8s-cloud-agent-demo`, and select **Pipeline**.
3.  Scroll to the **Pipeline** section, choose **Pipeline script**, then pick the **Declarative Kubernetes** sample.

![The image shows a Jenkins interface where a user is creating a new item named "k8s-cloud-agent-demo." Various project types like Freestyle project, Pipeline, Multi-configuration project, and Folder are listed as options.](https://kodekloud.com/kk-media/image/upload/v1752868785/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-new-item-k8s-cloud-agent.jpg)

---

## 2\. Define a Basic Kubernetes Agent

The default Declarative example includes an `agent` block with `containerTemplate`. To get started quickly, simplify it to print the Pod’s hostname:

```
pipeline {
  agent { kubernetes {
    containerTemplate {
      name 'shell'
      image 'ubuntu'
      command 'sleep'
      args 'infinity'
    }
  } }
  stages {
    stage('Print Hostname') {
      steps {
        sh 'hostname'
        sh 'sleep 120s'
      }
    }
  }
}
```

To focus further, remove the `containerTemplate` and let Jenkins use defaults:

```
pipeline {
  agent { kubernetes { } }
  stages {
    stage('Print Hostname') {
      steps {
        sh 'hostname'
        sh 'sleep 120s'
      }
    }
  }
}
```

By default, Pods are deleted after the build completes (`podRetention: Never`).

![The image shows a configuration screen for a Jenkins cloud setup, with options for pod retention, maximum connections to the Kubernetes API, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752868786/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-cloud-setup-configuration.jpg)

> [!important]
> **Warning**
>
> With the default retention policy (`Never`), Pods are removed immediately after each build. Disable or adjust this if you need to debug post-build.

---

## 3\. Inline Pod Template with YAML

For more control, define your Pod in YAML directly within the pipeline:

```
pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu
    command:
    - sleep
    args:
    - infinity
'''
    }
  }
  stages {
    stage('Print Hostname') {
      steps {
        sh 'hostname'
      }
    }
  }
}
```

You can also reference an external Pod template file in multibranch pipelines:

```
agent {
  kubernetes {
    yamlFile 'jenkins-pod.yaml'
  }
}
```

Global Pod templates can be managed under **Manage Jenkins → Kubernetes**.

![The image shows a Jenkins interface for managing pod templates, with an option to add a new pod template.](https://kodekloud.com/kk-media/image/upload/v1752868788/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-pod-templates-interface.jpg)

---

## 4\. Run the Pipeline

1.  Save the Pipeline script.
2.  Click **Build Now**.

Jenkins will provision a Kubernetes Pod based on your definition. In the console output, look for Pod creation logs and your hostname:

```
[Pipeline] sh
jenkins-agent-abc123
[Pipeline] // sh
```

![The image shows a Jenkins console output screen displaying details of a pipeline execution, including the creation of a Kubernetes pod.](https://kodekloud.com/kk-media/image/upload/v1752868789/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-console-output-pipeline-kubernetes.jpg)

---

## 5\. Default Cloud & Advanced Configuration

If you don't specify a `cloud` in the `agent` block, Jenkins selects the first available Kubernetes cloud. You can view options in the Declarative Directive Generator:

```
agent {
  kubernetes {
    // ...
  }
}
```

![The image shows a Jenkins interface with the "Declarative Directive Generator" open, allowing users to generate pipeline code. A dropdown menu is visible, offering options for running agents, including Docker and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752868790/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-declarative-directive-generator.jpg)

### Select a Specific Cloud and Namespace

```
pipeline {
  agent {
    kubernetes {
      cloud 'dasher-prod-k8s-us-east'
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu
    command:
    - sleep
    args:
    - infinity
'''
    }
  }
  stages {
    stage('Print Hostname') {
      steps {
        sh 'hostname'
      }
    }
  }
}
```

![The image shows a Jenkins configuration interface for setting up a Kubernetes agent, with options for selecting the cloud, namespace, and default container.](https://kodekloud.com/kk-media/image/upload/v1752868792/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-kubernetes-agent-configuration.jpg)

---

## 6\. Example: Multiple Containers

Define multiple containers in the same Pod to run different tools per stage:

```
pipeline {
  agent {
    kubernetes {
      cloud 'dasher-prod-k8s-us-east'
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu
    command:
    - sleep
    args:
    - infinity
  - name: node-container
    image: node:18-alpine
    command:
    - cat
    tty: true
'''
    }
  }
  stages {
    stage('Print Hostname') {
      steps {
        sh 'hostname'
      }
    }
    stage('Print Node Version') {
      steps {
        container('node-container') {
          sh 'node -v'
          sh 'npm -v'
        }
      }
    }
  }
}
```

If you omit `container('node-container')`, the Node.js commands default to `ubuntu-container` and will fail.

![The image shows a Jenkins dashboard with a pipeline named "k8s-cloud-agent-demo," displaying the status of two builds with stages like "Print Hostname" and "Print Node Version." The sidebar includes options like "Build Now," "Configure," and "Open Blue Ocean."](https://kodekloud.com/kk-media/image/upload/v1752868793/notes-assets/images/Advanced-Jenkins-Utilize-Kubernetes-Pod-as-Agent/jenkins-dashboard-k8s-pipeline-status.jpg)

---

## 7\. Inspecting Pods and Events

During a build, you can inspect Pods and events with `kubectl`:

```
# List Jenkins agent Pods
kubectl -n jenkins get pods


# View Pod lifecycle events
kubectl -n jenkins get events
```

You’ll see scheduling, image pull, start, and termination events for each container.

---

## Conclusion

Leveraging Kubernetes Pods as Jenkins agents in Declarative Pipelines offers:

- **Custom environments per stage** (e.g., Ubuntu, Node.js)
- **Ephemeral build agents** that spin up and down automatically
- **Inline YAML definitions** or external templates for reusable configurations

Start defining your CI/CD workloads with fine-grained control over tools and dependencies!

---

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Jenkins Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Declarative Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/e1687734-24d9-4f9a-8706-97f6a20cc59f)**
>
> Watch video content
