# Types and Interfaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Introduction-to-TypeScript/Types-and-Interfaces)

---

## Table of Contents

- Types and Interfaces
  - Defining Object Structures with Types
  - Complete Type Definition Example
  - Defining Object Structures with Interfaces
  - Conclusion
  - Watch Video
    - Handling Typos and Property Validations
    - Modifying Objects Declared with const

---

## Content

CDK for Terraform with TypeScript

Introduction to TypeScript

# Types and Interfaces

Understanding how to clearly define object structures is essential when working with complex data in TypeScript. In this article, you'll learn how to use types and interfaces to create well-structured and type-safe objects. This approach not only helps reduce bugs but also improves code readability and maintainability.

## Defining Object Structures with Types

Elmer encountered a challenge as his objects began growing increasingly complex. One efficient solution in TypeScript is to define the shape of an object using a type. For example, consider the following type definition for a duck:

```
type Duck = {
    name: string;
    age: number;
    type: string;
    color: string;
    favoriteFood?: string; // Optional property
};

const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };
```

In this code:

- A type named `Duck` is declared with properties `name`, `age`, `type`, and `color` as required.
- The property `favoriteFood` is optional, denoted by the `?`.
- When creating an object like `daffy`, TypeScript ensures that the required properties are provided.

> [!important]
> **Optional Property Insight**
>
> The optional property `favoriteFood` means that while the property can be added later, its absence during the initial object creation will not cause a TypeScript error.

### Handling Typos and Property Validations

TypeScript's IntelliSense provides real-time feedback when there are mistakes such as typos. For instance, if you accidentally write "colur" instead of "color", TypeScript highlights the error:

```
you mean to write 'color'?
[INFO] 19:55:37 Restarting /root/code/index.ts has been modified
Compilation error in /root/code/index.ts
[ERROR] 19:55:39 × Unable to compile TypeScript:
index.ts(9,63): error TS2561: Object literal may only specify known properties, but 'colur' does not exist in type 'Duck'. Did you mean to write 'color'?
```

This feature enforces the use of only correctly defined properties in your object types.

### Modifying Objects Declared with const

Even if an object is declared with `const`, you can still modify its individual properties because `const` prevents reassignment of the entire object, not the mutation of its properties. For example:

```
const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };

daffy.favoriteFood = "Pizza";
```

## Complete Type Definition Example

For additional clarity, here’s the entire type definition with an optional property:

```
type Duck = {
    name: string;
    age: number;
    type: string;
    color: string;
    favoriteFood?: string; // Optional property
};

const daffy: Duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black' };
```

## Defining Object Structures with Interfaces

Another powerful way to define object structures in TypeScript is through interfaces. Interfaces provide similar functionality to types and can be used interchangeably in many basic use cases. Below is an equivalent interface definition for a duck:

```
interface Duck {
    name: string;
    age: number;
    type: string;
    color: string;
}
```

While both approaches yield similar results, interfaces offer extra capabilities for more advanced scenarios, which are beyond the scope of this discussion.

![The image is a timeline with seven steps related to programming concepts, including "Variables & Parameters," "Arrays & Objects," "Types & Interfaces," "Functions," "Classes," "Union Types & Enums," and "Putting it All Together." The third step, "Types & Interfaces," is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752869624/notes-assets/images/CDK-for-Terraform-with-TypeScript-Types-and-Interfaces/programming-concepts-timeline-steps.jpg)

## Conclusion

Leveraging types and interfaces in TypeScript is crucial for constructing reliable and maintainable code. These tools help to enforce strict type rules and provide developers with immediate feedback, reducing common errors and improving the overall development experience.

> [!important]
> **Further Learning**
>
> For more detailed information on TypeScript's advanced type features and interface capabilities, consider exploring the [TypeScript Documentation](https://www.typescriptlang.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/eb523de4-1aeb-429a-820a-20d9f6426562/lesson/c3255625-0eea-458e-853c-5b423596b037)**
>
> Watch video content
