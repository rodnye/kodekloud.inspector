# Demo Setting up SNSSQS to send Messages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Demo-Setting-up-SNSSQS-to-send-Messages)

---

## Table of Contents

- Demo Setting up SNSSQS to send Messages
  - Creating an Auto Scaling Group
  - Creating the Launch Template
  - Configuring VPC, Load Balancer, and Target Group
  - Setting Scaling Policies and Capacity
  - Testing Auto Scaling
  - Stress Testing and Monitoring CPU Utilization
  - Finalizing
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Demo Setting up SNSSQS to send Messages

In this demonstration, we illustrate how to set up an AWS Auto Scaling Group to deploy a simple web server that automatically scales based on load or custom policies. Follow this guide to configure your launch template, connect to a load balancer, and test CPU-driven auto scaling in a production-like environment.

---

## Creating an Auto Scaling Group

1.  Log in to the AWS Management Console and navigate to the EC2 service. Scroll down to the "Auto Scaling Groups" section.
2.  Click to create a new Auto Scaling Group and assign it a unique name.

![The image shows an Amazon EC2 Auto Scaling webpage, explaining its features and benefits, with options to create an Auto Scaling group and information on pricing and getting started.](https://kodekloud.com/kk-media/image/upload/v1752859919/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/amazon-ec2-auto-scaling-webpage.jpg)

3.  When prompted, choose a launch template or launch configuration. A launch template provides enhanced customization options such as specifying the AMI, instance type, key pair, and security groups. Since no launch template exists yet, opt to create one; this action will open a new tab.

![The image shows an AWS EC2 console screen for creating an Auto Scaling group, where a user can specify a launch template or configuration. The interface includes fields for naming the group and selecting or creating a launch template.](https://kodekloud.com/kk-media/image/upload/v1752859920/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-auto-scaling-group.jpg)

---

## Creating the Launch Template

In the new tab, follow these steps to create your launch template:

1.  Provide a descriptive name (for example, “my web template”) for the template that represents your production web server.
2.  Optionally, add tags or specify a source template if desired; this guide demonstrates building the template from scratch.

![The image shows an AWS console interface for creating a launch template, with fields for template name, description, and auto-scaling guidance options. A summary section on the right provides information about software image, server type, and storage.](https://kodekloud.com/kk-media/image/upload/v1752859920/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-launch-template-console-interface.jpg)

3.  Scroll down and select the Amazon Machine Image (AMI). For example, choose your custom AMI named “web ASG demo,” which launches a simple Linux instance running an Nginx server.

![The image shows an AWS EC2 console interface for creating a launch template, with options to select an Amazon Machine Image (AMI) and a summary of the selected configuration.](https://kodekloud.com/kk-media/image/upload/v1752859921/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-launch-template-ami.jpg)

4.  Choose an instance type (e.g., t2.micro, free tier eligible) and specify the key pair (e.g., “main”) for SSH access.
5.  If desired, add network settings such as subnet details. In this example, leave the subnet blank so that the launch template can be used with multiple Auto Scaling Groups. Ensure you select a security group (for example, “web SG”) that permits HTTP (port 80) traffic.
6.  Retain the default settings for storage, resource tags, and advanced configurations. Finally, click “Create Launch Template” to save your configuration.

![The image shows an AWS EC2 console interface for creating a launch template, detailing security groups, storage volumes, and resource tags. The summary section includes information about the software image, instance type, and firewall settings.](https://kodekloud.com/kk-media/image/upload/v1752859922/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-launch-template-console.jpg)

> [!important]
> **Versioning Reminder**
>
> After creating the launch template, verify that it appears in the templates list with version 1. This versioning feature allows you to update settings like the AMI later, automatically propagating changes to all associated EC2 instances.

Return to the Auto Scaling Group tab, refresh the page, and select the newly created launch template (version 1 if only one version exists).

![The image shows an AWS EC2 console screen for creating an Auto Scaling group, with options to choose a launch template or configuration. The selected launch template is named "myweb-template" with instance type "t2.micro."](https://kodekloud.com/kk-media/image/upload/v1752859924/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-auto-scaling-myweb-template.jpg)

---

## Configuring VPC, Load Balancer, and Target Group

1.  Review and update the Auto Scaling Group configuration:
    - Select the appropriate VPC (for example, “demo VPC”).
    - Specify the availability zones and subnets where you want your EC2 instances deployed. In this guide, the instances are deployed within private subnets while the load balancer resides in public subnets.

![The image shows an AWS EC2 console screen where a user is choosing instance launch options, specifically selecting a VPC for an Auto Scaling group. It includes steps for configuring instance type requirements and other settings.](https://kodekloud.com/kk-media/image/upload/v1752859925/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-launch-options-vpc-autoscaling.jpg)

2.  Proceed to the load balancer configuration by selecting the option to create a new load balancer. For a web server deployment, choose an Application Load Balancer with a default name (such as “web autoscale”). Set the load balancer to be internet-facing and assign it to public subnets. Ensure that port 80 is used for the listener to handle HTTP traffic.

![The image shows an AWS console interface for attaching a new load balancer to an auto-scaling group, with options for load balancer type, name, scheme, and network mapping.](https://kodekloud.com/kk-media/image/upload/v1752859926/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-console-load-balancer-auto-scaling.jpg)

3.  Create a target group for the load balancer. Provide a name (for example, “web autoscale one tg”) and configure optional settings such as tags or VPC Lattice integration if necessary. Make sure to enable Elastic Load Balancing health checks with the default 300-second grace period, and configure CloudWatch metrics as needed.

![The image shows an AWS console interface for configuring an Auto Scaling group, including options for listeners, routing, VPC Lattice integration, and health checks.](https://kodekloud.com/kk-media/image/upload/v1752859927/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-console-auto-scaling-group.jpg)

---

## Setting Scaling Policies and Capacity

1.  Specify the capacity settings for your Auto Scaling Group using the following configuration:
    - **Desired Capacity:** 1 instance
    - **Minimum Capacity:** 1 instance (ensuring at least one server remains active)
    - **Maximum Capacity:** 3 instances (to cap scaling even during high load)

![The image shows a configuration screen for setting group size and scaling policies in an AWS Auto Scaling group, with options for desired, minimum, and maximum capacity. There are also options for scaling policies, including target tracking and none.](https://kodekloud.com/kk-media/image/upload/v1752859928/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-auto-scaling-group-configuration.jpg)

2.  Configure the scaling policy using a target tracking method. Set the policy to monitor the average CPU utilization across all instances in the group, with a target of 40% CPU usage. If desired, specify an instance warm-up period and enable scaling protections; the default values typically work well.

![The image shows an AWS console screen for configuring scaling policies, with options for setting a target tracking scaling policy and selecting a metric type like average CPU utilization.](https://kodekloud.com/kk-media/image/upload/v1752859929/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-console-scaling-policies-config.jpg)

3.  Review additional settings such as notifications and resource tags, then click “Create Auto Scaling Group.” AWS will now deploy the Auto Scaling Group along with the associated EC2 instance, load balancer, and target group.
4.  Verify that the Auto Scaling Group details show a desired capacity of 1, a minimum of 1, and a maximum of 3. You can inspect configurations by clicking on the launch template or examining the load balancer details.

![The image shows an AWS EC2 Auto Scaling group configuration page, displaying details for a group named "web-autoscale" with a desired capacity of 1 and a maximum capacity of 3.](https://kodekloud.com/kk-media/image/upload/v1752859931/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-auto-scaling-web-autoscale.jpg)

5.  Click on the load balancer link to verify the associated target group and other settings.

![The image shows an AWS EC2 console screen displaying details of a target group named "web-autoscale-1-tg." It includes information about target type, protocol, load balancer, and the health status of registered targets.](https://kodekloud.com/kk-media/image/upload/v1752859932/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-target-group-web-autoscale.jpg)

> [!important]
> **Connectivity Test**
>
> After verifying that one EC2 instance is running in your Auto Scaling Group, test connectivity by opening the load balancer’s DNS name in a new browser tab. You should see your welcome message (for example, “Welcome to KodeKloud”), confirming that the web server is accessible.

---

## Testing Auto Scaling

To simulate an instance failure and validate that the Auto Scaling Group automatically replaces terminated instances:

1.  Manually terminate the running EC2 instance via the EC2 console.
2.  Monitor the Auto Scaling Group's activity log. It should show notifications that an instance went out of service due to a failed health check, followed by the launch of a replacement instance.

![The image shows an AWS EC2 Auto Scaling activity dashboard, displaying activity notifications and a history of recent scaling activities, including launching and terminating instances.](https://kodekloud.com/kk-media/image/upload/v1752859933/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-auto-scaling-dashboard.jpg)

3.  Confirm in the EC2 console that a new instance is running, thereby ensuring the desired capacity of one instance is maintained.

---

## Stress Testing and Monitoring CPU Utilization

The scaling policy is based on CPU utilization. To perform a stress test:

1.  Connect to one of the EC2 instances in the Auto Scaling Group using SSH.
2.  Run the following command to view the system’s status:

    bash top - 04:33:30 up 3 min, 2 users, load average: 0.01, 0.04, 0.01 Tasks: 114 total, 1 running, 113 sleeping, 0 stopped, 0 zombie %Cpu(s): 0.0 us, 6.2 sy, 0.0 ni, 93.8 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st MiB Mem : 949.4 total, 572.5 free, 1.0 used, 159.3 buff/cache MiB Swap: 0.0 total, 0.0 free, 0.0 used. 650.5 avail Mem PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND 1 root 20 0 105164 16364 10024 S 0.0 1.7 00:00.86 systemd

3.  Next, execute the stress test command to increase CPU usage:

    bash \[ec2-user@ip-10-0-129-234 ~\]$ stress -c 1

4.  After executing the stress command, check the updated CPU report:

    bash top - 04:34:00 up 4 min, 2 users, load average: 0.29, 0.10, 0.03 Tasks: 116 total, 2 running, 114 sleeping, 0 stopped, 0 zombie %Cpu(s): 100.0 us, 0.0 sy, 0.0 ni, 0.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st MiB Mem : 949.4 total, 572.3 free, 159.4 used, 217.7 buff/cache MiB Swap: 0.0 total, 0.0 free, 0.0 used. 650.3 avail Mem PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND 2556 ec2-user 20 0 3512 112 0 R 99.7 0.1 0:19.71 stress 1 root 20 0 105164 16364 10024 S 0.6 1.7 0:08.86 systemd 2 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kthreadd 3 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_gp 4 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_par_gp 5 root 20 0 0 0 0 S 0.0 0.0 0:00.00 slub_flushqw 6 root 20 0 0 0 0 S 0.0 0.0 0:00.00 netns 7 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kworker/0:0-events 8 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kworker/0:0H-events_highpri 9 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kworker/u30:0-events_unbound 10 root 20 0 0 0 0 S 0.0 0.0 0:00.00 mm_percpu_wq 11 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_tasks_kthread 12 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_tasks_rude_kthread 13 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_tasks_trace_kthread 14 root 20 0 0 0 0 S 0.0 0.0 0:00.00 ksoftirqd/0 15 root 20 0 0 0 0 S 0.0 0.0 0:00.00 rcu_preempt 16 root 20 0 0 0 0 S 0.0 0.0 0:00.00 migration/0 17 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kworker/0:1-cgroup_destroy

While the stress test is active, the Auto Scaling Group will monitor the averaged CPU utilization. When the usage exceeds the 40% target, the scaling policy triggers, increasing the number of instances from 1 up to a maximum of 3.

![The image shows an AWS EC2 Auto Scaling Groups dashboard, displaying details of a group named "web-autoscale" with activity history logs for launching EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752859935/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-SNSSQS-to-send-Messages/aws-ec2-auto-scaling-dashboard-2.jpg)

Finally, refresh the EC2 instances page to verify that three instances are running. The configuration ensures that even if CPU utilization remains elevated, scaling will not exceed the defined maximum capacity.

---

## Finalizing

Once you have validated the Auto Scaling behavior with the stress test, clean up your resources by deleting the Auto Scaling Group:

1.  Select the group within the AWS console.
2.  Click “Delete” to remove the Auto Scaling configuration, associated EC2 instances, load balancer, and target group.

This concludes the demonstration on setting up an Auto Scaling Group in AWS using a launch template, load balancer, and a CPU-based scaling policy. Enjoy the robust scalability and reliability provided by AWS Auto Scaling in your deployments!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/6e820c6d-0725-4567-9d7b-abe43c650c5a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/4656ffcf-caae-4262-b3ee-d77c95c5dd75)**
>
> Practice lab
