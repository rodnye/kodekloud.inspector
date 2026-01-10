# OpenTofu State Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Remote-State/OpenTofu-State-Commands)

---

## Table of Contents

- OpenTofu State Commands
  - Viewing Resource Attributes with state show
  - Listing Resources with state list
  - Renaming Resources with state mv
  - Downloading Remote State with state pull
  - Removing Resources from State with state rm
  - Overwriting Remote State with state push
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Remote State

# OpenTofu State Commands

Managing the OpenTofu state file directly is error-prone. Instead, use the `tofu state` subcommands to list, inspect, rename, pull, remove, and push resources safely.

| Command      | Description                                            |
| ------------ | ------------------------------------------------------ |
| `state show` | Display detailed attributes of a resource in state     |
| `state list` | List all resource addresses or filter by pattern       |
| `state mv`   | Rename or move resources within or between state files |
| `state pull` | Download remote state to your local machine            |
| `state rm`   | Remove a resource from the state without destroying it |
| `state push` | Overwrite remote state with a local state file         |

## Viewing Resource Attributes with `state show`

To inspect resource attributes in the state file:

```
tofu state show aws_s3_bucket.finance
```

Example (truncated):

```
{
  "mode": "managed",
  "type": "aws_s3_bucket",
  "name": "finance",
  "provider": "provider[\"registry.opentofu.org/hashicorp/aws\"]",
  "instances": [
    {
      "attributes": {
        "bucket": "finance",
        "arn": "arn:aws:s3:::finance",
        "region": "us-west-2",
        "tags": {
          "Environment": "Production"
        },
        "versioning": [
          {
            "enabled": false,
            "mfa_delete": false
          }
        ]
      }
    }
  ]
}
```

## Listing Resources with `state list`

Show all resource addresses in your state:

```
tofu state list
```

Sample output:

```
aws_dynamodb_table.cars
aws_s3_bucket.finance-2020922
```

Filter by a resource pattern:

```
tofu state list aws_s3_bucket.cerberus-finance
# aws_s3_bucket.cerberus-finance
```

## Renaming Resources with `state mv`

Rename a resource address in your state file (or move it between state files).

1.  Initial Terraform configuration (`main.tf`):

    ```
    resource "aws_dynamodb_table" "state-locking" {
      name         = "state-locking"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "LockID"

      attribute {
        name = "LockID"
        type = "S"
      }
    }
    ```

2.  Existing state snapshot:

    ```
    {
      "resources": [
        {
          "mode": "managed",
          "type": "aws_dynamodb_table",
          "name": "state-locking",
          "provider": "provider[\"registry.opentofu.org/hashicorp/aws\"]"
        }
      ]
    }
    ```

3.  Rename in state:

    ```
    tofu state mv \
      aws_dynamodb_table.state-locking \
      aws_dynamodb_table.state-locking-db

    Move "aws_dynamodb_table.state-locking" to "aws_dynamodb_table.state-locking-db"
    Successfully moved 1 object(s).
    ```

4.  Update configuration:

    ```
    resource "aws_dynamodb_table" "state-locking-db" {
      name         = "state-locking"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "LockID"

      attribute {
        name = "LockID"
        type = "S"
      }
    }
    ```

5.  Verify no pending changes:

    ```
    tofu apply
    # Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
    ```

## Downloading Remote State with `state pull`

Fetch and view your remote state locally:

```
tofu state pull
```

Example:

```
{
  "version": 4,
  "terraform_version": "1.6.1",
  "serial": 0,
  "lineage": "b6e2cf0e...",
  "resources": [
    {
      "mode": "managed",
      "type": "aws_dynamodb_table",
      "name": "state-locking-db",
      "provider": "provider[\"registry.opentofu.org/hashicorp/aws\"]",
      "instances": [
        {
          "attributes": {
            "hash_key": "LockID",
            "billing_mode": "PAY_PER_REQUEST"
            ...
          }
        }
      ]
    }
  ]
}
```

You can pipe into [jq](https://stedolan.github.io/jq/) to filter:

```
tofu state pull \
  | jq '.resources[]
       | select(.name=="state-locking-db")
       | .instances[].attributes.hash_key'
# "LockID"
```

## Removing Resources from State with `state rm`

When you need Terraform/OpenTofu to stop managing a resource—but keep it running in the cloud—use:

```
tofu state rm aws_s3_bucket.finance-2020922
```

Sample output:

```
Acquiring state lock. This may take a few moments...
Removed aws_s3_bucket.finance-2020922
Successfully removed 1 resource instance(s).
Releasing state lock. This may take a few moments...
```

> [!important]
> **Warning**
>
> `state rm` only removes the resource from the Terraform/OpenTofu state—it does **not** delete the actual resource in your cloud provider.

After removing, delete the corresponding `resource` block in your configuration.

## Overwriting Remote State with `state push`

Use this command to replace the remote state with a local file. OpenTofu will refuse if the lineages don’t match:

```
tofu state push ./randomstate/terraform.tfstate
# Failed to write state: cannot import state with lineage "1dc19ee8-..." over unrelated state with lineage "6d167ba6-..."
```

To force an overwrite (use with extreme caution):

```
tofu state push --force ./randomstate/terraform.tfstate
```

> [!important]
> **Warning**
>
> Forcing a push can irreversibly corrupt your remote state. Always back up your existing state before using `--force`.

---

## Links and References

- [OpenTofu Documentation](https://docs.opentofu.org/)
- [jq – JSON processor](https://stedolan.github.io/jq/)
- [Terraform State Commands](https://developer.hashicorp.com/terraform/cli/commands/state)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/dd54768d-8454-44bd-bab2-99f8f7b5f145/lesson/9b09fce5-4f20-4cfa-91cd-56c55310f7c3)**
>
> Watch video content
