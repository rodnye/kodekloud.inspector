# Building a Linux Self Hosted Build Agent with WSL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Building-a-Linux-Self-Hosted-Build-Agent-with-WSL)

---

## Table of Contents

- Building a Linux Self Hosted Build Agent with WSL
  - Current Agent Pools
  - Why Use WSL for Your Linux Agent?
  - Prerequisites
  - Installing the Linux Agent in WSL
  - Final Result
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Building a Linux Self Hosted Build Agent with WSL

If you’re on Windows and need to run Linux builds in Azure DevOps, you don’t need a separate VM. With Windows Subsystem for Linux (WSL), you can host both Windows and Linux agents on the same machine—saving resources and simplifying maintenance.

## Current Agent Pools

In Azure DevOps under **Organization Settings » Agent pools**, you’ll typically see:

| Pool Name       | Type                  | Agents                               |
| --------------- | --------------------- | ------------------------------------ |
| Azure Pipelines | Hosted                | (Disabled when using self-hosted)    |
| Default         | Self-hosted (Windows) | DigitalStorm, Docker Agent - Windows |

> [!important]
> **Note**
>
> Click **Add pool**, select **Self-hosted**, name it (e.g., `Linux self-hosted builders`), and optionally enable **Auto-provision this agent pool in all projects**.
> Once created, you’ll have a new Linux pool—let’s add an agent in WSL.

## Why Use WSL for Your Linux Agent?

[WSL](https://docs.microsoft.com/windows/wsl/) provides a full Linux environment on Windows without a virtual machine. Install packages, run scripts, and host a Linux build agent just like on a native Linux server.

![The image shows an Azure DevOps interface with a terminal window open, displaying a command prompt for a user on a system named "DIGITALSTORM."](https://kodekloud.com/kk-media/image/upload/v1752867794/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Building-a-Linux-Self-Hosted-Build-Agent-with-WSL/azure-devops-terminal-command-digitalstorm.jpg)

WSL has simplified my cross-platform builds for years by eliminating extra virtualization layers.

![The image shows an Azure DevOps interface indicating that no jobs have run on a specific agent pool. It includes navigation options on the left and a message prompting to run a pipeline.](https://kodekloud.com/kk-media/image/upload/v1752867795/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Building-a-Linux-Self-Hosted-Build-Agent-with-WSL/azure-devops-no-jobs-agent-pool.jpg)

## Prerequisites

- Windows 10 (2004+) or Windows Server 2022
- WSL2 enabled with a default Linux distro
- Azure DevOps organization and a Personal Access Token (PAT) with **Agent Pools** scope
- Administrator access to PowerShell or Command Prompt

## Installing the Linux Agent in WSL

1.  Download the Linux x64 agent tarball from your Azure DevOps **New agent** dialog.
2.  In WSL, copy the file:

    ```
    cp /mnt/c/Users/$(whoami)/Downloads/vsts-agent-linux-x64-*.tar.gz ~/Downloads/
    ```

3.  Create and navigate into the agent folder:

    ```
    mkdir ~/myagent && cd ~/myagent
    ```

4.  Extract the archive:

    ```
    tar zxvf ~/Downloads/vsts-agent-linux-x64-*.tar.gz
    ```

5.  Run the configuration script:

    ```
    ./config.sh
    ```

    Provide these details when prompted:
    - Accept EULA → **Y**
    - Server URL → `https://dev.azure.com/<yourOrganization>`
    - Authentication → press Enter for PAT, then paste your token
    - Agent pool → `Linux`
    - Agent name → `WSL Linux Builder`
    - Work folder → press Enter for default (`_work`)

    Example output:

    ```
    >> End User License Agreements:
    ...
    >> Connect:
    Enter server URL > https://dev.azure.com/yourOrganization
    ...
    Successfully added the agent
    2024-09-26 16:57:30Z: Settings Saved.
    ```

> [!important]
> **Warning**
>
> Keep your Personal Access Token secure. Do not check it into source control or share publicly.

6.  Start the agent:

    ```
    ./run.sh
    ```

    You should see:

    ```
    Scanning for tool capabilities.
    Connecting to the server.
    2024-09-26 16:57:51Z: Listening for Jobs
    ```

Your Linux agent will now appear in the pool:

![The image shows an Azure DevOps interface displaying the settings for an agent pool named "Linux," with one agent listed as "WSL Linux Builder" that is currently idle and enabled. The left sidebar includes various settings and options related to the organization and pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867796/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Building-a-Linux-Self-Hosted-Build-Agent-with-WSL/azure-devops-agent-pool-settings.jpg)

## Final Result

On the same Windows machine, you now have:

- A **Windows** self-hosted agent (Default pool)
- A **Linux** self-hosted agent (WSL Linux pool)

Choose the appropriate agent in your pipeline YAML or classic editor:

![The image shows the Azure DevOps interface displaying the "Agent pools" settings, with two agents listed: "DIGITALSTORM" (online) and "Docker Agent - Windows" (offline). The interface includes tabs for Jobs, Agents, Details, Security, Settings, Maintenance History, and Analytics.](https://kodekloud.com/kk-media/image/upload/v1752867798/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Building-a-Linux-Self-Hosted-Build-Agent-with-WSL/azure-devops-agent-pools-settings.jpg)

## Links and References

- [Azure DevOps Agent Pools](https://docs.microsoft.com/azure/devops/pipelines/agents/agents?view=azure-devops)
- [Windows Subsystem for Linux Documentation](https://docs.microsoft.com/windows/wsl/)
- [Creating a Personal Access Token](https://docs.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/6b9cf8b7-213b-43f5-9115-bdc812d01b0d)**
>
> Watch video content
