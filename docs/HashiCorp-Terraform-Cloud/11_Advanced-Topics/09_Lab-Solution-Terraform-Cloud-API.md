# Lab Solution Terraform Cloud API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Lab-Solution-Terraform-Cloud-API)

---

## Table of Contents

- Lab Solution Terraform Cloud API
  - 1. Authenticate and Prepare
  - 2. Retrieve the Workspace ID
  - 3. Define Variable Payloads
  - 4. Create Workspace Variables via API
  - 5. Trigger a Terraform Run via API
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Lab Solution Terraform Cloud API

Terraform Cloud’s REST API enables robust automation and integration for infrastructure provisioning. Teams can use it to:

| API Workflow          | Description                                           |
| --------------------- | ----------------------------------------------------- |
| CI/CD Integration     | Trigger Terraform runs from pipelines                 |
| State & Data Query    | Programmatically retrieve Terraform state and outputs |
| Self-Service Portals  | Build user-facing interfaces for provisioning         |
| Custom CLI Automation | Enhance scripts with API-driven capabilities          |

In this lab you will:

1.  Authenticate via the CLI
2.  Configure workspace variables
3.  Initiate a Terraform run using the API

![The image shows a KodeKloud lab interface for Terraform Cloud API Driven Workflows, featuring a task description on the left and a Visual Studio Code editor on the right with instructions for opening a terminal and copying text.](https://kodekloud.com/kk-media/image/upload/v1752878704/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/kodekloud-terraform-cloud-api-workflows.jpg)

---

## 1\. Authenticate and Prepare

Log in to Terraform Cloud via CLI to obtain your API credentials:

```
terraform login
```

> [!important]
> **Note**
>
> `terraform login` opens a browser for authentication and saves your token in `~/.terraform.d/credentials.tfrc.json`.

Clone the sample repository and run the setup script:

```
git clone https://github.com/hashicorp/tfc-getting-started.git
cd tfc-getting-started
scripts/setup.sh
```

In the Terraform Cloud UI, navigate to **User Settings → Tokens** and create a new API token:

![The image shows a dialog box titled "Create API token" with a field for a description and buttons to create the token or cancel.](https://kodekloud.com/kk-media/image/upload/v1752878705/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/create-api-token-dialog-box.jpg)

Export your token and organization name as environment variables (replace `MYORGNAME` with your org):

```
export TOKEN=$(grep token ~/.terraform.d/credentials.tfrc.json | cut -d '"' -f4)
export ORG="MYORGNAME"
```

> [!important]
> **Warning**
>
> Keep your `TOKEN` secure. Do not commit it to source control or share it publicly.

---

## 2\. Retrieve the Workspace ID

Every Terraform Cloud workspace has a unique ID. Store it in an environment variable:

```
export WORKSPACE_ID=$(
  curl -s \
    --header "Authorization: Bearer $TOKEN" \
    https://app.terraform.io/api/v2/organizations/$ORG/workspaces/$WORKSPACE_NAME \
  | jq -r '.data.id'
)
```

You can also copy the workspace ID from the Terraform Cloud UI under your workspace name:

![The image shows a Terraform Cloud workspace overview for "devops-aws-hashicat-dev," displaying details of the latest run, including resources, Terraform version, and run status.](https://kodekloud.com/kk-media/image/upload/v1752878706/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/terraform-cloud-workspace-devops-aws.jpg)

Validate that your environment variables are set correctly:

```
printenv | grep -E 'TOKEN|ORG|WORKSPACE_ID'
```

---

## 3\. Define Variable Payloads

Create three JSON payloads in the `json/` directory to configure workspace variables:

| File               | Key         | Value        | Category  | Sensitive | HCL   |
| ------------------ | ----------- | ------------ | --------- | --------- | ----- |
| `placeholder.json` | placeholder | placedog.net | terraform | false     | false |
| `width.json`       | width       | 800          | terraform | false     | false |
| `height.json`      | height      | 600          | terraform | false     | false |

```
// json/placeholder.json
{
  "data": {
    "type": "vars",
    "attributes": {
      "key": "placeholder",
      "value": "placedog.net",
      "category": "terraform",
      "hcl": false
    }
  }
}
```

```
// json/width.json
{
  "data": {
    "type": "vars",
    "attributes": {
      "key": "width",
      "value": "800",
      "category": "terraform",
      "hcl": false,
      "sensitive": false
    }
  }
}
```

```
// json/height.json
{
  "data": {
    "type": "vars",
    "attributes": {
      "key": "height",
      "value": "600",
      "category": "terraform",
      "hcl": false
    }
  }
}
```

Refer to the [Workspace Variables API documentation](https://www.terraform.io/cloud-docs/api-docs/workspaces-variables) for details on the `POST /workspaces/:id/vars` endpoint:

![The image shows a section of the Terraform documentation, specifically detailing how to create a variable using a POST request in the Workspace Variables API. It includes parameters, descriptions, and a request body structure.](https://kodekloud.com/kk-media/image/upload/v1752878707/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/terraform-workspace-variables-api-post-request.jpg)

---

## 4\. Create Workspace Variables via API

Switch into the JSON directory and run the following `curl` commands:

```
cd tfc-getting-started/json


curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @placeholder.json \
  https://app.terraform.io/api/v2/workspaces/$WORKSPACE_ID/vars | jq


curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @width.json \
  https://app.terraform.io/api/v2/workspaces/$WORKSPACE_ID/vars | jq


curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @height.json \
  https://app.terraform.io/api/v2/workspaces/$WORKSPACE_ID/vars | jq
```

Refresh the **Variables** page in the Terraform Cloud UI to confirm the new variables:

![The image shows a Terraform Cloud interface displaying workspace variables, including keys like "height" and "width" with their respective values and categories. The sidebar includes navigation options such as Workspaces, Overview, Runs, States, Variables, and Settings.](https://kodekloud.com/kk-media/image/upload/v1752878708/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/terraform-cloud-workspace-variables-interface.jpg)

---

## 5\. Trigger a Terraform Run via API

Prepare the `apply.json` payload to create a run:

```
// apply.json
{
  "data": {
    "attributes": {
      "is-destroy": false,
      "message": "Terraform Cloud API is Magic!"
    },
    "type": "runs",
    "relationships": {
      "workspace": {
        "data": {
          "type": "workspaces",
          "id": "REPLACEME"
        }
      }
    }
  }
}
```

Replace `REPLACEME` with your `$WORKSPACE_ID`:

```
sed -i "s/REPLACEME/$WORKSPACE_ID/" apply.json
```

> [!important]
> **Note**
>
> On macOS, use `sed -i ''` for inline replacements.

Using the [Runs API documentation](https://www.terraform.io/cloud-docs/api-docs/runs), execute:

```
curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  --request POST \
  --data @apply.json \
  https://app.terraform.io/api/v2/runs | jq
```

Monitor the run status (pending, planned, applied) in the Terraform Cloud UI:

![The image shows a Terraform Cloud interface with a run triggered, displaying the status of a plan and cost estimation, and an "Apply pending" section with a comment box for confirmation.](https://kodekloud.com/kk-media/image/upload/v1752878710/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-API/terraform-cloud-run-status-plan-cost.jpg)

---

## Conclusion

You have successfully:

- Authenticated to Terraform Cloud via CLI
- Used the Workspace Variables API to set variables
- Triggered a Terraform run through the Runs API

Next steps: explore additional API endpoints for run cancellation, policy checks, cost estimation, and more.

## Links and References

- [Terraform Cloud API Reference](https://www.terraform.io/cloud-docs/api-docs)
- [Workspace Variables API](https://www.terraform.io/cloud-docs/api-docs/workspaces-variables)
- [Runs API](https://www.terraform.io/cloud-docs/api-docs/runs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/71ebc4e3-2ed9-4532-9d8c-d11cb406fd68)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/7b8d1053-74a0-4a4b-8733-66dc59152ba5)**
>
> Practice lab
