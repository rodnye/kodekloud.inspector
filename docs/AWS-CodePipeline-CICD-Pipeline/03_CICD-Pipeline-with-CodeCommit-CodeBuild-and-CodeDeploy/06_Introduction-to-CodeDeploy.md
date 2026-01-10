# Introduction to CodeDeploy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/CICD-Pipeline-with-CodeCommit-CodeBuild-and-CodeDeploy/Introduction-to-CodeDeploy)

---

## Table of Contents

- Introduction to CodeDeploy
  - What Is AWS CodeDeploy?
  - Deployment Strategies
  - Managing Deployments with AppSpec
  - References
  - Watch Video
    - Blue/Green Deployments
      - Traffic Shifting Configurations

---

## Content

AWS CodePipeline (CI/CD Pipeline)

CICD Pipeline with CodeCommit CodeBuild and CodeDeploy

# Introduction to CodeDeploy

In a CI/CD pipeline, AWS CodePipeline orchestrates the workflow from source to build and test. The final step—**deployment**—is implemented by AWS CodeDeploy. This fully managed service automates code delivery and updates across multiple compute platforms.

## What Is AWS CodeDeploy?

AWS CodeDeploy deploys application revisions (code, scripts, web assets, multimedia) to these targets:

- Amazon EC2 instances
- On-premises servers
- AWS Lambda functions
- Amazon ECS services
- AWS Fargate tasks

![The image shows a list of deployment targets for AWS CodeDeploy, including Amazon EC2 instances, on-premise instances, Lambda, and ECS, alongside the AWS CodeDeploy logo.](https://kodekloud.com/kk-media/image/upload/v1752862645/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/aws-codedeploy-deployment-targets-list.jpg)

At the **source** stage of your pipeline, you can store your application bundle in:

- Amazon S3
- AWS CodeCommit
- GitHub
- Bitbucket

![The image shows a DevOps lifecycle diagram with stages like Source, Build, Test, Deploy, and tools such as AWS S3, AWS CodeCommit, GitHub, and Bitbucket.](https://kodekloud.com/kk-media/image/upload/v1752862647/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/devops-lifecycle-diagram-source-build-test-deploy.jpg)

As a fully managed service, CodeDeploy handles infrastructure provisioning, scaling, and maintenance. Key benefits include:

- Automatic scaling from a single instance to tens of thousands
- Built-in deployment strategies to minimize downtime
- Monitoring and rollback capabilities via AWS Console, CLI, or SDKs

![The image is a promotional graphic for AWS CodeDeploy, highlighting features such as being fully managed, scalable, and minimizing downtime.](https://kodekloud.com/kk-media/image/upload/v1752862648/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/aws-codedeploy-promotional-graphic.jpg)

## Deployment Strategies

AWS CodeDeploy offers four primary strategies:

| Strategy   | Description                                                                     | Best For                                        |
| ---------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
| In-Place   | Update the application on existing instances directly.                          | Simple updates; minimal infrastructure changes. |
| Rolling    | Deploy to a subset of instances in batches, allowing validation per batch.      | When gradual rollout and testing are required.  |
| Immutable  | Launch new instances with the updated application, then swap over traffic.      | Zero-downtime requirements; high reliability.   |
| Blue/Green | Maintain two environments (“blue” and “green”) and switch traffic between them. | Instant rollback and seamless cutover.          |

![The image shows three types of deployment: In Place, Rolling, and Immutable, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752862649/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/deployment-in-place-rolling-immutable-icons.jpg)

### Blue/Green Deployments

In a blue/green deployment, you maintain:

- **Blue**: The active production environment.
- **Green**: A staging environment with the new release.

After validating the green environment, you shift traffic using DNS, load balancers, or Auto Scaling. If any issues occur, switch back to blue instantly. Otherwise, complete the traffic migration to green.

![The image depicts a blue-green deployment architecture using AWS services, including EC2 instances, Route 53 DNS, Elastic Load Balancing, and Auto Scaling.](https://kodekloud.com/kk-media/image/upload/v1752862650/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/blue-green-deployment-aws-architecture.jpg)

#### Traffic Shifting Configurations

| Configuration | Behavior                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| Canary        | Shift a small percentage of traffic to green, validate, then shift rest. |
| Linear        | Shift equal percentages at regular intervals until complete.             |
| All-at-once   | Move 100% of traffic to green in a single step.                          |

![The image illustrates three types of blue/green deployment methods: Canary, Linear, and All-at-once, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752862651/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/blue-green-deployment-methods-icons.jpg)

> [!important]
> **Manual and Automated Approvals**
>
> You can integrate health checks or manual approval actions before, during, or after traffic shifts to ensure deployment safety.

## Managing Deployments with AppSpec

To coordinate deployments, CodeDeploy uses:

1.  **CodeDeploy Agent**  
    Installed on each target to execute deployment tasks.

    > [!important]
    > **Agent Installation**
    >
    > Ensure the CodeDeploy Agent runs with sufficient IAM permissions and is kept up to date.

2.  **AppSpec File (`appspec.yml`)**  
    A YAML manifest that maps source files to destination paths and defines lifecycle event hooks.

```
version: 0.0
os: linux
files:
  - source: /web/build/
    destination: /var/www/html/
hooks:
  BeforeInstall:
    - location: scripts/backup.sh
      timeout: 300
  AfterInstall:
    - location: scripts/configure.sh
  ApplicationStart:
    - location: scripts/start_server.sh
```

![The image shows a split design with "Appspec.yml" on the left and "AWS CodeDeploy" on the right, featuring their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752862652/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeDeploy/appspec-yml-aws-codedeploy-design.jpg)

## References

- [AWS CodeDeploy Documentation](https://docs.aws.amazon.com/codedeploy/latest/userguide/)
- [AWS CodePipeline User Guide](https://docs.aws.amazon.com/codepipeline/latest/userguide/)
- [AWS Lambda Deployment Types](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/8236e523-f637-4f0a-98c2-0accfd2cb74e/lesson/b0121cd5-3cad-4fc9-9ebf-edaa8af9c215)**
>
> Watch video content
