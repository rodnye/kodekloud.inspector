# Docker Securing the Daemon - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Docker-Securing-the-Daemon)

---

## Table of Contents

- Docker Securing the Daemon
  - Risks of an Unsecured Docker Daemon
  - Securing the Docker Host
  - Exposing the Docker Daemon Externally
  - Encrypting Communication with TLS
  - Enabling Certificate-Based Authentication
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Docker Securing the Daemon

This guide explains why securing the Docker daemon is critical for protecting your containerized infrastructure. It demonstrates practical steps to harden both the Docker host and the Docker API. Inadequate protection can allow attackers to delete containers and volumes, run malicious containers (e.g., for unauthorized cryptocurrency mining), and even gain root access on the host system—potentially compromising your entire network.

## Risks of an Unsecured Docker Daemon

If an unauthorized individual gains access to your Docker daemon, they can:

- Delete containers hosting your applications, leading to service disruptions.
- Erase Docker volumes that store critical application data, which may result in data loss.
- Launch their own containers, possibly with privileged access, to compromise the host system and other networked devices.

By default, Docker restricts access by binding the Docker API to a Unix socket, which limits interaction to users logged into the host. However, if you configure Docker to accept external connections, implementing additional security measures is essential.

## Securing the Docker Host

Before modifying Docker’s configuration, ensure that the host system is secured by following standard server hardening practices:

- Disable direct root user login.
- Limit access exclusively to trusted users.
- Use SSH key-based authentication instead of password-based authentication.
- Restrict or close unused network ports.

> [!important]
> **Note**
>
> Regularly review and update your server security measures to keep pace with evolving threats.

## Exposing the Docker Daemon Externally

In scenarios such as remote administration or integration with container management tools, you might need to allow external access to the Docker daemon. To do so, modify the Docker daemon configuration file by adding a hosts option. For example, to expose the daemon on a private IP address, update `/etc/docker/daemon.json` as follows:

```
{
  "hosts": [ "tcp://192.168.1.10:2375" ]
}
```

Ensure that the Docker daemon is bound only to private network interfaces. If your host has a public-facing interface, verify that the Docker daemon is not accessible there.

## Encrypting Communication with TLS

Exposing the Docker daemon externally necessitates secure communication through TLS encryption. To enable TLS:

1.  Set up a Certificate Authority (CA) and generate server certificates (e.g., `server.pem` and `serverkey.pem`).
2.  Modify the configuration to enable TLS and change the port to 2376.

A recommended configuration with certificate-based authentication in `/etc/docker/daemon.json` is as follows:

```
{
  "hosts": ["tcp://192.168.1.10:2376"],
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/serverkey.pem",
  "tlsverify": true,
  "tlscacert": "/var/docker/cacert.pem"
}
```

With this setup, Docker listens on port 2376, ensuring encrypted communication. However, while TLS ensures that traffic is encrypted, it does not enforce client authentication by itself.

> [!important]
> **Warning**
>
> Do not rely solely on TLS encryption. Make sure to enable certificate-based authentication to verify the identity of clients connecting to your Docker daemon.

## Enabling Certificate-Based Authentication

To restrict Docker daemon access only to clients with valid CA-signed certificates, follow these steps:

1.  On the Server:
    - Copy the Certificate Signing Request (CSR) and set the TLS CSR parameter in the daemon configuration file.
    - Enable `tlsverify` to enforce certificate checks.
2.  Generate client certificates (e.g., `client.pem` and `client-key.pem`) signed by your CA.
3.  Provide these client certificates along with your CA certificate (`cacert.pem`) only to trusted users.

On the client side, configure Docker to use TLS verification. The Docker client can automatically detect certificates stored in the `.docker` directory in the user’s home folder, or they can be specified manually via command-line options.

For example, set up the client environment as follows:

```
export DOCKER_TLS_VERIFY=true
export DOCKER_HOST="tcp://192.168.1.10:2376"
docker --tlscert=<path_to_cert> --tlskey=<path_to_key> --tlscacert=<path_to_ca_cert> ps
```

These settings ensure that the Docker CLI communicates securely with the Docker server, permitting only clients with valid, signed certificates to perform operations.

## Summary

- By default, the Docker daemon is bound to a Unix socket, which limits access to the local host.
- When external access is required, update `/etc/docker/daemon.json` to bind the daemon to a TCP interface and enable TLS encryption.
- TLS encrypts traffic, but enforce authentication by enabling `tlsverify` and using CA-signed certificates on both the server and client sides.
- On the client side, configure environment variables or command-line options to supply the necessary TLS certificates.

Following these best practices will enhance the security of your Docker daemon and ensure that the communication between your clients and the Docker server remains both encrypted and authenticated. Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/17d0025c-1893-4764-9209-4826c7de5a06)**
>
> Watch video content
