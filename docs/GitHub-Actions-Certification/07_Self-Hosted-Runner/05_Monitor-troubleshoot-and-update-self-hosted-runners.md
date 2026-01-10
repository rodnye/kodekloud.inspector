# Monitor troubleshoot and update self hosted runners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Self-Hosted-Runner/Monitor-troubleshoot-and-update-self-hosted-runners)

---

## Table of Contents

- Monitor troubleshoot and update self hosted runners
  - 1. Checking Runner Status in the GitHub UI
  - 2. Diagnosing Network Connectivity
  - 3. Reviewing Runner Application Logs
  - 4. Monitoring via systemd and journalctl (Linux)
  - 5. Triggering and Tracking a Workflow
  - 6. Updating Runners and Verifying Docker
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Self Hosted Runner

# Monitor troubleshoot and update self hosted runners

Self-hosted runners let you run GitHub Actions on your own infrastructure, but they can fail due to configuration, connectivity, or environment issues. In this guide, we’ll walk through:

1.  Checking runner status in the GitHub UI
2.  Diagnosing network connectivity
3.  Reviewing runner application logs
4.  Monitoring via systemd and journalctl
5.  Triggering and tracking workflows
6.  Updating runners and verifying Docker availability

For more details, visit GitHub’s official docs on [Monitoring self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/monitoring-self-hosted-runners).

---

## 1\. Checking Runner Status in the GitHub UI

Navigate to **Settings > Actions > Runners** in your repository (or organization) to see all self-hosted runners, their labels, and their status:

