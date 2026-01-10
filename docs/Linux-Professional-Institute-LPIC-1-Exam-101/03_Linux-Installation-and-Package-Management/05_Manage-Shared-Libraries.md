# Manage Shared Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Manage-Shared-Libraries)

---

## Table of Contents

- Manage Shared Libraries
  - 1. Compilation vs. Linking
  - 2. Static Libraries vs. Shared Libraries
  - 3. Shared Library Naming Conventions
  - 4. Common Library Locations
  - 5. Dynamic Linker Configuration
  - 6. LD_LIBRARY_PATH Environment Variable
  - 7. Inspecting Dependencies with ldd
  - References
  - Watch Video
    - Static Libraries (.a)
    - Shared (Dynamic) Libraries (.so)

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Manage Shared Libraries

In this lesson, we explore how to manage shared libraries on Linux. You’ll learn about compilation vs. linking, static and dynamic libraries, naming conventions, library paths, dynamic linker configuration, and dependency inspection.

## 1\. Compilation vs. Linking

Building an executable from source involves two key steps:

1.  **Compilation**  
    The compiler (e.g., `gcc`) translates source files (`.c`, `.cpp`) into object files (`.o`).
2.  **Linking**  
    The linker combines object files and connects them to libraries, producing the final executable.

Linking can be:

- **Static**: Library code is embedded into the executable.
- **Dynamic**: Executable references shared libraries at runtime.

![The image is an educational slide explaining software libraries, compilers, linkers, and the concept of linking, including static and dynamic linking.](https://kodekloud.com/kk-media/image/upload/v1752881442/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-Shared-Libraries/software-libraries-compilers-linkers-linking.jpg)

## 2\. Static Libraries vs. Shared Libraries

### Static Libraries (.a)

- Merged into the executable at link time.
- No runtime dependency on external files.
- Larger binary size, but fully self-contained.

> [!important]
> **Note**
>
> Static linking increases the size of the executable since all used library code is included.

### Shared (Dynamic) Libraries (.so)

- Executable holds references, not library code.
- Resolved by the dynamic linker at runtime.
- Multiple programs can share a single library instance in memory, saving disk and RAM.

![The image explains the difference between static and shared libraries. Static libraries are merged with the program at link time with no runtime dependencies, while shared libraries are not merged and must be available at runtime.](https://kodekloud.com/kk-media/image/upload/v1752881443/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-Shared-Libraries/static-vs-shared-libraries-explained.jpg)

## 3\. Shared Library Naming Conventions

Shared libraries follow the SONAME pattern:

```
lib{name}.so.{major}
```

- `lib`: prefix
- `.so`: shared object
- `{major}`: major version

Example:

```
libpthread.so.0
```

![The image shows a terminal interface with a section explaining naming conventions for shared libraries, including components like library name, shared object, and version number, with an example given as "libpthread.so.0".](https://kodekloud.com/kk-media/image/upload/v1752881444/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-Shared-Libraries/terminal-naming-conventions-shared-libraries.jpg)

On Debian 9.9, the GNU C library’s SONAME is `libc.so.6`, typically a symlink to the full version. Static archives end with `.a`, for example `libpthread.a`.

## 4\. Common Library Locations

Shared libraries are usually installed in these directories:

| Directory        | Description              |
| ---------------- | ------------------------ |
| `/lib`           | 32-bit system libraries  |
| `/lib32`         | 32-bit compatibility     |
| `/lib64`         | 64-bit system libraries  |
| `/usr/lib`       | Standard library path    |
| `/usr/local/lib` | Local (custom) libraries |

## 5\. Dynamic Linker Configuration

The dynamic linker (`ld.so` or `ld-linux.so`) reads `/etc/ld.so.conf` to locate libraries:

```
include /etc/ld.so.conf.d/*.conf
```

Each file in `/etc/ld.so.conf.d/` lists absolute library directories, for example:

```
/usr/local/lib
```

After editing, rebuild the cache and create necessary symlinks:

```
sudo ldconfig -v
```

Sample output:

```
/usr/local/lib:
/lib/x86_64-linux-gnu:
    libfuse.so.2 -> libfuse.so.2.9.7
    libnss_myhostname.so.2 -> libnss_myhostname.so.2
    libidn.so.11 -> libidn.so.11.6.16
    ...
```

Query for a specific library:

```
sudo ldconfig -p | grep libfuse
# libfuse.so.2 (libc6,x86-64) => /lib/x86_64-linux-gnu/libfuse.so.2
```

Inspect the symlink:

```
ls -l /lib/x86_64-linux-gnu/libfuse.so.2
# lrwxrwxrwx 1 root root 16 Aug 21 2018 /lib/x86_64-linux-gnu/libfuse.so.2 -> libfuse.so.2.9.7
```

## 6\. LD_LIBRARY_PATH Environment Variable

`LD_LIBRARY_PATH` is a colon-separated list of directories the dynamic linker checks before standard paths.

```
export LD_LIBRARY_PATH=/usr/local/mylib:$LD_LIBRARY_PATH
echo $LD_LIBRARY_PATH
# /usr/local/mylib:...
```

To remove it:

```
unset LD_LIBRARY_PATH
```

> [!important]
> **Warning**
>
> Overusing `LD_LIBRARY_PATH` can cause version conflicts and security issues. Prefer updating `/etc/ld.so.conf.d/` and running `ldconfig` for persistent changes.

For permanent updates, add the `export` line to `~/.bashrc` or `/etc/profile`.

## 7\. Inspecting Dependencies with ldd

Use `ldd` to list shared libraries an executable depends on:

```
ldd /usr/bin/git
```

Example output:

```
linux-vdso.so.1 =>  (0x00007ffcbb310000)
libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f18241eb000)
libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f1823fd1000)
libresolv.so.2 => /lib/x86_64-linux-gnu/libresolv.so.2 (0x00007f1823db6000)
libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f1823b99000)
librt.so.1 => /lib/x86_64-linux-gnu/librt.so.1 (0x00007f1823991000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f18235c7000)
/lib64/ld-linux-x86-64.so.2 (0x00007f182445b000)
```

To list unused direct dependencies:

```
ldd -u /usr/bin/git
```

Example:

```
Unused direct dependencies:
    /lib/x86_64-linux-gnu/libz.so.1
    /lib/x86_64-linux-gnu/libpthread.so.0
    /lib/x86_64-linux-gnu/librt.so.1
```

Unused entries often result from linker options during the build process.

---

## References

- [GNU ldconfig Manual](https://man7.org/linux/man-pages/man8/ldconfig.8.html)
- [Linux Shared Libraries HOWTO](https://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html)
- [ld.so.conf Configuration](https://man7.org/linux/man-pages/man5/ld.so.conf.5.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/fd8ddef4-51d5-41b5-83cd-b388e3ef653f)**
>
> Watch video content
