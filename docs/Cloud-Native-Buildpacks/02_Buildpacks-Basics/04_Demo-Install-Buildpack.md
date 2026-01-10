# Demo Install Buildpack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Buildpacks-Basics/Demo-Install-Buildpack)

---

## Table of Contents

- Demo Install Buildpack
  - Installing Pack CLI on macOS or Systems Using Homebrew
  - Installing Pack CLI on Ubuntu
  - Verifying the Installation
  - Watch Video

---

## Content

Cloud Native Buildpacks

Buildpacks Basics

# Demo Install Buildpack

In this lesson, you'll learn how to set up the Pack CLI on Ubuntu. Although this demonstration uses Ubuntu, the installation steps are quite similar for other Linux distributions and platforms.

> [!important]
> **Prerequisite**
>
> Before proceeding, ensure that Docker is installed on your system. The Pack CLI relies on Docker. If Docker isn't installed, please follow the appropriate installation instructions for your Ubuntu system.

## Installing Pack CLI on macOS or Systems Using Homebrew

If you're using Homebrew, use the following command to install the Pack CLI:

```
brew install buildpacks/tap/pack
```

## Installing Pack CLI on Ubuntu

For Ubuntu users, the installation process involves adding the buildpack repository and installing the CLI. Open your terminal and execute these commands one after the other:

```
sudo add-apt-repository ppa:cncf-buildpacks/pack-cli
sudo apt-get update
sudo apt-get install pack-cli
```

## Verifying the Installation

After installation, verify that the Pack CLI is correctly installed by checking its version. Note that the correct flag is `--version`. Run the command below:

```
pack --version
# Expected output:
# 0.35.1
```

This output confirms that the Pack CLI has been successfully installed on your system. For further details and troubleshooting, refer to the official [Pack CLI Documentation](https://github.com/buildpacks/pack).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/d2170747-7a07-4648-b449-958edfff954b/lesson/e3e70583-011f-4fbb-93f7-fdc008cd73fc)**
>
> Watch video content
