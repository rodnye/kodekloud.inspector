# Demonstration 2 Create 2 Stage Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/Creating-a-CICD-pipeline-with-AWS-CodePipeline/Demonstration-2-Create-2-Stage-Pipeline)

---

## Table of Contents

- Demonstration 2 Create 2 Stage Pipeline
  - 1. Create a CodeCommit Repository
  - 2. Clone the Repository Locally
  - 3. Add the Sample Application
  - 4. Create an IAM Role for EC2 (CodeDeploy Agent)
  - 5. Launch an EC2 Instance
  - 6. Create a CodeDeploy Application & Deployment Group
  - 7. Create the CodePipeline
  - 8. Verify the Initial Deployment
  - 9. Update the Application and Redeploy
  - Conclusion
  - References
  - Watch Video
  - Practice Lab
    - 6.1 Service Role for CodeDeploy
    - 6.2 Application & Deployment Group
    - Source Stage
    - Skip Build
    - Deploy Stage

---

## Content

AWS CodePipeline (CI/CD Pipeline)

Creating a CICD pipeline with AWS CodePipeline

# Demonstration 2 Create 2 Stage Pipeline

In this guide, you’ll set up a simple two-stage CI/CD pipeline on AWS using CodeCommit for source control and CodeDeploy for deployment. We’ll deploy a sample web application to an EC2 instance following the [AWS CodePipeline simple tutorial](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-codepipeline.html).

