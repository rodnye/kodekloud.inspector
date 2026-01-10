# Configure self hosted runners with proxies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-in-the-Enterprise-Cloud/Configure-self-hosted-runners-with-proxies)

---

## Table of Contents

- Configure self hosted runners with proxies
  - Proxy Configuration Options
  - Demo: Proxy in a Workflow
  - Setting Proxy Variables on the Runner Host
  - Verifying Proxy Usage in Your Workflow
  - Watch Video
    - 1. Environment Variables
    - 2. .env File
    - Docker Containers
    - Logs: No Proxy
    - Logs: Invalid Proxy Credentials
    - Logs: Proxy in Action

---

## Content

GitHub Actions Certification

GitHub Actions in the Enterprise Cloud

# Configure self hosted runners with proxies

In this guide, you’ll learn how to route your self-hosted GitHub Actions runner traffic through an HTTP/HTTPS proxy. A proxy server acts as an intermediary, forwarding requests between your runner and the Internet for improved security, privacy, or access to geo-restricted endpoints.

![The image shows a GitHub documentation page about configuring a proxy server with self-hosted runners, including instructions on using environment variables.](https://kodekloud.com/kk-media/image/upload/v1752876211/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-documentation-proxy-server-runners.jpg)

## Proxy Configuration Options

You can configure proxy settings for your self-hosted runner in two primary ways:

| Method                | Description                                                     | Configuration Location      |
| --------------------- | --------------------------------------------------------------- | --------------------------- |
| Environment Variables | Set `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` on the host.    | Shell profile or CI service |
| `.env` File           | Place a `.env` file in the runner directory with the same vars. | Runner install folder       |

### 1\. Environment Variables

On the machine hosting your runner, export:

| Variable       | Purpose                              | Example                                |
| -------------- | ------------------------------------ | -------------------------------------- |
| HTTPS\\\_PROXY | Proxy for HTTPS requests             | `http://proxy.local:8080`              |
| HTTP\\\_PROXY  | Proxy for HTTP requests              | `http://username:password@proxy.local` |
| NO\\\_PROXY    | Hosts or domains to bypass the proxy | `example.com,myserver.local:443`       |

```
export HTTPS_PROXY="http://proxy.local:8080"
export HTTP_PROXY="http://proxy.local:8080"
export NO_PROXY="example.com,myserver.local:443"
```

> [!important]
> **Note**
>
> `NO_PROXY` accepts comma-separated hostnames, IP addresses, or domains (optionally with ports).

### 2\. `.env` File

If modifying system environment variables is impractical, create a `.env` file in the directory where you extracted the runner:

```
https_proxy=http://proxy.local:8080
http_proxy=http://proxy.local:8080
no_proxy=example.com,myserver.local:443
```

### Docker Containers

For workflows that launch Docker containers, configure Docker’s proxy settings separately.  
For example, create or edit `/etc/systemd/system/docker.service.d/http-proxy.conf`:

```
[Service]
Environment="HTTP_PROXY=http://proxy.local:8080" "HTTPS_PROXY=http://proxy.local:8080"
```

Then reload and restart Docker:

```
systemctl daemon-reload
systemctl restart docker
```

---

## Demo: Proxy in a Workflow

The following sample workflow sends external HTTP requests with and without proxy authentication.

```
name: Demo Proxy Configuration
on: workflow_dispatch


jobs:
  demo_job:
    runs-on: self-hosted
    steps:
      - name: Hello
        run: echo "Hello from self-hosted runner!"


      - name: External Call (No Proxy)
        run: curl -v http://httpbin.org/ip


      - name: External Call (Invalid Proxy Credentials)
        run: |
          curl -v \
            -x http://wrong-user:wrong-pass@localhost:3128 \
            http://httpbin.org/ip
```

![The image shows a GitHub Actions page for a repository named "enterprise-actions-demo" with a workflow titled "Exploring Github Enterprise Action Features/Policies." It displays a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752876213/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-actions-enterprise-demo-workflow.jpg)

### Logs: No Proxy

```
$ curl -v http://httpbin.org/ip
* Connected to httpbin.org (3.214.174.72) port 80 (#0)
> GET /ip HTTP/1.1
> Host: httpbin.org
< HTTP/1.1 200 OK
{"origin": "35.188.139.128"}
```

This request bypasses any proxy and connects directly.

### Logs: Invalid Proxy Credentials

```
$ curl -v -x http://wrong-user:wrong-pass@localhost:3128 http://httpbin.org/ip
* Connected to localhost (127.0.0.1) port 3128 (#0)
> GET http://httpbin.org/ip HTTP/1.1
> Proxy-Authorization: Basic e3dyb25nLXVzZXI6d3Jvbmc=
< HTTP/1.1 407 Proxy Authentication Required
<title>ERROR: Cache Access Denied</title>
```

![The image shows a GitHub Actions job log with an error message indicating an external call failed due to invalid proxy credentials.](https://kodekloud.com/kk-media/image/upload/v1752876214/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-actions-job-log-error-proxy.jpg)

> [!important]
> **Warning**
>
> Avoid hard-coding credentials in workflows. Instead, store proxy credentials securely on the runner host or via GitHub [Secrets](/actions/security-guides/encrypted-secrets).

---

## Setting Proxy Variables on the Runner Host

On your VM or bare-metal host, export the proxy variables before launching the runner service:

```
export HTTPS_PROXY="http://user:password@localhost:3128"
export HTTP_PROXY="http://user:password@localhost:3128"
export NO_PROXY="example.com,myserver.local:443"
systemctl status squid   # Verify your Squid or other proxy service
```

![The image shows a GitHub documentation page about configuring a proxy server using environment variables for self-hosted runners. It includes examples of proxy URLs and a sidebar with navigation links related to GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876215/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-actions-proxy-server-configuration.jpg)

Restart the runner service so it picks up the new environment:

```
# Example if using a systemd service
systemctl restart actions.runner.your-repo.service
```

---

## Verifying Proxy Usage in Your Workflow

Update your workflow to print proxy variables and make an HTTPS request:

```
name: Verify Proxy Usage
on: workflow_dispatch


jobs:
  verify_proxy:
    runs-on: self-hosted
    steps:
      - name: Show Proxy Environment
        run: |
          echo "HTTPS_PROXY: $HTTPS_PROXY"
          echo "HTTP_PROXY:  $HTTP_PROXY"
          echo "NO_PROXY:    $NO_PROXY"


      - name: External Call via Proxy
        run: curl -v https://httpbin.org/ip
```

![The image shows a GitHub Actions interface with a completed workflow run named "demo_job," which includes steps like setting up the job, making an external call using cURL, and verifying proxy settings.](https://kodekloud.com/kk-media/image/upload/v1752876216/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-actions-demo-job-workflow-run.jpg)

Once the run completes:

![The image shows a GitHub Actions interface with a completed workflow run titled "Exploring Github Enterprise Action Features/Policies." The workflow includes steps like "Set up job," "Hello," "External Call using cURL," "Verify Proxy Settings," and "Complete job," all marked as successful.](https://kodekloud.com/kk-media/image/upload/v1752876217/notes-assets/images/GitHub-Actions-Certification-Configure-self-hosted-runners-with-proxies/github-actions-workflow-completed-steps.jpg)

### Logs: Proxy in Action

```
* Uses proxy env variable HTTP_PROXY = 'localhost:3128'
* Connected to localhost (127.0.0.1) port 3128 (#0)
> GET https://httpbin.org/ip HTTP/1.1
> Proxy-Authorization: Basic e2VjaGF0ZXpzOnBhc3N3b3JkMQ==
< HTTP/1.1 200 OK
{"origin": "127.0.0.1, 35.188.139.128"}
```

The runner picks up the proxy variables automatically, authenticates with your proxy (e.g., Squid), and successfully forwards requests.

---

Thank you for following this tutorial on setting up proxies for your self-hosted GitHub Actions runners! For more details, see the [GitHub Actions documentation](https://docs.github.com/actions/hosting-your-own-runners/configuring-the-proxy-for-self-hosted-runners).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/a0c1daa6-6a6b-452b-87c3-d03e6b253fd0)**
>
> Watch video content
