# Solution Deployments optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Solution-Deployments-optional)

---

## Table of Contents

- Solution Deployments optional
  - Step 1: Check the Initial Cluster State
  - Step 2: Observe Changes After a Deployment is Created
  - Step 3: Create a New Deployment Using a YAML Definition
  - Step 4: Create a Deployment Using Command-Line Parameters
  - Final Validation
  - Links and References
  - Watch Video
    - Verify Your Current Directory and Files
    - Attempt to Create the Deployment
    - Update the Deployment YAML

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Solution Deployments optional

In this lab article, you will be introduced to Kubernetes deployments. We will walk through each step of the process while ensuring that your cluster is correctly set up and that deployments function as expected.

## Step 1: Check the Initial Cluster State

Before creating any deployments, verify that your cluster has no existing pods, ReplicaSets, or deployments.

Start by checking for pods:

```
controlplane ~ ➜ kubectl get pods
No resources found in default namespace.
```

Then, check for ReplicaSets:

```
controlplane ~ ➜ kubectl get rs
No resources found in default namespace.
```

Finally, check for any deployments:

```
controlplane ~ ➜ kubectl get deployments
No resources found in default namespace.
```

At this point, your environment is clean with zero pods, zero ReplicaSets, and zero deployments.

## Step 2: Observe Changes After a Deployment is Created

After applying some changes, check the deployments again. You should now see that one deployment exists:

```
controlplane ~ ➜ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
frontend-deployment   0/4     4            0           10s
```

Examine the ReplicaSet created by that deployment:

```
controlplane ~ ➜ kubectl get rs
NAME                                   DESIRED   CURRENT   READY   AGE
frontend-deployment-7f8dcd-b696        4         4         0       35s
```

And then inspect the pods:

```
controlplane ~ ➜ kubectl get pods
NAME                                             READY   STATUS             RESTARTS   AGE
frontend-deployment-7f8dcd-b696-stmbx            0/1     ImagePullBackOff   0          59s
frontend-deployment-7f8dcd-b696-zc6x             0/1     ErrImagePull       0          59s
frontend-deployment-7f8dcd-b696-jgcbx            0/1     ErrImagePull       0          59s
frontend-deployment-7f8dcd-b696-jbr44            0/1     ErrImagePull       0          59s
```

Because none of the four pods are in a ready state, you need to identify which image they are trying to pull. Run the following command to display detailed information for one pod:

```
kubectl describe pod frontend-deployment-7fd8cdb696-stmbx
```

From the output, notice that the specified image is `busybox:888`. Since this image does not exist, the pods are unable to reach a ready state.

> [!important]
> **Note**
>
> The image name must be valid and available in your container registry. Verify the image tag before deployment to avoid issues like ImagePullBackOff.

## Step 3: Create a New Deployment Using a YAML Definition

### Verify Your Current Directory and Files

Ensure you are in the correct working directory and check the available files:

```
controlplane ~ ➜ pwd
/root


controlplane ~ ➜ ls
deployment-definition-1.yaml  sample.yaml
```

### Attempt to Create the Deployment

Run the following command to create the deployment from the YAML file:

```
controlplane ~ ➜ kubectl create -f deployment-definition-1.yaml
```

If you encounter an error such as:

```
Error from server (BadRequest): error when creating "deployment-definition-1.yaml": deployment in version "v1" cannot be handled as a Deployment: no kind "deployment" is registered for version "apps/v1" in scheme "k8s.io/apimachinery/v1.23.3-k3s1/pkg/runtime/scheme.go:100"
```

Open the file to correct the issue:

```
controlplane ~ ➜ vi deployment-definition-1.yaml
```

### Update the Deployment YAML

The error is caused by incorrect casing in the kind field. The resource kind should be capitalized. Use the corrected YAML below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-1
spec:
  replicas: 2
  selector:
    matchLabels:
      name: busybox-pod
  template:
    metadata:
      labels:
        name: busybox-pod
    spec:
      containers:
      - name: busybox-container
        image: busybox888
        command:
        - sh
        - "-c"
        - echo Hello Kubernetes! && sleep 3600
```

After saving the changes, create the deployment again:

```
controlplane ~ ➜ kubectl create -f deployment-definition-1.yaml
```

## Step 4: Create a Deployment Using Command-Line Parameters

You can also create a deployment by specifying parameters directly in the command line. First, review the help for deployment creation:

```
kubectl create deployment --help
```

For example, to create a deployment named `http-frontend` using a specified image with three replicas, run:

```
kubectl create deployment http-frontend --image=<your-image> --replicas=3
```

After executing the command, verify that the deployment and pods are running as expected:

```
kubectl get deployments
```

Make sure that the `http-frontend` deployment reflects the desired number of replicas in the ready state.

## Final Validation

To ensure all deployments are functioning, validate by checking that all created deployments are running and the pods are in a ready state. This confirms that your environment is correctly configured and operational.

This concludes the lab article on Kubernetes deployments. In upcoming labs, you’ll explore additional Kubernetes functionalities to further enhance your skills.

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/55a2e4a6-a148-470e-869a-7cd2ec5e44ca)**
>
> Watch video content
