# Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Logging)

---

## Table of Contents

- Logging
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Logging

In this guide, you'll learn how to enable and use debugging in Terraform to troubleshoot issues. When errors occur during Terraform operations, the logs offer invaluable insight into the underlying problems. Although running `terraform apply` usually points out error sources during provisioning, there are instances when you need more detailed internal logs. Terraform’s TF_LOG environment variable allows you to access these detailed logs.

Terraform supports various log levels: info, warning, error, debug, and trace—with trace providing the most verbose output. By setting TF_LOG to one of these levels, Terraform outputs additional details during command execution. For example, running a Terraform plan with TF_LOG set to trace may produce hundreds or even thousands of log entries, including low-level details from Terraform plugins. Such detailed logs are particularly useful for diagnosing issues within Terraform or when submitting a bug report.

Below is an example output from running `terraform plan` with detailed logging enabled:

```
$ terraform plan
----
2020/10/18 22:08:30 [INFO] Terraform version: 0.13.0
2020/10/18 22:08:30 [INFO] Go runtime version: go1.14.2
2020/10/18 22:08:30 [INFO] CLI args: [terraform.exe plan]
2020/10/18 22:08:30 [DEBUG] Attempting to open CLI config file: C:\Users\vpala\AppData\Roaming\terraform.rc
2020/10/18 22:08:30 [DEBUG] File doesn't exist, but doesn't need to. Ignoring.
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory terraform.d/plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory C:\Users\vpala\AppData\Roaming\terraform.d\plugins
2020/10/18 22:08:30 [DEBUG] ignoring non-existing provider search directory C:\Users\vpala\AppData\Roaming\terraform\plugins
2020/10/18 22:08:30 [INFO] CLI command args: [plan]
2020/10/18 22:08:30 [WARN] Log levels other than TRACE are currently unreliable, and are supported only for backward compatibility.
Use TF_LOG=TRACE to see Terraform's internal logs.
----
2020/10/18 22:08:30 [DEBUG] New state was assigned lineage "f413959c-538a-f9ce-524e-16150735184d"
2020/10/18 22:08:30 [DEBUG] checking for provisioner in "."
2020/10/18 22:08:30 [DEBUG] checking for provisioner in "C:\Windows\system32"
2020/10/18 22:08:30 [INFO] Failed to read plugin lock file .terraform\plugins\windows_amd64\lock.json: The system cannot find the path specified.
2020/10/18 22:08:30 [INFO] backend/local: starting plan operation
2020/10/18 22:08:30 625-0400 [INFO] plugin: configuring automatic mTLS
2020/10/18 22:08:30 646-0400 [DEBUG] starting plugin: path-terraform/plugins/registry.terraform.io/hashicorp/aws/3.11.0/windows_amd64/terraform-provider-aws_v3.11.0_x5.exe] args=[...]
pid=34016
2020/10-18T22:08:30.504-0400 [DEBUG] plugin: using plugin:
```

To persist the logs to a file rather than outputting them only to the console, use the TF_LOG_PATH environment variable. The example below demonstrates setting the log path so that all generated logs are recorded in the specified file:

```
$ export TF_LOG_PATH=/tmp/terraform.log
```

After running your Terraform command, you can inspect the log file. For instance:

```
$ head -10 /tmp/terraform.log
----
2020/10/18 22:08:30 [INFO]  Terraform version: 0.13.0
2020/10/18 22:08:30 [INFO]  Go runtime version: go1.14.2
2020/10/18 22:08:30 [INFO]  CLI args: []string{"C:\\Windows\\system32\\terraform.exe", "plan"}
2020/10/18 22:08:30 [DEBUG]  Attempting to open CLI config file: C:\Users\vpal\appdata\roaming\terraform.rc
2020/10/18 22:08:30 [DEBUG]  File doesn't exist, but doesn't need to. Ignoring.
2020/10/18 22:08:30 [DEBUG]  ignoring non-existing provider search directory terraform.d/plugins
2020/10/18 22:08:30 [DEBUG]  ignoring non-existing provider search directory C:\Users\vpal\AppData\Roaming\terraform.d\plugins
2020/10/18 22:08:30 [DEBUG]  ignoring non-existing provider search directory C:\Users\vpal\AppData\Roaming\HashiCorp\Terraform\plugins
2020/10/18 22:08:30 [INFO]  CLI command args: []string{"plan"}
```

> [!important]
> **Note**
>
> To disable logging, simply unset the TF_LOG and TF_LOG_PATH environment variables. This stops Terraform from generating extensive log output.

That concludes this article on Terraform logging. To verify your understanding, please proceed to the multiple-choice quiz for this section.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/78d56336-8278-416b-97c8-f797932baed6)**
>
> Watch video content
