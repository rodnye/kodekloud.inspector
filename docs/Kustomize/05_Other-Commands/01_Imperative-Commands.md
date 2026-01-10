# Imperative Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Other-Commands/Imperative-Commands)

---

## Table of Contents

- Imperative Commands
  - Key Subcommands
  - edit set
  - edit add
  - Which kustomization.yaml Gets Updated?
  - Links and References
  - Watch Video
  - Practice Lab
    - Change an image tag
    - Set or update a namespace
    - Add common labels
    - Set replica count for a Deployment
    - Add a ConfigMap generator
    - Add a Secret generator
    - Add a resource

---

## Content

Kustomize

Other Commands

# Imperative Commands

In this guide, you’ll learn how to **imperatively** update your `kustomization.yaml` using the `kustomize edit` subcommands. Anything you normally declare in YAML—adding or removing labels, prefixes, namespaces, modifying images or replica counts—can also be done directly via the CLI.

Before you start, check the help output for available subcommands:

```
kustomize edit --help
```

You’ll see usage examples and commands such as:

```
# Adds a ConfigMap to the kustomization file
kustomize edit add configmap NAME --from-literal=k=v


# Sets the nameprefix field
kustomize edit set nameprefix <prefix-value>


# Sets the namesuffix field
kustomize edit set namesuffix <suffix-value>
```

## Key Subcommands

| Subcommand    | Action                                |
| ------------- | ------------------------------------- |
| `edit set`    | Modify existing fields                |
| `edit add`    | Add generators, resources, or plugins |
| `edit remove` | Remove items from the kustomization   |

---

## edit set

Use `kustomize edit set` to change fields in your `kustomization.yaml` without editing it by hand.

### Change an image tag

```
kustomize edit set image nginx=nginx:1.2.2
```

Resulting entry:

```
images:
- name: nginx
  newTag: 1.2.2
```

### Set or update a namespace

```
kustomize edit set namespace staging
```

Produces:

```
namespace: staging
```

> [!important]
> **Note**
>
> This command only updates your `kustomization.yaml`. It does **not** apply changes to your cluster.

### Add common labels

```
kustomize edit set label org=KodeKloud env=staging
```

Yields:

```
commonLabels:
  org: KodeKloud
  env: staging
```

### Set replica count for a Deployment

```
kustomize edit set replicas nginx-deployment=5
```

Adds:

```
replicas:
- name: nginx-deployment
  count: 5
```

---

## edit add

The `add` subcommands let you generate ConfigMaps, Secrets, and include additional resources.

### Add a ConfigMap generator

```
kustomize edit add configmap db-creds \
  --from-literal=password=password1 \
  --from-literal=username=root
```

Generates:

```
configMapGenerator:
- name: db-creds
  literals:
  - password=password1
  - username=root
```

### Add a Secret generator

```
kustomize edit add secret my-secret \
  --from-literal=login=user1 \
  --from-literal=password=mypassword
```

Produces:

```
secretGenerator:
- name: my-secret
  type: Opaque
  literals:
  - login=user1
  - password=mypassword
```

### Add a resource

Include external YAML manifests in your kustomization:

```
kustomize edit add resource db/db-depl.yaml
```

Results in:

```
resources:
- db/db-depl.yaml
```

---

## Which `kustomization.yaml` Gets Updated?

If your project uses multiple overlays or bases, the file modified depends on where you run the command:

```
cd k8/base
kustomize edit set label org=KodeKloud
cd ../overlays/prod
kustomize edit set namespace prod
# Updates k8/overlays/prod/kustomization.yaml
```

If there’s no `kustomization.yaml` in your current directory, you’ll see an error.

---

## Links and References

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Kubernetes Configuration](https://kubernetes.io/docs/concepts/overview/config-management/)
- [GitHub: kustomize](https://github.com/kubernetes-sigs/kustomize)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/060e95ac-e56c-42ed-be87-8701328432c3/lesson/e18c8a87-99db-439e-a8bc-bff7cc658853)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/060e95ac-e56c-42ed-be87-8701328432c3/lesson/f83fd542-9130-4e60-8e67-ed2d7548d895)**
>
> Practice lab
