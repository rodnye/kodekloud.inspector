# Whats Next - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Whats-Next)

---

## Table of Contents

- Whats Next
  - Starting the Mock Exam
  - Working Through a Question
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Mock Exams

# Whats Next

Hello everyone, and welcome to the Ultimate CKA Mock Exam Series presented by Vijen Palazi from KodeKloud.

Before diving in, please ensure that you have completed all the prerequisite materials, including multiple mock exams and hands-on labs. If your CKA exam is approaching soon, it's essential to review all the background content first.

This course is designed as a series of comprehensive and challenging mock exams, offering you realistic, hands-on practice in a simulated exam environment. Unlike our regular labs, each mock exam uniquely mimics the actual test conditions.

The CKA exam assesses your practical knowledge in five key areas:

- Architecture, Installation, and Maintenance: 25%
- Workload Scheduling: 15%
- Service Networking: 20%
- Storage: 10%
- Troubleshooting: 30%

![A person is speaking with a pie chart labeled "Workloads & Scheduling 15%" displayed beside them.](https://kodekloud.com/kk-media/image/upload/v1752869831/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Whats-Next/frame_70.jpg)

![A person is speaking with a circular progress chart labeled "Troubleshooting 30%" displayed beside them.](https://kodekloud.com/kk-media/image/upload/v1752869832/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Whats-Next/frame_80.jpg)

Each mock exam respects the weight of these areas, ensuring you receive a realistic testing experience. The series uses four Kubernetes clusters, with some clusters dedicated to specific knowledge areas. By default, you will be logged into the student node, giving you access to all other clusters and allowing SSH access to individual nodes.

![A person is speaking next to a list titled "Exam Cluster," detailing four Kubernetes (K8s) clusters with varying node configurations.](https://kodekloud.com/kk-media/image/upload/v1752869834/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Whats-Next/frame_100.jpg)

This introduction marks the beginning of your journey through the Ultimate CKA Mock Exam Series.

![A KodeKloud mock exam interface shows a 95% score with completed questions, alongside a video of a person speaking.](https://kodekloud.com/kk-media/image/upload/v1752869835/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Whats-Next/frame_120.jpg)

Let’s dive into one of these tests.

## Starting the Mock Exam

Click on a lab corresponding to one of the mock exams (for example, "CKA Mock Exam One"). The lab should load within 30 seconds—often in just one to two minutes.

Once loaded, you will see that the exam consists of 20 questions. The first question is from the Architecture, Installation, and Maintenance category, representing 25% of the exam. This question requires you to set the context to cluster three.

Before proceeding, verify all the configured clusters. Switch to cluster three with the following command:

```
kubectl config use-context cluster3
```

You are now logged into the student node. To view all configured clusters, run:

```
kubectl config get-clusters
```

By default, without an explicitly set context, you connect to cluster one, which contains two worker nodes (node01 and node02). For this task, you must switch to cluster three. On the student node, execute:

```
kubectl config use-context cluster3
kubectl config get-clusters
kubectl config get-contexts
kubectl get nodes
```

The student node serves as your client login node. If you open a new terminal session, it will also start in the student node. To access any specific control plane, use the SSH command.

When your context is correctly set to cluster three, executing:

```
kubectl get nodes
```

will display a single-node cluster consisting of the control plane (e.g., "cluster3-controlplane") running Kubernetes version 1.24.1. It is highly recommended to set the appropriate context for each question so you interact with the correct cluster.

For example, verify the nodes in cluster three with:

```
kubectl config use-context cluster3
kubectl get nodes
```

This command should return:

```
NAME                     STATUS   ROLES                     AGE   VERSION
cluster3-controlplane    Ready    control-plane,master      18m   v1.24.1+k3s1
```

## Working Through a Question

Let's review a sample question. You may need to decode an existing secret, named "beta-sec-CK14-arc", which is created in a separate namespace. First, ensure the namespace exists by listing the secrets in that namespace:

```
kubectl get secret -n beta-ns-cka14-arch
```

Then, retrieve the secret in YAML format to inspect the data:

```
kubectl get secrets -n beta-ns-cka14-arch -o yaml
```

The secret data is stored under the "data" section. To decode the secret from a base64-encoded string, run:

```
echo 'VGHpcpyB0aG9lUGc2VjcjmV0IQ=' | base64 -d
```

The decoded output should be: "This is the secret." You can redirect the decoded output directly into a file on the student node with:

```
kubectl config use-context cluster3
kubectl get secrets -n beta-ns-cka14-arch -o yaml


echo 'VGHpcpyB0aG9lUGc2VjcjmV0IQ=' | base64 -d > /opt/beta-sec-cka14-arch
```

Scroll through the exam interface to view the remaining questions. The first question is worth eight points from the Architecture, Installation, and Maintenance section. The second question from the same section can be attempted with:

```
kubectl config use-context cluster3
kubectl get secrets -n beta-ns-cka14-arch
kubectl get secrets -n beta-ns-cka14-arch -o yaml
echo 'VGhpcyBpc28sIHlvdSBhcmUgY29tbWl0dGVkIQ==' | base64 -d
echo 'VGhpcyBpc28sIHlvdSBhcmUgY29tbWl0dGVkIQ==' | base64 -d > /opt/beta-sec-cka14-arch
```

Remember, you must compile all solutions before the allotted time expires. If time runs out, the exam will automatically finish and be validated.

> [!important]
> **Exam Tip**
>
> Always double-check that you have switched the context appropriately using `kubectl config use-context <cluster-name>` before running commands that interact with cluster-specific resources.

You might also encounter additional commands to review logs and secrets, such as:

```
kubectl config use-context cluster1
kubectl logs -f color-app-cka13-arch
kubectl get secrets -n beta-ns-cka14-arch
kubectl get secrets -n beta-ns-cka14-arch -o yaml
echo 'VhgpcyBpyB0aGluc2Jvc1QIQo=' | base64 -d > /opt/beta-sec-cka14-arch
```

At any time during the exam, you can click the "End Exam" button to check your score. In this demonstration, only the first question is attempted, with all other questions marked incorrect by default.

For example, reviewing the secret on the student node might show output like:

```
student-node → kubectl get secrets -n beta-ns-cka14-arch
NAME                       TYPE     DATA   AGE
beta-sec-cka14-arch        Opaque   1      2m19s


student-node → kubectl get secrets -n beta-ns-cka14-arch -o yaml
apiVersion: v1
items:
- apiVersion: v1
  data:
    secret: VGhpcyBpc8yB0aGluZyBQcml0b3JpdHk=
  kind: Secret
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","data":{"secret":"VGhpcyBpc8yB0aGluZyBQcml0b3JpdHk="},"kind":"Secret","metadata":{"name":"beta-sec-cka14-arch","namespace":"beta-ns-cka14-arch"},"type":"Opaque"}
    creationTimestamp: "2023-02-02T17:08:47Z"
    name: beta-sec-cka14-arch
    namespace: beta-ns-cka14-arch
    resourceVersion: "846"
    uid: ef9c5d98-aec0-4d4d-99be-1cbb989b5e0
  type: Opaque
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""


student-node → echo VGhpcyBpc8yB0aGluZyBQcml0b3JpdHk= | base64 -d
This is the secret!
```

Additional exam commands might include:

```
kubectl config use-context cluster1
kubectl get secrets -n beta-ns-cka14-arch -o yaml
curl http://cluster1-node01:30080
echo 'VGhpcyBpcyBhIHNlY3JldCE=' | base64 -d
echo 'VGhpcyBpcyB0aGUgc2VjcmV0IQ==' | base64 -d > /opt/beta-sec-cka14-arch
```

These steps ensure that you are working within the correct context and that your solutions are properly validated.

After completing your attempt, click the "End Exam" button to trigger automatic exam validation.

For reference, a sample terminal session may look like:

```
student-node ~ ➜ kubectl --context cluster1 create
student-node ~ ➜ kubectl --context cluster1 create
student-node ~ ➜ kubectl --context cluster1 create
student-node ~ ➜ kubectl --context cluster1 auth
yes
```

> [!important]
> **Final Tip**
>
> Always verify your solutions and ensure you are working on the correct cluster context to avoid misconfigurations.

I hope you find this article useful. Best of luck with your CKA preparation!

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/d33baa6d-ccd3-410b-a20c-5d5b9c7a2114/lesson/dca9c12d-8a8b-4691-8d07-950c62a2043a)**
>
> Watch video content
