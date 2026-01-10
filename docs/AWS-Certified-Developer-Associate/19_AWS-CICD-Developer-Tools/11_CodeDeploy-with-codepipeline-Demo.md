# CodeDeploy with codepipeline Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/CodeDeploy-with-codepipeline-Demo)

---

## Table of Contents

- CodeDeploy with codepipeline Demo
  - Setting Up the CodeCommit Repository
  - Configuring CodePipeline
  - Deploying a New Version
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# CodeDeploy with codepipeline Demo

In this lesson, we demonstrate how to integrate CodeDeploy with CodePipeline to automatically deploy your application from CodeCommit to EC2 instances. Every code change pushed to your CodeCommit repository triggers a seamless deployment via CodeDeploy, all orchestrated by CodePipeline.

## Setting Up the CodeCommit Repository

Begin by creating a CodeCommit repository to store your application files. In our example, the repository includes the following files:

```
7 files changed, 73 insertions(+)
create mode 100644 appspec.yml
create mode 100644 codedeploy.sh
create mode 100644 demo.pem
create mode 100644 index.html
create mode 100644 scripts/install.sh
create mode 100644 scripts/start.sh
create mode 100644 scripts/stop.sh
codeDeploy-1 on main on (us-east-1)
```

Any commit to CodeCommit will automatically trigger a deployment to your EC2 instances by firing up CodeDeploy in a continuous delivery pipeline managed by CodePipeline.

Below is a sample HTML file representing version 2 of our application:

```
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>This is v2 of my app</h1>
</body>
</html>
```

After preparing your files, push them to the CodeCommit repository using:

```
git push --set-upstream origin main
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 12 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (10/10), 2.34 KiB | 2.34 MiB/s, done.
Total 10 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Validating objects: 0
```

Once pushed, refreshing the CodeCommit repository confirms that all files are intact.

![The image shows an AWS CodeCommit repository named "codeDeployDemo" with a list of files including scripts, appspec.yml, codedeploy.sh, demo.pem, and index.html. The interface displays options for managing the repository, such as creating a pull request and cloning the URL.](https://kodekloud.com/kk-media/image/upload/v1752858000/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy-with-codepipeline-Demo/aws-codecommit-repo-codedepoydemo.jpg)

## Configuring CodePipeline

Next, create a new pipeline in CodePipeline. For our demo, we name the pipeline "CodeDeploy Pipeline Demo" and retain the default settings.

![The image shows the AWS CodePipeline settings page, where a user is configuring a pipeline named "codedeploypipelineDemo" with options for pipeline type, execution mode, and service role.](https://kodekloud.com/kk-media/image/upload/v1752858001/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy-with-codepipeline-Demo/aws-codepipeline-settings-codedeploypipeline.jpg)

On the following page, select AWS CodeCommit as the source provider. Choose the "CodeDeploy Demo" repository and select the main branch.

![The image shows an AWS CodePipeline interface where a user is adding a source stage, selecting AWS CodeCommit as the source provider, and choosing a repository.](https://kodekloud.com/kk-media/image/upload/v1752858002/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy-with-codepipeline-Demo/aws-codepipeline-source-stage-codecommit.jpg)

Skip the optional build stage (which can be used for linting, testing, or packaging) and proceed directly to the deployment stage. For deployment, select AWS CodeDeploy, specify your application name as "web app" and choose the appropriate deployment group. Continue to the next step.

After reviewing your pipeline settings, create the pipeline. It will run immediately, with both the source and deployment stages completing successfully.

![The image shows an AWS CodePipeline review page, displaying pipeline settings such as the pipeline name, type, execution mode, and artifact location. There are no variables defined at the pipeline level.](https://kodekloud.com/kk-media/image/upload/v1752858003/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy-with-codepipeline-Demo/aws-codepipeline-review-settings.jpg)

At this stage, the pipeline processes the first version of your deployment. Since the current code is version two and no new changes are present, the deployment reflects version two.

## Deploying a New Version

To deploy an updated version of your application, modify the code accordingly. In this example, we update the HTML file to indicate version three:

```
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>This is v3 of my app</h1>
</body>
</html>
```

Commit and push the changes with the following commands:

```
git add .
git commit -m "v3"
[main f60fd4] v3
 1 file changed, 1 insertion(+), 1 deletion(-)
git push
```

> [!important]
> **Automatic Pipeline Trigger**
>
> Once the changes are pushed, the pipeline is triggered automatically. The new version (v3) is deployed after the pipeline runs successfully.

Within seconds, the updated pipeline executes and successfully deploys version three of your application.

![The image shows an AWS CodePipeline interface with successful stages for "Source" and "Deploy" using AWS CodeCommit and AWS CodeDeploy. The pipeline execution is marked as succeeded.](https://kodekloud.com/kk-media/image/upload/v1752858004/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy-with-codepipeline-Demo/aws-codepipeline-success-source-deploy.jpg)

After the deployment, verify the updated application version on your EC2 instance.

## Conclusion

This lesson illustrated how seamlessly CodeDeploy integrates with CodePipeline to automate application deployments whenever new code is pushed to CodeCommit. The complete process—from setting up the repository to automated deployment on EC2—results in a robust continuous delivery workflow.

Happy deploying, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/ab1e950d-ff3e-4393-9791-9822f51a5396)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/4702836d-153e-4156-b145-5ba90df6e18f)**
>
> Practice lab
