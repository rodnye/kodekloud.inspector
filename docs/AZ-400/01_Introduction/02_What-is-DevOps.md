# What is DevOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Introduction/What-is-DevOps)

---

## Table of Contents

- What is DevOps
  - Definition of DevOps
  - Azure DevOps and the Value Stream
  - The Three Ways: Flow, Feedback, and Experimentation
  - DevOps Application Lifecycle
  - From Waterfall to DevOps
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Introduction

# What is DevOps

Understanding DevOps is essential for modern software delivery and for achieving success on certifications like AZ-400. In this module, we’ll define DevOps, explore how Azure DevOps supports your value stream, review the Three Ways framework, and examine each phase of the application lifecycle. By the end, you’ll see why mastering DevOps practices is critical for delivering value faster and more reliably.

## Definition of DevOps

DevOps is more than a buzzword—it’s a cultural and technical movement. According to Microsoft,

> DevOps is a union of people, processes, and products to quickly deliver value to users.

The emphasis on “value” underscores that shipping software rapidly only matters when it solves real problems and delights users.

**People**  
Cross-functional teams break down silos between developers, operations, QA, and security. Shared goals and collaborative practices foster trust and accountability.

**Processes**  
Agile workflows, value-stream mapping, and data-driven insights enable continuous improvement. Automation and continuous integration/continuous delivery (CI/CD) pipelines eliminate manual handoffs and reduce errors.

**Products**  
Toolchains for source control, build automation, infrastructure as code, monitoring, and feedback loops support end-to-end delivery.

![The image is a diagram explaining DevOps, highlighting three components: People, Processes, and Product, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752868098/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-DevOps/devops-diagram-people-processes-product.jpg)

> [!important]
> **Note**
>
> Focusing on value delivery ensures your DevOps initiatives align with business outcomes and user satisfaction.

## Azure DevOps and the Value Stream

Azure DevOps provides integrated services to manage the entire value stream—from idea to production. A value stream captures each step in delivering a feature or service:

1.  Ideation and requirements
2.  Development and testing
3.  Deployment and operations

By visualizing and optimizing each stage, teams eliminate bottlenecks and accelerate delivery.

![The image illustrates a value stream process with three stages: "Idea," "Work," and "Using the feature," connected by a flow arrow.](https://kodekloud.com/kk-media/image/upload/v1752868099/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-DevOps/value-stream-process-idea-work-feature.jpg)

## The Three Ways: Flow, Feedback, and Experimentation

In _The DevOps Handbook_, three principles—known as the Three Ways—guide successful DevOps adoption:

1.  **Flow**  
    Map, measure, and optimize each step in your value stream. Remove handoffs and automate repetitive tasks to establish a fast, reliable path to production.
2.  **Feedback**  
    Implement continuous monitoring, logging, and alerting. Rapidly detect and resolve failures, and loop customer and application telemetry back into planning and development.
3.  **Experimentation**  
    Cultivate a culture of continuous learning. Use small, safe-to-fail experiments to test hypotheses, improve processes, and validate new features.

![The image shows three icons labeled "Flow," "Feedback," and "Experiment," each with a corresponding symbol: a waterfall, a group of people with a speech bubble, and laboratory flasks.](https://kodekloud.com/kk-media/image/upload/v1752868101/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-DevOps/flow-feedback-experiment-icons.jpg)

## DevOps Application Lifecycle

Let’s break down how DevOps transforms each phase of software delivery:

![The image illustrates the application lifecycle, showing stages from idea and research to development, testing, and release. It includes steps like running build and release pipelines.](https://kodekloud.com/kk-media/image/upload/v1752868102/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-DevOps/application-lifecycle-development-testing-release.jpg)

**Plan**

- Refine the backlog, define acceptance criteria, and slice features into user stories.
- Tools: [Azure Boards](https://azure.microsoft.com/services/devops/boards), backlog grooming, sprint planning.

**Develop**

- Implement code in small increments, enforce code reviews, and run automated tests.
- Tools: Git repos, pull requests, static analysis, unit testing.

**Deliver**

- Push validated builds through CI/CD pipelines with approval gates and deployment strategies.
- Tools: Azure Pipelines, artifacts, environment approvals.

**Operate**

- Monitor performance, manage incidents, and tune applications for reliability.
- Tools: Azure Monitor, Application Insights, logging, alert rules.

![The image illustrates the application lifecycle in a circular flow, highlighting four stages: Plan, Develop, Deliver, and Operate. Each stage is represented by a distinct icon and color.](https://kodekloud.com/kk-media/image/upload/v1752868103/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-DevOps/application-lifecycle-circular-flow-diagram.jpg)

> [!important]
> **Note**
>
> Integrating feedback and telemetry into each phase ensures continuous improvement and faster mean time to recovery (MTTR).

## From Waterfall to DevOps

Legacy waterfall models follow a rigid sequence—design, build, test, deploy—often leading to long lead times, silos, and late discovery of defects. DevOps dismantles these barriers through automation, collaboration, and cloud-native practices.

| Model     | Release Cadence              | Collaboration          | Automation      | Feedback Loops |
| --------- | ---------------------------- | ---------------------- | --------------- | -------------- |
| Waterfall | Quarterly or longer          | Functional silos       | Minimal         | Slow           |
| DevOps    | Continuous (weekly to daily) | Cross-functional teams | Extensive CI/CD | Rapid          |

> [!important]
> **Warning**
>
> Maintaining a strict waterfall process can create costly rework and degraded deployment quality. Consider adopting incremental delivery early.

Since 2009, DevOps has revolutionized software delivery. By uniting people, processes, and products, teams can now turn ideas into features in days—or even hours.

## Links and References

- [Azure DevOps Services](https://azure.microsoft.com/en-us/services/devops/)
- [The DevOps Handbook](https://en.wikipedia.org/wiki/The_DevOps_Handbook)
- [Microsoft Learn: DevOps](https://learn.microsoft.com/azure/devops/)
- [Continuous Integration (CI) vs. Continuous Delivery (CD)](https://en.wikipedia.org/wiki/Continuous_delivery)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/9eab326b-2560-4fcc-a30a-52c97d042247/lesson/14969fad-f32b-4621-98e8-c0ebbefc5490)**
>
> Watch video content
