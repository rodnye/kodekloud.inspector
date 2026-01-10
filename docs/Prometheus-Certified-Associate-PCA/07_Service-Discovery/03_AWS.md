# AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Service-Discovery/AWS)

---

## Table of Contents

- AWS
  - Configuring AWS Access for Prometheus
  - Updating Prometheus Configuration
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Service Discovery

# AWS

Cloud infrastructure is inherently dynamic—especially with auto-scaling enabled. Resources are continuously deployed and terminated, making real-time EC2 service discovery essential for Prometheus to maintain an updated list of instances to scrape.

In this guide, you'll configure EC2 service discovery by setting up the EC2 SD configuration block within Prometheus. This setup requires three pieces of information:

- The AWS region of interest
- The access key
- The secret key

These credentials must belong to an IAM user with Amazon EC2 read-only access.

> [!important]
> **Important**
>
> Ensure that the IAM user you create has only the necessary read-only permissions to enhance security.

Below is an example configuration snippet for Prometheus:

```
scrape_configs:
  - job_name: EC2
    ec2_sd_configs:
      - region: <region>
        access_key: <access key>
        secret_key: <secret key>
```

Once configured, Prometheus begins collecting extensive metadata from your EC2 instances. You can view many discovered labels—such as tags, instance types, VPC IDs, and private IPs. By default, Prometheus uses the private IP as the instance label because it is typically deployed close to its targets within the same cloud environment. If needed, you can also access the public IP via metadata labels, which is useful when some EC2 instances lack a public IP address.

![The image shows an EC2 Service Discovery interface with a list of discovered labels and target labels for an EC2 instance. It includes details like instance ID, state, type, and various metadata.](https://kodekloud.com/kk-media/image/upload/v1752883088/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/ec2-service-discovery-interface.jpg)

## Configuring AWS Access for Prometheus

To enable Prometheus to access AWS EC2 metadata, you need to create an IAM user specifically for this purpose. Follow these steps in the AWS Management Console:

1.  Navigate to the IAM section.
2.  Create a new user named "Prometheus". This account is exclusively for programmatic access and will not use the AWS Console.
3.  Enable programmatic access by generating an access key.
4.  Attach the "Amazon EC2 read-only access" policy to the user.

![The image shows an AWS Management Console screen for adding a new user, where you can set user details and select the AWS access type. Options include programmatic access via access keys and console access via a password.](https://kodekloud.com/kk-media/image/upload/v1752883089/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/aws-management-console-add-user.jpg)

After attaching the required permissions, review the configuration and create the user. Once the new user is created, be sure to note the displayed access key and secret key, as these credentials are required in your Prometheus configuration.

![The image shows an AWS IAM interface for setting permissions while adding a user, with a list of EC2-related policies displayed.](https://kodekloud.com/kk-media/image/upload/v1752883091/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/aws-iam-user-permissions-ec2-policies.jpg)

![The image shows an AWS Management Console screen where a new user named "prometheus" has been successfully created, displaying their access key ID and secret access key.](https://kodekloud.com/kk-media/image/upload/v1752883092/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/aws-management-console-new-user-prometheus.jpg)

## Updating Prometheus Configuration

Edit your Prometheus configuration file, typically located at `/etc/prometheus/prometheus.yaml`, to add a new job definition for EC2 service discovery. Below is an example configuration integrating the EC2 SD setup with other scrape configurations:

```
# Global configurations
global:
  scrape_interval: 15s  # Scrape every 15 seconds (default is 1 minute).
  evaluation_interval: 15s  # Evaluate rules every 15 seconds (default is 1 minute).


# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093


# Rule files configuration (load rules periodically)
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"


# Scrape configurations
scrape_configs:
  # Scrape configuration for Prometheus itself
  - job_name: "prometheus"
    static_configs:
      - targets: ['localhost:9090']


  # Scrape configuration for Node Exporter
  - job_name: "node"
    static_configs:
      - targets: ['192.168.1.168:9100']


  # Scrape configuration for EC2 instances
  - job_name: "ec2"
    ec2_sd_configs:
      - region: "us-east-1"  # Replace with your desired region
        access_key: "<access key>"  # Replace with your actual access key
        secret_key: "<secret key>"  # Replace with your actual secret key
```

After saving the configuration file, restart Prometheus to apply these changes:

```
sudo systemctl restart prometheus
```

Once Prometheus restarts, navigate to the **Status > Service Discovery** section within the Prometheus interface. You should see discovered targets under the EC2 job, along with associated labels such as the AMI, architecture, owner ID, instance type, and private IP.

![The image shows a Prometheus monitoring interface displaying discovered and target labels for two EC2 instances, including details like IP addresses, instance types, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752883093/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/prometheus-monitoring-ec2-instances.jpg)

Keep in mind that if the Prometheus server cannot reach the EC2 instances, they may be marked as "down." Once proper network connectivity is confirmed, the targets should display as "up." Additionally, as new EC2 instances are launched or terminated, Prometheus will automatically update the service discovery, ensuring only active servers are monitored.

![The image shows a Prometheus monitoring dashboard displaying the status of various targets. Two EC2 instances are down, while a node and Prometheus instance are up.](https://kodekloud.com/kk-media/image/upload/v1752883094/notes-assets/images/Prometheus-Certified-Associate-PCA-AWS/prometheus-monitoring-dashboard-ec2-status.jpg)

This completes the setup for AWS EC2 service discovery in Prometheus. With this configuration, your Prometheus instance will consistently monitor current EC2 instances, ensuring accurate and dynamic target discovery.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/20a3a57d-ee2d-4096-888e-de1166cf7e3a/lesson/ad7f1274-06f0-4045-90ec-8520eca4ac9f)**
>
> Watch video content
