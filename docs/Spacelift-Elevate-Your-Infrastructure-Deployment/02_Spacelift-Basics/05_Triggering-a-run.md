# Triggering a run - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Triggering-a-run)

---

## Table of Contents

- Triggering a run
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Triggering a run

After configuring the AWS access key and secret access key (marked as secret), your environment is now fully set up. Return to your stack and trigger another run. There are two simple ways to initiate a run:

1.  Push a change to GitHub.
2.  Manually select the **Trigger** option.

Once initiated, the system processes the run and generates a Terraform plan. You can monitor the detailed initialization steps in the console output. For instance, you might see logs like the following during the initialization phase:

```
Downloading source code...
source code is GO
Setting up mounted files...
Mounted files are GO
Configuring file permissions...
Permissions are GO
Evaluating run initialization policy...
No initialization policies attached
Pulling Docker image public.ecr.aws/spacelift/runner-terraform:latest...
Docker image is GO
Downloading Terraform 1.4.6...
Terraform 1.4.6 download is GO (/bin/terraform)
Starting Docker container...
Docker container is GO
Verifying container image prerequisites...
Successfully verified container image prerequisites
```

At this stage, the run is in an unconfirmed state. Terraform has generated a plan outlining the proposed changes, which includes details such as:

- public_dns
- public_ip
- secondary_private_ips
- security_groups
- source_dest_check
- subnet_id
- tags = { "Name" = "app-server" }
- tags_all = { "Name" = "app-server" }
- tenancy
- user_data
- user_data_base64 (known after apply)
- user_data_replace_on_change = false
- vpc_security_group_ids (known after apply)

Review the plan carefully. If you disagree with the proposed infrastructure changes, you can discard the run. Otherwise, proceed by selecting **Confirm**, which will trigger the Terraform apply operation.

> [!important]
> **Review Carefully**
>
> Make sure to verify every detail of the plan before confirming the run to avoid unintended changes to your infrastructure.

When you confirm the plan, the Terraform apply operation begins. During this phase, you might observe output similar to the following:

```
Plan: 1 to add, 0 to change, 0 to destroy.


Changes to Outputs:
  * instance_id      = (known after apply)
  * instance_public_ip = (known after apply)


Changes are GO
Uploading the list of managed resources...
Please be aware that Run changes calculation includes Terraform output changes.
Resource list upload is GO
Generating JSON representation of the plan...
JSON representation is GO
Loading custom plan policy inputs...
* custom plan policy inputs found
No policies to evaluate
Uploading workspace...
workspace upload is GO
```

Once the apply operation is complete, the run transitions to a finished state. You can examine the logs to confirm a successful operation. For example, you might see messages such as:

```
[016Z4ZJX7X8SV9D5PZPH2HZ] Running @ custom hooks...
Applying changes...
aws_instance.app_server: Creating... [10s elapsed]
aws_instance.app_server: Still creating... [20s elapsed]
aws_instance.app_server: Still creating... [30s elapsed]
aws_instance.app_server: Creation complete after 33s [id=i-aadd255fc794a89b]


Apply complete! Resources: 1 added, 0 changed, 0 destroyed.


Outputs:


instance_id = "i-aadd255fc794a89b"
instance_public_ip = "34.229.176.97"
```

This final output confirms that one resource was successfully added, and it displays the resulting Terraform outputs. Your infrastructure has now been updated based on the applied changes.

For more detailed information on Terraform operations and best practices, consider visiting the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/d5fb7f0f-a264-4b8b-887a-e82c56422dda)**
>
> Watch video content
