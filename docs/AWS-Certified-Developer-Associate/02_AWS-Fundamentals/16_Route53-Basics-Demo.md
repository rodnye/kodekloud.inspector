# Route53 Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/Route53-Basics-Demo)

---

## Table of Contents

- Route53 Basics Demo
  - Accessing AWS Route 53
  - Registering a New Domain
  - Providing Contact Information
  - Managing Hosted Zones and DNS Records
  - Creating DNS Records
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# Route53 Basics Demo

In this lesson, we demonstrate how to use AWS Route 53—a fully managed DNS service—to register a domain and configure its DNS settings. Route 53 not only lets you register new domains but also simplifies DNS management by keeping everything in one place. This streamlined approach is ideal for developers and solutions architects who want an integrated domain and DNS management solution.

---

## Accessing AWS Route 53

First, log in to the AWS Management Console and search for "Route 53." Open the service and navigate to the **Domains** section, then click on **Register Domain**. If you haven’t registered any domains before, you will see an empty list:

![The image shows the AWS Route 53 console, specifically the "Registered domains" section, which currently displays no domains. The left sidebar includes navigation options like Dashboard, Hosted zones, and Health checks.](https://kodekloud.com/kk-media/image/upload/v1752858217/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-registered-domains-console.jpg)

At this point, you have two main options:

- **Transfer an Existing Domain:** Migrate a domain registered with a third-party provider.
- **Register a New Domain:** Create a new registration directly within AWS.

---

## Registering a New Domain

To register a new domain, start by checking its availability. For the demo, we will use a sample domain name such as "kodeklouddemo123.com." When you search for this name, AWS Route 53 displays pricing options. For example, the .com domain might be available for $13 per year, with additional alternatives like a .link version. Select "kodeklouddemo123.com" and click **Proceed to checkout**.

![The image shows a domain registration page on AWS Route 53, where the domain "kodeklouddemo123.com" is selected for purchase at $13.00 USD per year, with an option to proceed to checkout.](https://kodekloud.com/kk-media/image/upload/v1752858219/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-domain-registration-kodeklouddemo123.jpg)

Next, you will see an option for auto-renewal. Enabling auto-renew ensures your domain remains active without interruption by automatically extending the registration annually:

> [!important]
> **Auto-Renew Recommendation**
>
> It is recommended to keep auto-renew enabled to avoid potential downtime due to missed renewals.

![The image shows an AWS Route 53 domain registration page with pricing details for a domain named "kodeklouddemo123.com," set for a 1-year duration at $13.00 USD with auto-renew enabled.](https://kodekloud.com/kk-media/image/upload/v1752858220/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-domain-registration-pricing.jpg)

---

## Providing Contact Information

After setting your renewal preferences, enter the required contact information and enable privacy protection to secure your data. Review the registration summary, which shows any applicable management fees. Note that when you register a domain using Route 53, an associated hosted zone is automatically created (this may incur a small additional charge).

![The image shows an AWS Route 53 domain registration page with pricing and contact information details. It includes a domain name, pricing options, DNS management fee, and contact information for registrant, admin, and tech contacts.](https://kodekloud.com/kk-media/image/upload/v1752858221/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-domain-registration-page.jpg)

After reviewing your information and accepting the terms and conditions, submit your registration. You will receive email confirmations that update you on the status of your registration. Once the process is complete, the new domain will appear in the **Registered domains** list along with details like the expiration date and auto-renew status.

![The image shows the AWS Route 53 console with a registered domain "kodeklouddemo123.com," including details like expiration date, auto-renew status, and transfer lock status.](https://kodekloud.com/kk-media/image/upload/v1752858222/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-console-kodeklouddemo123.jpg)

---

## Managing Hosted Zones and DNS Records

Click on your registered domain in the Route 53 console for additional details, including registration/expiration dates, contact information, and the four name servers allocated for your hosted zone. AWS automatically creates a hosted zone for your domain, which stores all associated DNS records.

Navigate to the **Hosted zones** section, and you will see a hosted zone for "kodeklouddemo123.com." Clicking on the hosted zone reveals the name servers and other DNS record details:

![The image shows an AWS Route 53 dashboard displaying details of a hosted zone for the domain "kodeklouddemo123.com," including name servers and record information.](https://kodekloud.com/kk-media/image/upload/v1752858224/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-hosted-zone-dashboard.jpg)

---

## Creating DNS Records

AWS automatically sets up basic DNS records in the hosted zone. To add a new record, click the **Create records** button. For example, to map your domain or subdomain to a web server's IP address, you can create an A (Address) record.

- **Root Domain:** Leave the record name empty (or use "@") to point "kodeklouddemo123.com" to your web server.
- **Subdomain:** Enter a value like "www" to map "www.kodeklouddemo123.com" to the IP.

Type the web server's public IP address in the **Value** field. You can leave the Time to Live (TTL) and other advanced options at their default values. Once all details are in place, create the record.

![The image shows an AWS Route 53 interface for creating a DNS record, with fields for record name, type, value, TTL, and routing policy.](https://kodekloud.com/kk-media/image/upload/v1752858225/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-dns-record-interface.jpg)

Route 53 typically propagates DNS changes within 60 seconds. You can monitor the update progress using the **View status** button:

![The image shows the AWS Route 53 console with details of a hosted zone for "kodeklouddemo123.com," including DNS records such as A, NS, and SOA types.](https://kodekloud.com/kk-media/image/upload/v1752858226/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics-Demo/aws-route53-hosted-zone-kodeklouddemo123.jpg)

After about a minute, refresh the page to ensure the changes have propagated. Once complete, entering "kodeklouddemo123.com" in your browser should navigate you to your web server.

---

## Conclusion

AWS Route 53 streamlines domain registration and DNS management by merging both processes into a single, easy-to-use interface. By automatically creating a hosted zone during domain registration, AWS simplifies the subsequent management of DNS records. This integrated solution is particularly valuable for professionals preparing for the [AWS Solutions Architect Associate Certification](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification).

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/27faa3b8-92c2-4ef3-af54-c6e66a488328)**
>
> Watch video content
