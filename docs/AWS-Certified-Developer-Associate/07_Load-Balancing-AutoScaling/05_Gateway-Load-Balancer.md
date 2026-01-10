# Gateway Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Gateway-Load-Balancer)

---

## Table of Contents

- Gateway Load Balancer
  - How It Works
  - Detailed Functionality
  - Feature Infographic
  - Ingress Traffic Flow
  - Egress Traffic Flow
  - Summary
  - Watch Video
    - Example Traffic Flow

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Gateway Load Balancer

In this lesson, we explore the Gateway Load Balancer—a service designed to simplify the integration of third-party virtual appliances such as firewalls, intrusion detection systems, and intrusion prevention systems into your AWS environment. Operating at layer three of the OSI model, the Gateway Load Balancer directs incoming traffic to a fleet of virtual appliances, which then inspect, filter, or modify the traffic based on defined policies before sending it to its final destination.

## How It Works

Traffic originating from a source normally travels directly to its destination. However, with the Gateway Load Balancer, the process is streamlined:

1.  The traffic source sends its data to a designated Gateway Load Balancer endpoint.
2.  This endpoint serves as both the entry and exit point for all traffic.
3.  Once at the Gateway Load Balancer, traffic is routed to third-party security appliances using the Geneve protocol.
4.  These appliances analyze the incoming data, deciding whether to allow or drop the traffic.
5.  Approved traffic is returned to the load balancer, which then forwards it to the destination.

Below is an illustration that explains this network flow:

![The image illustrates a network flow diagram for a Gateway Load Balancer, showing the path from a source to a destination through a Gateway Load Balancer Endpoint, a Gateway Load Balancer, and appliances using the Geneve protocol.](https://kodekloud.com/kk-media/image/upload/v1752859084/notes-assets/images/AWS-Certified-Developer-Associate-Gateway-Load-Balancer/gateway-load-balancer-network-flow-diagram.jpg)

> [!important]
> **Key Benefit**
>
> The Gateway Load Balancer operates as a transparent, layer three load balancer, making it simple to add network appliances into your AWS environment without the need for specialized routing modifications.

## Detailed Functionality

The Gateway Load Balancer acts as a transparent network gateway that passes traffic between the source and security appliances seamlessly. In addition to facilitating the traffic flow, it offers the following benefits:

- **Transparent Data Handling:** Routes data between traffic sources and security appliances without complex re-routing.
- **Automatic Scalability:** Scales automatically to manage varying traffic loads.
- **Endpoint Service Integration:** Uses built-in endpoint services for efficient, secure communication.

### Example Traffic Flow

Consider traffic incoming from the internet. The sequence is as follows:

1.  Internet traffic is routed to a Gateway Load Balancer endpoint within your VPC.
2.  The load balancer directs this traffic to a security appliance for inspection.
3.  If the appliance approves the traffic, it sends it back to the load balancer.
4.  The load balancer then forwards the traffic to its destination.

The same process applies to outgoing (egress) traffic from your application.

## Feature Infographic

The following infographic summarizes the key features of the Gateway Load Balancer:

![The image is an infographic titled "Gateway Load Balancer" that outlines five features: Layer-3 Load Balancer, Simplified insertion of network appliances, Transparent network gateway, Elastic scaling, and Endpoint services.](https://kodekloud.com/kk-media/image/upload/v1752859085/notes-assets/images/AWS-Certified-Developer-Associate-Gateway-Load-Balancer/gateway-load-balancer-infographic.jpg)

## Ingress Traffic Flow

The next diagram demonstrates the flow of ingress traffic. In this configuration, traffic from the internet is directed to a Gateway Load Balancer endpoint, passes through the load balancer, is inspected by security appliances, and finally reaches the application servers within the VPC.

![The image is a diagram illustrating the flow of ingress traffic through a Gateway Load Balancer setup, showing connections between the internet, a Gateway Load Balancer Endpoint, a Gateway Load Balancer, security appliances, and application servers within VPCs.](https://kodekloud.com/kk-media/image/upload/v1752859087/notes-assets/images/AWS-Certified-Developer-Associate-Gateway-Load-Balancer/ingress-traffic-gateway-load-balancer-diagram.jpg)

## Egress Traffic Flow

For outbound traffic, a similar process takes place:

1.  Traffic from your application is sent to the Gateway Load Balancer.
2.  The load balancer directs the traffic to a security appliance for evaluation.
3.  Once approved, the appliance returns the data to the load balancer.
4.  The load balancer then routes the traffic to the internet gateway.

![The image illustrates the flow of egress traffic through a gateway load balancer setup, showing connections between application servers, a gateway load balancer endpoint, a security appliance, and the internet. It includes labeled steps indicating the traffic path within a VPC environment.](https://kodekloud.com/kk-media/image/upload/v1752859088/notes-assets/images/AWS-Certified-Developer-Associate-Gateway-Load-Balancer/egress-traffic-gateway-load-balancer.jpg)

## Summary

In summary, the Gateway Load Balancer is an effective solution for distributing and managing traffic directed to virtual appliances like firewalls and intrusion detection systems. By ensuring traffic is inspected and processed at the layer three level of the OSI model, it provides secure and efficient routing between your network components and AWS cloud infrastructure.

> [!important]
> **Learn More**
>
> For additional details on AWS networking solutions and security practices, refer to the [AWS Documentation](https://aws.amazon.com/documentation/) and related AWS networking guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/4ea11e52-d7be-48e5-ad4a-0d9421c81a1c)**
>
> Watch video content
