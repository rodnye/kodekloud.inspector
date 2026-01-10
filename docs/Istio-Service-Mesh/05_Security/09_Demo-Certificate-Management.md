# Demo Certificate Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Security/Demo-Certificate-Management)

---

## Table of Contents

- Demo Certificate Management
  - Generating the Root Certificate
  - Creating Intermediate Certificates
  - Preparing the Cluster for Custom Certificates
  - Installing Istio with Custom Certificates
  - Deploying a Policy for Mutual TLS
  - Verifying Certificate Chains
  - Watch Video
  - Practice Lab

---

## Content

Istio Service Mesh

Security

# Demo Certificate Management

This guide demonstrates how to configure Istio to use a custom root certificate for your cluster. Follow the steps below to generate your own certificate authority (CA) and integrate it with Istio for enhanced security and trust in your service mesh.

---

## Generating the Root Certificate

Begin by creating a directory for your certificates in the Istio root directory. In this example, we use "ca-certs". Then navigate into the new directory:

```
mkdir ca-certs
cd ca-certs
```

Generate your root certificate by running the following command. This process creates four files:

- **root-ca.conf**: OpenSSL configuration file used for generating the root certificate.
- **root-cert.csr**: Certificate Signing Request (CSR) for the root certificate.
- **root-cert.pem**: The root certificate.
- **root-key.pem**: The private key associated with the root certificate.

```
make -f ../tools/certs/Makefile.selfsigned.mk root-ca
```

A sample output may look like this:

```
istiotraining@local ~/istio-1.10.3 $ mkdir ca-certs
istiotraining@local ~/istio-1.10.3 $ cd ca-certs/
istiotraining@local ca-certs $ make -f ../tools/certs/Makefile.selfsigned.mk root-ca
generating root-key.pem
Generating RSA private key, 4096 bit long modulus
..................................................................................................................++
e is 65537 (0x10001)
generating root-cert.csr
generating root-cert.pem
Signature ok
subject=/O=Istio/CN=Root CA
Getting Private key
istiotraining@local ca-certs $ ls
```

Below is an alternative sample that shows all generated files:

```
mkdir ca-certs
cd ca-certs/
make -f ./tools/certs/Makefile.selfsigned.mk root-ca
generating root-key.pem
Generating RSA private key, 4096 bit long modulus
............................+++
e is 65537 (0x10001)
generating root-cert.csr
generating root-cert.pem
Signature ok
subject=/O=Istio/CN=Root CA
Getting Private key
ls
# Output:
# root-ca.conf  root-cert.csr  root-cert.pem  root-key.pem
```

---

## Creating Intermediate Certificates

> [!important]
> **Best Practice**
>
> It is not recommended to use the root certificate directly for workload authentication. Instead, generate intermediate certificates to enhance security and ease certificate revocation.

Generate the intermediate certificates by running the following command. This creates an intermediate Certificate Authority (CA) for your cluster under the "localcluster" directory. The following files are produced:

- **cluster-ca.csr**: CSR for the intermediate CA.
- **ca-cert.pem**: Certificate for the intermediate CA.
- **ca-chain.pem**: The full certificate chain.

Intermediate input and temporary files are stored in the localcluster directory and later cleaned up.

```
make -f ./tools/certs/Makefile.selfsigned.mk localcluster-cacerts
```

Sample output:

```
Generating RSA private key, 4096 bit long modulus
..................................................++
e is 65537 (0x10001)
generating localcluster/cluster-ca.csr
generating localcluster/ca-cert.pem
Signature ok
subject=/O=Istio/CN=Intermediate CA/L=localcluster
Getting CA Private Key
generating localcluster/ca-chain.pem
Intermediate inputs stored in localcluster/
done
rm localcluster/cluster-ca.csr localcluster/intermediate.conf
istiotraining@local ca-certs $ cd localcluster
istiotraining@local localcluster $ lsa
-bash: lsa: command not found
```

---

## Preparing the Cluster for Custom Certificates

Before proceeding, remove any pre-installed Istio resources to avoid conflicts. Delete the Istio system namespace if it exists or start with a fresh cluster. For example:

```
kubectl delete namespace istio-system
# Example output:
# namespace "istio-system" deleted
```

Optionally, clean up the default namespace by navigating to the samples directory as needed:

```
cd ..
cd ca-certs
cd ..
./samples/
```

Next, recreate the Istio system namespace and create a secret that stores all your generated certificates. For instance:

```
kubectl delete namespace istio-system
cd ..
./samples/bookinfo/platform/kube/cleanup.sh
```

The cleanup script removes all related Bookinfo resources:

```
using NAMESPACE=default
destinationrule.networking.istio.io "details" deleted
destinationrule.networking.istio.io "productpage" deleted
destinationrule.networking.istio.io "ratings" deleted
destinationrule.networking.istio.io "reviews" deleted
virtualservice.networking.istio.io "bookinfo-gateway" deleted
...
```

---

## Installing Istio with Custom Certificates

Reinstall Istio so that the certificate authority loads the certificates and keys from the secret-mounted files. Run the following command:

```
istioctl install --set profile=demo
```

You will see output confirming that Istio installs the core components, including Istiod, Ingress, and Egress gateways:

