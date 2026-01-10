# Custom Controllers 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Custom-Controllers-2025-Updates)

---

## Table of Contents

- Custom Controllers 2025 Updates
  - Controller Implementation in Go
  - Next Steps
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Custom Controllers 2025 Updates

In this lesson, we explore the process of building custom controllers in Kubernetes. Custom controllers continuously monitor cluster resources and take actions when changes occur. Previously, you created a custom resource definition (CRD) to generate flight ticket objects with data stored in etcd. Now, we'll look at how to monitor these objects and trigger actions—such as calling flight booking APIs to book, edit, or cancel tickets—using a custom controller.

A controller is any process or piece of code that watches the Kubernetes cluster for events indicating changes in specific resources (in this case, flight ticket objects). For example, consider the YAML definition for a flight ticket resource:

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

After applying this configuration, you can create a flight ticket by running:

```
kubectl create -f flightticket.yml
# Output:
# flightticket "my-flight-ticket" created
```

Then, verify its status with:

```
kubectl get flightticket
# Output:
# NAME                STATUS
# my-flight-ticket    Pending
```

> [!important]
> **Understanding Custom Controllers**
>
> Custom controllers continuously monitor the state of objects in your cluster and ensure that their actual state aligns with the desired state. This process is essential for automating tasks like booking or canceling flights based on resource changes.

## Controller Implementation in Go

While it is possible to implement a controller in Python by querying the Kubernetes API, building controllers in Go using the Kubernetes Go client is a more robust option. The Go client provides built-in shared informers that simplify caching and queuing mechanisms. This makes the controller more efficient and easier to manage.

To get started with building a custom controller, follow these steps:

1.  **Clone the Sample Controller Repository**

    Clone the GitHub repository [sample-controller](https://github.com/kubernetes/sample-controller):

    ```
    git clone https://github.com/kubernetes/sample-controller.git
    ```

2.  **Navigate to the Repository Directory**

    Change into the repository directory:

    ```
    cd sample-controller
    ```

3.  **Customize the Controller Code**

    Modify the controller code in the `controller.go` file to incorporate your specific business logic. For example, you might adjust code similar to the snippet below:

    ```
    package flightticket


    var controllerKind = apps.SchemeGroupVersion.WithKind("Flightticket")


    // Run begins watching and syncing.
    func (dc *FlightTicketController) Run(workers int, stopCh <-chan struct{}) {}


    // Call BookFlightAPIReplicaSet
    func (dc *FlightTicketController) callBookFlightAPI(obj interface{}) {}
    ```

4.  **Build the Controller**

    Build the controller using the Go build command:

    ```
    go build -o sample-controller .
    ```

    During the build process, Go will download necessary dependencies such as:

    ```
    go: downloading k8s.io/client-go v0.0.0-20211001003700-dbfa30b9d908
    go: downloading golang.org/x/text v0.3.6
    ```

5.  **Run the Controller**

    Run the controller by specifying the kubeconfig file for authentication with the Kubernetes API:

    ```
    ./sample-controller --kubeconfig=$HOME/.kube/config
    ```

    Once launched, the controller initializes, sets up event handlers, and begins watching for flight ticket creation events. These events trigger the corresponding API calls to the flight booking system.

> [!important]
> **Deployment Consideration**
>
> Before deploying to production, ensure your custom controller is thoroughly tested. After testing, consider packaging the controller into a Docker image and deploying it within your Kubernetes cluster as a pod or deployment for easy management and scalability.

## Next Steps

This high-level overview demonstrates the process of creating a custom controller, highlighting how custom resource definitions integrate with controllers. Although exam content might not delve deeply into custom controller implementation due to the advanced coding skills required, understanding this workflow is beneficial for building resilient Kubernetes systems.

In the next lesson, we will discuss operators and explore their relationship with custom controllers.

---

For further details on Kubernetes controllers and operators, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/61045090-37ea-444c-9168-0fe993d8ffee)**
>
> Watch video content
