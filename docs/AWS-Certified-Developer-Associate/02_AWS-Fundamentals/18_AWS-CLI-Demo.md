# AWS CLI Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CLI-Demo)

---

## Table of Contents

- AWS CLI Demo
  - Managing AWS S3 with the CLI
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CLI Demo

In this article, we explore how to manage AWS resources using the AWS Command Line Interface (CLI) instead of the web-based AWS Console. Although the AWS Console provides a user-friendly graphical interface, many engineers prefer the CLI for its speed, automation capabilities, and ease of scripting.

![The image shows a webpage for the AWS Command Line Interface, detailing features, installation instructions for different operating systems, and related resources. It includes links for getting started, documentation, and community forums.](https://kodekloud.com/kk-media/image/upload/v1752858107/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CLI-Demo/aws-cli-webpage-features-installation.jpg)

To get started, visit [aws.amazon.com/CLI](https://aws.amazon.com/cli/) for detailed installation instructions tailored to your operating system. Generally, the installation process is straightforward, involving just a few terminal commands as detailed in the official documentation.

Once the CLI is installed, you can access AWS services directly from your terminal. One of its powerful features is the built-in help option. If you need guidance on any command, simply append "help" to your command. For example:

```
aws help
```

This command displays a summary of the AWS CLI’s syntax, global options, and available commands.

The general structure of an AWS CLI command is as follows:

1.  aws
2.  \[global options, such as --region\]
3.  \[primary command, e.g., s3\]
4.  \[subcommand, e.g., ls or mb\]
5.  \[additional parameters or flags\]

![The image shows a terminal window displaying information about the AWS Command Line Interface, including a description, synopsis, and global options.](https://kodekloud.com/kk-media/image/upload/v1752858108/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CLI-Demo/aws-cli-terminal-window-info.jpg)

For instance, to specify a region, include the --region flag followed by your target region. This is analogous to selecting a region in the AWS Console.

> [!important]
> **Tip**
>
> For a comprehensive list of regions supported by AWS CLI, refer to the [AWS Regions and Endpoints Documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html).

## Managing AWS S3 with the CLI

AWS S3 is a popular service for storing and retrieving data, similar to Dropbox or Google Drive. You can explore S3 commands by executing:

```
aws s3 help
```

This command provides detailed options, arguments, and explanations for various notations, including those for specifying local paths and S3 URIs.

![The image shows a terminal window with text explaining concepts and notations for high-level S3 commands, including path argument types like "LocalPath" and "S3Uri."](https://kodekloud.com/kk-media/image/upload/v1752858110/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CLI-Demo/s3-commands-notations-terminal.jpg)

One commonly used command is to create a new S3 bucket using the "aws s3 mb" command (short for "make bucket"). For more information on this command, you can view its help section:

```
aws s3 mb help
```

Under the example usage section, you might see snippets like:

```
aws s3 mb s3://mybucket
Output:
make_bucket: s3://mybucket


aws s3 mb s3://mybucket --region us-west-1
Output:
make_bucket: s3://mybucket
```

Now, let’s create a bucket named "kodekloud-cli-demo." Run the following command in your terminal:

```
aws s3 mb s3://kodekloud-cli-demo
```

If the bucket is created successfully, you will see:

```
make_bucket: s3://kodekloud-cli-demo
```

To verify the bucket creation, use the `ls` command to list all your S3 buckets:

```
aws s3 ls
```

A typical output might be:

```
2023-04-07 03:39:04 kk-access-point
2023-05-01 21:00:20 kodekloud-cli-demo
```

> [!important]
> **Remember**
>
> The `ls` command functions similarly to the Linux `ls` command by listing available resources. Almost every action available in the AWS Console can be performed by the CLI.

In addition to creating buckets, the AWS CLI offers numerous commands and options for managing AWS resources. For example, you might encounter command patterns such as:

```
--exclude "*" --include "*.txt"
--include "*.txt" --exclude "*"
```

These options allow you to filter files during operations, providing greater control over your interactions with AWS services.

Overall, the AWS CLI offers a powerful, scriptable alternative to the AWS Console, making it ideal for automation and quick command execution. Choose the method that best fits your workflow, whether it’s the graphical interface of the console or the efficiency of the CLI.

For more information on AWS CLI usage and best practices, explore the [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/f735b1e9-b0dc-4a27-beff-fca18cc52e8f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/e0b410b9-8023-4c6b-b41b-e74ccd1765d8)**
>
> Practice lab
