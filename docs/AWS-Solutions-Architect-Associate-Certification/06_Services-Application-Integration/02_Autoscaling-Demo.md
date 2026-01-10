# Autoscaling Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/Autoscaling-Demo)

---

## Table of Contents

- Autoscaling Demo
  - Creating the Auto Scaling Group
  - Creating a Launch Template
  - Configuring Network Settings
  - Configuring the Load Balancer
  - Setting Capacity and Scaling Policies
  - Verifying the Setup
  - Testing Auto Scaling
  - Simulating High CPU Load
  - Cleaning Up
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# Autoscaling Demo

In this lesson, you will learn how to configure and deploy an Auto Scaling group on AWS by launching a simple Nginx web server. The demo walks you through creating a launch template, setting up network and load balancer configurations, establishing scaling policies, and testing auto scaling behavior under high CPU load.

## Creating the Auto Scaling Group

Start by logging into the AWS EC2 console and navigating to the EC2 service. Scroll down to find the "Auto Scaling Groups" section.

Next, click on "Create Auto Scaling Group" and provide a descriptive name such as "web-auto scale." You will be prompted to choose between a launch template or a launch configuration. Launch templates offer enhanced customization, making them preferable. In the launch template, you will specify the following:

- AMI to use
- Instance type
- Key pair
- Security groups

Since a launch template is not yet available, select the option to create one. A new tab will open for creating the launch template.

