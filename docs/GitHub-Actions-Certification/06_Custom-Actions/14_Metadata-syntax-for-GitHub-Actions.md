# Metadata syntax for GitHub Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Metadata-syntax-for-GitHub-Actions)

---

## Table of Contents

- Metadata syntax for GitHub Actions
  - Key Definitions
  - Basic Metadata Example
  - JavaScript Action Metadata
  - Docker Container Action Metadata
  - Composite Action Metadata
  - Action Types Comparison
  - Links and References
  - Watch Video
  - Practice Lab
    - Inputs and Outputs

---

## Content

GitHub Actions Certification

Custom Actions

# Metadata syntax for GitHub Actions

Every custom GitHub Action must include a metadata file (`action.yml` or `action.yaml`) in the repository root. This file defines how GitHub recognizes, configures, and runs your Action.

> [!important]
> **Note**
>
> The metadata file name must be either `action.yml` or `action.yaml` and live at the root of your Action’s repository.

## Key Definitions

| Key         | Required | Description                                                             |
| ----------- | -------- | ----------------------------------------------------------------------- |
| name        | Yes      | The display name in the GitHub Actions UI.                              |
| description | Yes      | A brief summary of what the Action does.                                |
| author      | No       | The creator’s name or handle.                                           |
| branding    | No       | Icon and color badge shown next to the Action name.                     |
| inputs      | No       | Parameters accepted by the Action at runtime.                           |
| outputs     | No       | Values produced by the Action for downstream steps.                     |
| runs        | Yes      | Specifies how to execute the Action (JavaScript, Docker, or Composite). |

## Basic Metadata Example

```
name: 'Hello Custom Action'
description: 'Greet someone and record the time'
author: 'Siddharth'
branding:
  icon: 'award'
  color: 'green'
inputs:
  who-to-greet:
    description: 'The person to greet'
    required: true
    default: 'Alice'
    deprecationMessage: 'This input will be removed in the next major version.'
outputs:
  time:
    description: 'Timestamp when greeting occurred'
runs:
  using: 'node20'
```

### Inputs and Outputs

- **inputs**  
  Define each parameter with:
  - `description` (required)
  - `required` (boolean)
  - Optional: `default`, `deprecationMessage`
- **outputs**  
  Define each output with:
  - `description` (required)

---

## JavaScript Action Metadata

Use this pattern when your Action runs on Node.js:

```
name: 'Hello JS Action'
description: 'Greets a user'
inputs:
  who-to-greet:
    description: 'Person to greet'
    required: true
outputs:
  time:
    description: 'Greeting timestamp'
runs:
  using: 'node20'           # node16 | node18 | node20, etc.
  pre: 'setup.js'           # Optional: runs before main
  pre-if: "runner.os == 'linux'"
  main: 'index.js'          # Entrypoint script
  post: 'cleanup.js'        # Optional: runs after main
  post-if: "runner.os == 'linux'"
```

- `using`: Node runtime version
- `main`: Primary entrypoint file
- `pre` / `post`: Setup and teardown scripts
- `pre-if` / `post-if`: Conditions for running pre/post scripts

---

## Docker Container Action Metadata

Container Actions package dependencies in a Docker image:

```
name: 'Hello Docker Action'
description: 'Greets a user in a container'
inputs:
  who-to-greet:
    description: 'Person to greet'
    required: true
outputs:
  time:
    description: 'Greeting timestamp'
runs:
  using: 'docker'
  image: 'Dockerfile'         # Or registry reference: docker://alpine:3.8
  args:
    - ${{ inputs.who-to-greet }}
  pre-entrypoint: 'setup.sh'    # Optional script before container ENTRYPOINT
  entrypoint: 'main.sh'         # Overrides Dockerfile ENTRYPOINT
  post-entrypoint: 'cleanup.sh' # Optional script after entrypoint
```

- `using`: Must be `docker`
- `image`: Path to `Dockerfile` or registry image
- `args`: Array of arguments passed to the container
- `pre-entrypoint` / `post-entrypoint`: Hooks around the container’s entrypoint

---

## Composite Action Metadata

Composite Actions let you chain shell commands and other Actions:

```
name: 'Hello Composite Action'
description: 'Greets a user with multiple steps'
inputs:
  who-to-greet:
    description: 'Person to greet'
    required: true
outputs:
  time:
    description: 'Greeting timestamp'
runs:
  using: 'composite'
  steps:
    - run: ./scripts/setup.sh
      shell: bash           # bash | sh | pwsh | python
    - run: echo "Hello, ${{ inputs.who-to-greet }}"
    - uses: docker://alpine:3.8
      with:
        entrypoint: /bin/sh
```

- `using`: Must be `composite`
- `steps`: List of step objects, each with `run` or `uses`
- Optional: `shell` to specify interpreter

---

## Action Types Comparison

| Action Type | `using`   | Entrypoint         | Common Use Case                    |
| ----------- | --------- | ------------------ | ---------------------------------- |
| JavaScript  | node16…20 | `main`, `pre/post` | Custom logic in Node.js            |
| Docker      | docker    | `image`, `args`    | Containerized tools and runtimes   |
| Composite   | composite | `steps`            | Shell scripts or combining Actions |

---

## Links and References

- [GitHub Actions Metadata Syntax](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)
- [Creating a JavaScript Action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [Implementing a Docker Container Action](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action)
- [Composite Run Steps Action](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#using-composite-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/69264a4c-4e60-4aae-b257-c3b2bd347def)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/7614d964-4f21-475d-8737-4b0d59f88444)**
>
> Practice lab
