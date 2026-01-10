# Session Persistence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Session-Persistence)

---

## Table of Contents

- Session Persistence
  - Session Persistence Options
  - Deploying and Configuring the Azure Load Balancer
  - Configuring the Azure Load Balancer
  - Next Steps
  - Watch Video
  - Practice Lab
    - None (Default)
    - Client IP
    - Client IP and Protocol
    - Preparing the Infrastructure

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Session Persistence

Session persistence in the Azure Load Balancer determines how client requests are consistently routed to specific server sessions. In this lesson, we explore the three session persistence options available for an Azure Load Balancer: none, client IP, and client IP and protocol. The default selection is "none." At the end of the lesson, you will see a demonstration that combines these concepts with practical deployment.

## Session Persistence Options

### None (Default)

When session persistence is set to "none," Azure Load Balancer uses a five-tuple hash to distribute incoming requests. This hash includes:

- Source IP address
- Destination IP address
- Source port
- Destination port
- Protocol

Using this five-tuple, each request is independently load balanced to a server. This method is ideal for stateless applications where session affinity is not required.

### Client IP

Selecting the "client IP" option, also known as the two-tuple hash, causes the load balancer to use a combination of the source and destination IP addresses. This ensures that all requests from a specific client IP are directed to the same server. This approach is particularly beneficial for applications that maintain user state, such as e-commerce shopping carts or scenarios requiring persistent server-side sessions.

