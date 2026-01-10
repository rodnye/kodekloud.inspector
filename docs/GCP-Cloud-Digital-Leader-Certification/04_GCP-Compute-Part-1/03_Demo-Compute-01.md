# Demo Compute 01 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-1/Demo-Compute-01)

---

## Table of Contents

- Demo Compute 01
  - Step 1: Select Your Project
  - Step 2: Locate the Compute Engine
  - Step 3: Enable the Compute Engine API
  - Step 4: Create a New VM Instance
  - Step 5: Launch Your Virtual Machine
  - Conclusion
  - Additional Resources
  - Watch Video
    - Configuring Your VM Instance

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 1

# Demo Compute 01

Hello and welcome to this lesson on launching your very first Compute Engine instance on Google Cloud Platform (GCP). In this tutorial, we will guide you through the step-by-step process and review the critical parameters involved in setting up your virtual machine (VM).

## Step 1: Select Your Project

Before you begin, ensure that you have selected the correct project. We have created a dedicated project for our learning process—make sure to choose this project from the drop-down menu.

## Step 2: Locate the Compute Engine

After selecting your project, use the search bar to enter "compute" and select the corresponding compute option when it appears. The top result, "Compute Engine," is your gateway to the Compute API dashboard.

The Compute Engine API is disabled by default when you first use GCP resources. To utilize it, you must enable the API:

![The image shows the Google Cloud Console interface for the Compute Engine API, with options to enable or try the API, and includes an overview and additional details about the service.](https://kodekloud.com/kk-media/image/upload/v1752875232/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-console-compute-engine-api.jpg)

> [!important]
> **Note**
>
> If the API is already enabled due to previous usage, you may not see the enable prompt.

## Step 3: Enable the Compute Engine API

Click the "Enable" button to activate the Compute Engine API. You might be prompted to provide billing information at this stage:

![The image shows a Google Cloud Platform interface where a billing account is being set for a project named "KodeKloud-GCP-Training." A pop-up window prompts the user to select a billing account.](https://kodekloud.com/kk-media/image/upload/v1752875233/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-billing-kodekloud-training.jpg)

> [!important]
> **Billing Information**
>
> If you are using a free trial subscription or selected region without billing requirements, this prompt may not appear.

Allow a few seconds for the API to activate. You will then be redirected to the Compute Engine console.

## Step 4: Create a New VM Instance

On the Compute Engine dashboard, click the "Create Instance" option or switch to the VM instance tab. This action opens a form with comprehensive options for configuring your virtual machine (VM).

![The image shows a Google Cloud Platform interface for creating a new virtual machine instance, with options for machine configuration and a monthly cost estimate.](https://kodekloud.com/kk-media/image/upload/v1752875235/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-platform-vm-instance-creation.jpg)

### Configuring Your VM Instance

1.  **Name and Labels**
    - Assign a unique name to your VM.
    - Optionally, add labels (e.g., "environment: dev") for better organization.

2.  **Region and Zone**
    - Select the appropriate region and zone based on your requirements. For this demonstration, choose Montreal and an available zone.
    - Consider factors like low CO2 emissions when selecting your region if that is important to your deployment strategy.

3.  **Machine Configuration**
    - Choose among the four available machine families: General Purpose, Compute Optimized, Memory Optimized, and GPU.
    - For development and testing, the default General Purpose settings are typically sufficient.

4.  **Operating System and Boot Disk**
    - Click "Change" in the boot disk section to view the available operating system options.
    - Debian is set as the default, but you can opt for alternatives like CentOS.
    - Adjust the disk size or persistent disk options as needed.

![The image shows a Google Cloud Platform interface for creating a new virtual machine instance. It includes options for configuring the instance, such as enabling confidential VM service, deploying a container, and setting boot disk details, with a monthly cost estimate displayed.](https://kodekloud.com/kk-media/image/upload/v1752875236/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-virtual-machine-setup.jpg)

5.  **Firewall Configuration**
    - Scroll down to the firewall settings and enable HTTP traffic. This setting permits both HTTP and HTTPS traffic through the firewall.

6.  **Advanced Networking Options**
    - For users interested in deeper network and disk configurations, advanced options are available. These settings will be covered in later lessons.

![The image shows a Google Cloud Platform interface for creating a new virtual machine instance, with options for identity and API access, firewall settings, and a monthly cost estimate.](https://kodekloud.com/kk-media/image/upload/v1752875238/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-platform-vm-instance-creation-2.jpg)

## Step 5: Launch Your Virtual Machine

After finalizing your settings, click "Create" to launch your virtual machine. Remember, within the same project (KodeKloud GCP Training), you can create VMs in various regions without having to switch projects. Your project can support multiple VMs of different sizes, purposes, and geographic locations.

The provisioning process may take a few minutes—typically around 2–3 minutes in this demo, but up to 10 minutes in some cases. Once your instance is ready, its details will appear on the console.

![The image shows the Google Cloud Platform console, specifically the Compute Engine section, displaying a list of VM instances with options for managing and monitoring them.](https://kodekloud.com/kk-media/image/upload/v1752875239/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-01/google-cloud-compute-engine-vm-instances.jpg)

## Conclusion

That concludes our lesson on creating your very first Compute Engine instance. In upcoming lessons, we will cover how to access your VM, install software like an Apache web server, configure firewall ports, and more.

Thank you for joining, and see you in the next lesson!

## Additional Resources

- [Google Cloud Compute Engine Documentation](https://cloud.google.com/compute/docs)
- [Getting Started with Google Cloud](https://cloud.google.com/docs/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/015fc866-5579-442a-80f8-f4e795b70c33/lesson/1a0c8115-9f55-4f03-a62a-cac2184850ea)**
>
> Watch video content
