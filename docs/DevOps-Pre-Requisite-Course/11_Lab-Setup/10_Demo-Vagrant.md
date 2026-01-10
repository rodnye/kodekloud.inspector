# Demo Vagrant - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Demo-Vagrant)

---

## Table of Contents

- Demo Vagrant
  - Prerequisites
  - Setting Up Your Project Directory
  - Finding and Initializing a Vagrant Box
  - Booting Your VM
  - Customizing VM Resources
  - Troubleshooting Boot Timeout Errors
  - Conclusion
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Demo Vagrant

In this guide, you will learn how to deploy a virtual machine (VM) using Vagrant. We will cover installing Vagrant, initializing and configuring a Vagrant box (using CentOS 7 as an example), managing resources, and troubleshooting common boot timeout issues.

## Prerequisites

Before you begin, ensure that you have the following:

- Vagrant installed on your system. Download it from [Vagrantup.com](https://www.vagrantup.com) by selecting the appropriate version for your operating system.
- A virtual machine provider installed, such as VirtualBox, VMware Workstation, or Fusion. If you are using a provider other than VirtualBox, remember to specify it using the `--provider` option when running the `vagrant up` command.

> [!important]
> **Tip**
>
> Make sure the Vagrant command is available on your system after installation.

## Setting Up Your Project Directory

Start by opening your terminal and creating a directory for your Vagrant configurations. Navigate to your desired folder. For example:

```
host> ls
Applications
Desktop
Documents
Downloads
Google Drive
Google Drive File Stream
Library
Movies


host> cd Documents
host> ls
```

## Finding and Initializing a Vagrant Box

Vagrant boxes are available on [Vagrant Cloud](https://app.vagrantup.com/boxes/search). By browsing through the available options, you can choose a box that fits your needs. In this example, we will use the CentOS 7 box.

To initialize a Vagrantfile with the CentOS 7 box, run:

```
vagrant init centos/7
```

This command creates a Vagrantfile with a basic configuration where the active line is:

```
config.vm.box = "centos/7"
```

The generated Vagrantfile provides additional configuration examples as commented lines, such as settings for box update checking and port forwarding. Below is an excerpt from the file:

```
# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "centos/7"


  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  config.vm.box_check_update = false


  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port.
  config.vm.network "forwarded_port", guest: 80, host: 8080


  # Additional provisioning options (such as shell scripts, Ansible, Chef,
  # Docker, Puppet, and Salt) can be added here.
end
```

## Booting Your VM

To launch your virtual machine, run:

```
vagrant up
```

During this process, Vagrant downloads the CentOS 7 box (if not already available), creates the VM using your chosen provider, and sets up networking (e.g., forwarding port 22 from the guest to port 2222 on the host). The process might take a few minutes while the VM boots up. For instance, VirtualBox displays the new VM, and your terminal might look similar to this:

```
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'centos/7'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'centos/7' version '1905.1' is up to date...
==> default: Setting the name of the VM: Vagrant_default_1586965785289_34868
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
==> default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    SSH address: 127.0.0.1:2222
    SSH username: vagrant
    SSH auth method: private key
```

Once you see the “Machine booted and ready” message, you can SSH into the VM:

```
vagrant ssh
```

Inside the VM, verify the operating system version by inspecting `/etc/*release` or using other commands. To check the status of your VM at any time, run:

```
vagrant status
```

The status output will indicate whether your VM is running, for example:

```
Current machine states:


default                   running (virtualbox)


The VM is running. To stop this VM, you can run `vagrant halt` to shut it down forcefully, or `vagrant suspend` to suspend the virtual machine. In either case, to restart it, simply run `vagrant up`.
```

To shut down your VM, execute:

```
vagrant halt
```

After halting, you will see:

```
Current machine states:


default                   poweroff (virtualbox)


The VM is powered off. To restart the VM, simply run `vagrant up`
```

## Customizing VM Resources

The default Vagrantfile includes several commented options for configuring VM resources such as memory allocation and CPU count. By default, the VM might be configured with only 512 MB of RAM, which can affect performance.

To modify these settings for VirtualBox, uncomment and adjust the provider-specific configuration block. For example, to enable a graphical user interface and allocate additional memory and CPU cores, update your Vagrantfile with:

```
config.vm.provider "virtualbox" do |vb|
  vb.gui = true
  vb.memory = "1024"
  vb.cpus = 2
  vb.name = "my_centos_vm"
end
```

Remember to reload your VM for the changes to take effect:

```
vagrant reload
```

After reloading, you can verify the updated VM settings in VirtualBox.

## Troubleshooting Boot Timeout Errors

When running `vagrant up`, you might encounter boot timeout messages such as:

```
default: Warning: Remote connection disconnect. Retrying...
default: Warning: Connection reset. Retrying...
...
Timed out while waiting for the machine to boot. This means that
Vagrant was unable to communicate with the guest machine within
the configured time period ("config.vm.boot_timeout").
```

If you experience these issues, ensure networking is functioning properly and authentication is configured correctly. If your box is booting normally but requires extra time, increase the boot timeout by adding or modifying the timeout configuration in your Vagrantfile:

```
config.vm.boot_timeout = 600
```

After updating the timeout setting, reload your VM using:

```
vagrant halt
vagrant reload
```

> [!important]
> **Important**
>
> Increasing the `boot_timeout` value gives your VM additional time to start, helping to avoid premature timeout errors.

## Conclusion

This guide provided an introduction to deploying Vagrant VMs—from installation and Vagrantfile initialization to booting, resource management, and troubleshooting. Vagrant is a powerful tool for configuring multiple virtual environments and sharing custom lab setups. For advanced usage, consider exploring provisioning options with shell scripts or integrating configuration management tools like Ansible, Chef, Docker, and Puppet.

Happy Vagrant-ing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/778cabf7-e32a-4a5d-b5d9-db2e2c1863d5)**
>
> Watch video content
