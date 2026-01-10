# Solution Logging Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Solution-Logging-Optional)

---

## Table of Contents

- Solution Logging Optional
  - Inspecting Application Logs for Login Issues
  - Diagnosing an Order Failure Issue in a Multi-Container Pod
  - Summary
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Logging Monitoring

# Solution Logging Optional

In this lesson, we will learn how to manage application logs to diagnose issues in real-time. By reviewing logs from deployed pods, you can quickly identify errors based on user reports, leading to more efficient troubleshooting and improved application stability.

---

## Inspecting Application Logs for Login Issues

We begin with a scenario where a pod hosting an application has been deployed. To ensure the pod is running, use the following command:

```
kubectl get pods
```

The output should resemble:

```
NAME         READY   STATUS    RESTARTS   AGE
webapp-1     1/1     Running   0          110s
```

A user (user five) reported difficulties while attempting to log in. By examining the logs, we discovered that the issue is due to a locked account caused by too many failed login attempts. The log entry confirms:

```
[2022-04-16 19:55:58,923] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:56:14,961] INFO in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
```

> [!important]
> **Note**
>
> The output clearly indicates that subsequent failed login attempts have resulted in the account being locked. This information is crucial for troubleshooting user authentication issues.

---

## Diagnosing an Order Failure Issue in a Multi-Container Pod

In this scenario, a new application deployment involves two pods, with one pod (webapp-2) hosting two containers. Start by verifying the status of the pods:

```
kubectl get pods
```

Expected output:

```
NAME        READY   STATUS    RESTARTS   AGE
webapp-1    1/1     Running   0          110s
webapp-2    2/2     Running   0          9s
```

Attempting to view the logs for pod webapp-2 without specifying a container will result in an error:

```
kubectl logs webapp-2
```

Output:

```
error: a container name must be specified for pod webapp-2, choose one of: [simple_webapp db]
```

Since our focus is on the web application's logs, specify the container "simple_webapp" to examine the relevant log entries.

A user reported an issue while purchasing an item. Investigation of the log entries (focusing on warnings) reveals that, despite several warnings, the critical error associated with the order failure is related to an out-of-stock item. Review the following log sample:

```
[2022-04-16 19:57:24,773] INFO in event-simulator: USER2 logged in
[2022-04-16 19:57:25,774] INFO in event-simulator: USER1 logged in
[2022-04-16 19:57:26,775] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:57:27,771] INFO in event-simulator: USER4 is viewing page1
[2022-04-16 19:57:28,779] WARNING in event-simulator: USER1 is viewing page1
[2022-04-16 19:57:29,780] INFO in event-simulator: USER3 is viewing page3
[2022-04-16 19:57:31,783] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:57:33,784] INFO in event-simulator: USER2 logged in
[2022-04-16 19:57:34,785] INFO in event-simulator: USER4 logged in
[2022-04-16 19:57:35,786] INFO in event-simulator: USER1 logged out
[2022-04-16 19:57:36,789] WARNING in event-simulator: USER3 Order failed as the item is OUT OF STOCK.
[2022-04-16 19:57:37,791] INFO in event-simulator: USER3 logged in
[2022-04-16 19:57:38,791] INFO in event-simulator: USER1 is viewing page2
[2022-04-16 19:57:39,796] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-04-16 19:57:41,796] INFO in event-simulator: USER3 logged out
[2022-04-16 19:57:44,798] INFO in event-simulator: USER1 logged in
[2022-04-16 19:57:46,803] INFO in event-simulator: USER4 logged out
[2022-04-16 19:57:46,804] INFO in event-simulator: USER3 logged out
```

> [!important]
> **Warning**
>
> Notice that despite numerous warnings about login issues, the critical error that directly impacts the order process is:
>
> ```
> WARNING in event-simulator: USER3 Order failed as the item is OUT OF STOCK.
> ```
>
> This error indicates that the order failure was not due to authentication issues, but rather an inventory shortage.

---

## Summary

This lesson has demonstrated two key troubleshooting scenarios:

1.  **Login Issues**: By closely analyzing the logs, we confirmed that a locked account (due to multiple failed login attempts) was the root cause of the user access issue.
2.  **Order Failures in a Multi-Container Environment**: We learned to navigate the error generated by not specifying a container and identified that the order failure resulted from an out-of-stock item.

For more detailed instructions on Kubernetes and container management, visit the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

By following these procedures, you can efficiently diagnose and resolve issues in your application infrastructure, ensuring smoother operations and enhanced user experience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/67ee36bc-fea0-4136-a5a9-40754b32c5f7/lesson/79b156b3-a3a8-49ab-8fb6-aaf7f593c59f)**
>
> Watch video content
