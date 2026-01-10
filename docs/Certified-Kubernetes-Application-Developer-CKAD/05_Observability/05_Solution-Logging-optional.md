# Solution Logging optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Solution-Logging-optional)

---

## Table of Contents

- Solution Logging optional
  - Scenario 1: Diagnosing User Login Issues
  - Scenario 2: Handling Logs in a Multi-Container Pod
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Solution Logging optional

In this lesson, we walk through a comprehensive lab that focuses on managing application logs using Kubernetes. The lab covers two important scenarios: one diagnosing user login issues and the other addressing issues during an item purchase within a multi-container web application. By leveraging Kubernetes commands and log inspection, you will learn how to quickly identify and resolve problems.

---

## Scenario 1: Diagnosing User Login Issues

Initially, we deployed a Pod hosting the application. To verify that the Pod is running, execute the following command:

```
kubectl get pods
```

The expected output should resemble:

```
NAME       READY   STATUS    RESTARTS   AGE
webapp-1   1/1     Running   0          110s
```

When USER5 reported login issues, we inspected the application logs to diagnose the problem. The logs revealed repeated failed login attempts by USER5, which resulted in the account being locked. Below are the log entries outlining the sequence of events:

```
[2022-04-16 19:55:55,919] INFO in event-simulator: USER4 is viewing page3
[2022-04-16 19:55:56,920] INFO in event-simulator: USER1 is viewing page3
[2022-04-16 19:55:57,921] INFO in event-simulator: USER2 is viewing page2
[2022-04-16 19:55:58,923] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:55:58,923] INFO in event-simulator: USER7 Order failed as the item is OUT OF STOCK.
[2022-04-16 19:56:01,944] INFO in event-simulator: USER2 logged in
[2022-04-16 19:56:02,941] INFO in event-simulator: USER4 logged in
[2022-04-16 19:56:03,950] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:56:04,950] INFO in event-simulator: USER3 logged out
[2022-04-16 19:56:06,953] INFO in event-simulator: USER2 is viewing page2
[2022-04-16 19:56:08,957] INFO in event-simulator: USER4 logged in
[2022-04-16 19:56:10,958] INFO in event-simulator: USER3 is viewing page2
[2022-04-16 19:56:12,961] WARNING in event-simulator: USER7 Order failed as the item is OUT OF STOCK.
[2022-04-16 19:56:13,963] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:56:16,966] INFO in event-simulator: USER1 is viewing page3
[2022-04-16 19:56:18,968] INFO in event-simulator: USER3 logged out
[2022-04-16 19:56:20,969] INFO in event-simulator: USER2 is viewing page1
```

> [!important]
> **Note**
>
> The logs make it clear that multiple failed login attempts by USER5 have caused an automatic account lock. This is an essential diagnostic detail when troubleshooting login issues.

---

## Scenario 2: Handling Logs in a Multi-Container Pod

A second application was deployed involving two Pods. To confirm the deployment and status of these Pods, run:

```
kubectl get pods
```

You should now see two Pods listed:

```
NAME       READY   STATUS    RESTARTS   AGE
webapp-1   1/1     Running   0          110s
webapp-2   2/2     Running   0          9s
```

When inspecting the logs for the second Pod (`webapp-2`), an error occurs because the Pod contains two containers. Attempting to view the logs without specifying a container name results in this error:

```
kubectl logs webapp-2
```

```
error: a container name must be specified for pod webapp-2, choose one of: [simple-webapp db]
```

This message indicates that you must specify the container name—either "simple-webapp" or "db"—to view the relevant logs. For examining the web application behavior, you should use the container that manages the web service (typically "simple-webapp").

Next, to diagnose an item purchase failure, we analyze the logs for clues. A user reported an issue during the purchase process. The log entries below help pinpoint the problem:

```
[2022-04-16 19:57:24,773] INFO in event-simulator: USER2 logged in
[2022-04-16 19:57:25,774] INFO in event-simulator: USER1 logged in
[2022-04-16 19:57:26,775] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:57:26,776] INFO in event-simulator: USER4 is viewing page1
[2022-04-16 19:57:27,781] INFO in event-simulator: USER1 is viewing page1
[2022-04-16 19:57:28,781] INFO in event-simulator: USER3 is viewing page3
[2022-04-16 19:57:31,783] INFO in event-simulator: USER2 logged in
[2022-04-16 19:57:31,784] INFO in event-simulator: USER4 is viewing page1
[2022-04-16 19:57:31,785] WARNING in event-simulator: USER30 Order failed as the item is OUT OF STOCK.
[2022-04-16 19:57:34,786] INFO in event-simulator: USER1 logged in
[2022-04-16 19:57:36,788] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:57:36,789] WARNING in event-simulator: USER30 Order failed as the item is OUT OF STOCK.
[2022-04-16 19:57:40,796] INFO in event-simulator: USER3 is viewing page1
[2022-04-16 19:57:46,791] INFO in event-simulator: USER4 is viewing page1
[2022-04-16 19:57:46,793] INFO in event-simulator: USER3 logged out
[2022-04-16 19:57:46,794] INFO in event-simulator: USER1 is viewing page2
```

> [!important]
> **Note**
>
> From the above logs, it is evident that USER30 encountered an issue—the order failed because the item was out of stock. This warning, together with the login failure for USER5, highlights two separate issues within the application.

---

## Summary

By inspecting the logs and using the appropriate Kubernetes commands, we successfully identified the key issues:

- In the first scenario, USER5 experienced login failures due to repeated failed attempts that resulted in an account lock.
- In the second scenario, USER30 was unable to complete an order because the item was out of stock. Additionally, remember to specify a container name when retrieving logs from Pods with multiple containers.

Happy logging and troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/5ab1eb6a-508a-4ed3-a87e-9c94bf8367dc)**
>
> Watch video content
