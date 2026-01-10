# AWS Amplify Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/AWS-Amplify-Demo)

---

## Table of Contents

- AWS Amplify Demo
  - Initializing AWS Amplify
  - Adding Authentication
  - Verifying in AWS Amplify Console and Amplify Studio
  - Managing Users and Groups
  - Additional Amplify Features
  - Reviewing the Backend in Amplify Studio
  - Conclusion
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# AWS Amplify Demo

Welcome to this comprehensive guide on AWS Amplify. In this article, you will learn how to quickly develop and deploy web and mobile applications using AWS Amplify. We will work within an AWS Cloud9 environment using an event planner app that has been pre-deployed and tested. This demo covers initializing an Amplify environment, adding authentication, and reviewing the app within AWS Amplify Studio.

---

## Initializing AWS Amplify

Begin by navigating to your event planner app directory (My Event Planner) and initializing the Amplify environment:

```
spartan sage:~/environment/webapp/my-event-planner $ amplify init
```

During the initialization process, you'll be prompted for a project name along with several configuration details. For example:

```
spartan sage:~/environment/webapp/my-event-planner $ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project (myeventplanner)
```

The default configuration typically uses Visual Studio Code as the default editor, specifies a JavaScript app type, and selects a framework such as Vue. Below is a sample configuration:

```
spartan sage:~/environment/webapp/my-event-planner$ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project: myeventplanner
Project information:
    Name: myeventplanner
    Environment: dev
    Default editor: Visual Studio Code
    App type: javascript
    Javascript framework: vue
    Source Directory Path: src
    Distribution Directory Path: dist
    Build Command: npm run-script build
    Start Command: npm run-script serve
? Initialize the project with the above configuration? (Y/n)
```

After confirming your settings, the CLI will request your AWS profile credentials (access key and secret access key). Once provided, Amplify deploys the backend resources. An excerpt from the deployment log may look like this:

```
node -ip-172-31-110-26:~
Project information
| Name: myeventplanner
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: vue
| Source Directory Path: src
| Distribution Directory Path: dist
| Build Command: npm run-script build
| Start Command: npm run-script serve
| Initialize the project with the above configuration? Yes
Using default provider: awscloudformation
| Select the authentication method you want to use: AWS profile
AWS access credentials can not be found.
| Setup new user? No
    accessKeyId: ******************
    secretAccessKey: ******************
    region: us-east-1
Adding backend environment dev to AWS Amplify app: d2ghksi5r95sq5


Deploying resources into dev environment. This will take a few minutes.
Deploying root stack myeventplanner [amplify-myeventplanner-dev-10...] 2/4
AWS::CloudFormation::Stack                     CREATE_IN_PROGRESS
AWS::IAM::Role                                 CREATE_COMPLETE
AWS::S3::Bucket                               CREATE_IN_PROGRESS
...
bash -ip-172-31-110-26:~/
spartan$ ~/environment $
```

Once the environment has been initialized, verify the status with:

```
spartan sage:~/environment/webapp/my-event-planner $ amplify status
```

> [!important]
> **Tip**
>
> Running the command from the root of your project helps avoid configuration issues.

---

## Adding Authentication

To secure your application, add Cognito-based authentication. In this demo, manual configuration is used to create a Cognito user pool along with an admin group. Execute the following command from the My Event Planner directory:

```
spartan sage:~/environment/webapp/my-event-planner $ amplify add auth
```

You will then encounter prompts similar to the following:

```
Using service: Cognito, provided by: awscloudformation


The current configured provider is Amazon Cognito.
Do you want to use the default authentication and security configuration? Manual configuration
Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)
Provide a friendly name for your resource that will be used to label this category in the project: myeventplannerAuth
Enter a name for your identity pool: myeventplannerIdentityPool
Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) No
Provide a name for your user pool: myeventplannerUserPool
Do you want to enable 3rd party authentication providers in your identity pool? No
How do you want users to be able to sign in? Email
Do you want to add User Pool Groups? Yes
Provide a name for your user pool group:
```

