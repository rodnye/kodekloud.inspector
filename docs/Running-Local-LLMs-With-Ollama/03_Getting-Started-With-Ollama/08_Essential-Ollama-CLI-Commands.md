# Essential Ollama CLI Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Essential-Ollama-CLI-Commands)

---

## Table of Contents

- Essential Ollama CLI Commands
  - Quick Reference
  - ollama run
  - ollama stop
  - ollama list
  - ollama rm
  - ollama pull
  - ollama show
  - ollama ps
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Essential Ollama CLI Commands

Streamline your local AI model workflow with the Ollama CLI. If you have experience with [Docker](https://www.docker.com), many of these commands will feel instantly familiar.

> [!important]
> **Note**
>
> Most Ollama commands mirror Docker syntax for running, listing, and managing images—making it easy to get started if you’ve used Docker before.

## Quick Reference

| Command     | Purpose                                     | Example                  |
| ----------- | ------------------------------------------- | ------------------------ |
| ollama run  | Pull (if needed) and start a model          | `ollama run MODEL_NAME`  |
| ollama stop | Terminate a background model                | `ollama stop MODEL_NAME` |
| ollama list | Display all local models                    | `ollama list`            |
| ollama rm   | Remove a model to free disk space           | `ollama rm MODEL_NAME`   |
| ollama pull | Download a model without launching it       | `ollama pull MODEL_NAME` |
| ollama show | Inspect model metadata (quantization, etc.) | `ollama show MODEL_NAME` |
| ollama ps   | List currently running models               | `ollama ps`              |

---

## ollama run

Start a model session. If the specified model isn’t on your machine, Ollama will:

1.  Download its manifest and layers
2.  Verify the SHA-256 digests
3.  Save the manifest locally
4.  Launch an interactive chat interface

```
$ ollama run MODEL_NAME
pulling manifest
pulling 633fc5be925f... 100%
pulling fa8235e5b48f... 100%
pulling 542b217f179c... 100%
pulling 8de1baf1db0... 100%
pulling 23291dc44752... 100%
verifying sha256 digest
writing manifest
success
```

---

## ollama stop

When you run a model in the background (e.g., via `&` on Unix), stop it gracefully with:

```
$ ollama stop MODEL_NAME
```

This frees up GPU/CPU resources immediately.

---

## ollama list

List all models stored on your local host, along with their IDs, sizes, and last modification times. Use this to identify large or outdated models:

```
$ ollama list
NAME             ID              SIZE    MODIFIED
phi3:latest      4f2229297938   2.2 GB  20 hours ago
qwen:latest      d53d04290064   2.3 GB  12 days ago
mistral:latest   f974a74358d6   4.1 GB  13 days ago
llama3.2:latest  a80c4f17acd5   2.0 GB  13 days ago
```

---

## ollama rm

Remove a model from your system to reclaim disk space. You can always re-pull it later.

```
$ ollama rm MODEL_NAME
deleted 'MODEL_NAME'
```

---

## ollama pull

If you want to prefetch a model without starting it immediately, use:

```
$ ollama pull MODEL_NAME
pulling manifest
pulling dde5aa3fc5ff... 100%   2.0 GB
pulling 966de95ca8a6... 100%   1.4 KB
pulling fcc5a6bec9da... 100%   7.7 KB
pulling a70ff7e570d9... 100%   6.0 KB
pulling 56bb8bd477a5... 100%   96 B
pulling 34bb5ab01051... 100%   561 B
verifying sha256 digest
writing manifest
success
```

After pulling, a subsequent `ollama run MODEL_NAME` will skip downloads.

---

## ollama show

Inspect model metadata—such as license details and quantization format—without running it:

```
$ ollama show llama3.2
License
LLAMA 3.2 COMMUNITY LICENSE AGREEMENT
Llama 3.2 Version Release Date: September 25, 2024
quantization    Q4_K_M
...
```

You can also view model details on the [Ollama website](https://ollama.com) or from within a running session via the `/show` command.

---

## ollama ps

Similar to `docker ps`, this command lists all active model processes, their resource consumption, and remaining runtime:

```
$ ollama ps
NAME             ID              SIZE    PROCESSOR    UNTIL
phi3:latest      4f2229297938    6.6 GB  100% GPU     4 minutes from now
llama3.2:latest  a80c4f17acd5    4.0 GB  100% GPU     4 minutes from now
```

> [!important]
> **Warning**
>
> Keep an eye on running models. Stopping unused ones prevents unnecessary GPU/CPU usage and conserves system memory.

---

These core commands will help you manage Ollama models effectively. Happy modeling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/704e8a4e-a4cd-4bd2-aa95-178a7c305671)**
>
> Watch video content
