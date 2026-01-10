# Union Types and Enums - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Union-Types-and-Enums)

---

## Table of Contents

- Union Types and Enums
  - The Problem with Arbitrary String Values
  - Restricting Values with Union Types
  - Using Enums to Restrict Values
  - Implementing Type Safety in a Class
  - Complete Example
  - Conclusion
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Union Types and Enums

In this article, we explore how union types and enums improve type safety in TypeScript. By limiting the values that can be assigned to specific properties, you can prevent potential runtime errors and improve maintainability. We'll walk through examples, demonstrate common pitfalls, and show how to enforce stricter type checking.

## The Problem with Arbitrary String Values

Consider a scenario where a duck object is created with properties such as type and color. When these properties are represented as simple strings, TypeScript may accept unexpected values. For instance, using the following code:

```
land(): void {
    if (this.isFlying) {
        this.isFlying = false;
        console.log(`${this.name} lands gracefully`);
    } else {
        console.log(`${this.name} is already on the ground!`);
    }
}


const daffy = new PondDuck('Daffy', 3, 'Mallard', 'Black');
const donald = new PondDuck('Donald', 5, 'Pekin', 'White');


daffy.fly();
daffy.fly();
daffy.land();
daffy.land();


donald.fly();
```

The console output and a TypeScript error appear as follows:

```
[ERROR] 21:14:50 × Unable to compile TypeScript:
index.ts(46,16): error TS2554: Expected 4-5 arguments, but got 1.
[INFO] 21:15:03 Restarting: /root/code/index.ts has been modified
[INFO] 21:15:16 Restarting: /root/code/index.ts has been modified
Daffy starts flying!
Daffy is already flying!
Daffy lands gracefully
Daffy is already on the ground!
Donald starts flying!
```

