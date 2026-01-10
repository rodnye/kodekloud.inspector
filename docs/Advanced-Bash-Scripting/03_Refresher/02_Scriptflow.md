# Scriptflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/Scriptflow)

---

## Table of Contents

- Scriptflow
  - A Real-World Analogy: Buying a Movie Ticket
  - A Factory Analogy for Complex Workflows
  - Key Constructs That Alter Scriptflow
  - Conditional Statements
  - Loops
  - Sourcing External Files
  - Next Steps
  - Links and References
  - Watch Video
    - if Statement
    - case Statement
    - Example v1: Basic Sourcing
    - Example v2: Safe Sourcing with Fallback

---

## Content

Advanced Bash Scripting

Refresher

# Scriptflow

Understanding and controlling your shell script’s execution path is crucial for writing reliable Bash scripts. By default, a script runs sequentially, but you can alter this sequence using control constructs such as conditionals, loops, sourcing files, and functions. These tools allow you to:

- Run commands only if specific conditions are met
- Repeat commands multiple times with varying inputs

![The image shows a diagram labeled "Scriptflow" with lines of code on the left and two checkboxes on the right, indicating features for executing commands based on conditions and executing the same commands multiple times.](https://kodekloud.com/kk-media/image/upload/v1752868600/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/scriptflow-diagram-code-checkboxes.jpg)

## A Real-World Analogy: Buying a Movie Ticket

Imagine you walk up to a theater ticket booth. If you hand over a valid ticket, you enter; if not, you’re turned away. This decision-making process mirrors how an `if` statement in Bash evaluates conditions and branches accordingly.

![The image depicts a flowchart with tickets leading to smiley faces, indicating approval or rejection, and then to a camera icon, suggesting a process related to film or video production.](https://kodekloud.com/kk-media/image/upload/v1752868602/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/flowchart-tickets-smiley-camera.jpg)

## A Factory Analogy for Complex Workflows

Consider a widget factory where each item travels along a conveyor. At an inspection station, defective widgets are removed while good ones proceed to the next stage. This inspection step functions like a control construct in your script, deciding whether data moves forward or is handled differently.

![The image shows a dark interface with the word "Scriptflow" at the top and a graphic of a robotic arm above a conveyor belt with a green checkmark. It appears to be related to automation or workflow processes.](https://kodekloud.com/kk-media/image/upload/v1752868602/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/scriptflow-robotic-arm-automation.jpg)

![The image shows a stylized illustration of a robotic arm over a conveyor belt with a wrench and screwdriver icon above it, set against a dark background. The word "Scriptflow" is displayed at the top.](https://kodekloud.com/kk-media/image/upload/v1752868604/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/robotic-arm-conveyor-belt-scriptflow.jpg)

## Key Constructs That Alter Scriptflow

Shell scripts use these four core constructs to modify the default linear execution:

| Construct                      | Purpose                                       | Example Syntax                 |
| ------------------------------ | --------------------------------------------- | ------------------------------ |
| Conditional (`if`, `case`)     | Branch logic based on conditions              | `if [[ $x -gt 5 ]]; then … fi` |
| Loop (`for`, `while`, `until`) | Repeat code blocks until a condition changes  | `for i in {1..3}; do … done`   |
| Sourcing External Files        | Include and execute another script at runtime | `source config.sh`             |
| Function                       | Encapsulate and reuse code segments           | `my_func() { echo "Hi"; }`     |

![The image shows a diagram labeled "Scriptflow," featuring a block of multicolored lines resembling code, with arrows pointing to the right. It appears to represent a process or workflow related to scripting or programming.](https://kodekloud.com/kk-media/image/upload/v1752868605/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/scriptflow-workflow-diagram.jpg)

---

## Conditional Statements

### `if` Statement

Bash’s `[[ … ]]` test command provides richer conditional checks than `[ … ]`:

```
#!/usr/bin/env bash
# This block never runs because 3 is not greater than 4
if [[ 3 -gt 4 ]]; then
    echo "This will never be printed"
fi
```

> [!important]
> **Note**
>
> We recommend `[[ … ]]` over `[ … ]` for its support of pattern matching and logical operators.

### `case` Statement

Use `case` for clear branching when matching a variable against multiple patterns:

```
#!/usr/bin/env bash
action="$1"

case "$action" in
  start)
    echo "Starting service";;
  stop)
    echo "Stopping service";;
  restart)
    echo "Restarting service";;
  *)
    echo "Usage: $0 {start|stop|restart}";;
esac
```

---

## Loops

Loops are ideal for executing commands multiple times, either a fixed count or until a condition changes.

![The image shows a diagram labeled "Loops" with options for "FOR LOOP," "WHILE LOOP," and "UNTIL LOOP" on the left, and a code editor with colorful lines of code on the right.](https://kodekloud.com/kk-media/image/upload/v1752868606/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/loops-diagram-for-while-until.jpg)

Here are five versatile loop patterns:

1.  **`while` loop with a counter**

    ```
    #!/usr/bin/env bash
    i=1
    while [[ $i -le 3 ]]; do
        echo "Iteration $i"
        i=$(( i + 1 ))
    done
    ```

2.  **`for` loop with brace expansion**

    ```
    #!/usr/bin/env bash
    for i in {1..3}; do
        echo "Iteration $i"
    done
    ```

3.  **`until` loop counting down**

    ```
    #!/usr/bin/env bash
    i=3
    until [[ $i -eq 0 ]]; do
        echo "Iteration $i"
        i=$(( i - 1 ))
    done
    ```

4.  **Piping `seq` into `while`**

    ```
    #!/usr/bin/env bash
    seq 1 3 | while read -r i; do
        echo "Iteration $i"
    done
    ```

5.  **Reading lines from a file**

    ```
    #!/usr/bin/env bash
    while read -r line; do
        echo "Line: $line"
    done < fds.txt
    ```

> [!important]
> **Note**
>
> Use `for` loops when the number of iterations is predetermined.> [!important]
> **Note**
>
> Choose `while` or `until` when waiting for a dynamic condition or external event.

![The image contains a list of programming tips related to loops, with checkmarks next to each point. It discusses when to use "while" and "for" loops in different scenarios.](https://kodekloud.com/kk-media/image/upload/v1752868607/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/programming-tips-loops-checklist.jpg)

---

## Sourcing External Files

You can import another script or configuration file mid-execution using `source` or the shorthand `.`. This merges the external content into your current shell environment.

![The image illustrates a concept called "Scriptflow," showing how source code can be sourced from other files mid-script. It includes a visual representation of a source code file and a command line interface.](https://kodekloud.com/kk-media/image/upload/v1752868608/notes-assets/images/Advanced-Bash-Scripting-Scriptflow/scriptflow-source-code-diagram.jpg)

### Example v1: Basic Sourcing

```
# .conf content:
#!/usr/bin/env bash
source .conf
echo "${name}"
```

```
$ ./conf_read-v1.sh
Bob Doe
```

### Example v2: Safe Sourcing with Fallback

```
#!/usr/bin/env bash
readonly CONF_FILE=".conf"

if [[ -f "${CONF_FILE}" ]]; then
    source "${CONF_FILE}"
else
    name="Bob"
fi

echo "${name}"
exit 0
```

```
$ ./conf_read-v2.sh
Bob
```

When `.conf` exists:

```
$ echo 'name="Juan Carlos"' > .conf
$ ./conf_read-v2.sh
Juan Carlos
```

> [!important]
> **Warning**
>
> Always verify or sanitize sourced files to avoid executing untrusted code.

---

## Next Steps

In the next section, we explore how **functions** can modularize your scriptflow, making your Bash scripts more maintainable and reusable.

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [ShellCheck: Bash Linter](https://www.shellcheck.net/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/c095c98b-4326-4538-a2a7-702b1cf76cc5)**
>
> Watch video content
