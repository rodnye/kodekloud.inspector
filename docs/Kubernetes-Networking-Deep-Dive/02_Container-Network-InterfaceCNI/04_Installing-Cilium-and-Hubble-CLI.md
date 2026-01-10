# Installing Cilium and Hubble CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Installing-Cilium-and-Hubble-CLI)

---

## Table of Contents

- Installing Cilium and Hubble CLI
  - Install Cilium CLI
  - Install Hubble CLI
  - Links and References
  - Watch Video
    - 1. Download and verify the Cilium CLI
    - 2. Verify the Cilium CLI installation
    - 1. Download and verify the Hubble CLI
    - 2. Verify the Hubble CLI installation

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Installing Cilium and Hubble CLI

Before you deploy Cilium in your Kubernetes cluster, you’ll need to install two command-line tools locally: the Cilium CLI and the Hubble CLI. This guide walks you through downloading, verifying, and installing both CLIs on Linux.

## Install Cilium CLI

Follow these steps to fetch the latest stable Cilium CLI release, verify its integrity, and install it to `/usr/local/bin`.

### 1\. Download and verify the Cilium CLI

> [!important]
> **Note**
>
> Make sure you have `curl`, `sha256sum`, and `tar` installed. You’ll also need `sudo` privileges to copy the binary into `/usr/local/bin`.

```
# Determine the latest stable version and target architecture
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
CLI_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then
  CLI_ARCH=arm64
fi


# Download the tarball and its SHA-256 checksum
curl -L --fail --remote-name-all \
  https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}


# Verify the checksum before extraction
sha256sum --check cilium-linux-${CLI_ARCH}.tar.gz.sha256sum


# Extract and install the binary
sudo tar xzvf cilium-linux-${CLI_ARCH}.tar.gz -C /usr/local/bin


# Remove downloaded files
rm cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}
```

This process:

1.  Fetches the correct binary for your CPU architecture.
2.  Validates it with the downloaded SHA-256 checksum.
3.  Places the `cilium` executable into `/usr/local/bin`.

### 2\. Verify the Cilium CLI installation

Run:

```
cilium version --client
```

You should see output similar to:

```
cilium-cli version: v0.16.13 compiled with go1.21.25 on linux/amd64
cilium image (default): v1.15.6
cilium image (stable): v1.16.0
```

If you need a specific version, visit the [Cilium CLI GitHub releases page](https://github.com/cilium/cilium-cli/releases) to download the right asset.

![The image shows a list of downloadable files with their sizes and upload dates, likely from a software release page. It includes various operating system versions and source code options.](https://kodekloud.com/kk-media/image/upload/v1752880261/notes-assets/images/Kubernetes-Networking-Deep-Dive-Installing-Cilium-and-Hubble-CLI/downloadable-files-sizes-upload-dates.jpg)

## Install Hubble CLI

The Hubble CLI installation mirrors the Cilium CLI workflow. Use the same pattern to download, verify, and install.

### 1\. Download and verify the Hubble CLI

```
# Get the latest stable Hubble version and set architecture
HUBBLE_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/hubble/master/stable.txt)
HUBBLE_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then
  HUBBLE_ARCH=arm64
fi


# Download the Hubble tarball and checksum
curl -L --fail --remote-name-all \
  https://github.com/cilium/hubble/releases/download/${HUBBLE_VERSION}/hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}


# Validate the download
sha256sum --check hubble-linux-${HUBBLE_ARCH}.tar.gz.sha256sum


# Install the binary
sudo tar xzf hubble-linux-${HUBBLE_ARCH}.tar.gz -C /usr/local/bin


# Cleanup
rm hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}
```

### 2\. Verify the Hubble CLI installation

Execute:

```
hubble version
```

Expected output:

```
hubble v1.16.0 compiled with go1.22.5 on linux/amd64
```

For alternative versions, browse the [Hubble GitHub releases page](https://github.com/cilium/hubble/releases).

---

Now that both the Cilium and Hubble CLIs are installed, you’re ready to proceed with deploying Cilium onto your Kubernetes cluster.

## Links and References

- [Cilium “Get Started” documentation](https://docs.cilium.io/gettingstarted/)
- [Cilium CLI GitHub releases page](https://github.com/cilium/cilium-cli/releases)
- [Hubble documentation](https://docs.cilium.io/gettingstarted/hubble/)
- [Hubble GitHub releases page](https://github.com/cilium/hubble/releases)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/7782c4cc-a537-4c18-81d9-b583f6c8f4f7)**
>
> Watch video content
