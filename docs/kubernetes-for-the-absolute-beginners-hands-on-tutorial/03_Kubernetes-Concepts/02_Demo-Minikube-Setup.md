# Demo Minikube Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Concepts/Demo-Minikube-Setup)

---

## Table of Contents

- Demo Minikube Setup
  - Installing kubectl
  - Verifying Virtualization Support
  - Installing Minikube
  - Downloading and Installing Minikube
  - Starting the Minikube Cluster
  - Verifying the Cluster
  - Deploying a Sample Application
  - Conclusion
  - Watch Video
    - 1. Create a Deployment
    - 2. Verify the Deployment
    - 3. Expose the Deployment as a Service
    - 4. Cleaning Up

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Concepts

# Demo Minikube Setup

In this lesson, we install a basic Kubernetes cluster using the Minikube utility. This beginner-friendly guide focuses on the core installation and configuration steps. For more advanced provisioning options such as using kubeadm, please refer to the [CKA Certification Course - Certified Kubernetes Administrator](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator).

We start by visiting the official Kubernetes website. Navigate to the Documentation section, then proceed to the Tasks and Install Tools area.

![The image shows the Kubernetes documentation webpage, featuring navigation links and a statement supporting the Black community against racism.](https://kodekloud.com/kk-media/image/upload/v1752884871/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Minikube-Setup/frame_40.jpg)

## Installing kubectl

Before installing Minikube, it is essential to install the kubectl command-line tool. Kubectl manages your Kubernetes resources and interacts with your cluster once it is set up via Minikube. Installing kubectl first enables Minikube to configure it correctly during provisioning.

![The image shows a webpage from Kubernetes documentation, specifically the "Install Tools" section, with links to set up kubectl and Minikube.](https://kodekloud.com/kk-media/image/upload/v1752884872/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Minikube-Setup/frame_50.jpg)

While you might see various ways of fine-tuning its name, they all refer to this single utility.

To download the latest stable version of kubectl, run:

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
```

After the download is complete, make the binary executable and move it to a directory included in your PATH:

```
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

Verify the installation by checking the client version. Note that until a cluster is running, you might encounter a message about the connection being refused:

```
kubectl version
```

Example output:

```
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.5", GitCommit:"6503f8d8f769ace2f338794c914a96fc335df0f", GitTreeState:"clean", BuildDate:"2020-06-26T03:47:41Z", GoVersion:"go1.13.9", Compiler:"gc", Platform:"linux/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

Other installation methods are available in the Kubernetes documentation. For example, on Ubuntu you might use:

```
sudo apt-get update && sudo apt-get install -y apt-transport-https gnupg2
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

## Verifying Virtualization Support

Before installing Minikube, ensure virtualization is enabled on your machine. This check is essential regardless of whether you are on Linux, Windows, or macOS. On Linux, you can check for the necessary virtualization flags (`vmx` for Intel or `svm` for AMD) with the following command:

```
grep -E --color 'vmx|svm' /proc/cpuinfo
```

> [!important]
> **Virtualization Disabled?**
>
> If no output is returned from the command above, virtualization may be disabled in your BIOS settings. Consult your laptop's manual or search online using your specific model to enable virtualization.

## Installing Minikube

After installing kubectl and verifying that virtualization is enabled, the next step is to install Minikube. On Linux, you typically choose between two hypervisors: VirtualBox or KVM. In this lesson, VirtualBox is the chosen hypervisor because of its cross-platform availability (Linux, Windows, and macOS) and ease of resetting via snapshots.

If VirtualBox is not installed on your system, download the appropriate package from the [VirtualBox website](https://www.virtualbox.org/). For systems using yum (such as CentOS or RHEL), install VirtualBox with:

```
yum install VirtualBox-6.1
```

Once VirtualBox is installed, launch it to see its interface. The image below shows VirtualBox with no running virtual machines—a new one will appear when Minikube starts the cluster.

![The image shows a webpage from Kubernetes documentation about installing Minikube, detailing hypervisor options like KVM and VirtualBox, and discussing the `--driver=none` option.](https://kodekloud.com/kk-media/image/upload/v1752884874/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Minikube-Setup/frame_470.jpg)

## Downloading and Installing Minikube

Download the latest Minikube binary and make it executable:

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube
```

Then, add Minikube to your PATH by installing it to /usr/local/bin:

```
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

## Starting the Minikube Cluster

With both kubectl and Minikube now installed, you can start your local Kubernetes cluster. Specify the virtualization driver—in this example, VirtualBox—with the following command:

```
minikube start --driver=virtualbox
```

Minikube will download the necessary ISO image and Kubernetes binaries (for example, Kubernetes v1.18.3) to set up your cluster. You will notice a new virtual machine named "minikube" appear in VirtualBox once the provisioning process begins.

Example session output:

```
admin@ubuntu-server kubernetes-for-beginners # curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube
admin@ubuntu-server kubernetes-for-beginners # ls -ld /usr/local/bin/
drwxr-xr-x 2 root root 4096 Jul 11 00:03 /usr/local/bin/
admin@ubuntu-server kubernetes-for-beginners # sudo install minikube /usr/local/bin/
admin@ubuntu-server kubernetes-for-beginners # minikube start --driver=virtualbox
minikube v1.12.0 on Debian bullseye/sid
Using the virtualbox driver based on user configuration
Downloading VM boot image ...
> minikube-v1.12.0.iso.sha256: 65 B / 65 B [--------------] 100.00%
> minikube-v1.12.0.iso: 173.57 MiB / 173.57 MiB [--------------] 100.00%
Starting control plane node minikube in cluster minikube
Downloading Kubernetes v1.18.3 preload ...
> preloaded-images-k8s-v4-v1.18.3-docker-overlay2-amd64.tar.lz4: 176.78 MiB
```

In the VirtualBox Manager, you will see the "minikube" virtual machine running with 2 CPUs and 2 GB of RAM.

![The image shows the Oracle VM VirtualBox Manager interface with a virtual machine named "minikube" running, displaying its system and network settings.](https://kodekloud.com/kk-media/image/upload/v1752884876/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Demo-Minikube-Setup/frame_670.jpg)

After the setup completes, kubectl is automatically configured to use the new Kubernetes cluster.

## Verifying the Cluster

To ensure everything is functioning correctly, check the status of your Minikube cluster with:

```
minikube status
```

Expected output:

```
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

Next, verify that the node is ready by listing all nodes:

```
kubectl get nodes
```

Expected output:

```
NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    master   88s   v1.18.3
```

## Deploying a Sample Application

With your cluster up and running, deploy a sample application to verify that the environment is fully operational.

### 1\. Create a Deployment

Deploy a sample echoserver application with the following command:

```
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.10
```

You should see a confirmation message:

```
deployment.apps/hello-minikube created
```

### 2\. Verify the Deployment

Check the deployment status with:

```
kubectl get deployments
```

Expected output:

```
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-minikube    1/1     1            1           22s
```

### 3\. Expose the Deployment as a Service

Expose the deployment on port 8080 using a NodePort service:

```
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

To obtain the URL of the exposed service, run:

```
minikube service hello-minikube --url
```

Open the URL in your browser to view details of the application. Although the interface may be basic, this confirms your cluster's functionality.

### 4\. Cleaning Up

After testing, remove the service and deployment:

```
kubectl delete service hello-minikube
kubectl delete deployment hello-minikube
```

You can verify that the pod is terminating with:

```
kubectl get pods
```

Example output:

```
NAME                                     READY   STATUS        RESTARTS   AGE
hello-minikube-64b64df8c9-4vcrm            1/1     Terminating   0          3m3s
```

## Conclusion

Your Minikube-based Kubernetes cluster is now operational, and you have successfully deployed and exposed a sample application. This setup forms a solid foundation for upcoming lessons where more complex deployments and Kubernetes concepts will be explored.

Happy learning, and see you in the next lesson!

> [!important]
> **Next Steps**
>
> Consider exploring additional Kubernetes resources such as the [Kubernetes Documentation](https://kubernetes.io/docs/) and tutorials to deepen your understanding of cluster management and container orchestration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/5b966a64-54c6-46ff-b284-4299f34c8f84/lesson/6adccdb7-fa4b-4882-ab0d-7143abf61403)**
>
> Watch video content
