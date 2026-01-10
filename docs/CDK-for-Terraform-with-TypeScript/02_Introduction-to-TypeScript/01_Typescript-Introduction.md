# Typescript Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Typescript-Introduction)

---

## Table of Contents

- Typescript Introduction
  - Roadmap
  - What Is TypeScript?
  - TypeScript in Infrastructure as Code
  - Setting Up a TypeScript Project
  - Recap
  - Watch Video
  - Practice Lab
    - JavaScript vs. TypeScript Example
    - TypeScript as a Superset
    - 1. Install Node.js
    - 2. Initialize a New Project Directory
    - 3. Set Up Your Package Manager
    - 4. Install TypeScript
    - 5. Adding the "Hello World" Code
    - 6. Executing TypeScript Code with ts-node
    - 7. Enabling Automatic Restart with ts-node-dev

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Typescript Introduction

In this lesson, we dive deep into using TypeScript for defining Infrastructure as Code. Whether you're brand new to TypeScript or already have some familiarity, this module will provide everything you need—from basic concepts to setting up your first project for infrastructure management.

## Roadmap

In this guide, we will cover the following topics:

1.  An introduction to TypeScript and its benefits for Infrastructure as Code.
2.  Prerequisites and essential tools for working with TypeScript.
3.  Setting up a TypeScript project from scratch.
4.  Executing a simple "Hello World" script using TypeScript.

