# Custom Resource Definition - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Custom-Resource-Definition)

---

## Table of Contents

- Custom Resource Definition
  - Standard Kubernetes Resource: Deployment
  - Custom Resource: FlightTicket
  - Defining a Custom Resource Definition (CRD)
  - The Role of a Custom Controller
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Custom Resource Definition

In this lesson, we explore how Custom Resource Definitions (CRDs) work in Kubernetes. You will learn how standard Kubernetes resources, such as Deployments, are created, stored in etcd, and managed by built-in controllers. Then, we’ll demonstrate how to extend Kubernetes by defining and using a custom resource—illustrated here as a "FlightTicket"—and explain why a dedicated custom controller is necessary to act upon these new resources.

---

## Standard Kubernetes Resource: Deployment

When you create a Deployment in Kubernetes, the API server stores its state in etcd. A built-in controller, known as the deployment controller, continuously monitors the Deployment to ensure that the desired state (for example, maintaining three replicas) is met by creating or deleting pods as needed.

Below is an example Deployment definition file:

```
# deployment.yml
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

Using the file above, you can create, query, and delete the deployment with the following commands:

```
kubectl create -f deployment.yml
# Output:
kubectl get deployments
# Output:
# NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubectl delete -f deployment.yml
# Output:
# deployment "myapp-deployment" deleted
```

The deployment controller automatically creates a ReplicaSet, which manages the specified number of pods. This automation lies at the heart of Kubernetes resource management.

---

## Custom Resource: FlightTicket

Imagine you want to manage something entirely new on your cluster—such as booking a flight ticket. In this example, we define a custom resource called FlightTicket that represents a flight ticket booking. The resource encapsulates details such as the departure and destination airports and the number of tickets required.

Below is an example of a FlightTicket resource file:

```
# flightticket.yml
apiVersion: flights.com/v1
kind: FlightTicket
metadata:
  name: my-flight-ticket
spec:
  from: Mumbai
  to: London
  number: 2
```

When you create this custom resource, you expect that:

- It is stored in etcd.
- A custom controller (which you will build) watches for create, update, or delete events.
- The controller automatically makes the necessary API calls (for example, to an external flight booking API) to either book or cancel the ticket.

> [!important]
> **Important**
>
> Attempting to create the FlightTicket resource without first informing Kubernetes of its existence will result in an error:
>
> ```
> kubectl create -f flightticket.yml
> # Output:
> # no matches for kind "FlightTicket" in version "flights.com/v1"
> ```
>
> This error means that Kubernetes does not yet recognize the FlightTicket type.

---

## Defining a Custom Resource Definition (CRD)

To allow the Kubernetes API to accept FlightTicket objects, you must create a CRD that informs the API server about this new resource type. The CRD includes details such as API version, kind, metadata, spec, and schema information (including supported fields, types, and validation rules).

Here’s an example of a CRD for the FlightTicket resource:

```
# flightticket-custom-definition.yml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: flighttickets.flights.com
spec:
  group: flights.com
  scope: Namespaced
  names:
    plural: flighttickets
    singular: flightticket
    kind: FlightTicket
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

Key points in the CRD:

- The API group is `flights.com`.
- The resource scope is namespace-scoped.
- Both singular and plural names are defined along with a short name (`ft`).
- Only one version (`v1`) is served and defined as the storage version.
- An OpenAPI v3 schema enforces that the `spec` includes `from` and `to` as strings, and `number` as an integer with a minimum value of 1.

After creating the CRD, you can create, retrieve, and delete FlightTicket resources using these commands:

```
kubectl create -f flightticket-custom-definition.yml
# Output:
kubectl create -f flightticket.yml
# Output:
kubectl get flightticket
# Output:
# NAME             STATUS
kubectl delete -f flightticket.yml
# Output:
# flightticket "my-flight-ticket" deleted
```

To verify that your new resource is recognized by Kubernetes, run:

```
kubectl api-resources
# Output snippet:
# NAME            SHORTNAMES   APIGROUP     NAMESPACED   KIND
# flighttickets   ft           flights.com  true         FlightTicket
```

---

## The Role of a Custom Controller

While defining a CRD enables Kubernetes to store and retrieve FlightTicket objects in etcd, these objects remain inactive without a controller. A custom controller, often implemented in Go, observes events related to FlightTicket resources and executes business logic (such as calling external APIs to book or cancel flights).

Below is a simplified snippet of what such a controller might look like:

```
package flightticket

var controllerKind = apps.SchemeGroupVersion.WithKind("FlightTicket")

// Run begins watching and syncing FlightTicket resources.
func (dc *FlightTicketController) Run(workers int, stopCh <-chan struct{}) {
    // Controller logic goes here
}

// callBookFlightAPI handles the API call to book a flight ticket.
func (dc *FlightTicketController) callBookFlightAPI(obj interface{}) {
    // API call implementation goes here
}
```

> [!important]
> **Note**
>
> Without a custom controller, any FlightTicket resource you create remains a passive data record in etcd without triggering any external actions.

---

## Conclusion

In this lesson, we learned how:

- Kubernetes resources like Deployments are managed by built-in controllers.
- A custom resource (FlightTicket) can be defined to represent a new domain object.
- A CRD must be created so that Kubernetes recognizes your custom resource.
- A custom controller is essential to actively process and respond to events related to these resources.

In upcoming lessons, we’ll dive deeper into developing custom controllers that monitor CRD events and execute automated tasks based on resource changes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/8b7b28d2-6dfe-4a88-8b50-14bdac7c286d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/84040576-5913-4ea2-8f1c-1c3ceb8e93d3)**
>
> Practice lab
