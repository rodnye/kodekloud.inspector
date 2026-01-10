# Understanding DevOps Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Understanding-DevOps-Pipeline)

---

## Table of Contents

- Understanding DevOps Pipeline
  - Pipeline Overview
  - 1. Source Checkout
  - 2. Unit Testing
  - 3. Code Coverage
  - 4. Containerization
  - 5. Deploy to Development Cluster
  - 6. Integration Testing on Dev
  - 7. Manual Approval
  - 8. Deploy to Production Cluster
  - 9. Post-Deployment Integration Tests
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Understanding DevOps Pipeline

In this guide, we’ll design a CI/CD pipeline for a Node.js application using **GitHub Actions**. Automating each stage ensures consistent builds, rapid feedback, and reliable deployments across development and production clusters.

## Pipeline Overview

| Stage                    | Description                                      |
| ------------------------ | ------------------------------------------------ |
| Source Checkout          | Pull code from GitHub repository                 |
| Unit Testing             | Install dependencies, run tests, archive reports |
| Code Coverage            | Generate coverage metrics (errors ignored)       |
| Containerization         | Build Docker image, smoke test, push to registry |
| Dev Deployment           | Apply Kubernetes manifests, expose via Ingress   |
| Dev Integration Testing  | Validate live endpoint on development cluster    |
| Manual Approval          | Pause for reviewer sign-off                      |
| Prod Deployment          | Deploy to production cluster                     |
| Prod Integration Testing | Verify the production endpoint                   |

---

## 1\. Source Checkout

Begin by checking out your repository so that all subsequent jobs have access to your code.

```
- name: Checkout source code
  uses: actions/checkout@v3
```

---

## 2\. Unit Testing

Install dependencies, execute your test suite, and archive the results. The pipeline will fail on any test errors.

```
npm ci
npm test
# Archive test reports for review
```

> [!important]
> **Note**
>
> Use `npm ci` in CI environments for a clean, deterministic install.

---

## 3\. Code Coverage

Run coverage in parallel with unit tests. We ignore coverage thresholds to avoid pipeline failures but still collect the reports.

```
npm ci
npm run coverage || echo "Coverage errors ignored"
# Archive coverage reports for metrics
```

> [!important]
> **Note**
>
> Storing coverage artifacts helps you track trends over time, even if errors are ignored.

---

## 4\. Containerization

Build your Docker image, perform a quick smoke test inside a container, and push it to your Docker registry.

```
docker build -t $REGISTRY/$REPO:$TAG .
docker run --rm $REGISTRY/$REPO:$TAG npm test
docker push $REGISTRY/$REPO:$TAG
```

---

## 5\. Deploy to Development Cluster

Apply Kubernetes manifests to your development cluster and capture the Ingress hostname.

```
kubectl apply -f k8s/
DEV_HOST=$(kubectl get ingress app-ingress \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "Development URL: https://$DEV_HOST"
```

---

## 6\. Integration Testing on Dev

Verify that the application is live on the development endpoint.

```
curl -f https://$DEV_HOST/live
```

---

## 7\. Manual Approval

Pause the workflow until a reviewer manually approves the release. On rejection, the pipeline stops.

> [!important]
> **Warning**
>
> Ensure that the reviewer has access to both the GitHub repo and any relevant sprint boards before approving.

---

## 8\. Deploy to Production Cluster

Once approved, deploy the same manifests to your production context.

```
kubectl apply -f k8s/ --context=prod
PROD_HOST=$(kubectl get ingress app-ingress \
  --context=prod \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "Production URL: https://$PROD_HOST"
```

---

## 9\. Post-Deployment Integration Tests

Perform final checks against the production endpoint to validate a successful release.

```
curl -f https://$PROD_HOST/live
```

---

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/4a8b6d38-0341-43fb-acd5-fa2866f89217)**
>
> Watch video content
