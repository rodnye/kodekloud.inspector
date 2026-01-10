# Application Gateway components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Application-Gateway-components)

---

## Table of Contents

- Application Gateway components
  - Front-End IP
  - Listener
  - Certificate
  - Rule
  - HTTP Settings
  - Back-End Pool
  - Routing Rules
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Application Gateway components

The Azure Application Gateway is a robust solution for managing web traffic through advanced routing, load balancing, and security features. In this guide, we break down the major components that work together to efficiently handle incoming requests and ensure smooth communication between clients and back-end servers.

## Front-End IP

The front-end IP acts as the entry point for all incoming traffic. It is configurable as either a public IP for internet-facing applications or as a private IP for internal applications. When configured privately, it is often referred to as a VIP or Internal Load Balancer (ILB).

## Listener

The listener is responsible for monitoring incoming traffic requests. It binds to a specific IP address and port, and when operating in HTTPS mode, it is paired with an SSL certificate for secure communication. By handling SSL offloading at the listener level, the Application Gateway reduces the processing load on back-end servers.

> [!important]
> **Key Point**
>
> The upward connection depicted in conceptual diagrams from the front-end IP to the listener illustrates how the listener continuously monitors the entry point for new traffic.

## Certificate

For HTTPS traffic, the Application Gateway uses SSL certificates to encrypt and decrypt data. These certificates, associated with the listener, maintain secure communications between clients and the gateway, ensuring data integrity and privacy.

## Rule

The rule component acts as the intermediary between the front end and the back-end pool. It defines how incoming requests are directed to the appropriate services based on criteria such as URL paths, host headers, or other custom conditions. Within each rule, associated HTTP settings determine the precise method of communication with the back-end servers.

## HTTP Settings

HTTP settings define the parameters for server communication. These settings include:

- Configuring health probes to continuously monitor back-end server availability.
- Setting timeout parameters to limit the waiting period for server responses.
- Enabling session stickiness where required, ensuring continuous user sessions.

Additionally, you can set up custom probes to periodically check the health of your back-end servers, ensuring the system consistently routes traffic to healthy instances.

![The image is a flowchart illustrating the components of an Application Gateway, including elements like Frontend IP, Listener, Port, Certificate, Rule, HTTP Setting, Custom Probe, and Backend Pool, with annotations explaining their functions.](https://kodekloud.com/kk-media/image/upload/v1752884701/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Application-Gateway-components/application-gateway-flowchart-components.jpg)

## Back-End Pool

The back-end pool consists of the actual service instances such as virtual machines, virtual machine scale sets, or other web service endpoints that handle HTTP or HTTPS requests. The Application Gateway routes traffic to these instances based on the established rules and settings, ensuring efficient distribution of requests.

## Routing Rules

Routing rules play a critical role in defining how traffic flows from the front end to the back-end pool. These rules ensure that incoming requests are correctly distributed based on predefined logic, such as URL path-based routing or host header matching. With these rules in place, you can ensure that your web traffic is managed effectively and securely.

> [!important]
> **Summary**
>
> This overview of Azure Application Gateway components highlights how each part collaborates to deliver secure, efficient, and reliable web traffic management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/e6d6e937-05b9-42d5-a068-db32dc9689ad)**
>
> Watch video content
