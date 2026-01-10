# CDKTF Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-CDKTF/CDKTF-Introduction)

---

## Table of Contents

- CDKTF Introduction
  - Problem Definition: Automating Local Project Setups
  - Setup and Prerequisites
  - Exploring the CDKTF Project Structure
  - Synthesizing and Deploying with CDKTF
  - Summary
  - Watch Video
  - Practice Lab
    - Creating a New CDKTF Project
    - Switching to Yarn (Optional)
    - Installing the CDKTF CLI as a Dev Dependency (Optional)

---

## Content

CDK for Terraform with TypeScript

Introduction to CDKTF

# CDKTF Introduction

Welcome to the CDKTF introductory guide. In this article, you'll learn how the Cloud Development Kit for Terraform (CDKTF) enables you to define and provision infrastructure using familiar programming languages like TypeScript, Python, or Go, while leveraging Terraform's robust Infrastructure as Code capabilities.

![The image illustrates a developer workflow involving defining and provisioning using TypeScript, Python, and Go, integrated with Terraform.](https://kodekloud.com/kk-media/image/upload/v1752869595/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/developer-workflow-typescript-python-go.jpg)

CDKTF allows you to combine Terraform's declarative configuration management with the flexibility of modern programming constructs. Building on prior discussions of TypeScript fundamentals, we will now demonstrate how to use that knowledge to provision real infrastructure with CDKTF.

In this guide, we will cover:

- A practical problem that CDKTF can solve
- Prerequisites and essential tools for setting up your environment
- Creating a new CDKTF project from scratch
- An introduction to the CDKTF CLI and core commands

No previous Terraform experience is necessary, though it may provide useful context. As you follow along, you will notice comparisons between CDKTF and native Terraform implementations. This tutorial also demonstrates how to automate local project creation with a practical example.

![The image is a roadmap with four steps: Problem Definition, Prerequisites and Essential Tools, Setting Up a CDKTF Project From Scratch, and Introduction to cdkf-cli.](https://kodekloud.com/kk-media/image/upload/v1752869596/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/roadmap-cdktf-project-steps.jpg)

---

## Problem Definition: Automating Local Project Setups

Meet Arthur, a developer who frequently starts new projects. Arthur is frustrated with repetitive tasks such as creating project folders and adding boilerplate files like `.gitignore`, `package.json`, and `README`. In every new Node.js project, Arthur needs to:

- Create a `.gitignore` file
- Generate a `package.json` file containing the project name and standard boilerplate
- Create a `README` file with project details

![The image illustrates a problem where an author is frustrated with manually setting up project folders, creating files, and writing boilerplate code. It features icons of a person at a computer with coding symbols.](https://kodekloud.com/kk-media/image/upload/v1752869598/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/author-frustration-project-setup.jpg)

After manually setting up a sample project, Arthur decides to automate the process to handle these repetitive tasks more efficiently.

![The image shows a Visual Studio Code interface with a project directory open, displaying a README.md file with the text "This is the project-1 project." The terminal at the bottom is open, showing a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752869598/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/vscode-project-directory-readme-terminal.jpg)

Although a simple bash script could simplify the task, this example serves to introduce the capabilities of CDKTF. In this demonstration, we deploy files locally with Terraform’s local provider. In the next module, deployment on AWS will be explored.

![The image is a promotional graphic for automating local projects using AWS Cloud Development Kit and HashiCorp Terraform, featuring the acronym "CDKTF."](https://kodekloud.com/kk-media/image/upload/v1752869599/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/aws-cdktf-automation-graphic.jpg)

Arthur discovers that with CDKTF, he can define Terraform resources using his familiar programming language. Since he is comfortable with TypeScript, he opts to use CDKTF with TypeScript for automating his project setup.

![The image is an introduction to CDKTF, showing logos for AWS Cloud Development Kit and HashiCorp Terraform, with a caption about defining Terraform resources using familiar programming languages.](https://kodekloud.com/kk-media/image/upload/v1752869600/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/cdktf-introduction-aws-hashi-corp.jpg)

As a summary, CDKTF combines coding flexibility with Terraform’s proven infrastructure management capabilities.

![The image is a promotional graphic for CDKTF, highlighting its combination of coding flexibility with the power of Terraform. It includes logos and a tagline.](https://kodekloud.com/kk-media/image/upload/v1752869601/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/cdktf-promo-coding-terraform.jpg)

![The image outlines the author's decision to use CDKTF for automating project setups and TypeScript due to familiarity.](https://kodekloud.com/kk-media/image/upload/v1752869602/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/cdktf-typescript-automation-decision.jpg)

---

## Setup and Prerequisites

Before you can start using CDKTF with TypeScript, ensure that you have the following prerequisites installed:

1.  **Node.js**: Needed to run TypeScript and manage packages.  
    ![The image is a slide titled "Install Node.js" with instructions to install Homebrew and Node, including a link to the Node.js package manager download page.](https://kodekloud.com/kk-media/image/upload/v1752869602/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/install-nodejs-homebrew-instructions.jpg)
2.  **Terraform**: Install Terraform using appropriate commands (e.g., via Homebrew). Updating Homebrew before installation is recommended to get the latest version.
3.  **CDKTF CLI**: Install the CDKTF CLI globally using npm. Verify the installation with these commands:

> **Note: Installing CDKTF CLI**  
> Run the following commands in your terminal:

```
npm install -g cdktf-cli
cdktf --version
```

### Creating a New CDKTF Project

To create a new CDKTF project, navigate to an empty directory in your terminal and run:

```
npm install -g cdktf-cli
cdktf init --template=typescript
```

During initialization, a CLI wizard will prompt you with several questions. An example session might look like this:

```
npm install -g cdktf-cli
# in an empty directory
cdktf init --template=typescript

Note: The local storage mode isn't recommended for storing the state of your stacks.
? Do you want to continue with Terraform Cloud remote state management? no
? Project Name cdktf-project-builder
? Project Description A simple getting started project for cdktf.
? Do you want to start from an existing Terraform project? no
? Do you want to send crash reports to the CDKTF team? [information URL] no
Note: You can always add providers using 'cdktf provider add' later on
? What providers do you want to use? local
added 2 packages, and audited 58 packages in 1s
```

This command sets up your CDKTF project, generating configuration files such as `tsconfig.json`, and installing necessary dependencies. A typical `tsconfig.json` file may resemble:

```
{
  "compilerOptions": {
    "alwaysStrict": true,
    "declaration": true,
    "experimentalDecorators": true,
    "inlineSourceMap": true,
    "inlineSources": true,
    "lib": [
      "es2018"
    ],
    "module": "CommonJS",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitReturns": true
  }
}
```

During initialization, you might see log entries similar to:

```
[2024-10-18T22:21:21.168] [INFO] default - Checking whether pre-built provider exists for the following constraints:
provider: local
version: latest
language: typescript
cdktf : 0.20.9
[2024-10-18T22:21:21.262] [INFO] default - Found pre-built provider.
[2024-10-18T22:21:21.268] [INFO] default - Installing package @cdktf/provider-local @ 10.1.1 using npm.
[2024-10-18T22:21:25.601] [INFO] default - Package installed.
```

Your `package.json` will also include important dependencies and devDependencies:

```
{
  "dependencies": {
    "@cdktf/provider-local": "10.1.1",
    "cdktf": "^0.20.9",
    "constructs": "^10.4.2"
  },
  "devDependencies": {
    "@types/jest": "^29.5.13",
    "@types/node": "^22.7.6",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
```

### Switching to Yarn (Optional)

If you prefer Yarn for its speed and modern tooling, you can switch by running:

```
corepack prepare yarn@stable --activate
```

After activation, remove the `package-lock.json` file and create a new `yarn.lock` file:

```
touch yarn.lock
yarn install
```

Verify Yarn installation with:

```
yarn -v
```

For Git users, remember to update your `.gitignore` file to exclude Yarn-specific files. If your IDE encounters package recognition issues, refreshing your workspace or reloading the browser window can help.

Here is a sample main file (`main.ts`) that is auto-generated during the CDKTF project setup:

```
import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // define resources here
  }
}

const app = new App();
new MyStack(app, "cdktf-project-builder");
app.synth();
```

### Installing the CDKTF CLI as a Dev Dependency (Optional)

To pin the version of the CDKTF CLI for your CI/CD pipelines, you can also install it locally:

```
yarn add -D cdktf-cli
```

This installation method is optional if you already have a global installation.

---

## Exploring the CDKTF Project Structure

After project initialization, you'll notice several key files and directories:

1.  **main.ts**  
    Imports CDKTF constructs to define your infrastructure. An `App` is created and a custom stack (extending `TerraformStack`) is added.
2.  **cdktf.json**  
    This configuration file specifies how your CDKTF application is executed. For example:

    ```
    {
      "language": "typescript",
      "app": "npx ts-node main.ts",
      "projectId": "41d8912e-1850-4ff8-bbc1-af7df07e7407",
      "sendCrashReports": "false",
      "terraformProviders": [],
      "terraformModules": [],
      "context": {}
    }
    ```

    If you prefer using Yarn, change the app command to `"yarn ts-node main.ts"`.

3.  **Terraform Output Synthesis**  
    Running `app.synth()` in `main.ts` synthesizes your TypeScript code into Terraform configuration files (typically in a `.tf.json` format), which are stored in the `cdktf.out` directory.

For example, to output a simple value from your stack, modify the file as follows:

```
import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new TerraformOutput(this, 'helloWorld', {
      value: "Hello World"
    });
  }
}

const app = new App();
new MyStack(app, "code");
app.synth();
```

When synthesized, you will obtain Terraform JSON similar to:

```
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "code",
      "version": "0.20.9"
    },
    "outputs": {
      "helloWorld": "helloWorld"
    }
  },
  "output": {
    "helloWorld": {
      "value": "Hello World"
    }
  },
  "terraform": {
    "backend": {}
  }
}
```

---

## Synthesizing and Deploying with CDKTF

To generate Terraform configuration files from your CDKTF application, run:

```
yarn cdktf synth
```

This command synthesizes your app, creating a directory (e.g., `cdktf.out`) that contains the Terraform configuration for your stack (in this example, named "code").

To deploy your infrastructure, execute:

```
yarn cdktf deploy
```

This command first synthesizes the code, then applies the Terraform configuration similar to running `terraform apply`. You will be prompted to confirm the changes. After deployment, Terraform creates a state file locally. A typical local state file may look like:

```
{
  "version": 3,
  "terraform_version": "1.9.5",
  "backend": {
    "type": "local",
    "config": {
      "path": "/root/code/terraform.code.tfstate",
      "workspace_dir": null
    }
  },
  "hash": 1057242983
}
```

The deployment output will include:

```
helloWorld = "Hello World"
```

---

## Summary

In this guide, we explored the following key topics:

- Problem definition using Arthur’s example of automating local project setups
- Essential prerequisites and tools for working with CDKTF
- Creating a new CDKTF project from scratch using TypeScript
- An introduction to the CDKTF CLI and its commands such as synth and deploy

In the next section, we'll continue Arthur's journey to further automate his local project setups using more advanced features of CDKTF.

![The image is a summary slide with a list of four topics: Problem Definition, Prerequisites and Essential Tools, Setting Up a CDKTF Project From Scratch, and Introduction to cdkf-cli.](https://kodekloud.com/kk-media/image/upload/v1752869603/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Introduction/cdktf-project-setup-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/594ed4f5-804b-418c-86e0-8598dac096c3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/700f2c9c-0cf8-4ba8-a5d1-74eb03e83c74)**
>
> Practice lab
