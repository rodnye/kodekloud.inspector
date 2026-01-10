# Demo Resource Attributes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-Resource-Attributes)

---

## Table of Contents

- Demo Resource Attributes
  - 1. Inspect domain.tf
  - 2. What Is time_static?
  - 3. Exported Attributes of time_static
  - 4. Reference a time_static Attribute
  - 5. Write the Timestamp to a Local File
  - 6. Initialize and Apply
  - 7. Inspect the Applied Resources
  - 8. Retrieve the rfc3339 Timestamp
  - 9. Final Configuration Snapshot
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo Resource Attributes

Welcome to this tutorial on working with resource attributes in OpenTofu. You’ll learn how to:

- Inspect an existing configuration (`domain.tf`)
- Understand and list exported attributes of the `time_static` resource
- Reference those attributes in another resource (`local_file`)
- Initialize and apply your configuration
- Verify the final state

---

## 1\. Inspect `domain.tf`

Navigate to your project folder and open the `domain.tf` file:

```
cd /root/opentofu-projects/project-chronos
nano domain.tf
```

Inside, you’ll see an empty `time_static` resource block:

```
resource "time_static" "time_update" {
}
```

**Resource Type:** `time_static`

---

## 2\. What Is `time_static`?

The `time_static` resource generates a fixed timestamp on apply. You don’t need to pass any arguments—OpenTofu handles everything.

> [!important]
> **Note**
>
> The `time_static` resource produces a stable timestamp similar to `random_pet`. You can use its exported attributes elsewhere in your configuration.

---

## 3\. Exported Attributes of `time_static`

According to the [time_static documentation](https://docs.opentofu.org/providers/time/latest/resources/time_static), the following attributes are available:

| Attribute | Description                          |
| --------- | ------------------------------------ |
| id        | Timestamp in RFC3339 format          |
| rfc3339   | Same as `id` (RFC3339 formatted)     |
| day       | Day of the month (1–31)              |
| month     | Month of the year (1–12)             |
| year      | Four-digit year                      |
| hour      | Hour of the day (0–23)               |
| minute    | Minute of the hour (0–59)            |
| second    | Second of the minute (0–59)          |
| unix      | Unix epoch time (seconds since 1970) |

---

## 4\. Reference a `time_static` Attribute

To reference the `id` (RFC3339) of your `time_update` resource:

```
time_static.time_update.id
```

You can inject this into any other resource’s argument or output.

---

## 5\. Write the Timestamp to a Local File

Open `main.tf` and add a `local_file` resource that writes the timestamp to `/root/time.txt`:

```
resource "time_static" "time_update" {
}


resource "local_file" "time" {
  filename = "/root/time.txt"
  content  = "Timestamp of this file: ${time_static.time_update.id}"
}
```

---

## 6\. Initialize and Apply

Run the following commands:

```
opentofu init
opentofu apply
```

Confirm both resources are created successfully:

- `time_static.time_update`
- `local_file.time`

---

## 7\. Inspect the Applied Resources

Use `opentofu show` to inspect the resource state:

```
$ opentofu show


# local_file.time:
resource "local_file" "time" {
  filename = "/root/time.txt"
  content  = "Timestamp of this file: 2024-04-09T09:52:41Z"
  id       = "f095dbo698d1e64f847e39f01fc9f7d4592ff48"
}


# time_static.time_update:
resource "time_static" "time_update" {
  id      = "2024-04-09T09:52:41Z"
  rfc3339 = "2024-04-09T09:52:41Z"
  day     = 9
  month   = 4
  year    = 2024
  hour    = 9
  minute  = 52
  second  = 41
  unix    = 1712656361
}
```

**Question:** What is the `id` of `local_file.time`?  
**Answer:** `f095dbo698d1e64f847e39f01fc9f7d4592ff48`

---

## 8\. Retrieve the `rfc3339` Timestamp

From the same output, you can also see:

```
rfc3339 = "2024-04-09T09:52:41Z"
```

**Question:** What is the `rfc3339` value?  
**Answer:** `2024-04-09T09:52:41Z`

---

## 9\. Final Configuration Snapshot

After apply, your resources look like this:

```
resource "local_file" "time" {
  filename = "/root/time.txt"
  content  = "Timestamp of this file: ${time_static.time_update.id}"
}


resource "time_static" "time_update" {
  day     = 9
  month   = 4
  year    = 2024
  hour    = 9
  minute  = 52
  second  = 41
  unix    = 1712656361
  id      = "2024-04-09T09:52:41Z"
  rfc3339 = "2024-04-09T09:52:41Z"
}
```

That wraps up this demo on using resource attributes in OpenTofu. Happy provisioning!

---

## Links and References

- OpenTofu Documentation: https://docs.opentofu.org/
- [time_static resource](https://docs.opentofu.org/providers/time/latest/resources/time_static)
- [OpenTofu CLI Reference](https://docs.opentofu.org/cli/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/61653bc6-12ac-4e0e-aa02-418c66a4c897)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/e7474bbe-4cb3-4d66-ab87-1b33a6510ca4)**
>
> Practice lab
