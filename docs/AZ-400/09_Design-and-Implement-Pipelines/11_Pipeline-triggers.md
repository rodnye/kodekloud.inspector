# Pipeline triggers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Pipeline-triggers)

---

## Table of Contents

- Pipeline triggers
  - Continuous Integration (CI) Triggers
  - Scheduled Triggers
  - Pull Request (PR) Triggers
  - Manual Triggers
  - Best Practices
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Pipeline triggers

Azure Pipeline Triggers automate the start of your build and deployment workflows when specific events or conditions occur. By using triggers effectively, you can streamline code validation, testing, and delivery across your CI/CD lifecycle.

Azure Pipelines supports four primary trigger types:

| Trigger Type | Description                                      | YAML Keyword |
| ------------ | ------------------------------------------------ | ------------ |
| CI           | Start a build when code is pushed                | `trigger`    |
| PR           | Validate pull requests before merging            | `pr`         |
| Scheduled    | Run pipelines at defined times (nightly, weekly) | `schedules`  |
| Manual       | Launch pipelines on demand via UI or CLI         | N/A          |

![The image shows four types of triggers: Continuous Integration (CI) triggers, Pull Request (PR) triggers, Scheduled triggers, and Manual triggers, each represented with a distinct color and icon.](https://kodekloud.com/kk-media/image/upload/v1752867883/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/triggers-ci-pr-scheduled-manual.jpg)

## Continuous Integration (CI) Triggers

Continuous Integration (CI) triggers automatically queue a pipeline run whenever new commits are pushed to selected branches. This immediate feedback loop helps catch build failures or integration errors early.

![The image illustrates a Continuous Integration (CI) trigger process, showing a flow from "Code" to "Repository" with an automatic build initiation when code is pushed.](https://kodekloud.com/kk-media/image/upload/v1752867884/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/ci-trigger-process-code-repository.jpg)

In YAML pipelines, enable CI by defining the `trigger` section:

```
trigger:
  branches:
    include:
      - main
      - release/*
      - feature/*
```

- `trigger:` activates CI-based runs
- `branches.include:` lists branch patterns to watch
  - `main` builds production code
  - `release/*` handles hotfix or release branches
  - `feature/*` catches ongoing development work

> [!important]
> **Note**
>
> Wildcards (`*`) help you include entire branch families. To exclude specific branches, use `exclude:` under `branches`.

## Scheduled Triggers

Scheduled triggers run pipelines at specified intervals or cron schedules—ideal for nightly builds, periodic tests, or routine deployments.

![The image shows a screenshot of a scheduled trigger setup in a classic pipeline, with options to enable the trigger and set specific days and times for release. It includes a section for adding artifacts and setting a new schedule time.](https://kodekloud.com/kk-media/image/upload/v1752867885/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/scheduled-trigger-setup-classic-pipeline.jpg)

To disable CI and add a schedule in YAML:

```
trigger: none              # Turn off CI-based runs
schedules:
  - cron: "0 2 * * 1-5"     # Weekdays at 02:00 UTC
    displayName: Weekday Early-Build
    branches:
      include:
        - main
    always: true           # Run even without new commits
```

- `trigger: none` ensures only scheduled runs occur
- `cron:` follows standard cron syntax (min, hour, dom, mon, dow)
- `always: true` runs the job regardless of changes

> [!important]
> **Note**
>
> Cron schedules in Azure Pipelines are evaluated in UTC. Adjust your `cron` expression if your team operates in other time zones.

## Pull Request (PR) Triggers

PR triggers automatically validate code changes when a pull request is opened or updated. This enforces quality gates before merging to protected branches.

![The image illustrates a "Pull Request (PR) Triggers" concept, showing a CI/CD pipeline that automatically starts when a pull request is created or updated.](https://kodekloud.com/kk-media/image/upload/v1752867886/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/pull-request-triggers-cicd-pipeline.jpg)

Example YAML configuration:

```
pr:
  branches:
    include:
      - main
      - develop
      - feature/*
  paths:
    exclude:
      - docs/**
```

- `pr:` defines pull request validation triggers
- `branches.include:` lists target branches for PR checks
- `paths.exclude:` skips runs when only documentation changes

## Manual Triggers

Manual triggers allow teams to start pipelines on demand for production rollouts, hotfix deployments, or ad hoc testing.

![The image shows two use cases for manual triggers: "On-Demand deployments" and "Manual approvals," each represented with a colorful card and an icon.](https://kodekloud.com/kk-media/image/upload/v1752867886/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/manual-triggers-use-cases-deployments-approvals.jpg)

You can invoke a manual run via:

- **Azure DevOps UI**: Click **Run pipeline** and select parameters
- **Azure CLI**:

```
az pipelines run \
  --name MyPipeline \
  --branch feature/hotfix \
  --variables deployEnv=staging
```

> [!important]
> **Warning**
>
> Manual deployments bypass automated gates. Ensure you have approvals or checks in place for sensitive environments.

## Best Practices

Adopt these recommendations to keep your pipelines efficient and reliable:

- Be selective with branch filters to reduce unnecessary runs.
- Use path and tag filters to scope triggers precisely.
- Combine CI, PR, and scheduled triggers for comprehensive coverage.
- Implement manual approvals for production or compliance-sensitive deployments.
- Regularly review and clean up stale schedules or branch patterns.

![The image lists best practices for using triggers, including being selective with branches, using conditions to control pipeline execution, and incorporating manual approvals for sensitive environments.](https://kodekloud.com/kk-media/image/upload/v1752867888/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Pipeline-triggers/best-practices-triggers-pipeline-approval.jpg)

## References

- [Azure Pipelines triggers](https://docs.microsoft.com/azure/devops/pipelines/build/triggers)
- [YAML schema for Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [Cron syntax guide](https://en.wikipedia.org/wiki/Cron)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/084cb667-772b-447f-9e56-fe743bc03008)**
>
> Watch video content
