# CodeBuild Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/CodeBuild-Demo)

---

## Table of Contents

- CodeBuild Demo
  - Automating Linting and Testing
  - Setting Up the Repository and Pushing Code
  - Configuring CodeBuild
  - Integrating CodeBuild with CodePipeline
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# CodeBuild Demo

In this lesson, we demonstrate how to work with AWS CodeBuild using an application similar to one previously deployed on Elastic Beanstalk. The sample app has been slightly modified to illustrate how automated linting and testing can enhance your development workflow.

---

## Automating Linting and Testing

Enhancing code quality and functionality is made easier with automated linting and testing tools. In this example, we use automated tests and linters to ensure our code meets best practices and functions as intended.

For instance, consider the following scenario. When you execute these commands:

```
st-1) took 6s
rm -rf .git/
courses-sanjeev-desktop\aws-developer-associate\codePipeline via v20.12.1 on (us-eas)
t-1) git status
fatal: not a git repository (or any of the parent directories): .git
courses-sanjeev-desktop\aws-developer-associate\codePipeline via v20.12.1 on (us-eas)
t-1)
```

the system indicates that the Git repository has been removed, showing that commands are being run outside a Git-managed project.

Tools for linting and testing ensure that automated tests—executed by running `npm run test`—correctly report whether the code passes or fails. After executing tests, you might see output similar to:

```
> Elastic-Beanstalk-Sample-App@0.0.1 test
jest --ci
PASS  ./add.test.js
 ✓ adds 1 + 2 to equal 3 (2 ms)


Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.319 s, estimated 1 s
Ran all test suites.
courses-sanjeev-desktop\aws-developer-associate\codePipeline via v20.12.1 on (us-eaa) took 2s
```

A deliberate bug can be introduced to trigger test failures. For example, modifying the function as follows:

```
const add = (num1, num2) => {
    return num1 + num2 + 1;
};


module.exports = add;
```

Even if one log sample still shows a passing status, eventually running:

```
> jest --ci
 PASS  /add.test.js
  ✓ adds 1 + 2 to equal 3 (2 ms)


Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.319 s, estimated 1 s
Ran all test suites.
```

and then executing:

```
> npm run test
```

will reveal failing tests if the bug is not fixed. Restoring the code (changing it back to `num1 + num2`) causes the tests to pass again.

Linting, on the other hand, inspects your code for adherence to best practices. For example, the following code:

```
const add = (num1, num2) => {
    return num1 + num2;
};


module.exports = add;
```

produces a passing test output:

```
PASS  ./add.test.js
✓ adds 1 + 2 to equal 3 (2 ms)


Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.33 s, estimated 1 s
Ran all test suites.
courses-sanjeev-desktop\aws-developer-associate\codePipeline via v20.12.1 on (us-eaa) took 2s
```

Running the linting command (`npm run lint`) may reveal issues. For example, errors like an undefined variable named `test` or `expect`, and an unused variable (`body`), are flagged:

```
st-1) took 2s
npm run lint
> Elastic-Beanstalk-Sample-App@0.0.1 lint
> eslint -


C:\Users\sanjee\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\codePipeline\add.test.js
  3:3  error  'test' is not defined  no-undef
  4:3  error  'expect' is not defined  no-undef


C:\Users\sanjee\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\codePipeline\app.js
  15:19  error  'body' is assigned a value but never used  no-unused-vars
  19:21  error  Unexpected constant condition  no-constant-condition


✖ 4 problems (4 errors, 0 warnings)
```

Consider the following snippet from the application code:

```
const server = http.createServer(function (req, res) {
    if (req.method === "POST") {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
    }


    req.on("end", function () {
        // Handle end of request
    });
});
```

Linting this code may flag issues such as unused variables or constant conditions if not handled properly. After correcting these issues, running `npm run lint` confirms that the code adheres to established best practices.

> [!important]
> **Automation Tip**
>
> To ensure every change is validated, developers should run both linting and tests. By pushing code to CodeCommit, you can configure CodeBuild to run these checks automatically, streamlining your deployment process.

---

## Setting Up the Repository and Pushing Code

Begin by creating a repository in CodeCommit. For instance, name the repository "webapp". Follow these steps to add files to Git and push the initial commit:

```
echo "# webapp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Sanjeev-Thiyagarajan/webapp.git
git push -u origin main
```

Once these steps are complete, navigate to CodeCommit and refresh the page to view the repository contents.

