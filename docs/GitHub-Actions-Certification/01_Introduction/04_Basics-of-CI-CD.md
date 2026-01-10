# Basics of CI CD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Introduction/Basics-of-CI-CD)

---

## Table of Contents

- Basics of CI CD
  - Why CI/CD Matters
  - Continuous Integration
  - Continuous Deployment vs. Continuous Delivery
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Introduction

# Basics of CI CD

Continuous Integration (CI) and Continuous Deployment/Delivery (CD) form the backbone of modern DevOps. By automating builds, tests, and deployments, a CI/CD pipeline accelerates release cycles, improves code quality, and reduces manual errors.

## Why CI/CD Matters

All source code is managed in a [Git repository](https://git-scm.com) and hosted on platforms like [GitHub](https://github.com) for collaboration, code reviews, and pull requests. A typical feature workflow looks like this:

1.  Developer creates a feature branch from `main`.
2.  Changes are committed to the feature branch.
3.  A pull request (PR) is opened against `main`.
4.  Team members review and approve the PR.
5.  Merging to `main` triggers deployment to the production environment (manually or via scripts).

Without an automated pipeline, teams face:

- **Delayed Testing:** Bugs surface late, after multiple merges.
- **Deployment Inconsistencies:** Manual steps introduce environment drift.
- **QA Bottlenecks:** Manual quality assurance slows feedback loops.

![The image illustrates a continuous integration workflow, highlighting the process from committing code to manual deployment, and lists challenges like delayed testing, inefficient deployment, and quality assurance issues without CI.](https://kodekloud.com/kk-media/image/upload/v1752876282/notes-assets/images/GitHub-Actions-Certification-Basics-of-CI-CD/continuous-integration-workflow-challenges.jpg)

## Continuous Integration

Continuous Integration ensures every code change is validated immediately, preventing integration conflicts and regressions.

**Core Steps in a CI Pipeline**

| Step               | Purpose                                    | Example Tool      |
| ------------------ | ------------------------------------------ | ----------------- |
| Checkout Code      | Retrieve branch commits                    | Git               |
| Dependency Install | Install libraries and dependencies         | npm, Maven        |
| Static Analysis    | Enforce code standards                     | ESLint, SonarQube |
| Unit Tests         | Verify individual functions/modules        | Jest, JUnit       |
| Build Artifact     | Package application binaries or containers | Docker, Gradle    |
| Vulnerability Scan | Detect known security issues               | Trivy, Snyk       |

Workflow:

1.  A developer pushes to feature branch A and opens a PR.
2.  The CI pipeline runs static analysis, unit tests, builds artifacts, and scans for vulnerabilities.
3.  Failed steps provide immediate feedback. The developer iterates until the pipeline passes.
4.  Upon approval, merging into `main` triggers a full CI run on the integrated codebase.
5.  Parallel feature branch B undergoes the same CI checks; after merging, CI validates that A and B coexist without regressions.

> [!important]
> **Note**
>
> Automating tests and scans early in your workflow reduces costly fixes later and accelerates your release cadence.

## Continuous Deployment vs. Continuous Delivery

Once CI guarantees code integrity, CD automates the deployment process—from development to staging and production.

| Workflow              | Deployment Trigger            | Human Gatekeeper | Use Case                                   |
| --------------------- | ----------------------------- | ---------------- | ------------------------------------------ |
| Continuous Delivery   | Manual approval after staging | Required         | Regulated industries, scheduled releases   |
| Continuous Deployment | Automatic on `main` merge     | None             | High-velocity teams, feature flag rollouts |

1.  **Staging Deployments**  
    After CI succeeds on a feature branch, a CD pipeline can automatically deploy to a staging or development environment and run integration or end-to-end tests.
2.  **Production Deployments**
    - **Continuous Deployment:** Merges to `main` immediately trigger production pushes.
    - **Continuous Delivery:** Introduces a manual approval step before production to reduce risk or comply with audit requirements.

> [!important]
> **Warning**
>
> Skipping manual approvals may speed up releases but can increase the risk of deploying unverified changes to production.

![The image illustrates a continuous deployment/delivery pipeline, showing the process from code commit to deployment in staging and production environments, including steps like CI/CD, code scanning, and testing.](https://kodekloud.com/kk-media/image/upload/v1752876283/notes-assets/images/GitHub-Actions-Certification-Basics-of-CI-CD/continuous-deployment-pipeline-ci-cd.jpg)

![The image illustrates a Continuous Deployment/Delivery pipeline, showing the process from code commit to deployment in staging and production environments, including steps like CI/CD, testing, and approvals.](https://kodekloud.com/kk-media/image/upload/v1752876284/notes-assets/images/GitHub-Actions-Certification-Basics-of-CI-CD/continuous-deployment-delivery-pipeline-diagram.jpg)

## Conclusion

A well-designed CI/CD pipeline empowers teams to deliver high-quality software faster, with consistent environments and immediate feedback. By integrating automated builds, tests, and deployments, you can minimize risks and focus on innovation.

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Trivy: Vulnerability Scanner](https://github.com/aquasecurity/trivy)
- [Snyk: Security Scanning](https://snyk.io/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/f7702c28-34a1-40fc-9511-9bbc4940a4af/lesson/22da9036-69c6-4605-a09a-00621c16984b)**
>
> Watch video content
