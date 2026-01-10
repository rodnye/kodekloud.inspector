# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Functions)

---

## Table of Contents

- Functions
  - Simple Function Implementation
  - Experimenting with Type Definitions
  - Corrected Implementation
  - Using Default Parameter Values
  - Function Styles in TypeScript
  - Complete Working Example
  - Next Steps
  - Watch Video
    - Traditional Function Declaration
    - Arrow Function Expression

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Functions

In this guide, we'll explore functions in TypeScript by demonstrating how to make a duck quack. Elmer’s challenge is to get his ducks to quack, and we solve this by writing effective TypeScript functions.

## Simple Function Implementation

The initial implementation of the function, named `makeDuckQuack`, logs a duck's quack message. This function accepts a duck object and an optional parameter to specify the number of quacks. If the optional parameter is omitted, the duck quacks once by default.

```
function makeDuckQuack(duck: Duck, times?: number): void {
    const quackCount = times || 1; // Default to 1 if `times` is not provided
    for (let i = 0; i < quackCount; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}
```

In this code:

- The first parameter is a duck object.
- The second parameter, `times`, determines how many times the duck will quack.

The code uses a for loop with string interpolation to output the message.

## Experimenting with Type Definitions

During development, a type definition for the duck and an example duck object were introduced. An incomplete function implementation caused compilation errors. Below is the snippet that initially led to errors:

```
type Duck = {
  name: string;
  age: number;
  type: string;
  color: string;
  favoriteFood?: string;
};


const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };


function makeDuckQuack(duck: Duck, times?: number): void {
  const quackCount = times ||
}
```

The errors encountered were:

```
Complication error in /root/code/index.ts
[ERROR] 20:57:57 x Unable to compile TypeScript:
index.ts(12,10): error TS2391: Function implementation is missing or not immediately following the declaration.
index.ts(12,10): error TS7010: 'makeDuckQuack', which lacks return-type annotation, implicitly has an 'any' return type.
[INFO] 20:57:58 Restarting: /root/code/index.ts has been modified
Complication error in /root/code/index.ts
[ERROR] 20:58:15 x Unable to compile TypeScript:
index.ts(13,8): error TS1123: Variable declaration list cannot be empty.
Complication error in /root/code/index.ts
```

> [!important]
> **Warning**
>
> These errors occur due to an incomplete implementation of the function. Always ensure your function implementations are complete to avoid compilation issues.

## Corrected Implementation

Below is the corrected version of the code with proper error handling and structure:

```
type Duck = {
    name: string;
    age: number;
    type: string;
    color: string;
    favoriteFood?: string;
};


const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };


function makeDuckQuack(duck: Duck, times?: number): void {
    const quackCount = times || 1; // Default to 1 if `times` is not provided
    for (let i = 0; i < quackCount; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}
```

When calling the function as follows:

```
makeDuckQuack(daffy, 2);
```

The console output will be:

```
Daffy says: Quack!
Daffy says: Quack!
```

This demonstrates how the function uses the optional parameter to control the quack count.

## Using Default Parameter Values

We can simplify the function by using a default parameter value. This approach removes the need for the optional marker and manually setting a default value inside the function. Consider the following revised version:

```
type Duck = {
    name: string;
    age: number;
    type: string;
    color: string;
    favoriteFood?: string;
};


const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };


function makeDuckQuack(duck: Duck, times: number = 1): void {
    for (let i = 0; i < times; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}


makeDuckQuack(daffy, 2);
```

When run with `yarn dev`, you'll see:

```
Daffy says: Quack!
Daffy says: Quack!
```

Calling the function without the `times` parameter (i.e., `makeDuckQuack(daffy)`) will result in a single quack by default.

## Function Styles in TypeScript

Another common way to define functions in TypeScript is by using arrow functions. Both traditional function declarations and arrow functions are valid. Below are examples of each style:

### Traditional Function Declaration

```
function makeDuckQuack(duck: Duck, times?: number): void {
    const quackCount = times || 1; // Default to 1 if `times` is not provided
    for (let i = 0; i < quackCount; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}
```

### Arrow Function Expression

```
const makeDuckQuack = (duck: Duck, times?: number): void => {
    const quackCount = times || 1; // Default to 1 if `times` is not provided
    for (let i = 0; i < quackCount; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}
```

Both styles accomplish the same task, so you can choose the approach that best fits your coding preferences.

## Complete Working Example

Here’s a complete example using the simplified default parameter syntax:

```
type Duck = {
    name: string;
    age: number;
    type: string;
    color: string;
    favoriteFood?: string;
};


const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };


function makeDuckQuack(duck: Duck, times: number = 1): void {
    for (let i = 0; i < times; i++) {
        console.log(`${duck.name} says: Quack!`);
    }
}


makeDuckQuack(daffy);
```

Depending on the parameter provided, the output will be:

- For `makeDuckQuack(daffy)`:

  ```
  Daffy says: Quack!
  ```

- For `makeDuckQuack(daffy, 2)`:

  ```
  Daffy says: Quack!
  Daffy says: Quack!
  ```

![The image is a timeline or flowchart with seven steps related to programming concepts, including "Variables & Parameters," "Arrays & Objects," "Types & Interfaces," "Functions," "Classes," "Union Types & Enums," and "Putting it All Together." The fourth step, "Functions," is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752869613/notes-assets/images/CDK-for-Terraform-with-TypeScript-Functions/programming-concepts-timeline-flowchart.jpg)

## Next Steps

In the next section, we will explore classes in TypeScript and how to apply object-oriented programming concepts to further improve your code structure.

For more information on TypeScript and advanced function patterns, visit the [TypeScript Documentation](https://www.typescriptlang.org/docs/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/3102a69a-afd3-46c1-b297-07c2a8cd4c62)**
>
> Watch video content
