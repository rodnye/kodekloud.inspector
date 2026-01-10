# Read Inputs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shell-Script-Introduction/Read-Inputs)

---

## Table of Contents

- Read Inputs
  - When to Use Command-Line Arguments vs. Prompts
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shell Script Introduction

# Read Inputs

In this lesson, we explore different methods for obtaining user input in a shell script. Previously, we demonstrated how to pass an input to a script using a command-line argument (with the positional parameter $1). For example, consider the following script that expects the mission name to be provided when executing the script:

```
#!/bin/bash
mission_name=$1


mkdir "$mission_name"


rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
echo "Status of launch: $rocket_status"
```

In this version, the mission name is passed directly on the command line as follows:

bash  
$ create-and-launch-rocket saturn-mission

If you prefer the script to prompt the user for input when it starts, you can use the `read` command. Initially, a basic use of `read` might look like this:

```
#!/bin/bash
read mission_name
```

In this simple example, the script waits for the user to type a value, but it does not indicate what is expected. To provide guidance to the user, you can include a prompt using the `-p` option:

```
#!/bin/bash
read -p "Enter mission name: " mission_name


mkdir "$mission_name"


rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
echo "Status of launch: $rocket_status"
```

With this approach, when the script reaches the `read` statement, it displays the message "Enter mission name: " and waits for the user to input the mission name. The entered value is stored in the `mission_name` variable, and the script continues with that input.

> [!important]
> **Tip**
>
> Using the `-p` option with `read` improves user experience by clearly indicating what input is expected.

## When to Use Command-Line Arguments vs. Prompts

| Scenario                                       | Recommended Approach                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Standalone scripts needing manual intervention | Use `read` with a prompt to allow users to confirm actions or select options. |
| Scripts called by other programs               | Use command-line arguments for automation and avoid manual input.             |

Alternatively, you can combine both methods. For example, you might first check if the mission name is provided as a command-line argument. If not, the script can prompt the user for input. An enhanced version of the script that incorporates both methods is shown below:

```
#!/bin/bash
if [ -z "$1" ]; then
    read -p "Enter mission name: " mission_name
else
    mission_name=$1
fi


mkdir "$mission_name"


rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
echo "Status of launch: $rocket_status"
```

This script checks if the first argument is empty. If it is, the script prompts the user for the mission name, otherwise, it uses the command-line argument.

> [!important]
> **Next Steps**
>
> In upcoming lessons, we will explore control and conditional statements in shell scripting to design scripts that behave dynamically based on the available input.

Now, let's move on to some practical exercises to work with both command-line arguments and `read` input statements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/dc9c16a1-010d-4993-adac-a78bd69f53f3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/e592522a-7006-4635-a823-40ac75d93225)**
>
> Practice lab
