# Demo GCP playground KodeKloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-account-and-Resource-hierarchy/Demo-GCP-playground-KodeKloud)

---

## Table of Contents

- Demo GCP playground KodeKloud
  - Accessing the GCP Playground
  - Provisioning a Compute Engine VM Instance
  - Setting Up Firewall Rules
  - Connecting to the VM Instance
  - Overview of Playground Restrictions
  - Final Notes
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP account and Resource hierarchy

# Demo GCP playground KodeKloud

Welcome to the GCP Playground! In this guide, we will walk you through accessing your exclusive Google Cloud Platform environment, provisioning resources, and understanding the sandbox restrictions. Follow the step-by-step instructions below to get started.

## Accessing the GCP Playground

To begin, click the **Start Lab** button. Shortly after, you will receive your unique login credentials alongside the access instructions, as shown below:

![The image shows a webpage from KodeKloud with instructions for accessing a Google Cloud Platform console, including a link, username, password, and expiration time.](https://kodekloud.com/kk-media/image/upload/v1752875290/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/kodekloud-gcp-console-instructions.jpg)

The credentials are valid for 3 hours. Copy the details provided:

```
Console link: https://console.cloud.google.com
Username: odl_user_65832@cloudlabsgeorg.com
Password: prnA3TnC*%K
Expires in 179:45
```

> [!important]
> **Tip**
>
> For a smooth login experience, open an incognito or private browsing window. Paste the username and password in the new window and complete the sign-in process. Once logged in, remember to accept the Google agreements for your new account.

![The image shows a Google account setup page with a welcome message and an "Accept" button for agreeing to terms of service.](https://kodekloud.com/kk-media/image/upload/v1752875291/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-account-setup-welcome.jpg)

![The image shows a Google Cloud Platform interface with a pop-up window prompting the user to agree to the terms of service and select their country. The background displays various Google Cloud services and options.](https://kodekloud.com/kk-media/image/upload/v1752875292/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-terms-popup-interface.jpg)

Once you have accepted the agreements, your screen will display an interface similar to the one below. Select the correct organization and project to view your GCP dashboard:

![The image shows the Google Cloud Platform console interface, highlighting top products like Compute Engine, Cloud Storage, Cloud SQL, and Cloud Run. It includes navigation options on the left and a banner offering a free trial.](https://kodekloud.com/kk-media/image/upload/v1752875293/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-platform-console-interface.jpg)

On the left-hand side, services like Compute Engine, Google Kubernetes Engine, Cloud Storage, Cloud Run, and SQL Databases are grouped by type. Now let's start provisioning some resources.

## Provisioning a Compute Engine VM Instance

To create a virtual machine (VM) instance, follow these steps:

1.  Click on the **Compute Engine** option.
2.  Select the **Create Instance** button.

> [!important]
> **Sandbox Restrictions**
>
> Remember that this sandbox environment enforces fair usage policies. Ensure you select allowed configurations while provisioning resources.

![The image shows a Google Cloud Platform interface for creating a new virtual machine instance, with options for machine configuration and region selection.](https://kodekloud.com/kk-media/image/upload/v1752875295/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-platform-vm-instance-creation.jpg)

When configuring the instance:

- Choose either an **E2 Medium** or **N1 Standard** machine type (or a smaller option). This guide uses **E2 Medium**.
- Scroll down to select the disk type. Change it from a balanced persistent disk to a standard persistent disk and set the disk size to **15 GB**.
- Ensure that HTTP and HTTPS traffic are enabled.
- While the default image is Debian Linux 11 Bullseye, you may select another available VM image if necessary.

Click the **Create** button to initiate the provisioning process. This step may take a few minutes.

![The image shows a Google Cloud Platform interface for creating a virtual machine instance, with a focus on selecting a boot disk type and operating system options.](https://kodekloud.com/kk-media/image/upload/v1752875296/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-platform-vm-creation.jpg)

## Setting Up Firewall Rules

While your VM instance is being created, navigate to the firewalls page to configure additional rules:

1.  Verify that the default HTTP and HTTPS firewall rules are active.
2.  Create a new firewall rule to allow inbound SSH access with the following settings:
    - **Target:** All instances in the default VPC (including your new VM).
    - **Source Range:** 0.0.0.0/0.
    - **Allowed Port:** TCP 22.

![The image shows a Google Cloud Platform interface for creating a firewall rule, with options to set parameters like name, network, priority, and traffic direction.](https://kodekloud.com/kk-media/image/upload/v1752875297/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-firewall-rule-interface.jpg)

After creating the rule, click on it to review its details and ensure it applies correctly to your instance.

![The image shows a Google Cloud Platform interface displaying the firewall settings for a VPC network, including a list of firewall rules with details like name, type, targets, and protocols.](https://kodekloud.com/kk-media/image/upload/v1752875298/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-firewall-settings-vpc.jpg)

The new firewall rule should be applied to your instance (labeled as "instance dash one").

![The image shows a Google Cloud Platform interface displaying firewall rule details, including network settings, source filters, and applicable instances. A notification at the bottom indicates the successful creation of a firewall rule named "inbound-sample-ssh."](https://kodekloud.com/kk-media/image/upload/v1752875300/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/google-cloud-firewall-rule-details.jpg)

## Connecting to the VM Instance

Once the firewall rule is set, return to the VM instances page and click the **SSH** button to connect via Cloud Shell. A new tab will open, establishing an SSH connection to your VM instance.

## Overview of Playground Restrictions

Before proceeding further, familiarize yourself with some key restrictions in the GCP Playground:

| Service                      | Restrictions                                                                                                                                                                                                | Example/Note                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Compute Engine**           | \\- Allowed machine types: E2 Medium or N1 Standard (or smaller)<br>- Allowed regions: US Central or US West 1 only<br>- Max CPU quota: 5 CPUs<br>- Disk size: Standard persistent only (up to 50 GB total) | Ensure your instance configuration complies.    |
| **Google Kubernetes Engine** | \\- Only GKE Standard clusters are permitted<br>- Node pools are limited to a maximum of three E2 Medium nodes<br>- Total disk size across nodes: 50 GB maximum                                             | Follow documented guidelines for cluster setup. |
| **SQL Databases**            | \\- Only single-zone deployments<br>- Machine types: Standard or lightweight<br>- Maximum: 4 CPUs and 15 GB storage                                                                                         | Use single-zone deployments for SQL instances.  |

![The image shows a webpage from KodeKloud's support section detailing restrictions for disks and Google Kubernetes Engine (GKE), including limits on disk size and instance type.](https://kodekloud.com/kk-media/image/upload/v1752875300/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/kodekloud-gke-disk-restrictions.jpg)

Additionally, for SQL databases:

![The image shows a webpage from KodeKloud with a support section, featuring topics like VPC Network, SQL, and Google Container Registry, along with some usage restrictions.](https://kodekloud.com/kk-media/image/upload/v1752875301/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-playground-KodeKloud/kodekloud-support-section-vpc-sql-gcr.jpg)

For a complete list of restrictions and permitted services, refer to the support documentation provided in your GCP Playground dashboard.

## Final Notes

This concludes the walkthrough of the GCP Playground. By following this guide and adhering to the outlined restrictions, you can safely experiment with GCP services in a secure sandbox environment.

For additional details on GCP services and best practices, consider visiting the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [KodeKloud Support](https://kodekloud.com/support)

Happy learning and exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/b66b4a7d-3fda-4a71-880a-e91e7a6f4afa/lesson/55e22471-1a62-440f-9754-9a9b1a9a729e)**
>
> Watch video content
