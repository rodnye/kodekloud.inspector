# kubectl logs timestamps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-logs-timestamps)

---

## Table of Contents

- kubectl logs timestamps
  - Displaying Timestamps with kubectl logs
  - Logs Without Timestamps
  - Filtering Logs by Relative Time
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl logs timestamps

In this lesson, we explore how to enhance your Kubernetes troubleshooting by displaying timestamps with the kubectl logs command and filtering log output by time. By incorporating timestamps, you gain valuable insight into when each log entry was generated, making it easier to diagnose issues effectively.

---

## Displaying Timestamps with kubectl logs

To include timestamps in your pod logs, simply add the `--timestamps` flag. This flag appends the generation time to each log entry, providing vital context during troubleshooting.

```
kubectl logs --timestamps
```

For instance, when examining logs from an NGINX Ingress controller pod, you will see timestamps displayed alongside the application logs.

> [!important]
> **Tip**
>
> Using timestamps along with log output is particularly useful for correlating log entries with system events or errors.

---

## Logs Without Timestamps

In some scenarios, your logging configuration might exclude timestamps. Consider the following example where log entries do not show timestamp information:

```
controlplane ~ ➜  k logs -n ingress-nginx ingress-nginx-controller-647b798f59-ljfpt
NGINX Ingress controller
Release:         v1.1.3
Build:           9da328519a70452439c75b947e2189406565ab
Repository:      https://github.com/kubernetes/ingress-nginx
nginx version:   nginx/1.19.10
----------------------------------------------------
W0419 15:32:39.010550  57 client_config.go:615] Neither --kubeconfig nor --master was specified. Using the inClusterConfig. This might not work.
I0419 15:32:39.017167  57 main.go:223] "Creating API client" host="https://10.96.0.1:443"
I0419 15:32:39.207869  57 main.go:104] "SSL fake certificate created" file="/etc/ingress-controller/ssl/default-fake-certificate.pem"
I0419 15:32:39.227060  57 ssl.go:531] "loading tls certificate" path="/usr/local/certificates/cert" key="/usr/local/certificates/key"
I0419 15:32:39.268151  57 nginx.go:255] "Starting NGINX Ingress controller"
I0419 15:32:39.276038  57 event.go:282] Event(v1.ObjectReference{Kind:"ConfigMap", Namespace:"ingress-nginx", Name:"ingress-nginx-controller", UID:"9de694e8-400c-4843-8c0b-658dc430684", APIVersion:"v1", ResourceVersion:"1262", FieldPath:""}): type: 'Normal' reason: 'CREATE' ConfigMap ingress-nginx/ingress-nginx-controller
I0419 15:32:40.469435  57 nginx.go:298] "Starting NGINX process"
I0419 15:32:40.469674  57 leader_election.go:248] attempting to acquire leader lease ingress-nginx/ingress-controller-leader...
I0419 15:32:40.469993  57 nginx.go:318] "Starting validation webhook" address=":8443" certPath="/usr/local/certificates/key"
I0419 15:32:40.470219  57 controller.go:159] "Configuration changes detected, backend reload required"
I0419 15:32:40.479177  57 leader_election.go:258] successfully acquired lease ingress-nginx/ingress-controller-leader
I0419 15:32:40.487134  57 status.go:214] "POD is not ready" pod="ingress-nginx/ingress-nginx-controller-647b798f59-ljfpt" node="node01"
I0419 15:32:40.565735  57 controller.go:167] "Backend successfully reloaded"
I0419 15:32:40.566565  57 event.go:82] Event(v1.ObjectReference{Kind:"Pod", Namespace:"ingress-nginx", Name:"ingress-nginx-controller-647b798f59-ljfpt", UID:"84c80801-fc3d-4399-b1dc-80ab8411bcc1", APIVersion:"v1", ResourceVersion:"1307", FieldPath:""}): type: 'Normal' reason: 'RELOAD' NGINX reload triggered due to a change in configuration


controlplane ~ ➜
```

Even when log entries lack timestamps in the output, the container runtime retains the timestamp metadata. This metadata can be valuable for backend systems and further analysis.

A similar case arises with application logs from a Notes app:

