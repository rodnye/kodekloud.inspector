# Services and Routes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Networks-Services-Routes-and-Scaling/Services-and-Routes)

---

## Table of Contents

- Services and Routes
  - Linking Services to Pods
  - Exposing Services to External Users
  - Configuring Security and Advanced Routing
  - Watch Video

---

## Content

OpenShift 4

Networks Services Routes and Scaling

# Services and Routes

Hello, and welcome to this comprehensive guide on services and routes in OpenShift.

In this article, we will dive deep into the functionality of services in OpenShift. If you are already familiar with services in Kubernetes, you’ll appreciate that OpenShift implements them in a very similar fashion.

Services enable communication between different applications or groups of pods without the need to depend on pod IP addresses or DNS names. Essentially, a service acts as a load balancer in your microservices architecture. For example:

- The front-end interacts with the back-end via a service.
- The back-end communicates with a data processing application through a service.
- The front-end exposes your application to end-users using a service.

This method streamlines modifications and redeployments of microservices since changes in one service do not necessitate reconfiguring all dependent applications.

![The image is a flowchart illustrating a service architecture, showing interactions between users, front-end, back-end, data processing, and a database through various services.](https://kodekloud.com/kk-media/image/upload/v1752882688/notes-assets/images/OpenShift-4-Services-and-Routes/service-architecture-flowchart.jpg)

Each service in OpenShift is assigned its own IP address and DNS entry. Similar to pods, every service is allocated an internal IP address known as the Cluster IP, which is responsible for intra-cluster communication. You can view the Cluster IP in the OpenShift UI alongside the list of services.

## Linking Services to Pods

Services are connected to pods using selectors. For instance, to tie a service to all pods created by the SimpleWebApp Docker deployment, you would use a selector that matches the deployment configuration label (e.g., "Simple-WebApp-Docker"). You will also specify the service port and the target port on the pods that will receive the forwarded requests.

![The image is a diagram illustrating a service configuration for a simple web app using Docker, showing details like IP address, hostname, and port information. It includes a visual representation of the service and its deployment configuration.](https://kodekloud.com/kk-media/image/upload/v1752882690/notes-assets/images/OpenShift-4-Services-and-Routes/docker-web-app-service-config-diagram.jpg)

These configuration details—including selectors, service port, and target port—are displayed clearly in the service details within the OpenShift UI.

## Exposing Services to External Users

Once the service is linked to the back-end pods, the next step is to expose these services to external users by creating routes. End-users typically access your application via a hostname (e.g., www.somewebapp.com), and this is where routes become essential.

A route externally exposes the service by acting as a proxy, much like HAProxy or F5. Routes not only allow you to manage load balancing but also help configure security settings and enable traffic splitting between multiple services. They distribute incoming requests across the pods in a deployment using various load-balancing strategies.

> [!important]
> **Load Balancing Strategies**
>
> - The **default strategy** ("source") directs requests from the same user IP to the same back-end server to enable sticky sessions.
> - The **round-robin strategy** distributes each request to a different back-end server, even if the requests originate from the same IP address.
> - Another strategy routes traffic to the endpoint with the fewest active connections.

![The image illustrates a load balancing setup for a web application, showing user requests being distributed to multiple servers using a round-robin method.](https://kodekloud.com/kk-media/image/upload/v1752882691/notes-assets/images/OpenShift-4-Services-and-Routes/load-balancing-web-application-diagram.jpg)

## Configuring Security and Advanced Routing

Routes in OpenShift offer robust security features. Under the security settings for a route, you can enable SSL to provide HTTPS access to your web application. There are additional options to manage how insecure traffic is handled—either by permitting HTTP access or by automatically redirecting users to the secure HTTPS version of the site. This configuration also allows you to manage SSL certificates and private keys.

![The image shows a diagram and a configuration panel related to web application security, illustrating a route setup with TLS termination and options for handling insecure traffic.](https://kodekloud.com/kk-media/image/upload/v1752882692/notes-assets/images/OpenShift-4-Services-and-Routes/web-application-security-diagram.jpg)

In addition to basic routing, routes support advanced configurations like traffic splitting, which is particularly useful for A/B testing scenarios. The OpenShift UI features an alternate services section that lets you distribute traffic between two services with configurable weights.

![The image illustrates a traffic routing setup where traffic is split between two services, each with a specified weight, for A/B testing. It includes a diagram of the route and services, along with a configuration panel showing service weights.](https://kodekloud.com/kk-media/image/upload/v1752882693/notes-assets/images/OpenShift-4-Services-and-Routes/traffic-routing-ab-testing-diagram.jpg)

That concludes our detailed exploration of services and routes in OpenShift. In the upcoming demo on services and routes, we will put these concepts into practice.

Thank you for reading, and stay tuned for our next article where we continue to explore advanced OpenShift features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/ec611802-285c-4fb9-b13e-26eb84f4ec7d/lesson/bd934fc9-770a-42fb-9b91-1fd98d46f718)**
>
> Watch video content
