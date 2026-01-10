# Storage Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Storage-Classes)

---

## Table of Contents

- Storage Classes
  - Table of Contents
  - Static Provisioning Recap
  - Dynamic Provisioning with StorageClass
  - Comparing Provisioning Methods
  - Customizing StorageClass Parameters
  - Defining Service Tiers
  - Links and References
  - Watch Video
    - StorageClass Definition
    - Using a Dynamic PVC and Pod

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Storage Classes

In this lesson, we’ll explore how **StorageClasses** enable dynamic volume provisioning in Kubernetes. If you’re familiar with static provisioning—where you manually create cloud disks and bind them via PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs)—you’ll see how StorageClasses automate this workflow.

---

## Table of Contents

- [Static Provisioning Recap](#static-provisioning-recap)
- [Dynamic Provisioning with StorageClass](#dynamic-provisioning-with-storageclass)
- [StorageClass Definition](#storageclass-definition)
- [Using a Dynamic PVC and Pod](#using-a-dynamic-pvc-and-pod)
- [Comparing Provisioning Methods](#comparing-provisioning-methods)
- [Customizing StorageClass Parameters](#customizing-storageclass-parameters)
- [Defining Service Tiers](#defining-service-tiers)
- [Links and References](#links-and-references)

---

## Static Provisioning Recap

With **static provisioning**, you manually create the underlying cloud disk before you define a PV:

```
gcloud beta compute disks create \
  --size=1GB \
  --region=us-east1 \
  pd-disk
```

Then you define:

```
# pv-definition.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  capacity:
    storage: 500Mi
  accessModes:
    - ReadWriteOnce
  gcePersistentDisk:
    pdName: pd-disk
    fsType: ext4
```

```
# pvc-definition.yaml
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

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: random-number-generator
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["/bin/sh", "-c"]
      args:
        - shuf -i 0-100 -n 1 >> /opt/number.out
      volumeMounts:
        - name: data-volume
          mountPath: /opt
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: myclaim
```

> [!important]
> **Note**
>
> Static provisioning works, but each new disk requires manual cloud CLI steps. Maintenance and scaling can become cumbersome.

---

## Dynamic Provisioning with StorageClass

With a **StorageClass**, Kubernetes can automatically create and bind a PV when you apply a PVC. This **dynamic provisioning** eliminates manual disk creation.

### StorageClass Definition

Define a StorageClass that uses the GCE PD provisioner:

```
# sc-definition.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
```

---

### Using a Dynamic PVC and Pod

1.  Create a PVC that references your StorageClass:

    ```
    # pvc-dynamic.yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: myclaim
    spec:
      storageClassName: google-storage
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 500Mi
    ```

2.  Deploy a Pod that mounts the PVC:

    ```
    # pod-dynamic.yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: random-number-generator
    spec:
      containers:
        - name: alpine
          image: alpine
          command: ["/bin/sh", "-c"]
          args:
            - shuf -i 0-100 -n 1 >> /opt/output.txt
          volumeMounts:
            - name: data-volume
              mountPath: /opt
      volumes:
        - name: data-volume
          persistentVolumeClaim:
            claimName: myclaim
    ```

Kubernetes will then:

1.  Provision a new GCE PD of the requested size.
2.  Create a corresponding PV.
3.  Bind your PVC to that PV.
4.  Attach the volume to your Pod.

---

## Comparing Provisioning Methods

| Feature       | Static Provisioning                 | Dynamic Provisioning (StorageClass)    |
| ------------- | ----------------------------------- | -------------------------------------- |
| Disk Creation | Manual via cloud CLI                | Automated by Kubernetes                |
| PV Definition | Pre-created `PersistentVolume`      | Generated automatically                |
| PVC Binding   | Manual or automatic if labels match | Automatic                              |
| Scalability   | Limited (manual work for each disk) | High (one PVC, one step)               |
| Flexibility   | Low                                 | High (parameters, tiers, provisioners) |

---

## Customizing StorageClass Parameters

Most provisioners let you fine-tune disks. For GCE PD, you can specify:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard        # pd-standard or pd-ssd
  replication-type: none   # none or regional-pd
```

> [!important]
> **Warning**
>
> Be cautious with `regional-pd`: it offers high availability at higher cost. Always choose based on your SLA requirements.

---

## Defining Service Tiers

You can create multiple StorageClasses to represent different performance tiers:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: silver
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard
  replication-type: none
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gold
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: none
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: platinum
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: regional-pd
```

| Tier     | Disk Type   | Replication | Use Case                            |
| -------- | ----------- | ----------- | ----------------------------------- |
| silver   | pd-standard | none        | Development, testing                |
| gold     | pd-ssd      | none        | Production, low-latency             |
| platinum | pd-ssd      | regional-pd | Mission-critical, high-availability |

When you create a PVC, just set `storageClassName` to select your tier. Kubernetes handles provisioning and binding behind the scenes.

---

## Links and References

- [Kubernetes StorageClass Documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [GCE PD Provisioner](https://kubernetes.io/docs/concepts/storage/volumes/#gcepersistentdisk)
- [gcloud compute disks create](https://cloud.google.com/sdk/gcloud/reference/compute/disks/create)

---

Mastering StorageClasses empowers you to build scalable, self-service storage in your Kubernetes clusters—no more manual volume management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/57187452-58a0-499e-af29-98348721afc6)**
>
> Watch video content