![The image is a roadmap outlining four steps for learning TypeScript for Infrastructure as Code, including an introduction, prerequisites, project setup, and executing a "Hello World" program.](https://kodekloud.com/kk-media/image/upload/v1752869626/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/typescript-infrastructure-roadmap-steps.jpg)

## What Is TypeScript?

TypeScript is a powerful superset of JavaScript that adds static typing to your development workflow. This means many errors can be caught at compile time rather than at runtime, making your code more predictable and easier to debug. Consider the following comparison:

> [!important]
> **Static Typing Benefits**
>
> With static typing, TypeScript helps detect potential errors early, which improves code reliability and reduces debugging time.

### JavaScript vs. TypeScript Example

Here’s a simple `greet` function implemented in both JavaScript and TypeScript:

```
// JavaScript code
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(42); // No compile-time error, but causes a runtime error because 42 is not a string!
```

```
// TypeScript code
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(42); // Compile-time error: Argument of type 'number' is not assignable to parameter of type 'string'
```

In JavaScript, errors may only surface when the code runs. TypeScript, however, catches these issues during compilation, ensuring that your code adheres to the defined types.

![The image contains a definition of TypeScript, describing it as a superset of JavaScript that adds static typing, helping to catch errors at compile time and making code more predictable and easier to debug.](https://kodekloud.com/kk-media/image/upload/v1752869627/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/typescript-definition-static-typing.jpg)

### TypeScript as a Superset

Since TypeScript is built on JavaScript, every valid JavaScript snippet is also valid TypeScript. However, by introducing static typing, TypeScript offers additional checks. For example, if you assign a number to a variable that’s supposed to hold a string, TypeScript immediately flags this error.

## TypeScript in Infrastructure as Code

TypeScript’s static typing extends its benefits to Infrastructure as Code. Compare the following examples: one using Terraform and the other using CDKTF with TypeScript to create an S3 bucket with versioning.

```
# Terraform code
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name"
  versioning {
    enabled = "invalid value" # No error during plan, but will fail at terraform apply
  }
}
```

```
// TypeScript code using CDKTF
new s3Bucket.S3Bucket(this, 'my_bucket', {
  bucket: 'my-unique-bucket-name',
  versioning: {
    enabled: 'invalid value', // Compile error: Type 'string' is not assignable to type 'boolean | IResolvable | undefined'.
  },
});
```

In the Terraform example, the error is only apparent during runtime. In contrast, TypeScript immediately flags the type mismatch during compilation, minimizing runtime errors and streamlining your development process. Additionally, CDKTF offers high-level abstractions such as loops and data structures, all while maintaining type safety.

## Setting Up a TypeScript Project

Follow these steps to create a TypeScript project from scratch on your local machine or lab environment.

### 1\. Install Node.js

TypeScript runs on Node.js, enabling you to execute code outside the browser. Download Node.js from the [official website](https://nodejs.org/en/) or use a package manager. For example, with Homebrew:

```
# Ensure Homebrew is installed: https://brew.sh/
brew install node@20


# Verify the Node.js installation
node -v  # Should print something like v20.16.0
npm -v   # Should print the corresponding npm version, e.g., 10.8.1
```

![The image provides instructions to install Node.js, directing users to the URL "https://nodejs.org/en/download/package-manager".](https://kodekloud.com/kk-media/image/upload/v1752869628/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/nodejs-installation-instructions.jpg)

### 2\. Initialize a New Project Directory

Create a dedicated directory for your project and navigate into it:

```
mkdir typescript-fundamentals
cd typescript-fundamentals
```

### 3\. Set Up Your Package Manager

Package managers help automate the management of dependencies. In this lesson, we use Yarn for its speed and reliability. Follow these steps to initialize Yarn in your project:

```
# Enable Corepack for managing package managers
corepack enable


# Initialize a new Yarn project
yarn init


# Configure Yarn to use node_modules for dependency installation:
yarn config set nodeLinker node-modules


# Install dependencies (if any are specified)
yarn install
```

After initialization, you'll have a `package.json` file that should resemble the following:

```
{
  "name": "typescript-fundamentals",
  "packageManager": "yarn@4.3.1"
}
```

Make sure to ignore the `node_modules` folder by checking your generated `.gitignore`.

![The image is a diagram explaining the need for a package manager, highlighting functions like install, update, configure, and manage, along with share and reuse.](https://kodekloud.com/kk-media/image/upload/v1752869628/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/package-manager-functions-diagram.jpg)

![The image shows logos of different package managers: npm, yarn, a dumpling character, and pnpm.](https://kodekloud.com/kk-media/image/upload/v1752869629/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/package-managers-logos-npm-yarn-pnpm.jpg)

### 4\. Install TypeScript

Install TypeScript as a development dependency using Yarn:

```
yarn add -D typescript
```

This action adds TypeScript to your `devDependencies` within `package.json`. To check the installed TypeScript version, run:

```
yarn info typescript version
```

Your updated `package.json` should now look similar to this:

```
{
  "name": "typescript-fundamentals",
  "packageManager": "yarn@4.3.1",
  "devDependencies": {
    "typescript": "^5.6.3"
  }
}
```

### 5\. Adding the "Hello World" Code

Create an `index.ts` file with the following content to demonstrate static typing:

```
const helloWorld: string = "Hello World!";
console.log(helloWorld);
```

This simple script alerts you to any type mismatches—for example, if you try to assign a non-string value to `helloWorld`, TypeScript will generate a compile-time error.

### 6\. Executing TypeScript Code with ts-node

To run TypeScript code directly without manual compilation, install `ts-node` as a development dependency:

```
yarn add -D ts-node
```

Next, add a script to your `package.json` to execute your TypeScript code:

```
{
  "name": "typescript-fundamentals",
  "packageManager": "yarn@4.3.1",
  "scripts": {
    "dev": "ts-node index.ts"
  },
  "devDependencies": {
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
```

Run the following command to execute your code:

```
yarn dev
```

If you encounter configuration errors, create a `tsconfig.json` in your project root with this content:

```
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

Once configured, running `yarn dev` should output:

```
Hello World!
```

### 7\. Enabling Automatic Restart with ts-node-dev

To improve your development workflow by automatically restarting the application upon saving changes, install `ts-node-dev`:

```
yarn add -D ts-node-dev
```

Then, update the `scripts` section in your `package.json`:

```
{
  "name": "typescript-fundamentals",
  "packageManager": "yarn@4.3.1",
  "scripts": {
    "dev": "ts-node-dev --respawn index.ts"
  },
  "devDependencies": {
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.6.3"
  }
}
```

Now, running:

```
yarn dev
```

will automatically restart your application on file changes, offering a smoother development experience.

## Recap

In this lesson, we covered the following steps:

- Installed Node.js to run JavaScript and TypeScript outside the browser.
- Set up Yarn as our package manager to streamline dependency management.
- Installed and configured TypeScript to leverage static typing.
- Developed and executed a simple "Hello World" program using both `ts-node` and `ts-node-dev` for efficient development cycles.

![The image shows a flowchart with three logos: Node.js, Yarn, and TypeScript, connected by arrows. It appears to be a recap of a process or setup involving these technologies.](https://kodekloud.com/kk-media/image/upload/v1752869630/notes-assets/images/CDK-for-Terraform-with-TypeScript-Typescript-Introduction/nodejs-yarn-typescript-flowchart.jpg)

In the next section, we will explore more advanced TypeScript syntax and its applications in Infrastructure as Code. For further reading, check out the [TypeScript Documentation](https://www.typescriptlang.org/docs/) and explore additional tutorials on [Infrastructure as Code best practices](https://www.hashicorp.com/resources).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/74685d7e-5598-4b66-a660-eb38f3813172)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/2d62a4e6-ce48-4573-ad21-98a70c845c40)**
>
> Practice lab
