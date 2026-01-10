# Option Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/awk/Option-Files)

---

## Table of Contents

- Option Files
  - Running awk Programs
  - Adding a Shebang
  - Pure awk Script vs Bash–awk Hybrid
  - Declaring Variables
  - Field Separators
  - Summary
  - Links and References
  - Watch Video
    - 1. Pure awk script
    - 2. Bash–awk hybrid

---

## Content

Advanced Bash Scripting

awk

# Option Files

In this lesson, we’ll explore how to organize complex awk programs in separate files and invoke them with the `-f` option. By saving your scripts externally, you’ll improve readability, ease maintenance, and enable reuse across projects.

## Running awk Programs

For quick tasks, run a one-liner directly in your shell:

```
$ awk 'BEGIN { print "Hello, World!" }'
Hello, World!
```

To separate logic from invocation, save the program in a file (e.g., `hello.awk`):

```
# hello.awk
BEGIN {
    print "Hello, World!"
}
```

Then execute:

```
$ awk -f hello.awk
Hello, World!
```

The single quotes are only required when passing inline scripts; they aren’t needed when awk reads from a file.

## Adding a Shebang

Turn your awk file into a standalone executable by adding a shebang and setting the execute bit:

```
#!/usr/bin/env awk -f
BEGIN {
    print "Hello, World!"
}
```

```
$ chmod +x hello.awk
$ ./hello.awk
Hello, World!
```

> [!important]
> **Note**
>
> Using `#!/usr/bin/env awk -f` ensures portability across systems where awk may reside in different paths.

## Pure awk Script vs Bash–awk Hybrid

You have two main patterns for script-based awk:

| Script Type     | Extension | Characteristics              | Invocation Example |
| --------------- | --------- | ---------------------------- | ------------------ |
| Pure awk script | `.awk`    | \\- Contains only awk syntax |                    |

- Uses `#!/usr/bin/env awk -f`
- Limited to awk’s built-in features | `./pure-hello.awk` | | Bash–awk hybrid | `.sh` | - Shell wrapper with `#!/usr/bin/env bash`
- Mix pipes, globbing, and parameter expansion
- Quotes awk code to avoid shell interpolation | `./hybrid-hello.sh` |

### 1\. Pure awk script

```
#!/usr/bin/env awk -f
BEGIN {
    message = "Hello, World!"
    print message
}
```

### 2\. Bash–awk hybrid

```
#!/usr/bin/env bash
awk 'BEGIN {
    message = "Hello, World!"
    print message
}'
```

```
$ chmod +x hybrid-hello.sh
$ ./hybrid-hello.sh
Hello, World!
```

## Declaring Variables

Inside pure awk scripts, assign variables within the `BEGIN` block. In hybrids, you can also pass values via `-v`:

```
# hello-v1.awk
#!/usr/bin/env awk -f


BEGIN {
    msg = "Hello, World!"
    print msg
}
```

```
# hello-v2.sh
#!/usr/bin/env bash


awk -v msg="Hello, World!" 'BEGIN {
    print msg
}'
```

```
$ awk -f hello-v1.awk
Hello, World!


$ chmod +x hello-v2.sh
$ ./hello-v2.sh
Hello, World!
```

## Field Separators

Control how awk splits input fields either in your script or via the `-F` option:

| Method                            | Syntax     | Description             |
| --------------------------------- | ---------- | ----------------------- |
| In-script (PURE awk)              | \\`FS = "  | "`inside`BEGIN { … }\\` |
| Command-line (hybrid & one-liner) | \\`awk -F" | " '{ print $2, $3 }'\\` |

Both approaches produce the same output when processing an `employees.txt` file:

```
$ ./separator.sh < employees.txt
$ awk -f separator.awk  < employees.txt
```

> [!important]
> **Warning**
>
> Mixing different separator settings across scripts can cause confusion. Standardize on one method in your project.

## Summary

- Use `awk -f script.awk` or add a shebang for pure awk scripts.
- Bash–awk hybrids (`.sh`) combine shell capabilities with awk’s text processing.
- Choose the format that maximizes clarity, maintainability, and fits your workflow.

![The image is a slide titled "awk Programs From Files," explaining the use of the `-f` option for executing awk scripts, running awk from .awk programs, and running awk from bash scripts.](https://kodekloud.com/kk-media/image/upload/v1752868667/notes-assets/images/Advanced-Bash-Scripting-Option-Files/awk-programs-from-files-slide.jpg)

## Links and References

- [GNU awk Manual](https://www.gnu.org/software/gawk/manual/gawk.html#Invoking-gawk)
- [awk One-Liners Explained](https://www.pement.org/awk/awk1line.txt)
- [KornShell vs Bash Scripts](https://en.wikipedia.org/wiki/Comparison_of_command_shells)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0cddb337-89d3-4068-a878-37a0a342c22f/lesson/41130575-a66f-44a7-a358-c07d27c09e3f)**
>
> Watch video content
