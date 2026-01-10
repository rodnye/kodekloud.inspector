# CoreDNS in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/CoreDNS-in-Kubernetes)

---

## Table of Contents

- CoreDNS in Kubernetes
  - CoreDNS Setup in the Cluster
  - DNS Service and Pod Configuration
  - Resolving Services and Pods
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# CoreDNS in Kubernetes

Welcome to this lesson on CoreDNS in Kubernetes. In this guide, you will learn how Kubernetes implements DNS resolution within a cluster to facilitate seamless communication between pods and services.

In our previous lesson, we explored how to address a service or pod from another pod. Now, we will explain how Kubernetes leverages a centralized DNS server to achieve that functionality.

Imagine you have two pods with different IP addresses. One approach to enable communication between them is to add an entry into each pod’s hosts file. For instance, on the first pod, you might map the second pod (named "web") to IP 10.244.2.5, and on the second pod, map the first pod (named "test") to IP 10.244.1.5. However, when dealing with thousands of pods that are frequently created and removed, manually managing these entries becomes impractical.

> [!important]
> **Centralized DNS Approach**
>
> Instead of manually editing hosts files, Kubernetes deploys a central DNS server. Each pod is pre-configured via its /etc/resolv.conf file to use this centralized server (typically at 10.96.0.10), which automatically updates DNS records for new pods and services.

Kubernetes does not create DNS entries for individual pods manually. Instead, it sets up DNS records for services, and for pods, it converts IP addresses into hostnames by replacing dots with dashes.

Before Kubernetes version 1.12, this service was known as Kube-DNS. Starting with version 1.12, however, the recommended DNS server is CoreDNS, which brings enhanced flexibility and performance. Below is a conceptual illustration showing how pods configure their /etc/resolv.conf to point to the DNS server:

```
cat /etc/resolv.conf
nameserver 10.96.0.10
```

## CoreDNS Setup in the Cluster

CoreDNS is deployed as a pod within the kube-system namespace. To ensure high availability, Kubernetes runs two replicas of CoreDNS pods managed by a ReplicaSet (now part of a Deployment). Each pod runs the CoreDNS executable, which you could also run manually if deploying CoreDNS independently.

CoreDNS requires a configuration file—commonly named "Corefile" and located at /etc/coredns/Corefile—that outlines various plugins used to process DNS queries. An example configuration is shown below:

```
cat /etc/coredns/Corefile
.:53 {
    errors
    health
    kubernetes cluster.local in-addr.arpa ip6.arpa {
        pods insecure
        upstream
        fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    proxy . /etc/resolv.conf
    cache 30
    reload
}
```

This configuration performs the following functions:

- Logs and handles errors.
- Provides health check endpoints.
- Integrates with Kubernetes via the Kubernetes plugin, configuring the primary domain to cluster.local and transforming pod IP addresses into a dashed hostname format.
- Exposes Prometheus metrics for monitoring.
- Forwards unresolved DNS queries (such as www.google.com) to the nameserver specified in the pod’s /etc/resolv.conf.
- Caches DNS responses and supports dynamic reloads of the configuration upon changes.

Note that this configuration is stored in a ConfigMap. If adjustments are needed, simply update the ConfigMap:

```
kubectl get configmap -n kube-system
NAME      DATA   AGE
coredns   1      168d
```

Once the CoreDNS pod is running with the correct configuration, it continuously monitors the Kubernetes API for new pods and services, allowing DNS records to be updated dynamically.

## DNS Service and Pod Configuration

To enable pods to communicate with the CoreDNS server, Kubernetes creates a service (named kube-dns by default) with the IP address 10.96.0.10. This IP is automatically set as the primary nameserver in all pod /etc/resolv.conf files. The service details are as follows:

```
kubectl get service -n kube-system
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)           AGE
kube-dns     ClusterIP   10.96.0.10     <none>        53/UDP,53/TCP     1d
```

A typical pod’s /etc/resolv.conf file will appear as:

```
cat /etc/resolv.conf
nameserver 10.96.0.10
search default.svc.cluster.local svc.cluster.local cluster.local
```

This configuration is automatically managed by the Kubelet. If you inspect the Kubelet configuration file, you will find entries for both the cluster DNS and the cluster domain:

```
cat /var/lib/kubelet/config.yaml
...
clusterDNS:
- 10.96.0.10
clusterDomain: cluster.local
```

## Resolving Services and Pods

With the correct DNS configuration, pods can resolve services using different domain name formats. For example, if you have a web service deployed in your cluster, you can access it using any of the following names:

- web-service
- web-service.default
- web-service.default.svc
- web-service.default.svc.cluster.local

These examples are demonstrated in the commands below:

```
cat /etc/resolv.conf
nameserver 10.96.0.10
curl http://web-service
curl http://web-service.default
curl http://web-service.default.svc
curl http://web-service.default.svc.cluster.local
```

You can also use tools like nslookup or host to check the fully qualified domain name:

```
host web-service
web-service.default.svc.cluster.local has address 10.107.37.188
```

The search entries in /etc/resolv.conf allow the resolver to append the listed domains when you use partial names. However, individual pod names must always be resolved with their complete fully qualified domain name (FQDN).

For example:

```
cat /etc/resolv.conf
nameserver 10.96.0.10
search default.svc.cluster.local svc.cluster.local cluster.local


host web-service
web-service.default.svc.cluster.local has address 10.107.37.188


host 10-244-2-5
Host 10-244-2-5 not found: 3(NXDOMAIN)


host 10-244-2-5.default.pod.cluster.local
10-244-2-5.default.pod.cluster.local has address 10.244.2.5
```

> [!important]
> **DNS Resolution Summary**
>
> The search entries in the /etc/resolv.conf file simplify service resolution by allowing shorter names. However, pod-specific DNS records require their full FQDN for proper resolution.

## Conclusion

By deploying CoreDNS and configuring all pods to use the centralized DNS service, Kubernetes enables dynamic and automated DNS resolution for both services and pods. This robust setup eliminates the need for manual host file configuration, thereby streamlining communication across the cluster.

Revisit and practice these concepts to deepen your understanding of managing DNS within a Kubernetes environment. Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/5f8cda46-3313-460b-a4ee-88446d7f4977)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/1c67d45f-7917-427e-83b2-9677c1d80b8e)**
>
> Practice lab
