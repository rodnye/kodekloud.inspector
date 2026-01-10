# Extended Regular Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Extended-Regular-Expressions)

---

## Table of Contents

- Extended Regular Expressions
  - Matching Repetitions: At Least, At Most, and Exact Counts
  - Making Elements Optional
  - Matching a Range of Repetitions
  - Combining Alternatives with the Vertical Pipe
  - Character Ranges and Sets
  - Matching Device Files
  - Negating Character Classes
  - Summary
  - Watch Video
  - Practice Lab
    - At Least Three Zeros
    - A "1" Followed by at Most Three Zeros
    - Exactly Three Zeros
    - Handling Repeated Letter-Digit Patterns

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Extended Regular Expressions

This lesson builds on our previous discussion of basic regular expressions by exploring the extended regular expressions available on Linux. Earlier we learned how using the backslash character can turn special operators (like the period or plus sign) into literal characters. We also saw that the –e option for grep—or even better, using egrep—can eliminate the need for many backslash escapes.

For example, you can use:

```
$ grep -Er '0+' /etc/
$ egrep -r '0+' /etc/
```

Using egrep is a good habit because it avoids excessive backslashes and minimizes potential mistakes.

---

## Matching Repetitions: At Least, At Most, and Exact Counts

### At Least Three Zeros

To locate all strings containing at least three zeros, specify a minimum repetition using curly braces:

```
$ egrep -r '0{3,}' /etc/
```

This command matches strings with three or more consecutive zeros.

---

### A "1" Followed by at Most Three Zeros

To match strings beginning with a "1" and followed by at most three zeros (which also captures a lone "1"), use:

```
$ egrep -r '10{0,3}' /etc/
```

---

### Exactly Three Zeros

For matching strings that contain exactly three zeros, use the following expression:

```
$ egrep -r '0{3}' /etc/
```

---

## Making Elements Optional

The question mark `?` makes the preceding element optional—allowing it to appear zero or one time. For instance, to match both "disable" and "disabled," you can write:

```
$ egrep -r 'disabled?' /etc/
```

This will match both variations. If you need to match a literal question mark within your pattern, escape it as shown below:

```
$ egrep -r 'disable\?/' /etc/
```

---

## Matching a Range of Repetitions

To find strings containing three, four, or five zeros, simply specify the range using curly braces:

```
$ egrep -r '0{3,5}' /etc/
```

This pattern matches sequences of zeros that occur at least three times but no more than five times.

---

## Combining Alternatives with the Vertical Pipe

The vertical pipe `|` lets you search for one pattern or another. For example, to search for lines containing either "enabled" or "disabled," use:

```
$ egrep -r 'enabled|disabled' /etc/
```

You can also combine this with the optional element technique to capture variations like "enable," "enabled," "disable," or "disabled":

```
$ egrep -ir 'enabled?|disabled?' /etc/
```

This expression uses alternatives and optional characters effectively to match each variant.

---

## Character Ranges and Sets

Character ranges and sets allow you to define specific criteria for a match:

- A range like `[a-z]` matches any one lowercase letter.
- Similarly, `[0-9]` filters any one digit.

For example, to match both "cat" and "cut" (differing by only one letter), you can use:

```
$ egrep -r 'c[au]t' /etc/
```

This pattern accepts either an "a" or a "u" in the middle of the word.

---

## Matching Device Files

Consider a scenario where you want to search for special device files such as `/dev/sda1` or similar. A naïve approach might be:

```
$ egrep -r '/dev/.*' /etc/
```

However, using `.*` is too greedy and might capture more than desired. Instead, you can be more specific:

1.  First, try matching any lowercase letters that follow `/dev/`:

    ```
    $ egrep -r '/dev/[a-z]*' /etc/
    ```

    This pattern matches examples like `/dev/twa0` but may not capture cases where device names include digits at the end.

2.  To capture the trailing digits, modify your expression to require a digit at the end:

    ```
    $ egrep -r '/dev/[a-z]*[0-9]' /etc/
    ```

3.  Since some device names may optionally end with a digit, you can make the digit optional:

    ```
    $ egrep -r '/dev/[a-z]*[0-9]?' /etc/
    ```

This improved regular expression now matches both `/dev/sda1` and `/dev/sda`.

### Handling Repeated Letter-Digit Patterns

Some device names contain multiple groups of letters and digits—for example, `/dev/tty0P0`. In such cases, sub-expressions with parentheses along with the `*` operator allow the pattern to repeat:

```
$ egrep -r '/dev/([a-z]*[0-9]?)' /etc/
```

If you encounter device names with uppercase letters (e.g., `/dev/TTYS0`), include them by expanding the character set. You can use a grouped alternative to accommodate both cases:

```
$ egrep -r '/dev/(([a-z]|[A-Z])*[0-9]?)?' /etc/
```

This more complex pattern caters to any combination of lowercase or uppercase letters followed by an optional digit and can be repeated as needed. Always test your regular expressions with your actual data to ensure they capture every desired variation.

---

## Negating Character Classes

Sometimes you may want to exclude certain patterns. For instance, to search specifically for HTTP links that do not use encryption (excluding HTTPS), use a negated character set:

```
$ egrep -r 'http[^s]' /etc/
```

Similarly, to match a slash followed by any character that is not a lowercase letter:

```
$ egrep -r '/[^a-z]' /etc/
```

Using negated character classes gives you more control over your search patterns.

---

> [!important]
> **Additional Resources**
>
> Regular expressions are a powerful tool not only in grep but also in utilities like sed. For more practice and interactive testing, visit [regexr.com](https://regexr.com).

For another example of using a negated set, consider the following command:

```
$ egrep -r '/[^a-z]' /etc/
```

---

## Summary

In this lesson, we explored several essential concepts of extended regular expressions:

- Using repetition operators such as `{3,}`, `{0,3}`, and `{3}`.
- Making an element optional with the `?` operator.
- Combining variants with the vertical pipe `|`.
- Defining character ranges and sets, including the use of negated classes.
- Constructing complex patterns with sub-expressions and grouping.

Practice these techniques in your labs to further refine and enhance your regex skills.

![The image shows a dark-themed interface with a command line on the left and a mathematical expression evaluation on the right, demonstrating the use of parentheses in subexpressions.](https://kodekloud.com/kk-media/image/upload/v1752883623/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Extended-Regular-Expressions/dark-interface-command-line-math.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/b211cf9a-25da-4128-8d46-eaba0406ccae)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/20efc8bb-fd2a-47f1-b07e-7a4d98891666)**
>
> Practice lab
