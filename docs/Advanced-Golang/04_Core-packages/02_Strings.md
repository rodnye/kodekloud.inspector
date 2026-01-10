# Strings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Strings)

---

## Table of Contents

- Strings
  - The Contains Method
  - The ReplaceAll Method
  - The Count Method
  - Strings in Go: Immutability and Basic Usage
  - Using the Contains Method: An Example
  - Using the Count Method
  - Using the ReplaceAll Method
  - Conclusion
  - Watch Video

---

## Content

Advanced Golang

Core packages

# Strings

In this lesson, we explore strings in Go and dive into some of the most useful methods available in the standard library for handling text. We will review the function signatures, behaviors, and example usages of the Contains, ReplaceAll, and Count methods.

---

## The Contains Method

The Contains method checks whether a specific substring exists within a given string. It accepts two string parameters and returns a boolean value—true if the second string is found within the first, and false otherwise.

```
func Contains(str string, substr string) bool
```

For example, if the substring exists in the string, the method returns true; if not, it returns false.

> [!important]
> **Note**
>
> Remember that the check is case sensitive. Ensure that both the string and the substring have matching cases for accurate results.

---

## The ReplaceAll Method

The ReplaceAll function is used to substitute every occurrence of a specified substring within a string with another substring. Its signature is as follows:

```
func ReplaceAll(str, old, new string) string
```

This function searches for all instances of the substring "old" within "str" and replaces them with "new".

---

## The Count Method

The Count function is designed to count the number of non-overlapping instances of a substring within a string. Its function signature is:

```
func Count(s, substr string) int
```

If no occurrences are found, Count returns zero. Note that the comparison is case sensitive and done character by character.

---

## Strings in Go: Immutability and Basic Usage

In Go, a string is defined as a sequence of characters used to represent text. An important aspect of strings in Go is their immutability—once a string is created, its content cannot be modified.

For example, consider this simple code snippet:

```
package main


func main() {
    text := "Go"
}
```

Attempting to modify a character in the string will result in an error:

```
package main
import "fmt"


func main() {
    text := "Go is fun"
    fmt.Println(text)
    // Attempting to change a character results in an error, as strings are immutable.
    text[1] = 'l'
}
```

To manipulate strings, Go provides the "strings" package. Below is an example of how to import and use this package along with "fmt" for printing:

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := "Go is fun"
    fmt.Println(text)
    // Attempting to modify a string will still produce an error.
    // text[1] = 'l'
}
```

---

## Using the Contains Method: An Example

The following example demonstrates how to use the Contains method. In this example, we create a string called `learning` and search for the substring `library in Go`.

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    learning := "learning standard library in Go"
    // Searching for an exact substring that exists.
    fun := "library in Go"

    result := strings.Contains(learning, fun)
    fmt.Println(result)
}
```

Running the code above produces:

```
go run main.go
true
```

Now, consider a case where the substring doesn't match exactly:

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    learning := "learning standard library in Go"
    // This substring does not match exactly.
    fun := "learning in Go"


    result := strings.Contains(learning, fun)
    fmt.Println(result)
}
```

The output in this instance will be:

```
go run main.go
false
```

> [!important]
> **Tip**
>
> The Contains method checks for an exact match. Adjust your substring accordingly to ensure accurate results.

---

## Using the Count Method

The Count method is useful when you need to determine how many times a substring appears in a string. Here is an example:

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := "learning standard library in Python learning"
    substr := "learning"

    result := strings.Count(text, substr)
    fmt.Println(result)
}
```

Running the above code yields:

```
go run main.go
2
```

Since the search is case sensitive, consider this variation:

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := "Learning standard library in Python learning"
    substr := "learning"

    result := strings.Count(text, substr)
    fmt.Println(result)
}
```

In this case, because only one occurrence matches exactly due to case sensitivity, the output is:

```
go run main.go
1
```

An interesting behavior is observed when checking against an empty string. For example:

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := ""
    substr := "!"

    result := strings.Count(text, substr)
    fmt.Println(result)
}
```

The output will be:

```
go run main.go
0
```

---

## Using the ReplaceAll Method

The ReplaceAll method allows you to substitute parts of a string. For instance, consider the following code where we replace the substring "library in Python" with "library in Go":

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := "Learning standard library in Python"
    oldSubstr := "library in Python"

    result := strings.ReplaceAll(text, oldSubstr, "library in Go")
    fmt.Println(result)
}
```

Running this code produces:

```
go run main.go
Learning standard library in Go
```

For another example, where multiple occurrences of the substring "learning" are replaced with "executing":

```
package main
import (
    "fmt"
    "strings"
)


func main() {
    text := "learning standard library in Python learning"
    substr := "learning"


    // Replacing all instances of "learning" with "executing"
    result := strings.ReplaceAll(text, substr, "executing")
    fmt.Println(result)
}
```

The output becomes:

```
go run main.go
executing standard library in Python executing
```

Keep in mind that this replacement is case sensitive. Ensure the case in your search string matches the case in the text you are processing.

---

## Conclusion

In this tutorial, we covered essential string functions in Go, including the concepts of string immutability and usage of the Contains, Count, and ReplaceAll methods from the "strings" package. These functions are powerful tools that allow you to manipulate and process text effectively in your Go applications.

For additional information on Go and its standard library, explore [Go Documentation](https://golang.org/pkg/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/05d081ac-f70c-4bc6-86e4-aa747a091c98)**
>
> Watch video content
