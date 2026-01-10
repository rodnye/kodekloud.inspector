# Demo Create Traffic Into Your Mesh - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Demo-Create-Traffic-Into-Your-Mesh)

---

## Table of Contents

- Demo Create Traffic Into Your Mesh
  - Step 1: Applying the Gateway Configuration
  - Step 2: Configuring Cluster Access
  - Step 3: Testing the Product Page
  - Step 4: Generating Continuous Traffic
  - Step 5: Monitoring Traffic with Kiali
  - Step 6: Reviewing Applied Istio Configurations
  - Step 7: Simulating a Fault to Observe Mesh Behavior
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Istio Service Mesh

Istio Introduction

# Demo Create Traffic Into Your Mesh

In this lesson, we'll configure your service mesh to accept external traffic and see it in action through Kiali. To enable external communication, we need to create a Gateway for our application. The Gateway configures the mesh to allow traffic from outside the cluster, and this configuration is essential for proper external access.

We will use the configuration file located at `networking/bookinfo-gateway.yaml`. This file not only defines the Gateway but also includes a Virtual Service definition which we will discuss in later sections.

## Step 1: Applying the Gateway Configuration

Apply the Gateway configuration by running the following commands:

```
cd istio-1.10.3/
kubectl apply -f networking/bookinfo-gateway.yaml
```

After applying the configuration, verify that your mesh settings are correct and that no validation issues appear.

## Step 2: Configuring Cluster Access

Next, determine the IP address where your local cluster is accessible. Export this IP to a variable to streamline subsequent commands. Depending on your setup, you might run a command similar to the example below and verify that the variable is correctly set:

> [!important]
> **Note**
>
> Remember to confirm that your variable for the IP address is properly exported before proceeding.

Additionally, retrieve the port numbers from the `istio-ingress-gateway` service to ensure proper configuration.

## Step 3: Testing the Product Page

Now, test your setup by accessing the product page using cURL. Run the following command to display the HTML content in your terminal:

```
curl "http://$INGRESS_HOST:$INGRESS_PORT/productpage"
```

If the page loads correctly, you should see the complete HTML source in your terminal. Alternatively, you can access the Bookinfo application in your browser using the same URL. With each refresh, you will notice differently colored stars, indicating that the application employs three different versions of the Reviews service.

## Step 4: Generating Continuous Traffic

To facilitate easier experimentation, you can generate continuous traffic by running a simple loop that sends repeated cURL requests to the product page. Execute the command below; it will repeatedly call the product page without cluttering your terminal output:

```
while sleep 0.01; do curl -s "http://$INGRESS_HOST:$INGRESS_PORT/productpage" &> /dev/null; done
```

> [!important]
> **Note**
>
> Be sure to copy this command carefully to avoid issues with backslashes or unexpected formatting.

## Step 5: Monitoring Traffic with Kiali

Open the Kiali dashboard and allow a few moments for the data to be collected and visualized. If needed, adjust the time interval and refresh the graph. The dashboard will clearly display live traffic along with healthy applications, workloads, and services, indicating that traffic is flowing into your mesh.

## Step 6: Reviewing Applied Istio Configurations

Let's review the Istio configurations defined in the `bookinfo-gateway.yaml` file. This file contains the configurations for both the Gateway and the Virtual Service – these are the only Istio settings applied at this point. More details regarding these configurations will be discussed in later lessons.

## Step 7: Simulating a Fault to Observe Mesh Behavior

Kiali is a powerful tool for identifying issues within a service mesh. To demonstrate this, we'll intentionally simulate a problem by deleting one of our deployments.

Delete the product page deployment with this command:

```
kubectl delete deployments/productpage-v1
```

After executing the command, return to the Kiali dashboard and observe the changes. Initially, the product page node in the graph may appear "half-available" due to retained data from the previous minute. Soon, it will be marked entirely in dark red, indicating that all requests are now returning 500 errors.

In the applications menu, the product page will no longer display health information and it will vanish from the workloads list. Additionally, the services page will show question marks in the health column, signaling that health data for those services is no longer available.

With the product page deployment deleted, none of the services will receive traffic from the cURL loop, effectively demonstrating the impact of configuration changes within the service mesh.

## Summary

By following these steps, you have successfully configured your service mesh to accept external traffic, validated your setup with both cURL and Kiali, and intentionally simulated a failure to observe how configuration changes impact the mesh. For additional details on Istio configurations and service mesh best practices, refer to the [Istio Documentation](https://istio.io/latest/docs/).

Happy troubleshooting and exploring your mesh!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/ecff4a51-c945-4fe5-a567-53febd91424a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/b645df2c-35c3-48a8-b655-6639987b2c7a)**
>
> Practice lab
