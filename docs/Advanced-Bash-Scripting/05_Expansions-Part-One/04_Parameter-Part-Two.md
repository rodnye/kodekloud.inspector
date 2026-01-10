# Parameter Part Two - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Expansions-Part-One/Parameter-Part-Two)

---

## Table of Contents

- Parameter Part Two
  - Removing Fixed Prefixes and Suffixes
  - Using Wildcards for General Cases
  - Handling Unix‐Style Filenames
  - Choosing the Right Operator
  - Links and References
  - Watch Video
  - Practice Lab
    - Strip the First Word
    - Strip the Last Word
    - Remove All Directory Components
    - Strip File Extension

---

## Content

Advanced Bash Scripting

Expansions Part One

# Parameter Part Two

In Part One, we covered basic parameter‐expansion techniques for stripping fixed prefixes or suffixes. Here, we’ll explore more flexible patterns using wildcards to handle arbitrary extensions, path segments, or words in a string.

## Removing Fixed Prefixes and Suffixes

Often in Linux you work with file paths and extensions:

| Component | Example 1            | Example 2            | Example 3   |
| --------- | -------------------- | -------------------- | ----------- |
| Prefix    | `/home/my_username/` | `/home/my_username/` | `/usr/bin/` |
| Name      | `text_file`          | `text_file2`         | `app.py`    |
| Suffix    | `.txt`               | `.txt`               | `.py`       |

A fixed‐suffix removal like `${var%.txt}` only matches when the filename actually ends in `.txt`:

```
$ var="/home/my_username/text_file.txt"
$ echo "${var%.txt}"
/home/my_username/text_file

$ var="/home/my_username/text_file2.txt"
$ echo "${var%.txt}"
/home/my_username/text_file2

$ var="/usr/bin/app.py"
$ echo "${var%.txt}"
/usr/bin/app.py
```

> [!important]
> **Note**
>
> Using `${var%.txt}` leaves `.py` files untouched. For arbitrary extensions or dynamic patterns, you’ll need wildcards.

---

## Using Wildcards for General Cases

By introducing `*` in the pattern, you can remove everything up to or after a delimiter (space, slash, dot, etc.).

### Strip the First Word

For a space-separated string, `${var#* }` removes the shortest match from the front (everything up to the first space):

```
export position1="Senior Cloud Architect"
export position2="Senior DevOps Engineer"
export position3="Associate Frontend Engineer"
export position4="Junior Software Developer"

echo "${position1#* }"   # Cloud Architect
echo "${position2#* }"   # DevOps Engineer
echo "${position3#* }"   # Frontend Engineer
echo "${position4#* }"   # Software Developer
```

### Strip the Last Word

Using `${var% *}` removes the shortest match from the end (from the last space onward):

```
echo "${position1% *}"   # Senior Cloud
echo "${position2% *}"   # Senior DevOps
echo "${position3% *}"   # Associate Frontend
echo "${position4% *}"   # Junior Software
```

> [!important]
> **Wildcard Literal Pairing**
>
> Always pair `*` with a literal character (e.g., space or slash). A pattern like `${var%*}` matches the entire string, returning an empty result.

---

## Handling Unix‐Style Filenames

Consider two variables:

```
my_text_file="/home/my_username/text_file.txt"
my_python_file="/usr/bin/app.py"
```

- **Prefix**: directory path
- **Name**: file name
- **Suffix**: extension

### Remove All Directory Components

- `${var#*/}` strips up to the _first_ slash
- `${var##*/}` strips up to the _last_ slash (longest‐prefix removal)

```
echo "${my_text_file#*/}"    # home/my_username/text_file.txt
echo "${my_python_file#*/}"  # usr/bin/app.py

echo "${my_text_file##*/}"   # text_file.txt
echo "${my_python_file##*/}" # app.py
```

### Strip File Extension

Use shortest‐suffix (`%`) or longest‐suffix (`%%`). With a single dot, both behave identically:

```
echo "${my_text_file%.*}"   # /home/my_username/text_file
echo "${my_text_file%%.*}"  # /home/my_username/text_file

echo "${my_python_file%.*}"   # /usr/bin/app
echo "${my_python_file%%.*}"  # /usr/bin/app
```

---

## Choosing the Right Operator

| Operator    | Description                  | Example                          |
| ----------- | ---------------------------- | -------------------------------- |
| `${var#…}`  | Remove shortest prefix match | Strip up to first delimiter      |
| `${var##…}` | Remove longest prefix match  | Strip up to last delimiter       |
| `${var%…}`  | Remove shortest suffix match | Remove first occurrence from end |
| `${var%%…}` | Remove longest suffix match  | Remove all occurrences from end  |

- Use **shortest‐suffix** (`%`) for extensions.
- Use **longest‐prefix** (`##`) for directory paths.

With these four operators, you can tailor string manipulations to filenames, paths, or any delimited data.

---

## Links and References

- [Bash Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0e090d75-12b5-4e0f-ace8-519f11d7b5d2/lesson/9e19ee01-6dbe-4e13-85cc-4f2da2a4f5c6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0e090d75-12b5-4e0f-ace8-519f11d7b5d2/lesson/72bafe84-69d6-464b-9023-9c04224b9ae1)**
>
> Practice lab
