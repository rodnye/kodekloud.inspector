# Demo YAML Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts-Pods-ReplicaSets-Deployments/Demo-YAML-Tips)

---

## Table of Contents

- Demo YAML Tips
  - Installing and Configuring VS Code for Kubernetes YAML
  - Creating and Editing a Kubernetes YAML File in VS Code
  - Verifying the YAML File and Creating the Pod
  - Next Steps
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts Pods ReplicaSets Deployments

# Demo YAML Tips

Earlier, we used the Vim command line editor to create a pod definition file. In that example, we defined a pod named "nginx" with a couple of labels and used the nginx image:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
    tier: frontend
spec:
  containers:
  - name: nginx
    image: nginx
```

While this approach works, traditional text editors like Vim or Notepad can be quite limiting when creating or editing numerous or lengthy YAML files. These editors typically don’t provide immediate feedback on syntax or structural errors in Kubernetes YAML manifests.

For example, when you run:

```
vim pod.yaml
```

you might not receive immediate error notifications even if the YAML file contains mistakes. Kubernetes object definition files benefit greatly from real-time validation. Instead, using an Integrated Development Environment (IDE) can help alleviate these issues. Many free IDEs—such as [JetBrains IntelliJ IDEA](https://www.jetbrains.com/idea/), [Atom](https://atom.io/), [Eclipse](https://www.eclipse.org/), and [NetBeans](https://netbeans.apache.org/)—support YAML editing and highlight errors as you work.

![The image shows a code editor with Kubernetes YAML file open, displaying API version options like v1, v1alpha1, and v1beta1.](/images/kubernetes-for-the-absolute-beginners-hands-on-tutorial-Demo-YAML-Tips/frame_70.jpg)

> [!important]
> **Tip**
>
> Consider using IDE extensions or plugins that validate YAML structure as well as Kubernetes-specific configurations. This can help catch errors early before deployment.

For instance, if you mistype a property name or use an incorrect structure (such as a dictionary instead of a list), your editor might not alert you immediately. Here’s an example of configuration that customizes editor settings (typically in a file like settings.json):

```
{
  "extensions.ignoreRecommendations": true,
  "typescript.format.enable": false,
  "yaml.schemas": {
    "kubernetes": "kubernetes.yml",
    "http://json.schemastore.org/appveyor": "appveyor.yml"
  },
  "workbench.statusBar.feedback.visible": false,
  "typescript.updateImportsOnFileMove.enabled": "never",
  "yaml.format.enable": true,
  "yaml.customTags": [
    "!!customTag1",
    "!!customTag2"
  ]
}
```

Extensions or plugins first verify the structure and syntax of your YAML file and then indicate any Kubernetes-specific errors. For example, a simple YAML snippet with versioning might look like this:

```
version: 1.0.0
```

Or a more complex example:

```
invoice: 34843
date: 2001-01-23T00:00:00.000Z
bill-to: &ref_0
  given: Chris
  family: Dumars
  address:
    lines: |
      458 Walkman Dr.
      Suite #292
    city: Royal Oak
    state: MI
    postal: 48046
ship-to: *ref_0
product:
  -
    sku: BL394D
    quantity: 4
    description: Basketball
    price: 450
  -
    sku: BL4438H
    quantity: 1
    description: Super Hoop
    price: 2392
```

Even Kubernetes configurations must adhere strictly to YAML standards. For example:

```
apiVersion: v1
metadata:
  name: hello_world
```

Extensions (both free and paid) can ensure that your YAML files comply with Kubernetes standards. One popular, cross-platform IDE is Microsoft Visual Studio Code (VS Code), which is simple to set up and features a free extension for YAML validation tailored to Kubernetes. In the remainder of these demos, we will use VS Code, though you can choose the IDE that best fits your workflow.

---

## Installing and Configuring VS Code for Kubernetes YAML

Begin by installing VS Code. Visit [code.visualstudio.com](https://code.visualstudio.com) and download the appropriate installer for your operating system. For Ubuntu users, the website typically recommends the Debian package.

![The image shows the Visual Studio Code website, highlighting features like IntelliSense, debugging, Git integration, and extensions, with download options for different operating systems.](/images/kubernetes-for-the-absolute-beginners-hands-on-tutorial-Demo-YAML-Tips/frame_180.jpg)

After downloading, install the package and launch VS Code. On first launch, you will see the default welcome interface. Next, navigate to the Extensions section and search for "YAML". Look for the extension published by Red Hat. Often this extension is pre-installed; if not, simply click the install button to enable it.

Before creating Kubernetes definition files, modify the VS Code settings to enable Kubernetes schema support. Click the gear icon on the YAML extension, go to Extension Settings, scroll to the bottom to find the YAML schemas option, and click "Edit in settings.json".

![The image shows the Visual Studio Code extension page for "YAML Language Support by Red Hat," featuring details, features, and a code snippet example.](/images/kubernetes-for-the-absolute-beginners-hands-on-tutorial-Demo-YAML-Tips/frame_280.jpg)

In the settings.json file—which may appear nearly empty in a new installation—add the following configuration to enable Kubernetes schema validation for all YAML files:

```
{
  "yaml.schemas": {
    "kubernetes": "*.yaml"
  }
}
```

Alternatively, if you prefer to apply the Kubernetes schema only to files matching a specific pattern, adjust the pattern accordingly. Note that the keyword "kubernetes" must be in lowercase. Once saved, restart VS Code to apply the new settings.

You can also open settings.json by pressing "Ctrl+P", typing "settings.json", and selecting the file from the list.

---

## Creating and Editing a Kubernetes YAML File in VS Code

With VS Code configured, open your project folder (for example, "Kubernetes for beginners") that contains your pod definition file. For demonstration purposes, create a new file named "nginx.yaml" and add the following content to leverage the auto-completion and validation features of the YAML extension:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-2
  labels:
    env: production
spec:
  containers:
  - name: nginx
    image: nginx
```

