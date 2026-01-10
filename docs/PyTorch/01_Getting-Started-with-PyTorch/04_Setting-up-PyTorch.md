# Setting up PyTorch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Getting-Started-with-PyTorch/Setting-up-PyTorch)

---

## Table of Contents

- Setting up PyTorch
  - Prerequisites
  - Installing PyTorch
  - Managing Python Environments
  - Next Steps
  - Watch Video
    - Using pip
    - Using Anaconda
    - Using Docker and Cloud Services
    - Creating and Activating a Virtual Environment

---

## Content

PyTorch

Getting Started with PyTorch

# Setting up PyTorch

This guide offers a comprehensive introduction to installing and configuing PyTorch. It covers installation options, best development practices, and ways to manage your Python environments for PyTorch projects.

![The image shows an agenda with four items related to PyTorch: an introduction, getting started, options for users, and best practices for development.](https://kodekloud.com/kk-media/image/upload/v1752883202/notes-assets/images/PyTorch-Setting-up-PyTorch/pytorch-agenda-introduction-getting-started.jpg)

Let's start by reviewing the prerequisites.

## Prerequisites

PyTorch is a Python-based deep learning library, so a Python installation is required. It is recommended to have Python 3.8 or later installed.

![The image shows a slide titled "PyTorch – Prerequisites," indicating that Python 3.8 or later is required.](https://kodekloud.com/kk-media/image/upload/v1752883203/notes-assets/images/PyTorch-Setting-up-PyTorch/pytorch-prerequisites-python-3-8.jpg)

It is wise to use the latest stable releases of both Python and PyTorch. Both tools are free, open-source, and compatible with major operating systems such as Windows, Linux, and macOS. You have several installation options including pip, Anaconda, or building from source.

For GPU acceleration, ensure that NVIDIA's CUDA toolkit and the necessary supporting packages are installed. For CPU-only installations, CUDA is not required.

![The image is a slide titled "PyTorch – Prerequisites" highlighting the need for GPU acceleration using the NVIDIA CUDA Toolkit.](https://kodekloud.com/kk-media/image/upload/v1752883205/notes-assets/images/PyTorch-Setting-up-PyTorch/pytorch-prerequisites-gpu-acceleration.jpg)

Additionally, confirm that your system meets the hardware requirements—a minimum of 4 GiB of RAM and enough storage space for PyTorch and its dependencies.

![The image outlines the hardware prerequisites for PyTorch, specifying a minimum requirement of 4 GB RAM.](https://kodekloud.com/kk-media/image/upload/v1752883206/notes-assets/images/PyTorch-Setting-up-PyTorch/pytorch-hardware-requirements-4gb-ram.jpg)

## Installing PyTorch

There are multiple methods to install PyTorch. Below are the primary approaches.

### Using pip

pip is the default package manager for Python, allowing you to install packages directly from the Python Package Index.

To install PyTorch along with the `torchvision` (for image processing) and `torchaudio` (for audio processing) libraries, open your terminal or command prompt and run:

```
pip install torch torchvision torchaudio
```

After installation, verify your setup with:

```
pip list
```

### Using Anaconda

Anaconda simplifies package management and environment isolation, making it ideal for data science and machine learning projects. With conda, you can avoid dependency conflicts by creating separate environments.

Ensure that the conda CLI is installed, then run:

```
conda install pytorch torchvision torchaudio -c pytorch
```

This command installs PyTorch and its related libraries from the official PyTorch Anaconda channel.

> [!important]
> **Building from Source**
>
> If you prefer building PyTorch from source, you must clone the repository and ensure you have a C++17-compatible compiler (e.g., GCC 9.4 on Linux or Visual Studio Build Tools on Windows). For GPU support, a compatible version of CUDA and cuDNN is also required.

### Using Docker and Cloud Services

Docker provides an isolated container environment for running PyTorch. Official Docker images from PyTorch also support GPU acceleration if available. To launch a Docker container with GPU support, use:

```
docker run --gpus all --rm -ti --ipc=host pytorch/pytorch:latest
```

Several cloud providers offer pre-configured environments for PyTorch:

- **Google Colab**: Provides free notebooks with GPU support.
- **Amazon SageMaker**: Offers integrated notebook solutions (SageMaker is a paid service).
- **Azure Machine Learning**: Hosts notebooks suitable for development and deployment (typically at a cost).

![The image lists alternative ways to install PyTorch using cloud providers, featuring Google Colab Notebooks, Amazon SageMaker, and Azure Machine Learning.](https://kodekloud.com/kk-media/image/upload/v1752883207/notes-assets/images/PyTorch-Setting-up-PyTorch/pytorch-installation-cloud-providers.jpg)

## Managing Python Environments

Using Python virtual environments helps manage project-specific dependencies without affecting the global Python installation. This isolation is particularly useful when working with multiple projects that might require different library versions.

![The image outlines the benefits of Python virtual environments, highlighting isolated environments, conflict avoidance, and easier management for handling multiple projects.](https://kodekloud.com/kk-media/image/upload/v1752883208/notes-assets/images/PyTorch-Setting-up-PyTorch/python-virtual-environments-benefits.jpg)

### Creating and Activating a Virtual Environment

Create a virtual environment using:

```
python -m venv myenv
```

Activate the environment:

- On Linux/macOS:

  ```
  source myenv/bin/activate
  ```

- On Windows:

  ```
  myenv\Scripts\activate
  ```

Once the virtual environment is active, install the necessary libraries. To capture your dependencies, export them to a requirements file:

```
pip freeze > requirements.txt
```

To replicate the environment later, install all the dependencies using:

```
pip install -r requirements.txt
```

![The image provides tips on using a `requirements.txt` file to manage project dependencies and suggests storing it in a shared repository like GitHub.](https://kodekloud.com/kk-media/image/upload/v1752883210/notes-assets/images/PyTorch-Setting-up-PyTorch/requirements-txt-dependency-tips.jpg)

## Next Steps

With these methods for setting up PyTorch and managing your environment covered, you are ready to explore the hands-on demonstration of PyTorch concepts and their applications.

For more detailed information on PyTorch and related technologies, consider exploring the following resources:

- [PyTorch Official Documentation](https://pytorch.org/docs/)
- [Introduction to Deep Learning with PyTorch](https://pytorch.org/tutorials/)
- [Python Virtual Environments Guide](https://docs.python.org/3/library/venv.html)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/5a59db15-2490-4be0-a894-4b3d3cc78fac/lesson/1cd89ed5-28a1-40c3-839a-37908e24724f)**
>
> Watch video content
