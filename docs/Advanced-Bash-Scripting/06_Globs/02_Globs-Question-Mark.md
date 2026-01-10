# Globs Question Mark - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Globs-Question-Mark)

---

## Table of Contents

- Globs Question Mark
  - ? Wildcard Basics
  - Example 1: Single Character Prefix Before “ail”
  - Example 2: “tes” + Two Characters + “.txt”
  - Example 3: “test” + One Character + “.txt”
  - Example 4: One Character + “est.” + Three Characters
  - Example 5: Exactly Four-Character Filenames
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Globs

# Globs Question Mark

In this lesson, we dive into how the `?` wildcard works in glob patterns. In Bash and most shells, `?` matches exactly one character, so the filenames must align in length with your pattern. This enables precise control over file selection by combining fixed text and single-character placeholders.

---

## `?` Wildcard Basics

- `?` replaces exactly one character.
- Does not match zero characters.
- Treats the dot (`.`) as an actual character (unless `dotglob` is enabled).

> [!important]
> **Note**
>
> The `?` wildcard differs from `*`, which matches zero or more characters. Use `?` when you need strict length matching.

---

## Example 1: Single Character Prefix Before “ail”

Assume the directory contains:  
rail, Document.doc, fail, hail, bar, sail, foo, mail, 4ail, foobar.

![The image shows a list of words with checkmarks and crosses, indicating matches and non-matches for a pattern "ail" with different prefixes. It illustrates the concept of expansion globs.](https://kodekloud.com/kk-media/image/upload/v1752868568/notes-assets/images/Advanced-Bash-Scripting-Globs-Question-Mark/expansion-globs-checkmarks-crosses.jpg)

Use `?ail` to match any single-character prefix followed by `ail`:

```
$ ls
rail  Document.doc  fail  hail  bar  sail  foo  mail  4ail  foobar

$ ls ?ail
rail  fail  hail  sail  mail  4ail
```

- `?` matches one character (`r`, `f`, `h`, `s`, `m`, `4`).
- `ail` anchors the suffix.

---

## Example 2: “tes” + Two Characters + “.txt”

Directory listing:  
test.sh, file.txt, tes1t.txt, test2.txt, file1.txt.

![The image illustrates the concept of expansion globs, showing a list of filenames with checkmarks and crosses indicating matches to the pattern "tes??.txt".](https://kodekloud.com/kk-media/image/upload/v1752868569/notes-assets/images/Advanced-Bash-Scripting-Globs-Question-Mark/expansion-globs-filenames-checkmarks.jpg)

With the pattern `tes??.txt`:

```
$ ls
test.sh  file.txt  tes1t.txt  test2.txt  file1.txt

$ ls tes??.txt
tes1t.txt  test2.txt
```

- `tes` fixes the first three letters.
- `??` matches exactly two characters (`1t`, `2.`).
- `.txt` matches the file extension.

---

## Example 3: “test” + One Character + “.txt”

Consider these files:  
test1-2.txt, tes1t.txt, test2.txt, test3.sh, test1.txt, file1.txt.

![The image illustrates file name matching using expansion globs, showing which files match the pattern "test?.txt" with checkmarks and crosses.](https://kodekloud.com/kk-media/image/upload/v1752868570/notes-assets/images/Advanced-Bash-Scripting-Globs-Question-Mark/file-name-matching-globs-diagram.jpg)

Use `test?.txt` to find files with a single character after `test` and before `.txt`:

```
$ ls
test1-2.txt  tes1t.txt  test2.txt  test3.sh  test1.txt  file1.txt

$ ls test?.txt
test1.txt  test2.txt
```

- `test` anchors the prefix.
- `?` matches one character (`1`, `2`).
- `.txt` ensures the extension.

---

## Example 4: One Character + “est.” + Three Characters

Matching pattern `?est.???` to include any one-character prefix, `est.`, and exactly three characters as the extension:

```
$ ls
test.txt  vest.txt  test.jpg  file.sh  rest.txt  west.doc

$ ls ?est.???
test.txt  vest.txt  test.jpg  rest.txt  west.doc
```

- `?est` allows any single first character.
- The `.` after `est` is literal.
- `???` requires exactly three-character extension.

---

## Example 5: Exactly Four-Character Filenames

Directory content:  
1234, abcd, kei5, some_file.txt, x0f4p, 90c1, dir, keio5, touch, x0fp.

![The image shows a list of strings with checkmarks and crosses, indicating which strings match a certain pattern, and a column of matching strings on the right. The title is "Expansion Globs," suggesting a demonstration of pattern matching.](https://kodekloud.com/kk-media/image/upload/v1752868571/notes-assets/images/Advanced-Bash-Scripting-Globs-Question-Mark/expansion-globs-pattern-matching.jpg)

Pattern `????` finds names exactly four characters long:

```
$ ls
1234  abcd  kei5  some_file.txt  x0f4p  90c1  dir  keio5  touch  x0fp

$ ls ????
1234  abcd  kei5  90c1  x0fp
```

- Four `?` must each match one character.
- Filters out any name not exactly four characters.

---

## Conclusion

Using the `?` wildcard in your glob patterns helps you precisely filter filenames by length and content. Combine fixed text with `?` placeholders to tailor your matches exactly.

---

## Links and References

- [Bash Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Shell Globbing on Wikipedia](<https://en.wikipedia.org/wiki/Glob_(programming)>)

Ensure you enable `dotglob` if you want to include hidden files in matches:

```
shopt -s dotglob
```

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/44d5210c-0066-4bd8-af9d-3c9b6f6b5e79)**
>
> Watch video content
