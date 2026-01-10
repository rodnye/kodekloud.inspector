# External DNS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Ingress/External-DNS-Overview)

---

## Table of Contents

- External DNS Overview
  - Key Features
  - Architecture Scenarios
  - Installation
  - Deployment Configuration
  - Security, Authentication & Advanced Options
  - Configuring Application Resources
  - Links and References
  - Watch Video
    - General Arguments
    - Example: LoadBalancer Service

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Ingress

# External DNS Overview

The Kubernetes DNS system enables services and pods to discover one another via in-cluster lookups. When you expose applications to the public internet, managing DNS records manually can become error-prone. ExternalDNS automates this process by synchronizing Kubernetes Services and Ingresses with your DNS provider—AWS Route 53, Cloudflare, Google Cloud DNS, and more.

![The image is an infographic explaining the features of ExternalDNS, highlighting its capabilities in automating DNS record synchronization, interacting with DNS providers, dynamically updating records, ensuring external access via domain names, and adjusting records automatically.](https://kodekloud.com/kk-media/image/upload/v1752880302/notes-assets/images/Kubernetes-Networking-Deep-Dive-External-DNS-Overview/external-dns-features-infographic.jpg)

ExternalDNS continuously watches for Kubernetes resource changes. When a Service or Ingress is created, updated, or deleted, it will create, update, or remove the corresponding DNS records, ensuring your applications remain reachable even as IP addresses shift.

![The image illustrates the concept of ExternalDNS for Kubernetes, showing the connection between a Kubernetes cluster and a DNS service, mapping an IP address to a domain name.](https://kodekloud.com/kk-media/image/upload/v1752880302/notes-assets/images/Kubernetes-Networking-Deep-Dive-External-DNS-Overview/external-dns-kubernetes-connection-diagram.jpg)

## Key Features

1.  **Dynamic DNS Updates**  
    Reacts in real time to scaling events, rolling updates, or resource deletions—keeping DNS entries accurate without manual steps.
2.  **Flexibility & Control**
    - Manages DNS for LoadBalancer, NodePort, ClusterIP, and headless Services, as well as Ingress resources.
    - Use annotation-based filters or custom FQDN templates to target specific records.
    - Optionally ignore selected resources using annotation rules.

3.  **Broad Provider Compatibility**  
    ExternalDNS integrates with the most popular DNS services, making it ideal for hybrid and multi-cloud deployments.

    | DNS Provider        | Use Case                 | Example Flag              |
    | ------------------- | ------------------------ | ------------------------- |
    | AWS Route 53        | Public zones on AWS      | `--provider=aws`          |
    | Google Cloud DNS    | GCP-managed domains      | `--provider=google`       |
    | Azure DNS           | Azure public DNS zones   | `--provider=azure`        |
    | Cloudflare          | External DNS management  | `--provider=cloudflare`   |
    | DigitalOcean DNS    | DO-managed domains       | `--provider=digitalocean` |
    | NS1, Infoblox, etc. | Enterprise DNS solutions | `--provider=<name>`       |

![The image highlights key features of a DNS management service, including dynamic DNS updates, wide DNS provider support, and flexibility, with compatibility across various platforms like AWS Route 53, Google Cloud DNS, and Cloudflare.](https://kodekloud.com/kk-media/image/upload/v1752880304/notes-assets/images/Kubernetes-Networking-Deep-Dive-External-DNS-Overview/dns-management-service-features-diagram.jpg)

## Architecture Scenarios

- **LoadBalancer**  
  In cloud environments (AWS, GCP, Azure), ExternalDNS creates DNS A/AAAA records pointing to provisioned external IPs.
- **NodePort / ClusterIP**  
  Map DNS to node IPs plus NodePorts, or manage ClusterIP entries—even if they’re only internally routable.
- **Headless Services**  
  Assign stable DNS names to individual pod IPs (e.g., for Kafka or other stateful sets).

## Installation

Add the ExternalDNS Helm chart and update:

```
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
helm repo update
```

> [!important]
> **Warning**
>
> Ensure your cloud IAM role or API credentials have permissions to create and modify DNS records. See [ExternalDNS GitHub](https://github.com/kubernetes-sigs/external-dns) for provider-specific requirements.

Install with Helm, replacing `provider` and provider-specific settings as needed:

```
helm install external-dns external-dns/external-dns \
  --namespace kube-system \
  --set provider=aws \
  --set aws.zoneType=public
```

> [!important]
> **Note**
>
> You can also install ExternalDNS by applying a plain Kubernetes Deployment manifest—ideal for GitOps workflows.

## Deployment Configuration

Below is a sample `Deployment` manifest. Adjust `args` to fit your environment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: external-dns
  namespace: kube-system
spec:
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: external-dns
  template:
    metadata:
      labels:
        app: external-dns
    spec:
      serviceAccountName: external-dns
      containers:
      - name: external-dns
        image: registry.k8s.io/external-dns/external-dns:v0.13.7
        args:
        - --source=service
        - --source=ingress
        - --provider=aws
        - --registry=txt
        - --txt-owner-id=my-cluster
```

### General Arguments

- `--source` (service, ingress)
- `--namespace` (limit scope)
- `--provider` (aws, google, azure, cloudflare, etc.)
- `--policy` (sync or create-only)
- `--domain-filter` (restrict to specific domains)

![The image shows a person working on a laptop with a list of configuration arguments divided into "General Arguments" and "DNS Provider Arguments." The arguments include options like source, namespace, provider, policy, domain-filter, and provider-specific settings.](https://kodekloud.com/kk-media/image/upload/v1752880305/notes-assets/images/Kubernetes-Networking-Deep-Dive-External-DNS-Overview/laptop-configuration-arguments-list.jpg)

## Security, Authentication & Advanced Options

- `--registry` (txt, aws-tags)
- `--txt-owner-id` (unique TXT record owner)
- `--annotation-filter` (manage only annotated resources)
- `--fqdn-template` (custom FQDN generation)

![The image shows an illustration of a person working on a laptop with a list of configuration arguments related to "Security and Authentication" and "Advanced" settings. The background includes gears and a code symbol, suggesting a tech or programming context.](https://kodekloud.com/kk-media/image/upload/v1752880306/notes-assets/images/Kubernetes-Networking-Deep-Dive-External-DNS-Overview/person-laptop-security-authentication-illustration.jpg)

## Configuring Application Resources

ExternalDNS discovers resources via annotations. Add these under `metadata` in your Service or Ingress:

```
# Basic Annotations
external-dns.alpha.kubernetes.io/hostname: example.com
external-dns.alpha.kubernetes.io/ttl: "3600"


# Advanced Annotations
external-dns.alpha.kubernetes.io/target: 192.168.0.5
external-dns.alpha.kubernetes.io/scope: global
```

### Example: LoadBalancer Service

```
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    external-dns.alpha.kubernetes.io/hostname: myservice.example.com
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
```

When this Service deploys, ExternalDNS will automatically create and maintain the DNS record `myservice.example.com`, updating it if the external IP changes.

---

Now that you’ve explored ExternalDNS’s features, installation methods, and resource configuration, you’re ready to automate public DNS management for your Kubernetes workloads.

## Links and References

- [ExternalDNS GitHub Repository](https://github.com/kubernetes-sigs/external-dns)
- [Kubernetes Concepts: Services and Ingress](https://kubernetes.io/docs/concepts/services-networking/)
- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [Cloudflare DNS Overview](https://developers.cloudflare.com/dns/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/68679b92-4a55-420a-9301-4de19d296c91)**
>
> Watch video content
