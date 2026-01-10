# Demo Setting up Various Autoscaling Plans - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Setting-up-Various-Autoscaling-Plans)

---

## Table of Contents

- Demo Setting up Various Autoscaling Plans
  - Step 1: Accessing Auto Scaling Groups
  - Step 2: Creating an Auto Scaling Group
  - Step 3: Creating a Launch Template
  - Step 4: Configuring the Launch Template
  - Step 5: Configuring the Auto Scaling Group
  - Step 6: Configuring the Load Balancer
  - Step 7: Defining Group Sizes
  - Step 8: Establishing a Scaling Policy
  - Step 9: Finalizing the Auto Scaling Group
  - Step 10: Verifying Connectivity
  - Step 11: Testing Auto Scaling Functionality
  - Step 12: Simulating High CPU Load
  - Step 13: Cleaning Up
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Setting up Various Autoscaling Plans

In this demo, we will walk through setting up AWS Auto Scaling groups to dynamically manage EC2 instances based on demand. We will deploy a simple web server, configure an Auto Scaling group with a launch template, and illustrate how the group automatically adjusts capacity when needed. Follow the detailed steps below and refer to the diagrams for visual guidance.

## Step 1: Accessing Auto Scaling Groups

1.  Log in to the AWS console and search for the EC2 service.
2.  Scroll down and select **Auto Scaling groups**.

## Step 2: Creating an Auto Scaling Group

1.  Click on the option to create a new Auto Scaling group.
2.  Assign a name to the group (e.g., "web-autoscale").  
    At this stage, you must specify a launch template or a launch configuration. Launch templates are recommended as they provide enhanced customization options including the selection of AMI, instance type, key pair, and security groups.

