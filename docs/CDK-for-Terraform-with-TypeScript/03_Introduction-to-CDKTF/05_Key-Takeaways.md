# Key Takeaways - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-CDKTF/Key-Takeaways)

---

## Table of Contents

- Key Takeaways
  - Main TypeScript File Overview
  - Generating Additional Project Files
  - Practical Benefits
  - Key Best Practices
  - Conclusion
  - Watch Video
  - Practice Lab
    - Example: Type Safety and Autocompletion
    - Example: Ensuring Modularity and Scalability

---

## Content

CDK for Terraform with TypeScript

Introduction to CDKTF

# Key Takeaways

In this final section, we wrap up the previous three sections by reviewing the key takeaways and best practices in CDKTF. This guide highlights Mumshad Mannambeth's success story, demonstrating how he automates the setup of his new projects quickly and efficiently.

This lab, part of KodeKloud Labs, offers a complete example of a TypeScript project that uses CDKTF. Let’s walk through the main components of the code.

## Main TypeScript File Overview

The primary TypeScript file includes the initialization of the local provider, the project directory setup, and a reusable project folder construct:

```
class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);


        // Initialize the local provider
        new provider.LocalProvider(this, 'local', {});


        const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
        const projectName = 'project-1';


        new ProjectFolder(this, 'project-folder', {
            projectName,
            projectDirectory,
        });
    }
}


// Create the .gitignore file independently
```

## Generating Additional Project Files

The lab also demonstrates how to create other essential project files such as the README and package.json. These files are generated automatically with the appropriate content:

```
// Create the README file with the project name inside
this.readMeFile = new file.File(this, 'ReadmeFile', {
  filename: `${basePath}/README.md`,
  content: `# ${projectName}\n\nThis is the ${projectName} project.`,
});


// Create the package.json file with basic content
new file.File(this, 'package-json-file', {
  filename: `${basePath}/package.json`,
  content: JSON.stringify({
    name: projectName,
    version: '1.0.0',
    main: 'index.js',
    scripts: {},
  }, null, 2),
});
```

> [!important]
> **Note**
>
> Automating project file creation minimizes manual errors and saves valuable development time. This simple example is an excellent introduction to fundamental CDKTF concepts.

## Practical Benefits

By automating the creation of projects, this approach reduces manual errors, saves time, and boosts productivity. Although an equivalent shell script might achieve similar results, using CDKTF prepares you for more advanced scenarios by:

- Demonstrating the use of providers and resources.
- Utilizing CDK outputs to validate resource configurations.
- Grouping deployments into reusable code modules using constructs.

![The image is a summary slide with a gradient background, listing three items: "Providers & Resources," "Outputs," and "Constructs," each numbered from 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752869605/notes-assets/images/CDK-for-Terraform-with-TypeScript-Key-Takeaways/summary-slide-providers-outputs-constructs.jpg)

## Key Best Practices

The key takeaways from this module include:

| Best Practice                | Description                                                                                              | Example Command or Snippet                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Clear Project Setup          | Starting with "cdktf init" or a well-crafted boilerplate saves you from building the setup from scratch. | `cdktf init`                                                |
| Reusable Constructs          | Group related resources into constructs for better reusability.                                          | See the project folder construct in the example code above. |
| Type Safety & Autocompletion | Leverage TypeScript to catch errors immediately by enforcing proper types and property definitions.      | Refer to the snippet with type errors below.                |
| Modularity & Scalability     | Structure your code so that additional functionality can be added without significant rework.            | Use constructs to logically group functionality.            |

### Example: Type Safety and Autocompletion

The following snippet demonstrates how TypeScript provides clear error messages when required properties are missing or misconfigured:

```
// Initialize the local provider
new provider.LocalProvider(this, 'local', {});


const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
const projectName = 'project-1';


new ProjectFolder(this, 'project-folder', {
    projectName: ""  // Providing an empty string will trigger a type error
});


// Create the .gitignore file independently
const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
root in ~/code via v20.17.0 on (us-east-1)
```

### Example: Ensuring Modularity and Scalability

Another snippet illustrates how constructs can be defined and instantiated to maintain modularity:

```
// Initialize the local provider
new provider.LocalProvider(this, 'local', {});


const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');


new ProjectFolder(this, 'project-folder', {
  projectName: 'project',
  projectDirectory,
});


// Create the .gitignore file independently


const app = new App();
new MyStack(app, 'cdktf-project-builder');
app.synth();
```

```
root in ~/code via v20.17.0 on (us-east-1)
```

> [!important]
> **Tip**
>
> Regularly synthesize and validate your code by running "yarn cdk synth". This command compiles your CDKTF configuration to HashiCorp’s language, allowing you to catch errors early.

![The image lists four key takeaways: starting with a clear project setup, using constructs for reusability, leveraging type safety and autocompletion, and ensuring modularity and scalability.](https://kodekloud.com/kk-media/image/upload/v1752869606/notes-assets/images/CDK-for-Terraform-with-TypeScript-Key-Takeaways/project-setup-reusability-type-safety.jpg)

## Conclusion

This introductory module on CDKTF has covered core concepts, including providers, resources, outputs, and constructs. By automating various aspects of project setup and generation, you are well-equipped to develop scalable and modular applications. Up next, we will explore how to use the AWS provider to deploy resources to the cloud.

![The image features a section titled "Key Takeaways" with a gradient background, highlighting point 05: "Regularly Synthesize and Validate."](https://kodekloud.com/kk-media/image/upload/v1752869607/notes-assets/images/CDK-for-Terraform-with-TypeScript-Key-Takeaways/key-takeaways-synthesize-validate.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/89a73ddb-a522-41d5-9a1b-bd2d77ead829)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/7a594043-5778-437f-9a97-a931b11b3ef3)**
>
> Practice lab
