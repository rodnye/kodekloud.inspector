# Demo Setting Up a ChatGPT Like Interface With Ollama - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Demo-Setting-Up-a-ChatGPT-Like-Interface-With-Ollama)

---

## Table of Contents

- Demo Setting Up a ChatGPT Like Interface With Ollama
  - 1. Explore the Ollama Repository
  - 2. Integrate with Open Web UI
  - 3. Start and Connect Ollama
  - 4. Admin Features
  - Links and References
  - Watch Video
    - Run Models from the Terminal
    - 2.1 Test the Chat API
    - 2.2 Install Open Web UI
    - 2.3 Sign In and Model Discovery
    - 3.1 Chat with Your Model
    - 3.2 Switch and Compare Models

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Demo Setting Up a ChatGPT Like Interface With Ollama

Ollama is an open-source project that lets you run large language models locally via the terminal or integrate them into custom tools. Its thriving community has built numerous extensions and UIs, enabling a chat-style experience similar to ChatGPT—all on your own hardware. In this guide, we’ll explore community integrations and walk through setting up the popular Open Web UI.

## 1\. Explore the Ollama Repository

Start by visiting the Ollama GitHub repository for code, documentation, and community links:

![The image shows a GitHub repository page for "ollama/ollama," displaying a list of directories and files, along with repository statistics and information on the right side.](https://kodekloud.com/kk-media/image/upload/v1752883699/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Setting-Up-a-ChatGPT-Like-Interface-With-Ollama/github-repo-ollama-directory-list.jpg)

Scroll to the **Community Integrations** section to find tools, scripts, and libraries contributed by users.

### Run Models from the Terminal

Use the `ollama run` command to launch models locally:

```
ollama run llama3.2
ollama run llama3.3
ollama run llama3.2:1b
ollama run llama3.2-vision
ollama run llama3.2-vision:90b
ollama run llama3.1
ollama run llama3.1:405b
ollama run phi4
ollama run phi3
ollama run gemma2:2b
ollama run gemma2
ollama run gemma2:27b
```

These cover everything from basic LLMs to vision-enabled models and domain-specific variants.

![The image shows a list of links and descriptions for various software projects or tools, likely from a README file on a code repository platform.](https://kodekloud.com/kk-media/image/upload/v1752883700/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Setting-Up-a-ChatGPT-Like-Interface-With-Ollama/software-projects-links-list.jpg)

## 2\. Integrate with Open Web UI

[Open Web UI](https://github.com/open-webui/open-webui) provides a browser-based chat interface for your local Ollama models. Instead of command-line prompts, you get a sleek web app similar to ChatGPT.

### 2.1 Test the Chat API

Before installing the UI, verify the REST endpoint:

```
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    { "role": "user", "content": "Why is the sky blue?" }
  ]
}'
```

### 2.2 Install Open Web UI

You can choose between a Python package or Docker container.

| Method               | Installation Commands                                                                                                                                                                                                                   | Pros                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Python package       | `bash<br>pip install open-webui<br>open-webui serve`                                                                                                                                                                                    | Quick dev setup                          |
| Docker (recommended) | `bash<br>docker run -d \\ <br> -p 3000:8080 \\ <br> --add-host host.docker.internal:host-gateway \\ <br> -v open-webui:/app/backend/data \\ <br> --name open-webui \\ <br> --restart always \\ <br> ghcr.io/open-webui/open-webui:main` | Isolated, auto-updates, production-ready |

> [!important]
> **Note**
>
> If you plan to share the UI across a team or deploy in production, Docker ensures consistent environments and easy upgrades.

When using Docker, you should see output like:

```
Unable to find image 'ghcr.io/open-webui/open-webui:main' locally
main: Pulling from open-webui/open-webui
7ce705000c3: Pull complete
8154794b2156: Pull complete
...
Status: Downloaded newer image for ghcr.io/open-webui/open-webui:main
```

Once running, open http://localhost:3000 in your browser.

### 2.3 Sign In and Model Discovery

On first access, create an admin user and sign in. The layout will resemble popular chat apps. If no models appear, the Ollama service is inactive.

## 3\. Start and Connect Ollama

Activate the Ollama background service so Open Web UI can list and query models:

```
ollama ps
```

Refresh your browser. You should now see models such as `llama3.2` available in the dropdown.

### 3.1 Chat with Your Model

1.  Select **llama3.2** from the model list.
2.  Type a prompt, e.g., “Compose a poem on Kubernetes.”
3.  Hit **Send** and watch your local LLM respond in real time.

### 3.2 Switch and Compare Models

Pull a different model:

```
ollama pull llama3.3
```

After the download completes, refresh the UI and choose **llama3.3**. Compare outputs side by side to determine which model suits your use case best.

## 4\. Admin Features

For team deployments, Open Web UI includes an **Admin Panel** to manage users, roles, and permissions—all within your on-prem infrastructure.

![The image shows a user management interface with one user listed as an admin, displaying details like name, email, last active time, and creation date.](https://kodekloud.com/kk-media/image/upload/v1752883701/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Setting-Up-a-ChatGPT-Like-Interface-With-Ollama/user-management-interface-admin-details.jpg)

Here you can:

- Add or remove users
- Assign roles (admin, member)
- Monitor last active times and creation dates

> [!important]
> **Warning**
>
> Always ensure your admin account has a strong, unique password to protect your on-premises data.

---

## Links and References

- [Ollama GitHub Repository](https://github.com/ollama/ollama)
- [Open Web UI Documentation](https://github.com/open-webui/open-webui)
- [Docker Installation Guide](https://docs.docker.com/get-docker/)

Explore these resources to extend your local LLM setup and discover more community integrations!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/2047b4e6-8bc7-481c-8341-83caf01254fe)**
>
> Watch video content
