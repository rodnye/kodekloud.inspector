# Putting It All Together - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Putting-It-All-Together)

---

## Table of Contents

- Putting It All Together
  - Creating an Array of Ducks
  - Making Ducks Quack
  - Making a Specific Duck Fly
  - A More Complete Example
  - Advanced Concepts and Best Practices
  - Watch Video
  - Practice Lab
    - Key Takeaways

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Putting It All Together

In this lesson, we integrate several key concepts and advanced ideas while emphasizing clean code practices. Elmer demonstrates how to build a complete duck pond management application using TypeScript features and best practices.

## Creating an Array of Ducks

We begin by initializing an array to hold multiple duck objects. Explicitly typing the array is especially useful when data might come from various sources or when elements are conditionally created.

Consider the example below:

```
// Duck pond array to store multiple Duck objects with explicit typing
const duckPond: PondDuck[] = [];

// Create some Duck instances and add them to the duck pond
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black'); // Instance with inferred typing
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White', 'Corn'); // Optional property provided
const howard = new PondDuck('Howard', 2, DuckType.Muscovy, 'Brown');

// Adding ducks to the array
duckPond.push(daffy, donald, howard);

// ToDo:
// Write a function to make a given list of ducks quack
// Optional argument for the number of times
function makeAllDucksQuack(ducks: PondDuck[], times?: number): void {}
```

During compilation you might encounter errors related to the order of variable declarations. For instance, if the duck pond is declared before creating the duck instances:

```
[INFO] 21:37:57 Restarting: /root/code/index.ts has been modified
[ERROR] 21:37:58 x Unable to compile TypeScript:
index.ts(54,31): error TS2448: Block-scoped variable 'daffy' used before its declaration.
...
```

Defining the duck pond after creating the instances lets TypeScript infer the correct types. For example:

```
// Create some Duck instances first
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black');
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White', 'Corn');
const howard = new PondDuck('Howard', 2, DuckType.Muscovy, 'Brown');

// Duck pond array inferred based on the created instances
const duckPond = [daffy, donald, howard, "hi"]; // Inferred as a union type

duckPond.push("bye");

// ToDo:
// Write a function to make a given list of ducks quack
// Optional argument for the number of times
function makeAllDucksQuack(ducks: PondDuck[], times?: number): void {}
```

This example highlights the impact of explicit typing versus type inference in TypeScript. By declaring the array after creating the instances, the inferred type should normally consist of `PondDuck` objects. However, adding a string element changes the type to a union (`string | PondDuck`), which can lead to type errors such as:

```
index.ts(64,10): error TS2339: Property 'p' does not exist on type 'PondDuck[]'.
[ERROR] 21:38:46 Unable to compile TypeScript:
index.ts(64,15): error TS2345: Argument of type 'string' is not assignable to parameter of type 'PondDuck'.
```

A cleaner approach leverages type inference without mixing unwanted types:

```
// Create Duck instances
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black');
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White', 'Corn');
const howard = new PondDuck('Howard', 2, DuckType.Muscovy, 'Brown');

// Duck pond array inferred from provided instances
const duckPond = [daffy, donald, howard];

duckPond.push("bye"); // This will raise an error as "bye" is not assignable to type PondDuck

// ToDo:
// Write a function to make the given list of ducks quack
// Optional argument for the number of times
function makeAllDucksQuack(ducks: PondDuck[], times?: number): void {}
```

> [!important]
> **TypeScript Tip**
>
> Type inference helps reduce boilerplate, but be cautious when mixing types in arrays as it might lead to unexpected errors.

## Making Ducks Quack

To have a list of ducks perform a quack action, use the array's `forEach` method with an arrow function that calls each duck's `quack` method. Review the refactored function below:

```
function makeAllDucksQuack(ducks: PondDuck[], times = 1): void {
    ducks.forEach((duck) => duck.quack(times));
}

// Example call to the function
// makeAllDucksQuack(duckPond, 2);
```

When you run this function, you might see console outputs similar to:

```
Howard duck says: Quack!
Howard the Brown Muscovy duck says: Quack!
Daffy duck says: Quack!
...
```

Within the `PondDuck` class, the `quack` method might be implemented as follows:

```
quack(times = 1): void {
    console.log(`${this.name} duck says: Quack!`);
    for (let i = 0; i < times; i++) {
        console.log(`${this.name} the ${this.color} ${this.type} duck says: Quack!`);
    }
}
```

## Making a Specific Duck Fly

