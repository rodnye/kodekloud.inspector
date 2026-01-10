# Types of Runners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Self-Hosted-Runner/Types-of-Runners)

---

## Table of Contents

- Types of Runners
  - GitHub-Hosted Runners
  - Self-Hosted Runners
  - Comparison: GitHub-Hosted vs. Self-Hosted
  - Links and References
  - Watch Video
    - Supported Environments
    - Example: Matrix Build Workflow
    - Key Benefits
    - Installation and Configuration

---

## Content

GitHub Actions

Self Hosted Runner

# Types of Runners

In this article, we’ll explore the different types of GitHub Actions runners available for your workflows. GitHub Actions runners execute jobs by automatically cloning your repository, installing dependencies, and running your specified commands. You can choose between GitHub-hosted runners or self-hosted runners depending on your needs.

## GitHub-Hosted Runners

GitHub-hosted runners are virtual machines maintained by GitHub. Each time a workflow is triggered, you get a fresh environment with pre-installed tools, reducing setup time and maintenance overhead.

### Supported Environments

- Ubuntu (ubuntu-latest, ubuntu-22.04, ubuntu-20.04)
- Windows (windows-latest, windows-2019)
- macOS (macos-latest, macos-11)

### Example: Matrix Build Workflow

The following workflow runs unit tests across multiple OS environments using [job matrices](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs):

```
name: Cross-Platform Tests
on: [push, pull_request]


jobs:
  unit-tests:
    name: Unit Tests on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3


      - name: Setup Node.js on ${{ matrix.os }}
        uses: actions/setup-node@v3
        with:
          node-version: '16'


      - name: Run Tests
        run: npm test
```

GitHub-hosted runners are available in two performance tiers:

- **Standard runners**: Suitable for most CI/CD tasks with moderate CPU, memory, and SSD.
- **Larger runners**: (GitHub Teams and Enterprise Cloud) Offer more CPU cores, RAM, and disk space.

> [!important]
> **Note**
>
> GPU-enabled GitHub-hosted runners are currently in beta. [Apply for the beta program](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#gpu-enabled-runners) if you require GPU resources.

![The image provides hardware specifications for GitHub-hosted runners, detailing CPU, RAM, and SSD configurations for standard and larger virtual machines, along with supported operating systems. It also mentions GitHub Team, GPU-enabled runners in beta, and GitHub Enterprise.](https://kodekloud.com/kk-media/image/upload/v1752876778/notes-assets/images/GitHub-Actions-Types-of-Runners/github-runners-hardware-specifications.jpg)

## Self-Hosted Runners

Self-hosted runners run on machines that you provision and manage. They provide full control over hardware, operating system, and installed software—ideal for custom requirements or compliance needs.

### Key Benefits

- Custom OS and software configurations
- Compliance with strict security policies
- Dedicated compute resources (no shared queue delays)
- Horizontal scaling and autoscaling
- Geographic placement for low-latency or data residency

Self-hosted runners can be registered at the repository, organization, or enterprise level. To add a runner at the repository level:

1.  Navigate to **Settings → Actions → Runners**.
2.  Click **Add runner**, then select your operating system and architecture.

![The image shows a GitHub interface for adding a new self-hosted runner, with options to select the operating system and architecture.](https://kodekloud.com/kk-media/image/upload/v1752876779/notes-assets/images/GitHub-Actions-Types-of-Runners/github-add-self-hosted-runner-interface.jpg)

### Installation and Configuration

Follow these steps to install and configure a self-hosted runner:

```
# 1. Create and navigate to the runner directory
mkdir actions-runner && cd actions-runner


# 2. Download the runner package
curl -L https://github.com/actions/runner/releases/download/v2.309.0/actions-runner-linux-x64-2.309.0.tar.gz \
     --output actions-runner-linux-x64-2.309.0.tar.gz


# 3. Extract the archive
tar xzf actions-runner-linux-x64-2.309.0.tar.gz


# 4. Configure the runner (replace placeholders)
./config.sh --url https://github.com/OWNER/REPOSITORY --token YOUR_TOKEN


# Follow prompts to:
# - Select runner group (press Enter for Default)
# - Name the runner (e.g., linux-gpu-runner)
# 5. Start the runner
./run.sh
```

Sample output:

```
√ Connected to GitHub
Current runner version: '2.309.0'
2023-09-15 07:04:23Z: Listening for Jobs
```

To use your self-hosted runner in a workflow, specify its labels in the `runs-on` field:

```
jobs:
  build:
    runs-on: [self-hosted, Linux, X64, gpu]
    steps:
      - uses: actions/checkout@v3
      - run: echo "Running on a self-hosted GPU runner"
```

> [!important]
> **Warning**
>
> Maintaining self-hosted runners requires you to manage updates, security patches, and uptime. Ensure you have monitoring and backup strategies in place.

## Comparison: GitHub-Hosted vs. Self-Hosted

![The image is a comparison table between GitHub-Hosted Runner and Self-Hosted Runner, highlighting differences in management, customization, resource sharing, scaling, maintenance, usage costs, security, and instance handling.](https://kodekloud.com/kk-media/image/upload/v1752876780/notes-assets/images/GitHub-Actions-Types-of-Runners/github-vs-self-hosted-runner-comparison.jpg)

| Feature               | GitHub-Hosted                            | Self-Hosted                         |
| --------------------- | ---------------------------------------- | ----------------------------------- |
| Management            | Maintained by GitHub                     | Managed by you or your organization |
| Customization         | Predefined environments                  | Fully customizable                  |
| Resource Sharing      | Shared pool with concurrency limits      | Dedicated resources                 |
| Scaling               | Fixed concurrency                        | Dynamic scaling                     |
| Maintenance           | Automatic updates by GitHub              | Manual updates and patching         |
| Usage Costs           | Free for public, paid quotas for private | Infrastructure & maintenance costs  |
| Security & Compliance | GitHub’s security policies               | Your own security measures          |
| Instance Handling     | Fresh VM per job                         | Persistent runner for multiple jobs |

## Links and References

- [GitHub Actions Runners Documentation](https://docs.github.com/en/actions)
- [Hosting your own runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Job Matrices in GitHub Actions](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [GPU Beta Program](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#gpu-enabled-runners)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/8d91a711-49f5-449c-9531-393bfdc7d9b5/lesson/1b09154d-00d9-4dd3-91d3-d3685e1c29f8)**
>
> Watch video content