```
controlplane ~ ➜  k logs -n uat notes-app-deployment-d4fcc5ccd-n7nm8
> notes-app@1.0.0 start /app
> node app.js
App is running on port 3000
```

To integrate timestamps, re-run the command with the `--timestamps` flag.

---

## Filtering Logs by Relative Time

In addition to appending timestamps, you can filter log outputs based on a specific timeframe using the `--since` flag. This capability assists in narrowing down log entries to a relevant period, saving time during troubleshooting.

For example, if your pod generates logs every second and you need to inspect the logs from the past 5 seconds, you can run:

```
kubectl logs --since=5s
```

Below is an example output for a 5-second window:

```
# (Example log output for a 5-second time window)
I0419 15:56:11.117300  57 logs_generator.go:67] 521 POST /api/v1/namespaces/kube-system/pods/cs3 395
I0419 15:56:11.117287  57 logs_generator.go:67] 522 POST /api/v1/namespaces/kube-system/pods/rs 498
I0419 15:56:11.117273  57 logs_generator.go:67] 523 GET /api/v1/namespaces/default/pods/ijb 435
I0419 15:56:11.117292  57 logs_generator.go:67] 524 POST /api/v1/namespaces/default/pods/678 453
I0419 15:56:14.117276  57 logs_generator.go:67] 525 GET /api/v1/namespaces/kube-system/pods/xppk 375
I0419 15:56:16.117263  57 logs_generator.go:67] 526 POST /api/v1/namespaces/default/pods/xrtc 325
I0419 15:56:16.117268  57 logs_generator.go:67] 527 GET /api/v1/namespaces/default/pods/p2j 435
I0419 15:56:17.117292  57 logs_generator.go:67] 528 POST /api/v1/namespaces/kube-system/pods/4dic 337
I0419 15:56:17.117298  57 logs_generator.go:67] 529 GET /api/v1/namespaces/default/pods/qy9l 268
I0419 15:56:18.117281  57 logs_generator.go:67] 530 GET /api/v1/namespaces/ns/pods/sxn 302
I0419 15:56:18.117291  57 logs_generator.go:67] 531 PUT /api/v1/namespaces/ns/pods/ken 406
I0419 15:56:18.117290  57 logs_generator.go:67] 532 GET /api/v1/namespaces/ns/pods/kan3 415
I0419 15:56:19.117287  57 logs_generator.go:67] 533 GET /api/v1/namespaces/kube-system/pods/ks1 536
I0419 15:56:19.117275  57 logs_generator.go:67] 534 POST /api/v1/namespaces/default/pods/ijf 411
I0419 15:56:20.117280  57 logs_generator.go:67] 536 GET /api/v1/namespaces/default/pods/vbs 358
I0419 15:56:20.117276  57 logs_generator.go:67] 537 POST /api/v1/namespaces/kube-system/pods/05h3 415
I0419 15:56:20.117268  57 logs_generator.go:67] 538 GET /api/v1/namespaces/ns/pods/k61 231
I0419 15:56:21.117259  57 logs_generator.go:67] 539 GET /api/v1/namespaces/ns/pods/bcr1 536
I0419 15:56:21.117274  57 logs_generator.go:67] 540 PUT /api/v1/namespaces/default/pods/qk2 406
I0419 15:56:24.117279  57 logs_generator.go:67] 541 GET /api/v1/namespaces/kube-system/pods/h7k 583
I0419 15:56:34.117288  57 logs_generator.go:67] 542 POST /api/v1/namespaces/ns/pods/nk9 399
I0419 15:56:34.117285  57 logs_generator.go:67] 543 GET /api/v1/namespaces/kube-system/pods/q3nk 343
I0419 15:56:35.117296  57 logs_generator.go:67] 544 POST /api/v1/namespaces/default/pods/rrn9 272
I0419 15:56:35.117276  57 logs_generator.go:67] 545 PUT /api/v1/namespaces/ns/pods/v2n 364
I0419 15:56:35.117275  57 logs_generator.go:67] 546 GET /api
```

You can easily extend the time window as necessary. To capture logs from the past 10 seconds (or even up to 1 hour), adjust the value provided to the `--since` flag accordingly. Below is an example capturing logs over a longer period:

