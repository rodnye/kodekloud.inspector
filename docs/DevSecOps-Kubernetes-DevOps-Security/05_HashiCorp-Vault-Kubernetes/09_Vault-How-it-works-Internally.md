# Vault How it works Internally - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Vault-How-it-works-Internally)

---

## Table of Contents

- Vault How it works Internally
  - Architecture Overview
  - Injecting the Vault Agent into a Pod
  - Authentication Flow
  - Configuring Vault Roles and Policies
  - Fetching and Rendering Secrets
  - Links and References
  - Watch Video
  - Practice Lab
    - Sample TokenReview Request

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Vault How it works Internally

In this guide, we’ll dive into HashiCorp Vault’s internal workflow—covering pod injection, Kubernetes authentication, and secret rendering for applications.

## Architecture Overview

When you install Vault with the official Helm chart, two key pods are deployed:

| Pod Name             | Role                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| vault-0              | Primary Vault server. Initialize Vault, add secrets, configure policies and auth.     |
| vault-agent-injector | Mutating webhook controller that injects Vault Agent containers into application Pods |

Kubernetes processes Pod creation in four main phases:

1.  Authentication & Authorization
2.  Mutating Admission Controllers (includes Vault injector)
3.  Schema & Validation Admission Controllers
4.  Persistence to etcd

After these steps, the scheduler assigns the Pod to a node and mounts its service account—at this point, secrets are not yet available inside the container.

## Injecting the Vault Agent into a Pod

To enable automatic injection, annotate your Pod manifest:

```
kubectl patch pod my-app \
  --type='json' \
  -p='[{"op":"add","path":"/metadata/annotations/vault.hashicorp.com~1agent-inject","value":"true"}]'
```

When the `vault-agent-injector` webhook intercepts Pod creation, it adds:

- **Init Container**  
  Fetches secrets from Vault and writes them to a shared volume.
- **Sidecar Container (Vault Agent)**  
  Continuously renews the Vault token and re-renders secrets into the same volume.

> [!important]
> **Note**
>
> Make sure your Kubernetes service account has the proper `system:auth-delegator` role binding so Vault can perform TokenReview requests.

## Authentication Flow

Injected containers authenticate to Vault using the Pod’s service account JWT:

1.  Vault Agent sends a POST to Vault’s Kubernetes auth endpoint with the JWT.
2.  Vault calls the Kubernetes TokenReview API to validate the token.
3.  If the response is authenticated and matches a bound role, Vault issues a client token.
4.  The token is stored at `/home/vault/.vault-token` inside the agent container.

### Sample TokenReview Request

```
curl --location --request POST "https://$KUBE_API_SERVER/apis/authentication.k8s.io/v1/tokenreviews" \
  --header "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  --header "Content-Type: application/json" \
  --data '{
    "apiVersion": "authentication.k8s.io/v1",
    "kind": "TokenReview",
    "spec": {
      "token": "<POD_SERVICE_ACCOUNT_TOKEN>"
    }
  }'
```

## Configuring Vault Roles and Policies

On your Vault server (`vault-0`), enable Kubernetes auth and bind service accounts to policies:

```
# 1. Initialize Vault (if not done yet)
vault operator init


# 2. Enable Kubernetes auth backend
vault write auth/kubernetes/config \
  token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  kubernetes_host="https://$KUBE_API_HOST:443" \
  kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt


# 3. Create a role for 'app' service account in 'demo' namespace
vault write auth/kubernetes/role/phapp \
  bound_service_account_names=app \
  bound_service_account_namespaces=demo \
  policies=app \
  ttl=1h


# 4. Define and write the 'app' policy
cat <<EOF > app-policy.hcl
path "crds/data/my/*" {
  capabilities = ["read"]
}
EOF
vault policy write app app-policy.hcl
```

> [!important]
> **Warning**
>
> Ensure your policy paths match the KV engine mount and data structure in Vault. Incorrect paths will result in denied access.

## Fetching and Rendering Secrets

1.  **Init Container** retrieves secrets:

    ```
    vault kv get -field=value crds/data/my/config
    ```

2.  Writes them into a shared volume (e.g., mounted at `/vault`).
3.  **Application Container** reads secrets as files:

    ```
    kubectl exec -it my-app -- ls /vault
    ```

This design allows your application to consume Vault-managed secrets like local files—no Vault client library needed in your code.

---

## Links and References

- [HashiCorp Vault Official Documentation](https://www.vaultproject.io/docs)
- [Kubernetes Authentication Overview](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [Helm Charts for Vault](https://artifacthub.io/packages/helm/hashicorp/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/f798a147-de48-4512-a94e-ed94e13f4016)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/05fec374-366a-4571-886b-b4751c57ab2a)**
>
> Practice lab
