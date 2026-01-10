# Providers and Resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-CDKTF/Providers-and-Resources)

---

## Table of Contents

- Providers and Resources
  - Terraform State and Resource Updates
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Introduction to CDKTF

# Providers and Resources

In this guide, we explore several essential CDKTF concepts: Providers and Resources, Outputs, and Constructs. We begin with Providers and Resources.

![The image shows a linear diagram with three labeled steps: "01 Providers & Resources," "02 Outputs," and "03 Constructs."](https://kodekloud.com/kk-media/image/upload/v1752869608/notes-assets/images/CDK-for-Terraform-with-TypeScript-Providers-and-Resources/linear-diagram-providers-outputs-constructs.jpg)

Arthur embarks on his CDKTF journey to automate the creation of common project files such as README.md, package.json, and .gitignore. To achieve this, he utilizes the file resource offered by CDKTF. Arthur opens his lab environment and starts his next CDKTF exercise.

![The image is a slide titled "Text Files With CDKTF – Solution," featuring an icon of a person at a computer with code symbols and the text "Use the File resource in CDKTF."](https://kodekloud.com/kk-media/image/upload/v1752869609/notes-assets/images/CDK-for-Terraform-with-TypeScript-Providers-and-Resources/text-files-cdktf-solution-slide.jpg)

He then opens a new terminal to inspect the initial project structure, which already includes some sample code:

```
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { provider } from 'cdktf/provider-local';
import * as path from 'path';
import { file } from 'cdktf/provider-local'; // Use the 'file' construct directly from 'provider-local'
import { ProjectFolder } from './constructs/ProjectFolder';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    // Initialize the local provider
    new provider.LocalProvider(this, 'local', {});


    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';
  }
}
```

For those following along in "hard mode," Arthur deletes the initial code and starts fresh with a simplified version:

```
const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
const projectName = 'project-1';


new ProjectFolder(this, 'project-folder', {
  projectName,
  projectDirectory,
});


// Create the .gitignore file independently
const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
root in ~/code via ⬢ v20.17.0 on ⬢ (us-east-1)
```

He then removes the folder created during `cdktf init` and runs `yarn install` to fetch the project dependencies.

The simplified project code now appears as follows:

```
import { App } from 'cdktf';
import { provider } from 'cdktf/provider-local';
import * as path from 'path';
import { ProjectFolder } from './constructs/ProjectFolder';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    // Create the .gitignore file independently
  }
}


const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
root in ~/code via 🦕 v20.17.0 on ⬢ (us-east-1)
```

After `yarn install` completes, Arthur refreshes VS Code to recognize the new dependencies. He then performs a quick "Hello World" test by deploying a simple Terraform output:

```
import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new TerraformOutput(this, 'lets-go', { value: 'Lets go!' });
  }
}


const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
root in ~/code via 🦕 v20.17.0 on 🌏 (us-east-1)
> yarn cdktf deploy
```

After initializing the new project, Arthur confirms that both the stack (named "cdktf-project-builder") and its parent app are configured correctly. The deployment output confirms that the TypeScript code compiles successfully into Terraform configuration:

```
class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new TerraformOutput(this, 'lets-go', { value: 'Lets go!' });
    }
}


const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.
Enter a value: yes


Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
  lets-go = "Lets go!"


cdktf-project-builder
lets-go = Lets go!
```

```
root in ~/code via v20.17.0 on  (us-east-1) took 20s
```

Arthur then inspects the `cdkout` folder to review the stack and the generated Terraform configuration files. An example of the synthesized Terraform state file is shown below:

```
{
  "version": 3,
  "terraform_version": "1.9.5",
  "backend": {
    "type": "local",
    "config": {
      "path": "/root/code/terraform.cdktf-project-builder.tfstate",
      "workspace_dir": null
    }
  },
  "hash": 1453352099
}
```

```
cdktf-project-builder
cdktf-project-builder
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
lets-go = "Lets go!"
```

```
root in ~/code via v20.17.0 on (us-east-1) took 20s
```

With the basic deployment verified, Arthur proceeds to leverage a local file resource. To work with local files, he needs to add the appropriate provider. Unlike a native Terraform project (where you would simply run `terraform init` after adding the provider), in CDKTF you must declare the dependency explicitly.

First, Arthur installs the CDKTF core library:

```
yarn add @cdktf
```

Next, he installs the local provider:

```
yarn add @cdktf/provider-local
```

This provider enables CDKTF to manage local file resources. Once the dependency is in place, Arthur updates his code to create a README file:

```
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { provider, file } from '@cdktf/provider-local';
import * as path from 'path';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    // Initialize the local provider
    new provider.LocalProvider(this, 'local', {});


    // Define the project folder on the file system
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';
    const basePath = `${projectDirectory}/${projectName}`;


    // Create a README file with sample content
    new file.File(this, 'readme-file', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project.`,
    });
  }
}


const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

When Arthur runs `yarn cdktf deploy`, the output confirms the creation of the file resource:

```
YN00085 - cdktf/provider-local@npm:10.1.0
Completed in 0s 728ms
Post-resolution validation
Some peer dependencies are incorrectly met by dependencies; run yarn explain peer-requirements for detail


root in ~/code via v20.17.0 on (us-east-1) took 5s
yarn cdktf deploy
```

