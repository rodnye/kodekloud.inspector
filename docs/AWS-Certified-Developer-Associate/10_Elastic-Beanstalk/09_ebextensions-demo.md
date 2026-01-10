# ebextensions demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Beanstalk/ebextensions-demo)

---

## Table of Contents

- ebextensions demo
  - Setting Up the .ebextensions Folder
  - Example: Including HTML Files
  - Configuring a Network Load Balancer
  - Setting Environment Variables
  - Verifying Updates in the AWS Console
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Elastic Beanstalk

# ebextensions demo

In this lesson, we demonstrate how to modify your Elastic Beanstalk environment configuration using the EB extensions folder in your application's source code. By leveraging EB extensions, you can configure nearly every option available through the AWS CLI or the AWS Management Console. For a complete list of configuration options, please refer to the [AWS Elastic Beanstalk documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html) under "Configuring Environments – Advanced Configuration Options."

![The image shows a webpage from the AWS Elastic Beanstalk Developer Guide, listing various namespaces related to configuration options for environments.](https://kodekloud.com/kk-media/image/upload/v1752858882/notes-assets/images/AWS-Certified-Developer-Associate-ebextensions-demo/aws-elastic-beanstalk-namespaces-guide.jpg)

## Setting Up the .ebextensions Folder

When working with EB extensions, you must create a folder named **.ebextensions** in the root of your project directory. All configuration files placed inside this folder must use the `.config` file extension. While the filename itself has no impact on functionality, it is best practice to choose descriptive names that clarify the file's purpose.

For example, in our Elastic Beanstalk demonstration, the application source code includes two configuration files:

1.  **network-load-balancer.config**: Modifies the configuration of the load balancer in the environment.
2.  **environment-variables.config**: Sets environment variables on the EC2 instances hosting the application.

## Example: Including HTML Files

Below is an example of an HTML file included in the application. Remember, any file included in your application must follow the correct format:

```
<html>
  <head>
    <style>
      ul {
        li {
          margin: 1em 0em;
        }
      }
    </style>
  </head>
  <body>
    <div class="textColumn">
      <h1>Congratulations V2</h1>
      <p>
        Your first AWS Elastic Beanstalk Node.js application is now running on your own dedicated environment in the AWS Cloud.
      </p>
      <p>
        This environment is launched with the Elastic Beanstalk Node.js Platform.
      </p>
    </div>
  </body>
</html>
```

## Configuring a Network Load Balancer

The **network-load-balancer.config** file changes the default load balancer from an application load balancer to a network load balancer. Consider the following YAML snippet:

```
option_settings:
  aws:elasticbeanstalk:environment:
    LoadBalancerType: network
```

This configuration directs Elastic Beanstalk to use a network load balancer, which can be beneficial for certain application requirements.

## Setting Environment Variables

Similarly, the **environment-variables.config** file is used to set environment variables that your application may require. For instance, the snippet below sets the database username and password:

```
option_settings:
  aws:elasticbeanstalk:application:environment:
    DB_USERNAME: user1
    DB_PASSWORD: password123
```

These configuration files demonstrate how the EB extensions folder enables you to make environment changes directly in the application source code, eliminating the need to manually update settings through the AWS Management Console.

> [!important]
> **Package and Deploy Your Application**
>
> After configuring your environment, package your application source code into a ZIP file. In this demonstration, the package is named "version three" to indicate the updated configuration. When you upload the package, Elastic Beanstalk automatically reads and applies the configuration settings.

## Verifying Updates in the AWS Console

To confirm that the environment variables and other settings have been applied:

1.  Open your application's web console.
2.  Navigate to the configuration section under "Updates, Monitoring, and Logging."
3.  Scroll down to "Platform Software" and review the "Environment Properties" that were set by your EB extensions.

![The image shows an AWS Elastic Beanstalk configuration page where log streaming to CloudWatch is being set up, and environment properties like database username and password are being configured.](https://kodekloud.com/kk-media/image/upload/v1752858884/notes-assets/images/AWS-Certified-Developer-Associate-ebextensions-demo/aws-elastic-beanstalk-log-streaming-config.jpg)

## Conclusion

This lesson demonstrated how to use EB extensions to manage and automate configuration in an Elastic Beanstalk environment. By incorporating configuration files directly within your application source code, you create a more flexible and streamlined deployment process.

For further information on AWS Elastic Beanstalk and advanced configuration options, please refer to the [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3f5ca094-fa86-4914-92ae-0ccab67b102d/lesson/77e122fb-0864-4959-8798-9df227f9f433)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3f5ca094-fa86-4914-92ae-0ccab67b102d/lesson/80299fdf-16b0-4ce6-9412-7fd70e14ceed)**
>
> Practice lab
