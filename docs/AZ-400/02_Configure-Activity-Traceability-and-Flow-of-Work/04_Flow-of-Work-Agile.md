# Flow of Work Agile - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Flow-of-Work-Agile)

---

## Table of Contents

- Flow of Work Agile
  - 1. Work Item Hierarchy
  - 2. Feedback and Code Review Process
  - 3. Testing Structure
  - 4. Issue and Bug Tracking
  - 5. Work Item States
  - 6. End-to-End Workflow
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Flow of Work Agile

In this guide, we’ll explore the end-to-end Agile flow of work, detailing each core work unit, their lifecycle states, and the collaboration steps that drive iterative delivery.

## 1\. Work Item Hierarchy

At the highest level, Agile work is organized into backlog items:

1.  **Epic**  
    Captures a large business goal or feature set, managed in the Portfolio Backlog.
2.  **Feature**  
    Breaks an Epic into smaller, demonstrable capabilities.
3.  **User Story**  
    Defines a user-centric requirement in the Product Backlog.
4.  **Task**  
    Specifies individual development or testing actions.

![The image is a flowchart illustrating the Agile work process, showing the hierarchy from Epic to Feature, User Story, and Tasks.](https://kodekloud.com/kk-media/image/upload/v1752867398/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Agile/agile-work-process-flowchart-hierarchy.jpg)

## 2\. Feedback and Code Review Process

Agile emphasizes continuous feedback. The typical sequence is:

- **Feedback Request**: Developer asks stakeholders to validate functionality.
- **Feedback Response**: Stakeholders provide comments or approvals.
- **Code Review Request**: Developer submits a pull request or merge request.
- **Code Review Response**: Peers review, comment, approve, or request changes.

> [!important]
> **Note**
>
> Regular code reviews not only catch defects early but also promote shared knowledge and consistency across the codebase.

![The image is a flowchart illustrating the Agile feedback and code review process, showing steps from feedback and code review requests to their respective responses.](https://kodekloud.com/kk-media/image/upload/v1752867400/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Agile/agile-feedback-code-review-flowchart.jpg)

## 3\. Testing Structure

Agile testing is layered to ensure coverage from strategy down to individual scenarios:

| Level      | Definition                                         | Example                         |
| ---------- | -------------------------------------------------- | ------------------------------- |
| Test Plan  | Overall scope, objectives, and entry/exit criteria | Regression and performance plan |
| Test Suite | Group of related test cases                        | Authentication suite            |
| Test Case  | Detailed steps, inputs, and expected results       | Login with valid credentials    |

Shared Steps enable reuse of common actions (e.g., “Login") across multiple test cases, reducing maintenance overhead.

> [!important]
> **Warning**
>
> Failing to update shared steps when workflows change can cause multiple tests to break simultaneously. Review shared steps regularly.

![The image is a flowchart illustrating the Agile testing process, showing a sequence from "Test Plan" to "Test Suite" to "Test Case."](https://kodekloud.com/kk-media/image/upload/v1752867400/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Agile/agile-testing-process-flowchart.jpg)

## 4\. Issue and Bug Tracking

Work items for defects and tasks help teams triage and resolve problems efficiently:

| Work Item Type | Purpose                     | Typical Workflow                 |
| -------------- | --------------------------- | -------------------------------- |
| Issue          | General task or improvement | New → Active → Resolved → Closed |
| Bug            | Defect needing a fix        | New → Active → Resolved → Closed |

Use [Azure Boards](https://docs.microsoft.com/azure/devops/boards/) or similar tools to categorize and prioritize these items.

## 5\. Work Item States

All Agile work items move through these standard states:

- **New**: Item is created and awaiting grooming.
- **Active**: Work is in progress.
- **Resolved**: Development or testing is complete—pending review.
- **Closed**: Item is accepted and done.
- **Removed**: Item is discarded or deemed obsolete.

![The image illustrates the Agile flow of work, showing stages labeled as New, Active, Resolved, and Closed, with a central "States" icon.](https://kodekloud.com/kk-media/image/upload/v1752867402/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Flow-of-Work-Agile/agile-work-flow-stages-diagram.jpg)

## 6\. End-to-End Workflow

1.  **Planning**  
    Define User Stories, acceptance criteria, and test strategy.
2.  **Backlog Management**  
    Prioritize Epics and Features, estimate effort, and assign items.
3.  **Development & Review**  
    Implement Tasks, request feedback, submit pull requests, and address review comments.
4.  **Testing**  
    Execute test cases, reuse shared steps, and update test suites.
5.  **Bug/Issue Resolution**  
    Triage reported defects, assign to developers, and verify fixes.
6.  **Closure**  
    Move completed items to Closed or remove obsolete ones.

Each sprint cycle reinforces continuous delivery and feedback loops, ensuring that teams adapt quickly to change.

## Links and References

- [Agile Manifesto](https://agilemanifesto.org/)
- [Scrum Guide](https://scrumguides.org/)
- [Azure DevOps Boards](https://docs.microsoft.com/azure/devops/boards/)
- [Atlassian Agile vs Scrum](https://www.atlassian.com/agile)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/f6f4cccc-78fb-4f1a-8136-b9d94886105b)**
>
> Watch video content
