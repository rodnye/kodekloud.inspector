# Managing clusters with the Linode CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Working-with-Linode/Managing-clusters-with-the-Linode-CLI)

---

## Table of Contents

- Managing clusters with the Linode CLI
  - Prerequisites
  - 1. Install the Linode CLI
  - 2. Configure the CLI
  - 3. List Your LKE Clusters
  - 4. Create a New LKE Cluster
  - 5. Delete an LKE Cluster
  - CLI Command Reference
  - Links and References
  - Watch Video

---

## Content

Linode : Kubernetes Engine

Working with Linode

# Managing clusters with the Linode CLI

Streamline your Kubernetes workflow by using the Linode CLI to provision, list, and delete LKE clusters directly from your terminal. This guide walks you through installation, configuration, and common commands.

## Prerequisites

- Python 3.x and `pip3` installed
- A Linode API Token with **Read/Write** access (create one in the [Linode Cloud Manager](https://cloud.linode.com/profile/tokens))

> [!important]
> **Note**
>
> Make sure your API token includes `lke:read_write` scopes to manage clusters.

---

## 1\. Install the Linode CLI

1.  Verify `pip3` is available:

    ```
    pip3 --version
    ```

2.  Install the Linode CLI package:

    ```
    pip3 install linode-cli
    ```

3.  Confirm the installation:

    ```
    linode-cli --help
    ```

---

## 2\. Configure the CLI

Authenticate the CLI with your token:

```
linode-cli configure --token YOUR_API_TOKEN
```

If you omit `--token`, the CLI launches a browser flow to log in and prompts for region and default Linode type.

---

## 3\. List Your LKE Clusters

Retrieve all existing Kubernetes clusters on your account:

```
linode-cli lke clusters-list
```

If there are no clusters, the output will be an empty array: `[]`.

---

## 4\. Create a New LKE Cluster

Use `linode-cli lke clusters-create` with the following flags:

| Flag            | Description                             | Example                      |
| --------------- | --------------------------------------- | ---------------------------- |
| `--label`       | Unique name for the cluster             | `mycluster-01`               |
| `--region`      | Data center region (e.g., `us-central`) | `us-central`                 |
| `--k8s-version` | Kubernetes version (e.g., `1.23`)       | `1.23`                       |
| `--node-pools`  | Comma-separated pool definitions        | `type=g6-standard-4,count=3` |

Example command:

```
linode-cli lke clusters-create \
  --label mycluster-01 \
  --region us-central \
  --k8s-version 1.23 \
  --node-pools type=g6-standard-4,count=3
```

> [!important]
> **Warning**
>
> If you see an error like `Must be unique`, update `--label` to a name not already in use.

Successful response:

```
id     label           region
61875  mycluster-01    us-central
```

---

## 5\. Delete an LKE Cluster

When you no longer need a cluster, remove it with:

```
linode-cli lke clusters-delete mycluster-01
```

> [!important]
> **Warning**
>
> Deleting a cluster is irreversible and will remove all associated resources.

---

## CLI Command Reference

| Command                                  | Description                     |
| ---------------------------------------- | ------------------------------- |
| `linode-cli lke clusters-list`           | List all LKE clusters           |
| `linode-cli lke clusters-create`         | Create a new Kubernetes cluster |
| `linode-cli lke clusters-delete <label>` | Delete a cluster by label       |

---

## Links and References

- [Linode CLI GitHub Repository](https://github.com/linode/linode-cli)
- [Linode LKE Documentation](https://www.linode.com/docs/products/kubernetes/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/9702fbe2-4321-41c5-87e8-8ea364da097d/lesson/d1fb40b4-a419-4b5e-8e72-750bbb49175a)**
>
> Watch video content
