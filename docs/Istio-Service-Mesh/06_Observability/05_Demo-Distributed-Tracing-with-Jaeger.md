# Demo Distributed Tracing with Jaeger - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Observability/Demo-Distributed-Tracing-with-Jaeger)

---

## Table of Contents

- Demo Distributed Tracing with Jaeger
  - Prerequisites
  - Accessing the Jaeger Dashboard
  - Analyzing Traces
  - Introducing Delays
  - Verifying with Kiali
  - Deep Dive with Jaeger
  - Conclusion
  - Watch Video
  - Practice Lab
    - Filtering by Service

---

## Content

Istio Service Mesh

Observability

# Demo Distributed Tracing with Jaeger

In this lesson, we explore how to use Jaeger for distributed tracing in an Istio-managed environment. Initially, we examine the normal behavior of our Bookinfo application as it handles heavy traffic. Then, we introduce artificial delays to discover how Jaeger tracing can help identify performance issues.

## Prerequisites

Ensure the Bookinfo application is running in your cluster and is experiencing significant load.

## Accessing the Jaeger Dashboard

Open the Jaeger dashboard by executing the following command:

```
istioctl dashboard jaeger
```

Once the dashboard loads, you will see several search criteria on the left side. These include filters for service name, operation name, tags, trace duration, and the number of results. Click on **Find Traces** to display a graph containing the traces.

> [!important]
> **Tip**
>
> For a broader view, increase the number of traces to 50. Keep in mind that under heavy load, Jaeger may sample only a few seconds (typically 3 or 4) of the timeline for these traces. You can also sort the traces by criteria such as longest duration, shortest duration, most spans, or least spans.

## Analyzing Traces

Zoom into individual traces to inspect specific spans. Each line in a trace represents a span—a logical unit of work. For instance, a single trace might include 8 spans. When you expand a span, you can view:

- Detailed timing information
- Associated tags for further filtering

### Filtering by Service

To focus on the review service, filter the traces to display only those specific to reviews. The filtered results will clearly show the interactions involving the review service.

## Introducing Delays

Next, we introduce delays in the detail service to simulate performance issues. As seen in the traffic management section, a delay in the detail service causes the product service to wait for 3 seconds before returning an error. This confirms the delay is functioning as expected.

> [!important]
> **Caution**
>
> When applying delays, ensure your environment is properly monitored to avoid unintended performance degradations in production.

## Verifying with Kiali

To validate the delay, open the Kiali dashboard. Although the initial overview might not display significant changes, the graph view will reveal that the detail service is encountering issues, with error indicators visible for the affected services.

## Deep Dive with Jaeger

Switch back to the Jaeger dashboard and filter by the "product page" service. The image below illustrates the Jaeger UI with:

- A scatter plot graph representing trace data
- A list of traces showing details like duration and spans

![The image shows a Jaeger UI interface displaying trace data with a scatter plot graph and a list of traces for a service, including details like duration and spans.](https://kodekloud.com/kk-media/image/upload/v1752879355/notes-assets/images/Istio-Service-Mesh-Demo-Distributed-Tracing-with-Jaeger/jaeger-ui-trace-data-scatter-plot.jpg)

For simplified analysis, limit your results to 20 traces. Within these traces:

- You may identify a faulty trace where only 70% of the calls have delays.
- Drill down into the affected trace to observe that the product page encountered an error after a 3-second wait for a response from the detail service.
- Review additional traces: one might display a warning that its parent span hasn’t been reported yet (with all associated tags visible), while another trace shows the product service returning successfully in just 52 milliseconds without errors.

## Conclusion

Jaeger is a powerful and easy-to-use tool for distributed tracing in an Istio-managed environment. Before installation, be sure to review the configuration recommendations to seamlessly integrate Jaeger into your application setup.

For further reading and resources:

- [Jaeger Documentation](https://www.jaegertracing.io/docs/)
- [Istio Documentation](https://istio.io/latest/docs/)

Happy tracing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/7696566a-6631-4367-9fbc-ce86b23cd608/lesson/061a3361-30a2-4a0b-ba4c-53db488e0b52)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/7696566a-6631-4367-9fbc-ce86b23cd608/lesson/5e2c86f3-72b0-49e4-ac30-fc2ad2af375e)**
>
> Practice lab
