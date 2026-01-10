# Demo Compute 02 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-1/Demo-Compute-02)

---

## Table of Contents

- Demo Compute 02 2
  - Accessing Your Virtual Machine
  - Managing Your Compute Instance
  - Conclusion
  - Watch Video
    - Stopping the Instance
    - Monitoring Performance
    - Deleting the Instance

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 1

# Demo Compute 02 2

Welcome to this lesson on connecting to and managing your compute instance. In our previous lesson, we explored the creation of compute instances and examined their key features. In this article, we will dive into various options for connecting to a compute instance, accessing its terminal, and managing its lifecycle—including how to stop and delete an instance.

## Accessing Your Virtual Machine

To connect to a specific compute instance, click on the SSH option provided in the instance list. This action opens a new browser tab with an instantaneous terminal session, allowing you to interact directly with the virtual machine.

![The image shows a Google Cloud Platform console displaying a list of VM instances, with one instance named "first-vm-instance" in the "northamerica-northeast1-a" zone. The right panel shows permissions settings for the instance.](https://kodekloud.com/kk-media/image/upload/v1752875240/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-02-2/google-cloud-vm-instances-console.jpg)

Once connected via SSH, you will see a terminal interface where you can execute Linux commands and inspect system details.

![The image shows a browser-based SSH terminal connected to a Google Cloud VM instance, displaying a command prompt ready for input.](https://kodekloud.com/kk-media/image/upload/v1752875241/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-02-2/ssh-terminal-google-cloud-vm.jpg)

## Managing Your Compute Instance

### Stopping the Instance

To stop the virtual machine, click on the three-dot menu associated with the instance and select the "Stop" option. This action safely shuts down your VM, and you can later choose to delete the instance if it is no longer needed.

### Monitoring Performance

For performance monitoring, click on the "View Monitoring" option. This takes you to a dedicated page where you can review vital statistics, including CPU usage, memory consumption, running processes, and other essential metrics. The monitoring page also categorizes logs by severity level, assisting you in troubleshooting any issues.

To return to the main dashboard, simply click on "VM Instances" in the left-hand navigation menu.

### Deleting the Instance

When you are finished, you might want to clean up unused resources. To delete the virtual machine, open the three-dot menu again, select "Delete," and confirm your action.

![The image shows a Google Cloud Console interface where a user is prompted to confirm the deletion of a virtual machine instance named "first-vm-instance." The options to cancel or delete are visible.](https://kodekloud.com/kk-media/image/upload/v1752875243/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Compute-02-2/google-cloud-console-delete-vm.jpg)

> [!important]
> **Note**
>
> If you're utilizing a free trial, be aware that the time spent on the virtual machine counts against your trial resources. For non-trial users, charges may apply based on the usage duration. We highly recommend deleting unused virtual machines promptly to avoid unexpected billing.

## Conclusion

This lesson covered the essential steps for connecting to and managing your compute instance, including accessing the terminal, monitoring performance, and safely stopping or deleting your VM. Following these guidelines will help you maintain an organized and resource-efficient environment.

Thank you for reading. We look forward to guiding you in our next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/015fc866-5579-442a-80f8-f4e795b70c33/lesson/3f7863ad-8d45-4f26-8158-cb63b0b4d215)**
>
> Watch video content