```
# (Example log output for an extended time window)
I0419 15:56:17.117300  57 logs_generator.go:67] 531 PUT /api/v1/namespaces/default/pods/clbg 268
I0419 15:56:18.117278  57 logs_generator.go:67] 532 GET /api/v1/namespaces/ns/pods/o3l 436
I0419 15:56:18.117279  57 logs_generator.go:67] 533 POST /api/v1/namespaces/ns/pods/sxwn 302
I0419 15:56:18.117286  57 logs_generator.go:67] 534 PUT /api/v1/namespaces/default/pods/6nk 406
I0419 15:56:19.117282  57 logs_generator.go:67] 535 POST /api/v1/namespaces/default/pods/qq8 241
I0419 15:56:20.117276  57 logs_generator.go:67] 536 PUT /api/v1/namespaces/default/pods/oh5a 415
I0419 15:56:21.117265  57 logs_generator.go:67] 537 GET /api/v1/namespaces/ns/pods/k6l 231
I0419 15:56:21.117270  57 logs_generator.go:67] 538 POST /api/v1/namespaces/kube-system/pods/bcr1 536
I0419 15:56:23.117292  57 logs_generator.go:67] 539 GET /api/v1/namespaces/default/pods/ijf 411
I0419 15:56:24.117279  57 logs_generator.go:67] 540 GET /api/v1/namespaces/pods/hdv 583
I0419 15:56:25.117260  57 logs_generator.go:67] 541 GET /api/v1/namespaces/kube-system/pods/nk9 399
I0419 15:56:25.117264  57 logs_generator.go:67] 542 GET /api/v1/namespaces/default/pods/h38 229
I0419 15:56:25.117268  57 logs_generator.go:67] 543 POST /api/v1/namespaces/kube-system/pods/qhk 343
I0419 15:56:26.117262  57 logs_generator.go:67] 544 PUT /api/v1/namespaces/ns/pods/gqh 255
I0419 15:56:26.117277  57 logs_generator.go:67] 545 GET /api/v1/namespaces/ns/pods/q3nk 272
I0419 15:56:26.117285  57 logs_generator.go:67] 546 PUT /api/v1/namespaces/default/pods/908j 338
I0419 15:56:26.117291  57 logs_generator.go:67] 547 GET /api/v1/namespaces/ns/pods/q3nk 343
I0419 15:56:27.117300  57 logs_generator.go:67] 548 POST /api/v1/namespaces/kube-system/pods/lobp 375
I0419 15:56:27.117285  57 logs_generator.go:67] 549 PUT /api/v1/namespaces/default/pods/hmkd 438
I0419 15:56:27.117292  57 logs_generator.go:67] 550 GET /api/v1/namespaces/kube-system/pods/n8bz 513
I0419 15:56:32.117271  57 logs_generator.go:67] 551 POST /api/v1/namespaces/kube-system/pods/c4f 345
I0419 15:56:32.117281  57 logs_generator.go:67] 552 PUT /api/v1/namespaces/default/pods/52b5 513
I0419 15:56:35.117280  57 logs_generator.go:67] 553 GET /api/v1/namespaces/kube-system/pods/rFw4 529
I0419 15:56:35.117284  57 logs_generator.go:67] 554 GET /api/v1/namespaces/ns/pods/rg94 488
I0419 15:56:36.117276  57 logs_generator.go:67] 555 GET /api/v1/n
```

Adjusting the `--since` flag allows you to tailor the log output to the exact timeframe you need for effective troubleshooting.

---

## Summary

By adding the `--timestamps` flag to your kubectl logs command, you enrich your log data with temporal context, which is essential for diagnosing issues in real time. Additionally, leveraging the `--since` flag lets you filter logs to a specific duration, simplifying the process of pinpointing errors or warnings.

For more detailed information on Kubernetes log management and best practices, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **Note**
>
> Both flags are crucial in environments with high logging volumes where pinpointing the exact moment of an issue can lead to faster resolutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/8c0130ec-31e4-4e87-b996-8d8e1fb27fad)**
>
> Watch video content
