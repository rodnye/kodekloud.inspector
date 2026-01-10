# User Defined Routes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/User-Defined-Routes)

---

## Table of Contents

- User Defined Routes
  - Virtual Network Traffic and System Routes
  - When to Use User-Defined Routes
  - Creating a Route Table in the Azure Portal
  - Route Priority
  - Conclusion
  - Watch Video
    - Associating the Route Table with a Subnet
    - Adding User-Defined Routes

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# User Defined Routes

This article explains how User-Defined Routes (UDRs) work in Azure, compares them with default system routes, and shows how they can be applied to manage inter-site connectivity for advanced traffic control.

Azure automatically includes a set of system routes that allow most networking scenarios. These routes enable virtual machines (VMs) and other resources within the same virtual network to communicate and access the internet for outbound traffic. However, when you need enhanced control over traffic—such as directing traffic through a network virtual appliance (NVA) for security or inspection—you must implement custom routing policies using UDRs.

## Virtual Network Traffic and System Routes

By default, system routes allow seamless communication between VMs in the same subnet or across subnets within a virtual network. For example:

- VMs within the same subnet can ping one another.
- VMs can access external resources (like NTP servers or Windows updates) using outbound connectivity.

Keep in mind that these system routes govern outbound connections initiated by VMs. Inbound connectivity from the internet is restricted by Network Security Groups (NSGs) and is typically disabled by default.

## When to Use User-Defined Routes

Imagine a scenario where traffic from a frontend subnet must communicate with a database subnet. Normally, system routes would enable direct connectivity between these subnets. However, if your organization’s security policy requires that all traffic from the frontend to the database passes through an NVA (acting as a firewall), then default routing is insufficient.

To enforce this level of security:

1.  Create a route table to redirect traffic from the frontend subnet to the NVA’s IP address.
2.  Associate the route table with the frontend subnet.
3.  Ensure there is a peering connection between the virtual network containing the frontend and database subnets and the network where the NVA is deployed.

The diagram below illustrates this setup:

![The image illustrates a network diagram showing user-defined routes with a DMZ subnet, frontend subnet, and database subnet within virtual networks. It includes a route table and network virtual appliance (NVA) for managing traffic flow.](https://kodekloud.com/kk-media/image/upload/v1752884645/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Defined-Routes/network-diagram-user-routes-dmz.jpg)

After associating the route table with the frontend subnet, all outbound traffic destined for the database subnet is routed through the NVA. The NVA inspects and then forwards the traffic to the database subnet—an extra layer of security that system routes alone cannot provide.

## Creating a Route Table in the Azure Portal

To configure a UDR in the Azure portal, follow these steps:

1.  Sign in to the Azure portal and search for "Route table".
2.  Create a new route table. For example, you could use a resource group named "inter-site" and name your route table "RT-inter-site".
3.  Enable the "Propagate gateway routes" option to automatically include routes learned from connected gateways.
4.  Once deployed, you can add one or more user-defined routes to the table.

After deployment, the portal displays a confirmation message similar to the following:

![The image shows a Microsoft Azure portal page indicating that a deployment named "Microsoft.RouteTable-20231208142724" is complete. It includes options to view deployment details and next steps, with a "Go to resource" button.](https://kodekloud.com/kk-media/image/upload/v1752884646/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Defined-Routes/azure-portal-deployment-complete.jpg)

> [!important]
> **Tip**
>
> After deployment, review the deployment details to ensure your route table is configured correctly before association.

### Associating the Route Table with a Subnet

1.  In the Azure portal, select your newly created route table and click on "Associate".
2.  Choose the appropriate virtual network and subnet (for example, the default subnet).
3.  Associating the route table with the subnet ensures that all traffic from that subnet follows the defined routing rules.

### Adding User-Defined Routes

Suppose you want all traffic from the associated subnet to route through a firewall. To add a specific route:

1.  Click on "Routes" within the route table and then click "Add".
2.  Create a route (e.g., name it "all traffic firewall") with these settings:
    - Destination Type: IP address
    - Destination IP address range: 0.0.0.0/0 (to capture all traffic)
    - Next Hop Type: Virtual Appliance
    - Next Hop IP Address: Enter the IP address of your firewall (e.g., 15.1.x.x)

This route forces all outbound traffic from the subnet to pass through your firewall for inspection.

If further segmentation is needed, you can add additional routes. For example, to add a route for internal traffic:

1.  Click "Add" again within the route table.
2.  Create a route named "internal" with these settings:
    - Destination Type: IP address
    - Destination IP address range: 192.168.1.0/24
    - Next Hop Type: Virtual network

![The image shows a Microsoft Azure portal interface where a user is adding a route to a route table named "rt-intersite." The route being added has a destination IP address range of 192.168.1.0/24 with a next hop type set to "Virtual network."](https://kodekloud.com/kk-media/image/upload/v1752884647/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Defined-Routes/azure-portal-route-table-addition.jpg)

> [!important]
> **Routing Specificity**
>
> When multiple routes are configured, Azure selects the route with the most specific address range. For example, a route for 192.168.1.0/24 takes precedence over one for 0.0.0.0/0. Adding an even more specific CIDR (like /27) will override both.

## Route Priority

Azure’s routing engine selects the route with the most specific destination range. In the example above:

- The route with destination 192.168.1.0/24 (more specific) is prioritized over the generic 0.0.0.0/0 route.
- If a route with an even narrower range (such as /27) is added, it will take precedence over both the /24 and /0 routes.

You can configure multiple routing rules to selectively direct traffic. For instance:

- General outbound traffic may be forwarded to a firewall.
- Specific traffic blocks, such as those for on-premises addresses, may be directed to a VPN Gateway.

## Conclusion

This guide demonstrated how to leverage User-Defined Routes in Azure to enforce custom traffic routing policies. Key steps include creating a route table, adding specific routing rules, and ensuring proper network peering. By implementing UDRs, you can ensure traffic flows securely—such as directing traffic through an NVA before it reaches a sensitive database subnet.

Additionally, consider using Service Endpoints for enhanced security and streamlined connectivity in your Azure environments.

For more detailed information on Azure networking concepts, explore these resources:

- [Azure Route Tables Documentation](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview)
- [Azure Networking Overview](https://learn.microsoft.com/en-us/azure/networking/)

Understanding and properly configuring UDRs is essential for maintaining secure and efficient network architectures in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/f9401c2a-65fc-4d9f-a647-9aee85e8ec56)**
>
> Watch video content
