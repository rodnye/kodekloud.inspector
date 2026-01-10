# Kustomize Controller - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Source-and-Kustomize-Controller/Kustomize-Controller)

---

## Table of Contents

- Kustomize Controller
  - 1. Creating a Kustomization
  - 2. Automatic Build Behavior
  - 3. Providing Your Own Overlays
  - 4. Checking Status
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Source and Kustomize Controller

# Kustomize Controller

The **Kustomize Controller** is the Flux component that ensures your cluster’s actual state matches the desired state described by Kubernetes manifests. It retrieves artifacts from the Source Controller and then:

| Feature                      | Description                                                                 |
| ---------------------------- | --------------------------------------------------------------------------- |
| Validation                   | Checks your manifests against the Kubernetes API before applying changes.   |
| Apply / Update               | Creates or updates resources based on the desired state.                    |
| Health Assessment            | Monitors workloads to ensure they remain healthy after deployment.          |
| Pruning (Garbage Collection) | Optionally removes resources that no longer exist in your source manifests. |

> [!important]
> **Prerequisite**
>
> Make sure you have installed [Flux](https://fluxcd.io/docs/installation/) and configured a `GitRepository` or other supported source.

## 1\. Creating a Kustomization

Use the `flux create kustomization` command to link your source to a path containing Kustomize overlays. You can also enable garbage collection:

```
flux create kustomization kustomization-app1 \
  --source=GitRepository/source-app1 \
  --path=./solar-system \
  --prune=true \
  --export > kustomization.yaml
```

The `--export` flag prints the `Kustomization` resource manifest:

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: kustomization-app1
  namespace: flux-system
spec:
  interval: 1m0s
  path: ./solar-system
  prune: true
  sourceRef:
    kind: GitRepository
    name: source-app1
```

Apply it with:

```
kubectl apply -f kustomization.yaml
```

## 2\. Automatic Build Behavior

If there’s no `kustomization.yaml` file under `./solar-system`, Flux will auto-generate one for you:

```
kustomize create --autodetect --recursive --output kustomization.yaml
```

This populates `kustomization.yaml` with all discovered resources:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml
```

> [!important]
> **Note**
>
> You don’t need to run the above command yourself—Flux performs it automatically when needed.

## 3\. Providing Your Own Overlays

If you include a custom `kustomization.yaml` (or Kustomization overlay) in the specified path, the controller will skip auto-generation and apply your overlays directly. This allows you to:

- Add labels or annotations
- Patch existing resources
- Customize namespace or image tags

## 4\. Checking Status

To inspect all active `Kustomization` resources and their reconciliation state:

```
flux get kustomizations
```

Example output:

```
NAME                   REVISION          SUSPENDED   READY   MESSAGE
flux-system            main/7e35674...   False       True    Applied revision: 'main/7e35674...'
kustomization-app1     main/1b31558...   False       True    Applied revision: 'main/1b31558...'
```

## Links and References

- [Flux Documentation](https://fluxcd.io/docs/)
- [Kustomize Official Site](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [GitRepository Source for Flux](https://fluxcd.io/docs/components/source/git/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/857e34cf-a086-433b-bf3b-88a5a5096a6f/lesson/ffda282a-fad8-47c2-912e-38b034592ed9)**
>
> Watch video content
