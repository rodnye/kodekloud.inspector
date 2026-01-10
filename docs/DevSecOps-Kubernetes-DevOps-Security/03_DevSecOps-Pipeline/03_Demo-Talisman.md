# Demo Talisman - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Talisman)

---

## Table of Contents

- Demo Talisman
  - Talisman Repository
  - Installing Talisman Locally
  - Preparing the Demo Repository
  - Installing the Pre-Push Hook
  - Testing Talisman Scans
  - Ignoring Specific Files
  - Cleaning Up and Final Push
  - Links and References
  - Watch Video
  - Practice Lab
    - Prerequisites
    - Hook Types Comparison

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Talisman

In this lesson, you’ll see Talisman in action—installing it on a developer workstation, scanning for secrets before pushing, and configuring exceptions.

## Talisman Repository

You can find the official Talisman project on GitHub. Explore the code, review open issues, or contribute back to the repository.

![The image shows a GitHub repository page for "thoughtworks/talisman," displaying the code files, recent commits, and an "About" section describing the project.](https://kodekloud.com/kk-media/image/upload/v1752873704/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Talisman/github-repo-thoughtworks-talisman.jpg)

Refer to the project’s [README](https://github.com/thoughtworks/talisman/blob/master/README.md) for detailed installation and usage instructions.

![The image shows a GitHub page for the "Talisman" project, displaying a table of contents related to installation and usage instructions. The page includes various sections like installation methods and handling hooks.](https://kodekloud.com/kk-media/image/upload/v1752873705/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Talisman/talisman-github-page-installation-usage.jpg)

## Installing Talisman Locally

### Prerequisites

- Git installed on your Linux or macOS system
- `curl` (or `wget`) available in your PATH

Download and install Talisman as a Git hook in your project directory:

```
# Fetch and prepare the installer
curl https://thoughtworks.github.io/talisman/install.sh -o ~/install-talisman.sh
chmod +x ~/install-talisman.sh


cd /path/to/your-git-project


# Install as a pre-push hook (default)
~/install-talisman.sh


# Optionally install as a pre-commit hook
~/install-talisman.sh pre-commit
```

> [!important]
> **Note**
>
> The installer adds or updates hooks in `.git/hooks`. Ensure you have write permissions to the project directory before running the script.

### Hook Types Comparison

| Hook Type  | Purpose                                | Installation Command               |
| ---------- | -------------------------------------- | ---------------------------------- |
| pre-push   | Scan code before running `git push`    | `~/install-talisman.sh`            |
| pre-commit | Scan code before allowing `git commit` | `~/install-talisman.sh pre-commit` |

## Preparing the Demo Repository

On your VM, clone (or navigate to) the demo repository and pull the latest changes:

```
git clone https://github.com/your-org/devsecops-k8s-demo.git
cd devsecops-k8s-demo
git pull
ls -l
```

You should see:

- `Jenkinsfile`
- `Dockerfile`
- `k8s_deployment_service.yaml`
- `.git` folder (containing the `hooks` directory)

## Installing the Pre-Push Hook

Add Talisman to your demo repo:

```
~/install-talisman.sh
```

Verify the hook is in place:

```
ls .git/hooks | grep pre-push
# pre-push
# pre-push.sample
```

## Testing Talisman Scans

Create a directory with sample files simulating secrets:

```
mkdir sec_files && cd sec_files


echo "username=siddharth"                                > file1
echo "secure-password123"                               > password.txt
echo "apikey=iz5yCqhjgrPtr_La56sdukjfav_laCqhjgrPtr_2s"  > file2
echo "base64encodedsecret=cGFzc3dvcmx0aXMtcXdlcnR5MTIzCg==" > file3


cd ..
```

Stage and commit:

```
git add sec_files/
git commit -m "Add test secret files"
```

Attempt to push:

```
git push
```

Talisman will scan and block any push with detected secrets. Example output:

```
Talisman Scan: 12 / 12  <----- ERRORS -----------
FILE                       | ERRORS                                           | SEVERITY
---------------------------+--------------------------------------------------+---------
sec_files/password.txt     | failed checks against the pattern password       | low
sec_files/file3            | contains base64 encoded strings                  | low
sec_files/file3            | potential secret pattern: base64encodedsecret=…   | low
sec_files/file2            | potential secret pattern: apikey=iz5yCqhjgrPtr…   | low


error: failed to push some refs to 'https://github.com/...'
```

> [!important]
> **Note**
>
> By default, Talisman checks for passwords, API keys, and Base64-encoded secrets. You can customize its behavior with a `.talismanrc` file if needed.

## Ignoring Specific Files

To exempt certain files from scanning, create a `.talismanrc` in your project root:

```
fileignoreconfig:
  - filename: sec_files/file3
    checksum: b058bbb495454d508634e7d508163ad962c3ec699bc676db38a5
```

Then commit and push again:

```
git add .talismanrc
git commit -m "Ignore base64 file3 in Talisman scans"
git push
```

Talisman will now skip `sec_files/file3` but still block other flagged content.

## Cleaning Up and Final Push

Remove or refactor any remaining flagged files:

```
cd sec_files
rm password.txt file2
cd ..
git add -u
git commit -m "Remove sensitive files"
git push
```

With only approved files left, the final push should succeed.

---

By integrating Talisman as a pre-push (or pre-commit) hook, you ensure that sensitive data—passwords, API keys, and Base64-encoded tokens—are caught before they reach your remote repository.

## Links and References

- [Talisman GitHub Repository](https://github.com/thoughtworks/talisman)
- [Talisman README](https://github.com/thoughtworks/talisman/blob/master/README.md)
- [ThoughtWorks DevSecOps](https://www.thoughtworks.com/insights/topics/devsecops)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/4d7a5ddd-8915-4c81-9707-aad8bebb3d1c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/542f820d-7fa7-4705-9f4a-9d47f8f9e0d8)**
>
> Practice lab
