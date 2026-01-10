# Hashes and cryptography - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Hashes-and-cryptography)

---

## Table of Contents

- Hashes and cryptography
  - Practical Example: MD5 Hashing in Go
  - Summary
  - Watch Video
    - Code Explanation

---

## Content

Advanced Golang

Core packages

# Hashes and cryptography

In this lesson, we explore the built-in crypto package in Go (Golang) and learn how to integrate hashing and encryption/decryption algorithms into our code. Cryptography is the practice of ensuring secure communication even when third parties are present. By using various encryption and decryption techniques, you can protect digital data from unauthorized access and exploitation.

Golang's crypto package provides robust support for cryptography and hashing with easy-to-use implementations for many algorithms.

![The image is a slide titled "Crypto package" that explains cryptography as a practice for secure communication, using encryption and decryption techniques to protect digital data.](https://kodekloud.com/kk-media/image/upload/v1752868725/notes-assets/images/Advanced-Golang-Hashes-and-cryptography/crypto-package-cryptography-slide.jpg)

## Practical Example: MD5 Hashing in Go

Imagine you are developing a user registration form where the password must be hashed before storing it in a database. One common method is MD5 hashing—a mathematical algorithm that transforms text strings into unique, fixed-length hashes.

> [!important]
> **Warning**
>
> MD5 is considered cryptographically broken and should not be used for secure password storage in production environments. Consider more advanced algorithms like bcrypt or Argon2 for real-world applications.

Below is a sample program that demonstrates how to implement MD5 hashing in Go:

```
package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
)

// encodeWithMD5 computes the MD5 checksum of the input string and returns its hexadecimal encoding.
func encodeWithMD5(str string) string {
	hashCode := md5.Sum([]byte(str))
	return hex.EncodeToString(hashCode[:])
}

func main() {
	var password string
	fmt.Scanln(&password)
	fmt.Println("Password encrypted to:", encodeWithMD5(password))
}
```

### Code Explanation

- **Importing Packages:**  
  The code imports the "crypto/md5" package for MD5 hashing functions and the "encoding/hex" package to convert the hash to a hexadecimal string.
- **encodeWithMD5 Function:**  
  This function takes a string as input, computes its MD5 checksum using `md5.Sum`, and then returns the hexadecimal representation of the resulting byte slice.
- **Main Function:**  
  The program reads a password input from the user, processes it using the `encodeWithMD5` function, and outputs the hashed password.

Golang's crypto package also supports a variety of other encryption and decryption algorithms to meet different cryptographic requirements. For more advanced usage and additional algorithms, be sure to consult the [Golang Crypto Package Documentation](https://golang.org/pkg/crypto/).

## Summary

Golang offers a comprehensive suite for handling encryption and hashing, making it an excellent choice for developing secure applications. By leveraging the power of the crypto package, you can ensure that sensitive data, like user passwords, are properly managed—keeping in mind that algorithm choice (e.g., MD5 vs. bcrypt) should align with current security best practices.

For further reading:

- [Introduction to Cryptography](https://en.wikipedia.org/wiki/cryptography)
- [Golang Official Documentation](https://golang.org/doc/)
- [Advanced Hashing Techniques](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/940c75d9-f79c-4dbc-a913-ae5969296c1b)**
>
> Watch video content