![The image shows options for session persistence, including "None (default)" and "Client IP," with a dropdown menu listing "None," "Client IP," and "Client IP and protocol."](https://kodekloud.com/kk-media/image/upload/v1752884728/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/session-persistence-options-dropdown.jpg)

### Client IP and Protocol

The "client IP and protocol" option, known as the three-tuple hash, adds the protocol to the source and destination IP addresses. This method is particularly useful when a single virtual machine hosts multiple services (for example, secure and non-secure traffic on different protocols, even when sharing the same IP address).

> [!important]
> **Tip**
>
> Choosing the appropriate session persistence option is key to balancing session affinity with efficient resource utilization and delivering an optimal user experience.

---

## Deploying and Configuring the Azure Load Balancer

In this section, you will learn how to deploy an Azure Load Balancer to distribute traffic across web servers. This process includes deploying virtual machines (VMs), installing a web server role, updating web pages, and configuring the load balancer.

### Preparing the Infrastructure

Within the repository, there is a script (for example, "070_load_balancer_prep_infra.ps1") that deploys virtual machines and sets up the environment. Navigate to the repository folder using the following commands:

```
PS C:\Users\RithinSkaria\Documents> cd .\kodekloud-az104\
PS C:\Users\RithinSkaria\Documents\kodekloud-az104>
```

Next, execute the infrastructure preparation script (e.g., `prep_infra.ps1`) to deploy resources such as VMs and a jumpbox. When the script runs, it outputs important details like the jumpbox DNS name and the private IP addresses of the web servers. Note that these servers are not yet exposed to the internet—they will be made accessible via the load balancer.

The output should resemble the following:

```
Setting OS Profile
Creating VM webserver-03


RequestId         :
IsSuccessStatusCode : True
StatusCode       : OK
ReasonPhrase     :


Creating jumpbox VM


RequestId         :
IsSuccessStatusCode : True
StatusCode       : OK
ReasonPhrase     :


Jumpbox VM DNS name : jumpbox-vm-168e36.eastus.cloudapp.azure.com
Private IP (webserver-01) : 10.0.2.4
Private IP (webserver-02) : 10.0.2.5
Private IP (webserver-03) : 10.0.2.6


PS C:\Users\RithinSkaria\Documents\kodekloud-az104>
```

You can then connect via SSH to the jumpbox using the provided credentials:

```
PS C:\Users\RithinSkaria> ssh kodekloud@jumpbox-vm-168e36.eastus.cloudapp.azure.com
The authenticity of host 'jumpbox-vm-168e36.eastus.cloudapp.azure.com (20.163.147.93)' can't be established.
ED25519 key fingerprint is SHA256:AMcvFrj/j3uGPLXJJzqlmeFAE3jj37OdYFuc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'jumpbox-vm-168e36.eastus.cloudapp.azure.com' (ED25519) to the list of known hosts.
kodekloud@jumpbox-vm-168e36.eastus.cloudapp.azure.com's password:
Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 6.2.0-1018-azure x86_64)
...
```

Once connected, verify that the web servers are configured correctly by using the curl command from the jumpbox. For example:

```
kodekloud@jumpbox-vm:~$ curl 10.0.2.4
<html>
<body style="background-color:red;">
<h1 style="color:white;">Hello world</h1>
</body>
</html>


kodekloud@jumpbox-vm:~$ curl 10.0.2.5
<html>
<body style="background-color:green;">
<h1 style="color:white;">Hello world</h1>
</body>
</html>


kodekloud@jumpbox-vm:~$ curl 10.0.2.6
<html>
<body style="background-color:blue;">
<h1 style="color:white;">Hello world</h1>
</body>
</html>
```

Each web server responds with a distinct background color, verifying that the load balancing functions correctly.

---

## Configuring the Azure Load Balancer

Follow these steps to create and configure your Azure Load Balancer:

1.  **Create the Load Balancer:**
    - In the Azure portal, navigate to "Create a resource" and choose "Load Balancer."
    - Select the Standard SKU for production use and opt for a public (regional) load balancer.
    - Provide a name (e.g., `sclbweb01`) and ensure it belongs to the same resource group as your VMs.

2.  **Configure the Frontend IP:**
    - Create a public IP address resource (for example, `sclbpip` or named "fe" for frontend).
    - Associate this public IP with the frontend configuration of the load balancer.

    ![The image shows the Microsoft Azure portal interface for creating a load balancer, with options to configure project and instance details such as subscription, resource group, name, region, SKU, type, and tier.](https://kodekloud.com/kk-media/image/upload/v1752884729/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-load-balancer-creation-page.jpg)

    ![The image shows the Microsoft Azure portal interface for creating a load balancer, specifically the "Frontend IP configuration" section. It includes options to add a frontend IP configuration with fields for name, IP version, IP type, and public IP address.](https://kodekloud.com/kk-media/image/upload/v1752884731/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-portal-load-balancer-frontend-ip.jpg)

3.  **Set Up the Backend Pool:**
    - Create a backend pool and choose the virtual network where your web servers are located.
    - Add all three web servers to the backend pool.

    ![The image shows a Microsoft Azure portal interface for adding a backend pool to a load balancer, listing virtual machines with their IP configurations and addresses.](https://kodekloud.com/kk-media/image/upload/v1752884732/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-portal-load-balancer-backend-pool.jpg)

4.  **Add Load Balancing Rules:**  
    Create a load balancing rule to connect the frontend with the backend pool:
    - Provide a rule name (e.g., `sclb_lb_http`).
    - Select the previously created frontend IP address.
    - Choose the appropriate backend pool.
    - Set both the frontend and backend TCP port to 80.
    - Create a new health probe (e.g., `sclb_http_probe`) that checks port 80 every 5 seconds. If a server fails to respond, it is marked as unhealthy and excluded from the load-balanced pool.

    ![The image shows a Microsoft Azure portal interface for creating a load balancer, with options to add load balancing and inbound NAT rules. A sidebar is open for adding a load balancing rule, displaying various configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752884733/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-portal-load-balancer-setup.jpg)

5.  **Configure Session Persistence:**  
    Within the load balancing rule settings, select the session persistence method. By default, the five-tuple hash (none) is used. You may choose the two-tuple (client IP) or three-tuple (client IP and protocol) option based on your application's needs. For demonstration purposes, we'll keep the default "none" setting.
6.  **Finalize and Create:**  
    Review your settings carefully, ensuring that no extra inbound NAT or outbound rules are enabled since the jumpbox handles management. When ready, click "Review and Create" followed by "Create." Wait for the deployment to complete.

After the load balancer is deployed, navigate back to its resource page to view its details.

![The image shows the Microsoft Azure portal displaying details of a load balancer named "azlb-web-01," including its resource group, location, and configuration settings. The interface provides options for managing IP configurations, backend pools, health probes, and load balancing rules.](https://kodekloud.com/kk-media/image/upload/v1752884734/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-portal-load-balancer-details.jpg)

![The image shows a Microsoft Azure portal page listing virtual machines, including their names, types, locations, statuses, operating systems, sizes, public IP addresses, and disk counts.](https://kodekloud.com/kk-media/image/upload/v1752884735/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Session-Persistence/azure-portal-virtual-machines-list.jpg)

Once the public IP of the load balancer is associated with the web servers, entering the IP address in your browser will direct you to one of the servers based on the configured session persistence mechanism. Depending on the underlying session details, you may see different responses (red, green, or blue).

---

## Next Steps

In this lesson, you learned how Azure Load Balancer manages session persistence using multiple options and how to deploy and configure it to balance traffic across multiple web servers. Up next, we will explore another load balancing solution: Azure Application Gateway.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/42d31a2b-2cbb-4808-8d9e-d2dd3050d5c5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/2fc7374a-2d09-4449-91cd-9ab8d83aea60)**
>
> Practice lab
