# Demo Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-2/Demo-Load-Balancer)

---

## Table of Contents

- Demo Load Balancer
  - Setting Up the Instance Group
  - Instance Group Interface Overview
  - Creating the Load Balancer
  - Configuring the Backend Service
  - Setting Up the Health Check
  - Configuring Routing Rules
  - Verifying Health Checks and Load Balancer Status
  - Clean-Up and Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 2

# Demo Load Balancer

Hello, and welcome back to this article.

In this guide, we will walk you through configuring a load balancer on Google Cloud Platform (GCP) and explain the essential concepts behind each step.

## Setting Up the Instance Group

Begin by logging into the GCP console and selecting the appropriate project. Navigate to the Compute section by entering "Compute" in the console search bar. On the Compute page, create an instance group as outlined below.

1.  Click on the Instance Groups section.
2.  Select the option to create a new instance group.
3.  Name the group to reflect its purpose (e.g., "load balancing") and choose an appropriate instance template. This template, which outlines the configuration for your instances, will be reused throughout this demonstration.
4.  Adjust the autoscaling settings: set the maximum number of instances to two instead of the default ten, since this demonstration does not require a high scale.

![The image shows a Google Cloud Platform interface for creating a new managed instance group, with options for naming, location, and autoscaling settings.](https://kodekloud.com/kk-media/image/upload/v1752875262/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-managed-instance-group.jpg)

## Instance Group Interface Overview

Review the instance group creation interface to familiarize yourself with the available options, including naming the group, providing a description, selecting an instance template, and choosing the target region.

![The image shows a Google Cloud Platform interface for creating an instance group, with options for naming, description, instance template selection, and region settings.](https://kodekloud.com/kk-media/image/upload/v1752875264/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-instance-group-interface.jpg)

After confirming the settings, accept the default location and other configuration settings. Ensure that the autoscaling settings have been adjusted as described, then click "Create" to provision your instance group.

![The image shows a Google Cloud Platform interface for creating an instance group, with options for managed and unmanaged groups, autoscaling metrics, and autohealing settings.](https://kodekloud.com/kk-media/image/upload/v1752875265/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-instance-group-interface-2.jpg)

## Creating the Load Balancer

With the instance group in place, the next step is to create a load balancer. While it is possible to attach multiple instance groups to a load balancer, this demonstration uses a single instance group for simplicity.

To locate the load balancing service:

- Use the scroll menu on the left side of the GCP console.
- Alternatively, search for “load balancing” in the search bar.

GCP organizes load balancing under Network Services, alongside features like VPC firewall rules.

![The image shows a Google Cloud Console interface displaying an instance group named "load-balancing" with one instance, using a specific template. A notification confirms the successful creation of the instance group.](https://kodekloud.com/kk-media/image/upload/v1752875266/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-load-balancing-instance-group.jpg)

Once in the load balancing section, click on "Create Load Balancer." GCP will present three types of load balancers:

- HTTPS Load Balancing (Layer 7)
- TCP Load Balancing (Layer 4)
- UDP Load Balancing (Layer 4)

Since HTTPS load balancing is the most common and operates at Layer 7 over TCP, click "Start Configuration" under the HTTP load balancer option.

When prompted, specify the purpose of your load balancer:

- Choose between "internet-facing" (for external access) and "internal-facing" (for internal communication only).

For this demonstration, select the internet-facing option. Then, choose between a global HTTPS load balancer, a classic load balancer, or a regional load balancer. For simplicity, proceed with the default configuration and click "Continue." Provide a name for your load balancer (e.g., "HTTP Load Balancer") and confirm that the frontend will listen on port 80.

![The image shows a Google Cloud Console interface for configuring a new HTTP(S) load balancer, with options for frontend IP and port settings.](https://kodekloud.com/kk-media/image/upload/v1752875267/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-http-load-balancer.jpg)

## Configuring the Backend Service

Proceed to the "Backend" section to define where the load balancer should route incoming traffic:

1.  Click on the drop-down menu and select "Create a backend service."
2.  Fill in the details:
    - Assign a name to the backend service (e.g., "load balancer backend service").
    - Select the instance group created earlier.
    - Configure the port to 80.

![The image shows a Google Cloud Console interface for configuring a new HTTP(S) load balancer, specifically focusing on the backend configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752875268/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-http-load-balancer-2.jpg)

If you plan to use additional instance groups, you can click "Add a backend." For this demonstration, proceed with a single backend and click "Cancel" when prompted to add another.

> [!important]
> **Note**
>
> At this stage, no service is running on port 80 of your instance group, so any incoming traffic will not reach an active service. Further automation and software installation will be covered in subsequent articles.

## Setting Up the Health Check

Scroll down to set up a health check, which is critical to monitor the status of your backend instances. Create a health check (for example, name it "simple health check") that will attempt to access port 80. Because there is currently no service running on port 80, the health check will fail. This is expected and will be rectified once the necessary application is deployed.

![The image shows a Google Cloud Console interface for configuring a new HTTP(S) load balancer, specifically focusing on the backend configuration settings. Options for health checks, logging, and security policies are visible.](https://kodekloud.com/kk-media/image/upload/v1752875269/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-http-load-balancer-4.jpg)

Optionally, you can configure a security policy using Cloud Armor. For now, leave the security settings as default and click "Create." Confirm any prompts by clicking "OK" to finalize the backend service configuration.

## Configuring Routing Rules

Next, define the routing rules that determine how incoming traffic is directed to your backend:

1.  Navigate to the routing rules dialog.
2.  Specify host and path rules if you need to direct specific URL patterns (e.g., traffic ending with "/payment" can be assigned to a dedicated backend).
3.  For this demonstration, use the default routing rule.
4.  Click "Create" to finalize the load balancer configuration.

![The image shows a Google Cloud Console interface for setting up a new HTTPS load balancer, focusing on configuring routing rules. Options for frontend and backend configuration are also visible.](https://kodekloud.com/kk-media/image/upload/v1752875270/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-https-load-balancer-setup.jpg)

![The image shows a Google Cloud Platform interface for configuring a new HTTPS load balancer, specifically focusing on setting routing rules. The interface includes options for frontend and backend configuration, with fields for host and path rules.](https://kodekloud.com/kk-media/image/upload/v1752875271/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-https-load-balancer-routing.jpg)

After creation, the load balancer generates a unique URL. However, if you access it immediately, you might see a "no healthy upstream" error because the backend instance is not yet serving content on port 80.

![The image shows a Google Cloud Console interface displaying load balancer details, including frontend protocol, IP address, routing rules, and backend services.](https://kodekloud.com/kk-media/image/upload/v1752875273/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-load-balancer-details.jpg)

## Verifying Health Checks and Load Balancer Status

After connecting the load balancer to your instance group, you may notice that the backend is flagged as unhealthy. To troubleshoot:

1.  Click on the health check settings to review the configuration.
2.  Verify that the health check is attempting to access port 80 on your instance group.

Once the necessary application is deployed and listens on port 80, the health check will succeed, and the load balancer will start routing traffic appropriately.

![The image shows a Google Cloud Console interface displaying details of a health check configuration named "simple-health-check," including protocol, port, and thresholds.](https://kodekloud.com/kk-media/image/upload/v1752875274/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Load-Balancer/google-cloud-console-health-check.jpg)

## Clean-Up and Conclusion

After completing this demonstration, it is important to clean up unused resources to avoid unnecessary charges. Follow these steps:

- Delete the load balancer along with its associated health check.
- Remove the instance group from the Compute section.

This concludes our demo on setting up a load balancer on Google Cloud Platform. In future articles, we will explore automation processes to install and update software on your instance group, ensuring your applications become fully operational once deployed.

Thank you for reading, and we look forward to guiding you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/da34bf7c-6568-4fbd-82a2-181ac35e826f/lesson/2053822c-49be-4393-acfc-eb197c26e681)**
>
> Watch video content
