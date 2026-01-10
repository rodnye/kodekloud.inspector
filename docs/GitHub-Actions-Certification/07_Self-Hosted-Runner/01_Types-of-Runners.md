# Types of Runners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Self-Hosted-Runner/Types-of-Runners)

---

## Table of Contents

- Types of Runners
  - GitHub-Hosted Runners
  - Self-Hosted Runners
  - Setting Up a Self-Hosted Runner
  - Comparing GitHub-Hosted vs. Self-Hosted Runners
  - Links and References
  - Watch Video
    - Tiers of GitHub-Hosted Runners
    - Benefits of Self-Hosted Runners
    - 1. Add a New Runner in GitHub
    - 2. Install and Configure the Runner
    - 3. Target Your Self-Hosted Runner in Workflows

---

## Content

GitHub Actions Certification

Self Hosted Runner

# Types of Runners

Runners are the virtual machines or servers that execute the jobs defined in your GitHub Actions workflows. Each time you trigger a workflow, GitHub either provisions a fresh VM (GitHub-hosted) or dispatches the job to one of your own machines (self-hosted). Choosing the right runner depends on your performance requirements, compliance needs, and budget.

---

## GitHub-Hosted Runners

GitHub-hosted runners give you a quick, zero-maintenance experience. They come preconfigured with common tools and support Ubuntu, Windows, and macOS environments.

### Tiers of GitHub-Hosted Runners

1.  **Standard Runners**
    - 2-core CPU, ~7 GB RAM, 14 GB SSD
    - Ideal for typical CI/CD tasks with moderate resource needs
2.  **Larger Managed Runners** (GitHub Team & Enterprise Cloud only)
    - 4-core CPU, ~16 GB RAM, larger SSD
    - For parallel builds, integration tests, and heavier workloads
3.  **GPU-Enabled Runners (Beta)**
    - GPU resources in beta for machine learning, data processing
    - Request access via GitHub Support if on Team or Enterprise Cloud

> [!important]
> **Note**
>
> GitHub-hosted runners are fully patched and maintained by GitHub. You pay per minute of usage, with free tiers for public repositories.

For a quick demonstration, here’s a matrix workflow that runs tests across Linux, macOS, and Windows:

```
name: Cross-Platform Tests
on: [push, pull_request]


jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Run Tests
        run: npm test
```

![The image provides hardware specifications for GitHub-hosted runners, detailing CPU, RAM, and SSD requirements for different virtual machine configurations, including standard and larger runners. It also mentions GPU-enabled runners in beta and differentiates between GitHub Team and Enterprise options.](https://kodekloud.com/kk-media/image/upload/v1752876434/notes-assets/images/GitHub-Actions-Certification-Types-of-Runners/github-runners-hardware-specifications.jpg)

---

## Self-Hosted Runners

Self-hosted runners are machines that you own or provision in your cloud environment. They allow complete customization of OS, hardware specs, installed software, and network configuration.

![The image is an infographic titled "Self-Hosted Runner" highlighting five benefits: custom-execution environment, controlled environment for security, eliminates wait time, scalability, and reduced latency. Each benefit is represented by a numbered icon.](https://kodekloud.com/kk-media/image/upload/v1752876435/notes-assets/images/GitHub-Actions-Certification-Types-of-Runners/self-hosted-runner-infographic-benefits.jpg)

### Benefits of Self-Hosted Runners

- **Custom Execution Environment**: Install any dependencies, SDKs, or drivers your build needs.
- **Security & Compliance**: Run within your VPC/firewall and meet corporate policies.
- **No Queue Times**: Dedicated runners eliminate waiting for GitHub-hosted capacity.
- **Autoscaling**: Integrate with Kubernetes or autoscale groups to match workflow demand.
- **Reduced Latency**: Place runners in the same region as your artifact stores or environments.

> [!important]
> **Warning**
>
> You are responsible for updating, securing, and maintaining self-hosted runners. Always apply OS patches and rotate access tokens regularly.

You can register self-hosted runners at the **repository**, **organization**, or **enterprise** level. Below is how to set one up at the repository level.

---

## Setting Up a Self-Hosted Runner

### 1\. Add a New Runner in GitHub

In your repository, navigate to **Settings** → **Actions** → **Runners** and click **New self-hosted runner**.  
![The image shows a GitHub interface for adding a new self-hosted runner, with options to select the runner image (macOS, Linux, Windows) and architecture (x64, ARM, ARM64).](https://kodekloud.com/kk-media/image/upload/v1752876437/notes-assets/images/GitHub-Actions-Certification-Types-of-Runners/github-add-self-hosted-runner-interface.jpg)

Choose your OS and architecture, then follow the on-screen instructions to download the runner application.

### 2\. Install and Configure the Runner

Run these commands on your machine:

```
# Create and enter a directory for the runner
mkdir actions-runner && cd actions-runner


# Download the runner package (update version as needed)
curl -o actions-runner.tar.gz \
  https://github.com/actions/runner/releases/download/v2.309.0/actions-runner-linux-x64-2.309.0.tar.gz


# Extract the files
tar xzf actions-runner.tar.gz


# Configure with your repo URL and token
./config.sh --url https://github.com/sidd-harth/repository \
            --token AP3V5NDFAQIMO


# Follow the prompts:
# • Runner group: [press Enter for Default]
# • Runner name: linux-gpu-runner
# • Labels: gpu
# After setup, you’ll see:
# Start the runner
./run.sh
# Expected output:
# √ Connected to GitHub
# Listening for Jobs...
```

### 3\. Target Your Self-Hosted Runner in Workflows

Add the labels you chose to the `runs-on` field:

```
jobs:
  build:
    runs-on: [self-hosted, Linux, gpu]
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      # …additional steps…
```

---

## Comparing GitHub-Hosted vs. Self-Hosted Runners

| Aspect             | GitHub-Hosted                              | Self-Hosted                                |
| ------------------ | ------------------------------------------ | ------------------------------------------ |
| Management         | Fully managed by GitHub                    | You install, update, and secure the runner |
| Customization      | Predefined OS and toolset                  | Full control over OS, tools, and drivers   |
| Resource Sharing   | Shared infrastructure with other customers | Dedicated resources                        |
| Scaling            | Limited by GitHub’s concurrency quotas     | Autoscale via your infrastructure          |
| Maintenance        | Automatic updates and patches              | Manual updates and patch management        |
| Cost               | Billed per-minute, free for public repos   | Infrastructure and maintenance costs apply |
| Security           | GitHub’s built-in security policies        | Your network/host security measures        |
| Instance Lifecycle | Fresh VM per job                           | Persistent instance across jobs            |

![The image is a comparison table between GitHub-Hosted Runner and Self-Hosted Runner, highlighting differences in management, customization, resource sharing, scaling, maintenance, usage costs, security, and instance handling.](https://kodekloud.com/kk-media/image/upload/v1752876438/notes-assets/images/GitHub-Actions-Certification-Types-of-Runners/github-vs-self-hosted-runner-comparison.jpg)

---

## Links and References

- [GitHub Actions Runners Documentation](https://docs.github.com/actions/hosting-your-own-runners)
- [GitHub Actions Pricing](https://github.com/pricing)
- [actions/checkout GitHub Action](https://github.com/actions/checkout)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/f55a71c6-e83e-4aa5-a5fc-3f9e95a2fd36)**
>
> Watch video content