![The image shows an AWS console interface for creating an Auto Scaling group, where a user can specify a launch template or configuration. The "Auto Scaling group name" is set to "web-autoscale."](https://kodekloud.com/kk-media/image/upload/v1752860106/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-console-auto-scaling-group.jpg)

## Step 3: Creating a Launch Template

Since no launch template exists yet, choose to create one. This will open a new tab where you can define the settings for your EC2 instances.

1.  Enter a name for the launch template (e.g., "my web template") along with a description such as "prod web server."
2.  You may optionally add tags or select a source template, but in this demo, we are creating everything from scratch.

![The image shows an AWS console interface for creating a launch template, with fields for the template name and description, and options for auto-scaling guidance. A summary section is visible on the right.](https://kodekloud.com/kk-media/image/upload/v1752860107/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-console-launch-template-interface.jpg)

## Step 4: Configuring the Launch Template

1.  Select the Amazon Machine Image (AMI) to use for the instance. For example, choose your custom AMI (e.g., "web ASG demo") which runs Nginx on a simple Linux server.
2.  Choose the instance type. The t2.micro instance type is recommended as it qualifies for the free tier.
3.  Configure the key pair by selecting your preferred option (e.g., "main").
4.  Under network settings, even though specifying subnets is optional at this stage (you can set them later in the Auto Scaling group), make sure to select a security group that permits traffic on port 80 for HTTP requests.

![The image shows an AWS EC2 console screen for creating a launch template, including options for key pair, network settings, and storage volumes. A summary section on the right provides details about the software image, instance type, and free tier information.](https://kodekloud.com/kk-media/image/upload/v1752860108/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-launch-template-console.jpg)

5.  Leave the default settings for storage, resource tags, and advanced options, then create the launch template. The new template ("my web-template") will appear with version one. Future modifications to the template generate new versions, allowing seamless updates across all associated servers.

## Step 5: Configuring the Auto Scaling Group

1.  Return to the Auto Scaling group tab in the AWS console and refresh the page.
2.  Select your newly created launch template ensuring that version one is chosen.
3.  Review the configuration details and click **Next**.
4.  Choose your VPC (e.g., "demo VPC") and select the availability zones/subnets where you want your EC2 instance deployed. For this demo, deploy instances in private subnets while planning to configure the load balancer in public subnets.

![The image shows an AWS console interface for choosing instance launch options, including selecting a VPC and configuring instance type requirements.](https://kodekloud.com/kk-media/image/upload/v1752860110/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-console-instance-launch-options.jpg)

## Step 6: Configuring the Load Balancer

1.  Specify whether you want to create a load balancer. For this demo, create a new load balancer.
2.  Choose the Application Load Balancer type for web servers. Use the default name (e.g., "web-autoscale") and set the scheme to "internet-facing."
3.  Select public subnets.
4.  Configure a listener on port 80 and create a target group (e.g., "web autoscale one tg") that forwards requests from the load balancer to the EC2 instances.
5.  Optionally, enable Elastic Load Balancing health checks, set a grace period (default of 300 seconds), and choose CloudWatch metrics if required.

![The image shows an AWS console interface for configuring advanced options in an Auto Scaling group, including load balancing and VPC Lattice integration options.](https://kodekloud.com/kk-media/image/upload/v1752860111/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-console-auto-scaling-options.jpg)

![The image shows an AWS EC2 Auto Scaling configuration page, focusing on health check settings and additional settings like monitoring and instance warmup.](https://kodekloud.com/kk-media/image/upload/v1752860112/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-auto-scaling-settings.jpg)

## Step 7: Defining Group Sizes

1.  Set the desired capacity by defining the minimum, desired, and maximum number of EC2 instances.
    - In this example, both the desired and minimum capacities are set to 1 to ensure that at least one instance is always running.
    - The maximum capacity is set to 3 to allow the group to scale during periods of increased load.

![The image shows an AWS EC2 console screen for configuring group size and scaling policies in an Auto Scaling group, with options for setting desired, minimum, and maximum capacities.](https://kodekloud.com/kk-media/image/upload/v1752860113/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-auto-scaling-group-config.jpg)

## Step 8: Establishing a Scaling Policy

1.  Configure a target tracking scaling policy:
    - Provide a name for the policy if desired.
    - Set the metric type to "Average CPU utilization."
    - For demonstration purposes, use a target CPU utilization value of 40% to simulate scaling actions easily.
2.  Leave the instance warm-up and any instance scaling protections at their default settings.
3.  Optionally, add notifications or additional tags.

![The image shows an AWS console screen for setting up an auto-scaling policy, with options for target tracking, metric type, target value, and instance warmup.](https://kodekloud.com/kk-media/image/upload/v1752860114/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-auto-scaling-policy-console.jpg)

## Step 9: Finalizing the Auto Scaling Group

1.  Review all your settings carefully.
2.  Click **Create auto scaling group**. AWS will:
    - Create the Auto Scaling group.
    - Launch the defined number of EC2 instances (one instance in this example).
    - Set up the load balancer and target group as configured.

After creation, you can inspect the following:

- The launch template configuration including network settings and load balancer details.
- The target group with its associated instance.
- The EC2 instance(s), which may initially show "status check initialization" while booting.

![The image shows an AWS EC2 Auto Scaling group configuration page, detailing a group named "web-autoscale" with a desired capacity of 1, minimum capacity of 1, and maximum capacity of 3.](https://kodekloud.com/kk-media/image/upload/v1752860115/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-auto-scaling-web-autoscale.jpg)

## Step 10: Verifying Connectivity

1.  Retrieve the DNS name from the load balancer.
2.  Open a new browser tab and paste the URL.
3.  You should see the welcome page (e.g., "Welcome to KodeKloud"), indicating that the EC2 instance and load balancer are correctly integrated.

## Step 11: Testing Auto Scaling Functionality

To demonstrate auto scaling during instance failure:

1.  Navigate to the EC2 instances dashboard.
2.  Select the instance belonging to the Auto Scaling group and choose **Terminate**.
3.  The Auto Scaling group will detect the terminated instance and launch a replacement to meet the desired capacity.
4.  Review the Auto Scaling group’s activity log for entries indicating an instance removal due to failing a health check and subsequent replacement.
5.  Verify in the EC2 instances dashboard that the new instance is running.

![The image shows an AWS EC2 management console with a list of instances, including their states, types, and status checks. Two instances are running, while others are terminated.](https://kodekloud.com/kk-media/image/upload/v1752860116/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-management-console-instances.jpg)

Additionally, inspect the Auto Scaling group dashboard to confirm that the target tracking policy is actively monitoring the average CPU utilization across instances. The target is set to 40%, so if CPU usage exceeds this threshold, further scaling actions will occur.

![The image shows an AWS EC2 Auto Scaling Groups dashboard with a group named "web-autoscale" and a target tracking policy enabled to maintain average CPU utilization.](https://kodekloud.com/kk-media/image/upload/v1752860117/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-auto-scaling-dashboard.jpg)

## Step 12: Simulating High CPU Load

To further test the scaling mechanism, simulate a high CPU load as follows:

1.  Connect to the EC2 instance via SSH.
2.  Check the current CPU usage:

    ```
    top - 04:33:30 up 3 min,  2 users,  load average: 0.01, 0.04, 0.01
    Tasks: 114 total,   1 running, 113 sleeping,   0 stopped,   0 zombie
    %Cpu(s):  0.0 us,  6.2 sy,  0.0 ni, 93.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    MiB Mem :  949.4 total,  572.5 free,    1.0 used,  217.6 buff/cache
    MiB Swap:    0.0 total,    0.0 free,    0.0 used.  650.5 avail Mem
      PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
        1 root      20   0  105164  16364  10024 S   0.0  1.7   00:00.86 systemd
    ```

3.  Run a stress test to increase the CPU usage:

    ```
    stress -c 1
    ```

4.  After initiating the stress test, check the CPU usage again:

    ```
    top - 04:34:00 up 4 min,  2 users,  load average: 0.29, 0.10, 0.03
    Tasks: 116 total,   2 running, 114 sleeping,   0 stopped,   0 zombie
    %Cpu(s): 100.0 us,  0.0 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    MiB Mem :  949.4 total,  572.3 free,  159.4 used,  217.7 buff/cache
    MiB Swap:  0.0 total,  0.0 free,  0.0 used.  650.3 avail Mem
      PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
     2556 ec2-user  20   0   3512   112    0 R  99.7  0.1   0:19.71 stress
    ```

The increased CPU load should trigger the target tracking scaling policy, prompting the Auto Scaling group to launch additional instances to bring the average CPU utilization down to 40%. Review the activity log to see the group’s desired capacity change from one to three, with new instances being added.

![The image shows an AWS EC2 Auto Scaling Groups dashboard, displaying details of an auto-scaling group named "web-autoscale" with activity history logs indicating instances being launched and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752860118/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Various-Autoscaling-Plans/aws-ec2-auto-scaling-dashboard-2.jpg)

After verifying in the AWS console that three instances are running (with the maximum capacity capped at three), the scaling demonstration is complete.

## Step 13: Cleaning Up

To conclude the demonstration, delete the Auto Scaling group by selecting it and clicking **Delete**. This action will remove the Auto Scaling group along with its associated resources.

> [!important]
> **Note**
>
> This demo illustrates how AWS Auto Scaling groups ensure application availability by automatically adjusting the number of running EC2 instances in response to changing demand.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/09157f8e-109a-4ab9-9a2a-2d4806d74ab8)**
>
> Watch video content
