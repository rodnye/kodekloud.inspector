# Using Consul Watch to Monitor Changes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Using-Consul-Watch-to-Monitor-Changes)

---

## Table of Contents

- Using Consul Watch to Monitor Changes
  - 1. Configure a Watch in the Agent Configuration
  - 2. Start a Watch from the Command Line
  - Related Resources
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Using Consul Watch to Monitor Changes

When your configuration lives in Consul’s Key/Value store, you need an automated way to detect updates and react. Consul Watch is a built-in feature that continuously observes changes—whether in KV entries, service registration, node health, or custom events—and triggers handlers when updates occur.

![The image is a slide explaining how to monitor KV changes using the "Watch" feature in Consul, highlighting its built-in capabilities and handler options. It mentions that handlers can invoke commands or hit HTTP endpoints when changes are detected.](https://kodekloud.com/kk-media/image/upload/v1752877785/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Using-Consul-Watch-to-Monitor-Changes/monitor-kv-changes-consul-watch-slide.jpg)

Consul Watch runs entirely inside the agent—no extra binaries or plugins required. When a watched resource changes, you can:

- Log the event for downstream processing by log-collection tools.
- Execute a shell command or custom script via the `script` handler.
- Send an HTTP request to an API, webhook, or service endpoint via the `http` handler.

> [!important]
> **Note**
>
> Ensure your handler scripts have executable permissions (e.g., `chmod +x /path/to/script.sh`), and verify that the Consul agent user can invoke them.

Next, let’s review the watch types available out of the box.

![The image lists different types of "Watch" options for monitoring KV changes, including key, keyprefix, services, nodes, service, checks, and event, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752877786/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Using-Consul-Watch-to-Monitor-Changes/watch-options-kv-changes-monitoring.jpg)

| Watch Type | Description                             |
| ---------- | --------------------------------------- |
| key        | Watch a single key-value entry          |
| keyprefix  | Watch all keys under a specified prefix |
| services   | Monitor the list of registered services |
| nodes      | Monitor the list of cluster nodes       |
| service    | Monitor instances of a specific service |
| checks     | Monitor the state of health checks      |
| event      | Watch for custom user-triggered events  |

Under the hood, Consul Watch leverages the [blocking query](https://www.consul.io/docs/agent/concepts/blocking) feature of the HTTP API. You can configure and run watches in two ways:

1.  In the agent’s JSON configuration file
2.  With the `consul watch` CLI command

![The image is a slide titled "Monitor KV Changes Using Watch," explaining how watches are implemented using blocking queries in the Consul API, with details on configuration and behavior. It includes bullet points on adding watches to an agent configuration and using the `consul watch` command.](https://kodekloud.com/kk-media/image/upload/v1752877787/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Using-Consul-Watch-to-Monitor-Changes/monitor-kv-changes-consul-watch-slide-2.jpg)

## 1\. Configure a Watch in the Agent Configuration

Edit your Consul agent’s JSON config (e.g., `/etc/consul.d/agent.json`) and add a `watches` block:

```
{
  "watches": [
    {
      "type": "key",
      "key": "prod/database/mysql",
      "handler_type": "script",
      "args": ["/usr/bin/update_database_creds.sh"]
    }
  ]
}
```

After saving, restart or reload the Consul agent:

```
consul reload
```

## 2\. Start a Watch from the Command Line

You can also spin up a watch on the fly without touching config files:

```
consul watch -type=key \
  -key=prod/database/mysql \
  /usr/bin/update_database_creds.sh
```

Now, whenever the `prod/database/mysql` KV entry changes, Consul Watch executes your script—automatically rolling out updated credentials to your application.

## Related Resources

- [Consul Watches Documentation](https://www.consul.io/docs/agent/watches)
- [Consul Agent Configuration](https://www.consul.io/docs/configuration/agent)
- [Blocking Queries Overview](https://www.consul.io/docs/agent/concepts/blocking)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/e8885bb2-00e9-4491-8e51-82063605539b)**
>
> Watch video content
