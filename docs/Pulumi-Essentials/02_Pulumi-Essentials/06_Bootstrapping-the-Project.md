# Bootstrapping the Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Pulumi-Essentials/Pulumi-Essentials/Bootstrapping-the-Project)

---

## Table of Contents

- Bootstrapping the Project
  - Step 1: Initialize a New Project
  - Step 2: Configure Your New Project
  - Step 3: Dependency Installation and Environment Setup
  - Step 4: Review the Generated Code
  - Watch Video

---

## Content

Pulumi Essentials

Pulumi Essentials

# Bootstrapping the Project

In this guide, we will walk through the process of setting up and bootstrapping a Pulumi project using the `pulumi new` command. Pulumi streamlines cloud infrastructure deployments by allowing you to choose your cloud provider and preferred programming language while automatically handling the necessary configurations.

## Step 1: Initialize a New Project

Open your command prompt on Windows and run:

```
Microsoft Windows [Version 10.0.19045.2965]
(c) Microsoft Corporation. All rights reserved.


C:\Users\sanje\Documents\scratch\pulumi-demo> pulumi new
Please choose a template (10/215 shown):
[Use arrows to move, type to filter]
> aiven-go                          A minimal Aiven Go Pulumi program
  aiven-python                       A minimal Aiven Python Pulumi program
  aiven-typescript                  A minimal Aiven TypeScript Pulumi program
  alicloud-csharp                    A minimal AliCloud C# Pulumi program
  alicloud-fsharp                    A minimal AliCloud F# Pulumi program
  alicloud-go                        A minimal AliCloud Go Pulumi program
  alicloud-javascript                A minimal AliCloud JavaScript Pulumi program
  alicloud-python                    A minimal AliCloud Python Pulumi program
  alicloud-typescript                A minimal AliCloud TypeScript Pulumi program
  alicloud-visualbasic               A minimal AliCloud VB.NET Pulumi program
```

Since this project is developed in Python for AWS, scroll down to the AWS section and select the template titled “A minimal AWS Python Pulumi program.” Once selected, you will be guided through the next steps.

## Step 2: Configure Your New Project

After picking the AWS-Python template, the tool will prompt you for some basic project information.

1.  **Project Name & Description:**  
    Accept the default values (for example, `pulumi-demo` for the project name and the corresponding description) unless you prefer to customize them.
2.  **Stack Name:**  
    A stack represents an isolated instance of your project configuration, which is useful for managing different environments such as development, staging, and production. In this guide, we use the default `dev` stack for the development environment:

    ```
    C:\Users\sanje\Documents\scratch\pulumi-demo> pulumi new
    Please choose a template (10/215 shown):
        A minimal AWS Python Pulumi program
    This command will walk you through creating a new Pulumi project.


    Enter a value or leave blank to accept the (default), and press <ENTER>.
    Press ^c at any time to quit.


    project name: (pulumi-demo)
    project description: (A minimal AWS Python Pulumi program)
    Created project 'pulumi-demo'


    Please enter your desired stack name.
    To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
    stack name: (dev)
    ```

3.  **AWS Region Selection:**  
    You will be prompted to select the AWS region for deployment. In this example, we use `us-east-1`, but you may choose any region appropriate for your project.

    ```
    Microsoft Windows [Version 10.0.19045.2965]
    (c) Microsoft Corporation. All rights reserved.


    C:\Users\sanje\Documents\scratch\pulumi-demo> pulumi new
    Please choose a template (10/215 shown):
        A minimal AWS Python Pulumi program
    This command will walk you through creating a new Pulumi project.


    Enter a value or leave blank to accept the (default), and press <ENTER>.


    project name: (pulumi-demo)
    project description: (A minimal AWS Python Pulumi program)
    Created project 'pulumi-demo'


    Please enter your desired stack name.
    To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
    stack name: (dev)
    Created stack 'dev'


    aws:region: The AWS region to deploy into: (us-east-1)
    Saved config


    Installing dependencies...


    Creating virtual environment...
    ```

> [!important]
> **Note**
>
> If you were setting up a project for another cloud provider (such as Azure), the process remains similar but Pulumi would install dependencies related to that specific provider (e.g., Pulumi-Azure).

## Step 3: Dependency Installation and Environment Setup

During the bootstrapping process, Pulumi automatically configures several key components:

- **Virtual Environment:** A dedicated Python virtual environment is created.
- **Version Control:** A `.gitignore` file is generated to help manage unnecessary files.
- **Dependencies Management:** A `requirements.txt` file is created listing essential packages like Pulumi and Pulumi-AWS.

The `requirements.txt` file usually contains:

```
pulumi>=3.0.0,<4.0.0
pulumi-aws>=5.0.0,<6.0.0
```

The command prompt will display the dependency installation output similar to:

```
Using cached attrs-23.1.0-py3-none-any.whl (61 kB)
Collecting typing-extensions (from parver->0.2.1->pulumi-aws>=5.0.0,<6.0.0 -r requirements.txt (line 2))
Using cached typing_extensions-4.6.2-py3-none-any.whl (31 kB)
Installing collected packages: arpeggio, typing-extensions, six, semver, pyyaml, protobuf, grpcio, dill, attrs, pulumi, parver, pulumi-aws
Successfully installed arpeggio-2.0.0 attrs-23.1.0 dill-0.3.6 grpcio-1.51.3 parver-0.4 protobuf-4.23.2 pulumi-3.68.0 pulumi-aws-5.41.0 pyyaml-6.0 semver-2.13.0 six-1.16.0 typing-extensions-4.6.2
Finished installing dependencies
Finished installing dependencies
Your new project is ready to go!
To perform an initial deployment, run `pulumi up`
C:\Users\sanje\Documents\scratch\pulumi-demo
```

## Step 4: Review the Generated Code

All the boilerplate code for your Pulumi project is stored in the `main.py` file. Open this file in your favorite code editor to explore the default configuration and sample infrastructure code generated by Pulumi.

> [!important]
> **Next Steps**
>
> Now that your project is fully set up, you can begin modifying the code in `main.py` to define your infrastructure. When you're ready, execute `pulumi up` to deploy your resources.

By following these steps, you have successfully bootstrapped your Pulumi project configured for AWS and Python. Enjoy building and deploying your cloud infrastructure!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pulumi-essentials/module/883d8d6f-c8be-44af-ac4d-ba0835d32f5d/lesson/86b5e590-7f99-46bd-9dc6-2c23e0d5755f)**
>
> Watch video content
