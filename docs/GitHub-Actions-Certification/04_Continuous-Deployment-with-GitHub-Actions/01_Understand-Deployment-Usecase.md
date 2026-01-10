# Understand Deployment Usecase - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Understand-Deployment-Usecase)

---

## Table of Contents

- Understand Deployment Usecase
  - Pipeline Overview
  - 1. Completed CI Jobs
  - 2. Kubernetes Deployment (Development)
  - 3. Kubernetes Deployment (Production) with Manual Approval
  - References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Understand Deployment Usecase

In this lesson we explore a full CI/CD pipeline: from unit tests and coverage reports to Docker containerization and Kubernetes deployments. We’ll also add integration checks and enforce a manual approval gate before releasing to production.

## Pipeline Overview

| Stage               | Description                    | Commands                                                                 |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| Unit Testing        | Validate application logic     | `npm install`<br>`npm test`                                              |
| Code Coverage       | Generate coverage metrics      | `npm install`<br>`npm run coverage`                                      |
| Docker Build & Push | Containerize and publish image | `docker build -t your-image:latest .`<br>`docker push your-image:latest` |

> [!important]
> **Note**
>
> Ensure your CI configuration archives test reports and coverage artifacts for visibility.

## 1\. Completed CI Jobs

Here are the commands executed in separate CI stages:

```
# Unit Tests
npm install
npm test
# Code Coverage
npm install
npm run coverage
# Docker Containerization
docker build -t your-image:latest .
docker run --rm your-image:latest
docker push your-image:latest
```

## 2\. Kubernetes Deployment (Development)

Deploy to the development cluster using Kubernetes manifests:

1.  Prepare manifests:
    - `deploy/deployment.yaml`
    - `deploy/ingress.yaml`
2.  Apply them with `kubectl`:

    ```
    kubectl apply -f deploy/deployment.yaml
    kubectl apply -f deploy/ingress.yaml
    ```

3.  Verify the ingress and perform a quick integration test:

    ```
    kubectl get ingress
    curl https://<dev-ingress-url>/live
    ```

> [!important]
> **Note**
>
> Always verify that the ingress controller and TLS certificates are correctly configured in your dev environment.

## 3\. Kubernetes Deployment (Production) with Manual Approval

Before pushing changes to production, insert a manual approval step in your CI/CD workflow. Upon approval, deploy using the same manifests against the production context:

> [!important]
> **Warning**
>
> Production deployments are irreversible. Double-check your manifests, image tags, and environment-specific configurations before approving.

```
# Apply production manifests
kubectl apply -f deploy/deployment.yaml --context=production
kubectl apply -f deploy/ingress.yaml --context=production


# Verify production ingress and run integration test
kubectl get ingress --context=production
curl https://<prod-ingress-url>/live
```

## References

- [Kubernetes CLI (kubectl)](https://kubernetes.io/docs/reference/kubectl/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [npm Documentation](https://docs.npmjs.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/bb45f143-6ae8-4663-8eca-7652f30e39c9)**
>
> Watch video content
