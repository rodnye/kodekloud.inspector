# Features in v1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Beyond-Basics/Features-in-v1)

---

## Table of Contents

- Features in v1
  - 1. State Encryption
  - 2. Removing Resources Without Destruction
  - Links and References
  - Watch Video
    - 1.1. How It Works
    - 1.2. Enabling Encryption on an Existing State
    - 1.3. Migrating Back to an Unencrypted State
    - 2.1. Create a Sample Resource
    - 2.2. Drop the Resource from State

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Beyond Basics

# Features in v1

In this guide, we explore two powerful features introduced in OpenTofu v1.7.0:

1.  Robust state encryption to secure your plan and state files at rest.
2.  The `removed` block to drop resources from your state without tearing down real infrastructure.

These enhancements empower teams to maintain compliance, secure sensitive data, and streamline state management.

---

## 1\. State Encryption

OpenTofu v1.7.0 adds native support for encrypting both local and remote state and plan files. You can also leverage this capability when reading remote state via a [Terraform Remote State data source](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state).

### 1.1. How It Works

| Component       | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| key\\\_provider | Derives a strong key from a passphrase (PBKDF2)                |
| method          | Defines the encryption algorithm (AES-GCM)                     |
| state           | Configures how encrypted/unencrypted state is read and written |

> [!important]
> **Note**
>
> Using state encryption requires OpenTofu v1.7.0 or later and support from your chosen backend.

### 1.2. Enabling Encryption on an Existing State

1.  Create a backup of your current `terraform.tfstate`.
2.  Update your configuration:

```
terraform {
  encryption {
    key_provider "pbkdf2" "my_passphrase" {
      passphrase = "" # Enter a strong passphrase here
    }


    method "aes_gcm" "my_method" {
      keys = key_provider.pbkdf2.my_passphrase
    }
  }


  state {
    method   = method.aes_gcm.my_method
    fallback {} # Allows reading unencrypted state during migration
  }
}
```

Run:

```
OpenTofu apply
```

This setup:

- Derives an AES-GCM key from your passphrase.
- Encrypts new state and plan files.
- Uses `fallback` to read existing unencrypted state during the migration.

> [!important]
> **Warning**
>
> After migration, your state and plan files are unrecoverable without the correct passphrase. Store it securely.

### 1.3. Migrating Back to an Unencrypted State

To revert to unencrypted state files:

```
terraform {
  encryption {
    key_provider "pbkdf2" "my_passphrase" {
      passphrase = "" # Use the same passphrase
    }


    method "aes_gcm" "my_method" {
      keys = key_provider.pbkdf2.my_passphrase
    }
  }


  state {
    fallback {
      method = method.aes_gcm.my_method
    }
  }
}
```

By omitting `method` in the `state` block, OpenTofu writes future state files unencrypted while still decrypting the current state.

---

## 2\. Removing Resources Without Destruction

The `removed` block lets you forget resources from your state without destroying the actual infrastructure, ideal for drift repair or state cleanup.

### 2.1. Create a Sample Resource

Define and apply a simple file resource:

```
resource "local_file" "test" {
  content  = "Hello world!"
  filename = "test.txt"
}
```

```
OpenTofu apply
```

This creates `test.txt` on disk.

### 2.2. Drop the Resource from State

1.  Comment out or delete the `local_file` block.
2.  Add a `removed` block in your configuration:

```
removed {
  from = local_file.test
}
```

3.  Preview the change:

```
OpenTofu plan
```

OpenTofu will show that `local_file.test` is removed from the state but will **not** delete `test.txt`.

> [!important]
> **Note**
>
> The `removed` block only affects your state file. It does not alter real-world resources.

---

## Links and References

- [Terraform Remote State data source](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state)
- [OpenTofu Documentation](https://docs.opentofu.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/5a06d90f-8a8a-49a9-99d6-30b70e37bc83/lesson/42e8ddd9-581a-4a43-a1c0-dea11db5470f)**
>
> Watch video content
