# Demo Encrypting Secret Data at Rest - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Demo-Encrypting-Secret-Data-at-Rest)

---

## Table of Contents

- Demo Encrypting Secret Data at Rest
  - 1. Creating a Secret in Kubernetes
  - 2. Inspecting Secrets in etcd
  - 3. Installing and Running etcdctl
  - 4. Verifying etcd Data for Your Secrets
  - 5. Determining if Encryption at Rest Is Enabled
  - 6. Configuring Encryption at Rest
  - 7. Updating the Kube API Server Manifest
  - 8. Verifying Encryption of New Secrets
  - 9. Conclusion
  - Watch Video
    - Viewing Unencrypted Data via etcdctl

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Demo Encrypting Secret Data at Rest

In this guide, you'll learn how to secure secret data at rest in Kubernetes by encrypting it inside the etcd datastore. We cover creating secret objects, inspecting their base64-encoded storage, and finally enabling encryption at rest through an encryption configuration. This step-by-step process helps ensure that confidential information remains protected even if someone gains access to your etcd datastore.

---

## 1\. Creating a Secret in Kubernetes

Begin by launching your single-node Kubernetes playground built with Kubernetes and ContainerD. Open your terminal to create a secret object using various methods. Here are several examples:

```
# Create a new secret named my-secret by loading files from a directory
kubectl create secret generic my-secret --from-file=path/to/bar


# Create a secret with specified keys taken from disk files
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-file=ssh-publickey=path/to/id_rsa.pub


# Create a secret with literal values for keys
kubectl create secret generic my-secret --from-literal=key1=supersecret --from-literal=key2=topsecret


# Create a secret using a combination of a file and a literal value
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-literal=passphrase=topsecret


# Create a secret from environment files
kubectl create secret generic my-secret --from-env-file=path/to/foo.env --from-env-file=path/to/bar.env
```

Additional customization options include:

- `--allow-missing-template-keys=true`
- `--append-hash=false`
- `--dry-run='none'`

After creating the secret, verify its existence with:

```
controlplane ~ ➜ kubectl create secret generic my-secret --from-literal=key1=supersecret
secret/my-secret created


controlplane ~ ➜ kubectl get secret
NAME        TYPE    DATA   AGE
my-secret   Opaque  1      5s
```

To inspect the secret details:

```
controlplane ~ ➜ kubectl describe secret my-secret
Name:         my-secret
Namespace:    default
Labels:       <none>
Annotations:  <none>


Type: Opaque


Data
====
key1:  11 bytes
```

And view its YAML representation:

```
controlplane ~ ➜ kubectl get secret my-secret -o yaml
apiVersion: v1
data:
  key1: C3VwZXJzZWNyZQ==
kind: Secret
metadata:
  creationTimestamp: "2022-10-24T05:34:13Z"
  name: my-secret
  namespace: default
  resourceVersion: "2111"
  uid: dfe97062-5aa1-46a8-b71c-ffa0cd4c08ec
type: Opaque
```

Notice that the secret data is stored using Base64 encoding. For example:

```
controlplane ~ → kubectl get secret my-secret -o yaml
apiVersion: v1
data:
  key1: c3VwZXJzZW5yZXQ=
kind: Secret
metadata:
  creationTimestamp: "2022-10-24T05:34:13Z"
  name: my-secret
  namespace: default
  resourceVersion: "2111"
  uid: dfe97c62-5aa1-46a8-b71c-ffa0cd4c08ec
type: Opaque


controlplane ~ → echo "c3VwZXJzZW5yZXQ=" | base64 --decode
supersecret
controlplane ~ →
```

This demonstrates that anyone with access to the secret manifest can decode the data.

> [!important]
> **Warning**
>
> Storing secrets in base64 does not provide true security. Without encryption at rest, confidential data can be exposed by anyone with direct access to the etcd datastore.

---

## 2\. Inspecting Secrets in etcd

Now, explore how Kubernetes stores secret data in etcd. The secret data is persisted under paths such as `/registry/secrets/default/secret1`.

### Viewing Unencrypted Data via etcdctl

You can use the `etcdctl` client (with API version 3) to view raw data stored in etcd. For example, run the following command:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/secret1 | hexdump -C
```

A sample output might be:

```
2f 72 65 67 69 73 74 72 79 2f 73 65 63 72 65 74  |/registry/secret|
31 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  |1..............|
31 2e 6b 38 73 73 73 73 73 73 73 73 73 73 73 73  |1.k8sssssssssss...|
06 2f 76 31                                     |./v1|
```

Running the command with the secret key from our object yields similar unencrypted output, which clearly demonstrates that secret data (i.e., the password "supersecret") is stored without encryption. Anybody with etcd access and the appropriate certificates can retrieve and decode this information.

---

## 3\. Installing and Running etcdctl

If you encounter a missing `etcdctl` command, install it using your package manager. For Ubuntu users:

```
controlplane ~ ➜ etcdctl
-bash: etcdctl: command not found