Next, we create a function to trigger the fly behavior for a duck based on its name. Note that the `duckPond` array is in the parent scope and referenced directly within the function. Although this approach works, passing data through function parameters is generally more maintainable.

```
function findDuckAndFly(name: string): void {
    const foundDuck = duckPond.find((duck) => duck.name === name);
    if (foundDuck) {
        foundDuck.fly();
    } else {
        console.warn(`No duck named ${name} found in the pond.`);
    }
}
```

Test this functionality with:

```
findDuckAndFly('Daffy'); // Should output: "Daffy starts flying!"
```

> [!important]
> **Scope Warning**
>
> While `makeAllDucksQuack` is a pure function that receives all required data through parameters, `findDuckAndFly` depends on external state. For better code maintainability, pass necessary data explicitly.

## A More Complete Example

Below is a consolidated version of the code tying everything together:

```
// Duck pond array to store multiple Duck objects
const duckPond: PondDuck[] = [];

// Create Duck instances and add them to the pond
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black');
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White', 'Corn');
const howard = new PondDuck('Howard', 2, DuckType.Muscovy, 'Brown');

duckPond.push(daffy, donald, howard);

// Function to make all ducks in the pond quack
function makeAllDucksQuack(ducks: PondDuck[], times = 1): void {
    ducks.forEach((duck) => duck.quack(times));
}

// Function to make a specific duck fly based on its name
// Warns if the duck is not found
function findDuckAndFly(name: string): void {
    const foundDuck = duckPond.find((duck) => duck.name === name);
    if (foundDuck) {
        foundDuck.fly();
    } else {
        console.warn(`No duck named ${name} found in the pond.`);
    }
}

// Usage examples:
makeAllDucksQuack(duckPond, 3);
findDuckAndFly('Donald');
```

Additional utility functions might include counting ducks by type:

```
function countDucksByType(type: DuckType): number {
    return duckPond.filter((duck) => duck.type === type).length;
}

const mallardCount: number = countDucksByType(DuckType.Mallard);
console.log(`There are ${mallardCount} Mallard ducks in the pond.`);
```

And listing all ducks in the pond:

```
console.log('Ducks in the pond:', duckPond.map((duck) => duck.name).join(', '));
```

Finally, you can export modules for external use:

```
export { PondDuck, DuckType };
```

## Advanced Concepts and Best Practices

This lesson combines interfaces, types, classes, and functions to manage a duck pond. Key points include:

- Variables serve as containers for data.
- Use `let` for changeable values and `const` for constants.
- Complex types such as arrays and objects help model extended data structures.
- Type inference in TypeScript reduces verbosity, while explicit typing can prevent unintended behavior.
- Classes encapsulate logic for creating objects with shared behaviors.
- Enums and union types improve code readability and type safety.

Below is a diagram summarizing these concepts:

![The image is a summary slide with a gradient background, listing four points about defining data structures, building classes, using arrays, and enhancing flexibility in programming.](https://kodekloud.com/kk-media/image/upload/v1752869615/notes-assets/images/CDK-for-Terraform-with-TypeScript-Putting-It-All-Together/data-structures-classes-arrays-summary.jpg)

### Key Takeaways

- Variables store data values.
- Primitive types include string, number, boolean, null, and undefined.
- Use `let` and `const` appropriately to declare variables.
- Arrays and objects allow for extended data structures.
- Rely on TypeScript's type inference to reduce boilerplate.
- Classes encapsulate shared behaviors and structures.
- Enums and union types help enforce type safety.

![The image is a summary of key takeaways about syntax in programming, covering topics like variables, primitive types, variable declarations, complex types, type inference, classes, and enums/union types.](https://kodekloud.com/kk-media/image/upload/v1752869616/notes-assets/images/CDK-for-Terraform-with-TypeScript-Putting-It-All-Together/programming-syntax-key-takeaways.jpg)

For further learning, consider exploring advanced topics such as generics, utility types, core JavaScript concepts, async/await, and decorators.

![The image lists advanced TypeScript concepts such as Generics, Utility Types, Core JavaScript, Async/Await, and Decorators, explaining their benefits for enhancing programming skills.](https://kodekloud.com/kk-media/image/upload/v1752869618/notes-assets/images/CDK-for-Terraform-with-TypeScript-Putting-It-All-Together/typescript-advanced-concepts-list.jpg)

These advanced concepts are excellent next steps to further deepen your understanding and expertise in TypeScript.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/f044a3ce-0352-4334-9148-34666a0f0c61)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/5e113100-9832-4049-806e-14d4d8720547)**
>
> Practice lab
