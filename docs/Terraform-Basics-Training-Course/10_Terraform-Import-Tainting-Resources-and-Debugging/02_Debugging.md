# Debugging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Import-Tainting-Resources-and-Debugging/Debugging)

---

## Table of Contents

- Debugging
  - Enabling Debugging
  - Logging to a File
  - Disabling Debug Logs
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Import Tainting Resources and Debugging

# Debugging

In this article, we explore how to enable and use debugging in Terraform to effectively troubleshoot and resolve issues. When Terraform errors occur, the first step is to review the log output. While Terraform’s error messages during provisioning are helpful, sometimes you need to dive deeper for an internal view.

Terraform allows you to increase the debugging output by setting the environment variable TF_LOG to one of the available log level values. The supported log levels are: info, warning, error, debug, and trace—with trace providing the most detailed output.

> [!important]
> **Tip**
>
> For the most verbose logging, use TF_LOG=TRACE. This is particularly useful when facing complex issues that require insight into Terraform's inner workings.

## Enabling Debugging

To enable the trace log level, set the TF_LOG environment variable as follows:

```
# export TF_LOG=<log_level>
$ export TF_LOG=TRACE
```

After setting this variable, running any Terraform command will produce detailed logs corresponding to the selected verbosity level. For example, a Terraform plan run with TF_LOG set to TRACE might output hundreds or even thousands of lines, capturing every internal operation performed by Terraform plugins.

Below is an example output from running `terraform plan` with elevated logging:

```
$ terraform plan
2020/10/18 22:08:30 [INFO] Terraform version: 0.13.0
2020/10/18 22:08:30 [INFO] Go runtime version: go1.14.2
2020/10/18 22:08:30 [INFO] CLI args: []string{"C:\\Windows\\system32\\terraform.exe", "plan"}
2020/10/18 22:08:30 [DEBUG] Attempting to open CLI config file: C:\\Users\\vpala\\AppData\\Roaming\\terraform.rc
2020/10/18 22:08:30 [DEBUG] File doesn't exist, but doesn't need to. Ignoring.
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory terraform.d/plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory C:\Users\\vpala\AppData\Roaming\HashiCorp\Terraform\plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory
2020/10/18 22:08:30 [INFO] CLI command args: []string{"plan"}
2020/10/18 22:08:30 [WARN] Log levels other than TRACE are currently unreliable, and are supported only for backward compatibility.
Use TF_LOG=TRACE to see Terraform's internal logs.
----
2020/10/18 22:08:30 [DEBUG] New state was assigned lineage "f413959c-538a-f9ce-524e-1615073518d4"
2020/10/18 22:08:30 [DEBUG] checking for provisioner in "."
2020/10/18 22:08:30 [DEBUG] checking for provisioner in "C:\\Windows\\system32"
2020/10/18 22:08:30 [INFO] Failed to read plugin lock file .terraform\plugins\windows_amd64\lock.json: The system cannot find the path specified.
2020/10/18 22:08:30 [INFO] backend/local: starting Plan operation
2020/10/18 22:08:30.646-0400 [DEBUG] plugin: starting plugin: path=terraform/plugins/registry.terraform.io/hashicorp/aws/3.11.0/windows_amd64/terraform-provider-aws_v3.11.0_x5.exe args=[]
2020/10/18 22:08:30.935-0400 [DEBUG] plugin: waiting for RPC address: path.terraform/plugins/registry.terraform.io/hashicorp/aws/3.11.0/windows_amd64/terraform-provider-aws_v3.11.0_x5.exe pid=34016
2020/10/18 22:08:30.974-0400 [DEBUG] plugin: configuring server automatic mTLS:
```

## Logging to a File

If you want to persist these logs to a file for later review or to include them in bug reports, set the environment variable TF_LOG_PATH with the desired file path as shown below:

```
$ export TF_LOG_PATH=/tmp/terraform.log
```

All generated logs will then be recorded in the specified file. To quickly inspect the beginning of your log file, you can use a command like:

```
$ head -10 /tmp/terraform.log
```

An example snippet from the log file might look like this:

```
----
2020/10/18 22:08:30 [INFO] terraform version: 0.13.0
2020/10/18 22:08:30 [INFO] Go runtime version: go1.14.2
2020/10/18 22:08:30 [INFO] CLI args: []string{"C:\\Windows\\system32\\terraform.exe", "plan"}
2020/10/18 22:08:30 [DEBUG] Attempting to open CLI config file: C:\Users\vpalal\AppData\Roaming\terraform.rc
2020/10/18 22:08:30 [DEBUG] File doesn't exist, but doesn't need to. Ignoring.
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory terraform.d/plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory C:\Users\vpalal\AppData\Roaming\terraform.d\plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory C:\Users\vpalal\AppData\Roaming\HashiCorp\Terraform\plugins
2020/10/18 22:08:30 [INFO] CLI command args: []string{"plan"}
```

## Disabling Debug Logs

To completely disable the debugging output, simply unset the environment variables:

```
$ unset TF_LOG
$ unset TF_LOG_PATH
```

> [!important]
> **Caution**
>
> Remember to unset these variables when you no longer need detailed logs, as verbose logging can expose sensitive information and impact performance.

---

That concludes our discussion on debugging Terraform. Up next, you'll have the opportunity to practice Terraform tainting and explore additional debugging techniques through interactive exercises.

For more information, visit the [Terraform Documentation](https://www.terraform.io/docs/cli/index.html) for an in-depth look at other available commands and best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/29825b4d-c0d3-4732-a4e0-ec3a2988e2a3/lesson/70e5a377-3313-4c19-ab5e-c0f20777a147)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/29825b4d-c0d3-4732-a4e0-ec3a2988e2a3/lesson/b8679030-52b9-4c91-aaad-42f1eafa5997)**
>
> Practice lab
