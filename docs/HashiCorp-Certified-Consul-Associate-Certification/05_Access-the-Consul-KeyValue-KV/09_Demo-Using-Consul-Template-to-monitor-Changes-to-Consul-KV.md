# Demo Using Consul Template to monitor Changes to Consul KV - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Demo-Using-Consul-Template-to-monitor-Changes-to-Consul-KV)

---

## Table of Contents

- Demo Using Consul Template to monitor Changes to Consul KV
  - 1. Populate Consul K/V Store
  - 2. Download and Install Consul Template
  - 3. Create a Template File
  - 4. Render the Template
  - 5. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Demo Using Consul Template to monitor Changes to Consul KV

---

title: "Using Consul Template to Monitor Changes in Consul K/V" description: "Step-by-step guide to pull dynamic configuration from Consul K/V store using Consul Template."

---

In this tutorial, you'll learn how to leverage Consul Template to dynamically fetch configuration values from a Consul K/V store and generate application configuration files automatically. This approach ensures your application configs stay in sync with the latest Consul K/V entries.

## 1\. Populate Consul K/V Store

First, add the required key-value pairs for our eCommerce application. You can verify these entries in Consul UI or via CLI.

| Key                             | Value          | Description                       |
| ------------------------------- | -------------- | --------------------------------- |
| apps/eCommerce/version          | 4.5            | Current application version       |
| apps/eCommerce/environment      | production     | Deployment environment            |
| apps/eCommerce/database\\\_host | customer\\\_db | Hostname of the customer database |
| apps/eCommerce/database         | billing        | Database name for billing service |

Run the following commands:

```
consul kv put apps/eCommerce/version 4.5
consul kv put apps/eCommerce/environment production
consul kv put apps/eCommerce/database_host customer_db
consul kv put apps/eCommerce/database billing
```

## 2\. Download and Install Consul Template

Head over to the [Consul Template releases](https://releases.hashicorp.com/consul-template/) page and copy the link for your platform.

![The image shows a terminal window and a browser displaying a list of downloadable files for different operating systems from the HashiCorp Consul Template release page.](https://kodekloud.com/kk-media/image/upload/v1752877774/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Demo-Using-Consul-Template-to-monitor-Changes-to-Consul-KV/hashicorp-consul-template-downloads-terminal-browser.jpg)

> [!important]
> **Note**
>
> Make sure to choose the correct architecture (e.g., linux_amd64) from the release page.

Install and verify:

```
curl -sLo /tmp/consul-template.zip \
  https://releases.hashicorp.com/consul-template/0.25.1/consul-template_0.25.1_linux_amd64.zip

unzip /tmp/consul-template.zip -d /tmp
sudo mv /tmp/consul-template /usr/local/bin/

consul-template -v
# Expected output: consul-template v0.25.1
```

## 3\. Create a Template File

Define your template with placeholders that map to the Consul K/V keys:

```
cat << 'EOF' > config.json.tmpl
{
  "environment":   "{{ key "apps/eCommerce/environment" }}",
  "version":       "{{ key "apps/eCommerce/version" }}",
  "database_host": "{{ key "apps/eCommerce/database_host" }}",
  "database_name": "{{ key "apps/eCommerce/database" }}"
}
EOF
```

Each `{{ key "..." }}` snippet instructs Consul Template to fetch the corresponding value at render time.

## 4\. Render the Template

Use the `-once` flag for a single render, or run without it to watch for changes:

```
consul-template -template "config.json.tmpl:config.json" -once
```

> [!important]
> **Warning**
>
> Using `-once` renders the file a single time and then exits. Remove `-once` to keep watching for updates.

Verify the output:

```
ls
cat config.json
```

```
{
  "environment": "production",
  "version":     "4.5",
  "database_host": "customer_db",
  "database_name": "billing"
}
```

## 5\. Next Steps

In production, run Consul Template as a service or sidecar to continuously monitor your K/V store. This ensures that any update in Consul is immediately reflected in your application’s configuration.

---

## Links and References

- [Consul Template Documentation](https://www.consul.io/docs/agent/templates)
- [Consul K/V Store Overview](https://www.consul.io/docs/agent/kv)
- [HashiCorp Consul Template Releases](https://releases.hashicorp.com/consul-template/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/89c70441-5b19-4604-8e1e-340b8cf36803)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/8f6c68ef-cdcb-4abd-bbe1-552329ba0bfa)**
>
> Practice lab