```
This will install the Istio 1.10.3 demo profile with ["Istio core" "Istiod" "Ingress gateways" "Egress gateways"] components into the cluster. Proceed? (y/N) y
✔ Istio core installed
✔ Istiod installed
Processing resources for Egress gateways, Ingress gateways. Waiting for Deployment/istio-system/istio-egressgateway, Deployment/istio-...
```

You can also deploy additional add-ons such as Kiali, Grafana, and Prometheus. For example:

```
istioctl install --set profile=demo
# Follow prompts and installation confirmations.
...
kubectl apply -f samples/addons
```

If the path "samples/addons" does not exist in your current directory, navigate appropriately:

```
cd
cd ca-certs
cd ..
kubectl apply -f samples/addons
```

Optionally, deploy the Bookinfo application and apply default traffic rules:

```
kubectl rollout status deployment/kiali -n istio-system
# Waiting for the Kiali deployment to become ready...
```

---

## Deploying a Policy for Mutual TLS

Enforce a policy so that workloads accept only mutual TLS traffic. Ensure the Bookinfo application is running before applying the policy. After about 15 seconds, verify that the workloads are using the specified certificates:

```
kubectl exec "$(kubectl get pod -l app=details -o jsonpath='{.items[0].metadata.name}')" -c istio-proxy -- curl -s localhost:9080
```

The sample output below might indicate a connection refusal, which is expected until the policies are fully in place:

```
144010290259468:error:2000206f:system library:connect:Connection refused:../crypto/bio/b_sock2.c:110:
144010290259468:error:2008a0c1:BIO routines:BIO_connect:error:../crypto/bio/b_sock2.c:111:
command terminated with exit code 1
```

You can check the status of all pods with:

```
kubectl get pods
```

Sample output when all pods are running:

```
NAME                                   READY   STATUS    RESTARTS   AGE
details-v1-79f77b4b9-tdp8v            2/2     Running   0          50s
productpage-v1-67b467c4c-qrzjk        2/2     Running   0          49s
ratings-v1-b6994bb-mbjzr              2/2     Running   0          49s
reviews-v1-653db7799-dpk5m            2/2     Running   0          50s
reviews-v2-7bf8c9648f-hmrwx           2/2     Running   0          50s
reviews-v3-84779c7bbc-w2gx            2/2     Running   0          49s
```

If the command is run too early, you might see some pods still initializing:

```
kubectl get pods
```

Alternate sample output:

```
NAME                              READY   STATUS            RESTARTS   AGE
details-v1-79f774bd9-18nrf6      1/2     Running           0          9s
productpage-v1-6b746746dc-psqbt  1/2     Running           0          9s
ratings-v1-b6994bb9-v9976        0/2     PodInitializing   0          8s
reviews-v1-545db77b95-6s7wk      1/2     Running           0          8s
reviews-v2-fb86c9648f-gcz7g      2/2     Running           0          9s
reviews-v3-84779c7bbc-tbmnd      1/2     Running           0          9s
```

---

## Verifying Certificate Chains

To further validate the configuration, retrieve and inspect the certificate chain from one of your applications (for example, the "details" application) by connecting to the "productpage" service. Because the CA certificate in this example is self-signed, you may see a warning indicating a "self-signed certificate in certificate chain"—this is expected.

The certificate output (truncated for brevity) will appear similar to:

```
-----BEGIN CERTIFICATE-----
MIITCCGgAwIBAgIjAPG5720SBugrMAQGCS... (truncated for brevity)
-----END CERTIFICATE-----

Server certificate
subject=
issuer=O = Istio, CN = Intermediate CA, L = localcluster

Acceptable client certificate CA names
O = Istio, CN = Root CA
```

These certificates can be saved as separate files if necessary. Next, verify that the root certificate used by Istio matches your specified certificate. First, dump the certificate information from your generated root certificate:

```
openssl x509 -in ca-certs/localcluster/ca-cert.pem -text -noout > /tmp/ca-cert.crt.txt
```

Then, extract the certificate information from the workload traffic:

```
openssl x509 -in ./proxy-cert-2.pem -text -noout > /tmp/pod-cert-chain-ca.crt.txt
```

Compare the two files:

```
diff -s /tmp/ca-cert.crt.txt /tmp/pod-cert-chain-ca.crt.txt
```

A message confirming identical files will look like:

```
Files /tmp/ca-cert.crt.txt and /tmp/pod-cert-chain-ca.crt.txt are identical
```

Next, verify the entire certificate chain from the root to the workload certificate:

```
openssl verify -CAfile <(cat ca-certs/localcluster/ca-cert.pem ca-certs/localcluster/root-cert.pem) ./proxy-cert-1.pem
```

Successful verification outputs:

```
./proxy-cert-1.pem: OK
```

This confirms that Istio is signing workload certificates using your provided root certificate.

---

This guide has shown how to configure a custom certificate authority within Istio and verify its proper use in your service mesh. For more in-depth information, consider exploring additional resources on [Istio Security](https://istio.io/latest/docs/tasks/security/) and [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/e4a2171d-d190-4dc9-873e-a0dad6d3cb62/lesson/57a83d19-0bcd-471b-ac0d-9070420d9e85)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/e4a2171d-d190-4dc9-873e-a0dad6d3cb62/lesson/41f39dd4-0f29-4d3f-9f10-8143bb6fc65d)**
>
> Practice lab
