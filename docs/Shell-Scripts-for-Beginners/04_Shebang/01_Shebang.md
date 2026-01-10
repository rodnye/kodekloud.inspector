# Shebang - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shebang/Shebang)

---

## Table of Contents

- Shebang
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shebang

# Shebang

In this guide, we explore the critical role of the shebang in shell scripts. We’ll also review Linux shell basics and highlight the differences between various shells like the Bourne shell, the Bourne Again shell (bash), Debian Almquist shell (dash), Korn shell, Z shell, and C shell. Although these shells share similarities, there are key differences that can affect your script’s execution.

For instance, consider the difference between the Bourne shell (ash, dash, or the Debian shell) and the Bourne Again shell (bash). The image below outlines a few common shell types:

![The image lists shell types: Bourne Shell (sh), Debian Almquist Shell (dash), and Bourne again Shell (bash), with a KodeKloud logo.](https://kodekloud.com/kk-media/image/upload/v1752884057/notes-assets/images/Shell-Scripts-for-Beginners-Shebang/frame_30.jpg)

Previously, we discussed a for loop in a shell script that generates a sequence from 0 to 10 using a bash-specific expression. The following script works as expected in bash:

```
for mission in {0..10}
do
    create-and-launch-rocket $mission
done
```

When executed in bash, you will see the output:

```
bash$ launch-rockets.sh
Launching mission 0
Launching mission 1
Launching mission 2
Launching mission 3
Launching mission 4
Launching mission 5
Launching mission 6
Launching mission 7
Launching mission 8
Launching mission 9
Launching mission 10
```

However, if you run this script using the Bourne shell (sh) or dash, the sequence expression `{0..10}` is not expanded, resulting in output like:

```
sh$ launch-rockets.sh
Launching mission {0..10}
```

Even though many modern systems link the Bourne shell to bash, explicitly testing in shells like dash reveals these differences.

> [!important]
> **Using the Correct Shell**
>
> To ensure reliable behavior, always run scripts that depend on bash-specific features with the bash interpreter.

The solution is to include a shebang at the beginning of your script. The shebang is a special line that instructs the system which interpreter to use, as demonstrated here:

```
#!/bin/bash
for mission in {0..10}
do
    create-and-launch-rocket $mission
done
```

With the shebang (`#!/bin/bash`) at the top, executing the script directly guarantees that bash is used regardless of the default shell environment. Consider the following examples:

- **Running the script directly in a non-bash shell:**

```
sh$ launch-rockets.sh
Launching mission {0..10}
```

- **Running the script explicitly with bash:**

```
sh$ bash launch-rockets.sh
Launching mission 0
Launching mission 1
Launching mission 2
Launching mission 3
Launching mission 4
Launching mission 5
Launching mission 6
Launching mission 7
Launching mission 8
Launching mission 9
Launching mission 10
```

The shebang assures that your shell script always runs under the intended interpreter, preventing issues associated with incompatible shell syntax.

> [!important]
> **Important**
>
> If your script relies on bash-specific features, **always** start with the appropriate shebang (`#!/bin/bash`) to avoid unexpected behavior when run in different shell environments.

![The image advises best practice in scripting: "Always start with a Shebang in your scripts," presented on a green and white background.](https://kodekloud.com/kk-media/image/upload/v1752884058/notes-assets/images/Shell-Scripts-for-Beginners-Shebang/frame_180.jpg)

That concludes our deep dive into the shebang in shell scripts. Happy scripting, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/ea1f0409-2d7e-474c-ab6d-c8ba4302b1a9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/69362b26-b485-45d0-81f0-bc1cf484fddc)**
>
> Practice lab
