# Creating and accessing a package - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Creating-and-accessing-a-package)

---

## Table of Contents

- Creating and accessing a package
  - Step 1: Creating the Go Module
  - Step 2: Building the Encrypt Package
  - Step 3: Setting Up the Main Application
  - Step 4: Running Your Go Application
  - Conclusion
  - Watch Video
    - Implementing the Encryption Function

---

## Content

Advanced Golang

Modules Packages and Imports

# Creating and accessing a package

In this lesson, you'll learn how to create a Go module and organize it into packages for encryption and decryption functionality. We will design a simple project where the encryption logic involves adding three to each character's ASCII code. This tutorial covers setting up the module, creating the encrypt package, and accessing the package in your main application.

The project structure is designed as follows:

```
cryptit
├── encrypt
│   └── algorithm.go
└── decrypt
    └── algorithm.go
```

For now, we will focus on building and testing the **encrypt** package.

---

## Step 1: Creating the Go Module

Start by navigating to your workspace directory and creating a new directory for your module:

```
mkdir crypt8
cd crypt8
```

Initialize the Go module using the appropriate module path (usually matching your repository structure). For example:

```
go mod init github.com/Priyanka-yadavv/cryptit
```

This command generates a `go.mod` file with content similar to:

```
module github.com/Priyanka-yadavv/cryptit
go 1.19
```

> [!important]
> **Note**
>
> The `go.mod` file defines your module’s dependencies and version. Ensure that the module path is aligned with your repository.

---

## Step 2: Building the Encrypt Package

Next, create the directory for the **encrypt** package and add a new file named `algorithm.go`:

```
mkdir encrypt
cd encrypt
touch algorithm.go
```

In `algorithm.go`, begin by declaring the package:

```
package encrypt
```

### Implementing the Encryption Function

We'll implement a function that processes an input string by adding three to the ASCII value of each character. The function will:

- Take a string as input.
- Iterate over every character.
- Shift the ASCII code by three.
- Append the modified character to an output string.
- Return the encrypted string.

Since this function will be used in another package, it must be exported. In Go, exported functions should have names that start with a capital letter. We'll name our function **Nimbus**.

Below is the complete implementation:

```
package encrypt

func Nimbus(str string) string {
	encryptedStr := ""
	for _, c := range str {
		asciiCode := int(c)
		character := string(asciiCode + 3)
		encryptedStr += character
	}
	return encryptedStr
}
```

This function accepts a string, shifts each character’s ASCII code by three, and returns the resultant encrypted string.

---

## Step 3: Setting Up the Main Application

Return to the root directory of your module to create the primary application file, `main.go`. This file will test the encryption function from the **encrypt** package.

Create `main.go` and add the following content:

```
package main

import (
	"fmt"
	"github.com/Priyanka-yadavv/cryptit/encrypt"
)

func main() {
	fmt.Println(encrypt.Nimbus("KodekLoud"))
}
```

In the code above, we import the `encrypt` package using its module path. The function `encrypt.Nimbus("KodekLoud")` is called to process the string. The parameter is passed directly without the need for the `str:` label, and the uppercase N in Nimbus makes it accessible outside its package.

> [!important]
> **Exported Functions**
>
> Remember, functions that need to be accessible from other packages must start with an uppercase letter.

---

## Step 4: Running Your Go Application

With everything set up, compile and run the application from the module's root directory:

```
go run main.go
```

When you run the command, you should see the following output:

```
Nrghnorxg
```

This output confirms that each character in `"KodekLoud"` has been shifted by three ASCII positions (e.g., K becomes N, O becomes R, etc.), which verifies that the encryption algorithm is functioning correctly.

---

## Conclusion

In this lesson, you learned how to:

- Create and initialize a Go module using `go mod init`.
- Organize module components into separate packages for encryption and decryption.
- Implement and export an encryption function by capitalizing its name.
- Utilize the exported function in a `main.go` file to run your application.

In upcoming lessons, we will develop the **decrypt** package to add complementary decryption functionality.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/be4c6e74-4d82-485a-8689-fe96bab4611d)**
>
> Watch video content
