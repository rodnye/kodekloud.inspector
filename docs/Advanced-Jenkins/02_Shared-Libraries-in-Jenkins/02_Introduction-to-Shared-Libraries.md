# Introduction to Shared Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/Introduction-to-Shared-Libraries)

---

## Table of Contents

- Introduction to Shared Libraries
  - Example: Centralizing a Welcome Message
  - Setting Up a Shared Library in Jenkins
  - Repository Structure
  - Configuring Global Pipeline Libraries
  - Using Your Shared Library
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# Introduction to Shared Libraries

Jenkins Shared Libraries enable teams to centralize **reusable Groovy scripts** and pipeline logic in a single, version-controlled repository. By defining common steps—such as notifications, build commands, or deployment tasks—you can apply the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), reduce duplication, and ensure consistency across all your CI/CD pipelines.

![The image is an overview of a "Shared Library," highlighting its benefits: encapsulating common tasks and making pipelines more concise and readable.](https://kodekloud.com/kk-media/image/upload/v1752868943/notes-assets/images/Advanced-Jenkins-Introduction-to-Shared-Libraries/shared-library-overview-benefits.jpg)

Consider a typical Jenkinsfile for a Node.js project:

```
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
```

Without a Shared Library, you’d copy and paste this snippet into every repository—leading to:

| Problem       | Impact                                 |
| ------------- | -------------------------------------- |
| Duplication   | Hard to maintain multiple Jenkinsfiles |
| Inconsistency | Different pipelines drift over time    |
| Complexity    | Updates become error-prone             |

![The image explains the benefits of using a shared library, highlighting issues like duplication, inconsistency, and complexity with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752868945/notes-assets/images/Advanced-Jenkins-Introduction-to-Shared-Libraries/shared-library-benefits-diagram.jpg)

By extracting common logic—like setup, notifications, or deployment—into a **central repository**, you get:

- Better maintainability
- Unified pipeline behavior
- Easier on-boarding for new team members

## Example: Centralizing a Welcome Message

Imagine your DevOps team wants every pipeline to greet developers:

```
pipeline {
  agent any
  stages {
    stage('Welcome') {
      steps {
        sh 'echo Welcome to the DevOps team from Dasher Organization'
      }
    }
    // ...
  }
}
```

When “Dasher” rebrands to “KodeKloud,” updating dozens of Jenkinsfiles is labor-intensive. Instead, create a `welcome.groovy` step in your Shared Library:

```
// vars/welcome.groovy
def call() {
  sh 'echo Welcome to the DevOps team from KodeKloud Organization'
}
```

Then, load and invoke this function in your Jenkinsfile:

```
@Library('kode-kloud-shared-library') _
pipeline {
  agent any
  stages {
    stage('Welcome') {
      steps {
        welcome()
      }
    }
    // ...
  }
}
```

Now, editing **one file** in the Shared Library updates every pipeline automatically.

## Setting Up a Shared Library in Jenkins

To configure a Shared Library:

1.  **Create a Git repository** dedicated to your shared steps and utilities.
2.  In Jenkins, go to **Manage Jenkins** → **Configure System** → **Global Pipeline Libraries**.
3.  Click **Add** and specify:
    - **Name**: A unique identifier (e.g., `kode-kloud-shared-library`)
    - **Default Version**: Branch or tag (e.g., `main`)
    - **Retrieval Method**: Modern SCM → Git URL
    - **Advanced Options**: Allow overriding the default version, load implicitly, etc.

> [!important]
> **Note**
>
> Make sure Jenkins has read access to your Git repository. If you use credentials, add them under **Manage Jenkins** → **Credentials**.

![The image outlines steps to set up a shared library in Jenkins, including repository setup, Jenkins configuration, and writing custom steps with Groovy functions.](https://kodekloud.com/kk-media/image/upload/v1752868946/notes-assets/images/Advanced-Jenkins-Introduction-to-Shared-Libraries/jenkins-shared-library-setup-guide.jpg)

## Repository Structure

A clear directory layout helps Jenkins locate your scripts:

```
(root)
├── src
│   └── org
│       └── foo
│           └── Bar.groovy       # Optional: compiled Groovy classes
├── vars
│   ├── welcome.groovy            # Defines the 'welcome' pipeline step
│   └── welcome.txt               # Documentation for 'welcome'
└── resources
    └── org
        └── foo
            └── bar.json          # Optional: static resource files
```

| Directory | Purpose                                                |
| --------- | ------------------------------------------------------ |
| src       | (Optional) Groovy/Java classes                         |
| vars      | **Required**: global pipeline steps (camelCase)        |
| resources | (Optional) static files accessed via `libraryResource` |

![The image shows a diagram of a shared library repository structure, detailing directories and files for Groovy source files, global variables, and resource files. It includes folders like `src`, `vars`, and `resources`, with specific files such as `Bar.groovy` and `bar.json`.](https://kodekloud.com/kk-media/image/upload/v1752868947/notes-assets/images/Advanced-Jenkins-Introduction-to-Shared-Libraries/shared-library-repository-structure.jpg)

## Configuring Global Pipeline Libraries

Once your repo is ready:

1.  **Manage Jenkins** → **Configure System** → **Global Pipeline Libraries**.
2.  **Add Library** with:
    - **Name**: `kode-kloud-shared-library`
    - **Default Version**: `main`
    - **Load implicitly** (optional)
    - **SCM**: Git URL and credentials

![The image shows a configuration screen for "Global Pipeline Libraries" with options for setting a library name, default version, and retrieval method. It includes checkboxes for options like allowing the default version to be overridden and including library changes in job recent changes.](https://kodekloud.com/kk-media/image/upload/v1752868949/notes-assets/images/Advanced-Jenkins-Introduction-to-Shared-Libraries/global-pipeline-libraries-config.jpg)

## Using Your Shared Library

In each Jenkinsfile, include the `@Library` annotation to load your shared code:

```
@Library('kode-kloud-shared-library') _
pipeline {
  agent any
  stages {
    stage('Welcome') {
      steps {
        welcome()
      }
    }
    stage('Build') {
      steps {
        // your build steps...
      }
    }
  }
}
```

The `welcome()` step now references `vars/welcome.groovy` from your Shared Library, keeping pipelines concise and maintainable.

## Links and References

- [Jenkins Pipeline Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Groovy Documentation](https://groovy-lang.org/)
- [Git SCM](https://git-scm.com/)
- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/8a6eb6c9-043f-4db3-ab3c-dce38e2f3f1e)**
>
> Watch video content
