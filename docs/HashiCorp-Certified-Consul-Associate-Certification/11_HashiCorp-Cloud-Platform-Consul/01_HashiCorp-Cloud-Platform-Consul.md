# HashiCorp Cloud Platform Consul - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/HashiCorp-Cloud-Platform-Consul/HashiCorp-Cloud-Platform-Consul)

---

## Table of Contents

- HashiCorp Cloud Platform Consul
  - 1. Access the HCP Dashboard
  - 2. Review Your HCP Virtual Network
  - 3. Peer Your AWS VPC
  - 4. Create a Managed Consul Cluster
  - 5. Explore the Cluster Management Interface
  - 6. Download Client Configuration
  - 7. Prepare Your EC2 Instance
  - 8. Validate Membership & Interact with KV
  - Links and References
  - Watch Video
    - 6.1 Inspect config.json
    - 6.2 Inject the Agent ACL Token

---

## Content

HashiCorp Certified: Consul Associate Certification

HashiCorp Cloud Platform Consul

# HashiCorp Cloud Platform Consul

In this guide, you'll learn how to:

- Create and peer an HCP Virtual Network with your AWS VPC
- Deploy a managed Consul cluster on HCP
- Download client configuration and CA certificates
- Join an EC2 instance as a Consul client
- Verify cluster membership and use the Consul KV store

## 1\. Access the HCP Dashboard

