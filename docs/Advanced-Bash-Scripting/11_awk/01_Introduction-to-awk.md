# Introduction to awk - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/awk/Introduction-to-awk)

---

## Table of Contents

- Introduction to awk
  - Why Use Awk?
  - Fields and Records
  - Awk as a Domain-Specific Language
  - Handling Irregular Spacing
  - Integrating Awk with Unix Pipelines
  - Writing Full Awk Scripts
  - Links and References
  - Watch Video
    - Extracting a Specific Seat
    - Common Use Cases

---

## Content

Advanced Bash Scripting

awk

# Introduction to awk

Awk is a powerful, domain-specific language for text processing. Whether you’re automating seat lookups in a movie theater or parsing system statistics, Awk’s field-oriented syntax and built-in variables make it easy to filter, transform, and format structured text.

## Why Use Awk?

- Processes structured data by rows (records) and columns (fields)
- Handles irregular whitespace automatically
- Integrates seamlessly into Unix pipelines
- Offers concise one-liners or full-fledged scripts

## Fields and Records

Imagine a seating chart stored in `minimovies.txt`, where “Y” means a seat is taken and “N” means it’s available. Awk treats each line as a **record** and each whitespace-separated item as a **field**.

![The image is an "Introduction to awk" diagram showing a table with columns labeled 1 to 5 and rows containing letters "a" to "e" with "y" and "n" indicating whether something is taken or not. A legend explains that "y" means it's taken and "n" means it's not.](https://kodekloud.com/kk-media/image/upload/v1752868662/notes-assets/images/Advanced-Bash-Scripting-Introduction-to-awk/introduction-to-awk-diagram.jpg)

- Columns ➔ Fields (`$1`, `$2`, …)
- Rows ➔ Records (`NR` is the built-in record counter)

### Extracting a Specific Seat

Step 1: Select the third column (`$3`) for every record.  
Step 2: Filter for record number 2 using `NR`.

![The image is an introduction to the "awk" command, showing a table with columns labeled a, b, c, d, e, and highlighting column c. It includes instructions for using "awk" to extract column c and create a comparison operation for equality.](https://kodekloud.com/kk-media/image/upload/v1752868663/notes-assets/images/Advanced-Bash-Scripting-Introduction-to-awk/awk-command-introduction-column-c.jpg)

```
# Verify Awk installation
$ awk --version
# Step 1: Print the 3rd field for each line
$ awk '{ print $3 }' minimovies.txt
c
n
n
n
y


# Step 2: Only line 2
$ awk 'NR == 2 { print $3 }' minimovies.txt
n
```

> [!important]
> **Note**
>
> `NR` is a built-in Awk variable representing the current record (line) number.
> Fields are referenced as `$1`, `$2`, etc.

## Awk as a Domain-Specific Language

Awk is more than a simple filter—it’s a small programming language tailored for text. It provides:

- Pattern-action statements
- Built-in variables (`NR`, `NF`, `FS`, `OFS`)
- Control structures (`if`, `while`, `for`)

![The image is a slide titled "Introduction to awk," explaining that a Domain-Specific Language is a programming language designed for a specific subject area.](https://kodekloud.com/kk-media/image/upload/v1752868664/notes-assets/images/Advanced-Bash-Scripting-Introduction-to-awk/introduction-to-awk-dsl-slide.jpg)

> [!important]
> **Note**
>
> Awk treats any sequence of spaces and tabs as the default field separator (`FS` = `[ \t]+`).

## Handling Irregular Spacing

Even if your data has inconsistent spacing, Awk splits fields correctly:

![The image is an introduction to "awk," highlighting its ability to create powerful programs or one-liner scripts for parsing large and complex text data easily.](https://kodekloud.com/kk-media/image/upload/v1752868665/notes-assets/images/Advanced-Bash-Scripting-Introduction-to-awk/awk-introduction-text-parsing.jpg)

```
$ awk 'NR == 2 { print $3 }' minimovies.txt
n
```

## Integrating Awk with Unix Pipelines

Combine Awk with other commands to filter and format on the fly:

```
$ cat minimovies.txt | awk '$1 == "2" { print $4 }'
n
```

### Common Use Cases

| Command | Purpose              | Example    |
| ------- | -------------------- | ---------- | ----------------------------- | -------- |
| top     | System runtime stats | `top \\    | awk '{ print $2 }' \\         | head -5` |
| ps      | Process listing      | `ps aux \\ | awk '$3 > 50 {print $1, $3}'` |
| df -h   | Disk usage report    | `df -h \\  | awk '$5 > "80%"'`             |

```
$ top | awk '{ print $2 }' | head -n 5
702
Avg:
996838
353T
41224173/79G
```

```
$ df -h
Filesystem            Size  Used Avail Use% Mounted on
C:/Program Files/Git   459G  182G  277G  40% /
G:                     15G     0   15G   0% /g
```

## Writing Full Awk Scripts

Instead of one-liners, you can write complete Awk programs:

```
#!/usr/bin/awk -f
BEGIN {
    print "Hello, World!"
}
```

Make it executable and run directly:

```
$ chmod +x hello.awk
$ ./hello.awk
Hello, World!
```

> [!important]
> **Warning**
>
> Ensure the shebang path (`/usr/bin/awk`) matches your system’s Awk installation.

Awk transforms text processing into an intuitive workflow by combining pattern matching, field manipulation, and a minimal scripting language. Whether you need quick one-liners or full scripts, Awk has you covered.

## Links and References

- [GNU Awk User’s Guide](https://www.gnu.org/software/gawk/manual/gawk.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0cddb337-89d3-4068-a878-37a0a342c22f/lesson/a72d19f2-bcef-45f0-9cc7-6eb02446b558)**
>
> Watch video content
