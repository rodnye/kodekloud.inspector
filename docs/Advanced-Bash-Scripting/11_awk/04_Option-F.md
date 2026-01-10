# Option F - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/awk/Option-F)

---

## Table of Contents

- Option F
  - 1. Default Field Splitting
  - 2. Changing the Field Separator with -F
  - 3. Why Quote or Escape the Separator
  - 4. Common Field Separators
  - 5. Example: Processing Database Output
  - Next Steps
  - References
  - Watch Video

---

## Content

Advanced Bash Scripting

awk

# Option F

Learn how to use the **\-F** option in `awk` to customize the field separator when processing structured text. By default, `awk` splits records on whitespace, but **\-F** lets you define any character or regular expression as the delimiter.

```
usage: awk [-F fs] [-v var=value] [-f progfile | 'prog'] [file ...]
```

## 1\. Default Field Splitting

By default, `awk` treats any whitespace as the field separator:

```
$ df -h
```

```
Filesystem      Size  Used Avail Use% Mounted on
udev            1.8G     0  1.8G   0% /dev
tmpfs           366M  9.7M  356M   3% /run
...
```

When your data uses a different delimiter—such as commas, colons, or pipes—you must override this behavior.

## 2\. Changing the Field Separator with -F

To use a colon (`:`) as the separator:

```
$ awk -F ":" '{ print $1 }' sizeV1.txt
```

```
Filesystem
udev
tmpfs
/dev/sda1
...
```

Print the second field:

```
$ awk -F ":" '{ print $2 }' sizeV1.txt
```

```
Size
1.8G
366M
...
```

Combine fields 1 and 5:

```
$ awk -F ":" '{ print $1, $5 }' sizeV1.txt
```

```
Filesystem Use%
udev 0%
tmpfs 3%
...
```

You can also pipe data into `awk`:

```
$ cat sizeV1.txt | awk -F ":" '{ print $2 }'
```

## 3\. Why Quote or Escape the Separator

Certain characters (for example, `|`, `&`, `*`, `<`, `>`) have special meanings to the shell.

> [!important]
> **Warning**
>
> Always quote or escape the field separator to prevent shell interpretation.
>
> Incorrect:
>
> ```
> awk -F | '{ print $1 }' employees.txt
> ```
>
> This fails because `|` is seen as a pipe.
>
> Correct:
>
> ```
> awk -F "|" '{ print $1 }' employees.txt
> # or
> awk -F \| '{ print $1 }' employees.txt
> ```

![The image shows a tip about using the `awk` command with a field separator, suggesting to enclose the character in double quotes for literal values. There's also a lightbulb icon and a checkmark.](https://kodekloud.com/kk-media/image/upload/v1752868665/notes-assets/images/Advanced-Bash-Scripting-Option-F/awk-command-field-separator-tip.jpg)

## 4\. Common Field Separators

| Separator | Shell Meaning       | Example Use Case   |
| --------- | ------------------- | ------------------ | --------------- |
| :         | None                | `/etc/passwd`      |
| ,         | None                | CSV export         |
| \\        |                     | Pipe (must escape) | Database output |
| \\\\t     | Tab (escape \\\\t)  | TSV files          |
| \\=       | Assignment (escape) | Key-value configs  |

![The image shows a list of special characters separated by dotted lines, under the heading "awk -F - Field Separator."](https://kodekloud.com/kk-media/image/upload/v1752868666/notes-assets/images/Advanced-Bash-Scripting-Option-F/awk-field-separator-special-characters.jpg)

## 5\. Example: Processing Database Output

Here’s a Bash script (`db.sh`) that runs a PostgreSQL query inside Docker, trimming each field:

```
#!/usr/bin/env bash
docker_run() {
  docker exec -i employees_db psql -U postgres -d employees -tAQ <<EOF
SELECT
  trim(id_employee::text),
  trim(first_name),
  trim(last_name),
  trim(area),
  trim(job_title),
  trim(email),
  trim(salary::text)
FROM "employee";
EOF
}
docker_run > employees.txt
exit 0
```

View the output:

```
$ cat employees.txt
```

```
1|Kriti|Shreshtha|Finance|Financial Analyst|kriti.shreshtha@company.com|60000
...
```

Extract first names (field 2):

```
$ awk -F "|" '{ print $2 }' employees.txt
```

```
Kriti
Rajasekar
Debbie
...
```

> [!important]
> **Note**
>
> See the [GNU Awk User’s Guide](https://www.gnu.org/software/gawk/manual/html_node/Options.html) for more `awk` options.

## Next Steps

Next, we’ll explore the **\-v** option to declare variables within `awk`:

```
usage: awk [-F fs] [-v var=value] [-f progfile | 'prog'] [file ...]
```

## References

- [GNU Awk Manual](https://www.gnu.org/software/gawk/manual/)
- [awk(1) — Linux manual page](https://man7.org/linux/man-pages/man1/awk.1.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0cddb337-89d3-4068-a878-37a0a342c22f/lesson/b0829d7f-bdad-408b-a726-7f2299926b5b)**
>
> Watch video content
