# DynamoDB as a Locking Mechanism - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Managing-Remote-State-with-Terragrunt/DynamoDB-as-a-Locking-Mechanism)

---

## Table of Contents

- DynamoDB as a Locking Mechanism
  - Understanding Terraform & Terragrunt State Locks
  - Configuring Remote State in Terragrunt
  - Handling Stuck Locks
  - Further Reading and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Managing Remote State with Terragrunt

# DynamoDB as a Locking Mechanism

Leveraging **AWS DynamoDB** for state locking is a best practice when using Terraform or Terragrunt in team environments. By coordinating locks through DynamoDB, you ensure that only one operation can modify your infrastructure state at a time, eliminating deployment conflicts and race conditions.

- Guarantees serialized state modifications
- Prevents concurrent `terraform apply` or `terragrunt apply` runs
- Provides a scalable, highly available lock backend in AWS

![The image describes the benefits of using Terraform/Terragrunt locks with AWS DynamoDB, highlighting state file locking, prevention of multiple user access, and the use of DynamoDB for state locking.](https://kodekloud.com/kk-media/image/upload/v1752884265/notes-assets/images/Terragrunt-for-Beginners-DynamoDB-as-a-Locking-Mechanism/terraform-terragrunt-dynamodb-locking-benefits.jpg)

## Understanding Terraform & Terragrunt State Locks

Terraform and Terragrunt implement a locking mechanism to safeguard the `.tfstate` file during operations that write state changes. When one user or process holds the lock:

- All other operations are blocked until the lock is released
- Accidental overwrites and drift are prevented
- Collaboration becomes predictable and conflict-free

Here’s a quick overview of how the components fit together:

| Component      | Role                                     | Example Configuration                         |
| -------------- | ---------------------------------------- | --------------------------------------------- |
| S3 Backend     | Stores the Terraform state file securely | `bucket = "my-terraform-state-bucket"`        |
| DynamoDB Table | Manages concurrent locks                 | `dynamodb_table = "terraform-locks"`          |
| Key Path       | Namespaces state per environment/module  | `key = "${path_relative_to_include()}/state"` |

## Configuring Remote State in Terragrunt

Terragrunt can automatically create the required DynamoDB table when you define your remote state. Add the following block to your `terragrunt.hcl`:

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state-bucket"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

> [!important]
> **Note**
>
> Terragrunt checks for the existence of the DynamoDB table and creates it if missing—no manual setup required. Ensure your IAM role has permissions for `dynamodb:CreateTable`.

## Handling Stuck Locks

Network interruptions or process crashes can leave stale locks in DynamoDB. To resolve this, use the Terraform CLI’s `force-unlock` command:

```
terraform force-unlock LOCK_ID
```

Replace `LOCK_ID` with the identifier from the error message. This removes the lock entry in DynamoDB and lets you proceed.

> [!important]
> **Warning**
>
> `force-unlock` bypasses safety checks. Only use it when you are certain no other process is applying changes.

---

## Further Reading and References

- [Terraform Remote State](https://www.terraform.io/language/state/remote)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Managing State Locking](https://www.terraform.io/language/state/locking)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/2eef056a-8494-4e5d-acf0-25b04fad55c4/lesson/5ba2c408-e273-4c0a-b42c-9ce0fae2e754)**
>
> Watch video content
