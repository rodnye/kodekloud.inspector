# High Order Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Using-Functions/High-Order-Functions)

---

## Table of Contents

- High Order Functions
  - Basic Circle Property Functions
  - Handling User Input with Conditional Logic
  - Simplifying with High-Order Functions
  - Watch Video
  - Practice Lab
    - Defining the printResult Function
    - Defining the getFunction Function
    - Refactored Main Function Using High-Order Functions

---

## Content

Golang

Using Functions

# High Order Functions

In this lesson, we explore high-order functions—functions that either accept another function as an argument or return a function as output. High-order functions enable modular composition, allowing you to build complex operations from small, focused functions. This approach not only minimizes bugs but also enhances code readability and maintainability.

![The image explains the benefits of using high-order functions, highlighting composition, reduced bugs, and creating smaller functions for specific logic.](https://kodekloud.com/kk-media/image/upload/v1752877751/notes-assets/images/Golang-High-Order-Functions/frame_50.jpg)

Mastering high-order functions empowers you to write more efficient and maintainable code. For example, consider calculating various properties of a circle. Given a circle's radius, users might want to compute its area, perimeter, or diameter by choosing the corresponding query (1, 2, or 3).

![The image illustrates a circle with a labeled radius and lists three related concepts: area, perimeter, and diameter.](https://kodekloud.com/kk-media/image/upload/v1752877751/notes-assets/images/Golang-High-Order-Functions/frame_90.jpg)

> [!important]
> **Key Concept**
>
> High-order functions allow you to abstract recurring operations, making your code scalable as you incorporate additional properties or shapes.

## Basic Circle Property Functions

Begin by defining basic functions to calculate the area, perimeter, and diameter of a circle. Each function receives the circle's radius as a float64 and returns a float64 value.

```
package main


import "fmt"


func calcArea(r float64) float64 {
	return 3.14 * r * r
}


func calcPerimeter(r float64) float64 {
	return 2 * 3.14 * r
}


func calcDiameter(r float64) float64 {
	return 2 * r
}
```

## Handling User Input with Conditional Logic

A common approach is to use conditional statements to decide which calculation to perform based on user input. The following code demonstrates this method:

```
func main() {
	var query int
	var radius float64


	fmt.Print("Enter the radius of the circle: ")
	fmt.Scanf("%f", &radius)
	fmt.Printf("Enter \n 1 - area \n 2 - perimeter \n 3 - diameter: ")
	fmt.Scanf("%d", &query)


	if query == 1 {
		fmt.Println("Result: ", calcArea(radius))
	} else if query == 2 {
		fmt.Println("Result: ", calcPerimeter(radius))
	} else if query == 3 {
		fmt.Println("Result: ", calcDiameter(radius))
	} else {
		fmt.Println("Invalid query")
	}
}
```

When running this program, the console interaction might look like:

```
>>> go run main.go
Enter the radius of the circle: 9.1
Enter
 1 - area
 2 - perimeter
 3 - diameter: 1
Result: 260.0234
Thank you!
```

While this solution works, it can quickly become cumbersome as you add more shape properties. Leveraging high-order functions simplifies the code and enhances scalability.

## Simplifying with High-Order Functions

The following sections demonstrate how to refactor the code using high-order functions. We introduce two helper functions: one to display the result and another to map the query number to the appropriate calculation function.

### Defining the printResult Function

The printResult function accepts the radius and a calculation function as parameters. It executes the calculation, stores the result, and displays it.

```
func printResult(radius float64, calcFunction func(r float64) float64) {
	result := calcFunction(radius)
	fmt.Println("Result: ", result)
	fmt.Println("Thank you!")
}
```

### Defining the getFunction Function

The getFunction function maps a user's query (an integer) to the corresponding calculation function using a predefined map.

```
func getFunction(query int) func(r float64) float64 {
	queryToFunc := map[int]func(r float64) float64{
		1: calcArea,
		2: calcPerimeter,
		3: calcDiameter,
	}
	return queryToFunc[query]
}
```

### Refactored Main Function Using High-Order Functions

By integrating these high-order functions, the main function becomes succinct. It reads user input, selects the appropriate calculation function via getFunction, and passes it to printResult.

```
func main() {
	var query int
	var radius float64


	fmt.Print("Enter the radius of the circle: ")
	fmt.Scanf("%f", &radius)
	fmt.Printf("Enter \n 1 - area \n 2 - perimeter \n 3 - diameter: ")
	fmt.Scanf("%d", &query)


	printResult(radius, getFunction(query))
}
```

Upon running the refactored program, you may observe the following console interaction:

```
>>> go run main.go
Enter the radius of the circle: 7
Enter
 1 - area
 2 - perimeter
 3 - diameter: 3
Result: 14
Thank you!
```

> [!important]
> **Benefits of High-Order Functions**
>
> High-order functions reduce code redundancy while clarifying the logical separation between input handling and processing logic—making it easier to extend and maintain your application.

By adopting high-order functions, you enhance code clarity, modularity, and scalability. Try integrating these concepts into your projects to unlock more robust and maintainable code designs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/085bac55-2622-442c-814f-cf764b442c32)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/1d067f98-2f95-452b-a8a7-9bb184d3d8de)**
>
> Practice lab
