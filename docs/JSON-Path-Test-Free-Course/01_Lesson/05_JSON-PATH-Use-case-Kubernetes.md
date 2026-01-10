# JSON PATH Use case Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/JSON-Path-Test-Free-Course/Lesson/JSON-PATH-Use-case-Kubernetes)

---

## Table of Contents

- JSON PATH Use case Kubernetes
  - Prerequisites
  - Why Use JSONPath with kubectl?
  - Understanding kubectl Output
  - Getting Started with JSONPath
  - Basic JSONPath Queries
  - Iteration Using range
  - Custom Columns with kubectl
  - Sorting Resources
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab
    - Formatting with Newlines and Tabs

---

## Content

JSON Path Test - Free Course

Lesson

# JSON PATH Use case Kubernetes

Hello and welcome! I’m Mumshal Manambath. In this guide, you’ll learn how to leverage JSONPath with the `kubectl` command to query, filter, and format Kubernetes resources. We’ll cover:

- Viewing `kubectl` output in raw JSON
- Building JSONPath expressions step by step
- Real-world JSONPath examples
- Loop constructs (`range`) for iteration
- Custom columns and table sorting
- Practice exercises to reinforce your skills

![The image lists objectives related to using JSON PATH in KubeCtl, including topics like viewing JSON output, using JSON PATH, examples, loops, custom columns, sorting, and practice tests. There's also a small diagram showing a KubeCtl command and output.](https://kodekloud.com/kk-media/image/upload/v1752879397/notes-assets/images/JSON-Path-Test-Free-Course-JSON-PATH-Use-case-Kubernetes/json-path-kubectl-objectives-diagram.jpg)

## Prerequisites

You should already have a basic grasp of JSONPath syntax and be comfortable running `kubectl` commands against a Kubernetes cluster.

> [!important]
> **Note**
>
> If you’re new to JSONPath, try these free resources before continuing:
>
> - YouTube tutorials
> - [CodeKloud JSONPath exercises](https://kodekloud.com)
> - Online JSONPath playgrounds (e.g., [jsonpath.com](https://jsonpath.com))

![The image lists prerequisites for a JSON PATH quiz, including resources on YouTube and KodeKloud, and provides a URL for the quiz.](https://kodekloud.com/kk-media/image/upload/v1752879398/notes-assets/images/JSON-Path-Test-Free-Course-JSON-PATH-Use-case-Kubernetes/json-path-quiz-prerequisites.jpg)

## Why Use JSONPath with `kubectl`?

Managing production Kubernetes clusters often means inspecting hundreds of nodes and thousands of objects—deployments, pods, ReplicaSets, services, secrets, and more. JSONPath lets you:

- Extract specific fields across many resources
- Generate concise summaries (e.g., node names with CPU counts)
- Filter output dynamically based on custom criteria

Manual parsing is error-prone and time-consuming. JSONPath queries with `kubectl` provide a programmable way to slice and dice cluster data.

![The image is a slide titled "Why JSON PATH?" and lists reasons such as handling large datasets, including hundreds of nodes and thousands of PODs, deployments, and ReplicaSets.](https://kodekloud.com/kk-media/image/upload/v1752879399/notes-assets/images/JSON-Path-Test-Free-Course-JSON-PATH-Use-case-Kubernetes/why-json-path-large-datasets.jpg)

## Understanding `kubectl` Output

By default, `kubectl` formats API responses into human-readable tables. To see the raw JSON payload:

```
kubectl get nodes -o json
```

Example output (truncated):

```
{
  "apiVersion": "v1",
  "items": [
    {
      "kind": "Node",
      "metadata": {
        "name": "master",
        "labels": { … }
      },
      "status": {
        "capacity": {
          "cpu": "4"
        },
        "nodeInfo": {
          "architecture": "amd64"
        }
      }
    }
    // more nodes…
  ]
}
```

If you prefer more columns in the table view, use:

```
kubectl get nodes -o wide
```

```
NAME     STATUS   ROLES    AGE   VERSION     INTERNAL-IP    OS-IMAGE              KERNEL-VERSION
master   Ready    master   40m   v1.11.3     172.17.0.44    Ubuntu 16.04.2 LTS    4.4.0-18148-generic
node01   Ready    <none>   40m   v1.11.3     172.17.0.63    Ubuntu 16.04.2 LTS    4.4.0-18148-generic
```

Neither the default table nor `kubectl describe` lets you build fully custom reports (for example, listing node CPU, taints, and container images in one view). This is where JSONPath shines.

![The image shows a Kubernetes-related table with node information, including CPU, taints, architecture, and images, under the title "KubeCtl - JSON PATH."](https://kodekloud.com/kk-media/image/upload/v1752879400/notes-assets/images/JSON-Path-Test-Free-Course-JSON-PATH-Use-case-Kubernetes/kubectl-json-path-node-info-table.jpg)

## Getting Started with JSONPath

1.  Identify the base resource:

    ```
    kubectl get pods
    ```

2.  Append `-o json` to inspect the structure:

    ```
    kubectl get pods -o json
    ```

3.  Draft a JSONPath expression against the JSON. Example:

    ```
    .items[0].spec.containers[0].image
    ```

4.  Run with `-o jsonpath` and wrap your expression in single quotes:

    ```
    kubectl get pods -o jsonpath='{.items[0].spec.containers[0].image}'
    ```

> [!important]
> **Tip**
>
> Use an online JSONPath evaluator to verify your expression before embedding it in `kubectl`.

## Basic JSONPath Queries

| Use Case                     | Command                                                                                    | Output           |
| ---------------------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| List all node names          | `kubectl get nodes -o=jsonpath='{.items[*].metadata.name}'`                                | `master node01`  |
| List node architectures      | `kubectl get nodes -o=jsonpath='{.items[*].status.nodeInfo.architecture}'`                 | `amd64 amd64`    |
| List CPU counts on each node | `kubectl get nodes -o=jsonpath='{.items[*].status.capacity.cpu}'`                          | `4 4`            |
| Combine name and CPU count   | `kubectl get nodes -o=jsonpath='{.items[*].metadata.name}{.items[*].status.capacity.cpu}'` | `masternode0144` |

### Formatting with Newlines and Tabs

Add `"\n"` and `"\t"` for readability:

```
kubectl get nodes -o jsonpath='{.items[*].metadata.name}{"\n"}{.items[*].status.capacity.cpu}'
```

Produces:

```
master node01
4 4
```

## Iteration Using `range`

Use `range` to iterate through items:

```
kubectl get nodes -o jsonpath='
{range .items[*]}{.metadata.name}{"\t"}{.status.capacity.cpu}{"\n"}{end}
'
```

Output:

```
master    4
node01    4
```

## Custom Columns with `kubectl`

Define headers and expressions with `-o custom-columns` (no need for `.items[*]`):

```
kubectl get nodes -o custom-columns=NODE:.metadata.name,CPU:.status.capacity.cpu
```

```
NODE     CPU
master   4
node01   4
```

## Sorting Resources

Order your output by any JSON field:

```
kubectl get nodes --sort-by=.metadata.name
kubectl get nodes --sort-by=.status.capacity.cpu
```

## Conclusion

You now know how to extract, format, and sort Kubernetes data using JSONPath with `kubectl`. Practice these examples and try the exercises to master JSONPath queries in your clusters.

## Links and References

- [Kubernetes API Concepts](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Custom Columns Documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get)
- [jsonpath.com](https://jsonpath.com) for testing expressions

Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/json-path-test-free-course/module/114e6dee-a9f2-49f3-a0c6-cdfb92f74310/lesson/ddf217bb-9d2a-44ff-88ed-18716f1a4e6b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/json-path-test-free-course/module/114e6dee-a9f2-49f3-a0c6-cdfb92f74310/lesson/b6bf9fca-719a-4013-9ae6-7ea3f11657dc)**
>
> Practice lab
