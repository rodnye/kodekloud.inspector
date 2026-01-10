# Validating and Mutating Admission Controllers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Validating-and-Mutating-Admission-Controllers)

---

## Table of Contents

- Validating and Mutating Admission Controllers
  - Validating Admission Controllers
  - Extending Admission Controllers with Webhooks
  - Deploying an Admission Webhook Server
  - Configuring the Webhook in Kubernetes
  - Conclusion
  - Watch Video
  - Practice Lab
    - Example: PVC Request without a Storage Class
    - Admission Review JSON Object Example
    - Example: Go Webhook Server
    - Example: Python Webhook Server

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Validating and Mutating Admission Controllers

In this lesson, we explore the various types of Admission Controllers in Kubernetes and demonstrate how to configure custom ones. Admission Controllers are plugins that govern and enforce cluster usage. They fall into two main categories:

- **Validating Admission Controllers:** These controllers check incoming requests and either allow or deny them based on predefined rules.
- **Mutating Admission Controllers:** These controllers modify requests by adjusting the object before it is persisted to the cluster.

Below, we provide detailed examples of each type.

---

## Validating Admission Controllers

One example of a validating admission controller is the namespace existence (or namespace lifecycle) controller, which ensures that a namespace exists before allowing a request. If the namespace does not exist, the request is rejected.

Another example is the default storage class admission controller, which is enabled by default. Consider the following scenario: when you submit a request to create a PersistentVolumeClaim (PVC) without specifying a storage class, the built-in admission controller intervenes by modifying the request to include the preconfigured default storage class.

### Example: PVC Request without a Storage Class

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

This PVC creation request passes through several stages: authentication, authorization, and finally, the admission controllers. The default storage class controller detects the missing storage class and automatically adds it to the request. The resulting PVC appears as follows:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
  storageClassName: default
```

To inspect the PVC, use:

```
kubectl describe pvc myclaim
```

You might see an output similar to:

```
Name:          myclaim
Namespace:     default
StorageClass:  default
Status:        Pending
Volume:        <none>
Labels:        <none>
Annotations:   <none>
```

> [!important]
> **Note**
>
> Mutating admission controllers modify the request (e.g., adding a default storage class), while validating admission controllers only verify the request against set policies. In some cases, controllers perform both actions.

Typically, mutating controllers run before validating controllers so that any modifications are validated. For example, a namespace auto-provisioning controller (a mutating controller) can create missing namespaces before the validating "namespace exists" controller runs. If the order were reversed, the validating controller might reject requests for non-existent namespaces, preventing auto-provisioning from occurring.

If any admission controller in the processing chain rejects a request, the entire operation fails and an error message is returned to the user.

---

## Extending Admission Controllers with Webhooks

In addition to built-in admission controllers, Kubernetes allows you to implement custom logic via two types of external webhooks:

- **Mutating Admission Webhook**
- **Validating Admission Webhook**

These webhooks let you direct admission review requests to a custom server—either within or outside your cluster. After the built-in admission controllers process a request, it is forwarded to the webhook. The webhook server receives an admission review object in JSON format containing details such as the user, requested operation, and the object involved.

### Admission Review JSON Object Example

Below is an example of the JSON object sent to a webhook server:

```
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "705ab4f5-6393-11e8-b7cc-4201aa800002",
    "kind": {"group": "autoscaling", "version": "v1", "kind": "Scale"},
    "resource": {"group": "apps", "version": "v1", "resource": "deployments"},
    "subResource": "scale",
    "requestKind": {"group": "autoscaling", "version": "v1", "kind": "Scale"},
    "requestResource": {"group": "apps", "version": "v1", "resource": "deployments"}
  }
}
```

The webhook server processes this and responds with an object indicating if the request is allowed. For instance, an approval response might be:

```
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "705ab4f5-6393-11e8-b7cc-42010aa80002",
    "kind": {"group": "autoscaling", "version": "v1", "kind": "Scale"},
    "resource": {"group": "apps", "version": "v1", "resource": "deployments"},
    "subResource": "scale",
    "requestKind": {"group": "autoscaling", "version": "v1", "kind": "Scale"},
    "requestResource": {"group": "apps", "version": "v1", "resource": "deployments"}
  },
  "response": {
    "uid": "value_from_request.uid",
    "allowed": true
  }
}
```

If the "allowed" field is false, the webhook will cause the API server to reject the request.

---

## Deploying an Admission Webhook Server

To utilize a custom admission controller, you must deploy your own webhook server, which contains the custom logic for mutation and/or validation. The server can be developed using any programming language that supports HTTPS (TLS is required for secure communication with the Kubernetes API server).

### Example: Go Webhook Server

Below is an excerpt from a sample admission webhook server written in Go:

```
package main

