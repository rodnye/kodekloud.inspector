# Demo Lab Session - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Usecase/Demo-Lab-Session)

---

## Table of Contents

- Demo Lab Session
  - Setting Up the Instance Group
  - Understanding Instance Templates and Startup Scripts
  - Verifying the Instance Group and Application
  - Configuring the HTTP Load Balancer
  - Cleaning Up Resources
  - Conclusion
  - Watch Video
    - Creating an Instance Template
    - Configuring a Startup Script
    - Configuring the Backend Service

---

## Content

GCP Cloud Digital Leader Certification

Usecase

# Demo Lab Session

Welcome to this comprehensive lab article. In this guide, you will learn how to deploy a simple application on Google Cloud Platform (GCP), leveraging Compute Engine, Instance Groups, Instance Templates, and HTTP Load Balancers. This step-by-step tutorial covers creating and managing virtual machines and automating your application deployment.

## Setting Up the Instance Group

Begin by logging into the GCP Console and confirming that you are in the correct project. Follow these steps to set up your instance group:

1.  Navigate to **Compute Engine** by searching for "Compute" and selecting **Compute Engine**.
2.  In the Compute Engine section, go to **Instance Groups** and create a new instance group.
    - Name the instance group: **simple instance group**
    - Add a description, for example, _this is a simple application_.

    You have the option to select an existing template; however, in this lab, you will create a new instance template.

