# Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Classes)

---

## Table of Contents

- Classes
  - Enhanced PondDuck Class
  - Managing Duck Behavior
  - Testing the PondDuck Class
  - Creating Multiple Duck Instances
  - Watch Video
    - Fly Method with Warning
    - Implementation of the Land Method
    - Quack Method with Repeat Functionality

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Classes

In this lesson, we explore TypeScript classes by creating a `PondDuck` class that serves as a blueprint for duck objects. Each instance of `PondDuck` contains properties such as `name`, `age`, `type`, `color`, and `isFlying`. In addition, it provides methods like `quack` and `fly` to define the duck's behavior.

Below is the initial implementation of the `PondDuck` class:

```
class PondDuck {
    name: string;
    age: number;
    type: string;
    color: string;
    isFlying: boolean;


    constructor(name: string, age: number, type: string, color: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.isFlying = false;
    }


    quack(): void {
        console.log(`${this.name} says: Quack!`);
    }


    fly(): void {
        if (!this.isFlying) {
            this.isFlying = true;
            console.log(`${this.name} starts flying!`);
        }
    }
}
```

The constructor initializes a new duck instance with the provided values, while the methods `quack` and `fly` enable the duck to perform its actions. In the lab, you can experiment with how this class is used.

> [!important]
> **Using Classes vs Interfaces**
>
> Previously, duck objects were created using an interface type, as shown in the example below:
>
> ```
> const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };
> ```
>
> Switching to a class-based approach not only encapsulates behavior but also helps manage internal states like `isFlying`.

## Enhanced PondDuck Class

The updated version of the `PondDuck` class includes an optional property `favoriteFood` with its assignment in the constructor:

```
class PondDuck {
    name: string;
    age: number;
    type: string;
    color: string;
    isFlying: boolean; // Additional property not in the interface
    favoriteFood?: string; // Optional property


    constructor(name: string, age: number, type: string, color: string, favoriteFood?: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.isFlying = false; // Ducks are not flying by default
        this.favoriteFood = favoriteFood; // Assign optional property if provided
    }


    quack(): void {
        console.log(`${this.name} duck says: Quack!`);
        // ToDo:
        // Quack for a certain number of (optional) times.
        // Expected Output: Daffy the Black Mallard duck says: Quack!
    }
}
```

During compilation, you might encounter an error similar to the following because TypeScript cannot identify the name `Duck`:

```
[INFO] 21:05:25 Restarting: /root/code/index.ts has been modified
[ERROR] 21:05:30 × Unable to compile TypeScript:
index.ts(43,14): error TS2304: Cannot find name 'Duck'.
```

To properly create an instance of a `PondDuck`, use the class constructor instead of an interface:

```
const daffy = new PondDuck("Daffy", 3, 'Mallard', "Black");
```

This instance now has properties assigned through the constructor and access to its methods.

## Managing Duck Behavior

### Fly Method with Warning

Below is an updated version of the `fly` method. It issues a warning when attempting to fly while the duck is already in flight:

```
fly(): void {
    if (!this.isFlying) {
        this.isFlying = true;
        console.log(`${this.name} starts flying!`);
    } else {
        console.log(`${this.name} is already flying!`);
    }
}
```

### Implementation of the Land Method

A tentative implementation of the `land` method changes the flying state of the duck. Its intended behavior is illustrated below:

```
land(): void {
    // Expected Output: Daffy lands gracefully / Daffy is already on the ground.
    if (this.isFlying) {
        this.isFlying = false;
        console.log(`${this.name} lands gracefully!`);
    } else {
        console.log(`${this.name} is already on the ground!`);
    }
}
```

### Quack Method with Repeat Functionality

The `quack` method was further enhanced to support quacking multiple times using a default parameter value and a loop:

```
quack(times: number = 1): void {
    console.log(`${this.name} the ${this.color} ${this.type} duck says: Quack!`);
    for (let i = 0; i < times; i++) {
        console.log(`${this.name} the ${this.color} ${this.type} duck says: Quack!`);
    }
}
```

After addressing syntax errors and ensuring proper string interpolation with backticks, running this method produces output similar to:

```
Daffy duck says: Quack!
Daffy the Black Mallard duck says: Quack!
```

## Testing the PondDuck Class

Below is an example of testing the `fly`, `land`, and `quack` methods:

```
const daffy = new PondDuck('Daffy', 3, 'Mallard', 'Black');


daffy.quack();
daffy.fly();
daffy.fly();  // Should warn that Daffy is already flying.
daffy.land();
daffy.land(); // Should warn that Daffy is already on the ground.
```

Expected output:

```
Daffy the Black Mallard duck says: Quack!
Daffy starts flying!
Daffy is already flying!
Daffy lands gracefully!
Daffy is already on the ground!
```

This internal state management using the `isFlying` boolean allows the class methods to determine the duck's action properly.

## Creating Multiple Duck Instances

Elmer wants to create several duck instances using the `PondDuck` class. Instead of creating just one instance, you can instantiate multiple duck objects as shown below:

```
const daffy = new PondDuck('Daffy', 3, 'Mallard', 'Black');
const donald = new PondDuck('Donald', 5, 'Pekin', 'White');


daffy.fly();
daffy.fly();
daffy.land();
daffy.land();
```

Each instance is created with its unique properties, and you can independently call methods on each duck. This demonstrates how TypeScript classes encapsulate both data and behavior, allowing for multiple distinct objects to be created from a single blueprint.

> [!important]
> **Next Steps**
>
> In the next section, we will explore union types and enums.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/e591fbfb-cd71-44ca-9a30-f689670b2e74)**
>
> Watch video content
