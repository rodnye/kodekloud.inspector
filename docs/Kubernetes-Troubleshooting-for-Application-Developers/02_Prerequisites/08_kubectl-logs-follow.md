# kubectl logs follow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-logs-follow)

---

## Table of Contents

- kubectl logs follow
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl logs follow

In this guide, we explain how to stream logs in real time using the kubectl logs command. Monitoring real-time logs is crucial for tracking application behavior, debugging issues, and understanding event flow.

When you execute the logs command without any flags:

```
kubectl logs
```

it will display the log entries available up to the moment the command is executed. This behavior might prompt you to run the command repeatedly to capture the latest logs. For instance, here is an excerpt of log entries captured before applying the follow functionality:

```
I0419 16:16:59.419977   55 logs_generator.go:671] 599 PUT /api/v1/namespaces/kube-system/pods/kcx 280
I0419 16:17:00.619992   55 logs_generator.go:671] 600 POST /api/v1/namespaces/default/pods/swbq 515
I0419 16:17:01.819993   55 logs_generator.go:671] 601 PUT /api/v1/namespaces/default/pods/b59 558
I0419 16:17:02.819983   55 logs_generator.go:671] 602 GET /api/v1/namespaces/default/pods/j71 472
I0419 16:17:03.019821   55 logs_generator.go:671] 603 PUT /api/v1/namespaces/default/pods/3545 409
I0419 16:17:04.219986   55 logs_generator.go:671] 604 GET /api/v1/namespaces/default/pods/j74 507
I0419 16:17:05.419986   55 logs_generator.go:671] 605 GET /api/v1/namespaces/default/pods/3687 528
I0419 16:17:06.619986   55 logs_generator.go:671] 606 GET /api/v1/namespaces/kube-system/pods/5ns 368
I0419 16:17:07.819936   55 logs_generator.go:671] 607 POST /api/v1/namespaces/default/pods/tfwq 252
I0419 16:17:08.019973   55 logs_generator.go:671] 608 GET /api/v1/namespaces/ns/pods/354 467
I0419 16:17:09.619983   55 logs_generator.go:671] 609 PUT /api/v1/namespaces/default/pods/8t75 482
I0419 16:17:10.819981   55 logs_generator.go:671] 610 GET /api/v1/namespaces/default/pods/92p 286
I0419 16:17:11.819936   55 logs_generator.go:671] 611 GET /api/v1/namespaces/ns/pods/pck 219
I0419 16:17:12.819993   55 logs_generator.go:671] 612 PUT /api/v1/namespaces/default/pods/hdb 219
I0419 16:17:13.819980   55 logs_generator.go:671] 613 POST /api/v1/namespaces/default/pods/ckx 410
I0419 16:17:14.219988   55 logs_generator.go:671] 614 POST /api/v1/namespaces/default/pods/ckx 410
I0419 16:17:15.619974   55 logs_generator.go:671] 615 GET /api/v1/namespaces/default/pods/2fg 556
I0419 16:17:16.819975   55 logs_generator.go:671] 616 GET /api/v1/namespaces/default/pods/lmg7 392
I0419 16:17:17.019942   55 logs_generator.go:671] 617 PUT /api/v1/namespaces/kube-system/pods/hnf 441
I0419 16:17:17.219992   55 logs_generator.go:671] 618 GET /api/v1/namespaces/ns/pods/dx55 434
I0419 16:17:18.619964   55 logs_generator.go:671] 619 GET /api/v1/namespaces/default/pods/gm94 583
I0419 16:17:19.219988   55 logs_generator.go:671] 620 GET /api/v1/namespaces/default/pods/gm94 583
I0419 16:17:20.619962   55 logs_generator.go:671] 621 PUT /api/v1/namespaces/kube-system/pods/mnf 405
I0419 16:17:21.619979   55 logs_generator.go:671] 622 PUT /api/v1/namespaces/kube-system/pods/svis 224
I0419 16:17:22.619973   55 logs_generator.go:671] 623 GET /api/v1/namespaces/ns/pods/wm
```

> [!important]
> **Note**
>
> Without the follow flag, the kubectl logs command only retrieves the log entries that exist at that particular moment.

To enable real-time streaming of log entries, use the -f (or --follow) flag:

```
kubectl logs --follow
```

This command continuously streams logs as new entries are generated, making it especially useful during live debugging, testing, or monitoring specific events.

For a quick overview, refer to the table below:

| Command      | Description                                     | Example                 |
| ------------ | ----------------------------------------------- | ----------------------- |
| Default Logs | Displays existing log entries at execution time | `kubectl logs`          |
| Follow Logs  | Streams new log entries in real time            | `kubectl logs --follow` |

Using the --follow flag allows your command terminal to update automatically with new log entries, providing you with an efficient tool to monitor your Kubernetes environment as it changes.

This concludes our discussion on streaming logs with kubectl. For more detailed information and further resources, check out the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/4295bd15-6b66-4890-b377-267eea712a66)**
>
> Watch video content
