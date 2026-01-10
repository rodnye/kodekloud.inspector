# CodePipeline Limitations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/CICD-Pipeline-with-CodeCommit-CodeBuild-and-CodeDeploy/CodePipeline-Limitations)

---

## Table of Contents

- CodePipeline Limitations
  - Unique Naming Constraints
  - Regional Quotas and Requesting Increases
  - Core Service Limits
  - Additional Considerations
  - Links and References
  - Watch Video

---

## Content

AWS CodePipeline (CI/CD Pipeline)

CICD Pipeline with CodeCommit CodeBuild and CodeDeploy

# CodePipeline Limitations

In this guide, we’ll walk through the key limitations, quotas, and naming rules for AWS CodePipeline. Understanding these restrictions is critical for designing scalable, reliable CI/CD workflows.

## Unique Naming Constraints

Every pipeline, stage, and action name must be unique within its scope:

- Pipeline names must be unique per AWS account and region.
- Stage names must be unique within a pipeline.
- Action names must be unique within their stage.

You can reuse common stage names (for example, `Source` or `Deploy`) across different pipelines, but you cannot duplicate them inside the same pipeline.

![The image outlines naming restrictions for pipelines, stages, and actions, alongside a CI/CD infinity loop diagram with stages labeled "Source," "Deploy," and "Test."](https://kodekloud.com/kk-media/image/upload/v1752862637/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-CodePipeline-Limitations/ci-cd-pipeline-naming-restrictions-diagram.jpg)

> [!important]
> **Note**
>
> Choose descriptive stage and action names to improve pipeline readability and troubleshooting.

## Regional Quotas and Requesting Increases

Most CodePipeline quotas are applied per AWS Region. For example, the default limit of 1,000 pipelines refers to pipelines per region.

![The image shows a world map with location markers and text indicating that some quotas apply per region, with instructions to request a quota increase through the Support Center console.](https://kodekloud.com/kk-media/image/upload/v1752862638/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-CodePipeline-Limitations/world-map-location-markers-quotas.jpg)

> [!important]
> **Warning**
>
> If you hit a regional quota, you can request an increase via the [AWS Support Center](https://console.aws.amazon.com/support/home). Approval may take up to two weeks.

## Core Service Limits

Below are the default CodePipeline quotas you should plan for in each region:

| Resource            | Default Limit | Scope                  |
| ------------------- | ------------- | ---------------------- |
| Pipelines           | 1,000         | Per account per region |
| Stages per pipeline | 2–50          | Per pipeline           |
| Actions per stage   | 1–50          | Per stage              |

> Actions within a stage can execute in parallel or sequentially. The only overall cap is the per-stage limit.

![The image displays AWS pipeline limits, including the maximum number of pipelines, stages, and actions per account, stage, and pipeline.](https://kodekloud.com/kk-media/image/upload/v1752862639/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-CodePipeline-Limitations/aws-pipeline-limits-maximums-diagram.jpg)

## Additional Considerations

- Manual approval actions will time out after 7 days without a decision.
- Artifacts are typically stored in Amazon S3. While S3 supports virtually unlimited objects, general S3 limits still apply.

For the full list of quotas and best practices, see the [AWS CodePipeline Limits](https://docs.aws.amazon.com/codepipeline/latest/userguide/limits.html) documentation.

## Links and References

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/)
- [AWS Support Center](https://console.aws.amazon.com/support/home)
- [Amazon S3 Service Quotas](https://docs.aws.amazon.com/general/latest/gr/s3.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/8236e523-f637-4f0a-98c2-0accfd2cb74e/lesson/88e948ba-035f-4211-bf62-30a894bd0b8c)**
>
> Watch video content