![The image shows a demonstration slide with an infinity loop labeled "Source" and "Deploy," alongside an AWS CodeCommit icon.](https://kodekloud.com/kk-media/image/upload/v1752862686/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/infinity-loop-source-deploy-aws-codecommit.jpg)

![The image contains a URL link to an AWS CodePipeline tutorial page. It also includes a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752862686/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-tutorial-kodekloud.jpg)

---

## 1\. Create a CodeCommit Repository

1.  Sign in to the AWS Management Console and open **CodeCommit**.
2.  Ensure your region is set (we’re using **us-west-2**).> [!important]
    > **Note**
    >
    > Always match the region across CodeCommit, CodeDeploy, and EC2 to avoid cross-region issues.
3.  Click **Create repository**, name it **MyDemoRepo**, and confirm.

![The image shows the AWS Management Console home page, displaying recently visited services and a welcome section with links to getting started, training, and new features.](https://kodekloud.com/kk-media/image/upload/v1752862688/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-management-console-home-page.jpg)

![The image shows the AWS CodeCommit interface for creating a new repository, with fields for repository name, description, and optional settings.](https://kodekloud.com/kk-media/image/upload/v1752862689/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codecommit-new-repository-interface.jpg)

Once the repo is ready, note the clone instructions:

![The image shows an AWS CodeCommit interface with a repository named "MyDemoRepo" successfully created. It displays connection steps and prerequisites for accessing the repository.](https://kodekloud.com/kk-media/image/upload/v1752862690/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codecommit-mydemorepo-interface.jpg)

---

## 2\. Clone the Repository Locally

On your laptop or workstation:

```
# Create a working directory
mkdir -p ~/demo/MyDemoRepo
cd ~/demo/MyDemoRepo


# Clone via HTTPS
git clone https://git-codecommit.us-west-2.amazonaws.com/v1/repos/MyDemoRepo .
ls
# (directory is currently empty)
```

---

## 3\. Add the Sample Application

1.  Download the sample app ZIP from the AWS tutorial and extract its contents.
2.  You should see:

    ```
    MyDemoRepo/
    ├── appspec.yml
    ├── index.html
    ├── LICENSE.txt
    └── scripts/
        ├── install_dependencies
        ├── start_server
        └── stop_server
    ```

    ![The image shows a Windows File Explorer window open to the "SampleApp_Linux" folder, displaying four selected items: "appspec," "index," "LICENSE," and "scripts."](https://kodekloud.com/kk-media/image/upload/v1752862691/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/windows-file-explorer-sampleapp-folder.jpg)

3.  Add, commit, and push:

    ```
    git add .
    git commit -m "Add initial sample application files"
    git push origin master
    ```

4.  Verify the files in the AWS Console:

    ![The image shows an AWS CodeCommit repository interface named "MyDemoRepo" with files like "scripts," "appspec.yml," "index.html," and "LICENSE.txt" listed. The interface includes options for creating pull requests and cloning the repository URL.](https://kodekloud.com/kk-media/image/upload/v1752862693/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codecommit-mydemorepo-interface-3.jpg)

---

## 4\. Create an IAM Role for EC2 (CodeDeploy Agent)

In the IAM console, go to **Roles** > **Create role**:

- **Trusted entity:** AWS service → EC2
- **Attach policies:**

  | Policy Name                   | Purpose                               |
  | ----------------------------- | ------------------------------------- |
  | AmazonEC2RoleforAWSCodeDeploy | Grants CodeDeploy agent permissions   |
  | AmazonSSMManagedInstanceCore  | Allows AWS Systems Manager operations |

![The image shows the AWS IAM Management Console with a list of permission policies related to CodeDeploy. A specific policy, "AmazonEC2RoleforAWSCodeDeploy," is selected.](https://kodekloud.com/kk-media/image/upload/v1752862694/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-iam-management-console-codedeploy-policies.jpg) ![The image shows the AWS IAM Management Console with a list of permission policies related to Amazon SSM. One policy, "AmazonSSMManagedInstanceCore," is selected.](https://kodekloud.com/kk-media/image/upload/v1752862695/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-iam-management-console-ssm-policies.jpg)

3.  Name the role **EC2InstanceRole**.
4.  Use this trust policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

After creation, you’ll see:

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, listing various roles with their trusted entities and last activity details. A green notification bar indicates that a role named "Ec2InstanceRole" has been created.](https://kodekloud.com/kk-media/image/upload/v1752862696/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-iam-console-roles-ec2instancerole.jpg)

---

## 5\. Launch an EC2 Instance

1.  In the EC2 console (same region), choose **Launch Instance**.
2.  Configure as follows:
    - **Name tag:** MyCodePipelineDemo
    - **AMI:** Amazon Linux 2 (Free Tier)
    - **Instance type:** t2.micro (Free Tier)
    - **Key pair:** Proceed without one (demo only)
    - **Network:** Enable auto-assign Public IP
    - **Security group:**
      - SSH (port 22) from My IP
      - HTTP (port 80) from My IP

![The image shows an AWS EC2 management console where a user is selecting an Amazon Machine Image (AMI) to launch an instance. The summary on the right details the instance configuration, including the software image, instance type, and storage.](https://kodekloud.com/kk-media/image/upload/v1752862698/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-console-select-ami-instance.jpg) ![The image shows an AWS EC2 management console where a user is configuring settings to launch an instance, including key pair, network settings, and instance summary details.](https://kodekloud.com/kk-media/image/upload/v1752862699/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-management-console-launch-instance.jpg) ![The image shows an AWS EC2 management console where a user is configuring security group rules and storage settings for launching an instance. The summary section on the right provides details about the instance type, software image, and storage volume.](https://kodekloud.com/kk-media/image/upload/v1752862700/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-instance-launch-configuration.jpg) ![The image shows an AWS EC2 management console where a user is configuring security group rules and storage settings for launching an instance. The summary section on the right provides details about the instance type, software image, and storage volume.](https://kodekloud.com/kk-media/image/upload/v1752862701/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-security-group-settings-console.jpg)

Under **Advanced details**, assign the **EC2InstanceRole** profile and click **Launch instances**.

![The image shows an AWS EC2 management console with a success message indicating the initiation of an instance launch. It also displays next steps for managing the instance, such as connecting to it or setting up billing alerts.](https://kodekloud.com/kk-media/image/upload/v1752862702/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-management-console-instance-launch.jpg)

---

## 6\. Create a CodeDeploy Application & Deployment Group

### 6.1 Service Role for CodeDeploy

In IAM, choose **Roles** > **Create role**:

- **Trusted entity:** AWS service → CodeDeploy
- **Managed policy:** AWSCodeDeployRole
- **Role name:** CodeDeployRole

Use this trust policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "codedeploy.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, listing various roles with their trusted entities and last activity dates. A notification at the top indicates that a role named "CodeDeployRole2" has been created.](https://kodekloud.com/kk-media/image/upload/v1752862704/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-iam-console-roles-notification.jpg)

### 6.2 Application & Deployment Group

1.  Open **CodeDeploy** > **Applications** > **Create application**:
    - **Name:** MyDemoApplication
    - **Compute platform:** EC2/On-premises

    ![The image shows the AWS CodeDeploy interface for creating a new application, with fields for application name, compute platform, and tags. The "Create application" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752862705/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codedeploy-create-application-interface.jpg)

2.  Under **Deployment groups**, click **Create deployment group**:
    - **Name:** MyDemoDeploymentGroup
    - **Service role:** CodeDeployRole
    - **Deployment type:** In-place
    - **Environment configuration:** Tag instances `Name = MyCodePipelineDemo`
    - **Load balancing:** Disabled
    - **Agent configuration:** AWS Systems Manager

    ![The image shows an AWS CodeDeploy interface where a user is creating a deployment group for an application named "MyDemoApplication." The deployment group name is set as "MyDemoDeploymentGroup."](https://kodekloud.com/kk-media/image/upload/v1752862706/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codedeploy-my-demo-deployment-group.jpg) ![The image shows an AWS CodeDeploy configuration screen where Amazon EC2 instances are being tagged for deployment. It includes options for adding tag groups and configuring the AWS Systems Manager agent.](https://kodekloud.com/kk-media/image/upload/v1752862707/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codedeploy-ec2-tagging-configuration.jpg)

When complete, review details:

![The image shows an AWS CodeDeploy interface with details of a deployment group named "MyDemoDeploymentGroup." It includes information about the application, deployment type, and environment configuration for Amazon EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752862708/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codedeploy-mydemodeploymentgroup.jpg)

---

## 7\. Create the CodePipeline

In **CodePipeline**, click **Create pipeline** and configure:

1.  **Pipeline name:** MyFirstPipeline
2.  **Service role:** New service role

![The image shows the AWS CodePipeline setup screen where a user is configuring pipeline settings, including naming the pipeline "MyFirstPipeline" and selecting a new service role.](https://kodekloud.com/kk-media/image/upload/v1752862709/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-setup-myfirstpipeline.jpg)

### Source Stage

- **Provider:** AWS CodeCommit
- **Repository name:** MyDemoRepo
- **Branch name:** master

![The image shows a screenshot of the AWS CodePipeline setup interface, where a user is configuring a source provider and repository settings. Options for change detection and output artifact format are also visible.](https://kodekloud.com/kk-media/image/upload/v1752862710/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-setup-screenshot.jpg)

### Skip Build

Choose **Skip build stage**.

### Deploy Stage

- **Action provider:** AWS CodeDeploy
- **Region:** US West (Oregon)
- **Application name:** MyDemoApplication
- **Deployment group:** MyDemoDeploymentGroup

![The image shows an AWS CodePipeline interface where a user is configuring a deployment stage using AWS CodeDeploy, selecting the region "US West (Oregon)" and specifying an application name.](https://kodekloud.com/kk-media/image/upload/v1752862711/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-deployment-config-us-west.jpg)

Review and click **Create pipeline**. The pipeline will start automatically:

![The image shows an AWS CodePipeline interface with a pipeline named "MyFirstPipeline" that is currently in progress. The interface includes options for creating and managing pipelines.](https://kodekloud.com/kk-media/image/upload/v1752862712/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-myfirstpipeline-progress.jpg)

---

## 8\. Verify the Initial Deployment

Once **Source** and **Deploy** stages complete, get the Public IPv4 DNS of your EC2 instance:

![The image shows an AWS EC2 Management Console with details of a running instance, including its instance ID, public IPv4 address, and status.](https://kodekloud.com/kk-media/image/upload/v1752862713/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-ec2-management-console-instance-details.jpg)

Paste the address into your browser to see the welcome page:

![The image shows a web page with a blue background displaying a "Congratulations" message, indicating that an application was deployed using AWS CodeDeploy. It also provides a link to the AWS CodeDeploy documentation for further steps.](https://kodekloud.com/kk-media/image/upload/v1752862714/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codedeploy-congratulations-message.jpg)

---

## 9\. Update the Application and Redeploy

1.  Modify `index.html` locally. Example update:

    ```
    <!DOCTYPE html>
    <html>
    <head>
      <title>Updated Sample Deployment</title>
      <style>
        body { background-color: #CCFFCC; font-family: Arial, sans-serif; }
        h1 { font-size: 250%; margin-bottom: 0; }
        h2 { font-size: 175%; margin-bottom: 0; }
      </style>
    </head>
    <body>
      <div align="center"><h1>Updated Sample Deployment</h1></div>
      <div align="center"><h2>Deployed via CodePipeline, CodeCommit & CodeDeploy.</h2></div>
      <div align="center">
        <p>Learn more:</p>
        <p><a href="https://docs.aws.amazon.com/codepipeline/latest/userguide/">CodePipeline User Guide</a></p>
        <p><a href="https://docs.aws.amazon.com/codecommit/latest/userguide/">CodeCommit User Guide</a></p>
        <p><a href="https://docs.aws.amazon.com/codedeploy/latest/userguide/">CodeDeploy User Guide</a></p>
      </div>
    </body>
    </html>
    ```

2.  Commit and push:

    ```
    git add index.html
    git commit -m "Update index.html for new deployment"
    git push origin master
    ```

The pipeline auto-triggers and redeploys:

![The image shows an AWS CodePipeline interface with a pipeline execution in progress. The "Source" stage has succeeded, and the "Deploy" stage is currently in progress.](https://kodekloud.com/kk-media/image/upload/v1752862716/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/aws-codepipeline-execution-source-deploy.jpg)

After deployment, refresh to view changes:

![The image shows a webpage titled "Updated Sample Deployment" with a message about using CodePipeline, CodeCommit, and CodeDeploy, along with links to user guides.](https://kodekloud.com/kk-media/image/upload/v1752862717/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Demonstration-2-Create-2-Stage-Pipeline/updated-sample-deployment-codepipeline-guides.jpg)

---

## Conclusion

You’ve successfully created and tested a two-stage AWS CodePipeline using CodeCommit and CodeDeploy. In this lesson you:

- Set up and cloned a CodeCommit repository
- Added a sample web application
- Configured IAM roles for EC2 and CodeDeploy
- Launched an EC2 instance with the CodeDeploy agent
- Defined a CodeDeploy application and deployment group
- Built a Source → Deploy pipeline
- Verified initial deployment and automated updates

Up next: we’ll extend this pipeline with build and test stages for a complete four-stage CI/CD workflow.

---

## References

- [AWS CodePipeline User Guide](https://docs.aws.amazon.com/codepipeline/latest/userguide/)
- [AWS CodeCommit User Guide](https://docs.aws.amazon.com/codecommit/latest/userguide/)
- [AWS CodeDeploy User Guide](https://docs.aws.amazon.com/codedeploy/latest/userguide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d0ecdc6d-aba5-4798-80c9-171edb45c9dc/lesson/dbfb753d-ea36-4927-8792-06eeb99fd2db)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d0ecdc6d-aba5-4798-80c9-171edb45c9dc/lesson/7fb38ae9-3f5e-445f-bd67-0d61501b113f)**
>
> Practice lab
