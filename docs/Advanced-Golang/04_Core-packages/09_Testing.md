# Testing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Testing)

---

## Table of Contents

- Testing
  - Creating the Function to Test
  - Writing Unit Tests in the Same Package
  - Testing Exported Functions from a Separate Package
  - Organizing Tests in a Separate Directory
  - Best Practices for Testing in Go
  - Watch Video
  - Practice Lab

---

## Content

Advanced Golang

Core packages

# Testing

In this lesson, we'll explore how to write unit tests in Go while observing best practices for testing. Go’s built-in test runner and framework seamlessly integrate with standard language tooling, allowing you to execute tests simply by running:

```
go test ./
```

This command automatically discovers and runs tests in the current directory and its subdirectories. Remember that test files should be separate from your main package code and must have filenames ending with `_test.go`.

Below, you’ll learn how to test a function that determines whether an integer is even.

## Creating the Function to Test

Begin by creating a function called `checkEven` in your main package. This function accepts an integer argument and returns `"YES"` if the number is even; otherwise, it returns `"NO"`.

```
package main

func checkEven(i int) string {
    if i%2 == 0 {
        return "YES"
    }
    return "NO"
}

func main() {
    // Application entry point; can be left empty for testing purposes.
}
```

## Writing Unit Tests in the Same Package

To test the `checkEven` function, create a file named `process_test.go` in the same directory. In Go, test functions must start with a capital letter `Test`. The following example shows how to write a test case for `checkEven`:

```
package main

import "testing"

func TestCheckEven(t *testing.T) {
    i := 10
    expected := "YES"
    res := checkEven(i)
    if expected != res {
        t.Errorf("expected: %v, got: %v", expected, res)
    }
}
```

When you run:

```
go test .
```

the test will execute and pass if `checkEven` returns the correct output.

> [!important]
> **Tip**
>
> To see a failing test in action, you can intentionally set the expected string to `"YESs"`:

```
package main

import "testing"

func TestCheckEven(t *testing.T) {
    i := 10
    expected := "YESs" // Intentionally incorrect for demonstration purposes
    res := checkEven(i)
    if expected != res {
        t.Errorf("expected: %v, got: %v", expected, res)
    }
}
```

Executing the test with the modified expectation produces output similar to:

```
go test .
--- FAIL: TestCheckEven (0.00s)
    process_test.go:10: expected: YESs, got: YES
FAIL
FAIL    example.com/learn    0.407s
```

It is crucial to always begin your test function names with a capital `T`. If you name a test function with a lowercase `t` (e.g., `func testCheckEven(t *testing.T) { ... }`), the test runner will not recognize it:

```
> go test .
ok      example.com/learn  (cached) [no tests to run]
```

## Testing Exported Functions from a Separate Package

Another effective strategy is testing functions from an external package. You may move your code into its own package (for example, `process`) and then write tests that import this package.

Imagine moving your `process.go` file into a subdirectory named `process`, and updating the package name accordingly:

```
package process

func CheckEven(i int) string {
    if i%2 == 0 {
        return "YES"
    }
    return "NO"
}
```

Next, create a test file (e.g., `process_test.go`) with the following code:

```
package main

import (
    "example.com/learn/process"
    "testing"
)

func TestCheckEven(t *testing.T) {
    i := 10
    expected := "YES"
    res := process.CheckEven(i)
    if expected != res {
        t.Errorf("expected %s, got %s", expected, res)
    }
}
```

Running:

```
go test .
```

should produce an output like:

```
ok      example.com/learn  0.479s
```

confirming that externally exported functions are tested as a consumer would use them.

## Organizing Tests in a Separate Directory

Alternatively, you can maintain a dedicated directory (such as `tests`) for your test code. This method is suitable when testing exported functions. After moving your test file into the `tests` directory, your test might look like this:

```
package main

import (
    "example.com/learn/process"
    "testing"
)

func TestCheckEven(t *testing.T) {
    i := 10
    expected := "YES"
    res := process.CheckEven(i)
    if expected != res {
        t.Errorf("expected: %v, got: %v", expected, res)
    }
}
```

Executing tests from within the `tests` directory with:

```
go test .
```

will produce:

```
ok      example.com/learn/tests  0.449s
```

This approach is effective for verifying only the publicly exported functions. However, note that testing internal (non-exported) functions requires placing the tests within the same package as the code.

## Best Practices for Testing in Go

- Use separate test files with the `_test.go` suffix.
- Always name test functions starting with a capital `Test`.
- For internal functions, write tests in the same package; for exported functions, consider using a separate test package.
- Keep your test code modular and reflective of actual consumer usage.
- Consolidate similar code examples to maintain clarity and conciseness in documentation.

By following these best practices, you ensure that your test code remains clear and effective, while also making your projects easier to maintain and scale.

For additional information, consider exploring [Go Testing Documentation](https://golang.org/pkg/testing/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/ee71fd1a-d1cd-4829-b1ab-59a1139fb366)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/d72ba3b3-1da6-4f4e-99b4-9e35eb310a4b)**
>
> Practice lab
