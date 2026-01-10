# Uploading Custom Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Customising-Models-With-Ollama/Uploading-Custom-Models)

---

## Table of Contents

- Uploading Custom Models
  - Recap
  - Why Use a Model Registry?
  - Publishing Your Model
  - Links and References
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Customising Models With Ollama

# Uploading Custom Models

In this tutorial, you'll learn how to share your custom local LLMs by uploading them to the Ollama model registry. We’ll start with a quick recap of model customization and then walk through the steps to publish and distribute models seamlessly.

## Recap

We’ve already covered:

- Customizing existing models with a `Modelfile` definition
- Building a new model using the `ollama create` command

![The image is a slide titled "Recap" with two points: customizing existing models using a Modelfile and the "ollama create" command.](https://kodekloud.com/kk-media/image/upload/v1752883685/notes-assets/images/Running-Local-LLMs-With-Ollama-Uploading-Custom-Models/recap-customizing-models-ollama.jpg)

## Why Use a Model Registry?

Imagine Jane, an AI developer, has fine-tuned a model for her application. Distributing the raw `Modelfile` means each teammate must pull and rebuild the model locally every time there’s an update—error prone and time-consuming:

![The image illustrates "Jane's Story," showing a flow from Jane to team members, leading to more changes and the development of a new AI application. It includes icons representing communication, media, and AI features.](https://kodekloud.com/kk-media/image/upload/v1752883686/notes-assets/images/Running-Local-LLMs-With-Ollama-Uploading-Custom-Models/janes-story-flow-ai-development.jpg)

A registry-based approach mirrors how container images work with [Docker Hub](https://hub.docker.com):  
Just push updates once, and everyone can pull the latest version:

![The image illustrates a workflow where Jane pushes a new model to team members, who can then pull the model. It includes icons representing media and data, with a note about a better way to share the model.](https://kodekloud.com/kk-media/image/upload/v1752883687/notes-assets/images/Running-Local-LLMs-With-Ollama-Uploading-Custom-Models/jane-model-push-workflow.jpg)

## Publishing Your Model

Follow these steps to upload and share your custom model on Ollama:

1.  **Create an Ollama Account**  
    Sign up at [ollama.com](https://ollama.com) and verify your email. You’ll use this account to push and manage models.
2.  **Configure Your SSH Public Key**  
    Ollama uses SSH keys to authenticate model uploads. Locate or generate your public key and add it to your account settings.

    | Platform | Default Public Key Path                          |
    | -------- | ------------------------------------------------ |
    | macOS    | `~/.ollama/id_ed25519.pub`                       |
    | Linux    | `~/.ollama/id_ed25519.pub`                       |
    | Windows  | `C:\\Users\\<username>\\.ollama\\id_ed25519.pub` |

    > [!important]
    > **Note**
    >
    > If you don’t have an SSH key pair yet, generate one with:
    >
    > ```
    > ssh-keygen -t ed25519 -f ~/.ollama/id_ed25519 -C "you@example.com"
    > ```

    ![The image illustrates the process of adding an Ollama public key from a local machine to an Ollama account, with icons representing each step.](https://kodekloud.com/kk-media/image/upload/v1752883690/notes-assets/images/Running-Local-LLMs-With-Ollama-Uploading-Custom-Models/ollama-public-key-setup-process.jpg)

3.  **Tag Your Model for Your Namespace**  
    Prefix your local model name with your Ollama username:

    ```
    $ ollama cp harris your_username/harris
    copied 'harris' to 'your_username/harris'
    ```

    > [!important]
    > **Warning**
    >
    > Make sure to replace `your_username` with your actual Ollama username to avoid naming conflicts.

4.  **Push the Model to the Registry**  
    Upload your tagged model:

    ```
    $ ollama push your_username/harris
    retrieving manifest
    pushing dde5aa3fc5ff... 100%  2.0 GB
    pushing 966de95ca8a6... 100%  1.4 KB
    ...
    success
    You can find your model at: https://ollama.com/your_username/harris
    ```

5.  **View and Run Your Published Model**  
    Open your model’s page to see details like architecture, parameters, and license—similar to [Llama 3.2](https://ai.meta.com/llama/) and other public models. You’ll also find the `ollama run` command to pull and launch the model locally:

    ![The image shows a user interface for managing an AI model named "harris," displaying details like model architecture, parameters, and system information. It includes options for editing and viewing the model's configuration and license details.](https://kodekloud.com/kk-media/image/upload/v1752883691/notes-assets/images/Running-Local-LLMs-With-Ollama-Uploading-Custom-Models/harris-ai-model-management-ui.jpg)

Once configured, any update to your `Modelfile` can be published with:

```
$ ollama push your_username/harris
```

Teammates can instantly pull the latest build:

```
$ ollama run your_username/harris
```

Proceed to the demonstration below to see this process in action!

## Links and References

- [Ollama Documentation](https://ollama.com/docs)
- [Docker Hub](https://hub.docker.com/)
- [Llama 3.2 Model by Meta AI](https://ai.meta.com/llama/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/5785c7c7-5088-4ac3-b82f-8835e72b66d0/lesson/e7eb45f0-d1ae-4dda-82b8-9e07dedc72f6)**
>
> Watch video content
