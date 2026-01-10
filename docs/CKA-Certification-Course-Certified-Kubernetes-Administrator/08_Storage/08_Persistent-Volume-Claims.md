# Persistent Volume Claims - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Storage/Persistent-Volume-Claims)

---

## Table of Contents

- Persistent Volume Claims
  - Creating a Persistent Volume Claim
  - Deleting a PVC and Persistent Volume Reclaim Policies
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Storage

# Persistent Volume Claims

Welcome to this article on Persistent Volume Claims (PVCs) in Kubernetes. In our previous lesson, we created a Persistent Volume (PV). Now, we will explore how to create a Persistent Volume Claim (PVC) to expose that storage to a node.

Persistent volumes and persistent volume claims are two distinct objects in Kubernetes. An administrator is responsible for creating PVs, while users create PVCs to request storage resources. When a PVC is created, Kubernetes automatically binds it to a PV that meets the requested capacity, access modes, volume modes, and storage class.

![The image illustrates the concept of Persistent Volume Claims (PVC) and Persistent Volumes (PV) in Kubernetes, showing their relationship with various colored blocks.](https://kodekloud.com/kk-media/image/upload/v1752869984/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Persistent-Volume-Claims/frame_30.jpg)

Kubernetes evaluates several factors when binding a PVC to a PV. If multiple PVs can satisfy a claim, you can use labels and selectors to bind the claim to a specific volume.

![The image illustrates the concept of "Binding" in Kubernetes, showing PV (Persistent Volume) and PVC (Persistent Volume Claim) with conditions like capacity, access, volume modes, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752869985/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Persistent-Volume-Claims/frame_60.jpg)

It is important to note that if a smaller PVC is matched with a larger PV that meets all criteria, the unrequested capacity remains unused by any other PVC. If no PV satisfies the claim’s requirements, the PVC will remain in a pending state until a new, suitable PV becomes available.

![The image illustrates Kubernetes binding between Persistent Volume (PV) and Persistent Volume Claim (PVC) using labels and selectors, highlighting capacity, access, volume modes, storage class, and selector criteria.](https://kodekloud.com/kk-media/image/upload/v1752869986/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Persistent-Volume-Claims/frame_80.jpg)

## Creating a Persistent Volume Claim

Below is an example YAML template for creating a PVC. In this configuration, we set the API version to v1 with kind PersistentVolumeClaim, and name it "myclaim". Under the specification section, the access mode is set to ReadWriteOnce, and 500 MiB of storage is requested.

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

To create the PVC:

1.  Save the above YAML to a file, for example, `pvc-definition.yaml`.
2.  Run the command below in your terminal:

    ```
    kubectl create -f pvc-definition.yaml
    ```

You can verify the created PVC by executing:

```
kubectl get persistentvolumeclaim
NAME      STATUS   VOLUME   CAPACITY   ACCESS MODES
myclaim   Pending
```

Kubernetes will inspect the available PV. Suppose, in our example, a PV is configured with 1GiB storage and compatible access modes — if it meets the PVC’s criteria, it will automatically bind to the PVC. Here is an example of such a PV definition:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-voll
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 1Gi
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

After the binding process, running the `kubectl get persistentvolumeclaim` command will show that the PVC has been successfully bound to the matching PV.

## Deleting a PVC and Persistent Volume Reclaim Policies

To delete a PVC, use the following command:

```
kubectl delete persistentvolumeclaim myclaim
```

When a PVC is deleted, what happens next depends on the underlying persistent volume's reclaim policy. The reclaim policy determines the fate of the PV and can be configured as follows:

| Reclaim Policy | Description                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Retain         | The PV remains in the cluster after the PVC is deleted. An administrator must manually reclaim it. |
| Delete         | The PV is automatically deleted along with the PVC, releasing the storage on the physical device.  |
| Recycle        | The PV data is scrubbed before reuse by new claims.                                                |

> [!important]
> **Note**
>
> The "Recycle" reclaim policy is deprecated in recent Kubernetes versions and might not be available in your cluster.

For example, to set the reclaim policy to Retain, you would include:

```
persistentVolumeReclaimPolicy: Retain
```

Choose the reclaim policy that best fits your storage management strategy.

That concludes our guide on Persistent Volume Claims. We encourage you to practice configuring, binding, and troubleshooting PVs and PVCs in your Kubernetes environment. For further reading, check out the [Kubernetes Documentation](https://kubernetes.io/docs/) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/21cb2898-344d-4a35-a834-0682358f6c3a)**
>
> Watch video content
