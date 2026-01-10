# Azure DNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Azure-DNS)

---

## Table of Contents

- Azure DNS
  - DNS Zone Naming Convention
  - Delegation
  - Record Sets in Azure DNS
  - How Azure DNS Works
  - Creating a DNS Zone in the Azure Portal
  - Managing DNS Records
  - Testing DNS Resolution
  - Private DNS Zones
  - Watch Video
    - Example Using Dig

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Azure DNS

Azure DNS is a highly secure and reliable DNS hosting solution by Microsoft Azure. It enables you to host your DNS zones, ensuring accurate name resolution for your domains. Once you create a DNS zone, you can add multiple DNS record sets within that zone to manage your DNS infrastructure effectively.

## DNS Zone Naming Convention

The zone name must be unique within a Resource Group; however, you can have the same zone name in different resource groups. In such cases, each instance of the DNS zone will have its own set of name servers.

## Delegation

Most organizations purchase domains from registrars like Cloudflare, GoDaddy, etc. For example, if you purchase a domain from GoDaddy, it comes with GoDaddy’s default name servers. To use Azure DNS for your domain, delegate DNS queries to the Azure DNS name servers by following these steps:

1.  Log in to your domain registrar’s portal (e.g., GoDaddy).
2.  Update the name server settings to the provided Azure DNS name servers.
3.  Save your configuration.

After completing these changes, client queries are forwarded to the globally distributed Azure DNS name servers, which then respond based on the DNS records present in your Azure DNS zone.

## Record Sets in Azure DNS

Azure DNS supports various types of record sets. Records with the same name and type are grouped into a record set, and every record within the set must be unique. Note that a record set can contain a maximum of 20 records.

## How Azure DNS Works

For instance, in one subscription I manage, there is a DNS zone called KodeKloud.org that is assigned dedicated name servers provided by Microsoft Azure. Within this zone, various DNS records are created, such as an A record for Azure and a CNAME record for Microsoft.

In a typical scenario, you might have an on-premises DNS server with a zone delegated to the Azure DNS name servers. When a client sends a DNS query (using tools like dig or nslookup), the on-premises server forwards the request to the Azure DNS name servers, which then return the necessary DNS response.

### Example Using Dig

```
oh-my-zsh git:(master) ✗ dig azure.kodekloud.org A
; <<>> DiG 9.16.1-Ubuntu <<>> @ns1-09.azure-dns.com azure.kodekloud.org A
; (2 servers found)
global options: +cmd
;edsandrew: server0: opened: QUERY, status: NOERROR, id: 45278
;; global options: +cmd
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;azure.kodekloud.org.    IN  A

;; ANSWER SECTION:
azure.kodekloud.org. 3600 IN  A 13.11.15.11

;; Query time: 64 msec
;; SERVER: 40.80.69.194#53(40.80.69.194)
;; WHEN: Tue Oct 03 12:49:49 IST 2022
;; MSG SIZE  rcvd: 64
```

> [!important]
> **Important**
>
> If your domain registrar manages your DNS, update the domain’s name server settings to point to the Azure DNS servers. Otherwise, you might need to manually specify the Azure name servers when performing DNS lookups, or consider purchasing domains directly from Azure for seamless integration.

## Creating a DNS Zone in the Azure Portal

Follow these steps to create a DNS zone in the Azure Portal:

1.  Log in to the Azure Portal.
2.  Search for "DNS zones" and select the option to create a new zone.
3.  Specify your desired resource group (e.g., "demo M4") and provide a zone name (e.g., corecloud.org).

Since DNS zones are global resources, they do not have a specific region. However, the zone metadata will inherit the region from the resource group, even though the DNS records are globally replicated.

![The image shows a Microsoft Azure portal interface for creating a DNS zone, with fields for project and instance details.](https://kodekloud.com/kk-media/image/upload/v1752884800/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-DNS/azure-portal-dns-zone-creation.jpg)

Review your details and then create the DNS zone.

![The image shows a Microsoft Azure portal interface for creating a DNS zone, with details about the subscription, resource group, and location. A notification indicates the initialization of a template deployment.](https://kodekloud.com/kk-media/image/upload/v1752884802/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-DNS/azure-portal-dns-zone-creation-2.jpg)

Once the deployment is complete, you can add DNS records and verify query resolution.

![The image shows a Microsoft Azure portal page indicating that a DNS zone deployment is complete, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752884803/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-DNS/azure-portal-dns-zone-deployment.jpg)

## Managing DNS Records

After creating your DNS zone, navigate to its resources. You will notice that default records such as SOA and NS are automatically created. You have the option to manually add additional record sets. For example, to add an A record for www.corecloud.org with IP address 1.1.1.1:

1.  Click on "Add record set".
2.  Enter the record name (e.g., www.corecloud.org).
3.  Set the record type to A and specify the IP address.
4.  Confirm by clicking "OK".

![The image shows a Microsoft Azure DNS zone management interface for the domain "kodekloud.org," where a new A record is being added with the IP address "1.1.1.1."](https://kodekloud.com/kk-media/image/upload/v1752884804/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-DNS/azure-dns-zone-kodekloud-a-record.jpg)

Azure DNS supports various other record types as well, such as CAA, CNAME, and more. For instance, if you create a CNAME record so that google.cloud.org points to www.google.com, any DNS queries for google.cloud.org will resolve to www.google.com.

![The image shows a Microsoft Azure DNS zone management interface for the domain "kodekloud.org," displaying DNS records such as NS, SOA, CNAME, and A records.](https://kodekloud.com/kk-media/image/upload/v1752884806/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-DNS/azure-dns-zone-management-kodekloud.jpg)

Additionally, you may configure subzones (or child zones) within your DNS zone. For example, configuring azure.corecloud.org as a subzone provides a separate domain space if needed.

## Testing DNS Resolution

To validate your DNS configuration, you can use tools like nslookup. Follow these steps:

1.  Open your terminal and run the nslookup command. By default, nslookup might target your localhost DNS server.
2.  Use the command prompt to switch to one of the Azure DNS name servers using the "server" directive.

For example, in a Windows PowerShell prompt:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az120\050- Administer Virtual Networking> nslookup
Default Server:  Unknown
Address:  fe80::1

> server ns1-35.azure-dns.com.
```

3.  Query a DNS record, such as www.corecloud.org:

```
> nslookup www.corecloud.org
Server:  ns1-35.azure-dns.com
Address:  2603:1061:0:10::23
         150.171.10.35

Name:    www.corecloud.org
Address:  1.1.1.1
```

Similarly, you can test a CNAME lookup by setting the query type to CNAME and querying for google.cloud.org, which should resolve to www.google.com, confirming that your DNS zone is correctly configured.

## Private DNS Zones

While this guide focuses on public-facing DNS zones, there are situations where a Private DNS zone is required for internal name resolution. Private DNS zones enable you to resolve the names of internal resources, like virtual machines, to their private IP addresses without exposing those records to the internet.

> [!important]
> **Additional Information**
>
> For detailed guidance on configuring and using Private DNS zones, refer to the related documentation and best practices for network security.

Thank you for reading this guide on Azure DNS. For more detailed information and updates, consider checking the [Azure DNS documentation](https://docs.microsoft.com/en-us/azure/dns/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/ad4ccf01-7b4f-4286-a403-fcef56ed5505)**
>
> Watch video content
