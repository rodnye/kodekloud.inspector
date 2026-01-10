# Image Promotions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Image-Promotions)

---

## Table of Contents

- Image Promotions
  - Environment Isolation and Traditional Workflows
  - Benefits of DTR Image Promotion
  - How DTR Image Promotion Works
  - Configuring Image Promotion in DTR
  - Next Steps
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Image Promotions

In modern CI/CD pipelines, ensuring consistency across environments is critical. Docker Trusted Registry (DTR) enables you to **build once** and **promote** the identical Docker image through dev, test, staging, and production—eliminating rebuilds and version drift.

## Environment Isolation and Traditional Workflows

Organizations often isolate each deployment stage:

- Separate clusters or infrastructure for dev, test, staging, and prod
- Distinct Docker registries or accounts per environment

A typical multi-stage pipeline without image promotion:

1.  Build the Docker image in **development**
2.  Deploy and test
3.  Push code to **test**, triggering a fresh build
4.  Deploy in test; repeat build-deploy in **staging**
5.  Rebuild and deploy in **production**

> [!important]
> **Warning**
>
> Rebuilding at each stage can introduce unintended changes—updated package versions, OS patches, or dependency drift—undermining the reproducibility of your pipeline.

| Stage       | Action                 | Drawback                         |
| ----------- | ---------------------- | -------------------------------- |
| Development | Build & initial test   | Unique image per build           |
| Test        | New build & deploy     | Version drift risk               |
| Staging     | Fresh rebuild & deploy | Slow feedback loop               |
| Production  | Final rebuild & deploy | Inconsistent with earlier stages |

![The image illustrates a "Development Pipeline" with four stages: Dev, Test, Stage, and Prod, each represented by a globe icon and a URL.](https://kodekloud.com/kk-media/image/upload/v1752873963/notes-assets/images/Docker-Certified-Associate-Exam-Course-Image-Promotions/development-pipeline-four-stages.jpg)

## Benefits of DTR Image Promotion

By leveraging DTR promotions, you gain:

- Single build for all environments
- Guaranteed consistency (same image by digest)
- Faster pipeline throughput
- Simplified auditing and traceability

## How DTR Image Promotion Works

1.  **Build once** in development and push to your dev repository.
2.  DTR automatically **promotes** that exact image (tag or digest) to test.
3.  After tests pass, the same image is promoted to staging.
4.  Upon approval, it moves to production—no rebuilds required.

> [!important]
> **Note**
>
> Image promotion preserves the original digest, ensuring the exact artifact tested in QA reaches production.

## Configuring Image Promotion in DTR

Navigate to your repository’s **Promotion** tab in the DTR UI to define rules:

| Configuration   | Description                                            | Example                     |
| --------------- | ------------------------------------------------------ | --------------------------- |
| Source trigger  | Tag name or digest that initiates promotion            | `stable`, `sha256:...`      |
| Condition       | Matching rule (`equals`, `starts with`, `regex`)       | `starts with "v1.2."`       |
| Target registry | Destination repository or registry (same or different) | `registry.company.com/test` |

Once set, any image pushed with a matching tag is automatically copied to your target repository.

![The image shows a software interface for managing image promotions, with options to set tag names and conditions like "equals," "starts with," and others. The interface includes buttons for canceling or adding the promotion.](https://kodekloud.com/kk-media/image/upload/v1752873964/notes-assets/images/Docker-Certified-Associate-Exam-Course-Image-Promotions/image-promotion-management-interface.jpg)

## Next Steps

We’ll now demonstrate setting up and using image promotions in a live DTR instance, covering:

- Access control and permissions
- Complex promotion filters
- Rollback strategies

## References

- [Docker Trusted Registry Documentation](https://docs.docker.com/ee/dtr/)
- [Docker Documentation](https://docs.docker.com/)
- [CI/CD Best Practices for Containers](https://www.docker.com/blog/tag/ci-cd/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/1f191e86-e316-4bb5-ae96-9a8e56aee537)**
>
> Watch video content
