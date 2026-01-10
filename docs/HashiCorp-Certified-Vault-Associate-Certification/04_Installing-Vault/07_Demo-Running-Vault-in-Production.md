# Demo Running Vault in Production - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Installing-Vault/Demo-Running-Vault-in-Production)

---

## Table of Contents

- Demo Running Vault in Production
  - Table of Contents
  - 1. Install the Vault Binary
  - 2. Create a Vault System User and Directories
  - 3. Define the Systemd Service
  - 4. Vault Configuration (vault.hcl)
  - 5. Start and Verify Vault
  - 6. References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Vault Associate Certification

Installing Vault

# Demo Running Vault in Production

In this hands-on tutorial, you'll set up a single HashiCorp Vault node on an [AWS EC2](https://aws.amazon.com/ec2) instance using integrated Raft storage, AWS KMS auto-unseal, and a basic TCP listener. We assume you’ve already provisioned your EC2 instance (e.g., via [Packer](https://www.packer.io)) and dropped the Vault binary and example configs into `/tmp`.

## Table of Contents

1.  [Install the Vault Binary](#1-install-the-vault-binary)
2.  [Create a Vault System User and Directories](#2-create-a-vault-system-user-and-directories)
3.  [Define the Systemd Service](#3-define-the-systemd-service)
4.  [Vault Configuration (`vault.hcl`)](#4-vault-configuration-vaulthcl)
5.  [Start and Verify Vault](#5-start-and-verify-vault)
6.  [References](#6-references)

## 1\. Install the Vault Binary

SSH into your EC2 instance and place the Vault executable in your `PATH`.

```
# 1. Change to /tmp and verify files
cd /tmp && ls
# 2. Unzip and move the Vault binary
sudo unzip vault.zip
sudo mv vault /usr/local/bin/vault

# 3. Validate the installation
vault --version
```

> [!important]
> **Tip**
>
> Ensure that `/usr/local/bin` is in your `$PATH` so you can run `vault` without providing the full path.

## 2\. Create a Vault System User and Directories

Run Vault under a non-root user and prepare the configuration and data directories.

```
# Create a system user for Vault
sudo useradd --system --home /var/lib/vault --shell /sbin/nologin vault

# Create config & data directories
sudo mkdir -p /etc/vault.d /opt/vault/data1

# Give ownership to the vault user
sudo chown -R vault:vault /etc/vault.d /opt/vault
```

| Directory          | Purpose                   | Owner       |
| ------------------ | ------------------------- | ----------- |
| `/etc/vault.d`     | Vault configuration files | vault:vault |
| `/opt/vault/data1` | Raft storage data         | vault:vault |
| `/var/lib/vault`   | Vault home (no shell)     | vault:vault |

## 3\. Define the Systemd Service

Create the Systemd unit at `/etc/systemd/system/vault.service`:

```
[Unit]
Description="HashiCorp Vault - Secrets Management"
Documentation=https://www.vaultproject.io/docs/
Requires=network-online.target
After=network-online.target
ConditionFileNotEmpty=/etc/vault.d/vault.hcl
StartLimitIntervalSec=60
StartLimitBurst=3

[Service]
User=vault
Group=vault
ProtectSystem=full
ProtectHome=read-only
PrivateTmp=yes
PrivateDevices=yes
SecureBits=keep-caps
AmbientCapabilities=CAP_IPC_LOCK
Capabilities=CAP_IPC_LOCK+ep
CapabilityBoundingSet=CAP_SYSLOG CAP_IPC_LOCK
NoNewPrivileges=yes
ExecStart=/usr/local/bin/vault server --config=/etc/vault.d/vault.hcl
ExecReload=/bin/kill --signal HUP $MAINPID
KillMode=process
KillSignal=SIGINT
Restart=on-failure
RestartSec=5s
TimeoutStopSec=30s

[Install]
WantedBy=multi-user.target
```

Reload and enable the Vault service:

```
sudo systemctl daemon-reload
sudo systemctl enable vault
```

## 4\. Vault Configuration (`vault.hcl`)

Below is an example of `/etc/vault.d/vault.hcl` using Raft storage, AWS KMS auto-unseal, and a non-TLS TCP listener for demonstration:

```
storage "raft" {
  path    = "/opt/vault/data1"
  node_id = "node-a-us-east-1"

  retry_join {
    auto_join = [
      "provider=aws",
      "region=us-east-1",
      "tag_key=vault",
      "tag_value=us-east-1"
    ]
  }
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:003674902126:key/8bc6b2ab-840a-4eef-8f2d-5616a3e67900"
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 1
}

api_addr     = "http://10.0.1.37:8200"
cluster_addr = "http://10.0.1.37:8201"
cluster_name = "vault-prod-us-east-1"

ui        = true
log_level = "INFO"
```

> [!important]
> **Security Warning**
>
> For a production setup, **always** enable TLS by adding `tls_cert_file` and `tls_key_file` under the `listener` block.

## 5\. Start and Verify Vault

Launch Vault and confirm its status:

```
# Start the service
sudo systemctl start vault

# Check seal & HA status
vault status
```

Expected output:

```
Key             Value
---             -----
Seal Type       awskms
Initialized     false
Sealed          false
Total Shares    0
Version         1.7.1
Storage Type    raft
HA Enabled      true
```

View runtime logs to troubleshoot:

```
# Service status
sudo systemctl status vault

# Live logs
sudo journalctl -u vault -f
```

You should see AWS KMS auto-unseal messages if IAM and KMS permissions are correct:

```
2021-05-12T13:41:19.601Z [INFO]  core: [DEBUG] discover-aws: Creating session...
2021-05-12T13:41:19.639Z [INFO]  core: [DEBUG] discover-aws: Filter instances with vault=us-east-1
...
```

## 6\. References

- [AWS EC2](https://aws.amazon.com/ec2)
- [Packer by HashiCorp](https://www.packer.io)
- [Vault Documentation](https://www.vaultproject.io/docs/)
- [HashiCorp AWS KMS Secrets Engine](https://www.vaultproject.io/docs/secrets/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/a5a3d715-00ac-4573-aa63-061912aafce2/lesson/bd3e90d0-1ae9-419a-9113-1c1863d62848)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/a5a3d715-00ac-4573-aa63-061912aafce2/lesson/b55773a1-515f-4a4a-ad56-70a8f624c5f2)**
>
> Practice lab
