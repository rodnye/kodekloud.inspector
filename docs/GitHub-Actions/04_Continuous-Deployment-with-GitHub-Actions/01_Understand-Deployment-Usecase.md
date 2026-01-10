# Understand Deployment Usecase - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Understand-Deployment-Usecase)

---

## Table of Contents

- Understand Deployment Usecase
  - Deployment Pipeline Overview
  - Local Development Commands
  - Deploying to Kubernetes
  - Integration Testing on Dev
  - Manual Approval Gate
  - Production Deployment
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Understand Deployment Usecase

In this guide, we’ll walk through our CI/CD pipeline stages and demonstrate how to deploy a Dockerized application to Kubernetes clusters. You’ll learn how to:

- Build and test your code
- Containerize with Docker
- Deploy to a development cluster
- Run integration tests
- Promote to production after manual approval

## Deployment Pipeline Overview

We’ve already completed:

| Stage                   | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| Unit Testing            | Validate code logic with `npm test`            |
| Code Coverage           | Measure test coverage using `npm run coverage` |
| Docker Containerization | Package the app into a Docker image            |

Next, the pipeline will:

1.  Push the Docker image to a container registry
2.  Deploy to a Kubernetes _development_ environment
3.  Execute integration tests against the dev cluster
4.  Await manual approval
5.  Promote the same deployment to the _production_ environment

## Local Development Commands

Before diving into Kubernetes, run these commands locally to verify your application:

| Step        | Command                                 | Description                       |
| ----------- | --------------------------------------- | --------------------------------- |
| Install     | `npm install`                           | Install project dependencies      |
| Test        | `npm test`                              | Execute unit tests                |
| Coverage    | `npm run coverage`                      | Generate code coverage report     |
| Build Image | `docker build -t my-app:latest .`       | Create a Docker image             |
| Run Image   | `docker run -p 3000:3000 my-app:latest` | Launch the container on port 3000 |
| Push Image  | `docker push my-app:latest`             | Upload the image to your registry |

```
# Example: Build and run locally
npm install
npm test
npm run coverage
docker build -t my-app:latest .
docker run -p 3000:3000 my-app:latest
docker push my-app:latest
```

## Deploying to Kubernetes

To deploy the Docker image, prepare these Kubernetes manifests:

- **Deployment**: Defines Pods and ReplicaSets in `k8s/deployment.yaml`
- **Service**: Exposes Pods internally via `k8s/service.yaml`
- **Ingress**: Routes external HTTP traffic using `k8s/ingress.yaml`

Apply them in sequence:

```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## Integration Testing on Dev

Once the resources are live, validate the deployment:

```
curl http://dev.my-app.example.com/health
```

A `200 OK` response confirms that the application is operating correctly in the development cluster.

> [!important]
> **Note**
>
> Ensure your Kubernetes context is set to the development cluster:
>
> ```
> kubectl config use-context dev-cluster
> ```

## Manual Approval Gate

Before proceeding to production, implement a manual approval step in your CI/CD workflow. This prevents unintentional releases.

> [!important]
> **Warning**
>
> An administrator must review the integration test results and approve the release.
> Skipping this step can lead to unverified changes reaching production.

## Production Deployment

After approval, deploy to the production cluster using the same manifests:

1.  Switch to the production context:

    ```
    kubectl config use-context prod-cluster
    ```

2.  Apply the manifests:

    ```
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl apply -f k8s/ingress.yaml
    ```

3.  Run production integration tests:

    ```
    curl http://my-app.example.com/health
    ```

Optionally, configure post-deployment alerts or monitoring checks to ensure reliability.

## Next Steps

In the next lesson, we’ll cover Kubernetes fundamentals in depth and build automated workflow files for our CI/CD pipeline.

## Links and References

- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [CI/CD Best Practices](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/fa0d124d-feb8-48a0-b10e-0cf45d876932)**
>
> Watch video content
