# Expanding - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Conventions/Expanding)

---

## Table of Contents

- Expanding
  - Braces vs No Braces
  - Quoting and Word Splitting
  - Best Practices
  - Further Reading
  - Watch Video
    - With Braces
    - Without Braces
    - Delimiting Variable Names
    - Unquoted Expansion
    - Quoted Expansion
    - Intentional Splitting

---

## Content

Advanced Bash Scripting

Conventions

# Expanding

In shell scripting, variable expansion uses the dollar sign (`$`) to tell the shell to replace the variable name with its stored value.

```
#!/bin/bash
var="value of var"
echo ${var}
```

Running this script:

```
$ ./var-sample.sh
value of var
```

## Braces vs No Braces

You can reference variables with or without braces. Braces become essential when you append characters immediately after the variable name.

### With Braces

```
#!/bin/bash
var="value of var"
echo ${var}
```

### Without Braces

```
#!/bin/bash
var="value of var"
echo $var
```

Both scripts output:

```
$ ./var-sample.sh
value of var
```

### Delimiting Variable Names

Without braces, the shell cannot determine where the variable name ends:

```
#!/bin/bash
height=170

# Incorrect: $heightcm is undefined
echo "Your height is = $heightcm"

# Correct: ${height}cm expands properly
echo "Your height is = ${height}cm"
```

```
$ ./height.sh
Your height is =
Your height is = 170cm
```

## Quoting and Word Splitting

By default, unquoted expansions are split on whitespace defined by `IFS` (space, tab, newline). Use quotes to preserve the exact value.

![The image illustrates how different whitespace characters (tabs, spaces, linebreaks) affect the formatting of a string variable containing "Hello World".](https://kodekloud.com/kk-media/image/upload/v1752868552/notes-assets/images/Advanced-Bash-Scripting-Expanding/whitespace-characters-string-formatting.jpg)

### Unquoted Expansion

```
#!/bin/bash
string="One Two Three"

# Splits into words
for element in ${string}; do
  echo "${element}"
done
```

### Quoted Expansion

```
#!/bin/bash
string="One Two Three"

# Preserves the entire string as one element
for element in "${string}"; do
  echo "${element}"
done
```

```
$ ./string.sh
One
Two
Three

$ ./string2.sh
One Two Three
```

> [!important]
> **Note**
>
> Always quote expansions when dealing with filenames, paths, or URLs to prevent unintended splitting.

### Intentional Splitting

Sometimes you want to iterate over each word in a list:

```
#!/bin/bash
readonly SERVERS="server1 server2 server3"

for server in ${SERVERS}; do
  echo "${server}.example.com"
done
```

```
$ ./expanding.sh
server1.example.com
server2.example.com
server3.example.com
```

Quoting the variable in this case treats the entire list as one element:

```
#!/bin/bash
readonly SERVERS="server1 server2 server3"

for server in "${SERVERS}"; do
  echo "${server}.example.com"
done
```

```
$ ./expanding2.sh
server1 server2 server3.example.com
```

## Best Practices

Use this quick reference to decide when to quote or brace variables:

| Scenario                           | Quoting     | Braces   | Example                          |
| ---------------------------------- | ----------- | -------- | -------------------------------- |
| Simple expansion                   | Optional    | Optional | `echo $var`                      |
| Appending text to a variable       | Optional    | Required | `echo "${var}suffix"`            |
| File paths and filenames           | Recommended | Optional | `ls "${directory}/file.txt"`     |
| URLs and complex strings           | Recommended | Optional | `curl "${URL}?id=123&name=abc"`  |
| Iterating over words intentionally | Optional    | Optional | `for x in ${list}; do ...; done` |
| Preventing word splitting          | Required    | Optional | `read -r line <<< "${input}"`    |

![The image is a slide titled "Expanding Variables" with checkmarks next to "Directory paths, filenames" and "Assigning URLs to variables."](https://kodekloud.com/kk-media/image/upload/v1752868553/notes-assets/images/Advanced-Bash-Scripting-Expanding/expanding-variables-checkmarks.jpg)

> [!important]
> **Warning**
>
> Never rely on unquoted variable expansions for user input or file names—they can introduce security risks or unexpected behavior.

## Further Reading

- [Bash Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [POSIX Shell Command Language](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/06219b3e-dc63-404c-a9df-3ea035628308/lesson/dac7a664-61de-4b86-a73e-0275fdc4f204)**
>
> Watch video content