---

## Configuring CodeBuild

After setting up your repository, navigate to the CodeBuild service and create a new project (e.g., "webapp-CodeBuild"). Adjust the following settings:

1.  **Source:** Select CodeCommit and choose the "webapp" repository with the main branch.
2.  **Environment:** Choose a managed image. For example, run the build on EC2 with Amazon Linux using the latest Node.js version (e.g., Node.js 20).
3.  **Service Role:** Create a new service role.
4.  **Build Specifications:** Supply build commands either directly or by using a buildspec file.

Below is an example of a `buildspec.yaml` file that installs dependencies, performs linting and testing, and defines post-build actions:

```
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - echo entering install phase
  pre_build:
    commands:
      - echo Entering pre_build phase
      - npm install
  build:
    commands:
      - echo entering build phase
      - npm run lint
      - npm run test
  post_build:
    commands:
      - echo entering post_build phase
artifacts:
  files:
    - '**/*'
```

Once the project is configured, start the build. The CodeBuild logs will display phases such as installing Node.js, running `npm install`, executing linting with `npm run lint`, and running tests with `npm run test`. If any phase fails (for instance, due to failing tests), CodeBuild halts further execution, and the build fails.

Several images below illustrate the configuration steps:

![The image shows an AWS CodeCommit interface with a notification indicating "webapp successfully deleted" and no repositories listed.](https://kodekloud.com/kk-media/image/upload/v1752857931/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codecommit-webapp-deleted-notification.jpg)

![The image shows an AWS CodeBuild interface for creating a build project, where users can configure the project name and type. Options include selecting a default or runner project.](https://kodekloud.com/kk-media/image/upload/v1752857933/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codebuild-create-project-interface.jpg)

![The image shows an AWS console screen for managing default source credentials, with a pop-up window prompting to authorize the AWS Connector for GitHub.](https://kodekloud.com/kk-media/image/upload/v1752857935/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-console-source-credentials-github.jpg)

![The image shows an AWS CodeBuild setup screen where a GitHub repository is being connected for a build project. It includes options for repository selection and webhook configuration.](https://kodekloud.com/kk-media/image/upload/v1752857936/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codebuild-github-setup.jpg)

![The image shows an AWS CodeBuild configuration screen where options for provisioning model, environment image, compute, and running mode are being selected. The "On-demand" provisioning model and "Managed image" environment image are chosen.](https://kodekloud.com/kk-media/image/upload/v1752857936/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codebuild-configuration-screen.jpg)

After adding the `buildspec.yaml` file to your repository (using `git add`, `git commit`, and `git push`), CodeBuild detects the file and automatically starts a new build. For example, the logs might display:

```
{
  "name": "Elastic-Beanstalk-Sample-App",
  "version": "0.0.1",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "Elastic-Beanstalk-Sample-App",
      "version": "0.0.1",
      "devDependencies": {
        "@eslint/js": "^9.0.0",
        "eslint": "^9.0.0",
        "globals": "^15.0.0",
        "jest": "^29.7.0"
      }
    },
    "node_modules/@aashutoshrathi/word-wrap": {
      "version": "1.2.6"
    }
  }
}
```

This configuration ensures that all repository files are packaged and passed along as artifacts for deployment.

Additional diagrams illustrate the process:

![The image shows an AWS CodeBuild configuration screen where options for compute, running mode, operating system, runtime, and service role are being set. The selected options include EC2 for compute, container for running mode, and Amazon Linux for the operating system.](https://kodekloud.com/kk-media/image/upload/v1752857937/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codebuild-configuration-screen-2.jpg)

![The image shows a GitHub repository named "webapp" with a list of files such as `.gitignore`, `add.js`, and `buildspec.yml`, all marked as "first commit." The repository has no stars, forks, or description.](https://kodekloud.com/kk-media/image/upload/v1752857938/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/github-repo-webapp-first-commit.jpg)

![The image shows an AWS CodeBuild interface with a build in progress for a project named "webapp-codebuild." The build status, start time, and other details are displayed on the screen.](https://kodekloud.com/kk-media/image/upload/v1752857939/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codebuild-webapp-progress.jpg)

Once the build completes successfully—with all linting and testing passing—you will see detailed logs showing the duration of each phase.

---

## Integrating CodeBuild with CodePipeline

To fully automate your deployment process, integrate CodeBuild with CodePipeline. With this integration, every code change pushed to CodeCommit automatically triggers a CodeBuild run that performs linting and testing. If the build passes, CodePipeline then deploys the resulting artifact to your Elastic Beanstalk environment.

Follow these steps to configure the pipeline:

1.  **Create a Pipeline:**  
    In CodePipeline, create a new pipeline (for example, "webapp-pipeline").
    - **Source Stage:** Set to CodeCommit and select your repository.
    - **Build Stage:** Specify AWS CodeBuild and choose the "webapp-CodeBuild" project.
    - **Deploy Stage:** Use Elastic Beanstalk as the deploy provider and select your existing application and environment.

The following diagram shows a typical CodePipeline setup:

![The image shows an AWS CodePipeline setup screen where a user is configuring pipeline settings, including the pipeline name, type, execution mode, and service role.](https://kodekloud.com/kk-media/image/upload/v1752857940/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codepipeline-setup-screen.jpg)

Initially, if the deploy stage is configured to use a build artifact that isn’t generated, deployment may fail with an error like:

```
[Container] ... Phase context status code: YAML_FILE_ERROR Message: YAML file does not exist
```

To resolve this, update your `buildspec.yaml` file to define an artifact by adding an artifacts section:

```
artifacts:
  files:
    - '**/*'
```

After pushing the updated file to CodeCommit, CodeBuild produces an artifact containing all necessary production files. You can further refine this by pruning unnecessary files (such as test files or ESLint configurations) to ensure that only production-relevant code is deployed.

Additional images detail the pipeline configuration and troubleshooting steps:

![The image shows an AWS CodePipeline interface with sections for Source, Build, and Deploy stages. The Source stage is in progress, while the Build and Deploy stages have not run yet.](https://kodekloud.com/kk-media/image/upload/v1752857941/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codepipeline-source-build-deploy.jpg)

![The image shows an AWS CodePipeline interface where the build stage has succeeded, but the deploy stage has failed. The error message indicates an issue with finding the artifact or Amazon S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752857942/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codepipeline-build-succeeded-deploy-failed.jpg)

![The image shows an AWS CodePipeline interface with a "Deploy" action that has failed. The error message indicates an issue with finding the artifact or Amazon S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752857943/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codepipeline-deploy-failed-error.jpg)

![The image shows an Amazon S3 interface with a message indicating that an object was not found in a specified bucket path. The interface includes navigation options and a sidebar with various AWS services.](https://kodekloud.com/kk-media/image/upload/v1752857944/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/amazon-s3-object-not-found-interface.jpg)

![The image shows a configuration screen for editing an action in AWS CodePipeline, specifically for deploying an application using AWS Elastic Beanstalk. It includes fields for action name, provider, region, input artifacts, application name, and environment name.](https://kodekloud.com/kk-media/image/upload/v1752857945/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild-Demo/aws-codepipeline-elastic-beanstalk-config.jpg)

After updating the input artifact settings in CodePipeline to match the build artifact and committing the changes, trigger another run by pushing a new commit. For example, updating an HTML file to display version information can confirm that the new artifact is deployed correctly.

If a build failure occurs—such as a introduced bug that causes `npm run test` to fail—CodeBuild stops the pipeline, and the previous stable version remains deployed. The logs will indicate the failure, and no new deployment is made.

Consider this example HTML snippet from before a failed deployment:

```
<html>
  <head></head>
  <body>
    <div class="textColumn">
      <h1>This is v3</h1>
      <p>Your first AWS Elastic Beanstalk Node.js application is now running on your own dedicated environment in the AWS Cloud</p>
      <p>This environment is launched with Elastic Beanstalk Node.js Platform</p>
    </div>
    <div class="linksColumn">
    </div>
  </body>
</html>
```

Since the build phase fails when tests do not pass, the deployed version remains unchanged in your Elastic Beanstalk environment.

---

## Conclusion

This lesson demonstrated how to integrate automated linting and testing using CodeBuild and how to automate these checks using CodePipeline with CodeCommit and Elastic Beanstalk. By using a `buildspec.yaml` file, you ensure that your code quality is verified with every commit, effectively preventing broken code from reaching production.

Happy coding and enjoy your streamlined workflow!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/17b36d54-77bb-40ed-82bc-54bf9556e36d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/7c84d14b-5663-4119-8e18-091b8bb714a8)**
>
> Practice lab
