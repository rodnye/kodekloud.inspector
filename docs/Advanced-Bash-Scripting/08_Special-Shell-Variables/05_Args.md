# Args - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/Args)

---

## Table of Contents

- Args
  - 1. Positional Parameters: $1, $2, …
  - 2. Grouping All Arguments: $@ vs $\*
  - 3. Iterating with a For Loop
  - 4. The Importance of Double Quotes
  - 5. Modifying the Internal Field Separator (IFS)
  - 6. Compatibility with Older Bash Versions
  - 7. Summary: $@ vs $\*
  - 8. Conclusion
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Special Shell Variables

# Args

When writing Bash scripts, handling command-line arguments efficiently is crucial. You can access each argument by its position (`$1`, `$2`, …), but when the number of parameters varies, special variables like `$@` and `$*` simplify your logic. This guide covers:

- Positional parameters
- Grouping arguments
- Iterating with `"$@"` vs `"$*"`
- The impact of quoting
- Customizing the internal field separator (IFS)
- Compatibility considerations

---

## 1\. Positional Parameters: `$1`, `$2`, …

By default, Bash assigns each argument to a numbered variable:

```
#!/usr/bin/env bash
firstarg=$1
secondarg=$2


echo "First argument: ${firstarg}"
echo "Second argument: ${secondarg}"
```

```
$ ./simple-args.sh "arg1"
First argument: arg1
Second argument:


$ ./simple-args.sh "arg1" "arg2"
First argument: arg1
Second argument: arg2
```

When you need to accept an unpredictable number of parameters, indexing each one becomes cumbersome. That’s where `$@` and `$*` come in.

---

## 2\. Grouping All Arguments: `$@` vs `$*`

Both `$@` and `$*` collect _all_ positional arguments:

![The image illustrates the special shell variables `$*` and `$@`, accompanied by a graphic of twelve cylindrical objects arranged in a grid.](https://kodekloud.com/kk-media/image/upload/v1752868618/notes-assets/images/Advanced-Bash-Scripting-Args/shell-variables-cylindrical-objects.jpg)

```
#!/usr/bin/env bash
packaged_args1="$@"
packaged_args2="$*"


echo "Using \$@: ${packaged_args1}"
echo "Using \$*: ${packaged_args2}"
```

```
$ ./simple-args2.sh arg1 arg2 arg3
Using $@: arg1 arg2 arg3
Using $*: arg1 arg2 arg3
```

Both variables contain the full list of parameters, but they differ when you iterate over them.

---

## 3\. Iterating with a For Loop

Compare two scripts that loop over their arguments:

```
#!/usr/bin/env bash
echo "Number of arguments: $#"
echo "All arguments: $@"
for arg in "$@"; do
  echo "Argument: $arg"
done
```

```
#!/usr/bin/env bash
echo "Number of arguments: $#"
echo "All arguments: $*"
for arg in "$*"; do
  echo "Argument: $arg"
done
```

```
$ ./atsign-example1.sh one two three
Number of arguments: 3
All arguments: one two three
Argument: one
Argument: two
Argument: three


$ ./star-example1.sh one two three
Number of arguments: 3
All arguments: one two three
Argument: one two three
```

![The image illustrates the concept of special shell variables `$*` and `$@`, using a visual representation of containers and arrows.](https://kodekloud.com/kk-media/image/upload/v1752868619/notes-assets/images/Advanced-Bash-Scripting-Args/special-shell-variables-visualization.jpg)

In the soda‐can analogy:

- `$@` places each can in its own compartment.
- `$*` pours all the soda into one big bottle—individual cans are no longer separate.

![The image illustrates the difference between special shell variables `$@` and `$*`, using a visual representation of containers to show how they handle arguments.](https://kodekloud.com/kk-media/image/upload/v1752868620/notes-assets/images/Advanced-Bash-Scripting-Args/shell-variables-difference-visual.jpg)

---

## 4\. The Importance of Double Quotes

> [!important]
> **Note**
>
> Always quote `$@` and `$*`:
>
> - `"$@"` expands each argument separately.
> - `"$*"` joins all arguments into a single string, separated by the first character of `IFS` (default: space).

Unquoted, both behave identically:

```
#!/usr/bin/env bash
print_section_header() {
  local title="$1"
  echo "==============================="
  echo "= Section ${title} ="
  echo "==============================="
}


print_section_header "1: \$@"
echo "--> Output of \$@: $@"
echo "Looping \$@ without quotes:"
for arg in $@; do
  echo "$arg"
done


print_section_header "2: \$*"
echo "--> Output of \$*: $*"
echo "Looping \$* without quotes:"
for arg in $*; do
  echo "$arg"
done
```

```
$ ./special-shell-noquotes.sh one two three
===============================
= Section 1: $@ =
===============================
--> Output of $@: one two three
Looping $@ without quotes:
one
two
three
===============================
= Section 2: $* =
===============================
--> Output of $*: one two three
Looping $* without quotes:
one
two
three
```

---

## 5\. Modifying the Internal Field Separator (IFS)

You can change `IFS` to alter how `"$*"` joins arguments:

```
#!/usr/bin/env bash
IFS=','


echo "Output of \$@: $@"
echo "Output of \$*: $*"
```

```
$ ./modified-ifs-v1.sh one two three
Output of $@: one two three
Output of $*: one,two,three
```

Splitting later requires unquoted iteration:

```
#!/usr/bin/env bash
IFS='_'
args_at="$@"
args_star="$*"


print_section_header() { ... }


print_section_header "1: \$@"
echo "--> \$@: $@"
echo "Looping over args_at:"
for arg in $args_at; do
  echo "$arg"
done


print_section_header "2: \$*"
echo "--> \$*: $*"
echo "Looping over args_star:"
for arg in $args_star; do
  echo "$arg"
done
```

---

## 6\. Compatibility with Older Bash Versions

Some pre-4.0 Bash releases split unquoted assignments differently. For example, under Bash 3:

```
#!/usr/bin/env bash
IFS=','
args_at=$@
echo "--> \$@: ${args_at}"
for arg in $args_at; do
  echo "$arg"
done
```

Still, quoting on assignment ensures consistent splitting:

```
#!/usr/bin/env bash
IFS=','
args_at="$@"
echo "--> \$@: $@"
for arg in $args_at; do
  echo "$arg"
done
```

---

## 7\. Summary: `$@` vs `$*`

| Variable | Quoted Expansion     | Unquoted Expansion | Use Case                                        |
| -------- | -------------------- | ------------------ | ----------------------------------------------- |
| `$@`     | Each arg is separate | Each word separate | Looping over arguments                          |
| `$*`     | All args as one      | Splits on `IFS`    | Passing all args to another command or function |

---

## 8\. Conclusion

- Use `"$@"` when you need to preserve each argument.
- Use `"$*"` to aggregate them into a single string with a custom delimiter.
- Always quote both to maintain consistent behavior across Bash versions and avoid word-splitting pitfalls.

![The image shows a comparison between special shell variables `$@` and `$*`, with a recommendation to surround them with double quotes.](https://kodekloud.com/kk-media/image/upload/v1752868621/notes-assets/images/Advanced-Bash-Scripting-Args/shell-variables-comparison-doubles-quotes.jpg)

---

## Links and References

- [Bash Reference Manual – Special Parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)
- [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/e6b2052d-a391-4b11-9c67-726aa4128360)**
>
> Watch video content