Log in to the [HashiCorp Cloud Platform](https://cloud.hashicorp.com/) to get started. From the **Overview** page, you can create managed Consul or Vault clusters.

> [!important]
> **Note**
>
> Consul is GA and available at a low hourly rate for development environments. Vault remains in beta.

![The image shows a dashboard interface for HashiCorp Cloud Platform, featuring options to create Consul and Vault clusters, a cost summary, tutorials, and support contact information.](https://kodekloud.com/kk-media/image/upload/v1752877866/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/hashicorp-cloud-platform-dashboard-interface.jpg)

## 2\. Review Your HCP Virtual Network

Before you deploy Consul, navigate to **HashiCorp Virtual Network** to confirm your network details. In this example:

- Region: `us-west-2`
- CIDR block: `172.25.16.0/20`

![The image shows a HashiCorp Virtual Network interface displaying network details such as the network ID, cloud provider (AWS), region (us-west-2), status (stable), and CIDR block. The sidebar includes options for resources, Consul, Vault, Terraform, and settings.](https://kodekloud.com/kk-media/image/upload/v1752877867/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/hashicorp-virtual-network-interface-details.jpg)

## 3\. Peer Your AWS VPC

Under **Peerings**, review existing connections between your AWS VPC and the HCP Virtual Network:

![The image shows a HashiCorp Virtual Network interface displaying peering connections, with one active connection listed, including details like destination VPC, region, and CIDR block.](https://kodekloud.com/kk-media/image/upload/v1752877868/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/hashicorp-virtual-network-peering-connections.jpg)

To add a new peering:

1.  Click **Create peer and connection**
2.  Enter your AWS Account ID, VPC ID, region, and CIDR block
3.  Submit the request

![The image shows a web interface for creating a peering connection between an Amazon VPC and a HashiCorp Virtual Network, with fields for AWS Account ID, VPC ID, VPC region, and VPC CIDR block. The interface includes options to create or cancel the connection.](https://kodekloud.com/kk-media/image/upload/v1752877870/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/vpc-hashi-corp-peering-interface.jpg)

Then, accept the peering in the AWS console and update your VPC route table to send traffic for `172.25.16.0/20` to the new connection.

> [!important]
> **Note**
>
> Refer to the [AWS VPC Peering documentation](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) when updating route tables.

## 4\. Create a Managed Consul Cluster

With peering in place, navigate to **Consul » Create cluster** and configure:

- **Cluster ID**: A unique name for your cluster
- **Virtual Network**: Select your HCP VNet
- **Tier & Region**: Choose the development tier and target region
- **Public Connectivity**: Enable if you need public API access
- **Consul Version**: Pick the desired version

![The image shows a web interface for creating a Consul cluster on the HashiCorp Cloud Platform, with options for setting a cluster ID, selecting a virtual network, and choosing a consul tier.](https://kodekloud.com/kk-media/image/upload/v1752877871/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/consul-cluster-creation-web-interface.jpg)

Click **Create cluster**. Provisioning usually completes in 5–10 minutes.

## 5\. Explore the Cluster Management Interface

After provisioning, open the cluster dashboard to:

- Generate ACL tokens
- Download client configuration
- Take snapshots or delete the cluster

![The image shows a web interface for managing a Consul cluster, with options for configuration, generating tokens, and accessing documentation. The sidebar includes navigation links for resources like HashiCorp Virtual Network, Vault, and Terraform.](https://kodekloud.com/kk-media/image/upload/v1752877872/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/consul-cluster-management-web-interface.jpg)

Under the **Cluster** tab, view details such as ID, creation date, status, and network assignment:

![The image shows a HashiCorp Cloud Platform interface displaying details of a Consul cluster, including its ID, creation date, status, and assigned network. The cluster is running and is part of the development tier.](https://kodekloud.com/kk-media/image/upload/v1752877873/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-HashiCorp-Cloud-Platform-Consul/hashicorp-cloud-platform-consul-cluster-details.jpg)

## 6\. Download Client Configuration

Click **Download client configuration** to obtain two files:

| File        | Description                  |
| ----------- | ---------------------------- |
| config.json | Consul client agent settings |
| ca.pem      | Certificate Authority (CA)   |

Save both files to use on your EC2 instance.

### 6.1 Inspect `config.json`

Open the file to review settings for ACLs, gossip encryption, datacenter, and retry join:

```
{
  "acl": {
    "enabled": true,
    "down_policy": "async-cache",
    "default_policy": "deny"
  },
  "ca_file": "./ca.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "datacenter": "dc1",
  "encrypt": "q0b43cBhvsbORfN0Qc=",
  "encrypt_verify_incoming": true,
  "encrypt_verify_outgoing": true,
  "server": false,
  "ui": true,
  "retry_join": [
    "consul-cluster.private.consul.11eb0f4c-5d68-49bf-8aa6-0242ac110005.aws.hashicorp.cloud"
  ],
  "auto_encrypt": {
    "tls": true
  }
}
```

### 6.2 Inject the Agent ACL Token

1.  In the HCP console, click **Generate token** under **ACL**.
2.  Copy the **Agent Token**.
3.  Update `config.json` to include the token:

```
{
  "acl": {
    "enabled": true,
    "down_policy": "async-cache",
    "default_policy": "deny",
    "tokens": {
      "agent": "b05a5a39-3885-7712-9bcd-c582c7b92dfb"
    }
  },
  "ca_file": "/etc/consul.d/ca.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "datacenter": "dc1",
  "encrypt": "q0b43cBhvsbORfN0Qc=",
  "encrypt_verify_incoming": true,
  "encrypt_verify_outgoing": true,
  "server": false,
  "ui": true,
  "retry_join": [
    "consul-cluster.private.consul.11eb0f4c-5d68-49bf-8aa6-0242ac110005.aws.hashicorp.cloud"
  ],
  "auto_encrypt": {
    "tls": true
  }
}
```

## 7\. Prepare Your EC2 Instance

On your EC2 host, install Consul and then configure the client:

| Task                           | Command                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| Create config directory        | `sudo mkdir -p /etc/consul.d`                                     |
| Upload `config.json`           | `sudo tee /etc/consul.d/config.json > /dev/null <<EOF ... EOF`    |
| Upload CA certificate `ca.pem` | `sudo tee /etc/consul.d/ca.pem > /dev/null <<EOF ... EOF`         |
| Enable & start Consul service  | `sudo systemctl enable consul && sudo systemctl start consul`     |
| Set CLI authentication token   | `export CONSUL_HTTP_TOKEN="b05a5a39-3885-7712-9bcd-c582c7b92dfb"` |
| Verify cluster membership      | `consul members`                                                  |
| Test KV store                  | `consul kv put app/Bryan Woods`                                   |

> [!important]
> **Warning**
>
> If you encounter errors about invalid ACL keys, ensure `tokens` (not `token`) is under the `"acl"` section and that boolean keys (`encrypt_verify_incoming`, etc.) match the HCP-generated config.

## 8\. Validate Membership & Interact with KV

After starting the Consul agent and exporting the token, run:

```
consul members
```

You should see HCP-managed server nodes along with your EC2 client. Then test the KV store:

```
consul kv put app/Bryan Woods
```

This confirms your EC2 instance is successfully connected to your HCP Consul cluster.

## Links and References

- [HashiCorp Cloud Platform Documentation](https://cloud.hashicorp.com/docs)
- [Consul CLI Reference](https://www.consul.io/docs/commands)
- [AWS VPC Peering Guide](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/3e2d81a3-93d9-4ef5-88ce-6bdacfcae03e/lesson/0f22d382-20df-4ae9-b109-62692f81d571)**
>
> Watch video content
