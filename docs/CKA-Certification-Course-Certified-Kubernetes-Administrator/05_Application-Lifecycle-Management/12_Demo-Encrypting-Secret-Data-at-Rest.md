# Demo Encrypting Secret Data at Rest - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Demo-Encrypting-Secret-Data-at-Rest)

---

## Table of Contents

- Demo Encrypting Secret Data at Rest
  - Creating a Secret Object
  - Viewing the Encoded Secret
  - Inspecting Secret Data in etcd
  - Enabling Encryption at Rest
  - Verifying Encryption
  - Conclusion
  - Additional Resources
  - Watch Video
    - 1. Create an Encryption Configuration File
    - 2. Mount the Encryption Configuration File into the API Server

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Demo Encrypting Secret Data at Rest

In this guide, we explain how to secure secret data in your Kubernetes cluster by enabling encryption at rest. We start by creating secret objects, examine how Kubernetes encodes them in etcd, and then show you how to configure the API server to encrypt these secrets.

---

## Creating a Secret Object

Begin by launching your Kubernetes playground—a single-node cluster running Kubernetes with ContainerD. Kubernetes makes it easy to create secrets from files, literal values, or environment files. Below are some example commands:

```
# Create a secret from all files within a directory:
kubectl create secret generic my-secret --from-file=path/to/bar


# Create a secret using specified keys from files:
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-file=ssh-publickey=path/to/id_rsa.pub


# Create a secret from literal key-value pairs:
kubectl create secret generic my-secret --from-literal=key1=supersecret --from-literal=key2=topsecret


# Create a secret combining a file and a literal:
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-literal=passphrase=topsecret


# Create a secret from environment files:
kubectl create secret generic my-secret --from-env-file=path/to/foo.env --from-env-file=path/to/bar.env
```

Additional options like `--allow-missing-template-keys`, `--append-hash`, and `--dry-run` can further refine your secret creation process.

After the command executes, verify the secret:

```
kubectl create secret generic my-secret --from-literal=key1=supersecret
kubectl get secret my-secret
```

Using the `describe` command provides detailed metadata, including the base64-encoded data:

```
kubectl describe secret my-secret
```

> [!important]
> **Note**
>
> Secret values are base64-encoded by default; they are not encrypted. Avoid pushing secret configuration files containing base64 values to public repositories.

---

## Viewing the Encoded Secret

Kubernetes stores secret values in base64‑encoded format. Retrieve the secret as YAML to inspect its contents:

```
kubectl get secret my-secret -o yaml
```

The output might look like:

```
apiVersion: v1
data:
  key1: c3VwZXJzWmNyZVQ=
kind: Secret
metadata:
  creationTimestamp: "2022-10-24T05:34:13Z"
  name: my-secret
  namespace: default
  resourceVersion: "2111"
  uid: dfe97c62-5aa1-46a8-b71c-ffa0cd4c08ec
type: Opaque
```

To decode the secret value:

```
echo "c3VwZXJzWmNyZVQ=" | base64 --decode
```

This reveals that the stored secret is only encoded, not encrypted, making it potentially accessible to anyone with access to the YAML output or an etcd dump.

---

## Inspecting Secret Data in etcd

etcd is the key-value store where Kubernetes persists cluster data. Without encryption at rest, secret values remain only base64-encoded, allowing anyone with access to etcd to decode them. Use the `etcdctl` client (API version 3) to query etcd:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/my-secret | hexdump -C
```

Before running the above command, ensure that the `etcdctl` client is installed. On Ubuntu, install it using:

```
apt-get install etcd-client
```

Verify the installation:

```
etcdctl
```

Also, check that your control plane node can access the necessary certificate files:

```
ls /etc/kubernetes/pki/etcd/ca.crt
```

The hexdump output will display the raw data, illustrating that without encryption, the secret’s value is visible within etcd.

---

## Enabling Encryption at Rest

To protect sensitive data stored in etcd, Kubernetes offers an encryption at rest mechanism using an encryption provider configuration. First, verify if encryption is enabled by checking the kube-apiserver process:

```
ps -aux | grep kube-api | grep "encryption-provider-config"
```

If no configuration is found, follow these steps:

### 1\. Create an Encryption Configuration File

Generate a random 32-byte key (base64-encoded) with:

```
head -c 32 /dev/urandom | base64
```

Next, create a YAML file (e.g., `enc.yaml`) with the following content (replace the sample key with your generated key):

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
            secret: y0xTt+U6xgRdNxe4nDYYsijOGgRDoUYC+wAwOKeNfPs=  # Replace with your generated key
    - identity: {}
```

Review the file to ensure accuracy:

```
cat enc.yaml
```

### 2\. Mount the Encryption Configuration File into the API Server

Next, incorporate the configuration into the kube-apiserver by performing these steps:

1.  Move the encryption configuration file to a secure directory:

    ```
    mkdir -p /etc/kubernetes/enc
    mv enc.yaml /etc/kubernetes/enc/
    ```

2.  Modify the kube-apiserver manifest (found at `/etc/kubernetes/manifests/kube-apiserver.yaml`) by adding the `--encryption-provider-config` flag. Include a new volume and volume mount for the `/etc/kubernetes/enc` directory. For example:

    ```
    spec:
      containers:
      - command:
        - kube-apiserver
        # ... other flags ...
        - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml
        volumeMounts:
          # ... other volume mounts ...
          - name: enc
            mountPath: /etc/kubernetes/enc
            readOnly: true
      volumes:
        # ... other volumes ...
        - name: enc
          hostPath:
            path: /etc/kubernetes/enc
            type: DirectoryOrCreate
    ```

After saving the changes, the kube-apiserver will restart and begin using the new encryption configuration.

---

## Verifying Encryption

Once encryption is activated, any new secret you create will be encrypted at rest. Create a new secret:

```
kubectl create secret generic my-secret-2 --from-literal=key2=topsecret
```

Verify the secret's creation:

```
kubectl get secret
```

Then inspect etcd to ensure the secret’s value is encrypted:

```
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/default/my-secret-2 | hexdump -C
```

You should observe that the secret’s data no longer appears in plain text. Remember, secrets created before enabling encryption remain unencrypted until updated. To re-encrypt existing secrets, use:

```
kubectl get secret --all-namespaces -o json | kubectl replace -f -
```

Then confirm that the secrets in etcd are now encrypted.

> [!important]
> **Best Practice**
>
> Always update your existing secrets after enabling encryption at rest to ensure full protection of sensitive data.

---

## Conclusion

This guide demonstrated how Kubernetes handles secret data by showing that, by default, secrets are only base64-encoded—not encrypted—in etcd. We then detailed the process for enabling encryption at rest: creating an encryption configuration file, mounting it into the API server, and verifying that new secrets store their data securely. By following these steps, you can significantly enhance the security posture of your Kubernetes cluster.

Happy encrypting!

---

## Additional Resources

| Resource              | Description                                 | Example Command / Link                                                                                   |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Kubernetes Secrets    | Official documentation on secrets           | [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)                          |
| etcd Documentation    | Information on etcd and its usage           | [etcd Documentation](https://etcd.io/docs/)                                                              |
| Kubernetes API Server | Details on configuring kube-apiserver flags | [Kube-apiserver Docs](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) |

For further reading on securing your Kubernetes environment, consider consulting the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/4abaab5a-b18a-45a4-b969-2f2251a54375)**
>
> Watch video content