import (
    "encoding/json"
    "flag"
    "fmt"
    "io/ioutil"
    "net/http"

    "k8s.io/api/admission/v1beta1"
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    "k8s.io/klog"
)

// toAdmissionResponse is a helper function to create an AdmissionResponse with an embedded error.
func toAdmissionResponse(err error) v1beta1.AdmissionResponse {
    return v1beta1.AdmissionResponse{
        Result: &metav1.Status{
            Message: err.Error(),
        },
    }
}

// admitFunc defines the function signature used for validators and mutators.
type admitFunc func(v1beta1.AdmissionReview) v1beta1.AdmissionResponse

// serve handles the HTTP portion of a request prior to passing it to an admit function.
func serve(w http.ResponseWriter, r *http.Request, admit admitFunc) {
    var body []byte
    if r.Body != nil {
        if data, err := ioutil.ReadAll(r.Body); err == nil {
            body = data
        }
    }
    // Further processing would continue here...
}
```

Although this example is written in Go, you can build your webhook server in any language that accommodates HTTPS and JSON-based API communications.

### Example: Python Webhook Server

The following pseudocode demonstrates a simple webhook server in Python using Flask. It includes two routes: one for validation and another for mutation.

```
from flask import Flask, request, jsonify
import base64

app = Flask(__name__)

@app.route("/validate", methods=["POST"])
def validate():
    object_name = request.json["request"]["object"]["metadata"]["name"]
    user_name = request.json["request"]["userInfo"]["name"]
    status = True
    message = ""
    if object_name == user_name:
        message = "You can't create objects with your own name"
        status = False
    return jsonify(
        {
            "response": {
                "allowed": status,
                "uid": request.json["request"]["uid"],
                "status": {"message": message},
            }
        }
    )

@app.route("/mutate", methods=["POST"])
def mutate():
    user_name = request.json["request"]["userInfo"]["name"]
    patch = [{"op": "add", "path": "/metadata/labels/users", "value": user_name}]
    # Encode the patch using base64
    patch_encoded = base64.b64encode(str(patch).encode()).decode()
    return jsonify(
        {
            "response": {
                "allowed": True,
                "uid": request.json["request"]["uid"],
                "patch": patch_encoded,
                "patchType": "JSONPatch",
            }
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=443)
```

In this Python example, the validation endpoint rejects requests where the object's name matches the user name, while the mutation endpoint adds a label with the username using a JSON patch.

---

## Configuring the Webhook in Kubernetes

After deploying your webhook server, configure your Kubernetes cluster to use it by creating a webhook configuration object. Below is an example of a ValidatingWebhookConfiguration:

```
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: "pod-policy.example.com"
webhooks:
  - name: "pod-policy.example.com"
    clientConfig:
      service:
        namespace: "webhook-namespace"
        name: "webhook-service"
      caBundle: "CiOtLS0tQk......tLS0K"
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
        scope: "Namespaced"
```

In this configuration:

- The webhook is triggered during pod creation.
- TLS is used for secure communication, as indicated by the `caBundle`.
- The API server references the webhook service by its name and namespace when deployed within the cluster.

For mutating webhooks, a similar configuration is created with `kind: MutatingWebhookConfiguration`.

Once applied, every time a pod is created (or another resource event specified in your rules), the API server calls your webhook server. Depending on whether the response indicates approval or rejection, the API server will allow or reject the request.

---

## Conclusion

This lesson provided an overview of validating and mutating admission controllers in Kubernetes. Key takeaways include:

- An understanding of built-in admission controllers and their roles in request validation and mutation.
- How external admission webhooks can extend Kubernetes by allowing custom logic.
- Practical examples of webhook servers implemented in Go and Python.
- Steps to configure your Kubernetes cluster to integrate with these webhooks.

> [!important]
> **Further Learning**
>
> Experimenting in a lab environment is crucial to reinforce these concepts. Continue exploring advanced scenarios to further enhance your Kubernetes security and operational flexibility.

![The image illustrates a diagram of admission controllers, highlighting mutating and validating processes with examples like AlwaysPullImages and DefaultStorageClass.](https://kodekloud.com/kk-media/image/upload/v1752871678/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Validating-and-Mutating-Admission-Controllers/frame_140.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/e25733b7-ff01-41ea-b1b7-6dffbd805590)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/65fb07e4-26e5-47c8-a1c2-115b9d934385)**
>
> Practice lab
