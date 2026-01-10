# Method Sets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Method-Sets)

---

## Table of Contents

- Method Sets
  - Defining the Student Structure
  - Using the Student Methods in the Main Function
  - Watch Video
  - Practice Lab

---

## Content

Golang

Struct Methods and Interfaces

# Method Sets

In this lesson, we explore method sets, which are collections of methods associated with a given data type. Method sets allow you to encapsulate functionality and define specific behaviors for your custom types. By understanding method sets, you can write more modular and maintainable code in Go.

## Defining the Student Structure

We begin by defining a structure named Student. The Student struct contains two fields:

- **name**: a string representing the student's name.
- **grades**: a slice of integers representing the student's scores.

Below is the code that defines the Student struct along with two associated methods:

1.  **displayName**: A method with a pointer receiver that prints the student's name.
2.  **calculatePercentage**: This method calculates the student's average grade by summing all grades and dividing the sum by the total number of grades. Although it is described as calculating a percentage, the computation returns the average score.

```
package main

import "fmt"

type Student struct {
	name   string
	grades []int
}

func (s *Student) displayName() {
	fmt.Println(s.name)
}

func (s *Student) calculatePercentage() float64 {
	sum := 0
	for _, grade := range s.grades {
		sum += grade
	}
	// Calculates the average grade. The original multiplication by 100 cancels out.
	return float64(sum) / float64(len(s.grades))
}
```

> [!important]
> **Note**
>
> Understanding method sets is vital for delving into interfaces in Go, as they are built on these underlying concepts.

## Using the Student Methods in the Main Function

In the next code snippet, we initialize a Student instance with the name "Joe" and a slice containing three grades: 90, 75, and 80. We then call the displayName method to print the student's name and use the calculatePercentage method to compute and print the average grade with two decimal points of precision.

```
func main() {
	s := Student{name: "Joe", grades: []int{90, 75, 80}}
	s.displayName()
	fmt.Printf("%.2f%%", s.calculatePercentage())
}

/* Expected Output:
Joe
81.67%
*/
```

> [!important]
> **Practice Tip**
>
> Try modifying the Student struct and its methods to handle more complex calculations or additional student attributes. Experiment with other data types and see how method sets interface with Go's overall type system.

That's it for this lesson. Practice these concepts with hands-on exercises to solidify your understanding of method sets and their practical applications in Go.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/c5a91fc6-41e8-4603-a666-ba28bfdd44b9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/398523a4-0582-44fa-ab05-1d6955db1c63)**
>
> Practice lab
