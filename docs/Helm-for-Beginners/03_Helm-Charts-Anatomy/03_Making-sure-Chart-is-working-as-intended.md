# Making sure Chart is working as intended - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Making-sure-Chart-is-working-as-intended)

---

## Table of Contents

- Making sure Chart is working as intended
  - 1. Linting the Chart
  - 2. Verifying Template Rendering
  - 3. Simulating an Installation with a Dry Run
  - Summary
  - Quick Reference Table
  - Watch Video
  - Practice Lab

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Making sure Chart is working as intended

After developing your first Helm chart, it’s crucial to verify its functionality. There are three primary methods to validate your Helm chart before installation:

1.  Linting – Checks that the chart and its YAML syntax are correct.
2.  Template Rendering – Confirms that the templating logic generates the expected manifest.
3.  Dry Run Install – Simulates an installation on Kubernetes to catch issues that only Kubernetes validation can reveal.

Below, we detail each verification method.

---

## 1\. Linting the Chart

Linting helps catch formatting errors and typos (for example, misaligned spaces or incorrect variable names such as a misspelling of "release"). Use the following command to lint your chart:

```
$ helm lint ./nginx-chart
==> Linting ./nginx-chart/
[INFO] Chart.yaml: icon is recommended
[ERROR] templates/: template: nginx-chart/templates/deployment.yaml:4:19: executing "nginx-chart/templates/deployment.yaml" at <.Release.Name>: nil pointer evaluating interface {}.Name
[ERROR] templates/deployment.yaml: unable to parse YAML: error converting YAML to JSON: yaml: line 20: did not find expected '-' indicator
Error: 1 chart(s) linted, 1 chart(s) failed
```

The above output indicates:

- An error on line 4 due to a typo in the variable name.
- A YAML indentation issue on line 20.

After addressing these issues, re-run the lint command. A successful linting process will output:

```
$ helm lint ./nginx-chart
==> Linting ./nginx-chart/
[INFO] Chart.yaml: icon is recommended
1 chart(s) linted, 0 chart(s) failed
```

> [!important]
> **Best Practice**
>
> Including an icon in the Chart.yaml file is recommended as it enhances chart identification.

---

## 2\. Verifying Template Rendering

Once linting confirms correct formatting, the next step is to ensure that the templating logic produces the intended Kubernetes manifest. This process renders placeholders such as .Release.Name and variables defined in the values file.

Run the command below to render the template locally:

```
$ helm template hello-world-1 ./nginx-chart
```

The rendered output may look similar to this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world-1-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: hello-world
        image: nginx
        ports:
        - name: http
          containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: hello-world-1-nginx
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: hello-world
---
# Default values for nginx-chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 2
image: nginx
```

Notice that the release name is incorporated as "hello-world-1" from the command. If no name is provided, Helm defaults to a generated release name. If there is a YAML indentation or templating error, you might see an error message like:

```
$ helm template ./nginx-chart
Error: YAML parse error on nginx-chart/templates/deployment.yaml: error converting YAML to JSON: yaml: line 5: mapping values are not allowed in this context
```

In such cases, use the debug flag to help diagnose the issue:

```
$ helm template ./nginx-chart --debug
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: hello-world
        image: {{ .Values.image }}
        ports:
        - name: http
          containerPort: 80
          protocol: TCP


# Default values for nginx-chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 2
image: nginx
```

This debug output aids in identifying and fixing any rendering issues.

---

## 3\. Simulating an Installation with a Dry Run

Linting and template rendering catch many issues; however, they might not detect errors within the final manifest applied to Kubernetes. For example, if the Deployment spec mistakenly uses "container" instead of "containers", the issue won't be caught by earlier checks.

Consider the following incorrect manifest snippet:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      container:  # Incorrect field; should be "containers"
        - name: hello-world
          image: {{ .Values.image }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

Since the YAML structure and templating appear correct, neither linting nor template rendering flags this error. To validate the entire manifest against Kubernetes standards, execute the following dry-run command:

```
$ helm install hello-world-1 ./nginx-chart --dry-run
Error: unable to build kubernetes objects from release manifest: error validating "": error validating data: [ValidationError(Deployment.spec.template.spec): unknown field "container" in io.k8s.api.core.v1.PodSpec, ValidationError(Deployment.spec.template.spec): missing required field "containers" in io.k8s.api.core.v1.PodSpec]
```

After correcting the mistake and re-running the dry run, you should observe a successful simulated installation with detailed manifest output:

```
$ helm install hello-world-1 ./nginx-chart --dry-run
NAME: hello-world-1
LAST DEPLOYED: Fri Nov 19 18:34:51 2021
NAMESPACE: default
STATUS: pending-install
REVISION: 1
TEST SUITE: None
HOOKS:
MANIFEST:
---
# Source: nginx-chart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-world-1-nginx
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: http
```

> [!important]
> **Dry Run Tip**
>
> Using the dry run option is instrumental in verifying that Kubernetes accepts your final manifests. This step minimizes the risk of encountering runtime errors during actual deployment.

---

## Summary

In this guide, we explored the three critical methods to verify your Helm charts:

- **Linting** checks for formatting and syntax errors.
- **Template Rendering** confirms correct variable substitution and manifest creation.
- **Dry Run Installation** validates the final manifest against Kubernetes APIs.

Implement these practices to confidently build, validate, and deploy your Helm charts. Happy charting!

---

## Quick Reference Table

| Verification Method  | Primary Purpose                                           | Example Command                                      |
| -------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| Linting              | Validate chart formatting and syntax                      | `helm lint ./nginx-chart`                            |
| Template Rendering   | Render and inspect final Kubernetes manifest              | `helm template hello-world-1 ./nginx-chart`          |
| Dry Run Installation | Simulate deployment to catch Kubernetes validation errors | `helm install hello-world-1 ./nginx-chart --dry-run` |

For additional insights and detailed Kubernetes concepts, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/abdf0a80-9375-49af-9954-8007f4106d8c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/ef6d5919-cd28-4d13-8298-1f3f1961f07e)**
>
> Practice lab
