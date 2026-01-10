# Flow of Work Basic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Flow-of-Work-Basic)

---

## Table of Contents

- Flow of Work Basic
  - Work Item Types and States
  - Epics
  - Issues
  - Tasks
  - Implementing the Basic Process
  - Benefits of the Basic Process
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Flow of Work Basic

Leverage **Azure Boards** within **Azure DevOps** to plan, track, and manage your project lifecycle using the **Basic** process template. This streamlined approach uses just three work item types—Epics, Issues, and Tasks—while maintaining clear visibility and control over your work.

> [!important]
> **Note**
>
> The Basic process is ideal for small to medium teams looking for a lightweight planning experience without sacrificing transparency.

---

## Work Item Types and States

Azure DevOps organizes work around discrete items that move through predefined states. In the Basic process, there are three work item types:

| Work Item Type | Purpose                                             | States               |
| -------------- | --------------------------------------------------- | -------------------- |
| Epics          | Large features or long-term goals spanning releases | To Do → Doing → Done |
| Issues         | User stories, bugs, and feature requests            | To Do → Doing → Done |
| Tasks          | Granular steps to complete an Issue                 | To Do → Doing → Done |

![The image is a flowchart illustrating the introduction of work items, showing a progression from "Epics" to "Issues" to "Tasks."](https://kodekloud.com/kk-media/image/upload/v1752867403/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/work-items-flowchart-epics-issues-tasks.jpg)

---

## Epics

An **Epic** captures a major feature or strategic initiative, often spanning multiple sprints or releases. Use Epics to group related Issues and maintain a high-level overview of your project goals.

![The image illustrates the role of "Epics" in project management, showing a central "Epics" box connected to three "Issue" circles, indicating a hierarchical relationship.](https://kodekloud.com/kk-media/image/upload/v1752867404/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/epics-project-management-hierarchy-diagram.jpg)

Within an Epic, you can:

- Organize multiple Issues (user stories, requirements, or bugs)
- Track progress at a strategic level
- Align work with business objectives

---

## Issues

**Issues** are the core planning units in the Basic process. They include:

1.  **User Stories** – Descriptions of user-facing features and their value.
2.  **Bugs** – Defects that require triage, prioritization, and resolution.
3.  **Feature Requests** – Ideas for new functionality or enhancements.

Logging work as Issues creates a predictable backlog, replacing ad hoc methods like email or chat.

![The image is an infographic titled "Understanding the Issues," highlighting three steps: tracking user stories, logging bugs and features, and establishing a foundation of planning. Each step is represented by an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752867405/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/understanding-issues-infographic-user-stories.jpg)

---

## Tasks

Break each Issue into **Tasks**—the actionable items your team executes. Tasks make it easy to assign work, estimate effort, and monitor daily progress.

![The image is a flowchart illustrating "Detailed Tracking With Tasks," showing the progression from "Epics" to "Issues" and then to "Simpler Tasks."](https://kodekloud.com/kk-media/image/upload/v1752867406/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/detailed-tracking-flowchart-epics-issues-tasks.jpg)

Key benefits of using Tasks:

- Clear ownership and due dates
- Granular tracking of work items
- Improved resource allocation

---

## Implementing the Basic Process

Follow these steps to get started:

1.  **Create Issues** to log user stories, bugs, and features.
2.  **Group Issues into Epics** for strategic alignment.
3.  **Decompose Issues into Tasks** to define specific action items.

![The image illustrates a flowchart titled "Implementing the Basic Process," showing a hierarchy starting with "Epics" at the top, branching into three categories with icons and documents below each.](https://kodekloud.com/kk-media/image/upload/v1752867407/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/implementing-basic-process-flowchart.jpg)

---

## Benefits of the Basic Process

- Streamlined work item hierarchy
- Focused planning with Issues and Epics
- Detailed progress monitoring via Tasks

| Benefit              | Description                                   |
| -------------------- | --------------------------------------------- |
| Simplified workflow  | Only three item types to manage               |
| Enhanced visibility  | Clear state transitions for every work item   |
| Predictable delivery | Break down complex work into manageable steps |

![The image outlines a basic process implementation with three steps: streamlined work items, effective planning, and enhanced tracking, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752867408/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Basic/process-implementation-three-steps-icons.jpg)

---

## Links and References

- [Azure Boards overview](https://docs.microsoft.com/azure/devops/boards/)
- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops/)
- [Get started with Azure DevOps](https://azure.microsoft.com/services/devops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/fd71b682-3b34-4b60-968a-678cf3553bd7)**
>
> Watch video content
