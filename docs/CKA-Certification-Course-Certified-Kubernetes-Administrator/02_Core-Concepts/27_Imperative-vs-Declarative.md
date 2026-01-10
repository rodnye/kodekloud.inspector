# Imperative vs Declarative - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Imperative-vs-Declarative)

---

## Table of Contents

- Imperative vs Declarative
  - An Analogy
  - Imperative vs Declarative: Kubernetes Perspective
  - Choosing the Right Approach
  - Exam Tips
  - Watch Video
    - Imperative Approach
    - Declarative Approach
    - Imperative vs Declarative Update Dilemma

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Imperative vs Declarative

In this lesson, we explore the two core approaches used to manage Kubernetes objects: imperative and declarative. By understanding these methods and their respective benefits and drawbacks, you'll be better equipped to manage your clusters and prepare for Kubernetes certification exams.

So far, we have covered creating and managing Kubernetes objects either by directly issuing commands or by using configuration files. These approaches fall into two broad categories in the infrastructure-as-code domain: imperative and declarative.

## An Analogy

Imagine visiting a friend’s house. In the past, you might have taken a taxi and given the driver precise, step-by-step directions—for example, "Take a right onto Street B, then left onto Street C, another left onto Street D, and finally stop at the house." This sequence of detailed instructions illustrates the imperative approach.

![The image shows two navigation maps: one with imperative directions and another with declarative directions, illustrating different ways to guide someone to a destination.](https://kodekloud.com/kk-media/image/upload/v1752869717/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Imperative-vs-Declarative/frame_60.jpg)

Today, using an app like Uber, you simply enter your final destination. This is akin to the declarative approach where you specify the desired outcome—"Drive to Tom's house"—and the system figures out the best route.

![The image compares imperative and declarative directions using maps, showing step-by-step navigation versus a direct destination approach.](https://kodekloud.com/kk-media/image/upload/v1752869718/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Imperative-vs-Declarative/frame_90.jpg)

## Imperative vs Declarative: Kubernetes Perspective

### Imperative Approach

The imperative approach in Kubernetes involves executing specific commands to create, update, or delete objects. This method instructs Kubernetes on both what needs to be done and how it should be done. For example, you might run these commands:

```
kubectl run --image=nginx nginx
kubectl create deployment --image=nginx nginx
kubectl expose deployment nginx --port 80
kubectl edit deployment nginx
kubectl scale deployment nginx --replicas=5
kubectl set image deployment nginx nginx=nginx:1.18
kubectl create -f nginx.yaml
kubectl replace -f nginx.yaml
kubectl delete -f nginx.yaml
```

While the imperative approach is effective for quick tasks, it comes with some limitations:

- If a command partially executes, running it again may require extra checks (e.g., verifying if a resource already exists).
- Updating resources—such as changing the image version—demands explicit re-execution with live adjustments.
- Commands executed interactively are often not persisted, making it challenging for teammates to trace the system’s original state.

In Kubernetes, imperative commands like `kubectl run`, `kubectl create deployment`, `kubectl expose`, and even editing commands such as `kubectl edit` or scaling commands are excellent for immediate changes but require careful tracking of the current state.

![The image compares imperative and declarative approaches in Infrastructure as Code, detailing steps for setting up an NGINX server on a virtual machine.](https://kodekloud.com/kk-media/image/upload/v1752869719/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Imperative-vs-Declarative/frame_240.jpg)

### Declarative Approach

The declarative approach enables you to specify the desired state of your infrastructure through configuration files (typically written in YAML). For example, defining a pod in a file (nginx.yaml) looks like this:

```
# nginx.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

Applying the configuration is as simple as running:

```
kubectl apply -f nginx.yaml
```

Kubernetes will create or update the object automatically to match the state described in your YAML file. When you need to update the configuration—say, to change the image version—you modify the YAML file and apply it again with:

```
kubectl apply -f nginx.yaml
```

This method ensures that your configuration files remain the single source of truth, which is especially valuable in team environments where version-controlled definitions are critical.

### Imperative vs Declarative Update Dilemma

Sometimes, you might modify a live object using the `kubectl edit` command. This command opens a YAML representation of the current state, including additional fields like status, which are absent from your original configuration file. For instance:

1.  Initially, you create the object using your YAML file:

    ```
    kubectl create -f nginx.yaml
    ```

2.  Later, you edit the deployment:

    ```
    kubectl edit deployment nginx
    ```

3.  The live object now contains extra status fields. If you later apply the original `nginx.yaml` (perhaps with updates), your live edits might be overwritten.

> [!important]
> **Best Practice**
>
> Always update your local configuration files and use commands like `kubectl replace -f nginx.yaml` to ensure that your changes are consistently tracked and version-controlled.

A typical workflow in a team environment is as follows:

- Create the object:

  ```
  kubectl create -f nginx.yaml
  ```

- Modify the local file to implement changes (e.g., update the image version).
- Update the live object with:

  ```
  kubectl replace -f nginx.yaml
  ```

This practice reinforces a version-controlled process and promotes collaboration.

## Choosing the Right Approach

| Approach    | Ideal Use Case                                               | Example Commands                                                                                                                    |
| ----------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Imperative  | Quick, one-off tasks such as creating a pod or deployment.   | `kubectl run --image=nginx nginx`<br>`kubectl create deployment --image=nginx nginx`<br>`kubectl expose deployment nginx --port 80` |
| Declarative | Long-term management with version-controlled infrastructure. | `kubectl apply -f nginx.yaml`<br>`kubectl apply -f /path/to/config-files`                                                           |

- **Imperative Approach:**  
  Use this method for rapid execution when you need to quickly create or modify Kubernetes objects, particularly during certification exams.
- **Declarative Approach:**  
  This approach is recommended for complex, long-term management scenarios. It enables a systematic management of configurations via YAML files, ensuring every change is recorded and version-controlled.

## Exam Tips

When preparing for Kubernetes certification exams, consider the following strategies:

- Use imperative commands for speed when creating simple objects like pods or deployments.
- For modifications or more intricate configurations, adopt the declarative approach by updating configuration files and applying changes using `kubectl apply` or `kubectl replace`.
- Always maintain your YAML files in version control to safeguard against unintentional overwrites.

For more detailed guidance on managing a Kubernetes cluster, check the [official Kubernetes documentation](https://kubernetes.io/docs/) and experiment with both approaches in your lab exercises.

Happy learning, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/b369ac60-39bf-449d-953d-8e05448c8d7e)**
>
> Watch video content
