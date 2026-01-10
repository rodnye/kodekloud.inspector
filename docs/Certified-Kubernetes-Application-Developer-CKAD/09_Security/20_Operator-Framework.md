# Operator Framework - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Operator-Framework)

---

## Table of Contents

- Operator Framework
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Operator Framework

In this lesson, we'll explore the operator framework, a powerful method for managing Kubernetes custom resources by combining Custom Resource Definitions (CRDs) and custom controllers into a unified deployment.

Traditionally, you would manually create a CRD along with its corresponding controller (deployed as a Pod or Deployment). The operator framework streamlines this process by packaging both components together. For example, when you deploy a flight operator, it automatically creates the necessary CRD, provisions custom resources, and deploys the custom controller as a Deployment.

Below is an example configuration for a flight ticket CRD and its corresponding controller:

```
# flightticket-custom-definition.yml
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
    shortnames:
      - ft
  versions:
    - name: v1
      served: true
      storage: true
```

```
package flightticket


import (
    "k8s.io/api/apps/v1"
)


var controllerKind = v1.SchemeGroupVersion.WithKind("Flightticket")


// Run begins watching and syncing.
func (dc *FlightTicketController) Run(workers int, stopCh <-chan struct{}) {
    // Controller logic goes here.
}


// callBookFlightAPI initiates the flight booking process.
func (dc *FlightTicketController) callBookFlightAPI(obj interface{}) {
    // API call implementation.
}
```

```
kubectl create -f flight-operator.yaml
```

The operator framework offers extensive automation capabilities beyond simple deployments. A notable real-world example is the etcd operator—which deploys and manages an etcd cluster within Kubernetes. It includes a CRD for defining the etcd cluster and a custom controller that continuously monitors etcd resources. This operator also simplifies advanced operations like backups and restores by enabling these actions with the creation of dedicated CRDs.

The diagram below visualizes an operator framework structure that includes CRDs and custom controllers such as EtcdCluster, EtcdBackup, EtcdRestore, ETCD Controller, and Backup Operator:

![The image illustrates an Operator Framework with Custom Resource Definitions (CRD) and Custom Controllers, including EtcdCluster, EtcdBackup, EtcdRestore, ETCD Controller, and Backup Operator.](https://kodekloud.com/kk-media/image/upload/v1752871289/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Operator-Framework/frame_80.jpg)

> [!important]
> **Note**
>
> Operators simplify complex processes by bundling CRDs and controllers, making tasks like deployment, backup, and recovery more efficient. However, keep in mind that understanding CRDs remains essential, especially for certification exams.

Deploying an operator typically involves three main steps:

1.  Installing the Operator Lifecycle Manager (OLM).
2.  Installing the operator.
3.  Verifying the installation.

For instance, to deploy the etcd operator, you might use the following commands:

```
curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.19.1/install.sh | bash -s v0.19.1
```

```
kubectl create -f https://operatorhub.io/install/etcd.yaml
```

```
kubectl get csv -n my-etcd
```

> [!important]
> **Important**
>
> While operators offer significant advantages in automating deployment and management tasks, ensure that you have a solid understanding of CRDs, as they are a core component of Kubernetes and a primary focus of the exam curriculum.

Thank you for reading, and stay tuned for the next lesson to further enhance your Kubernetes expertise.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/637f50cb-d931-4f42-a4c7-c099bce4ac3a)**
>
> Watch video content
