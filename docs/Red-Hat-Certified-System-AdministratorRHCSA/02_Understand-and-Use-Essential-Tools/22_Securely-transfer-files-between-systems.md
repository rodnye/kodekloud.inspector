# Securely transfer files between systems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Securely-transfer-files-between-systems)

---

## Table of Contents

- Securely transfer files between systems
  - Using SCP for Secure File Transfer
  - Using SFTP for Interactive File Transfers
  - Conclusion
  - Watch Video
  - Practice Lab
    - Basic SCP Syntax
    - Establishing an SFTP Connection
    - Common SFTP Commands

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Securely transfer files between systems

In this guide, you'll discover how to securely transfer files between systems using two popular protocols: SCP and SFTP. Both of these tools leverage SSH (Secure Shell) for authentication and encryption, ensuring that your file transfers remain secure during transmission.

---

## Using SCP for Secure File Transfer

SCP (Secure Copy) is a command-line utility designed for quick and secure file transfers between hosts. By relying on SSH, SCP guarantees that your data is encrypted throughout the transfer process. Below is the basic syntax and usage examples.

### Basic SCP Syntax

1.  Specify the username and remote host using the format:  
    `username@remote_host`
2.  Provide the remote file path prefixed with a colon and a slash (`:/`).
3.  Define the local destination path where the file will be saved.

For example, to copy a file from a remote machine with IP `192.168.1.27` using the username `aaron`, execute:

```
$ scp aaron@192.168.1.27:/home/aaron/myfile.tgz /home/aaron/myfile.tgz
```

Similarly, to transfer a file from your local machine to a remote server, use:

```
$ scp /home/aaron/my_archive.tar aaron@192.168.1.27:/home/aaron/my_archive.tar
```

You can also transfer files directly between two remote systems. In that case, specify both remote locations:

```
$ scp aaron@192.168.1.27:/home/aaron/familyphoto.jpg aaron@192.168.1.59:/home/aaron/familyphoto.jpg
```

> [!important]
> **Note**
>
> When using SCP without explicitly specifying a username, the current local user will be assumed for the remote host.

To explore more options and learn about additional flags, refer to the SCP manual:

```
$ man scp
```

---

## Using SFTP for Interactive File Transfers

SFTP (Secure File Transfer Protocol) offers a more user-friendly, interactive interface for managing and transferring files securely. The connection command resembles that of SCP, providing an easy transition if you're familiar with secure shell protocols.

### Establishing an SFTP Connection

To connect to a remote host using the SFTP protocol, run:

```
$ sftp aaron@192.168.1.27
```

Once connected, you will be greeted with an `sftp>` prompt. From here, you can execute a range of commands to navigate and manage files.

### Common SFTP Commands

- **ls** – Lists files and directories on the remote system.
- **cd** – Changes directories on the remote host.
- **lls** or **lcd** – Lists files or changes directories locally (note the `l` prefix).

For instance, to navigate to the `Pictures` directory on the remote host, type:

```
sftp> cd Pictures
```

Switching to a local directory is just as simple:

```
sftp> lcd /local/path
```

To download a file from the remote system, use the `get` command:

```
sftp> get familypicture.jpg
```

If you need to download an entire directory recursively, add the `-r` flag:

```
sftp> get -r Pictures/
```

For uploading a file to the remote host, use the `put` command:

```
sftp> put myarchive.tgz
```

When you are finished with your SFTP session, exit by typing:

```
sftp> bye
```

For more detailed usage of SFTP and its commands, consult the manual page:

```
$ man sftp
```

> [!important]
> **Warning**
>
> Always ensure that you have the necessary permissions on both the local and remote systems to transfer files securely.

---

## Conclusion

Both SCP and SFTP provide robust solutions for secure file transfers. Choose SCP when you need a quick, one-off file copy, and opt for SFTP when you require a more interactive environment to navigate and transfer multiple files or directories.

For further insights, consider exploring additional resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/30ef7b0d-8b9f-4209-8b6c-e2991539a2bd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/90f18e8f-3edc-4cb5-b7d4-1f8cd2d7750f)**
>
> Practice lab
