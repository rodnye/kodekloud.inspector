# Demo Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Demo-Storage)

---

## Table of Contents

- Demo Storage
  - Application Overview
  - Setting Up Persistent Storage
  - Scaling the Application
  - References
  - Watch Video
    - 1. Create a Storage Pool
    - 2. Create a Persistent Storage Claim
    - 3. Attach the Storage to Your Deployment

---

## Content

OpenShift 4

Storage Templates and Catalog

# Demo Storage

Welcome to this comprehensive guide on implementing persistent storage in an OpenShift cluster. In this demo, we’ll show you how to modify an application to read data from a file and display it on the UI under the /read_file endpoint. This solution ensures that data persists across pod instances.

## Application Overview

The Python application has been altered to read a file located at `/data/testfile.txt` when the `/read_file` endpoint is accessed. Below is the relevant portion of the application code:

```
def main():
    # return 'Hello'
    print(color)
    return render_template('hello.html', name=socket.gethostname(), color=color_codes[color])

@app.route('/color/<new_color>')
def new_color(new_color):
    return render_template('hello.html', name=socket.gethostname(), color=color_codes[new_color])

@app.route('/read_file')
def read_file():
    with open("/data/testfile.txt") as f:
        contents = f.read()
    return render_template('hello.html', name=socket.gethostname(), contents=contents, color=color_codes[color])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080")
```

When you access `/read_file` without configuring persistent storage, you will encounter an error due to a missing file or directory on the pod.

> [!important]
> **Pro Tip**
>
> To troubleshoot this error, use the OpenShift Web Console to access the pod's terminal. This allows you to execute commands to inspect file paths and mounts within the container.

## Setting Up Persistent Storage

Follow these steps to add a persistent storage volume to your pods:

### 1\. Create a Storage Pool

Begin by creating a storage pool. Execute the following commands in your terminal session to list files and verify the directory structure:

```
(app-root) sh-4.2$ ls
anaconda-post.log  bin  boot  dev  etc  help.1  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
(app-root) sh-4.2$ ls -l /
total 72
-rw-r--r--  1 root root  11976  7 Apr  2:38 anaconda-post.log
drwxr-xr-x  3 root root   4096 May  1  18:50 bin -> usr/bin
drwxr-xr-x  83 root root   4096 May  1  18:51 boot
drwxr-xr-x  1 root root   4096 May  1  18:56 dev
-rw-r--r--  1 root root     0 May  1  18:56 etc
-rw-r--r--  1 root root   9999  2 May  1  18:56 help.1
drwxr-xr-x  2 root root   4096 May  2  21:06 home
lrwxrwxrwx  1 root root      9  7 Apr  2:38 lib -> usr/lib
lrwxrwxrwx  1 root root     10  7 Apr  2:38 lib64 -> usr/lib64
drwxr-xr-x  2 root root   4096 Nov  1  18:56 media
drwxr-xr-x  2 root root   4096 May  1  18:56 mnt
drwxr-xr-x  3 root root   4096 May  1  18:56 opt
dr-xr-xr-x  204 root root   4096 May  1  18:56 proc
drwxr-xr-x  1 root root   4096 May  1  18:56 run
drwxr-xr-x  2 root root   4096 May  1  18:56 sbin -> usr/sbin
drwxr-xr-x  2 root root   4096 May  1  18:56 srv
drwxr-xr-x  1 root root   4096 May  1  18:56 sys
drwxrwxrwt  1 root root   4096 May  1  18:56 tmp
drwxr-xr-x  1 root root   4096 May  1  18:56 usr
drwxr-xr-x  42 root root   4096 May  2  18:38 var
(app-root) sh-4.2$
```

### 2\. Create a Persistent Storage Claim

Navigate to the Storage section in the OpenShift Web Console and click on **Create Storage**. Provide a name for your storage claim and specify the desired size.

![The image shows the OpenShift Web Console interface, specifically the "Create Storage" page, where a user can define storage settings such as name, access mode, and size.](https://kodekloud.com/kk-media/image/upload/v1752882794/notes-assets/images/OpenShift-4-Demo-Storage/openshift-web-console-create-storage.jpg)

### 3\. Attach the Storage to Your Deployment

After creating the storage claim, update the deployment configuration by adding the newly created storage under volumes. Apply the changes to your deployment with this command:

```
oc rollout latest dc/webapp-color -n web-application-2
```

You'll be prompted to provide the mount path for the volume. In this example, the mount path is `/data`.

Once the storage is attached, verify the new mount point within the pod's terminal. Then, create a test file with the following content:

```
bash
sh-4.2$ ls -l /
total 76
-rw-r--r--  1 root root  11976 Apr  2 18:38 anaconda-post.log
drwxr-xr-x  2 root root   4096 Apr  2 18:46 bin -> usr/bin
drwxr-xr-x  2 root root   4096 Apr  2 18:44 data
drwxr-xr-x  83 root root   4096 May  1 12:42 dev
-rw-r--r--  1 root root       0 Nov  5  2016 etc
drwxr-xr-x  2 root root   4096 Apr  2 18:36 help.1
drwxr-xr-x  1 root root   4096 Apr  2 18:21 home
lrwxrwxrwx  1 root root     12 Jan  9  lib -> usr/lib
lrwxrwxrwx  1 root root     15 Jan  9  lib64 -> usr/lib64
drwxr-xr-x  2 root root   4096 Nov  5  2016 media
drwxr-xr-x  2 root root   4096 May  1 12:42 mnt
drwxr-xr-x  1 root root   4096 Apr  2 18:21 opt
dr-xr-xr-x  42 root root   4096 Apr  2 18:38 proc
drwxr-xr-x  2 root root   4096 Apr  2 18:42 run
drwxr-xr-x  2 root root   4096 Apr  2 18:21 sbin -> usr/sbin
drwxr-xr-x  1 root root   4096 May  1 12:42 srv
dr-xr-xr-x  1 root root      0 May  1 12:43 sys
-rw-r--r--  1 root root   1196 Apr 11  2018 tmp
drwxr-xr-x  34 root root   4096 Apr  2 18:38 var
sh-4.2$ echo "This is a test file for persistent storage." > /data/testfile.txt
```

After saving the file, accessing the `/read_file` endpoint in your browser will display the file's contents. Any subsequent updates to the file can be viewed by refreshing the browser.

![The image shows a web page with a blue background displaying the message "Hello from webapp-color-5-bcjg4!" and a text box containing test content.](https://kodekloud.com/kk-media/image/upload/v1752882795/notes-assets/images/OpenShift-4-Demo-Storage/hello-from-webapp-color-5.jpg)

## Scaling the Application

When scaling your application, all replicas will share the same persistent storage. As new instances are deployed, each replica will display the identical file contents. This verifies that the persistent storage is functioning correctly across the entire deployment.

> [!important]
> **Final Thoughts**
>
> Using persistent storage in OpenShift not only ensures data durability but also simplifies troubleshooting and scaling. Make sure to follow best practices when configuring your deployments.

That's it for this guide. Happy coding, and see you next time!

## References

- [OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/4292a2a9-628a-4826-9d2d-1fe2ee63f468)**
>
> Watch video content
