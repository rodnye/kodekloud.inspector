# General Instructions Linux Machine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Playground-Instructions/General-Instructions-Linux-Machine)

---

## Table of Contents

- General Instructions Linux Machine
  - Table of Contents
  - Launch the Ubuntu VM
  - Install Prerequisites
  - Add the Google Cloud SDK Repository
  - Install the Google Cloud CLI
  - Authenticate and Configure gcloud
  - Optional Configuration
  - References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Playground Instructions

# General Instructions Linux Machine

Prepare an isolated Ubuntu VM to run Google Cloud commands without relying on Cloud Shell. This approach centralizes your workflows on a dedicated environment and gives you full control over the CLI configuration.

## Table of Contents

1.  [Launch the Ubuntu VM](#launch-the-ubuntu-vm)
2.  [Install Prerequisites](#install-prerequisites)
3.  [Add the Google Cloud SDK Repository](#add-the-google-cloud-sdk-repository)
4.  [Install the Google Cloud CLI](#install-the-google-cloud-cli)
5.  [Authenticate and Configure `gcloud`](#authenticate-and-configure-gcloud)
6.  [Optional Configuration](#optional-configuration)
7.  [References](#references)

---

## Launch the Ubuntu VM

1.  In your Playgrounds console, choose **Ubuntu**.
2.  Click **Launch Now**.
3.  Wait until the VM status shows **Ready**.

> [!important]
> **Note**
>
> Assign a static external IP if you need consistent SSH access over time.

---

## Install Prerequisites

SSH into your new VM and install the required packages:

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates gnupg curl
```

| Package             | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| apt-transport-https | Enables APT to use repositories accessed via HTTPS |
| ca-certificates     | Provides SSL certificates                          |
| gnupg               | Manages GPG keys                                   |
| curl                | Downloads files from the command line              |

---

## Add the Google Cloud SDK Repository

1.  **Import Google’s public key** for APT:

    ```
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg \
      | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
    ```

2.  **Add the Cloud SDK repo** to your sources list:

    ```
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] \
    https://packages.cloud.google.com/apt cloud-sdk main" \
      | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
    ```

---

## Install the Google Cloud CLI

Update the package index and install the SDK:

```
sudo apt-get update
sudo apt-get install -y google-cloud-cli
```

Wait for the installation to finish; you’ll now have access to `gcloud`, `gsutil`, and other SDK components.

---

## Authenticate and Configure `gcloud`

Run the initialization wizard:

```
gcloud init
```

Follow these steps:

1.  Select or create a configuration (press **Enter** for `[default]`).
2.  Choose an account:

    ```
    [1] existing-service-account@your-project.iam.gserviceaccount.com
    [2] Log in with a new account
    Enter your choice: 2
    ```

3.  Approve usage of a personal account (`Y`).
4.  **Authorize**:
    - Copy the URL shown in your terminal.
    - Open it in an incognito/private browser window.
    - Sign in with your Google credentials.
    - Grant permissions and copy the authorization code.
5.  **Paste** the code back into the terminal.
6.  Select your project ID:

    ```
    Pick cloud project to use:
    [1] your-project-id
    ```

7.  (Optional) Set default region/zone now or skip.

> [!important]
> **Warning**
>
> Do not share your authorization code. Anyone with this code can access your Google Cloud resources.

---

## Optional Configuration

Use these commands to set your default compute region and zone:

| Setting                | Command                                        |
| ---------------------- | ---------------------------------------------- |
| Default Compute Region | `gcloud config set compute/region YOUR_REGION` |
| Default Compute Zone   | `gcloud config set compute/zone YOUR_ZONE`     |

You can always update these later with `gcloud config set`.

---

## References

- [Google Cloud SDK Documentation](https://cloud.google.com/sdk/docs/install)
- [gcloud CLI Overview](https://cloud.google.com/sdk/gcloud/)
- [Google Cloud Regions & Zones](https://cloud.google.com/about/locations)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/f7a534a3-6dcf-42b8-96c8-648e59b02830/lesson/f4a95bd8-89d5-4de2-bbcb-425d76068cf7)**
>
> Watch video content
