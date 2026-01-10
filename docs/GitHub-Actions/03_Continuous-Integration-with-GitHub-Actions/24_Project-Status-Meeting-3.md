# Project Status Meeting 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Project-Status-Meeting-3)

---

## Table of Contents

- Project Status Meeting 3
  - 1. Recap of Recent Improvements
  - 2. Preparing for Deployment
  - 3. Kubernetes Fundamentals
  - 4. What’s Next?
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Project Status Meeting 3

In this lesson, you’ll get a comprehensive update on our project’s health and next steps. We’ll cover:

- Recent optimizations in our CI/CD pipeline
- Performance gains after refactoring container responsibilities
- Preparation for deployment and an introduction to Kubernetes fundamentals

---

## 1\. Recap of Recent Improvements

By isolating job containers (e.g., background workers) from service containers (e.g., web servers), we dramatically reduced database contention and improved overall throughput. Key metrics:

| Metric                   | Before Refactoring | After Refactoring |
| ------------------------ | ------------------ | ----------------- |
| Average Job Completion   | 45 seconds         | 15 seconds        |
| Database CPU Utilization | 85%                | 50%               |

> [!important]
> **Best Practice**
>
> Separating container responsibilities lets you scale each component independently, reduces resource contention, and improves fault isolation.

---

## 2\. Preparing for Deployment

Alice and her team are finalizing the deployment checklist. Essential items include:

1.  Specifying container images with version tags
2.  Managing environment variables and secrets
3.  Validating service discovery and network policies

---

## 3\. Kubernetes Fundamentals

Let’s explore the core Kubernetes resources you’ll use:

| Resource Type | Purpose                          | Example CLI Command                                  |
| ------------- | -------------------------------- | ---------------------------------------------------- |
| Pod           | Smallest deployable unit         | `kubectl run nginx --image=nginx`                    |
| Deployment    | Manages replicated Pods          | `kubectl create deployment webapp --image=myapp:1.0` |
| Service       | Provides stable network endpoint | `kubectl expose deployment webapp --port=80`         |

> [!important]
> **Prerequisites**
>
> Ensure `kubectl` is installed and pointed at a cluster. New to Kubernetes? Start with [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

---

## 4\. What’s Next?

- Review and customize our deployment manifest templates
- Set up namespaces and RBAC policies
- Deploy your first application to the cluster

Let’s get started!

---

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [CI/CD with Jenkins](https://www.jenkins.io/doc/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/7271038e-4ccf-449c-9704-cfa7855a2cac)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/89575d5e-73c8-4d3f-aeaf-1186f75fd4af)**
>
> Practice lab
