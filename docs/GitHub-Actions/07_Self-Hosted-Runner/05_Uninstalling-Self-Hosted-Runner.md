# Uninstalling Self Hosted Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Self-Hosted-Runner/Uninstalling-Self-Hosted-Runner)

---

## Table of Contents

- Uninstalling Self Hosted Runner
  - Removing a Runner via the GitHub UI
  - Cleaning Up the Runner Host
  - Removing a Runner at Organization or Enterprise Level
  - Comparison of Removal Methods
  - References
  - Watch Video
  - Practice Lab
    - Using the Configuration Script
    - Stopping the Runner Process Manually

---

## Content

GitHub Actions

Self Hosted Runner

# Uninstalling Self Hosted Runner

In this guide, you’ll learn how to remove a GitHub Actions self-hosted runner at the repository, organization, or enterprise level. You can either delete it via the GitHub UI or clean up directly on the runner host using the configuration script.

## Removing a Runner via the GitHub UI

1.  Navigate to your repository’s **Settings** > **Actions** > **Runners**.
2.  Click the runner you want to remove.

![The image shows a GitHub repository settings page, specifically the "Runners" section under "Actions," displaying a self-hosted runner named "prod-ubuntu-runner" with an idle status.](https://kodekloud.com/kk-media/image/upload/v1752876781/notes-assets/images/GitHub-Actions-Uninstalling-Self-Hosted-Runner/github-repo-settings-runners-prod-ubuntu.jpg)

3.  On the runner details page, click **Remove**.

![The image shows a GitHub Actions settings page for a self-hosted runner named "prod-ubuntu-runner" with no active jobs running. There is a "Remove" button highlighted in red.](https://kodekloud.com/kk-media/image/upload/v1752876782/notes-assets/images/GitHub-Actions-Uninstalling-Self-Hosted-Runner/github-actions-self-hosted-runner-settings.jpg)

> [!important]
> **MFA Verification**
>
> If you have MFA enabled, GitHub will prompt you for your authentication code. Once verified, the runner is permanently removed from the repository.

## Cleaning Up the Runner Host

After deleting the runner in the UI, you may want to wipe its local installation, especially if you plan to repurpose the machine.

### Using the Configuration Script

Run the `config.sh remove` command on the host. Replace `<TOKEN>` with the token shown in your runner settings.

```
./config.sh remove --token BDEP64UGVZVU2AQTIMJUN3FG7ZKU --unattended
```

This command will:

- Uninstall the runner application
- Remove configuration files
- Unregister the runner from GitHub

> [!important]
> **Use the Correct Token**
>
> Ensure you copy the exact token from your repository’s runner settings. An invalid token will prevent the runner from unregistering.

### Stopping the Runner Process Manually

If you skip the config script, simply terminate the running service or process (e.g., `run.sh`). The runner will appear as **offline** in GitHub and will not accept new jobs.

According to the [GitHub documentation](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners), any self-hosted runner offline for over 14 days is automatically removed.

![The image shows a GitHub documentation page about removing self-hosted runners, with instructions and notes on the process.](https://kodekloud.com/kk-media/image/upload/v1752876783/notes-assets/images/GitHub-Actions-Uninstalling-Self-Hosted-Runner/github-remove-self-hosted-runners-docs.jpg)

## Removing a Runner at Organization or Enterprise Level

The steps are identical for organization or enterprise runners:

1.  Go to **Organization Settings** or **Enterprise Settings** > **Actions** > **Runners**.
2.  Select the runner and click **Remove**.
3.  On the runner host, run the same `config.sh remove` command or stop the service.

![The image shows a GitHub Docs page about removing a runner from an organization, with instructions and notes on the process. The sidebar lists various GitHub Actions topics.](https://kodekloud.com/kk-media/image/upload/v1752876784/notes-assets/images/GitHub-Actions-Uninstalling-Self-Hosted-Runner/github-docs-remove-runner-instructions.jpg)

## Comparison of Removal Methods

| Method                     | Scope                 | Effect                                         | Command                              |
| -------------------------- | --------------------- | ---------------------------------------------- | ------------------------------------ |
| GitHub UI                  | Repo, Org, Enterprise | Immediate UI removal                           | N/A                                  |
| config.sh remove           | Runner host           | Uninstalls & unregisters runner                | `./config.sh remove --token <TOKEN>` |
| Manual process termination | Runner host           | Marks runner offline, auto-prune after 14 days | `kill <PID>` or stop service         |

## References

- [GitHub Actions: Removing Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/removing-self-hosted-runners)
- [GitHub Actions Administration](https://docs.github.com/en/actions/learn-github-actions/managing-actions-workflows)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/8d91a711-49f5-449c-9531-393bfdc7d9b5/lesson/3898b06b-fbfe-4b71-a3e6-95711c9a4028)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/8d91a711-49f5-449c-9531-393bfdc7d9b5/lesson/e719e9ed-b770-408e-a5c4-e55725fd7ef5)**
>
> Practice lab
