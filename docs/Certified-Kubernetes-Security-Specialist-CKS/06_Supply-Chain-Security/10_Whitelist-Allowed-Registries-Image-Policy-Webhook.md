# Whitelist Allowed Registries Image Policy Webhook - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Supply-Chain-Security/Whitelist-Allowed-Registries-Image-Policy-Webhook)

---

## Table of Contents

- Whitelist Allowed Registries Image Policy Webhook
  - Understanding the Risk
  - Using Admission Controllers to Restrict Registries
  - Implementing Policies with OPA and Rego
  - Using the Built-In ImagePolicyWebhook Admission Controller
  - Related Resources
  - Watch Video
  - Practice Lab
    - Admission Configuration File
    - Enabling the ImagePolicyWebhook in the kube-apiserver

---

## Content

Certified Kubernetes Security Specialist (CKS)

Supply Chain Security

# Whitelist Allowed Registries Image Policy Webhook

In this lesson, learn how to whitelist allowed registries in a Kubernetes cluster to prevent unauthorized container images from being deployed. By default, any user with cluster access can deploy pods with images from any registry—even untrusted sources. This can compromise your cluster's security. The following sections explain how to enforce governance rules to restrict container images to approved registries only.

## Understanding the Risk

Consider the following pod definition file. In the image field, a user can reference an image from any registry:

```
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: sample-app
      image: some-registry.io/a-very-vulnerable-image
```

Deploying an image with known vulnerabilities may expose other applications on the cluster to risk. An attacker could leverage these vulnerabilities to gain access to the underlying operating system. For enhanced security, it is vital to restrict container images to trusted registries.

## Using Admission Controllers to Restrict Registries

One effective method is to use Kubernetes admission controllers. When a pod creation request is made, it is processed through several stages: authentication, authorization, and admission control. By deploying a validating admission webhook server, you can inspect each incoming request and verify that the container image originates from an approved registry. If not, the webhook will reject the request with a clear error message.

For example, consider the following Python code snippet that demonstrates an admission webhook allowing only images from "internal-registry.io":

```
@app.route("/validate", methods=["POST"])
def validate():
    image_name = request.json["request"]["object"]["spec"]["containers"][0]["image"]
    status = True
    message = ""
    if "internal-registry.io" not in image_name:
        message = "You can only use images from the internal-registry.io"
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
```

> [!important]
> **Tip**
>
> Ensure that your validating webhook server is highly available. This prevents disruptions in pod creation if the webhook becomes unreachable.

## Implementing Policies with OPA and Rego

An alternative approach is to deploy Open Policy Agent (OPA) with a validating webhook. By leveraging OPA's Rego language, you can write custom policies that allow container images only from trusted registries. The example below denies any image that does not begin with "internal-registry.io/":

```
package kubernetes.admission


deny[msg] {
    input.request.kind.kind == "Pod"
    image := input.request.object.spec.containers[_].image
    not startswith(image, "internal-registry.io/")
    msg := sprintf("Image '%s' is not from a trusted registry", [image])
}
```

## Using the Built-In ImagePolicyWebhook Admission Controller

The Kubernetes API server includes a built-in admission controller called ImagePolicyWebhook. This controller works with an external webhook server to enforce image policy rules using an admission configuration file.

The diagram below illustrates the Kubernetes admission control process. It covers the steps from executing `kubectl` commands through authentication, authorization, and admission controller validations, culminating in pod creation:

![The image illustrates the Kubernetes admission control process, showing steps from `kubectl` through authentication, authorization, admission controllers, to creating a pod.](https://kodekloud.com/kk-media/image/upload/v1752871727/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Whitelist-Allowed-Registries-Image-Policy-Webhook/frame_150.jpg)

### Admission Configuration File

An admission configuration file provides the necessary details for connecting to the webhook server. It includes a reference to a KubeConfig file for authentication credentials along with parameters such as TTLs, retry backoff intervals, and default behaviors. For example:

```
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
- name: ImagePolicyWebhook
  configuration:
    imagePolicy:
      kubeConfigFile: <path-to-kubeconfig-file>
      allowTTL: 50
      denyTTL: 50
      retryBackoff: 500
      defaultAllow: true
```

> [!important]
> **Default Behavior**
>
> If the admission webhook server is unreachable, setting `defaultAllow: true` permits pod creation unless the webhook explicitly denies it. Adjust this setting based on your security requirements.

A typical KubeConfig file referenced above might look like this:

```
<path-to-kubeconfig-file>
clusters:
- name: name-of-remote-imagepolicy-service
  cluster:
    certificate-authority: /path/to/ca.pem
    server: https://images.example.com/policy
users:
- name: name-of-api-server
  user:
    client-certificate: /path/to/cert.pem
    client-key: /path/to/key.pem
```

### Enabling the ImagePolicyWebhook in the kube-apiserver

After preparing the admission configuration file, you need to enable the ImagePolicyWebhook admission controller in the kube-apiserver. This is achieved by adding it to the enabled admission plugins flag and specifying the path to the configuration file through the admission control config file flag.

For example, if the kube-apiserver runs as a service, you can configure it with the following flags:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --runtime-config=api/all \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  --v=2 \
  --enable-admission-plugins=ImagePolicyWebhook \
  --admission-control-config-file=/etc/kubernetes/admission-config.yaml
```

If the kube-apiserver is deployed as a static pod (for example, in a kubeadm-based setup), include similar flags in the pod manifest:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --authorization-mode=Node,RBAC
    - --advertise-address=172.17.0.107
    - --allow-privileged=true
    - --enable-bootstrap-token-auth=true
    - --enable-admission-plugins=ImagePolicyWebhook
  image: k8s.gcr.io/kube-apiserver-amd64:v1.13.3
  name: kube-apiserver
```

With these configurations, the ImagePolicyWebhook admission controller ensures that only container images from approved registries are used when creating pods. This significantly strengthens the overall security posture of your Kubernetes cluster.

## Related Resources

For more detailed information on Kubernetes security practices, refer to the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Open Policy Agent (OPA) Documentation](https://www.openpolicyagent.org/docs/latest/)

That concludes this lesson. Proceed to the hands-on labs to practice these configurations and further solidify your understanding of securing Kubernetes clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/6125bec1-413f-46be-8c24-2d0fca37dd57)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/4046f239-4ef2-431c-affc-9f27032a3b28)**
>
> Practice lab
