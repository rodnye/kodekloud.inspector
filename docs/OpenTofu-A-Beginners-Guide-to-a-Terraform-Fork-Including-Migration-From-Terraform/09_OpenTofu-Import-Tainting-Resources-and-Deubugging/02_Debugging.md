# Debugging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Import-Tainting-Resources-and-Deubugging/Debugging)

---

## Table of Contents

- Debugging
  - 1. Configure Log Verbosity
  - 2. Persisting Logs to a File
  - 3. Disabling Debug Logging
  - See Also
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Import Tainting Resources and Deubugging

# Debugging

When provisioning resources with OpenTofu, failures and unexpected errors often require deeper inspection. Enabling debug logging surfaces internal details and helps you troubleshoot more effectively. In this guide, you’ll learn how to:

- Configure log verbosity with `TF_LOG`
- Persist logs to disk using `TF_LOG_PATH`
- Disable verbose logging when you’re done

## 1\. Configure Log Verbosity

OpenTofu honors the standard Terraform log levels via the `TF_LOG` environment variable. You can choose from five levels:

| Level | Description                            |
| ----- | -------------------------------------- |
| ERROR | Only error messages                    |
| WARN  | Warnings and errors                    |
| INFO  | High-level informational messages      |
| DEBUG | Detailed execution and decision points |
| TRACE | Full internal trace (most verbose)     |

> [!important]
> **Note**
>
> Setting `TF_LOG=TRACE` produces the most comprehensive output, including plugin operations, HTTP requests, and configuration decisions.

To enable debugging, export the desired level:

```
export TF_LOG=TRACE
```

Now, any OpenTofu command will include detailed log entries. For example:

```
$ opentofu plan
2023/11/05 10:12:45 [INFO]  OpenTofu version: 1.6.1
2023/11/05 10:12:45 [DEBUG] Attempting to open CLI config file: ~/.opentofu.rc
2023/11/05 10:12:45 [DEBUG] Plugin directory: ~/.terraform.d/plugins
2023/11/05 10:12:45 [INFO]  backend/local: starting Plan operation
2023/11/05T10:12:45.123-0400 [DEBUG] plugin: starting plugin: path=/…/terraform-provider-aws_v3.11.0_x5 pid=34016
```

> [!important]
> **Warning**
>
> Log levels below `TRACE` can sometimes omit critical details. If you’re troubleshooting core OpenTofu behavior, always default to `TF_LOG=TRACE`.

## 2\. Persisting Logs to a File

For lengthy runs or CI environments, capture logs into a file by setting `TF_LOG_PATH`. All output from `TF_LOG` will be written to the specified path:

```
export TF_LOG_PATH=/tmp/opentofu-debug.log
```

You can verify the beginning of the log file with:

```
head -n 10 /tmp/opentofu-debug.log
```

Example output:

```
2023/11/05 10:12:45 [INFO]  OpenTofu version: 1.6.1
2023/11/05 10:12:45 [INFO]  Go runtime version: go1.14.2
2023/11/05 10:12:45 [DEBUG] CLI args: ["/usr/local/bin/opentofu" "plan"]
2023/11/05 10:12:45 [DEBUG] Loading provider registry from ~/.terraform.d/plugins
2023/11/05 10:12:45 [INFO]  backend/local: starting Plan operation
```

## 3\. Disabling Debug Logging

Once you’ve finished troubleshooting, remove the logging environment variables to return to standard output:

```
unset TF_LOG
unset TF_LOG_PATH
```

## See Also

- [OpenTofu CLI Reference](https://opentofu.io/docs/cli)
- [Terraform Logging Overview](https://www.terraform.io/docs/internals/debugging.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/0fda982f-8bb2-4b57-8009-996870d27e43/lesson/535d87f1-adeb-4587-9fdb-579fcf154891)**
>
> Watch video content
