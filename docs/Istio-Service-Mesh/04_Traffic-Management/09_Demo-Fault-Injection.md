# Demo Fault Injection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Demo-Fault-Injection)

---

## Table of Contents

- Demo Fault Injection
  - Step 1: Create a Destination Rule
  - Step 2: Set Up the Virtual Service
  - Step 3: Verify the Configuration in Kiali
  - Step 4: Observe the Impact on the Application
  - Conclusion
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Demo Fault Injection

In this lesson, we demonstrate how to simulate service degradation by introducing a delay in the details service using Istio's fault injection capabilities. By doing so, you can evaluate how the overall product page responds to slow or failing services, helping you to plan coordinated responses to potential issues in your service mesh.

## Step 1: Create a Destination Rule

Before applying the fault injection rule, it is essential to configure a Destination Rule. This rule defines a subset (in this case, "v1") of the details service required for the fault injection configuration.

## Step 2: Set Up the Virtual Service

Begin by creating a Virtual Service named "details." Within the virtual service configuration, specify the affected service in the host section. Next, include a fault section under the HTTP protocol configuration. The following configuration delays 70% of the traffic destined for the "v1" subset of the details service by an extra 7 seconds:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
spec:
  hosts:
    - details
  http:
    - fault:
        delay:
          percentage:
            value: 70.0
          fixedDelay: 7s
      route:
        - destination:
            host: details
            subset: v1
```

> [!important]
> **Note**
>
> Save the above configuration to a file (for example, `virtual-service-fault.yaml`) and apply it using `kubectl` to implement the fault injection rule.

Apply the configuration with the following commands:

```
istiotraining@local istio-1.10.3 $ vi virtual-service-fault.yaml
istiotraining@local istio-1.10.3 $ kubectl apply -f virtual-service-fault.yaml
virtualservice.networking.istio.io/details created
```

This rule instructs Istio to inject a 7-second delay to 70% of the requests reaching the details service.

## Step 3: Verify the Configuration in Kiali

After applying the configuration, verify that the Virtual Service and associated settings are active and error-free within your service mesh. Kiali provides a visual confirmation of the Istio configurations in use:

![The image shows the Kiali console interface displaying Istio configuration details for the "default" namespace, listing a VirtualService and a Gateway.](https://kodekloud.com/kk-media/image/upload/v1752879388/notes-assets/images/Istio-Service-Mesh-Demo-Fault-Injection/kiali-console-istio-configuration-default.jpg)

## Step 4: Observe the Impact on the Application

Navigate to the application to see the effect of the fault injection. In Kiali, you will observe that:

- The details service experiences performance degradation, as indicated by problematic connections from the product page.
- Some requests (approximately 30%) remain unaffected and continue to operate normally.

![The image shows a Kiali console interface displaying a service mesh graph with nodes representing different services and their interactions. It includes metrics on HTTP requests, success rates, and errors.](https://kodekloud.com/kk-media/image/upload/v1752879389/notes-assets/images/Istio-Service-Mesh-Demo-Fault-Injection/kiali-console-service-mesh-graph.jpg)

When you refresh the browser, you might notice that the details service occasionally fails to respond within the expected time frame due to the injected delay. Conversely, the healthy traffic (30%) may still provide timely responses.

> [!important]
> **Tip**
>
> Fault injection is an effective technique to simulate real-world service degradations. It can help identify weaknesses in your service architecture and guide you in developing stronger, more resilient applications.

## Conclusion

This lesson has shown how to use Istio's fault injection to intentionally slow down a service, enabling you to examine the responses of the overall system under degraded conditions. Understanding these behaviors is key to improving the reliability and performance of your service mesh.

For more detailed information, consider exploring:

- [Istio Fault Injection Documentation](https://istio.io/latest/docs/tasks/traffic-management/fault-injection/)
- [Kiali Documentation](https://www.kiali.io/documentation/latest/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/b5053789-8d11-43ec-b03d-9d06c27a0fd6)**
>
> Watch video content
