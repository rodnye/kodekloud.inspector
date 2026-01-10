# What is CICD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Prerequisites/What-is-CICD)

---

## Table of Contents

- What is CICD
  - Continuous Integration (CI)
  - Continuous Delivery and Continuous Deployment (CD)
  - Watch Video
    - Continuous Delivery
    - Continuous Deployment

---

## Content

Jenkins

Prerequisites

# What is CICD

In this lesson, we explore the fundamentals of CI/CD—Continuous Integration and Continuous Deployment/Delivery. These practices have become essential in modern software development, ensuring efficient code packaging, testing, and deployment across various environments, including serverless functions ([AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda), Azure Functions), virtual machines, Docker containers, or on-premises systems.

## Continuous Integration (CI)

Continuous Integration (CI) is the process that takes code from a version control system, compiles it, packages it, and prepares it for deployment. Think of CI as assembling a gift:

1.  Code components, like parts of a gift, are received from the version control repository.
2.  These components are assembled using various tools, similar to using a screwdriver for putting parts together.
3.  Once assembled, the code is wrapped up into a deployable package.

During CI, automated tests (unit tests, integration tests, and security checks) validate that the code meets quality and dependency standards before moving to the next stage.

![The image illustrates a Continuous Integration and Continuous Delivery/Deployment (CI/CD) process, showing code, packaging, and deployment stages with icons representing each step.](https://kodekloud.com/kk-media/image/upload/v1752880100/notes-assets/images/Jenkins-What-is-CICD/frame_40.jpg)

After the packaging phase, the code moves into the CD pipeline. In CI, testing ensures that each build is robust and ready for further processing.

![The image illustrates Continuous Integration (CI) with icons representing code and a package, connected by an arrow.](https://kodekloud.com/kk-media/image/upload/v1752880101/notes-assets/images/Jenkins-What-is-CICD/frame_50.jpg)

![The image illustrates the concept of Continuous Integration (CI) using a rocket assembly metaphor, showing stages from parts to a complete, packaged rocket.](https://kodekloud.com/kk-media/image/upload/v1752880106/notes-assets/images/Jenkins-What-is-CICD/frame_90.jpg)

![The image illustrates key components of Continuous Integration (CI), including code testing (unit and integration tests) and security checks, with visual indicators of successful completion.](https://kodekloud.com/kk-media/image/upload/v1752880111/notes-assets/images/Jenkins-What-is-CICD/frame_170.jpg)

## Continuous Delivery and Continuous Deployment (CD)

Once the code is packaged and tested in the CI stage, the next phase is deployment. This stage, known as Continuous Delivery (or Continuous Deployment), involves delivering the packaged code to a target environment, which could be serverless, containerized, a virtual machine, or on-premises hardware.

Imagine the packaged code as a wrapped gift that needs to be delivered to its recipient. This delivery represents the CD phase.

There are two primary approaches within the CD process:

### Continuous Delivery

With Continuous Delivery, the deployment package is complete and fully tested, but releasing it to production requires manual approval. For instance, after the CI process concludes, an operator might log into [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) or another CI/CD tool and click a button to deploy the code. This method combines automation (packaging and testing) with a human decision step before production rollout.

![The image compares Continuous Delivery and Continuous Deployment, highlighting a manual approval step in Continuous Delivery, absent in Continuous Deployment.](https://kodekloud.com/kk-media/image/upload/v1752880112/notes-assets/images/Jenkins-What-is-CICD/frame_290.jpg)

### Continuous Deployment

Continuous Deployment takes automation one step further by removing the manual approval. When code is pushed to a repository like GitHub, every successful commit that passes all automated tests is immediately deployed to the target environment. This approach minimizes delays and reduces the risk of manual errors.

A critical aspect of Continuous Deployment is ensuring secure authentication with deployment targets (such as AWS or Azure) and running post-deployment tests to verify that the application operates correctly.

![The image illustrates key components of Continuous Deployment (CD), including authentication, cloud services (AWS, Azure), and testing processes.](https://kodekloud.com/kk-media/image/upload/v1752880114/notes-assets/images/Jenkins-What-is-CICD/frame_400.jpg)

> [!important]
> **Note**
>
> Both Continuous Delivery and Continuous Deployment streamline the software release process, but the choice between them depends on your organization’s requirements for automation and manual oversight.

This lesson provided an overview of the CI/CD process, detailing the role of Continuous Integration and the differences between Continuous Delivery and Continuous Deployment. In upcoming lessons, we will dive deeper into these concepts and explore advanced implementation strategies.

Thank you for reading, and see you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/bdecbf7a-016d-4b60-9731-1cdaaddb3e3c/lesson/7042dcbd-f254-4601-a08a-969df70e9e7f)**
>
> Watch video content
