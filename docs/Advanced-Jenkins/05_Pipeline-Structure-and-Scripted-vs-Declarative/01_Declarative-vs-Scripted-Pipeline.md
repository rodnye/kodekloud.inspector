# Declarative vs Scripted Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Structure-and-Scripted-vs-Declarative/Declarative-vs-Scripted-Pipeline)

---

## Table of Contents

- Declarative vs Scripted Pipeline
  - Scripted Pipelines
  - Declarative Pipelines
  - Side-by-Side Comparison
  - How to Choose
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Pipeline Structure and Scripted vs Declarative

# Declarative vs Scripted Pipeline

In Jenkins, you define CI/CD workflows in a `Jenkinsfile` using one of two pipeline syntaxes: **declarative** or **scripted**. Both leverage Apache Groovy, support [Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/), and run on the same pipeline engine. However, they vary in structure, complexity, flexibility, and ease of onboarding.

---

## Scripted Pipelines

Scripted Pipelines are written as full Groovy programs. They expose the entire Groovy language, providing unmatched control over flow, logic, and DSL extension.

```
node {
  stage('Build') {
    sh 'mvn clean package'
  }
  if (env.BRANCH_NAME == 'main') {
    stage('Deploy') {
      sh 'kubectl apply -f deploy.yaml'
    }
  }
}
```

- Define stages, steps, and logic purely in Groovy.
- Implement loops, conditionals, and custom functions.
- Access any Groovy library or third-party plugin.

> [!important]
> **Note**
>
> Scripted Pipelines are ideal when you need fine-grained control or have advanced Groovy logic.

---

## Declarative Pipelines

Declarative Pipelines use a structured, block-oriented syntax that enforces a consistent layout and validates your pipeline before execution.

```
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean package'
      }
    }
    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh 'kubectl apply -f deploy.yaml'
      }
    }
  }
}
```

- Follows an **opinionated** structure (`pipeline {}`, `agent {}`, `stages {}`).
- Provides built-in validation, error checking, and [post actions](https://www.jenkins.io/doc/book/pipeline/syntax/#post).
- Simplifies onboarding and reduces boilerplate.

> [!important]
> **Warning**
>
> Complex dynamic stages or intricate conditional logic may require embedded scripted blocks.

---

## Side-by-Side Comparison

| Feature        | Scripted Pipeline            | Declarative Pipeline                 |
| -------------- | ---------------------------- | ------------------------------------ |
| Syntax         | Full Groovy                  | Block-based Groovy                   |
| Validation     | Runtime only                 | Pre-execution validation             |
| Flexibility    | Maximum                      | Opinionated, moderate                |
| Learning Curve | Steeper (Groovy proficiency) | Gentler (pipeline structure)         |
| Ideal Use Case | Custom DSLs, complex logic   | Standard workflows, team conventions |

---

## How to Choose

- **Scripted Pipelines**
  - When your team is proficient in Groovy.
  - If you need dynamic stage generation or intricate logic.
  - For creating custom pipeline DSLs.

- **Declarative Pipelines**
  - When readability and consistency matter most.
  - For fast onboarding of new team members.
  - When you prefer built-in validation and standardized steps.

---

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Groovy Documentation](https://groovy-lang.org/documentation.html)
- [Jenkins Declarative vs. Scripted](https://www.jenkins.io/doc/book/pipeline/development/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/5135bbe9-5085-411c-8214-f168c02fde3f)**
>
> Watch video content
