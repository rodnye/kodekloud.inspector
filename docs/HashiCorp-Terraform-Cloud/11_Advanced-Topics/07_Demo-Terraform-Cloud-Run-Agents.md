# Demo Terraform Cloud Run Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Demo-Terraform-Cloud-Run-Agents)

---

## Table of Contents

- Demo Terraform Cloud Run Agents
  - Table of Contents
  - Prerequisites
  - Creating an Agent Pool and Token
  - Installing and Running an Agent on Linux
  - Running an Agent in Docker
  - Agent Auto-Update Behavior
  - Configuring a Workspace for Agent Execution
  - Running Terraform via the Agent
  - Scaling with Multiple Agents
  - Managing Pools and Tokens
  - References
  - Watch Video

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Demo Terraform Cloud Run Agents

In this guide, we’ll walk through setting up Terraform Cloud’s self-hosted agents—a Business tier feature that allows Terraform runs to execute within your private network. By using agents, you eliminate the need to expose sensitive endpoints publicly, making them ideal for on-premises data centers, private VPCs, or any environment where Terraform Cloud cannot directly reach your infrastructure.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Creating an Agent Pool and Token](#creating-an-agent-pool-and-token)
3.  [Installing and Running an Agent on Linux](#installing-and-running-an-agent-on-linux)
4.  [Running an Agent in Docker](#running-an-agent-in-docker)
5.  [Agent Auto-Update Behavior](#agent-auto-update-behavior)
6.  [Configuring a Workspace for Agent Execution](#configuring-a-workspace-for-agent-execution)
7.  [Running Terraform via the Agent](#running-terraform-via-the-agent)
8.  [Scaling with Multiple Agents](#scaling-with-multiple-agents)
9.  [Managing Pools and Tokens](#managing-pools-and-tokens)
10. [References](#references)

## Prerequisites

- A Terraform Cloud organization on the Business tier
- Permissions to manage **Settings → Agents**
- Outbound TCP/443 connectivity to `app.terraform.io`

> [!important]
> **Note**
>
> Agents use a pull-based model and require **only outbound TCP/443** access to Terraform Cloud.

## Creating an Agent Pool and Token

An **Agent Pool** is a logical group of self-hosted agents. You scope pools to environments (e.g., `development`, `production`) and assign tokens for authentication.

| Component  | Description                                       | Example Command                         |
| ---------- | ------------------------------------------------- | --------------------------------------- |
| Agent Pool | Logical grouping of agents                        | Manage under **Settings → Agents**      |
| API Token  | Scoped to one pool; used by each registered agent | Created via the **Create token** button |
| Agent Name | Unique identifier for each host/container         | `east-dc-1`, `us-west-2`                |

1.  Navigate to **Settings → Agents** in your Terraform Cloud organization.
2.  Click **New Agent Pool**, name it (e.g., **development**), and save.
3.  In the pool’s page, click **Create token**, scope it to your data center or environment (e.g., `EastDC`), and copy the value.

> [!important]
> **Warning**
>
> Keep your agent tokens confidential. Rotate or revoke tokens regularly to maintain security.

## Installing and Running an Agent on Linux

Download and unzip the latest agent binary on any Linux host:

```
# Replace with the current stable version if newer
curl -Lo tfc-agent_1.3.1_linux_amd64.zip \
  https://releases.hashicorp.com/tfc-agent/1.3.1/tfc-agent_1.3.1_linux_amd64.zip
unzip tfc-agent_1.3.1_linux_amd64.zip
```

Set environment variables and start the agent:

```
export TFC_AGENT_TOKEN=<your_agent_pool_token>
export TFC_AGENT_NAME=east-dc-1
./tfc-agent
```

On launch, you’ll see a registration confirmation:

```
2022-10-05T12:14:31.806Z [INFO] core: Agent registered successfully with Terraform Cloud: agent.name=east-dc-1
```

![The image shows a software interface displaying agent pool information, including agent names, core versions, statuses, IDs, IP addresses, and last seen times. The sidebar includes navigation options like "Agents," "API tokens," and "Authentication."](https://kodekloud.com/kk-media/image/upload/v1752878665/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/agent-pool-interface-navigation-sidebar.jpg)

## Running an Agent in Docker

Alternatively, launch an agent as a Docker container:

```
export TFC_AGENT_TOKEN=<your_agent_pool_token>
export TFC_AGENT_NAME=east-dc-2
docker run -e TFC_AGENT_TOKEN -e TFC_AGENT_NAME hashicorp/tfc-agent:latest
```

This pulls the `latest` image, auto-updates its core if enabled, and registers to your specified pool.

## Agent Auto-Update Behavior

Agents check for newer core versions by default. Sample logs:

```
2022-10-05T12:14:30.066Z [INFO] agent: Core update is available: version=1.4.0
2022-10-05T12:14:31.061Z [INFO] agent: Core successfully updated: version=1.4.0
```

To manage updates manually, disable auto-updates under **Settings → Agents → \[Your Pool\]**.

## Configuring a Workspace for Agent Execution

1.  Go to **Workspaces → \[Your Workspace\]** in Terraform Cloud.
2.  Under **Settings → Execution Mode**, select **Agent**.
3.  Choose your **development** pool and save.

![The image shows a dashboard interface for a DevOps application, displaying details of a recent run, including policy checks, estimated cost increase, and resource changes. It includes navigation options like Overview, Runs, States, Variables, and Settings.](https://kodekloud.com/kk-media/image/upload/v1752878666/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/devops-dashboard-interface-recent-run.jpg)

![The image shows a Terraform Cloud workspace settings page with options for execution mode, including Remote, Local, and Agent. A warning indicates that the selected agent pool has no registered agents.](https://kodekloud.com/kk-media/image/upload/v1752878667/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/terraform-cloud-workspace-settings-warning.jpg)

![The image illustrates a datacenter setup with production and non-production environments, showing workloads, Vault, Kubernetes nodes, and an agent. It highlights outbound connectivity to HashiCorp Terraform Cloud via TCP/443, with no inbound connectivity required.](https://kodekloud.com/kk-media/image/upload/v1752878668/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/datacenter-setup-production-nonproduction.jpg)

## Running Terraform via the Agent

Trigger a run in the workspace. The agent logs will indicate progress:

```
2022-10-05T12:18:38.117Z [INFO] core: Job received: job.type=plan job.id=run-XXXXX
2022-10-05T12:19:38.105Z [INFO] terraform: Terraform CLI details: version=1.2.7
2022-10-05T12:19:38.717Z [INFO] terraform: Running terraform init
2022-10-05T12:19:48.210Z [INFO] terraform: Running terraform plan
```

Back in the UI, you’ll see the plan complete:

![The image shows a Terraform Cloud interface where a run has been triggered via the UI, indicating that the plan finished with no changes needed to the infrastructure. It includes details like the commit message, execution mode, and agent pool information.](https://kodekloud.com/kk-media/image/upload/v1752878669/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/terraform-cloud-run-triggered-no-changes.jpg)

When changes are pushed, the agent will perform `apply` as well:

![The image shows a Terraform Cloud interface displaying the progress of a run, including details like configuration, commit, and execution mode, with steps such as plan, cost estimation, policy check, and apply status.](https://kodekloud.com/kk-media/image/upload/v1752878670/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/terraform-cloud-run-progress-interface.jpg)

## Scaling with Multiple Agents

To increase throughput, register additional agents to the same pool. Your Terraform Cloud license determines the maximum concurrent agents.

![The image shows a user interface for managing agent pools in Terraform Cloud, displaying details such as agent names, core versions, statuses, IDs, IP addresses, and last seen times. The sidebar includes options for organization settings, integrations, and security.](https://kodekloud.com/kk-media/image/upload/v1752878672/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/terraform-cloud-agent-pools-ui.jpg)

## Managing Pools and Tokens

- Create multiple tokens per pool or assign one per agent.
- Rotate or revoke tokens under **Settings → Agents → \[Your Pool\] → Tokens**.
- Delete agents or pools when no longer in use—ensure they aren’t linked to active workspaces.

![The image shows a settings page for an "Agent pool" named "development" with options to grant access to workspaces and manage tokens. The left sidebar displays various organization settings and integrations.](https://kodekloud.com/kk-media/image/upload/v1752878673/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/agent-pool-development-settings-page.jpg)

![The image shows a user interface for managing workspaces and tokens, with options to grant access to workspaces and manage tokens, including creating and revoking them. The sidebar includes navigation options like General, Tags, Teams, and Agents.](https://kodekloud.com/kk-media/image/upload/v1752878675/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Run-Agents/workspace-management-ui-tokens-sidebar.jpg)

Terraform Cloud Agents enable secure, scalable execution of Terraform runs within your network perimeter, giving you full control over connectivity and resources.

## References

- [Terraform Cloud Agents Documentation](https://developer.hashicorp.com/terraform/cloud-guides/agents)
- [Terraform Cloud Workspaces](https://www.terraform.io/cloud-docs/workspaces)
- [HashiCorp Releases](https://releases.hashicorp.com/tfc-agent/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/46391a96-8167-4743-8efc-a88d527d2cd0)**
>
> Watch video content