![The image shows a GitHub documentation page about managing self-hosted runners, specifically focusing on checking the status of a self-hosted runner. It includes navigation instructions and status descriptions for the runners.](https://kodekloud.com/kk-media/image/upload/v1752876419/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-managing-self-hosted-runners-status.jpg)

Example workflow using a self-hosted Linux runner labeled `prod`:

```
name: Testing Self-Hosted Runner
on:
  workflow_dispatch:
jobs:
  testing:
    runs-on:
      - self-hosted
      - linux
      - prod
    steps:
      - name: Echo Content
        run: |
          echo "OK"
          sleep 1500s
```

After dispatching, the runner appears as **Active** under Settings:

![The image shows a GitHub settings page for a repository, specifically the "Runners" section under "Actions," displaying a self-hosted runner named "prod-ubuntu-runner" with an idle status.](https://kodekloud.com/kk-media/image/upload/v1752876420/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-repo-settings-runners-prod-ubuntu.jpg)

---

## 2\. Diagnosing Network Connectivity

The runner provides `run.sh` with a `--check` flag to verify connectivity to GitHub services. Run:

```
./run.sh --check \
  --url https://github.com/YOUR-ORG/YOUR-REPO \
  --pat YOUR_PERSONAL_ACCESS_TOKEN
```

> [!important]
> **Note**
>
> Generate a classic personal access token with the `workflow` scope under **Settings > Developer settings > Personal access tokens**.

![The image shows a GitHub settings page for managing personal access tokens, listing several tokens with their expiration dates and usage details.](https://kodekloud.com/kk-media/image/upload/v1752876421/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-settings-personal-access-tokens.jpg)

Successful checks look like:

```
✓ Connected to GitHub
Current runner version: '2.315.0'
✓ Git certificate/proxy validation
✓ Node.js certificate/proxy validation
...
```

![The image shows a terminal window with logs indicating successful Git and Node.js certificate/proxy validation checks. The checks have passed, and the runner listener has exited with a return code of 0.](https://kodekloud.com/kk-media/image/upload/v1752876423/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/git-nodejs-certificate-validation-logs.jpg)

If any test fails, inspect the `_diag` log:

```
cat /home/admin/actions-runner/_diag/InternetCheck_YYYYMMDD-HHMMSS-utc.log
```

> [!important]
> **Warning**
>
> Disabling TLS verification reduces security. Use only for temporary troubleshooting:
>
> ```
> export GITHUB_ACTIONS_RUNNER_TLS_NO_VERIFY=1
> ./config.sh --url https://github.com/ORG/REPO --token TOKEN
> ./run.sh
> ```

---

## 3\. Reviewing Runner Application Logs

All runner logs reside in the `_diag` directory of your runner installation:

```
ls /home/admin/actions-runner/_diag/
```

Refer to GitHub’s [self-hosted runner logs documentation](https://docs.github.com/en/actions/hosting-your-own-runners/monitoring-self-hosted-runners) for file descriptions.

![The image shows a GitHub documentation page about managing self-hosted runners, specifically focusing on reviewing application log files and using journalctl for monitoring. The sidebar lists various related topics under GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876424/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-actions-self-hosted-runners-log-files.jpg)

---

## 4\. Monitoring via systemd and journalctl (Linux)

When installed as a service, manage and view logs using `systemctl` and `journalctl`. The service name follows:

```
actions.runner.<ORG>-<REPO>.<RUNNER_NAME>.service
```

Install and start:

```
cd actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
```

Verify status:

```
systemctl status actions.runner.octo-org-octo-repo.runner01.service
```

Stream real-time logs:

```
sudo journalctl -u actions.runner.octo-org-octo-repo.runner01.service -f
```

![The image shows a GitHub documentation page about monitoring and troubleshooting self-hosted runners, with navigation options for different operating systems and a sidebar with related topics.](https://kodekloud.com/kk-media/image/upload/v1752876425/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-monitoring-troubleshooting-runners-docs.jpg)

Example log output:

```
Apr 05 11:52:32 runner01 runsvc.sh[962]: Starting Runner listener with startup type: service
Apr 05 11:52:32 runner01 runsvc.sh[962]: ✔ Connected to GitHub
Apr 05 11:52:33 runner01 runsvc.sh[962]: Listening for Jobs
```

---

## 5\. Triggering and Tracking a Workflow

Dispatch your workflow (`workflow_dispatch`) and watch both the service logs and GitHub Actions UI. In the Actions tab, monitor status, duration, and logs:

![The image shows a GitHub Actions interface displaying a list of workflow runs, including their status, branch, and execution time.](https://kodekloud.com/kk-media/image/upload/v1752876426/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-actions-workflow-runs-status.jpg)

When running, service logs will indicate job execution:

![The image shows a GitHub Actions interface with a workflow titled "Testing Self-Hosted Runner" and a list of workflow runs. The sidebar displays various workflow options and management tools.](https://kodekloud.com/kk-media/image/upload/v1752876427/notes-assets/images/GitHub-Actions-Certification-Monitor-troubleshoot-and-update-self-hosted-runners/github-actions-testing-self-hosted-runner.jpg)

```
Apr 05 11:59:39 runner01 runsvc.sh[962]: 2024-04-05 08:59:39Z: Running job: testing
```

---

## 6\. Updating Runners and Verifying Docker

Keep your runner and Docker up-to-date to avoid unexpected failures:

| Command                                           | Purpose                                        |
| ------------------------------------------------- | ---------------------------------------------- |
| `./svc.sh remove && ./config.sh --unattended ...` | Remove old config and reconfigure runner       |
| Follow GitHub’s \\[runner update guide\\]         | Download and install the latest runner release |
| `sudo systemctl is-active docker.service`         | Check Docker service status                    |

> [!important]
> **Note**
>
> If Docker is not found, container actions will fail:
>
> ```
> [ERR StepsRunner] FileNotFoundException: File not found: 'docker'
> ```
>
> Install Docker with [official instructions](https://docs.docker.com/engine/install/).

| Issue                          | Symptom                                   | Resolution                                     |
| ------------------------------ | ----------------------------------------- | ---------------------------------------------- |
| Outdated runner                | Workflow errors or deprecation warnings   | Update via GitHub runner update guide          |
| Missing Docker                 | `FileNotFoundException: 'docker'` in logs | Install and start `docker.service`             |
| Network / SSL certificate fail | Connectivity checks fail                  | Update certificates or set TLS\\\_NO\\\_VERIFY |

---

## Links and References

- [GitHub Actions: Hosting your own runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Runner update documentation](https://github.com/actions/runner/blob/main/docs/runner-update.md)
- [Monitor self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/monitoring-self-hosted-runners)
- [Docker Engine installation](https://docs.docker.com/engine/install/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/193e91c4-d6e8-4fa0-9cac-5ba4fddcc992)**
>
> Watch video content
