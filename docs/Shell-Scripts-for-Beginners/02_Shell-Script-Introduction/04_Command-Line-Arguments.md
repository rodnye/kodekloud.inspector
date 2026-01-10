# Command Line Arguments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shell-Script-Introduction/Command-Line-Arguments)

---

## Table of Contents

- Command Line Arguments
  - Watch Video

---

## Content

Shell Scripts for Beginners

Shell Script Introduction

# Command Line Arguments

In this lesson, you'll learn how to use command-line arguments in shell scripts to make them more flexible and reusable. Previously, our script was hard-coded with the mission name, which meant that launching a rocket for a different mission required manual edits to the code. By incorporating command-line arguments, you can pass the mission name directly when executing the script, dramatically streamlining the process.

When a shell script runs, it automatically splits the command and its arguments. The script name is stored in the variable `$0`, while the first user-provided argument is stored in `$1`. Subsequent arguments are held in `$2`, `$3`, and so on. By replacing hard-coded values with these built-in variables, your script becomes universally reusable for any mission.

> [!important]
> **Note**
>
> Using meaningful variable names (like `mission_name` instead of `$1` everywhere) improves the readability and maintainability of your code.

Below is the original version of the script that requires manual editing of the mission name:

```
$ create-and-launch-rocket
$ # modify the create-and-launch-rocket
$ create-and-launch-rocket


mission_name= mars-mission
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name
rocket-status $mission_name


rocket_status=${rocket-status $mission_name}
echo "Status of launch: $rocket_status"
```

To eliminate the need for manual intervention, modify the script to accept the mission name as a command-line argument. You can run the script with the mission name like this:

```
$ create-and-launch-rocket saturn-mission
```

Here is the updated version of the script that leverages the command-line argument:

```
mission_name=$1
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name
rocket-status $mission_name


rocket_status=$(rocket-status $mission_name)
echo "Status of launch: $rocket_status"
```

In the revised script, the mission name is assigned from the first command-line argument (`$1`) to a variable called `mission_name`. This substitution makes the code reusable for any mission, eliminating the need for manual changes before each run.

> [!important]
> **Best Practice**
>
> Always design your scripts to be self-contained and reusable by allowing user inputs through command-line arguments rather than hard-coding values. This approach minimizes errors and improves efficiency.

![The image provides best practices for scripting: design scripts to be reusable, avoid pre-run edits, and use command line arguments for inputs.](https://kodekloud.com/kk-media/image/upload/v1752884063/notes-assets/images/Shell-Scripts-for-Beginners-Command-Line-Arguments/frame_200.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/2f0c9f74-f250-49aa-acaa-6a10dda7516f)**
>
> Watch video content
