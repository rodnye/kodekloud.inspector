# kubectl explain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-explain)

---

## Table of Contents

- kubectl explain
  - Using the "kubectl explain" Command
  - Exploring Nested Fields with the Recursive Flag
  - Useful Links and References
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl explain

In this article, we wrap up our kubectl refresher with two bonus commands that may appear trivial but are exceptionally useful for understanding Kubernetes API resources.

## Using the "kubectl explain" Command

The primary command is:

```
kubectl explain
```

This command serves as an inline documentation tool for Kubernetes API resources. For example, if you want to inspect detailed information about a Pod—including its API version, kind, metadata, specification, and status—you can run:

```
bash
controlplane ~ ➜  k explain pods
KIND:     Pod
VERSION:  v1


DESCRIPTION:
Pod is a collection of containers that can run on a host. This resource is
created by clients and scheduled onto hosts.


FIELDS:
  apiVersion <string>
    APIVersion defines the versioned schema of this representation of an object.
    Servers should convert recognized schemas to the latest internal value, and
    may reject unrecognized values. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources


  kind <string>
    Kind is a string value representing the REST resource this object
    represents. Servers may infer this from the endpoint the client submits
    requests to. Cannot be updated. In CamelCase. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds


  metadata <ObjectMeta>
    Standard object's metadata. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata


  spec <PodSpec>
    Specification of the desired behavior of the pod. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


  status <PodStatus>
    Most recently observed status of the pod. This data may not be up to date.
    Populated by the system. Read-only. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


controlplane ~ ➜
```

> [!important]
> **Tip**
>
> If you're unsure about any Kubernetes resource or its fields, remember that the `kubectl explain` command is a quick way to access the documentation you need directly from your CLI.

## Exploring Nested Fields with the Recursive Flag

To obtain even more granular details about a specific section, such as the fields under the `spec` field (for example, the security context), you can append `.spec` to the command. For nested objects, use the recursive flag to dive deeper:

```
controlplane ~ ➜ k explain pods.spec.securityContext --recursive
KIND:     Pod
VERSION:  v1
FIELD:    securityContext <PodSecurityContext>


DESCRIPTION:
SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty. See type description for default values of each field.
PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext. Field values of container.securityContext take precedence over field values of PodSecurityContext.


FIELDS:
  fsGroup                             <integer>
  fsGroupChangePolicy                 <string>
  runAsGroup                          <integer>
  runAsNonRoot                        <boolean>
  runAsUser                           <integer>
  seLinuxOptions                      <SELinuxOptions>
      level                           <string>
      role                            <string>
      type                            <string>
      user                            <string>
  seccompProfile                      <SeccompProfile>
  localhostProfile                    <string>
  type                                <string> -required-
  supplementalGroups                  <integer>
  sysctls                             <[]string>
      name                            <string> -required-
      value                           <string> -required-
  windowsOptions                      <WindowsSecurityContextOptions>
  gmsaCredentialSpec                  <string>
  gmsaCredentialSpecName              <string>
  hostProcess                         <boolean>
  runAsUserName                       <string>
controlplane ~ ➜
```

This recursive command offers a comprehensive view of all fields within the `PodSecurityContext`. The same approach can be employed for Custom Resource Definitions (CRDs) and any non-native Kubernetes resources. Simply run the command against the desired CRD to retrieve complete documentation.

> [!important]
> **Additional Insight**
>
> Using the recursive flag is particularly useful when troubleshooting or configuring complex deployments, as it helps you understand the full hierarchy of nested fields.

Happy exploring!

## Useful Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes API Conventions](https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/58553521-e68c-4341-9943-485081893ebd)**
>
> Watch video content
