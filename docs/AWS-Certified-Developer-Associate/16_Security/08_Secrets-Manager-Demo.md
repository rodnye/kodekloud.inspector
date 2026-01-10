# Secrets Manager Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/Secrets-Manager-Demo)

---

## Table of Contents

- Secrets Manager Demo
  - Navigating to AWS Secrets Manager
  - Selecting and Configuring Your Secret
  - Retrieving the Secret in Your Application
  - Conclusion
  - Watch Video
  - Practice Lab
    - Java Example
    - Node.js Example

---

## Content

AWS Certified Developer - Associate

Security

# Secrets Manager Demo

In this guide, we demonstrate how to work with AWS Secrets Manager to securely store and retrieve sensitive information, such as database credentials.

## Navigating to AWS Secrets Manager

Begin by searching for the Secrets Manager service in the AWS Management Console. Once located, click on "Store New Secret" to start the process.

![The image shows the AWS Secrets Manager interface with two secret names listed: "mysql-creds" and "postgres-creds," both last retrieved on March 10, 2024. There's an option to store a new secret.](https://kodekloud.com/kk-media/image/upload/v1752859403/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager-Demo/aws-secrets-manager-interface.jpg)

## Selecting and Configuring Your Secret

On the "Store New Secret" page, you can choose from several secret types. AWS Secrets Manager supports secrets tailored for various AWS services such as Amazon RDS, DocumentDB, and Redshift. You also have the option to store generic secrets for any application.

![The image shows the AWS Secrets Manager interface where a user can choose a secret type, such as credentials for Amazon RDS, and enter credentials like username and password.](https://kodekloud.com/kk-media/image/upload/v1752859405/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager-Demo/aws-secrets-manager-credentials-interface.jpg)

For this demo, we will create a generic secret that contains key-value pairs for a database username and password. You can include multiple key-value pairs within a single secret. For example:

- Username: user123
- Password: password123

Next, select your encryption key. AWS Secrets Manager utilizes KMS for encryption - you can opt for the AWS managed key or a customer-managed key. In this demo, we are using the AWS managed key "aws/secretsmanager". Click **Next** to continue.

![The image shows an AWS Secrets Manager interface where a user is configuring a secret with key/value pairs for a username and password.](https://kodekloud.com/kk-media/image/upload/v1752859407/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager-Demo/aws-secrets-manager-configuration.jpg)

On the following screen, assign a name to your secret. For this demo, the secret name is set to "/backend/db-creds". You may also add a description, set resource permissions, and even enable secret replication across regions. For simplicity, we will skip the replication setup. Click **Next** to proceed.

![The image shows an AWS Secrets Manager interface where a user is configuring a secret, including fields for the secret name, description, tags, and resource permissions.](https://kodekloud.com/kk-media/image/upload/v1752859409/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager-Demo/aws-secrets-manager-configuration-2.jpg)

> [!important]
> **Automatic Rotation**
>
> AWS Secrets Manager offers automatic rotation for secrets. You can set a rotation schedule by specifying intervals in hours, days, weeks, or months, and even rotate the secret immediately after creation by providing a Lambda function that handles the update. In this demo, automatic rotation will remain disabled.

![The image shows an AWS Secrets Manager interface for configuring automatic rotation of secrets, including options for setting a rotation schedule and selecting a Lambda rotation function.](https://kodekloud.com/kk-media/image/upload/v1752859410/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager-Demo/aws-secrets-manager-rotation-interface.jpg)

## Retrieving the Secret in Your Application

After reviewing all configurations, the AWS Management Console displays sample code for retrieving the secret from your application. Below are examples in both Java and Node.js.

### Java Example

Make sure to import the necessary packages:

```
// Import required AWS SDK packages
// import software.amazon.awssdk.regions.Region;
// import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
// import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
// import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;


public static void getSecret() {
    String secretName = "/backend/db-creds";
    Region region = Region.of("us-east-1");
    // Additional logic to retrieve the secret
}
```

For further details, refer to the [AWS Java SDK documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html).

### Node.js Example

The following Node.js code snippet demonstrates how to create a Secrets Manager client to retrieve your secret:

```
// Use this code snippet in your application.
// For additional configuration details, visit the [AWS SDK for JavaScript documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html)


import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";


const secret_name = "/backend/db-creds";


const client = new SecretsManagerClient({
    region: "us-east-1"
});
```

The complete Node.js example to retrieve the secret is provided below:

```
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";


const secret_name = "/backend/db-creds";


const client = new SecretsManagerClient({
    region: "us-east-1",
});


let response;


try {
    response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
    );
} catch (error) {
    console.log(error);
    throw error;
}


const secret = response.SecretString;
console.log(secret);
```

When you run this code (for example, using the command `node index.js`), it retrieves the username and password stored in your secret.

## Conclusion

This guide has walked you through the process of creating, configuring, and retrieving secrets using AWS Secrets Manager. By following these steps, you can securely manage sensitive credentials and other secret data in your applications.

For further reading, explore these resources:

- [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
- [AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/home.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/191ea555-9265-441a-b231-8c267f1bcfb0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/4cb725ba-579f-4a11-a823-eb7e918fd4ea)**
>
> Practice lab
