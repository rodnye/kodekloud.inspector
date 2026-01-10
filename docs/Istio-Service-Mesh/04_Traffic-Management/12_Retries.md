# Retries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Retries)

---

## Table of Contents

- Retries
  - How Retries Work
  - Example Configuration
  - Resilience Through Centralized Configuration
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Retries

In this article, we explore how retries work with Virtual Services to improve service resiliency. By offloading retry logic to your Virtual Services configuration, you avoid embedding complex error-handling code within your application, resulting in cleaner and more maintainable code.

> [!important]
> **Note**
>
> Retries enable your service to automatically attempt to reconnect when a connection failure occurs between services. This helps mitigate transient network issues without modifying your application code.

## How Retries Work

When one service fails to connect to another, Virtual Services can be set up to automatically retry the operation. The main parameters for configuration are:

- **Attempts**: The number of times Istio will try to route the request.
- **Per Try Timeout**: The timeout duration for each individual retry.

By default, Istio is configured with a 25-millisecond interval between retries and retries twice before returning an error. However, these default settings can be customized to better match your environment's requirements.

## Example Configuration

Below is an example YAML configuration that demonstrates how to set up retry logic in a Virtual Service:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
  - my-service
  http:
  - route:
    - destination:
        host: my-service
        subset: v1
    retries:
      attempts: 3
      perTryTimeout: 2s
```

In this example:

| Field         | Description                                          | Example Value |
| ------------- | ---------------------------------------------------- | ------------- |
| attempts      | The number of retry attempts before giving up.       | 3             |
| perTryTimeout | The maximum duration to wait for each retry attempt. | 2s            |

This configuration instructs Istio to attempt routing the request **three times** with a **2-second timeout** for each try.

## Resilience Through Centralized Configuration

Retries are defined at the Virtual Service level, which centralizes error handling and simplifies the overall service architecture. By adjusting the retry settings, you can control how long to wait between attempts and when to stop retrying, thereby enhancing the overall resilience of your application.

> [!important]
> **Key Takeaway**
>
> Configuring retries at the Virtual Service level helps manage transient failures gracefully, reducing the need for custom retry logic within your application code. For more details, check out [Istio’s retry documentation](https://istio.io/latest/docs/concepts/traffic-management/#retries).

By leveraging these retry settings, you ensure that transient issues are managed effectively, providing a robust and resilient service infrastructure without additional overhead in your core application code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/b123f4a3-6b8a-4e6d-ae52-2c5b2727f122)**
>
> Watch video content
