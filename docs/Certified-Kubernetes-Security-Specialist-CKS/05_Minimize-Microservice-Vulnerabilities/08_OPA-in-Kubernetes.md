# OPA in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/OPA-in-Kubernetes)

---

## Table of Contents

- OPA in Kubernetes
  - Installing OPA Gatekeeper
  - Understanding the OPA Constraint Framework
  - Implementing Label Validation with Rego
  - Extending the Use Case with Parameterization
  - Summary
  - Watch Video
  - Practice Lab
    - Example 1
    - Example 2
    - Example 3
    - Constraint for Billing Label
    - Constraint for Tech Label
    - Example Files
      - requiredlabels-template.yaml
      - require-label-billing.yaml

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# OPA in Kubernetes

In this article, we explore the integration of OPA (Open Policy Agent) with Kubernetes using the Gatekeeper approach. This method leverages the OPA Constraint Framework alongside Kubernetes admission controllers for enhanced policy enforcement and governance.

![The image illustrates the OPA Constraint Framework, showing interactions between Kubernetes components, OPA, and Gatekeeper for policy enforcement and governance.](https://kodekloud.com/kk-media/image/upload/v1752871657/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-OPA-in-Kubernetes/frame_10.jpg)

With the Gatekeeper approach, the admission controller collaborates with the OPA Constraint Framework by using CRD-based (Custom Resource Definition) policies. This facilitates easier policy sharing and builds trust across your Kubernetes environment.

Before diving into the details of the OPA Constraint Framework, let’s review how to deploy OPA Gatekeeper in Kubernetes.

## Installing OPA Gatekeeper

Deploying OPA Gatekeeper is simple. Execute the following command to apply the Gatekeeper specification files:

```
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/v3.14.0/deploy/gatekeeper
```

After deployment, verify that all Gatekeeper components are installed and running in the `gatekeeper-system` namespace:

```
kubectl get all -n gatekeeper-system
```

Expected output:

```
NAME                                           READY   STATUS      RESTARTS   AGE
pod/gatekeeper-audit-6699999786d-6n8xt           1/1     Running     1          (12s ago)   31s
pod/gatekeeper-controller-manager-854f95df4f-dbhp7   1/1  Running     0          31s
pod/gatekeeper-controller-manager-854f95df4f-k96kj   1/1  Running     0          31s
pod/gatekeeper-controller-manager-854f95df4f-zfnbw   1/1  Running     0          31s


NAME                                          TYPE            CLUSTER-IP       EXTERNAL-IP    PORT(S)        AGE
service/gatekeeper-webhook-service            ClusterIP       172.20.60.127   <none>         443/TCP        31s


NAME                                          READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/gatekeeper-audit             1/1     1            1           31s
deployment.apps/gatekeeper-controller-manager  3/3     3            3           31s


NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/gatekeeper-audit-6699999786   1         1         1       31s
replicaset.apps/gatekeeper-controller-manager-854f95df4f   3         3         3       31s
```

> [!important]
> **Tip**
>
> Ensure that you have adequate RBAC permissions before deploying Gatekeeper in your cluster.

## Understanding the OPA Constraint Framework

The OPA Constraint Framework allows you to declare policies that specify required conditions, enforce those conditions at the appropriate locations, and define the checks to be performed. For example, if you want all objects in a specific namespace (e.g., "example") to include a "billing" label, the framework will enforce this rule via the Kubernetes admission controller.

When a pod creation request is submitted, the admission controller follows these steps:

1.  Retrieve the labels from the pod.
2.  Verify if the required label (e.g., "billing") is present.
3.  Return an error if the label is missing.

![The image outlines the OPA Constraint Framework, detailing requirements, enforcement location, and specification actions for Kubernetes admission control with namespace and label examples.](https://kodekloud.com/kk-media/image/upload/v1752871659/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-OPA-in-Kubernetes/frame_160.jpg)

## Implementing Label Validation with Rego

Below is an example of Rego code that validates the presence of a required label (e.g., "billing") on a pod. The code compares the provided labels with a hard-coded required label.

### Example 1

```
package systemrequiredlabels


import data.lib.helpers


violation["msg": msg, "details": {"missing_labels": missing}} {
    provided := {label | input.request.object.metadata.labels[label]}
    required := {label | label == ["billing"]}
    missing = required - provided
    count(missing) > 0
    msg = sprintf("you must provide labels: %v", [missing])
}
```

### Example 2

A similar rule with a slightly different format:

```
package systemrequiredlabels


import data.lib.helpers


violation["msg"] = msg {
    details := {"missing_labels": missing}
    provided := {label | input.request.object.metadata.labels[label]}
    required := {label | label := ["billing"]}
    missing = required - provided
    count(missing) > 0
    msg = sprintf("you must provide labels: %v", [missing])
}
```

### Example 3

An alternative format with syntactical differences:

```
package systemrequiredlabels


import data.lib.helpers


violation["msg": msg, "details": {"missing_labels": missing}} {
    provided := {label | input.request.object.metadata.labels[label]}
    required := {label | label = ["billing"]}
    missing := required - provided
    count(missing) > 0
    msg = sprintf("you must provide labels: %v", [missing])
}
```

In these examples:

- The `provided` variable extracts labels from the incoming pod object.
- The `required` set is fixed to include "billing".
- The `missing` variable determines any labels from the `required` set that are absent.
- If any required labels are missing (`count(missing) > 0`), an error message is generated.

## Extending the Use Case with Parameterization

To support more dynamic scenarios—such as enforcing different labels based on the namespace—you can create a Constraint Template. This enables you to pass the required label as a parameter instead of hardcoding it.

Below is an example Constraint Template that encapsulates the Rego code while exposing a parameter for the required label:

```
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: systemrequiredlabels
spec:
  crd:
    spec:
      names:
        kind: SystemRequiredLabel
      validation:
        # Schema for the 'parameters' field goes here
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package systemrequiredlabels


        import data.lib.helpers


        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.request.object.metadata.labels[label]}
          # Use the parameter passed in the constraint instead of hardcoding
          required := {label | label == input.parameters.labels[_]}
          missing = required - provided
          count(missing) > 0
          msg = sprintf("you must provide labels: %v", [missing])
        }
```

Once your Constraint Template is ready, define specific constraints to enforce policies for different namespaces. For instance:

### Constraint for Billing Label

```
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: SystemRequiredLabel
metadata:
  name: require-billing-label
spec:
  match:
    namespaces: ["expensive"]
  parameters:
    labels: ["billing"]
```

### Constraint for Tech Label

```
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: SystemRequiredLabel
metadata:
  name: require-tech-label
spec:
  match:
    namespaces: ["engineering"]
  parameters:
    labels: ["tech"]
```

These constraints dynamically pass the required labels via the `input.parameters` object in Rego based on the namespace.

## Summary

Below is a quick reference table summarizing the key steps for integrating OPA with Kubernetes using Gatekeeper:

| Step                        | Description                                              | Example Command/Definition                                         |
| --------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| Install OPA Gatekeeper      | Deploy Gatekeeper components using Kubernetes manifests. | `kubectl apply -f [Gatekeeper URL]`                                |
| Verify Deployment           | Check that all Gatekeeper components are running.        | `kubectl get all -n gatekeeper-system`                             |
| Validate Labels with Rego   | Use Rego code to compare provided and required labels.   | See provided Rego examples                                         |
| Create Constraint Template  | Define a CRD that accepts dynamic parameters for labels. | Provided YAML for Constraint Template                              |
| Define Constraint Resources | Enforce policies on specific namespaces with parameters. | Provided YAML for `require-billing-label` and `require-tech-label` |

> [!important]
> **Important**
>
> Any object creation that violates the defined policies will trigger an error during the admission phase, preventing non-compliant objects from being admitted into the cluster.

### Example Files

#### requiredlabels-template.yaml

```
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: systemrequiredlabels
spec:
  crd:
    spec:
      names:
        kind: SystemRequiredLabel
      validation:
        # Schema for the 'parameters' field goes here
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package systemrequiredlabels


        import data.lib.helpers


        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.request.object.metadata.labels[label]}
          required := {label | label == input.parameters.labels[_]}
          missing = required - provided
          count(missing) > 0
          msg = sprintf("you must provide labels: %v", [missing])
        }
```

#### require-label-billing.yaml

```
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: SystemRequiredLabel
metadata:
  name: require-billing-label
spec:
  match:
    namespaces: ["expensive"]
  parameters:
    labels: ["billing"]
```

Apply these configurations with the following commands:

```
kubectl apply -f requiredlabels-template.yaml
kubectl apply -f require-label-billing.yaml
# Output: Constraint require-billing-label created
```

With these steps in place, any new Kubernetes object that fails to meet the policy requirements will be rejected at admission time, ensuring continued compliance within your cluster.

That concludes our exploration of integrating OPA with Kubernetes using Gatekeeper. Experiment with these policies in your environment to tailor enforcement to your specific needs.

For further details on OPA and Kubernetes, consider visiting:

- [OPA Documentation](https://www.openpolicyagent.org/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/2e072033-de08-4375-84d4-cf8e8462169d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/13a2b63a-24ac-4430-bc1f-42e03006412a)**
>
> Practice lab
