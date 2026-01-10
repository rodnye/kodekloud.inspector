# pid - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/pid)

---

## Table of Contents

- pid
  - Table of Special PID Variables
  - Using $! to Capture Background Job PIDs
  - Using $$ to Identify Your Shell or Script
  - $$ and Subshell Behavior
  - Key Takeaways
  - Links and References
  - Watch Video
    - Storing $! in a Bash Script
    - Inspecting $$ Inside a Script

---

## Content

Advanced Bash Scripting

Special Shell Variables

# pid

In Bash and other POSIX-compatible shells, special variables like `$$` and `$!` help you manage process IDs (PIDs) for debugging, automation, and scripting tasks. While they might not pop up every day, knowing how to use them can streamline background jobs, service management, and process monitoring.

Before diving into these variables, let’s clarify how TTYs, shells, and PIDs relate:

1.  When you open a terminal, it’s assigned a TTY (teletype) name.
2.  A shell (e.g., Bash) runs on that TTY and acts as the parent process.
3.  Any command or script executed in that shell becomes a child process.
4.  Every process—from parent shells to background jobs—has a PID and a lifecycle (start → run → exit).

---

## Table of Special PID Variables

| Variable | Description                                          | Typical Use Case                        |
| -------- | ---------------------------------------------------- | --------------------------------------- |
| `$!`     | PID of the most recently launched **background** job | Tracking & controlling background tasks |
| `$$`     | PID of the **current** shell or shell-script process | Self-awareness in scripts               |

---

## Using `$!` to Capture Background Job PIDs

The `$!` variable returns the PID of the last job you sent to the background.

```
$ sleep 5 &
[1] 93506
$ echo $!
93506
```

Even if you run foreground commands afterward, `$!` holds the PID until you start another background job:

```
$ echo "First background PID is $!"
First background PID is 93506


$ echo "Hello" &
[1] 93761
Hello
[1] + done echo "Hello"


$ echo $!
93761
```

### Storing `$!` in a Bash Script

A common pattern is launching a service in the background, capturing its PID, and later terminating it. For example, starting an Apache JMeter server:

```
#!/usr/bin/env bash


jmeter_pid=""


start_jmeter() {
  echo "Starting JMeter server..."
  jmeter-server &
  jmeter_pid=$!
}


start_jmeter


# Other workflow steps...
echo "Now running additional setup tasks..."
,[object Object],


echo "Stopping JMeter server (PID: $jmeter_pid)"
kill -SIGTERM "$jmeter_pid"
```

---

## Using `$$` to Identify Your Shell or Script

The `$$` variable prints the PID of the current shell or script process:

```
$ echo $$
79315
$ ps -p $$ -o pid,cmd
  PID CMD
79315 -bash
```

Opening a new terminal tab or window yields a different `$$` value:

```
$ echo $$
91933
```

### Inspecting `$$` Inside a Script

Create `print_pid.sh`:

```
#!/usr/bin/env bash
echo "This script’s PID is $$"
sleep 60
```

Run it in the background:

```
$ ./print_pid.sh &
[1] 94479
94479
$ ps --pid 94479,94481 -o pid,ppid,cmd
  PID  PPID CMD
94479 79315 /bin/bash ./print_pid.sh
94481 94479 sleep 60
```

- **PID 94479** corresponds to the script itself (`$$`).
- **PID 94481** is the child `sleep` process.

---

## `$$` and Subshell Behavior

Subshells inherit the parent shell’s PID, so `$$` stays constant:

```
#!/usr/bin/env bash


echo "Parent shell PID: $$"
(
  echo "Inside subshell PID: $$"
)
```

Output:

```
$ ./subshell_pid.sh
Parent shell PID: 54344
Inside subshell PID: 54344
```

All references to `$$` show the same PID because subshells share the parent’s process ID.

---

## Key Takeaways

- **`$!`** returns the PID of the last command run **in the background**.
- **`$$`** returns the PID of **your current shell** or the running script.

Understanding these variables will help you write more robust scripts, automate process control, and debug complex workflows with confidence.

---

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Linux Process Management](https://tldp.org/LDP/abs/html/processes.html)
- [Apache JMeter](https://jmeter.apache.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/fa6ec11d-812c-48b9-a061-728a7275b5a6)**
>
> Watch video content
