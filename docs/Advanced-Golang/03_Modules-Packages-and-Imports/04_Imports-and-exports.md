# Imports and exports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Imports-and-exports)

---

## Table of Contents

- Imports and exports
  - Exporting Identifiers
  - Importing Packages to Access Exported Identifiers
  - Creating and Using a Decrypt Package
  - Importing Packages from a Different Module Locally
  - Summary
  - Watch Video

---

## Content

Advanced Golang

Modules Packages and Imports

# Imports and exports

This article explains the key concepts behind imports and exports in Go. You'll learn how to structure your packages, export identifiers, and import both local and external modules effectively.

---

## Exporting Identifiers

In Go, an identifier is exported from a package when its name starts with an uppercase letter. Any identifier starting with an uppercase letter is accessible outside the package, whereas those beginning with a lowercase letter (or an underscore) are confined to the current package.

For example, consider the following code in the "encrypt" package:

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

In the snippet above, the function Nimbus is exported because its name starts with an uppercase letter. If you were to rename it to start with a lowercase letter (e.g., nimbus), it would not be accessible outside the package.

> [!important]
> **Note**
>
> When exporting identifiers, document each exported element thoroughly. This practice ensures that the package API remains robust and backward compatible unless a major version change occurs.

---

## Importing Packages to Access Exported Identifiers

To use exported constants, variables, or functions from another package, include an import statement in your code. For instance, if you want your main program to use the Nimbus function from the "encrypt" package, your code might appear as follows:

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

Here, the "encrypt" package is imported explicitly, which allows direct access to its exported Nimbus function.

---

## Creating and Using a Decrypt Package

To complement the encryption functionality, you can create a "decrypt" package. First, create a file named `algorithm.go` in the decrypt package directory with a decryption algorithm that reverses the encryption by subtracting three from each character’s ASCII code:

```
package decrypt


func Nimbus(str string) string {
	decryptedStr := ""
	for _, c := range str {
		asciiCode := int(c)
		character := string(asciiCode - 3)
		decryptedStr += character
	}
	return decryptedStr
}
```

Next, update your main program to utilize both the encrypt and decrypt packages:

```
package main


import (
	"fmt"
	"github.com/Priyanka-yadavv/cryptit/encrypt"
	"github.com/Priyanka-yadavv/cryptit/decrypt"
)


func main() {
	encryptedStr := encrypt.Nimbus("Kodekloud")
	fmt.Println(encryptedStr)
	fmt.Println(decrypt.Nimbus(encryptedStr))
}
```

When run, the main file produces the following output, demonstrating that the encrypted string is accurately transformed back to the original string:

```
go run main.go
Nrghnorxg
Kodekloud
```

This example shows how to import and use packages within the same module. Remember to export identifiers by capitalizing them so they remain accessible externally.

---

## Importing Packages from a Different Module Locally

At times, you might need to import a package from another module that hasn't yet been published to a version control system. Consider a scenario where you have another module called "learn" that uses the encryption algorithm from your cryptit module. In the main file of the learn module, you might include:

```
package main


import (
	"fmt"
	"github.com/Priyanka-yadavv/cryptit/encrypt"
	"github.com/pborman/uuid"
)


func main() {
	id := uuid.NewRandom()
	fmt.Println(id)


	encryptedStr := encrypt.Nimbus("Kodekloud")
	fmt.Println(encryptedStr)
}
```

Running `go mod tidy` may produce an error like this:

```
go: finding module for package github.com/Priyanka-yadavv/cryptit/encrypt
go: downloading github.com/Priyanka-yadavv/cryptit v0.0.0-20221114082254-ee77ba24d5d5
example.com/learn imports
    github.com/Priyanka-yadavv/cryptit/encrypt: module github.com/Priyanka-yadavv/cryptit@latest found (v0.0.0-20221114082254-ee77ba24d5d5), but does not contain package github.com/Priyanka-yadavv/cryptit/encrypt
```

This error occurs because the module being imported is not published with the correct package structure. To resolve this when working locally, use the `replace` directive in your `go.mod` file. Execute the following command:

```
go mod edit -replace github.com/Priyanka-yadavv/cryptit=../cryptit
```

After executing this command, your `go.mod` might look like:

```
module example.com/learn


go 1.19


require (
	github.com/pborman/uuid v1.2.1
)


replace github.com/Priyanka-yadavv/cryptit => ../cryptit
```

With the replace directive in place, running `go mod tidy` and then executing your main file should result in:

```
> go run main.go
a1ca6247-5082-419f-945a-6246e2f77576
Nrghnorxg
```

This confirms that your local module substitution is working correctly. Once the module is published, remember to remove the replace directive.

> [!important]
> **Important**
>
> The replace directive modifies the module path entirely; it cannot replace only a specific package within the module.

---

## Summary

In this article, you learned the following:

- Export identifiers in Go by capitalizing the first letter so that they are accessible outside the package.
- Use the import statement to access exported identifiers from other packages.
- Import packages within the same module by referencing the appropriate module path.
- For local modules that are not yet published, utilize the replace directive in the `go.mod` file to redirect the module path to your local directory.

By following these best practices, you'll be able to effectively manage your Go modules and their dependencies, ensuring a robust and backward-compatible API.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/f3efe8ac-b1e3-48ba-bb30-2cf16009f275)**
>
> Watch video content
