# Custom Controllers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Custom-Controllers)

---

## Table of Contents

- Custom Controllers
  - Getting Started with a Custom Controller
  - Overview
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Custom Controllers

In this lesson, we explore how to develop custom controllers for managing your Kubernetes resources. Building on our previous work with Custom Resource Definitions (CRDs), we now introduce FlightTicket objects. These objects, along with their details, are stored in etcd. The custom controller monitors the status of these FlightTicket objects in etcd and performs actions such as booking, editing, or canceling flight tickets by invoking the appropriate flight booking API.

A controller is a process or piece of code that continuously observes the Kubernetes cluster for specific events (like changes to FlightTicket objects) and takes corresponding actions.

For example, consider the following YAML definition of a FlightTicket resource:

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

You can create this resource and verify its status using these commands:

```
kubectl create -f flightticket.yml
# Output:
kubectl get flightticket
# Output:
# NAME              STATUS
# my-flight-ticket  Pending
```

> [!important]
> **Note**
>
> While you can implement controllers in various programming languages, using the Kubernetes Go client is recommended. The Go client (client-go library) provides shared informers that offer efficient caching and queuing mechanisms, making it ideal for building robust controllers.

The same FlightTicket YAML definition provides context for this process:

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

And here are the related creation commands:

```
kubectl create -f flightticket.yml
# Output:
kubectl get flightticket
# Output:
# NAME              STATUS
# my-flight-ticket  Pending
```

Using Go simplifies the development process due to its seamless integration with Kubernetes libraries that support robust controller patterns.

## Getting Started with a Custom Controller

To build your custom controller, follow these steps:

1.  **Clone the SampleController Repository**  
    Clone the repository from GitHub using the following command:

    ```
    git clone https://github.com/kubernetes/sample-controller.git
    # Cloning into 'sample-controller'...
    # Resolving deltas: 100% (15787/15787), done.
    ```

2.  **Customize Your Controller Logic**  
    Navigate to the repository directory and modify the `controller.go` file to include your custom logic, such as invoking the flight booking API:

    ```
    cd sample-controller
    go build -o sample-controller .
    # Output during build might include:
    # go: downloading k8s.io/client-go v0.0.0-20211001003700-dbfa30b9d908
    # go: downloading golang.org/x/text v0.3.6
    ```

3.  **Run the Controller**  
    Execute the controller by specifying the `kubeconfig` file for authentication:

    ```
    ./sample-controller --kubeconfig=$HOME/.kube/config
    # Example output:
    # I1013 02:11:07.489479   4017 controller.go:115] Setting up event handlers
    # I1013 02:11:07.489701   4017 controller.go:156] Starting FlightTicket controller
    ```

    When executed, the controller runs locally, monitors the creation of FlightTicket objects, and triggers the necessary API calls.

> [!important]
> **Deployment Tip**
>
> After verifying that your controller functions correctly, consider packaging it into a Docker image and deploying it inside your Kubernetes cluster as a pod or deployment. This approach eliminates the need for manual rebuilding and execution each time.

## Overview

This article provides a high-level overview of building a custom controller. Although detailed coding questions about custom controllers are unlikely to appear in certification exams, it is essential to understand concepts such as:

- Custom Resource Definitions (CRDs)
- Managing CRD files
- Working with existing controller patterns

For more in-depth information on Kubernetes resources, refer to the following links:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

Operators extend these concepts further by automating more complex operational tasks in Kubernetes environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/991c9c4d-6fb0-4031-8f50-a7c89dd7dfe2)**
>
> Watch video content
