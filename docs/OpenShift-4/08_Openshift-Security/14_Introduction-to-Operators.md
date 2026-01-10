# Introduction to Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Introduction-to-Operators)

---

## Table of Contents

- Introduction to Operators
  - Understanding Kubernetes
  - Custom Resource Definitions (CRDs)
  - Viewing CRDs in Visual Studio Code
  - Controllers and the Reconciler
  - Implementing Network Policies
  - Extending Kubernetes with OpenShift Operators
  - Summary
  - Watch Video

---

## Content

OpenShift 4

Openshift Security

# Introduction to Operators

In this lesson, we revisit some fundamental concepts from earlier in the course while focusing on how Kubernetes’s extensible API enables innovative resource management through operators.

## Understanding Kubernetes

Kubernetes is an API that allows you to programmatically manage and interact with your infrastructure. Whether you use a Kubernetes manifest or an SDK, every operation with Kubernetes is performed via its API. One of the API's most powerful features is its extensibility—you can create new APIs that build upon its core functionalities.

For example, the core API group includes resources like deployments, while the networking group features resources such as ingress controllers provided by the networking.k8s.io API. Originally designed and implemented by engineers, Kubernetes is inherently extensible, paving the way for the use of operators.

![The image shows a diagram with icons representing configuration and management, featuring the Kubernetes logo and the word "API" repeated twice. There is also a red button labeled "Resource."](https://kodekloud.com/kk-media/image/upload/v1752882729/notes-assets/images/OpenShift-4-Introduction-to-Operators/kubernetes-api-configuration-diagram.jpg)

A Kubernetes operator extends the functionality of the Kubernetes API. Operators simplify the process of creating, configuring, and managing any type of resource or containerized application on Kubernetes.

![The image is a diagram illustrating the configuration and management of resources and centralized applications using Kubernetes APIs. It includes icons and text labels to represent these concepts.](https://kodekloud.com/kk-media/image/upload/v1752882730/notes-assets/images/OpenShift-4-Introduction-to-Operators/kubernetes-apis-resource-management-diagram.jpg)

There are two primary approaches to extending the Kubernetes API:

1.  Creating a dedicated, full-blown controller.
2.  Utilizing a Custom Resource Definition (CRD).

![The image shows two options in dashed boxes separated by a red diagonal line: "You Create a Full-Blown Controller" and "Use a Custom Resource Definition."](https://kodekloud.com/kk-media/image/upload/v1752882731/notes-assets/images/OpenShift-4-Introduction-to-Operators/controller-options-custom-resource-definition.jpg)

## Custom Resource Definitions (CRDs)

Custom Resource Definitions (CRDs) act as APIs for creating new APIs. They allow you to extend the Kubernetes API in a consistent and defined format. For instance, consider the following example CRD that defines a new custom resource called "Crontab":

```
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  # The name must match the spec fields below and should be in the form: <plural>.<group>
  name: crontabs.stable.example.com
spec:
  # The group name to use for the REST API: /apis/<group>/<version>
  group: stable.example.com
  # List all versions supported by this CustomResourceDefinition
  versions:
    - name: v1
      # Each version can be enabled or disabled with the "served" flag.
      served: true
      # Exactly one version must be marked as the storage version.
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
```

This CRD allows you to create new resources defined by the above schema.

## Viewing CRDs in Visual Studio Code

Open Visual Studio Code in your Kubernetes example repository—files like `nginx.yaml` will show you API version information, kind, and other deployment details. Consider opening a project created using KubeBuilder called "Custom Resource Definition."

KubeBuilder is a popular tool for creating CRDs. In the API files, you will see Go code that defines the types for your new API. Below is a simplified excerpt highlighting these definitions:

```
// Define the specification for MikesAPI
type MikesAPISpec struct {
    MikesPhoneNumber string `json:"mikesPhoneNumber"`
    MikesAge         string `json:"mikesAge"`
}


// MikesAPIStatus defines the observed state of the MikesAPI
type MikesAPIStatus struct {
    // INSERT ADDITIONAL STATUS FIELD - define observed state of the cluster
    // IMPORTANT: Run "make" to regenerate code after modifying this file
}


// MikesAPI is the Schema for the MikesAPI API
type MikesAPI struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`


    Spec   MikesAPISpec   `json:"spec,omitempty"`
    Status MikesAPIStatus `json:"status,omitempty"`
}
```

If you’re new to Go or CRDs, some of these details might be unfamiliar. However, the objective here is to illustrate how you can define new APIs that extend the Kubernetes API.

## Controllers and the Reconciler

Next, let's examine controllers and their role in managing custom resources. In our project, the controller is implemented in Go and is tasked with reconciling the state of your custom resource (in this case, MikesAPI). Below is an excerpt from a reconciler:

```
package controllers


import (
    "context"


    "k8s.io/apimachinery/pkg/runtime"
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/client"
    "sigs.k8s.io/controller-runtime/pkg/log"


    simplyanengineercomv1 "simplyanengineer.com/MikesAPI/api/v1"
)


// MikesAPIReconciler reconciles a MikesAPI object
type MikesAPIReconciler struct {
    client.Client
    Scheme *runtime.Scheme
}
```

All CRDs and their accompanying controllers are written in Go. Notice how the import paths and package structure reflect the project layout—a common practice in many Kubernetes projects leveraging tools like KubeBuilder.

## Implementing Network Policies

Network policies are essential for controlling ingress and egress traffic for pods. Below is an example NetworkPolicy configuration:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ingress-nginx
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: nginxdeployment
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - ipBlock:
            cidr: 172.17.0.0/16
            except:
              - 172.17.1.0/24
        - namespaceSelector:
            matchLabels:
              environment: redis
        - podSelector:
            matchLabels:
              role: database
```

This configuration specifies allowed ingress traffic based on IP blocks, namespace selectors, and pod selectors.

## Extending Kubernetes with OpenShift Operators

OpenShift further extends Kubernetes with a range of operators and controllers that enhance platform capabilities. In the OpenShift UI, navigating to "Operators" takes you to the OperatorHub, where you can explore and install operators for various purposes including monitoring (such as the Datadog operator) and security (like the CrowdStrike operator).

![The image shows the Red Hat OpenShift OperatorHub interface, displaying various operators available for installation, such as 3scale API Management and Advanced Cluster Management for Kubernetes. The interface includes a navigation menu on the left and a warning banner at the top indicating the environment is for development and testing purposes only.](https://kodekloud.com/kk-media/image/upload/v1752882732/notes-assets/images/OpenShift-4-Introduction-to-Operators/openshift-operatorhub-interface-operators.jpg)

When you select an operator, for example, the Datadog operator, you can proceed with the installation by choosing the namespace, update channel, and update approval options. Once the configuration details are set, clicking the install button deploys the operator to your system.

![The image shows a Red Hat OpenShift interface for installing the Datadog Operator, with options for update channel, installation mode, installed namespace, and update approval. The interface also lists provided APIs like Datadog Agent, Metric, and Monitor.](https://kodekloud.com/kk-media/image/upload/v1752882733/notes-assets/images/OpenShift-4-Introduction-to-Operators/red-hat-openshift-datadog-operator.jpg)

Operators streamline the management of complex applications on Kubernetes and OpenShift. Instead of writing custom controllers from scratch, you can utilize pre-built operators to extend your cluster’s functionality for specific environments such as Azure or AWS.

![The image shows the Red Hat OpenShift OperatorHub interface, where users can discover and install Kubernetes operators. It includes a search bar with the term "azu" and displays results like the Azure Service Operator.](https://kodekloud.com/kk-media/image/upload/v1752882735/notes-assets/images/OpenShift-4-Introduction-to-Operators/openshift-operatorhub-azure-operators.jpg)

> [!important]
> **Note**
>
> Operators empower you to deploy and manage applications quickly by leveraging pre-built functionalities, which reduces the overhead of building custom solutions.

## Summary

Controllers and Custom Resource Definitions (CRDs) are powerful extensions of the Kubernetes API that allow you to create new functionalities and manage applications at scale. While developing your own operators and controllers may pose challenges, tools such as KubeBuilder make the process more accessible. Alternatively, leveraging existing operators from the OperatorHub simplifies deployment and management, especially in environments like OpenShift.

For more in-depth information, consider checking out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OpenShift Documentation](https://docs.openshift.com/)
- [KubeBuilder Overview](https://book.kubebuilder.io/)
- [Docker Hub](https://hub.docker.com/)

Embrace the power of Kubernetes and OpenShift operators to streamline your cluster management and enhance your application's capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/d3b90b82-f189-40f9-84c3-918fc7eae917)**
>
> Watch video content
