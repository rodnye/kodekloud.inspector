# Mixed - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Mixed)

---

## Table of Contents

- Mixed
  - Workflow for Building Complex Globs
  - Example 1: Match “file.” plus at Least One Character
  - Example 2: Match “file\_” Prefix and a Three-Character Extension
  - Example 3: Match Any Name with a Four-Character Extension
  - Example 4: Match Names Containing “1” Then One More Character, Then an Extension
  - Example 5: Escaping a Literal “\*” in Filenames
  - Example 6: Escaping a Backslash and Question Mark
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Globs

# Mixed

In this lesson, we’ll take your globbing skills to the next level by combining `?`, `*`, and escape sequences to match complex filename patterns. Glob patterns allow you to filter filenames efficiently without resorting to regular expressions.

> [!important]
> **Note**
>
> For an in-depth reference on Bash filename expansion, see [Bash Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html).

Below is a quick summary of common glob operators:

| Wildcard | Description                          | Example     |
| -------- | ------------------------------------ | ----------- |
| `*`      | Matches zero or more characters      | `*.txt`     |
| `?`      | Matches exactly one character        | `file.?`    |
| `\\`     | Escapes the next character literally | `file\\*.*` |

## Workflow for Building Complex Globs

1.  **Sample Selection**  
    Collect filenames and mark matches (✅) vs. non-matches (❌). Identify **blue** segments (literal text) and **yellow** segments (wildcards).
2.  **Category Order**  
    Note the sequence of blue and yellow segments in the target filenames.
3.  **Construct the Glob**  
    Concatenate literals and wildcards in the order you determined.

---

## Example 1: Match “file.” plus at Least One Character

**Samples**

```
file.        ❌
file.c       ✅
file.conf    ✅
file.txt     ✅
data.sh      ❌
```

1.  Blue: `file.`
2.  Yellow: `?` (one char) then `*` (rest)
3.  Glob: `file.?*`

```
$ ls file.?*
file.c  file.conf  file.txt
```

---

## Example 2: Match “file\_” Prefix and a Three-Character Extension

**Samples**

```
file_1.txt    ✅
file_2.doc    ✅
file_1_a.sh   ❌
file_2_b.doc  ✅
```

1.  Blue: `file_`
2.  Yellow: `*` (any chars before dot)
3.  Blue: `.`
4.  Yellow: `???` (exactly three)
5.  Glob: `file_*.___`

```
$ ls file_*.___
file_1.txt  file_2.doc  file_2_b.doc
```

---

## Example 3: Match Any Name with a Four-Character Extension

**Samples**

```
document1.txt  ❌
image1.py      ❌
report2.pdf    ❌
memo1.docx     ✅
invoice3.xlsx  ✅
```

1.  Yellow: `*` (any prefix)
2.  Blue: `.`
3.  Yellow: `????` (exactly four)
4.  Glob: `*.????`

```
$ ls *.????
memo1.docx  invoice3.xlsx
```

---

## Example 4: Match Names Containing “1” Then One More Character, Then an Extension

**Samples**

```
file1.sh           ❌
document1M.docx    ✅
file3.txt          ❌
image1T.png        ✅
```

1.  Yellow: `*` (any prefix)
2.  Blue: `1`
3.  Yellow: `?` (one char)
4.  Blue: `.`
5.  Yellow: `*` (any extension)
6.  Glob: `*1?.*`

```
$ ls *1?.*
document1M.docx  image1T.png
```

---

## Example 5: Escaping a Literal “\*” in Filenames

**Samples**

```
R*al.py        ✅
f*a*il.txt     ✅
hail.doc       ❌
S*ail.txt      ✅
m*a?i*l.sh     ✅
4ai*l.txt      ❌
```

1.  Yellow: `?` (any single)
2.  Blue: `\*` (escaped `*`)
3.  Blue: `a`
4.  Yellow: `*`
5.  Blue: `.`
6.  Yellow: `*`
7.  Glob: `?\*a*.*`

> [!important]
> **Warning**
>
> Be sure to quote or escape the pattern in your shell to prevent expansion before `ls` sees it.

```
$ ls '?\*a*.*'
R*al.py  f*a*il.txt  S*ail.txt  m*a?i*l.sh
```

---

## Example 6: Escaping a Backslash and Question Mark

**Samples**

```
file5\?xt             ✅
file_1234567\?890?xt  ✅
docA\?.docx           ✅
docZ.docx             ❌
rep1.txt              ❌
```

1.  Yellow: `*` (any prefix)
2.  Blue: `\\?` (escaped `\?`)
3.  Yellow: `*` (any remainder)
4.  Glob: `*\\?*`

```
$ ls '*\\?*'
file5\?xt  file_1234567\?890?xt  docA\?.docx
```

---

## Conclusion

By splitting filenames into literal (blue) and wildcard (yellow) segments, you can craft precise glob patterns for matching even the trickiest file names.

## Links and References

- [Bash Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
- [GNU Bash Manual](https://www.gnu.org/software/bash/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/b226bcbc-7db5-49fc-8770-254ee71ef7f3)**
>
> Watch video content
