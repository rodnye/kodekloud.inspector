# Demo Encrypting Secret Data at Rest - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Demo-Encrypting-Secret-Data-at-Rest)

---

## Table of Contents

- Demo Encrypting Secret Data at Rest
  - Creating a Secret Object
  - Inspecting Secret Data in etcd
  - Configuring Encryption at Rest
  - Verifying Encryption
  - Summary
  - Watch Video
    - Encryption Configuration File
    - Updating the Kube API Server Manifest

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Demo Encrypting Secret Data at Rest

In this guide, you will learn how to encrypt secret data at rest in Kubernetes. Based on the [official Kubernetes documentation](https://kubernetes.io/docs/), this tutorial walks you through the storage of secret objects, inspecting them in etcd, and configuring encryption at rest to secure sensitive data.

---

In the beginning, launch a Kubernetes playground running a single-node cluster based on Kubernetes and ContainerD.

![The image shows a Kubernetes documentation table comparing encryption methods, detailing their strength, speed, key length, and considerations.](https://kodekloud.com/kk-media/image/upload/v1752871132/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Demo-Encrypting-Secret-Data-at-Rest/frame_20.jpg)

Once the playground is up, open the terminal.

![The image shows a KodeKloud Kubernetes Playground interface with instructions and a terminal for practicing Kubernetes commands.](https://kodekloud.com/kk-media/image/upload/v1752871133/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Demo-Encrypting-Secret-Data-at-Rest/frame_40.jpg)

---

## Creating a Secret Object

Kubernetes secrets help to store sensitive data such as passwords, tokens, or keys. There are multiple methods to create a secret object, including from files, literals, or environment variable files. Below are some examples:

```
# Create a new secret named "my-secret" from files in folder "bar"
kubectl create secret generic my-secret --from-file=path/to/bar

# Create a secret with specified keys from files rather than using disk filenames as keys
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-file=ssh-publickey=path/to/id_rsa.pub

# Create a secret with literal key-value pairs
kubectl create secret generic my-secret --from-literal=key1=supersecret --from-literal=key2=topsecret

# Create a secret using a combination of a file and a literal value
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-literal=passphrase=topsecret

# Create a secret from environment variable files
kubectl create secret generic my-secret --from-env-file=path/to/foo.env --from-env-file=path/to/bar.env
```

Additional options include:

- **\--allow-missing-template-keys=true:** Ignores errors in templates if fields or keys are missing.
- **\--append-hash=false:** Appends a hash of the secret to its name.
- **\--dry-run:** Specify "none", "server", or "client" to perform a dry run or see what object would be sent.

For this demonstration, a secret is created with a literal value:

```
kubectl create secret generic my-secret --from-literal=key1=supersecret
```

The output confirms the creation:

```
secret/my-secret created

# Listing the secret
kubectl get secret
NAME        TYPE      DATA   AGE
my-secret   Opaque    1      5s
```

You can inspect the secret details with:

```
kubectl describe secret my-secret
```

To view the secret in YAML format, use:

```
kubectl get secret my-secret -o yaml
```

Example YAML output:

```
apiVersion: v1
data:
  key1: c3VwZXJzZWNyZXQ=
kind: Secret
metadata:
  creationTimestamp: "2022-10-24T05:34:13Z"
  name: my-secret
  namespace: default
  resourceVersion: "2111"
  uid: dfe97c62-5aa1-46a8-b71c-ffa0cd4c08ec
type: Opaque
```

If you decode the base64-encoded value, you will obtain the cleartext secret:

```
echo "c3VwZXJzZWNyZXQ=" | base64 --decode
```

Output:

```
supersecret
```

> [!important]
> **Important**
>
> Because secrets are stored as base64 encoded plaintext, anyone with access to etcd can decode and view them. Avoid storing secret definition files in public repositories without further protection.

---

## Inspecting Secret Data in etcd

Next, examine how Kubernetes stores secrets in etcd, where the data is kept unencrypted by default. To inspect the stored secrets, use the etcdctl utility with API version 3.

1.  Start by verifying that etcd is running on your cluster:

    ```
    kubectl get pods -n kube-system
    ```

    You should see an etcd pod (for example, "etcd-controlplane").

2.  Confirm the existence of the certificate file:

    ```
    ls /etc/kubernetes/pki/etcd/ca.crt
    ```

3.  If etcdctl is not installed, install it using:

    ```
    apt-get install etcd-client
    ```

4.  Set the ETCDCTL_API to version 3 and check the etcdctl version:

    ```
    etcdctl
    ```

5.  Retrieve and inspect your secret stored in etcd. Adjust the key path to match your secret (e.g., "my-secret"):

    ```
    ETCDCTL_API=3 etcdctl \
      --cacert=/etc/kubernetes/pki/etcd/ca.crt \
      --cert=/etc/kubernetes/pki/etcd/server.crt \
      --key=/etc/kubernetes/pki/etcd/server.key \
      get /registry/secrets/default/my-secret | hexdump -C
    ```

The output will display a hex dump showing the secret fields, including the cleartext value ("supersecret"), confirming that etcd stores the data unencrypted.

---

## Configuring Encryption at Rest

To secure secret data, enable encryption at rest in etcd. Begin by verifying whether encryption is already configured in your cluster. Check the Kube API server for the "encryption-provider-config" flag:

```
ps -aux | grep kube-api | grep "encryption-provider-config"
```

If no output is returned, encryption is not yet enabled.

1.  Inspect the API server manifest, typically located in:

    ```
    ls /etc/kubernetes/manifests/
    ```

2.  Open the kube-apiserver manifest:

    ```
    vi /etc/kubernetes/manifests/kube-apiserver.yaml
    ```

Since encryption is missing from the configuration, create an encryption configuration file and update the kube-apiserver manifest accordingly.

### Encryption Configuration File

Create a YAML file (for example, `enc.yaml`) with the following content. This configuration specifies that secret objects will be encrypted using the AESCBC provider:

```
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: INSERT_BASE64_ENCODED_32_BYTE_KEY_HERE
      - identity: {}
```

Generate a 32-byte random key and encode it in base64 using:

```
head -c 32 /dev/urandom | base64
```

Replace `INSERT_BASE64_ENCODED_32_BYTE_KEY_HERE` with the generated key. Move the `enc.yaml` file to your control plane node:

```
mkdir -p /etc/kubernetes/enc
mv enc.yaml /etc/kubernetes/enc/
```

### Updating the Kube API Server Manifest

Edit the kube-apiserver manifest (`/etc/kubernetes/manifests/kube-apiserver.yaml`) to apply the encryption configuration:

1.  Append the following flag to reference the encryption configuration file:

    ```
    - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml
    ```

2.  Under the `volumeMounts` section of the kube-apiserver container, add:

    ```
    - name: enc
      mountPath: /etc/kubernetes/enc
      readOnly: true
    ```

3.  Under the `volumes` section, add a hostPath volume:

    ```
    - name: enc
      hostPath:
        path: /etc/kubernetes/enc
        type: DirectoryOrCreate
    ```

A simplified excerpt of the manifest changes:

```
spec:
  containers:
    - name: kube-apiserver
      command:
        - kube-apiserver
        - --advertise-address=10.6.118.3
        # ... other flags ...
        - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml
      volumeMounts:
        # ... existing volume mounts ...
        - name: enc
          mountPath: /etc/kubernetes/enc
          readOnly: true
  volumes:
    # ... existing volumes ...
    - name: enc
      hostPath:
        path: /etc/kubernetes/enc
        type: DirectoryOrCreate
```

After saving your changes, the kube-apiserver will automatically restart and apply the new encryption settings.

---

## Verifying Encryption

Once the API server has restarted with the new encryption configuration, create a new secret so it will be encrypted on write:

```
kubectl create secret generic my-secret-2 --from-literal=key2=topsecret
```

Verify that the secret is created:

```
kubectl get secret
NAME          TYPE    DATA   AGE
my-secret     Opaque  1      16m
my-secret-2   Opaque  1      3s
```

Now, inspect the new secret in etcd:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/my-secret-2 | hexdump -C
```

The output will confirm that the secret value ("topsecret") is no longer plainly visible because it is now encrypted.

> [!important]
> **Existing Secrets**
>
> Note that secrets created before enabling encryption remain unencrypted until updated. To re-encrypt these, fetch and replace them without modifying the data:
>
> ```
> kubectl get secrets --all-namespaces -o json | kubectl replace -f -
> ```

---

## Summary

This article demonstrated how to:

1.  Create and inspect Kubernetes secrets.
2.  Verify that secrets are stored in etcd as base64-encoded plaintext.
3.  Enable encryption at rest by creating an encryption configuration file.
4.  Update the kube-apiserver manifest to integrate the encryption config.
5.  Confirm that new secrets are encrypted and secure in etcd.

Encrypting secret data at rest is essential for protecting sensitive information from unauthorized access. Remember that encryption applies only to future changes unless existing secrets are updated.

Thank you for following this guide on encrypting Kubernetes secrets at rest!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/1d117b1c-8f6d-4aa2-a012-db396e38ce09)**
>
> Watch video content
