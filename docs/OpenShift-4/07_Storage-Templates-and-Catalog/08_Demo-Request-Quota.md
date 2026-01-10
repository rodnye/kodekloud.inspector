# Demo Request Quota - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Demo-Request-Quota)

---

## Table of Contents

- Demo Request Quota
  - Step 1: Creating a New Project
  - Step 2: Defining the Resource Quota
  - Step 3: Deploying a Pod with a Memory Request
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Demo Request Quota

In this guide, you'll learn how to create and enforce a resource quota in an OpenShift project. By following these steps, you will set up a project, define a resource quota using a YAML manifest, and deploy a pod that respects the quota limitations.

---

## Step 1: Creating a New Project

Begin by logging in to the OpenShift console. Navigate to Home → Projects and create a new project with the following details:

- **Project Name:** Limit Tester
- **Display Name:** Same as the project name
- **Description:** Namespace for Resource Testing

Once the project is created, it will appear in your project list.

---

## Step 2: Defining the Resource Quota

Open your code editor (for example, VS Code) and create a YAML manifest file named `limit.yaml`. This manifest defines a resource quota that limits the total memory requests for the namespace "limittester" to 512 MiB. In this case, the resource quota is part of the core API group.

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: memlimit
  namespace: limittester
spec:
  hard:
    requests.memory: 512Mi
```

In the manifest:

- The `metadata` section specifies the quota's name and the namespace where it applies.
- The `spec.hard` section enforces a memory request limit of 512 MiB for all pods in the project.

Apply the manifest with the following command:

```
oc apply -f limit.yaml
```

After running the command, you should see a confirmation message indicating that the resource quota was created. To verify, run:

```
oc get resourcequota -n limittester
```

The expected output is similar to:

```
PS C:\Users\mike\Desktop> oc get resourcequota -n limittester
NAME      AGE   REQUEST               LIMIT
memlimit  35s   requests.memory: 0/512Mi
```

At this stage, no memory has yet been requested by any pods in the project.

---

## Step 3: Deploying a Pod with a Memory Request

Next, test the quota by deploying a pod that requests memory. Create or open a deployment manifest file named `deployment.yaml`. In this file, the namespace is explicitly set to "limittester" to ensure the deployment is part of the correct project. Combine the metadata and pod specification in one deployment configuration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: carts-db
  namespace: limittester
  labels:
    app: carts-db
spec:
  replicas: 1
  selector:
    matchLabels:
      app: carts-db
  template:
    metadata:
      labels:
        app: carts-db
    spec:
      containers:
        - name: carts-db
          image: centos/mongodb-34-centos7
          resources:
            requests:
              memory: "100Mi"
          ports:
            - name: mongo
```

Key points in the deployment:

- The `metadata.namespace` field ensures that the deployment is created within the "limittester" project.
- The container `carts-db` is configured to request 100 MiB of memory.

Apply the deployment with:

```
oc apply -f deployment.yaml
```

> [!important]
> **Note**
>
> You might receive a warning regarding pod security, but the deployment will be created successfully.

Verify that the deployment is running by executing:

```
oc get deployments -n limittester
```

Then, check the resource quota again to see the updated memory usage:

```
oc get resourcequota -n limittester
```

Expected output:

```
PS C:\Users\mike\Desktop> oc get resourcequota -n limittester
NAME       AGE     REQUEST                      LIMIT
memlimit   3m14s  requests.memory: 100Mi/512Mi
```

This output confirms that 100 MiB of the allowed 512 MiB has been requested by the deployment, indicating that the resource quota is functioning as expected.

---

With these steps, you have successfully created a project, defined a resource quota, and deployed a pod with a memory request within the specified limits.

For further details and advanced configurations, consider exploring additional OpenShift and Kubernetes documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/aec29b90-2df1-46cc-9db2-b30490ca2c33)**
>
> Watch video content
