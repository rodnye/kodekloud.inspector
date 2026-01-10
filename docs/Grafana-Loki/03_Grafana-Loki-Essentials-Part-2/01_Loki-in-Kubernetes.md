# Loki in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-2/Loki-in-Kubernetes)

---

## Table of Contents

- Loki in Kubernetes
  - How It Works
  - Simplifying Deployment with Helm
  - Step-by-Step Process
  - Next Steps
  - Watch Video

---

## Content

Grafana Loki

Grafana Loki Essentials Part 2

# Loki in Kubernetes

In this tutorial, we'll explore how to collect logs from applications running on a Kubernetes cluster using Loki, Promtail, and Grafana. This guide focuses on an in-cluster deployment, making it easier to manage your logging stack as part of your existing Kubernetes environment.

When running multiple containers on different cluster nodes, collecting logs from specific containers and applications reliably becomes crucial. One common strategy is to deploy a Loki instance directly on your Kubernetes cluster. Although Loki and Grafana can be deployed externally, hosting them within the cluster simplifies management and integration.

## How It Works

Each node in your Kubernetes cluster runs a kubelet process that collects log data from its pods. To forward these logs to the Loki instance, you'll deploy Promtail on each node. Promtail gathers logs from all pods and routes them to Loki. Kubernetes ensures that a Promtail container is automatically deployed on every node through the use of daemon sets. When new nodes join the cluster, Kubernetes deploys Promtail on these as well.

> [!important]
> **Key Insight**
>
> Deploying Promtail via daemon sets ensures comprehensive log collection on every node, regardless of when the node was added.

## Simplifying Deployment with Helm

Manually deploying Loki, Promtail, and Grafana can be quite time-consuming due to complex configurations. Thankfully, Helm charts are available for these tools. With just a few commands, Helm can deploy and configure Loki, Grafana, and Promtail, dramatically reducing the manual setup effort.

## Step-by-Step Process

Follow these steps to set up your logging stack on Kubernetes:

1.  **Deploy Loki**: Set up a Loki instance on your Kubernetes cluster.
2.  **Deploy Grafana**: Configure a Grafana dashboard for visualization, whether it is hosted within Kubernetes or externally.
3.  **Deploy Promtail**: Use a daemon set to deploy Promtail on every node so it can collect logs from all pods.
4.  **Use Helm**: Leverage a Helm chart to automate the configuration of Loki, Grafana, and Promtail.

> [!important]
> **Efficiency Gains**
>
> Using Helm streamlines the deployment process and ensures consistency across your cluster, making it a highly efficient approach to managing your logging infrastructure.

By following these steps and utilizing a Helm chart, you can set up effective log collection and visualization in your Kubernetes environment with minimal manual configuration.

## Next Steps

Now that you've reviewed the key steps, let's dive into the implementation details in the upcoming sections of this guide.

For further reading and comprehensive documentation:

- [Loki Documentation](https://grafana.com/docs/loki/latest/)
- [Promtail GitHub Repository](https://github.com/grafana/loki/tree/main/clients/cmd/promtail)
- [Grafana Documentation](https://grafana.com/docs/grafana/latest/)

Happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/bcacc3b5-9868-4ee5-9a59-a2b73b2c500f/lesson/42b58345-e562-403d-aaec-ac28c1a2ae2c)**
>
> Watch video content
