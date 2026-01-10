# Canary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Canary)

---

## Table of Contents

- Canary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Canary

In this article, we explore the concept of canary deployments within an API Gateway environment. Canary deployments allow you to run a new version of your service alongside the existing production version, thereby minimizing risk during updates.

When using the canary deployment strategy, a small segment of your incoming traffic—typically around 10%—is routed to the new version (the canary). This controlled traffic diversion enables you to monitor, test, and ensure the stability of the canary release without impacting the majority of your users.

> [!important]
> **Key Benefits**
>
> - Allows gradual rollout and validation of new features.
> - Reduces the risk of widespread impact from potential issues.
> - Enables quick rollback if any problems are detected.

If the canary version proves to be reliable and performs as expected, you can seamlessly transition the entirety of your traffic to this new release. Alternatively, if issues arise during this trial phase, you have the option to revert the traffic entirely back to the production version, ensuring uninterrupted service for your users.

This method not only improves overall deployment safety but also facilitates a smoother, more controlled update process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/f3b966f7-5d94-4032-906a-0ea113a7c849)**
>
> Watch video content
