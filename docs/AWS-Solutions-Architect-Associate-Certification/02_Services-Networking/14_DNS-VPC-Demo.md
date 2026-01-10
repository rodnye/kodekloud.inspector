# DNS VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/DNS-VPC-Demo)

---

## Table of Contents

- DNS VPC Demo
  - Launching an EC2 Instance
  - Enabling DNS Hostnames
  - Testing DNS Resolution from the Instance
  - Disabling DNS Resolution
  - Final Thoughts
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# DNS VPC Demo

In this guide, we explore the various DNS options available for a Virtual Private Cloud (VPC) in AWS. In our example, a custom VPC is created with default settings, preconfigured with the standard DNS configuration. This VPC also includes an attached internet gateway, enabling public subnets.

![The image shows an AWS VPC (Virtual Private Cloud) management console with details of a specific VPC named "vpcdemo," including its ID, state, and IP configurations.](https://kodekloud.com/kk-media/image/upload/v1752865507/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC-Demo/aws-vpc-management-console-vpcdemo.jpg)

When selecting the VPC, navigating to "Actions" and then "Edit VPC settings" will display two critical configuration options:

1.  **Enable DNS Resolution** – This option allows the AWS provided DNS server to resolve host names.
2.  **Enable DNS Hostnames** – When enabled, it assigns a domain name to an instance's public IP address.

In this demonstration, the "Enable DNS Hostnames" option is initially disabled so that we can focus on testing the DNS resolution feature.

## Launching an EC2 Instance

The next step involves launching an EC2 instance from the AWS EC2 console. Follow these steps:

- Launch an instance named "DNS demo."
- Select one of your key pairs.
- Change the VPC to the VPC in focus.
- Enable "Auto-assign Public IP."

Additionally, configure a security group rule that allows all ICMP traffic for ping testing. Ensure the rule allows traffic from 0.0.0.0/0 before launching the instance.

After the instance is launched, check its details. The private IP address is assigned an internal DNS name:

![The image shows an AWS EC2 Management Console with a list of instances, highlighting one running instance named "dnsdemo" with details such as its public IPv4 address and instance type.](https://kodekloud.com/kk-media/image/upload/v1752865509/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC-Demo/aws-ec2-management-console-dnsdemo.jpg)

The internal (private) DNS name ensures that other servers within the VPC can communicate with this instance. However, since the "Enable DNS Hostnames" is disabled, the public IPv4 address does not have an associated DNS name.

## Enabling DNS Hostnames

To assign a DNS name to the public IP address, follow these steps:

1.  Return to "Actions" > "Edit VPC settings."
2.  Enable the "DNS Hostnames" option.
3.  Click Save.

After refreshing the instance details, you will observe that the public IP now has an associated DNS name. This simplifies accessing the instance via its domain name rather than its IP address. To verify, copy the public DNS name and run a ping command. The response should resolve to the public IP (for example, 35.173.226.213).

## Testing DNS Resolution from the Instance

To verify the DNS resolution setting, connect to your EC2 instance using SSH:

```
ssh -i /path/to/your-key.pem ec2-user@<public-ip-address>
```

Once connected, view the DNS configuration by displaying the contents of the `resolv.conf` file:

```
cat /etc/resolv.conf
```

You should see an output similar to:

```
nameserver 10.0.0.2
search ec2.internal
```

This output confirms that the AWS DNS server at the second IP in the VPC subnet (10.0.0.2 for a CIDR block of 10.0.0.0/16) is active. Next, test external domain resolution using NS lookup:

```
nslookup google.com
```

Expected output:

```
Server:         10.0.0.2
Address:        10.0.0.2#53


Non-authoritative answer:
Name:   google.com
Address: 142.251.163.100
Name:   google.com
Address: 142.251.163.101
Name:   google.com
Address: 142.251.163.102
Name:   google.com
Address: 142.251.163.113
Name:   google.com
Address: 142.251.163.138
Name:   google.com
Address: 142.251.163.139
Name:   google.com
Address: 2607:f8b0:4004:c08::71
Name:   google.com
Address: 2607:f8b0:4004:c08::64
Name:   google.com
Address: 2607:f8b0:4004:c08::65
Name:   google.com
Address: 2607:f8b0:4004:c08::66
```

This confirms that external domains are successfully resolved due to the enabled DNS resolution setting in the VPC.

![The image shows the AWS VPC Management Console with settings for editing a VPC, including VPC details, DHCP settings, and DNS settings.](https://kodekloud.com/kk-media/image/upload/v1752865510/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC-Demo/aws-vpc-management-console-settings.jpg)

> [!important]
> **Tip**
>
> For improved troubleshooting, verify your security group settings to ensure that ICMP traffic is permitted, as this is essential for successful ping tests.

## Disabling DNS Resolution

If you choose to disable the DNS resolution option in the VPC settings, AWS will no longer answer DNS queries from your EC2 instances. To test this behavior:

1.  Disable the DNS resolution setting in the VPC configuration.
2.  Connect to your instance via SSH.
3.  Run an NS lookup for a domain such as:

    ```
    nslookup youtube.com
    ```

Since the instance continues to direct DNS queries to the AWS DNS server at 10.0.0.2 (which is no longer configured to respond), the lookup will fail. In this scenario, you must specify an alternative DNS server (for example, Google's DNS at 8.8.8.8) or use an internally managed DNS server accessible to the instance.

> [!important]
> **Warning**
>
> Disabling DNS resolution can disrupt connectivity for your applications and services. Ensure you have alternative DNS servers configured to avoid outages.

## Final Thoughts

This demonstration clarifies how modifying DNS settings within a VPC affects internal and external name resolution for your EC2 instances. This knowledge is especially valuable for those preparing for the [AWS Solutions Architect Associate Certification](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification) exam and for understanding DNS behavior in AWS environments.

For more resources on AWS and DNS configuration best practices, consider exploring:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/dca8552b-d7f1-4329-9cca-f5d52a040b62)**
>
> Watch video content
