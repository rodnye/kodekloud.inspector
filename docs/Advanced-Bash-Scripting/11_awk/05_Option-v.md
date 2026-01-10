# Option v - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/awk/Option-v)

---

## Table of Contents

- Option v
  - Table of Contents
  - What Is -v in AWK?
  - Basic Syntax and Examples
  - Combining -v with Other Options
  - Sample Data: employees.txt
  - Practical Examples
  - Common AWK Options
  - Summary
  - References
  - Watch Video
    - 1. Prefixing First Names
    - 2. Filtering High Earners
    - 3. Printing Only First Names
    - 4. Advanced: Multiple Salary Thresholds
      - Without Variables
      - With -v Variable

---

## Content

Advanced Bash Scripting

awk

# Option v

Learn how to leverage AWK’s `-v` flag to declare variables before program execution. This enhances script flexibility, readability, and maintainability.

## Table of Contents

- [What Is `-v` in AWK?](#what-is--v-in-awk)
- [Basic Syntax and Examples](#basic-syntax-and-examples)
- [Combining `-v` with Other Options](#combining--v-with-other-options)
- [Sample Data: employees.txt](#sample-data-employeestxt)
- [Practical Examples](#practical-examples)
  - [1\. Prefixing First Names](#1-prefixing-first-names)
  - [2\. Filtering High Earners](#2-filtering-high-earners)
  - [3\. Printing Only First Names](#3-printing-only-first-names)
  - [4\. Advanced: Multiple Salary Thresholds](#4-advanced-multiple-salary-thresholds)
- [Common AWK Options](#common-awk-options)
- [Summary](#summary)
- [References](#references)

## What Is `-v` in AWK?

The `-v` option in AWK allows you to assign a value to a variable before the AWK program starts. Variables declared this way can be used in `BEGIN`, `END`, or pattern/action blocks—similar to command-line parameters in other scripting languages.

## Basic Syntax and Examples

```
awk -v var="Hello, World!" 'BEGIN { print var }'
```

- `-v var="Hello, World!"` assigns the string to `var`.
- `BEGIN { ... }` runs before any input is read.
- `print var` outputs the variable’s value.

Example output:

```
$ awk -v var="Hello, World!" 'BEGIN { print var }'
Hello, World!
```

> [!important]
> **Note**
>
> If you omit `BEGIN`, AWK will wait for input records. Press Enter for a blank line, then Ctrl+D to end input and trigger actions.

## Combining `-v` with Other Options

When using multiple flags, the order matters. According to the AWK usage:

```
usage: awk [-F fs] [-v var=value] [-f progfile | 'prog'] [file ...]
```

Always specify `-F` (field separator) before `-v`:

```
awk -F "|" -v var="Hello, World!" 'BEGIN { print var }'
```

> [!important]
> **Warning**
>
> Placing `-v` before `-F` can cause AWK to misinterpret the options. Always follow the correct option order.

## Sample Data: employees.txt

```
$ cat employees.txt
1|Kriti|Shreshtha|Finance|Financial Analyst|kriti.shreshtha@company.com|60000
2|Rajasekar|Vasudevan|Financial|Senior Accountant|rajasekar.vasudevan@company.com|75000
3|Debbie|Miller|IT|Software Developer|debbie.miller@company.com|80000
4|Enrique|Rivera|Marketing|Marketing Specialist|enrique.rivera@company.com|65000
5|Feng|Lin|Sales|Sales Manager|feng.lin@company.com|90000
6|Andy|Luscomb|IT|IT Manager|andy.luscomb@company.com|95000
7|Mark|Crocker|HR|HR Manager|mark.crocker@company.com|85000
8|Jing|Ma|Engineering|Engineering Manager|jing.ma@company.com|100000
```

## Practical Examples

### 1\. Prefixing First Names

Use a `prefix` variable to label each first name:

```
$ awk -F "|" -v prefix="Employee's First Name: " \
    '{ print prefix, $2 }' employees.txt
```

Output:

```
Employee's First Name: Kriti
Employee's First Name: Rajasekar
...
Employee's First Name: Jing
```

### 2\. Filtering High Earners

#### Without Variables

```
$ awk -F "|" '$7 >= 90000' employees.txt
```

#### With `-v` Variable

```
$ awk -F "|" -v high_salary=90000 \
    '$7 >= high_salary' employees.txt
```

### 3\. Printing Only First Names

Combine the salary threshold with a print action:

```
$ awk -F "|" -v high_salary=90000 \
    '$7 >= high_salary { print $2 }' employees.txt
```

Result:

```
Feng
Andy
Jing
```

### 4\. Advanced: Multiple Salary Thresholds

Declare both high and low benchmarks:

```
$ awk -F "|" \
    -v high_salary=90000 \
    -v low_salary=65000 \
    '$7 >= high_salary || $7 <= low_salary { print $2 }' employees.txt
```

This returns first names earning ≤ 65000 or ≥ 90000.

## Common AWK Options

| Option | Description                       | Example                             |
| ------ | --------------------------------- | ----------------------------------- |
| \\-F   | Set input field separator         | \\`awk -F "                         |
| \\-v   | Declare variable before execution | `awk -v var=val 'BEGIN{print var}'` |
| \\-f   | Execute AWK program from a file   | `awk -f script.awk data.txt`        |
| script | Inline AWK program or expression  | `awk '{ print $2 }' file.txt`       |

## Summary

- Use **`-v`** to assign variables before AWK starts.
- Always put **`-F`** before **`-v`** to avoid parsing errors.
- Variables can appear in `BEGIN`, pattern/actions, and `END` blocks.
- Meaningful variable names improve script readability and maintainability.

## References

- [GNU AWK Manual](https://www.gnu.org/software/gawk/manual/gawk.html)
- [AWK Tutorial](https://www.grymoire.com/Unix/Awk.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0cddb337-89d3-4068-a878-37a0a342c22f/lesson/3465090f-e249-4c9c-ab09-3fc1702fc617)**
>
> Watch video content