Here, because the class constructor accepts any string for duck type or color, passing a value like "Banana" (which doesn't represent a valid duck color) might occur unintentionally.

For example:

```
land(): void {
    if (this.isFlying) {
        this.isFlying = false;
        console.log(`${this.name} lands gracefully`);
    } else {
        console.log(`${this.name} is already on the ground!`);
    }
}


const daffy = new PondDuck('Daffy', 3, 'Mallard', 'Banana');
const donald = new PondDuck('Donald', 5, 'Pekin', 'White');


daffy.fly();
daffy.fly();
daffy.land();
daffy.land();


donald.fly();
```

Output:

```
Daffy is already flying!
Daffy lands gracefully
Daffy is already on the ground!
Donald starts flying!
[INFO] 21:19:55 Restarting: /root/code/index.ts has been modified
Daffy starts flying!
Daffy is already flying!
Daffy lands gracefully
Daffy is already on the ground!
Donald starts flying!
```

## Restricting Values with Union Types

To tackle this issue, you can restrict the possible values for duck colors by creating a union type in TypeScript. For instance:

```
type DuckColor = 'White' | 'Brown' | 'Black' | 'Mixed';
```

This union type ensures that only the values 'White', 'Brown', 'Black', or 'Mixed' are permissible. If you attempt to assign a value like "Banana", TypeScript will raise an error.

> [!important]
> **Tip**
>
> If "Banana" should be a valid color, simply add it to the union type:
>
> ```
> type DuckColor = 'White' | 'Brown' | 'Black' | 'Mixed' | 'Banana';
> ```

Even when assigning literal values, TypeScript enforces exact matches with the defined literals:

```
type DuckColor = 'White' | 'Brown' | 'Black';
const myColor: DuckColor = 'White';
```

You can also combine different types (e.g., string with number) in a union, although this is less common for properties such as duck color.

## Using Enums to Restrict Values

Another effective approach is to use enums. Enums provide a set of named constants, making your code more expressive and less error-prone. Consider the following enum for duck types:

```
enum DuckType {
    Mallard = 'Mallard',
    Muscovy = 'Muscovy',
    Pekin = 'Pekin',
}
```

By using enums, you make it clear that only valid duck types (Mallard, Muscovy, or Pekin) are allowed. For example, to use the enum value, you would write:

```
const duckType = DuckType.Mallard;
```

This practice avoids ambiguity with numeric indexes that TypeScript might otherwise assign by default.

## Implementing Type Safety in a Class

Let's combine union types and enums in a comprehensive example. First, we define the union type for duck color and the enum for duck type:

```
type DuckColor = 'White' | 'Brown' | 'Black' | 'Mixed';


enum DuckType {
    Mallard = 'Mallard',
    Muscovy = 'Muscovy',
    Pekin = 'Pekin',
}
```

Now, update the class to use these type-safe definitions:

```
class PondDuck {
    name: string;
    age: number;
    type: DuckType;
    color: DuckColor;
    isFlying: boolean;
    favoriteFood?: string;


    constructor(name: string, age: number, type: DuckType, color: DuckColor, favoriteFood?: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.isFlying = false;
        this.favoriteFood = favoriteFood;
    }


    quack(times = 1): void {
        console.log(`${this.name} duck says: Quack!`);
        for (let i = 0; i < times; i++) {
            // Optionally perform quack actions per iteration
        }
    }


    fly(): void {
        if (!this.isFlying) {
            this.isFlying = true;
            console.log(`${this.name} starts flying!`);
        } else {
            console.log(`${this.name} is already flying!`);
        }
    }


    land(): void {
        if (this.isFlying) {
            this.isFlying = false;
            console.log(`${this.name} lands gracefully!`);
        } else {
            console.log(`${this.name} is already on the ground!`);
        }
    }
}
```

When creating instances of the class, the use of enums and union types enforces valid values. For example:

```
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black');
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White');


daffy.fly();
daffy.fly();
daffy.land();
daffy.land();


donald.fly();
```

Attempting to pass an invalid duck color (e.g., "Banana") will result in a compile-time error.

## Complete Example

Below is the complete code segment that showcases the use of union types and enums in a TypeScript class:

```
type DuckColor = 'White' | 'Brown' | 'Black' | 'Mixed';


enum DuckType {
    Mallard = 'Mallard',
    Muscovy = 'Muscovy',
    Pekin = 'Pekin',
}


class PondDuck {
    name: string;
    age: number;
    type: DuckType;
    color: DuckColor;
    isFlying: boolean;
    favoriteFood?: string;


    constructor(name: string, age: number, type: DuckType, color: DuckColor, favoriteFood?: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.isFlying = false;
        this.favoriteFood = favoriteFood;
    }


    quack(times = 1): void {
        console.log(`${this.name} duck says: Quack!`);
        for (let i = 0; i < times; i++) {
            // Optionally execute quack actions per iteration
        }
    }


    fly(): void {
        if (!this.isFlying) {
            this.isFlying = true;
            console.log(`${this.name} starts flying!`);
        } else {
            console.log(`${this.name} is already flying!`);
        }
    }


    land(): void {
        if (this.isFlying) {
            this.isFlying = false;
            console.log(`${this.name} lands gracefully!`);
        } else {
            console.log(`${this.name} is already on the ground!`);
        }
    }
}


const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black');
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White');


daffy.fly();
daffy.fly();
daffy.land();
daffy.land();


donald.fly();


console.log(DuckType.Mallard);
```

Console output:

```
Daffy starts flying!
Daffy is already flying!
Daffy lands gracefully!
Daffy is already on the ground!
Donald starts flying!
Mallard
```

> [!important]
> **Key Takeaway**
>
> Using union types and enums together ensures that only valid values are used for properties like duck type and duck color, making your code more robust and easier to maintain.

## Conclusion

In this section, we've demonstrated how to leverage union types and enums to restrict property values in TypeScript. By enforcing valid values at compile time, you prevent bugs and improve code clarity. In our next article, we will explore additional advanced TypeScript features and their practical applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/2c9dcf6b-2550-4677-90c2-062589ed9929)**
>
> Watch video content