![The image shows an AWS EC2 console screen for creating an Auto Scaling group, where a user can specify a launch template or configuration.](https://kodekloud.com/kk-media/image/upload/v1752864687/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-group.jpg)

## Creating a Launch Template

In the new tab, complete the settings for your EC2 instances. For example, set the template name to "my web template" and add a brief description like “prod web server.” While you can add tags or start with a source template, this demo builds the template from scratch.

At the AMI selection section, choose your specific AMI. In this demonstration, we use a custom Linux AMI called "web ASG demo" that runs an Nginx server.

![The image shows an AWS console interface for creating a launch template, with fields for the template name, description, and auto-scaling guidance options. A summary section on the right provides information about software image, server type, and storage.](https://kodekloud.com/kk-media/image/upload/v1752864688/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-launch-template-console-interface.jpg)

Next, set the instance type. For this demo, select "t2.micro" as it qualifies for the free tier. Choose your key pair (e.g., "main"). In the network settings, specify a security group (such as "web SG") that allows port 80. Leave the subnet settings blank to ensure flexibility when using the template in multiple auto scaling groups.

![The image shows an AWS EC2 console screen for creating a launch template, with options to select an Amazon Machine Image (AMI) and other configuration details. A summary section on the right provides information about the selected AMI and storage volumes.](https://kodekloud.com/kk-media/image/upload/v1752864689/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-launch-template-ami.jpg)

Review the storage, resource tags, and advanced settings, retaining the defaults. Then click "Create launch template." Your new launch template ("my web template") will appear with version 1. Remember, you can update the template settings (like the AMI) and generate new versions later.

Return to the Auto Scaling Group tab, refresh the page, and select your newly created launch template. If multiple versions exist, pick the default (version one).

![The image shows an AWS EC2 console screen for creating an Auto Scaling group, with options to choose a launch template or configuration. The selected launch template is named "myweb-template" with instance type "t2.micro."](https://kodekloud.com/kk-media/image/upload/v1752864691/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-myweb-template.jpg)

## Configuring Network Settings

Select the appropriate VPC for your auto scaling group. In this demo, a demo VPC is used and instances are deployed in private subnets (with a load balancer later placed in public subnets). While you have the option to override launch template settings (e.g., different instance types), the default values are used here.

Proceed to the next configuration step.

## Configuring the Load Balancer

Decide if you want to associate a load balancer with your auto scaling group. For this demonstration, choose to create a new load balancer. An Application Load Balancer (ALB) is recommended because it is well-suited for web servers. Keep the default load balancer name (e.g., "web autoscale one"), set the scheme to "internet-facing," and assign it to public subnets. Ensure that the listener is configured for port 80.

Now, create a target group to route requests from the load balancer to the EC2 instances. For example, name the target group "web autoscale one tg." You may add optional tags and specify VPC Lattice integration options. Enable the Elastic Load Balancing health checks with a 300-second grace period and retain the default CloudWatch metrics settings.

## Setting Capacity and Scaling Policies

Define the capacity settings for your auto scaling group. For instance, you might use:

- Desired capacity: 1
- Minimum capacity: 1 (ensuring at least one instance remains active)
- Maximum capacity: 3 (to handle increased load)

Next, establish a target tracking scaling policy based on average CPU utilization. For the demo, set the target CPU utilization to 40%. In a production scenario, you might choose a different threshold (such as 70% or lower) depending on your traffic tolerance. Optionally, configure an instance warm-up period and enable instance scaling protection. Leave additional notification settings as default, review all configurations, and create the auto scaling group.

![The image shows an AWS EC2 console interface for configuring advanced options in an Auto Scaling group, including load balancing and VPC Lattice integration options.](https://kodekloud.com/kk-media/image/upload/v1752864692/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-options.jpg)

Once the auto scaling group is created, AWS deploys the desired number of EC2 instances (in this case, one), sets up the load balancer, and configures the target group.

## Verifying the Setup

After deployment, verify the auto scaling group's configuration. Confirm that:

- Desired capacity: 1
- Minimum capacity: 1
- Maximum capacity: 3

Ensure that the launch template, network settings, and load balancer details display correctly. For example, clicking on the load balancer should show the target group with the deployed instance.

![The image shows an AWS EC2 Auto Scaling group configuration page, displaying details for a group named "web-autoscale" with a desired capacity of 1 and a maximum capacity of 3.](https://kodekloud.com/kk-media/image/upload/v1752864693/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-web-autoscale.jpg)

![The image shows an AWS EC2 console screen displaying details of a target group named "web-autoscale-1-tg," including target type, protocol, and health status of registered targets.](https://kodekloud.com/kk-media/image/upload/v1752864694/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-target-group-details.jpg)

At the load balancer level, double-check the security settings. Then, inspect the EC2 instances list to confirm that the instance from the auto scaling group is running—it may initially be in the "initialization" or "status check initialization" phase.

![The image shows an AWS EC2 management console with a list of instances, including their states, types, and status checks. Two instances are running, while the others are terminated.](https://kodekloud.com/kk-media/image/upload/v1752864695/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-management-console-instances.jpg)

To test the setup, copy the load balancer's DNS name, paste it into a new browser tab, and verify that you see a welcome message (e.g., "Welcome to KodeKloud"). This confirms that the EC2 instance was deployed correctly and the load balancer is properly forwarding requests.

## Testing Auto Scaling

To confirm that the auto scaling group operates as expected, manually terminate the EC2 instance. The auto scaling group should detect the termination and automatically launch a new instance to maintain the desired capacity.

Wait a few moments and then check the auto scaling group's activity log. You should see an entry for an instance being removed due to a failed health check, followed by an entry for the launch of a new instance.

![The image shows an AWS EC2 Auto Scaling activity dashboard with activity notifications and history, detailing the status and description of recent EC2 instance activities.](https://kodekloud.com/kk-media/image/upload/v1752864697/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-dashboard.jpg)

Return to the EC2 instances list to verify that a new instance is running.

![The image shows an AWS EC2 management console with a list of instances, their states, and details about a selected instance, which is terminated.](https://kodekloud.com/kk-media/image/upload/v1752864698/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-management-console-terminated-instance.jpg)

## Simulating High CPU Load

This section demonstrates how to trigger the scaling policy by simulating high CPU load.

1.  Connect to your EC2 instance via SSH.
2.  Run the monitoring tool `top` to observe the initial CPU utilization:

    ```
    top - 04:33:30 up 3 min,  2 users,  load average: 0.01, 0.04, 0.01
    Tasks: 114 total,   1 running, 113 sleeping,   0 stopped,   0 zombie
    %Cpu(s):  0.0 us,  6.2 sy,  0.0 ni, 93.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    MiB Mem :  949.4 total,  572.5 free,    1.8 used,  217.6 buff/cache
    MiB Swap:    0.0 total,    0.0 free,    0.0 used.  650.5 avail Mem
    ```

3.  To simulate load, run the following command to stress CPU resources:

    ```
    stress -c 1
    ```

4.  Run `top` again to observe the CPU usage, which should spike to 100%:

    ```
    top - 04:34:00 up 4 min,  2 users,  load average: 0.29, 0.10, 0.03
    Tasks: 116 total,   2 running, 114 sleeping,   0 stopped,   0 zombie
    %Cpu(s): 100.0 us,  0.0 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    MiB Mem :   949.4 total,   572.3 free,   159.4 used,   217.7 buff/cache
    MiB Swap:     0.0 total,     0.0 free,     0.0 used.   650.3 avail Mem
    ```

Allow the stress test to run until the average CPU utilization exceeds 40%. This triggers the auto scaling group's target tracking policy, which scales the instance count from one to three.

Examine the auto scaling activity log in the AWS console. You should see entries detailing the triggered alarm and the launch of additional instances.

![The image shows an AWS console screen for configuring scaling policies, with options for setting a target tracking scaling policy and selecting a metric type like average CPU utilization.](https://kodekloud.com/kk-media/image/upload/v1752864700/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-console-scaling-policies-config.jpg)

![The image shows an AWS console interface for setting up scaling policies, specifically a target tracking scaling policy for auto-scaling groups. It includes options for setting the scaling policy name, metric type, target value, and instance warmup time.](https://kodekloud.com/kk-media/image/upload/v1752864701/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-scaling-policy-interface-diagram.jpg)

Refresh the EC2 instances list; you should now see three instances running in the auto scaling group. Despite any further CPU load, the maximum capacity remains capped at three as configured.

![The image shows an AWS EC2 Auto Scaling Groups dashboard, displaying details of a group named "web-autoscale" with activity history logs indicating the launching of new EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752864702/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-dashboard-3.jpg)

## Cleaning Up

> [!important]
> **Cleanup Reminder**
>
> After completing this demo, ensure you delete the auto scaling group to terminate all associated resources (EC2 instances and load balancer configurations) and avoid extra charges.

To clean up, select the auto scaling group and choose "Delete." This action terminates the auto scaling group along with its associated resources.

![The image shows an AWS EC2 Auto Scaling Groups dashboard, displaying details of an auto scaling group named "web-autoscale" with a status of "Deleting."](https://kodekloud.com/kk-media/image/upload/v1752864703/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Autoscaling-Demo/aws-ec2-auto-scaling-dashboard-4.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/88945ddd-0b09-4124-8a00-c6f251dbb4ac)**
>
> Watch video content
