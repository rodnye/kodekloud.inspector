# Designing an Agent Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Designing-an-Agent-Infrastructure)

---

## Table of Contents

- Designing an Agent Infrastructure
  - Hosted vs. Self-Hosted Agents
  - Viewing Agent Pools
  - Setting Up Self-Hosted Agents
  - Choosing the Right Infrastructure
  - Links and References
  - Watch Video
    - Hosted Agents
    - 1. Windows Self-Hosted Agent
    - 2. Docker-Based Agent
    - 3. Linux Agents
    - 4. macOS Agent
      - WSL Agent
      - Standalone Linux Server

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Designing an Agent Infrastructure

In this article, we’ll explore how to design and configure build agent infrastructure in [Azure DevOps](https://azure.microsoft.com/services/devops/). You’ll learn the differences between hosted and self-hosted agents, see how to launch agents on Windows, Linux, Docker, and macOS, and review best practices for scaling and customization.

## Hosted vs. Self-Hosted Agents

Build agents in Azure Pipelines fall into two categories:

| Feature             | Hosted Agents                     | Self-Hosted Agents                       |
| ------------------- | --------------------------------- | ---------------------------------------- |
| Management          | Microsoft-maintained              | You manage VMs, servers or containers    |
| Supported platforms | Windows, Linux, macOS             | Any OS you provision                     |
| Customization       | Preinstalled tools, limited tweak | Full control over tool versions & images |
| Scaling & cost      | Auto-scaled, pay-per-minute       | Optimize infrastructure & licensing      |

Host agents are turnkey and zero-maintenance, while self-hosted agents give you full control over the software stack and cost structure.

## Viewing Agent Pools

Navigate in Azure DevOps to **Organization settings** → **Agent pools** to see all your pools and agents:

![The image shows the "Agent pools" settings page in Azure DevOps, listing different agent pools such as Azure Pipelines, Default, Linux, and Mac. The interface includes options for adding a new pool and managing security settings.](https://kodekloud.com/kk-media/image/upload/v1752867837/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Designing-an-Agent-Infrastructure/azure-devops-agent-pools-settings.jpg)

Here you’ll find pools like **Azure Pipelines** (hosted), **Default**, **Linux**, and **Mac**.

### Hosted Agents

The **Azure Pipelines** pool contains Microsoft-hosted agents:

![The image shows the Azure DevOps interface, specifically the "Agent pools" section under "Organization Settings," displaying details of a hosted agent that is currently running a build.](https://kodekloud.com/kk-media/image/upload/v1752867838/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Designing-an-Agent-Infrastructure/azure-devops-agent-pools-interface.jpg)

- Always online and listening
- Supports Windows, Linux, and macOS jobs
- No infrastructure maintenance required

## Setting Up Self-Hosted Agents

Self-hosted agents run on machines you control—physical servers, cloud VMs, or containers. Below are step-by-step examples for Windows, Docker, Linux (WSL & standalone), and macOS.

### 1\. Windows Self-Hosted Agent

In the **Default** pool, you might see two offline Windows agents:

![The image shows an Azure DevOps interface displaying the "Agent pools" settings, with two agents listed as offline. The sidebar includes various options like Overview, Projects, and Security.](https://kodekloud.com/kk-media/image/upload/v1752867839/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Designing-an-Agent-Infrastructure/azure-devops-agent-pools-settings-offline.jpg)

To bring one online:

```
# Change into your agent folder
cd C:\agent


# Run the agent service
.\run.cmd
```

Sample output:

```
Scanning for tool capabilities.
Connecting to the server.
2024-09-26 17:57:45Z: Listening for Jobs
```

The agent is now online and ready to accept jobs.

> [!important]
> **Warning**
>
> Keep your `AZP_TOKEN` secure. Never commit it to source control or share publicly.

### 2\. Docker-Based Agent

Containerize your agent for easier scaling and reproducibility:

```
REM File: start.bat in your project’s azpbuild folder
docker run `
  -e AZP_URL="%AZP_URL%" `
  -e AZP_TOKEN="%AZP_TOKEN%" `
  -e AZP_POOL="Default" `
  -e AZP_AGENT_NAME="Docker Agent - Windows" `
  --name azp-agent-windows `
  azp:agent
```

Run it:

```
cd C:\Projects\agents\azpbuild
start.bat
```

Now both your native Windows agent and the containerized agent will appear online.

### 3\. Linux Agents

In the **Linux** pool you may have agents for WSL or standalone servers:

![The image shows an Azure DevOps interface displaying the settings for agent pools, specifically listing two Linux agents that are currently offline.](https://kodekloud.com/kk-media/image/upload/v1752867840/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Designing-an-Agent-Infrastructure/azure-devops-agent-pools-linux-offline.jpg)

#### WSL Agent

On Windows with WSL installed:

```
cd ~/myagent
./run.sh
```

You’ll see:

```
Scanning for tool capabilities.
Connecting to the server.
2024-09-26 17:57:45Z: Listening for Jobs
```

#### Standalone Linux Server

On a dedicated Linux VM (e.g., Arch, Ubuntu):

```
cd ~/myagent
./run.sh
```

Output is identical—just toggle the agent on or off as needed.

### 4\. macOS Agent

SSH into your Mac build host and start the agent:

```
ssh jeremy@Jeremys-Mac-Studio
cd ~/myagent
./run.sh
```

```
Scanning for tool capabilities.
Connecting to the server.
2024-09-26 17:57:45Z: Listening for Jobs
```

The macOS agent will show up under the **Mac** pool.

> [!important]
> **Note**
>
> Containerized agents simplify upgrades and scaling. Consider using Kubernetes to auto-scale your Docker-based agents.

## Choosing the Right Infrastructure

When architecting your agent setup, evaluate:

- **Target OS**: Windows, Linux, macOS
- **Management overhead**: Hosted zero-touch vs. self-hosted control
- **Customization needs**: Specific SDKs, Docker images, hardware
- **Scaling strategy**: Manual scaling, Kubernetes, or VM auto-scaling

Containerized, self-hosted agents strike a strong balance for most teams—offering full customization with industry-standard orchestration tools like [Kubernetes](https://kubernetes.io/).

---

## Links and References

- [Azure DevOps Services](https://azure.microsoft.com/services/devops/)
- [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/)
- [Docker Official Site](https://www.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/1ce91322-9996-4a39-ad43-e2d326dcc79a)**
>
> Watch video content
