# Create and distribute SSH keys to managed nodes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Install-and-Configure/Create-and-distribute-SSH-keys-to-managed-nodes)

---

## Table of Contents

- Create and distribute SSH keys to managed nodes
  - Generating SSH Keys
  - Configuring Passwordless SSH Login
  - SSH Keys in an Ansible Environment
  - Updating the Ansible Inventory File
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Install and Configure

# Create and distribute SSH keys to managed nodes

In this article, learn how to create a static inventory hosts file and configure SSH key-based authentication for your managed nodes. Managed nodes are target machines—whether they are web servers, database servers, or other systems—that you manage with Ansible. While using username and password authentication (as shown in the example below) may be acceptable in learning environments, it is not recommended for production. Instead, SSH key-based authentication enhances security and is the preferred method for production deployments.

Below is an example inventory file using password-based authentication:

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100 ansible_ssh_pass=Passw0rd
web2 ansible_host=172.20.1.101 ansible_ssh_pass=Passw0rd
```

For improved security, we will now set up SSH key-based authentication.

> [!important]
> **What are SSH Keys?**
>
> SSH keys provide a secure method of authenticating without using passwords. You generate a pair of keys—a private key (which you keep secure) and a public key (which you share with remote systems). The public key functions like a lock on the remote machine, while your private key acts as the key that unlocks it.

## Generating SSH Keys

If you are new to SSH keys on Linux, here is a brief refresher. Assume you are using your local computer (laptop or virtual machine) to connect to a remote system. In environments where password-based authentication is disabled for security reasons, you rely on SSH keys. To create a pair of SSH keys, run the following command:

```
ssh-keygen
```

After execution, two files will be generated:

- `id_rsa` – your private key, which must remain securely on your system.
- `id_rsa.pub` – your public key, which can be shared with remote systems.

These files form a "key and lock" pair, where the public key (lock) is placed on the remote system and the private key (key) remains with you.

## Configuring Passwordless SSH Login

Copy the contents of your public key (`id_rsa.pub`) into the `~/.ssh/authorized_keys` file on the remote system. Once the public key has been added, you can establish a connection using your private key with the `-i` flag, as shown below:

```
cat ~/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc...KhtUBfoTzlBqRV1NThrOo4opzEwRQ01mWx user1


ssh -i id_rsa user1@server1
```

If the connection is successful, you will see a message similar to:

```
Successfully Logged In!
```

For environments with multiple virtual machines (VMs), copy the same public key to the `authorized_keys` file on each server. Remember, SSH keys are specific to user accounts, so ensure you use the same user when connecting to different servers.

In many cases, you may start by transferring the SSH keys using password-based authentication; after confirming that passwordless access works, disable password-based authentication for added security.

## SSH Keys in an Ansible Environment

The process in an Ansible environment involves:

1.  Generating a pair of SSH keys on the Ansible control node.
2.  Transferring the public key to each target VM.

A handy tool for automating this transfer is `ssh-copy-id`. For example, to copy your public key to a remote server, run:

```
ssh-copy-id -i id_rsa user1@server1
```

A sample output may be:

```
Number of key(s) added: 1
```

Test the connection with:

```
ssh -i id_rsa user1@server1
```

Successful authentication will display:

```
Successfully Logged In!
```

## Updating the Ansible Inventory File

With SSH key-based authentication established, update your Ansible inventory file. By default, Ansible assumes the user is `root`. If you are using a different user, specify that in your inventory file. If your private key is in the default location under the user's home directory, Ansible will detect it automatically. If the key is stored in a custom path, include the `ansible_ssh_private_key_file` parameter to inform Ansible of its location.

```
/etc/ansible/hosts
web1 ansible_host=172.20.1.100 ansible_user=user1 ansible_ssh_private_key_file=/some-path/private-key
web2 ansible_host=172.20.1.101 ansible_user=user1 ansible_ssh_private_key_file=/some-path/private-key
```

With these configurations, you have successfully set up passwordless, SSH key-based authentication for your managed nodes within an Ansible environment. Enhance your skills further by practicing SSH key-based authentication on your servers.

> [!important]
> **Next Steps**
>
> Continue exploring Ansible's capabilities by integrating other security best practices and advanced configurations to optimize your environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/af9a5709-7afb-4d60-8e6c-4dd10e438a7a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/f521e68d-4c4a-4fc5-bbd7-d394df07d086/lesson/2473c08e-b468-4887-9832-96aeadbf2b11)**
>
> Practice lab