The synthesis process converts the TypeScript code into Terraform configuration. If an error arises (such as from TypeScript's "no unused locals" rule), Arthur can either remove the unused variable or adjust the TypeScript configuration accordingly.

After running `cdktf synth` followed by `cdktf deploy`, CDKTF generates a Terraform plan indicating that one resource will be added (the local file). The output looks similar to:

```
Plan: 1 to add, 0 to change, 0 to destroy.
```

After approving the plan, Terraform creates the file, confirming the successful deployment:

```
Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.
Enter a value: yes
cdktf-project-builder  local_file.readme-file: Creating...
cdktf-project-builder  local_file.readme-file: Creation complete after 0s [id=43fe3377e9436957407c5674078d3878fffd890]
cdktf-project-builder
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

> [!important]
> **Key Concepts**
>
> - A **construct** represents any resource or infrastructure component in your construct tree.
> - A **provider** manages the connection and configuration for resources (e.g., `provider.LocalProvider`).
> - A **resource** (such as `file.File`) defines a local file, similar to HashiCorp Configuration Language (HCL) in native Terraform projects.

The CDKTF code is ultimately synthesized into Terraform configurations. For instance, the Terraform configuration for the local file resource includes parameters like the filename and content. An example snippet might resemble:

```
{
  "terraform": {
    "backend": {
      "local": {
        "path": "/root/code/terraform.cdktf-project-builder.tfstate"
      }
    },
    "required_providers": {
      "local": {
        "source": "hashicorp/local",
        "version": "2.5.2"
      }
    }
  }
}
```

Running `yarn cdktf synth` creates the necessary Terraform configuration, and `yarn cdktf deploy` applies the configuration after displaying a detailed plan.

If Arthur decides to modify the README file content, Terraform will replace the file resource imperatively. For example, updating the README content:

```
// Create project folder
const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
const projectName = 'project-1';
const basePath = `${projectDirectory}/${projectName}`;


// Update the README file content
new file.File(this, 'readme-file', {
  filename: `${basePath}/README.md`,
  content: `# ${projectName}\n\nThis is the ${projectName} project!`,
});
```

Upon deployment, Terraform indicates that the resource must be replaced:

```
~ resource "local_file" "readme-file" {
    ~ content = <<-EOT # forces replacement
        # project-1
        This is the project-1 project!
        EOT
}
```

> [!important]
> **Note on Imperative Management**
>
> Local files are managed imperatively by Terraform. Any modification to the file content will trigger a resource replacement. For cloud resources, such as an AWS S3 bucket, updates might not require replacement, and lifecycle rules can be applied using the `lifecycle` configuration.

For example, ignoring changes to the file content can be configured as follows:

```
new file.File(this, 'readme-file', {
  filename: `${basePath}/README.md`,
  content: `# ${projectName}\n\nThis is the ${projectName} project!!!!!`,
  lifecycle: { ignoreChanges: ['content'] },
});
```

After deploying the above, subsequent redeployments show:

```
No changes. Your infrastructure matches the configuration.
Terraform has compared your real infrastructure against your configuration and found no differences, so no changes are needed.
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

Changing the resource's logical ID (e.g., renaming it from `readme-file` to `readme-file-2`) results in the destruction of the old resource and creation of a new one.

To add a `package.json` file along with the README, Arthur extends his code:

```
new file.File(this, 'package-json-file', {
  filename: `${basePath}/package.json`,
  content: JSON.stringify(
    {
      name: projectName,
      version: '1.0.0',
      main: 'index.js',
      scripts: {
        start: 'node index.js',
      },
    },
    null,
    2
  ),
});
```

After running `yarn cdktf deploy`, Terraform confirms that the new file resource has been added:

```
Plan: 1 to add, 0 to change, 0 to destroy.
Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.
```

Verifying the created `package.json` confirms its content:

```
{
  "name": "project-1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

```
cdktf-project-builder local_file.package-json-file: Creation complete after 0s [id=...]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## Terraform State and Resource Updates

Consider the following points regarding Terraform state and resource updates:

1.  Where is the Terraform state stored?  
    By default, Terraform stores state locally. You can find a `tf.state` file within the `cdktf.out` folder of your stack, which contains details such as the filename and file permissions.
2.  What happens when the README file content is modified?  
    Any change to the README file content forces a replacement of the resource, unless you configure `lifecycle: { ignoreChanges: ['content'] }`.
3.  What occurs if the logical ID for the README file is changed?  
    Changing the logical ID removes the existing resource from the construct tree and creates a new one, prompting the destruction of the old file and the creation of a new file.
4.  How do you add a `package.json` file alongside the README file?  
    As demonstrated above, you can introduce an additional file resource specifying both the filename and content for `package.json`.

To deploy your changes, execute:

```
yarn cdktf synth
yarn cdktf deploy
```

CDKTF first synthesizes your TypeScript code into Terraform configuration and then applies the generated plan, mirroring the native Terraform workflow.

![The image shows a Visual Studio Code interface with a file explorer on the left, a README.md file open in the editor, and a terminal at the bottom displaying Terraform commands and output.](https://kodekloud.com/kk-media/image/upload/v1752869611/notes-assets/images/CDK-for-Terraform-with-TypeScript-Providers-and-Resources/vscode-file-explorer-readme-terraform.jpg)

This concludes the section on Providers and Resources. Next, we will delve into Outputs and explore how they integrate with the construct tree in CDKTF.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/fe36f3cf-446c-4d62-beea-efe37d467414)**
>
> Watch video content
