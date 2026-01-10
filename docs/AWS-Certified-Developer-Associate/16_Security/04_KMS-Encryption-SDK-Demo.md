# KMS Encryption SDK Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/KMS-Encryption-SDK-Demo)

---

## Table of Contents

- KMS Encryption SDK Demo
  - Encryption Example
  - Decryption Example
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Security

# KMS Encryption SDK Demo

In this article, we will explore how to simplify envelope encryption using the AWS Encryption SDK. Previously, manually performing envelope encryption was a tedious process that involved generating and decoding data keys, encrypting files, and securely deleting plaintext keys to prevent accidental exposure. The AWS Encryption SDK streamlines these steps, making it much easier to encrypt and decrypt large files.

Before you begin, ensure that Python is installed on your system. Verify your Python installation with the following command:

```
python -V
PS C:\> dir HKLM:\Software\Python\PythonCore/<version>/InstallPath
# -or-
PS C:\> dir HKCU:\Software\Python\PythonCore/<version>/InstallPath
```

Once Python is set up, install the AWS Encryption SDK CLI using pip:

```
pip install aws-encryption-sdk-cli
pip install --upgrade aws-encryption-sdk-cli
aws-encryption-cli --version
```

This sequence installs the required tools and then displays the installed version of the AWS Encryption SDK CLI.

## Encryption Example

To encrypt a file, first export the ARN of your KMS key as an environment variable (e.g., `keyArn`). This step saves you from having to repeatedly enter the long ARN value in each command. In the following example, we assume that your demo key's ARN is stored in the `$keyArn` variable and you are encrypting a file named `db-creds`.

Copy and modify the command below:

```
aws-encryption-cli --encrypt \
  --input db-creds \
  --wrapping-keys key=$keyArn \
  --metadata-output metadata \
  --encryption-context purpose=test \
  --commitment-policy require-encrypt-require-decrypt \
  --output output
```

Here's a breakdown of the command parameters:

- **\--input db-creds**: Specifies the file to encrypt.
- **\--wrapping-keys key=$keyArn**: Uses your KMS key, identified by the ARN stored in `$keyArn`, for key wrapping.
- **\--metadata-output metadata**: Designates the location to store the encryption metadata.
- **\--encryption-context purpose=test**: Applies an encryption context for validation during decryption.
- **\--commitment-policy require-encrypt-require-decrypt**: Enforces strict commitment policies for both encryption and decryption.
- **\--output output**: Specifies the folder for the encrypted data.

After executing this command, you should see two primary outputs: a metadata file in JSON format and an encrypted file containing binary data. For example, you can view the metadata file using the following command:

```
cat metadata | jq
```

Below is an example of what the metadata JSON might look like:

```
{
  "header": {
    "algorithm": "AES_256_GCM_HKDF_SHA512_COMMIT_KEY_ECDSA_P384",
    "commitment_key": "JeK8VKo7y50+6z4y2Rpi2J3Px+ER7KMeb2B+4jCMDRk=",
    "content_type": 2,
    "encrypted_data_keys": [
      {
        "encrypted_data_key": "AQIBAhhIPn5jWlokyhTrOUNemva4jMiIw9RNFBBjMDPJwNggh3TTk7ntCDURimak35c55DA3bddPIqrk10Nbk6VeFp2m7P0R/xhRGrvE5MrjQ1BRZi0rI71Fn46TQpnYkunSduA==",
        "key_provider": {
          "key_info": "YXJuUmFzczprbk6XMtZWZcdxOjg0MTg2MDkyNzMzNzprZXkwNWU2Njk2YzUtZGU0Ni00ZDU2LWI=",
          "provider_id": "YxdzLWttcw=="
        }
      }
    ]
  },
  "encryption_context": {
    "aws-crypto-public": "A664LzkW6MAlgfbJ3BtD7Ic+fEyTscr4K9it0rHSZ0V22D3rI9d0Rs511PrB+E7w==",
    "purpose": "test"
  },
  "frame_length": 4096
}
```

> [!important]
> **Note**
>
> The metadata provides crucial details like the encryption algorithm, the encrypted data key, and the encryption context which are useful for auditing and troubleshooting.

## Decryption Example

Decrypting your data is a straightforward process. Ensure that you specify the same encryption context and KMS key ARN that were used during encryption. Use the following command to decrypt the file:

```
aws-encryption-cli --decrypt \
  --input output \
  --wrapping-keys key=$keyArn \
  --commitment-policy require-encrypt-require-decrypt \
  --encryption-context purpose=test \
  --metadata-output metadata-decrypted \
  --max-encrypted-data-keys 1 \
  --buffer \
  --output decrypted-file
```

Here's an explanation of the extra decryption parameters:

- **\--input output**: Points to the folder containing the encrypted data.
- **\--metadata-output metadata-decrypted**: Specifies the location for the decryption metadata.
- **\--max-encrypted-data-keys 1**: Ensures the message contains only one encrypted data key, reducing the risk of processing malformed messages.
- **\--buffer**: Ensures decryption is complete before outputting the decrypted data, which is important for validating digital signatures.
- **\--output decrypted-file**: Defines the name of the file where the decrypted data will be stored.

Upon running this command, you'll receive metadata output similar to the encryption process, along with a decrypted file containing your original data (e.g., credentials from the `db-creds` file).

## Summary

The AWS Encryption SDK CLI significantly streamlines the process of securing sensitive data through envelope encryption:

- It automates data key management so you don't have to manually generate, decode, or securely dispose of keys.
- A single command handles both encryption and decryption, simplifying your workflow.
- Detailed metadata files allow you to verify encryption parameters and support auditing processes.

By following the commands and best practices outlined in this guide, you can efficiently secure and access sensitive data using envelope encryption with the AWS Encryption SDK.

For more information and additional resources, consider visiting:

- [AWS Encryption SDK Documentation](https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/)
- [AWS KMS Documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/a670f11c-fac0-463d-84a7-d117b7651f15)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/ef35703c-fe57-400a-944b-f5db7310faab)**
>
> Practice lab
