# Importing in TypeScript - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Importing-in-TypeScript)

---

## Table of Contents

- Importing in TypeScript
  - Why Import?
  - Demonstrating Import Syntax in a Playground
  - Importing from Third-Party Libraries
  - Exporting a Main Entry Point
  - Summary
  - Watch Video
    - A Basic Module Export
    - Named Exports and Auto-Import
    - Default Exports
    - Importing Using the Star Syntax
    - Exporting as a Default Export
    - Exporting as a Named Export

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Importing in TypeScript

In this article, we explore how to import and export modules in TypeScript. We'll cover various syntaxes, project configuration tips, and best practices to help you modularize your code effectively.

![The image is a timeline with three steps: "Importing in TypeScript," "Configuring TypeScript," and "TypeScript Project Best Practices."](https://kodekloud.com/kk-media/image/upload/v1752869614/notes-assets/images/CDK-for-Terraform-with-TypeScript-Importing-in-TypeScript/typescript-timeline-import-config-best-practices.jpg)

## Why Import?

Importing enables you to break your codebase into smaller, manageable files, promoting modularity and code reuse. If you're coming from other programming languages, you'll notice that splitting code into multiple files is a common practice.

Consider the following import syntaxes:

```
// Basic Syntax:
import { exportedMember } from './fileName';


// Importing Default Exports:
import defaultExport from './fileName';


// Importing Everything:
import * as utils from './utils';
```

## Demonstrating Import Syntax in a Playground

When beginning a new TypeScript project, it’s important to set up your dependencies and development server correctly. For example, after starting your project, run:

```
yarn install
```

Then, launch your development server with:

```
yarn dev
```

This should display "Importing in TypeScript!" in your console, confirming your project is set up properly.

### A Basic Module Export

Suppose you have a file containing utility functions. In that file, you might define:

```
export function multiply(a: number, b: number): number {
    return a * b;
}


export function divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero is not allowed.');
    return a / b;
}
```

Then, in your main file (e.g., `index.ts`), you could simply log a statement:

```
console.log('Importing in TypeScript!');
```

When you run `yarn dev`, you might see output similar to:

```
[INFO] ... ts-node-dev ver. 2.0.0 ...
Importing in TypeScript!
```

### Named Exports and Auto-Import

For another module that defines additional math utility functions:

```
export function add(a: number, b: number): number {
    return a + b;
}


export function subtract(a: number, b: number): number {
    return a - b;
}
```

Modern editors like VS Code will automatically assist with imports. In your main file, the code might look like:

```
import { add } from "./import-examples/mathUtils";


// Using the 'add' function with two arguments
console.log('Importing in TypeScript!', add(1, 2));
```

Executing this will log the result:

```
Importing in TypeScript! 3
```

### Default Exports

A module can also export a default function. For instance:

```
export default function calculateTotal(prices: number[]): number {
    return prices.reduce((total, price) => total + price, 0);
}
```

You can import this default export without referencing its original name:

```
import calculateTotal from './import-examples/calculator';
import { add } from './import-examples/mathUtils';


console.log('Importing in TypeScript!', calculateTotal([1, 2, 3]));
```

This logs the calculated total (6) to the console. Default exports also offer flexibility, as you can rename them upon import.

### Importing Using the Star Syntax

To import every exported member from a module, use the star syntax. For example, given a module with both `multiply` and `divide` functions:

```
import * as utils from './import-examples/utils';


// Using the imported functions via the 'utils' object
console.log('Importing in TypeScript!', utils.multiply(1, 2), utils.divide(2, 2));
```

This will log the results of the multiplication (2) and division (1) respectively.

## Importing from Third-Party Libraries

Third-party libraries can be imported just as easily as local modules. For example, if you install Lodash as a dependency, import and utilize its functions like so:

```
import _ from 'lodash';


// Using Lodash's add function to add two numbers
console.log('Importing in TypeScript!', _.add(2, 3));
```

This demonstrates the seamless integration of npm packages into your TypeScript project.

## Exporting a Main Entry Point

In larger applications—such as APIs or Infrastructure as Code projects—a main entry point is common. Projects often use `index.ts` or `main.ts` to serve this purpose.

### Exporting as a Default Export

You might log some output and export a main function with a default export:

```
import calculateTotal from './import-examples/calculator';
import { add } from './import-examples/mathUtils';
import * as utils from './import-examples/utils';
import _ from 'lodash';


// Log a result using Lodash's add function
console.log('Importing in TypeScript!', _.add(2, 3));


// Exporting a main function as a default export
export default function main() {
    console.log('Main running');
}
```

### Exporting as a Named Export

Alternatively, export the main function as a named export:

```
import calculateTotal from './import-examples/calculator';
import { add } from './import-examples/mathUtils';
import * as utils from './import-examples/utils';
import _ from 'lodash';


console.log('Importing in TypeScript!', _.add(2, 3));


export const main = () => {
    console.log('Main running');
};
```

Both methods ensure that your application's runtime environment can correctly identify and execute the entry point.

## Summary

In this article, we covered several methods for importing and exporting modules in TypeScript using modern ECMAScript Module (ESM) syntax. The key topics included:

- Basic named exports and default exports
- Utilizing the star syntax to import all exports from a module
- Importing third-party libraries like Lodash
- Exporting a main entry point for your application

> [!important]
> **Note**
>
> While TypeScript does support CommonJS syntax, ESM is the preferred modern method for writing and structuring applications.

In the next section, we will dive into configuring TypeScript for your projects and explore additional best practices.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/0541543a-8dbb-4a95-a12e-5f0e4c9333f0)**
>
> Watch video content
