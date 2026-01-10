# Managing Policies using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Managing-Policies-using-the-CLI)

---

## Table of Contents

- Managing Policies using the CLI
  - 1. Listing Policies
  - 2. Writing (Creating or Updating) a Policy
  - 3. Reading a Policy
  - 4. Deleting a Policy
  - 5. Formatting a Policy File
  - Example: Creating a webapp Policy
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Managing Policies using the CLI

Vault policies define fine-grained authorization rules for accessing secrets and operations. Using Vault’s `policy` namespace in the CLI, you can list, read, create/update, delete, and format policy files.

| Subcommand | Description                                |
| ---------- | ------------------------------------------ |
| `list`     | List all existing policies                 |
| `read`     | Display the HCL contents of a policy       |
| `write`    | Create or update a policy from an HCL file |
| `delete`   | Remove a policy from Vault                 |
| `fmt`      | Canonicalize an HCL policy file’s format   |

For detailed syntax, see the [Vault CLI Policy Commands](https://www.vaultproject.io/docs/commands/policy).

## 1\. Listing Policies

To view all policies currently loaded into Vault:

```
vault policy list
```

Sample output:

```
admin-policy
default
root
```

> [!important]
> **Note**
>
> Vault always provides a `default` and `root` policy. Custom policies appear alongside these.

## 2\. Writing (Creating or Updating) a Policy

Create a new policy or update an existing one by specifying the policy name and the path to your HCL file:

```
vault policy write admin-policy /tmp/admin.hcl
```

Expected output:

```
Success! Uploaded policy: admin-policy
```

Steps breakdown:

1.  `vault` – invokes the Vault CLI
2.  `policy` – selects the policy management namespace
3.  `write` – subcommand for creation or update
4.  `admin-policy` – policy name
5.  `/tmp/admin.hcl` – HCL file path

> [!important]
> **Note**
>
> Ensure the HCL file path is correct and accessible. Relative or absolute paths both work.

## 3\. Reading a Policy

To inspect the rules defined in a policy:

```
vault policy read admin-policy
```

This outputs the HCL block that defines all allowed paths and capabilities for `admin-policy`.

## 4\. Deleting a Policy

Remove a policy when it’s no longer needed:

```
vault policy delete admin-policy
```

Expected output:

```
Success! Deleted policy: admin-policy
```

> [!important]
> **Warning**
>
> Deleting a policy is irreversible. Make sure it’s no longer in use by any Vault tokens or roles.

## 5\. Formatting a Policy File

If your HCL file has inconsistent whitespace or indentation, `fmt` will rewrite it in a canonical form:

```
vault policy fmt /tmp/admin.hcl
```

This command overwrites `/tmp/admin.hcl` with a properly formatted version.

## Example: Creating a `webapp` Policy

Given an HCL file `/tmp/webapp.hcl`, create a new policy named `webapp`:

```
vault policy write webapp /tmp/webapp.hcl
```

You should see:

```
Success! Uploaded policy: webapp
```

Now, running `vault policy list` will include `webapp`:

```
vault policy list
# → admin-policy
# → default
# → root
# → webapp
```

---

## Links and References

- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Vault Policy Guide](https://www.vaultproject.io/docs/concepts/policies)
- [HCL Language Reference](https://github.com/hashicorp/hcl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/6b43bf6c-5121-4791-8d6e-c08273608e5c)**
>
> Watch video content
