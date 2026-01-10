# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shebang/Functions)

---

## Table of Contents

- Functions
  - Example without Functions
  - Modular Approach with Functions
  - When to Use Functions
  - Simple Function Example: Adding Two Numbers
  - Final Thoughts
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shebang

# Functions

In this article, you'll learn how to use functions in shell scripts to eliminate code duplication and improve maintainability. Previously, a lengthy sequence of commands was used to create and launch a rocket. If you needed to launch additional rockets, you would duplicate the same set of commands for every mission. This non-modular approach can lead to issues when updates are required, as changing one block would necessitate modifications in every duplicated section.

> [!important]
> **Key Benefit**
>
> Using functions in your shell scripts promotes code reusability and makes maintenance easier. Instead of repeating code, you encapsulate the functionality and simply call the function with a parameter.

## Example without Functions

A non-modular script with duplicated code might look like this:

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
  exit 1
fi


# Duplicate for another mission:
mission_name=mars-mission
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name


rocket_status=$(rocket-status $mission_name)
# (Additional duplicated code would be here)
```

Duplicating code like this makes it difficult to maintain, as every instance must be updated individually if any change is needed.

## Modular Approach with Functions

A best practice is to encapsulate repeated code into a function. In shell scripting, a function is simply a block of code designed to perform a specific task and can be reused throughout your script. In the example below, the mission name is passed as an argument to the function and referenced within the function as `$1`.

Below is an improved and modular version of the rocket launch script using a function named `launch-rocket`:

```
function launch-rocket() {
  mission_name=$1
  mkdir "$mission_name"


  rocket-add "$mission_name"
  rocket-start-power "$mission_name"
  rocket-internal-power "$mission_name"
  rocket-start-sequence "$mission_name"
  rocket-start-engine "$mission_name"
  rocket-lift-off "$mission_name"


  rocket_status=$(rocket-status "$mission_name")
  while [ "$rocket_status" = "launching" ]
  do
    sleep 2
    rocket_status=$(rocket-status "$mission_name")
  done


  if [ "$rocket_status" = "failed" ]
  then
    rocket-debug "$mission_name"
    return 1
  fi
}
```

In the code above, the function `launch-rocket` bundles the entire rocket launch process. This way, you only need to call the function with the desired mission name whenever required. For example, the main part of your script might look like this:

```
launch-rocket lunar-mission
launch-rocket mars-mission
launch-rocket saturn-mission
launch-rocket mercury-mission
```

> [!important]
> **Function Definition Order**
>
> Remember that functions must be defined before they are called in your script. Calling a function prior to its definition will result in an error because the shell interprets it as an undefined command.

Notice the difference between using `exit 1` and `return 1` in the function. In the initial version, `exit 1` would terminate the entire script if any individual mission failed. By using `return 1` instead, only the function call terminates with an error, which allows the main script to continue executing and manage subsequent missions. The exit status from each function can be captured with the special variable `$?` if needed.

## When to Use Functions

For large automation tasks—such as installing packages, adding users, configuring firewalls, or carrying out mathematical calculations—breaking down your script into functions is highly beneficial. Each specific task can be implemented as an independent function, which you call in the correct sequence. This strategy not only makes your code modular and easier to maintain but also minimizes duplication.

![The image explains when to use functions, listing tasks like installing packages, adding users, configuring firewalls, and performing mathematical calculations.](https://kodekloud.com/kk-media/image/upload/v1752884055/notes-assets/images/Shell-Scripts-for-Beginners-Functions/frame_240.jpg)

## Simple Function Example: Adding Two Numbers

Here is another straightforward example that demonstrates how to add two numbers using a shell function. In this case, the parameters `$1` and `$2` are passed to the function, which calculates and prints the sum. You can capture the function’s output using command substitution:

```
function add() {
  echo $(( $1 + $2 ))
}


# Capture the result of the function call in the variable 'sum'
sum=$( add 3 5 )
echo "The sum is: $sum"
```

Keep in mind that anything printed within a function using `echo` becomes its output. While you can also use the return code to indicate success or failure, the `return` statement in shell functions only supports numeric exit statuses. Therefore, echoing the computed value and capturing it is the conventional method for returning results.

![The image lists best practices for coding: develop modular scripts, avoid duplicate code, and use arguments/parameters for variables.](https://kodekloud.com/kk-media/image/upload/v1752884056/notes-assets/images/Shell-Scripts-for-Beginners-Functions/frame_400.jpg)

## Final Thoughts

Modularizing your code with functions is a best practice in shell scripting, helping you avoid pitfalls associated with duplicate code blocks and making scripts more maintainable. Practice applying these techniques in your automation tasks and shell scripts to enhance your coding skills.

Happy scripting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/c5fee3ab-67bc-4bc7-8705-2d07a75e3adc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/b0001b88-a483-4125-b093-afb0877a8cfa)**
>
> Practice lab
