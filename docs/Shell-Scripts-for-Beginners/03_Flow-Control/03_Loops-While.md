# Loops While - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Flow-Control/Loops-While)

---

## Table of Contents

- Loops While
  - Initial Approach: Repeated If Statements
  - Improved Approach: Using a While Loop
  - Example: Infinite Menu-Driven Program
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Flow Control

# Loops While

In this article, we explore the use of while loops in shell scripting with a practical example—a rocket launch script. The initial script is designed to determine the cause of a failure using the rocket debug command when the rocket's status is "failed." Below is an example that performs a single status check after liftoff:

```
mission_name=$1


mkdir $mission_name


rocket-add $mission_name


rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name


rocket_status=$(rocket-status $mission_name)


if [ "$rocket_status" = "failed" ]
then
    rocket-debug $mission_name
fi
```

The above script demonstrates a basic check. The status command may return one of three states: launching, success, or failed. However, since the rocket might remain in the "launching" state for a few seconds, a single status check might occur too early. This means the script might miss detecting a failure if the rocket is still in the launching phase.

## Initial Approach: Repeated If Statements

One method to handle this delay is to add multiple nested conditional checks. Consider the following approach:

```
mission_name=$1
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name


rocket_status=$(rocket-status $mission_name)
if [ "$rocket_status" = "launching" ]
then
    sleep 2
    rocket_status=$(rocket-status $mission_name)
    if [ "$rocket_status" = "launching" ]
    then
        sleep 2
        rocket_status=$(rocket-status $mission_name)
        if [ "$rocket_status" = "launching" ]
        then
            sleep 2
        fi
    fi
fi


if [ "$rocket_status" = "failed" ]
then
    rocket-debug $mission_name
fi
```

While this method works, it is not scalable. If the rocket takes longer to reach a final state, the number of conditional blocks would increase unnecessarily.

> [!important]
> **Tip**
>
> A more efficient approach to handle waiting for the rocket to leave the "launching" state is to use a while loop.

## Improved Approach: Using a While Loop

A while loop is ideal in scenarios where the number of iterations depends on an unpredictable condition. The following script continuously checks the rocket's status until it is no longer "launching." Once the status is updated to "success" or "failed," the loop terminates, and the script proceeds accordingly.

```
mission_name=$1
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name
rocket_status=$(rocket-status $mission_name)
while [ "$rocket_status" = "launching" ]
do
    sleep 2
    rocket_status=$(rocket-status $mission_name)
done
if [ "$rocket_status" = "failed" ]
then
    rocket-debug $mission_name
fi
```

When you execute this script, it performs the initial rocket launch commands and then enters the while loop. Inside the loop, the script checks every two seconds if the rocket is still launching. Once the status changes, the loop exits, and the script evaluates whether to run the debug command if the rocket has failed.

> [!important]
> **When to Use a While Loop**
>
> Use a while loop when you need to execute a set of commands repeatedly without knowing in advance how many iterations will be required. This pattern is particularly useful for waiting on processes to complete or creating menu-driven programs.

![The image explains when to use a "While Loop" for executing commands multiple times, until a condition occurs, creating infinite loops, and menu-driven programs.](https://kodekloud.com/kk-media/image/upload/v1752884050/notes-assets/images/Shell-Scripts-for-Beginners-Loops-While/frame_250.jpg)

## Example: Infinite Menu-Driven Program

Below is an example of a while loop used to create an infinite menu-driven program. This script displays a simple menu with options to shutdown, restart, or exit:

```
while true
do
    echo "1. Shutdown"
    echo "2. Restart"
    echo "3. Exit Menu"
    read -p "Enter your choice: " choice


    if [ "$choice" -eq 1 ]
    then
        shutdown now
    elif [ "$choice" -eq 2 ]
    then
        shutdown -r now
    elif [ "$choice" -eq 3 ]
    then
        break
    else
        continue
    fi
done
```

In this script:

- The `while true` loop keeps the menu running indefinitely.
- When the user selects:
  - **1:** The system immediately shuts down.
  - **2:** The system restarts.
  - **3:** The loop exits, ending the menu.
- If any other input is entered, the `continue` statement restarts the loop without executing additional commands.

By using while loops in your scripts, you can build more flexible and robust solutions for processes that require repeated execution until a specific condition is met.

That’s it for now—practice these examples to master while loops in your shell scripting projects!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/a01ded44-505a-4daf-abe6-05ee142082a0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/8d63bac2-c692-43e8-8595-7042527ff49d)**
>
> Practice lab