Start by typing the root-level element "apiVersion" with the value "v1". The YAML extension then activates and suggests additional properties. For example, when you type "k" for "kind", the editor provides suggestions for available root-level properties. Accept the auto-completion by pressing Tab. After entering "kind: Pod", use shortcuts like Control + Space to explore further suggestions, such as for the "metadata" section.

Under "metadata", include a "name" field for the pod. Leaving the field empty will trigger an error, expecting a string value. Once you set a value (such as "nginx-2"), the error is resolved. The extension ensures proper indentation automatically. Next, add the "labels" dictionary under "metadata" and specify a label like "env: production".

When you add the "spec" section, the extension suggests properties relevant to a pod. After selecting "spec", it automatically includes a "containers" array with a placeholder for the first container. Fill in the container's details by setting "name" as "nginx" and "image" as "nginx". The extension validates the structure, ensuring each property (for example, the "image" field) is correctly indented. Although it validates the YAML structure and some Kubernetes-supported fields (like a valid "kind"), it does not check if an image name exists in the Docker registry—you must verify this manually.

If you need to add another container, simply append another element in the containers array. For this demonstration, we only require one container, so remove any unnecessary entries to keep the file clean.

Your final YAML file should look like this:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-2
  labels:
    env: production
spec:
  containers:
  - name: nginx
    image: nginx
```

Save the file, and then check the file outline (typically shown in the sidebar) for a graphical view of your YAML structure. The outline displays a hierarchy with root elements (apiVersion, kind, metadata, spec) and nested sections—such as the labels dictionary under metadata and the containers array under spec.

![The image shows Visual Studio Code with a project named "KUBERNETES-FOR-BEGINNERS" containing two YAML files, "nginx.yaml" and "pod.yaml," with "nginx.yaml" open and empty.](/images/kubernetes-for-the-absolute-beginners-hands-on-tutorial-Demo-YAML-Tips/frame_510.jpg)

> [!important]
> **Hint**
>
> Use the outline view to quickly locate potential issues in your YAML structure, ensuring that every indentation and property is correct.

---

## Verifying the YAML File and Creating the Pod

To verify your YAML file, open a terminal and navigate to your project directory (for example, "Kubernetes for beginners"). You should see both "nginx.yaml" and any other pod definition files:

```
admin@ubuntu-server kubernetes-for-beginners # ls
nginx.yaml  pod.yaml
```

Examine the contents of "nginx.yaml" with the `cat` command:

```
admin@ubuntu-server kubernetes-for-beginners # cat nginx.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-2
  labels:
    env: production
spec:
  containers:
  - name: nginx
    image: nginx
```

Once confirmed, create or update the pod using one of the following CLI commands:

```
kubectl create -f nginx.yaml
```

or

```
kubectl apply -f nginx.yaml
```

> [!important]
> **Pro Tip**
>
> Using "kubectl apply" is recommended for managing changes to existing objects because it can update objects without needing to delete them first.

---

## Next Steps

The following coding exercises provide an opportunity to further refine your YAML files. If you already feel comfortable with YAML and its formatting, you may skip these exercises. Otherwise, they offer valuable practice, preparing you to create and manage Kubernetes YAML files in real lab environments.

That concludes this lesson. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/eb9e6792-d788-499d-8afe-13f2427c1e57/lesson/01e70029-8d7d-4b59-97c2-5bcf21c553fe)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/0919dae3-bc94-479f-b205-d52156817c98/lesson/e761907c-5e76-4e63-90d4-43b18a62b989)**
>
> Practice lab