controlplane ~ ✗ apt-get install etcd-client
Reading package lists... Done
Building dependency tree
...
Setting up etcd-client (3.2.26+dfsg-6) ...
```

After installation, running `etcdctl` displays usage information along with a relevant warning regarding the API version:

```
controlplane ~ ➜ etcdctl
NAME:
       etcdctl - A simple command line client for etcd.


WARNING:
       Environment variable ETCDCTL_API is not set; defaults to etcdctl v2.
       Set environment variable ETCDCTL_API=3 to use v3 API or ETCDCTL_API=2 to use v2 API.
```

---

## 4\. Verifying etcd Data for Your Secrets

Ensure your Kubernetes cluster contains the necessary certificate files, such as `/etc/kubernetes/pki/etcd/ca.crt`. Then inspect the raw secrets stored in etcd using:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/my-secret | hexdump -C
```

This unencrypted output verifies the vulnerability—anyone with etcd access can read the confidential data.

---

## 5\. Determining if Encryption at Rest Is Enabled

Before proceeding further, confirm that the Kube API server is configured with an encryption provider. Check for the `--encryption-provider-config` flag in the process arguments or in the API server manifest file. If the flag is absent, you must enable encryption at rest for your secrets.

![The image shows a Kubernetes documentation page about configuring and determining encryption at rest, including a caution for high-availability configurations.](https://kodekloud.com/kk-media/image/upload/v1752871637/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Demo-Encrypting-Secret-Data-at-Rest/frame_420.jpg)

---

## 6\. Configuring Encryption at Rest

To secure your secret data at rest, create an encryption configuration file that specifies which resources to encrypt and which encryption providers to use. Create a file named "enc.yaml" with the following content:

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
            secret: y0xTt+U6xgRdNxe4nDYYsij0GgRDoUYc+wAwOKeNfPs=
    - identity: {}
```

Key points in this configuration:

- The resource targeted for encryption is `secrets`.
- The first provider uses the AES-CBC algorithm. Its key must be a base64-encoded 32-byte value (generate one with the command below if needed).
- The `identity` provider acts as a fallback and will not encrypt data. Its placement after the AES-CBC provider ensures new secrets are encrypted.

Generate a key if needed:

```
head -c 32 /dev/urandom | base64
```

Save the generated content into the file `enc.yaml`.

---

## 7\. Updating the Kube API Server Manifest

To apply the encryption configuration, update the Kube API server manifest with the new encryption file reference. Follow these steps:

1.  Create a local directory to store the encryption file (e.g., `/etc/kubernetes/enc`).
2.  Move `enc.yaml` into this directory:

    ```
    mkdir /etc/kubernetes/enc
    mv enc.yaml /etc/kubernetes/enc/
    ```

3.  Modify the Kube API server manifest (typically found at `/etc/kubernetes/manifests/kube-apiserver.yaml`) to include a new volume mount and add the `--encryption-provider-config` flag. An example snippet is as follows:

    ```
    spec:
      containers:
      - command:
        - kube-apiserver
        ...
        - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml
      volumeMounts:
        ...
        - name: enc
          mountPath: /etc/kubernetes/enc
          readOnly: true
      volumes:
        ...
        - name: enc
          hostPath:
            path: /etc/kubernetes/enc
            type: DirectoryOrCreate
    ```

4.  Save your changes. The API server will restart and load the new configuration. Verify the running process with:

    ```
    ps aux | grep kube-api
    ```

Ensure that the `--encryption-provider-config` flag is present and references the correct path.

---

## 8\. Verifying Encryption of New Secrets

Once encryption is enabled, Kubernetes will encrypt all new secret objects in etcd. To test this, create a new secret:

```
kubectl create secret generic my-secret-2 --from-literal=key2=topsecret
```

Verify its creation:

```
controlplane ~ ➜ kubectl get secret
NAME          TYPE     DATA   AGE
my-secret     Opaque   1      16m
my-secret-2   Opaque   1      3s
```

Then inspect the secret data in etcd:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/my-secret-2 | hexdump -C
```

You should no longer see the plain text value "topsecret" in the output, confirming that the data is now encrypted.

To update and re-encrypt pre-existing secrets, run:

```
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

This command re-writes each secret so that they are encrypted using the new configuration.

---

## 9\. Conclusion

In this guide, we demonstrated how Kubernetes stores secret data as base64‑encoded strings in etcd, highlighting the vulnerabilities of unencrypted data. We then enabled encryption at rest by creating an encryption configuration file, updating the Kube API server manifest, and subsequently verifying that both new and updated secrets are securely encrypted. Following these steps is essential to protect critical data from unauthorized access.

Thank you for reading this guide on encrypting secret data at rest in Kubernetes. For further details, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/cbace715-77f8-4f42-8141-dab7052585c6)**
>
> Watch video content
