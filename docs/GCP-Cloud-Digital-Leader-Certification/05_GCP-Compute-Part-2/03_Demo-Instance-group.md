# Demo Instance group - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-2/Demo-Instance-group)

---

## Table of Contents

- Demo Instance group
  - Accessing the GCP Console
  - Creating an Instance Group
  - Verifying and Monitoring the Instance Group
  - Testing Self-Healing Capability
  - Cleaning Up Resources
  - Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 2

# Demo Instance group

Welcome back! In this lesson, you will learn how to create an instance group in the Google Cloud Platform (GCP) console and explore the key parameters configured during its creation. Follow along to ensure your instance group is set up correctly and efficiently.

---

## Accessing the GCP Console

1.  Log into the [Google Cloud Platform Console](https://console.cloud.google.com/).
2.  Once logged in, verify that you have selected the correct project. For this demonstration, I have chosen the project I created specifically for this training.

    ![The image shows a Google Cloud Platform dashboard for a project named "KodeKloud-GCP-Training," featuring options to create a VM, run a BigQuery, and access various project resources.](https://kodekloud.com/kk-media/image/upload/v1752875247/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-platform-kodekloud-dashboard.jpg)

3.  In the search bar, type “compute” and select **Compute Engine**. The Compute Engine page will display, showing that there are no active VMs running to help avoid unnecessary costs.
4.  If you do not see the left sidebar, click the toggle icon (the chevron icon) at the bottom of the screen.

    ![The image shows the Google Cloud Platform interface for managing VM instances, with options to create or import a virtual machine. The sidebar includes navigation options like Disks, Snapshots, and Images.](https://kodekloud.com/kk-media/image/upload/v1752875248/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-platform-vm-management.jpg)

---

## Creating an Instance Group

1.  Scroll down the left sidebar until you find the **Instance groups** section. If you haven’t created any instance groups yet, the interface will indicate that none exist. Click **Create instance group** to start the process.

    ![The image shows a Google Cloud interface for managing Compute Engine instance groups, with an option to create a new instance group.](https://kodekloud.com/kk-media/image/upload/v1752875249/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-compute-engine-instance-groups.jpg)

2.  A configuration form appears with several parameters:
    - **Name and Description:** Provide a clear name for your instance group and a brief description (for example, "this is my test instance group"). A meaningful description is especially useful in collaborative environments.

      ![The image shows a Google Cloud interface for creating an instance group, with options for naming, description, instance template, location, and autoscaling settings.](https://kodekloud.com/kk-media/image/upload/v1752875250/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-instance-group-interface.jpg)

    - **Instance Template:** An instance template defines the configuration of the virtual machines within the group, including machine type, disk space, and other settings. If you haven’t created one yet, you can create an instance template on the fly.

      Within the instance template settings, you have the option to add labels (for example, "NVIDIA development") and adjust boot disk configurations. In this demonstration, the boot disk options are left as default and both HTTP and HTTPS traffic are enabled.

      ![The image shows a Google Cloud interface for creating an instance template, with options for size, license type, image selection, identity and API access, firewall settings, and advanced options.](https://kodekloud.com/kk-media/image/upload/v1752875251/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-instance-template-interface.jpg)

3.  Once the instance template is configured, click **Save and continue**. This saves the template for future instance groups, ensuring consistency across your deployments.
4.  Configure the instance group location (using the default option is acceptable) and adjust the autoscaling settings:
    - **Autoscaling Settings:** Define the minimum and maximum number of instances. For this demo, the minimum is set to 1 and the maximum to 3. A scaling rule is configured to add an instance if CPU utilization exceeds 60%.

    > [!important]
    > **Autoscaling Tip**
    >
    > For a more conservative scaling policy, consider setting the CPU utilization threshold to 80% and defining an appropriate cooldown period to prevent frequent scaling events.

    ![The image shows a Google Cloud interface for creating an instance group, with options for autoscaling settings, including minimum and maximum instances, CPU utilization metrics, and cooldown periods.](https://kodekloud.com/kk-media/image/upload/v1752875252/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-instance-group-autoscaling.jpg)

    ![The image shows a Google Cloud interface for creating an instance group, with options for autoscaling metrics, schedules, and autohealing settings. It includes settings for CPU utilization and a cooldown period.](https://kodekloud.com/kk-media/image/upload/v1752875253/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-instance-group-autoscaling-2.jpg)

5.  After reviewing all settings, click **Create**. With these configurations, the instance group will initially deploy one virtual machine. If you specify a higher minimum instance count, the corresponding number of VMs will be created immediately.

---

## Verifying and Monitoring the Instance Group

1.  Navigate to **VM instances** in the left-hand menu. You should see that one virtual machine has been created and is managed by the instance group configuration, indicated by its labels and linked instance template.

    ![The image shows a Google Cloud Platform (GCP) Compute Engine interface displaying details of a virtual machine instance, including its status, creation time, and zone. A notification at the bottom indicates the successful creation of an instance group.](https://kodekloud.com/kk-media/image/upload/v1752875255/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/gcp-compute-engine-vm-details.jpg)

2.  Click on the individual VM to inspect its configuration and confirm that it belongs to the instance group. Managed VMs are preferable to unmanaged ones, which might only be used for testing.
3.  Return to the instance group view and click on the **Monitoring** tab. This section displays aggregate metrics (such as average CPU and RAM utilization) for all VMs in the group, making centralized management of autoscaling and autohealing features easier.

    ![The image shows a Google Cloud Platform (GCP) Compute Engine interface, specifically the monitoring tab for an instance group, displaying charts for group size and autoscaler utilization with no data available.](https://kodekloud.com/kk-media/image/upload/v1752875256/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/gcp-compute-engine-monitoring-tab.jpg)

---

## Testing Self-Healing Capability

It is important to understand how instance groups handle failures:

1.  Select any instance in the group and click **Delete instance**. Confirm the deletion when prompted.

    > [!important]
    > **Important**
    >
    > With a minimum instance count set to 1, the instance group will automatically create a new virtual machine after deletion. This self-healing feature maintains service availability even if a VM is manually removed.

    ![The image shows a Google Cloud Platform interface for managing a Compute Engine instance group. It displays details such as instance status, creation time, template, and autoscaling settings.](https://kodekloud.com/kk-media/image/upload/v1752875257/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-compute-engine-interface.jpg)

2.  Monitor the instance group to see a new VM being added. The newly created VM will have a modified identifier, confirming it as a replacement.

    ![The image shows a Google Cloud Platform interface for managing a compute instance group, displaying settings for location, autoscaling, autohealing, and networking.](https://kodekloud.com/kk-media/image/upload/v1752875258/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-compute-instance-group.jpg)

---

## Cleaning Up Resources

When you have finished practicing, it is crucial to delete resources to prevent unnecessary charges:

1.  Return to the instance group page.
2.  Select the instance group and click **Delete**.

    > [!important]
    > **Resource Cleanup Reminder**
    >
    > Always delete unused resources to avoid exceeding your free quota and incurring additional costs.

    ![The image shows a Google Cloud Platform interface with a confirmation dialog for deleting an instance group named "my-instance-group." The user is prompted to type "delete" to confirm the action.](https://kodekloud.com/kk-media/image/upload/v1752875260/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-delete-instance-group-dialog.jpg)

3.  Although we created an instance template during this process, there is no need to delete it since it does not incur extra charges and can be reused in future projects.

    ![The image shows a Google Cloud Platform interface displaying a list of instance templates, with one template named "my-instance-template" highlighted. A notification at the bottom indicates that an instance group is being deleted.](https://kodekloud.com/kk-media/image/upload/v1752875261/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Instance-group/google-cloud-instance-templates-highlighted.jpg)

---

## Conclusion

This lesson demonstrated how to create, configure, and monitor an instance group in GCP. Follow each step diligently, and don’t forget to clean up your resources to avoid unnecessary charges.

Thank you for participating, and see you in the next lesson!

---

For further reading and more detailed guides, consider checking out the following resources:

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Compute Engine Documentation](https://cloud.google.com/compute/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/da34bf7c-6568-4fbd-82a2-181ac35e826f/lesson/9788dc7d-b8a8-416e-8ff4-fde6d06c6562)**
>
> Watch video content
