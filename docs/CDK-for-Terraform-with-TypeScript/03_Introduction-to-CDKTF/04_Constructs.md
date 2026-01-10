# Constructs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-CDKTF/Constructs)

---

## Table of Contents

- Constructs
  - Understanding TypeScript Concepts
  - Integrating the Construct into Your Project
  - Moving Resources into the Construct
  - Exposing Output from the Construct
  - Final Thoughts
  - Watch Video
    - The extends Keyword
    - The super Method
    - Destructuring in TypeScript
    - Adding the Construct to the Stack

---

## Content

CDK for Terraform with TypeScript

Introduction to CDKTF

# Constructs

In this lesson, we explore Constructs in CDKTF, which enable you to encapsulate and reuse resource definitions. Constructs allow you to group resources into reusable components. In our example, Arthur creates a "Project Folder" construct to manage his project setups dynamically, offering an alternative to traditional Terraform modules.

![The image is about creating constructs in CDKTF, suggesting the creation of a "ProjectFolder" construct to handle repetitive tasks, and compares constructs to Terraform modules.](https://kodekloud.com/kk-media/image/upload/v1752869604/notes-assets/images/CDK-for-Terraform-with-TypeScript-Constructs/cdktf-projectfolder-constructs.jpg)

Below is the boilerplate code for Arthur’s Project Folder construct using modern TypeScript features:

```
import { Construct } from 'constructs';
import { file } from '@cdktf/provider-local';

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
    // Reusable code...
  }
}
```

## Understanding TypeScript Concepts

### The extends Keyword

The `extends` keyword creates a new class based on an existing one. In our example, `ProjectFolder` extends the `Construct` class, meaning it inherits properties and methods from `Construct` while allowing customization specific to your project.

### The super Method

Inside the constructor of the child class, calling `super(scope, id)` initializes the inherited properties from the parent class. Passing the correct initialization parameters (here, `scope` and `id`) ensures that the construct is set up properly.

### Destructuring in TypeScript

The following line uses destructuring to extract values from the `props` object:

```
const { projectName, projectDirectory } = props;
```

This is equivalent to:

```
const projectName = props.projectName;
const projectDirectory = props.projectDirectory;
```

This syntax keeps your code concise and clean.

## Integrating the Construct into Your Project

It's common to organize your constructs within a dedicated folder (for example, a folder named "constructs") and name the file after the exported class (e.g., `ProjectFolder.ts`). The example below shows how to use the construct in a Terraform stack:

```
import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { file, provider } from '@cdktf/provider-local';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialise the local provider
    new provider.LocalProvider(this, 'local', {});

    // Create project folder
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';
    const basePath = `${projectDirectory}/${projectName}`;

    // Add a README file
    const readMeFile = new file.File(this, 'readme-file', {
      content: `This is the project-1 project`
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

When using Visual Studio Code with TypeScript, you can quickly import any missing dependencies by using the shortcut (Command Period on macOS or Control Period on Windows).

## Moving Resources into the Construct

Rather than adding resources directly in your stack, you can encapsulate them inside your construct. The following updated version of the Project Folder construct includes a README file creation:

```
import { Construct } from 'constructs';
import { file } from '@cdktf/provider-local';

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
    const basePath = `${projectDirectory}/${projectName}`;

    // Add a README file
    const readMeFile = new file.File(this, 'readme-file', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project`,
    });
  }
}
```

### Adding the Construct to the Stack

Instantiate your construct within your stack code as follows:

```
import * as path from 'path';
import { TerraformStack, App, TerraformOutput } from 'cdktf';
import { provider } from '@cdktf/provider-local';
import { ProjectFolder } from './constructs/ProjectFolder';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialise the local provider
    new provider.LocalProvider(this, 'local', {});

    // Create project folder
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';

    new ProjectFolder(this, 'project-folder', {
      projectName,
      projectDirectory,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

After running the deployment command (for example, `yarn cdktf deploy`), Terraform will create or update resources as defined within your construct.

> [!important]
> **Tip**
>
> Using constructs allows you to keep your infrastructure code modular and maintainable, reducing repetition and simplifying updates.

## Exposing Output from the Construct

To reference a resource created inside your construct (like the README file content) in your main stack, expose properties as read-only attributes. Update your construct as follows:

```
import { Construct } from 'constructs';
import { file } from '@cdktf/provider-local';

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  // Expose the readMeFile so it can be accessed externally.
  readonly readMeFile: file.File;

  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);

    const { projectName, projectDirectory } = props;
    const basePath = `${projectDirectory}/${projectName}`;

    // Create the README file and assign it to the readMeFile property.
    this.readMeFile = new file.File(this, 'readme-file', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project`,
    });
  }
}
```

Now, update your stack to use this output:

```
import * as path from 'path';
import { TerraformStack, App, TerraformOutput } from 'cdktf';
import { provider } from '@cdktf/provider-local';
import { ProjectFolder } from './constructs/ProjectFolder';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Initialise the local provider
    new provider.LocalProvider(this, 'local', {});

    // Create project folder and capture the instance
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';

    const projectFolder = new ProjectFolder(this, 'project-folder', {
      projectName,
      projectDirectory,
    });

    // Expose the README file content as a Terraform output.
    new TerraformOutput(this, 'readMeContent', {
      value: projectFolder.readMeFile.content,
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

After synthesizing, the output will display something similar to:

---

readMeContent = # project-1  
This is the project-1 project

---

This approach allows you to reference outputs from one construct and pass them into another easily.

## Final Thoughts

Constructs in CDKTF offer a flexible, programmable alternative to native Terraform modules. With constructs, you can encapsulate resource creation logic into reusable components, ensuring clean, modular, and maintainable code. Leveraging modern TypeScript features such as class inheritance and destructuring can further simplify your infrastructure code.

> [!important]
> **Additional Resource**
>
> Learn more about [Terraform Modules](https://www.terraform.io/language/modules) to further enhance your infrastructure as code practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/d7c50a2d-2293-4c68-a052-52a1fe00d47a)**
>
> Watch video content
