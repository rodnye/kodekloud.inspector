# Custom Resource Definition CRD 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Custom-Resource-Definition-CRD-2025-Updates)

---

## Table of Contents

- Custom Resource Definition CRD 2025 Updates
  - Kubernetes Resources and Controllers
  - Custom Resources: The Flight Ticket Example
  - Defining a Custom Resource with CRD
  - Beyond Data Storage: Custom Controllers
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Custom Resource Definition CRD 2025 Updates

In this article, we explore Custom Resource Definitions (CRDs) in Kubernetes and demonstrate how they extend your cluster's functionality. We begin by reviewing how Kubernetes manages built-in resources like Deployments and then move toward creating custom resources and controllers.

---

## Kubernetes Resources and Controllers

When you create a Deployment in Kubernetes, the API server stores its configuration in the etcd datastore. Consider the following Deployment definition:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      type: front-end
  template:
    metadata:
      name: myapp-pod
      labels:
        type: front-end
    spec:
      containers:
      - image: nginx
```

To create, list, and delete the Deployment, you run:

```
kubectl create -f deployment.yml
kubectl get deployments
# Output:
# NAME                DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubectl delete -f deployment.yml
# Output: deployment "myapp-deployment" deleted
```

When the Deployment is created, Kubernetes automatically launches the specified number of Pods (3 in this example) according to the replica count. This behavior is managed by the deployment controller, a key built-in process that continuously monitors cluster resources to ensure the actual state matches your manifest's desired state.

Under the hood, the deployment controller creates a ReplicaSet, which in turn manages the creation of Pods. Although the controller is implemented in Go as a part of the Kubernetes source code, you do not need to understand its inner workings to effectively use it.

![The image shows a comparison between "Resource" and "Controller" in a Kubernetes context, listing items like ReplicaSet, Deployment, Job, CronJob, Statefulset, and Namespace, with "ETCD" in the center.](https://kodekloud.com/kk-media/image/upload/v1752869936/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Custom-Resource-Definition-CRD-2025-Updates/kubernetes-resource-controller-comparison.jpg)

---

## Custom Resources: The Flight Ticket Example

Imagine managing flight ticket bookings in Kubernetes with a custom resource. In this scenario, you define an object of kind FlightTicket to specify the details for booking a flight ticket. Initially, the custom resource is defined as follows:

```
apiVersion: flights.com/v1
kind: FlightTicket
metadata:
  name: my-flight-ticket
spec:
  from: Mumbai
  to: London
  number: 2
```

Attempting to create this resource without proper configuration results in an error, as Kubernetes does not recognize the FlightTicket kind by default:

```
kubectl create -f flightticket.yml
# Output: no matches for kind "FlightTicket" in version "flights.com/v1"
```

The error occurs because Kubernetes must be explicitly informed about the new resource type through a Custom Resource Definition (CRD).

---

## Defining a Custom Resource with CRD

A CRD informs Kubernetes about new custom resources, enabling their creation and management. Below is an example of how to define a CRD for a FlightTicket resource:

```
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: flighttickets.flights.com
spec:
  scope: Namespaced
  group: flights.com
  names:
    kind: FlightTicket
    singular: flightticket
    plural: flighttickets
    shortNames:
      - ft
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                from:
                  type: string
                to:
                  type: string
                number:
                  type: integer
                  minimum: 1
```

> [!important]
> **Note**
>
> In this CRD definition:
>
> - The API version is set to `apiextensions.k8s.io/v1`.
> - The metadata name is `flighttickets.flights.com`.
> - The resource is defined as namespaced.
> - The API group is `flights.com` and the kind is `FlightTicket`.
> - Singular, plural, and short names (ft) are specified.
> - Version `v1` is marked as both served and the storage version.
> - An OpenAPI v3 schema validates the `spec` fields: `from`, `to`, and `number`.

After applying the CRD, you can successfully create the custom resource:

```
kubectl create -f flightticket-custom-definition.yml
# Output: customresourcedefinition "flighttickets.flights.com" created
```

Now, when you create, list, and delete the custom resource, the commands work seamlessly:

```
kubectl create -f flightticket.yml
kubectl get flightticket
# Output:
# NAME             STATUS
kubectl delete -f flightticket.yml
# Output: flightticket "my-flight-ticket" deleted
```

Additionally, using the short name confirms that the resource is available:

```
kubectl api-resources
# Relevant output:
# NAME             SHORTNAMES   APIGROUP     NAMESPACED   KIND
# flighttickets    ft           flights.com  true         FlightTicket
```

---

## Beyond Data Storage: Custom Controllers

While a CRD and its corresponding custom resource primarily store data in etcd, you often need to automate real operations—such as booking a flight ticket through an external service. This is where a custom controller comes into play.

A custom controller, typically written in Go, watches for changes to FlightTicket resources and triggers the appropriate actions (e.g., calling an external API) when a resource is created, updated, or deleted. Without this controller, the FlightTicket remains merely a data entry in etcd without any external effect.

> [!important]
> **Upcoming Lesson**
>
> In future lessons, we will walk through the process of creating a custom controller that can effectively integrate these resources with your external systems.

---

This article provided an introduction to Custom Resource Definitions and custom controllers within Kubernetes. By harnessing these capabilities, you can extend Kubernetes to manage any resource tailored to your business needs.

For more detailed information, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/79472710-6891-42a4-a483-fa6db0d2e890)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/84040576-5913-4ea2-8f1c-1c3ceb8e93d3)**
>
> Practice lab
