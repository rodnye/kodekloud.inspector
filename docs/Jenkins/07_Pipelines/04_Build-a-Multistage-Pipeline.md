# Build a Multistage Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Pipelines/Build-a-Multistage-Pipeline)

---

## Table of Contents

- Build a Multistage Pipeline
  - Watch Video

---

## Content

Jenkins

Pipelines

# Build a Multistage Pipeline

In this tutorial, we'll demonstrate how to extend your pipeline configuration by adding a new stage. Building on our earlier configuration work, this guide explains the process of creating a multistage pipeline by introducing a second stage named "UAT."

The following steps walk you through the process:

1.  In the configuration section, copy the definition of the existing stage.
2.  Paste it below the current stage definition.
3.  Change the new stage's name to "UAT" to complete the multistage setup.

Below is the updated pipeline configuration:

```
stages {
    stage('Dev') {
        steps {
            echo 'Hello World'
        }
    }
    stage('UAT') {
        steps {
            echo 'Hello World'
        }
    }
}
```

In this configuration, two stages are defined: "Dev" and "UAT." After clicking on **Save** and then **Build Now**, you'll notice that the pipeline now displays both stages. Although previous builds (which contain only the "Dev" stage) remain in the build history, the current build accurately reflects the new multistage pipeline setup.

> [!important]
> **Remember**
>
> Ensure you save your configuration after making changes, so your new pipeline stages are correctly applied.

This enhanced setup allows you to track the evolution of your pipeline from a single stage to a comprehensive multistage workflow. The structured, repeatable stages make it easier to manage build processes and track changes over time.

Stay tuned for the next lesson where we dive deeper into advanced pipeline configurations and best practices.

For more details on pipeline management, visit our [Configuration Guide](/docs/configuration).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/4eff829b-dd2c-4051-8090-35e8525b8874/lesson/e9c7f9aa-e455-4c77-ab8d-0f5c8dfc0b95)**
>
> Watch video content
