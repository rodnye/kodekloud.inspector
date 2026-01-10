# Outputs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-CDKTF/Outputs)

---

## Table of Contents

- Outputs
  - Defining a Simple Output
  - Creating a File Resource
  - Capturing the README File as an Output
  - Conclusion
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Introduction to CDKTF

# Outputs

In this article, we explore how to define and capture outputs in CDKTF. Outputs in CDKTF are created by instantiating the TerraformOutput class, which is equivalent to using output blocks in Terraform's HashiCorp Configuration Language. This guide demonstrates how to output file contents, such as a README file, using CDKTF.

> [!important]
> **Note**
>
> The approach demonstrated here mirrors Terraform's output blocks but leverages the CDKTF framework to integrate outputs directly within your codebase.

## Defining a Simple Output

To output the contents of a README file, instantiate the TerraformOutput class as shown below. This example creates an output named `readMeContent` that captures the content of the README file:

```
// Output the readMeFile content
new TerraformOutput(this, 'readMeContent', {
  value: readMeFile.content,
});
```

## Creating a File Resource

A common practice is to define outputs at the end of the file. In this example, we first create a file resource. Below is the code that creates a `package.json` file:

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
    2,
  ),
});
```

When you run the deployment command, you might see output similar to:

```
cdktf-project-builder
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
No outputs found.
root in ~/code via ◈ v20.17.0 on ─ (us-east-1) took 20s
```

## Capturing the README File as an Output

To capture the README file content as an output, ensure that you pass a proper scope to the TerraformOutput constructor. Start by creating the README file resource:

```
const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
const projectName = `project-1`;
const basePath = `${projectDirectory}/${projectName}`;


// Add a README file
const readmeFile = new file.File(this, 'readme-file', {
  filename: `${basePath}/README.md`,
  content: `# ${projectName}\n\nThis is the ${projectName} project`,
});
// Sample content: # project-1\n\nThis is the project-1 project.


// ToDo: Create the package.json file as well
new file.File(this, 'package-json-file', {
  filename: `${basePath}/package.json`,
  content: JSON.stringify({
    name: projectName,
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      start: 'node index.js',
    },
  }),
});
```

Now, output the content of the README file by using its `content` property:

```
new TerraformOutput(this, 'readMeContent', {
  value: readmeFile.content,
});
```

After rerunning the deploy command, you should see output similar to the following:

```
cdktf-project-builder
local_file.package-json-file: Creating...
local_file.package-json-file: Creation complete after 0s [id=b60a2ad91f16bfeb7fe2]
cdktf-project-builder
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
root in ~/code via ⬢ v20.17.0 on ⬢ (us-east-1) took 20s
yarn cdktf deploy
```

This confirms that the output `readMeContent` now correctly references the content of the README file.

## Conclusion

This section demonstrated how to define outputs in CDKTF by capturing the content of a README file. By following these steps, you ensure that your outputs correctly mirror the behavior of Terraform's native output blocks.

Next, we will explore constructs in CDKTF to further enhance your infrastructure code management.

For more details, refer to the [CDK for Terraform Documentation](https://developer.hashicorp.com/terraform/cdktf).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/948c0a82-faa1-4f16-83d1-8ee8df2336b3/lesson/44d38529-d884-4818-87bb-6f6adb96fcba)**
>
> Watch video content
