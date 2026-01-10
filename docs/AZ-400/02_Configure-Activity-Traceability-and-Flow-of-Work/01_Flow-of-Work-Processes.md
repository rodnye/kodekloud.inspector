# Flow of Work Processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Flow-of-Work-Processes)

---

## Table of Contents

- Flow of Work Processes
  - Typical Sprint Workflow
  - Out-of-the-Box Process Templates
  - Conclusion
  - Links and References
  - Watch Video
    - Basic
    - Scrum
    - Agile
    - CMMI

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Flow of Work Processes

Managing work items effectively in Azure DevOps is essential for delivering high-quality software on time. Azure Boards acts as your project’s central hub, providing a real-time view of progress, priorities, and blockers. Teams can collaborate directly on work items, update statuses, and link tasks to code, builds, and releases—all in one place.

## Typical Sprint Workflow

In an Agile Scrum framework, work flows through a series of well-defined stages during each sprint cycle:

1.  **Backlog Grooming**  
    The Product Owner gathers requirements, user stories, and bug fixes, then prioritizes them in the backlog.
2.  **Sprint Planning**  
    The team selects backlog items, defines sprint goals, and estimates effort.
3.  **Development & Testing**  
    Developers build features, testers validate functionality, and the team addresses blockers during daily stand-ups.
4.  **Review & Retrospective**  
    Completed work is demoed to stakeholders, feedback is recorded, and the team reflects on improvements.
5.  **Delivery**  
    Shippable increments are deployed, and the cycle repeats.

> [!important]
> **Note**
>
> A typical sprint lasts **1–4 weeks**. Adjust the duration based on team size, product complexity, and release cadence.

![The image illustrates a "Flow of Work" diagram, depicting a process from customer input and requirements through stages like backlogs, planning, design, coding, testing, deployment, review, and deliverables, with a focus on a sprint cycle.](https://kodekloud.com/kk-media/image/upload/v1752867416/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Processes/flow-of-work-sprint-cycle-diagram.jpg)

Next, let’s explore the four out-of-the-box process templates that Azure DevOps provides to support this workflow.

## Out-of-the-Box Process Templates

Azure DevOps provides four built-in templates—**Basic**, **Scrum**, **Agile**, and **CMMI**—to help teams standardize how they plan, track, and deliver work.

![The image illustrates four methods for managing the flow of work items: Basic, Scrum, Agile, and CMMI, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752867416/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Processes/work-item-management-methods-icons.jpg)

| Template | Best For               | Key Features                                          |
| -------- | ---------------------- | ----------------------------------------------------- |
| Basic    | Small teams            | Simplified work items, minimal fields                 |
| Scrum    | Sprint-driven teams    | Sprint backlogs, burndown charts, capacity planning   |
| Agile    | Continuous delivery    | Iterations, Kanban boards, customer feedback loops    |
| CMMI     | Regulated environments | Detailed work item states, process governance, audits |

### Basic

The **Basic** template offers a lean setup with only the essential fields, making it perfect for small or newly formed teams that need to get started quickly.

![The image is a flowchart titled "Flow of Work – Basic," illustrating three steps: simplified work tracking, ideal for small teams, and streamlined project management. Each step is represented by an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752867418/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Processes/flow-of-work-basic-flowchart.jpg)

- Minimal work item types: Issue, Epic, Task
- Quick onboarding and minimal configuration
- Streamlined board for high visibility

### Scrum

The **Scrum** template is tailored for teams that plan work in fixed-length sprints. It includes artifacts like sprint backlogs, burndown charts, and capacity planning tools to support iterative delivery.

- Sprint Backlog and Product Backlog work item types
- Built-in **Burndown Chart** and **Sprint Capacity** widgets
- Integration with [Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/) for CI/CD

> [!important]
> **Best Practice**
>
> Use the burndown chart daily to track sprint progress and identify scope creep early.

### Agile

Designed for fast-moving teams, the **Agile** template emphasizes continuous delivery and rapid response to stakeholder feedback.

- **User Stories**, **Features**, and **Epics** hierarchy
- Kanban board with customizable columns
- Frequent releases via release pipelines

### CMMI

Organizations requiring a highly structured process often choose **CMMI**. This template enforces rigorous documentation, audit trails, and formal process controls to meet compliance standards.

![The image illustrates the flow of work in CMMI, highlighting three components: process improvement focus, Capability Maturity Model Index, and structured product approach.](https://kodekloud.com/kk-media/image/upload/v1752867419/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Processes/cmmi-workflow-process-improvement-diagram.jpg)

- Detailed work item states and transitions
- Rich reporting for audits and performance measurement
- Emphasis on process improvement and quality assurance

> [!important]
> **Warning**
>
> The CMMI template introduces more fields and states; evaluate the overhead before adopting it for smaller projects.

## Conclusion

Choosing the right process template in Azure DevOps sets the foundation for transparent, efficient delivery. Whether you need a lightweight board for a small team or a comprehensive framework for compliance, Azure DevOps has you covered.

## Links and References

- [Azure Boards Documentation](https://docs.microsoft.com/azure/devops/boards/)
- [Agile Tools in Azure DevOps](https://docs.microsoft.com/azure/devops/boards/get-started/)
- [Implementing CMMI with Azure DevOps](https://docs.microsoft.com/azure/devops/boards/process/cmmiprocess)
- [Azure Pipelines Overview](https://docs.microsoft.com/azure/devops/pipelines/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/3bacf085-ff1d-440e-953f-1a2757308259)**
>
> Watch video content
