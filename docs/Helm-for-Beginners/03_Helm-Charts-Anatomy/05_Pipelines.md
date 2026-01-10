# Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Pipelines)

---

## Table of Contents

- Pipelines
  - Pipelines in Helm Templating
  - Watch Video
  - Practice Lab

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Pipelines

In this lesson, we will explore how pipelines work and how they can streamline command operations and templating in Helm.

When working in a Linux environment, the output of the echo command simply prints the provided string. However, there are situations where you may want to take this output and process it with another command. This is where pipes (or pipelines) come into play.

For example, consider the following commands:

```
$ echo "abcd"
abcd
$ echo "abcd" | tr a-z A-Z
ABCD
```

In the first command, the string "abcd" is printed as is. In the second command, the output of `echo "abcd"` is piped into the `tr` command, which translates all lowercase letters (a–z) to uppercase, resulting in "ABCD".

## Pipelines in Helm Templating

Helm templating allows you to efficiently manipulate variables using functions. Typically, functions are written with the function name preceding the variable names. For instance:

```
{{ upper .Values.image.repository }}
# Output: image: NGINX
```

An alternative and more common approach is to use pipelines by positioning the function name at the end of the variable. Pipelines allow you to chain multiple functions together, thereby enhancing readability and flexibility in your templates.

Consider the following example, which converts the repository value to uppercase and then encloses it in quotes:

```
{{ .Values.image.repository | upper | quote }}
# Output: image: "NGINX"
```

You can further extend this technique by chaining additional functions. For example, if you need to shuffle the characters after converting to uppercase and enclosing them in quotes, you can achieve that with the following pipeline:

```
{{ .Values.image.repository | upper | quote | shuffle }}
```

> [!important]
> **Note**
>
> Remember that pipelines not only make your templating code cleaner but also allow you to perform complex transformations in a readable and efficient manner.

Practice using functions and pipelines in your own projects to fully grasp their potential. Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/752e5734-8f48-44fa-a936-e9aff83e9cbd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/4dc824a1-4d39-4f27-b52d-1026e2647718)**
>
> Practice lab
