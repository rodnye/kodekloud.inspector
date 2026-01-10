# Syntax Variables and Primitives in TypeScript - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Syntax-Variables-and-Primitives-in-TypeScript)

---

## Table of Contents

- Syntax Variables and Primitives in TypeScript
  - Setting Up the Project
  - Practical Example with Duck Variables
  - Introduction to Elmer Code
  - Summary
  - Watch Video
    - Using const for Immutable Variables
    - Using let for Mutable Variables
    - Type Inference by TypeScript

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Syntax Variables and Primitives in TypeScript

In this lesson, we explore the basic TypeScript syntax essential for working on Infrastructure as Code projects. Although TypeScript provides many advanced features, mastering these fundamentals is enough to kickstart your project. In our example, we follow Elmer Code—a developer who loves ducks—as he builds an application to manage the ducks on his pond.

We are using the KodeKloud Labs environment, which comes pre-configured with TypeScript, so you're ready to start right away.

Below is the initial project setup demonstrating key TypeScript constructs, including enums, union types, interfaces, and classes:

```
// Enum for Duck Types
enum DuckType {
    Mallard = "Mallard",
    Muscovy = "Muscovy",
    Pekin = "Pekin",
}

// Type for Duck Colors using a Union Type
type DuckColor = "White" | "Brown" | "Black" | "Mixed";

// Interface for a Duck's properties
interface IDuck {
    name: string;    // Name of the duck
    age: number;     // Age of the duck in years
    type: DuckType;  // Duck type, as defined by the DuckType enum
    color: DuckColor;// Duck color using the DuckColor union type
    favoriteToy?: string; // Optional property for the duck's favorite toy
}

// PondDuck class that implements the IDuck interface
class PondDuck implements IDuck {
    name: string;
    age: number;
    type: DuckType;
    color: DuckColor;
    favoriteToy?: string;

    constructor(name: string, age: number, type: DuckType, color: DuckColor, favoriteToy?: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.favoriteToy = favoriteToy;
    }
}
```

You have a nearly complete project at your disposal. You can choose to delete this starter code and build everything from scratch for a hands-on experience, or modify the existing code as you follow the lesson.

## Setting Up the Project

The first step in any new TypeScript project is to install the package dependencies. In our labs, this is achieved by running:

```
yarn install
```

After executing this command, you should see an output similar to the following:

```
root in ~/code via v20.17.0 on (us-east-1) took 2s
yarn install
Yarn 4.4.0
r Resolution step
r @inquirer/type@npm:^1.1.1
```

Once the installation completes, a simple log message confirms that everything is set up correctly:

```
console.log("Let's go!");
```

This produces a log similar to:

```
YN00000: Post-resolution validation
YN00002: typescript-fundamentals@workspace:. doesn't provide @types/node (p1f7c1), requested by ts-node.
YN00086: Some peer dependencies are incorrectly met by your project; run yarn explain peer-requirements <hash> for details, where <hash> is the six-letter p-prefixed code.
YN00006: Some peer dependencies are incorrectly met by dependencies; run yarn explain peer-requirements for details.
```

To start the development server, run:

```
yarn dev
```

You should see logs indicating that the application is running, and that it restarts reactively when changes are detected:

```
root in ~/code via v20.17.0 on (us-east-1) took 56s
> yarn dev
[INFO] 19:40:10 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.5.4)
Let's go!
[INFO] 19:40:18 Restarting: /root/code/index.ts has been modified
```

> [!important]
> **Note**
>
> You will see log messages each time changes are detected, which ensures that TypeScript's compilation is working correctly.

## Practical Example with Duck Variables

Elmer Code, our duck-enthusiast developer, is ready to build an app that manages his pond’s ducks—making them quack, fly, or land. The first step is to store basic information about each duck, such as its name and age. In TypeScript, you can declare variables using either the `const` or `let` keywords.

### Using `const` for Immutable Variables

When you use `const`, the variable remains immutable after its initial declaration:

```
const duckName: string = 'Daffy';
const duckAge: number = 3;

console.log(duckName); // Output: Daffy
```

Attempting to reassign a `const` variable, as shown below, will result in a compilation error:

```
// This will cause a compilation error:
// duckAge = 4;
```

### Using `let` for Mutable Variables

If you require a variable whose value can change over time, declare it with `let`:

```
let duckName: string = 'Daffy';
let duckAge: number = 3;

console.log(duckName); // Logs: Daffy

// Reassigning duckAge without causing an error:
duckAge = 4;
console.log(duckAge); // Logs: 4
```

### Type Inference by TypeScript

TypeScript can automatically infer the type of a variable when you assign it a value. For example:

```
let duckType: string = 'Mallard'; // Explicit typing
let duckColor = 'Black';          // TypeScript infers the type as string
```

Hovering over `duckColor` in your IDE will confirm that its type is indeed inferred as `string`. However, if you try to reassign it with a different type, the TypeScript compiler will trigger an error:

```
// Example resulting in a compilation error:
// duckColor = 1;
```

## Introduction to Elmer Code

Elmer Code, our passionate developer who loves ducks, takes a unique approach to building his application. His strategy involves managing ducks by storing their names, ages, types, and other essential characteristics—all implemented through practical TypeScript code examples.

![The image is a simple diagram titled "Elmer – Introduction," showing a connection between "Elmer Code" and a "duck" with the word "Loves" indicating the relationship.](https://kodekloud.com/kk-media/image/upload/v1752869619/notes-assets/images/CDK-for-Terraform-with-TypeScript-Syntax-Variables-and-Primitives-in-TypeScript/elmer-introduction-code-duck-diagram.jpg)

Elmer's application aims to manage his ducks efficiently by storing critical details like names, ages, and types.

## Summary

In this lesson, we explored how to declare variables and handle primitive types in TypeScript. You learned about:

- The differences between `const` (immutable) and `let` (mutable) declarations.
- How to use explicit versus inferred typings.
- How TypeScript enforces type safety to help prevent runtime errors.

![The image is a timeline or flowchart with seven steps, each labeled with a topic related to programming concepts, starting with "Variables & Parameters" and ending with "Putting it All Together."](https://kodekloud.com/kk-media/image/upload/v1752869620/notes-assets/images/CDK-for-Terraform-with-TypeScript-Syntax-Variables-and-Primitives-in-TypeScript/programming-concepts-timeline-flowchart.jpg)

In the next section, we will dive into arrays and objects to further develop Elmer Code’s TypeScript application.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/9424b931-5259-41ea-a9f9-fca84b8bc920)**
>
> Watch video content
