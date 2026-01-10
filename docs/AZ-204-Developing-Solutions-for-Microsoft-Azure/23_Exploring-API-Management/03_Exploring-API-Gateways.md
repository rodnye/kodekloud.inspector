# Exploring API Gateways - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-API-Management/Exploring-API-Gateways)

---

## Table of Contents

- Exploring API Gateways
  - Common API Gateway Design Patterns
  - Implementing an API Gateway Using Azure API Management
  - Watch Video
    - Sample APIs
    - Deploying API Management in Azure
    - Creating APIs from App Service

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring API Management

# Exploring API Gateways

This article delves into the essential role of API gateways within modern API management systems. An API gateway serves as middleware, connecting client applications with backend services (such as databases and microservices). Acting as a reverse proxy, it routes client requests to the appropriate backends based on predefined rules and configurations.

In addition to routing, the API gateway manages critical functions like authentication, SSL termination, and rate limiting. These capabilities ensure secure and efficient communication, reduce server load, and enforce request thresholds, thereby boosting overall system security, performance, and scalability.

![The image illustrates the role of an API gateway, showing its position between client apps and services, and highlighting its functions such as authentication, SSL offloading, and routing. It includes a diagram with components like Identity Provider, API Gateway, Service A, Service B, and Logging.](https://kodekloud.com/kk-media/image/upload/v1752866318/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/api-gateway-architecture-diagram.jpg)

> [!important]
> **Key Insight**
>
> An API gateway enables streamlined client-to-service communication while abstracting and centralizing cross-cutting responsibilities.

Without an API gateway, clients must directly interact with multiple backend services. This direct communication leads to increased complexity and tightly coupled systems—any change in a backend service can immediately impact all consuming clients. Moreover, each service is then responsible for its own security, logging, and performance optimizations. Handling diverse protocols across services further complicates integration.

![The image lists potential issues when deploying an API without a gateway, including complex client code, client-backend coupling, multiple service calls, handling public-facing services, and the need for client-friendly protocols.](https://kodekloud.com/kk-media/image/upload/v1752866319/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/api-deployment-issues-without-gateway.jpg)

> [!important]
> **Warning**
>
> Avoiding the use of an API gateway can result in a fragile, unscalable, and insecure system. Implementing a gateway is highly recommended to mitigate these risks.

## Common API Gateway Design Patterns

Implementing an API gateway unlocks several design patterns that simplify client interactions and backend integrations:

1.  **Gateway Routing**  
    The gateway acts as a reverse proxy, routing client requests to the correct backend services based on established rules.
2.  **Gateway Aggregation**  
    Multiple backend service calls are combined into a single client request, reducing the number of calls needed and simplifying client logic.
3.  **Gateway Offloading**  
    Cross-cutting concerns—such as authentication, logging, and SSL termination—are managed by the gateway, reducing the burden on individual services.

![The image illustrates three functional design patterns: Gateway Routing, Gateway Aggregation, and Gateway Offloading, each with a brief description of their use.](https://kodekloud.com/kk-media/image/upload/v1752866320/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/gateway-routing-aggregation-offloading.jpg)

These design patterns highlight the flexibility of platforms like [Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/) and their ability to create scalable, efficient, and maintainable API systems.

---

## Implementing an API Gateway Using Azure API Management

In this section, we will explore how to set up an API gateway using the Azure portal. In our example, the API Management service handles two web APIs: one for flight logs and another for employee information—both hosted in Azure App Service.

### Sample APIs

When a request is sent to the employee endpoint, the service returns employee data. Below is a sample JSON response from the employee API:

```
[
    {
        "employeeId": 1,
        "firstName": "Fanny",
        "lastName": "Mose",
        "salary": 37411.79,
        "hireDate": "2009-06-17T08:00:00",
        "department": "IT",
        "employeeStatus": "Contractor"
    },
    {
        "employeeId": 2,
        "firstName": "Reddy",
        "lastName": "Meweld",
        "salary": 13082.04,
        "hireDate": "2009-01-17T08:00:00",
        "department": "Marketing",
        "employeeStatus": "Contractor"
    },
    {
        "employeeId": 3,
        "firstName": "Andread",
        "lastName": "Mullsm",
        "salary": 13074.68,
        "hireDate": "2008-12-31T08:00:00",
        "department": "Marketing",
        "employeeStatus": "Part-time"
    }
]
```

Similarly, the flight logs API retrieves key information such as flight numbers, airport codes, departure/arrival times, airline names, and flight durations:

```
[
    {
        "flightNumber": 1566,
        "departureAirportCode": "LIZ",
        "arrivalAirportCode": "CWM",
        "departureDatetime": "2022-10-13T09:00:00Z",
        "arrivalDatetime": "2022-10-13T09:00:00Z",
        "airlineName": "United",
        "flightDurationInMinutes": 35
    },
    {
        "flightNumber": 5377,
        "departureAirportCode": "TBM",
        "arrivalAirportCode": "TXN",
        "departureDatetime": "2022-05-05T08:00:00Z",
        "arrivalDatetime": "2022-05-05T08:00:00Z",
        "airlineName": "United",
        "flightDurationInMinutes": 1309
    },
    {
        "flightNumber": 3034,
        "departureAirportCode": "TXN",
        "arrivalAirportCode": "LIZ",
        "departureDatetime": "2022-01-21T09:00:00Z",
        "arrivalDatetime": "2022-01-21T09:00:00Z",
        "airlineName": "United",
        "flightDurationInMinutes": 120
    }
]
```

### Deploying API Management in Azure

When deploying the API Management service in the Azure portal, you need to select an appropriate resource group and region (e.g., East US). In our example, the service is deployed under the name "C204APIM01" for the organization "KodeKloud." The Developer pricing tier is used during development, with the option to upgrade later.

Azure offers a range of monitoring and connectivity options, including Log Analytics, Defender for APIs, and Application Insights. You can configure the service to be public, attach it to a virtual network, or use a private endpoint. Managed identities further enhance operations such as retrieving certificates from the Key Vault.

![The image shows a Microsoft Azure portal page for creating an API Management service, specifically on the "Monitor + secure" tab, with options for add-ins like Log Analytics, Defender for APIs, and Application Insights.](https://kodekloud.com/kk-media/image/upload/v1752866322/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-api-management-monitor-tab.jpg)

![The image shows a Microsoft Azure portal interface for creating an API Management service, specifically on the "Virtual network" tab, where connectivity type options are being selected.](https://kodekloud.com/kk-media/image/upload/v1752866323/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-portal-api-management-virtual-network.jpg)

After finalizing these options, you proceed with deployment.

![The image shows a Microsoft Azure portal page for creating an API Management service, displaying details like subscription, resource group, and region, with a "Create" button highlighted.](https://kodekloud.com/kk-media/image/upload/v1752866324/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-portal-api-management-creation.jpg)

Deployment typically takes between 40 and 60 minutes. Once deployed, click "Go to Resource" to view details like the gateway URL and developer portal URL. An Echo API is provided for testing, and additional APIs can be added by navigating to the "APIs" section.

![The image shows a Microsoft Azure portal interface for API management, displaying options to define a new API using various protocols like HTTP, WebSocket, GraphQL, and gRPC, as well as options to create APIs from definitions or Azure resources.](https://kodekloud.com/kk-media/image/upload/v1752866325/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-portal-api-management-interface.jpg)

### Creating APIs from App Service

From the available options, you can define an API from an HTTP endpoint by selecting the corresponding App Service. For example, to create the employee API:

- **Display Name:** Employee API
- **Path:** /api/employee

![The image shows a Microsoft Azure portal interface where a user is creating an API from an App Service. The "Create from App Service" dialog box is open, displaying fields for App Service, Display name, Name, and API URL suffix.](https://kodekloud.com/kk-media/image/upload/v1752866327/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-portal-create-api-app-service.jpg)

Similarly, add the flight logs API with the path "/api/flightlogs":

![The image shows a Microsoft Azure portal interface where a user is creating an API from an App Service, specifically for a "Flight Logs API." The form includes fields for App Service, Display Name, Name, and API URL suffix.](https://kodekloud.com/kk-media/image/upload/v1752866328/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-API-Gateways/azure-portal-flight-logs-api.jpg)

At this stage, direct API calls are not required as additional configurations—such as subscription keys and policies—are necessary to secure and manage these APIs effectively. Once configured, you can test the APIs through the Azure portal.

---

This concludes our exploration of API gateways, their design patterns, and their implementation using Azure API Management. Future articles will delve deeper into configuring subscription keys, policies, and other advanced features to further secure and optimize your API ecosystem.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4fb192a0-bdef-49d6-9dd7-7e788680ea1a/lesson/2c089b8b-31e8-45e7-abba-295ec9cb5b7e)**
>
> Watch video content
