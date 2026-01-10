# Monitor Cluster Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Monitor-Cluster-Components)

---

## Table of Contents

- Monitor Cluster Components
  - What to Monitor
  - From Heapster to Metrics Server
  - How Metrics are Collected
  - Deploying Metrics Server
  - Viewing Metrics
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Logging Monitoring

# Monitor Cluster Components

Welcome to this guide on monitoring a Kubernetes cluster. In this article, we explain how to track resource consumption within your Kubernetes environment and ensure optimal performance across your nodes and pods.

## What to Monitor

Effectively monitoring a Kubernetes cluster involves tracking metrics at both the node and pod levels.

For nodes, consider monitoring the following:

- Total number of nodes in the cluster
- Health status of each node
- Performance metrics such as CPU, memory, network, and disk utilization

For pods, focus on:

- The number of running pods
- CPU and memory consumption for every pod

Because Kubernetes does not include a comprehensive built-in monitoring solution, you must implement an external tool. Popular open-source monitoring solutions include Metrics Server, Prometheus, and Elastic Stack. In addition, proprietary options like Datadog and Dynatrace are available for more advanced use cases.

## From Heapster to Metrics Server

Historically, Heapster provided monitoring and analysis support for Kubernetes. Although many reference architectures still mention Heapster, it has been deprecated. Its streamlined successor, Metrics Server, is now the standard for monitoring Kubernetes clusters.

![The image compares Heapster, marked as deprecated, with Metrics Server.](https://kodekloud.com/kk-media/image/upload/v1752869811/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Monitor-Cluster-Components/frame_90.jpg)

Metrics Server is designed to be deployed once per Kubernetes cluster. It collects metrics from nodes and pods, aggregates the data, and retains it in memory. Keep in mind that because Metrics Server stores data only in memory, it does not support historical performance data. For long-term metrics, consider integrating more advanced monitoring solutions.

![The image illustrates a "Metrics Server" with an "IN-MEMORY" label, featuring a grid with colored blocks and cube icons.](https://kodekloud.com/kk-media/image/upload/v1752869812/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Monitor-Cluster-Components/frame_110.jpg)

> [!important]
> **Note**
>
> Metrics Server is ideal for short-term monitoring and quick insights but is not meant for prolonged historical data analysis. For in-depth analytics, look into integrating Prometheus or Elastic Stack.

## How Metrics are Collected

Every Kubernetes node runs a service called the Kubelet, which communicates with the Kubernetes API server and manages pod operations. Within the Kubelet, an integrated component called cAdvisor (Container Advisor) is responsible for collecting performance metrics from running pods. These metrics are then exposed via the Kubelet API and retrieved by Metrics Server.

![The image illustrates a Kubernetes architecture with a Metrics Server, Kubelet, and cAdvisor, showing container management and monitoring components.](https://kodekloud.com/kk-media/image/upload/v1752869814/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Monitor-Cluster-Components/frame_150.jpg)

## Deploying Metrics Server

If you are experimenting locally with Minikube, you can enable the Metrics Server add-on using the following command:

```
minikube addons enable metrics-server
```

For other environments, deploy Metrics Server by cloning the GitHub repository and applying its deployment files:

```
git clone https://github.com/kubernetes-incubator/metrics-server.git
kubectl create -f deploy/1.8+/
```

After executing these commands, you should see confirmation that various Kubernetes objects (such as ClusterRoleBinding, RoleBinding, APIService, ServiceAccount, Deployment, Service, and ClusterRole) have been created successfully. Allow the Metrics Server a few moments to begin collecting data from the nodes.

## Viewing Metrics

Once Metrics Server is active, you can check resource consumption on nodes with this command:

```
kubectl top node
```

This will display the CPU and memory usage for each node, for example showing that 8% of the CPU on your master node (approximately 166 milli cores) is in use.

To check performance metrics for pods, run:

```
kubectl top pod
```

An example output may look like the following:

```
NAME         CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
kubemaster   166m         8%     1337Mi          70%
kubeno 1     36m          1%     1046Mi          55%
kubeno 2     39m          1%     1048Mi          55%


NAME   CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
nginx  166m         8%     1337Mi          70%
redis  36m          1%     1046Mi          55%
```

> [!important]
> **Tip**
>
> Run these commands periodically to monitor resource usage trends and quickly identify potential performance issues.

## Conclusion

This guide has walked you through the fundamentals of monitoring a Kubernetes cluster using Metrics Server. By understanding the key metrics and using the provided commands, you'll be well-equipped to maintain successful and efficient cluster operations. Experiment with these techniques and continue exploring additional monitoring tools for deeper insights.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/67ee36bc-fea0-4136-a5a9-40754b32c5f7/lesson/1c1a7090-dfce-467f-8f82-4d7b6586e502)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/67ee36bc-fea0-4136-a5a9-40754b32c5f7/lesson/c67b6216-7c96-409b-a5e5-26768a94daa9)**
>
> Practice lab
