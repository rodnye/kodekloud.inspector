# Solution Install Helm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Solution-Install-Helm)

---

## Table of Contents

- Solution Install Helm
  - 1. Identifying the Operating System
  - 2. Installing Helm
  - 3. Validating the Helm Installation
  - Watch Video
    - 3.1. Installing Helm from the Repository
    - 3.2. Viewing Helm Commands
    - 3.3. Checking the Helm Version
    - 3.4. Enabling Verbose Output

---

## Content

Certified Kubernetes Application Developer - CKAD

Helm Fundamentals

# Solution Install Helm

In this lesson, we will walk through the steps required for the Helm installation lab, covering the process from identifying your operating system to validating your Helm installation.

## 1\. Identifying the Operating System

Before installing Helm, you need to verify the operating system on your machine. Run the following command to view your OS details:

```
root@controlplane ~ ➔ cat /etc/*release*
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=18.04
DISTRIB_CODENAME=bionic
DISTRIB_DESCRIPTION="Ubuntu 18.04.6 LTS"
NAME="Ubuntu"
VERSION="18.04.6 LTS (Bionic Beaver)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 18.04.6 LTS"
VERSION_ID="18.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic
root@controlplane ~ ➔
```

The output confirms that the machine is running Ubuntu. Therefore, we will choose Ubuntu-specific installation steps.

## 2\. Installing Helm

Refer to the official [Helm documentation](https://helm.sh/docs/) for the most accurate instructions. For Ubuntu, follow these commands. Depending on your package manager, use one of the methods below:

- **Using Chocolatey:**  
  (For environments where Chocolatey is available)

  ```
  choco install kubernetes-helm
  ```

- **Using Scoop:**  
  (For environments where Scoop is installed)

  ```
  scoop install helm
  ```

- **Using apt (Preferred for Ubuntu):**  
  Copy and execute the commands in your terminal to add the Helm repository, update your package list, and install Helm:

  ```
  curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
  sudo apt-get install apt-transport-https --yes
  echo "deb [arch=$(dpkg --print-architecture)] signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm.list
  sudo apt-get update
  sudo apt-get install helm
  ```

> [!important]
> **Note**
>
> Ensure you follow only the method applicable to your package management setup.

## 3\. Validating the Helm Installation

After installation, it's essential to confirm that Helm has been successfully installed on your system.

### 3.1. Installing Helm from the Repository

When installing Helm from the repository using the apt command, you should see an output similar to the following:

```
root@controlplane ~ ➜ sudo apt-get install helm
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  helm
0 upgraded, 1 newly installed, 0 to remove and 47 not upgraded.
Need to get 14.0 MB of archives.
After this operation, 46.3 MB of additional disk space will be used.
Get:1 https://baltocdn.com/helm/stable/debian all/main amd64 helm 3.9.2-1 [14.0 MB]
Fetched 14.0 MB in 0s (51.8 MB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package helm.
(Reading database ... 123456 files and directories currently installed.)
Preparing to unpack .../helm_3.9.2-1_amd64.deb ...
Unpacking helm (3.9.2-1) ...
Setting up helm (3.9.2-1) ...
Processing triggers for man-db (2.8.3-2ubuntu0.1) ...
root@controlplane ~ ➜
```

### 3.2. Viewing Helm Commands

You can explore Helm's available commands and options by invoking the help command:

```
Usage:
helm [command]


Available Commands:
  completion  generate autocompletion scripts for the specified shell
  create      create a new chart with the given name
  dependency  manage a chart's dependencies
  env         helm client environment information
  get         download extended information of a named release
  help        Help about any command
  history     fetch release history
  install     install a chart
  lint        examine a chart for possible issues
  list        list releases
  package     package a chart directory into a chart archive
  plugin      install, list, or uninstall Helm plugins
  pull        download a chart from a repository and (optionally) unpack it in local directory
  push        push a chart to remote
  registry    login to or logout from a registry
  repo        add, list, remove, update, and index chart repositories
  rollback    roll back a release to a previous revision
  search      search for a keyword in charts
  show        show information of a chart
  status      display the status of the named release
  template    locally render templates
  test        run tests for a release
  uninstall   uninstall a release
  upgrade     upgrade a release
```

> [!important]
> **Note**
>
> Remember to use the "env" command in lowercase when checking the Helm client environment information.

### 3.3. Checking the Helm Version

Verify that Helm is correctly installed and check its version by running:

```
root@controlplane ~ ➜ helm version
version.BuildInfo{Version:"v3.9.2", GitCommit:"1addefbfe665c30f4daf868a9adc5600cc064fd", GitTreeState:"clean", GoVersion:"go1.17.12"}
```

This confirms that you are running Helm version 3.9.2.

### 3.4. Enabling Verbose Output

For troubleshooting and deeper inspection, you can enable verbose output by adding the `--debug` flag when executing Helm commands. An excerpt from the Helm help output shows available flags:

```
Flags:
  --debug                  enable verbose output
  -h, --help               help for helm
  --kube-apiserver string  the address and the port for the Kubernetes API server
  --kube-as-group stringArray  group to impersonate for the operation, this flag can be repeated to specify multiple groups.
  --kube-as-user string    username to impersonate for the operation
  --kube-ca-file string    path to the certificate authority file for the Kubernetes API server connection
  --kube-context string     name of the kubeconfig context to use
  --kube-token string       bearer token used for authentication
  --kubeconfig string       path to the kubeconfig file
```

> [!important]
> **Note**
>
> Using the `--debug` flag will provide more detailed output, which is useful for diagnosing any issues during Helm operations.

This concludes the Helm installation lab. You now have Helm installed and verified on your Ubuntu machine, with the ability to leverage its extensive command set for managing Kubernetes deployments effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/80f2d29c-3838-486c-9f1f-4ee16ba8497c)**
>
> Watch video content