![The image shows a Google Cloud Platform interface for creating a new instance group, with options for selecting an instance template and configuring settings like region and zone.](https://kodekloud.com/kk-media/image/upload/v1752875372/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-instance-group-creation.jpg)

### Creating an Instance Template

When creating the instance template, follow these instructions:

1.  Name the template **simple instance group** (or **simple instance** for brevity).
2.  Add a metadata key-value pair where the key is **ENV** and the value is **development**.
3.  Keep the machine type as default. Scroll down to the boot script section, click **Change**, and select **Ubuntu**.

At this moment, the latest version of Ubuntu is automatically selected.

![The image shows a Google Cloud Platform interface where a user is selecting an operating system for a boot disk. The user has typed "ub" in the filter, and a list of operating systems is displayed, including CentOS, Debian, and others.](https://kodekloud.com/kk-media/image/upload/v1752875372/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-platform-os-selection.jpg)

> [!important]
> **Note**
>
> If you receive an error indicating that the selected compute instance is not compatible with the chosen Ubuntu version, switch to the Intel version (x86_64) and click **Select**.

## Understanding Instance Templates and Startup Scripts

An instance template is a blueprint for your virtual machines within an instance group. Ensure the following within the template:

- In the firewall section, enable both the HTTP and HTTPS traffic options. Enabling HTTP is crucial for external accessibility to your web application.

![The image shows a Google Cloud Platform interface for creating an instance template, with options for setting size, license type, image, identity and API access, firewall settings, and advanced options.](https://kodekloud.com/kk-media/image/upload/v1752875374/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-instance-template-interface.jpg)

### Configuring a Startup Script

Under **Advanced Options**, navigate to **Management** where you will find the startup script section. A startup script automates the process of installing and configuring your application after the VM boots. Consider the following simple Bash startup script:

```
#!/bin/bash
apt update
apt -y install apache2
echo 'Simple application running on $(hostname)' > /var/www/html/index.html
```

> [!important]
> **Tip**
>
> Even if the startup script encounters an error, the virtual machine will continue running. You can extend this script to install additional packages or configure other services as necessary.

After entering your startup script, click on **Save and Continue**. Configure the instance group with these settings:

- Minimum instances: **2**
- Maximum instances: **5**

The default setting starts with two instances. Leave all other settings as default and then click **Create**. Please note that it may take up to five minutes for the instance group to become fully operational.

## Verifying the Instance Group and Application

After setting up the instance group, verify that everything is functioning as expected by checking the individual instances. Follow these steps:

1.  Confirm that the startup script ran successfully by inspecting each instance.
2.  Refresh the instances section to see the external IP addresses assigned.
3.  Access the web application by clicking on an external IP address. Remember to use the HTTP protocol (not HTTPS). If the page does not load immediately, allow a few minutes for the updates.

![The image shows a Google Cloud Platform (GCP) console screen displaying an instance group named "simple-instance-group" with two instances, managed type, and autoscaling enabled. A notification confirms the successful creation of the instance group.](https://kodekloud.com/kk-media/image/upload/v1752875375/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/gcp-console-simple-instance-group-autoscaling.jpg)

## Configuring the HTTP Load Balancer

Next, set up an HTTP Load Balancer to distribute incoming traffic across your instances.

1.  In the GCP Console, search for **Load Balancer** and create a new HTTP load balancer (initially, leave all configurations as default).
2.  Name the load balancer **simple application load balancer**.

### Configuring the Backend Service

For the backend configuration, perform the following actions:

- Create a backend service and choose the previously created instance group.
- Set the backend port to **80**.
- Enable the default settings.
- Create a health check titled **Simple application** to verify port **80** using HTTP. This health check ensures traffic is only directed to healthy instances.

![The image shows a Google Cloud Platform interface for configuring a new HTTP(S) load balancer, with options for setting the frontend IP and port. The sidebar includes various network services like Cloud DNS and Cloud CDN.](https://kodekloud.com/kk-media/image/upload/v1752875376/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-http-load-balancer-config.jpg)

After configuring the backend, save your settings. You can leave the routing rules as default and then click **Create** to build the load balancer.

![The image shows a Google Cloud Platform interface for creating a new HTTP(S) load balancer, specifically focusing on the backend configuration settings. It includes options for selecting an instance group and setting balancing modes.](https://kodekloud.com/kk-media/image/upload/v1752875378/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-http-load-balancer-backend.jpg)

![The image shows a Google Cloud Platform interface for creating a new HTTP(S) load balancer, with options for backend configuration and Cloud CDN settings.](https://kodekloud.com/kk-media/image/upload/v1752875379/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-http-load-balancer.jpg)

After the configuration, the load balancer will deploy and connect to your instance group. Keep in mind that it might take 10–15 minutes for the load balancer's IP address to become fully available and for all health checks to pass.

![The image shows a Google Cloud Platform interface for setting up a new HTTP(S) load balancer, with options for frontend, backend, and routing configurations. The "Routing rules" section is highlighted, allowing the user to define host and path rules.](https://kodekloud.com/kk-media/image/upload/v1752875380/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-http-load-balancer-setup.jpg)

![The image shows a Google Cloud Platform interface displaying details of a load balancer named "simple-application-load-balancer," including frontend and backend configurations. It highlights the IP address, protocol, and backend services associated with the load balancer.](https://kodekloud.com/kk-media/image/upload/v1752875382/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-load-balancer-details.jpg)

Test the load balancer by entering its IP address in your browser with HTTP on port 80. You might initially see a 404 error, but after refreshing, you should notice different instance names in the response—confirming that the traffic is being distributed across your virtual machines.

## Cleaning Up Resources

Once you have verified that your deployment is working correctly, it is important to clean up your resources to avoid incurring additional charges. The cleanup process should be performed in the following order:

1.  Delete the load balancer (this will also remove the associated health check).
2.  Navigate to **Compute Engine** > **Instance Groups** and then delete the instance group.

![The image shows the Google Cloud Console interface, specifically the Load Balancing section, where a load balancer named "simple-application-load-balancer" is being deleted.](https://kodekloud.com/kk-media/image/upload/v1752875383/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-console-load-balancer-delete.jpg)

![The image shows a Google Cloud Platform interface where a user is prompted to confirm the deletion of an instance group named "simple-instance-group." The user must type "delete" to proceed with the action.](https://kodekloud.com/kk-media/image/upload/v1752875384/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/google-cloud-delete-instance-group.jpg)

> [!important]
> **Warning**
>
> Ensure that you delete the load balancer before deleting the instance group to avoid dependency errors.

![The image shows a Google Cloud Platform (GCP) console interface displaying details of a "simple-instance-group" with notifications about creating and deleting VM instance groups and load balancers. The interface includes options for managing instances and viewing their status.](https://kodekloud.com/kk-media/image/upload/v1752875386/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Lab-Session/gcp-console-simple-instance-group.jpg)

## Conclusion

This lab article demonstrated how to:

- Create and configure an instance group with a custom instance template.
- Automate application deployment using a startup script.
- Set up an HTTP load balancer to distribute traffic among virtual machines.
- Perform clean-up of resources to reduce unnecessary charges.

We hope you found this lab informative and that it helps you build your expertise in cloud computing on GCP. Happy cloud computing!

For additional resources and further reading, check out the following:

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Compute Engine Overview](https://cloud.google.com/compute)
- [Introduction to Load Balancing](https://cloud.google.com/load-balancing/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/04987f64-1ee0-4f81-9a84-f1882572de12/lesson/f7d053c1-0b35-4b18-b7f6-9c3b87bd8b45)**
>
> Watch video content
