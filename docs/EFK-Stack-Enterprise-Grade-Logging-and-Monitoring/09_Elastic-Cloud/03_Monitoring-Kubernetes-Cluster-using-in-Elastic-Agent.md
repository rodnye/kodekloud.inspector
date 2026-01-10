# Monitoring Kubernetes Cluster using in Elastic Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Elastic-Cloud/Monitoring-Kubernetes-Cluster-using-in-Elastic-Agent)

---

## Table of Contents

- Monitoring Kubernetes Cluster using in Elastic Agent
  - Step 1: Add the Kubernetes Integration
  - Step 2: Deploy the Elastic Agent on Kubernetes
  - Step 3: Verify the Deployment
  - Step 4: View Metrics in Elastic Cloud
  - Step 5: Clean Up
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Elastic Cloud

# Monitoring Kubernetes Cluster using in Elastic Agent

Welcome to this comprehensive guide on monitoring your Kubernetes cluster with Elastic Agent. In this tutorial, you will learn how to configure Elastic Agent on your Kubernetes cluster, forward logs and metrics to Elastic Cloud, and visualize your data on a pre-configured dashboard.

## Step 1: Add the Kubernetes Integration

After logging into your Elastic Cloud console, click on the **Add integration** option. You will be presented with a list of available integrations:

![The image shows a webpage from Elastic, displaying a list of integrations for various Amazon Web Services (AWS) and other categories. The left sidebar lists categories, while the main section shows specific AWS services with descriptions.](https://kodekloud.com/kk-media/image/upload/v1752874193/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Monitoring-Kubernetes-Cluster-using-in-Elastic-Agent/elastic-aws-integrations-webpage.jpg)

From the list, choose the **Kubernetes integration** and then click on **Add Kubernetes**. The console provides you with an installation script that will deploy the Elastic Agent on your Kubernetes cluster.

![The image is a guide for adding an integration in Elastic, showing three steps: installing the Elastic Agent, adding the integration, and confirming incoming data.](https://kodekloud.com/kk-media/image/upload/v1752874195/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Monitoring-Kubernetes-Cluster-using-in-Elastic-Agent/elastic-integration-setup-guide.jpg)

## Step 2: Deploy the Elastic Agent on Kubernetes

Click the **Install Elastic Agent** option to view the Kubernetes deployment YAML along with the command required for deployment. The top portion of the deployment file appears as follows:

```
---
# For more information see: https://www.elastic.co/guide/en/fleet/current/running-on-kubernetes-managed-by-fleet.html
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: elastic-agent
  namespace: kube-system
  labels:
    app: elastic-agent
spec:
  selector:
    matchLabels:
      app: elastic-agent
  template:
    metadata:
```

Below is the command to deploy the Elastic Agent:

```
kubectl apply -f elastic-agent-managed-kubernetes.yml
```

Next, copy the complete YAML content from the page into a new file (e.g., `elastic-agent-managed-kubernetes.yml`). Ensure that your YAML file includes the necessary specifications for proper scheduling, such as tolerations for control-plane nodes, to ensure that metrics from Kubernetes control components (scheduler, controller manager) are collected:

```
spec:
  selector:
    matchLabels:
      app: elastic-agent
  template:
    metadata:
      labels:
        app: elastic-agent
  spec:
    # Tolerations are needed to run Elastic Agent on Kubernetes control-plane nodes.
    # Agents running on control-plane nodes collect metrics from the control plane
    # components (scheduler, controller manager) of Kubernetes.
    tolerations:
      - key: node-role.kubernetes.io/control-plane
        effect: NoSchedule
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
    serviceAccountName: elastic-agent
```

Apply the updated configuration with:

```
kubectl apply -f elastic-agent-managed-kubernetes.yml
```

## Step 3: Verify the Deployment

Once the deployment process is complete, verify that the Elastic Agent pods are running. Execute the following command:

```
kubectl get pods -n kube-system
```

You should see output similar to this:

```
NAME                                      READY   STATUS              RESTARTS   AGE
coredns-64d57b6bd-6nfr4                   1/1     Running             0          8m37s
coredns-64d57b6bd-h8742                   1/1     Running             0          8m37s
elastic-agent-mxmx4                       0/1     ContainerCreating   0          17s
elastic-agent-npl15                       0/1     ContainerCreating   0          17s
etcd-controlplane                         1/1     Running             0          8m50s
kube-apiserver-controlplane               1/1     Running             0          8m48s
kube-controller-manager-controlplane      1/1     Running             0          8m24s
kube-flannel-ds-t8w7                       1/1     Running             0          8m37s
kube-proxy-dt7jg                          1/1     Running             0          8m37s
kube-scheduler-controlplane               1/1     Running             0          8m48s
```

After a short wait, the Elastic Agent pods will transition to the running state. Re-run the command above to ensure that both agents are active. You should also see console output similar to the following when the daemonset deployment is applied:

```
daemonset.apps/elastic-agent created
clusterrolebinding.rbac.authorization.k8s.io/elastic-agent created
rolebinding.rbac.authorization.k8s.io/elastic-agent created
clusterrole.rbac.authorization.k8s.io/elastic-agent created
role.rbac.authorization.k8s.io/elastic-agent created
serviceaccount/elastic-agent created
```

## Step 4: View Metrics in Elastic Cloud

Once the Elastic Agent is enrolled, Elastic Cloud automatically starts collecting metrics from your Kubernetes cluster. In your Elastic Cloud console:

1.  Click on **Confirm data**.
2.  Select **View Kubernetes metrics** on the dashboard.

![The image shows a preview of incoming data logs in an Elastic interface, detailing various agent activities and configurations. It includes timestamps, agent names, types, versions, and cloud instance information.](https://kodekloud.com/kk-media/image/upload/v1752874196/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Monitoring-Kubernetes-Cluster-using-in-Elastic-Agent/elastic-data-logs-preview.jpg)

Within a few minutes, you will see metrics such as node details, memory usage, CPU core counts, and even information about the top memory-intensive pods appear on the dashboard. For instance, the default dashboard displays the Elastic Agent running in the `kube-system` namespace:

![The image shows a dashboard from Elastic displaying Kubernetes metrics, including memory usage and pod information, with a filter option for namespaces.](https://kodekloud.com/kk-media/image/upload/v1752874197/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Monitoring-Kubernetes-Cluster-using-in-Elastic-Agent/elastic-kubernetes-metrics-dashboard.jpg)

> [!important]
> **Tip**
>
> If you require a customized view, you can clone or modify the dashboard. However, note that managed dashboards provided by Elastic Cloud are maintained by the Elastic Agent and are not immediately editable.

## Step 5: Clean Up

> [!important]
> **Warning**
>
> If you're using a free trial Elastic Cloud account, be sure to delete the deployment after your trial period ends to prevent ongoing charges.

To delete your deployment:

1.  Navigate to your profile in Elastic Cloud.
2.  Click on **Organization**, then **Elastic**.
3.  On the home page, click **Manage** and choose **Delete deployment**.
4.  Confirm deletion by typing the cluster name.

This ensures that you will not incur any unwanted costs after your trial period.

## Conclusion

This guide demonstrated how to seamlessly monitor your Kubernetes cluster with Elastic Agent, leveraging the robust observability and logging capabilities of Elastic Cloud. For further reading, explore additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Elastic Documentation](https://www.elastic.co/guide/index.html)

Thank you for following this guide. Happy monitoring, and we look forward to bringing you more insightful lessons in the future!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/be2630b4-1d09-403d-98f4-71c5ea9f2df7/lesson/f3c8e2fb-8e2f-492d-93a5-ca25d042ae56)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/be2630b4-1d09-403d-98f4-71c5ea9f2df7/lesson/6e871d7f-dc8f-4e8a-9251-3c7090d9e394)**
>
> Practice lab