Proceed by creating the necessary user pool groups (e.g., an "admins" group) and follow the remaining configuration steps. This process sets up essential registration features, including email-based sign-up, while keeping multi-factor authentication disabled.

Push your changes to AWS Amplify with the following command:

```
amplify push
```

This action provisions the necessary AWS Cognito resources such as the user pool and identity pool.

---

## Verifying in AWS Amplify Console and Amplify Studio

After deploying authentication resources, verify your backend configuration in the AWS Amplify Console. This console displays details such as hosting environments, backend configurations, and authentication settings.

To pull the latest configuration, run:

```
$ amplify pull --appId d29ghk5irj95q5 --envName dev
```

Afterward, click on "Launch Studio" in the Amplify Console to access a graphical interface for managing backend resources, user management, and deployment activity. Notice that changes made via the CLI will be reflected in Amplify Studio.

Below is an image displaying the AWS Amplify Console with project configuration details:

![The image shows a code editor with a terminal, displaying AWS Amplify deployment logs and project configuration details.](https://kodekloud.com/kk-media/image/upload/v1752862028/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_120.jpg)

---

## Managing Users and Groups

Within Amplify Studio, select "Launch Studio" and allow any necessary pop-ups. Then, navigate to the "User Management" section under the Management tab. Initially, no users are displayed. You can either register users manually or allow user self-signup.

For demonstration, create a user (e.g., Michael at KodeKloud) with a temporary password and assign them to the "admins" group. The image below shows the "Create user" form:

![The image shows a user management interface with a "Create user" form, including fields for email and password, and a password generator tool.](https://kodekloud.com/kk-media/image/upload/v1752862029/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_580.jpg)

After the user is created, you will see confirmation and status details as shown here:

![The image shows a user management interface in AWS Amplify Studio, displaying a confirmation message for adding a user with email details and status.](https://kodekloud.com/kk-media/image/upload/v1752862031/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_600.jpg)

---

## Additional Amplify Features

Beyond authentication, AWS Amplify offers a suite of features including analytics, REST APIs, Lambda functions, and GraphQL (AppSync) for API development. Although this demo focuses on authentication, you can extend functionality to include file storage, data modeling, and more backend resources.

For instance, to add a function, use:

```
amplify add function
```

And if necessary, install the Amplify CLI with:

```
curl -sL https://aws-amplify.github.io/amplify-cli/install-wiz -o install.cmd && install.cmd
```

You can also synchronize your local environment with the cloud using:

```
amplify pull --appId d2gihSzi5j5g5 --envName dev
```

---

## Reviewing the Backend in Amplify Studio

Revisit the AWS Amplify Console to monitor and manage your backend. In the backend environment tab, view the "dev" environment with details on authentication and hosting configurations. The image below shows access control and backend environment details:

![The image shows the AWS Amplify console, displaying app settings for "myeventplanner," including access control and backend environment details.](https://kodekloud.com/kk-media/image/upload/v1752862032/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_510.jpg)

Additionally, explore Amplify Studio for data modeling, UI development, and further backend configurations:

![The image shows the AWS Amplify Studio interface for "myeventplanner's" development environment, displaying deployment activity logs and options for data modeling and UI development.](https://kodekloud.com/kk-media/image/upload/v1752862033/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_540.jpg)

Review the authentication configuration in detail:

![The image shows the authentication configuration page in AWS Amplify Studio, detailing login and sign-up settings with options for email and multi-factor authentication.](https://kodekloud.com/kk-media/image/upload/v1752862034/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Amplify-Demo/frame_660.jpg)

---

## Conclusion

This guide demonstrated how to initialize an AWS Amplify environment, add Cognito-based authentication, and manage backend resources using both the AWS CLI and Amplify Studio. AWS Amplify simplifies the deployment of web and mobile applications, enabling you to focus on enhancing features and scaling your application efficiently.

Thank you for following along with this AWS Amplify demo. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/da8eef0c-44d5-4004-9534-1d4eb5007009)**
>
> Watch video content
