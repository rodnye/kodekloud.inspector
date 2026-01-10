# Demo Creating a Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Collaboration-Communication/Demo-Creating-a-Dashboard)

---

## Table of Contents

- Demo Creating a Dashboard
  - Viewing an Existing Dashboard
  - Assigning a Work Item and Seeing Live Updates
  - Creating a New Dashboard
  - Adding and Arranging Widgets
  - Tailoring the Dashboard for Your Role
  - Best Practices
  - Fixing Broken or Misconfigured Widgets
  - Exploring the Widget Gallery
  - Using Extensions
  - Conclusion
  - Watch Video
    - Preview with No Data
    - Example: Reattaching a Pipeline

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Collaboration Communication

# Demo Creating a Dashboard

In this guide, you’ll learn how to build a tailored dashboard in [Azure DevOps](https://azure.microsoft.com/services/devops/) so your team can quickly surface key metrics—work items, builds, releases, pull requests, and more. Whether you pin it on a big screen or check it on the go, dashboards help you track progress and catch issues early.

## Viewing an Existing Dashboard

1.  Sign in to Azure DevOps and select your project (e.g., **KodeKloud Hotel**).
2.  In the left navigation, click **Dashboards**.
3.  Any dashboards created for this project will appear.

If no dashboard exists yet, you’ll see an empty canvas ready for widgets.

## Assigning a Work Item and Seeing Live Updates

Simulate a live update to verify automatic refresh:

1.  Go to **Boards > Work Items** in the left menu.
2.  Find a work item (e.g., “Services has a bug.”).
3.  Open it, assign it to yourself (e.g., Jeremy Morgan), and save.

![The image shows a project management interface with a list of work items, including details like ID, title, assigned person, state, and activity date. A cursor is hovering over an item titled "Services has a bug."](https://kodekloud.com/kk-media/image/upload/v1752867433/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/project-management-interface-work-items-bug.jpg)

Return to your dashboard. The **Assigned to Me** widget refreshes instantly, showing your newly assigned bug.

## Creating a New Dashboard

1.  In the **Dashboards** view, click **New Dashboard**.
2.  Enter a name and click **Create**.
3.  A grid canvas appears, representing widget slots—each occupies one or more cells.

## Adding and Arranging Widgets

Choose and place widgets that surface your critical insights:

| Widget Name           | Size (columns×rows) | Use Case                              |
| --------------------- | ------------------- | ------------------------------------- |
| Assigned to Me        | 6×2                 | View your current work items          |
| Build Health Overview | 3×2                 | Monitor pipeline success and failures |
| Build History         | 2×2                 | Track recent builds                   |
| Burndown Chart        | 6×4                 | Visualize sprint progress             |
| Work Items Chart      | 4×3                 | Analyze work item distribution        |
| Cycle Time            | 4×3                 | Measure completion time               |

Drag each widget onto the grid. For optimal layout:

- **Top**: Build health and history
- **Center**: Assigned work and cycle time
- **Right**: Burndown and workload charts

![The image shows a dashboard interface with widgets for build health overview and work assignments, alongside options to add more widgets.](https://kodekloud.com/kk-media/image/upload/v1752867434/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/dashboard-interface-build-health-widgets.jpg)

When done, click **Done Editing**.

### Preview with No Data

If your project has sparse data, some widgets display **No results** until builds or items populate them.

![The image shows a dashboard interface with various widgets displaying information such as build status, work assignments, and cycle time, all indicating no results or data.](https://kodekloud.com/kk-media/image/upload/v1752867435/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/dashboard-interface-widgets-no-data.jpg)

> [!important]
> **Note**
>
> Empty widgets may look sparse at first. As your pipelines run and work items update, they’ll populate automatically.

## Tailoring the Dashboard for Your Role

As a development lead, consider adding:

- **Pull Requests** front and center
- **Release Pipeline Health**
- **Team Velocity**

1.  Click **Edit**.
2.  Drag these widgets onto your canvas and adjust sizes.
3.  Click **Done Editing**.

Your morning glance now shows work items, PRs, builds, burndown, and velocity—all at once.

![The image shows a dashboard interface with various widgets displaying project management metrics, such as work assignments, burndown charts, and pull requests. Some widgets indicate no data or require configuration.](https://kodekloud.com/kk-media/image/upload/v1752867437/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/project-management-dashboard-widgets-metrics.jpg)

## Best Practices

- Keep widget sources current (pipelines, queries).
- Remove unused widgets to reduce clutter.
- Focus on 2–3 critical widgets for maximum visibility.
- Review and adjust as team priorities evolve.

## Fixing Broken or Misconfigured Widgets

When a widget fails to load (e.g., unhandled exception or invalid JSON), reconfigure its connection:

1.  Click **Edit** and open the gear icon on the problematic widget.
2.  Select the correct pipeline or query.
3.  Save and click **Done Editing**.

> [!important]
> **Warning**
>
> If a pipeline or query no longer exists, the widget will remain broken. Ensure you recreate or update the source before reattaching.

### Example: Reattaching a Pipeline

1.  In **Pipelines**, click **Create Pipeline**.
2.  Connect to your repo (e.g., **SmartHotel360** under **KodeKloud Hotel**).
3.  Use the starter template, then save and run.

![The image shows a software interface for selecting a repository, with options for "PublicWeb" and "SmartHotel360" under the "KodeKloud Hotel" project. A cursor is hovering over "SmartHotel360."](https://kodekloud.com/kk-media/image/upload/v1752867438/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/kodekloud-hotel-repository-selection-interface.jpg)

4.  Return to **Dashboards**, edit the widget, attach the new pipeline, and save.

Your dashboard will now render correctly:

![The image shows a project management dashboard for "KodeKloud Hotel Team," featuring various charts and metrics related to work assignments, team velocity, build health, and backlog items. It includes visual elements like pie charts, bar graphs, and tiles displaying work progress and issues.](https://kodekloud.com/kk-media/image/upload/v1752867440/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/kodekloud-hotel-team-dashboard-metrics.jpg)

## Exploring the Widget Gallery

Discover more widgets:

| Category | Description                      |
| -------- | -------------------------------- |
| Work     | Charts and lists for work items  |
| Build    | Pipelines health and history     |
| Code     | PRs, commits, and code coverage  |
| Release  | Release pipeline status and logs |

1.  Click **Add Widget**.
2.  Browse categories and click **Add** next to any widget.

![The image shows a project management dashboard with various widgets displaying work items, burndown charts, and backlog information. There is also a sidebar for adding new widgets like lead time, markdown, and pull requests.](https://kodekloud.com/kk-media/image/upload/v1752867441/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/project-management-dashboard-widgets.jpg)

## Using Extensions

For richer dashboards, explore the [Visual Studio Marketplace](https://marketplace.visualstudio.com/):

1.  Click the **Marketplace** icon in Azure DevOps.
2.  Search for “Azure DevOps” extensions.
3.  Install free or paid widgets (e.g., [SonarCloud](https://sonarcloud.io/), Gantt charts).

![The image shows a webpage from the Visual Studio Marketplace featuring extensions for Azure DevOps, with sections for "Featured," "Most Popular," and "Recently Added" extensions.](https://kodekloud.com/kk-media/image/upload/v1752867442/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Dashboard/visual-studio-marketplace-azure-devops-extensions.jpg)

## Conclusion

Custom dashboards in Azure DevOps provide lightweight observability—granting immediate insights into builds, work items, burndown, and pull requests. Build the perfect layout for your role, keep it focused, and update it as your project evolves.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6f0f53fa-76cd-4ea8-81b4-d2e4b10a6191/lesson/0eb45da0-b3c6-42ea-9ad1-47f79616f00c)**
>
> Watch video content
