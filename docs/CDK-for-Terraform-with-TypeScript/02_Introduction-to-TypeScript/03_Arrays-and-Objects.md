# Arrays and Objects - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Arrays-and-Objects)

---

## Table of Contents

- Arrays and Objects
  - Arrays
  - Objects
  - Summary
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Arrays and Objects

In this lesson, we explore how to work with arrays and objects in TypeScript. Elmer encounters a situation where he needs to manage multiple objects together, and TypeScript offers robust tools to handle this seamlessly.

## Arrays

When creating an array in TypeScript, it's best practice to explicitly define its element type. For example, if you have an array of duck names (strings), you can define it as follows:

```
const ducks: string[] = ['Daffy', 'Donald', 'Howard'];
```

In this code, the variable “ducks” is explicitly typed to contain only strings, ensuring type safety throughout your application.

## Objects

Elmer also needs to store detailed information about each duck, including properties such as its type and color. Objects enable you to group related key-value pairs into a single entity. Consider the following example, which represents a duck:

```
const duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };
```

Here, the keys—name, age, type, and color—accompany their respective values, offering a structured way to represent data. To access a specific property of this object, you can use dot notation. For example, to print the duck's name to the console, you would write:

```
console.log(duck.name);
```

When this code is compiled and executed, "Daffy" is logged to the console.

> [!important]
> **Tip**
>
> Always initialize your declarations properly. Failing to initialize objects or misspelling property names leads to compilation errors.

If you omit initializing an object during its declaration, TypeScript will report errors similar to:

```
[ERROR] 19:49:42 × Unable to compile TypeScript:
index.ts(1,7): error TS1155: 'const' declarations must be initialized.
index.ts(1,7): error TS7005: Variable 'duck' implicitly has an 'any' type.
```

Similarly, accessing a non-existent property will lead to errors like:

```
[ERROR] 19:50:10 × Unable to compile TypeScript:
index.ts(3,9): error TS2339: Property 'l' does not exist on type 'Console'.
```

These messages serve as helpful reminders to access only the defined properties and to maintain proper initialization.

## Summary

Arrays and objects are fundamental constructs in TypeScript:

- An **array** (e.g., "ducks") can hold multiple elements of a specified type.
- An **object** (e.g., "duck") stores related data as key-value pairs.
- Using the correct syntax and initializing values helps avoid common TypeScript compilation errors.

Next, we will dive deeper into types and interfaces to further enhance our understanding of TypeScript's capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/3e6ec986-1e4d-48a5-b0c5-c63e3f9631b7)**
>
> Watch video content
