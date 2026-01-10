# Demo Route 53 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Demo-Route-53)

---

## Table of Contents

- Demo Route 53
  - Domain Registration
  - DNS Management
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Demo Route 53

In this lesson, we demonstrate AWS Route 53, a managed DNS service that allows you to both register domain names and define DNS records—all within the AWS ecosystem. By leveraging Route 53, you can register domains directly without relying on third-party registrars like [GoDaddy](https://www.godaddy.com) or [Namecheap](https://www.namecheap.com).

## Domain Registration

First, search for "Route 53" in the AWS console and open the Route 53 service. In the Domains section, select "Registered domains." Since no domains are registered in your account yet, you can choose to either transfer an existing domain or register a new one. In this demonstration, we will register a new domain.

1.  **Check Domain Availability:**  
    Enter a domain name to see if it is available. For demonstration purposes, we will use a dummy name such as "KodeKloudDemo123.com" (alternatively, "KodeKloudDemo123.link"). In this example, we select the .com option, priced at $13 per year. Click on the domain and then click "Proceed".

    ![The image shows an AWS Route 53 domain registration page where the domain "kodeklouddemo123.com" is selected for purchase at $13.00 USD per year, with an option to proceed to checkout.](https://kodekloud.com/kk-media/image/upload/v1752865528/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-domain-registration-kodeklouddemo123.jpg)

2.  **Checkout Process:**  
    At checkout, you'll see an option to enable auto renew, which automatically renews your domain after one year, ensuring uninterrupted ownership.

    > [!important]
    > **Note**
    >
    > If auto renew is deselected, you must manually renew the domain—a process that can easily be overlooked.

    ![The image shows an AWS Route 53 domain registration page with pricing details for a domain name, including an option for auto-renewal. The subtotal for the domain is $13.00 USD.](https://kodekloud.com/kk-media/image/upload/v1752865529/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-domain-registration-pricing.jpg)

3.  **Provide Contact Information:**  
    Fill out the form with your details and be sure to enable privacy protection for all contacts associated with your domain.

    ![The image shows a domain registration form on the AWS Route 53 console, with fields for address, admin contact, tech contact, and privacy protection options.](https://kodekloud.com/kk-media/image/upload/v1752865531/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-domain-registration-form.jpg)

4.  **Review & Submit:**  
    Click "Next" to review your registration details. On the recap page, you'll see the purchase summary along with a note on a small hosted zone management fee charged in addition to the registration fee.

    ![The image shows an AWS Route 53 domain registration page with pricing and contact information details. It includes a domain name, pricing options, and DNS management fee information.](https://kodekloud.com/kk-media/image/upload/v1752865532/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-domain-registration-page.jpg)

    Scroll down, verify your contact information, agree to the terms and conditions, and click "Submit." Domain registration may take some time; you will receive an email with the registration status for each domain. Be sure to monitor your email and later check the "Registered domains" section in Route 53.

5.  **Post-Registration Details:**  
    Once registered, your domain listing will display details such as the registration date, expiration date (typically one year out), and the auto renew setting. Clicking on your domain provides additional info including the four name servers assigned by AWS. These name servers identify the hosted zone where your DNS records are stored.

    ![The image shows an AWS Route 53 dashboard displaying domain details for "kodeklouddemo123.com," including registration and expiration dates, auto-renew status, and contact information.](/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-dashboard-kodeklouddemo123.jpg)

## DNS Management

After domain registration, manage your DNS records by navigating to the "Hosted zones" section. Here you will find a hosted zone for your newly registered domain. Clicking on the hosted zone reveals details like the reserved DNS servers and the default DNS records configured by AWS. To add a new DNS record, click on "Create records."

![The image shows an AWS Route 53 console displaying details of a hosted zone named "kodeklouddemo123.com," including its records and name servers.](https://kodekloud.com/kk-media/image/upload/v1752865534/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-hosted-zone-kodeklouddemo123.jpg)

For instance, if you have a public web server with an IPv4 address and you want your domain name to point to that server, you can create an A record. Follow these steps:

1.  In the "Create record" menu, select the A record type.
2.  Specify whether the record applies to the root domain (e.g., "kodeklouddemo123.com") or a subdomain (e.g., "www.kodeklouddemo123.com").
3.  Paste the server's IP address, set the desired TTL (Time To Live), and create the record.

![The image shows the AWS Route 53 console where a user is creating a DNS record. The record type is set to "A" for routing traffic to an IPv4 address, with a specified IP address and TTL value.](https://kodekloud.com/kk-media/image/upload/v1752865536/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route-53-dns-a-record.jpg)

Route 53 will propagate the new DNS record to all authoritative DNS servers within approximately 60 seconds. You can check the propagation status by using the "View Status" button.

![The image shows an AWS Route 53 dashboard displaying DNS records for the domain "kodeklouddemo123.com," including A, NS, and SOA record types.](https://kodekloud.com/kk-media/image/upload/v1752865538/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Route-53/aws-route53-dns-records-dashboard.jpg)

Once propagation is complete, you can open your browser and enter your domain name (e.g., "kodeklouddemo123.com") to access your web server by its domain rather than its IP address.

## Summary

This article demonstrated how AWS Route 53 allows you to register a domain and create DNS records to route traffic to a web server. Understanding these procedures is essential for the [AWS Solutions Architect Associate Certification](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification) exam, as Route 53 is a fundamental part of managing domain names and DNS entries in the AWS cloud.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/94a66189-6b67-4542-b82b-10f9d2c84459)**
>
> Watch video content
