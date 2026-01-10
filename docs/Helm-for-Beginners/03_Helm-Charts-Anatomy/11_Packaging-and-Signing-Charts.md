# Packaging and Signing Charts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Helm-Charts-Anatomy/Packaging-and-Signing-Charts)

---

## Table of Contents

- Packaging and Signing Charts
  - Signing Your Helm Chart
  - Verifying a Signed Helm Chart
  - Next Steps
  - Watch Video
    - Generating Your GPG Keys
    - Packaging the Chart with a Signature

---

## Content

Helm for Beginners

Helm Charts Anatomy

# Packaging and Signing Charts

In this lesson, we’ll walk through the process of packaging and uploading Helm charts, a key step for sharing your Kubernetes applications. Once your charts are built, the next step is to package them and then upload the resulting archive to an online chart repository so that other users can easily download and install them.

Our chart is located in the directory "nginx-chart" and contains the following items:

- Chart.yaml
- values.yaml
- README.md
- LICENSE
- templates (directory)
- charts (directory)

To package the chart, run the following command:

```
$ ls nginx-chart
charts  Chart.yaml  templates  values.yaml  README.md  LICENSE

$ helm package ./nginx-chart
Successfully packaged chart and saved it to:
/vagrant/nginx-chart-0.1.0.tgz
```

The version number (0.1.0) is automatically taken from the version field in the Chart.yaml file. The resulting file has the `.tgz` extension, which indicates that it is a tar archive compressed using gzip. You can extract this archive with any archive manager available on your platform, such as WinRAR, 7-Zip, or common Linux archive utilities. This single archive file neatly bundles all your chart files for easy distribution.

> [!important]
> **Tip**
>
> Before uploading your chart to a repository, it is strongly recommended that you sign it. Signing helps users verify the integrity and authenticity of the package.

## Signing Your Helm Chart

When you download files from the internet, there is always a risk of tampering. By cryptographically signing your Helm chart, you assure your users that the package is genuine and has not been altered. Helm uses a private key held exclusively by the chart developer to generate a digital signature. This signature is then stored in a separate provenance file accompanying your chart archive.

### Generating Your GPG Keys

Start by generating a private key and its corresponding public key using GPG (GNU Privacy Guard). The following command quickly generates both keys:

```
$ gpg --quick-generate-key "John Smith"
gpg: keybox '/home/vagrant/.gnupg/pubring.kbx' created
About to create a key for:
"John Smith"
Continue? (Y/n) Y
gpg: /home/vagrant/.gnupg/trustdb.gpg: trustdb created
gpg: key 70D5188339885A0B marked as ultimately trusted
gpg: directory '/home/vagrant/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/vagrant/.gnupg/openpgp-revocs.d/20F2395A3176A22DD33D45470D5188339885A0B.rev'
public and secret key created and signed.

pub   rsa3072 2021-12-01 [SC] [expires: 2023-12-01]
      20F2395A3176A22DD33D45470D5188339885A0B
uid           John Smith
sub   rsa3072 2021-12-01 [E]
```

In a production environment, you might prefer to use a more robust key generation command:

```
$ gpg --full-generate-key "John Smith"
```

After generating your keys, you may need to convert the new secret keyring format (from GNU PG v2) to the older format preferred by Helm. Export your secret keys into a file called secring.gpg with the following command:

```
$ gpg --export-secret-keys >~/.gnupg/secring.gpg
gpg: starting migration from earlier GnuPG versions
gpg: exporting secret keys from '/home/vagrant/.gnupg/secring.gpg' to gpg-agent
gpg: migration succeeded
```

### Packaging the Chart with a Signature

Now that your keys are ready, you can package your chart again, this time signing it with your GPG key. Use your key’s full name or the associated email, along with the path to your keyring file:

```
$ helm package --sign --key 'John Smith' --keyring ~/.gnupg/secring.gpg ./nginx-chart
Successfully packaged chart and saved it to: /vagrant/nginx-chart-0.1.0.tgz
```

After executing the command, you will see not only the chart archive (`.tgz`) but also an additional file with the `.tgz.prov` extension. This provenance file holds important information, including:

- A SHA256 hash of the chart archive
- A PGP signature verifying the archive’s integrity

Below is an example snippet from a provenance file:

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

apiVersion: v2
appVersion: 1.16.0
description: A Helm chart for Kubernetes
maintainers:
  - email: john@example.com
    name: john smith
name: nginx-chart
type: application
version: 0.1.0
files:
  nginx-chart-0.1.0.tgz: sha256:b7d0502a9617ab953a3246bc7ba6a9de9d4286b2e78e3ea7975cc54698c4274
-----BEGIN PGP SIGNATURE-----
...
-----END PGP SIGNATURE-----
```

The SHA256 hash ensures that even a minor change to any byte of the chart will result in a different hash, signaling potential tampering. The PGP signature in the provenance file further protects the integrity of the package by tying it to your private key. Users can later verify the signature with your public key to ensure authenticity.

> [!important]
> **Security Notice**
>
> When uploading your chart to an online repository, **always include both** the `.tgz` archive and the corresponding `.tgz.prov` provenance file.

## Verifying a Signed Helm Chart

To verify the integrity and authenticity of your signed chart, you can use the following commands. Note that an initial verification attempt might result in an error, because Helm expects the public key in the older `pubring.gpg` format:

```
$ helm verify ./nginx-chart-0.1.0.tgz
Error: failed to load keyring: open /home/vagrant/.gnupg/pubring.gpg: no such file or directory
```

To resolve this, export your public key to a file and then use it with the verification command:

```
$ gpg --export 'John Smith' > mypublickey

$ helm verify --keyring ./mypublickey ./nginx-chart-0.1.0.tgz
Signed by: John Smith
Using Key With Fingerprint: 20F2395A3176A22DD33DA45470D518839885A0B
Chart Hash Verified: sha256:b7d5022a9617ab953a3246bc7ba6a9de9d4286b2e78e3ea7975cc54698c4274
```

In real-world usage, users would typically download your public key from a public key server (e.g., [keyserver.ubuntu.com](https://keyserver.ubuntu.com/)) and use the `--verify` parameter during chart installation. If verification fails, the chart installation process is aborted, ensuring that only trusted charts are installed.

## Next Steps

That concludes our lesson on packaging and signing Helm charts. Next, we will explore how to upload your charts to an online repository, making them accessible to the Kubernetes community.

For more detailed information, refer to the [Helm documentation](https://helm.sh/docs/) and other trusted Kubernetes resources.

Happy charting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/b90a4aa4-31b5-43d3-a7aa-383d48c50db0/lesson/2e8670ae-a3ab-409a-9e17-4a18fbe6f896)**
>
> Watch video content
