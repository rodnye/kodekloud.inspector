# Demo Setting up PyTorch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Getting-Started-with-PyTorch/Demo-Setting-up-PyTorch)

---

## Table of Contents

- Demo Setting up PyTorch
  - Step 1: Update Your System and Verify Python Installation
  - Step 2: Install pip and the venv Package
  - Step 3: Create and Activate a Virtual Environment
  - Step 4: Install PyTorch, TorchVision, and TorchAudio
  - Step 5: Verify the Installation
  - Step 6: Deactivate the Virtual Environment
  - Step 7: Reproducing Your Virtual Environment
  - Conclusion
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

PyTorch

Getting Started with PyTorch

# Demo Setting up PyTorch

Welcome to this comprehensive guide on configuring a PyTorch development environment. In this tutorial, you'll learn how to create an isolated Python virtual environment on an Ubuntu machine, install all required dependencies (including PyTorch, TorchVision, and TorchAudio), and verify the installation. This step-by-step approach ensures that your environment is reproducible for collaboration or deployment.

Before you start, visit the [PyTorch “Get Started” page](https://pytorch.org/get-started/) to choose your operating system, package manager, and CUDA version. The page dynamically generates the installation commands. For instance, for a nightly CPU build you may receive:

```
pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu
```

Alternatively, if you prefer Conda with CUDA 11.8 support, you might run:

```
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
```

For a typical installation using CUDA 11.8, the command is:

```
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

In the following sections, we detail how to set up your PyTorch environment on an Ubuntu system.

---

## Step 1: Update Your System and Verify Python Installation

Begin by updating your package list to ensure that you have the latest versions of available packages:

```
root@ubuntu-host:~ ➜ apt-get update
Get:1 http://old-releases.ubuntu.com/ubuntu lunar InRelease [267 kB]
Get:2 http://old-releases.ubuntu.com/ubuntu lunar-updates InRelease [109 kB]
Get:3 http://old-releases.ubuntu.com/ubuntu lunar-backports InRelease [99.9 kB]
Get:4 http://old-releases.ubuntu.com/ubuntu lunar-security InRelease [109 kB]
Get:5 http://old-releases.ubuntu.com/ubuntu lunar/multiverse amd64 Packages [289 kB]
Get:6 http://old-releases.ubuntu.com/ubuntu lunar/main amd64 Packages [1,797 kB]
Get:7 http://old-releases.ubuntu.com/ubuntu lunar/universe amd64 Packages [18.7 MB]
Get:8 http://old-releases.ubuntu.com/ubuntu lunar/restricted amd64 Packages [181 kB]
Get:9 http://old-releases.ubuntu.com/ubuntu lunar-updates/restricted amd64 Packages [325 kB]
Get:10 http://old-releases.ubuntu.com/ubuntu lunar-updates/main amd64 Packages [531 kB]
Get:11 http://old-releases.ubuntu.com/ubuntu lunar-updates/multiverse amd64 Packages [11.6 kB]
Get:12 http://old-releases.ubuntu.com/ubuntu lunar-backports/universe amd64 Packages [4,203 B]
Get:13 http://old-releases.ubuntu.com/ubuntu lunar-security/universe amd64 Packages [1,017 kB]
Get:14 http://old-releases.ubuntu.com/ubuntu lunar-security/main amd64 Packages [429 kB]
Get:15 http://old-releases.ubuntu.com/ubuntu lunar-security/restricted amd64 Packages [8,203 B]
Fetched 25.3 MB in 4s (7,220 kB/s)
Reading package lists... Done
root@ubuntu-host:~ ➜
```

It appears that Python is not installed yet. Install Python 3 (version 3.11 in this guide) and verify the installation with:

```
root@ubuntu-host:~ ⟶ python3 --version
Python 3.11.4


root@ubuntu-host:~ ⟶ which python3
/usr/bin/python3
```

---

## Step 2: Install pip and the venv Package

Pip is essential for managing Python packages. Install pip along with build dependencies:

```
root@ubuntu-host:~ ⟶ apt-get install -y python3-pip python3-dev python3-venv
```

During the installation, you will encounter output similar to this:

```
Setting up libgprofng0:amd64 (2.40-2ubuntu4.1) ...
Setting up python3-pip (23.0.1+dfsg-1ubuntu0.2) ...
...
root@ubuntu-host:~ #
```

Verify pip's installation:

```
root@ubuntu-host:~ ⟶ pip3 --version
pip 23.0.1 from /usr/lib/python3/dist-packages/pip (python 3.11)
```

---

## Step 3: Create and Activate a Virtual Environment

Isolating your project in a virtual environment prevents conflicts between package versions. Create a new virtual environment named "venv":

```
root@ubuntu-host:~ ⟶ python3 -m venv venv
```

Check that the `venv` directory has been created:

```
root@ubuntu-host:~ ⟶ ls -l
total 4
drwxr-xr-x 5 root root 4096 Dec 18 14:12 venv
```

Inside the `venv` folder, you will find several subdirectories and files:

```
root@ubuntu-host:~ ⟶ ls -l venv/
total 16
drwxr-xr-x 2 root root 4096 Dec 18 14:12 bin
drwxr-xr-x 2 root root 4096 Dec 18 14:12 include
drwxr-xr-x 3 root root 4096 Dec 18 14:12 lib
lrwxrwxrwx 1 root root   14 Dec 18 14:12 lib64 -> lib
-rw-r--r-- 1 root root  149 Dec 18 14:12 pyvenv.cfg
```

Activate the virtual environment with:

```
root@ubuntu-host:~ ⟶ source venv/bin/activate
```

Your prompt should now indicate that you are working within the virtual environment. You can safely install packages using pip without affecting the global Python installation.

---

## Step 4: Install PyTorch, TorchVision, and TorchAudio

With the virtual environment activated, install PyTorch and its related libraries via pip. This command also pulls in necessary NVIDIA libraries if a GPU is detected:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ pip3 install torch torchvision torchaudio
```

The installation will display output similar to:

```
Collecting torch
Downloading torch-2.5.1-cp311-cp311-manylinux1_x86_64.whl (906.5 MB)
Collecting torchvision
Downloading torchvision-0.20.1-cp311-cp311-manylinux1_x86_64.whl (7.2 MB)
Collecting torchaudio
Downloading torchaudio-2.5.1-cp311-cp311-manylinux1_x86_64.whl (3.4 MB)
...
```

This confirms that PyTorch along with TorchVision and TorchAudio (plus their dependencies) have been installed in your isolated environment.

---

## Step 5: Verify the Installation

To check that all packages installed correctly, list the installed packages using:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ pip3 list
```

For reproducibility, you can generate a requirements file:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ pip3 freeze > requirements.txt
```

Review the generated file:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ cat requirements.txt
```

The file should contain entries like:

```
filelock==3.16.1
fsspec==2024.10.0
Jinja2==3.1.4
MarkupSafe==3.0.2
...
torch==2.5.1
torchaudio==2.5.1
torchvision==0.20.1
```

Next, validate that PyTorch operates as expected by opening a Python interpreter:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ python3
```

Inside the interactive shell, run:

```
import torch
print(torch.__version__)  # Expected output: 2.5.1+cu124 (or similar)
print(torch.rand(2, 4))   # Generates a random 2x4 tensor
```

Optionally, check for CUDA-enabled GPU availability:

```
print(torch.cuda.is_available())
```

This returns True if a CUDA device is available, else it returns False. Exit the interpreter by pressing Ctrl+D.

---

## Step 6: Deactivate the Virtual Environment

Once you've completed testing, deactivate the virtual environment to return to the global Python state:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ deactivate
```

Running `pip3 list` in the global environment will now display only basic packages (e.g., pip, setuptools, wheel) without the additional PyTorch and NVIDIA libraries.

To double-check, reactivate your virtual environment and list its installed packages:

```
root@ubuntu-host:~ via 🐍 v3.11.4 ➜ source venv/bin/activate
root@ubuntu-host:~ via 🐍 v3.11.4 (venv) ➜ pip3 list
```

---

## Step 7: Reproducing Your Virtual Environment

Reproducibility is key when collaborating or migrating between machines. First, create a new virtual environment (named "venv2"):

```
root@ubuntu-host:~ via v3.11.4 ↣ python3 -m venv venv2
```

Verify both virtual environments exist:

```
root@ubuntu-host:~ via 🐍 v3.11.4 ➜ ls -l
total 12
-rw-r--r-- 1 root root   595 Dec 18 14:16 requirements.txt
drwxr-xr-x 6 root root  4096 Dec 18 14:14 venv
drwxr-xr-x 5 root root  4096 Dec 18 14:24 venv2
```

Activate the new environment:

```
root@ubuntu-host:~ via 🐍 v3.11.4 ➜ source venv2/bin/activate
```

Your new environment is minimal. Install all dependencies using the previously generated `requirements.txt`:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv2) ➜ pip3 install -r requirements.txt
```

After installation, validate the PyTorch version by starting Python:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv2) ➜ python3
```

Then execute:

```
import torch
print(torch.__version__)  # Expected output: 2.5.1+cu124 (or similar)
```

Exit the interpreter and deactivate the environment:

```
root@ubuntu-host:~ via 🐍 v3.11.4 (venv2) ➜ deactivate
```

> [!important]
> **Note**
>
> Generating a `requirements.txt` file helps ensure your project’s environment can be perfectly replicated on another machine, thereby improving collaboration efficiency.

---

## Conclusion

In this guide, you learned how to:

- Update an Ubuntu system and verify Python installation.
- Install pip and create a Python virtual environment.
- Install PyTorch along with TorchVision and TorchAudio in an isolated environment.
- Verify the installation and generate a reproducible `requirements.txt` file.
- Reproduce the virtual environment on another instance.

By following these steps, you ensure that your development environment is consistent and easily shareable. Happy coding with PyTorch!

---

## Additional Resources

- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
- [Python Virtual Environments Guide](https://docs.python.org/3/library/venv.html)
- [Understanding CUDA in PyTorch](https://pytorch.org/docs/stable/notes/cuda.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/5a59db15-2490-4be0-a894-4b3d3cc78fac/lesson/22b81745-1782-4121-8e27-2d1a632fda0f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/5a59db15-2490-4be0-a894-4b3d3cc78fac/lesson/c496c2d8-6495-4274-b1d9-53234081e334)**
>
> Practice lab
