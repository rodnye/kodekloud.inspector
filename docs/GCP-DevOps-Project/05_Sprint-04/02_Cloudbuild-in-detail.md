# Cloudbuild in detail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-04/Cloudbuild-in-detail)

---

## Table of Contents

- Cloudbuild in detail
  - What Is Google Cloud Build?
  - Core Features and Artifact Management
  - Scalable Build Infrastructure
  - Seamless Deployment Integrations
  - Private CI/CD in Your VPC
  - Compliance & Data Residency
  - Pricing & Simple Configuration
  - Up Next: Repository Integration & Build Triggers
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 04

# Cloudbuild in detail

Welcome to an in-depth look at **Google Cloud Build**, GCP’s fully managed, serverless CI/CD platform. In this guide, we’ll cover:

- What Cloud Build is and why teams adopt it
- Core features and artifact support
- How it scales and integrates with deployments
- Security, compliance, pricing, and configuration

## What Is Google Cloud Build?

Google Cloud Build is a serverless CI/CD service that compiles, tests, and packages your code without the overhead of provisioning or maintaining build servers. It supports multiple languages and frameworks out of the box, producing artifacts such as JARs, Docker images, Python wheels, and more.

Key benefits include:

- Rapid builds across languages like Go, Node.js, Java, Python, Ruby, and .NET
- Integration with Artifact Registry, Container Registry, and Cloud Storage
- Fine-grained IAM controls and VPC Service Controls

![The image features a number "1" and a gear icon with motion lines, accompanied by text promoting quick software building across various programming languages like Java, Go, and Node.js.](https://kodekloud.com/kk-media/image/upload/v1752875470/notes-assets/images/GCP-DevOps-Project-Cloudbuild-in-detail/quick-software-building-gear-icon.jpg)

## Core Features and Artifact Management

Cloud Build lets you:

- Build in multiple languages: Go, Node.js, Java, Python, Ruby, C#, and more
- Generate and store artifacts such as:

  | Artifact Type   | Format        | Destination                 |
  | --------------- | ------------- | --------------------------- |
  | Container Image | Docker image  | Artifact Registry, GCR      |
  | Java Package    | JAR           | Cloud Storage, Artifact Reg |
  | Python Wheel    | .whl          | Cloud Storage               |
  | Generic         | .zip, .tar.gz | Cloud Storage               |

> [!important]
> **Note**
>
> Cloud Build automatically detects Dockerfiles, Maven, and Gradle builds. You can extend support by defining custom build steps.

## Scalable Build Infrastructure

Choose from 15 virtual machine types—ranging from 1 vCPU/2 GB to 32 vCPU/128 GB—and run hundreds of parallel builds. Pay only for the build minutes you consume.

## Seamless Deployment Integrations

Once your build completes, deploy to any environment:

| Environment  | GCP Service           | Example Command                    |
| ------------ | --------------------- | ---------------------------------- |
| VMs          | Compute Engine        | `gcloud compute ssh INSTANCE -- …` |
| Serverless   | Cloud Run, App Engine | `gcloud run deploy SERVICE`        |
| Kubernetes   | GKE                   | `kubectl apply -f deployment.yaml` |
| Web & Mobile | Firebase Hosting      | `firebase deploy --only hosting`   |

![The image features the number "3" and an illustration of three rockets, accompanied by text about deploying across multiple environments like VMs, serverless, Kubernetes, or Firebase.](https://kodekloud.com/kk-media/image/upload/v1752875470/notes-assets/images/GCP-DevOps-Project-Cloudbuild-in-detail/three-rockets-deploying-multiple-environments.jpg)

## Private CI/CD in Your VPC

All build steps execute inside your private cloud network—no public internet exposure is required.

![The image features a cloud icon with "CI/CD" inside, accompanied by text promoting cloud-hosted, fully managed CI/CD workflows within a private network. It also includes the number "4" and a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752875471/notes-assets/images/GCP-DevOps-Project-Cloudbuild-in-detail/cloud-icon-cicd-private-network.jpg)

## Compliance & Data Residency

Store build logs, metadata, and artifacts in specific regions to meet data-residency and GDPR requirements. Integrate with Audit Logging for complete traceability.

## Pricing & Simple Configuration

Cloud Build uses a pay-as-you-go model. For example, a medium machine (~4 vCPU/16 GB) costs roughly **$0.003 per build minute**—often much cheaper than managing your own CI/CD servers.

Define build steps in a `cloudbuild.yaml` file using straightforward YAML syntax:

```
steps:
  - name: 'gcr.io/cloud-builders/git'
    args: ['clone', 'https://github.com/your/repo.git']
  - name: 'gcr.io/cloud-builders/mvn'
    args: ['package']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/app:$COMMIT_SHA', '.']
images:
  - 'gcr.io/$PROJECT_ID/app:$COMMIT_SHA'
```

> [!important]
> **Note**
>
> Place your `cloudbuild.yaml` in the repository root. Cloud Build auto-detects triggers once you connect a source repository.

![The image is a slide titled "Takeaways" summarizing features of a serverless CI/CD platform, highlighting no infrastructure maintenance, pricing details, and code written in YAML.](https://kodekloud.com/kk-media/image/upload/v1752875473/notes-assets/images/GCP-DevOps-Project-Cloudbuild-in-detail/serverless-cicd-platform-takeaways-slide.jpg)

## Up Next: Repository Integration & Build Triggers

Curious about connecting [GitHub](https://github.com/) to Cloud Build or configuring triggers on push, pull request, or tag events? Stay tuned for the next lesson on **Cloud Build Triggers**.

---

## Links and References

- [Google Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Artifact Registry](https://cloud.google.com/artifact-registry)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Jenkins](https://www.jenkins.io/)
- [GitHub](https://github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/f84d8c20-935f-462e-9503-94408617064a/lesson/328a5e53-90bc-4c21-8d91-61c181376a1d)**
>
> Watch video content
