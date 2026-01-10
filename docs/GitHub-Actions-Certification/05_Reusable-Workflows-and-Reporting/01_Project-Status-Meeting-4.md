# Project Status Meeting 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Project-Status-Meeting-4)

---

## Table of Contents

- Project Status Meeting 4
  - Agenda
  - Recap: Node.js CI/CD Implementation
  - Expansion to Java and Python Applications
  - Designing the Reusable Deployment Workflow
  - Action Items
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Project Status Meeting 4

Welcome to the fourth project status meeting for Dasher Technologies. In this session, we’ll review our progress on GitHub Actions workflows and plan out a reusable deployment strategy across Node.js, Java, and Python applications.

## Agenda

- Recap: Node.js CI/CD with GitHub Actions
- Expansion plan for Java and Python services
- Designing a reusable Kubernetes deployment workflow
- Action items and next steps

## Recap: Node.js CI/CD Implementation

In our previous meeting, Alice’s team successfully implemented a CI/CD pipeline for their Node.js application using GitHub Actions. The workflow performs the following steps:

1.  Check out the repository
2.  Install dependencies
3.  Run unit tests
4.  Build and push the Docker image
5.  Deploy to Kubernetes

```
# .github/workflows/nodejs-ci.yml
name: Node.js CI/CD


on:
  push:
    branches: [ main ]


jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2


      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'


      - run: npm install
      - run: npm test


      - name: Build and push image
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_HUB }}/app-node:latest


      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v1
        with:
          manifests: k8s/deployment.yml
```

## Expansion to Java and Python Applications

Dasher Technologies will now extend this CI/CD pattern to its Java and Python services. Because all three microservices share the same Kubernetes deployment model, we’ll extract common steps into a single reusable workflow.

| Service   | Language | CI/CD Workflow File |
| --------- | -------- | ------------------- |
| Service A | Node.js  | `nodejs-ci.yml`     |
| Service B | Java     | `java-ci.yml`       |
| Service C | Python   | `python-ci.yml`     |

> [!important]
> **Note**
>
> Extracting shared deployment steps into a reusable workflow ensures consistency, reduces duplication, and makes future updates easier.

## Designing the Reusable Deployment Workflow

We’ll create a reusable workflow at `.github/workflows/deploy.yml` containing the standardized Kubernetes deployment logic:

```
# .github/workflows/deploy.yml
name: Reusable Kubernetes Deployment


on:
  workflow_call:


jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2


      - name: Set up kubectl
        uses: azure/setup-kubectl@v1


      - name: Authenticate to Kubernetes
        run: |
          kubectl config set-context ${{ secrets.K8S_CONTEXT }}


      - name: Apply manifests and rollout
        run: |
          kubectl apply -f k8s/deployment.yml
          kubectl rollout status deployment/${{ github.job }}
```

Each service-specific workflow will call this reusable deployment:

```
# .github/workflows/nodejs-ci.yml (excerpt)
...
jobs:
  build:
    # build steps here


  deploy:
    uses: ./.github/workflows/deploy.yml
    with:
      # pass any required inputs or secrets
```

## Action Items

- Finalize and review `deploy.yml` template
- Update Java and Python workflows to invoke the reusable deployment
- Run end-to-end tests for all three services
- Document the new CI/CD pattern for the engineering team

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/064e58a9-1e11-442e-9773-c046755ad261)**
>
> Watch video content
