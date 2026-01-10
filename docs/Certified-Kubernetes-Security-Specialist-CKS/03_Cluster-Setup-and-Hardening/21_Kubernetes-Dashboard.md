# Kubernetes Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Kubernetes-Dashboard)

---

## Table of Contents

- Kubernetes Dashboard
  - Deployment Configuration
  - Secure Access via kubectl Proxy
  - Alternative Exposure Methods
  - Next Steps
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Kubernetes Dashboard

The Kubernetes Dashboard is a powerful web-based UI designed to give you a visual overview of your Kubernetes cluster. It enables you to monitor cluster activities, manage resources, and deploy new applications directly from the dashboard interface. However, with its ability to display sensitive information, including secrets, it is essential to implement proper security measures to protect access and prevent unauthorized usage.

> [!important]
> **Warning**
>
> Older versions of the Kubernetes Dashboard did not enforce strict access control. This vulnerability led to high-profile security incidents, such as the one reported by the RedLock cloud security team at Tesla, where an unsecured dashboard was exploited to mine cryptocurrencies.

## Deployment Configuration

The Kubernetes Dashboard is deployed by applying the recommended configuration available in its GitHub repository. When deployed, a dedicated namespace named `kubernetes-dashboard` is created, and several objects are set up, including:

| Resource Type  | Description                                            |
| -------------- | ------------------------------------------------------ |
| **Deployment** | Hosts the dashboard UI server.                         |
| **Service**    | Exposes the dashboard internally within the cluster.   |
| **ConfigMaps** | Stores various dashboard settings.                     |
| **Secrets**    | Holds certificates and other sensitive configurations. |

Below is an example configuration for a deployment using a rolling update strategy:

```
type: RollingUpdate
rollingUpdate:
  maxUnavailable: 25%
  maxSurge: 25
revisionHistoryLimit: 10
progressDeadlineSeconds: 600
status:
  observedGeneration: 1
  replicas: 2
  updatedReplicas: 2
  readyReplicas: 2
  availableReplicas: 2
  conditions:
    - type: Progressing
      status: 'True'
      lastUpdateTime: '2021-03-05T05:55:37Z'
      lastTransitionTime: '2021-03-05T05:55:19Z'
      reason: NewReplicaSetAvailable
      message: ReplicaSet "nginx-deployment-66b6c48dd5" has successfully progressed.
    - type: Available
      status: 'True'
      lastUpdateTime: '2021-03-06T02:38:00Z'
      lastTransitionTime: '2021-03-06T02:38:00Z'
      reason: MinimumReplicasAvailable
      message: Deployment has minimum availability.
```

To deploy the dashboard, execute the following command:

```
kubectl apply -f https://<path-to-Kubernetes-dashboard>/recommended.yaml
```

By default, the dashboard service is set up as a ClusterIP, restricting access to within the cluster only. You can review the service configuration with:

```
kubectl describe service kubernetes-dashboard -n kubernetes-dashboard
```

Example output:

```
Name:                     kubernetes-dashboard
Namespace:                kubernetes-dashboard
Labels:                   k8s-app=kubernetes-dashboard
Annotations:              Selector: k8s-app=kubernetes-dashboard
IP:                       10.102.130.63
Port:                     <unset> 443/TCP
TargetPort:               8443/TCP
```

## Secure Access via kubectl Proxy

Since Kubernetes cluster nodes typically lack a graphical user interface, accessing the dashboard directly from the nodes is not possible. Instead, use the `kubectl proxy` command to create a secure tunnel from your local machine to the API server. Once the proxy is running, navigate to the dashboard using:

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/<service-name>/proxy/
```

For example, start the proxy with:

```
kubectl proxy
```

The console will then display:

```
Starting to serve on 127.0.0.1:8001
```

This method is ideal for individual access. For team-wide access, implement additional authentication and authorization measures to ensure only permitted users can access or modify the dashboard.

> [!important]
> **Note**
>
> The Proxy method is recommended as the default service configuration employs ClusterIP. Altering the service to LoadBalancer or NodePort for external access is possible but comes with enhanced security risks. Always evaluate your security posture before making such changes.

## Alternative Exposure Methods

Changing the service type can expose the dashboard beyond the cluster boundaries:

- **LoadBalancer**: Suitable in a cloud environment, this exposes the dashboard externally but is not recommended due to security risks.
- **NodePort**: Makes the dashboard accessible on specific node ports. While feasible in a secure environment, it demands stringent network security controls.
- **Authentication Proxies**: Tools such as OAuth2 Proxy can be deployed to enforce user authentication before requests are forwarded to the dashboard. This setup, however, is more complex and beyond the scope of this article.

![The image is a screenshot of a blog post titled "Lessons from the Cryptojacking Attack at Tesla," discussing Kubernetes security vulnerabilities and cryptojacking incidents.](https://kodekloud.com/kk-media/image/upload/v1752871368/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Dashboard/frame_70.jpg)

![The image illustrates accessing a Kubernetes dashboard using `kubectl proxy` from a laptop, connecting to a Kubernetes cluster with a load balancer.](https://kodekloud.com/kk-media/image/upload/v1752871369/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Dashboard/frame_290.jpg)

For further insights on securing your Kubernetes Dashboard and implementing advanced authentication mechanisms, refer to expert resources such as those provided by Kubernetes authorities like Joe Beda.

![The image lists references and resources related to Kubernetes, including documentation, a GitHub link, a YouTube video, and a blog post on securing the Kubernetes dashboard.](https://kodekloud.com/kk-media/image/upload/v1752871370/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Dashboard/frame_360.jpg)

## Next Steps

In our next article, we will explore detailed authentication mechanisms available for securing the Kubernetes Dashboard, ensuring a safer operating environment for your Kubernetes clusters.

For more information, consider referring to:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Terraform Registry](https://registry.terraform.io/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/0f4908ec-b60e-4c7d-99ee-ac98f4584bff)**
>
> Watch video content
