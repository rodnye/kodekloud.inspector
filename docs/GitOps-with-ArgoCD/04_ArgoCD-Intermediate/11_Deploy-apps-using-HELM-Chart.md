# Deploy apps using HELM Chart - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Deploy-apps-using-HELM-Chart)

---

## Table of Contents

- Deploy apps using HELM Chart
  - Key Resources and References
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Deploy apps using HELM Chart

In this article, we explore how ArgoCD deploys and manages applications using Helm Charts, streamlining Kubernetes management and embracing GitOps principles.

Helm is the package manager for Kubernetes that simplifies application installation and lifecycle management by using collections of YAML configuration files—known as Helm Charts. These Charts bundle the YAML definitions needed for deploying a set of Kubernetes resources. With declarative application definitions as a core GitOps principle, Helm Charts can be stored in repositories specially designed for packaging and distributing them.

ArgoCD enhances this process by deploying packaged Helm Charts, monitoring them for updates, and managing their lifecycle after deployment. For example, if you have a Git repository structured with a Helm Chart, the ArgoCD CLI can be used to create an application that deploys it. By specifying the repository URL, the path to the chart, and override values via the Helm Set option, you achieve a flexible and continuous deployment process.

ArgoCD is versatile and supports deployment from various sources:

- **Artifactory Hub**
- **Bitnami Helm Charts**

Furthermore, you can deploy a Helm Chart using the ArgoCD UI. The UI simplifies repository connections by supporting SSH, HTTPS, or GitHub App integrations. It also allows you to configure repository details such as name, type, URL, and credentials for accessing private repositories.

> [!important]
> **Note**
>
> Once ArgoCD deploys an application using a Helm Chart, the management completely shifts to ArgoCD. Consequently, performing a `helm ls` command will not display the deployed release because it is no longer managed by Helm.

Below is an example demonstrating how to create two ArgoCD applications:

1.  One deploying a Helm Chart from a Git repository.
2.  Another deploying the Nginx Helm Chart from the Bitnami repository.

After deployment, the command `helm ls` confirms that the applications are managed entirely by ArgoCD.

```
$ argocd app create random-shapes \
  --repo https://github.com/sidd-harth/test-cd.git \
  --path helm-chart \
  --helm-set replicaCount=2 \
  --helm-set color.circle=pink \
  --helm-set color.square=violet \
  --helm-set service.type=NodePort \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc
application 'random-shapes' created


$ argocd app create nginx \
  --repo https://charts.bitnami.com/bitnami \
  --helm-chart nginx \
  --revision 12.0.3 \
  --values-literal-file values.yaml \
  --dest-namespace default \
  --dest-server https://kubernetes.default.svc
application 'nginx' created


$ helm ls
NAME   NAMESPACE REVISION UPDATED STATUS CHART APP VERSION
```

This example clearly illustrates the following:

- How to create ArgoCD applications using the CLI.
- Configuring Helm Chart parameters during deployment.
- Verifying that after deployment, the management is handled by ArgoCD rather than Helm.

## Key Resources and References

| Component        | Description                                                 | Example Command / Link                                            |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| ArgoCD CLI       | Used to create and manage ArgoCD applications               | `argocd app create` command examples above                        |
| Helm Package     | Simplifies installation and management of Kubernetes apps   | [Helm Documentation](https://helm.sh/docs/)                       |
| GitOps Principle | Declarative configuration and automation for app deployment | [Kubernetes GitOps](https://www.weave.works/technologies/gitops/) |

For further detailed guidance, refer to these resources:

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Charts Repository](https://artifacthub.io/)

> [!important]
> **Warning**
>
> Ensure that you have the necessary access permissions and credentials configured correctly when connecting to private repositories. Misconfigurations may lead to deployment failures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/8cc77adf-c4ad-4120-b179-82d8381eeb4f)**
>
> Watch video content
